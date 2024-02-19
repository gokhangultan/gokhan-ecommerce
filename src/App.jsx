import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Team from './pages/Team';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Card from './pages/Card';
import Favorites from './pages/Favorites';
import ProductDetail from './pages/ProductDetail';
import Signup from './pages/Signup';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <div>
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
        <Route path="/card" exact>
          <Card />
        </Route>
        <Route path="/productpage" exact>
          <ProductDetail />
        </Route>
        <Route path="/contact" exact>
          <Contact />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;