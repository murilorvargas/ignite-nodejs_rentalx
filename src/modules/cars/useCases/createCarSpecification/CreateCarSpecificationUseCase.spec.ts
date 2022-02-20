import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { InMemorySpecificationRepository } from "../../repositories/in-memory/InMemorySpecificationsRepository";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: InMemoryCarsRepository;
let specificationRepositoryInMemory: InMemorySpecificationRepository;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new InMemoryCarsRepository();
    specificationRepositoryInMemory = new InMemorySpecificationRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationRepositoryInMemory
    );
  });

  it("should not be able to add a new specification to a now existent car", () => {
    expect(async () => {
      const car_id = "4444";
      const specifications_id = ["5555"];
      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id,
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should be able to add a new specification to the car", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car One",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand",
      category_id: "category",
    });

    const specification = await specificationRepositoryInMemory.create({
      description: "test",
      name: "test",
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificationUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty("specifications");
    expect(specificationsCars.specifications.length).toBe(1);
  });
});