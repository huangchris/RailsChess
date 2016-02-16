class FixGameIdType < ActiveRecord::Migration[5.0]
  def change
    change_table :users do |t|
      t.change :game_id, 'integer USING CAST(game_id AS integer)'
    end
  end
end
