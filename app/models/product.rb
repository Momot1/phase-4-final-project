class Product < ApplicationRecord
    validates :name, :price, :description, presence: true

    has_many :reviews, dependent: :destroy
    has_many :userproducts, dependent: :destroy
    has_many :users, through: :userproducts
end
