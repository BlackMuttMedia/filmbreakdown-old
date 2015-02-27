class CreateJoinTable < ActiveRecord::Migration
  def change
    create_join_table :genres, :posts do |t|
      # t.index [:genre_id, :post_id]
      # t.index [:post_id, :genre_id]
    end
  end
end
