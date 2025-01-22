import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FooterService {
  private selectedButtonSource = new BehaviorSubject<string | null>(null);
  selectedButton$ = this.selectedButtonSource.asObservable();

  setSelectedButton(button: string): void {
    this.selectedButtonSource.next(button);
  }
}