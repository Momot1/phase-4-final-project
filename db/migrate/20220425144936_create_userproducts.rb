class CreateUserproducts < ActiveRecord::Migration[6.1]
  def change
    create_table :userproducts do |t|
      t.integer :user_id
      t.integer :product_id
      t.timestamps
    end
  end
end
