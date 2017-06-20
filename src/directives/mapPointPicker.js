(function () {
	'use strict';

	angular.module('app')
		.directive('mapPointPicker', ['$window', leaflet]);


	function leaflet($window) {
		return {
			restrict: "E",
			template: '',
			scope: {
				lat: '<',
				lon: '<',
				clicked: '&'
			},
			link: function (scope, elem, attrs) {

				var div = angular.element('<div style="height: 100%; width: 100%; display: block;"></div>');
				var tileLayer;

				elem.append(div);

				var mymap = $window.L.map(div[0], {
					center: [scope.lat || 55, scope.lon || 37],
					zoom: 6
				});

				var marker;

				scope.$watch('lat', panTo)
				scope.$watch('lon', panTo)

				function panTo() {
					if (scope.lat != undefined && scope.lon != undefined) {
						mymap.panTo(new L.LatLng(scope.lat, scope.lon));
						if (marker) {
							mymap.removeLayer(marker);
						}
						marker = L.marker([scope.lat, scope.lon]).addTo(mymap);
					}
				}

				// fix bug?
				mymap._onResize();


				// клик, но так чтобы не мешал
				var dragged = false;
				mymap.on('dragstart', function () { dragged = true; });
				mymap.on('dragend', function () { dragged = false; });
				mymap.on('click', function (e) {
					if (!dragged) {
						scope.$apply(function () {
							scope.clicked({ lat: e.latlng.lat, lon: e.latlng.lng % 180})
						});
					}
				});

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