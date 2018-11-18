# `$ binvoice`

**As `binvoice`'s goal is to simplify my particular workflow, `binvoice` will stay in a private repository.**

<br>

## About
- `binvoice` isn't an invoice manager: macOs file system is.
- `binvoice` does not make complexe calculus.
- `binvoice` simply creates PDF from YAML files.
- `binvoice` stays close to the unix way, by piping files to programs.
- `binvoice` keeps it stupid, simple.

## Features
- macOs `Work in Progress` tag to mark unpaid invoices.
- `!ref <path>` to include a reference to another YAML file.
- [`handlebars`](https://github.com/wycats/handlebars.js/) templating.
- all informations are stored in the various YAML files : no overriding is allowed.

## Usage
```sh
$ binvoice invoices/YYYYMMDD-client-1.yml
$ binvoice invoices/*
$ binvoice $(ls -t *.yml | head -1)
```

## Example

See [`example/`](example).

## License
[MIT.](https://tldrlegal.com/license/mit-license)
