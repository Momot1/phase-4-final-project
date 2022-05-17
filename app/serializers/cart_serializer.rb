class CartSerializer < ActiveModel::Serializer
  attributes :id, :total, :cartproducts
  # has_many :products
  # has_many :cartproducts, serializer: CartproductsSerializer
end
