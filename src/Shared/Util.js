/**
 * The set of utilities used in this plugin.
 */

// MODULE'S CLASSES
export default class TeqFw_Web_Source_Installer_Shared_Util {
    /**
     * This function checks if a given path matches a specified wildcard pattern.
     *
     * @param {string} path - The path to be checked (./data/to/folder/db.json).
     * @param {string} pattern - The wildcard pattern to match the path against (./data/*).
     * @return {boolean} - Returns true if the path matches the pattern.
     */
    matchWildcardPattern(path, pattern) {
        if(!path) return false;
        const pathParts = path.split('/');
        const patternParts = pattern.split('/');
        // always 'false' if path is shorter than pattern
        if (pathParts.length < patternParts.length) return false;
        // Check each part for matching or wildcard
        for (let i = 0; i < patternParts.length; i++)
            if ((pathParts[i] !== patternParts[i]))
                return (patternParts[i] === '*') ;
        return false;
    }
}