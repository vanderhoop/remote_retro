defmodule RemoteRetro.RetroChannelTest do
  use RemoteRetro.ChannelCase, async: true

  alias RemoteRetro.{RetroChannel, Presence, Retro}

  @mock_user Application.get_env(:remote_retro, :mock_user)

  defp join_the_retro_channel(%{retro: retro} = context) do
    {:ok, _, socket} =
      socket("", %{user_token: Phoenix.Token.sign(socket(), "user", @mock_user)})
      |> subscribe_and_join(RetroChannel, "retro:" <> retro.id)

    Map.put(context, :socket, socket)
  end

  describe "joining a RetroChannel" do
    setup [:join_the_retro_channel]

    test "assigns the retro_id to the socket", %{socket: socket, retro: retro} do
      assert socket.assigns.retro_id == retro.id
    end

    test "results in the push of a presence state to the new user" do
      assert_push "presence_state", %{}
    end

    test "results in a push of the retro state, including the `ideas` association" do
      assert_push "retro_state", %Retro{ideas: _, stage: "idea-generation"}
    end

    test "results in a Presence tracking of the new user, including timestamp", %{retro: retro} do
      result = Presence.list("retro:" <> retro.id)

      presence_object =
        Map.values(result)
        |> List.first
        |> Map.get(:metas)
        |> List.first

      assert presence_object["email"] == @mock_user["email"]
      assert presence_object["given_name"] == @mock_user["given_name"]
      assert presence_object["family_name"] == @mock_user["family_name"]
      assert %{online_at: _} = presence_object
    end
  end

  describe "pushing an `enable_edit_state` event to the socket" do
    setup [:join_the_retro_channel]
    test "broadcasts the same event with the given payload", %{socket: socket} do
      push(socket, "enable_edit_state", %{id: 4})

      assert_broadcast("enable_edit_state", %{"id" => 4})
    end
  end

  describe "pushing an `disable_edit_state` event to the socket" do
    setup [:join_the_retro_channel]
    test "broadcasts the same event with the given payload", %{socket: socket} do
      push(socket, "disable_edit_state", %{id: 4})

      assert_broadcast("disable_edit_state", %{"id" => 4})
    end
  end

  describe "pushing an `idea_live_edit` event to the socket" do
    setup [:join_the_retro_channel]
    test "broadcasts the same event with the given payload", %{socket: socket} do
      push(socket, "idea_live_edit", %{id: 4, liveEditText: "updated"})

      assert_broadcast("idea_live_edit", %{"id" => 4, "liveEditText" => "updated"})
    end
  end

  describe "the emission of a `presence_diff` event" do
    setup [:join_the_retro_channel]

    test "does not make its way to the client", %{socket: socket} do
      broadcast_from socket, "presence_diff", %{}
      refute_push "presence_diff", %{}
    end

    test "results in the push of a `presence_state` event", %{socket: socket} do
      broadcast_from socket, "presence_diff", %{}
      assert_push "presence_state", %{}
    end
  end
end
