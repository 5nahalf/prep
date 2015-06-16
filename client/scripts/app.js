var app = angular.module("app", []);
app.controller("IndexController", ["$scope", "$http", function($scope, $http){
    $scope.tweet = {};
    $scope.tweets = [];
    var fetchTweets = function(){
        return $http.get("/tweets").then(function(response){
            if(response.status !== 200){
                throw new Error("failed to fetch tweets from the api");
            }
            $scope.tweets = response.data;
            return response.data;
        })
    };
    //$scope.add = function(tweet){
    //    return $http.post("/add", tweet).then(fetchTweets);
    //};
    //$scope.remove = function(tweet) {
    //    return $http.post('/remove', tweet).then(fetchTweets);
    //};

    fetchTweets();
}]);