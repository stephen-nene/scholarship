class CreateMeetings < ActiveRecord::Migration[8.0]
  def change
    create_table :meetings do |t|
      t.references :admin, null: true, foreign_key: { to_table: :users }
      t.references :scholarship, null: false, foreign_key: true
      t.string :title, null: false
      t.string :description
      t.integer :status, default: 0, null: false
      t.datetime :date
      t.integer :meet_type, null: false, default: 1
      t.text :meeting_link

      t.timestamps
    end
    add_index :meetings, :status
    add_index :meetings, :meet_type
  end
end
