import { Switch, Route } from "react-router-dom";
import "./App.css";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Team from "./pages/Team";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Favorites from "./pages/Favorites";
import ProductDetail from "./pages/ProductDetail";
import CategoryFilter from "./pages/CategoryFilter";
import Signup from "./pages/Signup";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Axios from "axios";
import { useHistory } from "react-router";
import ConfirmOrder from "./pages/ConfirmOrder";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      history.push("/login");
    }
  }, [token, history]);

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        // “Bearer ” + token
        Axios.defaults.headers.common["Authorization"] = token;

        try {
          const response = await Axios.get(
            "https://workintech-fe-ecommerce.onrender.com/verify"
          );
          const userData = response.data;

          // reduxa yazdır
          dispatch({ type: "SET_USER", payload: userData });
          toast.info(userData.name + " Hoşgeldin!", {
            position: "top-right",
          });

          // Renew
          localStorage.setItem("token", userData.token);
          Axios.defaults.headers.common["Authorization"] = userData.token;
        } catch (error) {
          // token yetkili degilse sil localden ve headerdan
          console.error("Token verification failed:", error);
          localStorage.removeItem("token");
          delete Axios.defaults.headers.common["Authorization"];
        }
      }
    };

    checkToken();
  }, [dispatch]);

  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/products" exact>
          <ProductList />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/team" exact>
          <Team />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/favorites" exact>
          <Favorites />
        </Route>
        <Route path="/cart" exact>
          <Cart />
        </Route>
        <Route path="/confirm" exact>
          <ConfirmOrder />
        </Route>
        <Route path="/product/:category/:productId/:productNameSlug">
          <ProductDetail />
        </Route>
        <Route path="/shopping/:categoryId/:category">
          <CategoryFilter />
        </Route>
        {/* <Route path="/productpage" exact>
          <ProductDetail />
          </Route>*/}
        <Route path="/contact" exact>
          <Contact />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
