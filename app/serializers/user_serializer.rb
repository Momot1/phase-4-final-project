class UserSerializer < ActiveModel::Serializer
  attributes  :username, :email, :birthdate, :name
  has_many :products
  has_many :reviews
end
