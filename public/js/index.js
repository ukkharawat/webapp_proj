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
                delete $scope.image
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
                    $scope.image = response.data.displayImage
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
        },
        $scope.review = function(){
            $http({
                url : '/review',
                method : 'POST',
                data : {
                    cosmetic_name : "Wipe-off cleansing micellar water",
                    content : $scope.content,
                    starPoint : $scope.starPoint
                }
            }).then(function(response){
                console.log(response)
            })
        }
    })
})()