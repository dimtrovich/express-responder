"use strict";
/*!
 * Express Rest Response (https://github.com/dimtrovich/express-responder)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */

/**
 * Verifie si l'element est vide
 * 
 * @param {*} mixed_var 
 * @return {Boolean} true si l'element est vide
 * @credit phpjs
 */
exports.empty = function (mixed_var) {
	var undef, key, i, len;
	var emptyValues = [undef, null, false, 0, '', '0'];

	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixed_var === emptyValues[i]) {
			return true;
		}
	}

	if (exports.is_array(mixed_var) && !mixed_var.length) {
		return true
	}

	if (typeof mixed_var === 'object') {
		for (key in mixed_var) {
			// TODO: should we check for own properties only?
			//if (mixed_var.hasOwnProperty(key)) {
				return false;
			//}
		}
		return true;
	}

	return false;
}

/**
 * Verifie si l'element est un tableau
 * 
 * @param {*} mixed_var 
 * @return {Boolean} true si l'element est un tableau
 * @credit phpjs
 */
exports.is_array = function (mixed_var) {
	var ini,
		_getFuncName = function(fn) {
			  var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
			if (!name) {
				return '(Anonymous)';
			}
			return name[1];
		},
		_isArray = function(mixed_var) {
			if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {
				return false;
			}
			var len = mixed_var.length;
			mixed_var[mixed_var.length] = 'bogus';
			if (len !== mixed_var.length) {
				mixed_var.length -= 1;
				return true;
			}
			delete mixed_var[mixed_var.length];
			return false;
		};

	if (!mixed_var || typeof mixed_var !== 'object') {
		return false;
	}

	this.php_js = this.php_js || {};
	this.php_js.ini = this.php_js.ini || {};

	ini = this.php_js.ini['phpjs.objectsAsArrays'];

	return _isArray(mixed_var) ||
		((!ini || (
		(parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==
			'off')))) && (
		(Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) ===
		'Object')
	));
}

/**
 * Verifie si l'element est un objet
 * 
 * @param {*} mixed_var 
 * @return {Boolean} true si l'element est un tableau
 * @credit phpjs
 */
exports.is_object = function (mixed_var) {
	if (Object.prototype.toString.call(mixed_var) === '[object Array]') {
		return false;
	}

	return mixed_var !== null && (typeof mixed_var === 'object' || mixed_var instanceof Object)
}

/**
 * Met la première lettre d'une chaine de caractères en majuscule
 * 
 * @param {String} str 
 * @return {String}
 * @credit phpjs
 */
exports.ucfirst = function (str) {
	str += '';
	  var f = str.charAt(0)
		.toUpperCase();
	  return f + str.substr(1);
};