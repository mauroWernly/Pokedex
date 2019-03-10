$(document).ready(function() {
    var $btnPokemonChange = $('.btn.sidebar-right:not(.btn-arrow)'),
        pokemon = [];

    $.getJSON('./pokedex.json', function(data) {         
        pokemon = data;
    });

    function getRandomPkmnSizing(min, max) {
        return Math.random() * (max - min) + min;
    }

    $btnPokemonChange.on('click', function(e) {
        e.preventDefault();

        var $currentBtn = $(this),
            currentPkmnId = parseInt($currentBtn.text()) - 1,
            $pkmnHeightHolder = $('#pkm-height'),
            $pkmnWeightHolder = $('#pkm-weight'),
            $pkmnNameHolder = $('#pkm-name'),
            $pkmnJapaneseNameHolder = $('#japanese-name'),
            pkmnNewHeight = getRandomPkmnSizing(0.5, 14),
            pkmnNewWeight = getRandomPkmnSizing(0.1, 355);

        $pkmnHeightHolder.text(pkmnNewHeight.toFixed(2) + 'm');
        $pkmnWeightHolder.text(pkmnNewWeight.toFixed(2) + 'kg');

        $pkmnNameHolder.text(pokemon[currentPkmnId].name.english);
        $pkmnJapaneseNameHolder.text(pokemon[currentPkmnId].name.japanese)
    });
});