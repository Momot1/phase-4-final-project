class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :purchase_link, :image_url, :users
end
