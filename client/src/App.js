import './App.css';
import Detail from './Components/detail';
import CartState from './Context/ShoppingCart/cartState';
const App = () => {
  return (
    <CartState>
      <div className="App">
        <Detail/>
      </div>
    </CartState>
  );
}

export default App;
