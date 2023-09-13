import React, {useEffect, useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Close from "../../assets/Icons/close.svg";
import Carousel from "../SubComponents/Carousel";
import { useDispatch } from "react-redux";
import { removeItemFromCart, updateProductQuantity, getCartCount } from "../../scripts/cart";
import { setCount } from "../../actions";

function CartItem({ product, proQuantity, loadCartItems }) {
  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(()=>{
    setQuantity(proQuantity)
  },[])

  const removeItem = async () => {
    const data = {
      product: product._id
    }
    await removeItemFromCart(data).then(async (res) => {
      loadCartItems();
      await getCartCount().then((res) => {
        dispatch(setCount(res.data.count))
      })
    })
  }

  const updateQuantity = async (val) => {
    setQuantity(val)
    const data = {
      product: product._id,
      quantity: val
    }
    await updateProductQuantity(data).then((res) => {
      loadCartItems()
    })
  }

  return (
    <div className="flex my-4">
      <div className="w-4/12">
        <Carousel/>
      </div>
      <div className="px-2 relative py-2 w-full">
        <img src={Close} onClick={removeItem} className="h-4 w-4 absolute right-2 top-0 z-50 cursor-pointer" />
        <p className="text-sm uppercase tracking-widest font-thin pr-4">
          {product.productName}
        </p>
        <div className="flex mt-auto absolute bottom-px w-full justify-between">
          <Select
            labelId="demo-simple-select-label"
            className="rounded-full h-8 w-18 border-2 MaisonNeueMonoRegular border-black"
            value={quantity}
            onChange={(e) => {
              e.preventDefault();
              updateQuantity(e.target.value)
            }}
          >
            <MenuItem className="MaisonNeueMonoRegular" value={1}>
              1
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={2}>
              2
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={3}>
              3
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={4}>
              4
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={5}>
              5
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={6}>
              6
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={7}>
              7
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={8}>
              8
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={9}>
              9
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={10}>
              10
            </MenuItem>
          </Select>
          <p className="MaisonNeueMonoRegular font-thin text-sm mr-4 mt-2">
            $ {product.price}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
