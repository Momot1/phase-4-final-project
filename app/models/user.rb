class User < ApplicationRecord
    has_secure_password
    validates :email, :username, uniqueness: true

    has_many :reviews
    has_many :userproducts
    has_many :products, through: :userproducts
    has_one :cart
end
