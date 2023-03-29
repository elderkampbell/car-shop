import { NextFunction, Request, Response } from 'express';
import Mongoose from 'mongoose';
import CarService from '../Services/CarService';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;

  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async getAll() {
    const cars = await this.service.getAllCars();
    return this.res.status(200).json(cars);
  }

  public async getById() {
    const { id } = this.req.params;
    try {
      if (!Mongoose.isValidObjectId(id)) {
        return this.res.status(422).json({ message: 'Invalid mongo id' });
      }

      const car = await this.service.getById(id); 
      if (!car) {
        return this.res.status(404).json({ message: 'Car not found' });
      }

      return this.res.status(200).json(car);
    } catch (error) {
      this.next(error);
    }
  }

  public async create() {
    // const car: ICar = {
    //   payByPerson: this.req.body.payByPerson,
    //   payToPerson: this.req.body.payToPerson,
    //   amount: this.req.body.amount,
    //   key: this.req.body.key,
    //   status: PaymentStatus.concluded,
    // };

    try {
      const newCar = await this.service.create(this.req.body);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }
//   public async reversalRequest() {
//     const payment: ICar = {
//       ...this.req.body,
//       status: PaymentStatus.reversed,
//     };
//     const { id } = this.req.params;
//     try {
//       await this.service.undoTransfer(id, payment);
//       return this.res.status(204).json({});
//     } catch (error) {
//       this.next(error);
//     }
//   }
}

export default CarController;
