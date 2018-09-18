/*
 * Copyright 2018 ThoughtWorks, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
describe("Form Helper", () => {
  const $      = require("jquery");
  const m      = require('mithril');
  const Stream = require('mithril/stream');
  require('jasmine-jquery');
  const f = require('helpers/form_helper');

  let $root, root;
  beforeEach(() => {
    [$root, root] = window.createDomElementForTest();
  });
  afterEach(window.destroyDomElementForTest);
  const unmount = () => {
    m.mount(root, null);
    m.redraw();
  };

  afterEach(() => {
    unmount();
  });

  it("buttonWithTooltip should add a tooltip to the button", () => {
    const model = Stream(true);
    m.mount(root, {
      view() {
        return m(f.buttonWithTooltip, {
          model,
          'tooltipText': "show me on hover",
        }, "Fancy button with tooltip");
      }
    });
    m.redraw();
    const buttonWithTooltip = $root.find('button');
    expect(buttonWithTooltip).toExist();
    const tooltipId = $(buttonWithTooltip).attr("data-tooltip-id");
    const tooltip   = $root.find(`#${tooltipId}`);
    expect(tooltip).toExist();
    expect(tooltip).toHaveText("show me on hover");
    expect(tooltip).not.toBeVisible();
    $(buttonWithTooltip).trigger('mouseover');
    expect(tooltip).toBeVisible();
    $(buttonWithTooltip).trigger('mouseout');
    expect(tooltip).not.toBeVisible();
  });

  it("linkWithTooltip should add a tooltip to the link", () => {
    const model = Stream(true);
    m.mount(root, {
      view() {
        return m(f.linkWithTooltip, {
          model,
          'tooltipText': "show me on hover",
        }, "Fancy link with tooltip");
      }
    });
    m.redraw();
    const linkWithTooltip = $root.find('a');
    expect(linkWithTooltip).toExist();
    const tooltipId = $(linkWithTooltip).attr("data-tooltip-id");
    const tooltip   = $root.find(`#${tooltipId}`);
    expect(tooltip).toExist();
    expect(tooltip).toHaveText("show me on hover");
    expect(tooltip).not.toBeVisible();
    $(linkWithTooltip).trigger('mouseover');
    expect(tooltip).toBeVisible();
    $(linkWithTooltip).trigger('mouseout');
    expect(tooltip).not.toBeVisible();
  });
});
