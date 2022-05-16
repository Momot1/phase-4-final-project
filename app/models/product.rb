class Product < ApplicationRecord
    has_many :reviews
    has_many :userproducts
    has_many :users, through: :userproducts
    has_many :cartproducts
    has_many :carts, through: :cartproducts
end
