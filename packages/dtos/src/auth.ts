export interface YourIdDto {
  isSuccess: boolean
  socketId: string
  token: string //jwt token
  nickname: string
  userId: string
}

export interface UserCredentialsDto {
  username: string
  password: string
}

export interface VerifyTokenDto {
  token: string
}

export interface VerifyStatusDto {
  isSuccess: boolean
}
