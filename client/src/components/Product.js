import { useParams } from "react-router-dom"
import { addZeros } from "./functions.js"
import Review from "./Review.js"
import { useState, useEffect } from "react"


function Product(){
    const [isClicked, setIsClicked] = useState(false)
    const [product, setProduct] = useState(null)

    function onReviewSubmit(e){
        e.preventDefault()
    }

    const { id } = useParams()

    useEffect(() => {
        fetch(`/products/${id}`)
        .then(resp => resp.json())
        .then(setProduct)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!product){
        return <></>
    }

    const reviewElements = product.reviews.map(review => <Review key={review.id} review={review}/>)

    return (
        <div>
            <img src={product.image_url} alt="HUGE STEEL CHAIR"/>
            <h4>{product.name} - ${addZeros(product.price)}</h4>
            <p>{product.description}</p>
            {reviewElements}
            <button onClick={() => setIsClicked(!isClicked)}>New Review</button>
            {isClicked ? 
                <form onSubmit={onReviewSubmit}>
                    <label>Rating: </label>
                    <input type="number" max="5" min="1"></input>/5 stars<br/>
                    <label>Review: </label>
                    <input type="textbox"></input><br/>
                    <button type="submit">Submit</button>
                </form>
            :null}
        </div>
    )
}

export default Product