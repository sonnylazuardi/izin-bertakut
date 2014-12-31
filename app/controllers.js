angular.module('BertakutApp.controllers', [])

.controller('MenuCtrl', function($scope, Auth, $state) {
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
    $scope.logout = function() {
        $scope.auth.$unauth();
    }
    $scope.auth.$onAuth(function(authData) {
        $scope.user = $scope.auth.$getAuth();
        if (authData) {
            console.log("Logged in");
            console.log(authData);
            $state.go('dashboard');
        } else {
            console.log("Logged out");
            $state.go('home');
        }
    });
})

.controller('HomeCtrl', function($scope, Auth, $state) {
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
    $scope.login = function() {
        $scope.auth.$authWithOAuthPopup('facebook', {
            scope: 'email,user_friends'
        });
    }
})

.controller('DashboardCtrl', function($scope, Auth, $http){
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
    var access = $scope.user.facebook.accessToken;
    $scope.search = '';
    $scope.people = [];
    $scope.changed = function(keyEvent) {
        if (keyEvent.which === 13) {
            $http.get('https://graph.facebook.com/v2.2/search?q='+$scope.search+'&type=user&access_token='+access).success(function(data) {
                $scope.people = data.data;
            });
        }
    }
})

.controller('AboutCtrl', function($scope, Auth) {

})

.controller('HonorCtrl', function($scope, Auth) {

});
