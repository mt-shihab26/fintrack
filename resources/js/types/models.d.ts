import type { TKind } from './enums';

export type TId = string;

export type TUser = {
    id: TId;
    name: string;
    email: string;
    email_verified_at: string | null;
    avatar: string | null;
    currency: TCurrency;
    email_notifications: boolean;
    push_notifications: boolean;
    budget_alerts: boolean;
    weekly_reports: boolean;
    created_at: string;
    updated_at: string;
};

export type TTransaction = {
    id: TId;
    kind: TKind;
    amount: number;
    category: string;
    description: string;
    date: string;
    tags?: string[];
};

export type TBudget = {
    id: TId;
    category: string;
    amount: number;
    spent: number;
    period: TBudgetPeriod;
};

export type TCategory = {
    id: TId;
    name: string;
    kind: TKind;
    color: string;
    transaction_count: number;
    total_amount: number;
};
