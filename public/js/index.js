(function(){
    angular.module('listed' , [])
    .controller('controller' , function($scope , $http , $window){
        $scope.submit = function(){
            if($scope.search){
                $scope.data = []
                searchBigger = $scope.search.toUpperCase()
                for(i = 0 ; i < $scope.objs.length ; i++){
                    if($scope.objs[i].brand.toUpperCase().includes(searchBigger) 
                    || $scope.objs[i].category.toUpperCase().includes(searchBigger)  
                    || $scope.objs[i].name.toUpperCase().includes(searchBigger)  
                    || $scope.objs[i].brand.toUpperCase().includes(searchBigger)   ){
                        $scope.data.push($scope.objs[i])
                    }
                }
            }else{
                $scope.data = []
            }
            
	    },
        $scope.getCosmetics = function(){
            $http({
                url: '/getCosmetics', 
                method: "GET"
            })
            .then(function(response){
                console.log(response)
                
                $scope.objs = response.data
                
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
        $scope.getPost = function(){
            $http({
                url: '/getPost',
                method: 'GET',
                params : {
                    id : 1
                }
            })
            .then(function(response){
                console.log(response)
            })
        },
        $scope.getCookie = function(){
            $http({
                url: '/getCookie',
                method: 'GET'
            })
            .then(function(response){
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
        $scope.search = "",
        $scope.add = function(){
            $http({
                url: '/admin/addCosmetic',
                method: 'POST',
                data: {
                    brand: $scope.brand,
                    collections: $scope.collections,
                    category: $scope.category,
                    name: $scope.name,
                    detail : "Ccc"
                }
            }).then(function(response){
                console.log(response)
            })
        },
        $scope.post = function(){
            $http({
                url: '/post',
                method: 'POST',
                data: {
                    cosmetic_name : $scope.cos_name,
                    content : $scope.content
                }
            }).then(function(response){
                console.log(response)
            })
        },
        $scope.like = function(){
            $http({
                url: '/likeCosmetic', 
                method: "GET",
                params: {
                    id: 1
                }
            }).then(function(response){
                console.log(response)
            })
        },
        $scope.edit = function(){
            $http({
                url: '/admin/editCosmetic',
                method: 'POST',
                data: {
                    name: $scope.th.name,
                    category: $scope.th.category,
                    collections: $scope.th.collections,
                    brand: $scope.th.brand,
                    detail: $scope.th.detail,
                    id: $scope.th.id
                }
            })
            .then(function(response){
                console.log(response)
            })
        },
        $scope.getOwnPost = function(){
            $http({
                url: '/getOwnPost',
                method: 'GET'
            }).then(function(response){
                console.log(response)
            })
        },
        $scope.changePassword = function(){
            $http({
                url: '/user/changePassword',
                method: 'POST',
                data: {
                    oldpassword: $scope.oldpassword,
                    newpassword: $scope.newpassword
                }
            }).then(function(response){
                console.log(response)
            })
        }
    })
})()