class AddAccountIdToPosts < ActiveRecord::Migration[7.1]
  def change
    add_reference :posts, :account, null: false, foreign_key: true
  end
end
