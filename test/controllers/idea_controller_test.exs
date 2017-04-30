defmodule RemoteRetro.IdeaControllerTest do
  use RemoteRetro.ConnCase

  alias RemoteRetro.{Idea, Retro}

  @valid_attrs %{body: "Collaboration!", category: "happy", author: "Tim"}
  @invalid_attrs %{name: "derp"}

  setup %{conn: conn} do
    retro = Repo.insert! %Retro{}
    conn = get conn, auth_path(conn, :callback, code: "schlarpdarp")
    {:ok, conn: conn, retro: retro}
  end

  test "shows chosen resource", %{conn: conn, retro: retro} do
    idea = Repo.insert! %Idea{retro: retro, category: "happy", body: "heyo"}
    conn = get conn, retro_idea_api_path(conn, :show, retro.id, idea.id)
    assert json_response(conn, 200)["data"] == %{"id" => idea.id}
  end

  test "renders page not found when id is nonexistent", %{conn: conn, retro: retro} do
    assert_error_sent 404, fn ->
      get conn, retro_idea_api_path(conn, :show, retro.id, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn, retro: retro} do
    conn = post conn, retro_idea_api_path(conn, :create, retro.id), @valid_attrs
    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Idea, @valid_attrs)
  end

  describe "creation broadcast" do
    setup :subscribe_to_retro_channel

    test "the creation is broadcasted to the retro's subscribers", %{conn: conn, retro: retro} do
      topic = "retro:#{retro.id}"
      post conn, retro_idea_api_path(conn, :create, retro.id), @valid_attrs
      assert_receive %Phoenix.Socket.Broadcast{
        topic: ^topic,
        event: "new_idea_created",
        payload: @valid_attrs
      }
    end
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn, retro: retro} do
    conn = post conn, retro_idea_api_path(conn, :create, retro.id), idea: @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn, retro: retro} do
    idea = Repo.insert! %Idea{retro: retro, category: "sad", body: "larp!"}
    conn = put conn, retro_idea_api_path(conn, :update, retro.id, idea), @valid_attrs
    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Idea, @valid_attrs)
  end

  describe "update broadcast" do
    setup :subscribe_to_retro_channel

    test "the update is broadcast to the retro's subscribers", %{conn: conn, retro: retro} do
      %Idea{id: id} = Repo.insert! %Idea{retro: retro, category: "happy", body: "parole!"}

      topic = "retro:#{retro.id}"
      put conn, retro_idea_api_path(conn, :update, retro.id, id), @valid_attrs

      assert_receive %Phoenix.Socket.Broadcast{
        topic: ^topic,
        event: "idea_updated",
        payload: %{id: ^id}
      }
    end
  end

  test "does not update chosen resource and renders errors when data is invalid", %{conn: conn, retro: retro} do
    idea = Repo.insert! %Idea{retro: retro, category: "confused", body: "OffTheChain.js?"}
    conn = put conn, retro_idea_api_path(conn, :update, retro.id, idea), @invalid_attrs
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "deletes chosen resource", %{conn: conn, retro: retro} do
    idea = Repo.insert! %Idea{retro: retro, category: "sad", body: "death row"}
    conn = delete conn, retro_idea_api_path(conn, :delete, retro.id, idea)
    assert response(conn, 204)
    refute Repo.get(Idea, idea.id)
  end

  describe "deletion broadcast" do
    setup :subscribe_to_retro_channel

    test "the deletion is broadcast to the retro's subscribers", %{conn: conn, retro: retro} do
      %Idea{id: id} = idea = Repo.insert! %Idea{retro: retro, category: "happy", body: "parole!"}

      topic = "retro:#{retro.id}"
      delete conn, retro_idea_api_path(conn, :delete, retro.id, idea.id)

      assert_receive %Phoenix.Socket.Broadcast{
        topic: ^topic,
        event: "idea_deleted",
        payload: %{id: ^id}
      }
    end
  end
end
