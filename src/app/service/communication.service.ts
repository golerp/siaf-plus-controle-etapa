import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {
  private footerEventSubject = new Subject<string>();
  footerEvent$ = this.footerEventSubject.asObservable();

  emitFooterEvent(message: string) {
    this.footerEventSubject.next(message);
  }
}