export class EmployeeData {
    username: string;
    monthly_salary: string;
    tax_code: string;
    position: string;
    hiring_date: string;
    name: string;
    surname: string;
    address: string;
    phone_num: string;
    constructor(data: EmployeeData) {
        this.username = data.username;
        this.monthly_salary = data.monthly_salary;
        this.tax_code = data.tax_code;
        this.position = data.position;
        this.hiring_date = data.hiring_date;
        this.name = data.name;
        this.surname = data.surname;
        this.address = data.address;
        this.phone_num = data.phone_num;
    }
}