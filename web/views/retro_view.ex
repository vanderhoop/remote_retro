defmodule RemoteRetro.RetroView do
  use RemoteRetro.Web, :view

  def include_js do
    true
  end

  def render("show.json", %{retro: retro}) do
    %{data: render_one(retro, RemoteRetro.RetroView, "retro.json")}
  end

  def render("retro.json", %{retro: retro}) do
    %{id: retro.id}
  end
end

