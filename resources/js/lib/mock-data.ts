export interface TTransaction {
    id: string;
    type: 'income' | 'expense';
    amount: number;
    category: string;
    description: string;
    date: string;
    tags?: string[];
}

export interface Budget {
    id: string;
    category: string;
    amount: number;
    spent: number;
    period: 'monthly' | 'weekly';
}

export interface Category {
    id: string;
    name: string;
    type: 'income' | 'expense';
    color: string;
    transactionCount: number;
    totalAmount: number;
}

export interface UserProfile {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
}

export interface UserPreferences {
    currency: string;
    theme: string;
    notifications: {
        email: boolean;
        push: boolean;
        budgetAlerts: boolean;
        weeklyReports: boolean;
    };
    dateFormat: string;
    language: string;
}

export const mockTransactions: TTransaction[] = [
    {
        id: '1',
        type: 'expense',
        amount: 85.5,
        category: 'Food',
        description: 'Grocery shopping at Whole Foods',
        date: '2024-01-15',
        tags: ['groceries', 'essential'],
    },
    {
        id: '2',
        type: 'income',
        amount: 3500.0,
        category: 'Salary',
        description: 'Monthly salary',
        date: '2024-01-01',
        tags: ['work'],
    },
    {
        id: '3',
        type: 'expense',
        amount: 1200.0,
        category: 'Rent',
        description: 'Monthly rent payment',
        date: '2024-01-01',
        tags: ['housing', 'fixed'],
    },
    {
        id: '4',
        type: 'expense',
        amount: 45.0,
        category: 'Transport',
        description: 'Gas station fill-up',
        date: '2024-01-14',
        tags: ['car', 'fuel'],
    },
    {
        id: '5',
        type: 'expense',
        amount: 120.0,
        category: 'Entertainment',
        description: 'Movie tickets and dinner',
        date: '2024-01-13',
        tags: ['leisure', 'social'],
    },
    {
        id: '6',
        type: 'expense',
        amount: 65.0,
        category: 'Utilities',
        description: 'Electricity bill',
        date: '2024-01-10',
        tags: ['bills', 'fixed'],
    },
    {
        id: '7',
        type: 'expense',
        amount: 32.5,
        category: 'Food',
        description: 'Coffee and pastry',
        date: '2024-01-12',
        tags: ['coffee', 'breakfast'],
    },
    {
        id: '8',
        type: 'income',
        amount: 250.0,
        category: 'Freelance',
        description: 'Web design project',
        date: '2024-01-08',
        tags: ['freelance', 'design'],
    },
    {
        id: '9',
        type: 'expense',
        amount: 89.99,
        category: 'Shopping',
        description: 'New running shoes',
        date: '2024-01-07',
        tags: ['clothing', 'fitness'],
    },
    {
        id: '10',
        type: 'expense',
        amount: 15.0,
        category: 'Transport',
        description: 'Uber ride to airport',
        date: '2024-01-06',
        tags: ['travel', 'uber'],
    },
];

export const mockBudgets: Budget[] = [
    {
        id: '1',
        category: 'Food',
        amount: 500,
        spent: 318.0,
        period: 'monthly',
    },
    {
        id: '2',
        category: 'Transport',
        amount: 200,
        spent: 60.0,
        period: 'monthly',
    },
    {
        id: '3',
        category: 'Entertainment',
        amount: 300,
        spent: 120.0,
        period: 'monthly',
    },
    {
        id: '4',
        category: 'Utilities',
        amount: 150,
        spent: 65.0,
        period: 'monthly',
    },
    {
        id: '5',
        category: 'Shopping',
        amount: 400,
        spent: 89.99,
        period: 'monthly',
    },
];

export const mockCategories: Category[] = [
    {
        id: '1',
        name: 'Food',
        type: 'expense',
        color: '#f59e0b',
        transactionCount: 2,
        totalAmount: 118.0,
    },
    {
        id: '2',
        name: 'Rent',
        type: 'expense',
        color: '#dc2626',
        transactionCount: 1,
        totalAmount: 1200.0,
    },
    {
        id: '3',
        name: 'Transport',
        type: 'expense',
        color: '#059669',
        transactionCount: 2,
        totalAmount: 60.0,
    },
    {
        id: '4',
        name: 'Entertainment',
        type: 'expense',
        color: '#7c3aed',
        transactionCount: 1,
        totalAmount: 120.0,
    },
    {
        id: '5',
        name: 'Salary',
        type: 'income',
        color: '#10b981',
        transactionCount: 1,
        totalAmount: 3500.0,
    },
    {
        id: '6',
        name: 'Utilities',
        type: 'expense',
        color: '#4b5563',
        transactionCount: 1,
        totalAmount: 65.0,
    },
    {
        id: '7',
        name: 'Freelance',
        type: 'income',
        color: '#06b6d4',
        transactionCount: 1,
        totalAmount: 250.0,
    },
    {
        id: '8',
        name: 'Shopping',
        type: 'expense',
        color: '#8b5cf6',
        transactionCount: 1,
        totalAmount: 89.99,
    },
];

export const mockUserProfile: UserProfile = {
    id: 'user-1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/diverse-user-avatars.png',
    createdAt: '2023-06-15T10:30:00Z',
};

export const mockUserPreferences: UserPreferences = {
    currency: 'USD',
    theme: 'system',
    notifications: {
        email: true,
        push: false,
        budgetAlerts: true,
        weeklyReports: true,
    },
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
};

export const calculateTotalIncome = (transactions: TTransaction[]): number => {
    return transactions.filter((t) => t.type === 'income').reduce((sum, t) => sum + t.amount, 0);
};

export const calculateTotalExpenses = (transactions: TTransaction[]): number => {
    return transactions.filter((t) => t.type === 'expense').reduce((sum, t) => sum + t.amount, 0);
};

export const calculateNetBalance = (transactions: TTransaction[]): number => {
    return calculateTotalIncome(transactions) - calculateTotalExpenses(transactions);
};

export const getTransactionsByCategory = (transactions: TTransaction[], category: string): TTransaction[] => {
    return transactions.filter((t) => t.category === category);
};

export const getTransactionsByDateRange = (transactions: TTransaction[], startDate: string, endDate: string): TTransaction[] => {
    return transactions.filter((t) => t.date >= startDate && t.date <= endDate);
};

export const getBudgetUtilization = (budgets: Budget[]): number => {
    const totalBudget = budgets.reduce((sum, b) => sum + b.amount, 0);
    const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
    return totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;
};

export const getOverBudgetCategories = (budgets: Budget[]): Budget[] => {
    return budgets.filter((b) => (b.spent / b.amount) * 100 > 100);
};

export const getNearLimitCategories = (budgets: Budget[]): Budget[] => {
    return budgets.filter((b) => {
        const percentage = (b.spent / b.amount) * 100;
        return percentage > 80 && percentage <= 100;
    });
};
