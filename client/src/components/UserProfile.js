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
        <div>
            <h3>Profile for {user.name}</h3>
            <h4>Username: {user.username}</h4>
            <h4>Email: {user.email}</h4>
            <h4>Birthday: {user.birthdate}</h4>
            <Link to={`/${user.username}/about/password/change`}>Change password</Link><br/><br/>
            <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
    )
}

export default UserProfile