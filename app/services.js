angular.module('BertakutApp.services', [])

.value('fbURL', 'https://izin-bertakut.firebaseio.com/')

.value('shareURL', 'http://izin-bertakut.sonnylab.com/')

.factory('Takut', function($firebase, fbURL) {
    var ref = new Firebase(fbURL + 'takut');
    return $firebase(ref).$asArray();
})

.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://izin-bertakut.firebaseio.com/");
  return $firebaseAuth(ref);
}]);