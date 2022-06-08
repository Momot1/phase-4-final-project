import { useParams, useHistory } from "react-router-dom"
import { addZeros } from "./functions.js"
import Review from "./Review.js"
import { useState, useEffect } from "react"
import "./css/product.css"
import UpdateProduct from "./UpdateProduct.js"
import ReviewForm from "./ReviewForm.js"


function Product({user, setUser, products, setProducts}){
    const [isReviewClicked, setIsClicked] = useState(false)
    const [product, setProduct] = useState(null)
    const [addedToCart, setAddedToCart] = useState(false)
    const [isUpdateButtonClicked, setIsUpdateButtonClicked] = useState(false)
    const [formData, setFormData] = useState({
        rating: "",
        description: ""
    })

    const history = useHistory()

    const { id } = useParams()

    // When the user submits a review, it adds it to the database and displays the review on the page
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

    // When the user adds an item to their cart, it adds that item to the user's cart in the database and displays a message saying it was added to their cart. They can then go view their cart
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

    // Deletes a review from the database and updates the page to no longer display the deleted review
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

    // Grabs the product from the database based on the id in the url
    useEffect(() => {
        fetch(`/products/${id}`)
        .then(resp => resp.json())
        .then(product => {
            setProduct(product)
            setFormData({...formData, product_id: product.id})
        })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    // If there is no product, it displays an empty page
    if(!product){
        return <></>
    }

    // Creates elements for each review for the product
    const reviewElements = product.reviews.map(review => <Review key={review.id} review={review} user={user} onDeleteReview={onDeleteReview}/>)

    // If the user is an admin, and they click the delete product button, it asks if you are sure. If you are, then it deletes the product from the database and sends the user to the homepage
    function onDeleteProductButtonClick(){
        if(window.confirm("Are you sure you want to delete this product? Cannot be undone.")){
            fetch(`/products/${id}`, {
                method: "DELETE"
            }) 
            .then(resp => resp.json())
            .then(() => {
                const updatedProducts = products.filter(product => product.id !== parseInt(id))
                setProducts(updatedProducts)
                history.push("/")
            })
        }
    }

    function onUpdateButtonClick(){
        setIsUpdateButtonClicked(!isUpdateButtonClicked)
    }

    // Updates the product in the database. Displays the updated item on the screen
    function onUpdateItem(e, formData){
        e.preventDefault()
        
        fetch(`/products/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(updatedProduct => {
            setProduct(updatedProduct)
            setIsUpdateButtonClicked(false)
            const updatedProducts = products.map(product => {
                if(product.id === updatedProduct.id){
                    return updatedProduct
                } else{
                    return product
                }
            })
            setProducts(updatedProducts)
        })
        
    }

    return (
        <div>
            <div className="d-flex flex-row mb-3">
                <div id="image-div">
                    <img src={product.image_url} alt={product.name} className="product-img"/>
                </div>
                <div className="w-50">
                    <h4 className="product-h4">{product.name} - ${addZeros(product.price)} - {product.sold} sold!</h4>
                    <p className="product-p">{product.description}</p>
                </div>
                {user && user.is_admin ? 
                    <div className="w-25">
                        <button className="btn btn-lg btn-light" onClick={onUpdateButtonClick}>Update Product</button>
                        <button className="btn btn-lg btn-light" onClick={onDeleteProductButtonClick}>Delete Product</button>
                        {isUpdateButtonClicked ? <UpdateProduct product={product} onUpdateItem={onUpdateItem}/> : null}
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
            
            {user ? <div className="text-center"><button onClick={() => setIsClicked(!isReviewClicked)} className="btn btn-light btn-lg">New Review</button></div> : null}
            {isReviewClicked  ? <ReviewForm formData={formData} setFormData={setFormData} onReviewSubmit={onReviewSubmit}/>:null}
        </div>
    )
}

export default Product