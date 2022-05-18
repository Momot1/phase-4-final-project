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

    if(user.cart.cart.length === 0){
        return <h3 style={{textAlign: "center", padding: "10px"}}>Hi {user.name}, You're cart is empty.</h3>
    }


    const productElements = user.cart.cart.map(product => <div key={product.id}><Link style={{color: "#3a4187", padding: "5px"}} to={`/products/${product.product.id}`}>{product.product.name} - ${addZeros(product.product.price)}</Link> <p>{product.product.description}<button className="btn btn-light" onClick={() => removeFromCart(product.id)}>Remove From Cart</button></p></div>)

    return (
        <div className="mx-auto" style={{textAlign: "center", width:"75%"}}>
            {productElements}
            <h5>Cart total: ${addZeros(user.cart.total)}</h5>
        </div>
    )
}

export default Cart