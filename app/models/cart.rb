class Cart < ApplicationRecord
    belongs_to :user
    has_many :cartproducts
    has_many :products, through: :cartproducts
end
