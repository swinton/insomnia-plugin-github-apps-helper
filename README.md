# `github-apps-helper`

> Helper [template tags](https://support.insomnia.rest/article/40-template-tags) for interacting with [GitHub Apps](https://developer.github.com/apps/) using [**Insomnia**](https://insomnia.rest/) :sleeping:

## Installation

Install **<kbd>insomnia-plugin-github-apps-helper</kbd>** from the Plugins tab within the application preferences dialog:

![installation](https://user-images.githubusercontent.com/27806/53279590-57c66880-36d7-11e9-8207-2b68a0778961.gif)

## Configuration

Following installation, it is recommended to set the following [environment variables within Insomnia](https://support.insomnia.rest/article/18-environment-variables):

1. <kbd>github_app_id</kbd>: The ID for your GitHub App
    - This is available from the settings page of your GitHub App, as `App ID`.
1. <kbd>github_app_private_key</kbd>: The path on your machine to a private key for your GitHub App, e.g. `/path/to/your-app.YYYY-MM-DD.private-key.pem`
    - More information on generating and downloading private keys for your GitHub Apps is [available in the documentation](https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/#generating-a-private-key)
1. <kbd>github_app_installation_id</kbd>: The ID for an installation of your GitHub App
    - Found using [the `GET /app/installations`](https://developer.github.com/v3/apps/#find-installations) API endpoint

## Template Tags Usage

1. [`jwt`](#jwt): Generates a JSON Web Token, allowing you to authenticate with the GitHub API as your GitHub App
1. [`installation_access_token`](#installation_access_token): Generates an Installation Access Token, allowing you to authenticate with the GitHub API as an installation of your GitHub App

### `jwt`

Generates a JSON Web Token, allowing you to [authenticate with the GitHub API as your GitHub App](https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app).

**Usage**

Create a new request, e.g. `GET /app`:

<img width="791" alt="screen shot 2019-02-22 at 7 29 33 pm" src="https://user-images.githubusercontent.com/27806/53279699-7f6a0080-36d8-11e9-91e6-87b890743e46.png">

Set [the appropriate URL for your request](https://developer.github.com/v3/apps/#get-a-single-github-app), and configure auth to `Bearer Token`:

<img width="604" alt="screen shot 2019-02-22 at 7 30 08 pm" src="https://user-images.githubusercontent.com/27806/53279701-81cc5a80-36d8-11e9-8f6e-b67e0f3b66ad.png">

Use auto-complete to select the `JSON Web Token` tag:

<img width="600" alt="screen shot 2019-02-22 at 7 30 27 pm" src="https://user-images.githubusercontent.com/27806/53279704-842eb480-36d8-11e9-9cef-9b7ac9bf0e51.png">

Edit the tag and populate the values using your environment variables, note the live preview generates example output:

<img width="797" alt="screen shot 2019-02-22 at 7 33 39 pm" src="https://user-images.githubusercontent.com/27806/53279748-c7892300-36d8-11e9-90c8-95a4b38ebeee.png">

Hit `Send`. You're good to go :rocket:

### `installation_access_token`

Generates an Installation Access Token, allowing you to [authenticate with the GitHub API as an installation of your GitHub App](https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/#authenticating-as-an-installation).

**Usage**

Create a new request, e.g. `GET /installation/repositories`:

<img width="784" alt="screen shot 2019-02-22 at 7 06 06 pm" src="https://user-images.githubusercontent.com/27806/53279319-06b57500-36d5-11e9-97f1-c772ae0e6112.png">

Set [the appropriate URL for your request](https://developer.github.com/v3/apps/installations/#list-repositories), and configure auth to `Bearer Token`:

<img width="557" alt="screen shot 2019-02-22 at 7 08 21 pm" src="https://user-images.githubusercontent.com/27806/53279345-3e242180-36d5-11e9-8f40-fc0718c0ca49.png">

Use auto-complete to select the `Installation Access Token` tag:

<img width="550" alt="screen shot 2019-02-22 at 7 10 12 pm" src="https://user-images.githubusercontent.com/27806/53279383-82afbd00-36d5-11e9-9ddb-c8c1a9e5b93f.png">

Edit the tag and populate the values using your environment variables, note the live preview generates example output:

<img width="788" alt="screen shot 2019-02-22 at 7 13 31 pm" src="https://user-images.githubusercontent.com/27806/53279439-f81b8d80-36d5-11e9-8f28-7705a7042242.png">

Hit `Send`. You're good to go :rocket:
