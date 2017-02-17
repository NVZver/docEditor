(function () {
    var editorApp = angular.module('editorApp', []);
    editorApp.controller('editorCtl', function ($scope, $http) {
        var saveDoc = {};
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
                $scope.docs = res.data.docs;
                $scope.selectedDoc = {};
            }, function (rej) {
                $scope.docs = []
            })
        }

        function docSelect(doc) {
            $scope.selectedDoc = doc;
            saveDoc = angular.copy(doc, saveDoc);
            $scope.docs.map(function (doc) {
                doc.active = false;
            });
            doc.active = true;
        }

        function selectedDocSave() {
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
            $scope.docs.map(function (doc) {
                doc.active = false;

                if (doc.id == saveDoc.id) {
                    doc.text = saveDoc.text;
                }
            });
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
            $scope.docs.map(function (doc) {
                doc.active = false;
            });
        }

    });
})();