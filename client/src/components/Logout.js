import { useHistory } from "react-router-dom"

function Logout({setUser}){

    const history = useHistory()

    // Logs the user out and sends them to the home page
    fetch('/logout', {
    method: "DELETE"
    })
    .then(resp => resp.json())
    .then(() => {
        setUser(null)
        history.push("/")
    })

    return <></>
}

export default Logout