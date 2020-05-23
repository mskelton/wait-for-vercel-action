# Wait for Vercel Action ⏱

> GitHub Action to wait for a Vercel deployment.

## Options

### `timeout`

Optional — Maximum time to wait for the deployment. Defaults to `60` seconds.

## Outputs

### `url`

The Vercel deployment url that was deployed.

## Usage

Basic:

```yaml
steps:
  - name: Wait for Vercel deployment
    uses: mskelton/wait-for-vercel-action@v1
```

Use the deployment url in another step:

```yaml
steps:
  - name: Waiting for Vercel deployment
    uses: mskelton/wait-for-vercel-action@v1
    id: wait-for-vercel
  - run: npm test
    env:
      ENVIRONMENT_URL: ${{ steps.wait-for-vercel.outputs.url }}
```
