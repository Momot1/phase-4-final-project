class DeleteCartFromUsers < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :cart
  end
end
