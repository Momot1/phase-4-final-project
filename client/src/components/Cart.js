import { Link } from "react-router-dom"
import { addZeros } from "./functions"
import "./css/cart.css"


function Cart({user, setUser}){

    // Removes an item from the cart
    function removeFromCart(id){
        fetch(`/removefromcart/${id}`, {
            method: "DELETE", 
        })
        .then(resp => resp.json())
        .then(setUser)
    }

    // If there is no user logged in, returns an empty page. This is for error handling
    if(!user){
        return <></>
    }

    // If the user's cart is empty, it tells them their cart is empty
    if(user.cart.cart.length === 0){
        return <div><h3 className="text-capitalize text-center" id="cart-h3">Hi {user.name}, You're cart is empty.</h3></div>
    }

    // Creates elements for each cart item
    const productElements = user.cart.cart.map(product => 
        <div key={product.id} className="border d-flex flex-row mb-3">
            <div className="p-2 border width-max-content">
                <img src={product.product.image_url} className="cart-img" alt={product.product.name}/>
            </div>
            <div className="p-2">
                <Link className="text-uppercase cart-link" to={`/products/${product.product.id}`}>{product.product.name} - ${addZeros(product.product.price)}</Link> 
                <p className="cart-p">{product.product.description}<button className="btn btn-light btn-lg" onClick={() => removeFromCart(product.id)}>Remove From Cart</button></p>
            </div>
                                                                
        </div>
    )

    return (
        <div className="mx-auto w-75" id="margin-small">
            {productElements}
            <h4 className="text-center cart-h4">Cart total: ${parseFloat(addZeros(user.cart.total)).toFixed(2)}</h4>
        </div>
    )
}

export default Cart