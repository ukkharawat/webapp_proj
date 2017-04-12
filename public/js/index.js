(function(){
    angular.module('listed' , [])
    .controller('controller' , function($scope , $http , $window){
        $scope.submit = function(){
	        $http({
                url: '/search', 
                method: "GET",
                params: {search: $scope.search}
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
        $scope.register = function(){
            $http({
                url: '/user/register',
                method: 'POST',
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }).then(function(response){
                console.log(response)
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
                $window.location.reload()
            })
        },
        $scope.getContent = function(){
            $http({
                url: '/getNewPost',
                method: 'GET'
            })
            .then(function(response){
                console.log(response)
            })
        },
        $scope.logout = function(){
            $http({
                url: '/logout',
                method: 'GET'
            })
            .then(function(response){
                delete $scope.sss
            })
        },
        $scope.getCookie = function(){
            $http({
                url: '/getCookie',
                method: 'GET'
            })
            .then(function(response){
                console.log(response)
                if(response.data.username){
                    $scope.sss = response.data
                }else{
                    $scope.sss = {
                        username : "not login",
                        auth : '-1'
                    }
                }
            })
        }
    })
})()