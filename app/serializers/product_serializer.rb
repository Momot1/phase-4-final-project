class ProductSerializer < ActiveModel::Serializer
  attributes :id, :price, :purchase_link, :image_url, :users
end
