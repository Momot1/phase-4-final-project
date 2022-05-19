import { useParams, useHistory } from "react-router-dom"
import { addZeros } from "./functions.js"
import Review from "./Review.js"
import { useState, useEffect } from "react"


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
            productReviews.push({id: review.id, description: review.description, rating: review.rating})
            setProduct({...product, reviews: productReviews})
            setFormData({rating: "", description: ""})
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
            }) //Update user cart on frontend if comes back with no error
        }
        
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

    

    const reviewElements = product.reviews.map(review => <Review key={review.id} review={review}/>)

    return (
        <div>
            <div className="d-flex flex-row mb-3">
                <div style={{width: "20%"}}>
                    <img src={product.image_url} alt={product.name} style={{width: "100%", maxWidth: "300px"}}/>
                </div>
                <div style={{width: "50%"}}>
                    <h4>{product.name} - ${addZeros(product.price)}</h4>
                    <p>{product.description}</p>
                </div>
            </div>
            

            <div style={{textAlign: "center"}}>
                <button onClick={addToCart} className="btn btn-light">Add to cart <i className="bi bi-cart-plus"></i></button><br/>
            </div>

            {addedToCart ? <div className="alert alert-success mx-auto" role="alert" style={{width: "max-content", textAlign: "center"}}>
                    Item added to cart <button onClick={() => setAddedToCart(false)} className="btn btn-light">X</button>
                </div> : null}

            

            {reviewElements}
            {user ? <div style={{textAlign: "center"}}><button onClick={() => setIsClicked(!isClicked)} className="btn btn-light">New Review</button></div> : null}
            {isClicked  ? 
                <div style={{width: "50%", textAlign: "center"}} className="mx-auto">
                    <form onSubmit={onReviewSubmit} className="align-items-center">
                        <div className="input-group mb-3">
                            <span className="input-group-text" aria-label="Rating">Rating:</span>
                            <input type="number" max="5" min="1" value={formData.rating} onChange={e => updateForm(e, "rating")} className="form-control" aria-label="Rating" aria-describedby="inputGroup-sizing-default" required></input>/5 stars<br/>    
                        </div>
                        <div className="input-group mb-3">
                            <span className="input-group-text" aria-label="Review">Review:</span>
                            <input type="text" value={formData.description} onChange={e => updateForm(e, "description")} className="form-control" aria-label="Review" aria-describedby="inputGroup-sizing-default" required></input><br/>    
                        </div>
                        
                        <button type="submit" className="btn btn-light">Submit</button>
                    </form>
                </div>
            :null}
        </div>
    )
}

export default Product