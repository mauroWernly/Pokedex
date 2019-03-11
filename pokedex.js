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
            pkmnNewWeight = getRandomPkmnSizing(0.1, 355),
            $pkmnContainerType = $('#container-type'),
            $hpStat = $('#hp-stat'),
            $attackStat = $('#attack-stat'),
            $defenseStat = $('#defense-stat'),
            $spAttackStat = $('#sp-attack-stat'),
            $spDefenseStat = $('#sp-defense-stat'),
            $speedStat = $('#speed-stat');

        $pkmnHeightHolder.text(pkmnNewHeight.toFixed(2) + 'm');
        $pkmnWeightHolder.text(pkmnNewWeight.toFixed(2) + 'kg');

        $pkmnNameHolder.text(pokemon[currentPkmnId].name.english);
        $pkmnJapaneseNameHolder.text(pokemon[currentPkmnId].name.japanese);
        $pkmnNumberHolder.text('#' + ('00' + currentPkmnIdIndexOne).slice(-3));

        var pkmnImageName = ('00' + currentPkmnIdIndexOne).slice(-3) + (pokemon[currentPkmnId].name.english) + '.png';
        $pkmnImageHolder.attr('src', 'images/pokemons/' + pkmnImageName);
        $pkmnContainerType.empty();

        var pkmnTypes = pokemon[currentPkmnId].type;

        for (currentType in pkmnTypes) {
            $('<img src="images/types/' + pkmnTypes[currentType] + '.png">').appendTo($pkmnContainerType);
        }
        $hpStat.text(pokemon[currentPkmnId].base['HP']);
        $attackStat.text(pokemon[currentPkmnId].base['Attack']);
        $defenseStat.text(pokemon[currentPkmnId].base['Defense']);
        $spAttackStat.text(pokemon[currentPkmnId].base['Sp. Attack']);
        $spDefenseStat.text(pokemon[currentPkmnId].base['Sp. Defense']);
        $speedStat.text(pokemon[currentPkmnId].base['Speed']);

        /* Can't target the values of base with index. */

        $.adaptiveBackground.run();

        $pkmnImageHolder.on('ab-color-found', function(ev, payload) {
            var currentBackgroundColor = $pkmnImageHolder.attr('data-ab-color');
            $('body').css('background-color', currentBackgroundColor);
        });
    });
});