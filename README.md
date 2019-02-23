# `github-apps-helper`

> Helper [template tags](https://support.insomnia.rest/article/40-template-tags) for interacting with [GitHub Apps](https://developer.github.com/apps/) using [**Insomnia**](https://insomnia.rest/) :sleeping:

## Installation

Install **<kbd>insomnia-plugin-github-apps-helper</kbd>** from the Plugins tab within the application preferences dialog:

![installation](https://user-images.githubusercontent.com/27806/38121163-357640ae-3393-11e8-81d8-c088002041f6.gif)

## Configuration

Following installation, it is recommended to set the following [environment variables within Insomnia](https://support.insomnia.rest/article/18-environment-variables):

1. <kbd>github_app_id</kbd>: The ID for your GitHub App, found under `https://github.com/settings/apps/your-app`
1. <kbd>github_app_private_key</kbd>: The path on your machine to a private key for your GitHub App, e.g. `/path/to/your-app.YYYY-MM-DD.private-key.pem`
    - More information on generating and downloading private keys for your GitHub Apps is [available in the documentation](https://developer.github.com/apps/building-github-apps/authenticating-with-github-apps/#generating-a-private-key)
1. <kbd>github_app_installation_id</kbd>: The ID for an installation of your GitHub App, found using [the `GET /app/installations` API](https://developer.github.com/v3/apps/#find-installations)

## Template Tags Usage

### `jwt`

Generates a JSON Web Token, allowing you to [authenticate with the GitHub API as your GitHub App](https://developer.github.com/apps/building-github-apps/authentication-options-for-github-apps/#authenticating-as-a-github-app).

**Usage**

Create a new request, e.g. `GET /app`:

<img width="791" alt="screen shot 2018-03-30 at 10 38 07 am" src="https://user-images.githubusercontent.com/27806/38143601-ded0fd60-3406-11e8-8474-efdceb4bd66d.png">

Set [the appropriate URL for your request](https://developer.github.com/v3/apps/#get-a-single-github-app), and configure auth to `Bearer Token`:

<img width="675" alt="screen shot 2018-03-30 at 10 38 35 am" src="https://user-images.githubusercontent.com/27806/38143603-e0b0a69e-3406-11e8-9c56-c2b75caca3b2.png">

Use auto-complete to select the `JSON Web Token` tag:

<img width="615" alt="screen shot 2018-03-30 at 10 38 48 am" src="https://user-images.githubusercontent.com/27806/38143606-e20892ae-3406-11e8-9f3a-042a74980a60.png">

Edit the tag and populate the values using your environment variables, note the live preview generates example output:

<img width="789" alt="screen shot 2018-03-30 at 10 42 36 am" src="https://user-images.githubusercontent.com/27806/38143697-5a4b5e7c-3407-11e8-9d53-8476c475115b.png">

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
