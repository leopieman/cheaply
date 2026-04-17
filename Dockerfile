FROM node:22-slim AS builder
WORKDIR /app

# Fresh install on linux/amd64 glibc — resolves all native bindings (rolldown, lightningcss) correctly
COPY package.json ./
COPY apps/web/package.json apps/web/
RUN npm install

COPY . .
RUN npm run build --workspace=web

FROM node:22-slim AS runner
WORKDIR /app
COPY --from=builder /app/apps/web/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "npx serve -s dist -p ${PORT:-3000}"]
