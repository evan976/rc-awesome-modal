import React, {
  useState,
  useRef,
  useEffect,
  useMemo,
  useImperativeHandle,
  forwardRef
} from 'react'
import classNames from 'classnames'
import { CSSTransition } from 'react-transition-group'
import { callInterceptor } from '@utils/callInterceptor'
import Overlay from '@components/overlay'
import { isDef } from '@utils/is'
import { withStopPropagation } from '@utils/event'
import useSsrCompat from '@hooks/useSsrCompat'
import useEventListener from '@hooks/useEventListener'
import useLockScroll from '@hooks/useLockScroll'
import { renderToContainer } from '@utils/renderToContainer'
import type { ModalRef, ModalProps } from './interface'
import ModalContext from './ModalContext'
import { IconClose } from './IconClose'

let globalZIndex = 1000

const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const {
    title,
    visible = false,
    width = 520,
    round = true,
    closable = true,
    closeIcon = <IconClose />,
    overlay = true,
    stopPropagation = ['click'],
    duration = 300,
    getContainer = () => document.body,
    overlayClosable = true,
    closeOnPopstate = false,
    lockScroll = true,
  } = props

  const opened = useRef<boolean>(false)
  const zIndex = useRef<number>(props.zIndex ?? globalZIndex)
  const modalRef = useRef<HTMLDivElement>(null)
  const [animatedVisible, setAnimatedVisible] = useState<boolean>(visible)
  const [ssrCompatRender, rendered] = useSsrCompat()

  const style = useMemo(() => {
    const initialStyle = {
      zIndex: zIndex.current,
      ...props.style
    }

    if (isDef(duration)) {
      const key = 'transitionDuration'
      initialStyle[key] = `${duration}ms`
    }
    return initialStyle
  }, [zIndex.current, duration, props.style])

  const open = () => {
    if (props.zIndex !== undefined) {
      zIndex.current = +props.zIndex
    } else {
      zIndex.current = globalZIndex++
    }
    opened.current = true
    props.onOpen?.()
  }

  const close = () => {
    if (opened.current) {
      callInterceptor({
        interceptor: props.beforeClose as Function,
        args: ['close'],
        done: () => {
          opened.current = false
          props.onClose?.()
        }
      })
    }
  }

  const onClickOverlay = (event: React.MouseEvent<Element, MouseEvent>) => {
    props.onClickOverlay?.(event)

    if (overlayClosable) {
      close()
    }
  }

  const renderOverlay = () => {
    if (overlay) {
      return (
        <Overlay
          visible={visible && rendered}
          style={props.overlayStyle}
          zIndex={zIndex.current - 1}
          duration={duration}
          onClick={onClickOverlay}
        />
      )
    }
    return null
  }

  const renderTitle = () => {
    if (title) {
      return (
        <div className='rc-modal-title'>
          {title}
        </div>
      )
    }
    return null
  }

  const renderHeader = () => (
    <div className='rc-modal-header'>
      {renderTitle()}
      {closable && (
        <div className='rc-modal-close' onClick={close}>
          {closeIcon}
        </div>
      )}
    </div>
  )

  const renderFooter = () => {
    if (props.footer === null) return null
    if (props.footer) return props.footer
    return (
      <div className='rc-modal-footer'>
        <button
          className='rc-btn rc-btn-default'
          onClick={(e) => {
            close()
            props.onCancel?.(e)
          }}
        >
          {props.cancelText || '取消'}
        </button>
        <button
          className='rc-btn rc-btn-primary'
          onClick={(e) => {
            close()
            props.onOk?.(e)
          }}
        >
          {props.okText || '确定'}
        </button>
      </div>
    )
  }

  const renderModal = () => {
    return withStopPropagation(
      stopPropagation,
      <div
        ref={modalRef}
        role='dialog'
        style={{
          ...style,
          width,
          display: !visible && !animatedVisible ? 'none' : undefined,
        }}
        className={classNames('rc-modal', props.className, {
          ['rc-modal-round']: round,
        })}
      >
        {renderHeader()}
        <div className='rc-modal-body'>
          {props.children}
        </div>
        {renderFooter()}
      </div>
    )
  }

  const renderTransition = () => {
    const { forceRender = false, destroyOnClose = false } = props

    return (
      <CSSTransition
        in={visible && rendered}
        nodeRef={modalRef}
        timeout={duration}
        classNames='rc-zoom'
        mountOnEnter={!forceRender}
        unmountOnExit={destroyOnClose}
        onEnter={open}
        onEntered={props.afterClose}
        onExit={props.onClose}
        onExited={() => {
          setAnimatedVisible(false)
          props.afterClose?.()
        }}
      >
        <div
          className='rc-modal-wrap'
          style={{
            display: !visible && !animatedVisible ? 'none' : undefined,
          }}
        >
          {renderOverlay()}
          {renderModal()}
        </div>
      </CSSTransition>
    )
  }

  useEventListener('popstate', () => {
    if (closeOnPopstate) {
      close()
    }
  })

  useEffect(() => {
    if (!rendered) return
    if (visible) {
      setAnimatedVisible(true)
    }
  }, [visible, rendered])

  useLockScroll(visible && lockScroll)

  useImperativeHandle(ref, () => ({ modalRef }))

  return ssrCompatRender(() =>
    renderToContainer(
      getContainer,
      <ModalContext.Provider value={{visible}}>
        {renderTransition()}
      </ModalContext.Provider>
    )
  )
})

export default Modal
