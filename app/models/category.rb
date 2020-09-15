class Category < ApplicationRecord
  has_many :templates, dependent: :destroy
end
