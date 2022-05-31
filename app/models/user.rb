class User < ApplicationRecord
    has_secure_password
    validates :email, :username, uniqueness: true
    validates :email, :username, :name, :password, presence: true

    has_many :reviews, dependent: :destroy
    has_many :userproducts, dependent: :destroy 
    has_many :products, through: :userproducts
end
