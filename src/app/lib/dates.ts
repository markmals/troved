const isoFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    // Because the frontmatter dates get parsed as GMT:
    timeZone: "Europe/London",
    // Format as YYYY-MM-DD
    formatMatcher: "best fit",
});

export function formatIsoDate(date?: Date | number): string {
    const parts = isoFormatter.format(date).split("/");
    // Rearrange from MM/DD/YYYY to YYYY-MM-DD
    if (parts.length === 3) {
        return `${parts[2]}-${parts[0]}-${parts[1]}`;
    }
    return isoFormatter.format(date);
}

export const longFormatter = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    // Because the frontmatter dates get parsed as GMT:
    timeZone: "Europe/London",
});
