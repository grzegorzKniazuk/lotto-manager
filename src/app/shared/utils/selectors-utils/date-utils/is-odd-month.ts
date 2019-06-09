import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isOddMonth(score: Score): boolean {
    return TimeService.isOddMonth(score.date);
}
