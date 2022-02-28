import dayjs from "dayjs";

import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryCarsRepository } from "../../../cars/repositories/in-memory/InMemoryCarsRepository";
import { InMemoryRentalsRepository } from "../../repositories/in-memory/InMemoryRentalsRepository";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: InMemoryRentalsRepository;
let carsRepositoryInMemory: InMemoryCarsRepository;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {
  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new InMemoryRentalsRepository();
    carsRepositoryInMemory = new InMemoryCarsRepository();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      carsRepositoryInMemory,
      dayjsDateProvider
    );
  });

  it("should be able to create a new rental", async () => {
    const car = await carsRepositoryInMemory.create({
      name: "Test",
      description: "Car Test",
      daily_rate: 100,
      license_plate: "test",
      fine_amount: 40,
      category_id: "1234",
      brand: "brand",
    });

    const rental = await createRentalUseCase.execute({
      user_id: "user",
      car_id: car.id,
      expected_return_date: dayAdd24Hours,
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "car one",
      expected_return_date: dayAdd24Hours,
      user_id: "user",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "user",
        car_id: "car two",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("There's a rental in progress for user!"));
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      car_id: "car",
      expected_return_date: dayAdd24Hours,
      user_id: "user",
    });

    await expect(
      createRentalUseCase.execute({
        user_id: "user two",
        car_id: "car",
        expected_return_date: dayAdd24Hours,
      })
    ).rejects.toEqual(new AppError("Car is unavailable!"));
  });

  it("should not be able to create a new rental with invalid return time", async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: "user one",
        car_id: "car",
        expected_return_date: dayjs().toDate(),
      })
    ).rejects.toEqual(new AppError("Invalid return time!"));
  });
});
