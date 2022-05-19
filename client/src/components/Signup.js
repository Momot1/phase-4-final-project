import { useState } from "react"
import { Link, useHistory } from "react-router-dom"

function Signup({setUser, user}){
    const history = useHistory()
 
    if(user){
        history.push("/")
    }

    const [formData, setFormData] = useState({
        name: "",
        birthdate: "",
        username: "",
        email: "",
        password: "",
        password_confirmation: ""
    })

    const [errors, setErrors] = useState({errors: []})

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
                resp.json().then(errors => {
                    setErrors(errors)
                    setFormData({...formData, password: "", password_confirmation: ""})
                })
            }
        })
    }


    const errorElements = errors.errors.map(error => <div key={error} className="alert alert-danger form-font-size mx-auto" style={{width: "50%"}}>- {error}</div>)
    

    

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return( 
        <div className="mx-auto" style={{width: "50%", textAlign: "center"}}>
                <form onSubmit={onSignup} className="align-items-center" style={{marginTop: "23%", padding: "1%", backgroundColor:"#d1d1d1", borderRadius: "20px", marginBottom: "5px"}}>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Name">Name:</span>
                    <input type="text" placeholder="Full Name" value={formData.name} onChange={e => updateForm(e, "name")} className="form-control form-font-size" aria-label="Name" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Birthday">Birthday:</span>
                    <input type="date" value={formData.birthdate} onChange={e => updateForm(e, "birthdate")} className="form-control form-font-size" aria-label="Birthday" aria-describedby="inputGroup-sizing-default" required/><br/>    
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Email">Email:</span>
                    <input type="email" placeholder="Email" value={formData.email} onChange={e => updateForm(e, "email")} className="form-control form-font-size" aria-label="Email" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Username">Username:</span>
                    <input type="text" placeholder="Username" value={formData.username} onChange={e => updateForm(e, "username")} className="form-control form-font-size" aria-label="Username" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Password">Password:</span>
                    <input type="password" placeholder="Password" value={formData.password} onChange={e => updateForm(e, "password")} autoComplete="new-password" className="form-control form-font-size" aria-label="Password" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                <div className="input-group mb-3">
                    <span className="input-group-text form-font-size" aria-label="Repeat_password">Repeat Password:</span>
                    <input type="password" placeholder="Repeat Password" value={formData.password_confirmation} onChange={e => updateForm(e, "password_confirmation")} auto-complete="new-password" className="form-control form-font-size" aria-label="Repeat_password" aria-describedby="inputGroup-sizing-default" required/><br/>
                </div>
                
                <button type="submit" className="btn btn-light btn-lg">Sign Up</button><br/>
                
                <Link to="/login" className="btn-lg">Already have an account? Login</Link>
            </form>
            {errors.errors.length>0 ? errorElements : null}
        </div>
    )
}

export default Signup