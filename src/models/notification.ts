export class Notification {
  constructor(
    public to: string,
    public notification: object,
    public priority: string
  ) { }
}
