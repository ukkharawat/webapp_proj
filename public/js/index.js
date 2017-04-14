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
                    username: $scope.obj.user,
                    password: $scope.obj.pwd
                }
            })
            .then(function(response){
                console.log(response)
                if(response.data.username){
                    $scope.sss = response.data
                    $scope.cc = true
                }
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
                delete $scope.obj
                $scope.cc = false
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
                    $scope.cc = true
                }
            })
        },
        $scope.obj = {
            user : "",
            pwd : ""
        },
        $scope.add = function(){
            $http({
                url: '/admin/addCosmetic',
                method: 'POST',
                data: {
                    brand: $scope.brand,
                    collections: $scope.collection,
                    type: $scope.type,
                    name: $scope.name,
                    detail : "Ccc"
                }
            }).then(function(response){
                console.log(response)
            })
        }
    })
})()