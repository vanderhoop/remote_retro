defmodule RemoteRetro.ConnCase.Helpers do
  use Phoenix.ConnTest

  import ExUnit.Callbacks
  alias RemoteRetro.Endpoint

  @endpoint RemoteRetro.Endpoint

  def authenticate_connection(context) do
    conn = get context[:conn], "/auth/google/callback?code=derp"
    Map.put(context, :conn, conn)
  end

  def subscribe_to_retro_channel(%{retro: retro}) do
    topic = "retro:#{retro.id}"
    Endpoint.subscribe(topic)
    on_exit fn -> Endpoint.unsubscribe(topic) end
    :ok
  end
end
