/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class TeqFw_Web_Source_Installer_Back_Defaults {

    /** @type {TeqFw_Web_Source_Installer_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Web_Source_Installer_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Web_Source_Installer_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.SHARED = SHARED;

        // MAIN
        Object.freeze(this);
    }
}
