import {Injectable} from "@angular/core";
import {filter, Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventBusService {
  private eventBus: Subject<any> = new Subject<any>();

  publish(event: any): void {
    this.eventBus.next(event);
  }

  getObservable(eventName: string): Observable<any> {
    return this.eventBus.asObservable().pipe(
      filter((event: any) => event.name === eventName)
    );
  }
}
