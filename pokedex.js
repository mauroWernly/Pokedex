$(document).ready(function() {
    var $btnPokemonChange = $('.btn.sidebar-right:not(.btn-arrow)');

    function getRandomPkmnSizing(min, max) {
        return Math.random() * (max - min) + min;
    }

    $btnPokemonChange.on('click', function(e) {
        e.preventDefault();

        var $currentBtn = $(this),
            currentPkmnId = parseInt($currentBtn.text()),
            $pkmnHeightHolder = $('#pkm-height'),
            $pkmnWeightHolder = $('#pkm-weight'),
            pkmnNewHeight = getRandomPkmnSizing(0.5, 14),
            pkmnNewWeight = getRandomPkmnSizing(0.1, 355);

        alert(currentPkmnId);

        $pkmnHeightHolder.text(pkmnNewHeight.toFixed(2) + 'm');
        $pkmnWeightHolder.text(pkmnNewWeight.toFixed(2) + 'kg');
    });
});