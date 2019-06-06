import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DateRange, StoreFeatureNames } from 'src/app/shared/enums';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';
import { NumbersAnalyticsData } from 'src/app/shared/interfaces';

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
        const mostPopularBonusNumber: NumbersAnalyticsData = {};

        switch (props.dateRange) {
            case DateRange.ENTIRE_RANGE: {
                scores
                .filter(score => !!TimeService.isSameWeekDayAsToday(score.date))
                .map(score => {
                    mostPopularBonusNumber.length = mostPopularBonusNumber.length ? mostPopularBonusNumber.length + 1 : 1;
                    return score.bonus_number;
                })
                .forEach(bonusNumber => {
                    if (mostPopularBonusNumber.hasOwnProperty(bonusNumber)) {
                        mostPopularBonusNumber[bonusNumber].value = mostPopularBonusNumber[bonusNumber].value + 1;
                        mostPopularBonusNumber[bonusNumber].percentage = (mostPopularBonusNumber[bonusNumber].value / mostPopularBonusNumber.length) * 100;
                    } else {
                        Object.defineProperty(mostPopularBonusNumber, bonusNumber, { value: { value: 1, percentage: 0 }, enumerable: true, writable: true, configurable: true });
                    }
                });
                break;
            }
            case DateRange.LAST_YEAR: {

                break;
            }
            case DateRange.LAST_MONTH: {

                break;
            }
            case DateRange.LAST_WEEK: {

                break;
            }
        }

        return mostPopularBonusNumber;
    },
);
// TimeService.isSameOrAfter(score.date, TimeService.subtractMonthFromNow)
