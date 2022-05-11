class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :description, :rating
  belongs_to :product
  belongs_to :user
end
 