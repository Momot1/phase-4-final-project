class UsersController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :rescue_not_found
    skip_before_action :authorized, only: [:create, :get_most_products]

    def create
        user = User.create(username: params[:username].downcase.gsub(/\s+/, ""), email: params[:email].downcase.gsub(/\s+/, ""), birthdate: params[:birthdate], name: params[:name], password: params[:password], password_confirmation: params[:password_confirmation])
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
 
    def update_password
        user = User.find(session[:user_id])

        if(user&.authenticate(params[:old_password]))
            user.update!(user_update_params)
            if user.valid?
                render json: user
            end
        else
            user.errors.add(:base, "Incorrect old password")
            if(params[:password_confirmation] != params[:password])
                user.errors.add(:base, "Password confirmation doesn't match Password")
            end

            render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
        end

    rescue ActiveRecord::RecordInvalid => invalid
        render json: {errors: user.errors.full_messages}, status: :unprocessable_entity
    end

    def get_most_products
        user = User.most_products
        render json: user
    end

    def destroy
        user = User.find(session[:user_id])
        user.destroy
        render json: {}
    end

    def add_to_cart
        user = User.find(session[:user_id])
        user.userproducts.create(product_id: params[:product_id], is_in_cart: true)
        render json: user
    end

    def remove_from_cart
        user = User.find(session[:user_id])
        product = user.userproducts.find(params[:id])
        product.destroy
        render json: user
    end

    private

    def user_create_params
        params.permit(:email, :birthdate, :name, :password, :password_confirmation)
    end

    def user_update_params
        params.permit(:password, :password_confirmation)
    end

    def rescue_not_found
        render json: {error: "Not authorized. Please login"}, status: :unauthorized
    end
end
