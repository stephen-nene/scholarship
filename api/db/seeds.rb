# db/seeds.rb
require "faker"

puts "🌱 Clearing existing scholarships..."
Scholarship.destroy_all  # Destroy all previous records

puts "✨ Seeding scholarships..."

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

# Faker::Quote.famous_last_words #=> "My vocabulary did this to me. Your love will let you go on…"

# Faker::Quote.jack_handey #=> "I hope life isn't a big joke, because I don't get it."

# Faker::Quote.matz #=> "You want to enjoy life, don't you? If you get your job done quickly and your job is fun, that's good isn't it? That's the purpose of life, partly. Your life is better."

# Faker::Quote.most_interesting_man_in_the_world #=> "He can speak Russian… in French"

# Faker::Quote.robin #=> "Holy Razors Edge"

# Faker::Quote.singular_siegler #=> "Texas!"

# Faker::Quote.yoda #=> "Use your feelings, Obi-Wan, and find him you will."

# Faker::Quote.mitch_hedberg # => "I like Kit-Kats, unless I'm with four or more people."
