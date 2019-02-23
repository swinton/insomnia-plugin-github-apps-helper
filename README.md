# `github-apps-helper`

> Helper [template tags](https://support.insomnia.rest/article/40-template-tags) for interacting with [GitHub Apps](https://developer.github.com/apps/) using [**Insomnia**](https://insomnia.rest/) :sleeping:

## Installation

Install **<kbd>insomnia-plugin-github-apps-helper</kbd>** from the Plugins tab within the application preferences dialog:

![installation](https://user-images.githubusercontent.com/27806/38121163-357640ae-3393-11e8-81d8-c088002041f6.gif)

## Template Tags Usage

### `jwt`

Generates a JSON Web Token, allowing you to [authenticate with the GitHub API as your GitHub App](https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app).

**Setup**

It is recommended to set the following [environment variables within Insomnia](https://support.insomnia.rest/article/18-environment-variables):

1. <kbd>github_app_id</kbd>: The ID for your GitHub App, found under `https://github.com/settings/apps/your-app`
1. <kbd>github_app_private_key</kbd>: The path on your machine to the private key for your GitHub App, e.g. `/path/to/your-app.YYYY-MM-DD.private-key.pem`


**Usage**

Create a new `GET` request, e.g. `GET app`:

<img width="791" alt="screen shot 2018-03-30 at 10 38 07 am" src="https://user-images.githubusercontent.com/27806/38143601-ded0fd60-3406-11e8-8474-efdceb4bd66d.png">

Set [the appropriate URL for your request](https://developer.github.com/v3/apps/#get-a-single-github-app), and configure auth to `Bearer Token`:

<img width="675" alt="screen shot 2018-03-30 at 10 38 35 am" src="https://user-images.githubusercontent.com/27806/38143603-e0b0a69e-3406-11e8-9c56-c2b75caca3b2.png">

Use auto-complete to select the `JSON Web Token` tag:

<img width="615" alt="screen shot 2018-03-30 at 10 38 48 am" src="https://user-images.githubusercontent.com/27806/38143606-e20892ae-3406-11e8-9f3a-042a74980a60.png">

Edit the tag and populate the values using your environment variables, note the live preview generates example output:

<img width="789" alt="screen shot 2018-03-30 at 10 42 36 am" src="https://user-images.githubusercontent.com/27806/38143697-5a4b5e7c-3407-11e8-9d53-8476c475115b.png">

Hit `Send`. You're good to go :rocket:

## Authenticate as a GitHub App installation

Using Insomnia's [request chaining](https://support.insomnia.rest/article/43-chaining-requests) feature you can easily authenticate as an installation of your GitHub App.

1. Lookup the [installations for your GitHub Apps](https://developer.github.com/v3/apps/#find-installations)
1. Save the installation id for the installation you want to use as an Environment variable, e.g. <kbd>github_app_installation_id</kbd>
1. Create a `POST` request to [create an access token for that installation id](https://developer.github.com/v3/apps/#create-a-new-installation-token)
1. Create a further environment variable, <kbd>github_app_installation_access_token</kbd>, which will use the `Response => Body` from your previous `POST` request, the filter for this should be `$.token`
1. Use this environment variable as the `Bearer Token` to authenticate as that installation
