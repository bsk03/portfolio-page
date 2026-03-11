import { useEffect } from 'react'
// @ts-expect-error - body-scroll-lock doesn't have types
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock'

export function useScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (isLocked) {
      disableBodyScroll(document.body)
    } else {
      enableBodyScroll(document.body)
    }

    return () => {
      enableBodyScroll(document.body)
    }
  }, [isLocked])
}

