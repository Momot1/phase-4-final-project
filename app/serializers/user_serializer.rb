class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :birthdate, :name
end
