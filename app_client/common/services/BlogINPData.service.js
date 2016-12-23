(function () {

    angular
        .module('BlogINPApp')
        .service('BlogINPData', BlogINPData);

    BlogINPData.$inject = ['$http'];
    function BlogINPData ($http) {
        var listPostById = function (){
            return $http.get('/api/post');
        };
        var postById = function (postid){
            return $http.get('/api/post/' + postid);
        };//Para Obtener el detalle de Location
        return {
            listPostById : listPostById,
            postById : postById
        };
    };
})();
