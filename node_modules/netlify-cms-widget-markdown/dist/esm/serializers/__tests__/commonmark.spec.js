"use strict";

var _trim2 = _interopRequireDefault(require("lodash/trim"));

var _flow2 = _interopRequireDefault(require("lodash/flow"));

var _commonmark = _interopRequireDefault(require("./__fixtures__/commonmark.json"));

var _index = require("../index.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Map the commonmark spec data into an array of arrays for use in Jest's
 * `test.each`.
 */
const spec = _commonmark.default.map((_ref) => {
  let markdown = _ref.markdown,
      html = _ref.html;
  return [markdown, html];
});
/**
 * Each test receives input markdown and output html as expected for Commonmark
 * compliance. To test all of our handling in one go, we serialize the markdown
 * into our Slate AST, then back to raw markdown, and finally to HTML.
 */


const process = (0, _flow2.default)([_index.markdownToSlate, _index.slateToMarkdown, _index.markdownToHtml]);
/**
 * Passing this test suite requires 100% Commonmark compliance. There are 624
 * tests, of which we're passing about 300 as of introduction of this suite. To
 * work on improving Commonmark support, remove `.skip` from this `describe`
 * and run the test suite locally.
 */

describe.skip('Commonmark support', () => {
  test.each(spec)('%s', (markdown, html) => {
    // We're trimming the html from the spec as they all have trailing newlines
    // and we never output trailing newlines. This may be a compliance issue.
    expect(process(markdown)).toEqual((0, _trim2.default)(html));
  });
});