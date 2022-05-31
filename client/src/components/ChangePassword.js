import { useState } from "react"
import { useHistory } from "react-router-dom"

function ChangePassword({user, setUser}){
    const [formData, setFormData] = useState({
        old_password: "",
        password: "",
        password_confirmation: ""
    })
    const history = useHistory()

    const [errors, setErros] = useState({errors: []})

    // If there is no user, returns an empty page
    if(!user){
            return <></>
    }

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    // Once the user submits the form, it goes to the backend. If all information is correct, it changes the password and sends the user back to their about page. If not, it displayes the errors
    function handleUserUpdateChange(e){
        e.preventDefault()

        fetch("/changepassword", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(resp => {
            if(resp.ok){
                resp.json().then(user => {
                    setUser(user)
                    setErros({errors: []})
                    history.push(`/${user.username}/about`)
                    alert("Password changed successfully")
                })
            } else{
                resp.json().then(errors => {
                    setErros(errors)
                    setFormData({old_password: "", password: "", password_confirmation: ""})
                })
            }
        })
    }

    // Creates elements for each error
    const errorElements = errors.errors.map(error => <div key={error} className="alert alert-danger form-font-size">- {error}</div>)

    return (
        <div className="mx-auto text-center w-25">
            <form onSubmit={handleUserUpdateChange} className="align-items-center form-styles">
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Old Password">Old Password:</span>
                    <input type="password" className="form-control form-font-size" aria-label="Old Password" aria-describedby="inputGroup-sizing-default" value={formData.old_password} onChange={e => updateForm(e, "old_password")} required/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="New Password">New Password:</span> 
                    <input type="password" className="form-control form-font-size" aria-label="New Password" aria-describedby="inputGroup-sizing-default" value={formData.password} onChange={e => updateForm(e, "password")} required/> 
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Confirm New Password">Confirm New Password:</span>                    
                    <input type="password" className="form-control form-font-size" aria-label="Confirm New Password" aria-describedby="inputGroup-sizing-default" value={formData.password_confirmation} onChange={e => updateForm(e, "password_confirmation")} required/><br/> 
                </div>
                <button type="submit" className="btn btn-light btn-lg">Update</button><br/><br/>
            </form>
            {errors.errors.length>0 ? errorElements : null}
        </div>
    )
}

export default ChangePassword