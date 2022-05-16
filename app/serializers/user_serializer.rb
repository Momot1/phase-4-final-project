class UserSerializer < ActiveModel::Serializer
  attributes  :username, :email, :birthdate, :name, :cart
  has_many :products
  has_many :reviews
end
