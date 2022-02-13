import { Specification } from "../../infra/typeorm/entities/Specification";
import {
  ICreateSpecificationDTO,
  ISpecificationsRepository,
} from "../ISpecificationsRepository";

class InMemorySpecificationRepository implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      description,
      name,
    });

    this.specifications.push(specification);

    return specification;
  }
  async findByName(name: string): Promise<Specification> {
    return this.specifications.find((s) => s.name === name);
  }
  async findByIds(ids: string[]): Promise<Specification[]> {
    const allSpecification = this.specifications.filter((s) =>
      ids.includes(s.id)
    );

    return allSpecification;
  }
}

export { InMemorySpecificationRepository };
