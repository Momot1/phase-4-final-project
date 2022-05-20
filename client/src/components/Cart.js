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
        return <h3 className="text-capitalize" style={{textAlign: "center", padding: "10px"}}>Hi {user.name}, You're cart is empty.</h3>
    }


    const productElements = user.cart.cart.map(product => 
        <div key={product.id} className="border d-flex flex-row mb-3">
            <div style={{width: "max-content"}} className="p-2 border">
                <img src={product.product.image_url} style={{maxWidth: "200px"}} alt={product.product.name}/>
            </div>
            <div className="p-2">
                <Link style={{color: "#3a4187", padding: "5px", fontSize: "1.3em"}} className="text-uppercase" to={`/products/${product.product.id}`}>{product.product.name} - ${addZeros(product.product.price)}</Link> 
                <p style={{padding: "5px", fontSize: "1.1em"}}>{product.product.description}<button className="btn btn-light btn-lg" onClick={() => removeFromCart(product.id)}>Remove From Cart</button></p>
            </div>
                                                                
        </div>
    )

    return (
        <div className="mx-auto w-75" style={{ margin: "0.2%"}}>
            {productElements}
            <h4 style={{textAlign: "center"}}>Cart total: ${addZeros(user.cart.total)}</h4>
        </div>
    )
}

export default Cart