# ──────────────────────────────────────────────────────────────
# Stage 1 – deps: install ONLY production dependencies
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci --omit=dev

# ──────────────────────────────────────────────────────────────
# Stage 2 – builder: install ALL deps and build
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json* ./
RUN npm ci

COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

RUN npm run build

# ──────────────────────────────────────────────────────────────
# Stage 3 – runner: minimal production image
# ──────────────────────────────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

ARG MONGODB_URI
ENV MONGODB_URI=$MONGODB_URI

RUN addgroup --system --gid 1001 nodejs && \
    adduser  --system --uid 1001 nextjs

COPY --from=builder /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs

EXPOSE 3000

CMD ["node", "server.js"]