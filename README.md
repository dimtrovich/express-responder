
<h1 align="center">Express Rest Response</h1>
<h4 align="center"> Réponses Restful simple pour Express.js</h4>

<p align="center">
  <a href="https://www.npmjs.com/package/express-rest-response"><img src="https://img.shields.io/npm/v/express-rest-response.svg"></a>
  <a href="https://www.npmjs.com/package/express-rest-response"><img src="https://img.shields.io/npm/dt/express-rest-response.svg"></a>
<a href='https://coveralls.io/github/dimtrovich/express-rest-response?branch=main'><img src='https://coveralls.io/repos/github/dimtrovich/express-rest-response/badge.svg?branch=main' alt='Coverage Status' /></a>
  <a href="https://github.com/dimtrovich/express-rest-response/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg"></a>
  <a href="http://img.badgesize.io/dimtrovich/express-rest-response/main/dist/bundle.min.js.svg?compression=gzip&style=flat-square">
    <img src="http://img.badgesize.io/dimtrovich/express-rest-response/main/dist/bundle.min.js.svg?compression=gzip&style=flat-square">
  </a>
</p>

Une grande partie du développement moderne nécessite la création d'API, qu'il s'agisse simplement de fournir des données à un programme lourd en JavaScript, single page ou en tant que produit autonome. 

Express Rest Response fournit un trait de réponse API qui peut être utilisé avec n'importe quel contrôleur pour simplifier les types de réponse courants, sans avoir besoin de se rappeler quel code d'état HTTP doit être renvoyé pour quels types de réponse.


#### Installation
*************
via [npm](https://npmjs.org/)

```sh
$ npm install express-rest-response --save
```

via [yarn](https://yarnpkg.com)

```sh
$ yarn add express-rest-response
```

#### Utilisation
*************
```javascript
const express = require('express')
const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Utilisation du middleware express-rest-response
const responder = require('express-rest-response')
app.use(responder())

const routes = require('./router')
app.use('/api', routes)

const PORT = process.env.PORT || 4000
app.listen(PORT, function(req,res){
  console.log(`sever is listening on port ${PORT}`)}
)
```


#### Exemple d'utilisation
*************
L'exemple suivant montre un modèle d'utilisation courant au sein de vos contrôleurs.

```js
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.register = function (req, res) {
    const {email, name, password} = req.body

   	//create newUser
    User.create({
     	password : bcrypt.hashSync(password, 10),
        name,
        email 
	}).then(user => {
        res.respondCreated()
	})
}
```

Dans cet exemple, un code d'état HTTP de 201 est renvoyé, avec le message d'état générique "Créé". Des méthodes existent pour les cas d'utilisation les plus courants :

```javascript
// Réponse générique
res.respond(data, status = 200);

// Réponse générique d'echec
res.respondFail(message = "An error has occurred", status = 500, code = null, errors = []);

// Réponse générique de succès
res.respondSuccess(message = "Result", result = null, status = 200);


// Création de resource
res.respondCreated(message = "Created", result = null);

// Suppression de resource
res.respondDeleted(message = "Deleted", result = null);

// Commande exécutée sans réponse requise
res.respondNoContent(message = "No Content");

// Tout est ok
res.respondOk(message = "Ok", result = null);

// Mise à jour de resource
res.respondUpdated(message = "Updated", result = null);


// Les données envoyées sont invalides
res.respondBadRequest(message = "Bad Request", code = 400, errors = []);

// Ressource déja existante
res.respondConflict(message = "Conflict", code = 409, errors = []);

// Action interdite
res.respondForbidden(message = "Forbidden", code = 403, errors = []);

// Ressource précédement supprimée
res.respondGone(message = "Gone", code = 410, errors = []);

// Erreur interne
res.respondInternalError(message = "Internal Server Error", code = 500, errors = []);

// Token d'authentification expriré ou invalide
res.respondInvalidToken(message = "Invalid Token", code = 498);

// Méthode d'accès non autorisée
res.respondMethodNotAllowed(message = "Method Not Allowed", code = 405, errors = []);

// 	Ressource non disponible dans un format qui respecterait les en-têtes « Accept » de la requête
res.respondNotAcceptable(message = "Not Acceptable", code = 406, errors = []);

// Ressource introuvable
res.respondNotFound(message = "Not Found", code = 404, errors = []);

// Ressource non disponible dans un format qui respecterait les en-têtes « Accept » de la requête
res.respondNotAcceptable(message = "Not Acceptable", code = 406, errors = []);

// Fonctionnalité réclamée non supportée par le serveur.
res.respondNotImplemented(message = "Not Implemented", code = 501);

// Le client a fait trop de demandes
res.respondTooManyRequests(message = "Too Many Requests", code = 429, errors = []);

// Le client n'est pas autorisé
res.respondUnauthorized(message = "Unauthorized", code = 401, errors = []);
```

#### Référence de classe
**************
#### `respond(data: mixed, status?: number = 200)`

C'est la méthode utilisée par toutes les autres méthodes de ce trait pour renvoyer une réponse au client.

`paramètres`:

  * `data` — Les données à renvoyer au client. Chaîne ou tableau ou objet littéral
  * `status` — Code d'état HTTP à renvoyer. Par défaut à 200

#### `respondFail(message?: string = "An error has occurred", status?: number = 500, code?: int|string|null = null, errors?: array = [])`

C'est la méthode générique utilisée pour représenter une réponse ayant échoué et est utilisée par toutes les autres méthodes d'échec.

`Paramètres`:

  * `message` — Le message décrivant l'erreur
  * `status` — Code d'état HTTP à renvoyer. Par défaut à 500
  * `code` — Un code d'erreur personnalisé, spécifique à l'API
  * `errors` — La liste des erreurs rencontrées
	 
Étant donné que de nombreuses API sont mieux servies à l'aide de codes d'erreur personnalisés, un code d'erreur personnalisé peut être transmis dans le troisième paramètre. Si aucune valeur n'est présente, ce sera la même chose que `status`.

`Réponse`:
La réponse est un tableau avec 4 éléments : `message`, `success`, `code` et `errors`. 
* L'élément `success` est un booléen ayant la valeur `FALSE` spécifiant le fait qu'il y'a un échec de l'opération
* L'élément `errors` est un tableau contenant la liste des erreurs, ci celles-ci on été spécifiées

Cela ressemblerait à quelque chose comme :
```json
{
    "message": "Insuffisiant balance",
    "success": false,
    "code": 909
}
```
#### `respondSuccess(message?: string = "Result", result: mixed = null, status?: number = 200)`

C'est la méthode générique utilisée pour représenter une réponse ayant réussie et est utilisée par toutes les autres méthodes de réussite.

`Paramètres`:

  * `message` — Le message décrivant la réussite
  * `result` — Les résultat à envoyer au client
  * `status` — Code d'état HTTP à renvoyer. Par défaut à 200
	 
`Réponse`:
La réponse est un tableau avec 3 éléments : `message`, `success`, et `result`. 
* L'élément `success` est un booléen ayant la valeur `TRUE` spécifiant le fait que l'opération s'est bien passée
* L'élément `result` contient les données renvoyés

Cela ressemblerait à quelque chose comme :
```json
{
    "message": "Connection successfully",
    "success": true,
    "result": {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2MmZmNGRlM2VkYzY0NTUyNDIzZjBjZDkiLCJpYXQiOjE2NjA5MDM0MDQsImV4cCI6MTY2MDk4OTgwNH0.rgCt_E7xEMjsFSAKGl9pngrGF4-13_ExLIu0kXikd3k",
        "id": "62ff4de3edc64552423f0cd9"
    }
}
```

Les 3 méthodes ci-dessus sont les méthodes principales. Il existe néanmoins des méthodes plus spécifique en fonction de vos besoins

#### `respondCreated(message?: string = "Created", result: mixed = null)`

 Définit le code d'état approprié à utiliser lors de la création d'une nouvelle ressource, généralement 201.

`Paramètres`:

  * `message` — Le message décrivant la création
  * `result` — Les résultat à envoyer au client
	 
`Réponse`:
La réponse est un tableau avec 3 éléments : `message`, `success`, et `result`. 
* L'élément `success` est un booléen ayant la valeur `TRUE` spécifiant le fait que l'opération s'est bien passée
* L'élément `result` contient les données renvoyés
L'exemple ci dessous

```javascript
User.create({
    password : bcrypt.hashSync(password, 10),
    name,
    email 
}).then(user => {
    res.respondCreated('User created successfully', user)
})
```

Renverra une réponse comme :
```json
"message": "User created successfully",
"success": true,
"result": {
    "password": "$2b$10$it8MOxq3UMlyqA4SODsD2uFafTreOQJPIdyGYQfGl2CJiKX4N81mq",
    "phone": "xxxxxxxxx",
    "name": "John Doe",
    "email": "johndoe@email.com",
    "_id": "62ff7f7adf90b9d003a47b53",
    "__v": 0
}
```

#### `respondDeleted(message?: string = "Deleted", result: mixed = null)`

Définit le code d'état approprié à utiliser lorsqu'une nouvelle ressource a été supprimée à la suite de et appel d'API, généralement 200.

#### `respondNoContent(message?: string = "No Content")`

Définit le code d'état approprié à utiliser lorsqu'une commande a été exécutée avec succès par le serveur mais qu'il n'y a pas réponse significative à renvoyer au client, généralement 204.

#### `respondBadRequest(message?: string = "Bad Request", code?: number|string|null = null, errors?: array)`

Définit le code d'état approprié à utiliser lorsque les données envoyées par le client ne satisfont pas aux règles de validation. Le code d'état est généralement 400.
```javascript
return res.respondBadRequest('Invalid phone number');
```
#### `respondConflict(message?: string = "Conflict", code?: number|string|null = null, errors?: array)`
Définit le code d'état approprié à utiliser lorsque la ressource que le client essaie de créer existe déjà. Le code d'état est généralement 409.
```javascript
return res.respondConflict('A user already exists with that email.');
```
#### `respondForbidden(message?: string = "Forbidden", code?: number|string|null = null, errors?: array)`

Contrairement à `respondUnauthorized()`, cette méthode doit être utilisée lorsque le point de terminaison d'API demandé n'est jamais autorisé. `Non autorisé` implique que le client est encouragé à réessayer avec des informations d'identification différentes. Avec `interdits`, le client ne doit pas réessayer car cela n'aidera pas. Le code d'état est 403.
```javascript
return res.respondForbidden('Invalid API endpoint.');
```
#### `respondGone(message?: string = "Gone", code?: number|string|null = null, errors?: array)`
Définit le code d'état approprié à utiliser lorsque la ressource demandée a été précédemment supprimée et n'est plus disponible. Le code d'état est généralement 410.
```javascript
return res.respondGone('That user has been previously deleted.');
```
#### `respondInternalError(message?: string = "Internal Server Error", code?: number|string|null = null, errors?: array)`
Définit le code d'état approprié à utiliser en cas d'erreur de serveur. Le code d'état est généralement 500.
```javascript
try {
    ...
}
catch(err) {
    return res.respondInternalError(err.message);
}
```
#### `respondInvalidToken(message?: string = "Invalid Token", code?: number|string|null = null)`
Définit le code d'état approprié à utiliser lorsque le token utilisé pour l'authentification de l'utilisateur a expiré ou est invalide. Le code d'état est généralement 498.
```javascript
return res.respondInvalidToken();
```
#### `respondNotFound(message?: string = "Not Found", code?: number|string|null = null, errors?: array)`
Définit le code d'état approprié à utiliser lorsque la ressource demandée est introuvable. Le code d'état est 404.
```javascript
return res.respondNotFound('User 13 cannot be found.');
```
#### `respondTooManyRequests(message?: string = "Too many requests", code?: number|string|null = null, errors?: array)`
Définit le code d'état approprié à utiliser lorsque le client a appelé trop de fois un point de terminaison d'API. Cela peut être dû à une certaine forme de limitation ou de limitation de débit. Le code d'état est généralement 400.
```javascript
return res.respondTooManyRequests('You must wait 15 seconds before making another request.');
```
#### `respondUnauthorized(message?: string = "Unauthorized", code?: number|string|null = null, errors?: array)`

Définit le code d'état approprié à utiliser lorsque l'utilisateur n'a pas été autorisé, ou a une autorisation incorrecte. Le code d'état est 401.
```javascript
return res.respondUnauthorized('Invalid Auth token');
```