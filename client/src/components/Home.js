import { Link } from "react-router-dom"
import { addZeros } from "./functions.js"

function Home({search, products, setProducts }){
    const productElements = products.map(product => <div key={product.id} className="border" style={{width: "40%", position: "relative", left: "30%"}}><Link style={{color: "#3a4187", padding: "5px"}} to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> <p style={{padding: "5px"}}>{product.description}</p></div>)

    return (
        <div style={{background: "#f2f2f2"}}>
            {productElements}
        </div>
    )
}

export default Home