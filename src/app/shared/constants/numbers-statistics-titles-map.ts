import { ScoreNumbersFilter } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

export const NumbersStatisticsTitlesMap = {
    [ScoreNumbersFilter.NUMBERS_FREQUENCY]: `Częstotliwość losowania wszystkich liczb`,
    [ScoreNumbersFilter.SAME_WEEK_DAY_AS_TODAY]: `Częstotliwość losowania wszystkich liczb w dniu tygodnia ${TimeService.todayDayName}`,
    [ScoreNumbersFilter.SAME_MONTH_AS_TODAY]: `Częstotliwość losowania liczb w miesiącu ${TimeService.todayMonthName}`,
    [ScoreNumbersFilter.ODD_DAY]: `Częstotliwość losowania liczb w dni nieparzyste`,
    [ScoreNumbersFilter.EVEN_DAY]: `Częstotliwość losowania liczb w dni parzyste`,
    [ScoreNumbersFilter.ODD_MONTH]: `Częstotliwość losowania liczb w miesiące nieparzyste`,
    [ScoreNumbersFilter.EVEN_MONTH]: `Częstotliwość losowania liczb w miesiące parzyste`,
    [ScoreNumbersFilter.SAME_YEAR_QUARTER]: (() => {
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
    [ScoreNumbersFilter.SAME_YEAR_DAY_NUMBER]: `Częstoliwość losowania liczb w ${TimeService.todayYearDayNumber} dniu roku`,
    [ScoreNumbersFilter.SAME_MONTH_DAY_NUMBER]: `Częstoliwość losowania liczb w ${TimeService.todayMonthDayNumber} dniu miesiąca`,
};
