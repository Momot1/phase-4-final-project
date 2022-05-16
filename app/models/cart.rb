class Cart < ApplicationRecord
    belongs_to :user
    has_many :cartproducts
    has_many :products, through: :cartproducts

    def self.update_total
        Cart.all.each do |cart|
            cart.total = cart.products.sum(:price)
            cart.save
        end

    end
end
