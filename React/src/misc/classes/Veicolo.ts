export class Veicolo {
  vehicle_id: number;
  arrival_date: string;
  status: string;
  client_id: number;
  model: string;
  tag: string;
  brand: string;
  reg_date: string;
  constructor(data: Veicolo | null) {
    if (!data) {
      this.vehicle_id = -1;
      this.arrival_date = "";
      this.status = "";
      this.client_id = -1;
      this.model = "";
      this.tag = "";
      this.brand = "";
      this.reg_date = "";
    } else {
      this.vehicle_id = data.vehicle_id;
      this.arrival_date = data.arrival_date;
      this.status = data.status;
      this.client_id = data.client_id;
      this.model = data.model;
      this.tag = data.tag;
      this.brand = data.brand;
      this.reg_date = data.reg_date;
    }
  }
}
