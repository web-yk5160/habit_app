class AddGoalToHabits < ActiveRecord::Migration[6.0]
  def change
    add_column :habits, :done, :integer
    add_column :habits, :last_done_date, :datetime
    add_column :habits, :goal, :integer
    add_column :habits, :complete_days, :integer
    add_column :habits, :set_continue_days, :integer
  end
end
