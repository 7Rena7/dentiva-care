function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0');
}

export function formatDate(dateParam: string | Date) {
  if (dateParam === null) return '';
  const date = new Date(dateParam);
  return [
    date.getFullYear(),
    padTo2Digits(date.getMonth() + 1),
    padTo2Digits(date.getDate()),
  ].join('-');
}

export function formatSpanishDate(value: string | undefined | null): string {
  if (!value) {
    return ''; // Return empty string for undefined or null values
  }

  const parts = value.split('-');
  if (parts.length !== 3) {
    return value; // Return as is if not in the expected format
  }

  const [year, month, day] = parts;
  return `${day}/${month}/${year}`;
}
