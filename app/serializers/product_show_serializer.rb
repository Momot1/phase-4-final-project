class ProductShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :price, :image_url,  :description, :stock_amount

  def sales
    object.users.count
  end
  
  has_many :reviews
end
