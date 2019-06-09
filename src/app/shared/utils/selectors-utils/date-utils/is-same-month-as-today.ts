import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isSameMonthAsToday(score: Score): boolean {
    return TimeService.isSameMonthAsToday(score.date);
}
