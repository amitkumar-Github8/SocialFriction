export class TimeBudgetController {
    private timeBudgets: Map<string, number>;

    constructor() {
        this.timeBudgets = new Map();
    }

    setTimeBudget(userId: string, budget: number): void {
        this.timeBudgets.set(userId, budget);
    }

    getTimeBudget(userId: string): number | undefined {
        return this.timeBudgets.get(userId);
    }

    checkTimeBudget(userId: string, timeSpent: number): boolean {
        const budget = this.getTimeBudget(userId);
        if (budget !== undefined) {
            return timeSpent <= budget;
        }
        return false;
    }

    resetTimeBudget(userId: string): void {
        this.timeBudgets.delete(userId);
    }
}