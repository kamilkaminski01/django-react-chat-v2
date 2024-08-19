import './style.scss'
import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from 'react'
import classNames from 'classnames'
import SendIcon from 'assets/icons/send-icon.svg'
import { IMessage, ECommands } from 'models/message'
import useWebSocket from 'react-use-websocket'
import { WEBSOCKETS } from 'utils/consts'
import useLeaveSocket from 'hooks/useLeaveSocket'

const Chat = () => {
  const [usernameProvided, setUsernameProvided] = useState(false)
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])
  const [newMessage, setNewMessage] = useState('')
  const chatRef = useRef<HTMLDivElement>(null)

  const { sendJsonMessage } = useWebSocket(WEBSOCKETS.chat, {
    onMessage: (event) => {
      const data = JSON.parse(event.data)
      setMessages((prevMessages) => [...prevMessages, data])
    }
  })

  useLeaveSocket(
    sendJsonMessage,
    {
      command: ECommands.Leave,
      user: username,
      message: `${username} has left`
    },
    usernameProvided
  )

  useEffect(() => {
    if (usernameProvided) {
      sendJsonMessage({
        command: ECommands.Join,
        user: username,
        message: `${username} has joined`
      })
    }
  }, [usernameProvided])

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  const handleUsernameSubmission = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      setUsernameProvided(true)
    }
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const message = newMessage.trim()
    if (message) {
      sendJsonMessage({ command: ECommands.Message, user: username, message: message })
      setNewMessage('')
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event as FormEvent)
    }
  }

  return (
    <main className="chat">
      <div className="chat-items">
        <div className="chat__header">Django & React Chat</div>
        <div ref={chatRef} className="chat__messages">
          {messages.map((message, index) => (
            <div
              className={classNames('chat__message', {
                centered: message.command !== ECommands.Message,
                blue: message.user === username && message.command === ECommands.Message,
                gray: message.user !== username && message.command === ECommands.Message
              })}
              key={index}>
              {message.command === ECommands.Message ? (
                <>
                  <p className="message__user">{message.user}</p>
                  <p className="message__content">{message.message}</p>
                </>
              ) : (
                <p className="message__notification">{message.message}</p>
              )}
            </div>
          ))}
        </div>
        <form className="chat__form" onSubmit={handleSubmit}>
          <>
            {usernameProvided ? (
              <>
                <textarea
                  placeholder="Send a message"
                  className="chat__input"
                  autoFocus={true}
                  autoComplete="off"
                  value={newMessage}
                  onKeyDown={handleKeyDown}
                  onChange={(event) => setNewMessage(event.target.value)}
                />
                <img src={SendIcon} className="chat__send" alt="send" onClick={handleSubmit} />
              </>
            ) : (
              <input
                type="text"
                placeholder="Provide your username and press enter"
                className="chat__input chat__input--username"
                maxLength={10}
                autoFocus={true}
                onKeyDown={handleUsernameSubmission}
                onChange={(event) => setUsername(event.target.value)}
              />
            )}
          </>
        </form>
      </div>
    </main>
  )
}

export default Chat
