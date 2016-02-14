# Be sure to restart your server when you modify this file. Action Cable runs in an EventMachine loop that does not support auto reloading.
module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def current_user
      User.find_by(session_token: cookies.signed[:session_token])
    end
  end
end
