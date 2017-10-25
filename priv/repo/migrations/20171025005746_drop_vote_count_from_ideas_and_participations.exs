defmodule RemoteRetro.Repo.Migrations.DropVoteCountFromIdeasAndParticipations do
  use Ecto.Migration

  def change do
    alter table(:ideas) do
      remove :vote_count
    end

    alter table(:participations) do
      remove :vote_count
    end
  end
end
