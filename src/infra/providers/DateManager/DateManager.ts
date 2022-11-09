import { injectable } from 'tsyringe';
import { IDateManager } from './IDateManager';

@injectable()
export class DateManager implements IDateManager {
  async getWeekDay(date: Date): Promise<string> {
    return date
      .toLocaleString('en-us', {
        weekday: 'long',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }

  async getMonth(date: Date): Promise<string> {
    return date
      .toLocaleString('en-us', {
        month: 'long',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }

  async getDay(date: Date): Promise<string> {
    return date
      .toLocaleString('en-us', {
        day: 'numeric',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }

  async getYear(date: Date): Promise<string> {
    return date
      .toLocaleString('en-us', {
        year: 'numeric',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }
}
