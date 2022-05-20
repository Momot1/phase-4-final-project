class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :rating, :user_id
  belongs_to :product
  belongs_to :user
end
 