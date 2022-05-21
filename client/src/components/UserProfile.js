import { Link } from "react-router-dom"

function UserProfile({user, setUser}){
    if(!user){
        return <></>
    }

    function handleDeleteAccount(){
        if(window.confirm("Are you sure you want to delete your account?")){
            fetch(`/users/${user.id}`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(() => setUser(null))
        }
    }

    return (
        <div className = "mx-auto" style={{textAlign: "center", backgroundColor: "#d1d1d1", width: "max-content", padding: "1.5%", borderRadius: "20px", marginTop: "14%"}}>
            <h3 className="text-capitalize">Profile for {user.name}</h3>
            {user.is_admin ? <h4>Admin Status: true</h4> : null}
            <h4>Username: {user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Birthday: {user.birthdate}</h4>
            <Link to={`/${user.username}/about/password/change`} className="btn-lg">Change password</Link><br/><br/>
            <button onClick={handleDeleteAccount} className="btn btn-light btn-lg">Delete Account</button>
        </div>
    )
}

export default UserProfile