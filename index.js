const core = require("@actions/core")
const github = require("@actions/github")
const axios = require("axios")

const sleep = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

async function getDeployment(sha) {
  const url = `https://api.vercel.com/v5/now/deployments?meta-githubCommitSha=${sha}`
  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.VERCEL_TOKEN}`,
    },
  })

  // If the deployment isn't in the response, this will throw an error and
  // cause a retry.
  return `https://${data.deployments[0].url}`
}

async function waitForDeployment(sha, timeout) {
  const endTime = new Date().getTime() + timeout * 1000
  let attempt = 1

  while (new Date().getTime() < endTime) {
    try {
      return await getDeployment(sha)
    } catch (e) {
      console.log(`Url unavailable. Attempt ${attempt++}.`)
      await sleep(2)
    }
  }

  throw new Error(`Timeout reached before deployment for ${sha} was found.`)
}

;(async () => {
  try {
    const sha = github.context.payload.head_commit.id
    const url = await waitForDeployment(sha, core.getInput("timeout"))

    console.log("Url found!", url)
    core.setOutput("url", url)
  } catch (err) {
    core.setFailed(err.message)
  }
})()
