import { Link, useHistory } from "react-router-dom"
import "./css/userprofile.css"

function UserProfile({user, setUser}){
    const history = useHistory()

    // If there is no user, it displays an empty page
    if(!user){
        return <></>
    }

    // If the user clicks the delete account, it makes them confirm. If they confirm, their account will be deleted from the database and they will be sent to the homepage.
    function handleDeleteAccount(){
        if(window.confirm("Are you sure you want to delete your account?")){
            fetch(`/users/${user.id}`, {
                method: "DELETE"
            })
            .then(resp => resp.json())
            .then(() => {
                setUser(null)
                history.push("/")
            })
        }
    }

    return (
        <div className = "mx-auto max-content-width text-center" id="profile-container">
            <h3 className="text-capitalize profile-h3">Profile for {user.name}</h3>
            {user.is_admin ? <h4 className="profile-h4">Account Type: Administrator</h4> : <h4 className="profile-h4">Account Type: Member</h4>}
            <h4 className="profile-h4">Username: {user.username}</h4>
            <h4 className="profile-h4">Email: {user.email}</h4>
            <h4 className="profile-h4">Birthday: {user.birthdate}</h4>
            <Link to={`/${user.username}/about/password/change`} className="btn-lg">Change password</Link><br/><br/>
            <button onClick={handleDeleteAccount} className="btn btn-light btn-lg">Delete Account</button>
        </div>
    )
}

export default UserProfile