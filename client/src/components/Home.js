import { Link } from "react-router-dom"

function Home({search, products, setProducts }){

    const productElements = products.map(product => <div key={product.id}><Link to={`/products/${product.id}`}>{product.name}</Link></div>)


    return (
        <div>
            {productElements}
        </div>
    )
}

export default Home