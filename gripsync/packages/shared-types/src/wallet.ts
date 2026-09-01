export interface Currency {
  code: string;
  symbol: string;
  name: string;
  exchangeRate: number;
}

export interface WalletItem {
  peripheralId: string;
  targetPrice: number;
  currency: string;
  monthlySavings: number;
  savedSoFar: number;
  startDate: Date;
  targetDate: Date;
}

export interface BudgetPlan {
  items: WalletItem[];
  totalCost: number;
  monthlyBudget: number;
  priorityOrder: string[];
  completionDate: Date;
}
