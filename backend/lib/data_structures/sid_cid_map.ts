
/**
 * Keeps a map of socket instance id (The id generated by socket.io-client) and
 * the manual ID for each client generated by stu-mingle server.
 * This works since there is a one-to-one relationship between them.
 * Bidirectional map that allows lookup by key or value.
 */
class SIDMap {

  /**
   * @private
   * @type {Map<string, string>}
   */
  private _map_s_to_c: Map<string, string>;

  /**
   * @private
   * @type {Map<string, string>}
   */
  private _map_c_to_s: Map<string, string>;

  /**
   * Creates an instance of SIDMap.
   */
  public constructor() {
    this._map_s_to_c = new Map<string, string>();
    this._map_c_to_s = new Map<string, string>();
  };

  /**
   * Adds a key-value pair to the map.
   *
   * @param {string} key - The key to add.
   * @param {string} value - The value to associate with the key.
   */
  public add(key: string, value: string): void {
    this._map_s_to_c.set(key, value);
    this._map_c_to_s.set(value, key);
  }

  /**
   * Retrieves the client_id with the socket_id.
   *
   * @param {string} key - The socket_id.
   * @returns {string | undefined} The client_id, or undefined if the key is not found.
   */
  public get_c(key: string) {
    return this._map_s_to_c.get(key);
  }

  /**
   * Retrieves the socket_id with the client_id.
   *
   * @param {string} key - The client_id.
   * @returns {string | undefined} The socket_id, or undefined if the key is not found.
   */
  public get_s(key: string) {
    return this._map_c_to_s.get(key);
  }

  /**
   * Removes the key-value pair associated with the given key.
   *
   * @param {string} key - The key whose key-value pair is to be removed.
   */
  public remove(key: string) {
    const sid = this._map_s_to_c.get(key);
    this._map_s_to_c.delete(key);
    sid && this._map_c_to_s.delete(sid);
  }
};

const socket_id_map = new SIDMap();

export default socket_id_map;