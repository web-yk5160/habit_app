class HabitTrack < ApplicationRecord
  belongs_to :habit, optional: true
end
