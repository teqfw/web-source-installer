# web-source-installer

## Disclaimer

This package is a part of the [Tequila Framework](https://flancer32.com/what-is-teqfw-f84ab4c66abf) (TeqFW). The TeqFW
is currently in an early stage of development and should be considered unstable. It may change rapidly, leading to
breaking changes without prior notice. Use it at your own risk. Please note that contributions to the project are
welcome, but they should only be made by those who understand and accept the risks of working with an unstable
framework.

## Overview

Streamline source installation for PWAs within TeqFW projects.

### Namespace

This plugin uses `TeqFw_Web_Source_Installer` namespace.

## Features

## `teqfw.json`

[DTO](src/Back/Plugin/Dto/Desc.mjs) for `@teqfw/web-source-installer` nodes in `teq`-plugins descriptors:

```json
{
  "@teqfw/web-source-installer": {
    "excludes": ["./data/*", "..."],
    "includes": ["..."]
  }
}
```