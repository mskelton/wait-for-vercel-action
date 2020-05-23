const core = require("@actions/core")
const github = require("@actions/github")
const axios = require("axios")

const sleep = (seconds) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000))

async function getBranchUrl(sha) {
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

function getUrl(sha) {
  // return branch === "master" ? getProdUrl() : getBranchUrl(sha)
  return getBranchUrl(sha)
}

async function waitForDeployment() {
  const sha = github.context.payload.head_commit.id
  const timeout = +core.getInput("timeout") * 1000
  const endTime = new Date().getTime() + timeout

  let attempt = 1

  while (new Date().getTime() < endTime) {
    try {
      return await getUrl(sha)
    } catch (e) {
      console.log(`Url unavailable. Attempt ${attempt++}.`)
      await sleep(2)
    }
  }

  throw new Error(`Timeout reached before deployment for ${sha} was found.`)
}

;(async () => {
  try {
    console.log(github.context.payload)
    const url = await waitForDeployment()

    console.log("Url found!", url)
    core.setOutput("url", url)
  } catch (err) {
    core.setFailed(err.message)
  }
})()
