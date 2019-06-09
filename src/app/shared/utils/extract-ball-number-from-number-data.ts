import { NumberData } from 'src/app/shared/interfaces';

export function extractBallNumberFromNumberData(numberData: NumberData): number {
    return numberData.ball;
}
