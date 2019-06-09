import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isSameYearDayNumber(score: Score): boolean {
    return TimeService.isSameYearDayNumber(score.date);
}
