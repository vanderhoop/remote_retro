defmodule RedirectUnauthenticatedTest do
  use ExUnit.Case, async: true
  use RemoteRetro.ConnCase, async: true

  test "redirects when there is no current_user on session" do
    conn = Plug.Test.conn(:get, "/hello") |> RedirectUnauthenticated.call(%{})

    assert redirected_to(conn) =~ auth_path(conn, :index)
  end
end
