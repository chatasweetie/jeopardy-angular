var app = angular.module('gameApp', []); 

app.controller('gameCtrl', ['$scope', '$log', function($scope, $log) {
	$scope.$log = $log;

	$scope.title = 'Jeopardy';
	$scope.showQuestion = function(QandA) {
		$log.log(QandA);

	}
	$scope.round = {
					'name':'Game 1',
					'categories': {
								'Command Line': {
												'100':
													{'Question 1': 'Answer 1'},
												'200': 
													{'Question 2' : 'Answer 2'}
												},
								'TV': {
												'100':
													{'Question TV 1': 'Answer 1'},
												'200': 
													{'Question TV 2' : 'Answer 2'}
												},
								'Movies' : {
												'100':
													{'Question Movie 1': 'Answer 1'},
												'200': 
													{'Question Movie 2' : 'Answer 2'}
												},

								}
					}
	}])