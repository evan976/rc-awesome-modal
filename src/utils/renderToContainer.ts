import { ReactElement } from 'react'
import { createPortal } from 'react-dom'

export type GetContainer = HTMLElement | (() => HTMLElement) | null

export default function canUseDom(): boolean {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement)
}

export function resolveContainer(
  getContainer: HTMLElement | (() => HTMLElement) | undefined,
): HTMLElement {
  const container = typeof getContainer === 'function' ? getContainer() : getContainer
  return container || document.body
}

export function renderToContainer (getContainer: GetContainer, node: ReactElement) {
  if (canUseDom() && getContainer) {
    const container = resolveContainer(getContainer)
    return createPortal(node, container)
  }
  return node
}