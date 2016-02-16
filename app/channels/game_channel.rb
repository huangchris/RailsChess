class GameChannel < ApplicationCable::Channel
  def subscribed
    current_user.reload
    stream_from "game#{current_user.game_id}"
    @game = current_user.game
    @chess = ChessGame.new #this won't be shared between the channels for the two users,
    # unless is pulls from a db
    # so, back to my original idea of validation by opponent's client.
    @opponent = @game.players.select {|player| player != current_user}.first
    ActionCable.server.broadcast("game#{current_user.game_id}",
      action: 'login',
      players: [@game.first_player.username, @game.second_player.username])
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    stop_all_streams
    ActionCable.server.broadcast("game#{current_user.game_id}",
      action: 'forfeit',
      message: current_user.username)
  end

  def play(data)
    if @chess.valid_move?(data) && current_player?
      # @chess.update(data)
      @game.update(current_player_id: @opponent.id)
      ActionCable.server.broadcast("game#{current_user.game_id}",
        action: 'play',
        message: data)
    else
      ActionCable.server.broadcast("game#{current_user.game_id}",
        action: 'Not your turn')
    end
  end

  private
  def current_player?
    @game.reload.current_player == current_user
  end
end
