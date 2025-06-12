/* Syncronize Widgets */

function sync_widgets() {
    substitui_prefixo();

    let telMaskBehavior = function(val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
    };
    let telOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(telMaskBehavior.apply({}, arguments), options);
        }
    };

    // BrDataWidget
    $("input.br-data-widget").unmask();
    $("input.br-data-widget").mask("99/99/9999", {placeholder: " "});

    // ShotTimeWidget
    $("input.short-time-widget").unmask();
    $("input.short-time-widget").mask("99:99", {placeholder: " "});

    // BrDateTimeWidget
    $("input.br-datahora-widget").unmask();
    $("input.br-datahora-widget").mask("99/99/9999 99:99:99", {placeholder: " "});

    // BrTelefoneWidget
    $("input.br-phone-number-widget").unmask();
    $("input.br-phone-number-widget").mask(telMaskBehavior, telOptions);

    // BrCepWidget
    $("input.br-cep-widget").unmask();
    $("input.br-cep-widget").mask("99999-999", {placeholder: " "});

    // BrProcessoEletronicoWidget
    $("input.br-processoeletronico-widget").unmask();
    $("input.br-processoeletronico-widget").mask("99999.999999.9999-99", {placeholder: "12345.123456.2024-12"});
    
    // BrCpfWidget
    $("input.br-cpf-widget").unmask();
    $("input.br-cpf-widget").mask("999.999.999-99", {placeholder: " "});

    // BrCnpjWidget
    $("input.br-cnpj-widget").unmask();
    $("input.br-cnpj-widget").mask("99.999.999/9999-99", {placeholder: " "});

    // BrPlacaVeicularWidget
    $("input.placa-widget").unmask();
    $("input.placa-widget").mask("SSS-9A99", {placeholder: " "});
    $("input.placa-widget").blur(function() {
        this.value = this.value.toUpperCase();
    });

    // EmpenhoWidget
    $("input.empenho-widget").unmask();
    //$.mask.definitions['~']='[Nn]';
    //$.mask.definitions['/']='[Ee]';
    //$("#eyescript").mask("~9.99 ~9.99 999");
    $("input.empenho-widget").mask("9999NE999999", {placeholder: " "});
    $("input.empenho-widget").blur(function() {
        this.value = this.value.toUpperCase();
    });

    // IntegerWidget
    $("input.integer-widget").unmask('keypress');
    $("input.integer-widget").keypress(function() {
        mask(this, mask_only_numbers);
    });

    // AlphaNumericWidget
    $("input.alpha-widget").unmask('keypress');
    $("input.alpha-widget").keypress(function() {
        mask(this, mask_alpha);
    });

    // AlphaNumericUpperTextWidget
    $("input.upper-text-widget").unbind('keypress');
    $("input.upper-text-widget").keypress(function() {
        mask(this, mask_upper_text);
    });

    // CapitalizeTextWidget
    $("input.capitalize-text-widget").unbind('keypress');
    $("input.capitalize-text-widget").keypress(function() {
        mask(this, mask_camel_case);
    });

    // BrDinheiroWidget
    // $("input.br-dinheiro-widget").mask("000.000.000.000.000,00", {reverse: true, placeholder: '0,00'});
    $("input.br-dinheiro-widget").unbind('keypress');
    $("input.br-dinheiro-widget").keypress(function() {
        mask(this, mask_money);
    });

    // BrDinheiroWidget
    $("input.br-dinheiro-almox-widget").unbind('keypress');
    $("input.br-dinheiro-almox-widget").keypress(function() {
        mask(this, mask_money_almox);
    });
}

let v_obj = null;
let v_fun = null;

function mask(obj, func) {
    v_obj = obj;
    v_fun = func;
    if ($(obj).attr('data-decimal-places')) {
        setTimeout("execmask()", 1);
    } else {
        setTimeout("execmask()", 1);
    }
}

function execmask() {
    v_obj.value = v_fun(v_obj.value);
}

function mask_only_numbers(v) {
    return v.replace(/\D/g, "");
}

function mask_upper_text(value) { // by andersonbraulio
    let texto = value.replace(/[^a-zA-Z0-9]/g, "");
    let textoFormatado = "";

    for (let idx = 0; idx < texto.length; idx++) {
        let char = texto.charAt(idx);
        if (idx == 0) {
            if (char == ' ') {
                textoFormatado = texto.substr(1);
            } else {
                textoFormatado = char.toUpperCase();
            }
        } else {
            textoFormatado += char.toUpperCase();
        }
    }
    return textoFormatado;
}

function mask_alpha(value) { // by andersonbraulio
    return value.replace(/[^a-zA-Z0-9]/g, "");
}

function mask_camel_case(value) { // by andersonbraulio
    let texto = value.replace(/[^a-zA-ZÁ-Ûá-û0-9.\'\s\-]/g, "");
    let textoFormatado = "";
    for (let idx = 0; idx < texto.length; idx++) {
        let char = texto.charAt(idx);
        if (idx == 0) {
            if (char == ' ') {
                textoFormatado = texto.substr(1);
            } else {
                textoFormatado = char.toUpperCase();
            }
        } else {
            let prevChar = textoFormatado.charAt(idx - 1);
            if (prevChar == ' ') {
                textoFormatado = texto.substr(0, idx).concat(char.toUpperCase());
            } else {
                textoFormatado += char.toLowerCase();
            }
        }
    }
    return textoFormatado;
}

function mask_money(value) { // by paivatulio
    let negativo = '';
    if (value[0] == '-') {
        negativo = '-';
    }
    let textoNumerico = value.replace(/\D/g, "");
    if (value != 0) {
        textoNumerico = textoNumerico.replace(/^0/, "");
    }
    let textoFormatado = "";
    if (textoNumerico.length == 1) {
        return negativo + "0,0" + textoNumerico;
    } else if (textoNumerico.length == 2) {
        return negativo + "0," + textoNumerico;
    } else {
        for (let idx = 0; idx < textoNumerico.length; idx++) {
            if (idx == textoNumerico.length - 2) {
                textoFormatado += ",";
            }
            if ((idx != 0 && textoNumerico.length - idx >= 5) && ((textoNumerico.length - idx + 1) % 3 == 0)) {
                textoFormatado += ".";
            }
            textoFormatado += textoNumerico.charAt(idx);
        }
        return negativo + textoFormatado;
    }
}

function mask_money_almox(value) { // mascara para 3 casas decimais
    let negativo = '';
    if (value[0] == '-') {
        negativo = '-';
    }
    let textoNumerico = value.replace(/\D/g, "");
    if (value != 0) {
        textoNumerico = textoNumerico.replace(/^0/, "");
    }
    let textoFormatado = "";
    if (textoNumerico.length == 1) {
        return negativo + "0,0" + textoNumerico;
    } else if (textoNumerico.length == 2) {
        return negativo + "0,0" + textoNumerico;
    } else if (textoNumerico.length == 3) {
        return negativo + "0," + textoNumerico;
    } else {
        for (let idx = 0; idx < textoNumerico.length; idx++) {
            if (idx == textoNumerico.length - 3) {
                textoFormatado += ",";
            }
            if ((idx != 0 && textoNumerico.length - idx >= 6) && ((textoNumerico.length - idx) % 3 == 0)) {
                textoFormatado += ".";
            }
            textoFormatado += textoNumerico.charAt(idx);
        }
        return negativo + textoFormatado;
    }
}

function mask_nota(element, decimal) {
    let value = element.value;
    value = value.replace(/\D/g, '');
    if (decimal == 1) {
        if (value == 10) {
            element.setAttribute("maxlength", "4");
        } else {
            element.setAttribute("maxlength", "2");
        }
        value = value.replace(/^(\d+)(\d{1})$/, '$1,$2');
    } else if (decimal == 2) {
        if (value == 100) {
            element.setAttribute("maxlength", "5");
        } else {
            element.setAttribute("maxlength", "4");
        }
        if (value.length == 2) {
            value = value.replace(/^(\d+)(\d{1})$/, '$1,$2');
        } else {
            value = value.replace(/^(\d+)(\d{2})$/, '$1,$2');
        }
    }
    element.value = value;
}

function substitui_prefixo() {
    // Substitui os __prefix__ dos autocompletes no django-inline-formset
    let objs = $('input[id$=-TOTAL_FORMS]');                                      // total de formulários inline criados
    objs.each(function(index, obj) {
        let form_name = $(obj).attr('name');                                      // nome do formulário
        form_name = form_name.replace('-TOTAL_FORMS', '');                        // prefixo do formulário sem o -TOTAL_FORMS
        let last_value = $(obj).attr('value') - 1;                                // último incremento do formulário
        let last_form = $('#' + form_name + '-' + last_value + ':last');          // recupera o último formulário adicionado
        let children = last_form.children('fieldset');
        if (children.length == 0) {
            children = last_form.children('td:not(".delete")');
        }
        children.each(function(iindex, iobj) {
            let newFormHtml = $(iobj).html()                                            // substitui todos os __prefix__ pelo
                .replace(new RegExp('__prefix__', 'g'), last_value)		// último incremento do formulário
                .replace(new RegExp('<\\\\/script>', 'g'), '</script>');
            $(iobj).html(newFormHtml);
            $(iobj).find('span.select2').each(function(windex, wobj) { // resolve o bug do autocompletar ao chamar o
                $(wobj).last().remove(); // select2 novamente e esconde o componente excedente
            });
        });
    });
}


function mask_decimal(v, d) {
    negativo = ''

    if (v[0] == '-') {
        negativo = '-'
    }
}

$(document).ready(function() {
    sync_widgets();
});
