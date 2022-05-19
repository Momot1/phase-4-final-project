import { Link } from "react-router-dom"
import { addZeros } from "./functions.js"

function Home({ products }){
    const productElements = products.map(product => 
        <div key={product.id} className="border d-flex flex-row mb-3">
            <div style={{width: "max-content"}} className="p-2 border">
                <img src={product.image_url} style={{maxWidth: "200px"}} alt={product.name}/>
            </div>
            <div className="p-2">
                <Link style={{color: "#3a4187", padding: "5px", fontSize: "1.3em"}} className="text-uppercase" to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> 
                <p style={{padding: "5px", fontSize: "1.1em"}}>{product.description}</p>
            </div>
            
        </div>
    )


    return (
        <div className="mx-auto w-75" style={{ margin: "0.2%"}}>
            {productElements}
        </div>
    )
}

export default Home