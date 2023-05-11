import {
  createApp,
  createBaseVNode,
  createElementBlock,
  defineComponent,
  openBlock,
  ref,
  toDisplayString
} from "./chunk-Q6DUVAWZ.js";

// node_modules/.pnpm/registry.npmmirror.com+vue-next-directive@1.0.1_vue@3.2.47/node_modules/vue-next-directive/lib/directives/loading/index.js
var _hoisted_1 = { class: "loading" };
var _hoisted_2 = { class: "loading-content" };
var _hoisted_3 = ["width", "height"];
var _hoisted_4 = createBaseVNode("path", {
  d: "M784 902.4c9.6 19.2 6.4 41.6-12.8 54.4-19.2 9.6-41.6 3.2-51.2-12.8-9.6-19.2-6.4-41.6 12.8-54.4 16-12.8 38.4-8 51.2 12.8z m-233.6 81.6c0 22.4-16 38.4-38.4 38.4s-38.4-16-38.4-38.4V960c0-22.4 19.2-38.4 41.6-38.4 19.2 0 35.2 16 38.4 38.4v25.6h-3.2z m-240-43.2c-9.6 19.2-35.2 25.6-54.4 16-19.2-9.6-25.6-35.2-16-51.2l28.8-51.2c9.6-19.2 35.2-25.6 54.4-16s25.6 35.2 12.8 54.4l-25.6 48zM121.6 784c-19.2 9.6-41.6 3.2-54.4-16-9.6-19.2-6.4-41.6 12.8-54.4l76.8-44.8c19.2-9.6 41.6-3.2 54.4 16 9.6 19.2 3.2 41.6-16 54.4L121.6 784zM38.4 552c-22.4 0-38.4-16-38.4-38.4s16-38.4 38.4-38.4H160c22.4 0 38.4 19.2 38.4 38.4 0 22.4-16 38.4-38.4 38.4H38.4z m44.8-241.6c-19.2-9.6-25.6-35.2-16-51.2 9.6-19.2 35.2-25.6 54.4-16L256 320c19.2 9.6 25.6 35.2 16 54.4s-35.2 25.6-54.4 16l-134.4-80z m160-185.6l92.8 160c9.6 19.2 35.2 25.6 54.4 12.8s25.6-35.2 12.8-54.4l-92.8-160c-12.8-19.2-35.2-22.4-54.4-12.8-16 12.8-22.4 33.6-12.8 54.4z m230.4-84.8c0-22.4 16-38.4 38.4-38.4s38.4 19.2 38.4 38.4V224c0 22.4-19.2 38.4-38.4 38.4-22.4 0-38.4-19.2-38.4-38.4V40z m240 43.2c9.6-19.2 35.2-25.6 54.4-16 19.2 9.6 25.6 35.2 16 51.2l-92.8 160c-9.6 19.2-35.2 25.6-54.4 16-19.2-9.6-25.6-35.2-12.8-54.4l89.6-156.8z m188.8 160l-160 92.8c-19.2 9.6-25.6 35.2-16 54.4 12.8 19.2 35.2 25.6 54.4 12.8l160-92.8c19.2-9.6 25.6-35.2 12.8-54.4-9.6-16-32-25.6-51.2-12.8z m83.2 228.8c22.4 0 38.4 16 38.4 38.4s-16 38.4-38.4 38.4H800c-22.4 0-38.4-19.2-38.4-38.4 0-22.4 19.2-38.4 38.4-38.4h185.6z",
  fill: "#8a8a8a",
  "p-id": "1862"
}, null, -1);
var _hoisted_5 = [
  _hoisted_4
];
var _hoisted_6 = { class: "desc" };
var __default__ = {
  name: "Loading"
};
var _sfc_main = defineComponent({
  ...__default__,
  setup(__props, { expose }) {
    const size = ref(48);
    const title = ref("加载中，请稍后...");
    function setTitle(userTitle) {
      title.value = userTitle;
    }
    function changeSize() {
      size.value = size.value * 2;
    }
    expose({
      setTitle,
      changeSize
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("div", _hoisted_2, [
          (openBlock(), createElementBlock("svg", {
            t: "1677400501954",
            class: "icon",
            viewBox: "0 0 1024 1024",
            version: "1.1",
            xmlns: "http://www.w3.org/2000/svg",
            "p-id": "1861",
            width: size.value,
            height: size.value,
            "xmlns:xlink": "http://www.w3.org/1999/xlink"
          }, _hoisted_5, 8, _hoisted_3)),
          createBaseVNode("p", _hoisted_6, toDisplayString(title.value), 1)
        ])
      ]);
    };
  }
});
function append(el) {
  const name = _sfc_main.name;
  el.appendChild(el[name].instance.$el);
}
function remove(el) {
  const name = _sfc_main.name;
  el.removeChild(el[name].instance.$el);
}
var Loading = {
  mounted(el, binding) {
    const app = createApp(_sfc_main);
    const instance = app.mount(document.createElement("div"));
    const name = _sfc_main.name;
    if (!el[name]) {
      el[name] = {};
    }
    el[name].instance = instance;
    const title = binding.arg;
    if (typeof title !== "undefined") {
      instance.setTitle(title);
    }
    if (binding.modifiers && "doublesize" in binding.modifiers) {
      instance.changeSize();
    }
    if (binding.value) {
      append(el);
    }
  },
  updated(el, binding) {
    const title = binding.arg;
    const name = _sfc_main.name;
    if (typeof title !== "undefined") {
      el[name].instance.setTitle(title);
    }
    if (binding.value !== binding.oldValue) {
      binding.value ? append(el) : remove(el);
    }
  }
};
export {
  Loading as default
};
//# sourceMappingURL=vue-next-directive_lib_directives_loading_index.js.map
