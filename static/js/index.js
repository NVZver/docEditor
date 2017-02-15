(function(){
    console.log('run js');
    var editorApp = angular.module('editorApp', []);
    editorApp.controller('editorCtl', function($scope, $http){

        $scope.docs = [];
        init();
        function init(){
            $http({
                method: 'GET',
                url: '/editor/get/'
            }).then(function(res){
                console.log(res);
            }, function(rej){

            })
        }

    });
})();