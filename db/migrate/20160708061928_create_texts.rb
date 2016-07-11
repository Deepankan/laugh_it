class CreateTexts < ActiveRecord::Migration
  def change
    create_table :texts do |t|
      t.integer :type_id	
      t.text :content, :limit => 16777215
      t.timestamps null: false
    end
  end
end
