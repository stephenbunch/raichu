(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Raichu = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

exports['default'] = function (value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value) && !(0, _isSchema2['default'])(value);
};

;
module.exports = exports['default'];
},{"./isSchema":11}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

exports['default'] = transformObjectOutsideIn;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

/**
 * Transforms an object from the outside in. Nodes of objects passed to the
 * replacer function have not been transformed. The object is transformed first,
 * and if the result is a plain object, its nodes are also transformed.
 */

function transformObjectOutsideIn(object, replace) {
  object = replace(object);
  if ((0, _isPlainObject2['default'])(object)) {
    return Object.keys(object).reduce(function (result, key) {
      return _extends({}, result, _defineProperty({}, key, transformObjectOutsideIn(object[key], replace)));
    }, {});
  } else {
    return object;
  }
}

;
module.exports = exports['default'];
},{"./_isPlainObject":1}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _merge = require('./merge');

var _merge2 = _interopRequireDefault(_merge);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = {
  attributes: {
    type: 'any'
  },

  label: function label(name) {
    return this.extend({
      attributes: {
        label: name
      }
    });
  },

  cast: function cast(value, options) {
    if (value === undefined) {
      return null;
    } else {
      return value;
    }
  },

  attempt: function attempt(value, options) {
    var result = this.validate(value, options);
    if (result.error) {
      throw result.error;
    } else {
      return result.value;
    }
  },

  validate: function validate(value, options) {
    return { error: null, value: value };
  },

  path: function path(selector) {
    return this;
  },

  extend: function extend(spec) {
    return (0, _merge2['default'])({}, this, spec);
  },

  transform: function transform(_transform) {
    return this;
  },

  valid: function valid(values) {
    return this.extend({
      validate: function validate(value) {
        if (values.indexOf(value) === -1) {
          return (0, _fail2['default'])(this, 'is invalid');
        } else {
          return (0, _pass2['default'])(value);
        }
      }
    });
  },

  'default': function _default(defaultValue) {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        if (value === null || value === undefined) {
          return parent.cast.call(this, defaultValue, options);
        } else {
          return parent.cast.call(this, value, options);
        }
      },
      validate: function validate(value, options) {
        if (value === null || value === undefined) {
          return parent.validate.call(this, defaultValue, options);
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  },

  optional: function optional() {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        if (value === undefined) {
          return undefined;
        } else {
          return parent.cast.call(this, value, options);
        }
      },
      validate: function validate(value, options) {
        if (value === undefined) {
          return (0, _pass2['default'])(undefined);
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  }
};
module.exports = exports['default'];
},{"./fail":8,"./merge":12,"./pass":18}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = arrayOf;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

function arrayOf(schema) {
  schema = (0, _parse2['default'])(schema);
  return _any2['default'].extend({
    attributes: {
      type: 'array',
      schema: schema
    },

    cast: function cast(value, options) {
      if (Array.isArray(value)) {
        return value.map(function (x) {
          return schema.cast(x, options);
        });
      } else {
        return [];
      }
    },

    path: function path(selector) {
      return schema.path(selector);
    },

    validate: function validate(value) {
      var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

      if (!Array.isArray(value)) {
        return (0, _fail2['default'])(this, 'must be an array');
      } else {
        var retval = [];
        var errors = [];
        for (var i = 0; i < value.length; i++) {
          var item = value[i];
          var result = schema.label(schema.attributes.label || 'item ' + i).validate(item, options);
          if (result.error) {
            errors.push({
              key: i,
              message: result.error.message
            });
            if (options.abortEarly) {
              break;
            }
          } else {
            retval.push(result.value);
          }
        }
        if (errors.length > 0) {
          return (0, _fail2['default'])(this, errors);
        } else {
          return (0, _pass2['default'])(retval);
        }
      }
    },

    transform: function transform(_transform) {
      return arrayOf(_transform(schema));
    },

    length: function length(_length) {
      var parent = this;
      return this.extend({
        cast: function cast(value, options) {
          return parent.cast(value, options).slice(0, 2);
        },

        validate: function validate(value, options) {
          var result = parent.validate(value, options);
          if (result.error) {
            return result;
          } else {
            result.value = result.value.slice(0, 2);
            return result;
          }
        },

        transform: function transform(_transform2) {
          return parent.transform(_transform2).length(_length);
        }
      });
    }
  });
}

;
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./parse":17,"./pass":18}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'boolean'
  },

  cast: function cast(value) {
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    } else {
      value = !!value;
    }
    return value;
  },

  validate: function validate(value) {
    if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    if (typeof value !== 'boolean') {
      return (0, _fail2['default'])(this, 'must be a boolean');
    }
    return (0, _pass2['default'])(value);
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

exports['default'] = function (value) {
  return _any2['default'].extend({
    cast: function cast() {
      return value;
    },

    validate: function validate() {
      return {
        result: value,
        error: null
      };
    }
  });
};

;
module.exports = exports['default'];
},{"./any":3}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = _any2['default'].extend({
  cast: function cast(value) {
    if (value instanceof Date) {
      return value;
    } else {
      return new Date(value || null);
    }
  },

  validate: function validate(value) {
    if (!(value instanceof Date)) {
      value = new Date(value);
    }
    if (isNaN(value)) {
      return (0, _fail2['default'])(this, 'must be a valid date');
    } else {
      return (0, _pass2['default'])(value);
    }
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

exports['default'] = function (schema, reason) {
  if (!(0, _isSchema2['default'])(schema)) {
    throw new Error('Expected first argument to be a schema.');
  }
  var error = new Error();
  error.name = 'ValidationError';
  if (typeof reason === 'string') {
    error.message = '"' + (schema.attributes.label || 'value') + '" ' + reason;
  } else if (Array.isArray(reason)) {
    error.message = '"' + (schema.attributes.label || 'value') + '" fails because [' + reason[0].message + ']';
    error.details = reason;
  } else {
    throw new Error('Expected failure reason to be a string, error, or an array.');
  }
  return {
    error: error,
    value: null
  };
};

;
module.exports = exports['default'];
},{"./isSchema":11}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'function'
  },

  cast: function cast(value) {
    if (typeof value === 'function') {
      return value;
    } else {
      return function () {};
    }
  },

  validate: function validate(value) {
    if (typeof value !== 'function') {
      return (0, _fail2['default'])(this, 'must be a function');
    } else {
      return (0, _pass2['default'])(value);
    }
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _arrayOf = require('./arrayOf');

var _arrayOf2 = _interopRequireDefault(_arrayOf);

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _constant = require('./constant');

var _constant2 = _interopRequireDefault(_constant);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _func = require('./func');

var _func2 = _interopRequireDefault(_func);

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _nullableOf = require('./nullableOf');

var _nullableOf2 = _interopRequireDefault(_nullableOf);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _oneOf = require('./oneOf');

var _oneOf2 = _interopRequireDefault(_oneOf);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _struct = require('./struct');

var _struct2 = _interopRequireDefault(_struct);

var _transformObject = require('./transformObject');

var _transformObject2 = _interopRequireDefault(_transformObject);

var _vm = require('./vm');

var _vm2 = _interopRequireDefault(_vm);

exports['default'] = {
  any: _any2['default'],
  arrayOf: _arrayOf2['default'],
  boolean: _boolean2['default'],
  constant: _constant2['default'],
  date: _date2['default'],
  fail: _fail2['default'],
  func: _func2['default'],
  isSchema: _isSchema2['default'],
  nullableOf: _nullableOf2['default'],
  number: _number2['default'],
  object: _object2['default'],
  oneOf: _oneOf2['default'],
  parse: _parse2['default'],
  pass: _pass2['default'],
  shape: _shape2['default'],
  string: _string2['default'],
  struct: _struct2['default'],
  transformObject: _transformObject2['default'],
  vm: _vm2['default']
};
module.exports = exports['default'];
},{"./any":3,"./arrayOf":4,"./boolean":5,"./constant":6,"./date":7,"./fail":8,"./func":9,"./isSchema":11,"./nullableOf":13,"./number":14,"./object":15,"./oneOf":16,"./parse":17,"./pass":18,"./shape":19,"./string":20,"./struct":21,"./transformObject":22,"./vm":23}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function (value) {
  return value && typeof value === 'object' && typeof value.cast === 'function';
};

;
module.exports = exports['default'];
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = merge;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

function merge(object) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _len = arguments.length, sources = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      sources[_key - 1] = arguments[_key];
    }

    for (var _iterator = sources[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var source = _step.value;

      for (var key in source) {
        if (source[key] === undefined) {
          delete object[key];
        } else if ((0, _isPlainObject2['default'])(source[key]) && (0, _isPlainObject2['default'])(object[key])) {
          object[key] = merge({}, object[key], source[key]);
        } else {
          object[key] = source[key];
        }
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator['return']) {
        _iterator['return']();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return object;
}

;
module.exports = exports['default'];
},{"./_isPlainObject":1}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = nullableOf;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

function nullableOf(schema) {
  schema = (0, _parse2['default'])(schema);
  return _any2['default'].extend({
    attributes: {
      type: 'nullable',
      schema: schema
    },

    cast: function cast(value, options) {
      if (value === undefined || value === null) {
        return null;
      } else {
        return schema.cast(value, options);
      }
    },

    validate: function validate(value, options) {
      if (value === undefined || value === null) {
        return (0, _pass2['default'])(null);
      } else {
        return schema.validate(value, options);
      }
    },

    path: function path(selector) {
      return schema.path(selector);
    },

    transform: function transform(_transform) {
      return nullableOf(_transform(schema));
    }
  });
}

;
module.exports = exports['default'];
},{"./any":3,"./parse":17,"./pass":18}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'number'
  },

  cast: function cast(value) {
    value = Number(value);
    if (isNaN(value)) {
      return 0;
    }
    return value;
  },

  validate: function validate(value) {
    if (isNaN(value)) {
      return (0, _fail2['default'])(this, 'must be a number');
    }
    return (0, _pass2['default'])(Number(value));
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

exports['default'] = _any2['default'].extend({
  attributes: {
    title: 'object'
  },

  cast: function cast(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return {};
    } else {
      return value;
    }
  },

  validate: function validate(value) {
    if (!value || typeof value !== 'object' || Array.isArray(value)) {
      return (0, _fail2['default'])(this, 'must be an object');
    } else {
      return (0, _pass2['default'])(value);
    }
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = oneOf;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

function oneOf(discriminator, schemas) {
  for (var _key in schemas) {
    schemas[_key] = (0, _parse2['default'])(schemas[_key]);
  }
  return _any2['default'].extend({
    attributes: {
      type: 'discriminator',
      schemas: schemas
    },

    path: function path(selector) {
      var _selector$split = selector.split('.');

      var _selector$split2 = _toArray(_selector$split);

      var discriminator = _selector$split2[0];

      var rest = _selector$split2.slice(1);

      if (!schemas[discriminator]) {
        var keys = Object.keys(this.attributes.schemas);
        throw new Error('Discriminator at "' + selector + '" must be one of ' + keys.join(', '));
      }
      return schemas[discriminator].path(rest.join('.'));
    },

    cast: function cast(value, options) {
      if (typeof value === 'object' && value !== null && schemas[value[discriminator]]) {
        return schemas[value[discriminator]].cast(value);
      }
    },

    validate: function validate(value, options) {
      if (typeof value !== 'object' || value === null) {
        return (0, _fail2['default'])(this, 'must be an object');
      }
      if (!schemas[value[discriminator]]) {
        var keys = Object.keys(this.attributes.schemas);
        return (0, _fail2['default'])(this, discriminator + ' must be one of ' + keys.join(', '));
      }
      return schemas[value[discriminator]].cast(value, options);
    },

    transform: function transform(_transform) {
      var schemas = {};
      for (key in this.attributes.schemas) {
        schemas[key] = _transform(this.attributes.schemas[key]);
      }
      return oneOf(discriminator, schemas);
    }
  });
}

;
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./parse":17}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = parse;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _arrayOf = require('./arrayOf');

var _arrayOf2 = _interopRequireDefault(_arrayOf);

var _boolean = require('./boolean');

var _boolean2 = _interopRequireDefault(_boolean);

var _date = require('./date');

var _date2 = _interopRequireDefault(_date);

var _func = require('./func');

var _func2 = _interopRequireDefault(_func);

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _number = require('./number');

var _number2 = _interopRequireDefault(_number);

var _object = require('./object');

var _object2 = _interopRequireDefault(_object);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

function parse(value) {
  if (typeof value === 'function') {
    if (value === String) {
      value = _string2['default'];
    } else if (value === Boolean) {
      value = _boolean2['default'];
    } else if (value === Number) {
      value = _number2['default'];
    } else if (value === Object) {
      value = _object2['default'];
    } else if (value === Date) {
      value = _date2['default'];
    } else if (value === Function) {
      value = _func2['default'];
    } else {
      value = _any2['default'].extend({
        cast: value
      });
    }
  } else if (Array.isArray(value)) {
    value = (0, _arrayOf2['default'])(parse(value[0] || _any2['default']));
  } else if (!(0, _isSchema2['default'])(value)) {
    if (typeof value === 'object' && value !== null) {
      value = (0, _shape2['default'])(value);
    } else {
      throw new Error('Cannot parse schema value \'' + value + '\' (' + typeof value + ').');
    }
  }
  return value;
}

;
module.exports = exports['default'];
},{"./any":3,"./arrayOf":4,"./boolean":5,"./date":7,"./func":9,"./isSchema":11,"./number":14,"./object":15,"./shape":19,"./string":20}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports["default"] = function (value) {
  return { error: null, value: value };
};

;
module.exports = exports["default"];
},{}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = shape;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _toArray(arr) {
  return Array.isArray(arr) ? arr : Array.from(arr);
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _transformObject = require('./transformObject');

var _transformObject2 = _interopRequireDefault(_transformObject);

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _merge2 = require('./merge');

var _merge3 = _interopRequireDefault(_merge2);

var _transformObjectOutsideIn = require('./_transformObjectOutsideIn');

var _transformObjectOutsideIn2 = _interopRequireDefault(_transformObjectOutsideIn);

function shape(_x2) {
  var _again = true;

  _function: while (_again) {
    var spec = _x2;
    _again = false;

    if ((0, _isSchema2['default'])(spec)) {
      if (spec.attributes.type === 'shape') {
        _x2 = spec.attributes.keys;
        _again = true;
        continue _function;
      } else {
        throw new Error('Argument must be a plain object or a shape schema.');
      }
    }
    return (0, _transformObject2['default'])(spec, function (spec) {
      for (var key in spec) {
        spec[key] = (0, _parse2['default'])(spec[key]);
      }
      return _any2['default'].extend({
        attributes: {
          type: 'shape',
          keys: spec
        },

        cast: function cast(value, options) {
          var retval = {};
          if (!(0, _isPlainObject2['default'])(value)) {
            value = {};
          }
          for (var key in this.attributes.keys) {
            var val = this.attributes.keys[key].cast(value[key]);
            if (val !== undefined) {
              retval[key] = val;
            }
          }
          return retval;
        },

        validate: function validate(value) {
          var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

          if (value === null || typeof value !== 'object') {
            return (0, _fail2['default'])(this, 'must be an object');
          }
          var errors = [];
          var retval = {};
          for (var key in this.attributes.keys) {
            var label = this.attributes.keys[key].attributes.label || key;
            var result = this.attributes.keys[key].label(label).validate(value[key], options);
            if (result.error) {
              errors.push({
                key: key,
                message: result.error.message
              });
              if (options.abortEarly) {
                break;
              }
            } else {
              if (result.value !== undefined) {
                retval[key] = result.value;
              }
            }
          }
          if (errors.length > 0) {
            return (0, _fail2['default'])(this, errors);
          }
          return (0, _pass2['default'])(retval);
        },

        path: function path(selector) {
          var _selector$split = selector.split('.');

          var _selector$split2 = _toArray(_selector$split);

          var top = _selector$split2[0];

          var rest = _selector$split2.slice(1);

          for (var key in this.attributes.keys) {
            if (key === top) {
              return this.attributes.keys[key].path(rest.join('.'));
            }
          }
          throw new Error('Path "' + selector + '" is invalid.');
        },

        without: function without() {
          var spec = {};

          for (var _len = arguments.length, keys = Array(_len), _key = 0; _key < _len; _key++) {
            keys[_key] = arguments[_key];
          }

          for (var key in this.attributes.keys) {
            if (keys.indexOf(key) === -1) {
              spec[key] = this.attributes.keys[key];
            } else {
              // delete the key
              spec[key] = undefined;
            }
          }
          return this.extend({
            attributes: {
              keys: spec
            }
          });
        },

        pluck: function pluck() {
          var spec = {};

          for (var _len2 = arguments.length, keys = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            keys[_key2] = arguments[_key2];
          }

          for (var key in this.attributes.keys) {
            if (keys.indexOf(key) > -1) {
              spec[key] = this.attributes.keys[key];
            } else {
              // delete the key
              spec[key] = undefined;
            }
          }
          return this.extend({
            attributes: {
              keys: spec
            }
          });
        },

        merge: function merge(spec) {
          spec = (0, _transformObjectOutsideIn2['default'])(shape(spec), function (x) {
            return x.attributes.type === 'shape' ? x.attributes.keys : x;
          });
          var self = (0, _transformObjectOutsideIn2['default'])(this, function (x) {
            return x.attributes.type === 'shape' ? x.attributes.keys : x;
          });
          return shape((0, _merge3['default'])(self, spec));
        },

        transform: function transform(_transform) {
          var spec = {};
          for (var key in this.attributes.keys) {
            spec[key] = _transform(this.attributes.keys[key].transform(_transform));
          }
          return this.extend({
            attributes: {
              keys: spec
            }
          });
        },

        unknown: function unknown() {
          var parent = this.transform(function (schema) {
            if (schema.attributes.type === 'shape') {
              return schema.unknown();
            } else {
              return schema;
            }
          });
          return parent.extend({
            attributes: {
              unknown: true
            },
            cast: function cast(value, options) {
              var retval = parent.cast.call(this, value, options);
              for (var key in value) {
                if (!this.attributes.keys[key]) {
                  if (value[key] !== undefined) {
                    retval[key] = value[key];
                  }
                }
              }
              return retval;
            },

            validate: function validate(value, options) {
              var result = parent.validate.call(this, value, options);
              if (result.value) {
                for (var key in value) {
                  if (!this.attributes.keys[key]) {
                    if (value[key] !== undefined) {
                      result.value[key] = value[key];
                    }
                  }
                }
              }
              return result;
            }
          });
        }
      });
    });
  }
}

;
module.exports = exports['default'];
},{"./_isPlainObject":1,"./_transformObjectOutsideIn":2,"./any":3,"./fail":8,"./isSchema":11,"./merge":12,"./parse":17,"./pass":18,"./transformObject":22}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _any = require('./any');

var _any2 = _interopRequireDefault(_any);

var _fail = require('./fail');

var _fail2 = _interopRequireDefault(_fail);

var _pass = require('./pass');

var _pass2 = _interopRequireDefault(_pass);

// http://stackoverflow.com/a/46181
var _email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

exports['default'] = _any2['default'].extend({
  attributes: {
    type: 'string'
  },

  cast: function cast(value) {
    return String(value || '');
  },

  validate: function validate(value) {
    if (!value || typeof value !== 'string') {
      return (0, _fail2['default'])(this, 'must be a non-empty string');
    }
    return (0, _pass2['default'])(value);
  },

  email: function email() {
    var parent = this;
    return this.extend({
      validate: function validate(value, options) {
        if (!_email.test(value)) {
          return (0, _fail2['default'])(this, 'must be an email');
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  },

  lowerCase: function lowerCase() {
    var parent = this;
    return this.extend({
      cast: function cast(value) {
        return parent.cast.call(this, value).toLowerCase();
      },
      validate: function validate(value, options) {
        var result = parent.validate.call(this, value, options);
        if (result.value) {
          result.value = result.value.toLowerCase();
        }
        return result;
      }
    });
  },

  upperCase: function upperCase() {
    var parent = this;
    return this.extend({
      cast: function cast(value) {
        return parent.cast.call(this, value).toUpperCase();
      },
      validate: function validate(value, options) {
        var result = parent.validate.call(this, value, options);
        if (result.value) {
          result.value = result.value.toUpperCase();
        }
        return result;
      }
    });
  },

  trim: function trim() {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        return parent.cast.call(this, value, options).trim();
      },
      validate: function validate(value, options) {
        var result = parent.validate.call(this, value, options);
        if (result.value) {
          result.value = result.value.trim();
        }
        return result;
      }
    });
  },

  'default': function _default(defaultValue) {
    var parent = this;
    return this.extend({
      cast: function cast(value, options) {
        if (!value) {
          return parent.cast.call(this, defaultValue, options);
        } else {
          return parent.cast.call(this, value, options);
        }
      },

      validate: function validate(value, options) {
        if (!value) {
          return parent.validate.call(this, defaultValue, options);
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  },

  optional: function optional() {
    var parent = this;
    return this.extend({
      attributes: {
        optional: true
      },

      cast: function cast(value, options) {
        if (!value) {
          return;
        } else {
          return parent.cast.call(this, value, options);
        }
      },

      validate: function validate(value, options) {
        if (!value) {
          return (0, _pass2['default'])();
        } else {
          return parent.validate.call(this, value, options);
        }
      }
    });
  }
});
module.exports = exports['default'];
},{"./any":3,"./fail":8,"./pass":18}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

exports['default'] = function (spec) {
  return (0, _shape2['default'])(spec).extend({
    attributes: {
      type: 'struct'
    }
  });
};

;
module.exports = exports['default'];
},{"./shape":19}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }return target;
};

exports['default'] = transformObject;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });
  } else {
    obj[key] = value;
  }return obj;
}

var _isPlainObject = require('./_isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

/**
 * Transforms an object from the inside out. The root object is assumed to be a
 * plain object, and its nodes are transformed before the object is passed to
 * the replacer function have already been transformed.
 */

function transformObject(object, replace) {
  if (!(0, _isPlainObject2['default'])(object)) {
    throw new Error('Object must be a plain object.');
  }
  return _transformObject(object, replace);
}

;

function _transformObject(object, replace) {
  return replace(Object.keys(object).reduce(function (result, key) {
    if ((0, _isPlainObject2['default'])(object[key])) {
      return _extends({}, result, _defineProperty({}, key, _transformObject(object[key], replace)));
    } else {
      return _extends({}, result, _defineProperty({}, key, object[key]));
    }
  }, {}));
}
module.exports = exports['default'];
},{"./_isPlainObject":1}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = vm;

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { 'default': obj };
}

var _isSchema = require('./isSchema');

var _isSchema2 = _interopRequireDefault(_isSchema);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _transformObject = require('./transformObject');

var _transformObject2 = _interopRequireDefault(_transformObject);

function vm(schema) {
  if ((0, _isSchema2['default'])(schema)) {
    if (schema.attributes.type !== 'shape') {
      throw new Error('Schema must be a shape.');
    }
  } else {
    schema = (0, _shape2['default'])(schema);
  }
  schema = schema.transform(function transform(node) {
    if (node.attributes.type === 'shape') {
      return vm(node);
    } else {
      return node;
    }
  });
  return schema.extend({
    attributes: {
      type: 'vm',
      keys: schema.attributes.keys
    },

    cast: function cast(source, options) {
      var _this = this;

      if (source === null || typeof source !== 'object') {
        source = {};
      }
      var model = {};

      var _loop = function _loop(key) {
        var _value = _this.attributes.keys[key].cast(source[key]);
        Object.defineProperty(model, key, {
          enumerable: true,
          configurable: true,
          get: function get() {
            return _value;
          },
          set: function set(value) {
            _value = _this.attributes.keys[key].cast(value);
          }
        });
      };

      for (var key in this.attributes.keys) {
        _loop(key);
      }
      return model;
    }
  });
}

;
module.exports = exports['default'];
},{"./isSchema":11,"./shape":19,"./transformObject":22}],24:[function(require,module,exports){
module.exports = require( './lib/index' );

},{"./lib/index":25}],25:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = bind;
var cacheKey = Symbol();

function bind(prototype, name, descriptor) {
  var func = descriptor.value;
  return {
    configurable: true,
    enumerable: false,
    get: function get() {
      if (!this[cacheKey]) {
        this[cacheKey] = {};
      }
      var cache = this[cacheKey];
      if (!cache[name]) {
        cache[name] = func.bind(this);
      }
      return cache[name];
    }
  };
}

;
module.exports = exports["default"];
},{}],26:[function(require,module,exports){
arguments[4][24][0].apply(exports,arguments)
},{"./lib/index":29,"dup":24}],27:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _Event = require('./Event');

var _Event2 = _interopRequireDefault(_Event);

var Delegate = (function () {
  function Delegate(context, hooks) {
    _classCallCheck(this, Delegate);

    this._context = context;
    this._hooks = hooks;

    if (this._hooks.valueOf) {
      this.valueOf = this._hooks.valueOf;
    }

    this.listeners = [];
    this.event = new _Event2['default'](this);
  }

  _createClass(Delegate, [{
    key: 'raise',
    value: function raise() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (this._hooks.raise) {
        this._hooks.raise.apply(this._context, args);
      } else {
        var run = this.listeners.slice();
        var i = 0,
            len = run.length;
        for (; i < len; i++) {
          run[i].apply(this._context, args);
        }
      }
    }
  }, {
    key: 'addListener',

    /**
     * Adds a listener to the delegate.
     * @param {Function} listener
     */
    value: function addListener(listener) {
      if (this._hooks.add) {
        this._hooks.add.call(this._context, listener);
      } else {
        this.listeners.push(listener);
        this._didChange();
      }
    }
  }, {
    key: 'addListenerOnce',

    /**
     * Adds a listener to the delegate that automatically removes itself when
     * invoked.
     * @param {Function} listener
     */
    value: function addListenerOnce(listener) {
      var self = this;
      this.addListener(function wrapper() {
        self.removeListener(wrapper);
        listener.apply(self._context, arguments);
      });
    }
  }, {
    key: 'removeListener',

    /**
     * Removes a listener from the delegate if it exists.
     * @param {Function} listener
     */
    value: function removeListener(listener) {
      if (this._hooks.remove) {
        this._hooks.remove.call(this._context, listener);
      } else {
        var index = this.listeners.indexOf(listener);
        if (index > -1) {
          this.listeners.splice(index, 1);
          this._didChange();
        }
      }
    }
  }, {
    key: 'clearListeners',

    /**
     * Removes all listeners.
     */
    value: function clearListeners() {
      if (this._hooks.clear) {
        this._hooks.clear.call(this._context);
      } else {
        if (this.listeners.length > 0) {
          this.listeners.length = 0;
          this._didChange();
        }
      }
    }
  }, {
    key: '_didChange',
    value: function _didChange() {
      if (this._hooks.didChange) {
        this._hooks.didChange.call(this._context, this.listeners.length);
      }
    }
  }]);

  return Delegate;
})();

exports['default'] = Delegate;
;
module.exports = exports['default'];
},{"./Event":28}],28:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Event = (function () {
  function Event(delegate) {
    _classCallCheck(this, Event);

    this._delegate = delegate;
  }

  _createClass(Event, [{
    key: "valueOf",
    value: function valueOf() {
      return this._delegate.valueOf.apply(this._delegate, arguments);
    }
  }, {
    key: "addListener",
    value: function addListener() {
      return this._delegate.addListener.apply(this._delegate, arguments);
    }
  }, {
    key: "addListenerOnce",
    value: function addListenerOnce() {
      return this._delegate.addListenerOnce.apply(this._delegate, arguments);
    }
  }, {
    key: "removeListener",
    value: function removeListener() {
      return this._delegate.removeListener.apply(this._delegate, arguments);
    }
  }, {
    key: "clearListeners",
    value: function clearListeners() {
      return this._delegate.clearListeners.apply(this._delegate, arguments);
    }
  }]);

  return Event;
})();

exports["default"] = Event;
;
module.exports = exports["default"];
},{}],29:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = event;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _Delegate = require('./Delegate');

var _Delegate2 = _interopRequireDefault(_Delegate);

/**
 * C#-style events implemented via fake operator overloading.
 * http://www.2ality.com/2011/12/fake-operator-overloading.html
 */

var operands = [];
var _valueOf;
var kDelegatesKey = Symbol();

function event(prototype, name, descriptor) {
  Object.defineProperty(prototype, '_' + name, {
    configurable: true,
    enumerable: false,
    get: function get() {
      return delegateForObject(this, name, descriptor.initializer);
    },
    set: function set(value) {
      delegateForObject(this, name, descriptor.initializer).set(value);
    }
  });
  return {
    configurable: true,
    enumerable: false,
    get: function get() {
      return delegateForObject(this, name, descriptor.initializer).event;
    },
    set: (function (_set) {
      function set(_x) {
        return _set.apply(this, arguments);
      }

      set.toString = function () {
        return _set.toString();
      };

      return set;
    })(function (value) {
      set(delegateForObject(this, name, descriptor.initializer), value);
    })
  };
}

function delegateForObject(context, name, initializer) {
  if (!context[kDelegatesKey]) {
    context[kDelegatesKey] = {};
  }
  var delegates = context[kDelegatesKey];
  if (!delegates[name]) {
    var hooks = initializer && initializer() || {};
    hooks.valueOf = valueOf;
    delegates[name] = new _Delegate2['default'](context, hooks);
  }
  return delegates[name];
}

function reset() {
  operands = [];
  Function.prototype.valueOf = _valueOf;
}

function valueOf() {
  // Only keep the last two operands.
  if (operands.length === 2) {
    operands.shift();
  }
  operands.push(this);

  // Temporarily override the valueOf method so that we can use the += and -=
  // syntax for adding and removing event listeners.
  if (Function.prototype.valueOf !== valueOf) {
    _valueOf = Function.prototype.valueOf;
    Function.prototype.valueOf = valueOf;
  }
  return 3;
}

function set(delegate, value) {
  // Make sure the operands are valid, and that the left operand is us.
  if (operands.length === 2 && (operands[0] === delegate || operands[0] === delegate.event) && typeof operands[1] === 'function') {
    var listener = operands[1];
    // The '+=' operator was used (eg. 3 + 3 = 6).
    if (value === 6) {
      delegate.addListener(listener);
    }
    // The '-=' operator was used (eg. 3 - 3 = 0).
    else if (value === 0) {
      delegate.removeListener(listener);
    }
  }
  reset();
}
module.exports = exports['default'];
},{"./Delegate":27}],30:[function(require,module,exports){
var Modernizr = require('./lib/Modernizr'),
    ModernizrProto = require('./lib/ModernizrProto'),
    classes = require('./lib/classes'),
    testRunner = require('./lib/testRunner'),
    setClasses = require('./lib/setClasses');

// Run each test
testRunner();

// Remove the "no-js" class if it exists
setClasses(classes);

delete ModernizrProto.addTest;
delete ModernizrProto.addAsyncTest;

// Run the things that are supposed to run after the tests
for (var i = 0; i < Modernizr._q.length; i++) {
  Modernizr._q[i]();
}

module.exports = Modernizr;

},{"./lib/Modernizr":31,"./lib/ModernizrProto":32,"./lib/classes":33,"./lib/setClasses":37,"./lib/testRunner":38}],31:[function(require,module,exports){
var ModernizrProto = require('./ModernizrProto.js');
  // Fake some of Object.create so we can force non test results to be non "own" properties.
  var Modernizr = function() {};
  Modernizr.prototype = ModernizrProto;

  // Leak modernizr globally when you `require` it rather than force it here.
  // Overwrite name so constructor name is nicer :D
  Modernizr = new Modernizr();

  module.exports = Modernizr;


},{"./ModernizrProto.js":32}],32:[function(require,module,exports){
var tests = require('./tests.js');
  /**
   *
   * ModernizrProto is the constructor for Modernizr
   *
   * @class
   * @access public
   */

  var ModernizrProto = {
    // The current version, dummy
    _version: '3.2.0 (browsernizr 2.0.1)',

    // Any settings that don't work as separate modules
    // can go in here as configuration.
    _config: {
      'classPrefix' : '',
      'enableClasses' : true,
      'enableJSClass' : true,
      'usePrefixes' : true
    },

    // Queue of tests
    _q: [],

    // Stub these for people who are listening
    on: function(test, cb) {
      // I don't really think people should do this, but we can
      // safe guard it a bit.
      // -- NOTE:: this gets WAY overridden in src/addTest for actual async tests.
      // This is in case people listen to synchronous tests. I would leave it out,
      // but the code to *disallow* sync tests in the real version of this
      // function is actually larger than this.
      var self = this;
      setTimeout(function() {
        cb(self[test]);
      }, 0);
    },

    addTest: function(name, fn, options) {
      tests.push({name : name, fn : fn, options : options});
    },

    addAsyncTest: function(fn) {
      tests.push({name : null, fn : fn});
    }
  };

  module.exports = ModernizrProto;


},{"./tests.js":39}],33:[function(require,module,exports){

  var classes = [];
  module.exports = classes;


},{}],34:[function(require,module,exports){

  /**
   * docElement is a convenience wrapper to grab the root element of the document
   *
   * @access private
   * @returns {HTMLElement|SVGElement} The root element of the document
   */

  var docElement = document.documentElement;
  module.exports = docElement;


},{}],35:[function(require,module,exports){

  /**
   * is returns a boolean if the typeof an obj is exactly type.
   *
   * @access private
   * @function is
   * @param {*} obj - A thing we want to check the type of
   * @param {string} type - A string to compare the typeof against
   * @returns {boolean}
   */

  function is(obj, type) {
    return typeof obj === type;
  }
  module.exports = is;


},{}],36:[function(require,module,exports){
var docElement = require('./docElement.js');
  /**
   * A convenience helper to check if the document we are running in is an SVG document
   *
   * @access private
   * @returns {boolean}
   */

  var isSVG = docElement.nodeName.toLowerCase() === 'svg';
  module.exports = isSVG;


},{"./docElement.js":34}],37:[function(require,module,exports){
var Modernizr = require('./Modernizr.js');
var docElement = require('./docElement.js');
var isSVG = require('./isSVG.js');
  /**
   * setClasses takes an array of class names and adds them to the root element
   *
   * @access private
   * @function setClasses
   * @param {string[]} classes - Array of class names
   */

  // Pass in an and array of class names, e.g.:
  //  ['no-webp', 'borderradius', ...]
  function setClasses(classes) {
    var className = docElement.className;
    var classPrefix = Modernizr._config.classPrefix || '';

    if (isSVG) {
      className = className.baseVal;
    }

    // Change `no-js` to `js` (independently of the `enableClasses` option)
    // Handle classPrefix on this too
    if (Modernizr._config.enableJSClass) {
      var reJS = new RegExp('(^|\\s)' + classPrefix + 'no-js(\\s|$)');
      className = className.replace(reJS, '$1' + classPrefix + 'js$2');
    }

    if (Modernizr._config.enableClasses) {
      // Add the new classes
      className += ' ' + classPrefix + classes.join(' ' + classPrefix);
      isSVG ? docElement.className.baseVal = className : docElement.className = className;
    }

  }

  module.exports = setClasses;


},{"./Modernizr.js":31,"./docElement.js":34,"./isSVG.js":36}],38:[function(require,module,exports){
var tests = require('./tests.js');
var Modernizr = require('./Modernizr.js');
var classes = require('./classes.js');
var is = require('./is.js');
  /**
   * Run through all tests and detect their support in the current UA.
   *
   * @access private
   */

  function testRunner() {
    var featureNames;
    var feature;
    var aliasIdx;
    var result;
    var nameIdx;
    var featureName;
    var featureNameSplit;

    for (var featureIdx in tests) {
      if (tests.hasOwnProperty(featureIdx)) {
        featureNames = [];
        feature = tests[featureIdx];
        // run the test, throw the return value into the Modernizr,
        // then based on that boolean, define an appropriate className
        // and push it into an array of classes we'll join later.
        //
        // If there is no name, it's an 'async' test that is run,
        // but not directly added to the object. That should
        // be done with a post-run addTest call.
        if (feature.name) {
          featureNames.push(feature.name.toLowerCase());

          if (feature.options && feature.options.aliases && feature.options.aliases.length) {
            // Add all the aliases into the names list
            for (aliasIdx = 0; aliasIdx < feature.options.aliases.length; aliasIdx++) {
              featureNames.push(feature.options.aliases[aliasIdx].toLowerCase());
            }
          }
        }

        // Run the test, or use the raw value if it's not a function
        result = is(feature.fn, 'function') ? feature.fn() : feature.fn;


        // Set each of the names on the Modernizr object
        for (nameIdx = 0; nameIdx < featureNames.length; nameIdx++) {
          featureName = featureNames[nameIdx];
          // Support dot properties as sub tests. We don't do checking to make sure
          // that the implied parent tests have been added. You must call them in
          // order (either in the test, or make the parent test a dependency).
          //
          // Cap it to TWO to make the logic simple and because who needs that kind of subtesting
          // hashtag famous last words
          featureNameSplit = featureName.split('.');

          if (featureNameSplit.length === 1) {
            Modernizr[featureNameSplit[0]] = result;
          } else {
            // cast to a Boolean, if not one already
            /* jshint -W053 */
            if (Modernizr[featureNameSplit[0]] && !(Modernizr[featureNameSplit[0]] instanceof Boolean)) {
              Modernizr[featureNameSplit[0]] = new Boolean(Modernizr[featureNameSplit[0]]);
            }

            Modernizr[featureNameSplit[0]][featureNameSplit[1]] = result;
          }

          classes.push((result ? '' : 'no-') + featureNameSplit.join('-'));
        }
      }
    }
  }
  module.exports = testRunner;


},{"./Modernizr.js":31,"./classes.js":33,"./is.js":35,"./tests.js":39}],39:[function(require,module,exports){

  var tests = [];
  module.exports = tests;


},{}],40:[function(require,module,exports){
/*!
{
  "name": "History API",
  "property": "history",
  "caniuse": "history",
  "tags": ["history"],
  "authors": ["Hay Kranen", "Alexander Farkas"],
  "notes": [{
    "name": "W3C Spec",
    "href": "http://www.w3.org/TR/html51/browsers.html#the-history-interface"
  }, {
    "name": "MDN documentation",
    "href": "https://developer.mozilla.org/en-US/docs/Web/API/window.history"
  }],
  "polyfills": ["historyjs", "html5historyapi"]
}
!*/
/* DOC
Detects support for the History API for manipulating the browser session history.
*/
var Modernizr = require('./../lib/Modernizr.js');
  Modernizr.addTest('history', function() {
    // Issue #733
    // The stock browser on Android 2.2 & 2.3, and 4.0.x returns positive on history support
    // Unfortunately support is really buggy and there is no clean way to detect
    // these bugs, so we fall back to a user agent sniff :(
    var ua = navigator.userAgent;

    // We only want Android 2 and 4.0, stock browser, and not Chrome which identifies
    // itself as 'Mobile Safari' as well, nor Windows Phone (issue #1471).
    if ((ua.indexOf('Android 2.') !== -1 ||
        (ua.indexOf('Android 4.0') !== -1)) &&
        ua.indexOf('Mobile Safari') !== -1 &&
        ua.indexOf('Chrome') === -1 &&
        ua.indexOf('Windows Phone') === -1) {
      return false;
    }

    // Return the regular check
    return (window.history && 'pushState' in window.history);
  });


},{"./../lib/Modernizr.js":31}],41:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseAssign = require('lodash._baseassign'),
    createAssigner = require('lodash._createassigner'),
    keys = require('lodash.keys');

/**
 * A specialized version of `_.assign` for customizing assigned values without
 * support for argument juggling, multiple sources, and `this` binding `customizer`
 * functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} customizer The function to customize assigned values.
 * @returns {Object} Returns `object`.
 */
function assignWith(object, source, customizer) {
  var index = -1,
      props = keys(source),
      length = props.length;

  while (++index < length) {
    var key = props[index],
        value = object[key],
        result = customizer(value, source[key], key, object, source);

    if ((result === result ? (result !== value) : (value === value)) ||
        (value === undefined && !(key in object))) {
      object[key] = result;
    }
  }
  return object;
}

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources overwrite property assignments of previous sources.
 * If `customizer` is provided it is invoked to produce the assigned values.
 * The `customizer` is bound to `thisArg` and invoked with five arguments:
 * (objectValue, sourceValue, key, object, source).
 *
 * **Note:** This method mutates `object` and is based on
 * [`Object.assign`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.assign).
 *
 * @static
 * @memberOf _
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.assign({ 'user': 'barney' }, { 'age': 40 }, { 'user': 'fred' });
 * // => { 'user': 'fred', 'age': 40 }
 *
 * // using a customizer callback
 * var defaults = _.partialRight(_.assign, function(value, other) {
 *   return _.isUndefined(value) ? other : value;
 * });
 *
 * defaults({ 'user': 'barney' }, { 'age': 36 }, { 'user': 'fred' });
 * // => { 'user': 'barney', 'age': 36 }
 */
var assign = createAssigner(function(object, source, customizer) {
  return customizer
    ? assignWith(object, source, customizer)
    : baseAssign(object, source);
});

module.exports = assign;

},{"lodash._baseassign":42,"lodash._createassigner":44,"lodash.keys":48}],42:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keys = require('lodash.keys');

/**
 * The base implementation of `_.assign` without support for argument juggling,
 * multiple sources, and `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return source == null
    ? object
    : baseCopy(source, keys(source), object);
}

module.exports = baseAssign;

},{"lodash._basecopy":43,"lodash.keys":48}],43:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property names to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, props, object) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],44:[function(require,module,exports){
/**
 * lodash 3.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var bindCallback = require('lodash._bindcallback'),
    isIterateeCall = require('lodash._isiterateecall'),
    restParam = require('lodash.restparam');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * **Note:** This function is used to create `_.assign`, `_.defaults`, and `_.merge`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return restParam(function(object, sources) {
    var index = -1,
        length = object == null ? 0 : sources.length,
        customizer = length > 2 ? sources[length - 2] : undefined,
        guard = length > 2 ? sources[2] : undefined,
        thisArg = length > 1 ? sources[length - 1] : undefined;

    if (typeof customizer == 'function') {
      customizer = bindCallback(customizer, thisArg, 5);
      length -= 2;
    } else {
      customizer = typeof thisArg == 'function' ? thisArg : undefined;
      length -= (customizer ? 1 : 0);
    }
    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;

},{"lodash._bindcallback":45,"lodash._isiterateecall":46,"lodash.restparam":47}],45:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (thisArg === undefined) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = bindCallback;

},{}],46:[function(require,module,exports){
/**
 * lodash 3.0.9 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
      ? (isArrayLike(object) && isIndex(index, object.length))
      : (type == 'string' && index in object)) {
    var other = object[index];
    return value === value ? (value === other) : (other !== other);
  }
  return false;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = isIterateeCall;

},{}],47:[function(require,module,exports){
/**
 * lodash 3.6.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates a function that invokes `func` with the `this` binding of the
 * created function and arguments from `start` and beyond provided as an array.
 *
 * **Note:** This method is based on the [rest parameter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters).
 *
 * @static
 * @memberOf _
 * @category Function
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var say = _.restParam(function(what, names) {
 *   return what + ' ' + _.initial(names).join(', ') +
 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
 * });
 *
 * say('hello', 'fred', 'barney', 'pebbles');
 * // => 'hello fred, barney, & pebbles'
 */
function restParam(func, start) {
  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  start = nativeMax(start === undefined ? (func.length - 1) : (+start || 0), 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        rest = Array(length);

    while (++index < length) {
      rest[index] = args[start + index];
    }
    switch (start) {
      case 0: return func.call(this, rest);
      case 1: return func.call(this, args[0], rest);
      case 2: return func.call(this, args[0], args[1], rest);
    }
    var otherArgs = Array(start + 1);
    index = -1;
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = rest;
    return func.apply(this, otherArgs);
  };
}

module.exports = restParam;

},{}],48:[function(require,module,exports){
/**
 * lodash 3.1.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var getNative = require('lodash._getnative'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = getNative(Object, 'keys');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = !!length && isLength(length) &&
    (isArray(object) || isArguments(object));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  var Ctor = object == null ? undefined : object.constructor;
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
      (typeof object != 'function' && isArrayLike(object))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keys;

},{"lodash._getnative":49,"lodash.isarguments":50,"lodash.isarray":51}],49:[function(require,module,exports){
/**
 * lodash 3.9.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = getNative;

},{}],50:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  return isObjectLike(value) && isArrayLike(value) &&
    hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
}

module.exports = isArguments;

},{}],51:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var arrayTag = '[object Array]',
    funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  fnToString.call(hasOwnProperty).replace(/[\\^$.*+?()[\]{}|]/g, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = getNative(Array, 'isArray');

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object == null ? undefined : object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag;
};

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return isObject(value) && objToString.call(value) == funcTag;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(fnToString.call(value));
  }
  return isObjectLike(value) && reIsHostCtor.test(value);
}

module.exports = isArray;

},{}],52:[function(require,module,exports){
/**
 * lodash 3.2.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCallback = require('lodash._basecallback'),
    baseEach = require('lodash._baseeach'),
    baseFind = require('lodash._basefind'),
    baseFindIndex = require('lodash._basefindindex'),
    isArray = require('lodash.isarray');

/**
 * Creates a `_.find` or `_.findLast` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new find function.
 */
function createFind(eachFunc, fromRight) {
  return function(collection, predicate, thisArg) {
    predicate = baseCallback(predicate, thisArg, 3);
    if (isArray(collection)) {
      var index = baseFindIndex(collection, predicate, fromRight);
      return index > -1 ? collection[index] : undefined;
    }
    return baseFind(collection, predicate, eachFunc);
  };
}

/**
 * Iterates over elements of `collection`, returning the first element
 * `predicate` returns truthy for. The predicate is bound to `thisArg` and
 * invoked with three arguments: (value, index|key, collection).
 *
 * If a property name is provided for `predicate` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `predicate` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @alias detect
 * @category Collection
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function|Object|string} [predicate=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `predicate`.
 * @returns {*} Returns the matched element, else `undefined`.
 * @example
 *
 * var users = [
 *   { 'user': 'barney',  'age': 36, 'active': true },
 *   { 'user': 'fred',    'age': 40, 'active': false },
 *   { 'user': 'pebbles', 'age': 1,  'active': true }
 * ];
 *
 * _.result(_.find(users, function(chr) {
 *   return chr.age < 40;
 * }), 'user');
 * // => 'barney'
 *
 * // using the `_.matches` callback shorthand
 * _.result(_.find(users, { 'age': 1, 'active': true }), 'user');
 * // => 'pebbles'
 *
 * // using the `_.matchesProperty` callback shorthand
 * _.result(_.find(users, 'active', false), 'user');
 * // => 'fred'
 *
 * // using the `_.property` callback shorthand
 * _.result(_.find(users, 'active'), 'user');
 * // => 'barney'
 */
var find = createFind(baseEach);

module.exports = find;

},{"lodash._basecallback":53,"lodash._baseeach":58,"lodash._basefind":59,"lodash._basefindindex":60,"lodash.isarray":61}],53:[function(require,module,exports){
/**
 * lodash 3.3.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseIsEqual = require('lodash._baseisequal'),
    bindCallback = require('lodash._bindcallback'),
    isArray = require('lodash.isarray'),
    pairs = require('lodash.pairs');

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\n\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\n\\]|\\.)*?)\2)\]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  return value == null ? '' : (value + '');
}

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return thisArg === undefined
      ? func
      : bindCallback(func, thisArg, argCount);
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return thisArg === undefined
    ? property(func)
    : baseMatchesProperty(func, thisArg);
}

/**
 * The base implementation of `get` without support for string paths
 * and default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path of the property to get.
 * @param {string} [pathKey] The key representation of path.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path, pathKey) {
  if (object == null) {
    return;
  }
  if (pathKey !== undefined && pathKey in toObject(object)) {
    path = [pathKey];
  }
  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} matchData The propery names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = toObject(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (!(result === undefined ? baseIsEqual(srcValue, objValue, customizer, true) : result)) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value && (value !== undefined || (key in toObject(object)));
    };
  }
  return function(object) {
    return baseIsMatch(object, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which does not clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  var isArr = isArray(path),
      isCommon = isKey(path) && isStrictComparable(srcValue),
      pathKey = (path + '');

  path = toPath(path);
  return function(object) {
    if (object == null) {
      return false;
    }
    var key = pathKey;
    object = toObject(object);
    if ((isArr || !isCommon) && !(key in object)) {
      object = path.length == 1 ? object : baseGet(object, baseSlice(path, 0, -1));
      if (object == null) {
        return false;
      }
      key = last(path);
      object = toObject(object);
    }
    return object[key] === srcValue
      ? (srcValue !== undefined || (key in object))
      : baseIsEqual(srcValue, object[key], undefined, true);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  var pathKey = (path + '');
  path = toPath(path);
  return function(object) {
    return baseGet(object, path, pathKey);
  };
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  start = start == null ? 0 : (+start || 0);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : (+end || 0);
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * Gets the propery names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = pairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  var type = typeof value;
  if ((type == 'string' && reIsPlainProp.test(value)) || type == 'number') {
    return true;
  }
  if (isArray(value)) {
    return false;
  }
  var result = !reIsDeepProp.test(value);
  return result || (object != null && value in toObject(object));
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Converts `value` to property path array if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array} Returns the property path array.
 */
function toPath(value) {
  if (isArray(value)) {
    return value;
  }
  var result = [];
  baseToString(value).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the property value at `path` on a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.pluck(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

module.exports = baseCallback;

},{"lodash._baseisequal":54,"lodash._bindcallback":56,"lodash.isarray":61,"lodash.pairs":57}],54:[function(require,module,exports){
/**
 * lodash 3.0.7 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArray = require('lodash.isarray'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `_.some` for arrays without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isLoose, stackA, stackB) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isLoose, stackA, stackB);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  if (!isLoose) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, isLoose, stackA, stackB);
    }
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isLoose, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isLoose && othLength > arrLength)) {
    return false;
  }
  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index],
        result = customizer ? customizer(isLoose ? othValue : arrValue, isLoose ? arrValue : othValue, index) : undefined;

    if (result !== undefined) {
      if (result) {
        continue;
      }
      return false;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isLoose) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB);
          })) {
        return false;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, isLoose, stackA, stackB))) {
      return false;
    }
  }
  return true;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isLoose] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isLoose, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isLoose) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isLoose ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  var skipCtor = isLoose;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key],
        result = customizer ? customizer(isLoose ? othValue : objValue, isLoose? objValue : othValue, key) : undefined;

    // Recursively compare objects (susceptible to call stack limits).
    if (!(result === undefined ? equalFunc(objValue, othValue, customizer, isLoose, stackA, stackB) : result)) {
      return false;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (!skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = baseIsEqual;

},{"lodash.isarray":61,"lodash.istypedarray":55,"lodash.keys":62}],55:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[objToString.call(value)];
}

module.exports = isTypedArray;

},{}],56:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],57:[function(require,module,exports){
/**
 * lodash 3.0.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates a two dimensional array of the key-value pairs for `object`,
 * e.g. `[[key1, value1], [key2, value2]]`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * _.pairs({ 'barney': 36, 'fred': 40 });
 * // => [['barney', 36], ['fred', 40]] (iteration order is not guaranteed)
 */
function pairs(object) {
  object = toObject(object);

  var index = -1,
      props = keys(object),
      length = props.length,
      result = Array(length);

  while (++index < length) {
    var key = props[index];
    result[index] = [key, object[key]];
  }
  return result;
}

module.exports = pairs;

},{"lodash.keys":62}],58:[function(require,module,exports){
/**
 * lodash 3.0.4 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var keys = require('lodash.keys');

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseEach(eachFunc, fromRight) {
  return function(collection, iteratee) {
    var length = collection ? getLength(collection) : 0;
    if (!isLength(length)) {
      return eachFunc(collection, iteratee);
    }
    var index = fromRight ? length : -1,
        iterable = toObject(collection);

    while ((fromRight ? index-- : ++index < length)) {
      if (iteratee(iterable[index], index, iterable) === false) {
        break;
      }
    }
    return collection;
  };
}

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = baseEach;

},{"lodash.keys":62}],59:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.find`, `_.findLast`, `_.findKey`, and `_.findLastKey`,
 * without support for callback shorthands and `this` binding, which iterates
 * over `collection` using the provided `eachFunc`.
 *
 * @private
 * @param {Array|Object|string} collection The collection to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {Function} eachFunc The function to iterate over `collection`.
 * @param {boolean} [retKey] Specify returning the key of the found element
 *  instead of the element itself.
 * @returns {*} Returns the found element or its key, else `undefined`.
 */
function baseFind(collection, predicate, eachFunc, retKey) {
  var result;
  eachFunc(collection, function(value, key, collection) {
    if (predicate(value, key, collection)) {
      result = retKey ? key : value;
      return false;
    }
  });
  return result;
}

module.exports = baseFind;

},{}],60:[function(require,module,exports){
/**
 * lodash 3.6.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `_.findIndex` and `_.findLastIndex` without
 * support for callback shorthands and `this` binding.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {Function} predicate The function invoked per iteration.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function baseFindIndex(array, predicate, fromRight) {
  var length = array.length,
      index = fromRight ? length : -1;

  while ((fromRight ? index-- : ++index < length)) {
    if (predicate(array[index], index, array)) {
      return index;
    }
  }
  return -1;
}

module.exports = baseFindIndex;

},{}],61:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],62:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"lodash._getnative":63,"lodash.isarguments":64,"lodash.isarray":61}],63:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],64:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],65:[function(require,module,exports){
/**
 * lodash 3.2.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFor = require('lodash._basefor'),
    isArguments = require('lodash.isarguments'),
    keysIn = require('lodash.keysin');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag && !isArguments(value)) ||
      (!hasOwnProperty.call(value, 'constructor') && (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return result === undefined || hasOwnProperty.call(value, result);
}

module.exports = isPlainObject;

},{"lodash._basefor":66,"lodash.isarguments":67,"lodash.keysin":68}],66:[function(require,module,exports){
/**
 * lodash 3.0.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * Creates a base function for `_.forIn` or `_.forInRight`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var iterable = toObject(object),
        props = keysFunc(object),
        length = props.length,
        index = fromRight ? length : -1;

    while ((fromRight ? index-- : ++index < length)) {
      var key = props[index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Converts `value` to an object if it's not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = baseFor;

},{}],67:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],68:[function(require,module,exports){
/**
 * lodash 3.0.8 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray');

/** Used to detect unsigned integer values. */
var reIsUint = /^\d+$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used as the [maximum length](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || isArguments(object)) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"lodash.isarguments":67,"lodash.isarray":69}],69:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],70:[function(require,module,exports){
/**
 * lodash 3.3.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var arrayCopy = require('lodash._arraycopy'),
    arrayEach = require('lodash._arrayeach'),
    createAssigner = require('lodash._createassigner'),
    isArguments = require('lodash.isarguments'),
    isArray = require('lodash.isarray'),
    isPlainObject = require('lodash.isplainobject'),
    isTypedArray = require('lodash.istypedarray'),
    keys = require('lodash.keys'),
    toPlainObject = require('lodash.toplainobject');

/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Used as the [maximum length](http://ecma-international.org/ecma-262/6.0/#sec-number.max_safe_integer)
 * of an array-like value.
 */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns `object`.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isArrayLike(source) && (isArray(source) || isTypedArray(source)),
      props = isSrcArr ? undefined : keys(source);

  arrayEach(props || source, function(srcValue, key) {
    if (props) {
      key = srcValue;
      srcValue = source[key];
    }
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    else {
      var value = object[key],
          result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
          isCommon = result === undefined;

      if (isCommon) {
        result = srcValue;
      }
      if ((result !== undefined || (isSrcArr && !(key in object))) &&
          (isCommon || (result === result ? (result !== value) : (value === value)))) {
        object[key] = result;
      }
    }
  });
  return object;
}

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merged values.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = result === undefined;

  if (isCommon) {
    result = srcValue;
    if (isArrayLike(srcValue) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (isArrayLike(value) ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? (result !== value) : (value === value)) {
    object[key] = result;
  }
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is array-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value));
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments: (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"lodash._arraycopy":71,"lodash._arrayeach":72,"lodash._createassigner":73,"lodash.isarguments":78,"lodash.isarray":79,"lodash.isplainobject":65,"lodash.istypedarray":80,"lodash.keys":81,"lodash.toplainobject":83}],71:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],72:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],73:[function(require,module,exports){
arguments[4][44][0].apply(exports,arguments)
},{"dup":44,"lodash._bindcallback":74,"lodash._isiterateecall":75,"lodash.restparam":76}],74:[function(require,module,exports){
arguments[4][45][0].apply(exports,arguments)
},{"dup":45}],75:[function(require,module,exports){
arguments[4][46][0].apply(exports,arguments)
},{"dup":46}],76:[function(require,module,exports){
arguments[4][47][0].apply(exports,arguments)
},{"dup":47}],77:[function(require,module,exports){
arguments[4][49][0].apply(exports,arguments)
},{"dup":49}],78:[function(require,module,exports){
arguments[4][50][0].apply(exports,arguments)
},{"dup":50}],79:[function(require,module,exports){
arguments[4][51][0].apply(exports,arguments)
},{"dup":51}],80:[function(require,module,exports){
arguments[4][55][0].apply(exports,arguments)
},{"dup":55}],81:[function(require,module,exports){
arguments[4][48][0].apply(exports,arguments)
},{"dup":48,"lodash._getnative":77,"lodash.isarguments":78,"lodash.isarray":79}],82:[function(require,module,exports){
arguments[4][68][0].apply(exports,arguments)
},{"dup":68,"lodash.isarguments":78,"lodash.isarray":79}],83:[function(require,module,exports){
/**
 * lodash 3.0.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modern modularize exports="npm" -o ./`
 * Copyright 2012-2015 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.7.0 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseCopy = require('lodash._basecopy'),
    keysIn = require('lodash.keysin');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"lodash._basecopy":84,"lodash.keysin":82}],84:[function(require,module,exports){
arguments[4][43][0].apply(exports,arguments)
},{"dup":43}],85:[function(require,module,exports){
var isarray = require('isarray')

/**
 * Expose `pathToRegexp`.
 */
module.exports = pathToRegexp
module.exports.parse = parse
module.exports.compile = compile
module.exports.tokensToFunction = tokensToFunction
module.exports.tokensToRegExp = tokensToRegExp

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^()])+)\\))?|\\(((?:\\\\.|[^()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g')

/**
 * Parse a string for the raw tokens.
 *
 * @param  {String} str
 * @return {Array}
 */
function parse (str) {
  var tokens = []
  var key = 0
  var index = 0
  var path = ''
  var res

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0]
    var escaped = res[1]
    var offset = res.index
    path += str.slice(index, offset)
    index = offset + m.length

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1]
      continue
    }

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path)
      path = ''
    }

    var prefix = res[2]
    var name = res[3]
    var capture = res[4]
    var group = res[5]
    var suffix = res[6]
    var asterisk = res[7]

    var repeat = suffix === '+' || suffix === '*'
    var optional = suffix === '?' || suffix === '*'
    var delimiter = prefix || '/'
    var pattern = capture || group || (asterisk ? '.*' : '[^' + delimiter + ']+?')

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      pattern: escapeGroup(pattern)
    })
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index)
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path)
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {String}   str
 * @return {Function}
 */
function compile (str) {
  return tokensToFunction(parse(str))
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length)

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^' + tokens[i].pattern + '$')
    }
  }

  return function (obj) {
    var path = ''
    var data = obj || {}

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i]

      if (typeof token === 'string') {
        path += token

        continue
      }

      var value = data[token.name]
      var segment

      if (value == null) {
        if (token.optional) {
          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received "' + value + '"')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encodeURIComponent(value[j])

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment
        }

        continue
      }

      segment = encodeURIComponent(value)

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {String} str
 * @return {String}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {String} group
 * @return {String}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {RegExp} re
 * @param  {Array}  keys
 * @return {RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {String}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {RegExp} path
 * @param  {Array}  keys
 * @return {RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g)

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        pattern: null
      })
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {Array}  path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = []

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source)
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options))

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {String} path
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function stringToRegexp (path, keys, options) {
  var tokens = parse(path)
  var re = tokensToRegExp(tokens, options)

  // Attach keys back to the regexp.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] !== 'string') {
      keys.push(tokens[i])
    }
  }

  return attachKeys(re, keys)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {Array}  tokens
 * @param  {Array}  keys
 * @param  {Object} options
 * @return {RegExp}
 */
function tokensToRegExp (tokens, options) {
  options = options || {}

  var strict = options.strict
  var end = options.end !== false
  var route = ''
  var lastToken = tokens[tokens.length - 1]
  var endsWithSlash = typeof lastToken === 'string' && /\/$/.test(lastToken)

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i]

    if (typeof token === 'string') {
      route += escapeString(token)
    } else {
      var prefix = escapeString(token.prefix)
      var capture = token.pattern

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*'
      }

      if (token.optional) {
        if (prefix) {
          capture = '(?:' + prefix + '(' + capture + '))?'
        } else {
          capture = '(' + capture + ')?'
        }
      } else {
        capture = prefix + '(' + capture + ')'
      }

      route += capture
    }
  }

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithSlash ? route.slice(0, -2) : route) + '(?:\\/(?=$))?'
  }

  if (end) {
    route += '$'
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithSlash ? '' : '(?=\\/|$)'
  }

  return new RegExp('^' + route, flags(options))
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(String|RegExp|Array)} path
 * @param  {Array}                 [keys]
 * @param  {Object}                [options]
 * @return {RegExp}
 */
function pathToRegexp (path, keys, options) {
  keys = keys || []

  if (!isarray(keys)) {
    options = keys
    keys = []
  } else if (!options) {
    options = {}
  }

  if (path instanceof RegExp) {
    return regexpToRegexp(path, keys, options)
  }

  if (isarray(path)) {
    return arrayToRegexp(path, keys, options)
  }

  return stringToRegexp(path, keys, options)
}

},{"isarray":86}],86:[function(require,module,exports){
module.exports = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

},{}],87:[function(require,module,exports){
/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.17.0
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') {
    // Node
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals (root is window)
    root.IPv6 = factory(root);
  }
}(this, function (root) {
  'use strict';

  /*
  var _in = "fe80:0000:0000:0000:0204:61ff:fe9d:f156";
  var _out = IPv6.best(_in);
  var _expected = "fe80::204:61ff:fe9d:f156";

  console.log(_in, _out, _expected, _out === _expected);
  */

  // save current IPv6 variable, if any
  var _IPv6 = root && root.IPv6;

  function bestPresentation(address) {
    // based on:
    // Javascript to test an IPv6 address for proper format, and to
    // present the "best text representation" according to IETF Draft RFC at
    // http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04
    // 8 Feb 2010 Rich Brown, Dartware, LLC
    // Please feel free to use this code as long as you provide a link to
    // http://www.intermapper.com
    // http://intermapper.com/support/tools/IPV6-Validator.aspx
    // http://download.dartware.com/thirdparty/ipv6validator.js

    var _address = address.toLowerCase();
    var segments = _address.split(':');
    var length = segments.length;
    var total = 8;

    // trim colons (:: or ::a:b:c… or …a:b:c::)
    if (segments[0] === '' && segments[1] === '' && segments[2] === '') {
      // must have been ::
      // remove first two items
      segments.shift();
      segments.shift();
    } else if (segments[0] === '' && segments[1] === '') {
      // must have been ::xxxx
      // remove the first item
      segments.shift();
    } else if (segments[length - 1] === '' && segments[length - 2] === '') {
      // must have been xxxx::
      segments.pop();
    }

    length = segments.length;

    // adjust total segments for IPv4 trailer
    if (segments[length - 1].indexOf('.') !== -1) {
      // found a "." which means IPv4
      total = 7;
    }

    // fill empty segments them with "0000"
    var pos;
    for (pos = 0; pos < length; pos++) {
      if (segments[pos] === '') {
        break;
      }
    }

    if (pos < total) {
      segments.splice(pos, 1, '0000');
      while (segments.length < total) {
        segments.splice(pos, 0, '0000');
      }

      length = segments.length;
    }

    // strip leading zeros
    var _segments;
    for (var i = 0; i < total; i++) {
      _segments = segments[i].split('');
      for (var j = 0; j < 3 ; j++) {
        if (_segments[0] === '0' && _segments.length > 1) {
          _segments.splice(0,1);
        } else {
          break;
        }
      }

      segments[i] = _segments.join('');
    }

    // find longest sequence of zeroes and coalesce them into one segment
    var best = -1;
    var _best = 0;
    var _current = 0;
    var current = -1;
    var inzeroes = false;
    // i; already declared

    for (i = 0; i < total; i++) {
      if (inzeroes) {
        if (segments[i] === '0') {
          _current += 1;
        } else {
          inzeroes = false;
          if (_current > _best) {
            best = current;
            _best = _current;
          }
        }
      } else {
        if (segments[i] === '0') {
          inzeroes = true;
          current = i;
          _current = 1;
        }
      }
    }

    if (_current > _best) {
      best = current;
      _best = _current;
    }

    if (_best > 1) {
      segments.splice(best, _best, '');
    }

    length = segments.length;

    // assemble remaining segments
    var result = '';
    if (segments[0] === '')  {
      result = ':';
    }

    for (i = 0; i < length; i++) {
      result += segments[i];
      if (i === length - 1) {
        break;
      }

      result += ':';
    }

    if (segments[length - 1] === '') {
      result += ':';
    }

    return result;
  }

  function noConflict() {
    /*jshint validthis: true */
    if (root.IPv6 === this) {
      root.IPv6 = _IPv6;
    }
  
    return this;
  }

  return {
    best: bestPresentation,
    noConflict: noConflict
  };
}));

},{}],88:[function(require,module,exports){
/*!
 * URI.js - Mutating URLs
 * Second Level Domain (SLD) Support
 *
 * Version: 1.17.0
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */

(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') {
    // Node
    module.exports = factory();
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(factory);
  } else {
    // Browser globals (root is window)
    root.SecondLevelDomains = factory(root);
  }
}(this, function (root) {
  'use strict';

  // save current SecondLevelDomains variable, if any
  var _SecondLevelDomains = root && root.SecondLevelDomains;

  var SLD = {
    // list of known Second Level Domains
    // converted list of SLDs from https://github.com/gavingmiller/second-level-domains
    // ----
    // publicsuffix.org is more current and actually used by a couple of browsers internally.
    // downside is it also contains domains like "dyndns.org" - which is fine for the security
    // issues browser have to deal with (SOP for cookies, etc) - but is way overboard for URI.js
    // ----
    list: {
      'ac':' com gov mil net org ',
      'ae':' ac co gov mil name net org pro sch ',
      'af':' com edu gov net org ',
      'al':' com edu gov mil net org ',
      'ao':' co ed gv it og pb ',
      'ar':' com edu gob gov int mil net org tur ',
      'at':' ac co gv or ',
      'au':' asn com csiro edu gov id net org ',
      'ba':' co com edu gov mil net org rs unbi unmo unsa untz unze ',
      'bb':' biz co com edu gov info net org store tv ',
      'bh':' biz cc com edu gov info net org ',
      'bn':' com edu gov net org ',
      'bo':' com edu gob gov int mil net org tv ',
      'br':' adm adv agr am arq art ato b bio blog bmd cim cng cnt com coop ecn edu eng esp etc eti far flog fm fnd fot fst g12 ggf gov imb ind inf jor jus lel mat med mil mus net nom not ntr odo org ppg pro psc psi qsl rec slg srv tmp trd tur tv vet vlog wiki zlg ',
      'bs':' com edu gov net org ',
      'bz':' du et om ov rg ',
      'ca':' ab bc mb nb nf nl ns nt nu on pe qc sk yk ',
      'ck':' biz co edu gen gov info net org ',
      'cn':' ac ah bj com cq edu fj gd gov gs gx gz ha hb he hi hl hn jl js jx ln mil net nm nx org qh sc sd sh sn sx tj tw xj xz yn zj ',
      'co':' com edu gov mil net nom org ',
      'cr':' ac c co ed fi go or sa ',
      'cy':' ac biz com ekloges gov ltd name net org parliament press pro tm ',
      'do':' art com edu gob gov mil net org sld web ',
      'dz':' art asso com edu gov net org pol ',
      'ec':' com edu fin gov info med mil net org pro ',
      'eg':' com edu eun gov mil name net org sci ',
      'er':' com edu gov ind mil net org rochest w ',
      'es':' com edu gob nom org ',
      'et':' biz com edu gov info name net org ',
      'fj':' ac biz com info mil name net org pro ',
      'fk':' ac co gov net nom org ',
      'fr':' asso com f gouv nom prd presse tm ',
      'gg':' co net org ',
      'gh':' com edu gov mil org ',
      'gn':' ac com gov net org ',
      'gr':' com edu gov mil net org ',
      'gt':' com edu gob ind mil net org ',
      'gu':' com edu gov net org ',
      'hk':' com edu gov idv net org ',
      'hu':' 2000 agrar bolt casino city co erotica erotika film forum games hotel info ingatlan jogasz konyvelo lakas media news org priv reklam sex shop sport suli szex tm tozsde utazas video ',
      'id':' ac co go mil net or sch web ',
      'il':' ac co gov idf k12 muni net org ',
      'in':' ac co edu ernet firm gen gov i ind mil net nic org res ',
      'iq':' com edu gov i mil net org ',
      'ir':' ac co dnssec gov i id net org sch ',
      'it':' edu gov ',
      'je':' co net org ',
      'jo':' com edu gov mil name net org sch ',
      'jp':' ac ad co ed go gr lg ne or ',
      'ke':' ac co go info me mobi ne or sc ',
      'kh':' com edu gov mil net org per ',
      'ki':' biz com de edu gov info mob net org tel ',
      'km':' asso com coop edu gouv k medecin mil nom notaires pharmaciens presse tm veterinaire ',
      'kn':' edu gov net org ',
      'kr':' ac busan chungbuk chungnam co daegu daejeon es gangwon go gwangju gyeongbuk gyeonggi gyeongnam hs incheon jeju jeonbuk jeonnam k kg mil ms ne or pe re sc seoul ulsan ',
      'kw':' com edu gov net org ',
      'ky':' com edu gov net org ',
      'kz':' com edu gov mil net org ',
      'lb':' com edu gov net org ',
      'lk':' assn com edu gov grp hotel int ltd net ngo org sch soc web ',
      'lr':' com edu gov net org ',
      'lv':' asn com conf edu gov id mil net org ',
      'ly':' com edu gov id med net org plc sch ',
      'ma':' ac co gov m net org press ',
      'mc':' asso tm ',
      'me':' ac co edu gov its net org priv ',
      'mg':' com edu gov mil nom org prd tm ',
      'mk':' com edu gov inf name net org pro ',
      'ml':' com edu gov net org presse ',
      'mn':' edu gov org ',
      'mo':' com edu gov net org ',
      'mt':' com edu gov net org ',
      'mv':' aero biz com coop edu gov info int mil museum name net org pro ',
      'mw':' ac co com coop edu gov int museum net org ',
      'mx':' com edu gob net org ',
      'my':' com edu gov mil name net org sch ',
      'nf':' arts com firm info net other per rec store web ',
      'ng':' biz com edu gov mil mobi name net org sch ',
      'ni':' ac co com edu gob mil net nom org ',
      'np':' com edu gov mil net org ',
      'nr':' biz com edu gov info net org ',
      'om':' ac biz co com edu gov med mil museum net org pro sch ',
      'pe':' com edu gob mil net nom org sld ',
      'ph':' com edu gov i mil net ngo org ',
      'pk':' biz com edu fam gob gok gon gop gos gov net org web ',
      'pl':' art bialystok biz com edu gda gdansk gorzow gov info katowice krakow lodz lublin mil net ngo olsztyn org poznan pwr radom slupsk szczecin torun warszawa waw wroc wroclaw zgora ',
      'pr':' ac biz com edu est gov info isla name net org pro prof ',
      'ps':' com edu gov net org plo sec ',
      'pw':' belau co ed go ne or ',
      'ro':' arts com firm info nom nt org rec store tm www ',
      'rs':' ac co edu gov in org ',
      'sb':' com edu gov net org ',
      'sc':' com edu gov net org ',
      'sh':' co com edu gov net nom org ',
      'sl':' com edu gov net org ',
      'st':' co com consulado edu embaixada gov mil net org principe saotome store ',
      'sv':' com edu gob org red ',
      'sz':' ac co org ',
      'tr':' av bbs bel biz com dr edu gen gov info k12 name net org pol tel tsk tv web ',
      'tt':' aero biz cat co com coop edu gov info int jobs mil mobi museum name net org pro tel travel ',
      'tw':' club com ebiz edu game gov idv mil net org ',
      'mu':' ac co com gov net or org ',
      'mz':' ac co edu gov org ',
      'na':' co com ',
      'nz':' ac co cri geek gen govt health iwi maori mil net org parliament school ',
      'pa':' abo ac com edu gob ing med net nom org sld ',
      'pt':' com edu gov int net nome org publ ',
      'py':' com edu gov mil net org ',
      'qa':' com edu gov mil net org ',
      're':' asso com nom ',
      'ru':' ac adygeya altai amur arkhangelsk astrakhan bashkiria belgorod bir bryansk buryatia cbg chel chelyabinsk chita chukotka chuvashia com dagestan e-burg edu gov grozny int irkutsk ivanovo izhevsk jar joshkar-ola kalmykia kaluga kamchatka karelia kazan kchr kemerovo khabarovsk khakassia khv kirov koenig komi kostroma kranoyarsk kuban kurgan kursk lipetsk magadan mari mari-el marine mil mordovia mosreg msk murmansk nalchik net nnov nov novosibirsk nsk omsk orenburg org oryol penza perm pp pskov ptz rnd ryazan sakhalin samara saratov simbirsk smolensk spb stavropol stv surgut tambov tatarstan tom tomsk tsaritsyn tsk tula tuva tver tyumen udm udmurtia ulan-ude vladikavkaz vladimir vladivostok volgograd vologda voronezh vrn vyatka yakutia yamal yekaterinburg yuzhno-sakhalinsk ',
      'rw':' ac co com edu gouv gov int mil net ',
      'sa':' com edu gov med net org pub sch ',
      'sd':' com edu gov info med net org tv ',
      'se':' a ac b bd c d e f g h i k l m n o org p parti pp press r s t tm u w x y z ',
      'sg':' com edu gov idn net org per ',
      'sn':' art com edu gouv org perso univ ',
      'sy':' com edu gov mil net news org ',
      'th':' ac co go in mi net or ',
      'tj':' ac biz co com edu go gov info int mil name net nic org test web ',
      'tn':' agrinet com defense edunet ens fin gov ind info intl mincom nat net org perso rnrt rns rnu tourism ',
      'tz':' ac co go ne or ',
      'ua':' biz cherkassy chernigov chernovtsy ck cn co com crimea cv dn dnepropetrovsk donetsk dp edu gov if in ivano-frankivsk kh kharkov kherson khmelnitskiy kiev kirovograd km kr ks kv lg lugansk lutsk lviv me mk net nikolaev od odessa org pl poltava pp rovno rv sebastopol sumy te ternopil uzhgorod vinnica vn zaporizhzhe zhitomir zp zt ',
      'ug':' ac co go ne or org sc ',
      'uk':' ac bl british-library co cym gov govt icnet jet lea ltd me mil mod national-library-scotland nel net nhs nic nls org orgn parliament plc police sch scot soc ',
      'us':' dni fed isa kids nsn ',
      'uy':' com edu gub mil net org ',
      've':' co com edu gob info mil net org web ',
      'vi':' co com k12 net org ',
      'vn':' ac biz com edu gov health info int name net org pro ',
      'ye':' co com gov ltd me net org plc ',
      'yu':' ac co edu gov org ',
      'za':' ac agric alt bourse city co cybernet db edu gov grondar iaccess imt inca landesign law mil net ngo nis nom olivetti org pix school tm web ',
      'zm':' ac co com edu gov net org sch '
    },
    // gorhill 2013-10-25: Using indexOf() instead Regexp(). Significant boost
    // in both performance and memory footprint. No initialization required.
    // http://jsperf.com/uri-js-sld-regex-vs-binary-search/4
    // Following methods use lastIndexOf() rather than array.split() in order
    // to avoid any memory allocations.
    has: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') >= 0;
    },
    is: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return false;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset >= 0) {
        return false;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return false;
      }
      return sldList.indexOf(' ' + domain.slice(0, tldOffset) + ' ') >= 0;
    },
    get: function(domain) {
      var tldOffset = domain.lastIndexOf('.');
      if (tldOffset <= 0 || tldOffset >= (domain.length-1)) {
        return null;
      }
      var sldOffset = domain.lastIndexOf('.', tldOffset-1);
      if (sldOffset <= 0 || sldOffset >= (tldOffset-1)) {
        return null;
      }
      var sldList = SLD.list[domain.slice(tldOffset+1)];
      if (!sldList) {
        return null;
      }
      if (sldList.indexOf(' ' + domain.slice(sldOffset+1, tldOffset) + ' ') < 0) {
        return null;
      }
      return domain.slice(sldOffset+1);
    },
    noConflict: function(){
      if (root.SecondLevelDomains === this) {
        root.SecondLevelDomains = _SecondLevelDomains;
      }
      return this;
    }
  };

  return SLD;
}));

},{}],89:[function(require,module,exports){
/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.17.0
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function (root, factory) {
  'use strict';
  // https://github.com/umdjs/umd/blob/master/returnExports.js
  if (typeof exports === 'object') {
    // Node
    module.exports = factory(require('./punycode'), require('./IPv6'), require('./SecondLevelDomains'));
  } else if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['./punycode', './IPv6', './SecondLevelDomains'], factory);
  } else {
    // Browser globals (root is window)
    root.URI = factory(root.punycode, root.IPv6, root.SecondLevelDomains, root);
  }
}(this, function (punycode, IPv6, SLD, root) {
  'use strict';
  /*global location, escape, unescape */
  // FIXME: v2.0.0 renamce non-camelCase properties to uppercase
  /*jshint camelcase: false */

  // save current URI variable, if any
  var _URI = root && root.URI;

  function URI(url, base) {
    var _urlSupplied = arguments.length >= 1;
    var _baseSupplied = arguments.length >= 2;

    // Allow instantiation without the 'new' keyword
    if (!(this instanceof URI)) {
      if (_urlSupplied) {
        if (_baseSupplied) {
          return new URI(url, base);
        }

        return new URI(url);
      }

      return new URI();
    }

    if (url === undefined) {
      if (_urlSupplied) {
        throw new TypeError('undefined is not a valid argument for URI');
      }

      if (typeof location !== 'undefined') {
        url = location.href + '';
      } else {
        url = '';
      }
    }

    this.href(url);

    // resolve to base according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#constructor
    if (base !== undefined) {
      return this.absoluteTo(base);
    }

    return this;
  }

  URI.version = '1.17.0';

  var p = URI.prototype;
  var hasOwn = Object.prototype.hasOwnProperty;

  function escapeRegEx(string) {
    // https://github.com/medialize/URI.js/commit/85ac21783c11f8ccab06106dba9735a31a86924d#commitcomment-821963
    return string.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
  }

  function getType(value) {
    // IE8 doesn't return [Object Undefined] but [Object Object] for undefined value
    if (value === undefined) {
      return 'Undefined';
    }

    return String(Object.prototype.toString.call(value)).slice(8, -1);
  }

  function isArray(obj) {
    return getType(obj) === 'Array';
  }

  function filterArrayValues(data, value) {
    var lookup = {};
    var i, length;

    if (getType(value) === 'RegExp') {
      lookup = null;
    } else if (isArray(value)) {
      for (i = 0, length = value.length; i < length; i++) {
        lookup[value[i]] = true;
      }
    } else {
      lookup[value] = true;
    }

    for (i = 0, length = data.length; i < length; i++) {
      /*jshint laxbreak: true */
      var _match = lookup && lookup[data[i]] !== undefined
        || !lookup && value.test(data[i]);
      /*jshint laxbreak: false */
      if (_match) {
        data.splice(i, 1);
        length--;
        i--;
      }
    }

    return data;
  }

  function arrayContains(list, value) {
    var i, length;

    // value may be string, number, array, regexp
    if (isArray(value)) {
      // Note: this can be optimized to O(n) (instead of current O(m * n))
      for (i = 0, length = value.length; i < length; i++) {
        if (!arrayContains(list, value[i])) {
          return false;
        }
      }

      return true;
    }

    var _type = getType(value);
    for (i = 0, length = list.length; i < length; i++) {
      if (_type === 'RegExp') {
        if (typeof list[i] === 'string' && list[i].match(value)) {
          return true;
        }
      } else if (list[i] === value) {
        return true;
      }
    }

    return false;
  }

  function arraysEqual(one, two) {
    if (!isArray(one) || !isArray(two)) {
      return false;
    }

    // arrays can't be equal if they have different amount of content
    if (one.length !== two.length) {
      return false;
    }

    one.sort();
    two.sort();

    for (var i = 0, l = one.length; i < l; i++) {
      if (one[i] !== two[i]) {
        return false;
      }
    }

    return true;
  }

  function trimSlashes(text) {
    var trim_expression = /^\/+|\/+$/g;
    return text.replace(trim_expression, '');
  }

  URI._parts = function() {
    return {
      protocol: null,
      username: null,
      password: null,
      hostname: null,
      urn: null,
      port: null,
      path: null,
      query: null,
      fragment: null,
      // state
      duplicateQueryParameters: URI.duplicateQueryParameters,
      escapeQuerySpace: URI.escapeQuerySpace
    };
  };
  // state: allow duplicate query parameters (a=1&a=1)
  URI.duplicateQueryParameters = false;
  // state: replaces + with %20 (space in query strings)
  URI.escapeQuerySpace = true;
  // static properties
  URI.protocol_expression = /^[a-z][a-z0-9.+-]*$/i;
  URI.idn_expression = /[^a-z0-9\.-]/i;
  URI.punycode_expression = /(xn--)/i;
  // well, 333.444.555.666 matches, but it sure ain't no IPv4 - do we care?
  URI.ip4_expression = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
  // credits to Rich Brown
  // source: http://forums.intermapper.com/viewtopic.php?p=1096#1096
  // specification: http://www.ietf.org/rfc/rfc4291.txt
  URI.ip6_expression = /^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;
  // expression used is "gruber revised" (@gruber v2) determined to be the
  // best solution in a regex-golf we did a couple of ages ago at
  // * http://mathiasbynens.be/demo/url-regex
  // * http://rodneyrehm.de/t/url-regex.html
  URI.find_uri_expression = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  URI.findUri = {
    // valid "scheme://" or "www."
    start: /\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,
    // everything up to the next whitespace
    end: /[\s\r\n]|$/,
    // trim trailing punctuation captured by end RegExp
    trim: /[`!()\[\]{};:'".,<>?«»“”„‘’]+$/
  };
  // http://www.iana.org/assignments/uri-schemes.html
  // http://en.wikipedia.org/wiki/List_of_TCP_and_UDP_port_numbers#Well-known_ports
  URI.defaultPorts = {
    http: '80',
    https: '443',
    ftp: '21',
    gopher: '70',
    ws: '80',
    wss: '443'
  };
  // allowed hostname characters according to RFC 3986
  // ALPHA DIGIT "-" "." "_" "~" "!" "$" "&" "'" "(" ")" "*" "+" "," ";" "=" %encoded
  // I've never seen a (non-IDN) hostname other than: ALPHA DIGIT . -
  URI.invalid_hostname_characters = /[^a-zA-Z0-9\.-]/;
  // map DOM Elements to their URI attribute
  URI.domAttributes = {
    'a': 'href',
    'blockquote': 'cite',
    'link': 'href',
    'base': 'href',
    'script': 'src',
    'form': 'action',
    'img': 'src',
    'area': 'href',
    'iframe': 'src',
    'embed': 'src',
    'source': 'src',
    'track': 'src',
    'input': 'src', // but only if type="image"
    'audio': 'src',
    'video': 'src'
  };
  URI.getDomAttribute = function(node) {
    if (!node || !node.nodeName) {
      return undefined;
    }

    var nodeName = node.nodeName.toLowerCase();
    // <input> should only expose src for type="image"
    if (nodeName === 'input' && node.type !== 'image') {
      return undefined;
    }

    return URI.domAttributes[nodeName];
  };

  function escapeForDumbFirefox36(value) {
    // https://github.com/medialize/URI.js/issues/91
    return escape(value);
  }

  // encoding / decoding according to RFC3986
  function strictEncodeURIComponent(string) {
    // see https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/encodeURIComponent
    return encodeURIComponent(string)
      .replace(/[!'()*]/g, escapeForDumbFirefox36)
      .replace(/\*/g, '%2A');
  }
  URI.encode = strictEncodeURIComponent;
  URI.decode = decodeURIComponent;
  URI.iso8859 = function() {
    URI.encode = escape;
    URI.decode = unescape;
  };
  URI.unicode = function() {
    URI.encode = strictEncodeURIComponent;
    URI.decode = decodeURIComponent;
  };
  URI.characters = {
    pathname: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(24|26|2B|2C|3B|3D|3A|40)/ig,
        map: {
          // -._~!'()*
          '%24': '$',
          '%26': '&',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%3A': ':',
          '%40': '@'
        }
      },
      decode: {
        expression: /[\/\?#]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23'
        }
      }
    },
    reserved: {
      encode: {
        // RFC3986 2.1: For consistency, URI producers and normalizers should
        // use uppercase hexadecimal digits for all percent-encodings.
        expression: /%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,
        map: {
          // gen-delims
          '%3A': ':',
          '%2F': '/',
          '%3F': '?',
          '%23': '#',
          '%5B': '[',
          '%5D': ']',
          '%40': '@',
          // sub-delims
          '%21': '!',
          '%24': '$',
          '%26': '&',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '='
        }
      }
    },
    urnpath: {
      // The characters under `encode` are the characters called out by RFC 2141 as being acceptable
      // for usage in a URN. RFC2141 also calls out "-", ".", and "_" as acceptable characters, but
      // these aren't encoded by encodeURIComponent, so we don't have to call them out here. Also
      // note that the colon character is not featured in the encoding map; this is because URI.js
      // gives the colons in URNs semantic meaning as the delimiters of path segements, and so it
      // should not appear unencoded in a segment itself.
      // See also the note above about RFC3986 and capitalalized hex digits.
      encode: {
        expression: /%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,
        map: {
          '%21': '!',
          '%24': '$',
          '%27': '\'',
          '%28': '(',
          '%29': ')',
          '%2A': '*',
          '%2B': '+',
          '%2C': ',',
          '%3B': ';',
          '%3D': '=',
          '%40': '@'
        }
      },
      // These characters are the characters called out by RFC2141 as "reserved" characters that
      // should never appear in a URN, plus the colon character (see note above).
      decode: {
        expression: /[\/\?#:]/g,
        map: {
          '/': '%2F',
          '?': '%3F',
          '#': '%23',
          ':': '%3A'
        }
      }
    }
  };
  URI.encodeQuery = function(string, escapeQuerySpace) {
    var escaped = URI.encode(string + '');
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    return escapeQuerySpace ? escaped.replace(/%20/g, '+') : escaped;
  };
  URI.decodeQuery = function(string, escapeQuerySpace) {
    string += '';
    if (escapeQuerySpace === undefined) {
      escapeQuerySpace = URI.escapeQuerySpace;
    }

    try {
      return URI.decode(escapeQuerySpace ? string.replace(/\+/g, '%20') : string);
    } catch(e) {
      // we're not going to mess with weird encodings,
      // give up and return the undecoded original string
      // see https://github.com/medialize/URI.js/issues/87
      // see https://github.com/medialize/URI.js/issues/92
      return string;
    }
  };
  // generate encode/decode path functions
  var _parts = {'encode':'encode', 'decode':'decode'};
  var _part;
  var generateAccessor = function(_group, _part) {
    return function(string) {
      try {
        return URI[_part](string + '').replace(URI.characters[_group][_part].expression, function(c) {
          return URI.characters[_group][_part].map[c];
        });
      } catch (e) {
        // we're not going to mess with weird encodings,
        // give up and return the undecoded original string
        // see https://github.com/medialize/URI.js/issues/87
        // see https://github.com/medialize/URI.js/issues/92
        return string;
      }
    };
  };

  for (_part in _parts) {
    URI[_part + 'PathSegment'] = generateAccessor('pathname', _parts[_part]);
    URI[_part + 'UrnPathSegment'] = generateAccessor('urnpath', _parts[_part]);
  }

  var generateSegmentedPathFunction = function(_sep, _codingFuncName, _innerCodingFuncName) {
    return function(string) {
      // Why pass in names of functions, rather than the function objects themselves? The
      // definitions of some functions (but in particular, URI.decode) will occasionally change due
      // to URI.js having ISO8859 and Unicode modes. Passing in the name and getting it will ensure
      // that the functions we use here are "fresh".
      var actualCodingFunc;
      if (!_innerCodingFuncName) {
        actualCodingFunc = URI[_codingFuncName];
      } else {
        actualCodingFunc = function(string) {
          return URI[_codingFuncName](URI[_innerCodingFuncName](string));
        };
      }

      var segments = (string + '').split(_sep);

      for (var i = 0, length = segments.length; i < length; i++) {
        segments[i] = actualCodingFunc(segments[i]);
      }

      return segments.join(_sep);
    };
  };

  // This takes place outside the above loop because we don't want, e.g., encodeUrnPath functions.
  URI.decodePath = generateSegmentedPathFunction('/', 'decodePathSegment');
  URI.decodeUrnPath = generateSegmentedPathFunction(':', 'decodeUrnPathSegment');
  URI.recodePath = generateSegmentedPathFunction('/', 'encodePathSegment', 'decode');
  URI.recodeUrnPath = generateSegmentedPathFunction(':', 'encodeUrnPathSegment', 'decode');

  URI.encodeReserved = generateAccessor('reserved', 'encode');

  URI.parse = function(string, parts) {
    var pos;
    if (!parts) {
      parts = {};
    }
    // [protocol"://"[username[":"password]"@"]hostname[":"port]"/"?][path]["?"querystring]["#"fragment]

    // extract fragment
    pos = string.indexOf('#');
    if (pos > -1) {
      // escaping?
      parts.fragment = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract query
    pos = string.indexOf('?');
    if (pos > -1) {
      // escaping?
      parts.query = string.substring(pos + 1) || null;
      string = string.substring(0, pos);
    }

    // extract protocol
    if (string.substring(0, 2) === '//') {
      // relative-scheme
      parts.protocol = null;
      string = string.substring(2);
      // extract "user:pass@host:port"
      string = URI.parseAuthority(string, parts);
    } else {
      pos = string.indexOf(':');
      if (pos > -1) {
        parts.protocol = string.substring(0, pos) || null;
        if (parts.protocol && !parts.protocol.match(URI.protocol_expression)) {
          // : may be within the path
          parts.protocol = undefined;
        } else if (string.substring(pos + 1, pos + 3) === '//') {
          string = string.substring(pos + 3);

          // extract "user:pass@host:port"
          string = URI.parseAuthority(string, parts);
        } else {
          string = string.substring(pos + 1);
          parts.urn = true;
        }
      }
    }

    // what's left must be the path
    parts.path = string;

    // and we're done
    return parts;
  };
  URI.parseHost = function(string, parts) {
    // Copy chrome, IE, opera backslash-handling behavior.
    // Back slashes before the query string get converted to forward slashes
    // See: https://github.com/joyent/node/blob/386fd24f49b0e9d1a8a076592a404168faeecc34/lib/url.js#L115-L124
    // See: https://code.google.com/p/chromium/issues/detail?id=25916
    // https://github.com/medialize/URI.js/pull/233
    string = string.replace(/\\/g, '/');

    // extract host:port
    var pos = string.indexOf('/');
    var bracketPos;
    var t;

    if (pos === -1) {
      pos = string.length;
    }

    if (string.charAt(0) === '[') {
      // IPv6 host - http://tools.ietf.org/html/draft-ietf-6man-text-addr-representation-04#section-6
      // I claim most client software breaks on IPv6 anyways. To simplify things, URI only accepts
      // IPv6+port in the format [2001:db8::1]:80 (for the time being)
      bracketPos = string.indexOf(']');
      parts.hostname = string.substring(1, bracketPos) || null;
      parts.port = string.substring(bracketPos + 2, pos) || null;
      if (parts.port === '/') {
        parts.port = null;
      }
    } else {
      var firstColon = string.indexOf(':');
      var firstSlash = string.indexOf('/');
      var nextColon = string.indexOf(':', firstColon + 1);
      if (nextColon !== -1 && (firstSlash === -1 || nextColon < firstSlash)) {
        // IPv6 host contains multiple colons - but no port
        // this notation is actually not allowed by RFC 3986, but we're a liberal parser
        parts.hostname = string.substring(0, pos) || null;
        parts.port = null;
      } else {
        t = string.substring(0, pos).split(':');
        parts.hostname = t[0] || null;
        parts.port = t[1] || null;
      }
    }

    if (parts.hostname && string.substring(pos).charAt(0) !== '/') {
      pos++;
      string = '/' + string;
    }

    return string.substring(pos) || '/';
  };
  URI.parseAuthority = function(string, parts) {
    string = URI.parseUserinfo(string, parts);
    return URI.parseHost(string, parts);
  };
  URI.parseUserinfo = function(string, parts) {
    // extract username:password
    var firstSlash = string.indexOf('/');
    var pos = string.lastIndexOf('@', firstSlash > -1 ? firstSlash : string.length - 1);
    var t;

    // authority@ must come before /path
    if (pos > -1 && (firstSlash === -1 || pos < firstSlash)) {
      t = string.substring(0, pos).split(':');
      parts.username = t[0] ? URI.decode(t[0]) : null;
      t.shift();
      parts.password = t[0] ? URI.decode(t.join(':')) : null;
      string = string.substring(pos + 1);
    } else {
      parts.username = null;
      parts.password = null;
    }

    return string;
  };
  URI.parseQuery = function(string, escapeQuerySpace) {
    if (!string) {
      return {};
    }

    // throw out the funky business - "?"[name"="value"&"]+
    string = string.replace(/&+/g, '&').replace(/^\?*&*|&+$/g, '');

    if (!string) {
      return {};
    }

    var items = {};
    var splits = string.split('&');
    var length = splits.length;
    var v, name, value;

    for (var i = 0; i < length; i++) {
      v = splits[i].split('=');
      name = URI.decodeQuery(v.shift(), escapeQuerySpace);
      // no "=" is null according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#collect-url-parameters
      value = v.length ? URI.decodeQuery(v.join('='), escapeQuerySpace) : null;

      if (hasOwn.call(items, name)) {
        if (typeof items[name] === 'string' || items[name] === null) {
          items[name] = [items[name]];
        }

        items[name].push(value);
      } else {
        items[name] = value;
      }
    }

    return items;
  };

  URI.build = function(parts) {
    var t = '';

    if (parts.protocol) {
      t += parts.protocol + ':';
    }

    if (!parts.urn && (t || parts.hostname)) {
      t += '//';
    }

    t += (URI.buildAuthority(parts) || '');

    if (typeof parts.path === 'string') {
      if (parts.path.charAt(0) !== '/' && typeof parts.hostname === 'string') {
        t += '/';
      }

      t += parts.path;
    }

    if (typeof parts.query === 'string' && parts.query) {
      t += '?' + parts.query;
    }

    if (typeof parts.fragment === 'string' && parts.fragment) {
      t += '#' + parts.fragment;
    }
    return t;
  };
  URI.buildHost = function(parts) {
    var t = '';

    if (!parts.hostname) {
      return '';
    } else if (URI.ip6_expression.test(parts.hostname)) {
      t += '[' + parts.hostname + ']';
    } else {
      t += parts.hostname;
    }

    if (parts.port) {
      t += ':' + parts.port;
    }

    return t;
  };
  URI.buildAuthority = function(parts) {
    return URI.buildUserinfo(parts) + URI.buildHost(parts);
  };
  URI.buildUserinfo = function(parts) {
    var t = '';

    if (parts.username) {
      t += URI.encode(parts.username);

      if (parts.password) {
        t += ':' + URI.encode(parts.password);
      }

      t += '@';
    }

    return t;
  };
  URI.buildQuery = function(data, duplicateQueryParameters, escapeQuerySpace) {
    // according to http://tools.ietf.org/html/rfc3986 or http://labs.apache.org/webarch/uri/rfc/rfc3986.html
    // being »-._~!$&'()*+,;=:@/?« %HEX and alnum are allowed
    // the RFC explicitly states ?/foo being a valid use case, no mention of parameter syntax!
    // URI.js treats the query string as being application/x-www-form-urlencoded
    // see http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type

    var t = '';
    var unique, key, i, length;
    for (key in data) {
      if (hasOwn.call(data, key) && key) {
        if (isArray(data[key])) {
          unique = {};
          for (i = 0, length = data[key].length; i < length; i++) {
            if (data[key][i] !== undefined && unique[data[key][i] + ''] === undefined) {
              t += '&' + URI.buildQueryParameter(key, data[key][i], escapeQuerySpace);
              if (duplicateQueryParameters !== true) {
                unique[data[key][i] + ''] = true;
              }
            }
          }
        } else if (data[key] !== undefined) {
          t += '&' + URI.buildQueryParameter(key, data[key], escapeQuerySpace);
        }
      }
    }

    return t.substring(1);
  };
  URI.buildQueryParameter = function(name, value, escapeQuerySpace) {
    // http://www.w3.org/TR/REC-html40/interact/forms.html#form-content-type -- application/x-www-form-urlencoded
    // don't append "=" for null values, according to http://dvcs.w3.org/hg/url/raw-file/tip/Overview.html#url-parameter-serialization
    return URI.encodeQuery(name, escapeQuerySpace) + (value !== null ? '=' + URI.encodeQuery(value, escapeQuerySpace) : '');
  };

  URI.addQuery = function(data, name, value) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          URI.addQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (data[name] === undefined) {
        data[name] = value;
        return;
      } else if (typeof data[name] === 'string') {
        data[name] = [data[name]];
      }

      if (!isArray(value)) {
        value = [value];
      }

      data[name] = (data[name] || []).concat(value);
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }
  };
  URI.removeQuery = function(data, name, value) {
    var i, length, key;

    if (isArray(name)) {
      for (i = 0, length = name.length; i < length; i++) {
        data[name[i]] = undefined;
      }
    } else if (getType(name) === 'RegExp') {
      for (key in data) {
        if (name.test(key)) {
          data[key] = undefined;
        }
      }
    } else if (typeof name === 'object') {
      for (key in name) {
        if (hasOwn.call(name, key)) {
          URI.removeQuery(data, key, name[key]);
        }
      }
    } else if (typeof name === 'string') {
      if (value !== undefined) {
        if (getType(value) === 'RegExp') {
          if (!isArray(data[name]) && value.test(data[name])) {
            data[name] = undefined;
          } else {
            data[name] = filterArrayValues(data[name], value);
          }
        } else if (data[name] === String(value) && (!isArray(value) || value.length === 1)) {
          data[name] = undefined;
        } else if (isArray(data[name])) {
          data[name] = filterArrayValues(data[name], value);
        }
      } else {
        data[name] = undefined;
      }
    } else {
      throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');
    }
  };
  URI.hasQuery = function(data, name, value, withinArray) {
    if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          if (!URI.hasQuery(data, key, name[key])) {
            return false;
          }
        }
      }

      return true;
    } else if (typeof name !== 'string') {
      throw new TypeError('URI.hasQuery() accepts an object, string as the name parameter');
    }

    switch (getType(value)) {
      case 'Undefined':
        // true if exists (but may be empty)
        return name in data; // data[name] !== undefined;

      case 'Boolean':
        // true if exists and non-empty
        var _booly = Boolean(isArray(data[name]) ? data[name].length : data[name]);
        return value === _booly;

      case 'Function':
        // allow complex comparison
        return !!value(data[name], name, data);

      case 'Array':
        if (!isArray(data[name])) {
          return false;
        }

        var op = withinArray ? arrayContains : arraysEqual;
        return op(data[name], value);

      case 'RegExp':
        if (!isArray(data[name])) {
          return Boolean(data[name] && data[name].match(value));
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      case 'Number':
        value = String(value);
        /* falls through */
      case 'String':
        if (!isArray(data[name])) {
          return data[name] === value;
        }

        if (!withinArray) {
          return false;
        }

        return arrayContains(data[name], value);

      default:
        throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');
    }
  };


  URI.commonPath = function(one, two) {
    var length = Math.min(one.length, two.length);
    var pos;

    // find first non-matching character
    for (pos = 0; pos < length; pos++) {
      if (one.charAt(pos) !== two.charAt(pos)) {
        pos--;
        break;
      }
    }

    if (pos < 1) {
      return one.charAt(0) === two.charAt(0) && one.charAt(0) === '/' ? '/' : '';
    }

    // revert to last /
    if (one.charAt(pos) !== '/' || two.charAt(pos) !== '/') {
      pos = one.substring(0, pos).lastIndexOf('/');
    }

    return one.substring(0, pos + 1);
  };

  URI.withinString = function(string, callback, options) {
    options || (options = {});
    var _start = options.start || URI.findUri.start;
    var _end = options.end || URI.findUri.end;
    var _trim = options.trim || URI.findUri.trim;
    var _attributeOpen = /[a-z0-9-]=["']?$/i;

    _start.lastIndex = 0;
    while (true) {
      var match = _start.exec(string);
      if (!match) {
        break;
      }

      var start = match.index;
      if (options.ignoreHtml) {
        // attribut(e=["']?$)
        var attributeOpen = string.slice(Math.max(start - 3, 0), start);
        if (attributeOpen && _attributeOpen.test(attributeOpen)) {
          continue;
        }
      }

      var end = start + string.slice(start).search(_end);
      var slice = string.slice(start, end).replace(_trim, '');
      if (options.ignore && options.ignore.test(slice)) {
        continue;
      }

      end = start + slice.length;
      var result = callback(slice, start, end, string);
      string = string.slice(0, start) + result + string.slice(end);
      _start.lastIndex = start + result.length;
    }

    _start.lastIndex = 0;
    return string;
  };

  URI.ensureValidHostname = function(v) {
    // Theoretically URIs allow percent-encoding in Hostnames (according to RFC 3986)
    // they are not part of DNS and therefore ignored by URI.js

    if (v.match(URI.invalid_hostname_characters)) {
      // test punycode
      if (!punycode) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-] and Punycode.js is not available');
      }

      if (punycode.toASCII(v).match(URI.invalid_hostname_characters)) {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }
    }
  };

  // noConflict
  URI.noConflict = function(removeAll) {
    if (removeAll) {
      var unconflicted = {
        URI: this.noConflict()
      };

      if (root.URITemplate && typeof root.URITemplate.noConflict === 'function') {
        unconflicted.URITemplate = root.URITemplate.noConflict();
      }

      if (root.IPv6 && typeof root.IPv6.noConflict === 'function') {
        unconflicted.IPv6 = root.IPv6.noConflict();
      }

      if (root.SecondLevelDomains && typeof root.SecondLevelDomains.noConflict === 'function') {
        unconflicted.SecondLevelDomains = root.SecondLevelDomains.noConflict();
      }

      return unconflicted;
    } else if (root.URI === this) {
      root.URI = _URI;
    }

    return this;
  };

  p.build = function(deferBuild) {
    if (deferBuild === true) {
      this._deferred_build = true;
    } else if (deferBuild === undefined || this._deferred_build) {
      this._string = URI.build(this._parts);
      this._deferred_build = false;
    }

    return this;
  };

  p.clone = function() {
    return new URI(this);
  };

  p.valueOf = p.toString = function() {
    return this.build(false)._string;
  };


  function generateSimpleAccessor(_part){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        this._parts[_part] = v || null;
        this.build(!build);
        return this;
      }
    };
  }

  function generatePrefixAccessor(_part, _key){
    return function(v, build) {
      if (v === undefined) {
        return this._parts[_part] || '';
      } else {
        if (v !== null) {
          v = v + '';
          if (v.charAt(0) === _key) {
            v = v.substring(1);
          }
        }

        this._parts[_part] = v;
        this.build(!build);
        return this;
      }
    };
  }

  p.protocol = generateSimpleAccessor('protocol');
  p.username = generateSimpleAccessor('username');
  p.password = generateSimpleAccessor('password');
  p.hostname = generateSimpleAccessor('hostname');
  p.port = generateSimpleAccessor('port');
  p.query = generatePrefixAccessor('query', '?');
  p.fragment = generatePrefixAccessor('fragment', '#');

  p.search = function(v, build) {
    var t = this.query(v, build);
    return typeof t === 'string' && t.length ? ('?' + t) : t;
  };
  p.hash = function(v, build) {
    var t = this.fragment(v, build);
    return typeof t === 'string' && t.length ? ('#' + t) : t;
  };

  p.pathname = function(v, build) {
    if (v === undefined || v === true) {
      var res = this._parts.path || (this._parts.hostname ? '/' : '');
      return v ? (this._parts.urn ? URI.decodeUrnPath : URI.decodePath)(res) : res;
    } else {
      if (this._parts.urn) {
        this._parts.path = v ? URI.recodeUrnPath(v) : '';
      } else {
        this._parts.path = v ? URI.recodePath(v) : '/';
      }
      this.build(!build);
      return this;
    }
  };
  p.path = p.pathname;
  p.href = function(href, build) {
    var key;

    if (href === undefined) {
      return this.toString();
    }

    this._string = '';
    this._parts = URI._parts();

    var _URI = href instanceof URI;
    var _object = typeof href === 'object' && (href.hostname || href.path || href.pathname);
    if (href.nodeName) {
      var attribute = URI.getDomAttribute(href);
      href = href[attribute] || '';
      _object = false;
    }

    // window.location is reported to be an object, but it's not the sort
    // of object we're looking for:
    // * location.protocol ends with a colon
    // * location.query != object.search
    // * location.hash != object.fragment
    // simply serializing the unknown object should do the trick
    // (for location, not for everything...)
    if (!_URI && _object && href.pathname !== undefined) {
      href = href.toString();
    }

    if (typeof href === 'string' || href instanceof String) {
      this._parts = URI.parse(String(href), this._parts);
    } else if (_URI || _object) {
      var src = _URI ? href._parts : href;
      for (key in src) {
        if (hasOwn.call(this._parts, key)) {
          this._parts[key] = src[key];
        }
      }
    } else {
      throw new TypeError('invalid input');
    }

    this.build(!build);
    return this;
  };

  // identification accessors
  p.is = function(what) {
    var ip = false;
    var ip4 = false;
    var ip6 = false;
    var name = false;
    var sld = false;
    var idn = false;
    var punycode = false;
    var relative = !this._parts.urn;

    if (this._parts.hostname) {
      relative = false;
      ip4 = URI.ip4_expression.test(this._parts.hostname);
      ip6 = URI.ip6_expression.test(this._parts.hostname);
      ip = ip4 || ip6;
      name = !ip;
      sld = name && SLD && SLD.has(this._parts.hostname);
      idn = name && URI.idn_expression.test(this._parts.hostname);
      punycode = name && URI.punycode_expression.test(this._parts.hostname);
    }

    switch (what.toLowerCase()) {
      case 'relative':
        return relative;

      case 'absolute':
        return !relative;

      // hostname identification
      case 'domain':
      case 'name':
        return name;

      case 'sld':
        return sld;

      case 'ip':
        return ip;

      case 'ip4':
      case 'ipv4':
      case 'inet4':
        return ip4;

      case 'ip6':
      case 'ipv6':
      case 'inet6':
        return ip6;

      case 'idn':
        return idn;

      case 'url':
        return !this._parts.urn;

      case 'urn':
        return !!this._parts.urn;

      case 'punycode':
        return punycode;
    }

    return null;
  };

  // component specific input validation
  var _protocol = p.protocol;
  var _port = p.port;
  var _hostname = p.hostname;

  p.protocol = function(v, build) {
    if (v !== undefined) {
      if (v) {
        // accept trailing ://
        v = v.replace(/:(\/\/)?$/, '');

        if (!v.match(URI.protocol_expression)) {
          throw new TypeError('Protocol "' + v + '" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');
        }
      }
    }
    return _protocol.call(this, v, build);
  };
  p.scheme = p.protocol;
  p.port = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      if (v === 0) {
        v = null;
      }

      if (v) {
        v += '';
        if (v.charAt(0) === ':') {
          v = v.substring(1);
        }

        if (v.match(/[^0-9]/)) {
          throw new TypeError('Port "' + v + '" contains characters other than [0-9]');
        }
      }
    }
    return _port.call(this, v, build);
  };
  p.hostname = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v !== undefined) {
      var x = {};
      var res = URI.parseHost(v, x);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      v = x.hostname;
    }
    return _hostname.call(this, v, build);
  };

  // compound accessors
  p.origin = function(v, build) {
    var parts;

    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      var protocol = this.protocol();
      var authority = this.authority();
      if (!authority) return '';
      return (protocol ? protocol + '://' : '') + this.authority();
    } else {
      var origin = URI(v);
      this
        .protocol(origin.protocol())
        .authority(origin.authority())
        .build(!build);
      return this;
    }
  };
  p.host = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildHost(this._parts) : '';
    } else {
      var res = URI.parseHost(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.authority = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      return this._parts.hostname ? URI.buildAuthority(this._parts) : '';
    } else {
      var res = URI.parseAuthority(v, this._parts);
      if (res !== '/') {
        throw new TypeError('Hostname "' + v + '" contains characters other than [A-Z0-9.-]');
      }

      this.build(!build);
      return this;
    }
  };
  p.userinfo = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined) {
      if (!this._parts.username) {
        return '';
      }

      var t = URI.buildUserinfo(this._parts);
      return t.substring(0, t.length -1);
    } else {
      if (v[v.length-1] !== '@') {
        v += '@';
      }

      URI.parseUserinfo(v, this._parts);
      this.build(!build);
      return this;
    }
  };
  p.resource = function(v, build) {
    var parts;

    if (v === undefined) {
      return this.path() + this.search() + this.hash();
    }

    parts = URI.parse(v);
    this._parts.path = parts.path;
    this._parts.query = parts.query;
    this._parts.fragment = parts.fragment;
    this.build(!build);
    return this;
  };

  // fraction accessors
  p.subdomain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    // convenience, return "www" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // grab domain and add another segment
      var end = this._parts.hostname.length - this.domain().length - 1;
      return this._parts.hostname.substring(0, end) || '';
    } else {
      var e = this._parts.hostname.length - this.domain().length;
      var sub = this._parts.hostname.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(sub));

      if (v && v.charAt(v.length - 1) !== '.') {
        v += '.';
      }

      if (v) {
        URI.ensureValidHostname(v);
      }

      this._parts.hostname = this._parts.hostname.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.domain = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // convenience, return "example.org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      // if hostname consists of 1 or 2 segments, it must be the domain
      var t = this._parts.hostname.match(/\./g);
      if (t && t.length < 2) {
        return this._parts.hostname;
      }

      // grab tld and add another segment
      var end = this._parts.hostname.length - this.tld(build).length - 1;
      end = this._parts.hostname.lastIndexOf('.', end -1) + 1;
      return this._parts.hostname.substring(end) || '';
    } else {
      if (!v) {
        throw new TypeError('cannot set domain empty');
      }

      URI.ensureValidHostname(v);

      if (!this._parts.hostname || this.is('IP')) {
        this._parts.hostname = v;
      } else {
        var replace = new RegExp(escapeRegEx(this.domain()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.tld = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (typeof v === 'boolean') {
      build = v;
      v = undefined;
    }

    // return "org" from "www.example.org"
    if (v === undefined) {
      if (!this._parts.hostname || this.is('IP')) {
        return '';
      }

      var pos = this._parts.hostname.lastIndexOf('.');
      var tld = this._parts.hostname.substring(pos + 1);

      if (build !== true && SLD && SLD.list[tld.toLowerCase()]) {
        return SLD.get(this._parts.hostname) || tld;
      }

      return tld;
    } else {
      var replace;

      if (!v) {
        throw new TypeError('cannot set TLD empty');
      } else if (v.match(/[^a-zA-Z0-9-]/)) {
        if (SLD && SLD.is(v)) {
          replace = new RegExp(escapeRegEx(this.tld()) + '$');
          this._parts.hostname = this._parts.hostname.replace(replace, v);
        } else {
          throw new TypeError('TLD "' + v + '" contains characters other than [A-Z0-9]');
        }
      } else if (!this._parts.hostname || this.is('IP')) {
        throw new ReferenceError('cannot set TLD on non-domain host');
      } else {
        replace = new RegExp(escapeRegEx(this.tld()) + '$');
        this._parts.hostname = this._parts.hostname.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.directory = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path && !this._parts.hostname) {
        return '';
      }

      if (this._parts.path === '/') {
        return '/';
      }

      var end = this._parts.path.length - this.filename().length - 1;
      var res = this._parts.path.substring(0, end) || (this._parts.hostname ? '/' : '');

      return v ? URI.decodePath(res) : res;

    } else {
      var e = this._parts.path.length - this.filename().length;
      var directory = this._parts.path.substring(0, e);
      var replace = new RegExp('^' + escapeRegEx(directory));

      // fully qualifier directories begin with a slash
      if (!this.is('relative')) {
        if (!v) {
          v = '/';
        }

        if (v.charAt(0) !== '/') {
          v = '/' + v;
        }
      }

      // directories always end with a slash
      if (v && v.charAt(v.length - 1) !== '/') {
        v += '/';
      }

      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);
      this.build(!build);
      return this;
    }
  };
  p.filename = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var pos = this._parts.path.lastIndexOf('/');
      var res = this._parts.path.substring(pos+1);

      return v ? URI.decodePathSegment(res) : res;
    } else {
      var mutatedDirectory = false;

      if (v.charAt(0) === '/') {
        v = v.substring(1);
      }

      if (v.match(/\.?\//)) {
        mutatedDirectory = true;
      }

      var replace = new RegExp(escapeRegEx(this.filename()) + '$');
      v = URI.recodePath(v);
      this._parts.path = this._parts.path.replace(replace, v);

      if (mutatedDirectory) {
        this.normalizePath(build);
      } else {
        this.build(!build);
      }

      return this;
    }
  };
  p.suffix = function(v, build) {
    if (this._parts.urn) {
      return v === undefined ? '' : this;
    }

    if (v === undefined || v === true) {
      if (!this._parts.path || this._parts.path === '/') {
        return '';
      }

      var filename = this.filename();
      var pos = filename.lastIndexOf('.');
      var s, res;

      if (pos === -1) {
        return '';
      }

      // suffix may only contain alnum characters (yup, I made this up.)
      s = filename.substring(pos+1);
      res = (/^[a-z0-9%]+$/i).test(s) ? s : '';
      return v ? URI.decodePathSegment(res) : res;
    } else {
      if (v.charAt(0) === '.') {
        v = v.substring(1);
      }

      var suffix = this.suffix();
      var replace;

      if (!suffix) {
        if (!v) {
          return this;
        }

        this._parts.path += '.' + URI.recodePath(v);
      } else if (!v) {
        replace = new RegExp(escapeRegEx('.' + suffix) + '$');
      } else {
        replace = new RegExp(escapeRegEx(suffix) + '$');
      }

      if (replace) {
        v = URI.recodePath(v);
        this._parts.path = this._parts.path.replace(replace, v);
      }

      this.build(!build);
      return this;
    }
  };
  p.segment = function(segment, v, build) {
    var separator = this._parts.urn ? ':' : '/';
    var path = this.path();
    var absolute = path.substring(0, 1) === '/';
    var segments = path.split(separator);

    if (segment !== undefined && typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (segment !== undefined && typeof segment !== 'number') {
      throw new Error('Bad segment "' + segment + '", must be 0-based integer');
    }

    if (absolute) {
      segments.shift();
    }

    if (segment < 0) {
      // allow negative indexes to address from the end
      segment = Math.max(segments.length + segment, 0);
    }

    if (v === undefined) {
      /*jshint laxbreak: true */
      return segment === undefined
        ? segments
        : segments[segment];
      /*jshint laxbreak: false */
    } else if (segment === null || segments[segment] === undefined) {
      if (isArray(v)) {
        segments = [];
        // collapse empty elements within array
        for (var i=0, l=v.length; i < l; i++) {
          if (!v[i].length && (!segments.length || !segments[segments.length -1].length)) {
            continue;
          }

          if (segments.length && !segments[segments.length -1].length) {
            segments.pop();
          }

          segments.push(trimSlashes(v[i]));
        }
      } else if (v || typeof v === 'string') {
        v = trimSlashes(v);
        if (segments[segments.length -1] === '') {
          // empty trailing elements have to be overwritten
          // to prevent results such as /foo//bar
          segments[segments.length -1] = v;
        } else {
          segments.push(v);
        }
      }
    } else {
      if (v) {
        segments[segment] = trimSlashes(v);
      } else {
        segments.splice(segment, 1);
      }
    }

    if (absolute) {
      segments.unshift('');
    }

    return this.path(segments.join(separator), build);
  };
  p.segmentCoded = function(segment, v, build) {
    var segments, i, l;

    if (typeof segment !== 'number') {
      build = v;
      v = segment;
      segment = undefined;
    }

    if (v === undefined) {
      segments = this.segment(segment, v, build);
      if (!isArray(segments)) {
        segments = segments !== undefined ? URI.decode(segments) : undefined;
      } else {
        for (i = 0, l = segments.length; i < l; i++) {
          segments[i] = URI.decode(segments[i]);
        }
      }

      return segments;
    }

    if (!isArray(v)) {
      v = (typeof v === 'string' || v instanceof String) ? URI.encode(v) : v;
    } else {
      for (i = 0, l = v.length; i < l; i++) {
        v[i] = URI.encode(v[i]);
      }
    }

    return this.segment(segment, v, build);
  };

  // mutating query string
  var q = p.query;
  p.query = function(v, build) {
    if (v === true) {
      return URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    } else if (typeof v === 'function') {
      var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
      var result = v.call(this, data);
      this._parts.query = URI.buildQuery(result || data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else if (v !== undefined && typeof v !== 'string') {
      this._parts.query = URI.buildQuery(v, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
      this.build(!build);
      return this;
    } else {
      return q.call(this, v, build);
    }
  };
  p.setQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);

    if (typeof name === 'string' || name instanceof String) {
      data[name] = value !== undefined ? value : null;
    } else if (typeof name === 'object') {
      for (var key in name) {
        if (hasOwn.call(name, key)) {
          data[key] = name[key];
        }
      }
    } else {
      throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');
    }

    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.addQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.addQuery(data, name, value === undefined ? null : value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.removeQuery = function(name, value, build) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    URI.removeQuery(data, name, value);
    this._parts.query = URI.buildQuery(data, this._parts.duplicateQueryParameters, this._parts.escapeQuerySpace);
    if (typeof name !== 'string') {
      build = value;
    }

    this.build(!build);
    return this;
  };
  p.hasQuery = function(name, value, withinArray) {
    var data = URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace);
    return URI.hasQuery(data, name, value, withinArray);
  };
  p.setSearch = p.setQuery;
  p.addSearch = p.addQuery;
  p.removeSearch = p.removeQuery;
  p.hasSearch = p.hasQuery;

  // sanitizing URLs
  p.normalize = function() {
    if (this._parts.urn) {
      return this
        .normalizeProtocol(false)
        .normalizePath(false)
        .normalizeQuery(false)
        .normalizeFragment(false)
        .build();
    }

    return this
      .normalizeProtocol(false)
      .normalizeHostname(false)
      .normalizePort(false)
      .normalizePath(false)
      .normalizeQuery(false)
      .normalizeFragment(false)
      .build();
  };
  p.normalizeProtocol = function(build) {
    if (typeof this._parts.protocol === 'string') {
      this._parts.protocol = this._parts.protocol.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizeHostname = function(build) {
    if (this._parts.hostname) {
      if (this.is('IDN') && punycode) {
        this._parts.hostname = punycode.toASCII(this._parts.hostname);
      } else if (this.is('IPv6') && IPv6) {
        this._parts.hostname = IPv6.best(this._parts.hostname);
      }

      this._parts.hostname = this._parts.hostname.toLowerCase();
      this.build(!build);
    }

    return this;
  };
  p.normalizePort = function(build) {
    // remove port of it's the protocol's default
    if (typeof this._parts.protocol === 'string' && this._parts.port === URI.defaultPorts[this._parts.protocol]) {
      this._parts.port = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizePath = function(build) {
    var _path = this._parts.path;
    if (!_path) {
      return this;
    }

    if (this._parts.urn) {
      this._parts.path = URI.recodeUrnPath(this._parts.path);
      this.build(!build);
      return this;
    }

    if (this._parts.path === '/') {
      return this;
    }

    var _was_relative;
    var _leadingParents = '';
    var _parent, _pos;

    // handle relative paths
    if (_path.charAt(0) !== '/') {
      _was_relative = true;
      _path = '/' + _path;
    }

    // handle relative files (as opposed to directories)
    if (_path.slice(-3) === '/..' || _path.slice(-2) === '/.') {
      _path += '/';
    }

    // resolve simples
    _path = _path
      .replace(/(\/(\.\/)+)|(\/\.$)/g, '/')
      .replace(/\/{2,}/g, '/');

    // remember leading parents
    if (_was_relative) {
      _leadingParents = _path.substring(1).match(/^(\.\.\/)+/) || '';
      if (_leadingParents) {
        _leadingParents = _leadingParents[0];
      }
    }

    // resolve parents
    while (true) {
      _parent = _path.indexOf('/..');
      if (_parent === -1) {
        // no more ../ to resolve
        break;
      } else if (_parent === 0) {
        // top level cannot be relative, skip it
        _path = _path.substring(3);
        continue;
      }

      _pos = _path.substring(0, _parent).lastIndexOf('/');
      if (_pos === -1) {
        _pos = _parent;
      }
      _path = _path.substring(0, _pos) + _path.substring(_parent + 3);
    }

    // revert to relative
    if (_was_relative && this.is('relative')) {
      _path = _leadingParents + _path.substring(1);
    }

    _path = URI.recodePath(_path);
    this._parts.path = _path;
    this.build(!build);
    return this;
  };
  p.normalizePathname = p.normalizePath;
  p.normalizeQuery = function(build) {
    if (typeof this._parts.query === 'string') {
      if (!this._parts.query.length) {
        this._parts.query = null;
      } else {
        this.query(URI.parseQuery(this._parts.query, this._parts.escapeQuerySpace));
      }

      this.build(!build);
    }

    return this;
  };
  p.normalizeFragment = function(build) {
    if (!this._parts.fragment) {
      this._parts.fragment = null;
      this.build(!build);
    }

    return this;
  };
  p.normalizeSearch = p.normalizeQuery;
  p.normalizeHash = p.normalizeFragment;

  p.iso8859 = function() {
    // expect unicode input, iso8859 output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = escape;
    URI.decode = decodeURIComponent;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.unicode = function() {
    // expect iso8859 input, unicode output
    var e = URI.encode;
    var d = URI.decode;

    URI.encode = strictEncodeURIComponent;
    URI.decode = unescape;
    try {
      this.normalize();
    } finally {
      URI.encode = e;
      URI.decode = d;
    }
    return this;
  };

  p.readable = function() {
    var uri = this.clone();
    // removing username, password, because they shouldn't be displayed according to RFC 3986
    uri.username('').password('').normalize();
    var t = '';
    if (uri._parts.protocol) {
      t += uri._parts.protocol + '://';
    }

    if (uri._parts.hostname) {
      if (uri.is('punycode') && punycode) {
        t += punycode.toUnicode(uri._parts.hostname);
        if (uri._parts.port) {
          t += ':' + uri._parts.port;
        }
      } else {
        t += uri.host();
      }
    }

    if (uri._parts.hostname && uri._parts.path && uri._parts.path.charAt(0) !== '/') {
      t += '/';
    }

    t += uri.path(true);
    if (uri._parts.query) {
      var q = '';
      for (var i = 0, qp = uri._parts.query.split('&'), l = qp.length; i < l; i++) {
        var kv = (qp[i] || '').split('=');
        q += '&' + URI.decodeQuery(kv[0], this._parts.escapeQuerySpace)
          .replace(/&/g, '%26');

        if (kv[1] !== undefined) {
          q += '=' + URI.decodeQuery(kv[1], this._parts.escapeQuerySpace)
            .replace(/&/g, '%26');
        }
      }
      t += '?' + q.substring(1);
    }

    t += URI.decodeQuery(uri.hash(), true);
    return t;
  };

  // resolving relative and absolute URLs
  p.absoluteTo = function(base) {
    var resolved = this.clone();
    var properties = ['protocol', 'username', 'password', 'hostname', 'port'];
    var basedir, i, p;

    if (this._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    if (!(base instanceof URI)) {
      base = new URI(base);
    }

    if (!resolved._parts.protocol) {
      resolved._parts.protocol = base._parts.protocol;
    }

    if (this._parts.hostname) {
      return resolved;
    }

    for (i = 0; (p = properties[i]); i++) {
      resolved._parts[p] = base._parts[p];
    }

    if (!resolved._parts.path) {
      resolved._parts.path = base._parts.path;
      if (!resolved._parts.query) {
        resolved._parts.query = base._parts.query;
      }
    } else if (resolved._parts.path.substring(-2) === '..') {
      resolved._parts.path += '/';
    }

    if (resolved.path().charAt(0) !== '/') {
      basedir = base.directory();
      basedir = basedir ? basedir : base.path().indexOf('/') === 0 ? '/' : '';
      resolved._parts.path = (basedir ? (basedir + '/') : '') + resolved._parts.path;
      resolved.normalizePath();
    }

    resolved.build();
    return resolved;
  };
  p.relativeTo = function(base) {
    var relative = this.clone().normalize();
    var relativeParts, baseParts, common, relativePath, basePath;

    if (relative._parts.urn) {
      throw new Error('URNs do not have any generally defined hierarchical components');
    }

    base = new URI(base).normalize();
    relativeParts = relative._parts;
    baseParts = base._parts;
    relativePath = relative.path();
    basePath = base.path();

    if (relativePath.charAt(0) !== '/') {
      throw new Error('URI is already relative');
    }

    if (basePath.charAt(0) !== '/') {
      throw new Error('Cannot calculate a URI relative to another relative URI');
    }

    if (relativeParts.protocol === baseParts.protocol) {
      relativeParts.protocol = null;
    }

    if (relativeParts.username !== baseParts.username || relativeParts.password !== baseParts.password) {
      return relative.build();
    }

    if (relativeParts.protocol !== null || relativeParts.username !== null || relativeParts.password !== null) {
      return relative.build();
    }

    if (relativeParts.hostname === baseParts.hostname && relativeParts.port === baseParts.port) {
      relativeParts.hostname = null;
      relativeParts.port = null;
    } else {
      return relative.build();
    }

    if (relativePath === basePath) {
      relativeParts.path = '';
      return relative.build();
    }

    // determine common sub path
    common = URI.commonPath(relativePath, basePath);

    // If the paths have nothing in common, return a relative URL with the absolute path.
    if (!common) {
      return relative.build();
    }

    var parents = baseParts.path
      .substring(common.length)
      .replace(/[^\/]*$/, '')
      .replace(/.*?\//g, '../');

    relativeParts.path = (parents + relativeParts.path.substring(common.length)) || './';

    return relative.build();
  };

  // comparing URIs
  p.equals = function(uri) {
    var one = this.clone();
    var two = new URI(uri);
    var one_map = {};
    var two_map = {};
    var checked = {};
    var one_query, two_query, key;

    one.normalize();
    two.normalize();

    // exact match
    if (one.toString() === two.toString()) {
      return true;
    }

    // extract query string
    one_query = one.query();
    two_query = two.query();
    one.query('');
    two.query('');

    // definitely not equal if not even non-query parts match
    if (one.toString() !== two.toString()) {
      return false;
    }

    // query parameters have the same length, even if they're permuted
    if (one_query.length !== two_query.length) {
      return false;
    }

    one_map = URI.parseQuery(one_query, this._parts.escapeQuerySpace);
    two_map = URI.parseQuery(two_query, this._parts.escapeQuerySpace);

    for (key in one_map) {
      if (hasOwn.call(one_map, key)) {
        if (!isArray(one_map[key])) {
          if (one_map[key] !== two_map[key]) {
            return false;
          }
        } else if (!arraysEqual(one_map[key], two_map[key])) {
          return false;
        }

        checked[key] = true;
      }
    }

    for (key in two_map) {
      if (hasOwn.call(two_map, key)) {
        if (!checked[key]) {
          // two contains a parameter not present in one
          return false;
        }
      }
    }

    return true;
  };

  // state
  p.duplicateQueryParameters = function(v) {
    this._parts.duplicateQueryParameters = !!v;
    return this;
  };

  p.escapeQuerySpace = function(v) {
    this._parts.escapeQuerySpace = !!v;
    return this;
  };

  return URI;
}));

},{"./IPv6":87,"./SecondLevelDomains":88,"./punycode":90}],90:[function(require,module,exports){
(function (global){
/*! http://mths.be/punycode v1.2.3 by @mathias */
;(function(root) {

	/** Detect free variables */
	var freeExports = typeof exports == 'object' && exports;
	var freeModule = typeof module == 'object' && module &&
		module.exports == freeExports && module;
	var freeGlobal = typeof global == 'object' && global;
	if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
		root = freeGlobal;
	}

	/**
	 * The `punycode` object.
	 * @name punycode
	 * @type Object
	 */
	var punycode,

	/** Highest positive signed 32-bit float value */
	maxInt = 2147483647, // aka. 0x7FFFFFFF or 2^31-1

	/** Bootstring parameters */
	base = 36,
	tMin = 1,
	tMax = 26,
	skew = 38,
	damp = 700,
	initialBias = 72,
	initialN = 128, // 0x80
	delimiter = '-', // '\x2D'

	/** Regular expressions */
	regexPunycode = /^xn--/,
	regexNonASCII = /[^ -~]/, // unprintable ASCII chars + non-ASCII chars
	regexSeparators = /\x2E|\u3002|\uFF0E|\uFF61/g, // RFC 3490 separators

	/** Error messages */
	errors = {
		'overflow': 'Overflow: input needs wider integers to process',
		'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
		'invalid-input': 'Invalid input'
	},

	/** Convenience shortcuts */
	baseMinusTMin = base - tMin,
	floor = Math.floor,
	stringFromCharCode = String.fromCharCode,

	/** Temporary variable */
	key;

	/*--------------------------------------------------------------------------*/

	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
		throw RangeError(errors[type]);
	}

	/**
	 * A generic `Array#map` utility function.
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} callback The function that gets called for every array
	 * item.
	 * @returns {Array} A new array of values returned by the callback function.
	 */
	function map(array, fn) {
		var length = array.length;
		while (length--) {
			array[length] = fn(array[length]);
		}
		return array;
	}

	/**
	 * A simple `Array#map`-like wrapper to work with domain name strings.
	 * @private
	 * @param {String} domain The domain name.
	 * @param {Function} callback The function that gets called for every
	 * character.
	 * @returns {Array} A new string of characters returned by the callback
	 * function.
	 */
	function mapDomain(string, fn) {
		return map(string.split(regexSeparators), fn).join('.');
	}

	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <http://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(string) {
		var output = [],
		    counter = 0,
		    length = string.length,
		    value,
		    extra;
		while (counter < length) {
			value = string.charCodeAt(counter++);
			if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
				// high surrogate, and there is a next character
				extra = string.charCodeAt(counter++);
				if ((extra & 0xFC00) == 0xDC00) { // low surrogate
					output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
				} else {
					// unmatched surrogate; only append this code unit, in case the next
					// code unit is the high surrogate of a surrogate pair
					output.push(value);
					counter--;
				}
			} else {
				output.push(value);
			}
		}
		return output;
	}

	/**
	 * Creates a string based on an array of numeric code points.
	 * @see `punycode.ucs2.decode`
	 * @memberOf punycode.ucs2
	 * @name encode
	 * @param {Array} codePoints The array of numeric code points.
	 * @returns {String} The new Unicode string (UCS-2).
	 */
	function ucs2encode(array) {
		return map(array, function(value) {
			var output = '';
			if (value > 0xFFFF) {
				value -= 0x10000;
				output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
				value = 0xDC00 | value & 0x3FF;
			}
			output += stringFromCharCode(value);
			return output;
		}).join('');
	}

	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
		if (codePoint - 48 < 10) {
			return codePoint - 22;
		}
		if (codePoint - 65 < 26) {
			return codePoint - 65;
		}
		if (codePoint - 97 < 26) {
			return codePoint - 97;
		}
		return base;
	}

	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
		//  0..25 map to ASCII a..z or A..Z
		// 26..35 map to ASCII 0..9
		return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
	}

	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * http://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
		var k = 0;
		delta = firstTime ? floor(delta / damp) : delta >> 1;
		delta += floor(delta / numPoints);
		for (/* no initialization */; delta > baseMinusTMin * tMax >> 1; k += base) {
			delta = floor(delta / baseMinusTMin);
		}
		return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
	}

	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
		// Don't use UCS-2
		var output = [],
		    inputLength = input.length,
		    out,
		    i = 0,
		    n = initialN,
		    bias = initialBias,
		    basic,
		    j,
		    index,
		    oldi,
		    w,
		    k,
		    digit,
		    t,
		    length,
		    /** Cached calculation results */
		    baseMinusT;

		// Handle the basic code points: let `basic` be the number of input code
		// points before the last delimiter, or `0` if there is none, then copy
		// the first basic code points to the output.

		basic = input.lastIndexOf(delimiter);
		if (basic < 0) {
			basic = 0;
		}

		for (j = 0; j < basic; ++j) {
			// if it's not a basic code point
			if (input.charCodeAt(j) >= 0x80) {
				error('not-basic');
			}
			output.push(input.charCodeAt(j));
		}

		// Main decoding loop: start just after the last delimiter if any basic code
		// points were copied; start at the beginning otherwise.

		for (index = basic > 0 ? basic + 1 : 0; index < inputLength; /* no final expression */) {

			// `index` is the index of the next character to be consumed.
			// Decode a generalized variable-length integer into `delta`,
			// which gets added to `i`. The overflow checking is easier
			// if we increase `i` as we go, then subtract off its starting
			// value at the end to obtain `delta`.
			for (oldi = i, w = 1, k = base; /* no condition */; k += base) {

				if (index >= inputLength) {
					error('invalid-input');
				}

				digit = basicToDigit(input.charCodeAt(index++));

				if (digit >= base || digit > floor((maxInt - i) / w)) {
					error('overflow');
				}

				i += digit * w;
				t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);

				if (digit < t) {
					break;
				}

				baseMinusT = base - t;
				if (w > floor(maxInt / baseMinusT)) {
					error('overflow');
				}

				w *= baseMinusT;

			}

			out = output.length + 1;
			bias = adapt(i - oldi, out, oldi == 0);

			// `i` was supposed to wrap around from `out` to `0`,
			// incrementing `n` each time, so we'll fix that now:
			if (floor(i / out) > maxInt - n) {
				error('overflow');
			}

			n += floor(i / out);
			i %= out;

			// Insert `n` at position `i` of the output
			output.splice(i++, 0, n);

		}

		return ucs2encode(output);
	}

	/**
	 * Converts a string of Unicode symbols to a Punycode string of ASCII-only
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(input) {
		var n,
		    delta,
		    handledCPCount,
		    basicLength,
		    bias,
		    j,
		    m,
		    q,
		    k,
		    t,
		    currentValue,
		    output = [],
		    /** `inputLength` will hold the number of code points in `input`. */
		    inputLength,
		    /** Cached calculation results */
		    handledCPCountPlusOne,
		    baseMinusT,
		    qMinusT;

		// Convert the input in UCS-2 to Unicode
		input = ucs2decode(input);

		// Cache the length
		inputLength = input.length;

		// Initialize the state
		n = initialN;
		delta = 0;
		bias = initialBias;

		// Handle the basic code points
		for (j = 0; j < inputLength; ++j) {
			currentValue = input[j];
			if (currentValue < 0x80) {
				output.push(stringFromCharCode(currentValue));
			}
		}

		handledCPCount = basicLength = output.length;

		// `handledCPCount` is the number of code points that have been handled;
		// `basicLength` is the number of basic code points.

		// Finish the basic string - if it is not empty - with a delimiter
		if (basicLength) {
			output.push(delimiter);
		}

		// Main encoding loop:
		while (handledCPCount < inputLength) {

			// All non-basic code points < n have been handled already. Find the next
			// larger one:
			for (m = maxInt, j = 0; j < inputLength; ++j) {
				currentValue = input[j];
				if (currentValue >= n && currentValue < m) {
					m = currentValue;
				}
			}

			// Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
			// but guard against overflow
			handledCPCountPlusOne = handledCPCount + 1;
			if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
				error('overflow');
			}

			delta += (m - n) * handledCPCountPlusOne;
			n = m;

			for (j = 0; j < inputLength; ++j) {
				currentValue = input[j];

				if (currentValue < n && ++delta > maxInt) {
					error('overflow');
				}

				if (currentValue == n) {
					// Represent delta as a generalized variable-length integer
					for (q = delta, k = base; /* no condition */; k += base) {
						t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
						if (q < t) {
							break;
						}
						qMinusT = q - t;
						baseMinusT = base - t;
						output.push(
							stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0))
						);
						q = floor(qMinusT / baseMinusT);
					}

					output.push(stringFromCharCode(digitToBasic(q, 0)));
					bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
					delta = 0;
					++handledCPCount;
				}
			}

			++delta;
			++n;

		}
		return output.join('');
	}

	/**
	 * Converts a Punycode string representing a domain name to Unicode. Only the
	 * Punycoded parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it on a string that has already been converted to
	 * Unicode.
	 * @memberOf punycode
	 * @param {String} domain The Punycode domain name to convert to Unicode.
	 * @returns {String} The Unicode representation of the given Punycode
	 * string.
	 */
	function toUnicode(domain) {
		return mapDomain(domain, function(string) {
			return regexPunycode.test(string)
				? decode(string.slice(4).toLowerCase())
				: string;
		});
	}

	/**
	 * Converts a Unicode string representing a domain name to Punycode. Only the
	 * non-ASCII parts of the domain name will be converted, i.e. it doesn't
	 * matter if you call it with a domain that's already in ASCII.
	 * @memberOf punycode
	 * @param {String} domain The domain name to convert, as a Unicode string.
	 * @returns {String} The Punycode representation of the given domain name.
	 */
	function toASCII(domain) {
		return mapDomain(domain, function(string) {
			return regexNonASCII.test(string)
				? 'xn--' + encode(string)
				: string;
		});
	}

	/*--------------------------------------------------------------------------*/

	/** Define the public API */
	punycode = {
		/**
		 * A string representing the current Punycode.js version number.
		 * @memberOf punycode
		 * @type String
		 */
		'version': '1.2.3',
		/**
		 * An object of methods to convert from JavaScript's internal character
		 * representation (UCS-2) to Unicode code points, and back.
		 * @see <http://mathiasbynens.be/notes/javascript-encoding>
		 * @memberOf punycode
		 * @type Object
		 */
		'ucs2': {
			'decode': ucs2decode,
			'encode': ucs2encode
		},
		'decode': decode,
		'encode': encode,
		'toASCII': toASCII,
		'toUnicode': toUnicode
	};

	/** Expose `punycode` */
	// Some AMD build optimizers, like r.js, check for specific condition patterns
	// like the following:
	if (
		typeof define == 'function' &&
		typeof define.amd == 'object' &&
		define.amd
	) {
		define(function() {
			return punycode;
		});
	}	else if (freeExports && !freeExports.nodeType) {
		if (freeModule) { // in Node.js or RingoJS v0.8.0+
			freeModule.exports = punycode;
		} else { // in Narwhal or RingoJS v0.7.0-
			for (key in punycode) {
				punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
			}
		}
	} else { // in Rhino or a web browser
		root.punycode = punycode;
	}

}(this));

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],91:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports['default'] = ['JsonWebToken', function (JsonWebToken) {
  return (function (_JsonWebToken) {
    _inherits(AccessToken, _JsonWebToken);

    function AccessToken() {
      _classCallCheck(this, AccessToken);

      _get(Object.getPrototypeOf(AccessToken.prototype), 'constructor', this).apply(this, arguments);
    }

    _createClass(AccessToken, [{
      key: 'claims',
      get: function get() {
        return this.body;
      }
    }]);

    return AccessToken;
  })(JsonWebToken);
}];
module.exports = exports['default'];
},{}],92:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['urijs', 'HttpClient', 'lodash.assign', 'lodash.merge', 'JsonRequestTransform', 'JsonResponseTransform', function (URI, HttpClient, assign, merge, JsonRequestTransform, JsonResponseTransform) {

  /**
   * @typedef TokenProvider
   * @property {TokenProvider.tokenAsync} tokenAsync
   */

  /**
   * @name TokenProvider.tokenAsync
   * @function
   * @returns {Promise.<auth/AccessToken>}
   */

  return (function () {
    /**
     * @param {String} baseUrl
     * @param {TokenProvider} tokenProvider
     */

    function ApiClient(baseUrl, tokenProvider) {
      _classCallCheck(this, ApiClient);

      this._baseUrl = baseUrl;
      this._tokenProvider = tokenProvider;
      this._client = new HttpClient();
      this._client.requestTransforms.push(new JsonRequestTransform());
      this._client.responseTransforms.push(new JsonResponseTransform());
    }

    _createClass(ApiClient, [{
      key: 'getAsync',
      value: function getAsync(url, params, options) {
        url = URI(url).query(params || {}).toString();
        return this.fetchAsync(assign({
          url: url,
          method: 'GET'
        }, options));
      }
    }, {
      key: 'postAsync',
      value: function postAsync(url, data, options) {
        return this.fetchAsync(assign({
          url: url,
          method: 'POST',
          body: data
        }, options));
      }
    }, {
      key: 'putAsync',
      value: function putAsync(url, data, options) {
        return this.fetchAsync(assign({
          url: url,
          method: 'PUT',
          body: data
        }, options));
      }
    }, {
      key: 'deleteAsync',
      value: function deleteAsync(url, options) {
        return this.fetchAsync(assign({
          url: url,
          method: 'DELETE'
        }, options));
      }
    }, {
      key: 'fetchAsync',
      value: function fetchAsync(request) {
        var _this = this;

        request.url = this._baseUrl + request.url;
        if (request.authorize === false) {
          return this._client.fetchAsync(request);
        } else if (request.token) {
          return this._client.fetchAsync(merge(request, {
            headers: {
              'Authorization': 'Bearer ' + request.token
            }
          }));
        } else {
          return this._client.fetchAsync(function () {
            return _this._tokenProvider.tokenAsync().then(function (token) {
              return merge(request, {
                headers: {
                  'Authorization': 'Bearer ' + token.value
                }
              });
            });
          });
        }
      }
    }]);

    return ApiClient;
  })();
}];
module.exports = exports['default'];
},{}],93:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

exports['default'] = ['@event', 'HttpClient', 'JsonRequestTransform', 'JsonResponseTransform', 'AccessToken', 'RefreshToken', 'moment', 'common/formatError', 'common/log', function (event, HttpClient, JsonRequestTransform, JsonResponseTransform, AccessToken, RefreshToken, moment, formatError, log) {
  return (function () {
    var _instanceInitializers = {};

    /**
     * @param {Object} params
     * @param {String} params.refreshUrl
     * @param {Boolean} [params.autoRefresh=false]
     */

    function AuthorizationClient() {
      var _ref = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var refreshUrl = _ref.refreshUrl;
      var _ref$autoRefresh = _ref.autoRefresh;
      var autoRefresh = _ref$autoRefresh === undefined ? false : _ref$autoRefresh;

      _classCallCheck(this, AuthorizationClient);

      _defineDecoratedPropertyDescriptor(this, 'didUpdate', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'didUnauthorize', _instanceInitializers);

      this._refreshUrl = refreshUrl;
      this._autoRefresh = autoRefresh;
      this._completionHandlers = [];
      this._refreshPending = false;
      this._refreshToken = null;
      this._accessToken = null;
      this._client = new HttpClient();
      this._client.requestTransforms.push(new JsonRequestTransform());
      this._client.responseTransforms.push(new JsonResponseTransform());
      this._refreshTimeoutId = null;
      this._claims = Object.freeze({});
    }

    _createDecoratedClass(AuthorizationClient, [{
      key: 'authorize',

      /**
       * @param {Object} tokens
       * @param {String} refresh_token
       * @param {String} [access_token]
       */
      value: function authorize(_ref2) {
        var refresh_token = _ref2.refresh_token;
        var _ref2$access_token = _ref2.access_token;
        var access_token = _ref2$access_token === undefined ? null : _ref2$access_token;

        if (!refresh_token) {
          throw new Error('Refresh token is required.');
        }
        this._refreshToken = new RefreshToken(refresh_token);
        this._accessToken = access_token && new AccessToken(access_token);
        if (this._accessToken) {
          this._onUpdate();
        } else if (this._autoRefresh) {
          this._refreshPending = false;
          this._refreshAsync();
        }
      }
    }, {
      key: 'unauthorize',
      value: function unauthorize() {
        if (this._refreshToken) {
          this._refreshToken = null;
          this._accessToken = null;
          this._claims = Object.freeze({});
          this._didUnauthorize.raise();
        }
      }
    }, {
      key: 'tokenAsync',
      value: function tokenAsync() {
        return regeneratorRuntime.async(function tokenAsync$(context$3$0) {
          var _this = this;

          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              return context$3$0.abrupt('return', new Promise(function (resolve, reject) {
                var tenSecondsFromNow = moment().add(10, 'seconds');
                if (_this._accessToken && !_this._accessToken.doesExpire(tenSecondsFromNow)) {
                  resolve(_this._accessToken);
                } else {
                  _this._completionHandlers.push(resolve);
                  _this._refreshAsync();
                }
              }));

            case 1:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      }
    }, {
      key: '_refreshAsync',
      value: function _refreshAsync() {
        var refreshToken, result, accessToken;
        return regeneratorRuntime.async(function _refreshAsync$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              if (!(this._refreshPending || !this.isAuthorized)) {
                context$3$0.next = 2;
                break;
              }

              return context$3$0.abrupt('return');

            case 2:
              this._refreshPending = true;

              if (this._refreshToken.doesExpire(moment().add(10, 'seconds'))) {
                context$3$0.next = 18;
                break;
              }

              refreshToken = this._refreshToken;
              context$3$0.prev = 5;
              context$3$0.next = 8;
              return regeneratorRuntime.awrap(this._client.fetchAsync({
                url: this._refreshUrl,
                method: 'POST',
                body: {
                  token: refreshToken.value
                }
              }));

            case 8:
              result = context$3$0.sent;
              accessToken = new AccessToken(result.access_token);

              if (this._refreshToken === refreshToken) {
                this._accessToken = accessToken;
                this._refreshPending = false;
                this._onUpdate();
              }

              context$3$0.next = 16;
              break;

            case 13:
              context$3$0.prev = 13;
              context$3$0.t0 = context$3$0['catch'](5);

              if (this._refreshToken === refreshToken) {
                if (context$3$0.t0.statusCode === 403) {
                  this.unauthorize();
                } else {
                  log(formatError(context$3$0.t0));
                }
              }

            case 16:
              context$3$0.next = 19;
              break;

            case 18:
              this.unauthorize();

            case 19:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this, [[5, 13]]);
      }
    }, {
      key: '_onUpdate',
      value: function _onUpdate() {
        this._claims = Object.freeze(this._accessToken.claims);
        var handlers = this._completionHandlers;
        this._completionHandlers = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = handlers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var handler = _step.value;

            handler(this._accessToken);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        this._didUpdate.raise(this._accessToken);
        if (this._autoRefresh) {
          this._refreshBeforeExpire();
        }
      }
    }, {
      key: '_refreshBeforeExpire',
      value: function _refreshBeforeExpire() {
        var _this2 = this;

        clearTimeout(this._refreshTimeoutId);
        if (this._accessToken.expiresAt) {
          var delay = moment.duration(this._accessToken.expiresAt - moment().add(10, 'seconds')).asMilliseconds();
          this._refreshTimeoutId = setTimeout(function () {
            _this2._refreshAsync();
          }, Math.max(delay, 0));
        }
      }
    }, {
      key: 'didUpdate',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'didUnauthorize',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'isAuthorized',
      get: function get() {
        return !!this._refreshToken;
      }
    }, {
      key: 'claims',
      get: function get() {
        return this._claims;
      }
    }], null, _instanceInitializers);

    return AuthorizationClient;
  })();
}];
module.exports = exports['default'];

// Store a local copy of the refresh token so that we can compare
// references after the fetch to make sure we don't update incorrectly
// if the client configuration is updated during the fetch.

// Refresh the token.
},{}],94:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

exports["default"] = [function () {
  return (function () {
    function EventEmitter() {
      _classCallCheck(this, EventEmitter);

      this._listeners = {};
    }

    _createClass(EventEmitter, [{
      key: "on",
      value: function on() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.addListener.apply(this, args);
      }
    }, {
      key: "off",
      value: function off() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.removeListener.apply(this, args);
      }

      /**
       * @param {String} event
       * @param {Function} listener
       */
    }, {
      key: "addListener",
      value: function addListener(event, listener) {
        if (!this._listeners[event]) {
          this._listeners[event] = [];
        }
        this._listeners[event].push(listener);
      }

      /**
       * @param {String} event
       * @param {Function} listener
       */
    }, {
      key: "removeListener",
      value: function removeListener(event, listener) {
        if (this._listeners[event]) {
          var index = this._listeners[event].indexOf(listener);
          if (index > -1) {
            this._listeners[event].splice(index, 1);
            if (this._listeners[event].length === 0) {
              delete this._listeners[event];
            }
          }
        }
      }

      /**
       * @param {String} event
       * @param {Array} [args=[]]
       */
    }, {
      key: "emit",
      value: function emit(event) {
        var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

        if (this._listeners[event]) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this._listeners[event].slice()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var listener = _step.value;

              listener.apply(undefined, args);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        }
      }
    }]);

    return EventEmitter;
  })();
}];
module.exports = exports["default"];
},{}],95:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = [function () {
  return (function () {
    function FormDataSerializer() {
      _classCallCheck(this, FormDataSerializer);
    }

    _createClass(FormDataSerializer, [{
      key: 'serialize',
      value: function serialize(obj) {
        var form = new FormData();
        var stack = Object.keys(obj).map(function (key) {
          return {
            path: key,
            value: obj[key]
          };
        });
        while (stack.length) {
          var field = stack.shift();
          if (typeof field.value === 'string' || typeof field.value === 'number' || typeof field.value === 'boolean' || field.value instanceof File) {
            form.append(field.path, field.value);
          } else if (typeof field.value === 'object' && field.value !== null) {
            stack.push.apply(stack, Object.keys(field.value).map(function (key) {
              return {
                path: field.path + '[' + key + ']',
                value: field.value[key]
              };
            }));
          }
        }
        return form;
      }
    }]);

    return FormDataSerializer;
  })();
}];
module.exports = exports['default'];
},{}],96:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['jquery?', function ($) {
  return (function () {
    function FormSerializer() {
      _classCallCheck(this, FormSerializer);
    }

    _createClass(FormSerializer, [{
      key: 'serialize',
      value: function serialize(form) {
        var obj = {};
        var selector = 'input, textarea, select';
        var fields = $ ? $(selector, form) : form.querySelectorAll(selector);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = fields[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var field = _step.value;

            var segments = field.name.replace(/\]/g, '').split('[');
            var node = obj;
            for (var i = 0; i < segments.length - 1; i++) {
              var seg = segments[i];
              var next = segments[i + 1];
              if (!node[seg]) {
                if (isNaN(Number(next))) {
                  node[seg] = {};
                } else {
                  node[seg] = [];
                }
              }
              node = node[seg];
            }
            node[segments[segments.length - 1]] = field.value;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return obj;
      }
    }]);

    return FormSerializer;
  })();
}];
module.exports = exports['default'];
},{}],97:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['window', 'setTimeout', 'lodash.assign', 'fetch', 'moment', function (window, setTimeout, assign, fetch, moment) {
  return (function () {
    function HttpClient() {
      _classCallCheck(this, HttpClient);

      this._maxDelay = moment.duration(10, 'seconds').asMilliseconds();
      this.requestTransforms = [];
      this.responseTransforms = [];

      this.requestTransforms.push({
        transformRequest: function transformRequest(request) {
          if (!request.headers) {
            request.headers = {};
          }
          return request;
        }
      });
    }

    /**
     * @param {String} [url]
     * @param {Object|Function} options
     */

    _createClass(HttpClient, [{
      key: 'fetchAsync',
      value: function fetchAsync(url, options) {
        var requestFactory, retries, request, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, transform, response, delay, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2;

        return regeneratorRuntime.async(function fetchAsync$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              requestFactory = this._createRequestFactory(url, options);
              retries = 0;

            case 2:
              if (!true) {
                context$3$0.next = 70;
                break;
              }

              context$3$0.next = 5;
              return regeneratorRuntime.awrap(requestFactory());

            case 5:
              request = context$3$0.sent;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$3$0.prev = 9;

              for (_iterator = this.requestTransforms[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                transform = _step.value;

                request = transform.transformRequest(request);
              }

              context$3$0.next = 17;
              break;

            case 13:
              context$3$0.prev = 13;
              context$3$0.t0 = context$3$0['catch'](9);
              _didIteratorError = true;
              _iteratorError = context$3$0.t0;

            case 17:
              context$3$0.prev = 17;
              context$3$0.prev = 18;

              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }

            case 20:
              context$3$0.prev = 20;

              if (!_didIteratorError) {
                context$3$0.next = 23;
                break;
              }

              throw _iteratorError;

            case 23:
              return context$3$0.finish(20);

            case 24:
              return context$3$0.finish(17);

            case 25:
              response = undefined;
              context$3$0.prev = 26;
              context$3$0.next = 29;
              return regeneratorRuntime.awrap(fetch.call(window, request.url, request));

            case 29:
              response = context$3$0.sent;
              context$3$0.next = 40;
              break;

            case 32:
              context$3$0.prev = 32;
              context$3$0.t1 = context$3$0['catch'](26);

              // Assume lost internet connection?
              retries += 1;
              delay = Math.pow(2, retries) * 100;

              if (delay > this._maxDelay) {
                delay = this._maxDelay;
              }
              context$3$0.next = 39;
              return regeneratorRuntime.awrap(this._waitAsync(delay));

            case 39:
              return context$3$0.abrupt('continue', 2);

            case 40:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              context$3$0.prev = 43;
              _iterator2 = this.responseTransforms[Symbol.iterator]();

            case 45:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                context$3$0.next = 53;
                break;
              }

              transform = _step2.value;
              context$3$0.next = 49;
              return regeneratorRuntime.awrap(transform.transformResponseAsync(response));

            case 49:
              response = context$3$0.sent;

            case 50:
              _iteratorNormalCompletion2 = true;
              context$3$0.next = 45;
              break;

            case 53:
              context$3$0.next = 59;
              break;

            case 55:
              context$3$0.prev = 55;
              context$3$0.t2 = context$3$0['catch'](43);
              _didIteratorError2 = true;
              _iteratorError2 = context$3$0.t2;

            case 59:
              context$3$0.prev = 59;
              context$3$0.prev = 60;

              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }

            case 62:
              context$3$0.prev = 62;

              if (!_didIteratorError2) {
                context$3$0.next = 65;
                break;
              }

              throw _iteratorError2;

            case 65:
              return context$3$0.finish(62);

            case 66:
              return context$3$0.finish(59);

            case 67:
              return context$3$0.abrupt('return', response);

            case 70:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this, [[9, 13, 17, 25], [18,, 20, 24], [26, 32], [43, 55, 59, 67], [60,, 62, 66]]);
      }

      /**
       * @param {String} [url]
       * @param {Object|Function} options
       * @returns {Function}
       */
    }, {
      key: '_createRequestFactory',
      value: function _createRequestFactory(url, options) {
        var requestFactory;
        if (typeof url === 'string') {
          if (typeof options === 'function') {
            requestFactory = function () {
              return assign({
                url: url
              }, options());
            };
          } else {
            requestFactory = function () {
              return assign({
                url: url
              }, options);
            };
          }
        } else if (typeof url === 'function') {
          requestFactory = url;
        } else {
          requestFactory = function () {
            return url;
          };
        }
        return requestFactory;
      }
    }, {
      key: '_waitAsync',
      value: function _waitAsync(duration) {
        return new Promise(function (resolve) {
          setTimeout(function () {
            return resolve();
          }, duration);
        });
      }
    }]);

    return HttpClient;
  })();
}];
module.exports = exports['default'];
},{}],98:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports['default'] = [function () {
  return (function (_Error) {
    _inherits(HttpError, _Error);

    function HttpError(_ref) {
      var status = _ref.status;
      var message = _ref.message;
      var _ref$errors = _ref.errors;
      var errors = _ref$errors === undefined ? [] : _ref$errors;

      _classCallCheck(this, HttpError);

      _get(Object.getPrototypeOf(HttpError.prototype), 'constructor', this).call(this);
      this.name = 'HttpError';
      this.statusCode = status;
      this.message = message;
      this.errors = errors;
    }

    return HttpError;
  })(Error);
}];
module.exports = exports['default'];
},{}],99:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['lodash.isplainobject', function (isPlainObject) {
  return (function () {
    function JsonRequestTransform() {
      _classCallCheck(this, JsonRequestTransform);
    }

    _createClass(JsonRequestTransform, [{
      key: 'transformRequest',
      value: function transformRequest(request) {
        if (request.body !== undefined && !(request.body instanceof File)) {
          request.body = JSON.stringify(request.body);
          request.headers['Content-Type'] = 'application/json';
        }
        request.headers['Accept'] = 'application/json';
        return request;
      }
    }]);

    return JsonRequestTransform;
  })();
}];
module.exports = exports['default'];
},{}],100:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['HttpError', 'common/log', function (HttpError, log) {
  return (function () {
    function JsonResponseTransform() {
      _classCallCheck(this, JsonResponseTransform);
    }

    _createClass(JsonResponseTransform, [{
      key: 'transformResponseAsync',
      value: function transformResponseAsync(response) {
        var contentType, text, body;
        return regeneratorRuntime.async(function transformResponseAsync$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              contentType = response.headers.get('Content-Type') || '';

              if (!(contentType.indexOf('application/json') > -1)) {
                context$3$0.next = 20;
                break;
              }

              context$3$0.next = 4;
              return regeneratorRuntime.awrap(response.text());

            case 4:
              text = context$3$0.sent;
              context$3$0.prev = 5;

              body = JSON.parse(text);
              context$3$0.next = 13;
              break;

            case 9:
              context$3$0.prev = 9;
              context$3$0.t0 = context$3$0['catch'](5);

              log(text);
              throw context$3$0.t0;

            case 13:
              if (!response.ok) {
                context$3$0.next = 17;
                break;
              }

              return context$3$0.abrupt('return', body);

            case 17:
              throw new HttpError({
                status: response.status,
                message: body.errors && body.errors[0] && body.errors[0].message || response.statusText,
                errors: body.errors || body.error && [body.error] || []
              });

            case 18:
              context$3$0.next = 25;
              break;

            case 20:
              if (!response.ok) {
                context$3$0.next = 24;
                break;
              }

              return context$3$0.abrupt('return', response);

            case 24:
              throw new HttpError({
                status: response.status,
                message: response.statusText
              });

            case 25:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this, [[5, 9]]);
      }
    }]);

    return JsonResponseTransform;
  })();
}];
module.exports = exports['default'];
},{}],101:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['moment', 'atob', function (moment, atob) {
  return (function () {
    /**
     * @param {String} value
     */

    function JsonWebToken(value) {
      _classCallCheck(this, JsonWebToken);

      this.body = JSON.parse(atob(value.split('.')[1]));
      this.value = value;
      this.expiresAt = this.body.exp && moment.unix(this.body.exp) || null;
    }

    _createClass(JsonWebToken, [{
      key: 'doesExpire',
      value: function doesExpire(asOf) {
        if (this.expiresAt) {
          asOf = asOf || new Date();
          return asOf >= this.expiresAt;
        } else {
          return false;
        }
      }
    }]);

    return JsonWebToken;
  })();
}];
module.exports = exports['default'];
},{}],102:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['window', function (window) {
  return (function () {
    function LocalStorage() {
      _classCallCheck(this, LocalStorage);

      try {
        window.localStorage.setItem('test', '1');
        window.localStorage.removeItem('test');
        this._isLocalStorageSupported = true;
      } catch (err) {
        this._isLocalStorageSupported = false;
      }
    }

    _createClass(LocalStorage, [{
      key: 'get',
      value: function get(key) {
        if (window.localStorage[key] !== undefined) {
          return JSON.parse(window.localStorage[key]);
        }
      }
    }, {
      key: 'set',
      value: function set(key, value) {
        if (!this._isLocalStorageSupported) {
          throw new Error('Private browsing mode is not supported.');
        }
        if (value === undefined) {
          delete window.localStorage[key];
        } else {
          window.localStorage[key] = JSON.stringify(value);
        }
      }
    }, {
      key: 'delete',
      value: function _delete(key) {
        delete window.localStorage[key];
      }
    }]);

    return LocalStorage;
  })();
}];
module.exports = exports['default'];
},{}],103:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

exports['default'] = ['immutable', 'window', '@bind', '@event', 'common/ReactiveValue', 'Modernizr', 'urijs', function (Immutable, window, bind, event, ReactiveValue, Modernizr, URI) {
  return (function () {
    var _instanceInitializers = {};

    function Location() {
      _classCallCheck(this, Location);

      _defineDecoratedPropertyDescriptor(this, 'didNavigate', _instanceInitializers);

      this._state = new ReactiveValue({});
      this._update();
      if (Modernizr.history) {
        window.addEventListener('popstate', this._window_onPopState);
        window.addEventListener('click', this._window_onClick);
      }
      this._is404ing = false;
    }

    _createDecoratedClass(Location, [{
      key: 'dispose',
      value: function dispose() {
        if (Modernizr.history) {
          window.removeEventListener('popstate', this._window_onPopState);
          window.removeEventListener('click', this._window_onClick);
        }
      }
    }, {
      key: 'go',
      value: function go(url) {
        // Support relative urls.
        if (!/^\//.test(url)) {
          var base = this.path;
          if (!/\/$/.test(base)) {
            base += '/';
          }
          url = base + url;
        }
        if (url !== this.url) {
          if (Modernizr.history) {
            window.history.pushState(null, null, url);
            this._update();
          } else {
            window.location.href = window.location.protocol + '//' + window.location.host + url;
          }
        }
      }
    }, {
      key: '_update',
      value: function _update() {
        var url = window.location.pathname + window.location.search;
        var path = window.location.pathname;
        var query = URI.parseQuery(window.location.search);
        this._state.set({ url: url, path: path, query: query });
        this._didNavigate.raise();
      }
    }, {
      key: '_window_onPopState',
      decorators: [bind],
      value: function _window_onPopState() {
        this._update();
      }
    }, {
      key: '_window_onClick',
      decorators: [bind],
      value: function _window_onClick(e) {
        var element = e.target;
        while (element && element.nodeName && element.nodeName.toLowerCase() !== 'a') {
          element = element.parentNode;
        }
        if (element && element.nodeName) {
          var href = element.href;
          var uri = new URI(href);
          if (uri.host() === window.location.host && uri.protocol() + ':' === window.location.protocol && !element.hasAttribute('data-external')) {
            e.preventDefault();
            this.go(element.getAttribute('href'));
          }
        }
      }
    }, {
      key: 'didNavigate',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'url',
      get: function get() {
        return this._state.get().url;
      }
    }, {
      key: 'path',
      get: function get() {
        return this._state.get().path;
      }
    }, {
      key: 'query',
      get: function get() {
        return this._state.get().query;
      }
    }], null, _instanceInitializers);

    return Location;
  })();
}];
module.exports = exports['default'];
},{}],104:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['HttpClient', 'JsonRequestTransform', 'JsonResponseTransform', 'immutable', 'common/log', function (HttpClient, JsonRequestTransform, JsonResponseTransform, Immutable, log) {
  return (function () {
    /**
     * @param {Object} params
     * @param {String} params.loginUrl
     * @param {String} params.logoutUrl
     * @param {Object.<String, Object>} [params.profileData=null]
     * @param {String} params.profileData.access_token
     * @param {String} params.profileData.refresh_token
     */

    function MultiProfileAuthenticationClient(_ref) {
      var loginUrl = _ref.loginUrl;
      var logoutUrl = _ref.logoutUrl;
      var _ref$profileData = _ref.profileData;
      var profileData = _ref$profileData === undefined ? null : _ref$profileData;

      _classCallCheck(this, MultiProfileAuthenticationClient);

      this._loginUrl = loginUrl;
      this._logoutUrl = logoutUrl;
      this._client = new HttpClient();
      this._client.requestTransforms.push(new JsonRequestTransform());
      this._client.responseTransforms.push(new JsonResponseTransform());
      this._profiles = this._profilesFromData(profileData);
    }

    _createClass(MultiProfileAuthenticationClient, [{
      key: 'loginAsync',
      value: function loginAsync(credentials) {
        var data;
        return regeneratorRuntime.async(function loginAsync$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.next = 2;
              return regeneratorRuntime.awrap(this._client.fetchAsync({
                url: this._loginUrl,
                method: 'POST',
                body: credentials
              }));

            case 2:
              data = context$3$0.sent;

              this._profiles = this._profilesFromData(data);

              if (!(this._profiles.size === 0)) {
                context$3$0.next = 6;
                break;
              }

              throw new Error('Authentication returned zero results.');

            case 6:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'setProfiles',
      value: function setProfiles(profiles) {
        this._profiles = this._profilesFromData(profiles);
      }
    }, {
      key: 'logout',
      value: function logout() {
        var profiles = this._profiles;
        this._profiles = this._profiles.clear();
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = profiles.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var profile = _step.value;

            this._client.fetchAsync({
              url: this._logoutUrl,
              method: 'POST',
              body: {
                token: profile.refresh_token
              }
            })['catch'](function (err) {
              return log(err.name + ': ' + err.message);
            });
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }
    }, {
      key: '_profilesFromData',
      value: function _profilesFromData(data) {
        var profiles = new Immutable.Map();
        for (var key in data) {
          profiles = profiles.set(key, data[key]);
        }
        return profiles;
      }
    }, {
      key: 'profiles',
      get: function get() {
        return this._profiles;
      }
    }]);

    return MultiProfileAuthenticationClient;
  })();
}];
module.exports = exports['default'];
},{}],105:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

exports['default'] = ['LocalStorage', 'MultiProfileAuthenticationClient', 'AuthorizationClient', '@event', '@bind', 'immutable', 'AccessToken', function (LocalStorage, MultiProfileAuthenticationClient, AuthorizationClient, event, bind, Immutable, AccessToken) {
  return (function () {
    var _instanceInitializers = {};

    function MultiProfileAuthorizationService(_ref) {
      var loginUrl = _ref.loginUrl;
      var logoutUrl = _ref.logoutUrl;
      var refreshUrl = _ref.refreshUrl;
      var _ref$autoRefresh = _ref.autoRefresh;
      var autoRefresh = _ref$autoRefresh === undefined ? false : _ref$autoRefresh;
      var _ref$storageKey = _ref.storageKey;
      var storageKey = _ref$storageKey === undefined ? 'authData' : _ref$storageKey;

      _classCallCheck(this, MultiProfileAuthorizationService);

      _defineDecoratedPropertyDescriptor(this, 'didLogin', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'didLogout', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'didUpdate', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'didUnauthorize', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'didSwitchProfile', _instanceInitializers);

      this._store = new LocalStorage();
      this._storageKey = storageKey;
      var authData = this._store.get(this._storageKey) || {
        profileData: null,
        lastProfile: null
      };
      this._authentication = new MultiProfileAuthenticationClient({
        loginUrl: loginUrl,
        logoutUrl: logoutUrl,
        profileData: authData.profileData
      });
      this._authorization = new AuthorizationClient({
        refreshUrl: refreshUrl,
        autoRefresh: autoRefresh
      });
      this._authorization.didUpdate += this._authorization_didUpdate;
      this._authorization.didUnauthorize += this._authorization_didUnauthorize;
      this._profiles = new Immutable.List();
      this._currentProfile = authData.lastProfile;

      if (this.isLoggedIn) {
        this._update();
      }
    }

    _createDecoratedClass(MultiProfileAuthorizationService, [{
      key: 'switchProfile',
      value: function switchProfile(key) {
        if (!this._authentication.profiles.has(key)) {
          throw new Error('Profile ' + key + ' does not exist.');
        }
        if (key !== this._currentProfile) {
          this._currentProfile = key;
          this._authorization.authorize(this._authentication.profiles.get(key));
          this._didSwitchProfile.raise();
        }
      }
    }, {
      key: 'tokenAsync',
      value: function tokenAsync() {
        return this._authorization.tokenAsync();
      }
    }, {
      key: 'setProfiles',
      value: function setProfiles(profiles) {
        this._authentication.setProfiles(profiles);
        this._update();
        this._didLogin.raise();
      }
    }, {
      key: 'loginAsync',
      value: function loginAsync(credentials) {
        return regeneratorRuntime.async(function loginAsync$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.next = 2;
              return regeneratorRuntime.awrap(this._authentication.loginAsync(credentials));

            case 2:
              this._update();
              this._didLogin.raise();

            case 4:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'logout',
      value: function logout() {
        if (this.isLoggedIn) {
          this._store['delete'](this._storageKey);
          this._authorization.unauthorize();
          this._authentication.logout();
          this._update();
          this._didLogout.raise();
        }
      }
    }, {
      key: '_authorization_didUpdate',
      decorators: [bind],
      value: function _authorization_didUpdate(accessToken) {
        var profileData = JSON.parse(JSON.stringify(this._authentication.profiles));
        profileData[this._currentProfile].access_token = accessToken.value;
        this._store.set(this._storageKey, {
          profileData: profileData,
          lastProfile: this._currentProfile
        });
        this._didUpdate.raise(accessToken);
      }
    }, {
      key: '_authorization_didUnauthorize',
      decorators: [bind],
      value: function _authorization_didUnauthorize() {
        this._didUnauthorize.raise();
      }
    }, {
      key: '_update',
      value: function _update() {
        var _this = this;

        // reset
        this._profiles = this._profiles.clear();

        if (this.isLoggedIn) {
          // update profiles
          this._authentication.profiles.forEach(function (value, key) {
            _this._profiles = _this._profiles.push(Object.freeze({
              key: key,
              claims: new AccessToken(value.access_token).claims
            }));
          });

          // update authorization
          if (!this._authentication.profiles.has(this._currentProfile)) {
            var keys = new Immutable.List(this._authentication.profiles.keys());
            var initial = keys.filter(function (x) {
              return _this._authentication.profiles.get(x).is_default;
            }).first();
            if (!initial) {
              initial = keys.first();
            }
            this._currentProfile = initial;
          }
          this._authorization.authorize(this._authentication.profiles.get(this._currentProfile));
        }
      }
    }, {
      key: 'didLogin',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'didLogout',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'didUpdate',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'didUnauthorize',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'didSwitchProfile',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'isLoggedIn',
      get: function get() {
        return this._authentication.profiles.size > 0;
      }
    }, {
      key: 'claims',
      get: function get() {
        return this._authorization.claims;
      }
    }, {
      key: 'profiles',
      get: function get() {
        return this._profiles;
      }
    }], null, _instanceInitializers);

    return MultiProfileAuthorizationService;
  })();
}];
module.exports = exports['default'];
},{}],106:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports['default'] = ['JsonWebToken', function (JsonWebToken) {
  return (function (_JsonWebToken) {
    _inherits(RefreshToken, _JsonWebToken);

    function RefreshToken(value) {
      _classCallCheck(this, RefreshToken);

      _get(Object.getPrototypeOf(RefreshToken.prototype), 'constructor', this).call(this, value);
      this.refreshUrl = this.body.uri;
    }

    return RefreshToken;
  })(JsonWebToken);
}];
module.exports = exports['default'];
},{}],107:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

exports['default'] = ['immutable', '@event', 'common/ReactiveValue', function (Immutable, event, ReactiveValue) {
  return (function () {
    var _instanceInitializers = {};

    function Router() {
      _classCallCheck(this, Router);

      _defineDecoratedPropertyDescriptor(this, 'didNavigate', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'did404', _instanceInitializers);

      this.routes = new Immutable.List();
      this._state = new ReactiveValue({});
      this._is404ing = false;
    }

    _createDecoratedClass(Router, [{
      key: 'update',
      value: function update(_ref) {
        var _this = this;

        var url = _ref.url;
        var query = _ref.query;
        var path = _ref.path;

        var route = null;
        var params = null;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = this.routes.slice()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var r = _step.value;

            var match = r.match(url);
            if (match) {
              route = r;
              params = match;
              break;
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        if (route) {
          this._state.set({ url: url, path: path, route: route, params: params, query: query });
          this._didNavigate.raise();
        } else {
          if (this._is404ing) {
            throw new Error('No routes exist for ' + path);
          }
          this._is404ing = true;
          this._did404.raise({
            resolve: function resolve() {
              _this._state.set({ url: url, path: path, route: route, params: params, query: query });
            }
          });
          this._is404ing = false;
        }
      }
    }, {
      key: 'didNavigate',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'did404',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'route',
      get: function get() {
        return this._state.get().route;
      }
    }, {
      key: 'url',
      get: function get() {
        return this._state.get().url;
      }
    }, {
      key: 'path',
      get: function get() {
        return this._state.get().path;
      }
    }, {
      key: 'query',
      get: function get() {
        return this._state.get().query;
      }
    }, {
      key: 'params',
      get: function get() {
        return this._state.get().params;
      }
    }], null, _instanceInitializers);

    return Router;
  })();
}];
module.exports = exports['default'];
},{}],108:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['HttpClient', 'JsonRequestTransform', 'JsonResponseTransform', function (HttpClient, JsonRequestTransform, JsonResponseTransform) {
  return (function () {
    /**
     * @param {Object} params
     * @param {String} params.loginUrl
     * @param {String} params.logoutUrl
     * @param {Object} [params.tokenData=null]
     * @param {String} params.tokenData.access_token
     * @param {String} params.tokenData.refresh_token
     */

    function SingleProfileAuthenticationClient(_ref) {
      var loginUrl = _ref.loginUrl;
      var logoutUrl = _ref.logoutUrl;
      var _ref$tokenData = _ref.tokenData;
      var tokenData = _ref$tokenData === undefined ? null : _ref$tokenData;

      _classCallCheck(this, SingleProfileAuthenticationClient);

      this._loginUrl = loginUrl;
      this._logoutUrl = logoutUrl;
      this._tokens = tokenData && Object.freeze(tokenData);
      this._client = new HttpClient();
      this._client.requestTransforms.push(new JsonRequestTransform());
      this._client.responseTransforms.push(new JsonResponseTransform());
    }

    _createClass(SingleProfileAuthenticationClient, [{
      key: 'loginAsync',
      value: function loginAsync(credentials) {
        return regeneratorRuntime.async(function loginAsync$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              context$3$0.next = 2;
              return regeneratorRuntime.awrap(this._client.fetchAsync({
                url: this._loginUrl,
                method: 'POST',
                body: credentials
              }));

            case 2:
              this._tokens = context$3$0.sent;

              this._tokens = Object.freeze(this._tokens);

            case 4:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'logoutAsync',
      value: function logoutAsync() {
        return regeneratorRuntime.async(function logoutAsync$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              if (!this._tokens) {
                context$3$0.next = 4;
                break;
              }

              context$3$0.next = 3;
              return regeneratorRuntime.awrap(this._client.fetchAsync({
                url: this._logoutUrl,
                method: 'POST',
                body: {
                  token: this._tokens.refresh_token
                }
              }));

            case 3:
              this._tokens = null;

            case 4:
            case 'end':
              return context$3$0.stop();
          }
        }, null, this);
      }
    }, {
      key: 'tokens',
      get: function get() {
        return this._tokens;
      }
    }]);

    return SingleProfileAuthenticationClient;
  })();
}];
module.exports = exports['default'];
},{}],109:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

exports['default'] = ['SocketChannel', '@event', '@bind', 'moment', 'WebSocket', 'urijs', 'lodash.assign', 'common/log', 'common/formatError', function (SocketChannel, event, bind, moment, WebSocket, URI, assign, log, formatError) {

  return (function () {
    var _instanceInitializers = {};

    /**
     * @param {String} url
     * @param {http/AuthorizationService} auth
     */

    function Socket(_ref) {
      var url = _ref.url;
      var auth = _ref.auth;

      _classCallCheck(this, Socket);

      _defineDecoratedPropertyDescriptor(this, 'didConnect', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'didDisconnect', _instanceInitializers);

      _defineDecoratedPropertyDescriptor(this, 'didReceiveMessage', _instanceInitializers);

      this._url = url;
      this._queue = [];
      this._ws = null;
      this._waiting = false;
      this._channels = [];
      this._retries = 0;
      this._token = null;
      this._auth = auth;
      this._auth.didUpdate += this._auth_didUpdate;

      this.connected = false;
    }

    _createDecoratedClass(Socket, [{
      key: 'send',

      /**
       * @param {String} message
       */
      value: function send(message) {
        this._enqueue('send', message);
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        this.close();
      }
    }, {
      key: 'close',
      value: function close() {
        this._auth.didUpdate -= this._auth_didUpdate;
        this._channels.forEach(function (x) {
          return x.close();
        });
      }
    }, {
      key: 'channel',
      value: function channel() {
        var _this = this;

        var channel = new SocketChannel(this);
        this._channels.push(channel);

        channel.onClose.addListenerOnce(function () {
          var index = _this._channels.indexOf(channel);
          if (index > -1) {
            _this._channels.splice(index, 1);
            if (_this._channels.length === 0 && _this.connected) {
              _this._enqueue('close');
            }
          }
        });

        this._enqueue('open');
        return channel;
      }

      /**
       * @param {String} command
       * @param {String} data
       */
    }, {
      key: '_enqueue',
      value: function _enqueue(command, data) {
        this._queue.push({
          command: command,
          data: data
        });
        this._resume();
      }
    }, {
      key: '_resume',
      value: function _resume() {
        var _this2 = this;

        while (this._queue.length > 0) {
          if (this._waiting) {
            break;
          }
          var task = this._queue.shift();
          switch (task.command) {
            case 'open':
              if (this._ws === null) {
                this._waiting = true;
                this._auth.tokenAsync().then(function (token) {
                  _this2._waiting = false;
                  _this2._connect(token);
                }, function (error) {
                  log(error.stack);
                  this._retry();
                });
              }
              break;

            case 'send':
              if (this._ws === null) {
                this._queue.unshift(task);
                this._queue.unshift({ command: 'open' });
              } else {
                try {
                  this._ws.send(task.data);
                } catch (err) {
                  log(formatError(err));
                  this._queue.unshift(task);
                  this._queue.unshift({ command: 'open' });
                }
              }
              break;

            case 'close':
              if (this._ws !== null) {
                this._closing = true;
                this._waiting = true;
                this._ws.close();
              }
              break;
          }
        }
      }

      /**
       * @param {http/AccessToken} token
       */
    }, {
      key: '_connect',
      value: function _connect(token) {
        if (this._ws !== null) {
          return;
        }
        this._token = token;
        var uri = new URI(this._url);
        uri.query(assign(URI.parseQuery(uri.query()), {
          token: token.value
        }));
        this._ws = new WebSocket(uri.toString());
        this._ws.onclose = this._ws_onClose.bind(this);
        this._ws.onmessage = this._ws_onMessage.bind(this);
        this._ws.onopen = this._ws_onOpen.bind(this);
        this._waiting = true;
      }
    }, {
      key: '_ws_onOpen',
      value: function _ws_onOpen() {
        this._ws.onopen = null;
        this._waiting = false;
        this.connected = true;
        this._retries = 0;
        this._didConnect.raise();
        this._resume();
      }
    }, {
      key: '_ws_onMessage',
      value: function _ws_onMessage(e) {
        this._didReceiveMessage.raise(e.data);
      }
    }, {
      key: '_ws_onClose',
      value: function _ws_onClose(e) {
        this._ws = null;
        this._waiting = false;
        if (this.connected) {
          this.connected = false;
          this._didDisconnect.raise();
        }
        if (this._closing) {
          this._closing = false;
          this._resume();
        } else {
          this._waiting = true;
          this._retry();
        }
      }
    }, {
      key: '_retry',
      value: function _retry() {
        var _this3 = this;

        var delay = Math.pow(2, this._retries) * 100;
        if (delay > 5000) {
          delay = 5000;
        }
        setTimeout(function () {
          _this3._auth.tokenAsync().then(function (token) {
            return _this3._connect(token);
          }, function (err) {
            log(formatError(err));
            _this3._retry();
          });
        }, delay);
        this._retries += 1;
      }
    }, {
      key: '_auth_didUpdate',
      decorators: [bind],
      value: function _auth_didUpdate(accessToken) {
        if (!this._waiting && this._token !== accessToken && this.connected) {
          this._token = accessToken;
          this.send(JSON.stringify({ type: 'token', body: accessToken.value }));
        }
      }
    }, {
      key: 'didConnect',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'didDisconnect',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'didReceiveMessage',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'url',
      get: function get() {
        return this._url;
      }
    }], null, _instanceInitializers);

    return Socket;
  })();
}];
module.exports = exports['default'];
},{}],110:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

exports['default'] = ['@event', '@bind', 'common/log', 'common/formatError', function (event, bind, log, formatError) {
  return (function () {
    var _instanceInitializers = {};

    /**
     * @param {socket/Socket} socket
     */

    function SocketChannel(socket) {
      _classCallCheck(this, SocketChannel);

      _defineDecoratedPropertyDescriptor(this, 'onClose', _instanceInitializers);

      this._handlers = {};
      this._subscriptions = [];
      this._socket = socket;
      this._socket.didReceiveMessage += this._socket_didReceiveMessage;
      this._socket.didConnect += this._socket_didConnect;
    }

    _createDecoratedClass(SocketChannel, [{
      key: 'send',

      /**
       * @param {String} event
       * @param {*} data
       */
      value: function send(event, data) {
        this._socket.send(JSON.stringify({
          type: event,
          body: data
        }));
      }

      /**
       * @param {String} event
       * @param {Function} handler
       * @returns {SocketChannel}
       */
    }, {
      key: 'on',
      value: function on(event, handler) {
        if (!this._handlers[event]) {
          this._handlers[event] = [];
        }
        this._handlers[event].push(handler);
        return this;
      }

      /**
       * @param {String} event
       * @param {Function} [handler]
       * @returns {SocketChannel}
       */
    }, {
      key: 'off',
      value: function off(event, handler) {
        var handlers = this._handlers[event];
        if (handlers) {
          if (handler) {
            var index = handlers.indexOf(handler);
            if (index > -1) {
              handlers.splice(index, 1);
              if (handlers.length === 0) {
                delete this._handlers[event];
              }
            }
          } else {
            delete this._handlers[event];
          }
        }
        return this;
      }

      /**
       * @param {String} event
       * @returns {SocketChannel}
       */
    }, {
      key: 'subscribe',
      value: function subscribe(event) {
        if (this._subscriptions.indexOf(event) === -1) {
          this._subscriptions.push(event);
          if (this._socket.connected) {
            this.send('subscribe', event);
          }
        }
        return this;
      }

      /**
       * @param {String} event
       * @returns {SocketChannel}
       */
    }, {
      key: 'unsubscribe',
      value: function unsubscribe(event) {
        var index = this._subscriptions.indexOf(event);
        if (index > -1) {
          this._subscriptions.splice(index, 1);
          if (this._socket.connected) {
            this.send('unsubscribe', event);
          }
        }
        return this;
      }
    }, {
      key: 'close',
      value: function close() {
        var _this = this;

        if (this._socket !== null) {
          this._subscriptions.slice().forEach(function (x) {
            return _this.unsubscribe(x);
          });
          this._socket.didReceiveMessage -= this._socket_didReceiveMessage;
          this._socket.didConnect -= this._socket_didConnect;
          this._socket = null;
          this._handlers = {};
          this._onClose.raise();
        }
      }
    }, {
      key: 'dispose',
      value: function dispose() {
        this.close();
      }

      /**
       * @param {String} message
       */
    }, {
      key: '_socket_didReceiveMessage',
      decorators: [bind],
      value: function _socket_didReceiveMessage(message) {
        try {
          message = JSON.parse(message);
        } catch (err) {
          log(formatError(err));
          return;
        }
        var handlers = this._handlers[message.type];
        if (handlers) {
          handlers.slice().forEach(function (handler) {
            try {
              handler(message.body);
            } catch (err) {
              log(formatError(err));
            }
          });
        }
      }
    }, {
      key: '_socket_didConnect',
      decorators: [bind],
      value: function _socket_didConnect() {
        var _this2 = this;

        var subscriptions = this._subscriptions.slice();
        this._subscriptions = [];
        subscriptions.forEach(function (x) {
          return _this2.subscribe(x);
        });
      }
    }, {
      key: 'onClose',
      decorators: [event],
      initializer: null,
      enumerable: true
    }], null, _instanceInitializers);

    return SocketChannel;
  })();
}];
module.exports = exports['default'];
},{}],111:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports['default'] = ['react', 'common/$tracker', 'EventEmitter', 'react-dom', 'common/schemas/rxvm', 'common/propTypesFromSchema', function (React, $tracker, EventEmitter, ReactDOM, rxvm, propTypesFromSchema) {
  return function (name, spec) {
    var Component = function Component() {};
    Component.prototype = spec;

    var propsSchema = spec.propTypes && rxvm(spec.propTypes);
    var stateSchema = spec.stateTypes && rxvm(spec.stateTypes);
    var contextSchema = spec.contextTypes && rxvm(spec.contextTypes);

    return React.createClass({
      displayName: name,

      statics: _extends({}, spec.statics, {
        setBinding: function setBinding(bindingClass) {
          this._bindingClass = bindingClass;
        }
      }),

      contextTypes: spec.contextTypes && propTypesFromSchema(spec.contextTypes),
      childContextTypes: spec.childContextTypes && propTypesFromSchema(spec.childContextTypes),

      getBinding: function getBinding() {
        return this._binding || null;
      },

      getDefaultProps: function getDefaultProps() {
        if (spec.getDefaultProps) {
          var component = new Component();
          return component.getDefaultProps();
        } else {
          return null;
        }
      },

      getInitialState: function getInitialState() {
        var _this = this;

        this._autoRender = $tracker.autorun();
        this._autoAction = $tracker.autorun();

        this._props = propsSchema && propsSchema.cast() || {};
        this._autoProps = $tracker.autorun(function () {
          var _loop = function (key) {
            $tracker.attach(function () {
              _this._props[key] = _this.props[key];
            });
          };

          for (var key in _this.props) {
            _loop(key);
          }
        });

        this._context = contextSchema && contextSchema.cast() || {};
        this._autoContext = $tracker.autorun(function () {
          var _loop2 = function (key) {
            $tracker.attach(function () {
              _this._context[key] = _this.context[key];
            });
          };

          for (var key in _this.context) {
            _loop2(key);
          }
        });

        if (stateSchema) {
          this._state = stateSchema.cast();
          if (spec.initialAction) {
            this._autoAction.replace(function () {
              var component = new Component();
              component.context = _this._context;
              component.props = _this._props;
              component.state = _this._state;
              component.dispatch = _this._dispatch;
              component.initialAction();
            });
          }
        }

        this._eventQueue = [];
        this._updatesSuspended = 0;
        this._needsUpdate = false;

        return null;
      },

      componentWillReceiveProps: function componentWillReceiveProps(nextProps, nextContext) {
        var _this2 = this;

        this._autoProps.replace(function () {
          var _loop3 = function (key) {
            $tracker.attach(function () {
              _this2._props[key] = nextProps[key];
            });
          };

          for (var key in nextProps) {
            _loop3(key);
          }
        });
        this._autoContext.replace(function () {
          var _loop4 = function (key) {
            $tracker.attach(function () {
              _this2._context[key] = nextContext[key];
            });
          };

          for (var key in nextContext) {
            _loop4(key);
          }
        });
      },

      componentDidMount: function componentDidMount() {
        var _this3 = this;

        this._events = new EventEmitter();
        if (this.constructor._bindingClass) {
          var Binding = this.constructor._bindingClass;
          this._updateCallbacks = [];
          this._binding = new Binding({
            state: this._state,
            events: this._events,
            getElement: function getElement() {
              return ReactDOM.findDOMNode(_this3);
            },
            props: this._props,
            getRefs: function getRefs() {
              return _this3.refs;
            },
            context: this._context,
            suspendUpdates: this._suspendUpdates,
            resumeUpdates: this._resumeUpdates,
            afterUpdate: function afterUpdate(callback) {
              return _this3._updateCallbacks.push(callback);
            }
          });
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = this._eventQueue[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var args = _step.value;

              this._events.emit.apply(this._events, args);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator['return']) {
                _iterator['return']();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          this._eventQueue = [];
        }
      },

      componentWillUnmount: function componentWillUnmount() {
        if (this._binding && typeof this._binding.dispose === 'function') {
          this._binding.dispose();
          this._binding = null;
        }
        this._autoRender.dispose();
        this._autoAction.dispose();
        this._autoProps.dispose();
        this._autoContext.dispose();
      },

      render: function render() {
        var _this4 = this;

        var result;
        this._autoRender.replace(function (comp) {
          if (comp.isFirstRun) {
            var component = new Component();
            component.state = _this4._state;
            component.props = _this4._props;
            component.context = _this4._context;
            component.dispatch = _this4._dispatch;
            result = component.render();
          } else {
            $tracker.nonreactive(function () {
              if (_this4._updatesSuspended > 0) {
                _this4._needsUpdate = true;
              } else {
                _this4.forceUpdate(_this4._afterUpdate);
              }
            });
          }
        });
        return result;
      },

      _dispatch: function _dispatch(event) {
        for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          args[_key - 1] = arguments[_key];
        }

        if (!this._events) {
          this._eventQueue.push([event, args]);
        } else {
          this._events.emit(event, args);
        }
      },

      _suspendUpdates: function _suspendUpdates() {
        this._suspendUpdates += 1;
      },

      _resumeUpdates: function _resumeUpdates() {
        var _this5 = this;

        this._suspendUpdates -= 1;
        if (this._suspendUpdates < 0) {
          this._suspendUpdates = 0;
        } else if (this._suspendUpdates === 0) {
          if (this._needsUpdate) {
            this._needsUpdate = false;
            $tracker.nonreactive(function () {
              _this5.forceUpdate(_this5._afterUpdate);
            });
          }
        }
      },

      _afterUpdate: function _afterUpdate() {
        if (this._updateCallbacks) {
          var callbacks = this._updateCallbacks;
          this._updateCallbacks = [];
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = callbacks[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              var callback = _step2.value;

              callback();
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2['return']) {
                _iterator2['return']();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }
    });
  };
}];
module.exports = exports['default'];
},{}],112:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

require('browsernizr/test/history');

exports['default'] = ['WebBundle', 'upstream', function (WebBundle, upstream) {
  var bundle = new WebBundle('raichu/client');
  var common = new WebBundle('raichu/common');

  bundle.delegate('atob', upstream);
  bundle.delegate('fetch', upstream);
  bundle.delegate('immutable', upstream);
  bundle.delegate('moment', upstream);
  bundle.delegate('react', upstream);
  bundle.delegate('react-dom', upstream);
  bundle.delegate('WebSocket', upstream);

  bundle.registerModules({
    'AccessToken': require('./AccessToken.js'),
    'ApiClient': require('./ApiClient.js'),
    'AuthorizationClient': require('./AuthorizationClient.js'),
    'createClass': require('./createClass.js'),
    'EventEmitter': require('./EventEmitter.js'),
    'FormDataSerializer': require('./FormDataSerializer.js'),
    'FormSerializer': require('./FormSerializer.js'),
    'HttpClient': require('./HttpClient.js'),
    'HttpError': require('./HttpError.js'),
    'index': require('./index.js'),
    'JsonRequestTransform': require('./JsonRequestTransform.js'),
    'JsonResponseTransform': require('./JsonResponseTransform.js'),
    'JsonWebToken': require('./JsonWebToken.js'),
    'LocalStorage': require('./LocalStorage.js'),
    'LocationService': require('./LocationService.js'),
    'MultiProfileAuthenticationClient': require('./MultiProfileAuthenticationClient.js'),
    'MultiProfileAuthorizationService': require('./MultiProfileAuthorizationService.js'),
    'RefreshToken': require('./RefreshToken.js'),
    'Router': require('./Router.js'),
    'SingleProfileAuthenticationClient': require('./SingleProfileAuthenticationClient.js'),
    'Socket': require('./Socket.js'),
    'SocketChannel': require('./SocketChannel.js')
  }, {
    ignore: ['index']
  });

  common.registerModules({
    '@single': require('../common/@single.js'),
    '$tracker': require('../common/$tracker.js'),
    'dataProps': require('../common/dataProps.js'),
    'formatError': require('../common/formatError.js'),
    'formatObject': require('../common/formatObject.js'),
    'keyedChildren': require('../common/keyedChildren.js'),
    'log': require('../common/log.js'),
    'mergeClassNames': require('../common/mergeClassNames.js'),
    'MutableReactElement': require('../common/MutableReactElement.js'),
    'mutate': require('../common/mutate.js'),
    'propTypesFromSchema': require('../common/propTypesFromSchema.js'),
    'querySelector': require('../common/querySelector.js'),
    'querySelectorAll': require('../common/querySelectorAll.js'),
    'ReactiveComputation': require('../common/ReactiveComputation.js'),
    'ReactiveValue': require('../common/ReactiveValue.js'),
    'schemas/list': require('../common/schemas/list.js'),
    'schemas/listOf': require('../common/schemas/listOf.js'),
    'schemas/mapOf': require('../common/schemas/mapOf.js'),
    'schemas/rxvm': require('../common/schemas/rxvm.js'),
    'schemas/vm': require('../common/schemas/vm.js'),
    'Tracker': require('../common/Tracker.js'),
    'UrlPattern': require('../common/UrlPattern.js'),
    'walkChildren': require('../common/walkChildren.js')
  });
  common.delegate('@event', bundle);
  common.register('celebi', require('celebi'));
  common.delegate('immutable', bundle);
  common.register('lodash.assign', require('lodash.assign'));
  common.register('lodash.find', require('lodash.find'));
  common.register('path-to-regexp', require('path-to-regexp'));
  common.delegate('react', bundle);
  common.register('urijs', require('urijs'));
  common.delegate('VM_DEBUG', bundle);
  bundle.registerLink('common/', common);

  bundle.register('@bind', require('@stephenbunch/bind'));
  bundle.register('@event', require('@stephenbunch/event'));
  bundle.register('lodash.assign', require('lodash.assign'));
  bundle.register('lodash.isplainobject', require('lodash.isplainobject'));
  bundle.register('lodash.merge', require('lodash.merge'));
  bundle.register('Modernizr', require('browsernizr'));
  bundle.register('path-to-regexp', require('path-to-regexp'));
  bundle.register('setTimeout', window.setTimeout);
  bundle.register('urijs', require('urijs'));
  bundle.register('window', window);
  bundle.register('VM_DEBUG', false);

  return bundle;
}];
module.exports = exports['default'];
},{"../common/$tracker.js":113,"../common/@single.js":114,"../common/MutableReactElement.js":115,"../common/ReactiveComputation.js":116,"../common/ReactiveValue.js":117,"../common/Tracker.js":118,"../common/UrlPattern.js":119,"../common/dataProps.js":120,"../common/formatError.js":121,"../common/formatObject.js":122,"../common/keyedChildren.js":123,"../common/log.js":124,"../common/mergeClassNames.js":125,"../common/mutate.js":126,"../common/propTypesFromSchema.js":127,"../common/querySelector.js":128,"../common/querySelectorAll.js":129,"../common/schemas/list.js":130,"../common/schemas/listOf.js":131,"../common/schemas/mapOf.js":132,"../common/schemas/rxvm.js":133,"../common/schemas/vm.js":134,"../common/walkChildren.js":135,"./AccessToken.js":91,"./ApiClient.js":92,"./AuthorizationClient.js":93,"./EventEmitter.js":94,"./FormDataSerializer.js":95,"./FormSerializer.js":96,"./HttpClient.js":97,"./HttpError.js":98,"./JsonRequestTransform.js":99,"./JsonResponseTransform.js":100,"./JsonWebToken.js":101,"./LocalStorage.js":102,"./LocationService.js":103,"./MultiProfileAuthenticationClient.js":104,"./MultiProfileAuthorizationService.js":105,"./RefreshToken.js":106,"./Router.js":107,"./SingleProfileAuthenticationClient.js":108,"./Socket.js":109,"./SocketChannel.js":110,"./createClass.js":111,"./index.js":112,"@stephenbunch/bind":24,"@stephenbunch/event":26,"browsernizr":30,"browsernizr/test/history":40,"celebi":10,"lodash.assign":41,"lodash.find":52,"lodash.isplainobject":65,"lodash.merge":70,"path-to-regexp":85,"urijs":89}],113:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['Tracker', function (Tracker) {
  return new Tracker();
}];
module.exports = exports['default'];
},{}],114:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['lodash.find', function (find) {
  var cacheKey = Symbol();

  function sequenceEquals(a, b) {
    if (a.length !== b.length) {
      return false;
    }
    for (var i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  return function (prototype, name, descriptor) {
    var func = descriptor.value;
    return {
      configurable: true,
      enumerable: false,
      get: function get() {
        var _this = this;

        if (!this[cacheKey]) {
          this[cacheKey] = {};
        }
        var cache = this[cacheKey];
        if (!cache[name]) {
          (function () {
            var tasks = [];
            cache[name] = function () {
              for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }

              // Allow a method to be called multiple times concurrently if
              // the arguments are different.
              var task = find(tasks, function (task) {
                return sequenceEquals(task.args, args);
              });
              if (!task) {
                task = {
                  args: args,
                  promise: func.apply(_this, args).then(function (result) {
                    tasks.splice(tasks.indexOf(task), 1);
                    return result;
                  }, function (err) {
                    tasks.splice(tasks.indexOf(task), 1);
                    throw err;
                  })
                };
                tasks.push(task);
              }
              return task.promise;
            };
          })();
        }
        return cache[name];
      }
    };
  };
}];
module.exports = exports['default'];
},{}],115:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['react', 'lodash.assign', 'immutable', 'querySelectorAll', 'querySelector', function (React, assign, Immutable, _querySelectorAll, _querySelector) {
  return (function () {
    function MutableReactElement(element) {
      var _this = this;

      _classCallCheck(this, MutableReactElement);

      if (!React.isValidElement(element)) {
        throw new Error('Element must be a valid React element.');
      }

      this._element = element;
      this._parentNode = null;

      this._props = assign({}, element.props);
      this._children = this._props.children;
      delete this._props.children;

      Object.defineProperty(this._props, 'children', {
        get: function get() {
          return _this._children;
        }
      });

      if (this._children) {
        if (!Immutable.List.isList(this._children) && !Array.isArray(this._children)) {
          this._children = [this._children];
        }
        this._children = new Immutable.List(this._children).map(function (x) {
          return _this._createChild(x);
        });
      } else {
        this._children = new Immutable.List();
      }
    }

    _createClass(MutableReactElement, [{
      key: 'querySelectorAll',
      value: function querySelectorAll(selector) {
        return _querySelectorAll(this._children, selector);
      }
    }, {
      key: 'querySelector',
      value: function querySelector(selector) {
        return _querySelector(this._children, selector);
      }
    }, {
      key: 'appendChild',
      value: function appendChild(child) {
        child = this._createChild(child);
        this._children = this._children.push(child);
        return child;
      }
    }, {
      key: 'removeChild',
      value: function removeChild(child) {
        var index = this._children.indexOf(child);
        if (index > -1) {
          this._children = this._children.splice(index, 1);
          child._parentNode = null;
        }
      }
    }, {
      key: 'replaceChild',
      value: function replaceChild(newChild, oldChild) {
        var index = this._children.indexOf(oldChild);
        if (index > -1) {
          newChild = this._createChild(newChild);
          this._children = this._children.splice(index, 1, newChild);
          oldChild._parentNode = null;
          return newChild;
        } else {
          throw new Error('Old child does not exist.');
        }
      }
    }, {
      key: 'insertBefore',
      value: function insertBefore(newNode, referenceNode) {
        var index = this._children.indexOf(referenceNode);
        if (index > -1) {
          newNode = this._createChild(newNode);
          this._children = this._children.splice(index, 0, newNode);
          return newNode;
        } else {
          throw new Error('Refernce node does not exist.');
        }
      }
    }, {
      key: 'toElement',
      value: function toElement() {
        var props = assign({}, this._props);
        if (this._children.size > 0) {
          props.children = this._children.map(function (x) {
            if (x && x.isMutableReactElement) {
              return x.toElement();
            } else {
              return x;
            }
          }).toArray();
        }
        return React.cloneElement(this._element, props);
      }
    }, {
      key: '_createChild',
      value: function _createChild(element) {
        if (React.isValidElement(element)) {
          element = new MutableReactElement(element);
        }
        if (element && element.isMutableReactElement) {
          element._parentNode = this;
        }
        return element;
      }
    }, {
      key: 'isMutableReactElement',
      get: function get() {
        return true;
      }
    }, {
      key: 'props',
      get: function get() {
        return this._props;
      }
    }, {
      key: 'parentNode',
      get: function get() {
        return this._parentNode;
      }
    }, {
      key: 'childNodes',
      get: function get() {
        return this._children;
      }
    }, {
      key: 'nextSibling',
      get: function get() {
        return this.parentNode.childNodes.get(this.parentNode.childNodes.indexOf(this) + 1);
      }
    }]);

    return MutableReactElement;
  })();
}];
module.exports = exports['default'];
},{}],116:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createDecoratedClass = (function () { function defineProperties(target, descriptors, initializers) { for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } if (descriptor.initializer !== undefined) { initializers[key] = descriptor; continue; } } Object.defineProperty(target, key, descriptor); } } return function (Constructor, protoProps, staticProps, protoInitializers, staticInitializers) { if (protoProps) defineProperties(Constructor.prototype, protoProps, protoInitializers); if (staticProps) defineProperties(Constructor, staticProps, staticInitializers); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _defineDecoratedPropertyDescriptor(target, key, descriptors) { var _descriptor = descriptors[key]; if (!_descriptor) return; var descriptor = {}; for (var _key in _descriptor) descriptor[_key] = _descriptor[_key]; descriptor.value = descriptor.initializer ? descriptor.initializer.call(target) : undefined; Object.defineProperty(target, key, descriptor); }

exports['default'] = ['immutable', '@event', 'VM_DEBUG', 'log', function (Immutable, event, VM_DEBUG, log) {
  var uid = 0;

  return (function () {
    var _instanceInitializers = {};

    function ReactiveComputation(callback) {
      _classCallCheck(this, ReactiveComputation);

      _defineDecoratedPropertyDescriptor(this, 'onDispose', _instanceInitializers);

      this.__id = ++uid;
      this._data = new Map();
      this._callback = callback || function () {};
      this._deps = new Immutable.Map();
      this._isFirstRun = false;
      this._isRunning = false;

      this.isPending = false;
      this._children = new Immutable.Set();

      this._result = undefined;
      this._init();
    }

    _createDecoratedClass(ReactiveComputation, [{
      key: 'dispose',
      value: function dispose() {
        this._deps = null;
        this._children.forEach(function (x) {
          return x.dispose();
        });
        this._children = null;
        this._onDispose.raise();
        if (VM_DEBUG) {
          log('dispose', 'comp', this.__id);
        }
      }
    }, {
      key: 'addChild',
      value: function addChild(comp) {
        var _this = this;

        if (!this.isDisposed) {
          Object.defineProperty(comp, 'parent', {
            enumerable: true,
            configurable: true,
            get: function get() {
              return _this;
            }
          });
          this._children = this._children.add(comp);
        }
      }
    }, {
      key: 'replace',
      value: function replace(callback) {
        if (this.isDisposed) {
          throw new Error('Computation has been disposed.');
        }
        this._callback = callback || function () {};
        this._init();
      }
    }, {
      key: 'addDependency',
      value: function addDependency(instance, path) {
        if (this.isDisposed) {
          throw new Error('Computation has been disposed.');
        }
        if (!this._isRunning) {
          throw new Error('Dependencies must be added from within a computation.');
        }
        if (!this._deps.has(instance)) {
          this._deps = this._deps.set(instance, new Immutable.Set());
        }
        var paths = this._deps.get(instance);
        if (path && !paths.has(path)) {
          paths = paths.add(path);
          this._deps = this._deps.set(instance, paths);
        }
      }
    }, {
      key: 'invalidate',
      value: function invalidate(instance, path) {
        if (this.isDisposed) {
          throw new Error('Computation has been disposed.');
        }
        if (!this._isRunning) {
          if (instance) {
            if (this._deps.has(instance)) {
              if (path) {
                if (this._deps.get(instance).has(path)) {
                  this._run();
                } else {
                  // Don't run if a path was specified, but wasn't depended on.
                }
              } else {
                  this._run();
                }
            } else {
              // Don't run if the instance wasn't depended on.
            }
          } else {
              this._run();
            }
        }
      }
    }, {
      key: '_init',
      value: function _init() {
        this._isFirstRun = true;
        this._run();
        this._isFirstRun = false;
      }
    }, {
      key: '_run',
      value: function _run() {
        this._deps = this._deps.clear();

        this.isPending = false;
        this._children.forEach(function (x) {
          return x.dispose();
        });
        this._children = this._children.clear();

        this._isRunning = true;
        this._result = this._callback.call(undefined, this);
        this._isRunning = false;
      }
    }, {
      key: 'onDispose',
      decorators: [event],
      initializer: null,
      enumerable: true
    }, {
      key: 'data',
      get: function get() {
        return this._data;
      }
    }, {
      key: 'result',
      get: function get() {
        return this._result;
      }
    }, {
      key: 'isFirstRun',
      get: function get() {
        return this._isFirstRun;
      }
    }, {
      key: 'isDisposed',
      get: function get() {
        return !this._deps;
      }
    }], null, _instanceInitializers);

    return ReactiveComputation;
  })();
}];
module.exports = exports['default'];
},{}],117:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['$tracker', function ($tracker) {
  return (function () {
    function ReactiveValue(initialValue) {
      _classCallCheck(this, ReactiveValue);

      this._value = initialValue;
    }

    _createClass(ReactiveValue, [{
      key: 'get',
      value: function get() {
        $tracker.depend(this);
        return this._value;
      }
    }, {
      key: 'set',
      value: function set(value) {
        if (value !== this._value) {
          $tracker.changed(this);
          this._value = value;
        }
      }
    }]);

    return ReactiveValue;
  })();
}];
module.exports = exports['default'];
},{}],118:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['immutable', 'ReactiveComputation', function (Immutable, ReactiveComputation) {
  return (function () {
    function Tracker() {
      _classCallCheck(this, Tracker);

      this._current = null;
      this._computations = new Immutable.Set();
    }

    _createClass(Tracker, [{
      key: 'autorun',

      /**
       * Creates a new autorun.
       * @param {Function} [callback]
       * @returns {Disposable}
       */
      value: function autorun(callback) {
        var _this = this;

        var comp = new ReactiveComputation(this._wrapCallback(callback || function () {}));
        this._computations = this._computations.add(comp);

        var _replace = comp.replace;
        comp.replace = function (callback) {
          _replace.call(comp, _this._wrapCallback(callback || function () {}));
        };

        var _dispose = comp.dispose;
        comp.dispose = function () {
          _dispose.call(comp);
          _this._computations = _this._computations['delete'](comp);
          if (_this._current === comp) {
            _this._current = null;
          }
        };

        return comp;
      }

      /**
       * If an autorun is being processed, a new autorun is created and its
       * lifecycle is managed by the current aurorun. Otherwise, the callback is
       * executed without creating an autorun.
       * @param {Function} [callback]
       */
    }, {
      key: 'attach',
      value: function attach(comp, callback) {
        if (typeof comp === 'function') {
          callback = comp;
          comp = null;
        }
        if (comp || this._current) {
          var current = this._current;
          if (comp) {
            this._current = comp;
          }
          var child = this.autorun(callback);
          // It's possible for a computation to dispose itself. If that happens,
          // this._current will be null.
          if (this._current !== null) {
            this._current.addChild(child);
          }
          this._current = current;
          return child.result;
        } else {
          return callback();
        }
      }
    }, {
      key: 'nonreactive',
      value: function nonreactive(callback) {
        var current = this._current;
        this._current = null;
        var result = callback();
        this._current = current;
        return result;
      }

      /**
       * @param {*} instance
       * @param {String|Symbol} [path]
       */
    }, {
      key: 'depend',
      value: function depend(instance, path) {
        if (this._current) {
          this._current.addDependency(instance, path);
        }
      }

      /**
       * @param {*} instance
       * @param {String|Symbol} [path]
       */
    }, {
      key: 'changed',
      value: function changed(instance, path) {
        this._computations.forEach(function (comp) {
          if (!comp.isDisposed) {
            comp.invalidate(instance, path);
          }
        });
      }
    }, {
      key: 'flagPending',
      value: function flagPending() {
        if (this._current) {
          this._current.isPending = true;
        }
      }
    }, {
      key: '_wrapCallback',
      value: function _wrapCallback(callback) {
        var _this2 = this;

        return function (comp) {
          var current = _this2._current;
          _this2._current = comp;
          var result = callback.call(undefined, comp);
          if (current && !current.isDisposed) {
            _this2._current = current;
          } else {
            _this2._current = null;
          }
          return result;
        };
      }
    }, {
      key: 'currentComputation',
      get: function get() {
        return this._current;
      }
    }]);

    return Tracker;
  })();
}];
module.exports = exports['default'];
},{}],119:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

exports['default'] = ['urijs', 'path-to-regexp', function (URI, pathToRegexp) {
  return (function () {
    /**
     * @param {String} path
     */

    function UrlPattern(path) {
      _classCallCheck(this, UrlPattern);

      if (!path.startsWith('/')) {
        throw new Error('Path must begin with forward slash (/).');
      }
      this._path = path;
      this._keys = [];
      this._pattern = pathToRegexp(this._path, this._keys);
    }

    _createClass(UrlPattern, [{
      key: 'match',
      value: function match(url) {
        var match = this._pattern.exec(new URI(url).path());
        if (match !== null) {
          var params = {};
          var i = 0,
              len = this._keys.length;
          for (; i < len; i++) {
            params[this._keys[i].name] = match[i + 1];
          }
          return params;
        }
      }
    }]);

    return UrlPattern;
  })();
}];
module.exports = exports['default'];
},{}],120:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = [function () {
  return function (props) {
    var ret = {};
    for (var key in props) {
      if (key.startsWith('data-')) {
        ret[key] = props[key];
      }
    }
    return ret;
  };
}];
module.exports = exports['default'];
},{}],121:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = [function () {
  return function (err) {
    return err.stack || err.name + ": " + err.message;
  };
}];
module.exports = exports["default"];
},{}],122:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['immutable', function (Immutable) {
  return function formatObject(value) {
    if (value) {
      if (Immutable.List.isList(value)) {
        value = value.map(function (x) {
          return formatObject(x);
        }).toArray();
      } else if (typeof value.toObject === 'function') {
        value = value.toObject();
      }
    }
    return value;
  };
}];
module.exports = exports['default'];
},{}],123:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['react', function (React) {
  return function (children) {
    children = Array.isArray(children) ? children : [children];
    return children.map(function (node, index) {
      if (React.isValidElement(node)) {
        return React.cloneElement(node, {
          key: node.props.key || index.toString()
        });
      } else if (node && node.isMutableReactElement) {
        node.props.key = node.props.key || index.toString();
      }
      return node;
    });
  };
}];
module.exports = exports['default'];
},{}],124:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = [function () {
  return function () {
    if (typeof console !== 'undefined') {
      console.log.apply(console, arguments);
    }
  };
}];
module.exports = exports['default'];
},{}],125:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = [function () {
  return function () {
    for (var _len = arguments.length, classNames = Array(_len), _key = 0; _key < _len; _key++) {
      classNames[_key] = arguments[_key];
    }

    var added = {};
    var result = '';
    classNames = classNames.join(' ').split(' ');
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = classNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var className = _step.value;

        if (className) {
          if (!added[className]) {
            added[className] = true;
            result = result + ' ' + className;
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator['return']) {
          _iterator['return']();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return result.substr(1);
  };
}];
module.exports = exports['default'];
},{}],126:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['react', 'MutableReactElement', function (React, MutableReactElement) {
  return function (children) {
    return new MutableReactElement(React.createElement('div', {
      children: children
    }));
  };
}];
module.exports = exports['default'];
},{}],127:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['react', 'celebi', function (React, Celebi) {
  return function (schema) {
    var spec = transformShape(normalizeSchema(schema));
    for (var key in spec) {
      if (typeof spec[key] === 'object') {
        spec[key] = Celebi.transformObject(spec[key], React.PropTypes.shape);
      }
    }
    return spec;
  };

  function normalizeSchema(schema) {
    if (Celebi.isSchema(schema)) {
      if (schema.attributes.type !== 'shape') {
        throw new Error('Schema must be a plain object or a shape.');
      }
    } else {
      if (typeof schema !== 'object' || schema === null) {
        throw new Error('Schema must be a plain object or a shape.');
      }
      schema = Celebi.shape(schema);
    }
    return schema;
  }

  function transformShape(shape) {
    var spec = {};
    for (var key in shape.attributes.keys) {
      var value = undefined;
      switch (shape.attributes.keys[key].attributes.type) {
        case 'shape':
          value = transformShape(shape.attributes.keys[key]);
          break;
        case 'string':
          value = React.PropTypes.string;
          break;
        case 'number':
          value = React.PropTypes.number;
          break;
        case 'function':
          value = React.PropTypes.func;
          break;
        case 'object':
          value = React.PropTypes.object;
          break;
        case 'boolean':
          value = React.PropTypes.bool;
          break;
        default:
          value = React.PropTypes.any;
          break;
      }
      spec[key] = value;
    }
    return spec;
  }
}];
module.exports = exports['default'];
},{}],128:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['walkChildren', function (walkChildren) {
  return function (children, selector) {
    var result;
    walkChildren(children, function (element) {
      if (selector(element)) {
        result = element;
        return false;
      }
    });
    return result;
  };
}];
module.exports = exports['default'];
},{}],129:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['walkChildren', 'immutable', function (walkChildren, Immutable) {
  return function (children, selector) {
    var result = [];
    walkChildren(children, function (element) {
      if (selector(element)) {
        result.push(element);
      }
    });
    return new Immutable.List(result);
  };
}];
module.exports = exports['default'];
},{}],130:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['celebi', 'immutable', function (Celebi, Immutable) {
  return function list(array) {
    return array.extend({
      attributes: {
        type: 'list'
      },

      cast: function cast(value, options) {
        if (Immutable.List.isList(value)) {
          value = value.toArray();
        }
        return new Immutable.List(array.cast(value, options));
      },

      validate: function validate(value, options) {
        if (Immutable.List.isList(value)) {
          value = value.toArray();
        } else if (!Array.isArray(value)) {
          return Celebi.fail(this, 'must be a list');
        }
        var result = array.validate(value, options);
        if (result.error) {
          return result;
        } else {
          result.value = new Immutable.List(result.value);
          return result;
        }
      },

      transform: function transform(_transform) {
        return list(array.transform(_transform));
      }
    });
  };
}];
module.exports = exports['default'];
},{}],131:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['celebi', 'immutable', function (Celebi, Immutable) {
  return function listOf(t) {
    return Celebi.arrayOf(t).extend({
      attributes: {
        type: 'immutable.list'
      },

      pluck: function pluck(selector, options) {
        return t.pluck(selector, options);
      },

      cast: function cast(value, options) {
        if (Array.isArray(value)) {
          value = new Immutable.List(value);
        }
        if (Immutable.List.isList(value)) {
          return value.map(function (item) {
            return t.cast(item, options);
          });
        } else {
          return new Immutable.List();
        }
      },

      validate: function validate(value) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (Array.isArray(value)) {
          value = new Immutable.List(value);
        }
        if (!Immutable.List.isList(value)) {
          return Celebi.fail(this, 'must be a list');
        }
        var retval = new Immutable.List();
        var errors = [];
        for (var i = 0; i < value.size; i++) {
          var item = value.get(i);
          var result = t.label(t.attributes.label || 'item ' + i).validate(item, options);
          if (result.error) {
            errors.push({
              key: i,
              message: result.error.message
            });
            if (options.abortEarly) {
              break;
            }
          } else {
            retval = retval.push(result.value);
          }
        }
        if (errors.length > 0) {
          return Celebi.fail(this, errors);
        } else {
          return pass(retval);
        }
      },

      transform: function transform(_transform) {
        return listOf(_transform(t));
      }
    });
  };
}];
module.exports = exports['default'];
},{}],132:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports['default'] = ['celebi', 'immutable', function (Celebi, Immutable) {
  return function mapOf(keySchema, valueSchema) {
    keySchema = Celebi.parse(keySchema);
    valueSchema = Celebi.parse(valueSchema);
    return Celebi.any.extend({
      attributes: {
        type: 'immutable.map'
      },

      pluck: function pluck(selector, options) {
        return valueSchema.pluck(selector, options);
      },

      cast: function cast(value, options) {
        if (!Immutable.Map.isMap(value)) {
          try {
            value = new Immutable.Map(value);
          } catch (err) {
            value = new Immutable.Map();
          }
        }
        var result = value;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var val = _step$value[1];

            result = result['delete'](key);
            result = result.set(keySchema.cast(key, options), valueSchema.cast(val, options));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator['return']) {
              _iterator['return']();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return result;
      },

      validate: function validate(value) {
        var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        if (typeof value === 'object' && value !== null) {
          try {
            value = new Immutable.Map(value);
          } catch (err) {}
        }
        if (!Immutable.Map.isMap(value)) {
          return Celebi.fail(this, 'must be a map');
        }
        var retval = new Immutable.Map();
        var errors = [];
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = value[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var _step2$value = _slicedToArray(_step2.value, 2);

            var key = _step2$value[0];
            var val = _step2$value[1];

            var itemLabel = 'item ' + key;
            var keyResult = keySchema.label(keySchema.attributes.label || itemLabel).validate(key, options);
            var valueResult = valueSchema.label(valueSchema.attributes.label || itemLabel).validate(val, options);
            if (keyResult.error) {
              errors.push({
                key: key,
                message: keyResult.error.message
              });
              if (options.abortEarly) {
                break;
              } else {
                continue;
              }
            }
            if (valueResult.error) {
              errors.push({
                key: key,
                message: valueResult.error.message
              });
              if (options.abortEarly) {
                break;
              } else {
                continue;
              }
            }
            retval = retval.set(keyResult.value, valueResult.value);
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2['return']) {
              _iterator2['return']();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return Celebi.pass(retval);
      },

      transform: function transform(_transform) {
        return mapOf(_transform(keySchema), _transform(valueSchema));
      }
    });
  };
}];
module.exports = exports['default'];
},{}],133:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['celebi', 'schemas/list', '$tracker', 'formatObject', 'VM_DEBUG', 'log', function (Celebi, list, $tracker, formatObject, VM_DEBUG, log) {
  var uid = 0;
  return function vm(schema) {
    if (Celebi.isSchema(schema)) {
      if (schema.attributes.type !== 'shape') {
        throw new Error('Schema must be an shape.');
      }
    } else {
      schema = Celebi.shape(schema);
    }
    schema = schema.transform(function transform(node) {
      if (node.attributes.type === 'array') {
        return list(node.transform(transform));
      } else if (node.attributes.type === 'shape') {
        return vm(node);
      } else {
        return node;
      }
    });
    return schema.extend({
      attributes: {
        type: 'vm',
        keys: schema.attributes.keys
      },

      cast: function cast(source, options) {
        var _this = this;

        if (source === null || typeof source !== 'object') {
          source = {};
        }
        var model = VM_DEBUG ? {
          __id: ++uid
        } : {};

        var _loop = function (key) {
          var _value = undefined;
          var _set = function _set(value, isFirstRun) {
            value = _this.attributes.keys[key].cast(value);
            if (value !== _value) {
              _value = value;
              if (!isFirstRun) {
                if (VM_DEBUG) {
                  log('change', 'model', model.__id, key);
                }
                $tracker.changed(model, key);
              }
            }
          };
          Object.defineProperty(model, key, {
            enumerable: true,
            configurable: true,
            get: function get() {
              if (VM_DEBUG) {
                if ($tracker.currentComputation) {
                  log('comp', $tracker.currentComputation.__id, 'depend', 'model', model.__id, key);
                } else {
                  log('read', 'model', model.__id, key);
                }
              }
              $tracker.depend(model, key);
              return _value;
            },
            set: function set(value) {
              return _set(value, false);
            }
          });
          $tracker.attach(function (comp) {
            _set(source[key], comp && comp.isFirstRun);
          });
        };

        for (var key in this.attributes.keys) {
          _loop(key);
        }
        model.toObject = function () {
          var obj = {};
          for (var key in _this.attributes.keys) {
            var value = formatObject(model[key]);
            if (value !== undefined) {
              obj[key] = value;
            }
          }
          return obj;
        };
        model.toJSON = function () {
          return model.toObject();
        };
        return model;
      }
    });
  };
}];
module.exports = exports['default'];
},{}],134:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['celebi', 'schemas/list', function (Celebi, list) {
  return function vm(schema) {
    if (Celebi.isSchema(schema)) {
      if (schema.attributes.type !== 'shape') {
        throw new Error('Schema must be an shape.');
      }
    } else {
      schema = Celebi.shape(schema);
    }
    schema = schema.transform(function transform(node) {
      if (node.attributes.type === 'array') {
        return list(node.transform(transform));
      } else if (node.attributes.type === 'shape') {
        return vm(node);
      } else {
        return node;
      }
    });
    return Celebi.vm(schema);
  };
}];
module.exports = exports['default'];
},{}],135:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = ['react', 'immutable', function (React, Immutable) {
  return function (children, callback) {
    children = flatten(children);
    var search = children.reverse();
    while (search.length > 0) {
      var element = search.pop();
      if (React.isValidElement(element) || element && element.isMutableReactElement) {
        if (callback(element) === false) {
          break;
        }
        search = flatten(element.props.children).reverse().concat(search);
      }
    }
  };

  function makeArray(children) {
    if (Immutable.List.isList(children)) {
      return children.toArray();
    } else if (Array.isArray(children)) {
      return children.slice();
    } else {
      return [children];
    }
  }

  function flatten(children) {
    return makeArray(children).reduce(function (list, child) {
      if (Immutable.List.isList(child) || Array.isArray(child)) {
        return list.concat(flatten(child));
      } else {
        return list.concat([child]);
      }
    }, []);
  }
}];
module.exports = exports['default'];
},{}]},{},[112])(112)
});
//# sourceMappingURL=raichu.js.map?89f932fe7521dbc28bb30dba929f26aaabdf9340
