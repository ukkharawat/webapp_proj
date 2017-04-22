(function(){
    angular.module('listed' , [])
    .controller('controllers' , function($scope , $http){
        $scope.edit = function(){
            $http({
                url: '/editCosmetic',
                method: 'POST',
                data: {
                    name: $scope.name,
                    type: $scope.type,
                    collection: $scope.collection,
                    brand: $scope.brand,
                    detail: $scope.detail,
                    id: $scope.id
                }
            })
            .then(function(response){
                console.log(response)
            })
        },
        $scope.submit = function(){
            if($scope.search){
                $scope.data = []
                searchBigger = $scope.search.toUpperCase()
                for(i = 0 ; i < $scope.objs.length ; i++){
                    if($scope.objs[i].brand.toUpperCase().includes(searchBigger) 
                    || $scope.objs[i].type.toUpperCase().includes(searchBigger)  
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
        }
    })
})