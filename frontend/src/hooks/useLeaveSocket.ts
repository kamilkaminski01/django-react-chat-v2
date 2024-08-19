import { SendJsonMessage } from 'react-use-websocket/dist/lib/types'
import { IMessage } from 'models/message'
import { useEffect } from 'react'

const useLeaveSocket = (sendJsonMessage: SendJsonMessage, message: IMessage, dep: boolean) => {
  const onUnload = () => {
    if (message.user) {
      sendJsonMessage(message)
    }
  }

  useEffect(() => {
    if (dep) {
      window.addEventListener('beforeunload', onUnload)

      return () => {
        window.removeEventListener('beforeunload', onUnload)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dep])
}

export default useLeaveSocket
