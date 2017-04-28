defmodule RedirectUnauthenticated do
  import Plug.Conn
  import Phoenix.Controller

  def init(options) do
    options
  end

  def call(conn, _opts) do
    conn |> redirect(to: "/auth/google") |> halt
  end
end
