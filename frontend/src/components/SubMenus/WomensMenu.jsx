import React from 'react'
import { Link } from "react-router-dom";

function WowomensMenu() {
  return (
    <div className="grid grid-cols-5 gap-0">
      <div>
        <h1 className="font-bold text-md categories-heading mb-2">FEATURED</h1>
        <ul className="block">
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/"
            >
              EXPLORE WOMEN'S
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/new-styles"
            >
              NEW STYLES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/"
            >
              VIEW ALL
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/gift-Cards"
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
              to="/explore/women/"
            >
              ALL CLOTHINGS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/winter-jacket"
            >
              INSULATED JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/jacket"
            >
              NON-INSULATED JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/vests"
            >
              VESTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/sweaters"
            >
              SWEATERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/midlayers"
            >
              SWEATSHIRTS AND MIDLAYERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/short-sleeve-shirts"
            >
              SHORT SLEEVE SHIRTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/long-sleeve-shirts"
            >
              LONG SLEEVE SHIRTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/pants-and-short"
            >
              PANTS AND SHORTS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/base-layers"
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
              to="/explore/women/accessories"
            >
              ALL ACCESSORIES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/shoes"
            >
              SHOES
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women"
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
              to="/explore/women/snow"
            >
              ALL SNOW COLLECTION
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/winter-jackets"
            >
              JACKETS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/midlayers"
            >
              MIDLAYERS
            </Link>
          </li>
          <li>
            <Link
              className="text-xs tracking-wider hover:text-slate-400"
              to="/explore/women/pants-and-shorts"
            >
              PANTS AND SHORTS
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default WowomensMenu