import { ScoreNumbersFilters } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

export const NumbersStatisticsTitlesMap = {
    [ScoreNumbersFilters.NUMBERS_FREQUENCY]: `Częstotliwość losowania wszystkich liczb`,
    [ScoreNumbersFilters.SAME_WEEK_DAY_AS_TODAY]: `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${TimeService.todayDayName}`,
    [ScoreNumbersFilters.SAME_MONTH_AS_TODAY]: `Częstotliwość losowania liczb w miesiącu ${TimeService.todayMonthName}`,
    [ScoreNumbersFilters.ODD_DAY]: `Częstotliwość losowania liczb w dni nieparzyste`,
    [ScoreNumbersFilters.EVEN_DAY]: `Częstotliwość losowania liczb w dni parzyste`,
    [ScoreNumbersFilters.ODD_MONTH]: `Częstotliwość losowania liczb w miesiące nieparzyste`,
    [ScoreNumbersFilters.EVEN_MONTH]: `Częstotliwość losowania liczb w miesiące parzyste`,
    [ScoreNumbersFilters.SAME_YEAR_QUARTER]: (() => {
        switch (TimeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczb w pierwszym kwartale roku`;
            }
            case 2: {
                return `Częstotliwość losowania liczb w drugim kwartale roku`;
            }
            case 3: {
                return `Częstotliwość losowania liczb w trzecim kwartale roku`;
            }
            case 4: {
                return `Częstotliwość losowania liczb w czwartym kwartale roku`;
            }
        }
    })(),
    [ScoreNumbersFilters.SAME_YEAR_DAY_NUMBER]: `Częstoliwość losowania liczb w ${TimeService.todayYearDayNumber} dniu roku`,
    [ScoreNumbersFilters.SAME_MONTH_DAY_NUMBER]: `Częstoliwość losowania liczb w ${TimeService.todayMonthDayNumber} dniu miesiąca`,
};
