defmodule RemoteRetro.RetroController do
  use RemoteRetro.Web, :controller
  alias RemoteRetro.{Retro, Participation, User, Endpoint, Emails, Mailer}
  alias Phoenix.Token

  def show(conn, params) do
    user = get_session(conn, "current_user")
    user_from_db = Repo.get_by(User, email: user["email"])
    query = from p in Participation, where: p.user_id == ^user_from_db.id and p.retro_id == ^params["id"]
    changeset = Participation.changeset(%Participation{}, %{
      user_id: user_from_db.id,
      retro_id: params["id"]
    })
    Repo.one(query) || Repo.insert!(changeset)

    render conn, "show.html", %{
      user_token: Token.sign(conn, "user", user),
      retro_uuid: params["id"]
    }
  end

  def create(conn, _params) do
    {:ok, retro} = Repo.insert(%Retro{})
    redirect conn, to: "/retros/" <> retro.id
  end

  def update(conn, %{"id" => id, "stage" => stage}) do
    retro = Repo.get!(Retro, id)
    changeset = Retro.changeset(retro, %{stage: stage})

    case Repo.update(changeset) do
      {:ok, %{stage: "action-item-distribution"}} ->
        Emails.action_items_email(id) |> Mailer.deliver_now
        broadcast_and_render(conn, retro)
      {:ok, retro} ->
        broadcast_and_render(conn, retro)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(RemoteRetro.ChangesetView, "error.json", changeset: changeset)
    end
  end

  defp broadcast_and_render(conn, retro) do
    Endpoint.broadcast! "retro:#{retro.id}", "proceed_to_next_stage", retro
    render(conn, "show.json", retro: retro)
  end
end
