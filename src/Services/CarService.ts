import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async create(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);
    return this.createCarDomain(newCar);
  }

  public async getAllCars() {
    const carODM = new CarODM();
    const cars = await carODM.getAll();
    const carsArray = cars.map((car) =>
      this.createCarDomain(car));
    return carsArray;
  }

  public async getById(id: string) {
    const carODM = new CarODM();
    const car = await carODM.findById(id);
    return this.createCarDomain(car);
  }

  public async updateById(id: string, car: ICar) {
    const carODM = new CarODM();
    const idValidation = await carODM.findById(id);
    if (!idValidation) {
      const error = new Error('Car not found');
      throw error;
    }
    await carODM.update(id, car);
    const newCar = await carODM.update(id, car);
    return this.createCarDomain(newCar);
  }
}

export default CarService;
