class UserproductsSerializer < ActiveModel::Serializer
  attributes :id, :is_in_cart

  belongs_to :product
end
