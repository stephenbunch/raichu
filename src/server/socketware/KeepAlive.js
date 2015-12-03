export default [
  'setTimeout', 'clearTimeout',
function( setTimeout, clearTimeout ) {
  return class KeepAlive {
    constructor( pingInterval ) {
      this._pingInterval = pingInterval;
    }

    async invokeAsync( socket, next ) {
      var pingTimer;
      var ping = () => {
        pingTimer = setTimeout( () => {
          socket.send( JSON.stringify({ type: 'ping', data: 1 }) );
          ping();
        }, this._pingInterval );
      };
      socket.onClose += () => clearTimeout( pingTimer );
      ping();
      await next.invokeAsync( socket );
    }
  };
}];
