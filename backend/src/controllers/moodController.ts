export class MoodController {
    private moodCheckIns: { [key: string]: string[] } = {};

    public checkIn(userId: string, mood: string): string {
        if (!this.moodCheckIns[userId]) {
            this.moodCheckIns[userId] = [];
        }
        this.moodCheckIns[userId].push(mood);
        return `Mood ${mood} recorded for user ${userId}.`;
    }

    public getMoodHistory(userId: string): string[] {
        return this.moodCheckIns[userId] || [];
    }

    public promptMoodCheckIn(userId: string): string {
        return `Please check in your mood before unlocking the site, user ${userId}.`;
    }
}