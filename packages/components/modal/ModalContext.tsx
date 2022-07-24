import { createContext } from 'react'

export type ModalContexProps = {
  visible?: boolean
}

const ModalContext = createContext<ModalContexProps>({})

export default ModalContext
