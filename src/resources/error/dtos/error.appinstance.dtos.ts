export interface IAppError {
  readonly message:string
  readonly statusCode:number
  readonly data?:any
}