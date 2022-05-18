class RemovePurchaseLinkFromProducts < ActiveRecord::Migration[6.1]
  def change
    remove_column :products, :purchase_link
  end
end
