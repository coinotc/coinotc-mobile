export class Alert {
  constructor(
    public username: string,
    public price: number,
    public crypto: string,
    public fiat: string,
    public status: boolean,
    public above: boolean,
    public data: Date
  ) {}
}
