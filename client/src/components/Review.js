

function Review({review, user, onDeleteReview}){
    function testUser(){
        if(!user){
            return false
        } else if(user.id === review.user_id){
            return true
        } else{
            return false
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <p>{review.rating}/5 stars - {review.description}{testUser() ? <button onClick={() =>  onDeleteReview(review.id)}>Delete review</button> : null}</p>
            
        </div>
    )
}

export default Review