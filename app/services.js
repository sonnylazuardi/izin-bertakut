angular.module('BertakutApp.services', [])

.factory("Auth", ["$firebaseAuth", function($firebaseAuth) {
  var ref = new Firebase("https://izin-bertakut.firebaseio.com/");
  return $firebaseAuth(ref);
}]);