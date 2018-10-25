angular.module('videoService',[])

.factory('Video',function($http,$window) {
    let videoFactory = {};

    videoFactory.url = '';

    videoFactory.search = function (search) {
        return $http.get('/api/streamVideo/'+search.title);
    }

    videoFactory.setSearchTitle = function (searchTitle){
        if(searchTitle)
            $window.localStorage.setItem('search',searchTitle);
        else
            $window.localStorage.removeItem('search');
    }

    videoFactory.getSearchTitle = function (){
          return  $window.localStorage.getItem('search');

    }

    return videoFactory;
});