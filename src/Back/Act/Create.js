/**
 * Create the archive with all sources (JS & web) on the disk.
 */
// MODULE'S IMPORT
import {join} from 'node:path';
import {createWriteStream, existsSync, unlinkSync} from 'node:fs';
import archiver from 'archiver';

/**
 * @implements TeqFw_Core_Shared_Api_Act
 */
export default class TeqFw_Web_Source_Installer_Back_Act_Create {
    /**
     * @param {TeqFw_Web_Source_Installer_Back_Defaults} DEF
     * @param {TeqFw_Core_Shared_Api_Logger} logger -  instance
     * @param {TeqFw_Web_Source_Installer_Shared_Util} util
     * @param {TeqFw_Core_Back_Config} config
     * @param {TeqFw_Core_Back_Api_Plugin_Registry} registry
     * @param {TeqFw_Core_Back_Util.scanRecursively|function} scanRecursively
     */
    constructor(
        {
            TeqFw_Web_Source_Installer_Back_Defaults$: DEF,
            TeqFw_Core_Shared_Api_Logger$$: logger,
            TeqFw_Web_Source_Installer_Shared_Util$: util,
            TeqFw_Core_Back_Config$: config,
            TeqFw_Core_Back_Api_Plugin_Registry$: registry,
            ['TeqFw_Core_Back_Util#scanRecursively']: scanRecursively,
        }
    ) {
        // VARS
        const ZIP = join(config.getPathToRoot(), DEF.FILE_SW_CACHE_ZIP);

        // FUNCS
        /**
         * Mark items from `urls` as 'null' if items match to the wildcard patterns from `excludes`.
         * @param {string[]} urls
         * @param {string[]} excludes
         */
        function markExcludes(urls, excludes) {
            const length = urls.length;
            for (let i = 0; i < length; i++)
                for (const one of excludes)
                    if (util.matchWildcardPattern(urls[i], one)) {
                        urls[i] = undefined;
                        break;
                    }
        }

        /**
         * Initialize the archiver to create ZIP file.
         * @return {Archiver}
         */
        function openArchive() {
            const archive = archiver('zip', {zlib: {level: 9}});
            archive.on('error', (err) => {
                throw err;
            });
            // Pipe archive data to the file
            logger.info(`Create the new archive: ${ZIP}`);
            const output = createWriteStream(ZIP);
            output.on('close', () => {
                logger.info(`The size of the archive: ${archive.pointer()} bytes.`);
            });
            archive.pipe(output);
            return archive;
        }

        /**
         * This function scans the filesystem recursively, replaces filesystem parts with URL parts, and then
         * adds files to a zip archive. It also excludes specified URLs from processing.
         *
         * @param {Archiver} zip - The zip archiver instance.
         * @param {string} path - The path to the root folder to scan.
         * @param {string} replace - The replacement for the path in the URL.
         * @param {string[]} excludes - URLs to exclude from processing.
         * @return {number} - The number of files added to the zip.
         */
        function readFiles(zip, path, replace, excludes) {
            let res = 0;
            if (existsSync(path)) {
                const files = scanRecursively(path);
                const urls = files.map(entry => entry.replace(path, replace));
                markExcludes(urls, excludes);
                for (let i = 0; i < files.length; i++)
                    if (urls[i]) zip.file(files[i], {name: urls[i]}) && res++;
            }
            return res;
        }

        // MAIN
        /**
         * @param {boolean} [force] - remove the archive file if exists
         * @return {Promise<void>}
         */
        this.act = async function ({force} = {}) {
            // VARS
            let total = 0;

            // MAIN
            logger.info(`Start the archiving of the sources into '${ZIP}'.`);
            if (force && existsSync(ZIP)) {
                unlinkSync(ZIP);
                logger.info(`The archive '${ZIP}' is removed.`);
            }
            const exist = existsSync(ZIP);
            if (!exist) {
                const zip = openArchive();
                const appName = registry.getAppName();
                const plugins = registry.items();
                for (const plugin of plugins) {
                    /** @type {TeqFw_Web_Source_Installer_Back_Plugin_Dto_Desc.Dto} */
                    const descOwn = plugin.teqfw[DEF.SHARED.NAME];
                    const excludes = descOwn?.excludes ?? [];
                    /** @type {TeqFw_Core_Back_Plugin_Dto_Desc_Di.Dto} */
                    const descDi = plugin.teqfw[DEF.MOD_CORE.SHARED.NAME_DI];
                    const autoload = descDi.autoload;
                    let count = 0;
                    // read all files from `./Front/` & `./Shared/` folders of the plugin's `./src/`
                    const src = join(plugin.path, autoload.path);
                    const urlSrc = `./${DEF.MOD_WEB.SHARED.SPACE_SRC}/${plugin.name}`;
                    // scan './Front/'
                    const pathFront = join(src, DEF.MOD_WEB.SHARED.DIR_SRC_FRONT);
                    const urlFront = `${urlSrc}/${DEF.MOD_WEB.SHARED.DIR_SRC_FRONT}`;
                    count += readFiles(zip, pathFront, urlFront, excludes);
                    // scan './Shared/'
                    const pathShared = join(src, DEF.MOD_WEB.SHARED.DIR_SRC_SHARED);
                    const urlShared = `${urlSrc}/${DEF.MOD_WEB.SHARED.DIR_SRC_SHARED}`;
                    count += readFiles(zip, pathShared, urlShared, excludes);
                    // read all files from the `./web/` folder of plugins
                    const pathWeb = join(plugin.path, DEF.MOD_WEB.FS_STATIC_ROOT);
                    const urlWeb = (plugin.name === appName)
                        ? '.'   // the application's '.../web/' is mapped as root URL
                        : `./${DEF.MOD_WEB.SHARED.SPACE_WEB}/${plugin.name}`;
                    count += readFiles(zip, pathWeb, urlWeb, excludes);
                    if (count > 0) {
                        logger.info(`${count} files are archived for plugin '${plugin.name}'.`);
                        total += count;
                    }
                }
                logger.info(`Total '${total}' files are collected into the archive.`);
                // Finalize the archive (write the footer)
                await zip.finalize();
            } else {
                logger.info(`The archive '${ZIP}' exists, so the creation of a new one will be skipped.`);
            }
        };
    }

}