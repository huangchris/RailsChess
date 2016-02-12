class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'messages'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak(data)
    ActionCable.server.broadcast('messages', action: 'speak', message:(data['message']))
  end

  def login(data)
    user = User.find_by(username: data['name']) || User.create(username: data['name'])
    user.online = true
    if user.changed?
      user.save
    # this can be done as an asynchronous job
      ActionCable.server.broadcast('messages', action: 'login',
                            message: User.where(online: true).pluck(:username))
  end

  def logout(data)
    user = User.find_by(username: data['name'])
    user.update(online: false)
    # this too
    ActionCable.server.broadcast('messages', action: 'logout', message: user.username)


  end
end
