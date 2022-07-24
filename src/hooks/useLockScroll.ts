import { useEffect } from 'react'

function useLockScroll(isLock: boolean) {
  useEffect(() => {
    if (isLock) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [isLock])
}

export default useLockScroll
