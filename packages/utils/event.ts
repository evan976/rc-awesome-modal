import React, { MouseEvent, ReactElement, TouchEvent } from 'react'

export function stopPropagation(e: MouseEvent | TouchEvent | Event) {
  e.stopPropagation()
}

export function preventDefault(e: TouchEvent | Event, isStopPropagation?: boolean) {
  if (typeof e.cancelable !== 'boolean' || e.cancelable) {
    e.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(e as Event)
  }
}

export type PropagationEvent = 'click'

const eventToPropRecord: Record<PropagationEvent, string> = {
  'click': 'onClick',
}

export function withStopPropagation(
  events: string[],
  element: ReactElement
) {
  const props: Record<string, any> = { ...element.props }
  for (const key of events) {
    // @ts-ignore
    const prop = eventToPropRecord[key]
    props[prop] = function (e: Event) {
      e.stopPropagation()
      element.props[prop]?.(e)
    }
  }
  return React.cloneElement(element, props)
}
