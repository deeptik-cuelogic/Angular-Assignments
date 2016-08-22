var app = angular.module("login", ['ngStorage', 'ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
    .when("/dashboard", {
        templateUrl : "dashboard.html"
    });
});

app.service("credentials", function(){

  this.credentialList = function(){
  	return [
  			 { email: 'abc@yopmail.com', password: 'test123', id: 1 },
  	         { email: 'pqr@yopmail.com', passsword: 'test12234', id: 2 },
  	         { email: 'n@yopmail.com', passsword: '1223456789', id: 3 },
  	         { email: 'm@yopmail.com', passsword: '12345', id: 4 }
  	       ];
  };

});

app.service("employees", function(){
  this.userList = function(){
  	return [{
                "id": 1,
                "name": "Prasanna",
                "department": "Developer",
                "salary": 1000,
                "email": 'abc@yopmail.com'
            },{
                "id": 1,
                "name": "Ayush",
                "department": "I.T",
                "salary": 1000,
                "image": "resource/images/IMG_3050.JPG"
            }, {
                "id": 2,
                "name": "Bobo",
                "department": "Project manager",
                "salary": 100000,
                "image": "resource/images/textures-selection-nice-high-resolution_2165080.jpg"
            }, {
                "id": 3,
                "name": "Baby",
                "department": "developer",
                "salary": 2000,
                "image": "resource/images/404.png"
            }, {
                "id": 4,
                "name": "Nilesh",
                "department": "Designer",
                "salary": 5500,
                "image": "resource/images/6309_1280x800.jpg"
            }, {
                "id": 5,
                "name": "amol",
                "department": "Manager",
                "salary": 100500,
                "image": "resource/images/brand-avatar.jpg"
            }, {
                "id": 6,
                "name": "ganesh",
                "department": "Accountant",
                "salary": 1000,
                "image": "resource/images/ipgeo.png"
            }]
  };
});

app.service("loginService", ['credentials', '$http', '$rootScope', '$localStorage', function(credentials, $http, $rootScope, $localStorage) {

  var b = credentials.credentialList();

  this.validateUser = function(email, password){
  	 let valid_user = false;
  	for(let i = 0; i < b.length; i++){
  		if(b[i].email == email && b[i].password == password)
  			valid_user = true;
  	}
  	return valid_user;
  };

  this.setCredentials = function (email, password) {
     // var authdata = Base64.encode(username + ':' + password);

            $rootScope.currentUser = {
                    email: email,
                    password: password,
            };
            $http.defaults.headers.common['Authorization'] = 'Basic ' + email;
            $localStorage.currentUser = $rootScope.currentUser;
            console.log($localStorage);

        };

   this.clearCredentials = function () {
            $rootScope.currentUser = {};
            delete $localStorage.currentUser;
            // $localStorage.$reset();
            $http.defaults.headers.common.Authorization = 'Basic ';
        };
}]);

app.controller("LoginController", function($scope, loginService, $location, $window){

  //loginService.clearCredentials();

  $scope.submit = function(){
    var validUser = loginService.validateUser($scope.email, $scope.password);
	  if(validUser){
	    loginService.setCredentials($scope.email, $scope.password);
	    //$location.url('dashboard');
      $window.location.href = 'dashboard.html';
    }
    else{
      $scope.error = 'Invalid Username/Password';
    }
  };

});

app.controller('dashboardController', function($scope, employees, $localStorage){
	var emp = employees.userList();
  var user_name = '';
	emp.map(function(obj) {
		  if(obj.email == $localStorage.currentUser.email)
			 user_name = obj.name;
	});

	$scope.name = user_name;
});