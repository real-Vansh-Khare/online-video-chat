/**
 * Data structure which holds the selected match.
 */
export class MatchPair {
  first: string;
  second: string;

  constructor(_first: string, _second: string) {
    this.first = _first;
    this.second = _second;
  }

  get_pair() {
    return [this.first, this.second];
  }

  // override
  toString() {
    return `< ${this.first}, ${this.second} >`;
  }
}
