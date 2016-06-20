export default [
  'setTimeout', 'clearTimeout',
function( setTimeout, clearTimeout ) {
  return class KeepAlive {
    constructor( pingInterval ) {
      this._pingInterval = pingInterval;
    }

    async invokeAsync( socket, next ) {
      var channel = socket.channel();
      var pingTimer;
      var ping = () => {
        pingTimer = setTimeout( () => {
          channel.send( 'ping', 1 );
          ping();
        }, this._pingInterval );
      };
      channel.onClose += () => {
        clearTimeout( pingTimer );
      };
      ping();
      await next.invokeAsync( socket );
    }
  };
}];
