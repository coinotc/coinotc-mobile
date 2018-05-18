export class Notification {
  constructor(
    public to: string,
    public notification: object,
    public data: object,
    public priority: string
  ) {}
}
