# NOTE Needs to be built with the root of the monorepo as the context
FROM node:lts-iron AS builder

LABEL maintainer="info@redpencil.io"

# Do pnpm installs first to allow for caching
WORKDIR /app
RUN npm i -g corepack@0.31
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY patches/ patches/
COPY embeddable-say-editor/package.json embeddable-say-editor/
RUN pnpm i --frozen-lockfile
COPY . .

# Build test app
WORKDIR /app/embeddable-say-editor
RUN pnpm build:test-app

FROM semtech/static-file-service:0.2.0
COPY --from=builder /app/embeddable-say-editor/test-app/dist /data
