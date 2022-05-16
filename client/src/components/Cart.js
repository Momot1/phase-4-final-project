import { Link } from "react-router-dom"
import { addZeros } from "./functions"


function Cart({user}){

    // console.log(user.cart.products)


    function removeFromCart(){
        fetch() //remove correct item from cart
        .then(resp => resp.json())
        .then()//filter user
    }

    if(!user){
        return <></>
    }

    const productElements = user.cart.products.map(product => <div key={product.id}><Link to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> <p>{product.description}</p></div>)

    return (
        <div>
            {productElements}
            <h5>Cart total: ${addZeros(user.cart.total)}</h5>
        </div>
    )
}

export default Cart