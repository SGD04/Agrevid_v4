angular.module('MyApp',['appRoutes','mainCtrl','authService','userCtrl','userService','playlistCtrl','playlistService','videoCtrl','videoService','ui.bootstrap'])

.config(function($httpProvider){
    $httpProvider.interceptors.push('AuthInterceptor');
});
