class ChatChannel < ApplicationCable::Channel
  # what if I saved the user from the login request in the controller?
  # It persists, so I don't need cookies to find them later.  probably not a huge
  # performance improvement, but does make this simpler.

  def subscribed
    stream_from 'messages'
    # users = User.where(online: true).pluck(:username)
    ActionCable.server.broadcast('messages', action: 'login',
      message: current_user.username)
      # update_user_list
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
