import { CollectionViewer, DataSource} from '@angular/cdk/collections';
import { Survey } from '../models/survey';
import { SurveysService } from './surveys.service';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

export class SurveysDataSource implements DataSource<Survey> {

  private surveySubject = new BehaviorSubject<Survey[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  constructor(private surveysService: SurveysService) {}

  connect(collectionViewer: CollectionViewer): Observable<Survey[]> {
      console.log('Connecting data source');
      return this.surveySubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
      this.surveySubject.complete();
      this.loadingSubject.complete();
      console.log('Disconnects data source');
  }

  loadSurveys(organizationId: string) {

      this.loadingSubject.next(true);

      this.surveysService.getSurveysByOrganizationsId(organizationId)
      .pipe(
          catchError(() => {
            console.log('Empty collection due to error');
            return of([]);
          }),
          finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(surveys => {
        console.log('Subcribing to data');
        this.surveySubject.next(surveys);
      });
  }
}
