class ProductsController < ApplicationController
    rescue_from ActiveRecord::RecordNotFound, with: :rescue_not_found
    skip_before_action :authorized, only: [:index, :show]

    def index
        render json: Product.all.order(:id)
    end

    def show
        product = Product.find(params[:id])
        render json: product, serializer: ProductShowSerializer
    end

    def create
        product = Product.create(product_params)
        render json: product, status: :created
    end

    def destroy
        product = Product.find(params[:id])
        product.destroy
        render json: {}
    end

    def update
        product = Product.find(params[:id])
        product.update(product_params)
        render json: product, status: :accepted, serializer: ProductShowSerializer
    end

    def purchase
        user = User.find(session[:user_id])
        products = user.userproducts.where(is_in_cart: true)

        products.each do |product|
            product.is_in_cart = false
            product.save
        end

        render json: user, serializer: UserSerializer
    end

    def orderd_products
        products = Product.all.order(:name)
        render json: products
    end

    private

    def product_params
        params.permit(:name, :price, :image_url, :description, :stock_amount)
    end

    def rescue_not_found
        render json: {error: "Product not found"}, status: :not_found
    end

end
