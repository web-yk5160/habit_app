class CreateHabits < ActiveRecord::Migration[6.0]
  def change
    create_table :habits do |t|
      t.references :user, foreign_key: true
      t.text :name
      t.date :start_date
      t.string :note
      t.integer :time_period
      t.numeric :daily_count
      t.numeric :weekly_count
      t.numeric :monthly_count

      t.timestamps
    end
  end
end
