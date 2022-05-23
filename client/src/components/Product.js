import { useParams, useHistory } from "react-router-dom"
import { addZeros } from "./functions.js"
import Review from "./Review.js"
import { useState, useEffect } from "react"
import "./css/product.css"


function Product({user, setUser}){
    const [isClicked, setIsClicked] = useState(false)
    const [product, setProduct] = useState(null)
    const [formData, setFormData] = useState({
        rating: "",
        description: ""
    })
    const [addedToCart, setAddedToCart] = useState(false)

    const history = useHistory()

    const { id } = useParams()

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    function onReviewSubmit(e){
        e.preventDefault()

        fetch('/reviews', {
            method: "POST",
            headers: {
                'Content-Type': "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(review => {
            const productReviews = product.reviews
            productReviews.push({id: review.id, description: review.description, rating: review.rating, user_id: user.id})
            setProduct({...product, reviews: productReviews})
            setFormData({rating: "", description: ""})
            setIsClicked(false)
        })
    }

    function addToCart(){
        if(!user){
            history.push("/login")
        } else{
            setAddedToCart(true)
            fetch("/addtocart", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                product_id: id
            })
            })
            .then(resp => resp.json())
            .then(user => {
                setUser(user)
            })
        }
    }

    function onDeleteReview(id){
        fetch(`/reviews/${id}`, {
            method: "DELETE"
        })
        .then(resp => resp.json())
        .then(() => {
            const updatedReviews = product.reviews.filter(review => review.id !== id)
            setProduct({...product, reviews: updatedReviews})
        })
    }

    useEffect(() => {
        fetch(`/products/${id}`)
        .then(resp => resp.json())
        .then(product => {
            setProduct(product)
            setFormData({...formData, product_id: product.id})
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!product){
        return <></>
    }

    

    const reviewElements = product.reviews.map(review => <Review key={review.id} review={review} user={user} onDeleteReview={onDeleteReview}/>)

    return (
        <div>
            <div className="d-flex flex-row mb-3">
                <div id="image-div">
                    <img src={product.image_url} alt={product.name} className="product-img"/>
                </div>
                <div className="w-50">
                    <h4 className="product-h4">{product.name} - ${addZeros(product.price)}</h4>
                    <p className="product-p">{product.description}</p>
                </div>
                {user.is_admin ? 
                    <div className="w-25">
                        <button className="btn btn-lg btn-light">Update Product</button>
                        <button className="btn btn-lg btn-light">Delete Product</button>
                    </div> 
                : null}
            </div>
            

            <div className="text-center">
                <button onClick={addToCart} className="btn btn-light btn-lg">Add to cart <i className="bi bi-cart-plus"></i></button><br/>
            </div>


            {addedToCart ? <div className="alert alert-success mx-auto btn-lg text-center max-content-width" role="alert">
                    Item added to cart <button onClick={() => setAddedToCart(false)} className="btn btn-light">X</button>
                </div> : null}

            
            <h5 className="product-h5">Reviews</h5>
            {reviewElements.length > 0 ? reviewElements : <h6 className="product-h6">No reviews for this product yet</h6>}
            
            {user ? <div className="text-center"><button onClick={() => setIsClicked(!isClicked)} className="btn btn-light btn-lg">New Review</button></div> : null}
            {isClicked  ? 
                <div className="mx-auto w-50 text-center">
                    <form onSubmit={onReviewSubmit} className="form-styles">
                        <div className="input-group mb-3">
                            <span className="input-group-text form-font-size" aria-label="Rating">Rating:</span>
                            <input type="number" max="5" min="1" value={formData.rating} onChange={e => updateForm(e, "rating")} className="form-font-size form-control" aria-label="Rating" aria-describedby="inputGroup-sizing-default" required></input><span className="form-font-size">/5 stars</span><br/>    
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text form-font-size" aria-label="Review">Review:</span>
                            <input type="text" value={formData.description} onChange={e => updateForm(e, "description")} className="form-control form-font-size" aria-label="Review" aria-describedby="inputGroup-sizing-default" required></input><br/>    
                        </div>
                        
                        <button type="submit" className="btn btn-light btn-lg">Submit</button>
                    </form>
                </div>
            :null}
        </div>
    )
}

export default Product