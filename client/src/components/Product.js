import { useEffect } from "react"
import { useParams } from "react-router-dom"

function Product(){
    const { id } = useParams()

    useEffect(() => {
        fetch(`/products/${id}`)
        .then(resp => resp.json())
        .then(console.log)
    }, [])

    return (
        <></>
    )
}

export default Product