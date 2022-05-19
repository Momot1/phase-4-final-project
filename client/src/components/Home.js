import { Link } from "react-router-dom"
import { addZeros } from "./functions.js"

function Home({ products }){
    const productElements = products.map(product => 
        <div key={product.id} className="border d-flex flex-row mb-3">
            <div style={{width: "max-content", minWidth: "20%"}} className="p-2">
                <img src={product.image_url} style={{maxHeight: "100px"}}/>
            </div>
            <div className="p-2">
                <Link style={{color: "#3a4187", padding: "5px"}} className="text-uppercase" to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> 
                <p style={{padding: "5px"}}>{product.description}</p>    
            </div>
            
        </div>
    )


    return (
        <div className="mx-auto" style={{width: "50%"}}>
            {productElements}
        </div>
    )
}

export default Home