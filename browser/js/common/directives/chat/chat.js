app.directive('chat', function(Socket) {
  return {
    restrict: 'E',
    templateUrl: '/js/common/directives/chat/chat.html',
    link: function(scope, element) {


      scope.messages = [
        'dadasd'


      ]
      var $chat = $('.chat-stuff')

      console.log("loading")
      Socket.on('chat message', function(info){
        $chat.append($('<li>').text(info.user +": " + info.msg));
        $chat.scrollTop($chat.get(0).scrollHeight)
      });


      scope.submit = function() {
        if (scope.message.length > 0) {
          console.log(scope.message)
          $chat.append($('<li>').text( scope.user.username + ': '+ scope.message))
          Socket.emit('chat message' , {user: scope.user.username, msg: scope.message})

          scope.message = ''
          $chat.scrollTop($chat.get(0).scrollHeight)


        }

      }
    }
  }
})

// app.controller('chatController', function(scope, Socket) {
//
//
//
//
//
//
//
//
// })
