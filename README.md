# Excalidraw JSON

> This is a partial reimplementation of the original [Excalidraw JSON](https://github.com/excalidraw/excalidraw-json) storage server without dependencies on [Google Application Engine](https://cloud.google.com/appengine).

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Requirements

- [Amazon S3](https://aws.amazon.com/s3/)-compatible storage
- [Node.js 10.13](https://nodejs.org/) or later

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

## Environment Variables

This server can be configured using the environment variables below.

### `EXCALIDRAW_S3_ACCESS_KEY_ID`

The S3 access key ID.

### `EXCALIDRAW_S3_SECRET_ACCESS_KEY`

The S3 secret access key.

### `EXCALIDRAW_S3_ENDPOINT`

The S3 endpoint URI to send requests to. For example, `https://storage.googleapis.com` or `https://storage.yandexcloud.net`.

### `EXCALIDRAW_S3_BUCKET_NAME`

Default: `excalidraw`

The S3 bucket name.

### `EXCALIDRAW_ALLOWED_ORIGIN`

A comma-separated list of values used to configure the `Access-Control-Allow-Origin` header using [`cors`](https://github.com/expressjs/cors) middleware. For example, `https://excalidraw.com` or `https://excalidraw.com,https://excalidraw-team.now.sh`. For convenience, `http://localhost:` is always allowed.

Regular expression patterns are also supported via `regex:` prefix. For example, `regex:example\.com\$` will be converted to `/example\.com$/`.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
