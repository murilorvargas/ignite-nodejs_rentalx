import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: InMemoryCarsRepository;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new InMemoryCarsRepository();
    listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
  });

  it("should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car one",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "Car brand",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car one",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "brand_test",
      category_id: "category_id",
    });

    await carsRepositoryInMemory.create({
      name: "Car two",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "Car brand one",
      category_id: "category_id",
    });

    const cars = await listCarsUseCase.execute({
      brand: "brand_test",
    });

    expect(cars).toEqual([car]);
  });
});
