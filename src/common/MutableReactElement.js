export default [
  'react', 'lodash.assign', 'immutable', 'querySelectorAll',
  'querySelector',
function( React, assign, Immutable, querySelectorAll, querySelector ) {
  return class MutableReactElement {
    constructor( element ) {
      if ( !React.isValidElement( element ) ) {
        throw new Error( 'Element must be a valid React element.' );
      }

      this._element = element;
      this._parentNode = null;

      this._props = assign( {}, element.props );
      this._children = this._props.children;
      delete this._props.children;

      Object.defineProperty( this._props, 'children', {
        get: () => {
          return this._children;
        }
      });

      if ( this._children ) {
        if (
          !Immutable.List.isList( this._children ) &&
          !Array.isArray( this._children )
        ) {
          this._children = [ this._children ];
        }
        this._children = new Immutable.List( this._children ).map( x => {
          return this._createChild( x );
        });
      } else {
        this._children = new Immutable.List();
      }
    }

    get isMutableReactElement() {
      return true;
    }

    get props() {
      return this._props;
    }

    get parentNode() {
      return this._parentNode;
    }

    get childNodes() {
      return this._children;
    }

    get nextSibling() {
      return this.parentNode.childNodes.get( this.parentNode.childNodes.indexOf( this ) + 1 );
    }

    querySelectorAll( selector ) {
      return querySelectorAll( this._children, selector );
    }

    querySelector( selector ) {
      return querySelector( this._children, selector );
    }

    appendChild( child ) {
      child = this._createChild( child );
      this._children = this._children.push( child );
      return child;
    }

    removeChild( child ) {
      var index = this._children.indexOf( child );
      if ( index > -1 ) {
        this._children = this._children.splice( index, 1 );
        child._parentNode = null;
      }
    }

    replaceChild( newChild, oldChild ) {
      var index = this._children.indexOf( oldChild );
      if ( index > -1 ) {
        newChild = this._createChild( newChild );
        this._children = this._children.splice( index, 1, newChild );
        oldChild._parentNode = null;
        return newChild;
      } else {
        throw new Error( 'Old child does not exist.' );
      }
    }

    insertBefore( newNode, referenceNode ) {
      var index = this._children.indexOf( referenceNode );
      if ( index > -1 ) {
        newNode = this._createChild( newNode );
        this._children = this._children.splice( index, 0, newNode );
        return newNode;
      } else {
        throw new Error( 'Refernce node does not exist.' );
      }
    }

    toElement() {
      var props = assign( {}, this._props );
      if ( this._children.size > 0 ) {
        props.children = this._children.map( x => {
          if ( x && x.isMutableReactElement ) {
            return x.toElement();
          } else {
            return x;
          }
        }).toArray();
      }
      return React.cloneElement( this._element, props );
    }

    _createChild( element ) {
      if ( React.isValidElement( element ) ) {
        element = new MutableReactElement( element );
      }
      if ( element && element.isMutableReactElement ) {
        element._parentNode = this;
      }
      return element;
    }
  };
}];
