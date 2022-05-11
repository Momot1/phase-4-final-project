class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :purchase_link, :image_url, :sales

  def sales
    object.users.count
  end
  
  has_many :reviews
end
