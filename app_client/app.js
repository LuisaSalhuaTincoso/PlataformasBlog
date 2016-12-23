(function () {

    angular.module('lyricsShareApp', ['ngRoute']); //ngRouter: se agrega la dependencia del modulo router

    function config ($routeProvider,$locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'home/home.view.html',
                controller: 'homeCtrl',
                controllerAs: 'vm'
            })
            .when('/detalle/:publishid', {
                templateUrl: '/publishDetail/publishDetail.view.html',
                controller: 'publishDetailCtrl',
                controllerAs: 'vm'
            })
            
            .otherwise({redirectTo: '/'});
        $locationProvider.html5Mode(true);//ENCENDEMOS CARACTERISTICAS DE HTML5
    
    };

    angular
        .module('lyricsShareApp')
        .config(['$routeProvider','$locationProvider', config]);

})();