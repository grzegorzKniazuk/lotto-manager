import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isSameWeekDayAsToday(score: Score): boolean {
    return TimeService.isSameWeekDayAsToday(score.date);
}