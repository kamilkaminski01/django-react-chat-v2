import './style.scss'
import { useEffect, useState } from 'react'
import { IMessage, ECommands } from 'models/message'
import useWebSocket from 'react-use-websocket'
import { WEBSOCKETS } from 'utils/consts'
import useLeaveSocket from 'hooks/useLeaveSocket'
import Header from 'components/Header'
import Messages from 'components/Messages'
import Input from 'components/Input'

const Chat = () => {
  const [usernameProvided, setUsernameProvided] = useState(false)
  const [username, setUsername] = useState('')
  const [messages, setMessages] = useState<IMessage[]>([])

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

  return (
    <main className="chat">
      <Header />
      <Messages messages={messages} />
      <Input
        usernameProvided={usernameProvided}
        setUsernameProvided={setUsernameProvided}
        username={username}
        setUsername={setUsername}
        sendJsonMessage={sendJsonMessage}
      />
    </main>
  )
}

export default Chat
