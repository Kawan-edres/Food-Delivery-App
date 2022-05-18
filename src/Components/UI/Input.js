import React from 'react'
import classes from './Input.module.css'
const Input =React.forwardRef((props,ref)=> {
  return (
    <div className={classes.input}>
        <label htmlFor={props.input.id}>{props.label}</label>
        <input ref={ref} {...props.input} /*id={props.input.id}*/   />
        
        {/*  {...props.input}
        ama handly hamw propertyakan akat ka la inputawa det 
        agar type="text" habw awa yaksar handli akat
        boya id={props.input.id} lay abain chunka
        {...props.input} hamw shtakani inputakai 
        parrent copy paste akat wakw xoy  
         */}
    </div>
  )

});

export default Input