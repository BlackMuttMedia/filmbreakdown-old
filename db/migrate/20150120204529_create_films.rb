class CreateFilms < ActiveRecord::Migration
  def change
    create_table :films do |t|
      t.integer :tmdb_id

      t.timestamps null: false
    end
  end
end
