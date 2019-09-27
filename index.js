/**
 * @return {boolean}
 */
function CalculaCodigoBarras(linhaDigitavel) {
    try {
        var barra = linhaDigitavel.replace(/[^0-9]/g, '');


        if (barra.length !== 48) {

            return false;
        }

        var blocos = [];
        blocos.push(barra.substr(0, 12));
        blocos.push(barra.substr(12, 12));
        blocos.push(barra.substr(24, 12));
        blocos.push(barra.substr(36, 12));

        console.log(blocos);

        var isModulo10 = ['6', '7'].indexOf(barra[2]) !== -1;
        if (isModulo10) {
            if (blocos[0].substring(11, 12) != CalculaModulo10(blocos[0].substring(0, 11)) || blocos[1].substring(11, 12) != CalculaModulo10(blocos[1].substring(0, 11)) ||
                blocos[2].substring(11, 12) != CalculaModulo10(blocos[2].substring(0, 11)) || blocos[3].substring(11, 12) != CalculaModulo10(blocos[3].substring(0, 11))) {
                return false;
            }
        } else {
            if (blocos[0].substring(11, 12) != CalculaModulo11(blocos[0].substring(11, -1)) || blocos[1].substring(11, 12) != CalculaModulo11(blocos[1].substring(11, -1)) ||
                blocos[2].substring(11, 12) != CalculaModulo11(blocos[2].substring(11, -1)) || blocos[3].substring(11, 12) != CalculaModulo11(blocos[3].substring(11, -1))) {
                return false;
            }
        }
        barra = blocos[0].substr(0, 11) + blocos[1].substr(0, 11) + blocos[2].substr(0, 11) + blocos[3].substr(0, 11);


        return barra;
    }catch (e) {
        console.error(e)
    }

}


/**
 * @return {number}
 */
function CalculaModulo11(text) {
    text = text.replace(/[^0-9]/g, '');
    var soma = 0;
    var peso = 2;
    var base = 9;
    var resto = 0;
    var contador = text.length - 1;
    for (var i = contador; i >= 0; i--) {
        soma = soma + (text.substring(i, i + 1) * peso);
        if (peso < base) {
            peso++;
        } else {
            peso = 2;
        }
    }
    var digito = 11 - (soma % 11);
    if (digito > 9) digito = 0;
    /* Utilizar o dígito 1(um) sempre que o resultado do cálculo padrão for igual a 0(zero), 1(um) ou 10(dez). */
    if (digito === 0) digito = 1;
        return digito;
}

/**
 * @return {number}
 */
function CalculaModulo10(text){
    text = text.replace(/[^0-9]/g, '');
    var soma = 0;
    var peso = 2;
    var contador = text.length - 1;
    while (contador >= 0) {
        var multiplicacao = (text.substr(contador, 1) * peso);
        if (multiplicacao >= 10) { multiplicacao = 1 + (multiplicacao - 10); }
        soma = soma + multiplicacao;
        if (peso === 2) {
            peso = 1;
        } else {
            peso = 2;
        }
        contador = contador - 1;
    }
    var digito = 10 - (soma % 10);
    if (digito === 10)
        digito = 0;
    return digito;
}



function completarValor(valor){
    // completar a numeração até ficar com 12
    if(valor.length < 12){
        for(var i = valor.length; i < 12; i++ )
            valor = 0 + valor;
    }
    return valor;
}

function formarLinhaDigitavel(valor){
    // substituir na linha digitavel basica
    var linhaDigitavelConvenio = '8177'+ valor[1] + valor[2] + valor[3] + valor[4] + valor[5] + valor[6] + valor[7] +'-{0} '
        + '' + valor[8] + valor[9] + valor[10] + valor[11] +'5659970-{1} 41131079703-9 00143370831-8';

    for (let i = 10; i--; i >= 0) {
        for (let j = 10; j--; j >= 0) {
            let tempLinha = linhaDigitavelConvenio.replace('{0}', i).replace('{1}', j);
            if (CalculaCodigoBarras(tempLinha)) {
                return tempLinha;
            }
        }
    }
}

function renderLinhaDigitavel(linhaDigitavel){
    const inputLinhaDigitavel = $('#linha');
    inputLinhaDigitavel.val(linhaDigitavel);
}


$('#executar').on('click', function(){
    var valor =  $('#valor').val();

    valor = completarValor(valor);

    const linhaDigitavel = formarLinhaDigitavel(valor);

    renderLinhaDigitavel(linhaDigitavel);
});

