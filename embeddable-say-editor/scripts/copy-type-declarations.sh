#!/bin/bash

mkdir -p types/node_modules/@lblod/ember-rdfa-editor/core
cp -r node_modules/@lblod/ember-rdfa-editor/declarations/addon/core/say-controller.d.ts types/node_modules/@lblod/ember-rdfa-editor/core/
cp -r typeImports/* types/node_modules/
