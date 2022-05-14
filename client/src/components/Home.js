import { Link } from "react-router-dom"
import { addZeros } from "./functions.js"

function Home({search, products, setProducts }){
    const productElements = products.map(product => <div key={product.id}><Link to={`/products/${product.id}`}>{product.name} - {addZeros(product.price)}</Link> <p>{product.description}</p></div>)


    return (
        <div>
            {productElements}
        </div>
    )
}

export default Home