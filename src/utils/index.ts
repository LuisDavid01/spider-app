
export function parseDate(date?: string | Date) {
	if (!date) return new Date().toISOString().split("T")[0];
	const parsedDate = typeof date === 'string' ? new Date(date) : date
	return parsedDate.toISOString().split("T")[0];
}
