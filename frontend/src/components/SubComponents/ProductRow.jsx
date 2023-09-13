import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";

function ProductRow({ heading, products }) {
  const [trimmedProducts,setTrimmedProducts] = useState([]);

  useEffect(()=>{
    setTrimmedProducts(products.slice(0,4))
  },[])

  if (trimmedProducts.length > 0) {
    return (
      <div className="w-full my-32 px-8">
        <h1 className="text-4xl pt-4 top-border uppercase">{heading}</h1>
        <div className="grid grid-cols-4 gap-4 w-full">
          {trimmedProducts.map((product) => {
            return (
              <SingleProduct
                key={product._id}
                product={product}
                carouselEnabled={true}
                buttonEnabled={false}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default ProductRow;
