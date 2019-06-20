import { ScoreNumbersFilters } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

export const NumbersStatisticsTitlesMap = {
    [ScoreNumbersFilters.NUMBERS_FREQUENCY]: `Częstotliwość losowania wszystkich liczb`,
    [ScoreNumbersFilters.NUMBERS_FREQUENCY_BY_DAY_OF_THE_WEEK]: `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${TimeService.todayDayName}`,
    [ScoreNumbersFilters.NUMBERS_IN_ACTUAL_MONTH_NAME]: `Częstotliwość losowania liczb w miesiącu ${TimeService.todayMonthName}`,
    [ScoreNumbersFilters.NUMBERS_BY_ODD_OR_EVEN_DAY]: TimeService.isOddDayToday ? `Częstotliwość losowania liczb w dni nieparzyste` : `Częstotliwość losowania liczb w dni parzyste`,
    [ScoreNumbersFilters.NUMBERS_BY_ODD_OR_EVEN_MONTH]: TimeService.isOddMonthToday ? `Częstotliwość losowania liczb w miesiące nieparzyste` : `Częstotliwość losowania liczb w miesiące parzyste`,
    [ScoreNumbersFilters.NUMBERS_BY_YEAR_QUARTER]: (() => {
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
    [ScoreNumbersFilters.NUMBERS_BY_YEAR_DAY_NUMBER]: `Częstoliwość losowania liczb w ${TimeService.todayYearDayNumber} dniu roku`,
    [ScoreNumbersFilters.NUMBERS_BY_MONTH_DAY_NUMBER]: `Częstoliwość losowania liczb w ${TimeService.todayMonthDayNumber} dniu miesiąca`,
};
