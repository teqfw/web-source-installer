# TODO

## Realize the path/url excludes/includes

The URL excludes only are used in `TeqFw_Web_Source_Installer_Back_Act_Create`:

```json
{
  "@teqfw/web-source-installer": {
    "urls": {"excludes": ["./data/*"]}
  }
}
```

We should have the ability to use all cases:

```json
{
  "@teqfw/web-source-installer": {
    "paths": {"excludes": [...], "includes": [...]},
    "urls": {"excludes": [...], "includes": [...]}
  }
}
```