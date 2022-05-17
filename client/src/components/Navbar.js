import { Link, useHistory } from "react-router-dom"
import { useState } from "react"


function Navbar({onSearchSubmit, user}){
    const [search, setSearch] = useState("")

    const history = useHistory()

    function onSearch(e){
        e.preventDefault()
        onSearchSubmit(search)
        history.push("/")
    }
    

    function onTestEvent(){
        console.log("submitted")
    }

    return (
        <div>
            <Link to="/">Home</Link>
            <form onSubmit={onSearch}>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
            <button type="submit" >Search</button>
            </form>
            {user ? 
                <>
                    <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user.name}</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={`/${user.username}/about`}>Profile</Link><br/>
                        <Link to="/cart">My Cart {user.cart.cart.length > 0 ? `(${user.cart.cart.length})`: null}</Link><br/>
                        <Link to="/logout">Logout</Link>
                        
                    </div>
                    
                </>
                : 
                <>
                    <Link to="/login">Login</Link>
                    
                </>}
        </div>
    )
}

export default Navbar