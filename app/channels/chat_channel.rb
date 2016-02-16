class ChatChannel < ApplicationCable::Channel
  # what if I saved the user from the login request in the controller?
  # It persists, so I don't need cookies to find them later.  probably not a huge
  # performance improvement, but does make this simpler.

  def subscribed
    stream_from 'messages'
    stream_from "user#{current_user.username}"
    current_user.update(online: true)
    ActionCable.server.broadcast('messages', action: 'login',
      message: current_user.username)
      update_user_list #was in `connected` on client side, but doesn't get called after 1st time for some reason.
      # users: users) # only send the new user.
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    logout
    stop_all_streams # really ought to be a `stop_stream "#{stream_name}"`
    # on the other hand, this only applies to this channel.
  end

  def speak(data)
    ActionCable.server.broadcast('messages', action: 'speak', message:data)
  end

  def challenge(data)
    ActionCable.server.broadcast("user#{data['recipient']}", action: 'challenge', message:data)
  end

  def challenge_response(data)
    # if users agree, set a gameID for both of them. Will need to set up a stream when they move on.
    # use this challenge_response broadcast to make the respondent switch pages as well.
    if data['response']
      users_names = [data['users']['sender'], data['users']['recipient']]
      game = Game.make(User.where(username: users_names).shuffle)
      ActionCable.server.broadcast("user#{data['users']['sender']}",
        action: 'challenge_response',
        message:data)
      ActionCable.server.broadcast("user#{data['users']['recipient']}",
        action: 'challenge_response',
        message:data)
    else
      ActionCable.server.broadcast("user#{data['users']['sender']}",
        action: 'challenge_response',
        message:data)
    end
  end

  def logout
    current_user.update(online: false)
    # this too
    ActionCable.server.broadcast('messages', action: 'logout', message: current_user.username)
  end

  def update_user_list
    users = User.where(online: true).pluck(:username)
    ActionCable.server.broadcast('messages', action: 'users', message: users)
  end
end
