defmodule RemoteRetro.RetroControllerTest do
  use RemoteRetro.ConnCase, async: false
  use Bamboo.Test, shared: true
  alias RemoteRetro.{User, Retro, Participation, Endpoint}

  @valid_attrs %{stage: "action-items"}
  @invalid_attrs %{stage: "paintball"}

  describe "authenticated requests" do
    setup :authenticate_connection

    test "POST requests to /retros redirect to the new retro", %{conn: conn} do
      conn = post conn, "/retros"

      assert redirected_to(conn) =~ ~r/\/retros\/.+$/
    end

    test "joining a retro results in a the persistence of a participation", %{conn: conn} do
      mock_google_info = Application.get_env(:remote_retro, :mock_user)
      user = Repo.get_by(User, email: mock_google_info["email"])

      conn = post conn, "/retros"
      location = get_resp_header(conn, "location")
      get conn, "#{location}"

      participation = Repo.get_by(Participation, user_id: user.id)

      assert participation.user_id == user.id
    end

    test "rejoining a retro doesn't result in a participation being persisted", %{conn: conn} do
      mock_google_info = Application.get_env(:remote_retro, :mock_user)
      user = Repo.get_by(User, email: mock_google_info["email"])

      conn = post conn, "/retros"
      location = get_resp_header(conn, "location")
      conn = get conn, "#{location}"
      get conn, "#{location}"

      retro_id = conn.params["id"]

      query = from p in Participation, where: p.user_id == ^user.id and p.retro_id == ^retro_id
      participations = Repo.all(query)

      refute length(participations) > 1
    end

    test "updates and renders chosen resource when data is valid", %{conn: conn} do
      retro = Repo.insert! %Retro{}
      conn = put conn, retro_path(conn, :update, retro.id), @valid_attrs
      assert json_response(conn, 200)["data"]["id"]
      assert Repo.get_by(Retro, @valid_attrs)
    end

    test "the retro update is broadcasted to subscribers", %{conn: conn} do
      retro = Repo.insert! %Retro{}
      topic = "retro:#{retro.id}"
      Endpoint.subscribe(topic)

      put conn, retro_path(conn, :update, retro.id), @valid_attrs
      assert_receive %Phoenix.Socket.Broadcast{
        topic: ^topic,
        event: "proceed_to_next_stage",
        payload: @valid_attrs
      }

      Endpoint.unsubscribe(topic)
    end

    test "does not update chosen resource and renders errors when data is invalid", %{conn: conn} do
      retro = Repo.insert! %Retro{}
      conn = put conn, retro_path(conn, :update, retro.id), @invalid_attrs
      assert json_response(conn, 422)["errors"] != %{}
    end

    test "emails an action-item breakdown when the stage is 'action-item-distribution'", %{conn: conn} do
      attrs = %{@valid_attrs | stage: "action-item-distribution" }
      retro = Repo.insert! %Retro{}
      put conn, retro_path(conn, :update, retro.id), attrs
      assert_delivered_with(subject: "Action items from Retro")
    end
  end

  describe "unauthenticated GET requests to /retros/some-uuid" do
    test "are redirected to the google account login", %{conn: conn} do
      conn = get conn, "/retros/d83838383ndnd9d9d"
      assert redirected_to(conn) =~ "/auth/google"
    end

    test "store the desired endpoint in the session", %{conn: conn} do
      conn = get conn, "/retros/d83838383ndnd9d9d"
      session = conn.private.plug_session

      assert session["requested_endpoint"] == "/retros/d83838383ndnd9d9d"
    end
  end
end
