import { useCallback, useEffect, useState } from 'react'

function useSsrCompat() {
  const [mounted, setMounted] = useState(false)
  const [rendered, setRendered] = useState(mounted)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      setRendered(true)
    }
  }, [mounted])

  return [
    useCallback((render: () => any) => (mounted ? render() : null), [mounted]),
    rendered,
  ] as const
}

export default useSsrCompat
