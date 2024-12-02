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
      t.integer :major

      t.timestamps
    end

    # Add indexes for frequently queried fields
    add_index :scholarships, :status
    add_index :scholarships, :level
    add_index :scholarships, :major
    add_index :scholarships, :country
  end
end
