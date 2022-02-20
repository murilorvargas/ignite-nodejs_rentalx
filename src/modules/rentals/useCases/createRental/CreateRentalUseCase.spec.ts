import { AppError } from "../../../../shared/errors/AppError";
import { InMemoryRentalsRepository } from "../../repositories/in-memory/InMemoryRentalsRepository";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: InMemoryRentalsRepository;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepositoryInMemory = new InMemoryRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory);
  });

  it("should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "user",
      car_id: "car",
      expected_return_date: new Date(),
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("should not be able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user",
        car_id: "car one",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "user",
        car_id: "car two",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("should not be able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "user one",
        car_id: "car",
        expected_return_date: new Date(),
      });

      await createRentalUseCase.execute({
        user_id: "user two",
        car_id: "car",
        expected_return_date: new Date(),
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
