import { CSSProperties, MouseEvent, ReactNode, RefObject } from 'react'

export interface ModalProps {
  /**
   * 是否可见
   * @default false
   */
  visible?: boolean
  /**
   * 标题
   */
  title?: string
  /**
   * 是否显示右上角的关闭按钮
   * @default true
   */
  closable?: boolean
  /**
   * 自定义关闭图标
   */
  closeIcon?: ReactNode
  /**
   * 是否显示遮罩层
   * @default true
   */
  overlay?: boolean
  /**
   * 点击遮罩层是否关闭模态框
   * @default true
   */
  overlayClosable?: boolean
  /**
   * 强制渲染 modal
   * @default false
   */
  forceRender?: boolean
  /**
   * 关闭时销毁 DOM 元素
   * @default false
   */
  destroyOnClose?: boolean
  /**
   * 遮罩样式
   */
  overlayStyle?: CSSProperties
  /**
   * 设置 Modal 的 z-index 值
   * @default 1000
   */
  zIndex?: number
  /**
   * 是否显示圆角
   * @default true
   */
  round?: boolean
  /**
   * 是否锁定背景滚动
   * @default true
   */
  lockScroll?: boolean
  /**
   * 是否在页面回退时自动关闭 Modal
   * @default true
   */
  /**
   * 指定 Modal 挂载节点
   * @default document.body
   */
  getContainer?: HTMLElement | (() => HTMLElement) | null
  /**
   * 是否在页面回退时自动关闭
   * @default false
   */
  closeOnPopstate?: boolean
  className?: string
  children?: ReactNode
  style?: CSSProperties
  stopPropagation?: string[]
  /**
   * Modal 打开时的回调
   */
  onOpen?: () => void
  /**
   * Modal 打开且动画结束后的回调
   */
  afterOpen?: () => void
  /**
   * Modal 关闭时的回调
   */
  onClose?: () => void
  /**
   * Modal 关闭且动画结束后的回调
   */
  afterClose?: () => void
  /**
   * 关闭前的回调，返回 false 可阻止关闭，支持返回 Promise
   */
  beforeClose?: (action: string | number) => boolean | Promise<boolean>
  /**
   * 点击遮罩时触发
   */
  onClickOverlay?: (event: MouseEvent) => void
}

export type ModalRef = {
  modalRef: RefObject<HTMLDivElement>
}