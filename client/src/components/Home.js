import { Link } from "react-router-dom"
import { addZeros } from "./functions.js"
import "./css/home.css"

function Home({ products }){
    const productElements = products.map(product => 
        <div key={product.id} className="border d-flex flex-row mb-3 div-product-background">
            <div className="p-2 border max-content-width">
                <img src={product.image_url} className="home-product-image" alt={product.name}/>
            </div>
            <div className="p-2">
                <Link className="text-uppercase home-product-link" to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> 
                <p className="home-p">{product.description}</p>
            </div>
        </div>
    )

    return (
        <div id="home-container">
            <div className="mx-auto w-75 margin-small">
                {productElements}
            </div>    
        </div>
        
    )
}

export default Home