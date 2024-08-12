var Mt = Object.defineProperty;
var kt = (n, t, e) => t in n ? Mt(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e;
var R = (n, t, e) => kt(n, typeof t != "symbol" ? t + "" : t, e);
function $t(n, t) {
  if (n.size !== t.size)
    return !1;
  for (let [e, i] of n)
    if (!t.has(e) || t.get(e) !== i)
      return !1;
  return !0;
}
let zt = 0;
function Dt() {
  return zt++ + "";
}
var Ot = Object.defineProperty, Wt = (n, t, e) => t in n ? Ot(n, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : n[t] = e, a = (n, t, e) => (Wt(n, typeof t != "symbol" ? t + "" : t, e), e);
class q {
  constructor(t) {
    a(this, "x"), a(this, "y"), a(this, "target"), this.x = t.x, this.y = t.y, this.target = t.target;
  }
}
class Et extends q {
}
class J extends q {
}
class Q extends q {
}
class tt extends q {
}
class Rt {
  constructor(t) {
    a(this, "pluginId"), a(this, "pluginName"), a(this, "viewName"), a(this, "dataName"), a(this, "dataValue"), this.event = t, this.pluginId = t.pluginId, this.pluginName = t.pluginName, this.viewName = t.viewName, this.dataName = t.dataName, this.dataValue = t.dataValue;
  }
}
function qt(n) {
  return n.replace(/(?:^\w|[A-Z]|\b\w)/g, function (t, e) {
    return e === 0 ? t.toLowerCase() : t.toUpperCase();
  }).replace(/\s+/g, "").replace(/-+/g, "");
}
function Ut(n) {
  return n.split("").map((t, e) => t.toUpperCase() === t ? `${e !== 0 ? "-" : ""}${t.toLowerCase()}` : t).join("");
}
class j {
  constructor(t) {
    a(this, "node"), this.node = t.node;
  }
}
class H {
  constructor(t) {
    a(this, "node"), this.node = t.node;
  }
}
class Yt {
  constructor(t) {
    a(this, "_eventBus"), a(this, "_observer"), this._eventBus = t, this._observer = new MutationObserver(this._handler.bind(this)), this._observer.observe(document.body, {
      childList: !0,
      subtree: !0,
      attributes: !0,
      attributeOldValue: !0
    });
  }
  _handler(t) {
    t.forEach((e) => {
      e.addedNodes.forEach((s) => {
        if (!(s instanceof HTMLElement) || s.dataset.velViewId || s.parentElement && typeof s.parentElement.dataset.velAdded < "u")
          return;
        let r = s;
        if (s.dataset.velView || (r = s.querySelector("[data-vel-view][data-vel-plugin]")), !r)
          return;
        this._eventBus.emitEvent(j, { node: r });
        const o = r.querySelectorAll("[data-vel-plugin]");
        o.length && o.forEach((h) => {
          this._eventBus.emitEvent(j, { node: h });
        });
      }), e.removedNodes.forEach((s) => {
        if (!(s instanceof HTMLElement) || typeof s.dataset.velProcessing < "u")
          return;
        const r = s.querySelectorAll("[data-vel-plugin]");
        r.length && r.forEach((o) => {
          this._eventBus.emitEvent(H, { node: o });
        }), this._eventBus.emitEvent(H, { node: s });
      });
      const i = e.attributeName;
      if (i && /data-vel-data-.+/gi.test(i)) {
        const s = e.target, r = s.dataset.velPluginId || "", o = s.dataset.velPlugin || "", h = s.dataset.velView || "", u = s.getAttribute(i);
        if (u && u !== e.oldValue) {
          const c = qt(
            i.replace("data-vel-data-", "")
          );
          this._eventBus.emitEvent(Rt, {
            pluginId: r,
            pluginName: o,
            viewName: h,
            dataName: c,
            dataValue: u
          });
        }
      }
    });
  }
}
class Xt {
  execute(t) {
    this.call(t);
  }
}
class mt extends Xt {
  constructor(t) {
    super(), a(this, "_handler"), this._handler = t;
  }
  getHandler() {
    return this._handler;
  }
  call(t) {
    this._handler(t);
  }
}
class K {
  constructor() {
    a(this, "_listeners", /* @__PURE__ */ new Map()), a(this, "_keyedListeners", /* @__PURE__ */ new Map());
  }
  subscribeToEvent(t, e, i) {
    if (i) {
      this._subscribeToKeyedEvent(t, e, i);
      return;
    }
    let s = this._listeners.get(t);
    s || (s = [], this._listeners.set(t, s)), s.push(new mt(e));
  }
  removeEventListener(t, e, i) {
    if (i) {
      this._removeKeyedEventListener(t, e, i);
      return;
    }
    let s = this._listeners.get(t);
    s && (s = s.filter(
      (r) => r.getHandler() !== e
    ), this._listeners.set(t, s));
  }
  _subscribeToKeyedEvent(t, e, i) {
    let s = this._keyedListeners.get(t);
    s || (s = /* @__PURE__ */ new Map(), this._keyedListeners.set(t, s));
    let r = s.get(i);
    r || (r = [], s.set(i, r)), r.push(new mt(e));
  }
  _removeKeyedEventListener(t, e, i) {
    let s = this._keyedListeners.get(t);
    if (!s)
      return;
    let r = s.get(i);
    r && (r = r.filter(
      (o) => o.getHandler() !== e
    ), s.set(i, r));
  }
  emitEvent(t, e, i) {
    if (i) {
      this._emitKeyedEvent(t, e, i);
      return;
    }
    const s = this._listeners.get(t);
    s && s.forEach((r) => {
      r.execute(e);
    });
  }
  _emitKeyedEvent(t, e, i) {
    const s = this._keyedListeners.get(t);
    if (!s)
      return;
    const r = s.get(i);
    r && r.forEach((o) => {
      o.execute(e);
    });
  }
  _convertListener(t) {
    return (e) => t(e);
  }
  subscribeToPluginReadyEvent(t, e, i = !1) {
    if (i) {
      this.subscribeToEvent(
        Pt,
        this._convertListener(t),
        e
      );
      return;
    }
    this.subscribeToEvent(
      Vt,
      this._convertListener(t),
      e
    );
  }
  emitPluginReadyEvent(t, e, i = !1) {
    if (i) {
      this.emitEvent(
        Pt,
        e,
        t
      );
      return;
    }
    this.emitEvent(
      Vt,
      e,
      t
    );
  }
  reset() {
    this._listeners.clear();
  }
}
let jt = 0;
function xt() {
  return jt++ + "";
}
class At {
  constructor(t, e, i, s, r, o, h) {
    a(this, "_registry"), a(this, "_eventBus"), a(this, "_appEventBus"), a(this, "_internalEventBus"), a(this, "_initialized", !1), a(this, "_config"), a(this, "_pluginFactory"), a(this, "_pluginName"), a(this, "_id"), a(this, "_pluginKey"), a(this, "_layoutIdViewMapWaitingToEnter"), a(this, "_apiData"), a(this, "_isReady", !1), this._id = xt(), this._pluginFactory = t, this._pluginName = e, this._registry = i, this._eventBus = s, this._appEventBus = r, this._internalEventBus = new K(), this._config = o, this._layoutIdViewMapWaitingToEnter = /* @__PURE__ */ new Map(), this._pluginKey = h, this._apiData = {}, this._appEventBus.subscribeToPluginReadyEvent(
      () => {
        this._isReady = !0;
      },
      this._pluginName,
      !0
    );
  }
  get api() {
    return this._apiData;
  }
  _setApi(t) {
    this._apiData = t;
  }
  get pluginName() {
    return this._pluginName;
  }
  get pluginFactory() {
    return this._pluginFactory;
  }
  get pluginKey() {
    return this._pluginKey;
  }
  get id() {
    return this._id;
  }
  get config() {
    return { ...this._config };
  }
  getViews(t) {
    return t ? this._registry.getViewsByNameForPlugin(this, t) : this._registry.getViewsForPlugin(this);
  }
  getView(t) {
    return t ? this._registry.getViewsByNameForPlugin(this, t)[0] : this._registry.getViewsForPlugin(this)[0];
  }
  getViewById(t) {
    return this._registry.getViewById(t);
  }
  addView(t) {
    this._registry.assignViewToPlugin(t, this);
  }
  setInternalEventBus(t) {
    this._internalEventBus = t;
  }
  get internalBusEvent() {
    return this._internalEventBus;
  }
  emit(t, e) {
    this._internalEventBus.emitEvent(t, e);
  }
  on(t, e) {
    this._internalEventBus.subscribeToEvent(t, e);
  }
  removeListener(t, e) {
    this._internalEventBus.removeEventListener(t, e);
  }
  useEventPlugin(t, e = {}) {
    const i = this._registry.createPlugin(
      t,
      this._eventBus,
      e
    );
    return this._registry.associateEventPluginWithPlugin(this.id, i.id), i;
  }
  notifyAboutDataChanged(t) {
    this.onDataChanged(t);
  }
  // @ts-ignore
  onDataChanged(t) {
  }
  removeView(t) {
    t.onRemoveCallback ? this._invokeRemoveCallback(t) : this._deleteView(t), this.onViewRemoved(t);
  }
  _invokeRemoveCallback(t) {
    const e = this._createTemporaryView(t);
    requestAnimationFrame(() => {
      var i;
      (i = e.onRemoveCallback) == null || i.call(e, e, () => {
        var s, r;
        if ((s = t.onAddCallbacks) != null && s.afterRemoved && t.layoutId) {
          const o = this._layoutIdViewMapWaitingToEnter.get(
            t.layoutId
          );
          (r = o == null ? void 0 : o.onAddCallbacks) == null || r.afterEnter(o), this._layoutIdViewMapWaitingToEnter.delete(t.layoutId);
        }
        this._deleteView(e, !0);
      }), setTimeout(() => {
        e.element.parentElement && this._deleteView(e, !0);
      }, 1e4);
    });
  }
  _deleteView(t, e = !1) {
    (e || !t.layoutId) && (this._registry.removeViewById(t.id, this.id), t.element.remove());
  }
  // This is a temporary view for deleted view. We need to create it
  // to show it again so the user can animate it before it disappears.
  _createTemporaryView(t) {
    const e = t.previousRect.viewportOffset, i = t.previousRect.size, s = t.rotation.degrees < 0 ? 0 : Math.sin(t.rotation.radians) * i.height * t.scale.y, r = t.rotation.degrees > 0 ? 0 : Math.sin(t.rotation.radians) * i.width * t.scale.y, o = t.element.cloneNode(!0);
    t.element.remove(), o.style.cssText = "", o.style.position = "absolute", o.style.left = `${e.left + s}px`, o.style.top = `${e.top - r}px`, o.style.width = `${i.width}px`, o.style.height = `${i.height}px`, o.style.transform = `
      scale3d(${t.scale.x}, ${t.scale.y}, 1) rotate(${t.rotation.degrees}deg)
    `, o.style.pointerEvents = "none", o.dataset.velRemoved = "", document.body.appendChild(o);
    const h = this._registry.createView(o, t.name);
    return h.setAsTemporaryView(), h.styles.position = "absolute", h.styles.left = `${e.left + s}px`, h.styles.top = `${e.top - r}px`, h.rotation.setDegrees(t.rotation.degrees, !1), h.scale.set({ x: t.scale.x, y: t.scale.y }, !1), h.size.set(
      { width: t._localWidth, height: t._localHeight },
      !1
    ), t._copyAnimatorsToAnotherView(h), t.onRemoveCallback && h.onRemove(t.onRemoveCallback), h;
  }
  // @ts-ignore
  onViewRemoved(t) {
  }
  notifyAboutViewAdded(t) {
    this.onViewAdded(t), this._invokeAddCallbacks(t);
  }
  _invokeAddCallbacks(t) {
    var e, i, s;
    !((e = t.onAddCallbacks) != null && e.onInitialLoad) && !this._initialized || ((i = t.onAddCallbacks) == null || i.beforeEnter(t), !((s = t.onAddCallbacks) != null && s.afterRemoved) || !this._initialized ? requestAnimationFrame(() => {
      var r;
      (r = t.onAddCallbacks) == null || r.afterEnter(t);
    }) : t.layoutId && this._layoutIdViewMapWaitingToEnter.set(t.layoutId, t));
  }
  // @ts-ignore
  onViewAdded(t) {
  }
  init() {
    !this._initialized && this._isReady && (this.setup(), this._initialized = !0);
  }
  setup() {
  }
  // @ts-ignore
  subscribeToEvents(t) {
  }
}
class Ht extends At {
  isRenderable() {
    return !0;
  }
  isInitialized() {
    return this._initialized;
  }
  get initialized() {
    return this._initialized;
  }
  // @ts-ignore
  update(t, e) {
  }
  render() {
  }
  addView(t) {
    t.setPluginId(this.id), super.addView(t);
  }
}
class et extends At {
  isRenderable() {
    return !1;
  }
}
class Kt {
  constructor(t) {
    a(this, "_plugin"), this._plugin = t;
  }
  get initialized() {
    return this._plugin.isInitialized();
  }
  get config() {
    return this._plugin.config;
  }
  setup(t) {
    this._plugin.setup = t;
  }
  api(t) {
    this._plugin._setApi(t);
  }
  update(t) {
    this._plugin.update = t;
  }
  render(t) {
    this._plugin.render = t;
  }
  getViews(t) {
    return this._plugin.getViews(t);
  }
  getView(t) {
    return this._plugin.getView(t);
  }
  getViewById(t) {
    return this._plugin.getViewById(t);
  }
  useEventPlugin(t, e = {}) {
    return this._plugin.useEventPlugin(t, e);
  }
  emit(t, e) {
    this._plugin.emit(t, e);
  }
  on(t, e) {
    this._plugin.on(t, e);
  }
  onDataChanged(t) {
    this._plugin.onDataChanged = t;
  }
  onViewRemoved(t) {
    this._plugin.onViewRemoved = t;
  }
  onViewAdded(t) {
    this._plugin.onViewAdded = t;
  }
  subscribeToEvents(t) {
    this._plugin.subscribeToEvents = t;
  }
}
function Y(n, t, e, i, s, r) {
  if (Gt(n))
    return new n(
      n,
      n.pluginName,
      t,
      e,
      i,
      s,
      r
    );
  const o = new Ht(
    n,
    n.pluginName,
    t,
    e,
    i,
    s,
    r
  ), h = new Kt(o);
  return n(h), o;
}
function Gt(n) {
  var t;
  return ((t = n.prototype) == null ? void 0 : t.constructor.toString().indexOf("class ")) === 0;
}
class l {
  constructor(t, e) {
    a(this, "x"), a(this, "y"), this.x = t, this.y = e;
  }
  get magnitudeSquared() {
    return this.x * this.x + this.y * this.y;
  }
  get magnitude() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  get unitVector() {
    const t = new l(0, 0), e = this.magnitude;
    return e !== 0 && (t.x = this.x / e, t.y = this.y / e), t;
  }
  add(t) {
    this.x += t.x, this.y += t.y;
  }
  sub(t) {
    this.x -= t.x, this.y -= t.y;
  }
  scale(t) {
    this.x *= t, this.y *= t;
  }
  dot(t) {
    return this.x * t.x + this.y * t.y;
  }
  equals(t) {
    return this.x === t.x && this.y === t.y;
  }
  clone() {
    return new l(this.x, this.y);
  }
  static scale(t, e) {
    return new l(t.x * e, t.y * e);
  }
  static sub(t, e) {
    return new l(t.x - e.x, t.y - e.y);
  }
  static add(t, e) {
    return new l(t.x + e.x, t.y + e.y);
  }
}
function Zt(n, t) {
  const e = t.x - n.x, i = t.y - n.y;
  return Math.sqrt(e * e + i * i);
}
function _(n, t) {
  const e = n - t;
  return Math.abs(e) <= 0.01;
}
function y(n) {
  if (!n) return;
  let t = n.match(/^([\d.]+)([a-zA-Z%]*)$/);
  t || (t = "0px".match(/^([\d.]+)([a-zA-Z%]*)$/));
  const e = parseFloat(t[1]), i = t[2];
  return { value: e, unit: i, valueWithUnit: n };
}
function Jt(n, t, e = !1) {
  if (n === t)
    return !0;
  if (n.length !== t.length)
    return !1;
  for (let i = 0; i < n.length; i++)
    if (e && !_(n[i].value, t[i].value) || n[i].value !== t[i].value)
      return !1;
  return !0;
}
function ft(n, t) {
  return Jt(n, t, !0);
}
class B {
  constructor(t, e, i, s) {
    a(this, "_topLeft"), a(this, "_topRight"), a(this, "_bottomLeft"), a(this, "_bottomRight"), this._topLeft = t, this._topRight = e, this._bottomLeft = i, this._bottomRight = s;
  }
  get value() {
    return {
      topLeft: this._topLeft,
      topRight: this._topRight,
      bottomRight: this._bottomRight,
      bottomLeft: this._bottomLeft
    };
  }
  equals(t) {
    return _(this.value.topLeft.value, t.value.topLeft.value) && _(this.value.topRight.value, t.value.topRight.value) && _(this.value.bottomRight.value, t.value.bottomRight.value) && _(this.value.bottomLeft.value, t.value.bottomLeft.value);
  }
  toCssPercentageForNewSize(t) {
    const e = this._convertToPercentage(this._topLeft, t), i = this._convertToPercentage(this._topRight, t), s = this._convertToPercentage(this._bottomLeft, t), r = this._convertToPercentage(this._bottomRight, t);
    return `${e.h} ${i.h} ${r.h} ${s.h} / ${e.v} ${i.v} ${r.v} ${s.v}`;
  }
  _convertToPercentage(t, e) {
    if (t.unit === "%")
      return { h: `${t.value}%`, v: `${t.value}%` };
    const i = t.value / e.width * 100, s = t.value / e.height * 100;
    return { h: `${i}%`, v: `${s}%` };
  }
}
function G(n) {
  const t = n.split(" ").map((i) => y(i)), e = {
    value: 0,
    unit: "",
    valueWithUnit: "0"
  };
  switch (t.length) {
    case 1:
      return new B(t[0], t[0], t[0], t[0]);
    case 2:
      return new B(t[0], t[1], t[0], t[1]);
    case 3:
      return new B(t[0], t[1], t[2], t[1]);
    case 4:
      return new B(t[0], t[1], t[3], t[2]);
    default:
      return new B(
        e,
        e,
        e,
        e
      );
  }
}
function Qt(n, t) {
  const e = o(n.topLeft, t), i = o(n.topRight, t), s = o(n.bottomLeft, t), r = o(n.bottomRight, t);
  return {
    v: {
      topLeft: e.v,
      topRight: i.v,
      bottomRight: r.v,
      bottomLeft: s.v
    },
    h: {
      topLeft: e.h,
      topRight: i.h,
      bottomRight: r.h,
      bottomLeft: s.h
    }
  };
  function o(h, u) {
    if (h.unit === "%")
      return {
        h: y(`${h.value}%`),
        v: y(`${h.value}%`)
      };
    const c = h.value / u.width * 100, g = h.value / u.height * 100;
    return { h: y(`${c}%`), v: y(`${g}%`) };
  }
}
function wt(n, t) {
  return _(n.topLeft.value, t.topLeft.value) && _(n.topRight.value, t.topRight.value) && _(n.bottomRight.value, t.bottomRight.value) && _(n.bottomLeft.value, t.bottomLeft.value);
}
class te {
  constructor(t) {
    a(this, "_value"), this._value = t;
  }
  get value() {
    return this._value;
  }
  equals(t) {
    return _(this.value, t.value);
  }
}
function ee(n) {
  return new te(parseFloat(n));
}
class ie {
  constructor(t, e) {
    a(this, "_x"), a(this, "_y"), this._x = t, this._y = e;
  }
  get value() {
    return new l(this._x, this._y);
  }
}
function se(n, t) {
  if (!n) return;
  const [e, i] = n.split(" "), s = y(e), r = y(i);
  return new ie(
    s.value / t.width,
    r.value / t.height
  );
}
function re(n) {
  const t = ne(n), e = ae(n);
  return {
    viewportOffset: {
      left: Math.round(t.left),
      top: Math.round(t.top),
      right: Math.round(t.right),
      bottom: Math.round(t.bottom)
    },
    pageOffset: {
      top: e.top,
      left: e.left
    },
    size: {
      width: n.offsetWidth,
      height: n.offsetHeight
    }
  };
}
function ne(n) {
  const t = n.getBoundingClientRect();
  return {
    left: t.left,
    top: t.top,
    right: t.right,
    bottom: t.bottom,
    width: t.width,
    height: t.height
  };
}
function ae(n) {
  let t = n, e = 0, i = 0;
  for (; t;)
    e += t.offsetTop, i += t.offsetLeft, t = t.offsetParent;
  return { top: e, left: i };
}
class oe {
  constructor(t) {
    a(this, "_element"), a(this, "_rect"), a(this, "_computedStyle"), this._rect = re(t), this._computedStyle = getComputedStyle(t), this._element = t;
  }
  read(t) {
    switch (t) {
      case "opacity":
        return this.opacity;
      case "borderRadius":
        return this.borderRadius;
    }
  }
  get rect() {
    return this._rect;
  }
  get opacity() {
    return ee(this._computedStyle.opacity);
  }
  get borderRadius() {
    return G(this._computedStyle.borderRadius);
  }
  get origin() {
    return se(
      this._computedStyle.transformOrigin,
      this._rect.size
    );
  }
  get scroll() {
    let t = this._element, e = 0, i = 0;
    for (; t;)
      e += t.scrollTop, i += t.scrollLeft, t = t.offsetParent;
    return i += window.scrollX, e += window.scrollY, { y: e, x: i };
  }
}
function X(n) {
  return new oe(n);
}
function Z(n, t) {
  const e = {
    set: (i, s, r) => (typeof i[s] == "object" && i[s] !== null ? i[s] = Z(r, t) : (t(), i[s] = r), !0),
    get: (i, s) => typeof i[s] == "object" && i[s] !== null ? Z(i[s], t) : i[s]
  };
  return new Proxy(n, e);
}
const O = 0.01, it = {
  speed: 15
};
class st {
  constructor(t) {
    a(this, "name", "dynamic"), a(this, "_config"), this._config = t;
  }
  get config() {
    return this._config;
  }
}
class he extends st {
  update({ animatorProp: t, current: e, target: i, dt: s }) {
    const r = l.sub(i, e), o = l.scale(r, this._config.speed);
    let h = l.add(e, l.scale(o, s));
    return this._shouldFinish(i, e, o) && (h = i, requestAnimationFrame(() => {
      t.callCompleteCallback();
    })), t.callUpdateCallback(), h;
  }
  _shouldFinish(t, e, i) {
    return l.sub(t, e).magnitude < O && i.magnitude < O;
  }
}
class le extends st {
  update({ animatorProp: t, current: e, target: i, dt: s }) {
    const r = (i - e) * this._config.speed;
    let o = e + r * s;
    return _(o, i) && (o = i, requestAnimationFrame(() => {
      t.callCompleteCallback();
    })), t.callUpdateCallback(), o;
  }
}
class ue extends st {
  update({ animatorProp: t, current: e, target: i, dt: s }) {
    return i.map((r, o) => {
      const h = e[o], u = r.value === 0 ? h.unit : r.unit, c = (r.value - h.value) * this._config.speed, g = h.value + c * s;
      let d = y(`${g}${u}`);
      return this._shouldFinish(r.value, h.value, c) && (d = r, requestAnimationFrame(() => {
        t.callCompleteCallback();
      })), t.callUpdateCallback(), d;
    });
  }
  _shouldFinish(t, e, i) {
    return Math.abs(t - e) < O && Math.abs(i) < O;
  }
}
class rt {
  constructor() {
    a(this, "name", "instant"), a(this, "_config", {});
  }
  get config() {
    return this._config;
  }
  update(t) {
    return requestAnimationFrame(() => {
      t.animatorProp.callCompleteCallback();
    }), t.target;
  }
}
const nt = {
  stiffness: 0.5,
  damping: 0.75,
  speed: 10
}, W = 0.01;
class at {
  constructor(t) {
    a(this, "name", "spring"), a(this, "_config"), this._config = t;
  }
  get config() {
    return this._config;
  }
}
class ce extends at {
  constructor() {
    super(...arguments), a(this, "_velocity", new l(0, 0));
  }
  update({ animatorProp: t, current: e, target: i, dt: s }) {
    const r = l.scale(
      l.scale(l.sub(e, i), -1),
      this._config.stiffness
    );
    this._velocity = l.add(this._velocity, r), this._velocity = l.scale(this._velocity, this._config.damping);
    let o = l.add(
      e,
      l.scale(this._velocity, s * this._config.speed)
    );
    return this._shouldFinish(i, e) && (o = i, requestAnimationFrame(() => {
      t.callCompleteCallback();
    })), o;
  }
  _shouldFinish(t, e) {
    return l.sub(t, e).magnitude < W && this._velocity.magnitude < W;
  }
}
class de extends at {
  constructor() {
    super(...arguments), a(this, "_velocity", 0);
  }
  update({ animatorProp: t, current: e, target: i, dt: s }) {
    const r = -(e - i) * this._config.stiffness;
    this._velocity += r, this._velocity *= this._config.damping;
    let o = e + this._velocity * s * this._config.speed;
    return _(o, i) && (o = i, requestAnimationFrame(() => {
      t.callCompleteCallback();
    })), o;
  }
}
class ge extends at {
  constructor() {
    super(...arguments), a(this, "_velocity", 0);
  }
  update({ animatorProp: t, current: e, target: i, dt: s }) {
    return i.map((r, o) => {
      const h = e[o], u = r.value === 0 ? h.unit : r.unit, c = -(h.value - r.value) * this._config.stiffness;
      this._velocity += c, this._velocity *= this._config.damping;
      const g = h.value + this._velocity * s * this._config.speed;
      let d = y(`${g}${u}`);
      return this._shouldFinish(r.value, h.value) && (d = r, requestAnimationFrame(() => {
        t.callCompleteCallback();
      })), d;
    });
  }
  _shouldFinish(t, e) {
    return Math.abs(t - e) < W && Math.abs(this._velocity) < W;
  }
}
function pe(n) {
  return n;
}
const ot = {
  duration: 350,
  ease: pe
};
class ht {
  constructor(t) {
    a(this, "name", "tween"), a(this, "_config"), a(this, "_startTime"), this._config = t;
  }
  get config() {
    return this._config;
  }
  reset() {
    this._startTime = void 0;
  }
}
class _e extends ht {
  update({ animatorProp: t, initial: e, target: i, ts: s }) {
    this._startTime || (this._startTime = s);
    const r = Math.min(1, (s - this._startTime) / this._config.duration);
    return _(r, 1) ? (requestAnimationFrame(() => {
      t.callCompleteCallback();
    }), i) : l.add(
      e,
      l.scale(l.sub(i, e), this._config.ease(r))
    );
  }
}
class ve extends ht {
  update({ animatorProp: t, initial: e, target: i, ts: s }) {
    this._startTime || (this._startTime = s);
    const r = Math.min(1, (s - this._startTime) / this._config.duration);
    return _(r, 1) ? (requestAnimationFrame(() => {
      t.callCompleteCallback();
    }), i) : e.map((o, h) => {
      const u = i[h], c = u.value === 0 ? o.unit : u.unit, g = o.value + this._config.ease(r) * (i[h].value - o.value);
      return y(`${g}${c}`);
    });
  }
}
class me extends ht {
  update({ animatorProp: t, initial: e, target: i, ts: s }) {
    this._startTime || (this._startTime = s);
    const r = Math.min(1, (s - this._startTime) / this._config.duration);
    return _(r, 1) ? (requestAnimationFrame(() => {
      t.callCompleteCallback();
    }), i) : e + (i - e) * this._config.ease(r);
  }
}
class lt {
  createAnimatorByName(t, e) {
    switch (t) {
      case "instant":
        return this.createInstantAnimator();
      case "dynamic":
        return this.createDynamicAnimator(e);
      case "tween":
        return this.createTweenAnimator(e);
      case "spring":
        return this.createSpringAnimator(e);
    }
    return this.createInstantAnimator();
  }
}
class D extends lt {
  createInstantAnimator() {
    return new rt();
  }
  createTweenAnimator(t) {
    return new _e({ ...ot, ...t });
  }
  createDynamicAnimator(t) {
    return new he({ ...it, ...t });
  }
  createSpringAnimator(t) {
    return new ce({ ...nt, ...t });
  }
}
class fe extends lt {
  createInstantAnimator() {
    return new rt();
  }
  createTweenAnimator(t) {
    return new ve({ ...ot, ...t });
  }
  createDynamicAnimator(t) {
    return new ue({
      ...it,
      ...t
    });
  }
  createSpringAnimator(t) {
    return new ge({ ...nt, ...t });
  }
}
class yt extends lt {
  createInstantAnimator() {
    return new rt();
  }
  createDynamicAnimator(t) {
    return new le({ ...it, ...t });
  }
  createTweenAnimator(t) {
    return new me({ ...ot, ...t });
  }
  createSpringAnimator(t) {
    return new de({ ...nt, ...t });
  }
}
function F(n) {
  return structuredClone(n);
}
class we {
  constructor(t) {
    a(this, "_viewProp"), a(this, "_completeCallback"), a(this, "_updateCallback"), a(this, "_isAnimating"), this._viewProp = t, this._isAnimating = !1;
  }
  set(t, e) {
    this._viewProp.setAnimator(t, e);
  }
  get name() {
    return this._viewProp.getAnimator().name;
  }
  onComplete(t) {
    this._completeCallback = t;
  }
  get isAnimating() {
    return this._isAnimating;
  }
  markAsAnimating() {
    this._isAnimating = !0;
  }
  callCompleteCallback() {
    var t;
    (t = this._completeCallback) == null || t.call(this), this._isAnimating = !1;
  }
  onUpdate(t) {
    this._updateCallback = t;
  }
  callUpdateCallback() {
    var t;
    (t = this._updateCallback) == null || t.call(this);
  }
}
class N {
  constructor(t, e, i) {
    a(this, "_animatorProp"), a(this, "_animator"), a(this, "_initialValue"), a(this, "_previousValue"), a(this, "_targetValue"), a(this, "_currentValue"), a(this, "_hasChanged"), a(this, "_view"), a(this, "_animatorFactory"), a(this, "_previousRenderValue"), this._animatorProp = new we(this), this._animatorFactory = t, this._initialValue = F(e), this._previousValue = F(e), this._targetValue = F(e), this._currentValue = F(e), this._hasChanged = !1, this._previousRenderValue = void 0, this._view = i, this._animator = this._animatorFactory.createInstantAnimator();
  }
  get shouldRender() {
    return !0;
  }
  get isAnimating() {
    return this.animator.isAnimating;
  }
  getAnimator() {
    return this._animator;
  }
  get animator() {
    return this._animatorProp;
  }
  get _rect() {
    return this._view.rect;
  }
  get _previousRect() {
    return this._view.previousRect;
  }
  setAnimator(t, e) {
    this._animator = this._animatorFactory.createAnimatorByName(
      t,
      e
    );
  }
  _setTarget(t, e = !0) {
    var i, s;
    this._previousValue = F(this._currentValue), this._targetValue = t, e ? ((s = (i = this._animator).reset) == null || s.call(i), this.animator.markAsAnimating()) : this._currentValue = t, this._hasChanged = !0;
  }
  hasChanged() {
    return this._hasChanged;
  }
  destroy() {
    this._hasChanged = !1;
  }
  // @ts-ignore
  update(t, e) {
  }
}
class ye extends N {
  constructor() {
    super(...arguments), a(this, "_invertedBorderRadius"), a(this, "_forceStyleUpdateThisFrame", !1), a(this, "_updateWithScale", !1);
  }
  setFromElementPropValue(t) {
    this._setTarget(
      [
        t.value.topLeft,
        t.value.topRight,
        t.value.bottomRight,
        t.value.bottomLeft
      ],
      !0
    );
  }
  enableUpdateWithScale() {
    this._updateWithScale = !0;
  }
  disableUpdateWithScale() {
    this._updateWithScale = !1;
  }
  get value() {
    return {
      topLeft: this._currentValue[0],
      topRight: this._currentValue[1],
      bottomRight: this._currentValue[2],
      bottomLeft: this._currentValue[3]
    };
  }
  get invertedBorderRadius() {
    return this._invertedBorderRadius;
  }
  set(t, e = !0) {
    let i;
    if (typeof t == "string") {
      const u = G(t.trim());
      i = {
        topLeft: u.value.topLeft.valueWithUnit,
        topRight: u.value.topRight.valueWithUnit,
        bottomRight: u.value.bottomRight.valueWithUnit,
        bottomLeft: u.value.bottomLeft.valueWithUnit
      };
    } else
      i = t;
    const s = i.topLeft ? y(i.topLeft) : this._currentValue[0], r = i.topRight ? y(i.topRight) : this._currentValue[1], o = i.bottomRight ? y(i.bottomRight) : this._currentValue[2], h = i.bottomLeft ? y(i.bottomLeft) : this._currentValue[3];
    this._setTarget([s, r, o, h], e);
  }
  reset(t = !0) {
    this._setTarget(this._initialValue, t);
  }
  update(t, e) {
    if (this._forceStyleUpdateThisFrame)
      this._hasChanged = !0, this._forceStyleUpdateThisFrame = !1;
    else if (this._view.scale.isAnimating && this._updateWithScale)
      this._hasChanged = !0;
    else if (ft(this._targetValue, this._currentValue)) {
      this._hasChanged = !ft(
        this._targetValue,
        this._initialValue
      );
      return;
    }
    this._currentValue = this._animator.update({
      animatorProp: this._animatorProp,
      current: this._currentValue,
      target: this._targetValue,
      initial: this._previousValue,
      ts: t,
      dt: e
    }), this._updateWithScale && this._applyScaleInverse();
  }
  applyScaleInverse() {
    this._updateWithScale && (this._forceStyleUpdateThisFrame = !0);
  }
  _applyScaleInverse() {
    if (_(this._view.scale.x, 1) && _(this._view.scale.y, 1))
      return;
    const t = this._rect.size.width * this._view.scale.x, e = this._rect.size.height * this._view.scale.y;
    this._invertedBorderRadius = Qt(
      G(
        `${this._currentValue[0].valueWithUnit} ${this._currentValue[1].valueWithUnit} ${this._currentValue[2].valueWithUnit} ${this._currentValue[3].valueWithUnit}`
      ).value,
      {
        width: t,
        height: e
      }
    );
  }
  get shouldRender() {
    return this._hasChanged ? this._previousRenderValue ? !(wt(
      this.renderValue.v,
      this._previousRenderValue.v
    ) && wt(this.renderValue.h, this._previousRenderValue.h)) : !0 : !1;
  }
  get renderValue() {
    return this.invertedBorderRadius ? {
      v: {
        topLeft: this.invertedBorderRadius.v.topLeft,
        topRight: this.invertedBorderRadius.v.topRight,
        bottomLeft: this.invertedBorderRadius.v.bottomLeft,
        bottomRight: this.invertedBorderRadius.v.bottomRight
      },
      h: {
        topLeft: this.invertedBorderRadius.h.topLeft,
        topRight: this.invertedBorderRadius.h.topRight,
        bottomLeft: this.invertedBorderRadius.h.bottomLeft,
        bottomRight: this.invertedBorderRadius.h.bottomRight
      }
    } : {
      v: {
        topLeft: this.value.topLeft,
        topRight: this.value.topRight,
        bottomLeft: this.value.bottomLeft,
        bottomRight: this.value.bottomRight
      },
      h: {
        topLeft: this.value.topLeft,
        topRight: this.value.topRight,
        bottomLeft: this.value.bottomLeft,
        bottomRight: this.value.bottomRight
      }
    };
  }
  projectStyles() {
    const t = this.renderValue, e = `border-radius: ${t.h.topLeft.valueWithUnit} ${t.h.topRight.valueWithUnit} ${t.h.bottomRight.valueWithUnit} ${t.h.bottomLeft.valueWithUnit} / ${t.v.topLeft.valueWithUnit} ${t.v.topRight.valueWithUnit} ${t.v.bottomRight.valueWithUnit} ${t.v.bottomLeft.valueWithUnit};`;
    return this._previousRenderValue = t, e;
  }
  isTransform() {
    return !1;
  }
}
class Ve extends N {
  setFromElementPropValue(t) {
    this._setTarget(t.value, !0);
  }
  get value() {
    return this._currentValue;
  }
  set(t, e = !0) {
    this._setTarget(t, e);
  }
  reset(t = !0) {
    this._setTarget(1, t);
  }
  update(t, e) {
    if (_(this._targetValue, this._currentValue)) {
      this._hasChanged = !_(this._targetValue, this._initialValue);
      return;
    }
    this._currentValue = this._animator.update({
      animatorProp: this._animatorProp,
      current: this._currentValue,
      target: this._targetValue,
      initial: this._previousValue,
      ts: t,
      dt: e
    });
  }
  get shouldRender() {
    return this._hasChanged ? typeof this._previousRenderValue > "u" ? !0 : this.renderValue !== this._previousRenderValue : !1;
  }
  get renderValue() {
    return this.value;
  }
  projectStyles() {
    const t = this.renderValue, e = `opacity: ${t};`;
    return this._previousRenderValue = t, e;
  }
  isTransform() {
    return !1;
  }
}
class Pe extends N {
  get x() {
    return this._currentValue.x;
  }
  get y() {
    return this._currentValue.y;
  }
  set(t) {
    const e = { x: this.x, y: this.y, ...t };
    if (e.x < 0 || e.x > 1) {
      console.log(
        `%c WARNING: ${this._view.name}.origin.x property can only be a value from 0 to 1`,
        "background: #885500"
      );
      return;
    }
    if (e.y < 0 || e.y > 1) {
      console.log(
        `%c WARNING: ${this._view.name}.origin.y property can only be a value from 0 to 1`,
        "background: #885500"
      );
      return;
    }
    this._setTarget(new l(e.x, e.y), !1);
  }
  reset() {
    this._setTarget(this._initialValue, !1);
  }
  get shouldRender() {
    if (!this._hasChanged)
      return !1;
    if (!this._previousRenderValue)
      return !0;
    const t = this.renderValue;
    return !(_(t.x, this._previousRenderValue.x) && _(t.y, this._previousRenderValue.y));
  }
  get renderValue() {
    return new l(this.x * 100, this.y * 100);
  }
  projectStyles() {
    const t = this.renderValue, e = `transform-origin: ${t.x}% ${t.y}%;`;
    return this._previousRenderValue = t, e;
  }
  isTransform() {
    return !1;
  }
}
class be extends N {
  constructor() {
    super(...arguments), a(this, "_animateLayoutUpdateNextFrame", !1), a(this, "_parentScaleInverse", new l(1, 1));
  }
  get _parentDiff() {
    let t = this._view._parent, e = 0, i = 0;
    if (t) {
      const s = t.rect.pageOffset, r = t.getScroll(), o = {
        left: t.previousRect.viewportOffset.left + r.x,
        top: t.previousRect.viewportOffset.top + r.y
      };
      e = o.left - s.left, i = o.top - s.top;
    }
    return { parentDx: e, parentDy: i };
  }
  get x() {
    return this._currentValue.x + this._rect.pageOffset.left + this._parentDiff.parentDx;
  }
  get y() {
    return this._currentValue.y + this._rect.pageOffset.top + this._parentDiff.parentDy;
  }
  get initialX() {
    return this._rect.pageOffset.left;
  }
  get initialY() {
    return this._rect.pageOffset.top;
  }
  progressTo(t) {
    const e = typeof t.x > "u" ? this.initialX : t.x, i = typeof t.y > "u" ? this.initialY : t.y, s = new l(e, i), r = new l(this.initialX, this.initialY), o = new l(this.x, this.y), h = l.sub(o, r), u = l.sub(s, r);
    return 1 - l.sub(u, h).magnitude / u.magnitude;
  }
  set(t, e = !0) {
    const i = { x: this.x, y: this.y, ...t };
    this._setTarget(
      new l(
        i.x - this._rect.pageOffset.left,
        i.y - this._rect.pageOffset.top
      ),
      e
    );
  }
  reset(t = !0) {
    this._setTarget(new l(0, 0), t);
  }
  update(t, e) {
    if ((this._view.isInverseEffectEnabled || this._view.isLayoutTransitionEnabled) && !this._view.isTemporaryView && this._runLayoutTransition(), this._view.isInverseEffectEnabled) {
      const u = this._view._parent, c = u ? u.scale.x : 1, g = u ? u.scale.y : 1;
      this._parentScaleInverse = new l(1 / c, 1 / g), this._parentScaleInverse.equals(new l(1, 1)) || (this._hasChanged = !0);
    }
    if (this._targetValue.x === this._currentValue.x && this._targetValue.y === this._currentValue.y)
      return;
    const i = this._view._parent, s = i ? i.scale.x : 1, r = i ? i.scale.y : 1, o = i ? i.scale._previousValue.x : 1, h = i ? i.scale._previousValue.y : 1;
    this._currentValue = this._animator.update({
      animatorProp: this._animatorProp,
      current: new l(
        this._currentValue.x * s,
        this._currentValue.y * r
      ),
      target: this._targetValue,
      initial: new l(
        this._previousValue.x * o,
        this._previousValue.y * h
      ),
      ts: t,
      dt: e
    }), this._currentValue = new l(
      this._currentValue.x / s,
      this._currentValue.y / r
    );
  }
  _runLayoutTransition() {
    const t = !(this._targetValue.x === this._currentValue.x && this._targetValue.y === this._currentValue.y), e = !(this._view.scale._targetValue.x === this._view.scale._currentValue.x && this._view.scale._targetValue.y === this._view.scale._currentValue.y), i = t || e, s = this._rect.pageOffset.left - this._previousRect.pageOffset.left, r = this._rect.pageOffset.top - this._previousRect.pageOffset.top, o = this._previousRect.size.width / this._rect.size.width, h = this._previousRect.size.height / this._rect.size.height;
    let u = !1;
    if (s !== 0 || r !== 0 || !Number.isNaN(o) && o !== 1 || !Number.isNaN(h) && h !== 1 ? u = !0 : u = (() => {
      const c = this._view._parents;
      for (let g = 0; g < c.length; g++) {
        const d = c[g], V = d.previousRect.size.width / d.rect.size.width, m = d.previousRect.size.height / d.rect.size.height;
        if (V !== 1 || m !== 1)
          return !0;
      }
      return !1;
    })(), u) {
      if (this._currentValue.x !== 0 || this._currentValue.y !== 0 || this._view.scale._currentValue.x !== 1 || this._view.scale._currentValue.y !== 1) {
        if (!i) {
          const k = this._rect.pageOffset.left - this._previousRect.pageOffset.left, $ = this._rect.pageOffset.top - this._previousRect.pageOffset.top;
          this._setTarget(
            new l(this._currentValue.x - k, this._currentValue.y - $),
            !1
          );
          return;
        }
        const P = this._view._parent, C = this._rect.pageOffset, L = this._view.getScroll(), M = {
          left: this._previousRect.viewportOffset.left + L.x,
          top: this._previousRect.viewportOffset.top + L.y
        }, Lt = M.left - C.left, Bt = M.top - C.top;
        let ct = 0, dt = 0, gt = 0, pt = 0;
        if (P) {
          const k = P.rect.pageOffset, $ = P.getScroll(), z = {
            left: P.previousRect.viewportOffset.left + $.x,
            top: P.previousRect.viewportOffset.top + $.y
          };
          ct = z.left - k.left, dt = z.top - k.top;
          const _t = M.top - z.top, vt = M.left - z.left, Ft = P.scale.y * _t;
          gt = (_t - Ft) / P.scale.y;
          const St = P.scale.x * vt;
          pt = (vt - St) / P.scale.x;
        }
        this._setTarget(
          new l(Lt - ct + pt, Bt - dt + gt),
          !1
        ), i && (this._animateLayoutUpdateNextFrame = !0);
        return;
      }
      this._animateLayoutUpdateNextFrame = !0;
      const c = this._previousRect, g = this._rect, d = this._view._parent;
      let V = 0, m = 0;
      d && (V = d.previousRect.viewportOffset.left - d.rect.viewportOffset.left), d && (m = d.previousRect.viewportOffset.top - d.rect.viewportOffset.top);
      let f = 1, w = 1;
      d && (f = d.previousRect.size.width / d.rect.size.width, w = d.previousRect.size.height / d.rect.size.height);
      const x = d ? d.previousRect.viewportOffset.left : 0, U = d ? d.previousRect.viewportOffset.top : 0, v = c.viewportOffset.left - x, b = c.viewportOffset.top - U, p = v / f - v, A = b / w - b;
      let E = c.viewportOffset.left - g.viewportOffset.left - V + p;
      const S = c.viewportOffset.top - g.viewportOffset.top - m + A;
      this._setTarget(new l(E, S), !1);
    } else
      this._animateLayoutUpdateNextFrame && (this._setTarget(this._initialValue, !0), this._animateLayoutUpdateNextFrame = !1);
  }
  get shouldRender() {
    if (!this._hasChanged)
      return !1;
    if (!this._previousRenderValue)
      return !0;
    const t = this.renderValue;
    return !(_(t.x, this._previousRenderValue.x) && _(t.y, this._previousRenderValue.y));
  }
  get renderValue() {
    let t = 0, e = 0;
    return (this._view.isInverseEffectEnabled || this._view.isLayoutTransitionEnabled) && (t = (this._rect.size.width * this._parentScaleInverse.x * this._view.scale.x - this._rect.size.width) * this._view.origin.x, e = (this._rect.size.height * this._parentScaleInverse.y * this._view.scale.y - this._rect.size.height) * this._view.origin.y), new l(
      this._currentValue.x + t,
      this._currentValue.y + e
    );
  }
  projectStyles() {
    const t = this.renderValue, e = `translate3d(${t.x}px, ${t.y}px, 0)`;
    return this._previousRenderValue = t, e;
  }
  isTransform() {
    return !0;
  }
}
class Ee extends N {
  constructor() {
    super(...arguments), a(this, "_unit", "deg");
  }
  get degrees() {
    let t = this._currentValue;
    return this._unit === "rad" && (t = t * (180 / Math.PI)), t;
  }
  get radians() {
    let t = this._currentValue;
    return this._unit === "deg" && (t = t * (Math.PI / 180)), t;
  }
  setDegrees(t, e = !0) {
    this._unit = "deg", this._setTarget(t, e);
  }
  setRadians(t, e = !0) {
    this._unit = "rad", this._setTarget(t, e);
  }
  reset(t = !0) {
    this._setTarget(0, t);
  }
  update(t, e) {
    this._targetValue !== this._currentValue && (this._currentValue = this._animator.update({
      animatorProp: this._animatorProp,
      current: this._currentValue,
      target: this._targetValue,
      initial: this._previousValue,
      ts: t,
      dt: e
    }));
  }
  get shouldRender() {
    if (!this._hasChanged)
      return !1;
    if (typeof this._previousRenderValue > "u")
      return !0;
    const t = this.renderValue;
    return !_(t, this._previousRenderValue);
  }
  get renderValue() {
    return this._currentValue;
  }
  projectStyles() {
    const t = this.renderValue, e = `rotate(${t}${this._unit})`;
    return this._previousRenderValue = t, e;
  }
  isTransform() {
    return !0;
  }
}
class Re extends N {
  constructor() {
    super(...arguments), a(this, "_animateLayoutUpdateNextFrame", !1);
  }
  get x() {
    return this._currentValue.x;
  }
  get y() {
    return this._currentValue.y;
  }
  set(t, e = !0) {
    const i = { x: this._currentValue.x, y: this._currentValue.y, ...typeof t == "number" ? { x: t, y: t } : t };
    this._setTarget(new l(i.x, i.y), e);
  }
  setWithSize(t, e = !0) {
    let i = this._currentValue.x, s = this._currentValue.y;
    t.width && (i = t.width / this._rect.size.width), t.height && (s = t.height / this._rect.size.height), !t.width && t.height && (i = s), !t.height && t.width && (s = i);
    const r = { x: i, y: s };
    this._setTarget(new l(r.x, r.y), e);
  }
  reset(t = !0) {
    this._setTarget(new l(1, 1), t);
  }
  update(t, e) {
    if ((this._view.isInverseEffectEnabled || this._view.isLayoutTransitionEnabled) && !this._view.isTemporaryView && this._runLayoutTransition(), this._view.isInverseEffectEnabled) {
      const i = this._view._parent, s = i ? i.scale.x : 1, r = i ? i.scale.y : 1;
      this._hasChanged = s !== 1 || r !== 1;
    }
    this._targetValue.x === this._currentValue.x && this._targetValue.y === this._currentValue.y || (this._currentValue = this._animator.update({
      animatorProp: this._animatorProp,
      current: this._currentValue,
      target: this._targetValue,
      initial: new l(this._previousValue.x, this._previousValue.y),
      ts: t,
      dt: e
    }));
  }
  _runLayoutTransition() {
    const t = !(this._targetValue.x === this._currentValue.x && this._targetValue.y === this._currentValue.y), e = this._previousRect.size.width / this._rect.size.width, i = this._previousRect.size.height / this._rect.size.height;
    let s = !1;
    if ((!Number.isNaN(e) && e !== 1 || !Number.isNaN(i) && i !== 1) && (s = !0), s) {
      if (this._currentValue.x !== 1 || this._currentValue.y !== 1) {
        const c = this._view.previousRect.size.width / this._view.rect.size.width, g = this._view.previousRect.size.height / this._view.rect.size.height;
        this._setTarget(
          new l(this._currentValue.x * c, this._currentValue.y * g),
          !1
        ), t && (this._animateLayoutUpdateNextFrame = !0);
        return;
      }
      const r = this._previousRect.size.width / this._rect.size.width, o = this._previousRect.size.height / this._rect.size.height, h = r, u = o;
      this._view.viewProps.borderRadius.applyScaleInverse(), this._setTarget(new l(h, u), !1), this._animateLayoutUpdateNextFrame = !0;
    } else
      this._animateLayoutUpdateNextFrame && (this._setTarget(this._initialValue, !0), this._animateLayoutUpdateNextFrame = !1);
  }
  get shouldRender() {
    if (!this._hasChanged)
      return !1;
    if (!this._previousRenderValue)
      return !0;
    const t = this.renderValue;
    return !(_(t.x, this._previousRenderValue.x) && _(t.y, this._previousRenderValue.y));
  }
  get renderValue() {
    const t = this._view._parent ? this._view._parent.scale.x : 1, e = this._view._parent ? this._view._parent.scale.y : 1, i = this._currentValue.x / t, s = this._currentValue.y / e;
    return new l(i, s);
  }
  projectStyles() {
    const t = this.renderValue, e = `scale3d(${t.x}, ${t.y}, 1)`;
    return this._previousRenderValue = t, e;
  }
  isTransform() {
    return !0;
  }
}
class xe extends N {
  get width() {
    return this._view.rect.size.width;
  }
  get height() {
    return this._view.rect.size.height;
  }
  get localWidth() {
    return this._currentValue.x;
  }
  get localHeight() {
    return this._currentValue.y;
  }
  get widthAfterScale() {
    const t = this._view.scale.x;
    return this.localWidth * t;
  }
  get heightAfterScale() {
    const t = this._view.scale.y;
    return this.localHeight * t;
  }
  get initialWidth() {
    return this._initialValue.x;
  }
  get initialHeight() {
    return this._initialValue.y;
  }
  set(t, e = !0) {
    const i = { width: this._currentValue.x, height: this._currentValue.y, ...t };
    this._setTarget(new l(i.width, i.height), e);
  }
  setWidth(t, e = !0) {
    const i = { width: this._currentValue.x, height: this._currentValue.y, width: t };
    this._setTarget(new l(i.width, i.height), e);
  }
  setHeight(t, e = !0) {
    const i = { width: this._currentValue.x, height: this._currentValue.y, height: t };
    this._setTarget(new l(i.width, i.height), e);
  }
  reset(t = !0) {
    this._setTarget(
      new l(this.initialWidth, this.initialHeight),
      t
    );
  }
  update(t, e) {
    this._targetValue.x === this._currentValue.x && this._targetValue.y === this._currentValue.y || (this._currentValue = this._animator.update({
      animatorProp: this._animatorProp,
      current: this._currentValue,
      target: this._targetValue,
      initial: this._previousValue,
      ts: t,
      dt: e
    }));
  }
  get shouldRender() {
    if (!this._hasChanged)
      return !1;
    if (!this._previousRenderValue)
      return !0;
    const t = this.renderValue;
    return !(_(t.x, this._previousRenderValue.x) && _(t.y, this._previousRenderValue.y));
  }
  get renderValue() {
    return new l(this._currentValue.x, this._currentValue.y);
  }
  projectStyles() {
    const t = this.renderValue, e = `width: ${t.x}px; height: ${t.y}px;`;
    return this._previousRenderValue = t, e;
  }
  isTransform() {
    return !1;
  }
}
class Ae {
  constructor(t) {
    if (!t.elementReader.origin) return;
    a(this, "_props", /* @__PURE__ */ new Map()), this._props.set(
      "position",
      new be(new D(), new l(0, 0), t)
    ), this._props.set(
      "scale",
      new Re(new D(), new l(1, 1), t)
    ), this._props.set(
      "rotation",
      new Ee(new yt(), 0, t)
    ), this._props.set(
      "size",
      new xe(
        new D(),
        new l(t.rect.size.width, t.rect.size.height),
        t
      )
    ), this._props.set(
      "opacity",
      new Ve(
        new yt(),
        t.elementReader.opacity.value,
        t
      )
    ), this._props.set(
      "borderRadius",
      new ye(
        new fe(),
        [
          t.elementReader.borderRadius.value.topLeft,
          t.elementReader.borderRadius.value.topRight,
          t.elementReader.borderRadius.value.bottomRight,
          t.elementReader.borderRadius.value.bottomLeft
        ],
        t
      )
    ), this._props.set(
      "origin",
      new Pe(
        new D(),
        t.elementReader.origin.value,
        t
      )
    );
  }
  allProps() {
    return Array.from(this._props.values());
  }
  allPropNames() {
    return Array.from(this._props.keys());
  }
  getPropByName(t) {
    return this._props.get(t);
  }
  get position() {
    return this._props.get("position");
  }
  get scale() {
    return this._props.get("scale");
  }
  get rotation() {
    return this._props.get("rotation");
  }
  get size() {
    return this._props.get("size");
  }
  get opacity() {
    return this._props.get("opacity");
  }
  get borderRadius() {
    return this._props.get("borderRadius");
  }
  get origin() {
    return this._props.get("origin");
  }
}
class Te {
  constructor(t, e, i, s) {
    a(this, "id"), a(this, "name"), a(this, "element"), a(this, "styles", {}), a(this, "_viewProps"), a(this, "_previousRect"), a(this, "_onAddCallbacks"), a(this, "_onRemoveCallback"), a(this, "_skipFirstRenderFrame"), a(this, "_layoutTransition"), a(this, "_registry"), a(this, "_layoutId"), a(this, "_elementReader"), a(this, "_viewParents"), a(this, "_temporaryView"), a(this, "_inverseEffect"), a(this, "_renderNextTick"), this._registry = i, this.id = xt(), this.name = e, this.element = t, this._elementReader = X(t), this._viewParents = this._getParents(), this._previousRect = this._elementReader.rect, this._viewProps = new Ae(this), this._skipFirstRenderFrame = !0, this._layoutId = s, this._layoutTransition = !1, this.element.dataset.velViewId = this.id, this._temporaryView = !1, this._inverseEffect = !1, this.styles = Z(this.styles, () => {
      this._renderNextTick = !0;
    }), this._renderNextTick = !1;
  }
  destroy() {
    this._viewProps.allProps().forEach((t) => t.destroy()), this.element.removeAttribute("data-vel-view-id"), this.element.removeAttribute("data-vel-plugin-id"), this._renderNextTick = !0;
  }
  get elementReader() {
    return this._elementReader;
  }
  setElement(t) {
    this.element = t, this._elementReader = X(this.element), this.element.dataset.velViewId = this.id;
  }
  get layoutId() {
    return this._layoutId;
  }
  get position() {
    return this._viewProps.position;
  }
  get scale() {
    return this._viewProps.scale;
  }
  get _children() {
    return Array.from(this.element.children).map((t) => t.dataset.velViewId).filter((t) => t && typeof t == "string").map((t) => this._registry.getViewById(t)).filter((t) => !!t);
  }
  get _parent() {
    return this._parents[0];
  }
  get _parents() {
    return this._viewParents;
  }
  _getParents() {
    var t;
    const e = [];
    let i = this.element.parentElement;
    if (!i)
      return e;
    for (i = i.closest("[data-vel-view-id]"); i;) {
      const s = i.dataset.velViewId;
      if (s) {
        const r = this._registry.getViewById(s);
        r && e.push(r);
      }
      i = (t = i.parentElement) == null ? void 0 : t.closest(
        "[data-vel-view-id]"
      );
    }
    return e;
  }
  get rotation() {
    return this._viewProps.rotation;
  }
  get size() {
    return this._viewProps.size;
  }
  get _localWidth() {
    return this._viewProps.size.localWidth;
  }
  get _localHeight() {
    return this._viewProps.size.localHeight;
  }
  get opacity() {
    return this._viewProps.opacity;
  }
  get borderRadius() {
    return this._viewProps.borderRadius;
  }
  get origin() {
    return this._viewProps.origin;
  }
  get data() {
    const t = this.element.dataset;
    return Object.keys(t).filter((e) => e.includes("velData")).map((e) => e.replace("velData", "")).map((e) => `${e[0].toLowerCase()}${e.slice(1)}`).reduce((e, i) => {
      const s = t[`velData${i[0].toUpperCase()}${i.slice(1)}`];
      return !e[i] && s && (e[i] = s), e;
    }, {});
  }
  get onAddCallbacks() {
    return this._onAddCallbacks;
  }
  get onRemoveCallback() {
    return this._onRemoveCallback;
  }
  get isLayoutTransitionEnabled() {
    return this._layoutTransition;
  }
  get hasLayoutTransitionEnabledForParents() {
    return this._parents.some((t) => t.isLayoutTransitionEnabled);
  }
  get isInverseEffectEnabled() {
    return this._parents.some((t) => t._inverseEffect);
  }
  layoutTransition(t) {
    this._layoutTransition = t, this.inverseEffect(t);
  }
  inverseEffect(t) {
    this._inverseEffect = t, t && this._children.forEach((e) => {
      if (e.position.animator.name === "instant") {
        const i = this.viewProps.position.getAnimator();
        e.position.setAnimator(
          i.name,
          i.config
        );
      }
      if (e.scale.animator.name === "instant") {
        const i = this.viewProps.scale.getAnimator();
        e.scale.setAnimator(i.name, i.config);
      }
    });
  }
  setAnimatorsFromParent() {
    let t = this._parent;
    for (; t && !t._inverseEffect;)
      t = t._parent;
    if (t) {
      if (this.position.animator.name === "instant") {
        const e = t.viewProps.position.getAnimator();
        this.position.setAnimator(e.name, e.config);
      }
      if (this.scale.animator.name === "instant") {
        const e = t.viewProps.scale.getAnimator();
        this.scale.setAnimator(e.name, e.config);
      }
    }
  }
  get _isRemoved() {
    return !this._registry.getViewById(this.id);
  }
  setPluginId(t) {
    this.element.dataset.velPluginId = t;
  }
  hasElement(t) {
    return this.element.contains(t);
  }
  getScroll() {
    return this._elementReader.scroll;
  }
  intersects(t, e) {
    const i = {
      x: this.rect.viewportOffset.left,
      y: this.rect.viewportOffset.top
    };
    return t >= i.x && t <= i.x + this.size.width && e >= i.y && e <= i.y + this.size.height;
  }
  // Using AABB collision detection
  overlapsWith(t) {
    const e = t._localWidth * t.scale.x, i = t._localHeight * t.scale.y, s = this._localWidth * this.scale.x, r = this._localHeight * this.scale.y;
    return this.position.x < t.position.x + e && this.position.x + s > t.position.x && this.position.y < t.position.y + i && this.position.y + r > t.position.y;
  }
  distanceTo(t) {
    const e = new l(this.position.x, this.position.y), i = new l(t.position.x, t.position.y);
    return l.sub(i, e).magnitude;
  }
  read() {
    this._elementReader = X(this.element);
  }
  get rect() {
    return this._elementReader.rect;
  }
  get previousRect() {
    return this._previousRect;
  }
  update(t, e) {
    this._viewProps.allProps().forEach((i) => i.update(t, e));
  }
  _updatePreviousRect() {
    this._previousRect = this._elementReader.rect;
  }
  setAsTemporaryView() {
    this._temporaryView = !0;
  }
  get isTemporaryView() {
    return this._temporaryView;
  }
  get shouldRender() {
    return this._renderNextTick || this._viewProps.allProps().some((t) => t.shouldRender);
  }
  render() {
    if (!this.shouldRender)
      return;
    if (this._isRemoved && this._skipFirstRenderFrame) {
      this._skipFirstRenderFrame = !1;
      return;
    }
    let t = this.element.style.cssText; // 기존 CSS를 가져옴
    const e = this._viewProps.allProps(), i = e.filter((r) => r.isTransform()), s = e.filter((r) => !r.isTransform());
    if (i.some((r) => r.hasChanged())) {
      const r = i.reduce((o, h, u) => (o += h.projectStyles(), u === i.length - 1 && (o += ";"), o), "transform: ");
      t += r;
    }
    s.forEach((r) => {
      r.hasChanged() && (t += r.projectStyles());
    });
    t += this._getUserStyles(); // 새로운 CSS를 추가
    this.element.style.cssText = t; // 기존 CSS와 새로운 CSS를 결합하여 설정
    this._renderNextTick = !1;
  }
  _getUserStyles() {
    return Object.keys(this.styles).reduce((t, e) => e ? t + `${Ut(e)}: ${this.styles[e]};` : t, "");
  }
  markAsAdded() {
    delete this.element.dataset.velProcessing;
  }
  onAdd(t) {
    this._onAddCallbacks = t;
  }
  onRemove(t) {
    this._onRemoveCallback = t;
  }
  get viewProps() {
    return this._viewProps;
  }
  getPropByName(t) {
    return this._viewProps.getPropByName(t);
  }
  _copyAnimatorsToAnotherView(t) {
    t.viewProps.allPropNames().forEach((e) => {
      var i, s;
      const r = (i = this.viewProps.getPropByName(e)) == null ? void 0 : i.getAnimator();
      r && ((s = t.viewProps.getPropByName(e)) == null || s.setAnimator(r.name, r.config));
    });
  }
  getChildren(t) {
    const e = Array.from(this.element.children).filter((i) => {
      const s = i;
      return typeof s.dataset.velViewId < "u" && s.dataset.velView === t;
    }).map((i) => i.dataset.velViewId);
    return this._registry.getViewsById(e);
  }
  getChild(t) {
    return this.getChildren(t)[0];
  }
  getParent(t) {
    const e = this.element.parentElement;
    if (!e)
      return;
    const i = e.dataset.velViewId;
    if (i && e.dataset.velView === t)
      return this._registry.getViewById(i);
  }
}
class Ne {
  constructor(t, e) {
    a(this, "_appEventBus"), a(this, "_eventBus"), a(this, "_plugins", []), a(this, "_views", []), a(this, "_viewsPerPlugin", /* @__PURE__ */ new Map()), a(this, "_viewsToBeCreated", []), a(this, "_viewsToBeRemoved", []), a(this, "_viewsCreatedInPreviousFrame", []), a(this, "_layoutIdToViewMap", /* @__PURE__ */ new Map()), a(this, "_eventPluginsPerPlugin", /* @__PURE__ */ new Map()), a(this, "_pluginNameToPluginFactoryMap", /* @__PURE__ */ new Map()), a(this, "_pluginNameToPluginConfigMap", /* @__PURE__ */ new Map()), this._appEventBus = t, this._eventBus = e;
  }
  update() {
    this._handleRemovedViews(), this._handleAddedViews();
  }
  associateEventPluginWithPlugin(t, e) {
    let i = this._eventPluginsPerPlugin.get(t);
    i || (i = [], this._eventPluginsPerPlugin.set(t, i)), i.push(e);
  }
  _handleRemovedViews() {
    const t = this._viewsToBeRemoved.filter((e) => e.dataset.velViewId);
    t.length && (t.forEach((e) => {
      const i = e.dataset.velViewId;
      i && this._handleRemoveView(i);
    }), this._viewsToBeRemoved = []);
  }
  _getPluginNameForElement(t) {
    const e = t.dataset.velPlugin;
    if (e && e.length > 0)
      return e;
    const i = t.closest("[data-vel-plugin]");
    if (i)
      return i.dataset.velPlugin;
  }
  _getPluginIdForElement(t) {
    const e = this._getPluginNameForElement(t);
    if (!e)
      return;
    const i = t.closest("[data-vel-plugin-id]");
    if (i)
      return i.dataset.velPluginId;
    const s = this.getPluginByName(e);
    if (s)
      return s.id;
  }
  _isScopedElement(t) {
    const e = this._getPluginNameForElement(t);
    if (!e)
      return !1;
    const i = this._pluginNameToPluginFactoryMap.get(e), s = i == null ? void 0 : i.scope;
    return t.dataset.velView === s;
  }
  _handleAddedViews() {
    this._viewsCreatedInPreviousFrame.forEach((s) => {
      s.markAsAdded();
    }), this._viewsCreatedInPreviousFrame = [];
    const t = this._viewsToBeCreated.filter(
      (s) => this._isScopedElement(s)
    ), e = this._viewsToBeCreated.filter(
      (s) => !this._isScopedElement(s)
    );
    this._viewsToBeCreated = [], t.forEach((s) => {
      const r = this._getPluginNameForElement(s), o = this._pluginNameToPluginFactoryMap.get(r), h = this._pluginNameToPluginConfigMap.get(r), u = s.dataset.velPluginKey, c = Y(
        o,
        this,
        this._eventBus,
        this._appEventBus,
        h,
        u
      );
      this._plugins.push(c);
      const g = s.dataset.velView, d = this._createNewView(s, g, c);
      d.isInverseEffectEnabled && d.setAnimatorsFromParent(), c.notifyAboutViewAdded(d);
    });
    const i = e.filter((s) => !!this._getPluginIdForElement(s));
    i.length !== 0 && i.forEach((s) => {
      const r = this._getPluginIdForElement(s), o = s.dataset.velView;
      if (!o || !r)
        return;
      const h = this._getPluginById(r);
      if (!h)
        return;
      const u = this._getLayoutIdForElement(s, h);
      let c;
      u && this._layoutIdToViewMap.has(u) ? (c = this._layoutIdToViewMap.get(u), c.setElement(s), c.setPluginId(h.id), this._createChildrenForView(c, h)) : c = this._createNewView(s, o, h), c.isInverseEffectEnabled && c.setAnimatorsFromParent(), h.notifyAboutViewAdded(c);
    });
  }
  _getLayoutIdForElement(t, e) {
    const i = t.dataset.velLayoutId;
    if (i)
      return `${i}-${e.id}`;
  }
  _createNewView(t, e, i) {
    const s = this._getLayoutIdForElement(t, i), r = this.createView(t, e, s);
    return i.addView(r), r.layoutId && this._layoutIdToViewMap.set(r.layoutId, r), this._createChildrenForView(r, i), this._appEventBus.emitPluginReadyEvent(i.pluginName, i.api, !0), requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this._appEventBus.emitPluginReadyEvent(i.pluginName, i.api);
      });
    }), r;
  }
  _createChildrenForView(t, e) {
    const i = t.element.querySelectorAll("*");
    if (i.length) {
      if (Array.from(i).some(
        (s) => this._getPluginNameForElement(s) !== e.pluginName
      )) {
        console.log(
          `%c WARNING: The plugin "${e.pluginName}" has view(s) created for a different plugin. Make sure all views inside that plugin don't have data-vel-plugin set or the pluginName is set to "${e.pluginName}"`,
          "background: #885500"
        );
        return;
      }
      Array.from(i).forEach((s) => {
        const r = s, o = r.dataset.velView ? r.dataset.velView : `${t.name}-child`, h = this._getLayoutIdForElement(r, e), u = this.createView(r, o, h);
        h && !this._layoutIdToViewMap.has(h) && this._layoutIdToViewMap.set(h, u), e.addView(u), e.notifyAboutViewAdded(u);
      });
    }
  }
  _handleRemoveView(t) {
    this._plugins.forEach((e) => {
      if (!this._viewsPerPlugin.get(e.id))
        return;
      const i = this._getPluginViewById(e, t);
      i && e.removeView(i);
    });
  }
  removeViewById(t, e) {
    this._unassignViewFromPlugin(t, e), this._views = this._views.filter((i) => i.id !== t);
  }
  _unassignViewFromPlugin(t, e) {
    const i = this._viewsPerPlugin.get(e);
    if (!i)
      return;
    const s = i.indexOf(t);
    s !== -1 && i.splice(s, 1);
  }
  getViewById(t) {
    return this._views.find((e) => e.id === t);
  }
  getViewsById(t) {
    return this._views.filter((e) => t.includes(e.id));
  }
  _getPluginById(t) {
    return this._plugins.find((e) => e.id === t);
  }
  _getPluginViewById(t, e) {
    return this.getViewsForPlugin(t).find((i) => i.id === e);
  }
  destroy(t, e) {
    if (!t) {
      this._destroyAll(e);
      return;
    }
    let i = [];
    if (t && t.length > 0) {
      const s = this.getPluginByName(t);
      if (s) {
        const r = (this._eventPluginsPerPlugin.get(s.id) || []).map((o) => this._getPluginById(o)).filter((o) => typeof o < "u");
        i.push(s), i.push(...r);
      }
    } else
      i = this._plugins;
    requestAnimationFrame(() => {
      i.forEach((s) => {
        this._destroyPlugin(s);
      }), requestAnimationFrame(() => {
        e == null || e();
      });
    });
  }
  _destroyPlugin(t) {
    const e = this.getViewsForPlugin(t);
    e.forEach((i) => {
      i.layoutId && this._layoutIdToViewMap.delete(i.layoutId), i.destroy();
    }), this._views = this._views.filter(
      (i) => !e.find((s) => s.id === i.id)
    ), this._viewsPerPlugin.delete(t.id), this._plugins = this._plugins.filter((i) => i.id !== t.id);
  }
  _destroyAll(t) {
    this._views.forEach((e) => e.destroy()), requestAnimationFrame(() => {
      this._plugins = [], this._views = [], this._viewsPerPlugin.clear(), this._viewsToBeCreated = [], this._viewsToBeRemoved = [], this._viewsCreatedInPreviousFrame = [], this._layoutIdToViewMap.clear(), this._eventPluginsPerPlugin.clear(), t == null || t();
    });
  }
  reset(t, e) {
    let i = [];
    if (t && t.length > 0) {
      const s = this.getPluginByName(t);
      if (s) {
        const r = (this._eventPluginsPerPlugin.get(s.id) || []).map((o) => this._getPluginById(o)).filter((o) => typeof o < "u");
        i.push(s), i.push(...r);
      }
    } else
      i = this._plugins;
    requestAnimationFrame(() => {
      i.forEach((s) => {
        this._resetPlugin(s);
      }), requestAnimationFrame(() => {
        e == null || e();
      });
    });
  }
  _resetPlugin(t) {
    const e = t.config, i = t.pluginFactory, s = t.internalBusEvent, r = !t.isRenderable(), o = this.getViewsForPlugin(t);
    o.forEach((h) => {
      h.layoutId && this._layoutIdToViewMap.delete(h.layoutId), h.destroy();
    }), this._views = this._views.filter(
      (h) => !o.find((u) => u.id === h.id)
    ), this._viewsPerPlugin.delete(t.id), this._plugins = this._plugins.filter((h) => h.id !== t.id), r || requestAnimationFrame(() => {
      this.createPlugin(
        i,
        this._eventBus,
        e
      ).setInternalEventBus(s);
    });
  }
  queueNodeToBeCreated(t) {
    this._viewsToBeCreated.push(t);
  }
  queueNodeToBeRemoved(t) {
    this._viewsToBeRemoved.push(t);
  }
  notifyPluginAboutDataChange(t) {
    const e = this._plugins.filter(
      (i) => i.id === t.pluginId
    );
    !e || !e.length || e.forEach((i) => {
      i.notifyAboutDataChanged({
        dataName: t.dataName,
        dataValue: t.dataValue,
        viewName: t.viewName
      });
    });
  }
  getPlugins() {
    return this._plugins;
  }
  getRenderablePlugins() {
    function t(e) {
      return e.isRenderable();
    }
    return this._plugins.filter(t);
  }
  getPluginByName(t, e) {
    return this._plugins.find((i) => e ? i.pluginKey === e && i.pluginName === t : i.pluginName === t);
  }
  getPluginsByName(t, e) {
    return this._plugins.filter((i) => e ? i.pluginKey === e && i.pluginName === t : i.pluginName === t);
  }
  hasPlugin(t) {
    return t.pluginName ? !!this.getPluginByName(t.pluginName) : !1;
  }
  createPlugin(t, e, i = {}, s = !1) {
    if (!t.pluginName)
      throw Error(
        `Plugin ${t.name} must contain a pluginName field`
      );
    let r = [];
    if (t.scope) {
      const u = s ? `[data-vel-plugin=${t.pluginName}][data-vel-view=${t.scope}]:not([data-vel-plugin-id])` : `[data-vel-plugin=${t.pluginName}][data-vel-view=${t.scope}]`, c = document.querySelectorAll(u);
      this._pluginNameToPluginFactoryMap.has(t.pluginName) || this._pluginNameToPluginFactoryMap.set(
        t.pluginName,
        t
      ), this._pluginNameToPluginConfigMap.has(t.pluginName) || this._pluginNameToPluginConfigMap.set(t.pluginName, i), c ? r = Array.from(c) : r = [document.documentElement];
    } else
      r = [document.documentElement];
    const o = r.map((u) => {
      const c = u.dataset.velPluginKey, g = Y(
        t,
        this,
        e,
        this._appEventBus,
        i,
        c
      );
      this._plugins.push(g);
      let d = [];
      u !== document.documentElement && d.push(u);
      const V = u.querySelectorAll(
        `[data-vel-plugin=${g.pluginName}]`
      );
      d = [...d, ...V];
      const m = d.filter((f) => {
        if (!f.parentElement)
          return !0;
        const w = this._getPluginNameForElement(f.parentElement);
        return !(w && w.length > 0);
      });
      return m.length && m.forEach((f) => {
        const w = f.dataset.velView;
        if (!w)
          return;
        const x = this._createNewView(f, w, g);
        g.notifyAboutViewAdded(x);
      }), g;
    });
    if (o && o.length > 0)
      return o[0];
    const h = Y(
      t,
      this,
      e,
      this._appEventBus,
      i
    );
    return t.scope || console.log(
      `%c WARNING: The plugin "${h.pluginName}" is created but there are no elements using it on the page`,
      "background: #885500"
    ), h;
  }
  updatePlugin(t, e, i = {}) {
    return this.createPlugin(t, e, i, !0);
  }
  getViews() {
    return this._views;
  }
  createView(t, e, i) {
    const s = new Te(t, e, this, i);
    return this._views.push(s), this._viewsCreatedInPreviousFrame.push(s), s;
  }
  assignViewToPlugin(t, e) {
    this._viewsPerPlugin.has(e.id) || this._viewsPerPlugin.set(e.id, []);
    const i = this._viewsPerPlugin.get(e.id);
    i.includes(t.id) || i.push(t.id);
  }
  getViewsForPlugin(t) {
    const e = this._viewsPerPlugin.get(t.id);
    return e ? e.map((i) => this._views.find((s) => s.id === i)).filter((i) => !!i) : [];
  }
  getViewsByNameForPlugin(t, e) {
    return this.getViewsForPlugin(t).filter(
      (i) => i.name === e
    );
  }
}
class Vt {
  constructor(t) {
    a(this, "pluginApi"), this.pluginApi = t.pluginApi;
  }
}
class Pt {
  constructor(t) {
    a(this, "pluginApi"), this.pluginApi = t.pluginApi;
  }
}
class ut {
  constructor() {
    a(this, "previousTime", 0), a(this, "registry"), a(this, "eventBus"), a(this, "appEventBus"), this.eventBus = new K(), this.appEventBus = new K(), this.registry = new Ne(this.appEventBus, this.eventBus), new Yt(this.eventBus);
  }
  static create() {
    return new ut();
  }
  addPlugin(t, e = {}) {
    this.registry.hasPlugin(t) || this.registry.createPlugin(t, this.eventBus, e);
  }
  updatePlugin(t, e = {}) {
    this.registry.hasPlugin(t) && this.registry.updatePlugin(t, this.eventBus, e);
  }
  reset(t, e) {
    this.registry.reset(t, e);
  }
  destroy(t, e) {
    this.registry.destroy(t, e);
  }
  getPlugin(t, e) {
    let i = typeof t == "string" ? t : t.pluginName;
    const s = this.registry.getPluginByName(i, e);
    if (!s)
      throw new Error(
        `You can't call getPlugin for ${i} with key: ${e} because it does not exist in your app`
      );
    return s.api;
  }
  getPlugins(t, e) {
    let i = typeof t == "string" ? t : t.pluginName;
    const s = this.registry.getPluginsByName(i, e);
    if (s.length === 0)
      throw new Error(
        `You can't call getPlugins for ${i} with key: ${e} because they don't exist in your app`
      );
    return s.map((r) => r.api);
  }
  onPluginEvent(t, e, i, s) {
    const r = this.registry.getPluginByName(
      t.pluginName,
      s
    );
    r && r.on(e, i);
  }
  removePluginEventListener(t, e, i) {
    const s = this.registry.getPluginByName(t.pluginName);
    s && s.removeListener(e, i);
  }
  run() {
    document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", this.start.bind(this)) : this.start();
  }
  start() {
    this.setup(), requestAnimationFrame(this.tick.bind(this));
  }
  setup() {
    this.listenToNativeEvents(), this.subscribeToEvents();
  }
  listenToNativeEvents() {
    document.addEventListener("click", (t) => {
      this.eventBus.emitEvent(Et, {
        x: t.clientX,
        y: t.clientY,
        target: t.target
      });
    }), document.addEventListener("pointermove", (t) => {
      this.eventBus.emitEvent(J, {
        x: t.clientX,
        y: t.clientY,
        target: t.target
      });
    }), document.addEventListener("pointerdown", (t) => {
      this.eventBus.emitEvent(Q, {
        x: t.clientX,
        y: t.clientY,
        target: t.target
      });
    }), document.addEventListener("pointerup", (t) => {
      this.eventBus.emitEvent(tt, {
        x: t.clientX,
        y: t.clientY,
        target: t.target
      });
    });
  }
  tick(t) {
    let e = (t - this.previousTime) / 1e3;
    e > 0.016 && (e = 1 / 60), this.previousTime = t, this.eventBus.reset(), this.subscribeToEvents(), this.read(), this.update(t, e), this.render(), requestAnimationFrame(this.tick.bind(this));
  }
  subscribeToEvents() {
    this.eventBus.subscribeToEvent(j, this.onNodeAdded.bind(this)), this.eventBus.subscribeToEvent(
      H,
      this.onNodeRemoved.bind(this)
    ), this.eventBus.subscribeToEvent(
      Rt,
      this.onDataChanged.bind(this)
    ), this.registry.getPlugins().forEach((t) => {
      t.subscribeToEvents(this.eventBus);
    });
  }
  onNodeAdded({ node: t }) {
    this.registry.queueNodeToBeCreated(t);
  }
  onNodeRemoved({ node: t }) {
    this.registry.queueNodeToBeRemoved(t);
  }
  onDataChanged(t) {
    this.registry.notifyPluginAboutDataChange(t);
  }
  read() {
    this.registry.getViews().forEach((t) => {
      t.read();
    });
  }
  update(t, e) {
    this.registry.update(), this.registry.getPlugins().slice().reverse().forEach((i) => {
      i.init();
    }), this.registry.getRenderablePlugins().forEach((i) => {
      i.update(t, e);
    }), this.registry.getViews().forEach((i) => {
      i.update(t, e);
    }), this.registry.getViews().forEach((i) => {
      i._updatePreviousRect();
    });
  }
  render() {
    this.registry.getRenderablePlugins().forEach((t) => {
      t.render();
    }), this.registry.getViews().forEach((t) => {
      t.render();
    });
  }
}
function Ie() {
  return ut.create();
}
class Tt {
  constructor(t) {
    a(this, "view"), a(this, "previousX"), a(this, "previousY"), a(this, "x"), a(this, "y"), a(this, "pointerX"), a(this, "pointerY"), a(this, "isDragging"), a(this, "target"), a(this, "directions", []), a(this, "width"), a(this, "height"), a(this, "distance"), this.props = t, this.previousX = t.previousX, this.previousY = t.previousY, this.x = t.x, this.y = t.y, this.pointerX = t.pointerX, this.pointerY = t.pointerY, this.width = t.width, this.height = t.height, this.distance = t.distance, this.view = t.view, this.isDragging = t.isDragging, this.target = t.target, this.directions = t.directions;
  }
}
class Nt extends et {
  constructor() {
    super(...arguments), a(this, "_pointerX", 0), a(this, "_pointerY", 0), a(this, "_initialPointer", new l(0, 0)), a(this, "_initialPointerPerView", /* @__PURE__ */ new Map()), a(this, "_pointerDownPerView", /* @__PURE__ */ new Map()), a(this, "_targetPerView", /* @__PURE__ */ new Map()), a(this, "_viewPointerPositionLog", /* @__PURE__ */ new Map());
  }
  setup() {
    document.addEventListener("selectstart", this.onSelect.bind(this));
  }
  onSelect(t) {
    this._isDragging && t.preventDefault();
  }
  get _isDragging() {
    return Array.from(this._pointerDownPerView.values()).some(
      (t) => !!t
    );
  }
  subscribeToEvents(t) {
    t.subscribeToEvent(Q, ({ x: e, y: i, target: s }) => {
      this._initialPointer = new l(e, i), this.getViews().forEach((r) => {
        this._pointerDownPerView.set(r.id, r.intersects(e, i)), this._targetPerView.set(r.id, s);
        const o = new l(
          e - r.position.x,
          i - r.position.y
        );
        this._pointerX = e, this._pointerY = i, this._initialPointerPerView.set(r.id, o);
      });
    }), t.subscribeToEvent(tt, () => {
      this.getViews().forEach((e) => {
        this._pointerDownPerView.get(e.id) && this._initialPointerPerView.get(e.id) && (this._pointerDownPerView.set(e.id, !1), this._emitEvent(e, []));
      });
    }), t.subscribeToEvent(J, ({ x: e, y: i }) => {
      this._pointerX = e, this._pointerY = i, this.getViews().forEach((s) => {
        if (this._pointerDownPerView.get(s.id) && this._initialPointerPerView.get(s.id)) {
          this._viewPointerPositionLog.has(s.id) || this._viewPointerPositionLog.set(s.id, []);
          const r = new l(e, i), o = this._viewPointerPositionLog.get(s.id);
          o && o.push(new l(e, i));
          const h = o && o.length >= 2 ? o[o.length - 2] : r.clone(), u = this._calculateDirections(
            h,
            r
          );
          this._emitEvent(s, u);
        }
      });
    });
  }
  _emitEvent(t, e) {
    const i = this._viewPointerPositionLog.get(t.id), s = i && i.length >= 2 ? i[i.length - 2] : null, r = this._pointerX - this._initialPointerPerView.get(t.id).x, o = this._pointerY - this._initialPointerPerView.get(t.id).y, h = this._pointerX, u = this._pointerY, c = s ? s.x - this._initialPointerPerView.get(t.id).x : r, g = s ? s.y - this._initialPointerPerView.get(t.id).y : o, d = this._pointerY - this._initialPointer.y, V = this._pointerX - this._initialPointer.x, m = Zt(this._initialPointer, {
      x: this._pointerX,
      y: this._pointerY
    }), f = this._targetPerView.get(t.id);
    if (!f || !t.hasElement(f))
      return;
    const w = this._pointerDownPerView.get(t.id) === !0;
    w || this._viewPointerPositionLog.clear();
    const x = {
      view: t,
      target: f,
      previousX: c,
      previousY: g,
      x: r,
      y: o,
      pointerX: h,
      pointerY: u,
      distance: m,
      width: V,
      height: d,
      isDragging: w,
      directions: e
    };
    this.emit(Tt, x);
  }
  _calculateDirections(t, e) {
    const i = {
      up: l.sub(new l(t.x, t.y - 1), t),
      down: l.sub(new l(t.x, t.y + 1), t),
      left: l.sub(new l(t.x - 1, t.y), t),
      right: l.sub(new l(t.x + 1, t.y), t)
    }, s = l.sub(e, t).unitVector;
    return [
      { direction: "up", projection: s.dot(i.up) },
      {
        direction: "down",
        projection: s.dot(i.down)
      },
      {
        direction: "left",
        projection: s.dot(i.left)
      },
      {
        direction: "right",
        projection: s.dot(i.right)
      }
    ].filter(
      (r) => r.projection > 0
    ).map(
      (r) => r.direction
    );
  }
}
a(Nt, "pluginName", "DragEventPlugin");
class Ce {
  constructor(t) {
    a(this, "view"), a(this, "direction"), this.props = t, this.view = t.view, this.direction = t.direction;
  }
}
class Le extends et {
  constructor() {
    super(...arguments), a(this, "_viewIsPointerDownMap", /* @__PURE__ */ new Map()), a(this, "_viewPointerPositionLog", /* @__PURE__ */ new Map()), a(this, "_targetPerView", /* @__PURE__ */ new Map());
  }
  subscribeToEvents(t) {
    t.subscribeToEvent(Q, ({ x: e, y: i, target: s }) => {
      this.getViews().forEach((r) => {
        this._targetPerView.set(r.id, s), r.intersects(e, i) && this._viewIsPointerDownMap.set(r.id, !0);
      });
    }), t.subscribeToEvent(J, ({ x: e, y: i }) => {
      this.getViews().forEach((s) => {
        this._viewIsPointerDownMap.get(s.id) && (this._viewPointerPositionLog.has(s.id) || this._viewPointerPositionLog.set(s.id, []), this._viewPointerPositionLog.get(s.id).push(new l(e, i)));
      });
    }), t.subscribeToEvent(tt, ({ x: e, y: i }) => {
      this.getViews().forEach((r) => {
        if (!this._viewIsPointerDownMap.get(r.id) || !this._viewPointerPositionLog.has(r.id))
          return;
        const o = new l(e, i), h = this._viewPointerPositionLog.get(r.id), u = h[h.length - 2] || o.clone(), c = this._targetPerView.get(r.id), g = s(u, o);
        c && r.hasElement(c) && g.hasSwiped && this.emit(Ce, {
          view: r,
          direction: g.direction
        }), this._viewPointerPositionLog.set(r.id, []), this._viewIsPointerDownMap.set(r.id, !1);
      });
      function s(r, o) {
        const h = {
          up: l.sub(new l(r.x, r.y - 1), r),
          down: l.sub(new l(r.x, r.y + 1), r),
          left: l.sub(new l(r.x - 1, r.y), r),
          right: l.sub(new l(r.x + 1, r.y), r)
        }, u = l.sub(o, r).unitVector, c = [
          "up",
          "down",
          "left",
          "right"
        ], g = [
          u.dot(h.up),
          u.dot(h.down),
          u.dot(h.left),
          u.dot(h.right)
        ], d = Math.max(...g), V = g.indexOf(d), m = c[V], f = l.sub(o, r).magnitude;
        return {
          hasSwiped: u.dot(h[m]) * f > 30,
          direction: m
        };
      }
    });
  }
}
a(Le, "pluginName", "SwipeEventPlugin");
class Be {
  constructor(t) {
    a(this, "view"), this.props = t, this.view = t.view;
  }
}
class Fe extends et {
  subscribeToEvents(t) {
    t.subscribeToEvent(Et, ({ x: e, y: i, target: s }) => {
      this.getViews().forEach((r) => {
        const o = s, h = r.element === o || r.element.contains(o);
        r.intersects(e, i) && h && this.emit(Be, {
          view: r
        });
      });
    });
  }
}
a(Fe, "pluginName", "ClickEventPlugin");
class It {
  constructor(t) {
    R(this, "data");
    this.data = t.data;
  }
}
class Ct {
  constructor(t) {
    R(this, "data");
    this.data = t.data;
  }
}
function bt(n) {
  return {
    map: new Map(n),
    array: Array.from(n).map(([e, i]) => ({ slot: e, item: i })),
    object: Array.from(n).reduce(
      (e, [i, s]) => (e[i] = s, e),
      {}
    )
  };
}
const I = (n) => {
  const t = n.useEventPlugin(Nt);
  t.on(Tt, U);
  let e, i, s, r, o = /* @__PURE__ */ new Map(), h, u, c, g, d = !1, V = !0, m;
  n.api({
    setEnabled(v) {
      V = v;
    }
  });
  function f() {
    return {
      animation: e.data.configAnimation
    };
  }
  function w() {
    const v = f().animation;
    return v === "dynamic" ? {
      animator: "dynamic",
      config: {}
    } : v === "spring" ? {
      animator: "spring",
      config: {
        damping: 0.7,
        stiffness: 0.62
      }
    } : v === "none" ? {
      animator: "instant",
      config: {}
    } : {
      animator: "instant",
      config: {}
    };
  }
  n.setup(() => {
    e = n.getView("root"), i = n.getViews("slot"), s = n.getViews("item");
    const v = w();
    s.forEach((p) => {
      p.styles.position = "relative", p.styles.touchAction = "none", p.position.setAnimator(v.animator, v.config), p.scale.setAnimator(v.animator, v.config), p.layoutTransition(!0), t.addView(p);
      const A = p.getParent("slot").element;
      o.set(A.dataset.swapySlot, p.element.dataset.swapyItem);
      const E = p.getChild("handle");
      E && (E.position.setAnimator("instant"), E.scale.setAnimator("instant"));
    }), n.getViews("root-child").forEach((p) => {
      p.position.setAnimator(v.animator, v.config), p.scale.setAnimator(v.animator, v.config), p.layoutTransition(!0);
    }), n.emit(Ct, { data: bt(o) });
  });
  function x() {
    if (!m) return;
    if (!h || !u) {
      const E = r.getScroll();
      h = m.pointerX - r.position.x + E.x, u = m.pointerY - r.position.y + E.y;
    }
    (!c || !g) && (c = r.size.width, g = r.size.height);
    const v = r.size.width / c, b = r.size.height / g, p = h * (v - 1), A = u * (b - 1);
    r.position.set(
      {
        x: m.x - p,
        y: m.y - A
      },
      r.scale.x !== 1 || r.scale.y !== 1
    );
  }
  function U(v) {
    if (!V) return;
    r = v.view;
    const b = r.getChild("handle");
    if (b) {
      const p = w();
      b.position.setAnimator(p.animator, p.config), b.scale.setAnimator(p.animator, p.config);
    }
    !d && b && !b.intersects(v.pointerX, v.pointerY) || (d = !0, v.isDragging ? (m = v, x(), i.forEach((p) => {
      var L;
      const A = r.getParent("slot");
      if (!p.intersects(v.pointerX, v.pointerY)) {
        p !== A && p.element.removeAttribute("data-swapy-highlighted");
        return;
      }
      const E = p.element.dataset.swapySlot, S = (L = p.getChild("item")) == null ? void 0 : L.element.dataset.swapyItem, P = A.element.dataset.swapySlot, C = r.element.dataset.swapyItem;
      !E || !P || !C || (p.element.dataset.swapyHighlighted = "", o.set(E, C), S ? o.set(P, S) : o.set(P, null), n.emit(It, { data: bt(o) }));
    }), s.forEach((p) => {
      p.styles.zIndex = p === r ? "2" : "";
    })) : (i.forEach((p) => {
      p.element.removeAttribute("data-swapy-highlighted");
    }), r.position.reset(), h = null, u = null, c = null, g = null, d = !1, m = null), requestAnimationFrame(() => {
      x();
    }));
  }
};
I.pluginName = "Swapy";
I.scope = "root";
let T;
function Se() {
  return T ? (T.updatePlugin(I), T) : (T = Ie(), T.addPlugin(I), T.run(), T);
}
const Me = {
  animation: "dynamic"
};
function ke(n) {
  let t = !0;
  const e = n.querySelectorAll("[data-swapy-slot]");
  return e.length === 0 && (console.error("There are no slots defined in your root element:", n), t = !1), e.forEach((i) => {
    const s = i, r = s.dataset.swapySlot;
    (!r || r.length === 0) && (console.error(i, "does not contain a slotId using data-swapy-slot"), t = !1);
    const o = s.children;
    o.length > 1 && (console.error(
      "slot:",
      `"${r}"`,
      "cannot contain more than one element"
    ), t = !1);
    const h = o[0];
    h && (!h.dataset.swapyItem || h.dataset.swapyItem.length === 0) && (console.error(
      "slot:",
      `"${r}"`,
      "does not contain an element with item id using data-swapy-item"
    ), t = !1);
  }), t;
}
function $e(n, t = {}) {
  const e = Dt();
  return n.dataset.velPluginKey = e, n.dataset.velPlugin = "Swapy", n.dataset.velView = "root", n.dataset.velDataConfigAnimation = t.animation, Array.from(
    n.querySelectorAll("[data-swapy-slot]")
  ).forEach((r) => {
    r.dataset.velView = "slot";
  }), Array.from(
    n.querySelectorAll("[data-swapy-item]")
  ).forEach((r) => {
    r.dataset.velView = "item", r.dataset.velLayoutId = r.dataset.swapyItem;
    const o = r.querySelector("[data-swapy-handle]");
    o && (o.dataset.velView = "handle");
  }), e;
}
function Oe(n, t = {}) {
  if (!n)
    throw new Error(
      "Cannot create a Swapy instance because the element you provided does not exist on the page!"
    );
  const e = { ...Me, ...t }, i = n;
  if (!ke(i))
    throw new Error(
      "Cannot create a Swapy instance because your HTML structure is invalid. Fix all above errors and then try!"
    );
  const s = $e(i, e), r = new ze(i, s);
  return {
    onSwap(o) {
      r.setSwapCallback(o);
    },
    enable(o) {
      r.setEnabled(o);
    }
  };
}
class ze {
  constructor(t, e) {
    R(this, "_rootEl");
    R(this, "_veloxiApp");
    R(this, "_slotElMap");
    R(this, "_itemElMap");
    R(this, "_swapCallback");
    R(this, "_previousMap");
    this._rootEl = t, this._veloxiApp = Se(), this._slotElMap = this._createSlotElMap(), this._itemElMap = this._createItemElMap(), this._veloxiApp.onPluginEvent(
      I,
      Ct,
      ({ data: i }) => {
        this._previousMap = i.map;
      },
      e
    ), this._veloxiApp.onPluginEvent(
      I,
      It,
      (i) => {
        var s;
        this._previousMap && $t(this._previousMap, i.data.map) || (this._applyOrder(i.data.map), (s = this._swapCallback) == null || s.call(this, i), this._previousMap = i.data.map);
      },
      e
    );
  }
  setEnabled(t) {
    this._veloxiApp.getPlugin("Swapy").setEnabled(t);
  }
  setSwapCallback(t) {
    this._swapCallback = t;
  }
  _applyOrder(t) {
    Array.from(t.keys()).forEach((e) => {
      const i = t.get(e);
      if (!i) return;
      const s = this._slotElMap.get(e), r = this._itemElMap.get(i);
      !s || !r || (s.innerHTML = "", s.appendChild(r));
    });
  }
  _createSlotElMap() {
    return Array.from(
      this._rootEl.querySelectorAll("[data-swapy-slot]")
    ).reduce((t, e) => (t.set(e.dataset.swapySlot, e), t), /* @__PURE__ */ new Map());
  }
  _createItemElMap() {
    return Array.from(
      this._rootEl.querySelectorAll("[data-swapy-item]")
    ).reduce((t, e) => (t.set(e.dataset.swapyItem, e), t), /* @__PURE__ */ new Map());
  }
}
export {
  Oe as createSwapy
};
