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

    return (
        <div className="nav justify-content-center bg-light ">

            <Link to="/" className="nav-link btn btn-light">Home</Link>

            <form onSubmit={onSearch} role="search" className="d-flex align-self-center">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className=" h-75 form-control me-2"/>
                <button type="submit" className="btn btn-light h-100 me-3">Search</button>
            </form>

            {user ? 
                <>
                    <button className="nav-link dropdown-toggle btn-light px-1 my-0" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user.name}</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={`/${user.username}/about`}>Profile</Link><br/>
                        <Link to="/cart">My Cart {user.cart.cart.length > 0 ? `(${user.cart.cart.length})`: null}</Link><br/>
                        <Link to="/logout">Logout</Link>
                        
                    </div>
                    
                </>
                : 
                <>
                    <Link to="/login" className="nav-link btn btn-light">Login</Link>
                </>}
        </div>
    )
}

export default Navbar