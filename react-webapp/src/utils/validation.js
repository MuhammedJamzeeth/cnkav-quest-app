export function isValidUrl(value) {
    try {
        new URL(value); // Tries to construct a URL object
        return true; // If no error, URL is valid
    } catch (e) {
        return false; // Invalid URL
    }
}