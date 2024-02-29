/**
 * Module with functions to cache the frontend files during the service worker installation.
 *
 * To use the `loadZipToCache` function include this es-module:
 *
 * import {loadZipToCache} from './web/@teqfw/web-source-installer/js/sw/install.js';
 *
 * then use it on install event:
 *
 * function onInstall(evt) {
 *     const cacheStaticFiles = async function () {
 *         const [firstWindow] = await self.clients.matchAll({includeUncontrolled: true});
 *         await loadZipToCache(CACHE_STATIC, firstWindow, log);
 *     };
 *     evt.waitUntil(cacheStaticFiles());
 * }
 *
 */
// MODULE'S IMPORTS
import {unzip} from '../../../../../src/unzipit/unzipit.module.js'; // see `@teqfw/web.statics` in `./teqfw.json`

// MODULE'S VARS
const MSG = {PROGRESS: 'PROGRESS'};
const URL_SOURCES = '/web-source-installer/'; // Retrieve the archive with sources for installation into the SW cache

// MODULE'S FUNCS
/**
 * Handmade function for the most used MIME types.
 * @param {string} name file name or full path to the file (/path/to/file.htm)
 * @return {string} MIME time (text/html)
 */
export function getMimeByName(name) {
    const pos = name.lastIndexOf('.');
    const ext = name.substring(pos + 1).toLowerCase().trim();
    if ((ext === 'js') || (ext === 'mjs')) return 'application/javascript';
    else if (ext === 'css') return 'text/css';
    else if (ext === 'ico') return 'image/x-icon';
    else if (ext === 'json') return 'application/json';
    else if (ext === 'md') return 'text/markdown';
    else if (ext === 'mp3') return 'audio/mpeg';
    else if (ext === 'wav') return 'audio/wav';
    else if (ext === 'webmanifest') return 'application/manifest+json';
    else if (ext === 'woff2') return 'font/woff2';
    else if ((ext === 'gif') || (ext === 'png')) return `image/${ext}`;
    else if ((ext === 'htm') || (ext === 'html')) return 'text/html';
    else if ((ext === 'jpeg') || (ext === 'jpg') || (ext === 'jpe')) return 'image/jpg';
    else return 'unknown';
}

/**
 * Load zipped sources and cache it.
 * @param {string} cacheName
 * @param {WindowClient} window
 * @param {function(string)} log
 * @return {Promise<void>}
 */
export async function loadZipToCache(cacheName, window, log) {
    log(`Loading zipped sources from '${URL_SOURCES}'.`);
    const start = new Date();
    const zip = await unzip(URL_SOURCES);
    const finish = new Date();
    log(`Zipped sources are loaded in '${finish.getTime() - start.getTime()}' ms.`);
    const entries = zip?.entries;
    if (entries) {
        const cacheStat = await caches.open(cacheName);
        let processed = 0;
        const keys = Object.keys(entries);
        const total = keys.length;
        log(`Total sources in the zip: ${keys.length}.`);
        for (const one of Object.values(entries)) {
            const url = one.name;
            const type = getMimeByName(url);
            if (type === 'unknown') log(url);
            /** @type {Blob} */
            const blob = await one.blob(type);
            const headers = new Headers();
            headers.set('Content-Length', `${blob.size}`);
            headers.set('Content-Type', type);
            headers.set('Cache-Control', 'max-age=0, no-cache, no-store, must-revalidate'); // don't store in the browser cache
            const resp = new Response(blob, {status: 200, headers});
            await cacheStat.put(url, resp);
            const progress = Math.round(processed++ / total * 100) / 100;
            window.postMessage({type: MSG.PROGRESS, progress});
        }
    }
}