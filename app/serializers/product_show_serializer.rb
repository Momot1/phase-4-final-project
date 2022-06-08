class ProductShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image_url,  :description, :stock_amount, :sold
  
  has_many :reviews
end
