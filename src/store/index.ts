import Vue from 'vue';
import Vuex, { ModuleTree } from 'vuex';
import { Dictionary } from 'array-proto-ext';
import i18n from "@/plugins/i18n";
import { setStore, getStore } from '@/util/vuex';
import packageInfo from "@/../package.json";

Vue.use(Vuex);

function loadModules() {
  const modules = require.context("./modules", false, /[a-zA-Z0-9-_]+\.ts$/);
  return modules
    .keys()
    .reduce<Dictionary<ModuleTree<any>>>((s, k) => {
      const _module = modules(k)["default"];
      const match = /[a-zA-Z0-9-_]+\.ts$/.exec(k);
      const name = match![1];
      s[name] = _module;
      return s;
    }, {});
}


const store = new Vuex.Store({
  modules: {
    ...loadModules()
  },
  getters: {

  },
  state: {
    language: (() => {
      const lang = getStore("language") || "zh-CN";
      i18n.locale = lang;
      document.title = i18n.t("appName") as string;
      document.documentElement.lang = lang;
      return lang;
    })(),
    isScriptActive: false,
    version: packageInfo.version as string
  },
  // SET_xxx    表示修改一个state
  // TOGGLE_xxx 表示修改一个boolean类型的state
  // CHANGE_xxx 表示修改一个有确定个数值（enum，字符串常量类型）的state
  // CLEAR_xxx  表示清空一个state
  mutations: {
    SET_LANGUAGE(s, lang) {
      s.language = lang;
      i18n.locale = lang;
      document.title = i18n.t("appName") as string;
      document.documentElement.lang = lang;
      setStore("language", lang);
    },
    TOGGLE_SCRIPT_STATE(s, state) {
      s.isScriptActive = state;
    }
  },
  
});

export default store;
