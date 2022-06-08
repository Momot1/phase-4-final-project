class User < ApplicationRecord
    has_secure_password
    validates :email, :username, uniqueness: true
    validates :email, :username, :name, :password, presence: true

    has_many :reviews, dependent: :destroy
    has_many :userproducts, dependent: :destroy 
    has_many :products, through: :userproducts

    def self.most_products
        self.joins(:userproducts).group("users.id").order("COUNT(userproducts.id) DESC").limit(1)
    end

    def orders
        orders = []
        self.userproducts.where(is_in_cart: false).each do |product|
            orders.push(product: product.product)
        end

        orders
    end

    def cart
        cart = []
        total = 0

        self.userproducts.where(is_in_cart: true).each do |product|
            cart.push(id: product.id, product: product.product)
            total += product.product.price
        end

        {total: total, cart: cart}
    end
end
