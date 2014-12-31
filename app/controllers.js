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
    $http.get('https://graph.facebook.com/v2.2/me/friends?access_token='+access).success(function(data) {
        console.log(data);
    });
    $.getJSON('https://graph.facebook.com/v2.2/me/friends?access_token='+access, function(data) {
        console.log(data);
    });
})

.controller('AboutCtrl', function($scope, Auth) {

})

.controller('HonorCtrl', function($scope, Auth) {

});
