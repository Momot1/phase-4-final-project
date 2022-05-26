import { useHistory } from "react-router-dom"
import { useState } from "react"

function NewProduct({user, products, setProducts}){
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        image_url: "",
        stock_amount: "",
        description: ""
    })

    const history = useHistory()

    if(!user || !user.is_admin){
        history.push("/")
    }

    function onSubmitItem(e){
        e.preventDefault()

        fetch("/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(product => {
            setProducts([...products, product])
            history.push("/")
        })
    }

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return (
        <div className="mx-auto w-50 text-center">
            <h1>New Product</h1>
            <form onSubmit={onSubmitItem} className="align-items-center form-styles">
                
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Product Name">Product Name</span>
                    <input type="text" placeholder="Product Name" value={formData.username} onChange={e => updateForm(e, "name")} className="form-control form-font-size" aria-label="Product Name" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Price">Price</span>
                    <input type="text" placeholder="Price" value={formData.username} onChange={e => updateForm(e, "price")} className="form-control form-font-size" aria-label="Price" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                   
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Image_Url">Image Url</span>
                    <input type="text" placeholder="Image Url" value={formData.username} onChange={e => updateForm(e, "image_url")} className="form-control form-font-size" aria-label="Image_Url" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
  
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Stock_Amount">Stock Amount</span>
                    <input type="text" placeholder="Stock Amount" value={formData.username} onChange={e => updateForm(e, "stock_amount")} className="form-control form-font-size" aria-label="Stock_Amount" aria-describedby="inputGroup-sizing-default" required/><br/>
                    
                </div>

                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Description">Description</span>
                    <input type="text" placeholder="Description" value={formData.username} onChange={e => updateForm(e, "description")} className="form-control form-font-size" aria-label="Description" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                <button type="submit" className="btn btn-light btn-lg">Add Product</button>
            </form>
        </div>
    )
}

export default NewProduct