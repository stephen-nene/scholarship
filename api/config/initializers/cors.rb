# Be sure to restart your server when you modify this file.

# Avoid CORS issues when API is called from the frontend app.
# Handle Cross-Origin Resource Sharing (CORS) in order to accept cross-origin Ajax requests.

# Read more: https://github.com/cyu/rack-cors

Rails.application.config.middleware.insert_before 0, Rack::Cors do
  shared_options = {
    resource: "*",
    headers: :any,
    methods: [:get, :post, :put, :patch, :delete, :options, :head],
    credentials: true
  }

  allowed_origins = [
    "http://localhost:5173",
    "https://scholarship-06st.onrender.com",
  ]

  allow do
    origins(*allowed_origins)
    shared_options.each { |key, value| send(key, value) }
  end
end
