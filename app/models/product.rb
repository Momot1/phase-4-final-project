class Product < ApplicationRecord
    validates :name, :price, :description, presence: true

    has_many :reviews, dependent: :destroy
    has_many :userproducts, dependent: :destroy
    has_many :users, through: :userproducts

    def sold
        self.userproducts.where(is_in_cart: false).count
    end
end
