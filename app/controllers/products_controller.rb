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
        render json: {}, status: :no_content
    end

    def update
        product = Product.find(params[:id])
        product.update(product_params)
        render json: product, status: :accepted
    end

    private

    def product_params
        params.permit(:name, :price, :purchase_link, :image_url)
    end

    def rescue_not_found
        render json: {error: "Product not found"}, status: :not_found
    end

end
