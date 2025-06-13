
function defaultGameFunc() {
	function setup(table) { let fen = { players: table.players, turn: [table.owner] }; delete table.players; }
	function present(dParent, table) { mClear('dMain'); } //showMessage(`BINGO!!! ${table.friendly} view ${name}: NOT IMPLEMENTED!!!!!`,1000); } 
	async function activate(table) { console.log('activate for', getUname()) }
	async function stats(table) { console.log('stats for', getUname()) }
	function checkGameover(table) { return false; }
	async function hybridMove(table) { console.log('hybrid moves for', getUname()) }
	async function botMove(table) { console.log('robot moves for', getUname()) }
	function prepLayout(table) { presentStandardRoundTable(table); }
	async function stepComplete(table, o) { console.log(`integrate if step complete for ${table.friendly}`); }
	return { stats, prepLayout, setup, activate, checkGameover, present, hybridMove, botMove, stepComplete };
}

function button96() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
		}
		fen.cards = [1, 2, 3];
		fen.deck = range(4, table.options.numCards);
		table.plorder = jsCopy(table.playerNames);
		table.turn = jsCopy(table.playerNames);
		return fen;
	}
	function prepLayout(table) { presentStandardRoundTable(table); }
	async function stats(table) {
		let [me, players] = [getUname(), table.players];
		let style = { patop: 8, mabottom: 20, wmin: 80, bg: 'beige', fg: 'contrast' };
		let player_stat_items = uiTypePlayerStats(table, me, 'dStats', 'rowflex', style)
		for (const plname in players) {
			let pl = players[plname];
			let item = player_stat_items[plname];
			if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
			let d = iDiv(item); mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);
			playerStatCount('star', pl.score, d); //, {}, {id:`stat_${plname}_score`});
		}
	}
	function present(table) {
		let fen = table.fen;
		mStyle('dTable', { padding: 25, w: 400, h: 400 });
		let d = mDom('dTable', { gap: 10, padding: 0 }); mCenterFlex(d);
		let items = [];
		for (const card of fen.cards) {
			let item = cNumber(card);
			mAppend(d, iDiv(item));
			items.push(item);
		}
		return items;
	}
	async function activate(table, items) {
		await showInstructionStandard(table, 'must click a card'); //browser tab and instruction if any
		if (!isMyTurn(table)) { return; }
		for (const item of items) {
			let d = iDiv(item);
			mStyle(d, { cursor: 'pointer' });
			d.onclick = ev => onclickCard(table, item, items);
		}
		if (isEmpty(table.fen.cards)) return gameoverScore(table);
		if (amIHuman(table) && table.options.gamemode == 'multi') return;
		let name = amIHuman(table) && table.options.gamemode == 'solo' ? someOtherPlayerName(table) : getUname();
		if (nundef(name)) return;
		await botMove(name, table, items);
	}
	async function botMove(name, table, items) {
		let ms = rChoose(range(2000, 5000));
		TO.bot = setTimeout(async () => {
			let item = rChoose(items);
			toggleItemSelection(item);
			TO.bot1 = setTimeout(async () => await evalMove(name, table, item.key), 500);
		}, rNumber(ms, ms + 2000));
	}
	async function onclickCard(table, item, items) {
		toggleItemSelection(item);
		try { await mSleep(200); } catch (err) { return; }
		await evalMove(getUname(), table, item.key);
	}
	async function evalMove(name, table, key) {
		clearEvents();
		mShield('dTable', { bg: 'transparent' });
		let id = table.id;
		let step = table.step;
		let best = arrMinMax(table.fen.cards).min;
		let succeed = key == best;
		if (succeed) {
			table.players[name].score += 1;
			let fen = table.fen;
			let newCards = deckDeal(fen.deck, 1);
			if (newCards.length > 0) arrReplace1(fen.cards, key, newCards[0]); else removeInPlace(fen.cards, key);
		} else {
			table.players[name].score -= 1;
		}
		lookupAddToList(table, ['moves'], { step, name, move: key, change: succeed ? '+1' : '-1', score: table.players[name].score });
		let o = { id, name, step, table };
		if (succeed) o.stepIfValid = step + 1;
		let res = await mPostRoute('table', o);
	}
	return { prepLayout, setup, present, stats, activate };
}

function setgame() {
	function setup(table) {
		let fen = {};
		for (const name in table.players) {
			let pl = table.players[name];
			pl.score = 0;
		}
		fen.deck = setCreateDeck();
		fen.cards = deckDeal(fen.deck, table.options.numCards);
		table.plorder = jsCopy(table.playerNames);
		table.turn = jsCopy(table.playerNames);
		return fen;
	}
	function prepLayout(table) { presentStandardRoundTable(table); }
	async function stats(table) {
		let [me, players] = [UGetName(), table.players];
		let style = { patop: 8, mabottom: 20, wmin: 80, hmin:90, bg: 'beige', fg: 'contrast' }; 
		//mDom('dStats',style); return;
		let player_stat_items = await uiTypePlayerStats(table, me, 'dStats', 'rowflex', style);
		return;
		for (const plname in players) {
			let pl = players[plname];
			let item = player_stat_items[plname];
			if (pl.playmode == 'bot') { mStyle(item.img, { rounding: 0 }); }
			let d = iDiv(item); mCenterFlex(d); mLinebreak(d); mIfNotRelative(d);
			playerStatCount('star', pl.score, d); //, {}, {id:`stat_${plname}_score`});
		}
	}
	function present(table) {
		const colors = { red: '#e74c3c', green: '#27ae60', purple: 'indigo' };
		setLoadPatterns('dPage', colors);
		let fen = table.fen;
		mStyle('dTable', { padding: 50, wmin: 500 });
		let d = mDom('dTable', { gap: 10, padding: 0 }); mCenterFlex(d);
		let rows = Math.ceil(fen.cards.length / 3);
		let gap = 10;
		let sz = rows <= 4 ? 80 : rows == 5 ? 70 : rows == 6 ? 68 : rows == 7 ? 65 : rows == 8 ? 62 : 60;
		let dBoard = mGrid(rows, 3, d, { gap });
		let items = [];
		for (const c of fen.cards) {
			let dc = setDrawCard(c, dBoard, colors, sz);
			let item = mItem({ div: dc }, { key: c });
			items.push(item);
		}
		let oset = setFindOneSet(items); console.log('=>', oset ? oset.keys[0] : 'NO SET');
		return items;
	}
	async function activate(table, items) {
		if (!isMyTurn(table)) { return; }
		for (const item of items) {
			let d = iDiv(item);
			mStyle(d, { cursor: 'pointer' });
			d.onclick = ev => onclickCard(table, item, items);
		}
		let dParent = mBy('dTable').parentNode; mIfNotRelative(dParent);
		let bNoSet = mButton('No Set', () => onclickNoSet(getUname(), table, items), dParent, {}, 'button', 'bNoSet');
		mPos(bNoSet, window.innerWidth / 2 + 180, 110);
		if (amIHuman(table) && getGameOption('use_level') == 'yes' && getPlayerProp('level') <= 2) {
			let bHint = mButton('Hint', () => onclickHint(table, items), dParent, {}, 'button', 'bHint');
			mPos(bHint, window.innerWidth / 2 - 200 - 80, 110);
		}
		if (isEmpty(table.fen.cards)) return gameoverScore(table);
		if (amIHuman(table) && table.options.gamemode == 'multi') return;
		let name = amIHuman(table) && table.options.gamemode == 'solo' ? someOtherPlayerName(table) : getUname();
		if (nundef(name)) return;
		await botMove(name, table, items);
	}
	async function botMove(name, table, items) {
		let oset = setFindOneSet(items);
		let avg = calcBotLevel(table);
		let ms = avg ? 18000 - avg * 2000 : 1000;
		if (!oset) ms += 2000;
		TO.bot = setTimeout(async () => {
			if (!oset) await onclickNoSet(name, table, items);
			else {
				for (const item of oset.items) toggleItemSelection(item);
				TO.bot1 = setTimeout(async () => await evalMove(name, table, oset.keys), 1000);
			}
		}, rNumber(ms, ms + 2000));
	}
	function setCheckIfSet(keys) {
		let arr = makeArrayWithParts(keys);
		let isSet = arr.every(x => arrAllSameOrDifferent(x));
		return isSet;
	}
	function setCreateDeck() {
		let deck = [];
		['red', 'purple', 'green'].forEach(color => {
			['diamond', 'squiggle', 'oval'].forEach(shape => {
				[1, 2, 3].forEach(num => {
					['solid', 'striped', 'open'].forEach(fill => {
						deck.push(`${color}_${shape}_${num}_${fill}`);
					});
				});
			});
		});
		arrShuffle(deck);
		return deck;
	}
	function setDrawCard(card, dParent, colors, sz = 100) {
		const paths = {
			diamond: "M25 0 L50 50 L25 100 L0 50 Z",
			squiggle: "M38.4,63.4c2,16.1,11,19.9,10.6,28.3c1,9.2-21.1,12.2-33.4,3.8s-15.8-21.2-9.3-38c3.7-7.5,4.9-14,4.8-20 c0-16.1-11-19.9-10.6-28.3C1,0.1,21.6-3,33.9,5.5s15.8,21.2,9.3,38C40.4,50.6,38.5,57.4,38.4,63.4z",
			oval: "M25,95C14.2,95,5.5,85.2,5.5,80V20C5.5,13.2,14.2,5.2,25,5.2S44.5,13.2,44.5,20v60 C44.5,85.2,35.8,95,25,95z"
		}
		let [color, shape, num, fill] = card.split('_');
		var attr = {
			d: paths[shape],
			fill: fill == 'striped' ? `url(#striped-${color})` : fill == 'solid' ? colors[color] : 'none',
			stroke: colors[color],
			'stroke-width': 2,
		};
		let h = sz, w = sz / .65;
		let ws = w / 4;
		let hs = 2 * ws;
		let d0 = mDom(dParent, { display: 'flex', w, h, bg: 'white', rounding: 10 });
		mStyle(d0, { justify: 'center', 'align-items': 'center', gap: 6 })
		let shapeSvg = `<svg viewbox="-2 -2 54 104">` + makeSVG("path", attr) + '</svg>';
		for (const i of range(num)) {
			let d1 = mDom(d0, { h: hs, w: ws }, { html: shapeSvg });
		}
		return d0;
	}
	function setFindAllSets(items) {
		let result = [];
		for (var x = 0; x < items.length; x++) {
			for (var y = x + 1; y < items.length; y++) {
				for (var z = y + 1; z < items.length; z++) {
					assertion(items[x] != items[y], `WTF!?!?!?! ${items[x].key} ${items[y].key}`)
					let list = [items[x], items[y], items[z]];
					let keys = list.map(x => x.key);
					if (setCheckIfSet(keys)) result.push(list);
				}
			}
		}
		if (isEmpty(result)) console.log('no set!')
		return result;
	}
	function setFindOneSet(items) {
		for (var x = 0; x < items.length; x++) {
			for (var y = x + 1; y < items.length; y++) {
				for (var z = y + 1; z < items.length; z++) {
					assertion(items[x] != items[y], `WTF!?!?!?! ${items[x].key} ${items[y].key}`)
					let list = [items[x], items[y], items[z]];
					let keys = list.map(x => x.key);
					if (setCheckIfSet(keys)) return { items: list, keys };
				}
			}
		}
		return null;
	}
	function setLoadPatterns(dParent, colors) {
		dParent = toElem(dParent);
		let id = "setpatterns";
		if (isdef(mBy(id))) { return; }
		let html = `
      <svg id="setpatterns" width="0" height="0">
        <!--  Define the patterns for the different fill colors  -->
        <pattern id="striped-red" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style="stroke:${colors.red}; stroke-width:1" />
        </pattern>
        <pattern id="striped-green" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style="stroke:${colors.green}; stroke-width:1" />
        </pattern>
        <pattern id="striped-purple" patternUnits="userSpaceOnUse" width="4" height="4">
          <path d="M-1,1 H5" style="stroke:${colors.purple}; stroke-width:1" />
        </pattern>
      </svg>
      `;
		let el = mCreateFrom(html);
		mAppend(dParent, el)
	}
	async function onclickCard(table, item, items) {
		toggleItemSelection(item);
		let selitems = items.filter(x => x.isSelected);
		let [keys, m] = [selitems.map(x => x.key), selitems.length];
		if (m == 3) {
			await evalMove(getUname(), table, keys);
		}
	}
	async function onclickHint(table, items) {
		let oset = setFindOneSet(items);
		let bHint = mBy('bHint');
		disableButton('bHint');
		if (!oset) {
			ANIM.button = scaleAnimation('bNoSet');
		} else {
			let item = rChoose(oset.items);
			await onclickCard(table, item, items);
		}
	}
	async function onclickNoSet(name, table, items) {
		clearEvents();
		mShield('dTable', { bg: 'transparent' });
		let id = table.id;
		let step = table.step;
		let oset = setFindOneSet(items);
		if (!oset) {
			table.players[name].score += 1;
			let fen = table.fen;
			let newCards = deckDeal(fen.deck, 1);
			if (!isEmpty(newCards)) fen.cards.push(newCards[0]); else return await gameoverScore(table);
		} else {
			table.players[name].score -= 1;
		}
		lookupAddToList(table, ['moves'], { step, name, move: ['noSet'], change: oset ? '-1' : '+1', score: table.players[name].score });
		let o = { id, name, step, table };
		if (!oset) o.stepIfValid = step + 1;
		let res = await mPostRoute('table', o); //console.log(res);
	}
	async function evalMove(name, table, keys) {
		clearEvents();
		mShield('dTable', { bg: 'transparent' });
		let id = table.id;
		let step = table.step;
		let isSet = setCheckIfSet(keys);
		if (isSet) {
			table.players[name].score += 1;
			let fen = table.fen;
			let toomany = Math.max(0, fen.cards.length - table.options.numCards);
			let need = Math.max(0, 3 - toomany);
			let newCards = deckDeal(fen.deck, need);
			for (let i = 0; i < 3; i++) if (i < newCards.length) arrReplace1(fen.cards, keys[i], newCards[i]); else removeInPlace(fen.cards, keys[i]);
		} else {
			table.players[name].score -= 1;
		}
		lookupAddToList(table, ['moves'], { step, name, move: keys, change: isSet ? '+1' : '-1', score: table.players[name].score });
		let o = { id, name, step, table };
		if (isSet) o.stepIfValid = step + 1;
		let res = await mPostRoute('table', o); //console.log(res);
	}
	return { prepLayout, setup, present, stats, activate, hasInstruction: false };
}

