import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import { ModalRef, ModalProps } from './interface'

const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  return (
    <div></div>
  )
})

export default Modal
