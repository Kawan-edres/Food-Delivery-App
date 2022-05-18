import { useContext,useEffect,useState } from 'react'
// aw obj ektaya ka useContext() hayaty 
import CartContext from '../../Context/cart-context' 
 
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css'

const HeaderCartButton = (props) => {

  const cartCtx=useContext(CartContext);  //CartContext awayanaka la store a kadaya chunka hamuly lawe save dabe 
  const {items}=cartCtx;//object destructuring
  const [btnIsHighlighted,setBtnIsHighlighted]=useState(false)
  const numberOfItems=items.reduce((curNumber,item)=>{ //reduce methode komalle item dakata 1 item  
    return curNumber+item.amount;
  },0);

  const btnClasses=`${classes.button} ${btnIsHighlighted?classes.bump:""}`;
  useEffect(()=>{
    if(items.length===0){
      return;
    }
     setBtnIsHighlighted(true);
     const timer=setTimeout(()=>{
        setBtnIsHighlighted(false);
     },100) 


     return ()=>{
        clearTimeout(timer);
     }

  },[items])
  return (
   <button className={btnClasses} onClick={props.onClick}>
       <span className={classes.icon}>
           <CartIcon />
       </span>
       <span> Your Cart </span>
       <span className={classes.badge}>{numberOfItems}</span>
   </button>
  )
}

export default HeaderCartButton