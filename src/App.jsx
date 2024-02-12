import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './layouts/Header';
import Footer from './layouts/Footer';
import Home from './pages/Home';
import ProductList from './pages/ProductList';
import Team from './pages/Team';
import About from './pages/About';
import Contact from './pages/Contact';

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
        <Route path="/contact" exact>
          <Contact />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;