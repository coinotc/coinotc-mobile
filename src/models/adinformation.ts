export class adinformation{
    constructor(
        public owner: String,
        public visible: Boolean,
        public crypto: String,
        public country: String,
        public fiat: String,
        public price: Number,
        public min_price: Number,
        public max_price: Number,
        public payment: String,
        public limit: Number,
        public massage: String
    ){

    }
}