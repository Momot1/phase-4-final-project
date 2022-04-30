class ChangeBirthdateToBeDate < ActiveRecord::Migration[6.1]
  def change
    change_column :users, :birthdate, 'date using birthdate::date'
  end
end
