# Data Modelling Tool
[![License][license-badge]][license]
[![On main push][on-main-push-branch-badge]][on-main-push-branch-action]

The data modelling tool is a tool for modelling complex domain models.

Some features:

* Create, view, and search models
* Create applications containing custom views, models, and actions
* Generate code that reflects models

## Documentation

You can find the Data Modelling Tool documentation here; [https://equinor.github.io/data-modelling-tool](https://equinor.github.io/data-modelling-tool).

## Developing
 
The dynamic nature and tight coupling between the entites, blueprints, and views in the Development Framework,
the web application needs to have access to a Data Modelling Storage Service (DMSS).

You can start this locally (see https://github.com/equinor/data-modelling-storage-service), or point to an existing service somewhere else.

Let the web app know of which DMSS to use by setting the `DMSS_URL` environment variable.

### Starting

```shell
docker-compose pull
docker-compose up --build
# Load DMSS core documents
docker-compose run --rm dmss reset-app
# Load DMT app specific documents
dm reset apps
# Create DMT lookup for recipes
dm create-lookup DMT DMT/DMT/recipe_links
```

The web app will be served at http://localhost


If the data is corrupted or in a bad state, a hard reset of the DMSS is often a solution.
This command will remove every _mongo database using the same database host as the core_, and upload DMSS's core documents.  
App specific documents and lookup has to be recreated.

```shell
docker-compose run --rm dmss reset-app
```

### Running Tests

Unit tests:

`docker-compose run --rm api pytest`  
`docker-compose run --rm web yarn test`

### Pre-commit

We use pre-commit to do a minimum of checks on the developer pc before committing. The same checks, plus a few more are
also run in the build pipeline.  
You should catch any errors early to save time.

Setup;

```shell
pip install pre-commit  # Should be installed in global python environment
pre-commit install  # Pre-commit will now run on every commit (can be skipped with 'git commit --no-verify')

# To run manually on all files
pre-commit run -a 
```
