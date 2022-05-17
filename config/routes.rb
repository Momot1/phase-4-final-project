Rails.application.routes.draw do

    resources :reviews, only: [:create, :update, :destroy]
    resources :products
    resources :cartproducts, only: [:create, :destroy]

    # Login/logout routes
    post "/login", to: "sessions#create"
    delete "/logout", to: "sessions#destroy"

    # Signup and crab user info routes
    post "/signup", to: "users#create"
    get "/me", to: "users#show"

    patch "/changepassword", to: "users#update_password"

    post "/addtocart", to: "users#add_to_cart"
    delete "/removefromcart/:id", to: "users#remove_from_cart"
  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
