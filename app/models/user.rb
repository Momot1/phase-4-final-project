class User < ApplicationRecord
    has_secure_password
    validates :email, :username, uniqueness: true

    has_many :reviews
    has_many :userproducts
    has_many :products, through: :userproducts

    def self.create props
        super(props)

        User.find_by(username: props[:username]).create_cart
    end
end
