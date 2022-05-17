class CartsController < ApplicationController

    def add_to_cart
        Cartproduct.create(product_id: params[:product_id], cart_id: session[:user_id])
        render json: {message: "Added to cart"}
    end

    def remove_from_cart
        user = User.find(session[:user_id])
        product = user.cart.products.where(product_id: params[:product_id])
        product.destroy

        render json: user
    end
end
