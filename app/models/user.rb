# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  username   :string
#  game_id    :string
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  online     :boolean
#

class User < ApplicationRecord
  def game # I don't know why belongs_to is requiring it to exist
    Game.find(game_id)
  end

  def login
    update(session_token: SecureRandom.urlsafe_base64, online: true)
  end

end
