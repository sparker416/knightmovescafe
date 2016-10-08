/**
 * Created by spark on 4/1/2016.
 */
(function(){
    angular
        .module("KnightMovesApp")
        .controller("SearchController", SearchController);

    function SearchController($location, UserGameService) {
        var vm = this;

        vm.$location = $location;

        vm.search = search;
        vm.searchGameForKeywords = searchGameForKeywords;
        vm.searchTypes = searchTypes;

        var allGames = [];

        UserGameService
            .findAllGames()
            .then(function(response){
                allGames = response.data;
            });

        function searchGameForKeywords(keywords, game)
        {
            var terms = keywords.split(',');
            var descTerms = game.Description.split(' ');
            var title = game.Name.toLowerCase();

            for(var t in terms) {
                if (title.indexOf(terms[t].toLowerCase()) > -1) {
                    return true;
                } else {
                    for (var d in descTerms) {
                        if (terms[t].toLowerCase() == descTerms[d].toLowerCase()) {
                            return true;
                        }
                    }
                }
            }
            return false;

        }

        function searchTypes(criteria, game)
        {
            return (Boolean(criteria.strategy) && game.Strategy) ||
                (Boolean(criteria.coOp) && game.Co_op) ||
                (Boolean(criteria.party) && game.Party) ||
                (Boolean(criteria.classic) && game.Classic) ||
                (Boolean(criteria.worker) && game.Worker_placement) ||
                (Boolean(criteria.resource) && game.Resource_management) ||
                (Boolean(criteria.deck) && game.Deck_building);
        }

        function search(criteria)
        {
            var results = [];

            for(var g in allGames)
            {
                if (criteria.numPlayers &&
                    criteria.numPlayers>=allGames[g].Min_Num_of_Players &&
                    criteria.numPlayers<=allGames[g].Max_Num_of_Players)
                {
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]) &&
                            (criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]) &&
                            (criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            (criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]) &&
                            (criteria.lowAge >= allGames[g].Min_Age))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        criteria.playtime)
                    {
                        if((criteria.lowAge >= allGames[g].Min_Age) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        ! (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)) &&
                            (criteria.lowAge >= allGames[g].Min_Age))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]) &&
                            (criteria.lowAge >= allGames[g].Min_Age))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            ((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            (criteria.lowAge >= allGames[g].Min_Age))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        ! (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            ((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]) &&
                            vm.searchTypes(criteria, allGames[g]))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        criteria.playtime)
                    {
                        if(((criteria.playtime >= allGames[g].Min_Playing_Time) &&
                            (criteria.playtime <= allGames[g].Max_Playing_Time)))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(criteria.lowAge >= allGames[g].Min_Age)
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        (criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if((criteria.CC && allGames[g].Coolidge_Corner) ||
                            (criteria.Teele && allGames[g].Teele_Square))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        (criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchTypes(criteria, allGames[g]))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        if(vm.searchGameForKeywords(criteria.keywords, allGames[g]))
                        {
                            results.push(allGames[g]);
                        }
                    }
                    if(!criteria.keywords &&
                        !(criteria.coOp || criteria.strategy || criteria.party ||
                        criteria.classic || criteria.worker ||
                        criteria.resource || criteria.deck) &&
                        !(criteria.CC || criteria.Teele)&&
                        !criteria.lowAge &&
                        !criteria.playtime)
                    {
                        results.push(allGames[g]);
                    }
                }
            }
            vm.results = results;
        }
    }
})();