import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isOddDay(score: Score): boolean {
    return TimeService.isOddDay(score.date);
}
