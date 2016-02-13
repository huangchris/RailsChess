class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
    users = User.where(online: true).pluck(:username)
    ActionCable.server.broadcast('messages', action: 'login', message: users)
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    logout
  end

  def speak(data)
    ActionCable.server.broadcast('messages', action: 'speak', message:data)
  end

  def logout(data)
    user = User.find_by(session_token: cookies.signed[:session_token])
    user.update(online: false)
    # this too
    ActionCable.server.broadcast('messages', action: 'logout', message: user.username)
  end
end
