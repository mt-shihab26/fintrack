import type { TCategory } from './models';

export type TIndexCategory = TCategory & {
    transaction_count: number;
    total_amount: number;
};
