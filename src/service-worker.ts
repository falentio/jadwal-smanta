import { version, build } from "$service-worker"

const CACHE = version + "-cache"

const cacheBuildFiles = async (files: string[]) => {
	const cache = await caches.open(CACHE)
	await cache.addAll(files)
}

const deleteOldCaches = async () => {
	const keys = caches.keys()
	for (const k of keys) {
		if (k === CACHE) {
			continue;
		}
		await caches.delete(k);
	}
}

const getResponse = async (req: Request) => {
	const cache = await caches.open(CACHE);
	const fromCache = await caches.match(req, { ignoreSearch: true });
	if (fromCache) {
		return fromCache;
	}
	console.debug(`caching ${req.url.pathname}`)
	const res = await fetch(req)
	await cache.put(req, res.clone())
	return res
}

self.addEventListener("install", e => {
	console.debug("service worker installed")
	console.debug("caching build files", build)
	const p = cacheBuildFiles(build)
	e.waitUntil(p) 
})

self.addEventListener("activate", e => {
	const p = deleteOldCaches()
	e.waitUntil(p)
})

self.addEventListener("fetch", e => {
	const res = getResponse(e.request)
	e.waitUntil(res)
	e.repondWith(res)
})
