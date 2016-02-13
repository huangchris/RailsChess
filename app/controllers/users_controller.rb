class UsersController < ApplicationController
  def create
    user = User.find_by(username: params[:name]) || User.create(username: params[:name])
    user.login
    cookies.signed[:session_token] = user.session_token
    # render nothing: true #deprecated
    head :ok #sends a header only response, with a 200 status
  end
end
