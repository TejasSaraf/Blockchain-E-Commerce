import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="footer mt-20 mb-8 w-full cursor-pointer">
      <h1 className="text-9xl footer-title">AGES</h1>
      <div className="grid grid-cols-5 gap-0 ml-16 px-20 mt-12">
        <div>
          <h1 className="tracking-widest text-md">MEN</h1>
          <div className="mt-6">
            <Link to="/explore/men">
              <p className="uppercase text-xs tracking-widest hover:text-slate-400">EXPLORE MEN's</p>
            </Link>
            <Link to="/explore/men">
              <p className="uppercase mt-2 text-xs tracking-widest hover:text-slate-400">CLOTHING</p>
            </Link>
            <Link to="/explore/men/snow">
              <p className="uppercase mt-2 text-xs tracking-widest hover:text-slate-400">SNOW</p>
            </Link>
            <Link to="/explore/men/accessories">
              <p className="uppercase mt-2 text-xs tracking-widest hover:text-slate-400">
                ACCESSORIES
              </p>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="tracking-widest text-md">WOMEN's</h1>
          <div className="mt-6">
            <Link to="/explore/women/accessories">
              <p className="uppercase mt-2 text-xs tracking-widest hover:text-slate-400">
                ACCESSORIES
              </p>
            </Link>
            <Link to="/explore/women">
              <p className="uppercase mt-2 text-xs tracking-widest hover:text-slate-400">
                CLOTHINGS
              </p>
            </Link>
            <Link to="/explore/women/trending-fashion">
              <p className="uppercase mt-2 text-xs tracking-widest hover:text-slate-400">
                TRENDING WITH FASHION
              </p>
            </Link>
          </div>
        </div>
        <div>
          <h1 className="tracking-widest text-md">KID'S</h1>
          <div className="mt-6">
          <Link to="/explore/kids"><p className="uppercase text-xs tracking-widest hover:text-slate-400">CLOTHING'S</p></Link>
          </div>
        </div>
        <div>
          <h1 className="tracking-widest text-md">ABOUT US</h1>
          <div className="mt-6">
            <Link to="/about-us"><p className="uppercase text-xs tracking-widest hover:text-slate-400">ABOUT US</p></Link>
            <Link to="/faq"><p className="uppercase mt-2 text-xs tracking-widest hover:text-slate-400">FAQ</p></Link>
          </div>
        </div>
      </div>
      <div className="top-border-thin mt-24 mx-10 flex justify-between py-3 MaisonNeueMonoRegular text-xs tracking-wider">
        <p>YOU ONLY LIVE ONCE, BUT IF YOU DO IT RIGHT, ONCE IS ENOUGH.</p>
        <div className="flex">
          <p>© 2023 ALL RIGHTS RESERVED</p>
          <p className="ml-4">PRIVACY</p>
          <p className="ml-4">TERM OF USE</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
