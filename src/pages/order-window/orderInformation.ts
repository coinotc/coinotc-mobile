export class OrderInformation{
    constructor(
        public buyer:String,
        public seller: String,
        public crypto: String,
        public country: String,
        public quantity: Number,
        public price: Number,
        public amount: Number,
        public fiat: String,
        public payment: String,
        public limit: Number,
        public finished: Boolean,
        public date: Date
    ){

    }
}