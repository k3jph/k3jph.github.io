# Non-Public Source Assets

This directory preserves canonical and original repository assets that do not need to be copied into the generated website payload.

Files here are intentionally tracked by Git and intentionally outside `public/`. Moving an asset here does **not** mean that it is obsolete or disposable. These are editable sources, documentary originals, and recoverable historical materials whose rendered or downloadable public representations remain under `public/` where required.

The directory structure below `source-assets/` preserves each asset's former path below `public/`. For example:

```text
public/assets/docs/example.svg
source-assets/assets/docs/example.svg
```

`manifest.json` records each moved file, its former public path, its exact size at migration, and the public derivative or representation retained by the site. Validation uses that manifest to prevent accidental duplication, missing derivatives, or website links into this non-public tree.

If later editorial or resurrection work requires one of these originals to become publicly downloadable again, restore it deliberately to the appropriate path under `public/` and update the manifest. This directory is a source archive, not a graveyard.
