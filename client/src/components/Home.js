import { Link } from "react-router-dom"
import { addZeros } from "./functions.js"
import "./css/home.css"

function Home({ products }){
    const productElements = products.map(product => 
        <div key={product.id} className="border d-flex flex-row mb-3" style={{backgroundColor: "#f2f2f2"}}>
            <div className="p-2 border max-content-width">
                <img src={product.image_url} style={{maxWidth: "200px"}} alt={product.name}/>
            </div>
            <div className="p-2">
                <Link style={{color: "#3a4187", padding: "5px", fontSize: "1.3em"}} className="text-uppercase" to={`/products/${product.id}`}>{product.name} - ${addZeros(product.price)}</Link> 
                <p style={{padding: "5px", fontSize: "1.1em"}}>{product.description}</p>
            </div>
            
        </div>
    )


    return (
        <div id="home-container">
            <div className="mx-auto w-75" id="home-products-container">
                {productElements}
            </div>    
        </div>
        
    )
}

export default Home