/**
 * Contain all the time related export functions
 */

/**
 * Return the interval in the most readable and truncated format
 * @param interval - The interval in seconds to format in a readable format
 * @returns {string} - The interval in the most readable format
 * @example formattedInterval(86400) // 1j
 */
export function getFormattedInterval(interval: number) {
  if (interval < 60) {
    return `${interval}s`;
  }
  if (interval < 3600) {
    return `${Math.trunc(secondsToMinutes(interval))}m`;
  }
  if (interval < 86400) {
    return `${Math.trunc(secondsToHours(interval))}h`;
  }
  return `${Math.trunc(secondsToDays(interval))}j`;
}

export function secondsToDays(seconds: number): number {
  const secondsInADay = 60 * 60 * 24;
  return seconds / secondsInADay;
}

export function secondsToHours(seconds: number): number {
  const secondsInAnHour = 60 * 60;
  return seconds / secondsInAnHour;
}

export function secondsToMinutes(seconds: number): number {
  const secondsInAMinute = 60;
  return seconds / secondsInAMinute;
}
