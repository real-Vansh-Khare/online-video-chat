
export class SuccessResponse {
    message?: string
    error = false
    data?: any
  
    constructor(message?: string, data?: any) {
      this.message = message;
      this.data = data;
    }
  }
  
  export class ErrorResponse {
    message?: string
    error = true
    data?: any
  
    constructor(message?: string, data?: any) {
      this.message = message;
      this.data = data;
    }
  }
  