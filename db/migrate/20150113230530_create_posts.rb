class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :content
      t.integer :user_id
      t.integer :category_id
      t.integer :imdb_title_id

      t.timestamps null: false
    end
  end
end
