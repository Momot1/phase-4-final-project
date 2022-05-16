class AddCartToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :cart, :text, array: true, default: []
  end
end
