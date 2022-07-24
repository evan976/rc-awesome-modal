import React, { useState } from 'react'
import Modal from '../Modal'

export const ModalDemo: React.FC = () => {

  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>显示</button>
      <Modal
        visible={visible}
        title='标题'
        onClose={() => setVisible(false)}
        // footer={null}
        destroyOnClose
        onCancel={() => console.log('取消')}
        onOk={() => console.log('确定')}
      >
        <div>hello world...</div>
        <div>hello world...</div>
        <div>hello world...</div>
      </Modal>
    </>
  )
}