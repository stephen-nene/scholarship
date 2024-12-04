module Auth
  class SessionsController < ApplicationController
    before_action :authorize_request, only: [:me, :logout]

    # POST /auth/register
    def register
      user = User.new(user_params)
      if user.save
        # user.update(reset_token: SecureRandom.base58(24), reset_expiry: 1.day.from_now)
        user.generate_token(1.day.from_now)
        UserMailer.welcome_email(user).deliver_now
        render json: { message: "User registered successfully. Please check your email to activate your account." }, status: :created
      else
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    # PATCH /auth/activate/:token
    def activate
      user = User.find_by(reset_token: params[:token])

      if user && user.reset_expiry > Time.now
        user.update(status: :active, reset_token: nil, reset_expiry: nil)
        render json: { message: "Account activated successfully!" }, status: :ok
      else
        render json: { error: "Invalid or expired activation token." }, status: :unprocessable_entity
      end
    end

    # POST /auth/login
    def login
      user = User.find_by(email: params[:email])

      if user.nil?
        render json: { error: "No user is associated with that Email" }, status: :unauthorized
      elsif !user.authenticate(params[:password])
        render json: { error: "Wrong password" }, status: :unauthorized
      else
        session[:user_id] = user.id
        render json: { user: UserSerializer.new(user), message: "Login successful" }, status: :ok
      end
    end

    # POST /auth/forgot_password
    def forgot_password
      user = User.find_by(email: params[:email])
      if user
        # user.generate_reset_token
        # Send reset token via email (setup mailer)
        render json: { message: "Reset instructions sent to your email" }, status: :ok
      else
        render json: { error: "Email not found" }, status: :not_found
      end
    end

    # PUT /auth/reset_password
    def reset_password
      user = User.find_by(reset_token: params[:token])
      if user && user.reset_expiry > Time.now
        if user.update(password: params[:password])
          user.clear_reset_token
          render json: { message: "Password reset successfully" }, status: :ok
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      else
        render json: { error: "Invalid or expired token" }, status: :unauthorized
      end
    end

    # GET /auth/me
    def me
      render json: @current_user, status: :ok
    end

    # DELETE /auth/logout
    def logout
      reset_session
      render json: { message: "Logged out successfully" }, status: :ok
    end

    private

    def user_params
      params.require(:user).permit(
        :first_name, :middle_name, :last_name, :email, :username, :profile_pic, :password, :password_confirmation, :phonenumber,
        addresses: {},
      )
    end

    def authorize_request
      if session[:user_id]
        @current_user = User.find_by(id: session[:user_id])

        # Check if the session has expired (assuming you set expiry when logging in)
        if session[:expires_at] && session[:expires_at] < Time.current
          render json: { error: "Unauthorized: Session expired" }, status: :unauthorized
        elsif @current_user.nil?
          render json: { error: "Unauthorized: User not found" }, status: :unauthorized
        end
      else
        render json: { error: "Unauthorized: No session cookie" }, status: :unauthorized
      end
    end
  end
end
