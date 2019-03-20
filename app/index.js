// const body = document.getElementsByTagName('body')[0];
//
// function createTable(alto, ancho, altoL, anchoL) {
// 	let r = '';
// 	for (let i = 0; i < alto + (altoL * 2); i++) {
// 		r += '<tr>';
// 		for (let j = 0; j < ancho + (anchoL * 2); j++) {
// 			let limit =
// 				(i < altoL || i >= (alto + altoL))
// 					||
// 				(j < anchoL || j >= (ancho + anchoL))
// 					? 'limit' : 'normal';
// 			r += `<td id="cell${i}-${j}" class="${limit}">${i}-${j}</td>`;
// 		}
// 		r += '</tr>';
// 	}
//
// 	return r;
// }
//
// let table = document.createElement('table');
// table.innerHTML = createTable(5, 5, 1, 1);
//
// body.prepend(table);
