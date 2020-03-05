
const getReleaseVersion = () => {
    const namespace = process.env.CI_PROJECT_NAMESPACE;
    const project = process.env.CI_PROJECT_NAME;
    const buildRef = process.env.CI_COMMIT_SHA;
  
    if (!namespace || !project || !buildRef) {
      console.warn(`Missing CI_PROJECT_NAMESPACE (${namespace}), CI_PROJECT_NAME (${project}) or CI_COMMIT_SHA (${buildRef})`);
      return null;
    }
  
    return `${namespace}-${project}@${buildRef}`;
  };
  
  module.exports = { getReleaseVersion };
  