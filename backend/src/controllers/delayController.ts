class DelayController {
    private delayTime: number;

    constructor() {
        this.delayTime = 0;
    }

    setDelayTime(time: number): void {
        this.delayTime = time;
    }

    getDelayTime(): number {
        return this.delayTime;
    }

    applyProgressiveDelay(): number {
        this.delayTime = Math.min(this.delayTime + 5, 60); // Increase delay time by 5 minutes, max 60 minutes
        return this.delayTime;
    }

    resetDelayTime(): void {
        this.delayTime = 0;
    }
}