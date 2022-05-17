class DropCartproducts < ActiveRecord::Migration[6.1]
  def change
    drop_table :cartproducts
  end
end
