class CreateShots < ActiveRecord::Migration
  def change
    create_table :shots do |t|
      t.integer :imdb_title_id
      t.integer :submitted_by
      t.time :start_time
      t.time :end_time

      t.timestamps null: false
    end
  end
end
