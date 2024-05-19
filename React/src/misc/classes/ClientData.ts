export class ClientData {
    username: string;
    company_name: string;
    vat_number: string;
    client_since: string;
    name: string;
    surname: string;
    address: string;
    phone_num: string;
    constructor(data: ClientData) {
        this.username = data.username;
        this.company_name = data.company_name;
        this.vat_number = data.vat_number;
        this.name = data.name;
        this.surname = data.surname;
        this.address = data.address;
        this.phone_num = data.phone_num;
        this.client_since = data.client_since;
    }
}