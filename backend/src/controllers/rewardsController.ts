export class RewardsController {
    private focusCredits: number;

    constructor() {
        this.focusCredits = 0;
    }

    public addFocusCredits(amount: number): void {
        this.focusCredits += amount;
    }

    public redeemFocusCredits(amount: number): boolean {
        if (amount <= this.focusCredits) {
            this.focusCredits -= amount;
            return true;
        }
        return false;
    }

    public getFocusCredits(): number {
        return this.focusCredits;
    }

    public getRewards(): string[] {
        const rewards = [
            "Extra Break Time",
            "Access to Premium Features",
            "Gift Cards",
            "Charity Donations",
            "Personalized Coaching Session"
        ];
        return rewards;
    }

    public claimReward(reward: string): boolean {
        const rewards = this.getRewards();
        if (rewards.includes(reward)) {
            // Logic to claim the reward
            return true;
        }
        return false;
    }
}