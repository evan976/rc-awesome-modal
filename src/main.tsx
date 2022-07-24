import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.scss'

import { OverlayDemo } from '@/packages/overlay/__example__'

const root = createRoot(document.getElementById('root')!)
root.render(<OverlayDemo />)