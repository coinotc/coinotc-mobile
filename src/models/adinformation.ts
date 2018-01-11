export class adinformation{
    constructor(
        public owner: string,
        public visible: Boolean,
        public crypto: string,
        public country: string,
        public fiat: string,
        public price: number,
        public min_price: number,
        public max_price: number,
        public payment: string,
        public limit: number,
        public massage: string
    ){

    }
}