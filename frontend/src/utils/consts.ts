const url = window.location
const socketProtocol = url.protocol === 'https:' ? 'wss:' : 'ws:'

export const SOCKET_URL =
  url.port !== ''
    ? `${socketProtocol}//${url.hostname}:8000/ws`
    : `${socketProtocol}//${url.hostname}/ws`

export const WEBSOCKETS = {
  chat: `${SOCKET_URL}/chat/`
}
