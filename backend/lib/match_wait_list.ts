import { PrismaClient } from "@prisma/client";
import { MatchPair } from "../util/match_pair";

/**
 * The object which will interact with the Data Structure
 * holding the list of users waiting to find a match.
 */
class MatchWaitList {

  /**
   * The implementation type of the wait list.
   * Can be in 'database' or 'RAM'.
   * @private
   * @type {string}
   */
  private implementation: string;
  private prisma: PrismaClient | undefined;
  private _count: number;

  public constructor(implementation: string) {
    this.implementation = implementation;
    this._count = 0;
  }

  // ! TO BE USED ONLY IN DEVELOPMENT
  public async print_list() {
    console.log("Match Wait List:");
    const list = await this.prisma?.matchWaitList.findMany();
    console.log(list);
    console.log("--------------------")
  }

  public init() {
    if(this.implementation == "database") {
      this.prisma = new PrismaClient();
    } else if (this.implementation == "RAM") {
      // Provide implementation when the match list is in RAM.
    } else if (this.implementation == "redis") {
      
    }
  }

  public count() {
    return this._count;
  }

  public async add_waiter(id: string) {
    await this.prisma?.matchWaitList.create({
      data: {
        waiting_user_id: id,
      },
    });
    this._count++;
  }

  public async delete_one(id: string) {
    await this.prisma?.matchWaitList.delete({
      where: {
        waiting_user_id: id
      }
    });
    this._count--;
  }

  public async delete_pair(pair: MatchPair) {
    const [id_1, id_2] = pair.get_pair();
    await this.prisma?.matchWaitList.deleteMany({
      where: {
        OR: [
          { waiting_user_id: id_1 },
          { waiting_user_id: id_2 },
        ],
      },
    });
    this._count -= 2;
  }

  public async find_pair () {
    const pair = await this.prisma?.matchWaitList.findMany({
      take: 2,
    });
  
    if(pair && pair.length >= 2) {
      const match = new MatchPair(pair[0].waiting_user_id, pair[1].waiting_user_id);
      await this.delete_pair(match);
      return match;
    } else {
      return null;
    }
  }

  public async dev_clearList () {
    await this.prisma?.matchWaitList.deleteMany({});
  }
};

let matchList: MatchWaitList;


// Initialize the data structure to store the matches
matchList = new MatchWaitList("database");
matchList.init();

export default matchList;