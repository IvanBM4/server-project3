ACTIVITIES ROUTES

|HTTP Method|PATH|ACTION|
|GET|/activities|Get all activities|
|GET|/activities/:id|Get one activity|
|GET|/activities/search|Filter activities|
|GET|/activities/users/:id|Get activities by user|
|POST|/activities|Create one activity|
|PUT|/activities/:id|Edit one activity|
|DELETE|/activities/:id|Delete one activity|

REVIEWS

|HTTP Method|PATH|ACTION|
|GET|/reviews|Get all reviews|
|GET|/reviews/:id|Get one review|
|GET|/reviews/search|Filter reviews|
|GET|/reviews/activities/:id|Get reviews by activity|
|GET|/reviews/users/:id|Get reviews by user|
|POST|/reviews|Create one review|
|PUT|/reviews/:id|Edit one review|
|DELETE|/reviews/:id|Delete one review|

USER

|HTTP Method|PATH|ACTION|
|POST|/signup|Signup user|
|POST|/login|Login user|
|GET|/verify|Verify user token|
|GET|/users|Get users|

CLIENT

|URL|Description|Protected|
|/|Index page||
|/actividades|Activities gallery||
|/actividades/detalles/:id|Activity details page||
|/crear-actividad|Create activity form|Protected|
|/signup|Register user||
|/login|Login user||
|/perfil|Profile page|Protected|
|/comentar|Add review|Protected|
|/editar-actividad|Edit activity|Protected|
|/editar-review|Edit review|Protected|