import { useEffect, useRef, type ReactNode } from 'react'
import { IconClose } from './Icons'

interface ModalProps {
  title: string
  eyebrow?: string
  children: ReactNode
  onClose: () => void
  wide?: boolean
  footer?: ReactNode
}

export function Modal({ title, eyebrow, children, onClose, wide = false, footer }: ModalProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    return () => previous?.focus?.()
  }, [])

  return (
    <div className={`modal-layer${wide ? ' is-wide' : ''}`} role="presentation">
      <button className="modal-backdrop" aria-label="关闭面板" onClick={onClose} tabIndex={-1} />
      <section className="modal-card" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header className="modal-head">
          <div>
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h2 id="modal-title">{title}</h2>
          </div>
          <button ref={closeRef} className="icon-button" aria-label="关闭" onClick={onClose}>
            <IconClose />
          </button>
        </header>
        <div className="modal-body">{children}</div>
        {footer ? <footer className="modal-footer">{footer}</footer> : null}
      </section>
    </div>
  )
}

interface ConfirmDialogProps {
  title: string
  eyebrow?: string
  body: ReactNode
  confirmLabel: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  danger?: boolean
}

export function ConfirmDialog({
  title,
  eyebrow,
  body,
  confirmLabel,
  cancelLabel = '取消',
  onConfirm,
  onCancel,
  danger = false,
}: ConfirmDialogProps) {
  return (
    <Modal
      title={title}
      eyebrow={eyebrow}
      onClose={onCancel}
      footer={
        <>
          <button className="button is-quiet" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button className={`button${danger ? ' is-danger' : ' is-primary'}`} onClick={onConfirm}>
            {confirmLabel}
          </button>
        </>
      }
    >
      <div className="prose prose-small">{body}</div>
    </Modal>
  )
}
