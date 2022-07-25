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
        title='title'
        okText='confirm'
        cancelText='cancel'
        onClose={() => setVisible(false)}
        onOk={() => console.log('ok')}
        onCancel={() => console.log('cancel')}
      >
        <p>hello world...</p>
        <p>hello world...</p>
        <p>hello world...</p>
      </Modal>
    </>
  )
}
```
