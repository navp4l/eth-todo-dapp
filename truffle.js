module.exports = {
  networks : {
    ganache : {
      host : '127.0.0.1',
      port : 7545,
      network_id : '*',
      gas : 5000000
    },
    ganache_cli : {
      host : '127.0.0.1',
      port : 8545,
      network_id : '*',
      gas : 5000000
    }
  }
};
