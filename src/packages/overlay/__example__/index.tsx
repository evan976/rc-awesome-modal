import React, { useState } from 'react'
import Overlay from '../Overlay'

export const OverlayDemo: React.FC = () => {

  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>显示</button>
      <Overlay visible={visible} onClick={() => setVisible(false)} />
    </>
  )
}