import './style.scss'
import { MessagesProps } from './interface'
import classNames from 'classnames'
import { ECommands } from 'models/message'
import { useEffect, useRef } from 'react'

const Messages = ({ messages }: MessagesProps) => {
  const chatRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div ref={chatRef} className="chat__messages">
      {messages.map((message, index) => (
        <div
          className={classNames('chat__message', {
            centered: message.command !== ECommands.Message
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
  )
}

export default Messages
