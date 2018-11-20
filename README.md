# `$ binvoice` <img src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/240/apple/155/banknote-with-euro-sign_1f4b6.png" width="100" align="right">
**Personnal cli YAML to PDF invoices renderer**

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
- `!calc` to eval JS calc w/ `sum` defined as the sum of previous items price.
- [`handlebars`](https://github.com/wycats/handlebars.js/) templating.
- all informations are stored in the various YAML files : no overriding is allowed.

## Usage
```
binvoice, bv

Usage:
  binvoice <files>
  binvoice <files> --output=<path>
  binvoice --help
  binvoice --version

Options:
  -h, --help       Show this screen.
  -v, --version    Print the current version.
  -o, --output     Define the output directory (default is CWD).
  --porcelain      Make sure the output is parsable.

```
<sup>See [`.apprc`](.apprc) and the [`rc` package](https://github.com/dominictarr/rc#standards) for advanced options.</sup>

### Using bash
```sh
$ binvoice invoices/YYYYMMDD-client-1.yml
$ binvoice /Users/USERNAME/invoices/*
$ binvoice *.yml
$ binvoice $(ls -t *.yml | head -1)
$ open $(binvoice <files> --porcelain)
```

## Example

See [`example/`](example).

## License
[MIT.](https://tldrlegal.com/license/mit-license)
