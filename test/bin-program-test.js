/**
 * Integration tests using server-start.sh script
 */
const vows = require("vows"),
  assert = require("assert"),
  { parseArgv } = require("../bin/program");

const DEFAULT_ARGV = ["/usr/bin/node", "/opt/phantomas/bin/phantomas.js"];

vows
  .describe("bin program")
  .addBatch({
    parseArgv: {
      topic: function () {
        return parseArgv;
      },
      "should provide defaults": function (parseArgv) {
        assert.deepStrictEqual(parseArgv(DEFAULT_ARGV), {
          viewport: "800x600",
          timeout: 15,
          "no-externals": false,
        });
      },
      "should handle dashed-names": function (parseArgv) {
        assert.deepStrictEqual(
          parseArgv(DEFAULT_ARGV.concat(["--user-agent=Foo/Bar (test)"])),
          {
            viewport: "800x600",
            timeout: 15,
            "no-externals": false,
            "user-agent": "Foo/Bar (test)",
          }
        );
      },
      "should handle --dashed-flags": function (parseArgv) {
        assert.deepStrictEqual(
          parseArgv(DEFAULT_ARGV.concat(["--ignore-ssl-errors", "--phone"])),
          {
            viewport: "800x600",
            timeout: 15,
            "no-externals": false,
            "ignore-ssl-errors": true,
            phone: true,
          }
        );
      },
    },
  })
  .export(module);
