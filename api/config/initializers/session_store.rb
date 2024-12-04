Rails.application.config.session_store :cookie_store, 
  key: 'testing', 
  expire_after: 10.seconds,   # Set session expiry time (30 minutes here)
  secure: Rails.env.production?,  # Ensure cookies are only sent over HTTPS in production
  httponly: true,   # Prevent client-side access to the cookie (helps prevent XSS attacks)
  same_site: :lax    # Helps prevent CSRF attacks (can be `:strict` or `:none` in some cases)


#  puts 5.minutes.from_now    
#  puts 30.seconds.from_now   
#  puts 2.days.from_now       
#  puts 3.months.from_now     
#  puts 1.year.from_now       
#  puts 1.decade.from_now    