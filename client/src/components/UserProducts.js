import { Link } from "react-router-dom";
import { addZeros } from "./functions";

function UserProducts({ user }) {
  if (!user) {
    return <></>;
  }

  const productElements = user.orders.map((product) => (
    <div className="border d-flex flex-row mb-3">
      <div className="p-2 border width-max-content">
        <img
          src={product.product.image_url}
          className="cart-img"
          alt={product.product.name}
        />
      </div>
      <div className="p-2">
        <Link
          className="text-uppercase cart-link"
          to={`/products/${product.product.id}`}
        >
          {product.product.name} - ${addZeros(product.product.price)}
        </Link>
        <p className="cart-p">{product.product.description}</p>
      </div>
    </div>
  ));

  return (
    <div>
      {productElements}
      <></>
    </div>
  );
}

export default UserProducts;
