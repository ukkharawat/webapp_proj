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
                if(response.data.message){
                    $scope.message = response.data.message
                    delete $scope.data
                }else{
                    $scope.data = response.data
                    delete $scope.message
                }
                if($scope.search.length == 0){
                    delete $scope.message
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
                    $scope.sss = response.data.username
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
                $scope.obj = {
                    user : "",
                    pwd : ""
                }
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
                    $scope.sss = response.data.username
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