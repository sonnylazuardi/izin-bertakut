angular.module('BertakutApp', [
    'ui.router',
    'BertakutApp.routes',
    'BertakutApp.controllers',
    'BertakutApp.services',
    'common.fabric',
    'common.fabric.utilities',
    'common.fabric.constants',
    'djds4rce.angular-socialshare',
    'firebase'
])

.run(function($FB) {
    $FB.init('1535383350053244');
});
