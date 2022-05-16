class AddTotalToCart < ActiveRecord::Migration[6.1]
  def change
    add_column :carts, :total, :float, default: 0
  end
end
