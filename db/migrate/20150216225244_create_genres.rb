class CreateGenres < ActiveRecord::Migration
  def change
    create_table :genres do |t|
      t.string :name
      t.text :description
      t.integer :tmdb_id

      t.timestamps null: false
    end
  end
end
