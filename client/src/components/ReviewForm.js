function ReviewForm({onReviewSubmit, formData, setFormData}) {
    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return(
        <div className="mx-auto w-50 text-center">
            <form onSubmit={e => onReviewSubmit(e)} className="form-styles">
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
    )
}

export default ReviewForm