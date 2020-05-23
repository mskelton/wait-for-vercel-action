# Wait for Vercel Action ⏱

> GitHub Action to wait for a Vercel deployment.

## Inputs

### `timeout`

Maximum time in seconds to wait for the deployment. Default `120`.

## Environment Variables

### `VERCEL_TOKEN`

**Required** Authorization token generated from your [account settings page](https://vercel.com/account/tokens).

## Outputs

### `url`

The Vercel deployment url that was deployed.

## Example usage

Basic:

```yaml
steps:
  - name: Wait for Vercel deployment
    uses: mskelton/wait-for-vercel-action@v1
    env:
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

Use the deployment url in another step:

```yaml
steps:
  - name: Waiting for Vercel deployment
    uses: mskelton/wait-for-vercel-action@v1
    id: wait-for-vercel
    env:
      VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
  - run: npm test
    env:
      ENVIRONMENT_URL: ${{ steps.wait-for-vercel.outputs.url }}
```
