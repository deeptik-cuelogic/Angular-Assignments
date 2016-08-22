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
                "email": 'abc@yopmail.com',
                "age": 29,
                "gender": 'Male'
            },{
                "id": 2,
                "name": "Ayush",
                "email": 'pqr@yopmail.com',
                "age": 30,
                "gender": 'Male'
            }, {
                "id": 3,
                "name": "Bobo",
                "email": 'pqr@yopmail.com',
                "age": 32,
                "gender": 'Male'
            }, {
                "id": 4,
                "name": "Baby",
                "email": 'pqr@yopmail.com',
                "age": 22,
                "gender": 'Female'
            }, {
                "id": 5,
                "name": "Nilesh",
                "email": 'pqr@yopmail.com',
                "age": 30,
                "gender": 'Male'
            }, {
                "id": 6,
                "name": "amol",
                "email": 'pqr@yopmail.com',
                "age": 32,
                "gender": 'Male'
            }, {
                "id": 7,
                "name": "ganesh",
                "email": 'pqr@yopmail.com',
                "age": 22,
                "gender": 'Male'
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


app.directive('ngConfirmRemove', [
  function(){
    return {
      restrict: 'A',
      link: function(scope, element, attrs){
        element.bind('click', function(e){
          var message = attrs.ngConfirmRemove;
          if(message && !confirm(message)){
            e.stopImmediatePropagation();
            e.preventDefault();
          }
        });
      }
    }
  }
]);

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

app.controller('dashboardController', function($scope, employees){

  $scope.emp_list = employees.userList();
  $scope.sort_reverse  = false
  $scope.sort_type = 'name';

  $scope.removeRow = function(name){
    var index = -1;
    var comArr = eval( $scope.emp_list );
    for( var i = 0; i < comArr.length; i++ ) {
      if( comArr[i].name === name ) {
        index = i;
        break;
      }
    }
    if( index === -1 ) {
      alert( "Something gone wrong" );
    }
    $scope.emp_list.splice( index, 1 );
  };

   $scope.cancel = function() {
    for (var i = $scope.users.length; i--;) {
      var user = $scope.users[i];
      // undelete
      if (user.isDeleted) {
        delete user.isDeleted;
      }
      // remove new
      if (user.isNew) {
        $scope.users.splice(i, 1);
      }
    };
  };
});


app.controller('employeeController', function($scope){

});