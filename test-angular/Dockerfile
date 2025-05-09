# This just runs type checks but avoids the problem of pnpm using a symlink to the repo within a
# workspace as this set-up provides types that will not be there in an actual install.
# It would be nice to do this as just a step of the test-app build, but since the steps have no
# input in the final image the builder optimises them out.
# NOTE Needs to be built with the root of the monorepo as the context
FROM node:lts-iron AS builder

LABEL maintainer="info@redpencil.io"

# Do pnpm installs first to allow for caching
WORKDIR /app
RUN npm i -g corepack@0.31
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY embeddable-say-editor/package.json embeddable-say-editor/
COPY patches patches/
RUN pnpm i --frozen-lockfile
COPY . .

# Pack module
WORKDIR /app/embeddable-say-editor
RUN pnpm pack
RUN mv lblod-embeddable-say-editor-*.tgz lblod-embeddable-say-editor.tgz

# Test the types in the angular app
FROM node:lts-iron AS types
WORKDIR /app
RUN npm i -g corepack@0.31
# put angular app into /app and ignore the rest of the repo to avoid false positives
COPY test-angular/package.json ./
RUN pnpm install
COPY --from=builder /app/embeddable-say-editor/lblod-embeddable-say-editor.tgz ./
RUN pnpm install ./lblod-embeddable-say-editor.tgz
COPY test-angular ./
RUN pnpm tsc --noEmit
