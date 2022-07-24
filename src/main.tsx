import React from 'react'
import { createRoot } from 'react-dom/client'
import './style/index.scss'

// import { OverlayDemo } from 'packages/components/overlay/__example__'
import { ModalDemo } from '@components/modal/__example__'

const root = createRoot(document.getElementById('root')!)
root.render(<ModalDemo />)