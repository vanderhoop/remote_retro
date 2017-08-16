defmodule RemoteRetro.Vote do
  use RemoteRetro.Web, :model

  @derive {Poison.Encoder, except: [:__meta__]}
  schema "votes" do
    belongs_to :user, RemoteRetro.User
    belongs_to :idea, RemoteRetro.Idea

    timestamps(type: :utc_datetime)
  end

  @required_fields [:user_id, :idea_id]

  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, @required_fields)
    |> validate_required(@required_fields)
  end
end
