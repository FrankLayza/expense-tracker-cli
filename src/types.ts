export interface Expenses {
    id: number;
    date: string;
    description: string;
    amount: number;
    category?: string;
}

export interface ExpenseSummary{
    total: number;
    count: number;
}