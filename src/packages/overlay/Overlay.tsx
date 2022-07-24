import React, { CSSProperties, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import classNames from 'classnames'
import { preventDefault, withStopPropagation } from '@/utils/event'
import useEventListener from '@/hooks/useEventListener'
import { isDef } from '@/utils/is'
import type { OverlayProps } from './interface'

const Overlay: React.FC<OverlayProps> = (props) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const { visible, duration = 300, stopPropagation = ['click'] } = props

  const preventTouchMove = (event: TouchEvent) => {
    if (!props.lockScroll) return
    preventDefault(event, true)
  }

  const renderOverlay = () => {
    const style: CSSProperties = {
      zIndex: props.zIndex !== undefined ? +props.zIndex : undefined,
      touchAction: props.lockScroll ? 'none' : undefined,
      ...props.style,
    }

    if (isDef(duration)) {
      style.animationDuration = `${duration}ms`
    }

    return withStopPropagation(
      stopPropagation,
      <div
        ref={nodeRef}
        style={style}
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            props.onClick?.(e)
          }
        }}
        className={classNames('rc-overlay', props.className)}
      >
        {props.children}
      </div>
    )
  }

  useEventListener('touchmove', preventTouchMove, nodeRef)

  return (
    <CSSTransition
      in={visible}
      nodeRef={nodeRef}
      unmountOnExit
      timeout={duration}
      classNames='rc-fade'
    >
      {renderOverlay()}
    </CSSTransition>
  )
}

export default Overlay
