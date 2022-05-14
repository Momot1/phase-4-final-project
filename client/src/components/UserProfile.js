import { useState } from "react"

function UserProfile({user, setUser}){

    const [formData, setFormData] = useState({
        old_password: "",
        password: "",
        password_confirmation: ""
    })

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
        .then(resp => resp.json())
        .then(console.log)
    }

    return (
        <div>
            <div>
                <form onSubmit={handleUserUpdateChange} className="align-items-center">
                    <div className="input-group mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" aria-label="Old Password">Old Password:</span>
                        </div>
                        <input type="password" className="form-control" aria-label="Old Password" aria-describedby="inputGroup-sizing-default" value={formData.old_password} onChange={e => updateForm(e, "old_password")}/><br/>
                    </div>
                    <div className="input-group mb-3">
                        <div>
                            <span className="input-group-text" aria-label="New Password">New Password:</span>  
                        </div>
                        <input type="password" className="form-control" aria-label="New Password" aria-describedby="inputGroup-sizing-default" value={formData.password} onChange={e => updateForm(e, "password")}/><br/>
                    </div>
                    <div className="input-group mb-3">
                        <div>
                            <span className="input-group-text" aria-label="Confirm New Password">Confirm New Password:</span>
                        </div>
                        <input type="password" className="form-control" aria-label="Confirm New Password" aria-describedby="inputGroup-sizing-default" value={formData.password_confirmation} onChange={e => updateForm(e, "password_confirmation")}/><br/> 
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UserProfile