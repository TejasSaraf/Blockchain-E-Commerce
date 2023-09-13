import React from "react";
import Jacket from "../../assets/Images/jacket.webp";
import Carousel from "./Carousel";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function SingleProduct({ buttonEnabled, carouselEnabled, product }) {
  return (
    <Link to={`/product/${product.slug}`}>
      <div className="mt-3">
        {carouselEnabled ? <Carousel /> : <img className="" src={Jacket} />}
        <h1 className="mt-4 text-2xl">{product.productName}</h1>
        {buttonEnabled ? (
          <button className="rounded-full px-4 align-middle h-10 uppercase mt-2 border outline-black border-black">
            <p className="text-black text-xs tracking-widest">Explore</p>
          </button>
        ) : (
          <p className="mt-2 text-sm tracking-wider">${product.price}</p>
        )}
      </div>
    </Link>
  );
}

export default SingleProduct;
