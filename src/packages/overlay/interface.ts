import { CSSProperties, ReactNode } from 'react'

export interface OverlayProps {
  /**
   * 是否显示
   */
  visible?: boolean
  /**
   * 设置 z-index
   */
  zIndex?: number
  /**
   * 自定义样式
   */
  style?: CSSProperties
  /**
   * 动画时长
   */
  duration?: number
  /**
   * 是否锁定背景滚动，锁定时蒙层里的内容也将无法滚动
   * @default false
   */
  lockScroll?: boolean
  /**
   * 点击遮罩时触发
   */
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
  className?: string
  children?: ReactNode
  stopPropagation?: string[]
}