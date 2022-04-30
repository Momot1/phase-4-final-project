class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :rescue_not_found
    skip_before_action :authorized, only: :create

    def create
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end
    end

    def show
        user = User.find(session[:user_id])

        render json: user, status: :created
    end

    private

    def user_params
        params.permit(:username, :email, :birthdate, :name, :password)
    end

    def rescue_not_found
        render json: {error: "Not authorized. Please login"}, status: :unauthorized
    end
end
