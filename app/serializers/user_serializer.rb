class UserSerializer < ActiveModel::Serializer
  attributes  :username, :email, :birthdate, :name, :created_at, :cart

  # has_many :products
  # has_many :reviews

  def cart
    cart = []
    user = User.find(self.object.id)
    user.cart.cartproducts.each do |product|
      cart.push({id: product.id, product: product.product})
    end
    cart
  end
end
