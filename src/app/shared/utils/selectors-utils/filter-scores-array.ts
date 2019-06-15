import { Score } from 'src/app/shared/interfaces/score';
import { ScoreFilter } from 'src/app/shared/types';
import { filter, forEach } from 'lodash';
import { ScoreFilterMap } from 'src/app/shared/constants/score-filters-map';
import { filterScoresNumbersArrayByIndex } from 'src/app/shared/utils/selectors-utils/filter-scores-numbers-array-by-index';
import { DateScoreFilter } from 'src/app/shared/enums';

export function filterScoresArray(scores: Partial<Score[]>): (scoreFilters: ScoreFilter[]) => [ Array<Score>, number ] {
    let filteredScores: Score[] = [ ...scores ];

    return function (scoreFilters: ScoreFilter[] = []): [ Array<Score>, number ] {

        forEach(scoreFilters, (scoreFilter: ScoreFilter) => {
            if (scoreFilter in DateScoreFilter) {
                filteredScores = filter(filteredScores, ScoreFilterMap[scoreFilter]);
            } else {
                filteredScores = filterScoresNumbersArrayByIndex(filteredScores, scoreFilter);
            }

        });

        return [ [ ...filteredScores ], filteredScores.length ];
    };
}
