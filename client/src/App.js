import { Route } from "react-router-dom";
import Detail from './Components/detail';
import CartState from './Context/ShoppingCart/cartState';
import NavBar from './Components/Header/NavBar';

const App = () => {
  return (
    <CartState>
      <div>
        <Route path="/" component={NavBar} />
        <Route path="/" component={Detail} />
      </div>
    </CartState>
  );
}

export default App;