import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ScoreState } from 'src/app/modules/dashboard/store/reducers/score.reducer';
import * as scoreEntitySelectors from '../reducers/score.reducer';
import { ExpressionScore, StoreFeatureNames } from 'src/app/shared/enums';
import { Score } from 'src/app/shared/interfaces/score';
import { SCORES_BONUS_NUMBER_KEY, SCORES_DATE_KEY, SCORES_NUMBERS_KEY } from 'src/app/shared/constants';
import { pick } from 'lodash';
import { BallIndexes, ScoreFilter } from 'src/app/shared/types';
import {
    dateValueMapByExpression,
    filterScoresArray,
    filterScoresNumbersArrayByIndex,
    mapNumberKeyValueObjectToBallValuePercentage,
    mapNumbersArrayToBallValuePercentage,
    scoresCountBy,
} from 'src/app/shared/utils';
import { scoresNumbersArraysToFlatNumbersArray } from 'src/app/shared/utils/selectors-utils/scores-numbers-arrays-to-flat-numbers-array';

export const selectScoreState = createFeatureSelector<ScoreState>(StoreFeatureNames.SCORE);

export const selectScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectAll,
);

export const selectTotalScores = createSelector(
    selectScoreState,
    scoreEntitySelectors.selectTotal,
);

export const selectBonusNumbersScores = createSelector(
    selectScores,
    (scores: Score[]) => scores.map(score => pick(score, [ SCORES_DATE_KEY, SCORES_BONUS_NUMBER_KEY ])),
);

export const selectNumbersScores = createSelector(
    selectScores,
    (scores: Score[]) => scores.map(score => pick(score, [ SCORES_DATE_KEY, SCORES_NUMBERS_KEY ])),
);

export const selectBonusNumberByFilter = createSelector(
    selectBonusNumbersScores,
    (scores: Partial<Score[]>, filters: ScoreFilter[]) => {

        const [ filteredScores, arrayLength ] = filterScoresArray(scores)(filters);
        const scoresCountedByBonusNumber = scoresCountBy(filteredScores)(SCORES_BONUS_NUMBER_KEY);

        return mapNumberKeyValueObjectToBallValuePercentage(scoresCountedByBonusNumber)(arrayLength);
    },
);

export const selectNumbersByFilter = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, filters: ScoreFilter[]) => {

        const [ filteredScores ] = filterScoresArray(scores)(filters);
        const flatScoresNumbers = scoresNumbersArraysToFlatNumbersArray(filteredScores);

        return mapNumbersArrayToBallValuePercentage(flatScoresNumbers);
    },
);

export const selectNumbersByExpression = createSelector(
    selectNumbersScores,
    (scores: Partial<Score[]>, props: { filters?: ScoreFilter[], expressions: ExpressionScore[], indexes?: BallIndexes }) => {

        const [ filteredScores ] = filterScoresArray(props.indexes ? filterScoresNumbersArrayByIndex(scores, props.indexes) : scores)(props.filters);

        return dateValueMapByExpression(filteredScores)(props.expressions);
    },
);
