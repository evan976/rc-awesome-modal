import * as React from 'react'
import cn from 'classnames'

export const IconClose = React.memo<JSX.IntrinsicElements['svg']>
(function IconClose({className, ...rest}) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
      className={cn(className, 'icon')}
      style={{cursor: 'pointer'}}
    >
      <path
        d="M1.89775 1.10225C1.67808 0.882583 1.32193 0.882582 1.10226 1.10225C0.882589 1.32192 0.882589 1.67808 1.10226 1.89775L5.20451 6L1.10225 10.1023C0.882583 10.3219 0.882583 10.6781 1.10225 10.8978C1.32192 11.1174 1.67808 11.1174 1.89775 10.8978L6.00001 6.7955L10.1023 10.8978C10.3219 11.1174 10.6781 11.1174 10.8978 10.8978C11.1174 10.6781 11.1174 10.3219 10.8978 10.1023L6.7955 6L10.8977 1.89775C11.1174 1.67808 11.1174 1.32193 10.8977 1.10226C10.6781 0.882588 10.3219 0.882589 10.1023 1.10226L6.00001 5.20451L1.89775 1.10225Z"
        fill="white"
      />
    </svg>
  )
})

IconClose.displayName = 'IconClose'
