/**
 * Web server handler for processing requests to load zipped sources to the front end.
 */
// MODULE'S IMPORT
import {constants as H2} from 'node:http2';
import {join} from 'node:path';

// MODULE'S VARS
const {
    HTTP2_METHOD_GET,
    HTTP2_METHOD_POST,
    HTTP_STATUS_OK,
} = H2;


// MODULE'S CLASSES
// noinspection JSClosureCompilerSyntax
/**
 * @implements TeqFw_Web_Back_Api_Dispatcher_IHandler
 */
export default class TeqFw_Web_Source_Installer_Back_Web_Handler {
    /**
     * @param {TeqFw_Web_Source_Installer_Back_Defaults} DEF
     * @param {TeqFw_Core_Back_Config} config
     */
    constructor(
        {
            TeqFw_Web_Source_Installer_Back_Defaults$: DEF,
            TeqFw_Core_Back_Config$: config,
        }
    ) {
        // VARS
        const ZIP = join(config.getPathToRoot(), DEF.FILE_SW_CACHE_ZIP);

        // FUNCS
        /**
         * Process HTTP request if not processed before.
         * @param {module:http.IncomingMessage|module:http2.Http2ServerRequest} req
         * @param {module:http.ServerResponse|module:http2.Http2ServerResponse} res
         * @memberOf TeqFw_Web_Source_Installer_Back_Web_Handler
         */
        async function process(req, res) {
            /** @type {Object} */
            const shares = res[DEF.MOD_WEB.HNDL_SHARE];
            if (!res.headersSent && !shares[DEF.MOD_WEB.SHARE_RES_STATUS]) {
                shares[DEF.MOD_WEB.SHARE_RES_FILE] = ZIP;
                shares[DEF.MOD_WEB.SHARE_RES_STATUS] = HTTP_STATUS_OK;
            }
        }

        // INSTANCE METHODS

        this.getProcessor = () => process;

        this.init = async function () { };

        this.canProcess = function ({method, address} = {}) {
            return (
                ((method === HTTP2_METHOD_GET) || (method === HTTP2_METHOD_POST))
                && (address?.space === DEF.SHARED.SPACE)
            );
        };
    }
}
