import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import Header from "./Components/Layout/Header";
import Meals from "./Components/Meals/Meals";
import CartProvider from "./Context/CartProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };
  const hideCartHandler = () => {
    setCartIsShown(false);
  };  
  return (
    <CartProvider >
    {/* //conditional rendering */}
    {cartIsShown && <Cart onClose={hideCartHandler} /> }
    {/* //pointing to the function */}
    <Header onShowCart={showCartHandler}  />
    <main>
    <Meals />

    </main>
     
    </CartProvider>
  );
}

export default App;
