# Contribute to Etals

## setup env

```
git clone https://github.com/jgirardet/etals.git
cd etals
yarn install
```

## various scripts

- `yarn dev`: run dev server
- `yarn cti`: run ctix

## Add Etals plugins

each plugin starts with `etals`, ie : `etalsBold`

### basic mark

- see `bold` marks as an example.
- create your Plugin file or diectory
- run `yarn cti`
- the `Text` type (ie: `BoldText`) must be added to `types/custom/EtalsTextKeys`
