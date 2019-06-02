import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Score } from 'src/app/shared/interfaces/score';
import { Observable } from 'rxjs';

export class ScoreListResolver implements Resolve<Score[]> {

    public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Score[]> | Promise<Score[]> | Score[] {
        return undefined;
    }

}
