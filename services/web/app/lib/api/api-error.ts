export class APIError<T> extends Error {
  status: number;
  data: T;

  constructor({
    message,
    status,
    data,
  }: {
    message: string;
    status: number;
    data: T;
  }) {
    super(message);
    this.status = status;
    this.data = data;
  }
}
