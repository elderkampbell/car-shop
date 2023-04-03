import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

class MotorcycleService {
  private createMotorcycleDomain(motorcycle: IMotorcycle | null): Motorcycle | null {
    if (motorcycle) {
      return new Motorcycle(motorcycle);
    }
    return null;
  }

  public async create(motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const newMotorcycle = await motorcycleODM.create(motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }

  public async getAllMotorcycles() {
    const motorcycleODM = new MotorcycleODM();
    const motorcycles = await motorcycleODM.getAll();
    const motorcyclesArray = motorcycles.map((motorcycle) =>
      this.createMotorcycleDomain(motorcycle));
    return motorcyclesArray;
  }

  public async getById(id: string) {
    const motorcycleODM = new MotorcycleODM();
    const motorcycle = await motorcycleODM.findById(id);
    return this.createMotorcycleDomain(motorcycle);
  }

  public async updateById(id: string, motorcycle: IMotorcycle) {
    const motorcycleODM = new MotorcycleODM();
    const idValidation = await motorcycleODM.findById(id);
    if (!idValidation) {
      const error = new Error('Motorcycle not found');
      throw error;
    }
    await motorcycleODM.update(id, motorcycle);
    const newMotorcycle = await motorcycleODM.update(id, motorcycle);
    return this.createMotorcycleDomain(newMotorcycle);
  }
}

export default MotorcycleService;
