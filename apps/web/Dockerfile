FROM node:22-alpine AS builder
WORKDIR /app

# npm install runs on linux/amd64 — correct rolldown binding resolved automatically
COPY package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["sh", "-c", "npx serve -s dist -p ${PORT:-3000}"]
