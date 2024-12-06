class Scholarship < ApplicationRecord
  enum :status, { active: 0, archived: 1, deactivated: 3 }
  enum :level, { certificate: 0, undergraduate: 1, postgraduate: 2, masters: 3, phd: 4 }
  enum :major, { engineering: 0, medicine: 1, business: 2, law: 3 }
  validates :title, :description, :eligibility_criteria, :funding_amount, :deadline, :contact_email, :application_link, :country, :major, presence: true
end
