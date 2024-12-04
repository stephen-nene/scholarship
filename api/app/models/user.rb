class User < ApplicationRecord
  enum :role, { user: 0, provider: 1, admin: 2 }
  enum :status, { pending: 0, active: 1, suspended: 2 }

  # has_secure_token :reset_token
  has_secure_password

  # Associations
  # Admin can initiate many meetings
  has_many :meetings, foreign_key: :admin_id

  # User can participate in many meetings (for group meetings)
  has_many :meeting_participants
  has_many :meetings, through: :meeting_participants

  before_save { self.email = email.downcase }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }

  # creates a new reset token
  def generate_reset_token
    self.reset_token = SecureRandom.base58(24)
    self.reset_expiry = 10.minutes.from_now
    save!
  end

  # deletes a used reset token
  def clear_reset_token
    self.reset_token = nil
    self.reset_expiry = nil
    save!
  end
end
