type MessageProps =
  | {
      content: string
      timeout?: number
      autoClose?: true
      onClose?: VoidFunction
    }
  | string

type MessageIns = {
  close: VoidFunction
  destroy: VoidFunction
}

export {}
