import { Dispatch, SetStateAction } from 'react'
import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'

export interface InputProps {
  usernameProvided: boolean
  setUsernameProvided: Dispatch<SetStateAction<boolean>>
  username: string
  setUsername: Dispatch<SetStateAction<string>>
  sendJsonMessage: SendJsonMessage
}
