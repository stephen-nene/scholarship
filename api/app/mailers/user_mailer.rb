class UserMailer < ApplicationMailer
  def welcome_email(user,frontend_url)
    @user = user
    @activation_token = user.token
    @activation_url = "#{frontend_url}/activate/#{@activation_token}"
    mail(to: @user.email, subject: "Welcome to Authh")
  end

  def change_password(user)
    @url = "https://ne-auth.vercel.app/forgot"
    @user = user
    mail(to: @user.email, subject: "Security risk for your account")
  end

  def reset_password_email(user, frontend_url)
    @user = user
    @url = "#{frontend_url}/reset/#{@user.token}"
    @expiry_time = (@user.token_expiry - Time.current).to_i / 60 # Calculate expiry in minutes
    mail(to: @user.email, subject: "Password Reset")
  end
end
