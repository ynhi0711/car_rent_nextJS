interface CustomExceptionResponse {
  code?: number;
  title?: string;
  message?: string;
  errors?: CustomError[];
}

interface CustomError {
  code: number;
  field: string;
  message: string;
}
