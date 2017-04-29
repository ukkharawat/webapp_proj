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
                //$scope.getTopReview()
            })
        },
        $scope.getTopReview = function(){
            $http({
                url : '/getTopReview',
                method : 'GET' ,
                params : {
                    cosmetic_name : "Wipe-off cleansing micellar water"
                }
            }).then(function(response){
                console.log(response)
            })
        },
        $scope.test = function(i){
            console.log(i)
        },
        $scope.data = [
            {id : 1},
            {id : 2}
        ],
        $scope.likeReview = function(){
             $http({
                url : '/editReview',
                method : 'POST' ,
                data : {
                    cosmetic_name : "Wipe-off cleansing micellar water",
                    oldcontent : "hey",
                    content : "heys",
                    starPoint : 4
                }
            }).then(function(response){
                console.log(response)
            })
        }
    })
})()