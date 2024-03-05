# web-source-installer

Streamline source installation for PWAs within TeqFW projects.

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