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
  
end
