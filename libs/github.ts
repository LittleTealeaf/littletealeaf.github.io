import { Octokit } from "@octokit/rest";
import { restEndpointMethods, RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { getCacheValue, setCacheValue } from "./cache";

const MyOctokit = Octokit.plugin(restEndpointMethods);

const octokit = new MyOctokit({
  auth: process.env.API_GITHUB,
  userAgent: "littletealeaf.github.io v0.1.0",
});

function buildForceTypes<E extends { response: { data: any }; parameters: any }>(
  type: Array<string>,
  method: (params: E["parameters"]) => Promise<E["response"]>
): (params: E["parameters"]) => Promise<E["response"]["data"]> {
  return build<E["parameters"], E["response"]["data"]>(type, method);
}

const simpleParser = <V>(item: { data: V }) => item.data;

function build<P, V>(type: Array<string>, method: (params: P) => Promise<{ data: V }>): (params: P) => Promise<V> {
  return buildFunction(type, method, simpleParser);
}

function buildFunction<P, R, V>(type: Array<string>, method: (params: P) => Promise<R>, parser: (value: R) => V): (params: P) => Promise<V> {
  return async (params: P): Promise<V> => {
    const cache: V = getCacheValue(type, params);
    if (cache != null) {
      return cache;
    } else {
      const value: V = await method(params).then(parser);
      setCacheValue(type, params, value);
      return value;
    }
  };
}

const GitHubAPI = {
  activity: {
    getFeeds: build(["activity", "getFeeds"], octokit.activity.getFeeds),
    getRepoSubscription: build(["activity", "getRepoSubscription"], octokit.activity.getRepoSubscription),
    getThread: build(["activity", "getThread"], octokit.activity.getThread),
    listPublicEvents: build(["activity", "listPublicEvents"], octokit.activity.listPublicEvents),
    listPublicEventsForRepoNetwork: build(["activity", "listPublicEventsForRepoNetwork"], octokit.activity.listPublicEventsForRepoNetwork),
    listPublicEventsForUser: build(["activity", "listPublicEventsForUser"], octokit.activity.listPublicEventsForUser),
    listPublicOrgEvents: build(["activity", "listPublicOrgEvents"], octokit.activity.listPublicOrgEvents),
    listReceivedEventsForUser: build(["activity", "listReceivedEventsForUser"], octokit.activity.listReceivedEventsForUser),
    listReceivedPublicEventsForUser: build(["activity", "listReceivedPublicEventsForUser"], octokit.activity.listReceivedPublicEventsForUser),
    listRepoEvents: build(["activity", "listRepoEvents"], octokit.activity.listRepoEvents),
    listReposWatchedByUser: build(["activity", "listReposWatchedByUser"], octokit.activity.listReposWatchedByUser),
    listStargazersForRepo: build(["activity", "listStargazersForRepo"], octokit.activity.listStargazersForRepo),
    listWatchersForRepo: build(["activity", "listWatchersForRepo"], octokit.activity.listWatchersForRepo),
  },
  gists: {
    get: build(["gists", "get"], octokit.gists.get),
    getComment: build(["gists", "getComment"], octokit.gists.getComment),
    getRevision: build(["gists", "getRevision"], octokit.gists.getRevision),
    listForUser: build(["gists", "listForUser"], octokit.gists.listForUser),
    listForks: build(["gists", "listForks"], octokit.gists.listForks),
  },
  git: {
    getBlob: build(["git", "getBlob"], octokit.git.getBlob),
    getCommit: build(["git", "getCommit"], octokit.git.getCommit),
    getRef: build(["git", "getRef"], octokit.git.getRef),
    getTag: build(["git", "getTag"], octokit.git.getTag),
    getTree: build(["git", "getTree"], octokit.git.getTree),
    listMatchingRefs: build(["git", "listMatchingrefs"], octokit.git.listMatchingRefs),
  },
  gitignore: {
    getAllTemplates: build(["gitignore", "getAlltemplates"], octokit.gitignore.getAllTemplates),
    getTemplate: build(["gitignore", "getTemplate"], octokit.gitignore.getTemplate),
  },
  issues: {
    get: build(["issues", "get"], octokit.issues.get),
    getComment: build(["issues", "getComment"], octokit.issues.getComment),
    getEvent: build(["issues", "getEvent"], octokit.issues.getEvent),
    getLabel: build(["issues", "getLabel"], octokit.issues.getLabel),
    getMilestone: build(["issues", "getMilestone"], octokit.issues.getMilestone),
    list: build(["issues", "list"], octokit.issues.list),
    listAssignees: build(["issues", "listAssignees"], octokit.issues.listAssignees),
    listComments: build(["issues", "listComments"], octokit.issues.listComments),
    listCommentsForRepo: build(["issues", "listCommentsForRepo"], octokit.issues.listCommentsForRepo),
    listEvents: build(["issues", "listEvents"], octokit.issues.listEvents),
    listEventsForRepo: build(["issues", "listEventsForRepo"], octokit.issues.listEventsForRepo),
    listEventsForTimeline: build(["issues", "listEventsForTimeline"], octokit.issues.listEventsForTimeline),
    listForOrg: build(["issues", "listForOrg"], octokit.issues.listForOrg),
    listForRepo: build(["issues", "listForRepo"], octokit.issues.listForRepo),
    listLabelsForMilestone: build(["issues", "listLabelsForMilestone"], octokit.issues.listLabelsForMilestone),
    listLabelsForRepo: build(["issues", "listLabelsForRepo"], octokit.issues.listLabelsForRepo),
    listLabelsOnIssue: build(["issues", "listLabelsOnIssue"], octokit.issues.listLabelsOnIssue),
    listMilestones: build(["issues", "listMilestones"], octokit.issues.listMilestones),
  },
  licenses: {
    get: build(["licenses", "get"], octokit.licenses.get),
    getAllCommonlyUsed: build(["licenses", "getAllCommonlyUsed"], octokit.licenses.getAllCommonlyUsed),
    getForRepo: build(["licenses", "getForRepo"], octokit.licenses.getForRepo),
  },
  markdown: {
    render: build(["markdown", "render"], octokit.markdown.render),
    renderRaw: build(["markdown", "renderRaw"], octokit.markdown.renderRaw),
  },
  orgs: {
    get: build(["orgs", "get"], octokit.orgs.get),
    list: build(["orgs", "list"], octokit.orgs.list),
    listForUser: build(["orgs", "listForUser"], octokit.orgs.listForUser),
    listMembers: build(["orgs", "listMembers"], octokit.orgs.listMembers),
    listOutsideCollaborators: build(["orgs", "listOutsideCollaborators"], octokit.orgs.listOutsideCollaborators),
    listPublicMembers: build(["orgs", "listPublicMembers"], octokit.orgs.listPublicMembers),
  },
  packages: {
    getAllPackageVersionsForPackageOwnedByAuthenticatedUser: build(
      ["packages", "getAllPackageVersionsForPackageOwnedByAuthenticatedUser"],
      octokit.packages.getAllPackageVersionsForPackageOwnedByAuthenticatedUser
    ),
    getAllPackageVersionsForPackageOwnedByOrg: build(["packages", "getAllPackageVersionsForPackageOwnedByOrg"], octokit.packages.getAllPackageVersionsForPackageOwnedByOrg),
    getAllPackageVersionsForPackageOwnedByUser: build(["packages", "getAllPackageVersionsForPackageOwnedByUser"], octokit.packages.getAllPackageVersionsForPackageOwnedByUser),
    getPackageForOrganization: build(["packages", "getPackageForOrganization"], octokit.packages.getPackageForOrganization),
    getPackageForUser: build(["packages", "getPackageForUser"], octokit.packages.getPackageForUser),
    getPackageVersionForOrganization: build(["packages", "getPackageVersionForOrganization"], octokit.packages.getPackageVersionForOrganization),
    getPackageVersionForUser: build(["packages", "getPackageVersionForUser"], octokit.packages.getPackageVersionForUser),
    listPackagesForOrganization: build(["packages", "listPackagesForOrganization"], octokit.packages.listPackagesForOrganization),
    listPackagesForUser: build(["packages", "listPackagesForUser"], octokit.packages.listPackagesForUser),
  },
  projects: {
    get: build(['projects','get'],octokit.projects.get),
    getCard: build(['projects','getCard'],octokit.projects.getCard),
    getColumn: build(['projects','getColumn'],octokit.projects.getColumn),
    listCards: build(['projects','listCards'],octokit.projects.listCards),
    listCollaborators: build(['projects','listCollaborators'],octokit.projects.listCollaborators),
    listColumns: build(['projects','listColumns'],octokit.projects.listColumns),
    listForOrg: build(['projects','listForOrg'],octokit.projects.listForOrg),
    listForRepo: build(['projects','listForRepo'],octokit.projects.listForRepo),
    listForUser: build(['projects','listForUser'],octokit.projects.listForUser),
  },
  pulls: {
    checkIfMerged: build(['pulls','checkIfMerged'],octokit.pulls.checkIfMerged),
    get: build(['pulls','get'],octokit.pulls.get),
    getReview: build(['pulls','getReview'],octokit.pulls.getReview),
    getReviewComment: build(['pulls','getReviewComment'],octokit.pulls.getReviewComment),
    list: build(['pulls','list'],octokit.pulls.list),
    listCommentsForReview: build(['pulls','listCommentsForReview'],octokit.pulls.listCommentsForReview),
    listCommits: build(['pulls','listCommits'],octokit.pulls.listCommits),
    listFiles: build(['pulls','listFiles'],octokit.pulls.listFiles),
    listRequestedReviewers: build(['pulls','listRequestedReviewers'],octokit.pulls.listRequestedReviewers),
    listReviewComments: build(['pulls','listReviewComments'],octokit.pulls.listReviewComments),
    listReviewCommentsForRepo: build(['pulls','listReviewCommentsForRepo'],octokit.pulls.listReviewCommentsForRepo),
    listReviews: build(['pulls','listReviews'],octokit.pulls.listReviews),

  },
  rateLimit: {
    get: build(["ratelimit", "get"], octokit.rateLimit.get),
  },
  reactions: {
    listForCommitComment: build(['reactions','listForCommitComment'],octokit.reactions.listForCommitComment),
    listForIssue: build(['reactions','listForIssue'],octokit.reactions.listForIssue),
    listForIssueComment: build(['reactions','listForIssueComment'],octokit.reactions.listForIssueComment),
    listForPullRequestReviewComment: build(['reactions','listForPullRequestReviewComment'],octokit.reactions.listForPullRequestReviewComment),
    listForTeamDiscussionCommentInOrg: build(['reactions','listForTeamDiscussionCommentInOrg'],octokit.reactions.listForTeamDiscussionCommentInOrg),
    listForTeamDiscussionInOrg: build(['reactions','listForTeamDiscussionInOrg'],octokit.reactions.listForTeamDiscussionInOrg),
  },
  repos: {
    // get: build(["repos", "get"], octokit.repos.get),
    // listLanguages: build(["repos", "listLanguages"], octokit.repos.listLanguages),
    // getContributorStats: buildForceTypes<RestEndpointMethodTypes["repos"]["getContributorsStats"]>(["repos", "getContributorsStats"], octokit.repos.getContributorsStats),
    // getReadme: build(["repos", "getReadme"], octokit.repos.getReadme),
    checkCollaborator: build(['repos','checkCollaborator'],octokit.repos.checkCollaborator),
    checkVulnerabilityAlerts: build(['repos','checkVulnerabilityAlerts'],octokit.repos.checkVulnerabilityAlerts),
    compareCommitsWithBasehead: build(['repos','compareCommitsWithBasehead'],octokit.repos.compareCommitsWithBasehead),
    generateReleaseNotes: build(['repos','generateReleaseNotes'],octokit.repos.generateReleaseNotes),
    get: build(['repos','get'], octokit.repos.get),
    getAllEnvironments: build(['repos','getAllEnvironments'],octokit.repos.getAllEnvironments),
    getAllStatusCheckContexts: build(['repos','getAllStatusCheckContexts'],octokit.repos.getAllStatusCheckContexts),
    getAllTopics: build(['repos','getAllTopics'],octokit.repos.getAllTopics),
    getAutolink: build(['repos','getAutolink'],octokit.repos.getAutolink),
    getBranch: build(['repos','getBranch'],octokit.repos.getBranch),
    getBranchProtection: build(['repos','getBranchProtection'],octokit.repos.getBranchProtection),
    getClones: build(['repos','getClones'],octokit.repos.getClones),
    getCodeFrequencyStats: buildForceTypes<RestEndpointMethodTypes['repos']['getCodeFrequencyStats']>(['repos','getCodeFrequencyStats'],octokit.repos.getCodeFrequencyStats),
    getCollaboratorPermissionLevel: build(['repos','getCollaboratorPermissionLevel'],octokit.repos.getCollaboratorPermissionLevel),
    getCombinedStatusForRef: build(['repos','getCombinedStatusForRef'],octokit.repos.getCombinedStatusForRef),
    getCommit: build(['repos','getCommit'],octokit.repos.getCommit),
    getCommitActivityStats: buildForceTypes<RestEndpointMethodTypes['repos']['getCommitActivityStats']>(['repos','getCommitActivityStats'],octokit.repos.getCommitActivityStats),
    getCommitComment: build(['repos','getCommitComment'],octokit.repos.getCommitComment),
    getCommitSignatureProtection: build(['repos','getCommitSignatureProtection'],octokit.repos.getCommitSignatureProtection),
    getCommunityProfileMetrics: build(['repos','getCommunityProfileMetrics'],octokit.repos.getCommunityProfileMetrics),
    getContent: build(['repos','getContent'],octokit.repos.getContent),
    getContributorsStats: buildForceTypes<RestEndpointMethodTypes['repos']['getContributorsStats']>(['repos','getContributorsStats'],octokit.repos.getContributorsStats),
    getDeployment: build(['repos','getDeployment'],octokit.repos.getDeployment),
    getDeploymentStatus: build(['repos','getDeploymentStatus'],octokit.repos.getDeploymentStatus),
    getEnvironment: build(['repos','getEnvironment'],octokit.repos.getEnvironment),
    getLatestPagesBuild: build(['repos','getLatestPagesBuild'],octokit.repos.getLatestPagesBuild),
    getLatestRelease: build(['repos','getLatestRelease'],octokit.repos.getLatestRelease),
    getPages: build(['repos','getPages'],octokit.repos.getPages),
    getPagesBuild: build(['repos','getPagesBuild'],octokit.repos.getPagesBuild),
    getPagesHealthCheck: build(['repos','getPagesHealthCheck'],octokit.repos.getPagesHealthCheck),
    getParticipationStats: build(['repos','getParticipationStats'],octokit.repos.getParticipationStats),
    getPullRequestReviewProtection: build(['repos','getPullRequestReviewProtection'],octokit.repos.getPullRequestReviewProtection),
    getPunchCardStats: build(['repos','getPunchCardStats'],octokit.repos.getPunchCardStats),
    getReadme: build(['repos','getReadme'],octokit.repos.getReadme),
    getReadmeInDirectory: build(['repos','getReadmeInDirectory'],octokit.repos.getReadmeInDirectory),
    getRelease: build(['repos','getRelease'],octokit.repos.getRelease),
    getReleaseAsset: build(['repos','getReleaseAsset'],octokit.repos.getReleaseAsset),
    getReleaseByTag: build(['repos','getReleaseByTag'],octokit.repos.getReleaseByTag),
    getStatusChecksProtection: build(['repos','getStatusChecksProtection'],octokit.repos.getStatusChecksProtection),
    getTeamsWithAccessToProtectedBranch: build(['repos','getTeamsWithAccessToProtectedBranch'],octokit.repos.getTeamsWithAccessToProtectedBranch),
    getTopPaths: build(['repos','getTopPaths'],octokit.repos.getTopPaths),
    getTopReferrers: build(['repos','getTopReferrers'],octokit.repos.getTopReferrers),
    getUsersWithAccessToProtectedBranch: build(['repos','getUsersWithAccessToProtectedBranch'],octokit.repos.getUsersWithAccessToProtectedBranch),
    getViews: build(['repos','getViews'],octokit.repos.getViews),
    getWebhook: build(['repos','getWebhook'],octokit.repos.getWebhook),
    listAutolinks: build(['repos','listAutolinks'],octokit.repos.listAutolinks),
    listBranches: build(['repos','listBranches'],octokit.repos.listBranches),
    listBranchesForHeadCommit: build(['repos','listBranchesForHeadCommit'],octokit.repos.listBranchesForHeadCommit),
    listCollaborators: build(['repos','listCollaborators'],octokit.repos.listCollaborators),
    listCommentsForCommit: build(['repos','listCommentsForCommit'],octokit.repos.listCommentsForCommit),
    listCommitCommentsForRepo: build(['repos','listCommitCommentsForRepo'],octokit.repos.listCommitCommentsForRepo),
    listCommitStatusesForRef: build(['repos','listCommitStatusesForRef'],octokit.repos.listCommitStatusesForRef),
    listCommits: build(['repos','listCommits'],octokit.repos.listCommits),
    listContributors: build(['repos','listContributors'],octokit.repos.listContributors),
    listDeploymentStatuses: build(['repos','listDeploymentStatuses'],octokit.repos.listDeploymentStatuses),
    listDeployments: build(['repos','listDeployments'],octokit.repos.listDeployments),
    listForOrg: build(['repos','listForOrg]'],octokit.repos.listForOrg),
    listForUser: build(['repos','listForUser'],octokit.repos.listForUser),
    listForks: build(['repos','listForks'],octokit.repos.listForks),
    listLanguages: build(['repos','listLanguages'],octokit.repos.listLanguages),
    listPagesBuilds: build(['repos','listPagesBuilds'],octokit.repos.listPagesBuilds),
    listPublic: build(['repos','listPublic'],octokit.repos.listPublic),
    listPullRequestsAssociatedWithCommit: build(['repos','listPullRequestsAssociatedWithCommit'],octokit.repos.listPullRequestsAssociatedWithCommit),
    listReleaseAssets: build(['repos','listReleaseAssets'],octokit.repos.listReleaseAssets),
    listReleases: build(['repos','listReleases'],octokit.repos.listReleases),
    listTags: build(['repos','listTags'],octokit.repos.listTags),
    listTeams: build(['repos','listTeams'],octokit.repos.listTeams),
  },
  search: {
    code: build(['search','code'],octokit.search.code),
    commits: build(['search','commits'],octokit.search.commits),
    issuesAndPullRequests: build(['search','issuesAndPullRequests'],octokit.search.issuesAndPullRequests),
    labels: build(['search','labels'],octokit.search.labels),
    repos: build(['search','repos'],octokit.search.repos),
    topics: build(['search','topics'],octokit.search.topics),
    users: build(['search','users'],octokit.search.users),
  },
  teams: {
    getByName: build(['teams','getByName'],octokit.teams.getByName),
    list: build(['teams','list'],octokit.teams.list),
    listChildInOrg: build(['teams','listChildInOrg'],octokit.teams.listChildInOrg),
    listDiscussionCommentsInOrg: build(['teams','listDiscussionCommentsInOrg'],octokit.teams.listDiscussionCommentsInOrg),
    listDiscussionsInOrg: build(['teams','listDiscussionsInOrg'],octokit.teams.listDiscussionsInOrg),
    listMembersInOrg: build(['teams','listMembersInOrg'],octokit.teams.listMembersInOrg),
    listProjectsInOrg: build(['teams','listProjectsInOrg'],octokit.teams.listProjectsInOrg),
    listReposInOrg: build(['teams','listReposInOrg'],octokit.teams.listReposInOrg),

  },
  emojis: {
    get: build(["emojis", "get"], octokit.emojis.get),
  },
  users: {
    checkFollowingForUser: build(['users','checkFollowingForUser'],octokit.users.checkFollowingForUser),
    getAuthenticated: build(['users','getAuthenticated'],octokit.users.getAuthenticated),
    getByUsername: buildForceTypes<RestEndpointMethodTypes['users']['getByUsername']>(['users','getByUsername'],octokit.users.getByUsername),
    getContextForUser: build(['users','getContextForUser'],octokit.users.getContextForUser),
    list: build(['users','list'],octokit.users.list),
    listFollowersForUser: build(['users','listFollowersForUser'],octokit.users.listFollowersForUser),
    listFollowingForUser: build(['users','listFollowingForUser'],octokit.users.listFollowingForUser),
    listEmailsForAuthenticatedUser: build(['users','listEmailsForAuthenticatedUser'],octokit.users.listEmailsForAuthenticatedUser)
  }
};

export default GitHubAPI;
