#!/usr/bin/env bash

mkdir -p types/node_modules/@lblod/ember-rdfa-editor/core
# Copy say-controller types from editor repo in node_modules
cp -r node_modules/@lblod/ember-rdfa-editor/declarations/addon/core/say-controller.d.ts types/node_modules/@lblod/ember-rdfa-editor/core/
# Add stub declaration files to avoid type errors for basic usage
cp -r type-imports/* types/node_modules/
