/*
 * Copyright 2017 ThoughtWorks, Inc.
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

const $              = require('jquery');
const m              = require('mithril');
const Stream         = require('mithril/stream');
const PluginsWidget  = require('views/plugins/plugins_widget');
const PluginInfos    = require('models/shared/plugin_infos');
const PageLoadError  = require('views/shared/page_load_error');

$(() => {
  const pluginElement = $('#plugins');
  const isUserAnAdmin = pluginElement.attr('is-user-an-admin');

  const onSuccess = (pluginInfos) => {
    const component = {
      view() {
        return (<PluginsWidget pluginInfos={Stream(pluginInfos)} isUserAnAdmin={Stream(isUserAnAdmin === 'true')}/>);
      }
    };

    m.mount($("#plugins").get(0), component);
  };

  const onFailure = () => {
    const component = {
      view() {
        return (<PageLoadError message="There was a problem fetching plugins"/>);
      }
    };
    m.mount($("#plugins").get(0), component);
  };

  PluginInfos.all(null, {'include_bad': true}).then(onSuccess, onFailure);
});
