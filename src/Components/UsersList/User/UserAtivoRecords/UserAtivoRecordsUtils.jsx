export function msToTime(duration) {
    const seconds = Math.floor((duration / 1000) % 60).toString().padStart(2, '0');
    const minutes = Math.floor((duration / (1000 * 60)) % 60).toString().padStart(2, '0');
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
    const days = Math.floor(duration / (1000 * 60 * 60 * 24)).toString();

    return `${days}d ${hours}:${minutes}:${seconds}`;
}