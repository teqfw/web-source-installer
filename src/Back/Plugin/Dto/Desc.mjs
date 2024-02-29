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
    /** @type {string[]} */
    excludes;
    /** @type {string[]} */
    includes;
}

/**
 * @implements TeqFw_Core_Shared_Api_Factory_Dto
 */
export default class TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc {
    /**
     * @param {TeqFw_Core_Shared_Util_Cast} cast
     */
    constructor(
        {
            TeqFw_Core_Shared_Util_Cast$: cast,
        }
    ) {
        // INSTANCE METHODS
        /**
         * @param {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc.Dto} [data]
         * @return {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc.Dto}
         */
        this.createDto = function (data) {
            const res = new Dto();
            res.excludes = cast.arrayOfStr(data?.excludes);
            res.includes = cast.arrayOfStr(data?.includes);
            return res;
        };
    }
}
