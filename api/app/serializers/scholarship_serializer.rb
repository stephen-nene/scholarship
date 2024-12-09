class ScholarshipSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :eligibility_criteria, :funding_amount, :deadline, :status, :contact_email, :application_link, :country, :level,  :funding_type, :target_audiences, :majors

  # Add this method to serialize the major_name
  def majors
    object.major_name 
  end
  def target_audiences
    object.audiences 
  end
end
