class ScholarshipSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :eligibility_criteria, :funding_amount, :deadline, :status, :contact_email, :application_link, :country, :level, :major
end
