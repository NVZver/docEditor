(function () {
    console.log('run js');
    var editorApp = angular.module('editorApp', []);
    editorApp.controller('editorCtl', function ($scope, $http) {

        $scope.docs = [];
        $scope.selectedDoc = {};
        $scope.docSelect = docSelect;
        $scope.selectedDocSave = selectedDocSave;
        $scope.selectedDocSaveCancel = selectedDocSaveCancel;
        $scope.selectedDocRemove = selectedDocRemove;
        $scope.selectedDocAdd = selectedDocAdd;


        init();
        function init() {
            $http({
                method: 'GET',
                url: '/editor/get/'
            }).then(function (res) {
                console.log(res.data.docs);
                $scope.docs = res.data.docs;
                $scope.selectedDoc = {};
            }, function (rej) {
                $scope.docs = []
            })
        }

        function docSelect(doc) {
            $scope.selectedDoc = doc;
            $scope.docs.map(function(doc){doc.active = false;});
            doc.active = true;
        }

        function selectedDocSave() {
            console.log($scope.selectedDoc);
            $.ajax({
                type: 'POST',
                url: '/editor/save/',
                dataType: "json",
                data: $scope.selectedDoc,
                success: function (res) {
                    init();
                }
            });

        }

        function selectedDocSaveCancel() {
            $scope.selectedDoc = {};
            $scope.docs.map(function(doc){doc.active = false;});
        }

        function selectedDocRemove() {
            $.ajax({
                type: 'POST',
                url: '/editor/delete/',
                dataType: "json",
                data: {
                    id: $scope.selectedDoc.id
                },
                success: function (res) {
                    init();
                }
            });

        }

        function selectedDocAdd() {
            $scope.selectedDoc = {};
            $scope.docs.map(function(doc){doc.active = false;});
        }

    });
})();