export class complain{
    constructor(
        public complainant: string,
        public orderId: string,
        public pleader: string,
        public type: number,
        public content: string,
        public status:number,
        public roomkey:string,
        public complainId:string,
        public crypto:string,
        public fiat:string,
        public role:string,
        public country:string
    ){
    }
}