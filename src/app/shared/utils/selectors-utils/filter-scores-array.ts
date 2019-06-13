import { Score } from 'src/app/shared/interfaces/score';
import { ScoreFilter } from 'src/app/shared/types';
import { filter, forEach } from 'lodash';
import { ScoreFilterMap } from 'src/app/shared/constants/score-filters-map';

export function filterScoresArray(scores: Partial<Score[]>): (scoreFilters: ScoreFilter[]) => [ Array<Score>, number ] {
    let filteredScores: Score[] = [ ...scores ];

    return function (scoreFilters: ScoreFilter[] = []): [ Array<Score>, number ] {

        forEach(scoreFilters, (scoreFilter: ScoreFilter) => {
            filteredScores = filter(filteredScores, ScoreFilterMap[scoreFilter]);
        });

        return [ [ ...filteredScores ], filteredScores.length ];
    };
}
