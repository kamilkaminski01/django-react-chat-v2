export enum ECommands {
  Join = 'join',
  Leave = 'leave',
  Message = 'message'
}

export interface IMessage {
  command: string
  user: string
  message: string
}
