importScripts("https://unpkg.com/comlink/dist/umd/comlink.js");
importScripts("/res/sql-wasm.js");

function initTransferHandlers(sql) {
  Comlink.transferHandlers.set("WORKERSQLPROXIES", {
    canHandle: obj => {
      let isDB = obj instanceof sql.Database;
      let hasDB = obj.db && (obj.db instanceof sql.Database);
      return isDB || hasDB;
    },
    serialize(obj) {
      const { port1, port2 } = new MessageChannel();
      Comlink.expose(obj, port1);
      return [port2, [port2]];
    },
    deserialize: (port) => {
      port.start();
      return Comlink.wrap(port);
    }
  });
}

const mod = {
  async new() {
    const sql = await initSqlJs({
      locateFile: file => "/res/" + file
    });

    initTransferHandlers(sql);
    return new sql.Database();
  }
};
 
Comlink.expose(mod);
