import { InMemoryCarsRepository } from "../../repositories/in-memory/InMemoryCarsRepository";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: InMemoryCarsRepository;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new InMemoryCarsRepository();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory
    );
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

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car one",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "brand_test",
      category_id: "category one",
    });

    await carsRepositoryInMemory.create({
      name: "Car two",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "Car brand one",
      category_id: "category two",
    });

    const cars = await listAvailableCarsUseCase.execute({
      name: "Car one",
    });

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
      category_id: "category one",
    });

    await carsRepositoryInMemory.create({
      name: "Car two",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "Car brand one",
      category_id: "category two",
    });

    const cars = await listAvailableCarsUseCase.execute({
      brand: "brand_test",
    });

    expect(cars).toEqual([car]);
  });

  it("should be able to list all available cars by category", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Car one",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "brand_test",
      category_id: "category one",
    });

    await carsRepositoryInMemory.create({
      name: "Car two",
      description: "Car description",
      daily_rate: 99,
      license_plate: "FFF-4444",
      fine_amount: 99,
      brand: "Car brand one",
      category_id: "category two",
    });

    const cars = await listAvailableCarsUseCase.execute({
      category_id: "category one",
    });

    expect(cars).toEqual([car]);
  });
});
