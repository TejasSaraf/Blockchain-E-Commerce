import React, { useState, useEffect } from "react";
import { validateUser } from "../../scripts/Auth";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import TabMenu from "./TabMenu";
import { setAdmin } from "../../actions";

function Dashboard() {
  const isAdmin = useSelector((state) => state.isAdmin);

  const dispatch = useDispatch();

  if (isAdmin) {
    return (
      <div className="my-16 w-full">
        {/* <button className="text-white px-3 tracking-wider py-2 bg-black MaisonNeueMonoRegular">
          Create
        </button> */}
        <div className="mx-12 grid grid-cols-3 gap-3 px-12 py-8 text-center MaisonNeueMonoBold">
          <div className="">
            <h2 className="text-2xl my-2"> Total Users</h2>
            <h4 className="text-xl tracking-wider MaisonNeueMonoRegular font-bold">
              14
            </h4>
          </div>
          <div className="">
            <h2 className="text-2xl my-2"> Total Products</h2>
            <h4 className="text-xl tracking-wider MaisonNeueMonoRegular font-bold">
              14
            </h4>
          </div>
          <div className="">
            <h2 className="text-2xl my-2"> Total Orders</h2>
            <h4 className="text-xl tracking-wider MaisonNeueMonoRegular font-bold">
              14
            </h4>
          </div>
        </div>
        <div className="mx-12">
          {/* three tab menus to show the table with all the data with pagination and action button */}
          <TabMenu />
        </div>
      </div>
    );
  } else {
    return (
      <div className="text-center w-full my-60 py-8 ">
        <h3 className="MaisonNeueMonoRegular py-4 text-2xl tracking-wider">
          Not Authorized user
        </h3>
        <Link className="MaisonNeueMonoRegular text-md tracking-wider" to="/">
          GO BACK TO HOME.....
        </Link>
      </div>
    );
  }
}

export default Dashboard;
