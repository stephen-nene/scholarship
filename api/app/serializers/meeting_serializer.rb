class MeetingSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :status, :date, :meet_type, :meeting_link

  has_one :scholarship, if: :include_associations?
  has_one :admin, if: :include_associations?
  has_many :participants, through: :meeting_participants, if: :include_associations?

  # Method to check if associations should be included
  def include_associations?
    instance_options[:include_associations]
  end

  # Custom admin serialization to return only specific fields
  def admin
    return unless object.admin
    {
      id: object.admin.id,
      username: object.admin.username,
      email: object.admin.email,
    }
  end

  def scholarship
    return unless object.scholarship
    {
      id: object.scholarship.id,
      title: object.scholarship.title,
      funding_amount: object.scholarship.funding_amount,
      contact_email: object.scholarship.contact_email,
      application_link: object.scholarship.application_link,
      level: object.scholarship.level,
      major: object.scholarship.major,
    }
  end

  # Custom participants serialization to return only specific fields
  def participants
    object.participants.map do |participant|
      {
        id: participant.id,
        username: participant.username,
        email: participant.email,
      }
    end
  end
end
