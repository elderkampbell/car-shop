import {
  Model,
  Schema,
  model,
  models,
  UpdateQuery,
  isValidObjectId,
} from 'mongoose';
import IMotorcycle from '../Interfaces/IMotorcycle';
  
class MotorcycleODM {
  private schema: Schema;
  private model: Model<IMotorcycle>;
  
  constructor() {
    this.schema = new Schema<IMotorcycle>({
      model: { type: String, required: true },
      year: { type: Number, required: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    }, { collection: 'motorcycles' });
    this.model = models.Motorcycle || model('Motorcycle', this.schema);
  }
  
  public async create(motorcycle: IMotorcycle): Promise<IMotorcycle> {
    return this.model.create({ ...motorcycle });
  }
  
  public async getAll(): Promise<IMotorcycle[]> {
    return this.model.find();
  }
  
  public async findById(id: string): Promise<IMotorcycle | null> {
    return this.model.findById(id);
  }
  
  public async update(id: string, obj: Partial<IMotorcycle>):
  Promise<IMotorcycle | null> {
    if (!isValidObjectId(id)) throw Error('Invalid Mongo id');
      
    return this.model.findByIdAndUpdate(
      { _id: id },
      { ...obj } as UpdateQuery<IMotorcycle>,
      { new: true },
    );    
  }
}
  
export default MotorcycleODM;
