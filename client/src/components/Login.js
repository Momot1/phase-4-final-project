import { useState } from "react"

function Login(){

    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    function onLogin(e){
        e.preventDefault()

        fetch("/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData)
        })
        .then(resp => resp.json())
        .then(user => console.log(user))

    }

    function updateForm(e, input){
        setFormData({...formData, [input]: e.target.value})
    }

    return( 
        <div>
            <form onSubmit={onLogin}>
                <label>Username:</label>
                <input type="text" placeholder="Username" value={formData.username} onChange={e => updateForm(e, "username")}/><br/>
                <label>Password</label>
                <input type="password" placeholder="Password" value={formData.password} onChange={e => updateForm(e, "password")}/><br/>
                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login