angular.module('myTask', [])

.controller('myCtrl', ['$scope', function($scope, $http) {
    $scope.taskList = [];
        $scope.addTask = function() {                                           //addding done here
        $scope.taskList.push({name:$scope.taskName, done:false});
        $scope.taskName = "";
    };
    
    $scope.deleteTask = function(index) {                                       //deleting done here
        $scope.taskList.splice(index, 1);
    };
    
    $scope.Edit = function(index)                                                //Edit done here
    {
        $scope.taskList[index].editing = true;
    };
    
    $scope.Save = function(index)                                                   //Saving done here
    {
        $scope.taskList[index].editing = false;
       };

}])
