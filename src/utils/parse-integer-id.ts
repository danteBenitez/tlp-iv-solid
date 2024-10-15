export function parseIntegerId(id: string) {
    const parsed = parseInt(id);
    if (Number.isNaN(parsed)) return null;
    return parsed;
}