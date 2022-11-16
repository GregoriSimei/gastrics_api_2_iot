export interface IDateManager {
  getWeekDay(date: Date): string;
  getMonth(date: Date): string;
  getDay(date: Date): string;
  getYear(date: Date): string;
  getHour(date: Date): string;
  getOnlyDateInfo(date: Date): string;
  getSecoundsDiference(date1: Date, date2: Date): number;
}
