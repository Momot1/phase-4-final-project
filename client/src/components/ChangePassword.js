import { useState } from "react"
import { useHistory } from "react-router-dom"
import "./forms.css"

function ChangePassword({user, setUser}){
    const [formData, setFormData] = useState({
        old_password: "",
        password: "",
        password_confirmation: ""
    })
    const history = useHistory()

    const [errors, setErros] = useState({errors: []})

    if(!user){
            return <></>
    }

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

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

    const errorElements = errors.errors.map(error => <div key={error} className="alert alert-danger">- {error}</div>)

    return (
        <div className="mx-auto" style={{width: "30%", textAlign: "center"}}>
            <br/>
            <form onSubmit={handleUserUpdateChange} className="align-items-center">
                <div className="input-group mb-3">
                    <span className="input-group-text" aria-label="Old Password">Old Password:</span>
                    <input type="password" className="form-control" aria-label="Old Password" aria-describedby="inputGroup-sizing-default" value={formData.old_password} onChange={e => updateForm(e, "old_password")}/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" aria-label="New Password">New Password:</span> 
                    <input type="password" className="form-control" aria-label="New Password" aria-describedby="inputGroup-sizing-default" value={formData.password} onChange={e => updateForm(e, "password")}/> 
                </div>
                <div className="input-group mb-3">        
                    <span className="input-group-text" aria-label="Confirm New Password">Confirm New Password:</span>                    
                    <input type="password" className="form-control" aria-label="Confirm New Password" aria-describedby="inputGroup-sizing-default" value={formData.password_confirmation} onChange={e => updateForm(e, "password_confirmation")}/><br/> 
                </div>
                <button type="submit" className="btn btn-light">Update</button><br/><br/>
                {errors.errors.length>0 ? errorElements : null}
            </form>
        </div>
    )
}

export default ChangePassword