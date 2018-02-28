export class complain{
    constructor(
        public complainant: string,
        public orderId: string,
        public pleader: string,
        public type: number,
        public content: string,
        public status:number
    ){
    }
}