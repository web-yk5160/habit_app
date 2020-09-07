class Habit < ApplicationRecord
  belongs_to :user
  validates :name, :start_date, :category, presence: true
end
