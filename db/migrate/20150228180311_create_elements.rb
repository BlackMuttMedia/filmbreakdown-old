class CreateElements < ActiveRecord::Migration
  def change
    create_table :elements do |t|
      t.string :title
      t.string :description
      t.integer :element_type_id

      t.timestamps null: false
    end
  end
end
