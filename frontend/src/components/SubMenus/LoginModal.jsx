import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginCall, registerCall, forgotPassword } from "../../scripts/Auth";
import { validateUser } from "../../scripts/Auth";
import { setAdmin, setLogIn } from "../../actions";
import { getBalance } from "../../scripts/orders";

function LoginModal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phNo, setPhNo] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mode, setMode] = useState(
    localStorage.getItem("AuthToken") ? "user" : "login"
  );
  const [user, setUser] = useState({});
  const [balance, setBalance] = useState(0);

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("AuthToken")) {
      getUser();
      dispatch(setLogIn(true));
    }
  }, []);

  const clearFields = () => {
    setName("");
    setEmail("");
    setPhNo("");
    setPassword("");
    setConfirmPassword("");
  };

  const loadBalance = async () => {
    await getBalance().then((res) => {
      setBalance(res.data.balance);
    });
  };

  const getUser = async () => {
    await validateUser().then((data) => {
      if (data.data.isAdmin) {
        dispatch(setAdmin(true));
      }
      setUser(data.data);
      loadBalance();
      setMode("user");
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    const res = await loginCall(data);
    if (res.data.isAdmin) {
      dispatch(setAdmin(true));
      dispatch(setLogIn(true));
      history.push("/admin");
      setMode("");
    }
    if (res.data.user) {
      localStorage.setItem("AuthToken", res.data.user);
      dispatch(setLogIn(true));
      clearFields();
      getUser();
      setMode("");
    } else {
      setMode("login");
      alert(res.data.message);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      // raise a toast which says password does'nt matchpos
    }
    const data = {
      name: name,
      email: email,
      phoneNo: phNo,
      password: password,
    };

    const res = await registerCall(data);
    if (res.status) {
      setMode("login");
      clearFields();
    }
  };

  const handleForgetPassword = async (e) => {
    const data = {
      email: email,
    };

    const res = await forgotPassword(data);
    if (res.status == "ok") {
      // toast with your password reset link is sent on ur email Id
      setMode("login");
      clearFields();
    }
  };

  if (mode === "user") {
    return (
      <div className="block my-10">
        <h1 className="font-black tracking-wider leading-2 text-3xl mb-2">
          Hello {user.name}
        </h1>
        <h1 className="text-sm"> {balance} ETH</h1>
        <button
          onClick={() => {
            setMode("login");
            localStorage.removeItem("AuthToken");
            localStorage.removeItem("isAdmin");
            dispatch(setAdmin(false));
            dispatch(setLogIn(false));
          }}
          className="mt-3 mb-3 text-right w-full pl-2 forgot-password"
        >
          logout
        </button>
      </div>
    );
  }

  if (mode === "forgotPassword") {
    return (
      <div className="block my-10">
        <form className="block w-3/6 mx-auto" onSubmit={handleForgetPassword}>
          <h1 className="font-black tracking-wider leading-2 text-3xl mb-2">
            FORGOT PASSWORD
          </h1>
          <p className="mt-3 mb-8 text-sm ">
            Please enter your email and we will send you a link you can use to
            create a new password.
          </p>
          <input
            value={email}
            placeholder="EMAIL ADDRESS"
            className="w-full font-thin h-12 px-8 text-sm rounded-full border-2 border-black  mb-6"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <input
            className="w-full bg-black rounded-full h-12 text-white tracking-wideest text-md font-thin form-button mt-2"
            type="submit"
            value="RECOVER ACCOUNT"
          />
          <div className="w-full px-6">
            <button
              onClick={() => {
                setMode("login");
              }}
              className="mt-3 mb-3 text-left w-full pl-2 forgot-password"
            >
              BACK TO LOGIN
            </button>
          </div>
        </form>
      </div>
    );
  }
  if (mode === "register") {
    return (
      <div className="block my-10">
        <form className="block w-3/6 mx-auto " onSubmit={handleSignup}>
          <h1 className="font-black tracking-wider leading-2 text-3xl mb-4">
            REGISTER
          </h1>
          <input
            value={name}
            placeholder="NAME"
            className="w-full font-thin h-12 px-8 text-sm rounded-full border-2 border-black "
            onChange={(e) => setName(e.target.value)}
            type="text"
          />
          <input
            value={email}
            placeholder="EMAIL ADDRESS"
            className="w-full font-thin h-12 px-8 text-sm rounded-full border-2 border-black  mt-2"
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <input
            value={phNo}
            placeholder="NUMBER"
            className="w-full font-thin h-12 px-8 text-sm rounded-full border-2 border-black  mt-2"
            onChange={(e) => setPhNo(e.target.value)}
            type="number"
          />
          <input
            value={password}
            placeholder="PASSWORD"
            className="w-full h-12 font-thin px-8 mt-2 text-sm rounded-full border-2 border-black "
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <input
            value={confirmPassword}
            placeholder="CONFIRM PASSWORD"
            className="w-full h-12 font-thin px-8 mt-2 text-sm rounded-full border-2 border-black "
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
          />
          <button
            onClick={() => {
              setMode("login");
            }}
            className="mt-3 mb-3 text-right w-full forgot-password"
          >
            ALREADY HAVE AN ACCOUNT ?
          </button>
          <div className="w-full px-6">
            <input
              className="bg-black w-full rounded-full h-12 text-white tracking-wideest text-md font-thin form-button"
              type="submit"
              value="REGISTER"
            />
          </div>
        </form>
      </div>
    );
  }
  if (mode === "login") {
    return (
      <div className="block my-10">
        <form className="block w-5/12 mx-auto " onSubmit={handleLogin}>
          <div className="flex">
            <h1 className="font-black tracking-wider leading-2 text-3xl mb-4">
              LOGIN
            </h1>
            <button
              onClick={() => {
                setMode("register");
              }}
              className="mt-2 mb-3 text-sm text-right w-full pr-2 forgot-password"
            >
              REGISTER
            </button>
          </div>
          <input
            value={email}
            placeholder="EMAIL ADDRESS"
            className="w-full font-thin h-12 px-8 text-sm rounded-full border-2 border-black "
            onChange={(e) => setEmail(e.target.value)}
            type="text"
          />
          <input
            value={password}
            placeholder="PASSWORD"
            className="w-full h-12 font-thin px-8 mt-2 text-sm rounded-full border-2 border-black "
            onChange={(e) => setPassword(e.target.value)}
            type="password"
          />
          <button
            onClick={() => {
              setMode("forgotPassword");
            }}
            className="mt-2 mb-3 text-right w-full pr-2 forgot-password"
          >
            FORGOT PASSWORD
          </button>
          <input
            className="bg-black w-full rounded-full h-12 text-white tracking-wideest text-md font-thin form-button"
            type="submit"
            value="LOGIN"
          />
        </form>
      </div>
    );
    // TO do add the profile page in which we can view the stats and profile pic of the current user
  }
}

export default LoginModal;
