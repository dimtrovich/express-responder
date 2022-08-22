"use strict";
/*!
 * Express Rest Response (https://github.com/dimtrovich/express-responder)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */
const StatusCode = require('./status');
const { empty, is_array, is_object } = require('./utils');

/**
 * Constructeur de reponse 
 * 
 * @param {*} res 
 * @param {*} options 
 * @param {*} codes 
 * @returns 
 */
module.exports = (res, options, codes) => {
	this._res = res;

	options = (empty(options) || !is_object(options)) ? {} : options;
	codes = (empty(codes) || !is_object(codes)) ? {} : codes;

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
	this._codes = {...defaultCodes, ...codes};

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
	this._options = {...defaultOptions, ...options}

	/**
	 * Utilisé pour les échecs génériques pour lesquels aucune méthode personnalisée n'existe.
	 *
	 * @param {String}         		message Le message décrivant l'erreur
	 * @param {number}     			status  Code d'état HTTP
	 * @param {number|string|null} 	code    Code d'erreur personnalisé, spécifique à l'API
	 * @param {Array}           	errors  La liste des erreurs rencontrées
	 */
	exports.respondFail = (message = "Une erreur s'est produite", status = StatusCode.INTERNAL_ERROR, code, errors = []) => {
		message = message || "Une erreur s'est produite";
		code = !empty(code) ? code : status;
		
		const response = {};
		
		response[this._options.field?.message || 'message'] = message;
		
		if (!empty(this._options.field?.success)) {
			response[this._options.field?.success] = false;
		}
		if (!empty(this._options.field?.code)) {
			response[this._options.field?.code] =code;
		}
		if (!empty(errors)) {
			response[this._options.field?.errors || 'errors'] = errors;
		}
		
		if (this._options.strict !== true) {
			status = StatusCode.OK;
		}
		
		return this.respond(response, status);
	}

	/**
	 * Utilisé pour les succès génériques pour lesquels aucune méthode personnalisée n'existe.
	 */
	exports.respondSuccess = (message = "Résultat", result = null, status = StatusCode.OK) => {
		message = message || 'Résultat';
		status = !empty(status) ? status : StatusCode.OK;

		const response = {};
		
		response[this._options.field?.message || 'message'] = message;
		
		if (!empty(this._options.field?.success)) {
			response[this._options.field?.success] = true;
		}
		
		response[this._options.field?.result || 'result'] = result;
		
		return this.respond(response, status);
	}

	/**
	 * Fournit une méthode simple et unique pour renvoyer une réponse d'API, formatée
	 * pour correspondre au format demandé, avec le type de contenu et le code d'état appropriés.
	 *
	 * @param {*}    		data   Les donnees a renvoyer
	 * @param {number|null} status Le statut de la reponse
	 */
	exports.respond = (data, status = StatusCode.OK) => {
		// Si les données sont NULL et qu'aucun code d'état HTTP n'est fourni, affichage, erreur et sortie
		if ((empty(data)) && status === null) {
			status = StatusCode.NOT_FOUND;
		}
		data = JSON.parse(JSON.stringify(data));
		return this._res.status(status || 200).json(data);
	}


	/**
	 * Reponse de type bad request
	 */
	exports.respondBadRequest = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Bad request', this._codes.invalid_request || StatusCode.BAD_REQUEST, code, errors);
	}

	/**
	 * À utiliser lorsque vous essayez de créer une nouvelle ressource et qu'elle existe déjà.
	 */
	exports.respondConflict = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Conflict', this._codes.conflict || StatusCode.CONFLICT, code, errors);
	}

	/**
	 * Utilisé après la création réussie d'une nouvelle ressource.
	 */
	exports.respondCreated = (message, result = null) => {
		return this.respondSuccess(message || 'Created', result, this._codes.created || StatusCode.CREATED);
	}

	/**
	 * Utilisé après qu'une ressource a été supprimée avec succès.
	 */
	exports.respondDeleted = (message, result = null) => {
		return this.respondSuccess(message || 'Deleted', result, this._codes.deleted || StatusCode.OK);
	}

	/**
	 * Utilisé lorsque l'accès est toujours refusé à cette ressource
	 * et qu'aucune nouvelle tentative n'aidera.
	 */
	exports.respondForbidden = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Forbidden', this._codes.forbidden || StatusCode.FORBIDDEN, code, errors);
	}

	/**
	 * À utiliser lorsqu'une ressource a été précédemment supprimée. Ceci est différent de Not Found,
	 * car ici, nous savons que les données existaient auparavant, mais sont maintenant disparues,
	 * où Not Found signifie que nous ne pouvons tout simplement pas trouver d'informations à leur sujet.
	 */
	exports.respondGone = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Gone', this._codes.resource_gone || StatusCode.GONE, code, errors);
	}

	/**
	 * Utilisé lorsqu'il y a une erreur de serveur.
	 */
	exports.respondInternalError = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Internal Server Error', this._codes.server_error || StatusCode.INTERNAL_ERROR, code, errors);
	}

	/**
	 * Reponse de type invalid token
	 */
	exports.respondInvalidToken = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Invalid Token', this._codes.invalid_token || StatusCode.INVALID_TOKEN, code, errors);
	}

	/**
	 * Reponse de type method not allowed
	 */
	exports.respondMethodNotAllowed = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Method Not Allowed', this._codes.not_allowed || StatusCode.METHOD_NOT_ALLOWED, code, errors);
	}

	/**
	 * Utilisé après qu'une commande a été exécutée avec succès
	 * mais qu'il n'y a pas de réponse significative à renvoyer au client.
	 */
	exports.respondNoContent = (message) => {
		return this.respondSuccess(message || 'No Content', null, this._codes.no_content || StatusCode.NO_CONTENT);
	}

	/**
	 * Reponse de type not acceptable
	 */
	exports.respondNotAcceptable = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Not Acceptable', this._codes.not_acceptable || StatusCode.NOT_ACCEPTABLE, code, errors);
	}

	/**
	 * Utilisé lorsqu'une ressource spécifiée est introuvable.
	 */
	exports.respondNotFound = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Not Found', this._codes.resource_not_found || StatusCode.NOT_FOUND, code, errors);
	}

	/**
	 * Reponse de type not implemented
	 */
	exports.respondNotImplemented = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Not Implemented', this._codes.resource_not_implemented || StatusCode.NOT_IMPLEMENTED, code, errors);
	}

	/**
	 * Reponse de type ok
	 */
	exports.respondOk = (message, result = null) => {
		return this.respondSuccess(message || 'Ok', result, this._codes.ok || StatusCode.OK);
	}

	/**
	 * Utilisé lorsque l'utilisateur a fait trop de demandes pour la ressource récemment.
	 */
	exports.respondTooManyRequests = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Too Many Requests', this._codes.too_many_requests || StatusCode.TOO_MANY_REQUESTS, code, errors);
	}

	/**
	 * Utilisé lorsque le client n'a pas envoyé d'informations d'autorisation
	 * ou avait de mauvaises informations d'identification d'autorisation.
	 * L'utilisateur est encouragé à réessayer avec les informations appropriées.
	 */
	exports.respondUnauthorized = (message, code = null, errors = []) => {
		if (is_array(code)) {
			errors = code;
			code = null;
		}

		return this.respondFail(message || 'Unauthorized', this._codes.unauthorized || StatusCode.UNAUTHORIZED, code, errors);
	}

	/**
	 * Utilisé après qu'une ressource a été mise à jour avec succès.
	 */
	exports.respondUpdated = (message, result = null) => {
		return this.respondSuccess(message || 'Updated', result, this._codes.updated || StatusCode.OK);
	}


	return this
}