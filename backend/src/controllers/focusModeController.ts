export class FocusModeController {
    private timer: NodeJS.Timeout | null = null;
    private isActive: boolean = false;
    private focusDuration: number = 25 * 60; // 25 minutes
    private breakDuration: number = 5 * 60; // 5 minutes
    private remainingTime: number = this.focusDuration;

    startFocusMode() {
        if (this.isActive) return;
        this.isActive = true;
        this.remainingTime = this.focusDuration;
        this.runTimer();
    }

    private runTimer() {
        this.timer = setInterval(() => {
            if (this.remainingTime <= 0) {
                this.endFocusMode();
                return;
            }
            this.remainingTime--;
        }, 1000);
    }

    endFocusMode() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.isActive = false;
        this.remainingTime = this.breakDuration;
        // Logic to notify user for break time can be added here
    }

    getRemainingTime() {
        return this.remainingTime;
    }

    isFocusModeActive() {
        return this.isActive;
    }

    resetFocusMode() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
        this.isActive = false;
        this.remainingTime = this.focusDuration;
    }
}