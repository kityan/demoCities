(function () {
	'use strict';

	angular
		.module('app')
		.factory('Cities', ['jsonrpc', 'Config', '$q', Service]);

	function Service(jsonrpc, Config, $q) {

		var cities;
		var obj = {};
		var commonParams = { key: Config.key };


		// запрос всего перечня
		obj.getAll = function () {
			var defer = $q.defer();
			if (cities) {
				defer.resolve(cities);
			} else {
				jsonrpc.request('get_cities', angular.merge({}, commonParams)).then(function (r) {
					if (r.data.result) {
						cities = r.data.result;
						defer.resolve(cities)
					} else {
						defer.reject();
					}
				}, function () {
					defer.reject();
				})
			}
			return defer.promise;
		}


		// создание города
		obj.createCity = function (name, lat, lon) {
			var defer = $q.defer();
			var city = {
				name: name,
				lat: lat,
				lon: lon
			}
			jsonrpc.request('create_city', angular.merge({}, commonParams, city)).then(function (r) {
				if (r.data.result) {
					cities.push({ city_name: name, lat: lat, lon: lon, city_id: r.data.result, districts: [] });
					defer.resolve(r);
				} else {
					defer.reject();
				}
			}, function () {
				defer.reject();
			})
			return defer.promise;
		}


		// удаление города
		obj.deleteCity = function (id) {
			var defer = $q.defer();
			jsonrpc.request('delete_city', angular.merge({}, commonParams, { city_id: id })).then(function (r) {
				if (r.data.result == id) {
					for (var i in cities) {
						if (cities[i].city_id == id) {
							cities.splice(i, 1);
							break;
						}
					}

					defer.resolve();
				} else {
					defer.reject();
				}
			}, function () {
				defer.reject();
			})
			return defer.promise;
		}


		// редактирование города
		obj.setCity = function (id, name, lat, lon) {
			var defer = $q.defer();
			var city = {
				city_id: id,
				name: name,
				lat: lat,
				lon: lon
			}
			jsonrpc.request('set_city', angular.merge({}, commonParams, city)).then(function (r) {
				if (r.data.result) {
					for (var i in cities) {
						if (cities[i].city_id == id) {
							cities[i].city_name = city.name;
							cities[i].lat = city.lat;
							cities[i].lon = city.lon;
							break;
						}
					}
					defer.resolve(r);
				} else {
					defer.reject();
				}
			}, function () {
				defer.reject();
			})
			return defer.promise;
		}


		// создание района
		obj.createDistrict = function (name, population, city_id) {
			var defer = $q.defer();
			var district = {
				name: name,
				population: population,
				city_id: city_id
			}
			jsonrpc.request('create_district', angular.merge({}, commonParams, district)).then(function (r) {
				if (r.data.result) {
					for (var i in cities) {
						if (cities[i].city_id == city_id) {
							cities[i].districts.push({ district_id: r.data.result, name: name, population: population })
						}
					}
					defer.resolve(r);
				} else {
					defer.reject();
				}
			}, function () {
				defer.reject();
			})
			return defer.promise;
		}


		// удаление района
		obj.deleteDistrict = function (id, city_id) {
			var defer = $q.defer();
			jsonrpc.request('delete_district', angular.merge({}, commonParams, { district_id: id })).then(function (r) {
				if (r.data.result == id) {
					for (var i in cities) {
						if (cities[i].city_id == city_id) {
							for (var j in cities[i].districts) {
								if (cities[i].districts[j].district_id == id) {
									cities[i].districts.splice(j, 1);
								}
							}
							break;
						}
					}
					defer.resolve();
				} else {
					defer.reject();
				}
			}, function () {
				defer.reject();
			})
			return defer.promise;
		}


		// редактирование района
		obj.setDistrict = function (id, name, population, city_id) {
			var defer = $q.defer();
			var district = {
				district_id: id,
				name: name,
				population: population
			}
			jsonrpc.request('set_district', angular.merge({}, commonParams, district)).then(function (r) {
				if (r.data.result) {
					for (var i in cities) {
						if (cities[i].city_id == city_id) {
							for (var j in cities[i].districts) {
								if (cities[i].districts[j].district_id == id) {
									cities[i].districts[j].name = name;
									cities[i].districts[j].population = population;
								}
							}
							break;
						}
					}
					defer.resolve(r);
				} else {
					defer.reject();
				}
			}, function () {
				defer.reject();
			})
			return defer.promise;
		}




		return obj;

	};

})();