// https://www.chaijs.com/api/assert/

describe('Engine', function() {

	describe('createTable', function() {
		it('should create a simple table 1 x 1 with default', function() {
			const r = createTable();

			assert.lengthOf(r.querySelectorAll('.limit'), 0);
			assert.lengthOf(r.querySelectorAll('.normal'), 1);
			assert.isNotNull(r.querySelector('#cell0-0'));
			assert.equal(r.querySelector('#cell0-0').innerHTML, '0-0');
		});

		it('should throw an error by create a table with 0 x 0', function() {
			let r = {};

			assert.throws(()=>{
				r = createTable({rows: 0, cols: 0});
			});
		});

		it('should create a simple table 1 x 1', function() {
			const r = createTable({rows: 1, cols: 1, rowsL: 0, colsL: 0});

			assert.lengthOf(r.querySelectorAll('.limit'), 0);
			assert.lengthOf(r.querySelectorAll('.normal'), 1);
			assert.isNotNull(r.querySelector('#cell0-0'));
			assert.equal(r.querySelector('#cell0-0').innerHTML, '0-0');
		});

		it('should create a simple table 2 x 1', function() {
			const r = createTable({rows: 2, cols: 1, rowsL: 0, colsL: 0});

			assert.lengthOf(r.querySelectorAll('.limit'), 0);
			assert.lengthOf(r.querySelectorAll('.normal'), 2);
			assert.isNotNull(r.querySelector('#cell1-0.normal'));
			assert.equal(r.querySelector('#cell1-0.normal').innerHTML, '1-0');
		});

		it('should create a simple table 2 x 2', function() {
			const r = createTable({rows: 2, cols: 2, rowsL: 0, colsL: 0});

			assert.lengthOf(r.querySelectorAll('.limit'), 0);
			assert.lengthOf(r.querySelectorAll('.normal'), 4);
			assert.isNotNull(r.querySelector('#cell1-1.normal'));
			assert.equal(r.querySelector('#cell1-1.normal').innerHTML, '1-1');
		});

		it('should create a table 2 x 2 with limits 1', function() {
			const r = createTable({rows: 2, cols: 2, rowsL: 1, colsL: 0});

			assert.lengthOf(r.querySelectorAll('.limit'), 4);
			assert.lengthOf(r.querySelectorAll('.normal'), 4);
			assert.isNotNull(r.querySelector('#cell2-1.normal'));
			assert.equal(r.querySelector('#cell2-1.normal').innerHTML, '2-1');
			assert.isNotNull(r.querySelector('#cell3-1.limit'));
			assert.equal(r.querySelector('#cell3-1.limit').innerHTML, '3-1');
		});

		it('should create a table 2 x 2 with limits 1 x 1', function() {
			const r = createTable({rows: 2, cols: 2, rowsL: 1, colsL: 1});

			assert.lengthOf(r.querySelectorAll('.limit'), 12);
			assert.lengthOf(r.querySelectorAll('.normal'), 4);
			assert.isNotNull(r.querySelector('#cell2-2.normal'));
			assert.equal(r.querySelector('#cell2-2.normal').innerHTML, '2-2');
			assert.isNotNull(r.querySelector('#cell3-3.limit'));
			assert.equal(r.querySelector('#cell3-3.limit').innerHTML, '3-3');
		});

		it('should create a table 4 x 4 with limits 4 x 4', function() {
			const r = createTable({rows: 4, cols: 4, rowsL: 4, colsL: 4});

			assert.lengthOf(r.querySelectorAll('.limit'), 128);
			assert.lengthOf(r.querySelectorAll('.normal'), 16);
			assert.isNotNull(r.querySelector('#cell7-7.normal'));
			assert.equal(r.querySelector('#cell7-7.normal').innerHTML, '7-7');
			assert.isNotNull(r.querySelector('#cell11-11.limit'));
			assert.equal(r.querySelector('#cell11-11.limit').innerHTML, '11-11');
		});
	});

	describe('validateCell', function() {

		it('valid cell: 1', function() {
			const	r = createTable({rows: 1, cols: 1, rowsL: 0, colsL: 0});

			const b = validateCell(r, 0, 0);

			assert.equal(b, 1);
		});

		it('valid cell: 2', function() {
			const	r = createTable({rows: 10, cols: 10, rowsL: 0, colsL: 0});

			const b = validateCell(r, 9, 9);

			assert.equal(b, 1);
		});

		it('invalid cell: 1 - invalid range', function() {
			const	r = createTable({rows: 1, cols: 1, rowsL: 0, colsL: 0});

			let b = validateCell(r, 1, 1);
			assert.equal(b, -1);
			
			b = validateCell(r, 0, 1);
			assert.equal(b, -1);

			b = validateCell(r, 1, 0);
			assert.equal(b, -1);
		});

		it('invalid cell: 2 - limit', function() {
			const	r = createTable({rows: 2, cols: 2, rowsL: 2, colsL: 2});

			let b = validateCell(r, 2, 2);
			assert.equal(b, 1);

			b = validateCell(r, 1, 1);
			assert.equal(b, 0);

			b = validateCell(r, 5, 5);
			assert.equal(b, 0);

			b = validateCell(r, 5, 5);
			assert.equal(b, 0);
		});

	});

	describe('setCell', function() {

		it('should set a cell 1', function() {
			const	table = createTable({rows: 1, cols: 1});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);

			setCell(table, 0, 0);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
		});

		it('should set a cell 2x2', function() {
			const	table = createTable({rows: 2, cols: 2});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);

			setCell(table, 1, 1);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
		});

		it('should throw an error by range invalid', function() {
			const	table = createTable({rows: 1, cols: 1});

			assert.throws(()=>{
				setCell(table, 10, 0);
			});
		});
		
	});

	describe('clearCellSelected', function() {

		it('should clear a cell 1', function() {
			const	table = startEngine({rows: 1, cols: 1});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);

			setCell(table, 0, 0);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);

			clearCellSelected(table);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
		});

		it('should clear a cell 2', function() {
			const	table = startEngine({rows: 2, cols: 2});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);

			setCell(table, 1, 1);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);

			clearCellSelected(table);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);
		});

		it('should do nothing by range invalid', function() {
			const	table = startEngine({rows: 1, cols: 1, autoSelect: true});

			assert.doesNotThrow(()=>{
				clearCellSelected(table);
			});
		});

	});


	describe('newCellSelected', function() {

		it('should set a cell 1 without limits', function() {
			const	table = startEngine({rows: 1, cols: 1});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);

			newCellSelected(table, 0, 0);
			
			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
		});


		it('should set a cell 2x2 with old and without limits', function() {
			const	table = startEngine({rows: 2, cols: 2});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);

			newCellSelected(table, 1, 1);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);

			newCellSelected(table, 1, 0, 1, 1);

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 1);
			assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);
		});


		it('should set a cell 1 with limits', function() {
			const	table = startEngine({rows: 1, cols: 1, rowsL: 2, colsL: 2});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);

			newCellSelected(table, 2, 2);

			assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 1);
		});


		it('should set a cell 2x2 with old and with limits', function() {
			const	table = startEngine({rows: 2, cols: 2, rowsL: 2, colsL: 2});

			assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell2-3.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell3-2.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell3-3.selected'), 0);

			newCellSelected(table, 3, 3);

			assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell2-3.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell3-2.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell3-3.selected'), 1);

			newCellSelected(table, 2, 3, 3, 3);

			assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell2-3.selected'), 1);
			assert.lengthOf(table.querySelectorAll('#cell3-2.selected'), 0);
			assert.lengthOf(table.querySelectorAll('#cell3-3.selected'), 0);
		});

		it('should throw an error by range invalid', function() {
			const	table = startEngine({rows: 1, cols: 1});

			assert.throws(()=>{
				newCellSelected(table, 10, 0);
			});
		});

		it('should NOT throw an error by range invalid', function() {
			const	table = startEngine({rows: 2, cols: 2});

			assert.doesNotThrow(()=>{
				newCellSelected(table, 1, 0, 10, 1);
			});
		});

	});

	describe('startEngine', function() {
		it('without any params', function(){
			const	table = startEngine();

			assert.lengthOf(table.querySelectorAll('#cell0-0'), 1);
		});

		it('without params', function(){
			const	table = startEngine({rows: 1, cols: 1});

			assert.lengthOf(table.querySelectorAll('#cell0-0'), 1);
		});

		it('with autoSelect', function(){
			const	table = startEngine({rows: 1, cols: 1, autoSelect: true});

			assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
		});

		it('with autoSelect and limits', function(){
			const	table = startEngine({rows: 1, cols: 1, rowsL: 2, colsL: 2, autoSelect: true});

			assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 1);
		});

		it('without autoSelect and limits', function(){
			const	table = startEngine({rows: 1, cols: 1, rowsL: 2, colsL: 2});

			assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 0);
		})
	});

	describe('moveTo', function(){
		describe('normal', function(){
			it('to one position without limits', function(){
				const	table = startEngine({rows: 2, cols: 2, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);

				moveToCell(table, 1, 1);

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
			});

			it('to one position with limits simple', function(){
				const	table = startEngine({rows: 2, cols: 2, rowsL: 1, colsL: 1, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);

				moveToCell(table, 1, 1);

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);
			});

			it('to one position with limits complex', function(){
				const	table = startEngine({rows: 4, cols: 4, rowsL: 2, colsL: 2, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 0);
				assert.lengthOf(table.querySelectorAll('#cell3-3.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell5-5.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell5-5.limit'), 0);
				assert.lengthOf(table.querySelectorAll('#cell5-5.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell6-6.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell7-7.limit'), 1);

				moveToCell(table, 3, 3);

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell3-3.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 0);
				assert.lengthOf(table.querySelectorAll('#cell3-3.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell5-5.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell5-5.limit'), 0);
				assert.lengthOf(table.querySelectorAll('#cell5-5.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell6-6.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell7-7.limit'), 1);
			});

			it('to one position to right', function(){
				const	table = startEngine({rows: 2, cols: 2, rowsL: 1, colsL: 1, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);

				moveToCell(table, 0, 1);

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-2.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);
			});

			it('to one position collision with a limit', function(){
				const	table = startEngine({rows: 2, cols: 2, rowsL: 1, colsL: 1, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);

				moveToCell(table, 2, 2);

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);
			});

			it('to one position collision with out of limit', function(){
				const	table = startEngine({rows: 2, cols: 2, rowsL: 1, colsL: 1, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);

				moveToCell(table,  4, 4);

				assert.lengthOf(table.querySelectorAll('.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-0.limit'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-1.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell2-2.normal'), 1);
				assert.lengthOf(table.querySelectorAll('#cell3-3.limit'), 1);
			});
		});

		describe('infinite', function(){
			it('to one position without limits - horizontal', function(){
				const	table = startEngine({rows: 1, cols: 2, infinite: true, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);

				moveToCell(table, 0, 1);

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 1);

				moveToCell(table, 0, 1);

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell0-1.selected'), 0);
			});
			
			it('to one position without limits - vertical', function(){
				const	table = startEngine({rows: 2, cols: 1, infinite: true, autoSelect: true});

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);

				moveToCell(table, 1, 0);

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 0);
				assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 1);

				moveToCell(table, 1, 0);

				assert.lengthOf(table.querySelectorAll('#cell0-0.selected'), 1);
				assert.lengthOf(table.querySelectorAll('#cell1-0.selected'), 0);
			});
		});

	});

});
