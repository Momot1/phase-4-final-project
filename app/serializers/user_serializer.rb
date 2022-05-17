class UserSerializer < ActiveModel::Serializer
  attributes  :id, :username, :email, :birthdate, :name, :created_at, :cart

  has_many :products
  has_many :reviews

  def cart
    cart = []
    total = 0
    user = User.find(self.object.id)
    products = user.userproducts.where(is_in_cart: true)

    products.each do |product|
      cart.push(id: product.id, product: product.product)
      total += product.product.price
    end
    {total: total, cart: cart}
  end
end
