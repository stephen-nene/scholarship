# Expanded Enums for More Comprehensive Coverage
module ScholarshipConstants
  
  # Expanded Status for More Granular Tracking
  STATUSES ||= {
    draft: 0,          # Scholarship being prepared
    active: 1,          # Open and accepting applications
    archived: 2,        # No longer active but preserved
    expired: 3,         # Past deadline
    suspended: 4,       # Temporarily paused
    closed: 5,           # Permanently closed
  }
  
  # More Comprehensive Degree Levels
  LEVELS ||= {
    certificate: 0,
    associate: 1,
    undergraduate: 2,
    postgraduate: 3,
    masters: 4,
    professional: 5,
    doctoral: 6,
    postdoctoral: 7,
  }
  
  # Expanded Major Categories
  MAJORS ||= {
    # STEM
    engineering: 0,
    computer_science: 1,
    mathematics: 2,
    physics: 3,
    chemistry: 4,
    biology: 5,
    
    # Medical Sciences
    medicine: 10,
    pharmacy: 11,
    nursing: 12,
    
    # Business & Social Sciences
    business: 20,
    economics: 21,
    accounting: 22,
    marketing: 23,
    international_relations: 24,
    
    # Humanities & Arts
    law: 30,
    psychology: 31,
    sociology: 32,
    philosophy: 33,
    arts: 34,
    
    # Other Specialized Fields
    education: 40,
    agriculture: 41,
    environmental_science: 42,
    journalism: 43,
    public_administration: 44,
  }
  
  # New: Funding Types (using strings instead of integers)
  FUNDING_TYPES ||= {
    full_scholarship: 0,
    partial_scholarship: 1,
    tuition_only: 2,
    living_expenses: 3,
    research_grant: 4,
    travel_grant: 5,
  }
  
  # New: Target Audiences
  TARGET_AUDIENCES ||= {
    general: 0,
    women: 1,
    minorities: 2,
    international_students: 3,
    low_income: 4,
    disabled: 5,
    first_generation: 6,
  }
end

class Scholarship < ApplicationRecord
  enum :status, ScholarshipConstants::STATUSES, prefix: true
  enum :level, ScholarshipConstants::LEVELS, prefix: true
  enum :funding_type, ScholarshipConstants::FUNDING_TYPES, prefix: true

  # Scopes for Advanced Querying
  scope :current, -> { where(status: :active).where("deadline >= ?", Date.current) }
  scope :by_country, ->(country) { where("country ILIKE ?", "%#{country}%") }
  scope :by_funding_range, ->(min, max) { where(funding_amount: min..max) }

  validates :description, :eligibility_criteria, :deadline, :country, :major, presence: true
  validates :title,
            presence: true,
            length: { minimum: 10, maximum: 250 }

  validates :funding_amount,
    numericality: {
      greater_than_or_equal_to: 0,
      less_than_or_equal_to: 1_000_000,
    }
  validates :contact_email,
    presence: true,
    format: {
      with: URI::MailTo::EMAIL_REGEXP,
      message: "must be a valid email address",
    }
  validates :application_link,
            format: {
              with: URI::regexp(%w(http https)),
              message: "must be a valid URL",
              allow_blank: true,
            }
  # Validations
  validates :target_audience, inclusion: { in: ScholarshipConstants::TARGET_AUDIENCES.values }
  validates :major, inclusion: { in: ScholarshipConstants::MAJORS.values }



  def major_name
    # Check if major is an array and return corresponding names for all values
    major.is_a?(Array) ? major.map { |major_id| ScholarshipConstants::MAJORS.key(major_id) } : [ScholarshipConstants::MAJORS.key(major)]
  end
  def audiences
    # Check if target audience is an array and return corresponding names for all values
    target_audience.is_a?(Array) ? target_audience.map { |audience| ScholarshipConstants::TARGET_AUDIENCES.key(audience) } : [ScholarshipConstants::TARGET_AUDIENCES.key(target_audience)]
  end

  private

  def normalize_data
    # Ensure email is lowercase
    self.contact_email = contact_email.downcase.strip if contact_email

    # Trim and normalize URL
    self.application_link = application_link.strip if application_link
  end

  # Optional: Method to generate a search-friendly text representation
  def searchable_text
    [
      title,
      parsed_description.values.join(" "),
      parsed_eligibility_criteria.values.join(" "),
    ].join(" ").downcase
  end
end
