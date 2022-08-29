'use strict';

/*!
 * Express Rest Response (https://github.com/dimtrovich/express-responder)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */
/**
 * Liste des code HTTP
 */
var StatusCode = {
    /**
     * Codes non officiels
     */
    CHECKPOINT: 103,
    THIS_IS_FIND: 218,
    PAGE_EXPIRED: 419,
    METHOD_FAILURE: 420,
    ENHANCE_YOUR_CALM: 420,
    LOGIN_TIMEOUT: 440,
    NO_RESPONSE: 444,
    RETRY_WITH: 449,
    BLOCKED_BY_WINDOWS_PARENTAL_CONTROLS: 450,
    REDIRECT: 451,
    REQUEST_HEADER_TOO_LARGE: 494,
    SSL_CERTIFICATE_ERROR: 495,
    SSL_CERTIFICATE_REQUIRED: 496,
    HTTP_REQUEST_SENT_TO_HTTPS_PORT: 497,
    INVALID_TOKEN: 498,
    CLIENT_CLOSED_REQUEST: 499,
    TOKEN_REQUIRED: 499,
    BANDWIDTH_LIMIT_EXCEEDED: 509,
    WEB_SERVER_RETURNED_AN_UNKNOWN_ERROR: 520,
    WEB_SERVER_IS_DOWN: 521,
    CONNECTION_TIMEDOUT: 522,
    ORIGIN_IS_UNREACHABLE: 523,
    A_TIMEOUT_OCCURRED: 524,
    SSL_HANDSHAKE_FAILED: 525,
    INVALID_SSL_CERTIFICATE: 526,
    RAILGUN_ERROR: 527,
    SITE_IS_OVERLOADED: 529,
    SITE_IS_FROZEN: 530,
    NETWORK_READ_TIMEOUT_ERROR: 598,
    /**
     * Code officiels
     */
    // Informational 1xx
    CONTINUE: 100,
    SWITCHING_PROTOCOLS: 101,
    PROCESSING: 102,
    EARLY_HINTS: 103,
    // Successful 2xx
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NON_AUTHORITATIVE_INFORMATION: 203,
    NO_CONTENT: 204,
    RESET_CONTENT: 205,
    PARTIAL_CONTENT: 206,
    MULTI_STATUS: 207,
    ALREADY_REPORTED: 208,
    IM_USED: 226,
    // Redirection 3xx
    MULTIPLE_CHOICES: 300,
    MOVED_PERMANENTLY: 301,
    FOUND: 302,
    SEE_OTHER: 303,
    NOT_MODIFIED: 304,
    USE_PROXY: 305,
    SWITCH_PROXY: 306,
    TEMPORARY_REDIRECT: 307,
    PERMANENT_REDIRECT: 308,
    // Client Errors 4xx
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    PAYMENT_REQUIRED: 402,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    METHOD_NOT_ALLOWED: 405,
    NOT_ACCEPTABLE: 406,
    PROXY_AUTHENTICATION_REQUIRED: 407,
    REQUEST_TIMEOUT: 408,
    CONFLICT: 409,
    GONE: 410,
    LENGTH_REQUIRED: 411,
    PRECONDITION_FAILED: 412,
    PAYLOAD_TOO_LARGE: 413,
    URI_TOO_LONG: 414,
    UNSUPPORTED_MEDIA_TYPE: 415,
    RANGE_NOT_SATISFIABLE: 416,
    EXPECTATION_FAILED: 417,
    IM_A_TEAPOT: 418,
    MISDIRECTED_REQUEST: 421,
    UNPROCESSABLE_ENTITY: 422,
    LOCKED: 423,
    FAILED_DEPENDENCY: 424,
    TOO_EARLY: 425,
    UPGRADE_REQUIRED: 426,
    PRECONDITION_REQUIRED: 428,
    TOO_MANY_REQUESTS: 429,
    REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
    UNAVAILABLE_FOR_LEGAL_REASONS: 451,
    // Server Errors 5xx
    INTERNAL_ERROR: 500,
    NOT_IMPLEMENTED: 501,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 503,
    GATEWAY_TIMEOUT: 504,
    HTTP_VERSION_NOT_SUPPORTED: 505,
    VARIANT_ALSO_NEGOTIATES: 506,
    INSUFFICIENT_STORAGE: 507,
    LOOP_DETECTED: 508,
    NOT_EXTENDED: 510,
    NOTWORK_AUTHENTICATION_REQUIRED: 511, // RFC 6585
};

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
function empty(mixed_var) {
	var undef, key, i, len;
	var emptyValues = [undef, null, false, 0, '', '0'];

	for (i = 0, len = emptyValues.length; i < len; i++) {
		if (mixed_var === emptyValues[i]) {
			return true;
		}
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

	if (is_array(mixed_var) && !mixed_var.length) {
		return true
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
function is_array(mixed_var) {
	var _isArray = function(mixed_var) {
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

	return _isArray(mixed_var);
}

/**
 * Verifie si l'element est un objet
 * 
 * @param {*} mixed_var 
 * @return {Boolean} true si l'element est un tableau
 * @credit phpjs
 */
function is_object(mixed_var) {
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
function ucfirst(str) {
	str += '';
	  var f = str.charAt(0)
		.toUpperCase();
	  return f + str.substr(1);
}

/**
 * Constructeur de reponse 
 * 
 * @param {*} res 
 * @param {*} options 
 * @param {*} codes 
 * @returns 
 */
function Response (res, options, codes) {
	const _res = res;

	/**
     * Permet aux classes enfants de remplacer
     * code d'état utilisé dans leur API.
     *
     * @var array<string, int>
     */
	const defaultCodes = {
        created                  : StatusCode.CREATED,
        deleted                  : StatusCode.OK,
        updated                  : StatusCode.OK,
        no_content               : StatusCode.NO_CONTENT,
        invalid_request          : StatusCode.BAD_REQUEST,
        unsupported_response_type: StatusCode.BAD_REQUEST,
        invalid_scope            : StatusCode.BAD_REQUEST,
        temporarily_unavailable  : StatusCode.BAD_REQUEST,
        invalid_grant            : StatusCode.BAD_REQUEST,
        invalid_credentials      : StatusCode.BAD_REQUEST,
        invalid_refresh          : StatusCode.BAD_REQUEST,
        no_data                  : StatusCode.BAD_REQUEST,
        invalid_data             : StatusCode.BAD_REQUEST,
        access_denied            : StatusCode.UNAUTHORIZED,
        unauthorized             : StatusCode.UNAUTHORIZED,
        invalid_client           : StatusCode.UNAUTHORIZED,
        forbidden                : StatusCode.FORBIDDEN,
        resource_not_found       : StatusCode.NOT_FOUND,
        not_acceptable           : StatusCode.NOT_ACCEPTABLE,
        resource_exists          : StatusCode.CONFLICT,
        conflict                 : StatusCode.CONFLICT,
        resource_gone            : StatusCode.GONE,
        payload_too_large        : StatusCode.PAYLOAD_TOO_LARGE,
        unsupported_media_type   : StatusCode.UNSUPPORTED_MEDIA_TYPE,
        too_many_requests        : StatusCode.TOO_MANY_REQUESTS,
        server_error             : StatusCode.INTERNAL_ERROR,
        unsupported_grant_type   : StatusCode.NOT_IMPLEMENTED,
        not_implemented          : StatusCode.NOT_IMPLEMENTED,
	};
	const _codes = {...defaultCodes, ...codes};

	const defaultOptions = {
		/**
		 * Specifie si on doit utiliser le mode strict (envoi des codes HTTP appropries pour la reponse)
		 * Si défini à FALSE, toutes les reponses auront le statut 200, seul le champ code changera
		 * 
		 * @var {Boolean}
		 */
		strict: true,

		/**
		 * @var {[key: string]: string}
		 */
		field: {
			/**
			 * Le nom du champ pour `l'etat` de la réponse
			 */
		 	success: 'success',
			/**
			 * Le nom du champ pour le 'message' dans la réponse
			 */
			message: 'message',
			/**
			 * Le nom du champ pour le 'code' dans la réponse
			 */
		 	code: 'code',
			/**
			 * Le nom du champ pour les 'erreurs' dans la réponse
			 */
		 	errors: 'errors',
			/**
			 * Le nom du champ pour les 'resultats' dans la réponse
			 */
		 	result: 'result'
	 	},
	};
	const _options = {...defaultOptions, ...options};


	/**
	 * @internal
	 */
	const _parseParams = (message, code = null, errors = []) => {
		if (is_array(message) || is_object(message)) {
			if (empty(errors)) {
				errors = message;
			}
			message = null;
		}
		if (is_array(code)) {
			if (empty(errors)) {
				errors = code;
			}
			code = null;
		}

		return {message, code, errors}
	};


	return {
		/**
		 * Utilisé pour les échecs génériques pour lesquels aucune méthode personnalisée n'existe.
		 *
		 * @param {String}         		message Le message décrivant l'erreur
		 * @param {number}     			status  Code d'état HTTP
		 * @param {number|string|null} 	code    Code d'erreur personnalisé, spécifique à l'API
		 * @param {Array}           	errors  La liste des erreurs rencontrées
		 */
		respondFail(message = "An error has occurred", status = StatusCode.INTERNAL_ERROR, code, errors = []) {
			message = message || "Une erreur s'est produite";
			code = !empty(code) ? code : status;
			
			const response = {};
			
			response[_options.field?.message || 'message'] = message;
			
			if (!empty(_options.field?.success)) {
				response[_options.field?.success] = false;
			}
			if (!empty(_options.field?.code)) {
				response[_options.field?.code] =code;
			}
			if (!empty(errors)) {
				response[_options.field?.errors || 'errors'] = errors;
			}
			
			if (_options.strict !== true) {
				status = StatusCode.OK;
			}
			
			return this.respond(response, status);
		},

		/**
		 * Utilisé pour les succès génériques pour lesquels aucune méthode personnalisée n'existe.
		 */
		respondSuccess(message = "Result", result = null, status = StatusCode.OK) {
			message = message || 'Résultat';
			status = !empty(status) ? status : StatusCode.OK;

			const response = {};
			
			response[_options.field?.message || 'message'] = message;
			
			if (!empty(_options.field?.success)) {
				response[_options.field?.success] = true;
			}
			
			response[_options.field?.result || 'result'] = result;
			
			return this.respond(response, status);
		},

		/**
		 * Fournit une méthode simple et unique pour renvoyer une réponse d'API, formatée
		 * pour correspondre au format demandé, avec le type de contenu et le code d'état appropriés.
		 *
		 * @param {*}    		data   Les donnees a renvoyer
		 * @param {number|null} status Le statut de la reponse
		 */
		respond(data, status = StatusCode.OK) {
			// Si les données sont NULL et qu'aucun code d'état HTTP n'est fourni, affichage, erreur et sortie
			if ((empty(data)) && status === null) {
				status = StatusCode.NOT_FOUND;
			}
			data = JSON.parse(JSON.stringify(data));
			return _res.status(status || 200).json(data);
		},


		/**
		 * Reponse de type bad request
		 */
		respondBadRequest(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);
			
			return this.respondFail(params.message || 'Bad request', _codes.invalid_request || StatusCode.BAD_REQUEST, params.code, params.errors);
		},

		/**
		 * À utiliser lorsque vous essayez de créer une nouvelle ressource et qu'elle existe déjà.
		 */
		respondConflict(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Conflict', _codes.conflict || StatusCode.CONFLICT, params.code, params.errors);
		},

		/**
		 * Utilisé après la création réussie d'une nouvelle ressource.
		 */
		respondCreated(message, result = null) {
			const params = _parseParams(message, null, result);

			return this.respondSuccess(params.message || 'Created', params.errors, _codes.created || StatusCode.CREATED);
		},

		/**
		 * Utilisé après qu'une ressource a été supprimée avec succès.
		 */
		respondDeleted(message, result = null) {
			const params = _parseParams(message, null, result);

			return this.respondSuccess(params.message || 'Deleted', params.errors, _codes.deleted || StatusCode.OK);
		},

		/**
		 * Utilisé lorsque l'accès est toujours refusé à cette ressource
		 * et qu'aucune nouvelle tentative n'aidera.
		 */
		respondForbidden(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Forbidden', _codes.forbidden || StatusCode.FORBIDDEN, params.code, params.errors);
		},

		/**
		 * À utiliser lorsqu'une ressource a été précédemment supprimée. Ceci est différent de Not Found,
		 * car ici, nous savons que les données existaient auparavant, mais sont maintenant disparues,
		 * où Not Found signifie que nous ne pouvons tout simplement pas trouver d'informations à leur sujet.
		 */
		respondGone(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Gone', _codes.resource_gone || StatusCode.GONE, params.code, params.errors);
		},

		/**
		 * Utilisé lorsqu'il y a une erreur de serveur.
		 */
		respondInternalError(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Internal Server Error', _codes.server_error || StatusCode.INTERNAL_ERROR, params.code, params.errors);
		},

		/**
		 * Reponse de type invalid token
		 */
		respondInvalidToken(message, code = null) {
			const params = _parseParams(message, code, []);

			return this.respondFail(params.message || 'Invalid Token', _codes.invalid_token || StatusCode.INVALID_TOKEN, params.code, params.errors);
		},

		/**
		 * Reponse de type method not allowed
		 */
		respondMethodNotAllowed(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Method Not Allowed', _codes.not_allowed || StatusCode.METHOD_NOT_ALLOWED, params.code, params.errors);
		},

		/**
		 * Utilisé après qu'une commande a été exécutée avec succès
		 * mais qu'il n'y a pas de réponse significative à renvoyer au client.
		 */
		respondNoContent(message) {
			return this.respondSuccess(message || 'No Content', null, _codes.no_content || StatusCode.NO_CONTENT);
		},

		/**
		 * Reponse de type not acceptable
		 */
		respondNotAcceptable(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Not Acceptable', _codes.not_acceptable || StatusCode.NOT_ACCEPTABLE, params.code, params.errors);
		},

		/**
		 * Utilisé lorsqu'une ressource spécifiée est introuvable.
		 */
		respondNotFound(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Not Found', _codes.resource_not_found || StatusCode.NOT_FOUND, params.code, params.errors);
		},

		/**
		 * Reponse de type not implemented
		 */
		respondNotImplemented(message, code = null) {
			const params = _parseParams(message, code, []);

			return this.respondFail(params.message || 'Not Implemented', _codes.resource_not_implemented || StatusCode.NOT_IMPLEMENTED, params.code, params.errors);
		},

		/**
		 * Reponse de type ok
		 */
		respondOk(message, result = null) {
			const params = _parseParams(message, null, result);

			return this.respondSuccess(params.message || 'Ok', params.errors, _codes.ok || StatusCode.OK);
		},

		/**
		 * Utilisé lorsque l'utilisateur a fait trop de demandes pour la ressource récemment.
		 */
		respondTooManyRequests(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Too Many Requests', _codes.too_many_requests || StatusCode.TOO_MANY_REQUESTS, params.code, params.errors);
		},

		/**
		 * Utilisé lorsque le client n'a pas envoyé d'informations d'autorisation
		 * ou avait de mauvaises informations d'identification d'autorisation.
		 * L'utilisateur est encouragé à réessayer avec les informations appropriées.
		 */
		respondUnauthorized(message, code = null, errors = []) {
			const params = _parseParams(message, code, errors);

			return this.respondFail(params.message || 'Unauthorized', _codes.unauthorized || StatusCode.UNAUTHORIZED, params.code, params.errors);
		},

		/**
		 * Utilisé après qu'une ressource a été mise à jour avec succès.
		 */
		respondUpdated(message, result = null) {
			const params = _parseParams(message, null, result);

			return this.respondSuccess(params.message || 'Updated', params.errors, _codes.updated || StatusCode.OK);
		},
	}
}

function index (options, codes) {
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
			res[`respond${ucfirst(method)}`] = responder[`respond${ucfirst(method)}`];
		}
		
		if (options.allowShortSyntax && options.allowShortSyntax === true) {
			for (const method of methods) {
				res[`${method}`] = responder[`respond${ucfirst(method)}`];
			}
			res.fail = responder.respondFail;
			res.success = responder.respondSuccess;
		}

        next();
    };
}

module.exports = index;
