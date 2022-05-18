

function Review({review}){

    return (
        <div style={{textAlign: "center"}}>
            <p>{review.rating}/5 stars - {review.description}</p>
        </div>
    )
}

export default Review