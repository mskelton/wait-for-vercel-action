# Wait for Vercel Action ⏱

> GitHub Action to wait for a Vercel deployment.

## Inputs

### `prod-url`

**Required** Production url to wait for on master builds. Branch builds will wait for the deployment url associated with the current commit.

### `token`

**Required** Authorization token generated from your [account settings page](https://vercel.com/account/tokens).

### `timeout`

Maximum time in seconds to wait for the deployment. Default `120`.

### `team-id`

[Vercel team ID](https://vercel.com/docs/api#api-basics/authentication/accessing-resources-owned-by-a-team) if the deployment is owned by a team

## Outputs

### `url`

The Vercel deployment url that was deployed.

## Example usage

Basic:

```yaml
steps:
  - name: Wait for Vercel deployment
    uses: mskelton/wait-for-vercel-action@v1
    with:
      prod-url: example.now.sh
      token: ${{ secrets.VERCEL_TOKEN }}
```

Use the deployment url in another step:

```yaml
steps:
  - name: Waiting for Vercel deployment
    uses: mskelton/wait-for-vercel-action@v1
    id: wait-for-vercel
    with:
      prod-url: example.now.sh
      token: ${{ secrets.VERCEL_TOKEN }}
  - run: npm test
    env:
      ENVIRONMENT_URL: ${{ steps.wait-for-vercel.outputs.url }}
```
