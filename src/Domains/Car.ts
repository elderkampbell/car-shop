import ICar from '../Interfaces/ICar';

export default class Car {
  protected readonly id: string | undefined;
  protected readonly model: string;
  protected readonly year: number;
  protected readonly color: string;
  protected readonly status?: boolean;
  protected readonly buyValue: number;
  private doorsQty: number;
  private seatsQty: number;

  constructor(car: ICar) {
    this.id = car.id;
    this.model = car.model;
    this.year = car.year;
    this.color = car.color;
    this.status = car.status || false;
    this.buyValue = car.buyValue;
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}
