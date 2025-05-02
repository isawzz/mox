
function unfoldCartesianProduct(dicts) {
	if (!dicts.length) return [];

	const keys = Object.keys(dicts[0]);
	const sets = Object.fromEntries(keys.map(k => [k, new Set()]));

	dicts.forEach(obj => {
		keys.forEach(k => sets[k].add(obj[k]));
	});

	return keys.map(k => Array.from(sets[k]));
}

function foldCartesianProduct(keys, valuesLists) {
	const result = [];

	function helper(index, current) {
		if (index === keys.length) {
			result.push(Object.fromEntries(keys.map((k, i) => [k, current[i]])));
			return;
		}
		for (const value of valuesLists[index]) {
			helper(index + 1, [...current, value]);
		}
	}

	helper(0, []);
	return result;
}
function cartesianContract(dictList) {
	if (!dictList.length) return [[], []];

	const keys = Object.keys(dictList[0]);
	const valuesLists = keys.map(() => []);

	for (const obj of dictList) {
		keys.forEach((key, i) => {
			if (!valuesLists[i].includes(obj[key])) {
				valuesLists[i].push(obj[key]);
			}
		});
	}

	return [keys, valuesLists];
}

function cartesianExpand(keys, valuesLists) {
	const result = [];

	function helper(index, current) {
		if (index === keys.length) {
			result.push(Object.fromEntries(current));
			return;
		}
		for (const value of valuesLists[index]) {
			helper(index + 1, [...current, [keys[index], value]]);
		}
	}

	helper(0, []);
	return result;
}

// --- Test Function ---
function testCartesianFunctions() {
	const data = [
		{ x: "a", y: 1 },
		{ x: "a", y: 2 },
		{ x: "b", y: 1 },
		{ x: "b", y: 2 }
	];

	const [keys, compact] = cartesianContract(data);
	const expanded = cartesianExpand(keys, compact);

	return {
		compact: [keys, compact],
		expanded: expanded
	};
}
function getBackendUrl(isScript = null) {
	if (nundef(DA.backendUrl)) {
		let loc = window.location.href;
		if (VERBOSE) console.log('href', loc);
		let sessionType = DA.sessionType =
			loc.includes('moxito.online/at0') ? 'at0' :
				loc.includes('moxito.online') ? 'fastcomet' :
					loc.includes('vidulus') ? 'vps' :
						loc.includes('telecave') ? 'telecave' : loc.includes('8080') ? 'php'
							: loc.includes(':40') ? 'nodejs'
								: loc.includes(':60') ? 'flask' : 'live';
		if (VERBOSE) console.log('sessionType', sessionType);
		let backendUrl = DA.backendUrl = sessionType == 'live' ? 'http://localhost:5000' : 'at0' ? 'https://moxito.online/at0' : 'fastcomet' ? 'https://moxito.online' : isScript || sessionType == 'php' ? 'http://localhost:8080/mox' : '..';
		if (VERBOSE) console.log('backendUrl', backendUrl);
	}
	return DA.backendUrl;
}
function stringBetween(sFull, sStart, sEnd) {
	return stringBefore(stringAfter(sFull, sStart), isdef(sEnd) ? sEnd : sStart);
}
function stringBetweenLast(sFull, sStart, sEnd) {
	let s1 = stringBeforeLast(sFull, isdef(sEnd) ? sEnd : sStart);
	return stringAfterLast(s1, sStart);
}

