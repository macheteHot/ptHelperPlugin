type MessageProps =
  | {
      content: string
      timeout?: number
    }
  | string

const containerDiv = document.createElement('div')
Object.assign(containerDiv.style, {
  position: 'fixed',
  transform: 'translateX(-50%)',
  left: '50%',
  top: '15px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: '8px'
})
document.body.appendChild(containerDiv)
const getDiv = () => {
  const div = document.createElement('div')
  Object.assign(div.style, {
    borderRadius: '3px',
    padding: '4px 8px'
  })
  return div
}

function baseMessage(res: MessageProps, color: string) {
  const div = getDiv()
  let context = ''
  let timeout = 3000
  if (typeof res === 'string') {
    context = res
  } else {
    context = res.content
    if (typeof res.timeout === 'number') {
      timeout = res.timeout
    }
  }
  Object.assign(div.style, {
    backgroundColor: color
  })
  div.innerText = context

  containerDiv.appendChild(div)
  setTimeout(() => {
    containerDiv.removeChild(div)
  }, timeout)
}

export class Qmsg {
  static info(res: MessageProps) {
    baseMessage(res, '#95a5a6')
  }
  static success(res: MessageProps) {
    baseMessage(res, '#2ecc71')
  }
  static error(res: MessageProps) {
    baseMessage(res, '#e74c3c')
  }
  static warning(res: MessageProps) {
    baseMessage(res, '#f1c40f')
  }
}
