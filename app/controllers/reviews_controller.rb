class ReviewsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :rescue_not_found

    def create
        review = User.find(session[:user_id]).reviews.create(reviews_params)
        render json: review, status: :created
    end

    def destroy
        review = Review.find(params[:id])
        
        review.destroy
        render json: {}
    end

    def update
        review = Review.find(params[:id])
        reivew.update(reviews_params)
        render json: reivew
    end

    private

    def rescue_not_found
        render json: {error: "Review not found"}, status: :not_found
    end

    def reviews_params
        params.permit(:product_id, :description, :rating)
    end
end
