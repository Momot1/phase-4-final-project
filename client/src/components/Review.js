

function Review({review}){

    return (
        <div>
            <p>{review.rating}/5 stars - {review.description}</p>
        </div>
    )
}

export default Review