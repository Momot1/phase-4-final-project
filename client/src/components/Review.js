import "./css/reviews.css"

function Review({review, user, onDeleteReview}){
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