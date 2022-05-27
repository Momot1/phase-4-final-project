import { useState } from "react"

function UpdateProduct({product, onUpdateItem}){
    const [formData, setFormData] = useState({
        name: product.name,
        price: product.price,
        description: product.description
    })

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return (
        <div className="text-center" onSubmit={(e) => onUpdateItem(e, formData)}>
            <form className="align-items-center form-styles">
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Name">Name</span>
                    <input type="text" value={formData.name} className="form-control form-font-size" onChange={e => updateForm(e, "name")} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Price">Price</span>
                    <input type="number" value={formData.price} className="form-control form-font-size" onChange={e => updateForm(e, "price")} />
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Description">Description</span>
                    <input type="text" value={formData.description} className="form-control form-font-size" onChange={e => updateForm(e, "description")} />
                </div>

                <button type="submit" className="btn btn-light btn-lg">Update</button>
            </form>
        </div>
    )
}

export default UpdateProduct