import { NextFunction, Request, Response } from 'express';
// import ICar from '../Interfaces/ICar';
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
