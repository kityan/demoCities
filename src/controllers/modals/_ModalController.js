(function () {
	'use strict';

	angular
		.module('app')
		.controller('_ModalController', ['$scope', '$uibModalInstance', Controller]);

	function Controller($scope, $uibModalInstance) {

		$scope.close = close;
		$scope.cancel = close;

		function close() {
			$uibModalInstance.dismiss();
		}


	}

})();

