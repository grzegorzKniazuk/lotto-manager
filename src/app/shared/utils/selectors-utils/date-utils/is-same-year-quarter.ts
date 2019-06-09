import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isSameYearQuarter(score: Score): boolean {
    return TimeService.isSameYearQuarter(score.date);
}
