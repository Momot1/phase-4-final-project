class AddIsInCartToHeroku < ActiveRecord::Migration[6.1]
  def change
    add_column :userproducts, :is_in_cart, :boolean, default: true
  end
end
