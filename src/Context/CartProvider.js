import { useReducer } from 'react';
import CartContext from './cart-context'

const defaultCartState={
    items:[],
    totalAmount:0
}
const cartReducer = (state, action) => {
    if(action.type==='ADD'){
        //defualt stateakaya  concat new aaray zyad akat w be away konka tek bda
        const updatedTotalAmount=state.totalAmount + (action.item.price * action.item.amount) // price * amount ;
        
        const existingCardItemIndex=state.items.findIndex(item=>item.id===action.item.id)//indexy away haya lagall indexy away add akre
        const existingCardItem=state.items[existingCardItemIndex]//idexkaman wargrt  away xoman 
        let updatedItem;
        let updatedItems;
        if(existingCardItem){ //agar exist bet yakam jary nabet 
            updatedItem={
                ...existingCardItem,//abe indexakay away xoman warbgrinawa 
                amount:existingCardItem.amount +action.item.amount//lerash amounty away xoman + amount new akain 

            }
            updatedItems=[...state.items];
            updatedItems[existingCardItemIndex]=updatedItem
        }
        else{ //agar yakam jary bet
            
            updatedItems=state.items.concat(action.item); //concat la w3school taqy bkarawa gar birchw  
        }

        

        return{
            items:updatedItems, //statekaya 
            totalAmount:updatedTotalAmount//statekaya 
        }


    }//add area
    if(action.type==="REMOVE"){
        const existingCartItemIndex=state.items.findIndex(item=>item.id===action.id)
    
    const existingItem=state.items[existingItem]
    const updatedTotalAmount=state.totalAmount-existingItem.price;  
    let updatedItems
    if(existingItem.amount===1){
         updatedItems=state.items.filter(item=>item.id !==action.id );
    }
    else {
        const updatedItem = { ...existingItem, amount: existingItem.amount - 1 };
        updatedItems = [...state.items];
        updatedItems[existingCartItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
        totalAmount: updatedTotalAmount
      };

    return defaultCartState;
};}

const CartProvider = (props) => {
   const[cartState,dispatchCartAcion]= useReducer(cartReducer,defaultCartState);
  

    const addItemToCartHandler = (item) => {
        dispatchCartAcion({
            type:'ADD',
            item:item //item lerada aw item aya ka la argumenty functiona ka bomman det w savey akain 
        })
    };
    const removeItemFromCartHandler = (id) => {
        dispatchCartAcion({
            type:'REMOVE',
            id:id  // lerash id itemaka war agrin bo remove
        })
    }; 
    //this is an helper object to handle the props the comes from the context is self 
    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem:addItemToCartHandler ,
     //    removeItem:removeItemFromCartHandler ,
    };
  
    
  return (
    <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider




    
   
   
  