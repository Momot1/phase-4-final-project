class DropCarts < ActiveRecord::Migration[6.1]
  def change
    drop_table :carts
  end
end
