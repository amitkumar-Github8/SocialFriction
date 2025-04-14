export class AlternativesController {
    suggestMindfulAlternatives(userId: string): string[] {
        // Logic to suggest mindful alternatives based on user preferences and habits
        const alternatives = [
            "Take a short walk",
            "Practice deep breathing",
            "Read a book",
            "Listen to calming music",
            "Do a quick meditation"
        ];
        return alternatives;
    }
}