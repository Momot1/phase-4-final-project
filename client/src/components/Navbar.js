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
        <div className="nav justify-content-center bg-dark ">

            <Link to="/" className="nav-link btn btn-light btn-lg margin-small">Home</Link>

            <form onSubmit={onSearch} role="search" className="d-flex w-75">
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search" className=" form-control me-2 margin-small"></input>
                <button type="submit" className="btn btn-light btn-lg margin-small">Search</button>
            </form>

            {user ? 
                <>
                    <button className="nav-link dropdown-toggle btn-light px-1  text-capitalize btn-lg margin-small" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{user.name}</button>
                    <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link to={`/${user.username}/about`} className="btn-lg">Profile</Link><br/>
                        <Link to="/cart" className="btn-lg">My Cart {user.cart.cart.length > 0 ? `(${user.cart.cart.length})`: null}</Link><br/>
                        {user.is_admin ? <><Link to="/products/new" className="btn-lg">New Product</Link><br/></> : null}
                        <Link to="/logout" className="btn-lg">Logout</Link>
                        
                    </div>
                    
                </>
                : 
                <>
                    <Link to="/login" className="nav-link btn btn-light btn-lg margin-small">Login</Link>
                </>}
        </div>
    )
}

export default Navbar