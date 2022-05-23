import { useHistory } from "react-router-dom"


function NewProduct({user}){
    const history = useHistory()

    if(!user || !user.is_admin){
        history.push("/")
    }

    return (
        <div>
            <h1>YO</h1>
        </div>
    )
}

export default NewProduct