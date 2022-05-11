import { useState } from "react"
import { Link } from "react-router-dom"

function Signup(){
    const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    function onSignup(e){
        e.preventDefault()

        fetch("/signup", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(resp => console.log(resp))
    }

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return( 
        <div>
            <form onSubmit={onSignup}>
                <label>Name: </label>
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => updateForm(e, "name")}/><br/>
                <label>Birthday: </label>
                <input type="date" value={formData.birthdate} onChange={e => updateForm(e, "birthdate")}/><br/>
                <label>Username: </label>
                <input type="text" placeholder="Username" value={formData.username} onChange={e => updateForm(e, "username")}/><br/>
                <label>Email: </label>
                <input type="email" placeholder="Email" value={formData.email} onChange={e => updateForm(e, "email")}/><br/>
                <label>Password: </label>
                <input type="password" placeholder="Password" value={formData.password} onChange={e => updateForm(e, "password")}/><br/>
                <label>Repeat password: </label>
                <input type="password" placeholder="Password Confirmation" value={formData.password_confirmation} onChange={e => updateForm(e, "password_confirmation")}/><br/>
                <button type="submit">Sign Up</button><br/>
                <Link to="/login">Already have an account? Login</Link>
            </form>
        </div>
    )
}

export default Signup