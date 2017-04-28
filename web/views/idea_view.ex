defmodule RemoteRetro.IdeaView do
  use RemoteRetro.Web, :view

  def render("index.json", %{ideas: ideas}) do
    %{data: render_many(ideas, RemoteRetro.IdeaView, "idea.json")}
  end

  def render("show.json", %{idea: idea}) do
    %{data: render_one(idea, RemoteRetro.IdeaView, "idea.json")}
  end

  def render("idea.json", %{idea: idea}) do
    %{id: idea.id}
  end
end
