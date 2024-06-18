import { PrismaClient } from "@prisma/client";

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

  public constructor(implementation: string) {
    this.implementation = implementation;
  }

  public init() {
    if(this.implementation == "database") {
      this.prisma = new PrismaClient();
    } else if (this.implementation == "RAM") {
      // Provide implementation when the match list is in RAM.
    } else if (this.implementation == "redis") {
      
    }
  }

  public async add_waiter(id: string) {
    await this.prisma?.matchWaitList.create({
      data: {
        waiting_user_id: id,
      },
    });
  }

  public async delete_pair(id_1:string, id_2:string) {
    await this.prisma?.matchWaitList.deleteMany({
      where: {
        OR: [
          { waiting_user_id: id_1 },
          { waiting_user_id: id_2 },
        ],
      },
    });
  }
};

// Initialize the data structure to store the matches
const matchList = new MatchWaitList("database");
matchList.init();

export default matchList;