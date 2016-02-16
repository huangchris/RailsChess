class Game < ApplicationRecord
  belongs_to :first_player,
    class_name: :User,
    primary_key: :id,
    foreign_key: :first_player_id

  belongs_to :second_player,
    class_name: :User,
    primary_key: :id,
    foreign_key: :second_player_id

  belongs_to :current_player,
    class_name: :User,
    primary_key: :id,
    foreign_key: :current_player_id

  def players
    @players ||= User.where(id: [first_player_id, second_player_id])
  end

  def self.make(user_list)
    game = Game.create(first_player_id: user_list.first.id,
                second_player_id: user_list.last.id,
                current_player_id: user_list.first.id)
    user_list.each{|user| user.update(game_id: game.id)} #there's a way to do this automagically
    game
  end
end
