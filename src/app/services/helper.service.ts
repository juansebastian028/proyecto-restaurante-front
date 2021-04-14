import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  private class = new BehaviorSubject<string>('toggled');
  public customMessage = this.class.asObservable();

  public changeMessage(msg: string): void {
    this.class.next(msg);
  }
}
