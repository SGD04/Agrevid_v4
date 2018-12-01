angular.module('playlistService',[])

    .factory('Playlist',function($http){
        let userFactory = {};

        userFactory.create = function(idUser, namePlaylist){
            return $http.post('/api/createPlaylist',{
                idUser : idUser,
                namePlaylist : namePlaylist
            });
        };

        userFactory.get = function(idUser){
            return $http.post('/api/getPlaylist', {idUser : idUser} );
        };

        userFactory.addVideo = function (idUser, namePlaylist, url) {
            return $http.post('/api/addVideoPlaylist',{
                idUser : idUser,
                namePlaylist : namePlaylist,
                url : url
            });
        };

        userFactory.deleteVideo = function (idUser, namePlaylist, url) {
            return $http.post('/api/deleteVideoPlaylist',{
                idUser: idUser,
                namePlaylist : namePlaylist,
                url : url
            });
        };

        userFactory.delete = function(idUser,namePlaylist){
            return $http.post('/api/deletePlaylist',{
                idUser : idUser,
                namePlaylist : namePlaylist
            });
        };

        return userFactory;
    });