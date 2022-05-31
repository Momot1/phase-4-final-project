import "./css/reviews.css"

function Review({review, user, onDeleteReview}){
    // Checks to see if the user is either the owner of a review, or an administrator. If they are, then a delete button will be present
    function testUser(){
        if(!user){
            return false
        } else if(user.id === review.user_id || user.is_admin){
            return true
        } else{
            return false
        }
    }

    return (
        <div id="review-div">
            <p className="review-p">{review.rating}/5 stars - {review.description}{testUser() ? <button className="btn btn-light btn-lg" onClick={() =>  onDeleteReview(review.id)}>Delete review</button> : null}</p>
            
        </div>
    )
}

export default Review