import { useParams } from "react-router-dom"
import { addZeros } from "./functions.js"
import Review from "./Review.js"


function Product({products}){
    const { id } = useParams()

    const product = products.find(product => product.id === parseInt(id))

    const reviewElements = product.reviews.map(review => <Review key={review.id} review={review}/>)

    return (
        <div>
            <h4>{product.name} - ${addZeros(product.price)}</h4>
            <p>{product.description}</p>
            {reviewElements}
        </div>
    )
}

export default Product