angular.module('playlistCtrl',['playlistService'])

    .controller('playlistCtrl',function (Playlist, User, Auth, $window, $location, $scope) {
        let vm = this;
        $scope.array = [];
        $scope.arrayNomPlaylist = [];
        $scope.arrayplaylist = [];
        $scope.selectedPlaylist = [];
        $scope.selectedVideo = '';
        vm.userId = '';
        vm.playlistData = {};



        vm.createUserPlaylist = function(){
            vm.message = '';
            let charInterdits = ["\""];

                for(let i=0; i<charInterdits.length; i++){
                    if(vm.playlistData.namePlaylist.includes(charInterdits[i])){
                        $window.alert("Le nom de la playlist ne peut pas contenir de "+charInterdits[i]);
                        return;
                    }
                }

                Auth.getUser().then(function(response){
                    vm.userId = response.data.id;

                    Playlist.create(vm.userId, vm.playlistData.namePlaylist)
                        .then(function(response){
                            vm.playlistData = {};
                            vm.message = response.data.message;
                        });
                });
            $window.alert('Playlist '+vm.playlistData.namePlaylist+ ' ajouter !');
        };

        vm.getListPlaylist = function(){

            Auth.getUser().then(function(response) {
                vm.userId = response.data.id;
                $scope.array = [];
                $scope.arrayplaylist = [];
                $scope.arrayNomPlaylist = [];

                Playlist.get(vm.userId).then(function (res) {
                    console.log('Playlist recuperer ');

                    angular.forEach((res.data), function(element) {
                        $scope.array.push(element);
                        $scope.arrayplaylist.push(element.playlist);
                    });
                    //$window.alert($scope.array[2].namePlaylist);
                    angular.forEach($scope.array, function(element) {
                        $scope.arrayNomPlaylist.push((element.namePlaylist));
                    });
                });
                //$window.alert($scope.arrayplaylist);

            });

            //$route.reload();
        };
        vm.goToPlaylist = function(){
          vm.getListPlaylist();
            $location.path('/playlist');
        };


        vm.getListNomPlaylist = function(){
            vm.getListPlaylist();
            //$window.alert($scope.arrayNomPlaylist);
        };

        vm.deletePlaylist = function(namePlaylist){
            Auth.getUser().then(function(response) {
                vm.userId = response.data.id;
                Playlist.delete(vm.userId,namePlaylist).success(function () {
                    $window.alert('Playlist '+namePlaylist+ ' deleted !');
                });
            });
        };

        vm.addVideo = function(playlist,video){
            Auth.getUser().then(function(response) {
                vm.userId = response.data.id;
                Playlist.addVideo(vm.userId, playlist, video).success(function () {
                    $window.alert('video ajouter à la playlist ' + playlist.namePlaylist);
                });
            });
        };

        vm.deleteVideo = function(playlist, video){

            Auth.getUser().then(function(response) {
                vm.userId = response.data.id;
                Playlist.deleteVideo(vm.userId, playlist.namePlaylist, video).success(function () {
                    $window.alert('video enlever de la playlist '+ playlist.namePlaylist);
                });
            });
        };

        vm.createAndAdd = function(playlist,video){
            //vm.message = '';
            /*Auth.getUser().then(function(response){
                vm.userId = response.data.id;

                Playlist.create(vm.userId, playlist)
                    .success(function(response){
                        vm.message = response.data.message;
                        $window.alert('playlist '+ playlist +' a été créé');
                    });
                Playlist.addVideo(vm.userId, playlist,video).success(function () {
                    $window.alert('video ajouter à la playlist '+ playlist);
                });
            });*/
            vm.playlistData.namePlaylist = playlist;
            vm.createUserPlaylist();
            vm.addVideo(playlist,video);
        };

        vm.goToVideoPlaylist = function(playlist,video){
            $scope.selectedPlaylist = [];
            $scope.selectedVideo = '';
            $scope.selectedPlaylist = playlist;
            $scope.selectedVideo = video;

            //$window.alert("playlist = " + $scope.selectedPlaylist.namePlaylist + " video = " + $scope.selectedVideo);

            $location.path('/videoPlaylist');

        };


    });
