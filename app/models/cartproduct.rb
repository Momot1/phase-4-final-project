class Cartproduct < ApplicationRecord
    belongs_to :cart
    belongs_to :product


    def self.create props
        super(props)

        Cart.update_total
    end
end
