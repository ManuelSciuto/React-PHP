export function daysSince(dateString: string): number {
    const msDiff = new Date().getTime() - new Date(dateString).getTime();
    const dailyMs = 1000 * 60 * 60 * 24;
    return Math.floor(msDiff / dailyMs);
}