export class ServiceException extends Error {
  constructor(status: number, message: string) {
    super(message)
    this.status = status;    
  }
  
  readonly status: number;
}

export class ResourceConflictException extends ServiceException {
  constructor(message: string) {
    super(409, message)
  }
}