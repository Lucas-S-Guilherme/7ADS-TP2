$(document).ready(function(){

    // Quando o valor do campo "Nacionalidade" mudar
    $("#id_nacionalidade").change(function() {
        // Verifique se a opção "Estrangeiro" (value=4) está selecionada
         if ($(this).val() == "4") {
            $(".form-row.cpf").hide();
            $(".form-row.pais_origem").show();
            $(".form-row.passaporte").show();
            $(".form-row.publico_alvo").hide();
        } else {
            $(".form-row.cpf").show();
            $(".form-row.pais_origem").hide();
            $(".form-row.passaporte").hide();
            $(".form-row.publico_alvo").show();
        }
    });

    // Inicialmente, verifique o valor da nacionalidade
    $('#id_nacionalidade').trigger('change');

});
