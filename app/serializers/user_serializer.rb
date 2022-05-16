class UserSerializer < ActiveModel::Serializer
  attributes  :username, :email, :birthdate, :name, :created_at

  has_many :products
  has_many :reviews
  has_one :cart
end
