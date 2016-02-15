class GameChannel < ApplicationCable::Channel
  # what if I saved the user from the login request in the controller?
  # It persists, so I don't need cookies to find them later.  probably not a huge
  # performance improvement, but does make this simpler.

  def subscribed
    stream_from "game#{current_user.game_id}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
    ActionCable.server.broadcast("game#{current_user.game_id}", forfeit: current_user.username)
  end

  def play(data)
    ActionCable.server.broadcast("game#{current_user.game_id}", message: data)
  end
end
