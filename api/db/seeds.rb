# db/seeds.rb
require "faker"

puts "🌱 Clearing existing scholarships..."
Scholarship.destroy_all  # Destroy all previous records
puts "🌱 Clearing existing meetings and participants..."
Meeting.destroy_all
MeetingParticipant.destroy_all
puts "🌱 Clearing existing users..."
User.destroy_all

puts "\n"



# Helper to create users
def create_users(role, count, start_index = 1)
  count.times do |i|
    User.create!(
      first_name: Faker::Name.first_name,
      last_name: Faker::Name.last_name,
      username: Faker::Internet.username,
      phonenumber: Faker::PhoneNumber.cell_phone,
      email: "#{role}#{start_index + i}@test.com",
      password: "assword", 
      addresses: [
        {
          street: Faker::Address.street_address,
          city: Faker::Address.city,
          state: Faker::Address.state,
          country: Faker::Address.country
        }
      ],
      role: role,
      status: User.statuses.keys.sample # Default status
    )
  end
end

puts "✨ Seeding admins... 👤"
create_users(:admin, 5)
puts "✨ Seeding providers... 👤"
create_users(:provider, 10)
puts "✨ Seeding normal users... 👤"
create_users(:user, 20)

puts "🎉 Seeding complete! #{User.count} users have been added: #{5} admins, #{10} providers, and #{20} users."

puts "\n"


puts "✨ Seeding scholarships... 🎓"

30.times do
  Scholarship.create!(
    title: Faker::Educator.course_name,
    description: {
      summary: Faker::GreekPhilosophers.quote,
      details: Array.new(rand(3..4)) {
        [Faker::Quote.matz,
         Faker::Quote.unique.most_interesting_man_in_the_world,
         Faker::Quote.jack_handey].sample
      },
      requirements: Faker::Hacker.say_something_smart,
      degree_name: Faker::Educator.degree,
    },
    eligibility_criteria: {
      age_range: "#{rand(18..30)}-#{rand(31..40)} years old",
      country_specific: Faker::Address.country,
      academic_requirements: Faker::ChuckNorris.fact,
      other_requirements: Array.new(rand(3..4)) { Faker::Quote.famous_last_words },
      additional_info: Faker::Books::Dune.quote,
      application_requirements: Faker::Books::Dune.saying,
    },
    funding_amount: Faker::Number.decimal(l_digits: 6, r_digits: 2),
    deadline: Faker::Date.forward(days: 30),
    status: Scholarship.statuses.keys.sample,
    contact_email: Faker::Internet.email,
    application_link: Faker::Internet.url,
    country: Faker::Address.country,
    level: Scholarship.levels.keys.sample,
    major: Scholarship.majors.keys.sample,
  )

  Faker::Quote.unique.clear
end

puts "🎉 Seeding complete! #{Scholarship.count} scholarships have been added."
puts "\n"

puts "✨ Seeding meetings... 🧑🏿‍🤝‍🧑🏽"

30.times do
  admin = User.where(role: :admin).sample
  scholarship = Scholarship.all.sample

  meeting = Meeting.create!(
    admin: admin, 
    scholarship: scholarship,
    title: Faker::Quote.robin,
    description: Faker::Quote.jack_handey,
    status: Meeting.statuses.keys.sample, 
    date: Faker::Time.forward(days: 30), 
    meet_type: Meeting.meet_types.keys.sample,  
    meeting_link: Faker::Internet.url, 
  )

  if meeting.meet_type == "group_meeting"
    participants = User.where.not(role: :admin).sample(6)
    participants.each do |user|
      MeetingParticipant.create!(meeting: meeting, user: user)
    end
  end
end

puts "🎉 Seeding complete! #{Meeting.count} meetings and #{MeetingParticipant.count} participants have been added."
puts "\n"


# Faker::Quote.famous_last_words #=> "My vocabulary did this to me. Your love will let you go on…"

# Faker::Quote.jack_handey #=> "I hope life isn't a big joke, because I don't get it."

# Faker::Quote.matz #=> "You want to enjoy life, don't you? If you get your job done quickly and your job is fun, that's good isn't it? That's the purpose of life, partly. Your life is better."

# Faker::Quote.most_interesting_man_in_the_world #=> "He can speak Russian… in French"

# Faker::Quote.robin #=> "Holy Razors Edge"

# Faker::Quote.singular_siegler #=> "Texas!"

# Faker::Quote.yoda #=> "Use your feelings, Obi-Wan, and find him you will."

# Faker::Quote.mitch_hedberg # => "I like Kit-Kats, unless I'm with four or more people."
