interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  compareIfBefore(start_date: Date, end_date: Date): boolean;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  dateNow(): Date;
}

export { IDateProvider };
