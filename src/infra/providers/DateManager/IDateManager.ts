export interface IDateManager {
  getWeekDay(date: Date): Promise<string>;
  getMonth(date: Date): Promise<string>;
  getDay(date: Date): Promise<string>;
  getYear(date: Date): Promise<string>;
}
