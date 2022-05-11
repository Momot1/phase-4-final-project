class SessionsController < ApplicationController
    skip_before_action :authorized

    def create
        user = User.find_by(username: params[:username])
        if user&.authenticate(params[:password])
            session[:user_id] = user.id
            render json: user
        else
            render json: {error: "Invalid username/password"}, status: :unauthorized
        end
    end

    def destroy
        session.delete(:user_id)
        render json: nil
    end
end
