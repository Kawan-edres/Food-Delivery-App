import {Fragment}from 'react'
import ReactDOM   from 'react-dom'
import classes from './Modal.module.css'

const Backdrop = (props) => {
    return <div onClick={props.C} className={classes.backdrop}></div>
}
const ModalOverLay = (props) => {
    return (
        <div  className={classes.modal}>
           <div className={classes.content}>
               {props.children}
           </div>
        </div>
    )
}
// main
const Modal = (props) => {
    const portalSelector=document.getElementById('overlays');
  return (
    <Fragment>
    {ReactDOM.createPortal(<Backdrop C={props.onClose} /> ,portalSelector)}
    {ReactDOM.createPortal(<ModalOverLay>{props.children}</ModalOverLay>,portalSelector)}
    
    </Fragment>
  )
}

export default Modal