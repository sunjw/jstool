/*! @sentry/browser 7.1.1 (a947b01) | https://github.com/getsentry/sentry-javascript */
var Sentry = function (t) {
	var n = {};
	function e() {
		return "undefined" != typeof window ? window : "undefined" != typeof self ? self : n
	}
	function r(t, n, r) {
		var i = r || e(),
		s = i.__SENTRY__ = i.__SENTRY__ || {};
		return s[t] || (s[t] = n())
	}
	var i = Object.prototype.toString;
	function s(t) {
		switch (i.call(t)) {
		case "[object Error]":
		case "[object Exception]":
		case "[object DOMException]":
			return !0;
		default:
			return v(t, Error)
		}
	}
	function o(t, n) {
		return i.call(t) === `[object ${n}]`
	}
	function u(t) {
		return o(t, "ErrorEvent")
	}
	function a(t) {
		return o(t, "DOMError")
	}
	function c(t) {
		return o(t, "String")
	}
	function f(t) {
		return null === t || "object" != typeof t && "function" != typeof t
	}
	function h(t) {
		return o(t, "Object")
	}
	function l(t) {
		return "undefined" != typeof Event && v(t, Event)
	}
	function d(t) {
		return Boolean(t && t.then && "function" == typeof t.then)
	}
	function v(t, n) {
		try {
			return t instanceof n
		} catch (t) {
			return !1
		}
	}
	function p(t, n) {
		try {
			let i = t;
			var e = [];
			let s = 0,
			o = 0;
			var r = " > ".length;
			let u;
			for (; i && s++ < 5 && (u = y(i, n), !("html" === u || s > 1 && o + e.length * r + u.length >= 80)); )
				e.push(u), o += u.length, i = i.parentNode;
			return e.reverse().join(" > ")
		} catch (t) {
			return "<unknown>"
		}
	}
	function y(t, n) {
		var e = t,
		r = [];
		let i,
		s,
		o,
		u,
		a;
		if (!e || !e.tagName)
			return "";
		r.push(e.tagName.toLowerCase());
		var f = n && n.length ? n.filter((t => e.getAttribute(t))).map((t => [t, e.getAttribute(t)])) : null;
		if (f && f.length)
			f.forEach((t => {
					r.push(`[${t[0]}="${t[1]}"]`)
				}));
		else if (e.id && r.push(`#${e.id}`), i = e.className, i && c(i))
			for (s = i.split(/\s+/), a = 0; a < s.length; a++)
				r.push(`.${s[a]}`);
		var h = ["type", "name", "title", "alt"];
		for (a = 0; a < h.length; a++)
			o = h[a], u = e.getAttribute(o), u && r.push(`[${o}="${u}"]`);
		return r.join("")
	}
	class m extends Error {
		constructor(t) {
			super(t),
			this.message = t,
			this.name = new.target.prototype.constructor.name,
			Object.setPrototypeOf(this, new.target.prototype)
		}
	}
	var g = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w.-]+)(?::(\d+))?\/(.+)/;
	function _(t, n = !1) {
		const { host: e, path: r, pass: i, port: s, projectId: o, protocol: u, publicKey: a } = t;
		return `${u}://${a}${n && i ? `:${i}` : ""}@${e}${s ? `:${s}` : ""}/${r ? `${r}/` : r}${o}`
	}
	function b(t) {
		return {
			protocol: t.protocol,
			publicKey: t.publicKey || "",
			pass: t.pass || "",
			host: t.host,
			port: t.port || "",
			path: t.path || "",
			projectId: t.projectId
		}
	}
	function w(t) {
		return "string" == typeof t ? function (t) {
			var n = g.exec(t);
			if (!n)
				throw new m(`Invalid Sentry Dsn: ${t}`);
			const [e, r, i = "", s, o = "", u] = n.slice(1);
			let a = "",
			c = u;
			var f = c.split("/");
			if (f.length > 1 && (a = f.slice(0, -1).join("/"), c = f.pop()), c) {
				var h = c.match(/^\d+/);
				h && (c = h[0])
			}
			return b({
				host: s,
				pass: i,
				path: a,
				projectId: c,
				port: o,
				protocol: e,
				publicKey: r
			})
		}
		(t) : b(t)
	}
	var x,
	E = ["debug", "info", "warn", "error", "log", "assert"];
	function S(t, n = 0) {
		return "string" != typeof t || 0 === n || t.length <= n ? t : `${t.substr(0, n)}...`
	}
	function $(t, n) {
		if (!Array.isArray(t))
			return "";
		var e = [];
		for (let n = 0; n < t.length; n++) {
			var r = t[n];
			try {
				e.push(String(r))
			} catch (t) {
				e.push("[value cannot be serialized]")
			}
		}
		return e.join(n)
	}
	function k(t, n) {
		return !!c(t) && (o(n, "RegExp") ? n.test(t) : "string" == typeof n && -1 !== t.indexOf(n))
	}
	function O(t, n, e) {
		if (n in t) {
			var r = t[n],
			i = e(r);
			if ("function" == typeof i)
				try {
					T(i, r)
				} catch (t) {}
			t[n] = i
		}
	}
	function j(t, n, e) {
		Object.defineProperty(t, n, {
			value: e,
			writable: !0,
			configurable: !0
		})
	}
	function T(t, n) {
		var e = n.prototype || {};
		t.prototype = n.prototype = e,
		j(t, "__sentry_original__", n)
	}
	function D(t) {
		return t.__sentry_original__
	}
	function R(t) {
		if (s(t))
			return {
				message: t.message,
				name: t.name,
				stack: t.stack,
				...C(t)
			};
		if (l(t)) {
			var n = {
				type: t.type,
				target: I(t.target),
				currentTarget: I(t.currentTarget),
				...C(t)
			};
			return "undefined" != typeof CustomEvent && v(t, CustomEvent) && (n.detail = t.detail),
			n
		}
		return t
	}
	function I(t) {
		try {
			return n = t,
			"undefined" != typeof Element && v(n, Element) ? p(t) : Object.prototype.toString.call(t)
		} catch (t) {
			return "<unknown>"
		}
		var n
	}
	function C(t) {
		if ("object" == typeof t && null !== t) {
			var n = {};
			for (var e in t)
				Object.prototype.hasOwnProperty.call(t, e) && (n[e] = t[e]);
			return n
		}
		return {}
	}
	function M(t, n = 40) {
		var e = Object.keys(R(t));
		if (e.sort(), !e.length)
			return "[object has no keys]";
		if (e[0].length >= n)
			return S(e[0], n);
		for (let t = e.length; t > 0; t--) {
			var r = e.slice(0, t).join(", ");
			if (!(r.length > n))
				return t === e.length ? r : S(r, n)
		}
		return ""
	}
	function A(t) {
		return N(t, new Map)
	}
	function N(t, n) {
		if (h(t)) {
			if (void 0 !== (i = n.get(t)))
				return i;
			var e = {};
			for (var r of(n.set(t, e), Object.keys(t)))
				void 0 !== t[r] && (e[r] = N(t[r], n));
			return e
		}
		if (Array.isArray(t)) {
			var i;
			if (void 0 !== (i = n.get(t)))
				return i;
			e = [];
			return n.set(t, e),
			t.forEach((t => {
					e.push(N(t, n))
				})),
			e
		}
		return t
	}
	x = {
		enable: () => {},
		disable: () => {}
	},
	E.forEach((t => {
			x[t] = () => {}
		}));
	function L(...t) {
		var n = t.sort(((t, n) => t[0] - n[0])).map((t => t[1]));
		return (t, e = 0) => {
			var r = [];
			for (var i of t.split("\n").slice(e))
				for (var s of n) {
					var o = s(i);
					if (o) {
						r.push(o);
						break
					}
				}
			return function (t) {
				if (!t.length)
					return [];
				let n = t;
				var e = n[0].function || "",
				r = n[n.length - 1].function || "";
				-1 === e.indexOf("captureMessage") && -1 === e.indexOf("captureException") || (n = n.slice(1));
				-1 !== r.indexOf("sentryWrapped") && (n = n.slice(0, -1));
				return n.slice(0, 50).map((t => ({
							...t,
							filename: t.filename || n[0].filename,
							function : t.function || "?"
					}))).reverse()
		}
		(r)
	}
}
var U = "<anonymous>";
function q(t) {
	try {
		return t && "function" == typeof t && t.name || U
	} catch (t) {
		return U
	}
}
function P() {
	if (!("fetch" in e()))
		return !1;
	try {
		return new Headers,
		new Request(""),
		new Response,
		!0
	} catch (t) {
		return !1
	}
}
function H(t) {
	return t && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(t.toString())
}
var F = e(),
B = {},
z = {};
function X(t) {
	if (!z[t])
		switch (z[t] = !0, t) {
		case "console":
			!function () {
				if (!("console" in F))
					return;
				E.forEach((function (t) {
						t in F.console && O(F.console, t, (function (n) {
								return function (...e) {
									J("console", {
										args: e,
										level: t
									}),
									n && n.apply(F.console, e)
								}
							}))
					}))
			}
			();
			break;
		case "dom":
			!function () {
				if (!("document" in F))
					return;
				var t = J.bind(null, "dom"),
				n = Z(t, !0);
				F.document.addEventListener("click", n, !1),
				F.document.addEventListener("keypress", n, !1),
				["EventTarget", "Node"].forEach((n => {
						var e = F[n] && F[n].prototype;
						e && e.hasOwnProperty && e.hasOwnProperty("addEventListener") && (O(e, "addEventListener", (function (n) {
									return function (e, r, i) {
										if ("click" === e || "keypress" == e)
											try {
												var s = this,
												o = s.__sentry_instrumentation_handlers__ = s.__sentry_instrumentation_handlers__ || {},
												u = o[e] = o[e] || {
													refCount: 0
												};
												if (!u.handler) {
													var a = Z(t);
													u.handler = a,
													n.call(this, e, a, i)
												}
												u.refCount += 1
											} catch (t) {}
										return n.call(this, e, r, i)
									}
								})), O(e, "removeEventListener", (function (t) {
									return function (n, e, r) {
										if ("click" === n || "keypress" == n)
											try {
												var i = this,
												s = i.__sentry_instrumentation_handlers__ || {},
												o = s[n];
												o && (o.refCount -= 1, o.refCount <= 0 && (t.call(this, n, o.handler, r), o.handler = void 0, delete s[n]), 0 === Object.keys(s).length && delete i.__sentry_instrumentation_handlers__)
											} catch (t) {}
										return t.call(this, n, e, r)
									}
								})))
					}))
			}
			();
			break;
		case "xhr":
			!function () {
				if (!("XMLHttpRequest" in F))
					return;
				var t = XMLHttpRequest.prototype;
				O(t, "open", (function (t) {
						return function (...n) {
							var e = this,
							r = n[1],
							i = e.__sentry_xhr__ = {
								method: c(n[0]) ? n[0].toUpperCase() : n[0],
								url: n[1]
							};
							c(r) && "POST" === i.method && r.match(/sentry_key/) && (e.__sentry_own_request__ = !0);
							var s = function () {
								if (4 === e.readyState) {
									try {
										i.status_code = e.status
									} catch (t) {}
									J("xhr", {
										args: n,
										endTimestamp: Date.now(),
										startTimestamp: Date.now(),
										xhr: e
									})
								}
							};
							return "onreadystatechange" in e && "function" == typeof e.onreadystatechange ? O(e, "onreadystatechange", (function (t) {
									return function (...n) {
										return s(),
										t.apply(e, n)
									}
								})) : e.addEventListener("readystatechange", s),
							t.apply(e, n)
						}
					})),
				O(t, "send", (function (t) {
						return function (...n) {
							return this.__sentry_xhr__ && void 0 !== n[0] && (this.__sentry_xhr__.body = n[0]),
							J("xhr", {
								args: n,
								startTimestamp: Date.now(),
								xhr: this
							}),
							t.apply(this, n)
						}
					}))
			}
			();
			break;
		case "fetch":
			!function () {
				if (!function () {
					if (!P())
						return !1;
					var t = e();
					if (H(t.fetch))
						return !0;
					let n = !1;
					var r = t.document;
					if (r && "function" == typeof r.createElement)
						try {
							var i = r.createElement("iframe");
							i.hidden = !0,
							r.head.appendChild(i),
							i.contentWindow && i.contentWindow.fetch && (n = H(i.contentWindow.fetch)),
							r.head.removeChild(i)
						} catch (t) {}
					return n
				}
					())
					return;
				O(F, "fetch", (function (t) {
						return function (...n) {
							var e = {
								args: n,
								fetchData: {
									method: K(n),
									url: G(n)
								},
								startTimestamp: Date.now()
							};
							return J("fetch", {
								...e
							}),
							t.apply(F, n).then((t => (J("fetch", {
											...e,
											endTimestamp: Date.now(),
											response: t
										}), t)), (t => {
									throw J("fetch", {
										...e,
										endTimestamp: Date.now(),
										error: t
									}),
									t
								}))
						}
					}))
			}
			();
			break;
		case "history":
			!function () {
				if (!function () {
					var t = e(),
					n = t.chrome,
					r = n && n.app && n.app.runtime,
					i = "history" in t && !!t.history.pushState && !!t.history.replaceState;
					return !r && i
				}
					())
					return;
				var t = F.onpopstate;
				function n(t) {
					return function (...n) {
						var e = n.length > 2 ? n[2] : void 0;
						if (e) {
							var r = V,
							i = String(e);
							V = i,
							J("history", {
								from: r,
								to: i
							})
						}
						return t.apply(this, n)
					}
				}
				F.onpopstate = function (...n) {
					var e = F.location.href,
					r = V;
					if (V = e, J("history", {
							from: r,
							to: e
						}), t)
						try {
							return t.apply(this, n)
						} catch (t) {}
				},
				O(F.history, "pushState", n),
				O(F.history, "replaceState", n)
			}
			();
			break;
		case "error":
			tt = F.onerror,
			F.onerror = function (t, n, e, r, i) {
				return J("error", {
					column: r,
					error: i,
					line: e,
					msg: t,
					url: n
				}),
				!!tt && tt.apply(this, arguments)
			};
			break;
		case "unhandledrejection":
			nt = F.onunhandledrejection,
			F.onunhandledrejection = function (t) {
				return J("unhandledrejection", t),
				!nt || nt.apply(this, arguments)
			};
			break;
		default:
			return
		}
}
function W(t, n) {
	B[t] = B[t] || [],
	B[t].push(n),
	X(t)
}
function J(t, n) {
	if (t && B[t])
		for (var e of B[t] || [])
			try {
				e(n)
			} catch (t) {}
}
function K(t = []) {
	return "Request" in F && v(t[0], Request) && t[0].method ? String(t[0].method).toUpperCase() : t[1] && t[1].method ? String(t[1].method).toUpperCase() : "GET"
}
function G(t = []) {
	return "string" == typeof t[0] ? t[0] : "Request" in F && v(t[0], Request) ? t[0].url : String(t[0])
}
let V;
let Q,
Y;
function Z(t, n = !1) {
	return e => {
		if (e && Y !== e && !function (t) {
			if ("keypress" !== t.type)
				return !1;
			try {
				var n = t.target;
				if (!n || !n.tagName)
					return !0;
				if ("INPUT" === n.tagName || "TEXTAREA" === n.tagName || n.isContentEditable)
					return !1
			} catch (t) {}
			return !0
		}
			(e)) {
			var r = "keypress" === e.type ? "input" : e.type;
			(void 0 === Q || function (t, n) {
				if (!t)
					return !0;
				if (t.type !== n.type)
					return !0;
				try {
					if (t.target !== n.target)
						return !0
				} catch (t) {}
				return !1
			}
				(Y, e)) && (t({
					event: e,
					name: r,
					global: n
				}), Y = e),
			clearTimeout(Q),
			Q = F.setTimeout((() => {
						Q = void 0
					}), 1e3)
		}
	}
}
let tt = null;
let nt = null;
function et() {
	var t = e(),
	n = t.crypto || t.msCrypto;
	if (void 0 !== n && n.getRandomValues) {
		var r = new Uint16Array(8);
		n.getRandomValues(r),
		r[3] = 4095 & r[3] | 16384,
		r[4] = 16383 & r[4] | 32768;
		var i = t => {
			let n = t.toString(16);
			for (; n.length < 4; )
				n = `0${n}`;
			return n
		};
		return i(r[0]) + i(r[1]) + i(r[2]) + i(r[3]) + i(r[4]) + i(r[5]) + i(r[6]) + i(r[7])
	}
	return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, (t => {
			var n = 16 * Math.random() | 0;
			return ("x" === t ? n : 3 & n | 8).toString(16)
		}))
}
function rt(t) {
	if (!t)
		return {};
	var n = t.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
	if (!n)
		return {};
	var e = n[6] || "",
	r = n[8] || "";
	return {
		host: n[4],
		path: n[5],
		protocol: n[2],
		relative: n[5] + e + r
	}
}
function it(t) {
	return t.exception && t.exception.values ? t.exception.values[0] : void 0
}
function st(t) {
	const { message: n, event_id: e } = t;
	if (n)
		return n;
	var r = it(t);
	return r ? r.type && r.value ? `${r.type}: ${r.value}` : r.type || r.value || e || "<unknown>" : e || "<unknown>"
}
function ot(t, n, e) {
	var r = t.exception = t.exception || {},
	i = r.values = r.values || [],
	s = i[0] = i[0] || {};
	s.value || (s.value = n || ""),
	s.type || (s.type = e || "Error")
}
function ut(t, n) {
	var e = it(t);
	if (e) {
		var r = e.mechanism;
		if (e.mechanism = {
				type: "generic",
				handled: !0,
				...r,
				...n
			}, n && "data" in n) {
			var i = {
				...r && r.data,
				...n.data
			};
			e.mechanism.data = i
		}
	}
}
function at(t) {
	if (t && t.__sentry_captured__)
		return !0;
	try {
		j(t, "__sentry_captured__", !0)
	} catch (t) {}
	return !1
}
function ct(t, n = 1 / 0, e = 1 / 0) {
	try {
		return ht("", t, n, e)
	} catch (t) {
		return {
			ERROR: `**non-serializable** (${t})`
		}
	}
}
function ft(t, n = 3, e = 102400) {
	var r,
	i = ct(t, n);
	return r = i,
	function (t) {
		return ~-encodeURI(t).split(/%..|./).length
	}
	(JSON.stringify(r)) > e ? ft(t, n - 1, e) : i
}
function ht(t, n, e = 1 / 0, r = 1 / 0, i = function () {
	var t = "function" == typeof WeakSet,
	n = t ? new WeakSet : [];
	return [function (e) {
			if (t)
				return !!n.has(e) || (n.add(e), !1);
			for (let t = 0; t < n.length; t++)
				if (n[t] === e)
					return !0;
			return n.push(e),
			!1
		}, function (e) {
			if (t)
				n.delete(e);
			else
				for (let t = 0; t < n.length; t++)
					if (n[t] === e) {
						n.splice(t, 1);
						break
					}
		}
	]
}
	()) {
	const [s, o] = i;
	var u,
	a = n;
	if (a && "function" == typeof a.toJSON)
		try {
			return a.toJSON()
		} catch (t) {}
	if (null === n || ["number", "boolean", "string"].includes(typeof n) && ("number" != typeof(u = n) || u == u))
		return n;
	var c = function (t, n) {
		try {
			return "domain" === t && n && "object" == typeof n && n.t ? "[Domain]" : "domainEmitter" === t ? "[DomainEmitter]" : "undefined" != typeof global && n === global ? "[Global]" : "undefined" != typeof window && n === window ? "[Window]" : "undefined" != typeof document && n === document ? "[Document]" : function (t) {
				return h(t) && "nativeEvent" in t && "preventDefault" in t && "stopPropagation" in t
			}
			(n) ? "[SyntheticEvent]" : "number" == typeof n && n != n ? "[NaN]" : void 0 === n ? "[undefined]" : "function" == typeof n ? `[Function: ${q(n)}]` : "symbol" == typeof n ? `[${String(n)}]` : "bigint" == typeof n ? `[BigInt: ${String(n)}]` : `[object ${Object.getPrototypeOf(n).constructor.name}]`
		} catch (t) {
			return `**non-serializable** (${t})`
		}
	}
	(t, n);
	if (!c.startsWith("[object "))
		return c;
	if (n.__sentry_skip_normalization__)
		return n;
	if (0 === e)
		return c.replace("object ", "");
	if (s(n))
		return "[Circular ~]";
	var f = Array.isArray(n) ? [] : {};
	let l = 0;
	var d = R(n);
	for (var v in d)
		if (Object.prototype.hasOwnProperty.call(d, v)) {
			if (l >= r) {
				f[v] = "[MaxProperties ~]";
				break
			}
			var p = d[v];
			f[v] = ht(v, p, e - 1, r, i),
			l += 1
		}
	return o(n),
	f
}
var lt;
function dt(t) {
	return new pt((n => {
			n(t)
		}))
}
function vt(t) {
	return new pt(((n, e) => {
			e(t)
		}))
}
!function (t) {
	t[t.PENDING = 0] = "PENDING";
	t[t.RESOLVED = 1] = "RESOLVED";
	t[t.REJECTED = 2] = "REJECTED"
}
(lt || (lt = {}));
class pt {
	__init() {
		this.i = lt.PENDING
	}
	__init2() {
		this.o = []
	}
	constructor(t) {
		pt.prototype.__init.call(this),
		pt.prototype.__init2.call(this),
		pt.prototype.__init3.call(this),
		pt.prototype.__init4.call(this),
		pt.prototype.__init5.call(this),
		pt.prototype.__init6.call(this);
		try {
			t(this.u, this.h)
		} catch (t) {
			this.h(t)
		}
	}
	then(t, n) {
		return new pt(((e, r) => {
				this.o.push([!1, n => {
							if (t)
								try {
									e(t(n))
								} catch (t) {
									r(t)
								}
							else
								e(n)
						}, t => {
							if (n)
								try {
									e(n(t))
								} catch (t) {
									r(t)
								}
							else
								r(t)
						}
					]),
				this.l()
			}))
	}
	catch (t) {
		return this.then((t => t), t)
	} finally (t) {
			return new pt(((n, e) => {
					let r,
					i;
					return this.then((n => {
							i = !1,
							r = n,
							t && t()
						}), (n => {
							i = !0,
							r = n,
							t && t()
						})).then((() => {
							i ? e(r) : n(r)
						}))
				}))
		}
	__init3() {
		this.u = t => {
			this.v(lt.RESOLVED, t)
		}
	}
	__init4() {
		this.h = t => {
			this.v(lt.REJECTED, t)
		}
	}
	__init5() {
		this.v = (t, n) => {
			this.i === lt.PENDING && (d(n) ? n.then(this.u, this.h) : (this.i = t, this.p = n, this.l()))
		}
	}
	__init6() {
		this.l = () => {
			if (this.i !== lt.PENDING) {
				var t = this.o.slice();
				this.o = [],
				t.forEach((t => {
						t[0] || (this.i === lt.RESOLVED && t[1](this.p), this.i === lt.REJECTED && t[2](this.p), t[0] = !0)
					}))
			}
		}
	}
}
function yt(t) {
	var n = [];
	function e(t) {
		return n.splice(n.indexOf(t), 1)[0]
	}
	return {
		$: n,
		add: function (r) {
			if (!(void 0 === t || n.length < t))
				return vt(new m("Not adding Promise due to buffer limit reached."));
			var i = r();
			return -1 === n.indexOf(i) && n.push(i),
			i.then((() => e(i))).then(null, (() => e(i).then(null, (() => {})))),
			i
		},
		drain: function (t) {
			return new pt(((e, r) => {
					let i = n.length;
					if (!i)
						return e(!0);
					var s = setTimeout((() => {
								t && t > 0 && e(!1)
							}), t);
					n.forEach((t => {
							dt(t).then((() => {
									--i || (clearTimeout(s), e(!0))
								}), r)
						}))
				}))
		}
	}
}
var mt = ["fatal", "error", "warning", "log", "info", "debug"];
var gt = {
	nowSeconds: () => Date.now() / 1e3
};
var _t = function () {
	const { performance: t } = e();
	if (t && t.now)
		return {
			now: () => t.now(),
			timeOrigin: Date.now() - t.now()
		}
}
(),
bt = void 0 === _t ? gt : {
	nowSeconds: () => (_t.timeOrigin + _t.now()) / 1e3
},
wt = gt.nowSeconds.bind(gt),
xt = bt.nowSeconds.bind(bt);
function Et(t, n = []) {
	return [t, n]
}
function St(t, n) {
	const [e, r] = t;
	return [e, [...r, n]]
}
function $t(t, n) {
	t[1].forEach((t => {
			var e = t[0].type;
			n(t, e)
		}))
}
function kt(t, n) {
	return (n || new TextEncoder).encode(t)
}
function Ot(t, n) {
	const [e, r] = t;
	let i = JSON.stringify(e);
	function s(t) {
		"string" == typeof i ? i = "string" == typeof t ? i + t : [kt(i, n), t] : i.push("string" == typeof t ? kt(t, n) : t)
	}
	for (var o of r) {
		const [t, n] = o;
		s(`\n${JSON.stringify(t)}\n`),
		s("string" == typeof n || n instanceof Uint8Array ? n : JSON.stringify(n))
	}
	return "string" == typeof i ? i : function (t) {
		var n = t.reduce(((t, n) => t + n.length), 0),
		e = new Uint8Array(n);
		let r = 0;
		for (var i of t)
			e.set(i, r), r += i.length;
		return e
	}
	(i)
}
function jt(t, n) {
	var e = "string" == typeof t.data ? kt(t.data, n) : t.data;
	return [A({
			type: "attachment",
			length: e.length,
			filename: t.filename,
			content_type: t.contentType,
			attachment_type: t.attachmentType
		}), e]
}
(() => {
	const { performance: t } = e();
	if (t && t.now) {
		var n = 36e5,
		r = t.now(),
		i = Date.now(),
		s = t.timeOrigin ? Math.abs(t.timeOrigin + r - i) : n,
		o = s < n,
		u = t.timing && t.timing.navigationStart,
		a = "number" == typeof u ? Math.abs(u + r - i) : n;
		(o || a < n) && (s <= a && t.timeOrigin)
	}
})();
var Tt = {
	session: "session",
	sessions: "session",
	attachment: "attachment",
	transaction: "transaction",
	event: "error",
	client_report: "internal",
	user_report: "default"
};
function Dt(t) {
	return Tt[t]
}
function Rt(t, {
	statusCode: n,
	headers: e
}, r = Date.now()) {
	var i = {
		...t
	},
	s = e && e["x-sentry-rate-limits"],
	o = e && e["retry-after"];
	if (s)
		for (var u of s.trim().split(",")) {
			const [t, n] = u.split(":", 2);
			var a = parseInt(t, 10),
			c = 1e3 * (isNaN(a) ? 60 : a);
			if (n)
				for (var f of n.split(";"))
					i[f] = r + c;
			else
				i.all = r + c
		}
	else
		o ? i.all = r + function (t, n = Date.now()) {
			var e = parseInt(`${t}`, 10);
			if (!isNaN(e))
				return 1e3 * e;
			var r = Date.parse(`${t}`);
			return isNaN(r) ? 6e4 : r - n
		}
	(o, r) : 429 === n && (i.all = r + 6e4);
	return i
}
function It(t) {
	var n = xt(),
	e = {
		sid: et(),
		init: !0,
		timestamp: n,
		started: n,
		duration: 0,
		status: "ok",
		errors: 0,
		ignoreDuration: !1,
		toJSON: () => function (t) {
			return A({
				sid: `${t.sid}`,
				init: t.init,
				started: new Date(1e3 * t.started).toISOString(),
				timestamp: new Date(1e3 * t.timestamp).toISOString(),
				status: t.status,
				errors: t.errors,
				did: "number" == typeof t.did || "string" == typeof t.did ? `${t.did}` : void 0,
				duration: t.duration,
				attrs: {
					release: t.release,
					environment: t.environment,
					ip_address: t.ipAddress,
					user_agent: t.userAgent
				}
			})
		}
		(e)
	};
	return t && Ct(e, t),
	e
}
function Ct(t, n = {}) {
	if (n.user && (!t.ipAddress && n.user.ip_address && (t.ipAddress = n.user.ip_address), t.did || n.did || (t.did = n.user.id || n.user.email || n.user.username)), t.timestamp = n.timestamp || xt(), n.ignoreDuration && (t.ignoreDuration = n.ignoreDuration), n.sid && (t.sid = 32 === n.sid.length ? n.sid : et()), void 0 !== n.init && (t.init = n.init), !t.did && n.did && (t.did = `${n.did}`), "number" == typeof n.started && (t.started = n.started), t.ignoreDuration)
		t.duration = void 0;
	else if ("number" == typeof n.duration)
		t.duration = n.duration;
	else {
		var e = t.timestamp - t.started;
		t.duration = e >= 0 ? e : 0
	}
	n.release && (t.release = n.release),
	n.environment && (t.environment = n.environment),
	!t.ipAddress && n.ipAddress && (t.ipAddress = n.ipAddress),
	!t.userAgent && n.userAgent && (t.userAgent = n.userAgent),
	"number" == typeof n.errors && (t.errors = n.errors),
	n.status && (t.status = n.status)
}
class Mt {
	constructor() {
		Mt.prototype.__init.call(this),
		Mt.prototype.__init2.call(this),
		Mt.prototype.__init3.call(this),
		Mt.prototype.__init4.call(this),
		Mt.prototype.__init5.call(this),
		Mt.prototype.__init6.call(this),
		Mt.prototype.__init7.call(this),
		Mt.prototype.__init8.call(this),
		Mt.prototype.__init9.call(this),
		Mt.prototype.__init10.call(this)
	}
	__init() {
		this.m = !1
	}
	__init2() {
		this.g = []
	}
	__init3() {
		this._ = []
	}
	__init4() {
		this.S = []
	}
	__init5() {
		this.k = {}
	}
	__init6() {
		this.O = {}
	}
	__init7() {
		this.j = {}
	}
	__init8() {
		this.T = {}
	}
	__init9() {
		this.D = []
	}
	__init10() {
		this.R = {}
	}
	static clone(t) {
		var n = new Mt;
		return t && (n.S = [...t.S], n.O = {
				...t.O
			}, n.j = {
				...t.j
			}, n.T = {
				...t.T
			}, n.k = t.k, n.I = t.I, n.C = t.C, n.M = t.M, n.A = t.A, n.N = t.N, n._ = [...t._], n.L = t.L, n.D = [...t.D]),
		n
	}
	addScopeListener(t) {
		this.g.push(t)
	}
	addEventProcessor(t) {
		return this._.push(t),
		this
	}
	setUser(t) {
		return this.k = t || {},
		this.M && Ct(this.M, {
			user: t
		}),
		this.U(),
		this
	}
	getUser() {
		return this.k
	}
	getRequestSession() {
		return this.L
	}
	setRequestSession(t) {
		return this.L = t,
		this
	}
	setTags(t) {
		return this.O = {
			...this.O,
			...t
		},
		this.U(),
		this
	}
	setTag(t, n) {
		return this.O = {
			...this.O,
			[t]: n
		},
		this.U(),
		this
	}
	setExtras(t) {
		return this.j = {
			...this.j,
			...t
		},
		this.U(),
		this
	}
	setExtra(t, n) {
		return this.j = {
			...this.j,
			[t]: n
		},
		this.U(),
		this
	}
	setFingerprint(t) {
		return this.N = t,
		this.U(),
		this
	}
	setLevel(t) {
		return this.I = t,
		this.U(),
		this
	}
	setTransactionName(t) {
		return this.A = t,
		this.U(),
		this
	}
	setContext(t, n) {
		return null === n ? delete this.T[t] : this.T = {
			...this.T,
			[t]: n
		},
		this.U(),
		this
	}
	setSpan(t) {
		return this.C = t,
		this.U(),
		this
	}
	getSpan() {
		return this.C
	}
	getTransaction() {
		var t = this.getSpan();
		return t && t.transaction
	}
	setSession(t) {
		return t ? this.M = t : delete this.M,
		this.U(),
		this
	}
	getSession() {
		return this.M
	}
	update(t) {
		if (!t)
			return this;
		if ("function" == typeof t) {
			var n = t(this);
			return n instanceof Mt ? n : this
		}
		return t instanceof Mt ? (this.O = {
				...this.O,
				...t.O
			}, this.j = {
				...this.j,
				...t.j
			}, this.T = {
				...this.T,
				...t.T
			}, t.k && Object.keys(t.k).length && (this.k = t.k), t.I && (this.I = t.I), t.N && (this.N = t.N), t.L && (this.L = t.L)) : h(t) && (t = t, this.O = {
				...this.O,
				...t.tags
			}, this.j = {
				...this.j,
				...t.extra
			}, this.T = {
				...this.T,
				...t.contexts
			}, t.user && (this.k = t.user), t.level && (this.I = t.level), t.fingerprint && (this.N = t.fingerprint), t.requestSession && (this.L = t.requestSession)),
		this
	}
	clear() {
		return this.S = [],
		this.O = {},
		this.j = {},
		this.k = {},
		this.T = {},
		this.I = void 0,
		this.A = void 0,
		this.N = void 0,
		this.L = void 0,
		this.C = void 0,
		this.M = void 0,
		this.U(),
		this.D = [],
		this
	}
	addBreadcrumb(t, n) {
		var e = "number" == typeof n ? Math.min(n, 100) : 100;
		if (e <= 0)
			return this;
		var r = {
			timestamp: wt(),
			...t
		};
		return this.S = [...this.S, r].slice(-e),
		this.U(),
		this
	}
	clearBreadcrumbs() {
		return this.S = [],
		this.U(),
		this
	}
	addAttachment(t) {
		return this.D.push(t),
		this
	}
	getAttachments() {
		return this.D
	}
	clearAttachments() {
		return this.D = [],
		this
	}
	applyToEvent(t, n = {}) {
		if (this.j && Object.keys(this.j).length && (t.extra = {
					...this.j,
					...t.extra
				}), this.O && Object.keys(this.O).length && (t.tags = {
					...this.O,
					...t.tags
				}), this.k && Object.keys(this.k).length && (t.user = {
					...this.k,
					...t.user
				}), this.T && Object.keys(this.T).length && (t.contexts = {
					...this.T,
					...t.contexts
				}), this.I && (t.level = this.I), this.A && (t.transaction = this.A), this.C) {
			t.contexts = {
				trace: this.C.getTraceContext(),
				...t.contexts
			};
			var e = this.C.transaction && this.C.transaction.name;
			e && (t.tags = {
					transaction: e,
					...t.tags
				})
		}
		return this.q(t),
		t.breadcrumbs = [...t.breadcrumbs || [], ...this.S],
		t.breadcrumbs = t.breadcrumbs.length > 0 ? t.breadcrumbs : void 0,
		t.sdkProcessingMetadata = this.R,
		this.P([...At(), ...this._], t, n)
	}
	setSDKProcessingMetadata(t) {
		return this.R = {
			...this.R,
			...t
		},
		this
	}
	P(t, n, e, r = 0) {
		return new pt(((i, s) => {
				var o = t[r];
				if (null === n || "function" != typeof o)
					i(n);
				else {
					var u = o({
						...n
					}, e);
					d(u) ? u.then((n => this.P(t, n, e, r + 1).then(i))).then(null, s) : this.P(t, u, e, r + 1).then(i).then(null, s)
				}
			}))
	}
	U() {
		this.m || (this.m = !0, this.g.forEach((t => {
					t(this)
				})), this.m = !1)
	}
	q(t) {
		t.fingerprint = t.fingerprint ? Array.isArray(t.fingerprint) ? t.fingerprint : [t.fingerprint] : [],
		this.N && (t.fingerprint = t.fingerprint.concat(this.N)),
		t.fingerprint && !t.fingerprint.length && delete t.fingerprint
	}
}
function At() {
	return r("globalEventProcessors", (() => []))
}
function Nt(t) {
	At().push(t)
}
var Lt = 100;
class Ut {
	__init() {
		this.H = [{}
		]
	}
	constructor(t, n = new Mt, e = 4) {
		this.F = e,
		Ut.prototype.__init.call(this),
		this.getStackTop().scope = n,
		t && this.bindClient(t)
	}
	isOlderThan(t) {
		return this.F < t
	}
	bindClient(t) {
		this.getStackTop().client = t,
		t && t.setupIntegrations && t.setupIntegrations()
	}
	pushScope() {
		var t = Mt.clone(this.getScope());
		return this.getStack().push({
			client: this.getClient(),
			scope: t
		}),
		t
	}
	popScope() {
		return !(this.getStack().length <= 1) && !!this.getStack().pop()
	}
	withScope(t) {
		var n = this.pushScope();
		try {
			t(n)
		} finally {
			this.popScope()
		}
	}
	getClient() {
		return this.getStackTop().client
	}
	getScope() {
		return this.getStackTop().scope
	}
	getStack() {
		return this.H
	}
	getStackTop() {
		return this.H[this.H.length - 1]
	}
	captureException(t, n) {
		var e = this.B = n && n.event_id ? n.event_id : et(),
		r = new Error("Sentry syntheticException");
		return this.X(((i, s) => {
				i.captureException(t, {
					originalException: t,
					syntheticException: r,
					...n,
					event_id: e
				}, s)
			})),
		e
	}
	captureMessage(t, n, e) {
		var r = this.B = e && e.event_id ? e.event_id : et(),
		i = new Error(t);
		return this.X(((s, o) => {
				s.captureMessage(t, n, {
					originalException: t,
					syntheticException: i,
					...e,
					event_id: r
				}, o)
			})),
		r
	}
	captureEvent(t, n) {
		var e = n && n.event_id ? n.event_id : et();
		return "transaction" !== t.type && (this.B = e),
		this.X(((r, i) => {
				r.captureEvent(t, {
					...n,
					event_id: e
				}, i)
			})),
		e
	}
	lastEventId() {
		return this.B
	}
	addBreadcrumb(t, n) {
		const { scope: r, client: i } = this.getStackTop();
		if (!r || !i)
			return;
		const { beforeBreadcrumb: s = null, maxBreadcrumbs: o = Lt } = i.getOptions && i.getOptions() || {};
		if (!(o <= 0)) {
			var u = {
				timestamp: wt(),
				...t
			},
			a = s ? function (t) {
				var n = e();
				if (!("console" in n))
					return t();
				var r = n.console,
				i = {};
				E.forEach((t => {
						var e = r[t] && r[t].__sentry_original__;
						t in n.console && e && (i[t] = r[t], r[t] = e)
					}));
				try {
					return t()
				} finally {
					Object.keys(i).forEach((t => {
							r[t] = i[t]
						}))
				}
			}
			((() => s(u, n))) : u;
			null !== a && r.addBreadcrumb(a, o)
		}
	}
	setUser(t) {
		var n = this.getScope();
		n && n.setUser(t)
	}
	setTags(t) {
		var n = this.getScope();
		n && n.setTags(t)
	}
	setExtras(t) {
		var n = this.getScope();
		n && n.setExtras(t)
	}
	setTag(t, n) {
		var e = this.getScope();
		e && e.setTag(t, n)
	}
	setExtra(t, n) {
		var e = this.getScope();
		e && e.setExtra(t, n)
	}
	setContext(t, n) {
		var e = this.getScope();
		e && e.setContext(t, n)
	}
	configureScope(t) {
		const { scope: n, client: e } = this.getStackTop();
		n && e && t(n)
	}
	run(t) {
		var n = Pt(this);
		try {
			t(this)
		} finally {
			Pt(n)
		}
	}
	getIntegration(t) {
		var n = this.getClient();
		if (!n)
			return null;
		try {
			return n.getIntegration(t)
		} catch (t) {
			return null
		}
	}
	startTransaction(t, n) {
		return this.W("startTransaction", t, n)
	}
	traceHeaders() {
		return this.W("traceHeaders")
	}
	captureSession(t = !1) {
		if (t)
			return this.endSession();
		this.J()
	}
	endSession() {
		var t = this.getStackTop(),
		n = t && t.scope,
		e = n && n.getSession();
		e && function (t, n) {
			let e = {};
			n ? e = {
				status: n
			} : "ok" === t.status && (e = {
					status: "exited"
				}),
			Ct(t, e)
		}
		(e),
		this.J(),
		n && n.setSession()
	}
	startSession(t) {
		const { scope: n, client: r } = this.getStackTop(), {
			release: i,
			environment: s
		} = r && r.getOptions() || {};
		var o = e();
		const { userAgent: u } = o.navigator || {};
		var a = It({
			release: i,
			environment: s,
			...n && {
				user: n.getUser()
			},
			...u && {
				userAgent: u
			},
			...t
		});
		if (n) {
			var c = n.getSession && n.getSession();
			c && "ok" === c.status && Ct(c, {
				status: "exited"
			}),
			this.endSession(),
			n.setSession(a)
		}
		return a
	}
	J() {
		const { scope: t, client: n } = this.getStackTop();
		if (t) {
			var e = t.getSession();
			e && n && n.captureSession && n.captureSession(e)
		}
	}
	X(t) {
		const { scope: n, client: e } = this.getStackTop();
		e && t(e, n)
	}
	W(t, ...n) {
		var e = qt().__SENTRY__;
		if (e && e.extensions && "function" == typeof e.extensions[t])
			return e.extensions[t].apply(this, n)
	}
}
function qt() {
	var t = e();
	return t.__SENTRY__ = t.__SENTRY__ || {
		extensions: {},
		hub: void 0
	},
	t
}
function Pt(t) {
	var n = qt(),
	e = Ft(n);
	return Bt(n, t),
	e
}
function Ht() {
	var t,
	n = qt();
	return (t = n) && t.__SENTRY__ && t.__SENTRY__.hub && !Ft(n).isOlderThan(4) || Bt(n, new Ut),
	Ft(n)
}
function Ft(t) {
	return r("hub", (() => new Ut), t)
}
function Bt(t, n) {
	return !!t && ((t.__SENTRY__ = t.__SENTRY__ || {}).hub = n, !0)
}
function captureException(t, n) {
	return Ht().captureException(t, {
		captureContext: n
	})
}
function zt(t) {
	Ht().withScope(t)
}
function Xt(t) {
	var n = t.protocol ? `${t.protocol}:` : "",
	e = t.port ? `:${t.port}` : "";
	return `${n}//${t.host}${e}${t.path ? `/${t.path}` : ""}/api/`
}
function Wt(t) {
	return n = {
		sentry_key: t.publicKey,
		sentry_version: "7"
	},
	Object.keys(n).map((t => `${encodeURIComponent(t)}=${encodeURIComponent(n[t])}`)).join("&");
	var n
}
function Jt(t, n) {
	return n || `${function (t) {
		return `${Xt(t)}${t.projectId}/envelope/`
	}
	(t)}?${Wt(t)}`
}
function Kt(t) {
	let n,
	e = t[0],
	r = 1;
	for (; r < t.length; ) {
		var i = t[r],
		s = t[r + 1];
		if (r += 2, ("optionalAccess" === i || "optionalCall" === i) && null == e)
			return;
		"access" === i || "optionalAccess" === i ? (n = e, e = s(e)) : "call" !== i && "optionalCall" !== i || (e = s(((...t) => e.call(n, ...t))), n = void 0)
	}
	return e
}
function Gt(t) {
	if (!t || !t.sdk)
		return;
	const { name: n, version: e } = t.sdk;
	return {
		name: n,
		version: e
	}
}
function Vt(t, n, e, r) {
	var i = Gt(e),
	s = t.type || "event";
	const { transactionSampling: o } = t.sdkProcessingMetadata || {}, {
		method: u,
		rate: a
	} = o || {};
	!function (t, n) {
		n && (t.sdk = t.sdk || {}, t.sdk.name = t.sdk.name || n.name, t.sdk.version = t.sdk.version || n.version, t.sdk.integrations = [...t.sdk.integrations || [], ...n.integrations || []], t.sdk.packages = [...t.sdk.packages || [], ...n.packages || []])
	}
	(t, e && e.sdk),
	t.tags = t.tags || {},
	t.extra = t.extra || {},
	t.sdkProcessingMetadata && t.sdkProcessingMetadata.baseClientNormalized || (t.tags.skippedNormalization = !0, t.extra.normalizeDepth = t.sdkProcessingMetadata ? t.sdkProcessingMetadata.normalizeDepth : "unset"),
	delete t.sdkProcessingMetadata;
	var c = function (t, n, e, r) {
		return {
			event_id: t.event_id,
			sent_at: (new Date).toISOString(),
			...n && {
				sdk: n
			},
			...!!e && {
				dsn: _(r)
			},
			..."transaction" === t.type && t.contexts && t.contexts.trace && {
				trace: A({
					trace_id: t.contexts.trace.trace_id,
					environment: t.environment,
					release: t.release,
					transaction: t.transaction,
					user: t.user && {
						id: t.user.id,
						segment: t.user.segment
					},
					public_key: r.publicKey
				})
			}
		}
	}
	(t, i, r, n);
	return Et(c, [[{
					type: s,
					sample_rates: [{
							id: u,
							rate: a
						}
					]
				}, t]])
}
var Qt = [];
function Yt(t) {
	return t.reduce(((t, n) => (t.every((t => n.name !== t.name)) && t.push(n), t)), [])
}
function Zt(t) {
	var n = t.defaultIntegrations && [...t.defaultIntegrations] || [],
	e = t.integrations;
	let r = [...Yt(n)];
	Array.isArray(e) ? r = [...r.filter((t => e.every((n => n.name !== t.name)))), ...Yt(e)] : "function" == typeof e && (r = e(r), r = Array.isArray(r) ? r : [r]);
	var i = r.map((t => t.name)),
	s = "Debug";
	return -1 !== i.indexOf(s) && r.push(...r.splice(i.indexOf(s), 1)),
	r
}
class tn {
	__init() {
		this.K = {}
	}
	__init2() {
		this.G = !1
	}
	__init3() {
		this.V = 0
	}
	__init4() {
		this.Y = {}
	}
	constructor(t) {
		if (tn.prototype.__init.call(this), tn.prototype.__init2.call(this), tn.prototype.__init3.call(this), tn.prototype.__init4.call(this), this.Z = t, t.dsn) {
			this.tt = w(t.dsn);
			var n = Jt(this.tt, t.tunnel);
			this.nt = t.transport({
				recordDroppedEvent: this.recordDroppedEvent.bind(this),
				...t.transportOptions,
				url: n
			})
		}
	}
	captureException(t, n, e) {
		if (at(t))
			return;
		let r = n && n.event_id;
		return this.et(this.eventFromException(t, n).then((t => this.rt(t, n, e))).then((t => {
					r = t
				}))),
		r
	}
	captureMessage(t, n, e, r) {
		let i = e && e.event_id;
		var s = f(t) ? this.eventFromMessage(String(t), n, e) : this.eventFromException(t, e);
		return this.et(s.then((t => this.rt(t, e, r))).then((t => {
					i = t
				}))),
		i
	}
	captureEvent(t, n, e) {
		if (n && n.originalException && at(n.originalException))
			return;
		let r = n && n.event_id;
		return this.et(this.rt(t, n, e).then((t => {
					r = t
				}))),
		r
	}
	captureSession(t) {
		this.it() && ("string" != typeof t.release || (this.sendSession(t), Ct(t, {
					init: !1
				})))
	}
	getDsn() {
		return this.tt
	}
	getOptions() {
		return this.Z
	}
	getTransport() {
		return this.nt
	}
	flush(t) {
		var n = this.nt;
		return n ? this.st(t).then((e => n.flush(t).then((t => e && t)))) : dt(!0)
	}
	close(t) {
		return this.flush(t).then((t => (this.getOptions().enabled = !1, t)))
	}
	setupIntegrations() {
		var t,
		n;
		this.it() && !this.G && (this.K = (t = this.Z.integrations, n = {}, t.forEach((t => {
						n[t.name] = t,
						-1 === Qt.indexOf(t.name) && (t.setupOnce(Nt, Ht), Qt.push(t.name))
					})), n), this.G = !0)
	}
	getIntegrationById(t) {
		return this.K[t]
	}
	getIntegration(t) {
		try {
			return this.K[t.id] || null
		} catch (t) {
			return null
		}
	}
	sendEvent(t, n = {}) {
		if (this.tt) {
			let r = Vt(t, this.tt, this.Z.ot, this.Z.tunnel);
			for (var e of n.attachments || [])
				r = St(r, jt(e, Kt([this, "access", t => t.Z, "access", t => t.transportOptions, "optionalAccess", t => t.textEncoder])));
			this.ut(r)
		}
	}
	sendSession(t) {
		if (this.tt) {
			var n = function (t, n, e, r) {
				var i = Gt(e);
				return Et({
					sent_at: (new Date).toISOString(),
					...i && {
						sdk: i
					},
					...!!r && {
						dsn: _(n)
					}
				}, ["aggregates" in t ? [{
								type: "sessions"
							}, t] : [{
								type: "session"
							}, t]])
			}
			(t, this.tt, this.Z.ot, this.Z.tunnel);
			this.ut(n)
		}
	}
	recordDroppedEvent(t, n) {
		if (this.Z.sendClientReports) {
			var e = `${t}:${n}`;
			this.Y[e] = this.Y[e] + 1 || 1
		}
	}
	at(t, n) {
		let e = !1,
		r = !1;
		var i = n.exception && n.exception.values;
		if (i)
			for (var s of(r = !0, i)) {
				var o = s.mechanism;
				if (o && !1 === o.handled) {
					e = !0;
					break
				}
			}
		var u = "ok" === t.status;
		(u && 0 === t.errors || u && e) && (Ct(t, {
				...e && {
					status: "crashed"
				},
				errors: t.errors || Number(r || e)
			}), this.captureSession(t))
	}
	st(t) {
		return new pt((n => {
				let e = 0;
				var r = setInterval((() => {
							0 == this.V ? (clearInterval(r), n(!0)) : (e += 1, t && e >= t && (clearInterval(r), n(!1)))
						}), 1)
			}))
	}
	it() {
		return !1 !== this.getOptions().enabled && void 0 !== this.tt
	}
	ct(t, n, e) {
		const { normalizeDepth: r = 3, normalizeMaxBreadth: i = 1e3 } = this.getOptions();
		var s = {
			...t,
			event_id: t.event_id || n.event_id || et(),
			timestamp: t.timestamp || wt()
		};
		this.ft(s),
		this.ht(s);
		let o = e;
		n.captureContext && (o = Mt.clone(o).update(n.captureContext));
		let u = dt(s);
		if (o) {
			var a = [...n.attachments || [], ...o.getAttachments()];
			a.length && (n.attachments = a),
			u = o.applyToEvent(s, n)
		}
		return u.then((t => (t && (t.sdkProcessingMetadata = {
							...t.sdkProcessingMetadata,
							normalizeDepth: `${ct(r)} (${typeof r})`
						}), "number" == typeof r && r > 0 ? this.lt(t, r, i) : t)))
	}
	lt(t, n, e) {
		if (!t)
			return null;
		var r = {
			...t,
			...t.breadcrumbs && {
				breadcrumbs: t.breadcrumbs.map((t => ({
							...t,
							...t.data && {
								data: ct(t.data, n, e)
							}
						})))
			},
			...t.user && {
				user: ct(t.user, n, e)
			},
			...t.contexts && {
				contexts: ct(t.contexts, n, e)
			},
			...t.extra && {
				extra: ct(t.extra, n, e)
			}
		};
		return t.contexts && t.contexts.trace && (r.contexts = {}, r.contexts.trace = t.contexts.trace, t.contexts.trace.data && (r.contexts.trace.data = ct(t.contexts.trace.data, n, e))),
		t.spans && (r.spans = t.spans.map((t => (t.data && (t.data = ct(t.data, n, e)), t)))),
		r.sdkProcessingMetadata = {
			...r.sdkProcessingMetadata,
			baseClientNormalized: !0
		},
		r
	}
	ft(t) {
		var n = this.getOptions();
		const { environment: e, release: r, dist: i, maxValueLength: s = 250 } = n;
		"environment" in t || (t.environment = "environment" in n ? e : "production"),
		void 0 === t.release && void 0 !== r && (t.release = r),
		void 0 === t.dist && void 0 !== i && (t.dist = i),
		t.message && (t.message = S(t.message, s));
		var o = t.exception && t.exception.values && t.exception.values[0];
		o && o.value && (o.value = S(o.value, s));
		var u = t.request;
		u && u.url && (u.url = S(u.url, s))
	}
	ht(t) {
		var n = Object.keys(this.K);
		n.length > 0 && (t.sdk = t.sdk || {}, t.sdk.integrations = [...t.sdk.integrations || [], ...n])
	}
	rt(t, n = {}, e) {
		return this.dt(t, n, e).then((t => t.event_id), (t => {}))
	}
	dt(t, n, e) {
		const { beforeSend: r, sampleRate: i } = this.getOptions();
		if (!this.it())
			return vt(new m("SDK not enabled, will not capture event."));
		var s = "transaction" === t.type;
		return !s && "number" == typeof i && Math.random() > i ? (this.recordDroppedEvent("sample_rate", "error"), vt(new m(`Discarding event because it's not included in the random sample (sampling rate = ${i})`))) : this.ct(t, n, e).then((e => {
				if (null === e)
					throw this.recordDroppedEvent("event_processor", t.type || "error"), new m("An event processor returned null, will not send event.");
				return n.data && !0 === n.data.__sentry__ || s || !r ? e : function (t) {
					var n = "`beforeSend` method has to return `null` or a valid event.";
					if (d(t))
						return t.then((t => {
								if (!h(t) && null !== t)
									throw new m(n);
								return t
							}), (t => {
								throw new m(`beforeSend rejected with ${t}`)
							}));
					if (!h(t) && null !== t)
						throw new m(n);
					return t
				}
				(r(e, n))
			})).then((r => {
				if (null === r)
					throw this.recordDroppedEvent("before_send", t.type || "error"), new m("`beforeSend` returned `null`, will not send event.");
				var i = e && e.getSession();
				return !s && i && this.at(i, r),
				this.sendEvent(r, n),
				r
			})).then(null, (t => {
				if (t instanceof m)
					throw t;
				throw this.captureException(t, {
					data: {
						__sentry__: !0
					},
					originalException: t
				}),
				new m(`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.\nReason: ${t}`)
			}))
	}
	et(t) {
		this.V += 1,
		t.then((t => (this.V -= 1, t)), (t => (this.V -= 1, t)))
	}
	ut(t) {
		this.nt && this.tt && this.nt.send(t).then(null, (t => {}))
	}
	vt() {
		var t = this.Y;
		return this.Y = {},
		Object.keys(t).map((n => {
				const [e, r] = n.split(":");
				return {
					reason: e,
					category: r,
					quantity: t[n]
				}
			}))
	}
}
function nn(t, n, e = yt(t.bufferSize || 30)) {
	let r = {};
	return {
		send: function (i) {
			var s = [];
			if ($t(i, ((n, e) => {
						var i = Dt(e);
						!function (t, n, e = Date.now()) {
							return function (t, n) {
								return t[n] || t.all || 0
							}
							(t, n) > e
						}
						(r, i) ? s.push(n) : t.recordDroppedEvent("ratelimit_backoff", i)
					})), 0 === s.length)
				return dt();
			var o = Et(i[0], s),
			u = n => {
				$t(o, ((e, r) => {
						t.recordDroppedEvent(n, Dt(r))
					}))
			};
			return e.add((() => n({
						body: Ot(o, t.textEncoder)
					}).then((t => {
							r = Rt(r, t)
						}), (t => {
							u("network_error")
						})))).then((t => t), (t => {
					if (t instanceof m)
						return u("queue_overflow"), dt();
					throw t
				}))
		},
		flush: t => e.drain(t)
	}
}
var en = "7.1.1";
let rn;
class sn {
	constructor() {
		sn.prototype.__init.call(this)
	}
	static __initStatic() {
		this.id = "FunctionToString"
	}
	__init() {
		this.name = sn.id
	}
	setupOnce() {
		rn = Function.prototype.toString,
		Function.prototype.toString = function (...t) {
			var n = D(this) || this;
			return rn.apply(n, t)
		}
	}
}
sn.__initStatic();
var on = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/];
class un {
	static __initStatic() {
		this.id = "InboundFilters"
	}
	__init() {
		this.name = un.id
	}
	constructor(t = {}) {
		this.Z = t,
		un.prototype.__init.call(this)
	}
	setupOnce(t, n) {
		var e = t => {
			var e = n();
			if (e) {
				var r = e.getIntegration(un);
				if (r) {
					var i = e.getClient(),
					s = i ? i.getOptions() : {},
					o = function (t = {}, n = {}) {
						return {
							allowUrls: [...t.allowUrls || [], ...n.allowUrls || []],
							denyUrls: [...t.denyUrls || [], ...n.denyUrls || []],
							ignoreErrors: [...t.ignoreErrors || [], ...n.ignoreErrors || [], ...on],
							ignoreInternal: void 0 === t.ignoreInternal || t.ignoreInternal
						}
					}
					(r.Z, s);
					return function (t, n) {
						if (n.ignoreInternal && function (t) {
							try {
								return "SentryError" === t.exception.values[0].type
							} catch (t) {}
							return !1
						}
							(t))
							return !0;
						if (function (t, n) {
							if (!n || !n.length)
								return !1;
							return function (t) {
								if (t.message)
									return [t.message];
								if (t.exception)
									try {
										const { type: n = "", value: e = "" } = t.exception.values && t.exception.values[0] || {};
										return [`${e}`, `${n}: ${e}`]
									} catch (t) {
										return []
									}
								return []
							}
							(t).some((t => n.some((n => k(t, n)))))
						}
							(t, n.ignoreErrors))
							return !0;
						if (function (t, n) {
							if (!n || !n.length)
								return !1;
							var e = an(t);
							return !!e && n.some((t => k(e, t)))
						}
							(t, n.denyUrls))
							return !0;
						if (!function (t, n) {
							if (!n || !n.length)
								return !0;
							var e = an(t);
							return !e || n.some((t => k(e, t)))
						}
							(t, n.allowUrls))
							return !0;
						return !1
					}
					(t, o) ? null : t
				}
			}
			return t
		};
		e.id = this.name,
		t(e)
	}
}
function an(t) {
	try {
		let n;
		try {
			n = t.exception.values[0].stacktrace.frames
		} catch (t) {}
		return n ? function (t = []) {
			for (let e = t.length - 1; e >= 0; e--) {
				var n = t[e];
				if (n && "<anonymous>" !== n.filename && "[native code]" !== n.filename)
					return n.filename || null
			}
			return null
		}
		(n) : null
	} catch (t) {
		return null
	}
}
un.__initStatic();
var cn = Object.freeze({
	__proto__: null,
	FunctionToString: sn,
	InboundFilters: un
});
function fn(t, n) {
	const e = ln(t, n),
	r = {
		type: n && n.name,
		value: vn(n)
	};
	return e.length && (r.stacktrace = {
			frames: e
		}),
	void 0 === r.type && "" === r.value && (r.value = "Unrecoverable error caught"),
	r
}
function hn(t, n) {
	return {
		exception: {
			values: [fn(t, n)]
		}
	}
}
function ln(t, n) {
	const e = n.stacktrace || n.stack || "",
	r = function (t) {
		if (t) {
			if ("number" == typeof t.framesToPop)
				return t.framesToPop;
			if (dn.test(t.message))
				return 1
		}
		return 0
	}
	(n);
	try {
		return t(e, r)
	} catch (t) {}
	return []
}
const dn = /Minified React error #\d+;/i;
function vn(t) {
	const n = t && t.message;
	return n ? n.error && "string" == typeof n.error.message ? n.error.message : n : "No error message"
}
function pn(t, n, e, r, i) {
	let c;
	if (u(n) && n.error) {
		return hn(t, n.error)
	}
	if (a(n) || o(n, "DOMException")) {
		const i = n;
		if ("stack" in n)
			c = hn(t, n);
		else {
			const n = i.name || (a(i) ? "DOMError" : "DOMException"),
			s = i.message ? `${n}: ${i.message}` : n;
			c = yn(t, s, e, r),
			ot(c, s)
		}
		return "code" in i && (c.tags = {
				...c.tags,
				"DOMException.code": `${i.code}`
			}),
		c
	}
	if (s(n))
		return hn(t, n);
	if (h(n) || l(n)) {
		return c = function (t, n, e, r) {
			const i = {
				exception: {
					values: [{
							type: l(n) ? n.constructor.name : r ? "UnhandledRejection" : "Error",
							value: `Non-Error ${r ? "promise rejection" : "exception"} captured with keys: ${M(n)}`
						}
					]
				},
				extra: {
					__serialized__: ft(n)
				}
			};
			if (e) {
				const n = ln(t, e);
				n.length && (i.exception.values[0].stacktrace = {
						frames: n
					})
			}
			return i
		}
		(t, n, e, i),
		ut(c, {
			synthetic: !0
		}),
		c
	}
	return c = yn(t, n, e, r),
	ot(c, `${n}`, void 0),
	ut(c, {
		synthetic: !0
	}),
	c
}
function yn(t, n, e, r) {
	const i = {
		message: n
	};
	if (r && e) {
		const r = ln(t, e);
		r.length && (i.exception = {
				values: [{
						value: n,
						stacktrace: {
							frames: r
						}
					}
				]
			})
	}
	return i
}
const mn = "Breadcrumbs";
class gn {
	static __initStatic() {
		this.id = mn
	}
	__init() {
		this.name = gn.id
	}
	constructor(t) {
		gn.prototype.__init.call(this),
		this.options = {
			console: !0,
			dom: !0,
			fetch: !0,
			history: !0,
			sentry: !0,
			xhr: !0,
			...t
		}
	}
	setupOnce() {
		this.options.console && W("console", _n),
		this.options.dom && W("dom", function (t) {
			function n(n) {
				let e,
				r = "object" == typeof t ? t.serializeAttribute : void 0;
				"string" == typeof r && (r = [r]);
				try {
					e = n.event.target ? p(n.event.target, r) : p(n.event, r)
				} catch (t) {
					e = "<unknown>"
				}
				0 !== e.length && Ht().addBreadcrumb({
					category: `ui.${n.name}`,
					message: e
				}, {
					event: n.event,
					name: n.name,
					global: n.global
				})
			}
			return n
		}
			(this.options.dom)),
		this.options.xhr && W("xhr", bn),
		this.options.fetch && W("fetch", wn),
		this.options.history && W("history", xn)
	}
}
function _n(t) {
	const n = {
		category: "console",
		data: {
			arguments: t.args,
			logger: "console"
		},
		level: (e = t.level, "warn" === e ? "warning" : mt.includes(e) ? e : "log"),
		message: $(t.args, " ")
	};
	var e;
	if ("assert" === t.level) {
		if (!1 !== t.args[0])
			return;
		n.message = `Assertion failed: ${$(t.args.slice(1), " ") || "console.assert"}`,
		n.data.arguments = t.args.slice(1)
	}
	Ht().addBreadcrumb(n, {
		input: t.args,
		level: t.level
	})
}
function bn(t) {
	if (t.endTimestamp) {
		if (t.xhr.__sentry_own_request__)
			return;
		const { method: n, url: e, status_code: r, body: i } = t.xhr.__sentry_xhr__ || {};
		Ht().addBreadcrumb({
			category: "xhr",
			data: {
				method: n,
				url: e,
				status_code: r
			},
			type: "http"
		}, {
			xhr: t.xhr,
			input: i
		})
	} else ;
}
function wn(t) {
	t.endTimestamp && (t.fetchData.url.match(/sentry_key/) && "POST" === t.fetchData.method || (t.error ? Ht().addBreadcrumb({
				category: "fetch",
				data: t.fetchData,
				level: "error",
				type: "http"
			}, {
				data: t.error,
				input: t.args
			}) : Ht().addBreadcrumb({
				category: "fetch",
				data: {
					...t.fetchData,
					status_code: t.response.status
				},
				type: "http"
			}, {
				input: t.args,
				response: t.response
			})))
}
function xn(t) {
	const n = e();
	let r = t.from,
	i = t.to;
	const s = rt(n.location.href);
	let o = rt(r);
	const u = rt(i);
	o.path || (o = s),
	s.protocol === u.protocol && s.host === u.host && (i = u.relative),
	s.protocol === o.protocol && s.host === o.host && (r = o.relative),
	Ht().addBreadcrumb({
		category: "navigation",
		data: {
			from: r,
			to: i
		}
	})
}
gn.__initStatic();
const En = e();
let Sn;
function $n() {
	if (Sn)
		return Sn;
	if (H(En.fetch))
		return Sn = En.fetch.bind(En);
	const t = En.document;
	let n = En.fetch;
	if (t && "function" == typeof t.createElement)
		try {
			const e = t.createElement("iframe");
			e.hidden = !0,
			t.head.appendChild(e);
			const r = e.contentWindow;
			r && r.fetch && (n = r.fetch),
			t.head.removeChild(e)
		} catch (t) {}
	return Sn = n.bind(En)
}
const kn = e();
class On extends tn {
	constructor(t) {
		t.ot = t.ot || {},
		t.ot.sdk = t.ot.sdk || {
			name: "sentry.javascript.browser",
			packages: [{
					name: "npm:@sentry/browser",
					version: en
				}
			],
			version: en
		},
		super(t),
		t.sendClientReports && kn.document && kn.document.addEventListener("visibilitychange", (() => {
				"hidden" === kn.document.visibilityState && this.yt()
			}))
	}
	eventFromException(t, n) {
		return function (t, n, e, r) {
			const i = pn(t, n, e && e.syntheticException || void 0, r);
			return ut(i),
			i.level = "error",
			e && e.event_id && (i.event_id = e.event_id),
			dt(i)
		}
		(this.Z.stackParser, t, n, this.Z.attachStacktrace)
	}
	eventFromMessage(t, n = "info", e) {
		return function (t, n, e = "info", r, i) {
			const s = yn(t, n, r && r.syntheticException || void 0, i);
			return s.level = e,
			r && r.event_id && (s.event_id = r.event_id),
			dt(s)
		}
		(this.Z.stackParser, t, n, e, this.Z.attachStacktrace)
	}
	sendEvent(t, n) {
		const e = this.getIntegrationById(mn);
		e && e.options && e.options.sentry && Ht().addBreadcrumb({
			category: "sentry." + ("transaction" === t.type ? "transaction" : "event"),
			event_id: t.event_id,
			level: t.level,
			message: st(t)
		}, {
			event: t
		}),
		super.sendEvent(t, n)
	}
	ct(t, n, e) {
		return t.platform = t.platform || "javascript",
		super.ct(t, n, e)
	}
	yt() {
		const t = this.vt();
		if (0 === t.length)
			return;
		if (!this.tt)
			return;
		const n = Jt(this.tt, this.Z.tunnel),
		e = (r = t, Et((i = this.Z.tunnel && _(this.tt)) ? {
				dsn: i
			} : {}, [[{
							type: "client_report"
						}, {
							timestamp: s || wt(),
							discarded_events: r
						}
					]]));
		var r,
		i,
		s;
		try {
			!function (t, n) {
				"[object Navigator]" === Object.prototype.toString.call(En && En.navigator) && "function" == typeof En.navigator.sendBeacon ? En.navigator.sendBeacon.bind(En.navigator)(t, n) : P() && $n()(t, {
					body: n,
					method: "POST",
					credentials: "omit",
					keepalive: !0
				}).then(null, (t => {}))
			}
			(n, Ot(e))
		} catch (t) {}
	}
}
function jn(t, n = $n()) {
	return nn(t, (function (e) {
			const r = {
				body: e.body,
				method: "POST",
				referrerPolicy: "origin",
				headers: t.headers,
				...t.fetchOptions
			};
			return n(t.url, r).then((t => ({
						statusCode: t.status,
						headers: {
							"x-sentry-rate-limits": t.headers.get("X-Sentry-Rate-Limits"),
							"retry-after": t.headers.get("Retry-After")
						}
					})))
		}))
}
function Tn(t) {
	return nn(t, (function (n) {
			return new pt(((e, r) => {
					const i = new XMLHttpRequest;
					i.onerror = r,
					i.onreadystatechange = () => {
						4 === i.readyState && e({
							statusCode: i.status,
							headers: {
								"x-sentry-rate-limits": i.getResponseHeader("X-Sentry-Rate-Limits"),
								"retry-after": i.getResponseHeader("Retry-After")
							}
						})
					},
					i.open("POST", t.url);
					for (const n in t.headers)
						Object.prototype.hasOwnProperty.call(t.headers, n) && i.setRequestHeader(n, t.headers[n]);
					i.send(n.body)
				}))
		}))
}
const Dn = "?";
function Rn(t, n, e, r) {
	const i = {
		filename: t,
		function : n, in_app: !0
};
return void 0 !== e && (i.lineno = e),
void 0 !== r && (i.colno = r),
i
}
const In = /^\s*at (?:(.*?) ?\((?:address at )?)?((?:file|https?|blob|chrome-extension|address|native|eval|webpack|<anonymous>|[-a-z]+:|.*bundle|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,
Cn = /\((\S*)(?::(\d+))(?::(\d+))\)/,
Mn = [30, t => {
		const n = In.exec(t);
		if (n) {
			if (n[2] && 0 === n[2].indexOf("eval")) {
				const t = Cn.exec(n[2]);
				t && (n[2] = t[1], n[3] = t[2], n[4] = t[3])
			}
			const [t, e] = Wn(n[1] || Dn, n[2]);
			return Rn(e, t, n[3] ? +n[3] : void 0, n[4] ? +n[4] : void 0)
		}
	}
],
An = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension|capacitor).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js)|\/[\w\-. /=]+)(?::(\d+))?(?::(\d+))?\s*$/i,
Nn = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i,
Ln = [50, t => {
		const n = An.exec(t);
		if (n) {
			if (n[3] && n[3].indexOf(" > eval") > -1) {
				const t = Nn.exec(n[3]);
				t && (n[1] = n[1] || "eval", n[3] = t[1], n[4] = t[2], n[5] = "")
			}
			let t = n[3],
			e = n[1] || Dn;
			return [e, t] = Wn(e, t),
			Rn(t, e, n[4] ? +n[4] : void 0, n[5] ? +n[5] : void 0)
		}
	}
],
Un = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,
qn = [40, t => {
		const n = Un.exec(t);
		return n ? Rn(n[2], n[1] || Dn, +n[3], n[4] ? +n[4] : void 0) : void 0
	}
],
Pn = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,
Hn = [10, t => {
		const n = Pn.exec(t);
		return n ? Rn(n[2], n[3] || Dn, +n[1]) : void 0
	}
],
Fn = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^)]+))\(.*\))? in (.*):\s*$/i,
Bn = [20, t => {
		const n = Fn.exec(t);
		return n ? Rn(n[5], n[3] || n[4] || Dn, +n[1], +n[2]) : void 0
	}
],
zn = [Mn, Ln, qn],
Xn = L(...zn),
Wn = (t, n) => {
	const e = -1 !== t.indexOf("safari-extension"),
	r = -1 !== t.indexOf("safari-web-extension");
	return e || r ? [-1 !== t.indexOf("@") ? t.split("@")[0] : Dn, e ? `safari-extension:${n}` : `safari-web-extension:${n}`] : [t, n]
};
let Jn = 0;
function Kn() {
	return Jn > 0
}
function Gn() {
	Jn += 1,
	setTimeout((() => {
			Jn -= 1
		}))
}
function Vn(t, n = {}, e) {
	if ("function" != typeof t)
		return t;
	try {
		const n = t.__sentry_wrapped__;
		if (n)
			return n;
		if (D(t))
			return t
	} catch (n) {
		return t
	}
	const sentryWrapped = function () {
		const r = Array.prototype.slice.call(arguments);
		try {
			e && "function" == typeof e && e.apply(this, arguments);
			const i = r.map((t => Vn(t, n)));
			return t.apply(this, i)
		} catch (t) {
			throw Gn(),
			zt((e => {
					e.addEventProcessor((t => (n.mechanism && (ot(t, void 0, void 0), ut(t, n.mechanism)), t.extra = {
									...t.extra,
									arguments: r
								}, t))),
					captureException(t)
				})),
			t
		}
	};
	try {
		for (const n in t)
			Object.prototype.hasOwnProperty.call(t, n) && (sentryWrapped[n] = t[n])
	} catch (t) {}
	T(sentryWrapped, t),
	j(t, "__sentry_wrapped__", sentryWrapped);
	try {
		Object.getOwnPropertyDescriptor(sentryWrapped, "name").configurable && Object.defineProperty(sentryWrapped, "name", {
			get: () => t.name
		})
	} catch (t) {}
	return sentryWrapped
}
class Qn {
	static __initStatic() {
		this.id = "GlobalHandlers"
	}
	__init() {
		this.name = Qn.id
	}
	__init2() {
		this.gt = {
			onerror: Yn,
			onunhandledrejection: Zn
		}
	}
	constructor(t) {
		Qn.prototype.__init.call(this),
		Qn.prototype.__init2.call(this),
		this.Z = {
			onerror: !0,
			onunhandledrejection: !0,
			...t
		}
	}
	setupOnce() {
		Error.stackTraceLimit = 50;
		const t = this.Z;
		for (const n in t) {
			const e = this.gt[n];
			e && t[n] && (e(), this.gt[n] = void 0)
		}
	}
}
function Yn() {
	W("error", (t => {
			const [n, e, r] = ee();
			if (!n.getIntegration(Qn))
				return;
			const { msg: i, url: s, line: o, column: a, error: f } = t;
			if (Kn() || f && f.__sentry_own_request__)
				return;
			const h = void 0 === f && c(i) ? function (t, n, e, r) {
				const i = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/i;
				let s = u(t) ? t.message : t,
				o = "Error";
				const a = s.match(i);
				a && (o = a[1], s = a[2]);
				return te({
					exception: {
						values: [{
								type: o,
								value: s
							}
						]
					}
				}, n, e, r)
			}
			(i, s, o, a) : te(pn(e, f || i, void 0, r, !1), s, o, a);
			h.level = "error",
			ne(n, f, h, "onerror")
		}))
}
function Zn() {
	W("unhandledrejection", (t => {
			const [n, e, r] = ee();
			if (!n.getIntegration(Qn))
				return;
			let i = t;
			try {
				"reason" in t ? i = t.reason : "detail" in t && "reason" in t.detail && (i = t.detail.reason)
			} catch (t) {}
			if (Kn() || i && i.__sentry_own_request__)
				return !0;
			const s = f(i) ? {
				exception: {
					values: [{
							type: "UnhandledRejection",
							value: `Non-Error promise rejection captured with value: ${String(i)}`
						}
					]
				}
			} : pn(e, i, void 0, r, !0);
			s.level = "error",
			ne(n, i, s, "onunhandledrejection")
		}))
}
function te(t, n, r, i) {
	const s = t.exception = t.exception || {},
	o = s.values = s.values || [],
	u = o[0] = o[0] || {},
	a = u.stacktrace = u.stacktrace || {},
	f = a.frames = a.frames || [],
	h = isNaN(parseInt(i, 10)) ? void 0 : i,
	l = isNaN(parseInt(r, 10)) ? void 0 : r,
	d = c(n) && n.length > 0 ? n : function () {
		var t = e();
		try {
			return t.document.location.href
		} catch (t) {
			return ""
		}
	}
	();
	return 0 === f.length && f.push({
		colno: h,
		filename: d,
		function : "?", in_app: !0, lineno: l
}),
t
}
function ne(t, n, e, r) {
	ut(e, {
		handled: !1,
		type: r
	}),
	t.captureEvent(e, {
		originalException: n
	})
}
function ee() {
	const t = Ht(),
	n = t.getClient(),
	e = n && n.getOptions() || {
		stackParser: () => [],
		attachStacktrace: !1
	};
	return [t, e.stackParser, e.attachStacktrace]
}
Qn.__initStatic();
const re = ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"];
class ie {
	static __initStatic() {
		this.id = "TryCatch"
	}
	__init() {
		this.name = ie.id
	}
	constructor(t) {
		ie.prototype.__init.call(this),
		this.Z = {
			XMLHttpRequest: !0,
			eventTarget: !0,
			requestAnimationFrame: !0,
			setInterval: !0,
			setTimeout: !0,
			...t
		}
	}
	setupOnce() {
		const t = e();
		this.Z.setTimeout && O(t, "setTimeout", se),
		this.Z.setInterval && O(t, "setInterval", se),
		this.Z.requestAnimationFrame && O(t, "requestAnimationFrame", oe),
		this.Z.XMLHttpRequest && "XMLHttpRequest" in t && O(XMLHttpRequest.prototype, "send", ue);
		const n = this.Z.eventTarget;
		if (n) {
			(Array.isArray(n) ? n : re).forEach(ae)
		}
	}
}
function se(t) {
	return function (...n) {
		const e = n[0];
		return n[0] = Vn(e, {
			mechanism: {
				data: {
					function : q(t)
			},
			handled: !0,
			type: "instrument"
		}
	}),
t.apply(this, n)
}
}
function oe(t) {
	return function (n) {
		return t.apply(this, [Vn(n, {
					mechanism: {
						data: {
							function : "requestAnimationFrame", handler: q(t)
					},
					handled: !0,
					type: "instrument"
				}
			})])
}
}
function ue(t) {
	return function (...n) {
		const e = this;
		return ["onload", "onerror", "onprogress", "onreadystatechange"].forEach((t => {
				t in e && "function" == typeof e[t] && O(e, t, (function (n) {
						const e = {
							mechanism: {
								data: {
									function : t, handler: q(n)
							},
							handled: !0,
							type: "instrument"
						}
					},
					r = D(n);
					return r && (e.mechanism.data.handler = q(r)),
					Vn(n, e)
				}))
		})),
	t.apply(this, n)
}
}
function ae(t) {
	const n = e(),
	r = n[t] && n[t].prototype;
	r && r.hasOwnProperty && r.hasOwnProperty("addEventListener") && (O(r, "addEventListener", (function (n) {
				return function (e, r, i) {
					try {
						"function" == typeof r.handleEvent && (r.handleEvent = Vn(r.handleEvent, {
								mechanism: {
									data: {
										function : "handleEvent", handler: q(r), target: t
								},
								handled: !0,
								type: "instrument"
							}
						}))
			} catch (t) {}
			return n.apply(this, [e, Vn(r, {
						mechanism: {
							data: {
								function : "addEventListener", handler: q(r), target: t
						},
						handled: !0,
						type: "instrument"
					}
				}), i])
	}
})), O(r, "removeEventListener", (function (t) {
	return function (n, e, r) {
		const i = e;
		try {
			const e = i && i.__sentry_wrapped__;
			e && t.call(this, n, e, r)
		} catch (t) {}
		return t.call(this, n, i, r)
	}
})))
}
ie.__initStatic();
class ce {
	static __initStatic() {
		this.id = "LinkedErrors"
	}
	__init() {
		this.name = ce.id
	}
	constructor(t = {}) {
		ce.prototype.__init.call(this),
		this._t = t.key || "cause",
		this.bt = t.limit || 5
	}
	setupOnce() {
		const t = Ht().getClient();
		t && Nt(((n, e) => {
				const r = Ht().getIntegration(ce);
				return r ? function (t, n, e, r, i) {
					if (!(r.exception && r.exception.values && i && v(i.originalException, Error)))
						return r;
					const s = fe(t, e, i.originalException, n);
					return r.exception.values = [...s, ...r.exception.values],
					r
				}
				(t.getOptions().stackParser, r._t, r.bt, n, e) : n
			}))
	}
}
function fe(t, n, e, r, i = []) {
	if (!v(e[r], Error) || i.length + 1 >= n)
		return i;
	const s = fn(t, e[r]);
	return fe(t, n, e[r], r, [s, ...i])
}
ce.__initStatic();
const he = e();
class le {
	constructor() {
		le.prototype.__init.call(this)
	}
	static __initStatic() {
		this.id = "HttpContext"
	}
	__init() {
		this.name = le.id
	}
	setupOnce() {
		Nt((t => {
				if (Ht().getIntegration(le)) {
					if (!he.navigator && !he.location && !he.document)
						return t;
					const n = t.request && t.request.url || he.location && he.location.href, {
						referrer: e
					} = he.document || {}, {
						userAgent: r
					} = he.navigator || {},
					i = {
						...n && {
							url: n
						},
						headers: {
							...t.request && t.request.headers,
							...e && {
								Referer: e
							},
							...r && {
								"User-Agent": r
							}
						}
					};
					return {
						...t,
						request: i
					}
				}
				return t
			}))
	}
}
le.__initStatic();
class de {
	constructor() {
		de.prototype.__init.call(this)
	}
	static __initStatic() {
		this.id = "Dedupe"
	}
	__init() {
		this.name = de.id
	}
	setupOnce(t, n) {
		const e = t => {
			const e = n().getIntegration(de);
			if (e) {
				try {
					if (function (t, n) {
						if (!n)
							return !1;
						if (function (t, n) {
							const e = t.message,
							r = n.message;
							if (!e && !r)
								return !1;
							if (e && !r || !e && r)
								return !1;
							if (e !== r)
								return !1;
							if (!pe(t, n))
								return !1;
							if (!ve(t, n))
								return !1;
							return !0
						}
							(t, n))
							return !0;
						if (function (t, n) {
							const e = ye(n),
							r = ye(t);
							if (!e || !r)
								return !1;
							if (e.type !== r.type || e.value !== r.value)
								return !1;
							if (!pe(t, n))
								return !1;
							if (!ve(t, n))
								return !1;
							return !0
						}
							(t, n))
							return !0;
						return !1
					}
						(t, e.wt))
						return null
				} catch (n) {
					return e.wt = t
				}
				return e.wt = t
			}
			return t
		};
		e.id = this.name,
		t(e)
	}
}
function ve(t, n) {
	let e = me(t),
	r = me(n);
	if (!e && !r)
		return !0;
	if (e && !r || !e && r)
		return !1;
	if (e = e, r = r, r.length !== e.length)
		return !1;
	for (let t = 0; t < r.length; t++) {
		const n = r[t],
		i = e[t];
		if (n.filename !== i.filename || n.lineno !== i.lineno || n.colno !== i.colno || n.function !== i.function)
			return !1
	}
	return !0
}
function pe(t, n) {
	let e = t.fingerprint,
	r = n.fingerprint;
	if (!e && !r)
		return !0;
	if (e && !r || !e && r)
		return !1;
	e = e,
	r = r;
	try {
		return !(e.join("") !== r.join(""))
	} catch (t) {
		return !1
	}
}
function ye(t) {
	return t.exception && t.exception.values && t.exception.values[0]
}
function me(t) {
	const n = t.exception;
	if (n)
		try {
			return n.values[0].stacktrace.frames
		} catch (t) {
			return
		}
}
de.__initStatic();
var ge = Object.freeze({
	__proto__: null,
	GlobalHandlers: Qn,
	TryCatch: ie,
	Breadcrumbs: gn,
	LinkedErrors: ce,
	HttpContext: le,
	Dedupe: de
});
const _e = [new un, new sn, new ie, new gn, new Qn, new ce, new de, new le];
function be(t) {
	t.startSession({
		ignoreDuration: !0
	}),
	t.captureSession()
}
let we = {};
const xe = e();
xe.Sentry && xe.Sentry.Integrations && (we = xe.Sentry.Integrations);
const Ee = {
	...we,
	...cn,
	...ge
};
return t.Breadcrumbs = gn,
t.BrowserClient = On,
t.Dedupe = de,
t.FunctionToString = sn,
t.GlobalHandlers = Qn,
t.HttpContext = le,
t.Hub = Ut,
t.InboundFilters = un,
t.Integrations = Ee,
t.LinkedErrors = ce,
t.SDK_VERSION = en,
t.Scope = Mt,
t.TryCatch = ie,
t.addBreadcrumb = function (t) {
	Ht().addBreadcrumb(t)
},
t.addGlobalEventProcessor = Nt,
t.captureEvent = function (t, n) {
	return Ht().captureEvent(t, n)
},
t.captureException = captureException,
t.captureMessage = function (t, n) {
	var e = "string" == typeof n ? n : void 0,
	r = "string" != typeof n ? {
		captureContext: n
	} : void 0;
	return Ht().captureMessage(t, e, r)
},
t.chromeStackLineParser = Mn,
t.close = function (t) {
	const n = Ht().getClient();
	return n ? n.close(t) : dt(!1)
},
t.configureScope = function (t) {
	Ht().configureScope(t)
},
t.createTransport = nn,
t.defaultIntegrations = _e,
t.defaultStackLineParsers = zn,
t.defaultStackParser = Xn,
t.flush = function (t) {
	const n = Ht().getClient();
	return n ? n.flush(t) : dt(!1)
},
t.forceLoad = function () {},
t.geckoStackLineParser = Ln,
t.getCurrentHub = Ht,
t.getHubFromCarrier = Ft,
t.init = function (t = {}) {
	if (void 0 === t.defaultIntegrations && (t.defaultIntegrations = _e), void 0 === t.release) {
		const n = e();
		n.SENTRY_RELEASE && n.SENTRY_RELEASE.id && (t.release = n.SENTRY_RELEASE.id)
	}
	void 0 === t.autoSessionTracking && (t.autoSessionTracking = !0),
	void 0 === t.sendClientReports && (t.sendClientReports = !0);
	const n = {
		...t,
		stackParser: (r = t.stackParser || Xn, Array.isArray(r) ? L(...r) : r),
		integrations: Zt(t),
		transport: t.transport || (P() ? jn : Tn)
	};
	var r;
	!function (t, n) {
		!0 === n.debug && console.warn("[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.");
		var e = Ht(),
		r = e.getScope();
		r && r.update(n.initialScope);
		var i = new t(n);
		e.bindClient(i)
	}
	(On, n),
	t.autoSessionTracking && function () {
		const t = e();
		if (void 0 === t.document)
			return;
		const n = Ht();
		if (!n.captureSession)
			return;
		be(n),
		W("history", (({
					from: t,
					to: n
				}) => {
				void 0 !== t && t !== n && be(Ht())
			}))
	}
	()
},
t.lastEventId = function () {
	return Ht().lastEventId()
},
t.makeFetchTransport = jn,
t.makeMain = Pt,
t.makeXHRTransport = Tn,
t.onLoad = function (t) {
	t()
},
t.opera10StackLineParser = Hn,
t.opera11StackLineParser = Bn,
t.setContext = function (t, n) {
	Ht().setContext(t, n)
},
t.setExtra = function (t, n) {
	Ht().setExtra(t, n)
},
t.setExtras = function (t) {
	Ht().setExtras(t)
},
t.setTag = function (t, n) {
	Ht().setTag(t, n)
},
t.setTags = function (t) {
	Ht().setTags(t)
},
t.setUser = function (t) {
	Ht().setUser(t)
},
t.showReportDialog = function (t = {}, n = Ht()) {
	const r = e();
	if (!r.document)
		return;
	const { client: i, scope: s } = n.getStackTop(),
	o = t.dsn || i && i.getDsn();
	if (!o)
		return;
	s && (t.user = {
			...s.getUser(),
			...t.user
		}),
	t.eventId || (t.eventId = n.lastEventId());
	const u = r.document.createElement("script");
	u.async = !0,
	u.src = function (t, n) {
		var e = w(t),
		r = `${Xt(e)}embed/error-page/`;
		let i = `dsn=${_(e)}`;
		for (var s in n)
			if ("dsn" !== s)
				if ("user" === s) {
					var o = n.user;
					if (!o)
						continue;
					o.name && (i += `&name=${encodeURIComponent(o.name)}`),
					o.email && (i += `&email=${encodeURIComponent(o.email)}`)
				} else
					i += `&${encodeURIComponent(s)}=${encodeURIComponent(n[s])}`;
		return `${r}?${i}`
	}
	(o, t),
	t.onLoad && (u.onload = t.onLoad);
	const a = r.document.head || r.document.body;
	a && a.appendChild(u)
},
t.startTransaction = function (t, n) {
	return Ht().startTransaction({
		...t
	}, n)
},
t.winjsStackLineParser = qn,
t.withScope = zt,
t.wrap = function (t) {
	return Vn(t)()
},
t
}
({});
