import { useState } from "react"
import { Link, useHistory } from "react-router-dom"

function Login({setUser, user}){
    const history = useHistory()
 
    if(user){
        history.push("/")
    }

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
                    window.history.back()
                    setUser(user) 
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
        <div className="mx-auto w-25 text-center">
            <form onSubmit={onLogin} className="align-items-center form-styles">
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Username">Username:</span>
                    <input type="text" placeholder="Username" value={formData.username} onChange={e => updateForm(e, "username")} className="form-control form-font-size" aria-label="Username" aria-describedby="inputGroup-sizing-default"required/><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Password" >Password:</span>
                    <input type="password" placeholder="Password" value={formData.password} onChange={e => updateForm(e, "password")} className="form-control form-font-size" aria-label="Password" aria-describedby="inputGroup-sizing-default" required/><br/>    
                </div>

                <button type="submit" className="btn btn-light btn-lg">Login</button><br/>
                
                <Link to="/signup" className="btn-lg">Don't have an account? Sign up</Link>
                
            </form>
            {errors ? <div className="alert alert-danger form-font-size" >{errors.error}<br/></div> : null}
        </div>
    )
}

export default Login