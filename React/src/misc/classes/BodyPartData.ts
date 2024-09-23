export class BodyPartData {
  bd_id: number;
  bd_name: string;
  bd_description: string;
  bid_provider: number;
  year: number;
  color: string;
  vehicle_model: string;
  constructor(data: BodyPartData | null) {
    this.bd_id = data ? data.bd_id : 0;
    this.bd_name = data ? data.bd_name : "";
    this.bd_description = data ? data.bd_description : "";
    this.bid_provider = data ? data.bid_provider : 0;
    this.year = data ? data.year : 0;
    this.color = data ? data.color : "";
    this.vehicle_model = data ? data.vehicle_model : "";
  }
}
