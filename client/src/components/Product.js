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
        .then(console.log)
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
            <img src={product.image_url} alt={product.name}/>
            <h4>{product.name} - ${addZeros(product.price)}</h4>
            <p>{product.description}</p>


            <button onClick={addToCart}>Add to cart <i className="bi bi-cart-plus"></i></button><br/>


            {addedToCart ? <div class="alert alert-success" role="alert">
                    Item added to cart <button onClick={() => setAddedToCart(false)}>X</button>
                </div> : null}



            {reviewElements}
            {user ? <button onClick={() => setIsClicked(!isClicked)}>New Review</button> : null}
            {isClicked  ? 
                <form onSubmit={onReviewSubmit}>
                    <label>Rating: </label>
                    <input type="number" max="5" min="1" value={formData.rating} onChange={e => updateForm(e, "rating")}></input>/5 stars<br/>
                    <label>Review: </label>
                    <input type="text" value={formData.description} onChange={e => updateForm(e, "description")}></input><br/>
                    <button type="submit">Submit</button>
                </form>
            :null}
        </div>
    )
}

export default Product