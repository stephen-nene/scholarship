class Meeting < ApplicationRecord
  belongs_to :admin, -> { where(role: :admin) }, class_name: "User", optional: true
  belongs_to :scholarship, optional: true

  enum :status, { pending: 0, approved: 1, completed: 2, cancelled: 3 }
  enum :meet_type, { group_meeting: 0, personal_meeting: 1 }

  # Associations
  # A meeting can have many participants (for group meetings)
  has_many :meeting_participants
  has_many :participants, through: :meeting_participants, source: :user
end
