import { useHistory } from "react-router-dom"

function Logout({setUser}){

    const history = useHistory()

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