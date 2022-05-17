class CartproductsController < ApplicationController
    def create
        Cartproduct.create(product_id: params[:product_id], cart_id: session[:user_id])
        render json: {message: "Added to cart"}
    end


    def destroy
        product = Cartproduct.find(params[:id])
        render json: product
    end
end
