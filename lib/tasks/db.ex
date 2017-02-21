defmodule Mix.Tasks.Db do
  use Mix.Task

  @shortdoc "Connects to db"
  def run(_) do
    db_creds = Application.get_env(:remote_retro, RemoteRetro.Repo)
    System.cmd(
      "psql",
      [
        "-d", Keyword.get(db_creds, :database),
        "-h", Keyword.get(db_creds, :hostname),
        "-U", Keyword.get(db_creds, :username)
      ],
      into: IO.stream(:stdio, :line),
    )
  end
end
