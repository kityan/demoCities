(function () {
	'use strict';

	angular.module('app')
		.directive('map', ['$window', leaflet]);


	function leaflet($window) {
		return {
			restrict: "E",
			template: '',
			scope: {
				points: '<',
				selected: '&'
			},
			link: function (scope, elem, attrs) {

				var div = angular.element('<div style="height: 100%; width: 100%; display: block;"></div>');
				var tileLayer;

				elem.append(div);

				var mymap = $window.L.map(div[0], {
					center: [55, 37],
					zoom: 6
				});

				var marker;

				scope.$watch('points', setMarkers);

				function setMarkers() {
					if (!scope.points) { return; }
					console.log(scope.points)

					for (var i in scope.points) {
						(function (i) {
							L.marker([scope.points[i].lat, scope.points[i].lon])
								.on('click', function () {
									scope.$apply(function () {
										scope.selected({index: i});
									});
								})

								.addTo(mymap);
						})(i)
					}
				}


				// fix bug?
				mymap._onResize();


				$window.L.tileLayer(
					'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
					{
						attribution: 'Map data &copy; <a href="http://osm.org">OpenStreetMap</a> contributors',
						maxZoom: 18,
						detectRetina: false,
						updateWhenZooming: false,
						updateWhenIdle: true,
						reuseTiles: false
					}
				).addTo(mymap);



			}
		}
	}


})();