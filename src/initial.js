(function () {
	'use strict';

	angular
		.module('app', ['app-templates', 'ui.router', 'ui.bootstrap', 'angular-jsonrpc-client'])
		.config(['$stateProvider', '$urlRouterProvider', '$sceDelegateProvider', '$uibTooltipProvider', 'Config', 'jsonrpcConfigProvider', config])
		.run([run])


	function run() {

	}


	function config($stateProvider, $urlRouterProvider, $sceDelegateProvider, $uibTooltipProvider, Config, jsonrpcConfigProvider) {

		jsonrpcConfigProvider.set({
			url: Config.url,
			returnHttpPromise: true
		});

		var isTouchDevice = (('ontouchstart' in window) || (navigator.MaxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0));
		if (isTouchDevice) {
			$uibTooltipProvider.options({ trigger: 'dontTrigger' });
		} else {
			$uibTooltipProvider.options({ trigger: 'mouseenter outsideClick' });
		}

		$urlRouterProvider.otherwise("/");

		$stateProvider
			.state('main', {
				url: '/',
				views: {
					'nav': {
						templateUrl: 'views/nav.tpl.html',
						controller: 'NavController'
					},
					'main': {
						templateUrl: 'views/main.tpl.html',
						controller: 'MainController',
						controllerAs: 'ctrl'						
					}
				}
			})

			.state('editor', {
				url: '/editor',
				views: {
					'nav': {
						templateUrl: 'views/nav.tpl.html',
						controller: 'NavController'
					},
					'main': {
						templateUrl: 'views/editor.tpl.html',
						controller: 'EditorController',
						controllerAs: 'ctrl'						
					}
				}
			});


	}

})();