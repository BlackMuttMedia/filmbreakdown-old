class RemoveImdbTitleIdFromShots < ActiveRecord::Migration
  def change
    remove_column :shots, :imdb_title_id, :integer
  end
end
