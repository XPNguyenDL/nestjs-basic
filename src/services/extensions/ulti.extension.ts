export function extractUsername(email: string): string | null {
    // Define a regular expression to match the username part of an email address
    const regex = /^([^@]+)@/;

    // Use the regular expression to extract the username
    const match = email.match(regex);

    // If a match is found, return the captured username, otherwise return null
    if (match) {
        return match[1];
    } else {
        return null;
    }
}