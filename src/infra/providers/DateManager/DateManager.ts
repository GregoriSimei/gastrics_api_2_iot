import { injectable } from 'tsyringe';
import { IDateManager } from './IDateManager';

@injectable()
export class DateManager implements IDateManager {
  async getWeekDay(date: Date): Promise<string> {
    return date
      .toLocaleString('default', {
        weekday: 'long',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }

  async getMonth(date: Date): Promise<string> {
    return date
      .toLocaleString('default', {
        month: 'long',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }

  async getDay(date: Date): Promise<string> {
    return date
      .toLocaleString('default', {
        day: 'numeric',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }

  async getYear(date: Date): Promise<string> {
    return date
      .toLocaleString('default', {
        year: 'numeric',
        timeZone: 'America/Sao_Paulo',
      })
      .toLowerCase();
  }
}
