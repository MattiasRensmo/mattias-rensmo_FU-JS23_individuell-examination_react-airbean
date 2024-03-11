import { useEffect, useRef, useState } from 'react'

const useDebounce = (callback: () => void, delay: number) => {
  const latestCallback = useRef<undefined | (() => void)>()
  const [callCount, setCallCount] = useState(0)

  useEffect(() => {
    latestCallback.current = callback
  }, [callback])

  useEffect(() => {
    if (callCount > 0) {
      const fire = () => {
        setCallCount(0)
        if (latestCallback.current) latestCallback.current()
      }

      const id = setTimeout(fire, delay)
      return () => clearTimeout(id)
    }
  }, [callCount, delay])

  return () => setCallCount(callCount => callCount + 1)
}

export default useDebounce
