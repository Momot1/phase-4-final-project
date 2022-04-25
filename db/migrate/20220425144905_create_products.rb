class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.string :name
      t.integer :price
      t.string :purchase_link
      t.string :image_url
      t.timestamps
    end
  end
end
