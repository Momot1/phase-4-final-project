import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function Home({search}){

    const [products, setProducts] = useState([])

    useEffect(() => {
        fetch("/products")
        .then(resp => resp.json())
        .then(setProducts)
    }, [])

    const productElements = products.map(product => <div key={product.id}><Link to={`/products/${product.id}`}>{product.name}</Link></div>)


    return (
        <div>
            {productElements}
        </div>
    )
}

export default Home