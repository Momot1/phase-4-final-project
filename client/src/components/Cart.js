import { Link } from "react-router-dom"
import { addZeros } from "./functions"


function Cart({user, setUser}){

    // console.log(user.cart.products)


    function removeFromCart(id){
        // const product = user.cart.products.filter(product => product.id === id)

        console.log(id)


        fetch(`/removefromcart/${id}`, {
            method: "DELETE", 
        }) //remove correct item from cart
        .then(resp => resp.json())
        .then(setUser)//filter user
    }

    if(!user){
        return <></>
    }

    console.log(user.cart)

    const productElements = user.cart.cart.map(product => <div key={product.id}><Link to={`/products/${product.product.id}`}>{product.product.name} - ${addZeros(product.product.price)}</Link> <p>{product.product.description}<button onClick={() => removeFromCart(product.id)}>Remove From Cart</button></p></div>)

    return (
        <div>
            {productElements}
            <h5>Cart total: ${addZeros(user.cart.total)}</h5>
        </div>
    )
}

export default Cart