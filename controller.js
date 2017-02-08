function AppCtrl($scope, $http){
    console.log("hello im controller");

    $http.get('/contactlist').success(function(response){
        console.log("i got the data ");
        $scope.contactlist= response;
    });
}