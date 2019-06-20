import { ScoreNumbersFilter } from 'src/app/shared/enums';
import { TimeService } from 'src/app/shared/services/time.service';

export const BonusNumberTitlesMap = {
    [ScoreNumbersFilter.NUMBERS_FREQUENCY]: `Częstotliwość losowania liczb bonusowych`,
    [ScoreNumbersFilter.SAME_WEEK_DAY_AS_TODAY]: `Częstotliwość losowania liczb bonusowych w dniu tygodnia ${TimeService.todayDayName}`,
    [ScoreNumbersFilter.SAME_MONTH_AS_TODAY]: `Częstotliwość losowania liczb bonusowych w miesiącu ${TimeService.todayMonthName}`,
    [ScoreNumbersFilter.ODD_DAY]: `Częstotliwość losowania liczby bonusowej w dni nieparzyste`,
    [ScoreNumbersFilter.EVEN_DAY]: `Częstotliwość losowania liczby bonusowej w dni parzyste`,
    [ScoreNumbersFilter.ODD_MONTH]: `Częstotliwość losowania liczby bonusowej w miesiące nieparzyste`,
    [ScoreNumbersFilter.EVEN_MONTH]: `Częstotliwość losowania liczby bonusowej w miesiące parzyste`,
    [ScoreNumbersFilter.SAME_YEAR_QUARTER]: (() => {
        switch (TimeService.todayYearQuarter) {
            case 1: {
                return `Częstotliwość losowania liczby bonusowej w pierwszym kwartale roku`;
            }
            case 2: {
                return `Częstotliwość losowania liczby bonusowej w drugim kwartale roku`;
            }
            case 3: {
                return `Częstotliwość losowania liczby bonusowej w trzecim kwartale roku`;
            }
            case 4: {
                return `Częstotliwość losowania liczby bonusowej w czwartym kwartale roku`;
            }
        }
    })(),
    [ScoreNumbersFilter.SAME_YEAR_DAY_NUMBER]: `Częstoliwość losowania liczby bonusowej w ${TimeService.todayYearDayNumber} dniu roku`,
    [ScoreNumbersFilter.SAME_MONTH_DAY_NUMBER]: `Częstoliwość losowania liczby bonusowej w ${TimeService.todayMonthDayNumber} dniu miesiąca`,
};
