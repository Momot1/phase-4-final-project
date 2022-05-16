class CreateCartproducts < ActiveRecord::Migration[6.1]
  def change
    create_table :cartproducts do |t|
      t.integer :product_id
      t.integer :cart_id
      t.timestamps
    end
  end
end
