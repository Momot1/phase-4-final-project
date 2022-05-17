import { useState } from "react"
import { Link } from "react-router-dom"

function Login({setUser}){

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const [errors, setErrors] = useState(null)

    function onLogin(e){
        e.preventDefault()

        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(resp => {
            if(resp.ok){
                resp.json().then(user => {
                    setErrors(null)
                    setUser(user)
                    window.history.back()
                })
            } else{
                resp.json().then(errors => {
                    setErrors(errors)
                    setFormData({username: formData.username, password: ""})
                })
            }
        })
    } 

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return( 
        <div>
            <form onSubmit={onLogin}>
                <label>Username:</label>
                <input type="text" placeholder="Username" value={formData.username} onChange={e => updateForm(e, "username")} required/><br/>
                <label>Password</label>
                <input type="password" placeholder="Password" value={formData.password} onChange={e => updateForm(e, "password")} required/><br/>
                <button type="submit">Login</button><br/>
                {errors ? <div className="alert alert-danger">{errors.error}<br/></div> : null}
                <Link to="/signup">Don't have an account? Sign up</Link>
            </form>
        </div>
    )
}

export default Login