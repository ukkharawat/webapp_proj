(function(){
    angular.module('listed' , [])
    .controller('controller' , function($scope , $http){
        $scope.submit = function(){
	        $http({
                url: '/search', 
                method: "GET",
                params: {id: $scope.search}
            })
	        .then(function(response) {
	            if(response.data.length != 0){
                    $scope.data = response.data
                    delete $scope.message
                }else{
                    delete $scope.data
                    $scope.message = "Not Found"
                }
	        })
	    },
        $scope.add = function(){
            $http({
                url: '/add',
                method: 'POST',
                data: {
                    brand: $scope.brands,
                    type: $scope.types,
                    name: $scope.names
                }
            })
        },
        $scope.register = function(){
            $http({
                url: '/user/register',
                method: 'POST',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            })
        },
        $scope.login = function(){
            $http({
                url: '/user/login',
                method: 'POST',
                data: {
                    username: $scope.user,
                    password: $scope.pwd
                }
            })
            .then(function(response){
                console.log(response)
            })
        },
        $scope.getContent = function(){
            $http({
                url: '/getContent',
                method: 'GET'
            })
            .then(function(response){
                console.log(response)
                $scope.sss = response.data
            })
        },
        $scope.getCookie = function(){
            $http({
                url: '/getCookie',
                method: 'GET'
            })
            .then(function(response){
                console.log(response)
                $scope.sss = response.data
            })
        }
    })
})()