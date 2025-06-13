
function arrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function isList(arr) { return Array.isArray(arr); }
function isString(param) { return typeof param == 'string'; }
function isdef(x) { return x !== null && x !== undefined && x !== 'undefined'; }
function last(arr) {
	return arr.length > 0 ? arr[arr.length - 1] : null;
}
function loadSuperdiAssets() {
	let [di, byType, byCat, allImages] = [M.superdi, {}, {}, {}];
	for (const k in di) {
		let o = di[k];
		for (const cat of o.cats) lookupAddIfToList(byCat, [cat], k);
		if (isdef(o.img)) {
			let fname = stringAfterLast(o.img, '/')
			allImages[k] = { fname, path: o.img, key: k };
		}
		if (isdef(o.photo)) {
			let fname = stringAfterLast(o.photo, '/')
			allImages[k + '_photo'] = { fname, path: o.photo, key: k };
		}
	}
	for (const k in M.superdi) { M.superdi[k].key = k; }
	M.allImages = allImages;
	M.byCat = byCat;
	M.categories = Object.keys(byCat); M.categories.sort();
	for (const k in M.superdi) {
		let o = M.superdi[k];
		for (const fk in Families) {
			if (isdef(o[fk])) { lookupAddIfToList(byType, [fk], k); }
		}
	}
	M.byType = byType;
}
function loadUsers() {
	console.log('hier werden users updated was immer zu tun ist!!!')
}
function lookup(dict, keys) {
	if (nundef(dict)) return null;
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (k === undefined) break;
		let e = d[k];
		if (e === undefined || e === null) return null;
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}
function lookupAddIfToList(dict, keys, val) {
	let lst = lookup(dict, keys);
	if (isList(lst) && lst.includes(val)) return;
	return lookupAddToList(dict, keys, val);
}
function lookupAddToList(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (i == ilast) {
			if (nundef(k)) {
				console.assert(false, 'lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else if (isList(d[k])) {
				d[k].push(val);
			} else {
				d[k] = [val];
			}
			return d[k];
		}
		if (nundef(k)) continue;
		if (d[k] === undefined) d[k] = {};
		d = d[k];
		i += 1;
	}
	return d;
}
async function mGetFilenames(dir) {
	let res = await mPhpPost('all', { action: 'dir', dir });
	return res.dir.filter(x => x != '.' && x != '..');
}
async function mPhpPost(cmd, o, projectName, verbose = false, jsonResult = true) {
	let server = getServer('php');
	if (isdef(o.path) && (o.path.startsWith('zdata') || o.path.startsWith('y'))) o.path = '../../' + o.path;
	if (verbose) console.log('to php:', server + `${projectName}/php/${cmd}.php`, o);
	let res = await fetch(server + `${projectName}/php/${cmd}.php`,
		{
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(o),
		}
	);
	let text;
	try {
		text = await res.text();
		if (!jsonResult) {
			return text;
		}
		let obj = JSON.parse(text);
		if (verbose) console.log('from php:\n', obj);
		let mkeys = ["config", "superdi", "users", "details"];
		for (const k of mkeys) {
			if (isdef(obj[k])) {
				M[k] = obj[k];
				if (k == "superdi") {
					loadSuperdiAssets();
				} else if (k == "users") {
					loadUsers();
				}
			}
		}
		return obj;
	} catch (e) {
		return isString(text) ? text : e;
	}
}
function nundef(x) { return x === null || x === undefined || x === 'undefined'; }
function startsWith(s, sSub) {
	return s.substring(0, sSub.length) == sSub;
}
function stringAfterLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return arrLast(parts);
}
function stringBefore(sFull, sSub) {
	let idx = sFull.indexOf(sSub);
	if (idx < 0) return sFull;
	return sFull.substring(0, idx);
}

