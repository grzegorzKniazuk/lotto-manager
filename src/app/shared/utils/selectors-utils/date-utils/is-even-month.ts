import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isEvenMonth(score: Score): boolean {
    return TimeService.isEvenMonth(score.date);
}
