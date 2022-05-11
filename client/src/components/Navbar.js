import { Link } from "react-router-dom"
import { useState } from "react"


function Navbar({onSearch, user, handleLogout}){
    const [search, setSearch] = useState("")

    return (
        <div>
            <Link to="/">Home</Link>
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search"/>
            <button type="button">Search</button>
            {user ? 
                <>
                    <>Hi {user.name}</>
                    <button onClick={handleLogout}>Logout</button>
                </>
                : 
                <>
                    <Link to="/login">Login</Link>
                    
                </>}
        </div>
    )
}

export default Navbar