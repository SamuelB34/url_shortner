export const validateUrl = (url: string) => {
    const regex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})(\/[\w .-]*)*\/?$/i;
    return regex.test(url);
}

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

