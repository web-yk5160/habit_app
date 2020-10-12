class CreateHabitTracks < ActiveRecord::Migration[6.0]
  def change
    create_table :habit_tracks do |t|
      t.references :habit, foreign_key: true
      t.date :start_date
      t.datetime :last_done_date
      t.integer :status
      t.integer :done
      t.integer :goal
      t.datetime :due_date
      t.datetime :habit_date

      t.timestamps
    end
  end
end
