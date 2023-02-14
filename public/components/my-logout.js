/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t = window,
  i =
    t.ShadowRoot &&
    (void 0 === t.ShadyCSS || t.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  s = Symbol(),
  e = new WeakMap()
class o {
  constructor(t, i, e) {
    if (((this._$cssResult$ = !0), e !== s))
      throw Error('CSSResult is not constructable. Use `unsafeCSS` or `css` instead.')
      ; (this.cssText = t), (this.t = i)
  }
  get styleSheet() {
    let t = this.o
    const s = this.t
    if (i && void 0 === t) {
      const i = void 0 !== s && 1 === s.length
      i && (t = e.get(s)),
        void 0 === t && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && e.set(s, t))
    }
    return t
  }
  toString() {
    return this.cssText
  }
}
const n = i
  ? (t) => t
  : (t) =>
    t instanceof CSSStyleSheet
      ? ((t) => {
        let i = ''
        for (const s of t.cssRules) i += s.cssText
        return ((t) => new o('string' === typeof t ? t : t + '', void 0, s))(i)
      })(t)
      : t
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var r
const h = window,
  l = h.trustedTypes,
  u = l ? l.emptyScript : '',
  d = h.reactiveElementPolyfillSupport,
  a = {
    toAttribute(t, i) {
      switch (i) {
        case Boolean:
          t = t ? u : null
          break
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t)
      }
      return t
    },
    fromAttribute(t, i) {
      let s = t
      switch (i) {
        case Boolean:
          s = null !== t
          break
        case Number:
          s = null === t ? null : Number(t)
          break
        case Object:
        case Array:
          try {
            s = JSON.parse(t)
          } catch (t) {
            s = null
          }
      }
      return s
    },
  },
  c = (t, i) => i !== t && (i == i || t == t),
  v = { attribute: !0, type: String, converter: a, reflect: !1, hasChanged: c }
class f extends HTMLElement {
  constructor() {
    super(), (this._$Ei = new Map()), (this.isUpdatePending = !1), (this.hasUpdated = !1), (this._$El = null), this.u()
  }
  static addInitializer(t) {
    var i
    this.finalize(), (null !== (i = this.h) && void 0 !== i ? i : (this.h = [])).push(t)
  }
  static get observedAttributes() {
    this.finalize()
    const t = []
    return (
      this.elementProperties.forEach((i, s) => {
        const e = this._$Ep(s, i)
        void 0 !== e && (this._$Ev.set(e, s), t.push(e))
      }),
      t
    )
  }
  static createProperty(t, i = v) {
    if (
      (i.state && (i.attribute = !1),
        this.finalize(),
        this.elementProperties.set(t, i),
        !i.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' === typeof t ? Symbol() : '__' + t,
        e = this.getPropertyDescriptor(t, s, i)
      void 0 !== e && Object.defineProperty(this.prototype, t, e)
    }
  }
  static getPropertyDescriptor(t, i, s) {
    return {
      get() {
        return this[ i ]
      },
      set(e) {
        const o = this[ t ]
          ; (this[ i ] = e), this.requestUpdate(t, o, s)
      },
      configurable: !0,
      enumerable: !0,
    }
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || v
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1
    this.finalized = !0
    const t = Object.getPrototypeOf(this)
    if (
      (t.finalize(),
        void 0 !== t.h && (this.h = [ ...t.h ]),
        (this.elementProperties = new Map(t.elementProperties)),
        (this._$Ev = new Map()),
        this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        i = [ ...Object.getOwnPropertyNames(t), ...Object.getOwnPropertySymbols(t) ]
      for (const s of i) this.createProperty(s, t[ s ])
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0
  }
  static finalizeStyles(t) {
    const i = []
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse())
      for (const t of s) i.unshift(n(t))
    } else void 0 !== t && i.push(n(t))
    return i
  }
  static _$Ep(t, i) {
    const s = i.attribute
    return !1 === s ? void 0 : 'string' === typeof s ? s : 'string' === typeof t ? t.toLowerCase() : void 0
  }
  u() {
    var t
      ; (this._$E_ = new Promise((t) => (this.enableUpdating = t))),
        (this._$AL = new Map()),
        this._$Eg(),
        this.requestUpdate(),
        null === (t = this.constructor.h) || void 0 === t || t.forEach((t) => t(this))
  }
  addController(t) {
    var i, s
      ; (null !== (i = this._$ES) && void 0 !== i ? i : (this._$ES = [])).push(t),
        void 0 !== this.renderRoot && this.isConnected && (null === (s = t.hostConnected) || void 0 === s || s.call(t))
  }
  removeController(t) {
    var i
    null === (i = this._$ES) || void 0 === i || i.splice(this._$ES.indexOf(t) >>> 0, 1)
  }
  _$Eg() {
    this.constructor.elementProperties.forEach((t, i) => {
      this.hasOwnProperty(i) && (this._$Ei.set(i, this[ i ]), delete this[ i ])
    })
  }
  createRenderRoot() {
    var s
    const e = null !== (s = this.shadowRoot) && void 0 !== s ? s : this.attachShadow(this.constructor.shadowRootOptions)
    return (
      ((s, e) => {
        i
          ? (s.adoptedStyleSheets = e.map((t) => (t instanceof CSSStyleSheet ? t : t.styleSheet)))
          : e.forEach((i) => {
            const e = document.createElement('style'),
              o = t.litNonce
            void 0 !== o && e.setAttribute('nonce', o), (e.textContent = i.cssText), s.appendChild(e)
          })
      })(e, this.constructor.elementStyles),
      e
    )
  }
  connectedCallback() {
    var t
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((t) => {
        var i
        return null === (i = t.hostConnected) || void 0 === i ? void 0 : i.call(t)
      })
  }
  enableUpdating(t) { }
  disconnectedCallback() {
    var t
    null === (t = this._$ES) ||
      void 0 === t ||
      t.forEach((t) => {
        var i
        return null === (i = t.hostDisconnected) || void 0 === i ? void 0 : i.call(t)
      })
  }
  attributeChangedCallback(t, i, s) {
    this._$AK(t, s)
  }
  _$EO(t, i, s = v) {
    var e
    const o = this.constructor._$Ep(t, s)
    if (void 0 !== o && !0 === s.reflect) {
      const n = (
        void 0 !== (null === (e = s.converter) || void 0 === e ? void 0 : e.toAttribute) ? s.converter : a
      ).toAttribute(i, s.type)
        ; (this._$El = t), null == n ? this.removeAttribute(o) : this.setAttribute(o, n), (this._$El = null)
    }
  }
  _$AK(t, i) {
    var s
    const e = this.constructor,
      o = e._$Ev.get(t)
    if (void 0 !== o && this._$El !== o) {
      const t = e.getPropertyOptions(o),
        n =
          'function' === typeof t.converter
            ? { fromAttribute: t.converter }
            : void 0 !== (null === (s = t.converter) || void 0 === s ? void 0 : s.fromAttribute)
              ? t.converter
              : a
        ; (this._$El = o), (this[ o ] = n.fromAttribute(i, t.type)), (this._$El = null)
    }
  }
  requestUpdate(t, i, s) {
    let e = !0
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || c)(this[ t ], i)
        ? (this._$AL.has(t) || this._$AL.set(t, i),
          !0 === s.reflect && this._$El !== t && (void 0 === this._$EC && (this._$EC = new Map()), this._$EC.set(t, s)))
        : (e = !1)),
      !this.isUpdatePending && e && (this._$E_ = this._$Ej())
  }
  async _$Ej() {
    this.isUpdatePending = !0
    try {
      await this._$E_
    } catch (t) {
      Promise.reject(t)
    }
    const t = this.scheduleUpdate()
    return null != t && (await t), !this.isUpdatePending
  }
  scheduleUpdate() {
    return this.performUpdate()
  }
  performUpdate() {
    var t
    if (!this.isUpdatePending) return
    this.hasUpdated, this._$Ei && (this._$Ei.forEach((t, i) => (this[ i ] = t)), (this._$Ei = void 0))
    let i = !1
    const s = this._$AL
    try {
      ; (i = this.shouldUpdate(s)),
        i
          ? (this.willUpdate(s),
            null === (t = this._$ES) ||
            void 0 === t ||
            t.forEach((t) => {
              var i
              return null === (i = t.hostUpdate) || void 0 === i ? void 0 : i.call(t)
            }),
            this.update(s))
          : this._$Ek()
    } catch (t) {
      throw ((i = !1), this._$Ek(), t)
    }
    i && this._$AE(s)
  }
  willUpdate(t) { }
  _$AE(t) {
    var i
    null === (i = this._$ES) ||
      void 0 === i ||
      i.forEach((t) => {
        var i
        return null === (i = t.hostUpdated) || void 0 === i ? void 0 : i.call(t)
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t)
  }
  _$Ek() {
    ; (this._$AL = new Map()), (this.isUpdatePending = !1)
  }
  get updateComplete() {
    return this.getUpdateComplete()
  }
  getUpdateComplete() {
    return this._$E_
  }
  shouldUpdate(t) {
    return !0
  }
  update(t) {
    void 0 !== this._$EC && (this._$EC.forEach((t, i) => this._$EO(i, this[ i ], t)), (this._$EC = void 0)), this._$Ek()
  }
  updated(t) { }
  firstUpdated(t) { }
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var p
  ; (f.finalized = !0),
    (f.elementProperties = new Map()),
    (f.elementStyles = []),
    (f.shadowRootOptions = { mode: 'open' }),
    null == d || d({ ReactiveElement: f }),
    (null !== (r = h.reactiveElementVersions) && void 0 !== r ? r : (h.reactiveElementVersions = [])).push('1.6.1')
const g = window,
  b = g.trustedTypes,
  y = b ? b.createPolicy('lit-html', { createHTML: (t) => t }) : void 0,
  w = `lit$${(Math.random() + '').slice(9)}$`,
  m = '?' + w,
  $ = `<${m}>`,
  S = document,
  A = (t = '') => S.createComment(t),
  _ = (t) => null === t || ('object' !== typeof t && 'function' !== typeof t),
  C = Array.isArray,
  k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  x = /-->/g,
  E = />/g,
  U = RegExp('>|[ \t\n\f\r](?:([^\\s"\'>=/]+)([ \t\n\f\r]*=[ \t\n\f\r]*(?:[^ \t\n\f\r"\'`<>=]|("|\')|))|$)', 'g'),
  j = /'/g,
  O = /"/g,
  M = /^(?:script|style|textarea|title)$/i,
  T = (
    (t) =>
      (i, ...s) => ({ _$litType$: t, strings: i, values: s })
  )(1),
  N = Symbol.for('lit-noChange'),
  R = Symbol.for('lit-nothing'),
  L = new WeakMap(),
  z = S.createTreeWalker(S, 129, null, !1),
  I = (t, i) => {
    const s = t.length - 1,
      e = []
    let o,
      n = 2 === i ? '<svg>' : '',
      r = k
    for (let i = 0; i < s; i++) {
      const s = t[ i ]
      let h,
        l,
        u = -1,
        d = 0
      for (; d < s.length && ((r.lastIndex = d), (l = r.exec(s)), null !== l);)
        (d = r.lastIndex),
          r === k
            ? '!--' === l[ 1 ]
              ? (r = x)
              : void 0 !== l[ 1 ]
                ? (r = E)
                : void 0 !== l[ 2 ]
                  ? (M.test(l[ 2 ]) && (o = RegExp('</' + l[ 2 ], 'g')), (r = U))
                  : void 0 !== l[ 3 ] && (r = U)
            : r === U
              ? '>' === l[ 0 ]
                ? ((r = null != o ? o : k), (u = -1))
                : void 0 === l[ 1 ]
                  ? (u = -2)
                  : ((u = r.lastIndex - l[ 2 ].length), (h = l[ 1 ]), (r = void 0 === l[ 3 ] ? U : '"' === l[ 3 ] ? O : j))
              : r === O || r === j
                ? (r = U)
                : r === x || r === E
                  ? (r = k)
                  : ((r = U), (o = void 0))
      const a = r === U && t[ i + 1 ].startsWith('/>') ? ' ' : ''
      n +=
        r === k
          ? s + $
          : u >= 0
            ? (e.push(h), s.slice(0, u) + '$lit$' + s.slice(u) + w + a)
            : s + w + (-2 === u ? (e.push(void 0), i) : a)
    }
    const h = n + (t[ s ] || '<?>') + (2 === i ? '</svg>' : '')
    if (!Array.isArray(t) || !t.hasOwnProperty('raw')) throw Error('invalid template strings array')
    return [ void 0 !== y ? y.createHTML(h) : h, e ]
  }
class P {
  constructor({ strings: t, _$litType$: i }, s) {
    let e
    this.parts = []
    let o = 0,
      n = 0
    const r = t.length - 1,
      h = this.parts,
      [ l, u ] = I(t, i)
    if (((this.el = P.createElement(l, s)), (z.currentNode = this.el.content), 2 === i)) {
      const t = this.el.content,
        i = t.firstChild
      i.remove(), t.append(...i.childNodes)
    }
    for (; null !== (e = z.nextNode()) && h.length < r;) {
      if (1 === e.nodeType) {
        if (e.hasAttributes()) {
          const t = []
          for (const i of e.getAttributeNames())
            if (i.endsWith('$lit$') || i.startsWith(w)) {
              const s = u[ n++ ]
              if ((t.push(i), void 0 !== s)) {
                const t = e.getAttribute(s.toLowerCase() + '$lit$').split(w),
                  i = /([.?@])?(.*)/.exec(s)
                h.push({
                  type: 1,
                  index: o,
                  name: i[ 2 ],
                  strings: t,
                  ctor: '.' === i[ 1 ] ? K : '?' === i[ 1 ] ? Z : '@' === i[ 1 ] ? q : J,
                })
              } else h.push({ type: 6, index: o })
            }
          for (const i of t) e.removeAttribute(i)
        }
        if (M.test(e.tagName)) {
          const t = e.textContent.split(w),
            i = t.length - 1
          if (i > 0) {
            e.textContent = b ? b.emptyScript : ''
            for (let s = 0; s < i; s++) e.append(t[ s ], A()), z.nextNode(), h.push({ type: 2, index: ++o })
            e.append(t[ i ], A())
          }
        }
      } else if (8 === e.nodeType)
        if (e.data === m) h.push({ type: 2, index: o })
        else {
          let t = -1
          for (; -1 !== (t = e.data.indexOf(w, t + 1));) h.push({ type: 7, index: o }), (t += w.length - 1)
        }
      o++
    }
  }
  static createElement(t, i) {
    const s = S.createElement('template')
    return (s.innerHTML = t), s
  }
}
function B(t, i, s = t, e) {
  var o, n, r, h
  if (i === N) return i
  let l = void 0 !== e ? (null === (o = s._$Co) || void 0 === o ? void 0 : o[ e ]) : s._$Cl
  const u = _(i) ? void 0 : i._$litDirective$
  return (
    (null == l ? void 0 : l.constructor) !== u &&
    (null === (n = null == l ? void 0 : l._$AO) || void 0 === n || n.call(l, !1),
      void 0 === u ? (l = void 0) : ((l = new u(t)), l._$AT(t, s, e)),
      void 0 !== e ? ((null !== (r = (h = s)._$Co) && void 0 !== r ? r : (h._$Co = []))[ e ] = l) : (s._$Cl = l)),
    void 0 !== l && (i = B(t, l._$AS(t, i.values), l, e)),
    i
  )
}
class H {
  constructor(t, i) {
    ; (this.u = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = i)
  }
  get parentNode() {
    return this._$AM.parentNode
  }
  get _$AU() {
    return this._$AM._$AU
  }
  v(t) {
    var i
    const {
      el: { content: s },
      parts: e,
    } = this._$AD,
      o = (null !== (i = null == t ? void 0 : t.creationScope) && void 0 !== i ? i : S).importNode(s, !0)
    z.currentNode = o
    let n = z.nextNode(),
      r = 0,
      h = 0,
      l = e[ 0 ]
    for (; void 0 !== l;) {
      if (r === l.index) {
        let i
        2 === l.type
          ? (i = new D(n, n.nextSibling, this, t))
          : 1 === l.type
            ? (i = new l.ctor(n, l.name, l.strings, this, t))
            : 6 === l.type && (i = new V(n, this, t)),
          this.u.push(i),
          (l = e[ ++h ])
      }
      r !== (null == l ? void 0 : l.index) && ((n = z.nextNode()), r++)
    }
    return o
  }
  p(t) {
    let i = 0
    for (const s of this.u)
      void 0 !== s && (void 0 !== s.strings ? (s._$AI(t, s, i), (i += s.strings.length - 2)) : s._$AI(t[ i ])), i++
  }
}
class D {
  constructor(t, i, s, e) {
    var o
      ; (this.type = 2),
        (this._$AH = R),
        (this._$AN = void 0),
        (this._$AA = t),
        (this._$AB = i),
        (this._$AM = s),
        (this.options = e),
        (this._$Cm = null === (o = null == e ? void 0 : e.isConnected) || void 0 === o || o)
  }
  get _$AU() {
    var t, i
    return null !== (i = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) && void 0 !== i ? i : this._$Cm
  }
  get parentNode() {
    let t = this._$AA.parentNode
    const i = this._$AM
    return void 0 !== i && 11 === t.nodeType && (t = i.parentNode), t
  }
  get startNode() {
    return this._$AA
  }
  get endNode() {
    return this._$AB
  }
  _$AI(t, i = this) {
    ; (t = B(this, t, i)),
      _(t)
        ? t === R || null == t || '' === t
          ? (this._$AH !== R && this._$AR(), (this._$AH = R))
          : t !== this._$AH && t !== N && this.g(t)
        : void 0 !== t._$litType$
          ? this.$(t)
          : void 0 !== t.nodeType
            ? this.T(t)
            : ((t) => C(t) || 'function' === typeof (null == t ? void 0 : t[ Symbol.iterator ]))(t)
              ? this.k(t)
              : this.g(t)
  }
  O(t, i = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, i)
  }
  T(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.O(t)))
  }
  g(t) {
    this._$AH !== R && _(this._$AH) ? (this._$AA.nextSibling.data = t) : this.T(S.createTextNode(t)), (this._$AH = t)
  }
  $(t) {
    var i
    const { values: s, _$litType$: e } = t,
      o = 'number' === typeof e ? this._$AC(t) : (void 0 === e.el && (e.el = P.createElement(e.h, this.options)), e)
    if ((null === (i = this._$AH) || void 0 === i ? void 0 : i._$AD) === o) this._$AH.p(s)
    else {
      const t = new H(o, this),
        i = t.v(this.options)
      t.p(s), this.T(i), (this._$AH = t)
    }
  }
  _$AC(t) {
    let i = L.get(t.strings)
    return void 0 === i && L.set(t.strings, (i = new P(t))), i
  }
  k(t) {
    C(this._$AH) || ((this._$AH = []), this._$AR())
    const i = this._$AH
    let s,
      e = 0
    for (const o of t)
      e === i.length ? i.push((s = new D(this.O(A()), this.O(A()), this, this.options))) : (s = i[ e ]), s._$AI(o), e++
    e < i.length && (this._$AR(s && s._$AB.nextSibling, e), (i.length = e))
  }
  _$AR(t = this._$AA.nextSibling, i) {
    var s
    for (null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, i); t && t !== this._$AB;) {
      const i = t.nextSibling
      t.remove(), (t = i)
    }
  }
  setConnected(t) {
    var i
    void 0 === this._$AM && ((this._$Cm = t), null === (i = this._$AP) || void 0 === i || i.call(this, t))
  }
}
class J {
  constructor(t, i, s, e, o) {
    ; (this.type = 1),
      (this._$AH = R),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = i),
      (this._$AM = e),
      (this.options = o),
      s.length > 2 || '' !== s[ 0 ] || '' !== s[ 1 ]
        ? ((this._$AH = Array(s.length - 1).fill(new String())), (this.strings = s))
        : (this._$AH = R)
  }
  get tagName() {
    return this.element.tagName
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(t, i = this, s, e) {
    const o = this.strings
    let n = !1
    if (void 0 === o) (t = B(this, t, i, 0)), (n = !_(t) || (t !== this._$AH && t !== N)), n && (this._$AH = t)
    else {
      const e = t
      let r, h
      for (t = o[ 0 ], r = 0; r < o.length - 1; r++)
        (h = B(this, e[ s + r ], i, r)),
          h === N && (h = this._$AH[ r ]),
          n || (n = !_(h) || h !== this._$AH[ r ]),
          h === R ? (t = R) : t !== R && (t += (null != h ? h : '') + o[ r + 1 ]),
          (this._$AH[ r ] = h)
    }
    n && !e && this.j(t)
  }
  j(t) {
    t === R ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, null != t ? t : '')
  }
}
class K extends J {
  constructor() {
    super(...arguments), (this.type = 3)
  }
  j(t) {
    this.element[ this.name ] = t === R ? void 0 : t
  }
}
const W = b ? b.emptyScript : ''
class Z extends J {
  constructor() {
    super(...arguments), (this.type = 4)
  }
  j(t) {
    t && t !== R ? this.element.setAttribute(this.name, W) : this.element.removeAttribute(this.name)
  }
}
class q extends J {
  constructor(t, i, s, e, o) {
    super(t, i, s, e, o), (this.type = 5)
  }
  _$AI(t, i = this) {
    var s
    if ((t = null !== (s = B(this, t, i, 0)) && void 0 !== s ? s : R) === N) return
    const e = this._$AH,
      o = (t === R && e !== R) || t.capture !== e.capture || t.once !== e.once || t.passive !== e.passive,
      n = t !== R && (e === R || o)
    o && this.element.removeEventListener(this.name, this, e),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t)
  }
  handleEvent(t) {
    var i, s
    'function' === typeof this._$AH
      ? this._$AH.call(
        null !== (s = null === (i = this.options) || void 0 === i ? void 0 : i.host) && void 0 !== s
          ? s
          : this.element,
        t,
      )
      : this._$AH.handleEvent(t)
  }
}
class V {
  constructor(t, i, s) {
    ; (this.element = t), (this.type = 6), (this._$AN = void 0), (this._$AM = i), (this.options = s)
  }
  get _$AU() {
    return this._$AM._$AU
  }
  _$AI(t) {
    B(this, t)
  }
}
const F = g.litHtmlPolyfillSupport
null == F || F(P, D), (null !== (p = g.litHtmlVersions) && void 0 !== p ? p : (g.litHtmlVersions = [])).push('2.6.1')
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G, Q
class X extends f {
  constructor() {
    super(...arguments), (this.renderOptions = { host: this }), (this._$Do = void 0)
  }
  createRenderRoot() {
    var t, i
    const s = super.createRenderRoot()
    return (null !== (t = (i = this.renderOptions).renderBefore) && void 0 !== t) || (i.renderBefore = s.firstChild), s
  }
  update(t) {
    const i = this.render()
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Do = ((t, i, s) => {
        var e, o
        const n = null !== (e = null == s ? void 0 : s.renderBefore) && void 0 !== e ? e : i
        let r = n._$litPart$
        if (void 0 === r) {
          const t = null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o ? o : null
          n._$litPart$ = r = new D(i.insertBefore(A(), t), t, void 0, null != s ? s : {})
        }
        return r._$AI(t), r
      })(i, this.renderRoot, this.renderOptions))
  }
  connectedCallback() {
    var t
    super.connectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!0)
  }
  disconnectedCallback() {
    var t
    super.disconnectedCallback(), null === (t = this._$Do) || void 0 === t || t.setConnected(!1)
  }
  render() {
    return N
  }
}
; (X.finalized = !0),
  (X._$litElement$ = !0),
  null === (G = globalThis.litElementHydrateSupport) || void 0 === G || G.call(globalThis, { LitElement: X })
const Y = globalThis.litElementPolyfillSupport
null == Y || Y({ LitElement: X }),
  (null !== (Q = globalThis.litElementVersions) && void 0 !== Q ? Q : (globalThis.litElementVersions = [])).push(
    '3.2.2',
  )
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const tt = (t, i) =>
  'method' === i.kind && i.descriptor && !('value' in i.descriptor)
    ? {
      ...i,
      finisher(s) {
        s.createProperty(i.key, t)
      },
    }
    : {
      kind: 'field',
      key: Symbol(),
      placement: 'own',
      descriptor: {},
      originalKey: i.key,
      initializer() {
        'function' === typeof i.initializer && (this[ i.key ] = i.initializer.call(this))
      },
      finisher(s) {
        s.createProperty(i.key, t)
      },
    }
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
/**
 * @license
 * Copyright 2021 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var it
null === (it = window.HTMLSlotElement) || void 0 === it || it.prototype.assignedElements
var st = function (t, i, s, e) {
  for (
    var o,
    n = arguments.length,
    r = n < 3 ? i : null === e ? (e = Object.getOwnPropertyDescriptor(i, s)) : e,
    h = t.length - 1;
    h >= 0;
    h--
  )
    (o = t[ h ]) && (r = (n < 3 ? o(r) : n > 3 ? o(i, s, r) : o(i, s)) || r)
  return n > 3 && r && Object.defineProperty(i, s, r), r
}
let et = class extends X {
  constructor() {
    super(),
      (this.isLoggedIn = !1),
      (this.logout = async () => {
        try {
          console.log('Logging out'),
            await window.authClient.logout({
              logoutParams: { returnTo: `${window.location.origin}/components-test.html` },
            })
        } catch (t) {
          console.log('Log out failed', t)
        }
      }),
      window.addEventListener('login', () => {
        this.isLoggedIn = !0
      }),
      window.addEventListener('logout', () => {
        this.isLoggedIn = !1
      })
  }
  render() {
    return (
      console.log('render', this.isLoggedIn),
      T`<button
      @click=${this.logout}
      ?disabled=${!this.isLoggedIn || void 0}
      part="button"
    >
      Logout
    </button> `
    )
  }
}
  ; (et.styles = ((t, ...i) => {
    const e =
      1 === t.length
        ? t[ 0 ]
        : i.reduce(
          (i, s, e) =>
            i +
            ((t) => {
              if (!0 === t._$cssResult$) return t.cssText
              if ('number' === typeof t) return t
              throw Error(
                "Value passed to 'css' function must be a 'css' function result: " +
                t +
                ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.",
              )
            })(s) +
            t[ e + 1 ],
          t[ 0 ],
        )
    return new o(e, t, s)
  })`
    :host {
      padding: 30px;
    }

    button {
      font-family: 'Helvetica';
      border: solid 1px #222;
      padding: 10px;
      background: rgba(34, 34, 34, 0.8);
      color: white;
    }

    button:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    button:hover:not(:disabled) {
      cursor: pointer;
    }

    button:active {
      background: rgba(34, 34, 34, 0.2);
      color: #222;
    }
  `),
    st(
      [
        (function (t) {
          return (i, s) =>
            void 0 !== s
              ? ((t, i, s) => {
                i.constructor.createProperty(s, t)
              })(t, i, s)
              : tt(t, i)
        })({ type: Boolean }),
      ],
      et.prototype,
      'isLoggedIn',
      void 0,
    ),
    (et = st(
      [
        (
          (t) => (i) =>
            'function' === typeof i
              ? ((t, i) => (customElements.define(t, i), i))(t, i)
              : ((t, i) => {
                const { kind: s, elements: e } = i
                return {
                  kind: s,
                  elements: e,
                  finisher(i) {
                    customElements.define(t, i)
                  },
                }
              })(t, i)
        )('my-logout'),
      ],
      et,
    ))
export { et as Logout }
