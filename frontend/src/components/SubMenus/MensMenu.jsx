import React from "react";
import { Link } from "react-router-dom";

function MensMenu() {
  return (
    <div className="grid grid-cols-5 gap-0">
      <div>
        <h1 className="font-bold text-md categories-heading mb-2">FEATURED</h1>
        <ul className="block">
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/"
            >
              EXPLORE MEN'S
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/new-styles"
            >
              NEW STYLES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/"
            >
              VIEW ALL
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/gift-Cards"
            >
              GIFT CARDS
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
              to="/explore/men/"
            >
              ALL CLOTHINGS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/winter-jacket"
            >
              INSULATED JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/jacket"
            >
              NON-INSULATED JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/vests"
            >
              VESTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/sweaters"
            >
              SWEATERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/midlayers"
            >
              SWEATSHIRTS AND MIDLAYERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/short-sleeve-shirts"
            >
              SHORT SLEEVE SHIRTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/long-sleeve-shirts"
            >
              LONG SLEEVE SHIRTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/pants-and-short"
            >
              PANTS AND SHORTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/base-layers"
            >
              BASE LAYERS
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
              to="/explore/men/accessories"
            >
              ALL ACCESSORIES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/shoes"
            >
              SHOES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/hats"
            >
              HATS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/small-hats"
            >
              SMALL HATS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/watches"
            >
              WATCHES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men"
            >
              OTHERS
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
              to="/explore/men/snow"
            >
              ALL SNOW COLLECTION
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/winter-jackets"
            >
              JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/midlayers"
            >
              MIDLAYERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/men/pants-and-shorts"
            >
              PANTS AND SHORTS
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MensMenu;
