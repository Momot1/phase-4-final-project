class UserSerializer < ActiveModel::Serializer
  attributes  :id, :username, :email, :birthdate, :name, :created_at, :cart, :is_admin, :orders

  # has_many :products, include: [:is_in_cart]
  # has_many :userproducts, serializer: UserproductsSerializer
  has_many :reviews
end
