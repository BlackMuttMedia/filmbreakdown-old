class CreateElementTypes < ActiveRecord::Migration
  def change
    create_table :element_types do |t|
      t.string :title
      t.string :description

      t.timestamps null: false
    end
  end
end
