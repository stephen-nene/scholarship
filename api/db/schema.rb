# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_12_03_083144) do
  create_table "meeting_participants", force: :cascade do |t|
    t.integer "meeting_id", null: false
    t.integer "user_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["meeting_id"], name: "index_meeting_participants_on_meeting_id"
    t.index ["user_id"], name: "index_meeting_participants_on_user_id"
  end

  create_table "meetings", force: :cascade do |t|
    t.integer "admin_id"
    t.integer "scholarship_id", null: false
    t.string "title", null: false
    t.string "description"
    t.integer "status", default: 0, null: false
    t.datetime "date"
    t.integer "meet_type", default: 1, null: false
    t.text "meeting_link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["admin_id"], name: "index_meetings_on_admin_id"
    t.index ["meet_type"], name: "index_meetings_on_meet_type"
    t.index ["scholarship_id"], name: "index_meetings_on_scholarship_id"
    t.index ["status"], name: "index_meetings_on_status"
  end

  create_table "scholarships", force: :cascade do |t|
    t.string "title"
    t.json "description"
    t.json "eligibility_criteria"
    t.float "funding_amount"
    t.datetime "deadline"
    t.integer "status"
    t.string "contact_email"
    t.string "application_link"
    t.string "country"
    t.integer "level"
    t.integer "major"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country"], name: "index_scholarships_on_country"
    t.index ["level"], name: "index_scholarships_on_level"
    t.index ["major"], name: "index_scholarships_on_major"
    t.index ["status"], name: "index_scholarships_on_status"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.string "middle_name"
    t.string "username"
    t.string "phonenumber"
    t.string "password_digest"
    t.string "email", null: false
    t.json "addresses"
    t.integer "role", default: 0
    t.string "profile_pic", default: "https://placehold.co/600x400"
    t.integer "status", default: 0
    t.string "token"
    t.datetime "token_expiry"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email", "username", "token"], name: "index_users_on_email_and_username_and_token", unique: true
    t.index ["role"], name: "index_users_on_role"
    t.index ["status"], name: "index_users_on_status"
  end

  add_foreign_key "meeting_participants", "meetings"
  add_foreign_key "meeting_participants", "users"
  add_foreign_key "meetings", "scholarships"
  add_foreign_key "meetings", "users", column: "admin_id"
end
