class CreateScholarships < ActiveRecord::Migration[8.0]
  def change
    create_table :scholarships do |t|
      t.string :title
      t.json :description
      t.json :eligibility_criteria
      t.float :funding_amount
      t.datetime :deadline
      t.integer :status
      t.string :contact_email
      t.string :application_link
      t.string :country
      t.integer :level
      t.json :major
      t.integer :funding_type
      t.json :target_audience

      t.timestamps
    end

    # Add indexes for frequently queried fields
    add_index :scholarships, :status
    add_index :scholarships, :level
    add_index :scholarships, :major
    add_index :scholarships, :country
  end
end
