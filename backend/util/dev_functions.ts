import matchList from "../lib/match_wait_list";

export const dev_clearMatchList = async () => {
  console.log("MatchList cleared ---------")
  await matchList.dev_clearList();
};