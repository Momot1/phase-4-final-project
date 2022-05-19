import { Link, useHistory } from "react-router-dom"
import { useState } from "react"


function Navbar({onSearchSubmit, user}){
    const [search, setSearch] = useState("")

    const history = useHistory()

    function onSearch(e){
        e.preventDefault()
        onSearchSubmit(search)
        setSearch("")
        history.push("/")
    }

    return (
        <div className="nav justify-content-center bg-light ">

            <Link to="/" className="nav-link btn btn-light btn-lg">Home</Link>

            <form onSubmit={onSearch} role="search" className="d-flex w-75">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className=" form-control me-2"></input>
                <div style={{width: "0.2%"}}></div>
                <button type="submit" className="btn btn-light btn-lg">Search</button>
            </form>

            {user ? 
                <>
                    <button className="nav-link dropdown-toggle btn-light px-1 my-0 text-capitalize btn-lg" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user.name}</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={`/${user.username}/about`} className="btn-lg">Profile</Link><br/>
                        <Link to="/cart" className="btn-lg">My Cart {user.cart.cart.length > 0 ? `(${user.cart.cart.length})`: null}</Link><br/>
                        <Link to="/logout" className="btn-lg">Logout</Link>
                        
                    </div>
                    
                </>
                : 
                <>
                    <Link to="/login" className="nav-link btn btn-light btn-lg">Login</Link>
                </>}
        </div>
    )
}

export default Navbar