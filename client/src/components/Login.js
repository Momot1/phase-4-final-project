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
        <div className="mx-auto" style={{width: "25%"}}>
            <form onSubmit={onLogin} className="align-items-center">
                <br/><div className="input-group mb-3">
                <span className="input-group-text" aria-label="Username">Username:</span>
                    <input type="text" placeholder="Username" value={formData.username} onChange={e => updateForm(e, "username")} className="form-control" aria-label="Username" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text" aria-label="Password">Password:</span>
                    <input type="password" placeholder="Password" value={formData.password} onChange={e => updateForm(e, "password")} className="form-control" aria-label="Password" aria-describedby="inputGroup-sizing-default" required/><br/>    
                </div>

                <button type="submit" className="btn btn-light">Login</button><br/>
                {errors ? <div className="alert alert-danger">{errors.error}<br/></div> : null}
                <Link to="/signup">Don't have an account? Sign up</Link>
                
            </form>
        </div>
    )
}

export default Login