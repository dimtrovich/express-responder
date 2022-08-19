"use strict";
/*!
 * Express Rest Response (https://github.com/dimtrovich/express-responder)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */
const Response = require("./responder");
module.exports = (options, codes) => {
    return (req, res, next) => {
        const responder = Response(res, options, codes);
        res.respondSuccess = responder.respondSuccess;
        res.respondFail = responder.respondFail;
        res.respond = responder.respond;

		res.respondBadRequest = responder.respondBadRequest;
		res.respondConflict = responder.respondConflict;
		res.respondCreated = responder.respondCreated;
		res.respondDeleted = responder.respondDeleted;
		res.respondForbidden = responder.respondForbidden;
		res.respondGone = responder.respondGone;
		res.respondInternalError = responder.respondInternalError;
		res.respondInvalidToken = responder.respondInvalidToken;
		res.respondMethodNotAllowed = responder.respondMethodNotAllowed;
		res.respondNoContent = responder.respondNoContent;
		res.respondNotAcceptable = responder.respondNotAcceptable;
		res.respondNotFound = responder.respondNotFound;
		res.respondNotImplemented = responder.respondNotImplemented;
		res.respondOk = responder.respondOk;
		res.respondTooManyRequests = responder.respondTooManyRequests;
		res.respondUnauthorized = responder.respondUnauthorized;
		res.respondUpdated = responder.respondUpdated;

        next();
    };
};
