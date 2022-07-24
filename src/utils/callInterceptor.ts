import { isPromise } from './is'
import noop from './noop'

export type Interceptor = (...args: any[]) => Promise<boolean> | boolean

export type Options = {
  interceptor: Function
  args: any[]
  done: () => void
  canceled?: () => void
}

export function callInterceptor(options: Options) {
  const { interceptor, args, done, canceled } = options

  if (interceptor) {
    const returnVal = interceptor.apply(null, args || [])

    if (isPromise(returnVal)) {
      returnVal
        .then((value) => {
          if (value) {
            done()
          } else if (canceled) {
            canceled()
          }
        })
        .catch(noop)
    } else if (returnVal) {
      done()
    } else if (canceled) {
      canceled()
    }
  } else {
    done()
  }
}