# Wait for Vercel Action ⏱

> GitHub Action to wait for a Vercel deployment.

## Update December 2020

I will be archiving this action in favor of [github-action-await-vercel](https://github.com/UnlyEd/github-action-await-vercel) created by UnlyEd. They have greatly improved on the concept I developed here by using TypeScript, adding tests, adding fantastic documentation, and much more. I will be archiving this repo in the near future, but it will remain available so as to not break existing users of this action.

## Inputs

### `prod-url`

**Required** Production url to wait for on master builds. Branch builds will wait for the deployment url associated with the current commit.

### `token`

**Required** Authorization token generated from your [account settings page](https://vercel.com/account/tokens).

### `timeout`

Maximum time in seconds to wait for the deployment. Default `120`.

### `await-build`

Wait for the deployment to be built before returning the url.

### `team-id`

[Vercel team ID](https://vercel.com/docs/api#api-basics/authentication/accessing-resources-owned-by-a-team) if the deployment is owned by a team.

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
      await-build: true
  - run: npm test
    env:
      ENVIRONMENT_URL: ${{ steps.wait-for-vercel.outputs.url }}
```
