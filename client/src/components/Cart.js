import { Link } from "react-router-dom"
import { addZeros } from "./functions"
import { useEffect, useState } from "react"


function Cart({products}){
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch("/getcart")
        .then(resp => resp.json())
        .then(setCart)
    }, [])

    function removeFromCart(){
        fetch() //remove correct item from cart
        .then(resp => resp.json())
        .then()//filter cart 
    }

    const filteredProducts = products.filter(product => {if(cart.includes(`${product.id}`)){return product}else{return null}})

    const productElements = filteredProducts.map(product => <div key={product.id}><Link to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> <p>{product.description} <button onClick={removeFromCart}>Remove from cart</button></p></div>)

    return (
        <div>
            {productElements}
            <h5>Cart total: $</h5>
        </div>
    )
}

export default Cart