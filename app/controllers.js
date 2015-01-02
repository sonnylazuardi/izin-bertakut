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

.controller('DashboardCtrl', function($scope, Auth, $http, $state, $stateParams){
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
    var access = $scope.user.facebook.accessToken;
    $scope.state = $state;
    $scope.search = $stateParams.search;
    $scope.people = [];
    $scope.loading = false;
    $scope.searching = function() {
        $scope.loading = true;
        $http.get('https://graph.facebook.com/v2.2/search?q='+$scope.search+'&type=user&access_token='+access).success(function(data) {
            $scope.loading = false;
            $scope.people = data.data;
        });
    }
    if ($stateParams.search) {
        $scope.searching();
    }
    $scope.changed = function(keyEvent) {
        if (keyEvent.which === 13) {
            $state.go('dashboardsearch', {search: $scope.search});
        }
    }
})

.controller('AboutCtrl', function($scope, Auth) {

})

.controller('HonorCtrl', function($scope, Auth, $stateParams, $state, $timeout, fbURL, Takut, shareURL) {
    $scope.takuts = Takut;
    $scope.share_url = function(id) {
        return shareURL + '#!/share/' + id;
    }

})

.controller('TakutCtrl', function($scope, Auth, $stateParams, $state, Fabric, FabricConstants, Keypress, $timeout, fbURL) {
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
    $scope.fbid = $stateParams.id;
    $scope.name = $stateParams.name;

    $scope.fabric = {};
    $scope.FabricConstants = FabricConstants;
    $scope.message = '';
    $scope.view = {
        loading: false
    };

    //
    // Creating Canvas Objects
    // ================================================================
    $scope.addShape = function(path) {
        return $scope.fabric.addShape('img/takut.svg');
    };

    $scope.addImage = function(image) {
        return $scope.fabric.addImage('imgdata.php?url=http://graph.facebook.com/'+$scope.fbid+'/picture?type=square|width=450|height=450');
    };

    $scope.addImageUpload = function(data) {
        var obj = angular.fromJson(data);
        $scope.addImage(obj.filename);
    };

    $scope.canvas = {
        image: ''
    };

    $scope.save = function() {
        var message = {
            message: $scope.message.text,
            to: {
                id: $scope.fbid,
                name: $scope.name
            },
            from: {
                id: $scope.user.facebook.id,
                name: $scope.user.facebook.displayName 
            }
        };
        
        $scope.view.loading = true;
        var d = new Date();
        var hash = CryptoJS.SHA256(Math.random() + CryptoJS.SHA256($scope.fbid + $scope.name + d));
        var f1 = new Firebase(fbURL + 'takut/' + hash );
        f1.set(message);
        var f2 = new Firebase(fbURL + 'image/' + hash );
        f2.set($scope.fabric.getImageData(), function() { 
            alert('saved');
            $scope.view.loading = false;
            console.log(hash);
            $scope.$apply();
            $state.go('share', {id: hash});
        });    
    };

    //
    // Editing Canvas Size
    // ================================================================
    $scope.selectCanvas = function() {
        $scope.canvasCopy = {
            width: $scope.fabric.canvasOriginalWidth,
            height: $scope.fabric.canvasOriginalHeight
        };
    };

    $scope.setCanvasSize = function() {
        $scope.fabric.setCanvasSize($scope.canvasCopy.width, $scope.canvasCopy.height);
        $scope.fabric.setDirty(true);
        delete $scope.canvasCopy;
    };

    //
    // Init
    // ================================================================
    $scope.init = function() {
        $scope.fabric = new Fabric({
            JSONExportProperties: FabricConstants.JSONExportProperties,
            textDefaults: FabricConstants.textDefaults,
            shapeDefaults: FabricConstants.shapeDefaults,
            json: {}
        });
        $scope.addImage().then(function(object) {
            $scope.addShape().then(function(object) {
                $timeout(function() {
                    $scope.fabric.addCustomText('Izin Bertakut', 70, 20);
                }, 500);
                $timeout(function() {
                    $scope.message = $scope.fabric.addCustomText('Karena '+$scope.name+'\n...', 100, 12);
                }, 600);
            });
        });
    };

    $scope.$on('canvas:created', $scope.init);

    Keypress.onSave(function() {
        $scope.updatePage();
    });
})

.controller('ShareCtrl', function($scope, Auth, $stateParams, $state, Fabric, FabricConstants, Keypress, $timeout, fbURL, $http, shareURL) {
    $scope.auth = Auth;
    $scope.user = $scope.auth.$getAuth();
    $scope.idx = $stateParams.id;
    $scope.takut = {};
    $scope.image_id = $stateParams.id;
    $scope.share_url = shareURL + '#!/share/' + $scope.idx;

    $http.get(fbURL + 'takut/' + $scope.idx + '.json').success(function(data) {
        $scope.takut = data;
    });
    
});
