import { useState } from "react"

function UserProfile({user, setUser}){

    const [formData, setFormData] = useState({})

    function handleUserUpdateChange(e){
        e.preventDefault()

        fetch("/changepassword", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
    }

    return (
        <div>
            <form onSubmit={handleUserUpdateChange}>
                <label>Old password: </label>
                <input type="password" /><br/>
                <label>New password: </label>
                <input type="password" /><br/>  
                <label>Re-Type password: </label>
                <input type="password" /><br/> 
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default UserProfile