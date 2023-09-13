import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Search from "../assets/Icons/search.svg";
import Profile from "../assets/Icons/profile.svg";
import Close from "../assets/Icons/close.svg";
import MensMenu from "./SubMenus/MensMenu";
import WomensMenu from "./SubMenus/WomensMenu";
import KidsMenu from "./SubMenus/KidsMenu";
import ExploreMenu from "./SubMenus/ExploreMenu";
import SearchDialog from "./SubMenus/SearchDialog";
import LoginModal from "./SubMenus/LoginModal";
import AddToCart from "./SubMenus/AddToCart";
import { useSelector, useDispatch } from 'react-redux';
import { setCount } from "../actions";
import { getCartCount } from "../scripts/cart";

function NavScrollExample() {
  const [dialog, setDialog] = useState("");
  const [vertialDialog, setVertialDialog] = useState(false);

  const isAdmin = useSelector(state => state.isAdmin);
  const cartCount = useSelector((state) => state.cartCount);
  const isLoggedin = useSelector((state) => state.loggedIn);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadCartCount = async () => {
      await getCartCount().then((res) => {
        dispatch(setCount(res.data.count))
      })
    }
    
    if(localStorage.getItem('AuthToken')){
      loadCartCount();
    }
  },[])

  const Dialog = ({ open, children }) => {
    return (
      <dialog
        className="w-full absolute inset-x-0 top-18 mt-3 pt-10 z-50 px-20 pointer-cursor"
        open={open}
      >
        <button onClick={() => setDialog("")}>
          <img src={Close} className="h-8 w-8 right-6 absolute top-5" />
        </button>
        {children}
      </dialog>
    );
  };

  const VerticalDialog = ({ open, children }) => {
    return (
      <dialog
        className="mr-0 w-3/12 absolute top-12 right-0 h-screen overflow-hidden z-50 pointer-cursor"
        open={open}
      >
        <button onClick={() => setVertialDialog(false)}>
          <img src={Close} className="h-8 w-8 right-6 absolute top-5" />
        </button>
        {children}
      </dialog>
    );
  };

  return (
    <div className="">
      <div className="flex justify-between align-middle -mb-6 mx-12 my-8 sticky top-0 cursor-pointer">
        <div className="">
          {/* left side of the menu */}
          <button
            onClick={() => {
              setDialog("men");
            }}
            className="px-6 py-3 tracking-wider hover:bg-black hover:text-white hover:rounded-sm"
            to="#"
          >
            MEN
          </button>
          <button
            className="px-6 py-3 tracking-wider hover:bg-black hover:text-white hover:rounded-sm"
            onClick={() => {
              setDialog("women");
            }}
            to="#"
          >
            WOMEN
          </button>
          <button
            className="px-6 py-3 tracking-wider hover:bg-black hover:text-white hover:rounded-sm"
            onClick={() => {
              setDialog("kids");
            }}
            to="#"
          >
            KIDS
          </button>
          <button
            onClick={() => {
              setDialog("explore");
            }}
            className="px-6 py-3 tracking-wider hover:bg-black hover:text-white hover:rounded-sm"
            to="#"
          >
            EXPLORE
          </button>
          {isAdmin ? (
            <Link
              to="/admin"
              className="px-6 py-3 tracking-wider hover:bg-black hover:text-white hover:rounded-sm"
            >
              ADMIN
            </Link>
          ) : (
            <></>
          )}
        </div>
        <div className="">
          <Link to="/">
            <h1 className="font-black text-3xl no-underline Logo">AGES</h1>
          </Link>
        </div>
        <div className="flex">
          <button
            onClick={() => {
              setDialog("search");
            }}
          >
            <img className="mx-8" src={Search} />
          </button>
          <button
            onClick={() => {
              setDialog("profile");
            }}
          >
            <img className="mx-8" src={Profile} />
          </button>
          <button
            onClick={() => {
              setVertialDialog(true);
              setDialog("");
            }}
            className="mx-4 rounded-full border px-3 h-10 mt-2 border-2 border-slate-950"
          >
            <p className="MaisonNeueMonoRegular">{ isLoggedin ? cartCount : 0 }</p>
          </button>
        </div>
      </div>
      <Dialog open={dialog == "men"}>
        <MensMenu />
      </Dialog>
      <Dialog open={dialog == "women"}>
        <WomensMenu />
      </Dialog>
      <Dialog open={dialog == "kids"}>
        <KidsMenu />
      </Dialog>
      <Dialog open={dialog == "explore"}>
        <ExploreMenu />
      </Dialog>
      <Dialog open={dialog == "search"}>
        <SearchDialog />
      </Dialog>
      <Dialog open={dialog == "profile"}>
        <LoginModal />
      </Dialog>
      <VerticalDialog open={vertialDialog}>
        <AddToCart cartCount={cartCount} />
      </VerticalDialog>
    </div>
  );
}

export default NavScrollExample;
