class RemoveImdbTitleIdFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :imdb_title_id, :integer
  end
end
