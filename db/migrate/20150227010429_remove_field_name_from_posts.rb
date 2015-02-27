class RemoveFieldNameFromPosts < ActiveRecord::Migration
  def change
    remove_column :posts, :genre_id, :integer
  end
end
