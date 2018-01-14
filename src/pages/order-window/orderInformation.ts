export class OrderInformation{
    constructor(
        public buyer:string,
        public seller: string,
        public crypto: string,
        public country: string,
        public quantity: number,
        public price: number,
        public amount: number,
        public fiat: string,
        public payment: string,
        public limit: number,
        public finished: Boolean
    ){

    }
}