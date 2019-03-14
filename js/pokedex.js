$(document).ready(function () {
    var $btnPokemonChange = $('.btn.sidebar-right:not(.btn-arrow)'),
        $btnPokemonChangeSide = $('.sidebar-desktop .btn.sidebar-right:not(.btn-arrow)'),
        $btnPokemonChangeTop = $('.sidebar-mobile .btn.sidebar-right:not(.btn-arrow)'),
        pokemon = [],
        currentPkmnId = 0,
        currentPkmnIdIndexOne = 1,
        $pkmnHeightHolder = $('#pkm-height'),
        $pkmnWeightHolder = $('#pkm-weight'),
        $pkmnNameHolder = $('#pkm-name'),
        $pkmnJapaneseNameHolder = $('#japanese-name'),
        $pkmnNumberHolder = $('#pkm-number'),
        $pkmnImageHolder = $('#pokemon-image'),
        $pkmnContainerType = $('#container-type'),
        $hpStat = $('#hp-stat'),
        $attackStat = $('#attack-stat'),
        $defenseStat = $('#defense-stat'),
        $spAttackStat = $('#sp-attack-stat'),
        $spDefenseStat = $('#sp-defense-stat'),
        $speedStat = $('#speed-stat'),
        $pokemonNameBtn = $('#pokemon-name-btn'),
        $pokemonNumberBtn = $('#pokemon-number-btn'),
        $pokemonNameInput = $('#pokemon-name-input'),
        $pokemonNumberInput = $('#pokemon-number-input');

    $.getJSON('./data/pokedex.json', function(data) {
        pokemon = data;
    });

    String.prototype.capitalize = function() {
        return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    };

    function getRandomPkmnSizing(min, max) {
        return Math.random() * (max - min) + min;
    }

    function getNewPkmnInfo() {
        var pkmnNewHeight = getRandomPkmnSizing(0.5, 14),
            pkmnNewWeight = getRandomPkmnSizing(0.1, 355);

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
    }

    $btnPokemonChange.on('click', function (e) {
        e.preventDefault();

        var $currentBtn = $(this);

        currentPkmnId = parseInt($currentBtn.text()) - 1;
        currentPkmnIdIndexOne = parseInt($currentBtn.text());

        getNewPkmnInfo();
    });

    var $getPrevPkmn = $('#arrow-prev-btn, #arrow-prev-btn-topbar'),
        $getNextPkmn = $('#arrow-next-btn, #arrow-next-btn-topbar');
    
    $getPrevPkmn.on('click', function (e){
        e.preventDefault();

        if (currentPkmnIdIndexOne > 1) {
            // 10 is the least amount of Pokémon available in the sidebar
            $btnPokemonChange.each(function(index) {
                var buttonId = parseInt($(this).text()),
                    newButtonId = buttonId - 1;

                $(this).text(newButtonId);
            });
        }

        if (currentPkmnId > 0) {
            currentPkmnId = currentPkmnId - 1,
            currentPkmnIdIndexOne = currentPkmnIdIndexOne - 1;

            getNewPkmnInfo();
        }
    });

    $getNextPkmn.on('click', function(e){
        e.preventDefault();

        if (currentPkmnIdIndexOne < 809) {
            // 799 is the last Pokémon minus 10
            $btnPokemonChange.each(function(index) {
                var buttonId = parseInt($(this).text()),
                    newButtonId = buttonId + 1;

                $(this).text(newButtonId);
            });
        }

        if (currentPkmnId < 809) {
            currentPkmnId = currentPkmnId + 1,
            currentPkmnIdIndexOne = currentPkmnIdIndexOne + 1;

            getNewPkmnInfo();
        }
    });

    $pokemonNameBtn.on('click', function(e){
        e.preventDefault();
        var newPokemonInputName = $pokemonNameInput.val(),
            newPokemonInputNameCapitalized = newPokemonInputName.capitalize();

        for (currentPokemon in pokemon) {
            if (pokemon[currentPokemon].name.english == newPokemonInputNameCapitalized) {
                currentPkmnId = pokemon[currentPokemon].id - 1,
                currentPkmnIdIndexOne = pokemon[currentPokemon].id;

                getNewPkmnInfo();

                if (currentPkmnIdIndexOne <= 799) {
                    $btnPokemonChangeSide.each(function(index) {
                        $(this).text(currentPkmnIdIndexOne + index);
                    });
        
                    $btnPokemonChangeTop.each(function(index) {
                        $(this).text(currentPkmnIdIndexOne + index);
                    });
                }

                return;
            }
        }
        
    });
    $pokemonNumberBtn.on('click', function(e){
        e.preventDefault();
        var newPokemonInputNumber = $pokemonNumberInput.val(),
            newPokemonInputNumberInt = parseInt(newPokemonInputNumber);
        
        if (newPokemonInputNumberInt >= 1 && newPokemonInputNumber <= 809) {
            currentPkmnId = newPokemonInputNumberInt - 1,
            currentPkmnIdIndexOne = newPokemonInputNumberInt;

            getNewPkmnInfo();
        } else {
            alert('There are no Pokémon with that Pokédex index number');
        }

        if (newPokemonInputNumberInt <= 799) {
            $btnPokemonChangeSide.each(function(index) {
                $(this).text(newPokemonInputNumberInt + index);
            });

            $btnPokemonChangeTop.each(function(index) {
                $(this).text(newPokemonInputNumberInt + index);
            });
        }
    });

});