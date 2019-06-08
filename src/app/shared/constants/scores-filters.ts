import { Score } from 'src/app/shared/interfaces/score';
import { TimeService } from 'src/app/shared/services/time.service';

export const scoresFilters = {
    isSameWeekDayAsToday: (score: Score): boolean => TimeService.isSameWeekDayAsToday(score.date),
    isInLastYear: (score: Score): boolean => TimeService.isSameOrAfter(score.date, TimeService.subtractYearFromNow),
    isInLastMonth: (score: Score): boolean => TimeService.isSameOrAfter(score.date, TimeService.subtractMonthFromNow),
    isInLastWeek: (score: Score): boolean => TimeService.isSameOrAfter(score.date, TimeService.subtractWeekFromNow),
    isSameWeekDayAsTodayInLastYear: (score: Score): boolean => TimeService.isSameWeekDayAsToday(score.date) && TimeService.isSameOrAfter(score.date, TimeService.subtractYearFromNow),
    isSameWeekDayAsTodayInLastMonth: (score: Score): boolean => TimeService.isSameWeekDayAsToday(score.date) && TimeService.isSameOrAfter(score.date, TimeService.subtractMonthFromNow),
    isSameWeekDayAsTodayInLastWeek: (score: Score): boolean => TimeService.isSameWeekDayAsToday(score.date) && TimeService.isSameOrAfter(score.date, TimeService.subtractWeekFromNow),
};
