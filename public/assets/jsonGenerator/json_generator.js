/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
var fs = require('fs');

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

// Gerar data aleatória a partir de uma data inicial até uma data final
function randomDate(start, end) {
    //return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // agora retorna um valor float ao invés de Date
    return start.getTime() + Math.random() * (end.getTime() - start.getTime());
}


var tipos = ['tv', 'tablet', 'celular'];
var parametros = ['marca', 'tamanho_tela', 'caracteristica', 'frequencia', 'camera', 'memoria_interna', 'sistema_operacional', 'cor'];
/*
Os produtos serão chamados de produtos mais alguma coisa

*/
var categorias = {
						'tv':
						[
							{'marca': ['samsung', 'philips', 'lg', 'aoc', 'cce', 'toshiba']},
							{'tamanho_tela':[14, 19, 23, 28, 32, 50]},
							{'caracteristica':['2d', '3d','convencional','smart tv', 'smart tv 3d', 'smart tv 3d weboos']},
							{'frequencia':['1200 hz', '120 hz', '1440 hz', '240 hz', '480 hz', '360 hz']},
							{'camera':[]},
							{'memoria_interna':[]},
							{'sistema_operacional': []},
							{'cor':[]}
						],
						'tablet':
						[
							{'marca': ['samsung', 'apple', 'nokia', 'lg', 'asus', 'sony']},
							{'tamanho_tela':[10, 7, 11, 12, 13, 10.5]},
							{'caracteristica':['usb 2.0', 'wifi', 'wifi 3g', 'wifi 4g', 'bluetooth', '5g']},
							{'frequencia':[]},
							{'camera':[10, 12, 16, 3, 8, 22]},
							{'memoria_interna':['10 gb', '8 gb', '2 gb', '16 gb', '4 gb', '32 gb']},
							{'sistema_operacional': ['android', 'black berry', 'windows phone', 'iphone', 'symbiam', 'firefox']},
							{'cor':['azul', 'preto','vermelho', 'branco', 'verde', 'lilas']}
						],
						'celular':
						[
							{'marca': ['samsung', 'apple', 'nokia', 'lg', 'asus', 'sony']},
							{'tamanho_tela':[3, 3.5, 4, 5, 4.5, 5.5]},
							{'caracteristica':['usb 2.0', 'wifi', 'wifi 3g', 'wifi 4g', 'bluetooth', '5g']},
							{'frequencia':[]},
							{'camera':[10, 12, 16, 3, 8, 22]},
							{'memoria_interna':['10 gb', '8 gb', '2 gb', '16 gb', '4 gb', '32 gb']},
							{'sistema_operacional': ['android', 'black berry', 'windows phone', 'iphone', 'symbiam', 'firefox']},
							{'cor':['azul', 'preto','vermelho', 'branco', 'verde', 'lilas']}
						]
					};
//console.log(categorias[tipos[0]][0][parametros[0]]);
//console.log(categorias[tipos[0]].length);
var produtos = [];
var produto = {}
var num_produtos = 6; // quantos tipos de produto há em cada categoria
var nome = 0;
var numAleatorio = 0;
var dataAleatoria = 0;

//console.log(categorias[tipos[0]].length);
//console.log(categorias[tipos[2]][5][parametros[5]].length);
for(var loops = 0; loops < 10; loops++){ // Determina quantos embaralhamentos sobre suas categorias deseja-se
	// Cada categoria é em embaralhada ao ser definida
	// Caso queira um maior número de produtos com características diferentes, basta aumentar o valor desse loop
	for(var i = 0; i < tipos.length; i++){ // loop dos tipos de produtos
		for(var count = 0; count < num_produtos; count++){ // loop para o número de produtos que têm disponível, todos tem a mesma quantidade
			for(var j = 0; j < categorias[tipos[i]].length; j++){ // loop para quantas categorias cada tipo de produto possui
				if(j == 0){ // é necessário dizer que o campo tags é vetor previamente para utilizar o método push
					produto['tags'] = [];
				}
				if(categorias[tipos[i]][j][parametros[j]].length != 0){ // só executa se aquele vetor não for vazio
					//console.log(categorias[tipos[i]][j][parametros[j]].length);
					produto[parametros[j]] = categorias[tipos[i]][j][parametros[j]][count];
					produto['tags'].push(categorias[tipos[i]][j][parametros[j]][count]); // acrescenta aquela característica às tags do produto
					//categorias[tipos[i]][j][parametros[j]][count] = shuffle(categorias[tipos[i]][j][parametros[j]][count]);

					// Começa a embaralhar quando já terminou de passar todos os valores das categorias
					if(count == 5){ // numero de produtos - 1
						categorias[tipos[i]][j][parametros[j]] = shuffle(categorias[tipos[i]][j][parametros[j]]); // a partir de agora, o código vai embaralhar os teus vetores
					}
				}
			}

			switch(tipos[i]){
				case 'tv':
						numAleatorio = getRandomInt(4000,10000);
						dataAleatoria = randomDate(new Date(2012, 0, 1), new Date());

						produto['preco'] = numAleatorio; // faixa de preço
						produto['nome'] = 'produto '.concat((nome).toString());
						produto['categoria'] = 'tv';
                        produto['lancamento'] = dataAleatoria;

                        // Acrescentando as tags
                        produto['tags'].push(numAleatorio);
                        produto['tags'].push('produto '.concat((nome).toString()));
                        produto['tags'].push('tv');
                        produto['tags'].push(dataAleatoria);
					break;
				case 'tablet':
						numAleatorio = getRandomInt(4000,10000);
						dataAleatoria = randomDate(new Date(2012, 0, 1), new Date());

						produto['preco'] = numAleatorio;
						produto['nome'] = 'produto '.concat((nome+400).toString());
						produto['categoria'] = 'tablet';
                        produto['lancamento'] = dataAleatoria;

                        // Acrescentando as tags
                        produto['tags'].push(numAleatorio);
                        produto['tags'].push('produto '.concat((nome+400).toString()));
                        produto['tags'].push('tablet');
                        produto['tags'].push(dataAleatoria);
					break;
				case 'celular':
						numAleatorio = getRandomInt(4000,10000);
						dataAleatoria = randomDate(new Date(2012, 0, 1), new Date());

						produto['preco'] = numAleatorio;
						produto['nome'] = 'produto '.concat((nome+800).toString());
						produto['categoria'] = 'celular';
                        produto['lancamento'] = dataAleatoria;
                        // Acrescentando as tags
                        produto['tags'].push(numAleatorio);
                        produto['tags'].push('produto '.concat((nome+800).toString()));
                        produto['tags'].push('celular');
                        produto['tags'].push(dataAleatoria);
					break;
			}

			produtos.push(produto); // insere o objeto no vetor
			produto = {}; // deve-se apagar o objeto produto para a criação de um novo produto
			nome++; // Incrementa para produtos com nomes diferentes
		}
	}
}
console.log(produtos.length);


// Função para escrita em arquivo
// Utiliza-se o JSON.stringify para que o formato do arquivo seja JSON
// No mongo utiliza-se o comando
// mongoimport -d database -c collection < output.txt // Não tenho certeza
// Deve-se criar um diretório chamado output
/*
db: ecommerce
collection: produtos
*/
fs.writeFile("db_produtos.js", JSON.stringify(produtos), function(err){
	if(err){
		return console.log(err);
	}

	console.log("File saved in output!");
});
//console.log(categorias[tipos[2]][5][parametros[5]]);
//categorias[tipos[2]][5][parametros[5]] = shuffle(categorias[tipos[2]][5][parametros[5]]);
//console.log(categorias[tipos[2]][5][parametros[5]]);