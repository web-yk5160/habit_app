class Habit < ApplicationRecord
  belongs_to :user
  validates :name, presence: true
  has_many :habit_tracks, dependent: :destroy
  accepts_nested_attributes_for :habit_tracks
end
