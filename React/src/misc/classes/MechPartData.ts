export class MechPartData {
  mp_id: number;
  mp_name: string;
  mp_description: string;
  mid_provider: number;
  year_from: number;
  year_to: number;
  builds_on: string;
  constructor(data: MechPartData | null) {
    this.mp_id = data ? data.mp_id : 0;
    this.mp_name = data ? data.mp_name : "";
    this.mp_description = data ? data.mp_description : "";
    this.mid_provider = data ? data.mid_provider : 0;
    this.year_from = data ? data.year_from : 1960;
    this.year_to = data ? data.year_to : 1961;
    this.builds_on = data ? data.builds_on : "";
  }
}
