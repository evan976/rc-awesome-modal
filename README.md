# rc-awesome-modal

react 弹窗组件

安装

```bash
npm install rc-awesome-modal

# or

yarn add rc-awesome-modal
```

使用

```tsx
import * as React from 'react'
import { Modal } from 'rc-awesome-modal'
import 'rc-awesome-modal/dist/index.css'

function App () {
  const [visible, setVisible] = React.useState(false)

  return (
    <>
      <button onClick={() => setVisible(true)}></button>
      <Modal
        visible={visible}
        title='标题'
        onOk={() => {
          console.log('ok')
          setVisible(false)
        }}
        onCancel={() => {
          console.log('cancel')
          setVisible(false)
        }}
      >
        <p>hello world...</p>
        <p>hello world...</p>
        <p>hello world...</p>
      </Modal>
    </>
  )
}

```