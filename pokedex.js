$(document).ready(function () {
    var $btnPokemonChange = $('.btn.sidebar-right:not(.btn-arrow)'),
        pokemon = [];

    $.getJSON('./pokedex.json', function (data) {
        pokemon = data;
    });

    function getRandomPkmnSizing(min, max) {
        return Math.random() * (max - min) + min;
    }

    $btnPokemonChange.on('click', function (e) {
        e.preventDefault();

        var $currentBtn = $(this),
            currentPkmnId = parseInt($currentBtn.text()) - 1,
            currentPkmnIdIndexOne = parseInt($currentBtn.text()),
            $pkmnHeightHolder = $('#pkm-height'),
            $pkmnWeightHolder = $('#pkm-weight'),
            $pkmnNameHolder = $('#pkm-name'),
            $pkmnJapaneseNameHolder = $('#japanese-name'),
            $pkmnNumberHolder = $('#pkm-number'),
            $pkmnImageHolder = $('#pokemon-image'),
            pkmnNewHeight = getRandomPkmnSizing(0.5, 14),
            pkmnNewWeight = getRandomPkmnSizing(0.1, 355);

            console.log(pokemon[currentPkmnId].name.japanese);

        $pkmnHeightHolder.text(pkmnNewHeight.toFixed(2) + 'm');
        $pkmnWeightHolder.text(pkmnNewWeight.toFixed(2) + 'kg');

        $pkmnNameHolder.text(pokemon[currentPkmnId].name.english);
        $pkmnJapaneseNameHolder.text(pokemon[currentPkmnId].name.japanese);
        $pkmnNumberHolder.text('#' + ('00' + currentPkmnIdIndexOne).slice(-3));

        var pkmnImageName = ('00' + currentPkmnIdIndexOne).slice(-3) + (pokemon[currentPkmnId].name.english) + '.png';
        $pkmnImageHolder.attr('src', 'images/pokemons/' + pkmnImageName);
    });
});