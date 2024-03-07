/**
 * DTO to represent plugin descriptor (teqfw.json) structure
 * that is related to '@teqfw/web-source-installer' node.
 */
// MODULE'S VARS
const NS = 'TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc';

// MODULE'S CLASSES
/**
 * @memberOf TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc
 */
class Dto {
    static namespace = NS;
    /**
     * Prefixes for filesystem paths.
     * @type {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc_Rules.Dto}
     */
    paths;
    /**
     * Prefixes for URLs.
     * @type {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc_Rules.Dto}
     */
    urls;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc {
    /**
     * @param {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc_Rules} dtoRules
     */
    constructor(
        {
            TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc_Rules$: dtoRules,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc.Dto} [data]
         * @return {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.paths = dtoRules.createDto(data?.paths);
            res.urls = dtoRules.createDto(data?.urls);
            return res;
        };
    }
}
