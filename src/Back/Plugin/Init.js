/**
 * The factory to create the plugin initialization function.
 *
 * @namespace TeqFw_Web_Source_Installer_Back_Plugin_Init
 * @param {TeqFw_Web_Source_Installer_Back_Act_Create} actCreate
 */
export default function Factory(
    {
        TeqFw_Web_Source_Installer_Back_Act_Create$: actCreate,
    }
) {

    return async function act() {
        // create archive with sources if not exists
        await actCreate.act();
    };
}
