
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar"
import { Route, Switch } from "react-router-dom"
import Footer from "./components/Footer";
import Product from "./components/Product";
import Explore from "./components/Explore";
import NotFound404 from "./components/NotFound404";
import Dashboard from "./components/Admin/Dashboard";
import CreateProductForm from "./components/Admin/CreateProductForm";
import Checkout from "./components/Checkout";

function App() {

  return (
    <>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/product/:slug" component={Product} />
        <Route exact path="/explore/:gender/:category" component={Explore} />
        <Route exact path="/explore/:gender/" component={Explore} />
        <Route exact path="/checkout/cart" component={Checkout} />

        {/* Admin routes */}
        <Route exact path="/admin" component={Dashboard} />
        <Route exact path="/create/product" component={CreateProductForm} />

        {/* 404 page */}
        <Route exact path="*" component={NotFound404} />

      </Switch>

      <Footer />
    </>
  )
}

export default App;
