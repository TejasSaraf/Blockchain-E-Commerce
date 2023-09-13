import React, { useState, useEffect } from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { getCart } from "../scripts/cart";
import { useSelector } from "react-redux";
import Jacket from "../assets/Images/jacket.webp";
import { placeOrder } from "../scripts/orders";
import toast, { Toaster } from 'react-hot-toast';

function Checkout() {
  const [country, setCountry] = useState("india");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [address, setAddress] = useState("");
  const [company, setCompany] = useState("");
  const [apartment, setAppartment] = useState("");
  const [city, setCity] = useState("pune");
  const [state, setState] = useState("maharashtra");
  const [pin, setPin] = useState("");
  const [phone, setPhone] = useState("");
  const [cartItems, setCartItems] = useState([]);

  const subTotal = useSelector((state) => state.subTotal);

  useEffect(() => {
    loadCartItems();
  }, []);

  const loadCartItems = async () => {
    await getCart().then((res) => {
      setCartItems(res.data.data);
    });
  };

  const PlaceAnOrder = async (e) => {
    e.preventDefault();
    const data = {
      amount: ((subTotal/100)*12 + subTotal).toString(),
      paymentMode: "ether"
    }
    await placeOrder(data).then((res) => {
      if(res.data.status == "error"){
        toast.error(res.data.message);
      }
    })
  }

  return (
    <div className="flex mx-48 my-24">
      <div className="w-7/12">
        {/* current user information */}
        <h1 className="font-black text-5xl no-underline Logo">AGES</h1>
        <h1 className="MaisonNeueMonoRegular text-lg font-bold tracking-wider mt-3">
          Contact information
        </h1>
        <div className="pl-8 mt-3">
          <p className="uppercase tracking-widest font-thin">
            Prashant Vijay Chavan
          </p>
          <p className="font-thin text-xs tracking-widest">
            prashantch@gmail.com
          </p>
        </div>
        {/* address details and other details */}
        <h1 className="MaisonNeueMonoRegular text-lg font-bold tracking-wider mt-12">
          Shipping Address
        </h1>
        <div className="px-8 py-4">
          <Select
            labelId="demo-simple-select-label"
            className="rounded-full w-full h-14 border-2 MaisonNeueMonoRegular border-black"
            value={country}
            onChange={(e) => {
              e.preventDefault();
              setCountry(e.target.value);
            }}
          >
            <MenuItem className="MaisonNeueMonoRegular" value={"india"}>
              India
            </MenuItem>
            <MenuItem className="MaisonNeueMonoRegular" value={"usa"}>
              USA
            </MenuItem>
          </Select>
          <div className="flex mt-2">
            <input
              value={fName}
              placeholder="First name"
              className="w-full mr-1 font-thin h-12 px-3 text-sm rounded-sm border-2 border-black MaisonNeueMonoRegular"
              onChange={(e) => setFName(e.target.value)}
              type="text"
            />
            <input
              value={lName}
              placeholder="Last name"
              className="w-full font-thin h-12 px-3 text-sm rounded-sm border-2 border-black MaisonNeueMonoRegular"
              onChange={(e) => setLName(e.target.value)}
              type="text"
            />
          </div>
          <input
            value={company}
            placeholder="Company Name (optional)"
            className="w-full mt-2 font-thin h-12 px-3 text-sm rounded-sm border-2 border-black MaisonNeueMonoRegular"
            onChange={(e) => setCompany(e.target.value)}
            type="text"
          />
          <input
            value={address}
            placeholder="Address"
            className="w-full mt-2 font-thin h-12 px-3 text-sm rounded-sm border-2 border-black MaisonNeueMonoRegular"
            onChange={(e) => setAddress(e.target.value)}
            type="text"
          />
          <input
            value={apartment}
            placeholder="Apartment/suite ( optional )"
            className="w-full mt-2 font-thin h-12 px-3 text-sm rounded-sm border-2 border-black MaisonNeueMonoRegular"
            onChange={(e) => setAppartment(e.target.value)}
            type="text"
          />
          <div className="flex mt-2">
            <Select
              labelId="demo-simple-select-label"
              className="rounded-full w-full h-14 border-2 MaisonNeueMonoRegular border-black"
              value={city}
              onChange={(e) => {
                e.preventDefault();
                setCity(e.target.value);
              }}
            >
              <MenuItem className="MaisonNeueMonoRegular" value={"pune"}>
                Pune
              </MenuItem>
              <MenuItem className="MaisonNeueMonoRegular" value={"mumbai"}>
                Mumbai
              </MenuItem>
            </Select>
            <Select
              labelId="demo-simple-select-label"
              className="rounded-full w-full mx-2 h-14 border-2 MaisonNeueMonoRegular border-black"
              value={state}
              onChange={(e) => {
                e.preventDefault();
                setState(e.target.value);
              }}
            >
              <MenuItem className="MaisonNeueMonoRegular" value={"maharashtra"}>
                Maharashtra
              </MenuItem>
              <MenuItem className="MaisonNeueMonoRegular" value={"usa"}>
                Kerala
              </MenuItem>
            </Select>
            <input
              value={pin}
              placeholder="Pin code"
              className="w-full font-thin h-14 px-3 text-sm rounded-sm border-2 border-black MaisonNeueMonoRegular"
              onChange={(e) => setPin(e.target.value)}
              type="number"
            />
          </div>
          <input
            value={phone}
            placeholder="Phone"
            className="w-full mt-2 font-thin h-12 px-3 text-sm rounded-sm border-2 border-black MaisonNeueMonoRegular"
            onChange={(e) => setPhone(e.target.value)}
            type="number"
          />

          <button onClick={PlaceAnOrder} className="mt-3 float-right bg-black w-2/6 rounded-md h-12 text-white tracking-widest text-md font-thin form-button">
            Continue shipping
          </button>
        </div>
        {/* on clicking the continue shipping the payment mode should be rendered */}
      </div>
      <div className="w-5/12">
        {/* content of the cart */}
        <div className="overflow-scroll h-2/5 no-scrollBar px-4 py-3 cart-item-container">
          {cartItems.map((product) => {
            return (
              <div className="flex relative h-24 w-3/4 my-2">
                <img src={Jacket} className="" />
                <div className="px-3 py-1">
                  <p className="text-sm uppercase tracking-widest font-thin">
                    {product.product.productName}
                  </p>
                  <div className="flex justify-between mt-auto absolute bottom-px w-full">
                    <p>{product.quantity}</p>
                    <p className="">${product.product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* subtotal and total price money */}
        <hr className="border-black border-2 my-4" />
        <div className="flex w-full justify-between">
          <p className="text-sm font-semibold">SUBTOTAL</p>
          <p className="text-sm">${subTotal}</p>
        </div>
        <div className="flex w-full mt-2 justify-between">
          <p className="text-sm font-semibold">TAXES</p>
          <p className="text-sm">${(subTotal/100)*12}</p>
        </div>
        <div className="flex w-full mt-2 justify-between">
          <p className="text-sm font-semibold"></p>
          <p className="text-md font-semibold">${(subTotal/100)*12 + subTotal}</p>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Checkout;
