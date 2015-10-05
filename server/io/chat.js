module.exports = (io,Socket) => {
  let chatMessages = [];
  Socket.on('chat message', function(message){
    chatMessages.push(message)
    Socket.broadcast.emit('chat message',message)
  })


}
