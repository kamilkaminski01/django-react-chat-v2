import './style.scss'
import { InputProps } from './interface'
import SendIcon from 'assets/icons/send-icon.svg'
import { FormEvent, KeyboardEvent, useState } from 'react'
import { ECommands } from 'models/message'

const Input = ({
  usernameProvided,
  setUsernameProvided,
  username,
  setUsername,
  sendJsonMessage
}: InputProps) => {
  const [newMessage, setNewMessage] = useState('')

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      handleSubmit(event as FormEvent)
    }
  }

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

  return (
    <form className="chat__form" onSubmit={handleSubmit}>
      <>
        {usernameProvided ? (
          <>
            <textarea
              placeholder="Send a message"
              className="chat__input"
              autoFocus={true}
              rows={1}
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
            maxLength={20}
            autoFocus={true}
            onKeyDown={handleUsernameSubmission}
            onChange={(event) => setUsername(event.target.value)}
          />
        )}
      </>
    </form>
  )
}

export default Input
