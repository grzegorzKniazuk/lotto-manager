import { Score } from 'src/app/shared/interfaces/score';
import { DateRange } from 'src/app/shared/enums';
import * as R from 'ramda';
import { mapScoresToNumbersArray } from 'src/app/shared/utils/selectors-utils/map-scores-to-numbers-array';
import { filterScoresBySelectedNumberAndDateRange } from 'src/app/shared/utils/selectors-utils/filter-scores-by-selected-number-and-data-range';

export function numbersArrayIncludesSpecificNumberAndDateRange(scores: Score[], ballNumber: number, dateRange: DateRange): number[] {
    return R.compose(mapScoresToNumbersArray, filterScoresBySelectedNumberAndDateRange)(scores, ballNumber, dateRange);
}
