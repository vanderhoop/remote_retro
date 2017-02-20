defmodule Mix.Tasks.EndToEnd do
  use Mix.Task

  @shortdoc "Runs feature tests"
  def run(_) do
    { _, exit_code } = System.cmd(
      "mix",
      ["test", "--only", "feature_test", "--color"],
      into: IO.stream(:stdio, :line)
    )

    exit_code
  end
end
