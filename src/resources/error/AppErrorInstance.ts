import { IAppError} from './dtos/error.appinstance.dtos'

class AppError extends Error{
  public readonly message:string
  public readonly statusCode:number
  public readonly data:any

  constructor({message, statusCode, data}:IAppError) {
    super()
    this.message = message
    this.statusCode = statusCode
    this.data = data
  }
}

export default AppError