/**
 * Create the archive with all sources on the disk.
 * @namespace TeqFw_Web_Source_Installer_Back_Cli_Archive
 */
// MODULE'S IMPORT

// MODULE'S VARS
const OPT_FORCE = 'force';

// MODULE'S FUNCS
/**
 * Factory to create CLI command.
 *
 * @param {TeqFw_Web_Source_Installer_Back_Defaults} DEF
 * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
 * @param {TeqFw_Core_Back_App} app
 * @param {TeqFw_Core_Shared_Util_Cast} cast
 * @param {TeqFw_Web_Source_Installer_Back_Act_Create} actCreate
 * @param {TeqFw_Core_Back_Api_Dto_Command.Factory} fCommand
 * @param {TeqFw_Core_Back_Api_Dto_Command_Option.Factory} fOpt
 *
 * @returns {TeqFw_Core_Back_Api_Dto_Command}
 * @memberOf TeqFw_Web_Source_Installer_Back_Cli_Archive
 */
export default function Factory(
    {
        TeqFw_Web_Source_Installer_Back_Defaults$: DEF,
        TeqFw_Core_Shared_Api_Logger$$: logger,
        TeqFw_Core_Back_App$: app,
        TeqFw_Core_Shared_Util_Cast$: cast,
        TeqFw_Web_Source_Installer_Back_Act_Create$: actCreate,
        'TeqFw_Core_Back_Api_Dto_Command.Factory$': fCommand,
        'TeqFw_Core_Back_Api_Dto_Command_Option.Factory$': fOpt,
    }
) {
    // FUNCS
    /**
     * Parse command line options and start server in requested mode.
     *
     * @param {Object} opts command options
     * @returns {Promise<void>}
     * @memberOf TeqFw_Web_Source_Installer_Back_Cli_Archive
     */
    const action = async function (opts) {
        try {
            const force = cast.boolean(opts[OPT_FORCE]);
            await actCreate.act({force});
        } catch (e) {
            logger.error(e);
        } finally {
            await app.stop(); // stop all plugins (close db connection if exists)
        }
    };

    // MAIN
    const res = fCommand.create();
    res.realm = DEF.CLI_PREFIX;
    res.name = 'archive';
    res.desc = 'create the installation archive';
    res.action = action;
    // add option --force
    const optForce = fOpt.create();
    optForce.flags = `-f, --${OPT_FORCE}`;
    optForce.description = `force the removal of the existing archive`;
    res.opts.push(optForce);
    return res;
}