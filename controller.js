var app = angular.module('gameApp', ['angularModalService']); 

app.controller('gameCtrl', ['$scope', '$log', 'ModalService', function($scope, $log, ModalService) {
	$scope.$log = $log;
    $scope.player1 = {'name': 'Player 1', 'score': 0};
    $scope.player2 = {'name': 'Player 2', 'score': 0};
    $scope.showOption = true;

	$scope.title = 'Jeopardy!';
	$scope.showQuestion = function(QandA) {
		$log.log(QandA);
	};
	$scope.round = {
					'name':'Game 1',
					'categories': {
								'Command Line': {
												'100':
													{'Is another name for Command Line': 'What is Shell, GUI, Terminal or Console?'},
												'200':
													{'It\s acronym is pwd.' : 'What is Print Working Directory?'},
                                                '300':
                                                    {'A command to see the built in manual' : 'What is "man"?'},
                                                '400':
                                                    {'A command to print to STDOUT' : 'What is "echo"?'},
                                                '500':
                                                    {'A command to seach within files' : 'What is "grep"?'},
												},
								'TV': {
												'100':
                                                    {'What is the show Bonanza?': 'A weekly television series on NBC was the first to air completely in color in 1959'},
                                                '200':
                                                    {'What is The Huxtable Family?' : 'The family name of the main characters in the Cosby Show which ran from 1984-1992'},
                                                '300':
                                                    {'What is Sesame Street?' : 'A popular children show that debuted on PBS in 1969'},
                                                '400':
                                                    {'Who is Ruby Rose?' : 'The breakout star who played Stella Carlin on the third season of Orange Is the New Black'},
                                                '500':
                                                    {'Who is Bill Murray?' : 'The last guest on the Late Show with David Letterman'},
												},
								'Movies' : {
												'100':
                                                    {'Who is Sam Smith?': 'Sings the theme song for "Spectre", the new James Bond film'},
                                                '200':
                                                    {'Who is Furiosa?' : 'Charlize Theron played this bad-ass character in "Mad Max: Fury Road"'},
                                                '300':
                                                    {'What is Birdman?' : 'Won the Best Picture at the 2015 Academy Awards'},
                                                '400':
                                                    {'Who is Lebron James?' : 'Amy Schumers well-received comedy "Trainwreck" co-starred which famous NBA player'},
                                                '500':
                                                    {'Who is Emma Watson?' : 'Cast as Belle in the upcoming Disney live-action "Beauty and the Beast"'},
												},
								
                                'Python': {
                                                '100':
                                                    {'The hardest part of programming': 'What is naming variables?'},
                                                '200':
                                                    {'A one-line summary for fucntions' : 'What is Docstrings?'},
                                                '300':
                                                    {'The data structure that range() returns' : 'What is list?'},
                                                '400':
                                                    {'The list of things defined for a function to receive' : 'What are parameters?'},
                                                '500':
                                                    {'The Zen of Python poem prints out using this command' : 'What is "import this"?'},
                                                },
                                'Ada or Grace': {
                                                '100':
                                                    {'She is the first computer programmer in history': 'Who is Ada?'},
                                                '200':
                                                    {'She retired from the navy at the standard age of 60, but was repeatedly recalled until her eighties' : 'Who is Grace?'},
                                                '300':
                                                    {'Her most famous quotes, which is often attributed to others, is: "It\'s easier to ask forgiveness than it is to get permission."' : 'Who is Grace?'},
                                                '400':
                                                    {'She was described as "The most coarse and vulgar woman in England. . ."' : 'Who is Ada?'},
                                                '500':
                                                    {'When she was younger she believed she could fly, and wrote illustrated a guide called “Flyology"' : 'Who is Ada?'},
                                                },
                                'Staff' : {
                                                '100':
                                                    {'Used to live in a communal, falling-down 28-room mansion in baltimore': 'Who is Joel?'},
                                                '200':
                                                    {'Carried Stephen Hawking\'s wheelchair with him in it' : 'Who is Henry?'},
                                                '300':
                                                    {'Answer 2' : 'Who is Meggie?'},
                                                '400':
                                                    {'This person\s great-great-great uncle was president of Mexico' : 'Who is Leslie?'},
                                                '500':
                                                    {'Bungy jumped off the 3rd largest bungy jump distance in the world' : 'Who is Ally?'},
                                                },
                                }			
                    };
    $scope.init = function(){
        ModalService.showModal({
            templateUrl: 'splash.html',
            controller: 'ModalController',
            scope: $scope,
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    }
    $scope.loss = function(player, dollars) {
        player.score -= Number(dollars);
        $log.log(player.name + " " + player.score);
    };
	$scope.showQ = function(QandA, dollars) {
        ModalService.showModal({
            templateUrl: 'question.html',
            controller: "ModalController",
            scope: $scope,
        }).then(function(modal) {
            modal.element.modal();
            $scope.currentQ = Object.keys(QandA)[0];
            $scope.currentA = QandA[$scope.currentQ];
            $scope.dollars = dollars;
            $scope.wrong1 = false;
            $scope.wrong2 = false;
            modal.close.then(function(player) {
                player.score += Number(dollars);
                $scope.showA();
                $log.log(player.name + " " + player.score);
            });
            // modal.loss.then(function(player) {
            //     player.score -= Number(dollars);
            //     $log.log(player.name + " " + player.score);
            // });
        });
    };

    $scope.showA = function() {
        ModalService.showModal({
            templateUrl: 'answer.html',
            controller: "ModalController",
            scope: $scope,
        }).then(function(modal) {
            modal.element.modal();
            modal.close.then(function(result) {
            });
        });
    };

	}]);

app.controller('ModalController', function($scope, close) {
  
 $scope.close = function(result) {
 	close(result, 500); // close, but give 500ms for bootstrap to animate
 };

});