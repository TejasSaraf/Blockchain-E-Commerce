import React from "react";
import { Link } from "react-router-dom";

function KidsMenu() {
  return (
    <div className="grid grid-cols-5 gap-0">
      <div>
        <h1 className="font-bold text-md categories-heading mb-2">FEATURED</h1>
        <ul className="block">
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/"
            >
              EXPLORE KID'S
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/"
            >
              VIEW ALL
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-md categories-heading mb-2">CLOTHING</h1>
        <ul className="block">
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/"
            >
              ALL CLOTHINGS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/winter-jacket"
            >
              INSULATED JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/jacket"
            >
              NON-INSULATED JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/sweaters"
            >
              SWEATERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/shirts"
            >
              SHIRTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/pants-and-short"
            >
              PANTS AND SHORTS
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-md categories-heading mb-2">
          ACCESSORIES
        </h1>
        <ul className="block">
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/shoes"
            >
              SHOES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/hats"
            >
              HATS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/watches"
            >
              WATCHES
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h1 className="font-bold text-md categories-heading mb-2">SNOW</h1>
        <ul className="block">
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/snow"
            >
              ALL SNOW COLLECTION
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/winter-jackets"
            >
              JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/midlayers"
            >
              MIDLAYERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/kids/pants-and-shorts"
            >
              PANTS AND SHORTS
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default KidsMenu;
