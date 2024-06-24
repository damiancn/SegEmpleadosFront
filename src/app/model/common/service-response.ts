export class ServiceResponse<T> {
  dto: T;
  message: string;
  mesageError: string;
  ok: boolean;
}