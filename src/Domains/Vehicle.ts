export default class Vehicle {
  protected id: string | undefined;
  protected model: string;
  protected year: number;
  protected color: string;
  protected status?: boolean | false;
  protected buyValue: number;

  constructor(
    id: string | undefined,
    model: string,
    year: number,
    color: string,
    buyValue: number,
    status: boolean | false,
  ) {
    this.id = id;
    this.model = model;
    this.year = year;
    this.color = color;
    this.status = status;
    this.buyValue = buyValue;
  }
}
