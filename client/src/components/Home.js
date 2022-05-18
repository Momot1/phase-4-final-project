import { Link } from "react-router-dom"
import { addZeros } from "./functions.js"

function Home({ products }){
    const productElements = products.map(product => <div key={product.id} className="border" style={{width: "40%", position: "relative", left: "30%"}}><Link style={{color: "#3a4187", padding: "5px"}} className="text-uppercase" to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> <p style={{padding: "5px"}}>{product.description}</p></div>)

    return (
        <div >
            {productElements}
        </div>
    )
}

export default Home