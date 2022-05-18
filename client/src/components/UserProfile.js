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
        } else{
            console.log("not confirmed")
        }
    }

    return (
        <div style={{textAlign: "center"}}>
            <h3 className="text-capitalize">Profile for {user.name}</h3>
            <h4>Username: {user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Birthday: {user.birthdate}</h4>
            <Link to={`/${user.username}/about/password/change`}>Change password</Link><br/><br/>
            <button onClick={handleDeleteAccount} className="btn btn-light">Delete Account</button>
        </div>
    )
}

export default UserProfile