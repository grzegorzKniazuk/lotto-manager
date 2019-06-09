import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isInLastMonth(score: Score): boolean {
    return TimeService.isSameOrAfter(score.date, TimeService.subtractMonthFromNow);
}
