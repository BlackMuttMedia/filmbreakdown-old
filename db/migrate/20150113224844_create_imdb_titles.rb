class CreateImdbTitles < ActiveRecord::Migration
  def change
    create_table :imdb_titles do |t|
      t.string :titleKey
      t.string :name
      t.integer :year

      t.timestamps null: false
    end
  end
end
