import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export function isEvenDay(score: Score): boolean {
    return TimeService.isEvenDay(score.date);
}
