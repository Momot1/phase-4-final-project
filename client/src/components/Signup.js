import { useState } from "react"
import { Link } from "react-router-dom"

function Signup({setUser}){

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
        .then(resp => {
            if(resp.ok){
                resp.json().then(user => {
                    console.log(user)
                    setUser(user)
                    window.history.go(-2)
                })
            } else{
                resp.json().then(console.log)
            }
        })
    }

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return( 
        <div>
            <form onSubmit={onSignup}>
                <label>Name: </label>
                <input type="text" placeholder="Full Name" value={formData.name} onChange={e => updateForm(e, "name")} required/><br/>
                <label>Birthday: </label>
                <input type="date" value={formData.birthdate} onChange={e => updateForm(e, "birthdate")}/><br/>
                <label>Username: </label>
                <input type="text" placeholder="Username" value={formData.username} onChange={e => updateForm(e, "username")} required/><br/>
                <label>Email: </label>
                <input type="email" placeholder="Email" value={formData.email} onChange={e => updateForm(e, "email")} required/><br/>
                <label>Password: </label>
                <input type="password" placeholder="Password" value={formData.password} onChange={e => updateForm(e, "password")} required/><br/>
                <label>Repeat password: </label>
                <input type="password" placeholder="Password Confirmation" value={formData.password_confirmation} onChange={e => updateForm(e, "password_confirmation")} required/><br/>
                <button type="submit">Sign Up</button><br/>
                <Link to="/login">Already have an account? Login</Link>
            </form>
        </div>
    )
}

export default Signup