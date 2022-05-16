class CartSerializer < ActiveModel::Serializer
  attributes :id, :products, :total

  # has_many :products
end
