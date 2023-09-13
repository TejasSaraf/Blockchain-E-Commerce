import React from "react";
import contactUsPoster from "../../assets/Images/contactUs.webp";

function ContactUsForm() {
  return (
    <div className="w-full bg-gray-100 px-24 py-24 grid grid-cols-5 gap-4 my-20">
      <div className="col-span-2 block">
        <h1 className="text-4xl ">
          Join our email list and receive exclusive updates.
        </h1>
        <input
          placeholder="Email address"
          className="w-3/4 h-12 align-middle px-8 mt-4 rounded-full mr-22 email-input font-lg"
          type="text"
        />
        <div className="flex mt-1 ml-2">
          <div className="mx-2">
            <input type="checkbox" id="men" name="men" value="men" />
            <label className=" ml-1 text-xs align-middle mt-1 pt-1" for="men">
              {" "}
              MEN
            </label>
          </div>
          <div className="mx-2">
            <input type="checkbox" id="womens" name="womens" value="womens" />
            <label
              className=" ml-1 text-xs align-middle mt-1 pt-1"
              for="womens"
            >
              {" "}
              WOMENS
            </label>
          </div>
          <div className="mx-2">
            <input type="checkbox" id="kids" name="kids" value="kids" />
            <label className=" ml-1 text-xs align-middle mt-1 pt-1" for="kids">
              {" "}
              KIDS
            </label>
          </div>
        </div>
        <button className="rounded-full px-3 w-full align-middle h-12 uppercase mt-3 border bg-black outline-black border-black">
          <p className="text-white text-md tracking-widest">JOIN EMAIL LIST</p>
        </button>
      </div>
      <div className="col-span-3 ml-36 w-3/4 flex">
        <div className="w-2/6">
          <h1 className="text-4xl ">Visit our stores.</h1>
          <div className="w-full mt-14">
            <label className="rounded-full px-3 ml-1 h-8 py-2 text-xs align-middle black-border">
              PUNE
            </label>
            <label className="rounded-full px-3 ml-1 -mt-1 h-8 py-2 text-xs align-middle black-border">
              MUMBAI
            </label>
            <label className="rounded-full px-3 ml-1 -mt-1 h-8 py-2 text-xs align-middle black-border">
              NASHIK
            </label>
            <label className="rounded-full px-3 ml-1 -mt-1 h-8 py-2 text-xs align-middle black-border">
              SAMBHAJI NAGAR
            </label>
          </div>
        </div>
        <img src={contactUsPoster} className="h-56 my-auto ml-10" />
      </div>
    </div>
  );
}

export default ContactUsForm;
