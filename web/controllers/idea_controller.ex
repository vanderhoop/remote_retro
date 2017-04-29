defmodule RemoteRetro.IdeaController do
  use RemoteRetro.Web, :controller

  alias RemoteRetro.{Idea, Endpoint}

  def create(conn, %{"retro_id" => retro_id} = idea_params) do
    changeset = Idea.changeset(%Idea{}, idea_params)

    case Repo.insert(changeset) do
      {:ok, idea} ->
        Endpoint.broadcast!("retro:#{retro_id}", "new_idea_created", idea)
        conn
        |> put_status(:created)
        |> put_resp_header("location", retro_idea_api_path(conn, :show, retro_id, idea))
        |> render("show.json", idea: idea)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(RemoteRetro.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    idea = Repo.get!(Idea, id)
    render(conn, "show.json", idea: idea)
  end

  def update(conn, %{"id" => id} = idea_params) do
    idea = Repo.get!(Idea, id)
    changeset = Idea.changeset(idea, idea_params)

    case Repo.update(changeset) do
      {:ok, idea} ->
        Endpoint.broadcast!("retro:#{idea.retro_id}", "idea_updated", idea)
        render(conn, "show.json", idea: idea)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(RemoteRetro.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"retro_id" => retro_id, "id" => id}) do
    idea = Repo.get!(Idea, id)
    Repo.delete!(idea)

    Endpoint.broadcast!("retro:#{retro_id}", "idea_deleted", idea)
    send_resp(conn, :no_content, "")
  end
end
