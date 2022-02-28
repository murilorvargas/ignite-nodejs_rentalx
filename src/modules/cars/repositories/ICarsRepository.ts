import { ICreateCarDTO } from "../dtos/ICreateCarDTO";
import { Car } from "../infra/typeorm/entities/Car";

interface ICarsRepository {
  create(data: ICreateCarDTO): Promise<Car>;
  updateAvailable(id: string, available: boolean): Promise<void>;
  findByLicensePlate(license_plate: string): Promise<Car>;
  findById(id: string): Promise<Car>;
  listAvailable(
    brand?: string,
    category_id?: string,
    name?: string
  ): Promise<Car[]>;
}

export { ICarsRepository };
