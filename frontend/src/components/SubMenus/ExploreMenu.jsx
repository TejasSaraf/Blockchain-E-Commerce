import React from "react";
import { Link } from "react-router-dom";

function ExploreMenu() {
  return (
    <div className="grid grid-cols-5 gap-0">
      <div>
        <h1 className="font-bold text-md categories-heading mb-2">ABOUT</h1>
        <ul className="block">
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men"
            >
              ABOUT US
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men"
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default ExploreMenu;
