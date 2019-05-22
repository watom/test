/**
 * CUBE类的的扩展类，提供了一些数据类型的常用方法，该工具类中的方法通过全局对象cube调用。
 * 例：cube.isEmpty(obj);
 */
(function(cube) {
	var self = cube;
	
	/**
	 * 判断对象是否为Object类型。
	 * @param
	 *     p_value - 要对其进行判断的对象。
	 */
	self.isObject = function(p_value) {
	    return p_value != null && typeof(p_value) == "object";
	}
	
	/**
	 * 判断对象是否为null、undefined或空字符串。
	 * @param
	 *     p_value - 要对其进行判断的对象。
	 *     
	 * @return
	 *     如果p_value为null、undefined或空字符串则返回true，否则返回false
	 */
	self.isEmpty = function(p_value) {
	    return p_value == null || ((typeof(p_value) == "string" && p_value.replace(/^\s*/, "").replace(/\s*$/, "") == "") || typeof(p_value) == "undefined");
	};
	
	/**
	 * 判断对象是否不为null、undefined或空字符串。
	 * @param
	 *     p_value - 要对其进行判断的对象。
	 *     
	 * @return
	 *     如果p_value不为null、undefined或空字符串则返回true，否则返回false
	 */
	self.notEmpty = function(p_value) {
	    return !cube.isEmpty(p_value);
	};
	
	/**
	 * 判断对象是否为数组类型。
	 * @param
	 *     p_value - 要对其进行判断的对象。
	 */
	self.isArray = function(p_value) {
	    return p_value != null && (typeof(p_value) == "object" && typeof(p_value.length) == "number" && typeof(p_value.splice) == "function" &&!(p_value.propertyIsEnumerable('length')));
	};
	
	/**
	 * 判断对象是否为String类型。
	 * @param
	 *     p_value - 要对其进行判断的对象。
	 */
	self.isString = function(p_value) {
	    return typeof(p_value) == "string";
	};
	
	/**
	 * 判断对象是否为Number类型。
	 * @param
	 *     p_value - 要对其进行判断的对象。
	 */
	self.isNumber = function(p_value) {
	    return typeof(p_value) == "number";
	};
	
	/**
	 * 判断对象是否为Function类型。
	 * @param
	 *    p_value - 要对其进行判断的对象。
	 */
	self.isFunction = function(p_value) {
	    return typeof(p_value) == "function";
	}
	
	/**
	 * 判断对象是否为Date类型。
	 * @param
	 *     p_value - 要对其进行判断的对象。
	 */
	self.isDate = function(p_value) {
	    return p_value != null && p_value.constructor == Date;
	};
	
	/**
	 * 判断两个对象的值是否相等。
	 * @param
	 *     p_value1  - 要进行判断的对象。
	 *     p_value2  - 要进行判断的对象。
	 *     p_ignoreCase  - 一个Boolean值，指定是否忽略大小写，tru忽略大小写，false不忽略大小写。此参数可省略，默认值为false
	 *     
	 * @return
	 *     如果两个对象的值相等则返回true，否则返回false
	 */
	self.isEqual = function(p_value1, p_value2, p_ignoreCase) {
	    if (p_ignoreCase == null) {
	        p_ignoreCase = false;
	    }
	    if (p_ignoreCase) {
	        if (typeof(p_value1) == "string") {
	            p_value1 = p_value1.toLowerCase();
	        }
	        if (typeof(p_value2) == "string") {
	            p_value2 = p_value2.toLowerCase();
	        }
	    }
	    
	    if (cube.isArray(p_value1) && cube.isArray(p_value2)) {
	        if (p_value1.length != p_value2.length) return false;
	        for (var i = 0; i < p_value1.length; i++) {
	            if (!cube.isEqual(p_value1[i], p_value2[i], p_ignoreCase)) {
	                return false;
	            }                     
	        }
	        return true;
	    }
	    
	    if (p_value1 == p_value2) {
	        return true;
	    }
	    if (p_value1 == null && p_value2 != null) {
	        return false;
	    } else if (p_value1 != null && p_value2 == null) {
	        return false;
	    } else {
	        return p_value1.valueOf() == p_value2.valueOf();
	    }
	}
	
	/**
	 * 创建并返回对象的一个副本。
	 * @param
	 *     p_obj  - 要创建副本的对象。
	 */
	self.clone = function(p_obj) {
	    var result = null;
	    if (cube.isArray(p_obj)) {
	        result = [];
	        var i = p_obj.length;
	        while (i--) {
	            result[i] = cube.clone(p_obj[i]);
	        }
	        return result;
	    } else if (cube.isObject(p_obj)) {
	 		if (p_obj.constructor == RegExp) {
	 			result = new RegExp(p_obj.source);
	 		} else {
	    		result = {};
		        for (var k in p_obj) {
		            result[k] = cube.clone(p_obj[k]);
		        }
	    	}
	        return result;
	    } else {
	        return p_obj;
	    }
	}  
	
	/**
	 * 判断 p_inst 是否是 p_class 的实例。
	 * @param
	 *     p_inst  - 一个对象。
	 *     p_class  - 一个类。
	 */
	self.instanceOf = function(p_inst, p_class) {
	    if (p_inst == null) {
	        return false;
	    }
	    
	    switch (typeof(p_inst)) {
	        case "boolean":
	            return p_class == Boolean;
	            
	        case "number":
	            return p_class == Number;
	
	        case "string":
	            return p_class == String;
	            
	        case "function":
	            return p_class == Function;
	            
	        case "object":
	            if (typeof(p_inst.instanceOf) == "function") {
	                return p_inst.instanceOf(p_class);
	            } else if (cube.isDate(p_inst)) {
	                return p_class == Date;
	            } else if (cube.isArray(p_inst)) {
	                return p_class == Array;
	            } else {
	                return false;
	            }
	    }
	}
	
	self.trim = function(p_str) {
		if (self.isString(p_str)) {
			p_str = p_str.replace(/^\s*/, "").replace(/\s*$/, "");
		}
		return p_str;
	}
})(cube);