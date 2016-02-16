class AddGameTable < ActiveRecord::Migration[5.0]
  def change
    create_table :games do |t|
      t.integer :first_player_id
      t.integer :second_player_id
      t.integer :current_player_id
      t.timestamps
    end
  end
end
