function startEngine(config) {
	config = Object.assign({
		autoSelect: false,
		infinite: false,
		rowsL: 0,
		colsL: 0
	}, config);

	let r = createTable(config);

	r.dataset.infinite = config.infinite;
	r.dataset.autoSelect = config.autoSelect;
	r.dataset.rowsL = config.rowsL;
	r.dataset.colsL = config.colsL;

	if (config.autoSelect) {
		r.dataset.row = config.rowsL;
		r.dataset.col = config.colsL;
		newCellSelected(r, r.dataset.row, r.dataset.col);
	}

	return r;
}

function createTable(config) {
	config = Object.assign({
		rows: 1,
		cols: 1,
		rowsL: 0,
		colsL: 0
	}, config);

	if (config.rows <= 0 || config.cols <= 0) {
		throw new Error('Debe ser mayor a cero cada dimension');
	}

	let r = '';
	for (let i = 0; i < config.rows + (config.rowsL * 2); i++) {
		r += '<tr>';
		for (let j = 0; j < config.cols + (config.colsL * 2); j++) {
			let limite =
				(i < config.rowsL || i >= (config.rows + config.rowsL))
				||
				(j < config.colsL || j >= (config.cols + config.colsL))
					? 'limit' : 'normal';
			r += `<td id="cell${i}-${j}" class="${limite}">${i}-${j}</td>`;
		}
		r += '</tr>';
	}

	let table = document.createElement('table');
	table.innerHTML = r;
	table.dataset.rows = config.rows;
	table.dataset.cols = config.cols;

	return table;
}

function newCellSelected(table, row, col) {
	clearCellSelected(table);
	setCell(table, row, col);
}

function clearCellSelected(table) {
	const row = table.dataset.row;
	const col = table.dataset.col;

	if (validateCell(table, row, col) === 1) {
		const celdaOld = table.querySelector(`#cell${row}-${col}`);
		celdaOld.classList.remove('selected');
	}
}

function setCell(table, row, col) {
	if (validateCell(table, row, col) === 1) {
		const cell = table.querySelector(`#cell${row}-${col}`);
		cell.classList.add('selected');
		// console.log('dsa', row, col,cell);
		table.dataset.row = row;
		table.dataset.col = col;
	} else {
		throw new Error('Error, invalid cell');
	}

}

/**
 * 1 valid
 * 0 invalid by limit
 * -1 invalid by range
 *
 * @param table
 * @param row
 * @param col
 * @returns {boolean}
 */
function validateCell(table, row, col) {
	let cell = table.querySelector(`#cell${row}-${col}`);
	let r = 1;

	if (!cell) {
		r = -1;
	} else if (cell.classList.contains('limit')) {
		r = 0;
	}

	return r;
}

/**
 * relative movement
 *
 * @param table
 * @param row
 * @param col
 */
function moveToCell(table, row, col) {
	const rowOrigin = +table.dataset.row;
	const colOrigin = +table.dataset.col;
	const rows = +table.dataset.rows;
	const rowsL = +table.dataset.rowsL;
	const cols = +table.dataset.cols;
	const colsL = +table.dataset.colsL;
	const infinite = JSON.parse(table.dataset.infinite);

	if (rowOrigin === null || colOrigin === null) {
		throw new Error('Error, without game saved!');
	}

	let rowDest = rowOrigin + row;
	let colDest = colOrigin + col;

	const cellValidated = validateCell(table, rowDest, colDest);

	if (cellValidated === 1) {
		// normal
		newCellSelected(table, rowDest, colDest);
		table.dataset.row = rowDest;
		table.dataset.col = colDest;
	} else {
		//limit - infinit mechanics

		if (infinite) {
			if (rowDest >= rowsL + rows) {
				// down
				rowDest = rowsL;
			} else if (rowDest < rowsL) {
				// top
				rowDest = rowsL + rows -1;
			} else if (colDest >= colsL + cols) {
				// right
				colDest = colsL;
			} else {
				// left
				colDest = colsL + cols -1;
			}

			newCellSelected(table, rowDest, colDest);
			table.dataset.row = rowDest;
			table.dataset.col = colDest;
		}

	}
}

function moveToLeft(table) {
	console.debug('moveToLeft');
	moveToCell(table, 0, -1);
}

function moveToRight() {
	console.debug('moveToRight');
	moveToCell(table, 0, 1);
}

function moveToUp(table) {
	console.debug('moveToUp');
	moveToCell(table, -1, 0);
}

function moveToDown(table) {
	console.debug('moveToDown');
	moveToCell(table, 1, 0);
}
