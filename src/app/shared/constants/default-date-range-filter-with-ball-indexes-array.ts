import { DateScoreFilter } from 'src/app/shared/enums';
import { SCORE_NUMBERS_INDEXES_ARRAY } from 'src/app/shared/constants/score-numbers-indexes-array';
import { DateRangeFilterWithBallIndexesArray } from 'src/app/shared/types';

export const DEFAULT_DATE_RANGE_FILTER_AND_BALL_INDEXES_ARRAY = [ DateScoreFilter.ENTIRE_RANGE, SCORE_NUMBERS_INDEXES_ARRAY ] as DateRangeFilterWithBallIndexesArray;
