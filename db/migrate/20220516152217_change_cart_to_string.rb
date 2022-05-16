class ChangeCartToString < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :cart, :string, array: true, default: []
  end
end
