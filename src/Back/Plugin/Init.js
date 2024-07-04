/**
 * The factory to create the plugin initialization function.
 *
 * @param {TeqFw_Web_Source_Installer_Back_Defaults} DEF
 * @param {TeqFw_Core_Back_Config} config
 * @param {TeqFw_Web_Source_Installer_Back_Act_Create} actCreate
 *
 * @namespace TeqFw_Web_Source_Installer_Back_Plugin_Init
 */
export default function Factory(
    {
        TeqFw_Web_Source_Installer_Back_Defaults$: DEF,
        TeqFw_Core_Back_Config$: config,
        TeqFw_Web_Source_Installer_Back_Act_Create$: actCreate,
    }
) {

    return async function act() {
        /** @type {TeqFw_Core_Back_Plugin_Dto_Config_Local.Dto} */
        const cfgCore = config.getLocal(DEF.MOD_CORE.SHARED.NAME);
        const force = Boolean(cfgCore.devMode);
        // create archive with sources if not exists
        await actCreate.act({force});
    };
}
