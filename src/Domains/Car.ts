import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

export default class Car extends Vehicle {
  private readonly doorsQty: number;
  private readonly seatsQty: number;

  constructor(car: ICar) {
    super(
      car.id,
      car.model,
      car.year,
      car.color,
      car.buyValue,
      car.status || false,
    );
    this.doorsQty = car.doorsQty;
    this.seatsQty = car.seatsQty;
  }
}
