import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateRange, StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';
import * as R from 'ramda';
import { NumbersData } from 'src/app/shared/interfaces';

export const selectScoreState = createFeatureSelector<ScoreState>(StoreFeatureNames.SCORE);

export const selectScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectAll,
);

export const selectTotalScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectTotal,
);

export const selectMostPopularBonusNumberByDayOfTheWeek = createSelector(
    selectScores,
    (scores: Score[], props: { dateRange: DateRange }) => {
        let counter;

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                counter = countNumbersBy('bonus_number')(isSameWeekDayAsToday);
                break;
            }
            case DateRange.LAST_YEAR: {
                counter = countNumbersBy('bonus_number')(isSameWeekDayAsTodayInLastYear);
                break;
            }
            case DateRange.LAST_MONTH: {
                counter = countNumbersBy('bonus_number')(isSameWeekDayAsTodayInLastMonth);
                break;
            }
            case DateRange.LAST_WEEK: {
                counter = countNumbersBy('bonus_number')(isSameWeekDayAsTodayInLastWeek);
                break;
            }
        }

        return R.mapObjIndexed(mapToValueAndPercentage, R.assoc('length', reduceObjectValues(counter(scores)), counter(scores)));
    },
);

function countNumbersBy(countByKey: string): R.compose {
    return function (filter: (score: Score) => boolean = () => true) {
        return R.compose(
            R.countBy((n: number) => n),
            R.map((score: Score) => score[countByKey]),
            R.filter(filter)
        );
    }
}

function mapToValueAndPercentage(value: number, key: string, sourceMapObject: Object): Object  {
    if (isNaN(+key)) {
        return value;
    } else {
        return {
            value,
            percentage: (value / sourceMapObject['length']) * 100,
        };
    }
}

function sortNumbersDataASC(last: { value: number, percentage: number }, next: { value: number, percentage: number }): number {
    return last.value - next.value;
}

function sortNumbersDataDESC(last: { value: number, percentage: number }, next: { value: number, percentage: number }): number {
    return next.value - last.value;
}

function reduceObjectValues(obj: Object): number {
    return Object.values(obj).reduce((acc, val) => acc + val, 0);
}

function isSameWeekDayAsToday(score: Score): boolean {
    return TimeService.isSameWeekDayAsToday(score.date);
}

function isSameWeekDayAsTodayInLastYear(score: Score): boolean {
    return isSameWeekDayAsToday(score) && TimeService.isSameOrAfter(score.date, TimeService.subtractYearFromNow);
}

function isSameWeekDayAsTodayInLastMonth(score: Score): boolean {
    return isSameWeekDayAsToday(score) && TimeService.isSameOrAfter(score.date, TimeService.subtractMonthFromNow);
}

function isSameWeekDayAsTodayInLastWeek(score: Score): boolean {
    return isSameWeekDayAsToday(score) && TimeService.isSameOrAfter(score.date, TimeService.subtractWeekFromNow);
}
