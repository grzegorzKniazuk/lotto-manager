import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isSameMonthDayNumber(score: Score): boolean {
    return TimeService.isSameMonthDayNumber(score.date);
}
