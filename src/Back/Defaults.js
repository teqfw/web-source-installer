/**
 * Plugin constants (hardcoded configuration) for frontend code.
 */
export default class TeqFw_Web_Source_Installer_Back_Defaults {

    CLI_PREFIX = 'web-source-installer'; // prefix in CLI commands

    FILE_SW_CACHE_ZIP = './var/teq-app-install.zip';

    /** @type {TeqFw_Core_Back_Defaults} */
    MOD_CORE;
    /** @type {TeqFw_Web_Back_Defaults} */
    MOD_WEB;

    /** @type {TeqFw_Web_Source_Installer_Shared_Defaults} */
    SHARED;

    /**
     * @param {TeqFw_Core_Back_Defaults} MOD_CORE
     * @param {TeqFw_Web_Back_Defaults} MOD_WEB
     * @param {TeqFw_Web_Source_Installer_Shared_Defaults} SHARED
     */
    constructor(
        {
            TeqFw_Core_Back_Defaults$: MOD_CORE,
            TeqFw_Web_Back_Defaults$: MOD_WEB,
            TeqFw_Web_Source_Installer_Shared_Defaults$: SHARED,
        }
    ) {
        // DEPS
        this.MOD_CORE = MOD_CORE;
        this.MOD_WEB = MOD_WEB;
        this.SHARED = SHARED;

        // MAIN
        Object.freeze(this);
    }
}
