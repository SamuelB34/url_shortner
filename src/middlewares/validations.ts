/**
 * Validates a URL string.
 *
 * This function uses a regular expression to check whether a given string
 * matches the pattern of a valid URL. The regex supports both absolute
 * URLs (with or without the `https://` or `http://` protocol) and relative
 * URLs with paths.
 *
 * @param {string} url - The URL string to be validated.
 * @returns {boolean} - Returns `true` if the URL is valid, `false` otherwise.
 *
 * @example
 * // Validates a URL with HTTPS protocol
 * validateUrl("https://www.example.com"); // true
 *
 * @example
 * // Validates a URL without protocol
 * validateUrl("www.example.com"); // true
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#valid_links
 */
export const validateUrl = (url: string): boolean => {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/i;
    return regex.test(url);
};


/**
 * Adds "https://" to the start of the URL if it doesn't already have a protocol.
 *
 * @param url - The string to modify and validate.
 * @returns {string} - The modified URL with "https://" if it didn't have a protocol.
 */
export const addHttpsProtocol= (url: string): string => {
    // Check if the URL already contains a protocol (http or https)
    if (!/^https?:\/\//i.test(url)) {
        url = "https://" + url; // Add https:// if no protocol is found
    }

    return url; // Return the modified URL
}

