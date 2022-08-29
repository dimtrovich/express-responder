"use strict";
/*!
 * Express Rest Response (https://github.com/dimtrovich/express-responder)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */
const Response = require("./responder");
const { ucfirst, is_object, empty } = require("./utils");
module.exports = (options, codes) => {
	const methods = [
		'badRequest', 
		'conflict', 'created',
		'deleted', 
		'forbidden',
		'gone',
		'internalError', 'invalidToken',
		'methodNotAllowed', 
		'noContent', 'notAcceptable', 'notFound', 'notImplemented',
		'ok',
		'tooManyRequests', 
		'unauthorized',
		'updated',
	];
	
	options = (empty(options) || !is_object(options)) ? {} : options;
	codes = (empty(codes) || !is_object(codes)) ? {} : codes;

    return (req, res, next) => {
        const responder = Response(res, options, codes);
        res.respondSuccess = responder.respondSuccess;
        res.respondFail = responder.respondFail;
        res.respond = responder.respond;
		
		for (const method of methods) {
			res[`respond${ucfirst(method)}`] = responder[`respond${ucfirst(method)}`]
		}
		
		if (options.allowShortSyntax && options.allowShortSyntax === true) {
			for (const method of methods) {
				res[`${method}`] = responder[`respond${ucfirst(method)}`]
			}
			res.fail = responder.respondFail;
			res.success = responder.respondSuccess;
		}

        next();
    };
};
