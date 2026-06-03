/*
 * jQuery JavaScript Library v1.4.2
 * http://jquery.com/
 *
 * Copyright 2010, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2010, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Sat Feb 13 22:33:48 2010 -0500
 */
(function (aQ, S) {
	function a2() {
		if (!aj.isReady) {
			try {
				U.documentElement.doScroll("left")
			} catch (c) {
				setTimeout(a2, 1);
				return
			}
			aj.ready()
		}
	}
	function I(w, c) {
		c.src ? aj.ajax({
			url: c.src,
			async: false,
			dataType: "script"
		}) : aj.globalEval(c.text || c.textContent || c.innerHTML || "");
		c.parentNode && c.parentNode.removeChild(c)
	}
	function ar(w, c, L, G, J, A) {
		var F = w.length;
		if (typeof c === "object") {
			for (var K in c) {
				ar(w, K, c[K], G, J, L)
			}
			return w
		}
		if (L !== S) {
			G = !A && G && aj.isFunction(L);
			for (K = 0; K < F; K++) {
				J(w[K], c, G ? L.call(w[K], K, J(w[K], c)) : L, A)
			}
			return w
		}
		return F ? J(w[0], c) : S
	}
	function aH() {
		return (new Date).getTime()
	}
	function aq() {
		return false
	}
	function ao() {
		return true
	}
	function aM(w, c, A) {
		A[0].type = w;
		return aj.event.handle.apply(c, A)
	}
	function ai(P) {
		var O,
		N = [],
		K = [],
		L = arguments,
		G,
		J,
		w,
		F,
		A,
		c;
		J = aj.data(this, "events");
		if (!(P.liveFired === this || !J || !J.live || P.button && P.type === "click")) {
			P.liveFired = this;
			var Q = J.live.slice(0);
			for (F = 0; F < Q.length; F++) {
				J = Q[F];
				J.origType.replace(aB, "") === P.type ? K.push(J.selector) : Q.splice(F--, 1)
			}
			G = aj(P.target).closest(K, P.currentTarget);
			A = 0;
			for (c = G.length; A < c; A++) {
				for (F = 0; F < Q.length; F++) {
					J = Q[F];
					if (G[A].selector === J.selector) {
						w = G[A].elem;
						K = null;
						if (J.preType === "mouseenter" || J.preType === "mouseleave") {
							K = aj(P.relatedTarget).closest(J.selector)[0]
						}
						if (!K || K !== w) {
							N.push({
								elem: w,
								handleObj: J
							})
						}
					}
				}
			}
			A = 0;
			for (c = N.length; A < c; A++) {
				G = N[A];
				P.currentTarget = G.elem;
				P.data = G.handleObj.data;
				P.handleObj = G.handleObj;
				if (G.handleObj.origHandler.apply(G.elem, L) === false) {
					O = false;
					break
				}
			}
			return O
		}
	}
	function C(w, c) {
		return "live." + (w && w !== "*" ? w + "." : "") + c.replace(/\./g, "`").replace(/ /g, "&")
	}
	function m(c) {
		return !c || !c.parentNode || c.parentNode.nodeType === 11
	}
	function bl(w, c) {
		var A = 0;
		c.each(function () {
			if (this.nodeName === (w[A] && w[A].nodeName)) {
				var J = aj.data(w[A++]),
				K = aj.data(this, J);
				if (J = J && J.events) {
					delete K.handle;
					K.events = {};
					for (var F in J) {
						for (var G in J[F]) {
							aj.event.add(this, F, J[F][G], J[F][G].data)
						}
					}
				}
			}
		})
	}
	function a5(w, c, J) {
		var F,
		G,
		A;
		c = c && c[0] ? c[0].ownerDocument || c[0] : U;
		if (w.length === 1 && typeof w[0] === "string" && w[0].length < 512 && c === U && !aR.test(w[0]) && (aj.support.checkClone || !am.test(w[0]))) {
			G = true;
			if (A = aj.fragments[w[0]]) {
				if (A !== 1) {
					F = A
				}
			}
		}
		if (!F) {
			F = c.createDocumentFragment();
			aj.clean(w, c, F, J)
		}
		if (G) {
			aj.fragments[w[0]] = A ? F : 1
		}
		return {
			fragment: F,
			cacheable: G
		}
	}
	function aE(w, c) {
		var A = {};
		aj.each(H.concat.apply([], H.slice(0, c)), function () {
			A[this] = w
		});
		return A
	}
	function p(c) {
		return "scrollTo" in c && c.document ? c : c.nodeType === 9 ? c.defaultView || c.parentWindow : false
	}
	var aj = function (w, c) {
		return new aj.fn.init(w, c)
	},
	q = aQ.jQuery,
	e = aQ.$,
	U = aQ.document,
	av,
	a9 = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/,
	aV = /^.[^:#\[\.,]*$/,
	ap = /\S/,
	M = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
	r = /^<(\w+)\s*\/?>(?:<\/\1>)?$/,
	az = navigator.userAgent,
	d = false,
	ax = [],
	aD,
	a3 = Object.prototype.toString,
	aX = Object.prototype.hasOwnProperty,
	aA = Array.prototype.push,
	aw = Array.prototype.slice,
	a8 = Array.prototype.indexOf;
	aj.fn = aj.prototype = {
		init: function (w, c) {
			var F,
			A;
			if (!w) {
				return this
			}
			if (w.nodeType) {
				this.context = this[0] = w;
				this.length = 1;
				return this
			}
			if (w === "body" && !c) {
				this.context = U;
				this[0] = U.body;
				this.selector = "body";
				this.length = 1;
				return this
			}
			if (typeof w === "string") {
				if ((F = a9.exec(w)) && (F[1] || !c)) {
					if (F[1]) {
						A = c ? c.ownerDocument || c : U;
						if (w = r.exec(w)) {
							if (aj.isPlainObject(c)) {
								w = [U.createElement(w[1])];
								aj.fn.attr.call(w, c, true)
							} else {
								w = [A.createElement(w[1])]
							}
						} else {
							w = a5([F[1]], [A]);
							w = (w.cacheable ? w.fragment.cloneNode(true) : w.fragment).childNodes
						}
						return aj.merge(this, w)
					} else {
						if (c = U.getElementById(F[2])) {
							if (c.id !== F[2]) {
								return av.find(w)
							}
							this.length = 1;
							this[0] = c
						}
						this.context = U;
						this.selector = w;
						return this
					}
				} else {
					if (!c && /^\w+$/.test(w)) {
						this.selector = w;
						this.context = U;
						w = U.getElementsByTagName(w);
						return aj.merge(this, w)
					} else {
						return !c || c.jquery ? (c || av).find(w) : aj(c).find(w)
					}
				}
			} else {
				if (aj.isFunction(w)) {
					return av.ready(w)
				}
			}
			if (w.selector !== S) {
				this.selector = w.selector;
				this.context = w.context
			}
			return aj.makeArray(w, this)
		},
		selector: "",
		jquery: "1.4.2",
		length: 0,
		size: function () {
			return this.length
		},
		toArray: function () {
			return aw.call(this, 0)
		},
		get: function (c) {
			return c == null ? this.toArray() : c < 0 ? this.slice(c)[0] : this[c]
		},
		pushStack: function (w, c, F) {
			var A = aj();
			aj.isArray(w) ? aA.apply(A, w) : aj.merge(A, w);
			A.prevObject = this;
			A.context = this.context;
			if (c === "find") {
				A.selector = this.selector + (this.selector ? " " : "") + F
			} else {
				if (c) {
					A.selector = this.selector + "." + c + "(" + F + ")"
				}
			}
			return A
		},
		each: function (w, c) {
			return aj.each(this, w, c)
		},
		ready: function (c) {
			aj.bindReady();
			if (aj.isReady) {
				c.call(U, aj)
			} else {
				ax && ax.push(c)
			}
			return this
		},
		eq: function (c) {
			return c === -1 ? this.slice(c) : this.slice(c, +c + 1)
		},
		first: function () {
			return this.eq(0)
		},
		last: function () {
			return this.eq(-1)
		},
		slice: function () {
			return this.pushStack(aw.apply(this, arguments), "slice", aw.call(arguments).join(","))
		},
		map: function (c) {
			return this.pushStack(aj.map(this, function (w, A) {
					return c.call(w, A, w)
				}))
		},
		end: function () {
			return this.prevObject || aj(null)
		},
		push: aA,
		sort: [].sort,
		splice: [].splice
	};
	aj.fn.init.prototype = aj.fn;
	aj.extend = aj.fn.extend = function () {
		var w = arguments[0] || {},
		c = 1,
		L = arguments.length,
		G = false,
		J,
		A,
		F,
		K;
		if (typeof w === "boolean") {
			G = w;
			w = arguments[1] || {};
			c = 2
		}
		if (typeof w !== "object" && !aj.isFunction(w)) {
			w = {}
		}
		if (L === c) {
			w = this;
			--c
		}
		for (; c < L; c++) {
			if ((J = arguments[c]) != null) {
				for (A in J) {
					F = w[A];
					K = J[A];
					if (w !== K) {
						if (G && K && (aj.isPlainObject(K) || aj.isArray(K))) {
							F = F && (aj.isPlainObject(F) || aj.isArray(F)) ? F : aj.isArray(K) ? [] : {};
							w[A] = aj.extend(G, F, K)
						} else {
							if (K !== S) {
								w[A] = K
							}
						}
					}
				}
			}
		}
		return w
	};
	aj.extend({
		noConflict: function (c) {
			aQ.$ = e;
			if (c) {
				aQ.jQuery = q
			}
			return aj
		},
		isReady: false,
		ready: function () {
			if (!aj.isReady) {
				if (!U.body) {
					return setTimeout(aj.ready, 13)
				}
				aj.isReady = true;
				if (ax) {
					for (var w, c = 0; w = ax[c++]; ) {
						w.call(U, aj)
					}
					ax = null
				}
				aj.fn.triggerHandler && aj(U).triggerHandler("ready")
			}
		},
		bindReady: function () {
			if (!d) {
				d = true;
				if (U.readyState === "complete") {
					return aj.ready()
				}
				if (U.addEventListener) {
					U.addEventListener("DOMContentLoaded", aD, false);
					aQ.addEventListener("load", aj.ready, false)
				} else {
					if (U.attachEvent) {
						U.attachEvent("onreadystatechange", aD);
						aQ.attachEvent("onload", aj.ready);
						var w = false;
						try {
							w = aQ.frameElement == null
						} catch (c) {}
						U.documentElement.doScroll && w && a2()
					}
				}
			}
		},
		isFunction: function (c) {
			return a3.call(c) === "[object Function]"
		},
		isArray: function (c) {
			return a3.call(c) === "[object Array]"
		},
		isPlainObject: function (w) {
			if (!w || a3.call(w) !== "[object Object]" || w.nodeType || w.setInterval) {
				return false
			}
			if (w.constructor && !aX.call(w, "constructor") && !aX.call(w.constructor.prototype, "isPrototypeOf")) {
				return false
			}
			var c;
			for (c in w) {}
			return c === S || aX.call(w, c)
		},
		isEmptyObject: function (w) {
			for (var c in w) {
				return false
			}
			return true
		},
		error: function (c) {
			throw c
		},
		parseJSON: function (c) {
			if (typeof c !== "string" || !c) {
				return null
			}
			c = aj.trim(c);
			if (/^[\],:{}\s]*$/.test(c.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
				return aQ.JSON && aQ.JSON.parse ? aQ.JSON.parse(c) : (new Function("return " + c))()
			} else {
				aj.error("Invalid JSON: " + c)
			}
		},
		noop: function () {},
		globalEval: function (w) {
			if (w && ap.test(w)) {
				var c = U.getElementsByTagName("head")[0] || U.documentElement,
				A = U.createElement("script");
				A.type = "text/javascript";
				if (aj.support.scriptEval) {
					A.appendChild(U.createTextNode(w))
				} else {
					A.text = w
				}
				c.insertBefore(A, c.firstChild);
				c.removeChild(A)
			}
		},
		nodeName: function (w, c) {
			return w.nodeName && w.nodeName.toUpperCase() === c.toUpperCase()
		},
		each: function (w, c, K) {
			var G,
			J = 0,
			A = w.length,
			F = A === S || aj.isFunction(w);
			if (K) {
				if (F) {
					for (G in w) {
						if (c.apply(w[G], K) === false) {
							break
						}
					}
				} else {
					for (; J < A; ) {
						if (c.apply(w[J++], K) === false) {
							break
						}
					}
				}
			} else {
				if (F) {
					for (G in w) {
						if (c.call(w[G], G, w[G]) === false) {
							break
						}
					}
				} else {
					for (K = w[0]; J < A && c.call(K, J, K) !== false; K = w[++J]) {}
				}
			}
			return w
		},
		trim: function (c) {
			return (c || "").replace(M, "")
		},
		makeArray: function (w, c) {
			c = c || [];
			if (w != null) {
				w.length == null || typeof w === "string" || aj.isFunction(w) || typeof w !== "function" && w.setInterval ? aA.call(c, w) : aj.merge(c, w)
			}
			return c
		},
		inArray: function (w, c) {
			if (c.indexOf) {
				return c.indexOf(w)
			}
			for (var F = 0, A = c.length; F < A; F++) {
				if (c[F] === w) {
					return F
				}
			}
			return -1
		},
		merge: function (w, c) {
			var G = w.length,
			A = 0;
			if (typeof c.length === "number") {
				for (var F = c.length; A < F; A++) {
					w[G++] = c[A]
				}
			} else {
				for (; c[A] !== S; ) {
					w[G++] = c[A++]
				}
			}
			w.length = G;
			return w
		},
		grep: function (w, c, J) {
			for (var F = [], G = 0, A = w.length; G < A; G++) {
				!J !== !c(w[G], G) && F.push(w[G])
			}
			return F
		},
		map: function (w, c, K) {
			for (var G = [], J, A = 0, F = w.length; A < F; A++) {
				J = c(w[A], A, K);
				if (J != null) {
					G[G.length] = J
				}
			}
			return G.concat.apply([], G)
		},
		guid: 1,
		proxy: function (w, c, A) {
			if (arguments.length === 2) {
				if (typeof c === "string") {
					A = w;
					w = A[c];
					c = S
				} else {
					if (c && !aj.isFunction(c)) {
						A = c;
						c = S
					}
				}
			}
			if (!c && w) {
				c = function () {
					return w.apply(A || this, arguments)
				}
			}
			if (w) {
				c.guid = w.guid = w.guid || c.guid || aj.guid++
			}
			return c
		},
		uaMatch: function (c) {
			c = c.toLowerCase();
			c = /(webkit)[ \/]([\w.]+)/.exec(c) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(c) || /(msie) ([\w.]+)/.exec(c) || !/compatible/.test(c) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(c) || [];
			return {
				browser: c[1] || "",
				version: c[2] || "0"
			}
		},
		browser: {}
	});
	az = aj.uaMatch(az);
	if (az.browser) {
		aj.browser[az.browser] = true;
		aj.browser.version = az.version
	}
	if (aj.browser.webkit) {
		aj.browser.safari = true
	}
	if (a8) {
		aj.inArray = function (w, c) {
			return a8.call(c, w)
		}
	}
	av = aj(U);
	if (U.addEventListener) {
		aD = function () {
			U.removeEventListener("DOMContentLoaded", aD, false);
			aj.ready()
		}
	} else {
		if (U.attachEvent) {
			aD = function () {
				if (U.readyState === "complete") {
					U.detachEvent("onreadystatechange", aD);
					aj.ready()
				}
			}
		}
	}
	(function () {
		aj.support = {};
		var N = U.documentElement,
		L = U.createElement("script"),
		K = U.createElement("div"),
		G = "script" + aH();
		K.style.display = "none";
		K.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
		var J = K.getElementsByTagName("*"),
		A = K.getElementsByTagName("a")[0];
		if (!(!J || !J.length || !A)) {
			aj.support = {
				leadingWhitespace: K.firstChild.nodeType === 3,
				tbody: !K.getElementsByTagName("tbody").length,
				htmlSerialize: !!K.getElementsByTagName("link").length,
				style: /red/.test(A.getAttribute("style")),
				hrefNormalized: A.getAttribute("href") === "/a",
				opacity: /^0.55$/.test(A.style.opacity),
				cssFloat: !!A.style.cssFloat,
				checkOn: K.getElementsByTagName("input")[0].value === "on",
				optSelected: U.createElement("select").appendChild(U.createElement("option")).selected,
				parentNode: K.removeChild(K.appendChild(U.createElement("div"))).parentNode === null,
				deleteExpando: true,
				checkClone: false,
				scriptEval: false,
				noCloneEvent: true,
				boxModel: null
			};
			L.type = "text/javascript";
			try {
				L.appendChild(U.createTextNode("window." + G + "=1;"))
			} catch (F) {}
			N.insertBefore(L, N.firstChild);
			if (aQ[G]) {
				aj.support.scriptEval = true;
				delete aQ[G]
			}
			try {
				delete L.test
			} catch (c) {
				aj.support.deleteExpando = false
			}
			N.removeChild(L);
			if (K.attachEvent && K.fireEvent) {
				K.attachEvent("onclick", function w() {
					aj.support.noCloneEvent = false;
					K.detachEvent("onclick", w)
				});
				K.cloneNode(true).fireEvent("onclick")
			}
			K = U.createElement("div");
			K.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>";
			N = U.createDocumentFragment();
			N.appendChild(K.firstChild);
			aj.support.checkClone = N.cloneNode(true).cloneNode(true).lastChild.checked;
			aj(function () {
				var O = U.createElement("div");
				O.style.width = O.style.paddingLeft = "1px";
				U.body.appendChild(O);
				aj.boxModel = aj.support.boxModel = O.offsetWidth === 2;
				U.body.removeChild(O).style.display = "none"
			});
			N = function (O) {
				var Q = U.createElement("div");
				O = "on" + O;
				var P = O in Q;
				if (!P) {
					Q.setAttribute(O, "return;");
					P = typeof Q[O] === "function"
				}
				return P
			};
			aj.support.submitBubbles = N("submit");
			aj.support.changeBubbles = N("change");
			N = L = K = J = A = null
		}
	})();
	aj.props = {
		"for": "htmlFor",
		"class": "className",
		readonly: "readOnly",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		rowspan: "rowSpan",
		colspan: "colSpan",
		tabindex: "tabIndex",
		usemap: "useMap",
		frameborder: "frameBorder"
	};
	var aJ = "jQuery" + aH(),
	f = 0,
	aU = {};
	aj.extend({
		cache: {},
		expando: aJ,
		noData: {
			embed: true,
			object: true,
			applet: true
		},
		data: function (w, c, G) {
			if (!(w.nodeName && aj.noData[w.nodeName.toLowerCase()])) {
				w = w == aQ ? aU : w;
				var A = w[aJ],
				F = aj.cache;
				if (!A && typeof c === "string" && G === S) {
					return null
				}
				A || (A = ++f);
				if (typeof c === "object") {
					w[aJ] = A;
					F[A] = aj.extend(true, {}, c)
				} else {
					if (!F[A]) {
						w[aJ] = A;
						F[A] = {}
					}
				}
				w = F[A];
				if (G !== S) {
					w[c] = G
				}
				return typeof c === "string" ? w[c] : w
			}
		},
		removeData: function (w, c) {
			if (!(w.nodeName && aj.noData[w.nodeName.toLowerCase()])) {
				w = w == aQ ? aU : w;
				var G = w[aJ],
				A = aj.cache,
				F = A[G];
				if (c) {
					if (F) {
						delete F[c];
						aj.isEmptyObject(F) && aj.removeData(w)
					}
				} else {
					if (aj.support.deleteExpando) {
						delete w[aj.expando]
					} else {
						w.removeAttribute && w.removeAttribute(aj.expando)
					}
					delete A[G]
				}
			}
		}
	});
	aj.fn.extend({
		data: function (w, c) {
			if (typeof w === "undefined" && this.length) {
				return aj.data(this[0])
			} else {
				if (typeof w === "object") {
					return this.each(function () {
						aj.data(this, w)
					})
				}
			}
			var F = w.split(".");
			F[1] = F[1] ? "." + F[1] : "";
			if (c === S) {
				var A = this.triggerHandler("getData" + F[1] + "!", [F[0]]);
				if (A === S && this.length) {
					A = aj.data(this[0], w)
				}
				return A === S && F[1] ? this.data(F[0]) : A
			} else {
				return this.trigger("setData" + F[1] + "!", [F[0], c]).each(function () {
					aj.data(this, w, c)
				})
			}
		},
		removeData: function (c) {
			return this.each(function () {
				aj.removeData(this, c)
			})
		}
	});
	aj.extend({
		queue: function (w, c, F) {
			if (w) {
				c = (c || "fx") + "queue";
				var A = aj.data(w, c);
				if (!F) {
					return A || []
				}
				if (!A || aj.isArray(F)) {
					A = aj.data(w, c, aj.makeArray(F))
				} else {
					A.push(F)
				}
				return A
			}
		},
		dequeue: function (w, c) {
			c = c || "fx";
			var F = aj.queue(w, c),
			A = F.shift();
			if (A === "inprogress") {
				A = F.shift()
			}
			if (A) {
				c === "fx" && F.unshift("inprogress");
				A.call(w, function () {
					aj.dequeue(w, c)
				})
			}
		}
	});
	aj.fn.extend({
		queue: function (w, c) {
			if (typeof w !== "string") {
				c = w;
				w = "fx"
			}
			if (c === S) {
				return aj.queue(this[0], w)
			}
			return this.each(function () {
				var A = aj.queue(this, w, c);
				w === "fx" && A[0] !== "inprogress" && aj.dequeue(this, w)
			})
		},
		dequeue: function (c) {
			return this.each(function () {
				aj.dequeue(this, c)
			})
		},
		delay: function (w, c) {
			w = aj.fx ? aj.fx.speeds[w] || w : w;
			c = c || "fx";
			return this.queue(c, function () {
				var A = this;
				setTimeout(function () {
					aj.dequeue(A, c)
				}, w)
			})
		},
		clearQueue: function (c) {
			return this.queue(c || "fx", [])
		}
	});
	var bg = /[\n\t]/g,
	ad = /\s+/,
	bc = /\r/g,
	aO = /href|src|style/,
	aW = /(button|input)/i,
	ay = /(button|input|object|select|textarea)/i,
	ac = /^(a|area)$/i,
	a0 = /radio|checkbox/;
	aj.fn.extend({
		attr: function (w, c) {
			return ar(this, w, c, true, aj.attr)
		},
		removeAttr: function (c) {
			return this.each(function () {
				aj.attr(this, c, "");
				this.nodeType === 1 && this.removeAttribute(c)
			})
		},
		addClass: function (N) {
			if (aj.isFunction(N)) {
				return this.each(function (P) {
					var O = aj(this);
					O.addClass(N.call(this, P, O.attr("class")))
				})
			}
			if (N && typeof N === "string") {
				for (var L = (N || "").split(ad), K = 0, G = this.length; K < G; K++) {
					var J = this[K];
					if (J.nodeType === 1) {
						if (J.className) {
							for (var A = " " + J.className + " ", F = J.className, c = 0, w = L.length; c < w; c++) {
								if (A.indexOf(" " + L[c] + " ") < 0) {
									F += " " + L[c]
								}
							}
							J.className = aj.trim(F)
						} else {
							J.className = N
						}
					}
				}
			}
			return this
		},
		removeClass: function (w) {
			if (aj.isFunction(w)) {
				return this.each(function (N) {
					var O = aj(this);
					O.removeClass(w.call(this, N, O.attr("class")))
				})
			}
			if (w && typeof w === "string" || w === S) {
				for (var c = (w || "").split(ad), L = 0, G = this.length; L < G; L++) {
					var J = this[L];
					if (J.nodeType === 1 && J.className) {
						if (w) {
							for (var A = (" " + J.className + " ").replace(bg, " "), F = 0, K = c.length; F < K; F++) {
								A = A.replace(" " + c[F] + " ", " ")
							}
							J.className = aj.trim(A)
						} else {
							J.className = ""
						}
					}
				}
			}
			return this
		},
		toggleClass: function (w, c) {
			var F = typeof w,
			A = typeof c === "boolean";
			if (aj.isFunction(w)) {
				return this.each(function (J) {
					var G = aj(this);
					G.toggleClass(w.call(this, J, G.attr("class"), c), c)
				})
			}
			return this.each(function () {
				if (F === "string") {
					for (var L, J = 0, K = aj(this), N = c, G = w.split(ad); L = G[J++]; ) {
						N = A ? N : !K.hasClass(L);
						K[N ? "addClass" : "removeClass"](L)
					}
				} else {
					if (F === "undefined" || F === "boolean") {
						this.className && aj.data(this, "__className__", this.className);
						this.className = this.className || w === false ? "" : aj.data(this, "__className__") || ""
					}
				}
			})
		},
		hasClass: function (w) {
			w = " " + w + " ";
			for (var c = 0, A = this.length; c < A; c++) {
				if ((" " + this[c].className + " ").replace(bg, " ").indexOf(w) > -1) {
					return true
				}
			}
			return false
		},
		val: function (w) {
			if (w === S) {
				var c = this[0];
				if (c) {
					if (aj.nodeName(c, "option")) {
						return (c.attributes.value || {}).specified ? c.value : c.text
					}
					if (aj.nodeName(c, "select")) {
						var L = c.selectedIndex,
						G = [],
						J = c.options;
						c = c.type === "select-one";
						if (L < 0) {
							return null
						}
						var A = c ? L : 0;
						for (L = c ? L + 1 : J.length; A < L; A++) {
							var F = J[A];
							if (F.selected) {
								w = aj(F).val();
								if (c) {
									return w
								}
								G.push(w)
							}
						}
						return G
					}
					if (a0.test(c.type) && !aj.support.checkOn) {
						return c.getAttribute("value") === null ? "on" : c.value
					}
					return (c.value || "").replace(bc, "")
				}
				return S
			}
			var K = aj.isFunction(w);
			return this.each(function (N) {
				var Q = aj(this),
				P = w;
				if (this.nodeType === 1) {
					if (K) {
						P = w.call(this, N, Q.val())
					}
					if (typeof P === "number") {
						P += ""
					}
					if (aj.isArray(P) && a0.test(this.type)) {
						this.checked = aj.inArray(Q.val(), P) >= 0
					} else {
						if (aj.nodeName(this, "select")) {
							var O = aj.makeArray(P);
							aj("option", this).each(function () {
								this.selected = aj.inArray(aj(this).val(), O) >= 0
							});
							if (!O.length) {
								this.selectedIndex = -1
							}
						} else {
							this.value = P
						}
					}
				}
			})
		}
	});
	aj.extend({
		attrFn: {
			val: true,
			css: true,
			html: true,
			text: true,
			data: true,
			width: true,
			height: true,
			offset: true
		},
		attr: function (w, c, J, F) {
			if (!w || w.nodeType === 3 || w.nodeType === 8) {
				return S
			}
			if (F && c in aj.attrFn) {
				return aj(w)[c](J)
			}
			F = w.nodeType !== 1 || !aj.isXMLDoc(w);
			var G = J !== S;
			c = F && aj.props[c] || c;
			if (w.nodeType === 1) {
				var A = aO.test(c);
				if (c in w && F && !A) {
					if (G) {
						c === "type" && aW.test(w.nodeName) && w.parentNode && aj.error("type property can't be changed");
						w[c] = J
					}
					if (aj.nodeName(w, "form") && w.getAttributeNode(c)) {
						return w.getAttributeNode(c).nodeValue
					}
					if (c === "tabIndex") {
						return (c = w.getAttributeNode("tabIndex")) && c.specified ? c.value : ay.test(w.nodeName) || ac.test(w.nodeName) && w.href ? 0 : S
					}
					return w[c]
				}
				if (!aj.support.style && F && c === "style") {
					if (G) {
						w.style.cssText = "" + J
					}
					return w.style.cssText
				}
				G && w.setAttribute(c, "" + J);
				w = !aj.support.hrefNormalized && F && A ? w.getAttribute(c, 2) : w.getAttribute(c);
				return w === null ? S : w
			}
			return aj.style(w, c, J)
		}
	});
	var aB = /\.(.*)$/,
	t = function (c) {
		return c.replace(/[^\w\s\.\|`]/g, function (w) {
			return "\\" + w
		})
	};
	aj.event = {
		add: function (Q, P, N, K) {
			if (!(Q.nodeType === 3 || Q.nodeType === 8)) {
				if (Q.setInterval && Q !== aQ && !Q.frameElement) {
					Q = aQ
				}
				var L,
				G;
				if (N.handler) {
					L = N;
					N = L.handler
				}
				if (!N.guid) {
					N.guid = aj.guid++
				}
				if (G = aj.data(Q)) {
					var J = G.events = G.events || {},
					w = G.handle;
					if (!w) {
						G.handle = w = function () {
							return typeof aj !== "undefined" && !aj.event.triggered ? aj.event.handle.apply(w.elem, arguments) : S
						}
					}
					w.elem = Q;
					P = P.split(" ");
					for (var F, A = 0, c; F = P[A++]; ) {
						G = L ? aj.extend({}, L) : {
							handler: N,
							data: K
						};
						if (F.indexOf(".") > -1) {
							c = F.split(".");
							F = c.shift();
							G.namespace = c.slice(0).sort().join(".")
						} else {
							c = [];
							G.namespace = ""
						}
						G.type = F;
						G.guid = N.guid;
						var R = J[F],
						O = aj.event.special[F] || {};
						if (!R) {
							R = J[F] = [];
							if (!O.setup || O.setup.call(Q, K, c, w) === false) {
								if (Q.addEventListener) {
									Q.addEventListener(F, w, false)
								} else {
									Q.attachEvent && Q.attachEvent("on" + F, w)
								}
							}
						}
						if (O.add) {
							O.add.call(Q, G);
							if (!G.handler.guid) {
								G.handler.guid = N.guid
							}
						}
						R.push(G);
						aj.event.global[F] = true
					}
					Q = null
				}
			}
		},
		global: {},
		remove: function (T, R, P, N) {
			if (!(T.nodeType === 3 || T.nodeType === 8)) {
				var O,
				K = 0,
				L,
				F,
				J,
				G,
				c,
				V,
				Q = aj.data(T),
				w = Q && Q.events;
				if (Q && w) {
					if (R && R.type) {
						P = R.handler;
						R = R.type
					}
					if (!R || typeof R === "string" && R.charAt(0) === ".") {
						R = R || "";
						for (O in w) {
							aj.event.remove(T, O + R)
						}
					} else {
						for (R = R.split(" "); O = R[K++]; ) {
							G = O;
							L = O.indexOf(".") < 0;
							F = [];
							if (!L) {
								F = O.split(".");
								O = F.shift();
								J = new RegExp("(^|\\.)" + aj.map(F.slice(0).sort(), t).join("\\.(?:.*\\.)?") + "(\\.|$)")
							}
							if (c = w[O]) {
								if (P) {
									G = aj.event.special[O] || {};
									for (A = N || 0; A < c.length; A++) {
										V = c[A];
										if (P.guid === V.guid) {
											if (L || J.test(V.namespace)) {
												N == null && c.splice(A--, 1);
												G.remove && G.remove.call(T, V)
											}
											if (N != null) {
												break
											}
										}
									}
									if (c.length === 0 || N != null && c.length === 1) {
										if (!G.teardown || G.teardown.call(T, F) === false) {
											aI(T, O, Q.handle)
										}
										delete w[O]
									}
								} else {
									for (var A = 0; A < c.length; A++) {
										V = c[A];
										if (L || J.test(V.namespace)) {
											aj.event.remove(T, G, V.handler, A);
											c.splice(A--, 1)
										}
									}
								}
							}
						}
						if (aj.isEmptyObject(w)) {
							if (R = Q.handle) {
								R.elem = null
							}
							delete Q.events;
							delete Q.handle;
							aj.isEmptyObject(Q) && aj.removeData(T)
						}
					}
				}
			}
		},
		trigger: function (O, N, L, J) {
			var K = O.type || O;
			if (!J) {
				O = typeof O === "object" ? O[aJ] ? O : aj.extend(aj.Event(K), O) : aj.Event(K);
				if (K.indexOf("!") >= 0) {
					O.type = K = K.slice(0, -1);
					O.exclusive = true
				}
				if (!L) {
					O.stopPropagation();
					aj.event.global[K] && aj.each(aj.cache, function () {
						this.events && this.events[K] && aj.event.trigger(O, N, this.handle.elem)
					})
				}
				if (!L || L.nodeType === 3 || L.nodeType === 8) {
					return S
				}
				O.result = S;
				O.target = L;
				N = aj.makeArray(N);
				N.unshift(O)
			}
			O.currentTarget = L;
			(J = aj.data(L, "handle")) && J.apply(L, N);
			J = L.parentNode || L.ownerDocument;
			try {
				if (!(L && L.nodeName && aj.noData[L.nodeName.toLowerCase()])) {
					if (L["on" + K] && L["on" + K].apply(L, N) === false) {
						O.result = false
					}
				}
			} catch (F) {}
			if (!O.isPropagationStopped() && J) {
				aj.event.trigger(O, N, J, true)
			} else {
				if (!O.isDefaultPrevented()) {
					J = O.target;
					var G,
					c = aj.nodeName(J, "a") && K === "click",
					A = aj.event.special[K] || {};
					if ((!A._default || A._default.call(L, O) === false) && !c && !(J && J.nodeName && aj.noData[J.nodeName.toLowerCase()])) {
						try {
							if (J[K]) {
								if (G = J["on" + K]) {
									J["on" + K] = null
								}
								aj.event.triggered = true;
								J[K]()
							}
						} catch (w) {}
						if (G) {
							J["on" + K] = G
						}
						aj.event.triggered = false
					}
				}
			}
		},
		handle: function (w) {
			var c,
			K,
			G,
			J;
			w = arguments[0] = aj.event.fix(w || aQ.event);
			w.currentTarget = this;
			c = w.type.indexOf(".") < 0 && !w.exclusive;
			if (!c) {
				K = w.type.split(".");
				w.type = K.shift();
				G = new RegExp("(^|\\.)" + K.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)")
			}
			J = aj.data(this, "events");
			K = J[w.type];
			if (J && K) {
				K = K.slice(0);
				J = 0;
				for (var A = K.length; J < A; J++) {
					var F = K[J];
					if (c || G.test(F.namespace)) {
						w.handler = F.handler;
						w.data = F.data;
						w.handleObj = F;
						F = F.handler.apply(this, arguments);
						if (F !== S) {
							w.result = F;
							if (F === false) {
								w.preventDefault();
								w.stopPropagation()
							}
						}
						if (w.isImmediatePropagationStopped()) {
							break
						}
					}
				}
			}
			return w.result
		},
		props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
		fix: function (w) {
			if (w[aJ]) {
				return w
			}
			var c = w;
			w = aj.Event(c);
			for (var F = this.props.length, A; F; ) {
				A = this.props[--F];
				w[A] = c[A]
			}
			if (!w.target) {
				w.target = w.srcElement || U
			}
			if (w.target.nodeType === 3) {
				w.target = w.target.parentNode
			}
			if (!w.relatedTarget && w.fromElement) {
				w.relatedTarget = w.fromElement === w.target ? w.toElement : w.fromElement
			}
			if (w.pageX == null && w.clientX != null) {
				c = U.documentElement;
				F = U.body;
				w.pageX = w.clientX + (c && c.scrollLeft || F && F.scrollLeft || 0) - (c && c.clientLeft || F && F.clientLeft || 0);
				w.pageY = w.clientY + (c && c.scrollTop || F && F.scrollTop || 0) - (c && c.clientTop || F && F.clientTop || 0)
			}
			if (!w.which && (w.charCode || w.charCode === 0 ? w.charCode : w.keyCode)) {
				w.which = w.charCode || w.keyCode
			}
			if (!w.metaKey && w.ctrlKey) {
				w.metaKey = w.ctrlKey
			}
			if (!w.which && w.button !== S) {
				w.which = w.button & 1 ? 1 : w.button & 2 ? 3 : w.button & 4 ? 2 : 0
			}
			return w
		},
		guid: 100000000,
		proxy: aj.proxy,
		special: {
			ready: {
				setup: aj.bindReady,
				teardown: aj.noop
			},
			live: {
				add: function (c) {
					aj.event.add(this, c.origType, aj.extend({}, c, {
							handler: ai
						}))
				},
				remove: function (w) {
					var c = true,
					A = w.origType.replace(aB, "");
					aj.each(aj.data(this, "events").live || [], function () {
						if (A === this.origType.replace(aB, "")) {
							return c = false
						}
					});
					c && aj.event.remove(this, w.origType, ai)
				}
			},
			beforeunload: {
				setup: function (w, c, A) {
					if (this.setInterval) {
						this.onbeforeunload = A
					}
					return false
				},
				teardown: function (w, c) {
					if (this.onbeforeunload === c) {
						this.onbeforeunload = null
					}
				}
			}
		}
	};
	var aI = U.removeEventListener ? function (w, c, A) {
		w.removeEventListener(c, A, false)
	} : function (w, c, A) {
		w.detachEvent("on" + c, A)
	};
	aj.Event = function (c) {
		if (!this.preventDefault) {
			return new aj.Event(c)
		}
		if (c && c.type) {
			this.originalEvent = c;
			this.type = c.type
		} else {
			this.type = c
		}
		this.timeStamp = aH();
		this[aJ] = true
	};
	aj.Event.prototype = {
		preventDefault: function () {
			this.isDefaultPrevented = ao;
			var c = this.originalEvent;
			if (c) {
				c.preventDefault && c.preventDefault();
				c.returnValue = false
			}
		},
		stopPropagation: function () {
			this.isPropagationStopped = ao;
			var c = this.originalEvent;
			if (c) {
				c.stopPropagation && c.stopPropagation();
				c.cancelBubble = true
			}
		},
		stopImmediatePropagation: function () {
			this.isImmediatePropagationStopped = ao;
			this.stopPropagation()
		},
		isDefaultPrevented: aq,
		isPropagationStopped: aq,
		isImmediatePropagationStopped: aq
	};
	var ag = function (w) {
		var c = w.relatedTarget;
		try {
			for (; c && c !== this; ) {
				c = c.parentNode
			}
			if (c !== this) {
				w.type = w.data;
				aj.event.handle.apply(this, arguments)
			}
		} catch (A) {}
	},
	y = function (c) {
		c.type = c.data;
		aj.event.handle.apply(this, arguments)
	};
	aj.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	}, function (w, c) {
		aj.event.special[w] = {
			setup: function (A) {
				aj.event.add(this, c, A && A.selector ? y : ag, w)
			},
			teardown: function (A) {
				aj.event.remove(this, c, A && A.selector ? y : ag)
			}
		}
	});
	if (!aj.support.submitBubbles) {
		aj.event.special.submit = {
			setup: function () {
				if (this.nodeName.toLowerCase() !== "form") {
					aj.event.add(this, "click.specialSubmit", function (w) {
						var c = w.target,
						A = c.type;
						if ((A === "submit" || A === "image") && aj(c).closest("form").length) {
							return aM("submit", this, arguments)
						}
					});
					aj.event.add(this, "keypress.specialSubmit", function (w) {
						var c = w.target,
						A = c.type;
						if ((A === "text" || A === "password") && aj(c).closest("form").length && w.keyCode === 13) {
							return aM("submit", this, arguments)
						}
					})
				} else {
					return false
				}
			},
			teardown: function () {
				aj.event.remove(this, ".specialSubmit")
			}
		}
	}
	if (!aj.support.changeBubbles) {
		var u = /textarea|input|select/i,
		h,
		k = function (w) {
			var c = w.type,
			A = w.value;
			if (c === "radio" || c === "checkbox") {
				A = w.checked
			} else {
				if (c === "select-multiple") {
					A = w.selectedIndex > -1 ? aj.map(w.options, function (F) {
						return F.selected
					}).join("-") : ""
				} else {
					if (w.nodeName.toLowerCase() === "select") {
						A = w.selectedIndex
					}
				}
			}
			return A
		},
		bf = function (w, c) {
			var G = w.target,
			A,
			F;
			if (!(!u.test(G.nodeName) || G.readOnly)) {
				A = aj.data(G, "_change_data");
				F = k(G);
				if (w.type !== "focusout" || G.type !== "radio") {
					aj.data(G, "_change_data", F)
				}
				if (!(A === S || F === A)) {
					if (A != null || F) {
						w.type = "change";
						return aj.event.trigger(w, c, G)
					}
				}
			}
		};
		aj.event.special.change = {
			filters: {
				focusout: bf,
				click: function (w) {
					var c = w.target,
					A = c.type;
					if (A === "radio" || A === "checkbox" || c.nodeName.toLowerCase() === "select") {
						return bf.call(this, w)
					}
				},
				keydown: function (w) {
					var c = w.target,
					A = c.type;
					if (w.keyCode === 13 && c.nodeName.toLowerCase() !== "textarea" || w.keyCode === 32 && (A === "checkbox" || A === "radio") || A === "select-multiple") {
						return bf.call(this, w)
					}
				},
				beforeactivate: function (c) {
					c = c.target;
					aj.data(c, "_change_data", k(c))
				}
			},
			setup: function () {
				if (this.type === "file") {
					return false
				}
				for (var c in h) {
					aj.event.add(this, c + ".specialChange", h[c])
				}
				return u.test(this.nodeName)
			},
			teardown: function () {
				aj.event.remove(this, ".specialChange");
				return u.test(this.nodeName)
			}
		};
		h = aj.event.special.change.filters
	}
	U.addEventListener && aj.each({
		focus: "focusin",
		blur: "focusout"
	}, function (w, c) {
		function A(F) {
			F = aj.event.fix(F);
			F.type = c;
			return aj.event.handle.call(this, F)
		}
		aj.event.special[c] = {
			setup: function () {
				this.addEventListener(w, A, true)
			},
			teardown: function () {
				this.removeEventListener(w, A, true)
			}
		}
	});
	aj.each(["bind", "one"], function (w, c) {
		aj.fn[c] = function (L, G, J) {
			if (typeof L === "object") {
				for (var A in L) {
					this[c](A, G, L[A], J)
				}
				return this
			}
			if (aj.isFunction(G)) {
				J = G;
				G = S
			}
			var F = c === "one" ? aj.proxy(J, function (N) {
				aj(this).unbind(N, F);
				return J.apply(this, arguments)
			}) : J;
			if (L === "unload" && c !== "one") {
				this.one(L, G, J)
			} else {
				A = 0;
				for (var K = this.length; A < K; A++) {
					aj.event.add(this[A], L, F, G)
				}
			}
			return this
		}
	});
	aj.fn.extend({
		unbind: function (w, c) {
			if (typeof w === "object" && !w.preventDefault) {
				for (var F in w) {
					this.unbind(F, w[F])
				}
			} else {
				F = 0;
				for (var A = this.length; F < A; F++) {
					aj.event.remove(this[F], w, c)
				}
			}
			return this
		},
		delegate: function (w, c, F, A) {
			return this.live(c, F, A, w)
		},
		undelegate: function (w, c, A) {
			return arguments.length === 0 ? this.unbind("live") : this.die(c, null, A, w)
		},
		trigger: function (w, c) {
			return this.each(function () {
				aj.event.trigger(w, c, this)
			})
		},
		triggerHandler: function (w, c) {
			if (this[0]) {
				w = aj.Event(w);
				w.preventDefault();
				w.stopPropagation();
				aj.event.trigger(w, c, this[0]);
				return w.result
			}
		},
		toggle: function (w) {
			for (var c = arguments, A = 1; A < c.length; ) {
				aj.proxy(w, c[A++])
			}
			return this.click(aj.proxy(w, function (F) {
					var G = (aj.data(this, "lastToggle" + w.guid) || 0) % A;
					aj.data(this, "lastToggle" + w.guid, G + 1);
					F.preventDefault();
					return c[G].apply(this, arguments) || false
				}))
		},
		hover: function (w, c) {
			return this.mouseenter(w).mouseleave(c || w)
		}
	});
	var bj = {
		focus: "focusin",
		blur: "focusout",
		mouseenter: "mouseover",
		mouseleave: "mouseout"
	};
	aj.each(["live", "die"], function (w, c) {
		aj.fn[c] = function (P, N, O, K) {
			var L,
			F = 0,
			J,
			G,
			A = K || this.selector,
			Q = K ? this : aj(this.context);
			if (aj.isFunction(N)) {
				O = N;
				N = S
			}
			for (P = (P || "").split(" "); (L = P[F++]) != null; ) {
				K = aB.exec(L);
				J = "";
				if (K) {
					J = K[0];
					L = L.replace(aB, "")
				}
				if (L === "hover") {
					P.push("mouseenter" + J, "mouseleave" + J)
				} else {
					G = L;
					if (L === "focus" || L === "blur") {
						P.push(bj[L] + J);
						L += J
					} else {
						L = (bj[L] || L) + J
					}
					c === "live" ? Q.each(function () {
						aj.event.add(this, C(L, A), {
							data: N,
							selector: A,
							handler: O,
							origType: L,
							origHandler: O,
							preType: G
						})
					}) : Q.unbind(C(L, A), O)
				}
			}
			return this
		}
	});
	aj.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "), function (w, c) {
		aj.fn[c] = function (A) {
			return A ? this.bind(c, A) : this.trigger(c)
		};
		if (aj.attrFn) {
			aj.attrFn[c] = true
		}
	});
	aQ.attachEvent && !aQ.addEventListener && aQ.attachEvent("onunload", function () {
		for (var w in aj.cache) {
			if (aj.cache[w].handle) {
				try {
					aj.event.remove(aj.cache[w].handle.elem)
				} catch (c) {}
			}
		}
	});
	(function () {
		function X(ba) {
			for (var ab = "", aa, Z = 0; ba[Z]; Z++) {
				aa = ba[Z];
				if (aa.nodeType === 3 || aa.nodeType === 4) {
					ab += aa.nodeValue
				} else {
					if (aa.nodeType !== 8) {
						ab += X(aa.childNodes)
					}
				}
			}
			return ab
		}
		function W(bn, bb, ba, ab, Z, aa) {
			Z = 0;
			for (var bp = ab.length; Z < bp; Z++) {
				var bq = ab[Z];
				if (bq) {
					bq = bq[bn];
					for (var bo = false; bq; ) {
						if (bq.sizcache === ba) {
							bo = ab[bq.sizset];
							break
						}
						if (bq.nodeType === 1 && !aa) {
							bq.sizcache = ba;
							bq.sizset = Z
						}
						if (bq.nodeName.toLowerCase() === bb) {
							bo = bq;
							break
						}
						bq = bq[bn]
					}
					ab[Z] = bo
				}
			}
		}
		function V(bn, bb, ba, ab, Z, aa) {
			Z = 0;
			for (var bp = ab.length; Z < bp; Z++) {
				var bq = ab[Z];
				if (bq) {
					bq = bq[bn];
					for (var bo = false; bq; ) {
						if (bq.sizcache === ba) {
							bo = ab[bq.sizset];
							break
						}
						if (bq.nodeType === 1) {
							if (!aa) {
								bq.sizcache = ba;
								bq.sizset = Z
							}
							if (typeof bb !== "string") {
								if (bq === bb) {
									bo = true;
									break
								}
							} else {
								if (O.filter(bb, [bq]).length > 0) {
									bo = bq;
									break
								}
							}
						}
						bq = bq[bn]
					}
					ab[Z] = bo
				}
			}
		}
		var R = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
		T = 0,
		P = Object.prototype.toString,
		Q = false,
		L = true;
		[0, 0].sort(function () {
			L = false;
			return 0
		});
		var O = function (bp, bo, bb, ba) {
			bb = bb || [];
			var aa = bo = bo || U;
			if (bo.nodeType !== 1 && bo.nodeType !== 9) {
				return []
			}
			if (!bp || typeof bp !== "string") {
				return bb
			}
			for (var ab = [], bu, bv, br, bn, bt = true, bq = w(bo), bs = bp; (R.exec(""), bu = R.exec(bs)) !== null; ) {
				bs = bu[3];
				ab.push(bu[1]);
				if (bu[2]) {
					bn = bu[3];
					break
				}
			}
			if (ab.length > 1 && J.exec(bp)) {
				if (ab.length === 2 && N.relative[ab[0]]) {
					bv = Y(ab[0] + ab[1], bo)
				} else {
					for (bv = N.relative[ab[0]] ? [bo] : O(ab.shift(), bo); ab.length; ) {
						bp = ab.shift();
						if (N.relative[bp]) {
							bp += ab.shift()
						}
						bv = Y(bp, bv)
					}
				}
			} else {
				if (!ba && ab.length > 1 && bo.nodeType === 9 && !bq && N.match.ID.test(ab[0]) && !N.match.ID.test(ab[ab.length - 1])) {
					bu = O.find(ab.shift(), bo, bq);
					bo = bu.expr ? O.filter(bu.expr, bu.set)[0] : bu.set[0]
				}
				if (bo) {
					bu = ba ? {
						expr: ab.pop(),
						set: c(ba)
					} : O.find(ab.pop(), ab.length === 1 && (ab[0] === "~" || ab[0] === "+") && bo.parentNode ? bo.parentNode : bo, bq);
					bv = bu.expr ? O.filter(bu.expr, bu.set) : bu.set;
					if (ab.length > 0) {
						br = c(bv)
					} else {
						bt = false
					}
					for (; ab.length; ) {
						var Z = ab.pop();
						bu = Z;
						if (N.relative[Z]) {
							bu = ab.pop()
						} else {
							Z = ""
						}
						if (bu == null) {
							bu = bo
						}
						N.relative[Z](br, bu, bq)
					}
				} else {
					br = []
				}
			}
			br || (br = bv);
			br || O.error(Z || bp);
			if (P.call(br) === "[object Array]") {
				if (bt) {
					if (bo && bo.nodeType === 1) {
						for (bp = 0; br[bp] != null; bp++) {
							if (br[bp] && (br[bp] === true || br[bp].nodeType === 1 && F(bo, br[bp]))) {
								bb.push(bv[bp])
							}
						}
					} else {
						for (bp = 0; br[bp] != null; bp++) {
							br[bp] && br[bp].nodeType === 1 && bb.push(bv[bp])
						}
					}
				} else {
					bb.push.apply(bb, br)
				}
			} else {
				c(br, bb)
			}
			if (bn) {
				O(bn, aa, bb, ba);
				O.uniqueSort(bb)
			}
			return bb
		};
		O.uniqueSort = function (aa) {
			if (K) {
				Q = L;
				aa.sort(K);
				if (Q) {
					for (var Z = 1; Z < aa.length; Z++) {
						aa[Z] === aa[Z - 1] && aa.splice(Z--, 1)
					}
				}
			}
			return aa
		};
		O.matches = function (aa, Z) {
			return O(aa, null, null, Z)
		};
		O.find = function (bn, bb, ba) {
			var ab,
			Z;
			if (!bn) {
				return []
			}
			for (var aa = 0, bp = N.order.length; aa < bp; aa++) {
				var bq = N.order[aa];
				if (Z = N.leftMatch[bq].exec(bn)) {
					var bo = Z[1];
					Z.splice(1, 1);
					if (bo.substr(bo.length - 1) !== "\\") {
						Z[1] = (Z[1] || "").replace(/\\/g, "");
						ab = N.find[bq](Z, bb, ba);
						if (ab != null) {
							bn = bn.replace(N.match[bq], "");
							break
						}
					}
				}
			}
			ab || (ab = bb.getElementsByTagName("*"));
			return {
				set: ab,
				expr: bn
			}
		};
		O.filter = function (bq, bp, bn, ba) {
			for (var aa = bq, ab = [], bw = bp, bx, bt, bo = bp && bp[0] && w(bp[0]); bq && bp.length; ) {
				for (var bv in N.filter) {
					if ((bx = N.leftMatch[bv].exec(bq)) != null && bx[2]) {
						var br = N.filter[bv],
						bu,
						Z;
						Z = bx[1];
						bt = false;
						bx.splice(1, 1);
						if (Z.substr(Z.length - 1) !== "\\") {
							if (bw === ab) {
								ab = []
							}
							if (N.preFilter[bv]) {
								if (bx = N.preFilter[bv](bx, bw, bn, ab, ba, bo)) {
									if (bx === true) {
										continue
									}
								} else {
									bt = bu = true
								}
							}
							if (bx) {
								for (var bb = 0; (Z = bw[bb]) != null; bb++) {
									if (Z) {
										bu = br(Z, bx, bb, bw);
										var bs = ba ^ !!bu;
										if (bn && bu != null) {
											if (bs) {
												bt = true
											} else {
												bw[bb] = false
											}
										} else {
											if (bs) {
												ab.push(Z);
												bt = true
											}
										}
									}
								}
							}
							if (bu !== S) {
								bn || (bw = ab);
								bq = bq.replace(N.match[bv], "");
								if (!bt) {
									return []
								}
								break
							}
						}
					}
				}
				if (bq === aa) {
					if (bt == null) {
						O.error(bq)
					} else {
						break
					}
				}
				aa = bq
			}
			return bw
		};
		O.error = function (Z) {
			throw "Syntax error, unrecognized expression: " + Z
		};
		var N = O.selectors = {
			order: ["ID", "NAME", "TAG"],
			match: {
				ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
				CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
				NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/,
				ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,
				TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/,
				CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,
				POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,
				PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
			},
			leftMatch: {},
			attrMap: {
				"class": "className",
				"for": "htmlFor"
			},
			attrHandle: {
				href: function (Z) {
					return Z.getAttribute("href")
				}
			},
			relative: {
				"+": function (ba, ab) {
					var aa = typeof ab === "string",
					Z = aa && !/\W/.test(ab);
					aa = aa && !Z;
					if (Z) {
						ab = ab.toLowerCase()
					}
					Z = 0;
					for (var bb = ba.length, bn; Z < bb; Z++) {
						if (bn = ba[Z]) {
							for (; (bn = bn.previousSibling) && bn.nodeType !== 1; ) {}
							ba[Z] = aa || bn && bn.nodeName.toLowerCase() === ab ? bn || false : bn === ab
						}
					}
					aa && O.filter(ab, ba, true)
				},
				">": function (ba, ab) {
					var aa = typeof ab === "string";
					if (aa && !/\W/.test(ab)) {
						ab = ab.toLowerCase();
						for (var Z = 0, bb = ba.length; Z < bb; Z++) {
							var bn = ba[Z];
							if (bn) {
								aa = bn.parentNode;
								ba[Z] = aa.nodeName.toLowerCase() === ab ? aa : false
							}
						}
					} else {
						Z = 0;
						for (bb = ba.length; Z < bb; Z++) {
							if (bn = ba[Z]) {
								ba[Z] = aa ? bn.parentNode : bn.parentNode === ab
							}
						}
						aa && O.filter(ab, ba, true)
					}
				},
				"": function (ba, ab, aa) {
					var Z = T++,
					bb = V;
					if (typeof ab === "string" && !/\W/.test(ab)) {
						var bn = ab = ab.toLowerCase();
						bb = W
					}
					bb("parentNode", ab, Z, ba, bn, aa)
				},
				"~": function (ba, ab, aa) {
					var Z = T++,
					bb = V;
					if (typeof ab === "string" && !/\W/.test(ab)) {
						var bn = ab = ab.toLowerCase();
						bb = W
					}
					bb("previousSibling", ab, Z, ba, bn, aa)
				}
			},
			find: {
				ID: function (ab, aa, Z) {
					if (typeof aa.getElementById !== "undefined" && !Z) {
						return (ab = aa.getElementById(ab[1])) ? [ab] : []
					}
				},
				NAME: function (ba, ab) {
					if (typeof ab.getElementsByName !== "undefined") {
						var aa = [];
						ab = ab.getElementsByName(ba[1]);
						for (var Z = 0, bb = ab.length; Z < bb; Z++) {
							ab[Z].getAttribute("name") === ba[1] && aa.push(ab[Z])
						}
						return aa.length === 0 ? null : aa
					}
				},
				TAG: function (aa, Z) {
					return Z.getElementsByTagName(aa[1])
				}
			},
			preFilter: {
				CLASS: function (bb, ba, aa, Z, bn, bo) {
					bb = " " + bb[1].replace(/\\/g, "") + " ";
					if (bo) {
						return bb
					}
					bo = 0;
					for (var ab; (ab = ba[bo]) != null; bo++) {
						if (ab) {
							if (bn ^ (ab.className && (" " + ab.className + " ").replace(/[\t\n]/g, " ").indexOf(bb) >= 0)) {
								aa || Z.push(ab)
							} else {
								if (aa) {
									ba[bo] = false
								}
							}
						}
					}
					return false
				},
				ID: function (Z) {
					return Z[1].replace(/\\/g, "")
				},
				TAG: function (Z) {
					return Z[1].toLowerCase()
				},
				CHILD: function (aa) {
					if (aa[1] === "nth") {
						var Z = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(aa[2] === "even" && "2n" || aa[2] === "odd" && "2n+1" || !/\D/.test(aa[2]) && "0n+" + aa[2] || aa[2]);
						aa[2] = Z[1] + (Z[2] || 1) - 0;
						aa[3] = Z[3] - 0
					}
					aa[0] = T++;
					return aa
				},
				ATTR: function (ba, ab, aa, Z, bb, bn) {
					ab = ba[1].replace(/\\/g, "");
					if (!bn && N.attrMap[ab]) {
						ba[1] = N.attrMap[ab]
					}
					if (ba[2] === "~=") {
						ba[4] = " " + ba[4] + " "
					}
					return ba
				},
				PSEUDO: function (ba, ab, aa, Z, bb) {
					if (ba[1] === "not") {
						if ((R.exec(ba[3]) || "").length > 1 || /^\w/.test(ba[3])) {
							ba[3] = O(ba[3], null, null, ab)
						} else {
							ba = O.filter(ba[3], ab, aa, true ^ bb);
							aa || Z.push.apply(Z, ba);
							return false
						}
					} else {
						if (N.match.POS.test(ba[0]) || N.match.CHILD.test(ba[0])) {
							return true
						}
					}
					return ba
				},
				POS: function (Z) {
					Z.unshift(true);
					return Z
				}
			},
			filters: {
				enabled: function (Z) {
					return Z.disabled === false && Z.type !== "hidden"
				},
				disabled: function (Z) {
					return Z.disabled === true
				},
				checked: function (Z) {
					return Z.checked === true
				},
				selected: function (Z) {
					return Z.selected === true
				},
				parent: function (Z) {
					return !!Z.firstChild
				},
				empty: function (Z) {
					return !Z.firstChild
				},
				has: function (ab, aa, Z) {
					return !!O(Z[3], ab).length
				},
				header: function (Z) {
					return /h\d/i.test(Z.nodeName)
				},
				text: function (Z) {
					return "text" === Z.type
				},
				radio: function (Z) {
					return "radio" === Z.type
				},
				checkbox: function (Z) {
					return "checkbox" === Z.type
				},
				file: function (Z) {
					return "file" === Z.type
				},
				password: function (Z) {
					return "password" === Z.type
				},
				submit: function (Z) {
					return "submit" === Z.type
				},
				image: function (Z) {
					return "image" === Z.type
				},
				reset: function (Z) {
					return "reset" === Z.type
				},
				button: function (Z) {
					return "button" === Z.type || Z.nodeName.toLowerCase() === "button"
				},
				input: function (Z) {
					return /input|select|textarea|button/i.test(Z.nodeName)
				}
			},
			setFilters: {
				first: function (aa, Z) {
					return Z === 0
				},
				last: function (ba, ab, aa, Z) {
					return ab === Z.length - 1
				},
				even: function (aa, Z) {
					return Z % 2 === 0
				},
				odd: function (aa, Z) {
					return Z % 2 === 1
				},
				lt: function (ab, aa, Z) {
					return aa < Z[3] - 0
				},
				gt: function (ab, aa, Z) {
					return aa > Z[3] - 0
				},
				nth: function (ab, aa, Z) {
					return Z[3] - 0 === aa
				},
				eq: function (ab, aa, Z) {
					return Z[3] - 0 === aa
				}
			},
			filter: {
				PSEUDO: function (ba, ab, aa, Z) {
					var bb = ab[1],
					bn = N.filters[bb];
					if (bn) {
						return bn(ba, aa, ab, Z)
					} else {
						if (bb === "contains") {
							return (ba.textContent || ba.innerText || X([ba]) || "").indexOf(ab[3]) >= 0
						} else {
							if (bb === "not") {
								ab = ab[3];
								aa = 0;
								for (Z = ab.length; aa < Z; aa++) {
									if (ab[aa] === ba) {
										return false
									}
								}
								return true
							} else {
								O.error("Syntax error, unrecognized expression: " + bb)
							}
						}
					}
				},
				CHILD: function (bb, ba) {
					var aa = ba[1],
					Z = bb;
					switch (aa) {
					case "only":
					case "first":
						for (; Z = Z.previousSibling; ) {
							if (Z.nodeType === 1) {
								return false
							}
						}
						if (aa === "first") {
							return true
						}
						Z = bb;
					case "last":
						for (; Z = Z.nextSibling; ) {
							if (Z.nodeType === 1) {
								return false
							}
						}
						return true;
					case "nth":
						aa = ba[2];
						var bn = ba[3];
						if (aa === 1 && bn === 0) {
							return true
						}
						ba = ba[0];
						var bo = bb.parentNode;
						if (bo && (bo.sizcache !== ba || !bb.nodeIndex)) {
							var ab = 0;
							for (Z = bo.firstChild; Z; Z = Z.nextSibling) {
								if (Z.nodeType === 1) {
									Z.nodeIndex = ++ab
								}
							}
							bo.sizcache = ba
						}
						bb = bb.nodeIndex - bn;
						return aa === 0 ? bb === 0 : bb % aa === 0 && bb / aa >= 0
					}
				},
				ID: function (aa, Z) {
					return aa.nodeType === 1 && aa.getAttribute("id") === Z
				},
				TAG: function (aa, Z) {
					return Z === "*" && aa.nodeType === 1 || aa.nodeName.toLowerCase() === Z
				},
				CLASS: function (aa, Z) {
					return (" " + (aa.className || aa.getAttribute("class")) + " ").indexOf(Z) > -1
				},
				ATTR: function (ba, ab) {
					var aa = ab[1];
					ba = N.attrHandle[aa] ? N.attrHandle[aa](ba) : ba[aa] != null ? ba[aa] : ba.getAttribute(aa);
					aa = ba + "";
					var Z = ab[2];
					ab = ab[4];
					return ba == null ? Z === "!=" : Z === "=" ? aa === ab : Z === "*=" ? aa.indexOf(ab) >= 0 : Z === "~=" ? (" " + aa + " ").indexOf(ab) >= 0 : !ab ? aa && ba !== false : Z === "!=" ? aa !== ab : Z === "^=" ? aa.indexOf(ab) === 0 : Z === "$=" ? aa.substr(aa.length - ab.length) === ab : Z === "|=" ? aa === ab || aa.substr(0, ab.length + 1) === ab + "-" : false
				},
				POS: function (ba, ab, aa, Z) {
					var bb = N.setFilters[ab[2]];
					if (bb) {
						return bb(ba, aa, ab, Z)
					}
				}
			}
		},
		J = N.match.POS;
		for (var A in N.match) {
			N.match[A] = new RegExp(N.match[A].source + /(?![^\[]*\])(?![^\(]*\))/.source);
			N.leftMatch[A] = new RegExp(/(^(?:.|\r|\n)*?)/.source + N.match[A].source.replace(/\\(\d+)/g, function (aa, Z) {
						return "\\" + (Z - 0 + 1)
					}))
		}
		var c = function (aa, Z) {
			aa = Array.prototype.slice.call(aa, 0);
			if (Z) {
				Z.push.apply(Z, aa);
				return Z
			}
			return aa
		};
		try {
			Array.prototype.slice.call(U.documentElement.childNodes, 0)
		} catch (G) {
			c = function (ba, ab) {
				ab = ab || [];
				if (P.call(ba) === "[object Array]") {
					Array.prototype.push.apply(ab, ba)
				} else {
					if (typeof ba.length === "number") {
						for (var aa = 0, Z = ba.length; aa < Z; aa++) {
							ab.push(ba[aa])
						}
					} else {
						for (aa = 0; ba[aa]; aa++) {
							ab.push(ba[aa])
						}
					}
				}
				return ab
			}
		}
		var K;
		if (U.documentElement.compareDocumentPosition) {
			K = function (aa, Z) {
				if (!aa.compareDocumentPosition || !Z.compareDocumentPosition) {
					if (aa == Z) {
						Q = true
					}
					return aa.compareDocumentPosition ? -1 : 1
				}
				aa = aa.compareDocumentPosition(Z) & 4 ? -1 : aa === Z ? 0 : 1;
				if (aa === 0) {
					Q = true
				}
				return aa
			}
		} else {
			if ("sourceIndex" in U.documentElement) {
				K = function (aa, Z) {
					if (!aa.sourceIndex || !Z.sourceIndex) {
						if (aa == Z) {
							Q = true
						}
						return aa.sourceIndex ? -1 : 1
					}
					aa = aa.sourceIndex - Z.sourceIndex;
					if (aa === 0) {
						Q = true
					}
					return aa
				}
			} else {
				if (U.createRange) {
					K = function (ba, ab) {
						if (!ba.ownerDocument || !ab.ownerDocument) {
							if (ba == ab) {
								Q = true
							}
							return ba.ownerDocument ? -1 : 1
						}
						var aa = ba.ownerDocument.createRange(),
						Z = ab.ownerDocument.createRange();
						aa.setStart(ba, 0);
						aa.setEnd(ba, 0);
						Z.setStart(ab, 0);
						Z.setEnd(ab, 0);
						ba = aa.compareBoundaryPoints(Range.START_TO_END, Z);
						if (ba === 0) {
							Q = true
						}
						return ba
					}
				}
			}
		}
		(function () {
			var ab = U.createElement("div"),
			aa = "script" + (new Date).getTime();
			ab.innerHTML = "<a name='" + aa + "'/>";
			var Z = U.documentElement;
			Z.insertBefore(ab, Z.firstChild);
			if (U.getElementById(aa)) {
				N.find.ID = function (ba, bb, bn) {
					if (typeof bb.getElementById !== "undefined" && !bn) {
						return (bb = bb.getElementById(ba[1])) ? bb.id === ba[1] || typeof bb.getAttributeNode !== "undefined" && bb.getAttributeNode("id").nodeValue === ba[1] ? [bb] : S : []
					}
				};
				N.filter.ID = function (ba, bb) {
					var bn = typeof ba.getAttributeNode !== "undefined" && ba.getAttributeNode("id");
					return ba.nodeType === 1 && bn && bn.nodeValue === bb
				}
			}
			Z.removeChild(ab);
			Z = ab = null
		})();
		(function () {
			var Z = U.createElement("div");
			Z.appendChild(U.createComment(""));
			if (Z.getElementsByTagName("*").length > 0) {
				N.find.TAG = function (ba, ab) {
					ab = ab.getElementsByTagName(ba[1]);
					if (ba[1] === "*") {
						ba = [];
						for (var aa = 0; ab[aa]; aa++) {
							ab[aa].nodeType === 1 && ba.push(ab[aa])
						}
						ab = ba
					}
					return ab
				}
			}
			Z.innerHTML = "<a href='#'></a>";
			if (Z.firstChild && typeof Z.firstChild.getAttribute !== "undefined" && Z.firstChild.getAttribute("href") !== "#") {
				N.attrHandle.href = function (aa) {
					return aa.getAttribute("href", 2)
				}
			}
			Z = null
		})();
		U.querySelectorAll && function () {
			var ab = O,
			aa = U.createElement("div");
			aa.innerHTML = "<p class='TEST'></p>";
			if (!(aa.querySelectorAll && aa.querySelectorAll(".TEST").length === 0)) {
				O = function (ba, bo, bp, bb) {
					bo = bo || U;
					if (!bb && bo.nodeType === 9 && !w(bo)) {
						try {
							return c(bo.querySelectorAll(ba), bp)
						} catch (bn) {}
					}
					return ab(ba, bo, bp, bb)
				};
				for (var Z in ab) {
					O[Z] = ab[Z]
				}
				aa = null
			}
		}
		();
		(function () {
			var Z = U.createElement("div");
			Z.innerHTML = "<div class='test e'></div><div class='test'></div>";
			if (!(!Z.getElementsByClassName || Z.getElementsByClassName("e").length === 0)) {
				Z.lastChild.className = "e";
				if (Z.getElementsByClassName("e").length !== 1) {
					N.order.splice(1, 0, "CLASS");
					N.find.CLASS = function (ba, ab, aa) {
						if (typeof ab.getElementsByClassName !== "undefined" && !aa) {
							return ab.getElementsByClassName(ba[1])
						}
					};
					Z = null
				}
			}
		})();
		var F = U.compareDocumentPosition ? function (aa, Z) {
			return !!(aa.compareDocumentPosition(Z) & 16)
		} : function (aa, Z) {
			return aa !== Z && (aa.contains ? aa.contains(Z) : true)
		},
		w = function (Z) {
			return (Z = (Z ? Z.ownerDocument || Z : 0).documentElement) ? Z.nodeName !== "HTML" : false
		},
		Y = function (ba, ab) {
			var aa = [],
			Z = "",
			bb;
			for (ab = ab.nodeType ? [ab] : ab; bb = N.match.PSEUDO.exec(ba); ) {
				Z += bb[0];
				ba = ba.replace(N.match.PSEUDO, "")
			}
			ba = N.relative[ba] ? ba + "*" : ba;
			bb = 0;
			for (var bn = ab.length; bb < bn; bb++) {
				O(ba, ab[bb], aa)
			}
			return O.filter(Z, aa)
		};
		aj.find = O;
		aj.expr = O.selectors;
		aj.expr[":"] = aj.expr.filters;
		aj.unique = O.uniqueSort;
		aj.text = X;
		aj.isXMLDoc = w;
		aj.contains = F
	})();
	var g = /Until$/,
	bd = /^(?:parents|prevUntil|prevAll)/,
	aY = /,/;
	aw = Array.prototype.slice;
	var aN = function (w, c, F) {
		if (aj.isFunction(c)) {
			return aj.grep(w, function (J, G) {
				return !!c.call(J, G, J) === F
			})
		} else {
			if (c.nodeType) {
				return aj.grep(w, function (G) {
					return G === c === F
				})
			} else {
				if (typeof c === "string") {
					var A = aj.grep(w, function (G) {
						return G.nodeType === 1
					});
					if (aV.test(c)) {
						return aj.filter(c, A, !F)
					} else {
						c = aj.filter(c, A)
					}
				}
			}
		}
		return aj.grep(w, function (G) {
			return aj.inArray(G, c) >= 0 === F
		})
	};
	aj.fn.extend({
		find: function (w) {
			for (var c = this.pushStack("", "find", w), K = 0, G = 0, J = this.length; G < J; G++) {
				K = c.length;
				aj.find(w, this[G], c);
				if (G > 0) {
					for (var A = K; A < c.length; A++) {
						for (var F = 0; F < K; F++) {
							if (c[F] === c[A]) {
								c.splice(A--, 1);
								break
							}
						}
					}
				}
			}
			return c
		},
		has: function (w) {
			var c = aj(w);
			return this.filter(function () {
				for (var F = 0, A = c.length; F < A; F++) {
					if (aj.contains(this, c[F])) {
						return true
					}
				}
			})
		},
		not: function (c) {
			return this.pushStack(aN(this, c, false), "not", c)
		},
		filter: function (c) {
			return this.pushStack(aN(this, c, true), "filter", c)
		},
		is: function (c) {
			return !!c && aj.filter(c, this).length > 0
		},
		closest: function (N, L) {
			if (aj.isArray(N)) {
				var K = [],
				G = this[0],
				J,
				A = {},
				F;
				if (G && N.length) {
					J = 0;
					for (var c = N.length; J < c; J++) {
						F = N[J];
						A[F] || (A[F] = aj.expr.match.POS.test(F) ? aj(F, L || this.context) : F)
					}
					for (; G && G.ownerDocument && G !== L; ) {
						for (F in A) {
							J = A[F];
							if (J.jquery ? J.index(G) > -1 : aj(G).is(J)) {
								K.push({
									selector: F,
									elem: G
								});
								delete A[F]
							}
						}
						G = G.parentNode
					}
				}
				return K
			}
			var w = aj.expr.match.POS.test(N) ? aj(N, L || this.context) : null;
			return this.map(function (P, O) {
				for (; O && O.ownerDocument && O !== L; ) {
					if (w ? w.index(O) > -1 : aj(O).is(N)) {
						return O
					}
					O = O.parentNode
				}
				return null
			})
		},
		index: function (c) {
			if (!c || typeof c === "string") {
				return aj.inArray(this[0], c ? aj(c) : this.parent().children())
			}
			return aj.inArray(c.jquery ? c[0] : c, this)
		},
		add: function (w, c) {
			w = typeof w === "string" ? aj(w, c || this.context) : aj.makeArray(w);
			c = aj.merge(this.get(), w);
			return this.pushStack(m(w[0]) || m(c[0]) ? c : aj.unique(c))
		},
		andSelf: function () {
			return this.add(this.prevObject)
		}
	});
	aj.each({
		parent: function (c) {
			return (c = c.parentNode) && c.nodeType !== 11 ? c : null
		},
		parents: function (c) {
			return aj.dir(c, "parentNode")
		},
		parentsUntil: function (w, c, A) {
			return aj.dir(w, "parentNode", A)
		},
		next: function (c) {
			return aj.nth(c, 2, "nextSibling")
		},
		prev: function (c) {
			return aj.nth(c, 2, "previousSibling")
		},
		nextAll: function (c) {
			return aj.dir(c, "nextSibling")
		},
		prevAll: function (c) {
			return aj.dir(c, "previousSibling")
		},
		nextUntil: function (w, c, A) {
			return aj.dir(w, "nextSibling", A)
		},
		prevUntil: function (w, c, A) {
			return aj.dir(w, "previousSibling", A)
		},
		siblings: function (c) {
			return aj.sibling(c.parentNode.firstChild, c)
		},
		children: function (c) {
			return aj.sibling(c.firstChild)
		},
		contents: function (c) {
			return aj.nodeName(c, "iframe") ? c.contentDocument || c.contentWindow.document : aj.makeArray(c.childNodes)
		}
	}, function (w, c) {
		aj.fn[w] = function (G, A) {
			var F = aj.map(this, c, G);
			g.test(w) || (A = G);
			if (A && typeof A === "string") {
				F = aj.filter(A, F)
			}
			F = this.length > 1 ? aj.unique(F) : F;
			if ((this.length > 1 || aY.test(A)) && bd.test(w)) {
				F = F.reverse()
			}
			return this.pushStack(F, w, aw.call(arguments).join(","))
		}
	});
	aj.extend({
		filter: function (w, c, A) {
			if (A) {
				w = ":not(" + w + ")"
			}
			return aj.find.matches(w, c)
		},
		dir: function (w, c, F) {
			var A = [];
			for (w = w[c]; w && w.nodeType !== 9 && (F === S || w.nodeType !== 1 || !aj(w).is(F)); ) {
				w.nodeType === 1 && A.push(w);
				w = w[c]
			}
			return A
		},
		nth: function (w, c, F) {
			c = c || 1;
			for (var A = 0; w; w = w[F]) {
				if (w.nodeType === 1 && ++A === c) {
					break
				}
			}
			return w
		},
		sibling: function (w, c) {
			for (var A = []; w; w = w.nextSibling) {
				w.nodeType === 1 && w !== c && A.push(w)
			}
			return A
		}
	});
	var ak = / jQuery\d+="(?:\d+|null)"/g,
	au = /^\s+/,
	D = /(<([\w:]+)[^>]*?)\/>/g,
	aF = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i,
	n = /<([\w:]+)/,
	ae = /<tbody/i,
	v = /<|&#?\w+;/,
	aR = /<script|<object|<embed|<option|<style/i,
	am = /checked\s*(?:[^=]|=\s*.checked.)/i,
	bm = function (w, c, A) {
		return aF.test(A) ? w : c + "></" + A + ">"
	},
	aL = {
		option: [1, "<select multiple='multiple'>", "</select>"],
		legend: [1, "<fieldset>", "</fieldset>"],
		thead: [1, "<table>", "</table>"],
		tr: [2, "<table><tbody>", "</tbody></table>"],
		td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
		col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
		area: [1, "<map>", "</map>"],
		_default: [0, "", ""]
	};
	aL.optgroup = aL.option;
	aL.tbody = aL.tfoot = aL.colgroup = aL.caption = aL.thead;
	aL.th = aL.td;
	if (!aj.support.htmlSerialize) {
		aL._default = [1, "div<div>", "</div>"]
	}
	aj.fn.extend({
		text: function (c) {
			if (aj.isFunction(c)) {
				return this.each(function (w) {
					var A = aj(this);
					A.text(c.call(this, w, A.text()))
				})
			}
			if (typeof c !== "object" && c !== S) {
				return this.empty().append((this[0] && this[0].ownerDocument || U).createTextNode(c))
			}
			return aj.text(this)
		},
		wrapAll: function (w) {
			if (aj.isFunction(w)) {
				return this.each(function (A) {
					aj(this).wrapAll(w.call(this, A))
				})
			}
			if (this[0]) {
				var c = aj(w, this[0].ownerDocument).eq(0).clone(true);
				this[0].parentNode && c.insertBefore(this[0]);
				c.map(function () {
					for (var A = this; A.firstChild && A.firstChild.nodeType === 1; ) {
						A = A.firstChild
					}
					return A
				}).append(this)
			}
			return this
		},
		wrapInner: function (c) {
			if (aj.isFunction(c)) {
				return this.each(function (w) {
					aj(this).wrapInner(c.call(this, w))
				})
			}
			return this.each(function () {
				var w = aj(this),
				A = w.contents();
				A.length ? A.wrapAll(c) : w.append(c)
			})
		},
		wrap: function (c) {
			return this.each(function () {
				aj(this).wrapAll(c)
			})
		},
		unwrap: function () {
			return this.parent().each(function () {
				aj.nodeName(this, "body") || aj(this).replaceWith(this.childNodes)
			}).end()
		},
		append: function () {
			return this.domManip(arguments, true, function (c) {
				this.nodeType === 1 && this.appendChild(c)
			})
		},
		prepend: function () {
			return this.domManip(arguments, true, function (c) {
				this.nodeType === 1 && this.insertBefore(c, this.firstChild)
			})
		},
		before: function () {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function (w) {
					this.parentNode.insertBefore(w, this)
				})
			} else {
				if (arguments.length) {
					var c = aj(arguments[0]);
					c.push.apply(c, this.toArray());
					return this.pushStack(c, "before", arguments)
				}
			}
		},
		after: function () {
			if (this[0] && this[0].parentNode) {
				return this.domManip(arguments, false, function (w) {
					this.parentNode.insertBefore(w, this.nextSibling)
				})
			} else {
				if (arguments.length) {
					var c = this.pushStack(this, "after", arguments);
					c.push.apply(c, aj(arguments[0]).toArray());
					return c
				}
			}
		},
		remove: function (w, c) {
			for (var F = 0, A; (A = this[F]) != null; F++) {
				if (!w || aj.filter(w, [A]).length) {
					if (!c && A.nodeType === 1) {
						aj.cleanData(A.getElementsByTagName("*"));
						aj.cleanData([A])
					}
					A.parentNode && A.parentNode.removeChild(A)
				}
			}
			return this
		},
		empty: function () {
			for (var w = 0, c; (c = this[w]) != null; w++) {
				for (c.nodeType === 1 && aj.cleanData(c.getElementsByTagName("*")); c.firstChild; ) {
					c.removeChild(c.firstChild)
				}
			}
			return this
		},
		clone: function (w) {
			var c = this.map(function () {
				if (!aj.support.noCloneEvent && !aj.isXMLDoc(this)) {
					var F = this.outerHTML,
					A = this.ownerDocument;
					if (!F) {
						F = A.createElement("div");
						F.appendChild(this.cloneNode(true));
						F = F.innerHTML
					}
					return aj.clean([F.replace(ak, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(au, "")], A)[0]
				} else {
					return this.cloneNode(true)
				}
			});
			if (w === true) {
				bl(this, c);
				bl(this.find("*"), c.find("*"))
			}
			return c
		},
		html: function (w) {
			if (w === S) {
				return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(ak, "") : null
			} else {
				if (typeof w === "string" && !aR.test(w) && (aj.support.leadingWhitespace || !au.test(w)) && !aL[(n.exec(w) || ["", ""])[1].toLowerCase()]) {
					w = w.replace(D, bm);
					try {
						for (var c = 0, F = this.length; c < F; c++) {
							if (this[c].nodeType === 1) {
								aj.cleanData(this[c].getElementsByTagName("*"));
								this[c].innerHTML = w
							}
						}
					} catch (A) {
						this.empty().append(w)
					}
				} else {
					aj.isFunction(w) ? this.each(function (K) {
						var G = aj(this),
						J = G.html();
						G.empty().append(function () {
							return w.call(this, K, J)
						})
					}) : this.empty().append(w)
				}
			}
			return this
		},
		replaceWith: function (c) {
			if (this[0] && this[0].parentNode) {
				if (aj.isFunction(c)) {
					return this.each(function (w) {
						var F = aj(this),
						A = F.html();
						F.replaceWith(c.call(this, w, A))
					})
				}
				if (typeof c !== "string") {
					c = aj(c).detach()
				}
				return this.each(function () {
					var w = this.nextSibling,
					A = this.parentNode;
					aj(this).remove();
					w ? aj(w).before(c) : aj(A).append(c)
				})
			} else {
				return this.pushStack(aj(aj.isFunction(c) ? c() : c), "replaceWith", c)
			}
		},
		detach: function (c) {
			return this.remove(c, true)
		},
		domManip: function (P, O, N) {
			function K(Q) {
				return aj.nodeName(Q, "table") ? Q.getElementsByTagName("tbody")[0] || Q.appendChild(Q.ownerDocument.createElement("tbody")) : Q
			}
			var L,
			G,
			J = P[0],
			w = [],
			F;
			if (!aj.support.checkClone && arguments.length === 3 && typeof J === "string" && am.test(J)) {
				return this.each(function () {
					aj(this).domManip(P, O, N, true)
				})
			}
			if (aj.isFunction(J)) {
				return this.each(function (Q) {
					var R = aj(this);
					P[0] = J.call(this, Q, O ? R.html() : S);
					R.domManip(P, O, N)
				})
			}
			if (this[0]) {
				L = J && J.parentNode;
				L = aj.support.parentNode && L && L.nodeType === 11 && L.childNodes.length === this.length ? {
					fragment: L
				} : a5(P, this, w);
				F = L.fragment;
				if (G = F.childNodes.length === 1 ? (F = F.firstChild) : F.firstChild) {
					O = O && aj.nodeName(G, "tr");
					for (var A = 0, c = this.length; A < c; A++) {
						N.call(O ? K(this[A], G) : this[A], A > 0 || L.cacheable || this.length > 1 ? F.cloneNode(true) : F)
					}
				}
				w.length && aj.each(w, I)
			}
			return this
		}
	});
	aj.fragments = {};
	aj.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (w, c) {
		aj.fn[w] = function (K) {
			var G = [];
			K = aj(K);
			var J = this.length === 1 && this[0].parentNode;
			if (J && J.nodeType === 11 && J.childNodes.length === 1 && K.length === 1) {
				K[c](this[0]);
				return this
			} else {
				J = 0;
				for (var A = K.length; J < A; J++) {
					var F = (J > 0 ? this.clone(true) : this).get();
					aj.fn[c].apply(aj(K[J]), F);
					G = G.concat(F)
				}
				return this.pushStack(G, w, K.selector)
			}
		}
	});
	aj.extend({
		clean: function (P, O, N, K) {
			O = O || U;
			if (typeof O.createElement === "undefined") {
				O = O.ownerDocument || O[0] && O[0].ownerDocument || U
			}
			for (var L = [], G = 0, J; (J = P[G]) != null; G++) {
				if (typeof J === "number") {
					J += ""
				}
				if (J) {
					if (typeof J === "string" && !v.test(J)) {
						J = O.createTextNode(J)
					} else {
						if (typeof J === "string") {
							J = J.replace(D, bm);
							var w = (n.exec(J) || ["", ""])[1].toLowerCase(),
							F = aL[w] || aL._default,
							A = F[0],
							c = O.createElement("div");
							for (c.innerHTML = F[1] + J + F[2]; A--; ) {
								c = c.lastChild
							}
							if (!aj.support.tbody) {
								A = ae.test(J);
								w = w === "table" && !A ? c.firstChild && c.firstChild.childNodes : F[1] === "<table>" && !A ? c.childNodes : [];
								for (F = w.length - 1; F >= 0; --F) {
									aj.nodeName(w[F], "tbody") && !w[F].childNodes.length && w[F].parentNode.removeChild(w[F])
								}
							}
							!aj.support.leadingWhitespace && au.test(J) && c.insertBefore(O.createTextNode(au.exec(J)[0]), c.firstChild);
							J = c.childNodes
						}
					}
					if (J.nodeType) {
						L.push(J)
					} else {
						L = aj.merge(L, J)
					}
				}
			}
			if (N) {
				for (G = 0; L[G]; G++) {
					if (K && aj.nodeName(L[G], "script") && (!L[G].type || L[G].type.toLowerCase() === "text/javascript")) {
						K.push(L[G].parentNode ? L[G].parentNode.removeChild(L[G]) : L[G])
					} else {
						L[G].nodeType === 1 && L.splice.apply(L, [G + 1, 0].concat(aj.makeArray(L[G].getElementsByTagName("script"))));
						N.appendChild(L[G])
					}
				}
			}
			return L
		},
		cleanData: function (N) {
			for (var L, K, G = aj.cache, J = aj.event.special, A = aj.support.deleteExpando, F = 0, c; (c = N[F]) != null; F++) {
				if (K = c[aj.expando]) {
					L = G[K];
					if (L.events) {
						for (var w in L.events) {
							J[w] ? aj.event.remove(c, w) : aI(c, w, L.handle)
						}
					}
					if (A) {
						delete c[aj.expando]
					} else {
						c.removeAttribute && c.removeAttribute(aj.expando)
					}
					delete G[K]
				}
			}
		}
	});
	var i = /z-?index|font-?weight|opacity|zoom|line-?height/i,
	a6 = /alpha\([^)]*\)/,
	aS = /opacity=([^)]*)/,
	aG = /float/i,
	af = /-([a-z])/ig,
	bh = /([A-Z])/g,
	a1 = /^-?\d+(?:px)?$/i,
	aK = /^-?\d/,
	ah = {
		position: "absolute",
		visibility: "hidden",
		display: "block"
	},
	B = ["Left", "Right"],
	l = ["Top", "Bottom"],
	bk = U.defaultView && U.defaultView.getComputedStyle,
	an = aj.support.cssFloat ? "cssFloat" : "styleFloat",
	x = function (w, c) {
		return c.toUpperCase()
	};
	aj.fn.css = function (w, c) {
		return ar(this, w, c, true, function (G, A, F) {
			if (F === S) {
				return aj.curCSS(G, A)
			}
			if (typeof F === "number" && !i.test(A)) {
				F += "px"
			}
			aj.style(G, A, F)
		})
	};
	aj.extend({
		style: function (w, c, G) {
			if (!w || w.nodeType === 3 || w.nodeType === 8) {
				return S
			}
			if ((c === "width" || c === "height") && parseFloat(G) < 0) {
				G = S
			}
			var A = w.style || w,
			F = G !== S;
			if (!aj.support.opacity && c === "opacity") {
				if (F) {
					A.zoom = 1;
					c = parseInt(G, 10) + "" === "NaN" ? "" : "alpha(opacity=" + G * 100 + ")";
					w = A.filter || aj.curCSS(w, "filter") || "";
					A.filter = a6.test(w) ? w.replace(a6, c) : c
				}
				return A.filter && A.filter.indexOf("opacity=") >= 0 ? parseFloat(aS.exec(A.filter)[1]) / 100 + "" : ""
			}
			if (aG.test(c)) {
				c = an
			}
			c = c.replace(af, x);
			if (F) {
				A[c] = G
			}
			return A[c]
		},
		css: function (w, c, K, G) {
			if (c === "width" || c === "height") {
				var J,
				A = c === "width" ? B : l;
				function F() {
					J = c === "width" ? w.offsetWidth : w.offsetHeight;
					G !== "border" && aj.each(A, function () {
						G || (J -= parseFloat(aj.curCSS(w, "padding" + this, true)) || 0);
						if (G === "margin") {
							J += parseFloat(aj.curCSS(w, "margin" + this, true)) || 0
						} else {
							J -= parseFloat(aj.curCSS(w, "border" + this + "Width", true)) || 0
						}
					})
				}
				w.offsetWidth !== 0 ? F() : aj.swap(w, ah, F);
				return Math.max(0, Math.round(J))
			}
			return aj.curCSS(w, c, K)
		},
		curCSS: function (w, c, J) {
			var F,
			G = w.style;
			if (!aj.support.opacity && c === "opacity" && w.currentStyle) {
				F = aS.test(w.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : "";
				return F === "" ? "1" : F
			}
			if (aG.test(c)) {
				c = an
			}
			if (!J && G && G[c]) {
				F = G[c]
			} else {
				if (bk) {
					if (aG.test(c)) {
						c = "float"
					}
					c = c.replace(bh, "-$1").toLowerCase();
					G = w.ownerDocument.defaultView;
					if (!G) {
						return null
					}
					if (w = G.getComputedStyle(w, null)) {
						F = w.getPropertyValue(c)
					}
					if (c === "opacity" && F === "") {
						F = "1"
					}
				} else {
					if (w.currentStyle) {
						J = c.replace(af, x);
						F = w.currentStyle[c] || w.currentStyle[J];
						if (!a1.test(F) && aK.test(F)) {
							c = G.left;
							var A = w.runtimeStyle.left;
							w.runtimeStyle.left = w.currentStyle.left;
							G.left = J === "fontSize" ? "1em" : F || 0;
							F = G.pixelLeft + "px";
							G.left = c;
							w.runtimeStyle.left = A
						}
					}
				}
			}
			return F
		},
		swap: function (w, c, G) {
			var A = {};
			for (var F in c) {
				A[F] = w.style[F];
				w.style[F] = c[F]
			}
			G.call(w);
			for (F in c) {
				w.style[F] = A[F]
			}
		}
	});
	if (aj.expr && aj.expr.filters) {
		aj.expr.filters.hidden = function (w) {
			var c = w.offsetWidth,
			F = w.offsetHeight,
			A = w.nodeName.toLowerCase() === "tr";
			return c === 0 && F === 0 && !A ? true : c > 0 && F > 0 && !A ? false : aj.curCSS(w, "display") === "none"
		};
		aj.expr.filters.visible = function (c) {
			return !aj.expr.filters.hidden(c)
		}
	}
	var a4 = aH(),
	aP = /<script(.|\s)*?\/script>/gi,
	al = /select|textarea/i,
	E = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i,
	aC = /=\?(&|$)/,
	j = /\?/,
	o = /(\?|&)_=.*?(&|$)/,
	b = /^(\w+:)?\/\/([^\/?#]+)/,
	a7 = /%20/g,
	aT = aj.fn.load;
	aj.fn.extend({
		load: function (w, c, J) {
			if (typeof w !== "string") {
				return aT.call(this, w)
			} else {
				if (!this.length) {
					return this
				}
			}
			var F = w.indexOf(" ");
			if (F >= 0) {
				var G = w.slice(F, w.length);
				w = w.slice(0, F)
			}
			F = "GET";
			if (c) {
				if (aj.isFunction(c)) {
					J = c;
					c = null
				} else {
					if (typeof c === "object") {
						c = aj.param(c, aj.ajaxSettings.traditional);
						F = "POST"
					}
				}
			}
			var A = this;
			aj.ajax({
				url: w,
				type: F,
				dataType: "html",
				data: c,
				complete: function (K, L) {
					if (L === "success" || L === "notmodified") {
						A.html(G ? aj("<div />").append(K.responseText.replace(aP, "")).find(G) : K.responseText)
					}
					J && A.each(J, [K.responseText, L, K])
				}
			});
			return this
		},
		serialize: function () {
			return aj.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				return this.elements ? aj.makeArray(this.elements) : this
			}).filter(function () {
				return this.name && !this.disabled && (this.checked || al.test(this.nodeName) || E.test(this.type))
			}).map(function (w, c) {
				w = aj(this).val();
				return w == null ? null : aj.isArray(w) ? aj.map(w, function (A) {
					return {
						name: c.name,
						value: A
					}
				}) : {
					name: c.name,
					value: w
				}
			}).get()
		}
	});
	aj.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (w, c) {
		aj.fn[c] = function (A) {
			return this.bind(c, A)
		}
	});
	aj.extend({
		get: function (w, c, F, A) {
			if (aj.isFunction(c)) {
				A = A || F;
				F = c;
				c = null
			}
			return aj.ajax({
				type: "GET",
				url: w,
				data: c,
				success: F,
				dataType: A
			})
		},
		getScript: function (w, c) {
			return aj.get(w, null, c, "script")
		},
		getJSON: function (w, c, A) {
			return aj.get(w, c, A, "json")
		},
		post: function (w, c, F, A) {
			if (aj.isFunction(c)) {
				A = A || F;
				F = c;
				c = {}
			}
			return aj.ajax({
				type: "POST",
				url: w,
				data: c,
				success: F,
				dataType: A
			})
		},
		ajaxSetup: function (c) {
			aj.extend(aj.ajaxSettings, c)
		},
		ajaxSettings: {
			url: location.href,
			global: true,
			type: "GET",
			contentType: "application/x-www-form-urlencoded",
			processData: true,
			async: true,
			xhr: aQ.XMLHttpRequest && (aQ.location.protocol !== "file:" || !aQ.ActiveXObject) ? function () {
				return new aQ.XMLHttpRequest
			} : function () {
				try {
					return new aQ.ActiveXObject("Microsoft.XMLHTTP")
				} catch (c) {}
			},
			accepts: {
				xml: "application/xml, text/xml",
				html: "text/html",
				script: "text/javascript, application/javascript",
				json: "application/json, text/javascript",
				text: "text/plain",
				_default: "*/*"
			}
		},
		lastModified: {},
		etag: {},
		ajax: function (ab) {
			function aa() {
				Y.success && Y.success.call(Q, L, T, w);
				Y.global && X("ajaxSuccess", [w, Y])
			}
			function Z() {
				Y.complete && Y.complete.call(Q, w, T);
				Y.global && X("ajaxComplete", [w, Y]);
				Y.global && !--aj.active && aj.event.trigger("ajaxStop")
			}
			function X(bb, bn) {
				(Y.context ? aj(Y.context) : aj.event).trigger(bb, bn)
			}
			var Y = aj.extend(true, {}, aj.ajaxSettings, ab),
			R,
			T,
			L,
			Q = ab && ab.context || Y,
			N = Y.type.toUpperCase();
			if (Y.data && Y.processData && typeof Y.data !== "string") {
				Y.data = aj.param(Y.data, Y.traditional)
			}
			if (Y.dataType === "jsonp") {
				if (N === "GET") {
					aC.test(Y.url) || (Y.url += (j.test(Y.url) ? "&" : "?") + (Y.jsonp || "callback") + "=?")
				} else {
					if (!Y.data || !aC.test(Y.data)) {
						Y.data = (Y.data ? Y.data + "&" : "") + (Y.jsonp || "callback") + "=?"
					}
				}
				Y.dataType = "json"
			}
			if (Y.dataType === "json" && (Y.data && aC.test(Y.data) || aC.test(Y.url))) {
				R = Y.jsonpCallback || "jsonp" + a4++;
				if (Y.data) {
					Y.data = (Y.data + "").replace(aC, "=" + R + "$1")
				}
				Y.url = Y.url.replace(aC, "=" + R + "$1");
				Y.dataType = "script";
				aQ[R] = aQ[R] || function (bb) {
					L = bb;
					aa();
					Z();
					aQ[R] = S;
					try {
						delete aQ[R]
					} catch (bn) {}
					c && c.removeChild(G)
				}
			}
			if (Y.dataType === "script" && Y.cache === null) {
				Y.cache = false
			}
			if (Y.cache === false && N === "GET") {
				var J = aH(),
				A = Y.url.replace(o, "$1_=" + J + "$2");
				Y.url = A + (A === Y.url ? (j.test(Y.url) ? "&" : "?") + "_=" + J : "")
			}
			if (Y.data && N === "GET") {
				Y.url += (j.test(Y.url) ? "&" : "?") + Y.data
			}
			Y.global && !aj.active++ && aj.event.trigger("ajaxStart");
			J = (J = b.exec(Y.url)) && (J[1] && J[1] !== location.protocol || J[2] !== location.host);
			if (Y.dataType === "script" && N === "GET" && J) {
				var c = U.getElementsByTagName("head")[0] || U.documentElement,
				G = U.createElement("script");
				G.src = Y.url;
				if (Y.scriptCharset) {
					G.charset = Y.scriptCharset
				}
				if (!R) {
					var K = false;
					G.onload = G.onreadystatechange = function () {
						if (!K && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
							K = true;
							aa();
							Z();
							G.onload = G.onreadystatechange = null;
							c && G.parentNode && c.removeChild(G)
						}
					}
				}
				c.insertBefore(G, c.firstChild);
				return S
			}
			var F = false,
			w = Y.xhr();
			if (w) {
				Y.username ? w.open(N, Y.url, Y.async, Y.username, Y.password) : w.open(N, Y.url, Y.async);
				try {
					if (Y.data || ab && ab.contentType) {
						w.setRequestHeader("Content-Type", Y.contentType)
					}
					if (Y.ifModified) {
						aj.lastModified[Y.url] && w.setRequestHeader("If-Modified-Since", aj.lastModified[Y.url]);
						aj.etag[Y.url] && w.setRequestHeader("If-None-Match", aj.etag[Y.url])
					}
					J || w.setRequestHeader("X-Requested-With", "XMLHttpRequest");
					w.setRequestHeader("Accept", Y.dataType && Y.accepts[Y.dataType] ? Y.accepts[Y.dataType] + ", */*" : Y.accepts._default)
				} catch (ba) {}
				if (Y.beforeSend && Y.beforeSend.call(Q, w, Y) === false) {
					Y.global && !--aj.active && aj.event.trigger("ajaxStop");
					w.abort();
					return false
				}
				Y.global && X("ajaxSend", [w, Y]);
				var W = w.onreadystatechange = function (bn) {
					if (!w || w.readyState === 0 || bn === "abort") {
						F || Z();
						F = true;
						if (w) {
							w.onreadystatechange = aj.noop
						}
					} else {
						if (!F && w && (w.readyState === 4 || bn === "timeout")) {
							F = true;
							w.onreadystatechange = aj.noop;
							T = bn === "timeout" ? "timeout" : !aj.httpSuccess(w) ? "error" : Y.ifModified && aj.httpNotModified(w, Y.url) ? "notmodified" : "success";
							var bo;
							if (T === "success") {
								try {
									L = aj.httpData(w, Y.dataType, Y)
								} catch (bb) {
									T = "parsererror";
									bo = bb
								}
							}
							if (T === "success" || T === "notmodified") {
								R || aa()
							} else {
								aj.handleError(Y, w, T, bo)
							}
							Z();
							bn === "timeout" && w.abort();
							if (Y.async) {
								w = null
							}
						}
					}
				};
				try {
					var V = w.abort;
					w.abort = function () {
						w && V.call(w);
						W("abort")
					}
				} catch (P) {}
				Y.async && Y.timeout > 0 && setTimeout(function () {
					w && !F && W("timeout")
				}, Y.timeout);
				try {
					w.send(N === "POST" || N === "PUT" || N === "DELETE" ? Y.data : null)
				} catch (O) {
					aj.handleError(Y, w, null, O);
					Z()
				}
				Y.async || W();
				return w
			}
		},
		handleError: function (w, c, F, A) {
			if (w.error) {
				w.error.call(w.context || w, c, F, A)
			}
			if (w.global) {
				(w.context ? aj(w.context) : aj.event).trigger("ajaxError", [c, w, A])
			}
		},
		active: 0,
		httpSuccess: function (w) {
			try {
				return !w.status && location.protocol === "file:" || w.status >= 200 && w.status < 300 || w.status === 304 || w.status === 1223 || w.status === 0
			} catch (c) {}
			return false
		},
		httpNotModified: function (w, c) {
			var F = w.getResponseHeader("Last-Modified"),
			A = w.getResponseHeader("Etag");
			if (F) {
				aj.lastModified[c] = F
			}
			if (A) {
				aj.etag[c] = A
			}
			return w.status === 304 || w.status === 0
		},
		httpData: function (w, c, G) {
			var A = w.getResponseHeader("content-type") || "",
			F = c === "xml" || !c && A.indexOf("xml") >= 0;
			w = F ? w.responseXML : w.responseText;
			F && w.documentElement.nodeName === "parsererror" && aj.error("parsererror");
			if (G && G.dataFilter) {
				w = G.dataFilter(w, c)
			}
			if (typeof w === "string") {
				if (c === "json" || !c && A.indexOf("json") >= 0) {
					w = aj.parseJSON(w)
				} else {
					if (c === "script" || !c && A.indexOf("javascript") >= 0) {
						aj.globalEval(w)
					}
				}
			}
			return w
		},
		param: function (w, c) {
			function J(K, L) {
				if (aj.isArray(L)) {
					aj.each(L, function (N, O) {
						c || /\[\]$/.test(K) ? F(K, O) : J(K + "[" + (typeof O === "object" || aj.isArray(O) ? N : "") + "]", O)
					})
				} else {
					!c && L != null && typeof L === "object" ? aj.each(L, function (N, O) {
						J(K + "[" + N + "]", O)
					}) : F(K, L)
				}
			}
			function F(K, L) {
				L = aj.isFunction(L) ? L() : L;
				G[G.length] = encodeURIComponent(K) + "=" + encodeURIComponent(L)
			}
			var G = [];
			if (c === S) {
				c = aj.ajaxSettings.traditional
			}
			if (aj.isArray(w) || w.jquery) {
				aj.each(w, function () {
					F(this.name, this.value)
				})
			} else {
				for (var A in w) {
					J(A, w[A])
				}
			}
			return G.join("&").replace(a7, "+")
		}
	});
	var bi = {},
	be = /toggle|show|hide/,
	aZ = /^([+-]=)?([\d+-.]+)(.*)$/,
	at,
	H = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]];
	aj.fn.extend({
		show: function (w, c) {
			if (w || w === 0) {
				return this.animate(aE("show", 3), w, c)
			} else {
				w = 0;
				for (c = this.length; w < c; w++) {
					var G = aj.data(this[w], "olddisplay");
					this[w].style.display = G || "";
					if (aj.css(this[w], "display") === "none") {
						G = this[w].nodeName;
						var A;
						if (bi[G]) {
							A = bi[G]
						} else {
							var F = aj("<" + G + " />").appendTo("body");
							A = F.css("display");
							if (A === "none") {
								A = "block"
							}
							F.remove();
							bi[G] = A
						}
						aj.data(this[w], "olddisplay", A)
					}
				}
				w = 0;
				for (c = this.length; w < c; w++) {
					this[w].style.display = aj.data(this[w], "olddisplay") || ""
				}
				return this
			}
		},
		hide: function (w, c) {
			if (w || w === 0) {
				return this.animate(aE("hide", 3), w, c)
			} else {
				w = 0;
				for (c = this.length; w < c; w++) {
					var A = aj.data(this[w], "olddisplay");
					!A && A !== "none" && aj.data(this[w], "olddisplay", aj.css(this[w], "display"))
				}
				w = 0;
				for (c = this.length; w < c; w++) {
					this[w].style.display = "none"
				}
				return this
			}
		},
		_toggle: aj.fn.toggle,
		toggle: function (w, c) {
			var A = typeof w === "boolean";
			if (aj.isFunction(w) && aj.isFunction(c)) {
				this._toggle.apply(this, arguments)
			} else {
				w == null || A ? this.each(function () {
					var F = A ? w : aj(this).is(":hidden");
					aj(this)[F ? "show" : "hide"]()
				}) : this.animate(aE("toggle", 3), w, c)
			}
			return this
		},
		fadeTo: function (w, c, A) {
			return this.filter(":hidden").css("opacity", 0).show().end().animate({
				opacity: c
			}, w, A)
		},
		animate: function (w, c, G, A) {
			var F = aj.speed(c, G, A);
			if (aj.isEmptyObject(w)) {
				return this.each(F.complete)
			}
			return this[F.queue === false ? "each" : "queue"](function () {
				var K = aj.extend({}, F),
				L,
				N = this.nodeType === 1 && aj(this).is(":hidden"),
				J = this;
				for (L in w) {
					var O = L.replace(af, x);
					if (L !== O) {
						w[O] = w[L];
						delete w[L];
						L = O
					}
					if (w[L] === "hide" && N || w[L] === "show" && !N) {
						return K.complete.call(this)
					}
					if ((L === "height" || L === "width") && this.style) {
						K.display = aj.css(this, "display");
						K.overflow = this.style.overflow
					}
					if (aj.isArray(w[L])) {
						(K.specialEasing = K.specialEasing || {})[L] = w[L][1];
						w[L] = w[L][0]
					}
				}
				if (K.overflow != null) {
					this.style.overflow = "hidden"
				}
				K.curAnim = aj.extend({}, w);
				aj.each(w, function (Q, P) {
					var V = new aj.fx(J, K, Q);
					if (be.test(P)) {
						V[P === "toggle" ? N ? "show" : "hide" : P](w)
					} else {
						var T = aZ.exec(P),
						W = V.cur(true) || 0;
						if (T) {
							P = parseFloat(T[2]);
							var R = T[3] || "px";
							if (R !== "px") {
								J.style[Q] = (P || 1) + R;
								W = (P || 1) / V.cur(true) * W;
								J.style[Q] = W + R
							}
							if (T[1]) {
								P = (T[1] === "-=" ? -1 : 1) * P + W
							}
							V.custom(W, P, R)
						} else {
							V.custom(W, P, "")
						}
					}
				});
				return true
			})
		},
		stop: function (w, c) {
			var A = aj.timers;
			w && this.queue([]);
			this.each(function () {
				for (var F = A.length - 1; F >= 0; F--) {
					if (A[F].elem === this) {
						c && A[F](true);
						A.splice(F, 1)
					}
				}
			});
			c || this.dequeue();
			return this
		}
	});
	aj.each({
		slideDown: aE("show", 1),
		slideUp: aE("hide", 1),
		slideToggle: aE("toggle", 1),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		}
	}, function (w, c) {
		aj.fn[w] = function (F, A) {
			return this.animate(c, F, A)
		}
	});
	aj.extend({
		speed: function (w, c, F) {
			var A = w && typeof w === "object" ? w : {
				complete: F || !F && c || aj.isFunction(w) && w,
				duration: w,
				easing: F && c || c && !aj.isFunction(c) && c
			};
			A.duration = aj.fx.off ? 0 : typeof A.duration === "number" ? A.duration : aj.fx.speeds[A.duration] || aj.fx.speeds._default;
			A.old = A.complete;
			A.complete = function () {
				A.queue !== false && aj(this).dequeue();
				aj.isFunction(A.old) && A.old.call(this)
			};
			return A
		},
		easing: {
			linear: function (w, c, F, A) {
				return F + A * w
			},
			swing: function (w, c, F, A) {
				return (-Math.cos(w * Math.PI) / 2 + 0.5) * A + F
			}
		},
		timers: [],
		fx: function (w, c, A) {
			this.options = c;
			this.elem = w;
			this.prop = A;
			if (!c.orig) {
				c.orig = {}
			}
		}
	});
	aj.fx.prototype = {
		update: function () {
			this.options.step && this.options.step.call(this.elem, this.now, this);
			(aj.fx.step[this.prop] || aj.fx.step._default)(this);
			if ((this.prop === "height" || this.prop === "width") && this.elem.style) {
				this.elem.style.display = "block"
			}
		},
		cur: function (c) {
			if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) {
				return this.elem[this.prop]
			}
			return (c = parseFloat(aj.css(this.elem, this.prop, c))) && c > -10000 ? c : parseFloat(aj.curCSS(this.elem, this.prop)) || 0
		},
		custom: function (w, c, G) {
			function A(J) {
				return F.step(J)
			}
			this.startTime = aH();
			this.start = w;
			this.end = c;
			this.unit = G || this.unit || "px";
			this.now = this.start;
			this.pos = this.state = 0;
			var F = this;
			A.elem = this.elem;
			if (A() && aj.timers.push(A) && !at) {
				at = setInterval(aj.fx.tick, 13)
			}
		},
		show: function () {
			this.options.orig[this.prop] = aj.style(this.elem, this.prop);
			this.options.show = true;
			this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur());
			aj(this.elem).show()
		},
		hide: function () {
			this.options.orig[this.prop] = aj.style(this.elem, this.prop);
			this.options.hide = true;
			this.custom(this.cur(), 0)
		},
		step: function (w) {
			var c = aH(),
			G = true;
			if (w || c >= this.options.duration + this.startTime) {
				this.now = this.end;
				this.pos = this.state = 1;
				this.update();
				this.options.curAnim[this.prop] = true;
				for (var A in this.options.curAnim) {
					if (this.options.curAnim[A] !== true) {
						G = false
					}
				}
				if (G) {
					if (this.options.display != null) {
						this.elem.style.overflow = this.options.overflow;
						w = aj.data(this.elem, "olddisplay");
						this.elem.style.display = w ? w : this.options.display;
						if (aj.css(this.elem, "display") === "none") {
							this.elem.style.display = "block"
						}
					}
					this.options.hide && aj(this.elem).hide();
					if (this.options.hide || this.options.show) {
						for (var F in this.options.curAnim) {
							aj.style(this.elem, F, this.options.orig[F])
						}
					}
					this.options.complete.call(this.elem)
				}
				return false
			} else {
				F = c - this.startTime;
				this.state = F / this.options.duration;
				w = this.options.easing || (aj.easing.swing ? "swing" : "linear");
				this.pos = aj.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || w](this.state, F, 0, 1, this.options.duration);
				this.now = this.start + (this.end - this.start) * this.pos;
				this.update()
			}
			return true
		}
	};
	aj.extend(aj.fx, {
		tick: function () {
			for (var w = aj.timers, c = 0; c < w.length; c++) {
				w[c]() || w.splice(c--, 1)
			}
			w.length || aj.fx.stop()
		},
		stop: function () {
			clearInterval(at);
			at = null
		},
		speeds: {
			slow: 600,
			fast: 200,
			_default: 400
		},
		step: {
			opacity: function (c) {
				aj.style(c.elem, "opacity", c.now)
			},
			_default: function (c) {
				if (c.elem.style && c.elem.style[c.prop] != null) {
					c.elem.style[c.prop] = (c.prop === "width" || c.prop === "height" ? Math.max(0, c.now) : c.now) + c.unit
				} else {
					c.elem[c.prop] = c.now
				}
			}
		}
	});
	if (aj.expr && aj.expr.filters) {
		aj.expr.filters.animated = function (c) {
			return aj.grep(aj.timers, function (w) {
				return c === w.elem
			}).length
		}
	}
	aj.fn.offset = "getBoundingClientRect" in U.documentElement ? function (w) {
		var c = this[0];
		if (w) {
			return this.each(function (G) {
				aj.offset.setOffset(this, w, G)
			})
		}
		if (!c || !c.ownerDocument) {
			return null
		}
		if (c === c.ownerDocument.body) {
			return aj.offset.bodyOffset(c)
		}
		var F = c.getBoundingClientRect(),
		A = c.ownerDocument;
		c = A.body;
		A = A.documentElement;
		return {
			top: F.top + (self.pageYOffset || aj.support.boxModel && A.scrollTop || c.scrollTop) - (A.clientTop || c.clientTop || 0),
			left: F.left + (self.pageXOffset || aj.support.boxModel && A.scrollLeft || c.scrollLeft) - (A.clientLeft || c.clientLeft || 0)
		}
	} : function (O) {
		var N = this[0];
		if (O) {
			return this.each(function (P) {
				aj.offset.setOffset(this, O, P)
			})
		}
		if (!N || !N.ownerDocument) {
			return null
		}
		if (N === N.ownerDocument.body) {
			return aj.offset.bodyOffset(N)
		}
		aj.offset.initialize();
		var L = N.offsetParent,
		J = N,
		K = N.ownerDocument,
		F,
		G = K.documentElement,
		c = K.body;
		J = (K = K.defaultView) ? K.getComputedStyle(N, null) : N.currentStyle;
		for (var A = N.offsetTop, w = N.offsetLeft; (N = N.parentNode) && N !== c && N !== G; ) {
			if (aj.offset.supportsFixedPosition && J.position === "fixed") {
				break
			}
			F = K ? K.getComputedStyle(N, null) : N.currentStyle;
			A -= N.scrollTop;
			w -= N.scrollLeft;
			if (N === L) {
				A += N.offsetTop;
				w += N.offsetLeft;
				if (aj.offset.doesNotAddBorder && !(aj.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(N.nodeName))) {
					A += parseFloat(F.borderTopWidth) || 0;
					w += parseFloat(F.borderLeftWidth) || 0
				}
				J = L;
				L = N.offsetParent
			}
			if (aj.offset.subtractsBorderForOverflowNotVisible && F.overflow !== "visible") {
				A += parseFloat(F.borderTopWidth) || 0;
				w += parseFloat(F.borderLeftWidth) || 0
			}
			J = F
		}
		if (J.position === "relative" || J.position === "static") {
			A += c.offsetTop;
			w += c.offsetLeft
		}
		if (aj.offset.supportsFixedPosition && J.position === "fixed") {
			A += Math.max(G.scrollTop, c.scrollTop);
			w += Math.max(G.scrollLeft, c.scrollLeft)
		}
		return {
			top: A,
			left: w
		}
	};
	aj.offset = {
		initialize: function () {
			var w = U.body,
			c = U.createElement("div"),
			J,
			F,
			G,
			A = parseFloat(aj.curCSS(w, "marginTop", true)) || 0;
			aj.extend(c.style, {
				position: "absolute",
				top: 0,
				left: 0,
				margin: 0,
				border: 0,
				width: "1px",
				height: "1px",
				visibility: "hidden"
			});
			c.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
			w.insertBefore(c, w.firstChild);
			J = c.firstChild;
			F = J.firstChild;
			G = J.nextSibling.firstChild.firstChild;
			this.doesNotAddBorder = F.offsetTop !== 5;
			this.doesAddBorderForTableAndCells = G.offsetTop === 5;
			F.style.position = "fixed";
			F.style.top = "20px";
			this.supportsFixedPosition = F.offsetTop === 20 || F.offsetTop === 15;
			F.style.position = F.style.top = "";
			J.style.overflow = "hidden";
			J.style.position = "relative";
			this.subtractsBorderForOverflowNotVisible = F.offsetTop === -5;
			this.doesNotIncludeMarginInBodyOffset = w.offsetTop !== A;
			w.removeChild(c);
			aj.offset.initialize = aj.noop
		},
		bodyOffset: function (w) {
			var c = w.offsetTop,
			A = w.offsetLeft;
			aj.offset.initialize();
			if (aj.offset.doesNotIncludeMarginInBodyOffset) {
				c += parseFloat(aj.curCSS(w, "marginTop", true)) || 0;
				A += parseFloat(aj.curCSS(w, "marginLeft", true)) || 0
			}
			return {
				top: c,
				left: A
			}
		},
		setOffset: function (w, c, K) {
			if (/static/.test(aj.curCSS(w, "position"))) {
				w.style.position = "relative"
			}
			var G = aj(w),
			J = G.offset(),
			A = parseInt(aj.curCSS(w, "top", true), 10) || 0,
			F = parseInt(aj.curCSS(w, "left", true), 10) || 0;
			if (aj.isFunction(c)) {
				c = c.call(w, K, J)
			}
			K = {
				top: c.top - J.top + A,
				left: c.left - J.left + F
			};
			"using" in c ? c.using.call(w, K) : G.css(K)
		}
	};
	aj.fn.extend({
		position: function () {
			if (!this[0]) {
				return null
			}
			var w = this[0],
			c = this.offsetParent(),
			F = this.offset(),
			A = /^body|html$/i.test(c[0].nodeName) ? {
				top: 0,
				left: 0
			} : c.offset();
			F.top -= parseFloat(aj.curCSS(w, "marginTop", true)) || 0;
			F.left -= parseFloat(aj.curCSS(w, "marginLeft", true)) || 0;
			A.top += parseFloat(aj.curCSS(c[0], "borderTopWidth", true)) || 0;
			A.left += parseFloat(aj.curCSS(c[0], "borderLeftWidth", true)) || 0;
			return {
				top: F.top - A.top,
				left: F.left - A.left
			}
		},
		offsetParent: function () {
			return this.map(function () {
				for (var c = this.offsetParent || U.body; c && !/^body|html$/i.test(c.nodeName) && aj.css(c, "position") === "static"; ) {
					c = c.offsetParent
				}
				return c
			})
		}
	});
	aj.each(["Left", "Top"], function (w, c) {
		var A = "scroll" + c;
		aj.fn[A] = function (G) {
			var J = this[0],
			F;
			if (!J) {
				return null
			}
			if (G !== S) {
				return this.each(function () {
					if (F = p(this)) {
						F.scrollTo(!w ? G : aj(F).scrollLeft(), w ? G : aj(F).scrollTop())
					} else {
						this[A] = G
					}
				})
			} else {
				return (F = p(J)) ? "pageXOffset" in F ? F[w ? "pageYOffset" : "pageXOffset"] : aj.support.boxModel && F.document.documentElement[A] || F.document.body[A] : J[A]
			}
		}
	});
	aj.each(["Height", "Width"], function (w, c) {
		var A = c.toLowerCase();
		aj.fn["inner" + c] = function () {
			return this[0] ? aj.css(this[0], A, false, "padding") : null
		};
		aj.fn["outer" + c] = function (F) {
			return this[0] ? aj.css(this[0], A, false, F ? "margin" : "border") : null
		};
		aj.fn[A] = function (F) {
			var G = this[0];
			if (!G) {
				return F == null ? null : this
			}
			if (aj.isFunction(F)) {
				return this.each(function (J) {
					var K = aj(this);
					K[A](F.call(this, J, K[A]()))
				})
			}
			return "scrollTo" in G && G.document ? G.document.compatMode === "CSS1Compat" && G.document.documentElement["client" + c] || G.document.body["client" + c] : G.nodeType === 9 ? Math.max(G.documentElement["client" + c], G.body["scroll" + c], G.documentElement["scroll" + c], G.body["offset" + c], G.documentElement["offset" + c]) : F === S ? aj.css(G, A) : this.css(A, typeof F === "string" ? F : F + "px")
		}
	});
	aQ.jQuery = aQ.$ = aj
})(window);
/*
 * jQuery UI 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI
 */
(function (e, d) {
	function b(c) {
		return !e(c).parents().andSelf().filter(function () {
			return e.curCSS(this, "visibility") === "hidden" || e.expr.filters.hidden(this)
		}).length
	}
	e.ui = e.ui || {};
	if (!e.ui.version) {
		e.extend(e.ui, {
			version: "1.8.5",
			keyCode: {
				ALT: 18,
				BACKSPACE: 8,
				CAPS_LOCK: 20,
				COMMA: 188,
				COMMAND: 91,
				COMMAND_LEFT: 91,
				COMMAND_RIGHT: 93,
				CONTROL: 17,
				DELETE: 46,
				DOWN: 40,
				END: 35,
				ENTER: 13,
				ESCAPE: 27,
				HOME: 36,
				INSERT: 45,
				LEFT: 37,
				MENU: 93,
				NUMPAD_ADD: 107,
				NUMPAD_DECIMAL: 110,
				NUMPAD_DIVIDE: 111,
				NUMPAD_ENTER: 108,
				NUMPAD_MULTIPLY: 106,
				NUMPAD_SUBTRACT: 109,
				PAGE_DOWN: 34,
				PAGE_UP: 33,
				PERIOD: 190,
				RIGHT: 39,
				SHIFT: 16,
				SPACE: 32,
				TAB: 9,
				UP: 38,
				WINDOWS: 91
			}
		});
		e.fn.extend({
			_focus: e.fn.focus,
			focus: function (f, c) {
				return typeof f === "number" ? this.each(function () {
					var g = this;
					setTimeout(function () {
						e(g).focus();
						c && c.call(g)
					}, f)
				}) : this._focus.apply(this, arguments)
			},
			scrollParent: function () {
				var c;
				c = e.browser.msie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function () {
					return /(relative|absolute|fixed)/.test(e.curCSS(this, "position", 1)) && /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
				}).eq(0) : this.parents().filter(function () {
					return /(auto|scroll)/.test(e.curCSS(this, "overflow", 1) + e.curCSS(this, "overflow-y", 1) + e.curCSS(this, "overflow-x", 1))
				}).eq(0);
				return /fixed/.test(this.css("position")) || !c.length ? e(document) : c
			},
			zIndex: function (f) {
				if (f !== d) {
					return this.css("zIndex", f)
				}
				if (this.length) {
					f = e(this[0]);
					for (var c; f.length && f[0] !== document; ) {
						c = f.css("position");
						if (c === "absolute" || c === "relative" || c === "fixed") {
							c = parseInt(f.css("zIndex"));
							if (!isNaN(c) && c != 0) {
								return c
							}
						}
						f = f.parent()
					}
				}
				return 0
			},
			disableSelection: function () {
				return this.bind("mousedown.ui-disableSelection selectstart.ui-disableSelection", function (c) {
					c.preventDefault()
				})
			},
			enableSelection: function () {
				return this.unbind(".ui-disableSelection")
			}
		});
		e.each(["Width", "Height"], function (f, c) {
			function l(o, n, i, h) {
				e.each(k, function () {
					n -= parseFloat(e.curCSS(o, "padding" + this, true)) || 0;
					if (i) {
						n -= parseFloat(e.curCSS(o, "border" + this + "Width", true)) || 0
					}
					if (h) {
						n -= parseFloat(e.curCSS(o, "margin" + this, true)) || 0
					}
				});
				return n
			}
			var k = c === "Width" ? ["Left", "Right"] : ["Top", "Bottom"],
			j = c.toLowerCase(),
			g = {
				innerWidth: e.fn.innerWidth,
				innerHeight: e.fn.innerHeight,
				outerWidth: e.fn.outerWidth,
				outerHeight: e.fn.outerHeight
			};
			e.fn["inner" + c] = function (h) {
				if (h === d) {
					return g["inner" + c].call(this)
				}
				return this.each(function () {
					e.style(this, j, l(this, h) + "px")
				})
			};
			e.fn["outer" + c] = function (i, h) {
				if (typeof i !== "number") {
					return g["outer" + c].call(this, i)
				}
				return this.each(function () {
					e.style(this, j, l(this, i, true, h) + "px")
				})
			}
		});
		e.extend(e.expr[":"], {
			data: function (f, c, g) {
				return !!e.data(f, g[3])
			},
			focusable: function (f) {
				var c = f.nodeName.toLowerCase(),
				g = e.attr(f, "tabindex");
				if ("area" === c) {
					c = f.parentNode;
					g = c.name;
					if (!f.href || !g || c.nodeName.toLowerCase() !== "map") {
						return false
					}
					f = e("img[usemap=#" + g + "]")[0];
					return !!f && b(f)
				}
				return (/input|select|textarea|button|object/.test(c) ? !f.disabled : "a" == c ? f.href || !isNaN(g) : !isNaN(g)) && b(f)
			},
			tabbable: function (f) {
				var c = e.attr(f, "tabindex");
				return (isNaN(c) || c >= 0) && e(f).is(":focusable")
			}
		});
		e(function () {
			var f = document.createElement("div"),
			c = document.body;
			e.extend(f.style, {
				minHeight: "100px",
				height: "auto",
				padding: 0,
				borderWidth: 0
			});
			e.support.minHeight = c.appendChild(f).offsetHeight === 100;
			c.removeChild(f).style.display = "none"
		});
		e.extend(e.ui, {
			plugin: {
				add: function (f, c, h) {
					f = e.ui[f].prototype;
					for (var g in h) {
						f.plugins[g] = f.plugins[g] || [];
						f.plugins[g].push([c, h[g]])
					}
				},
				call: function (f, c, h) {
					if ((c = f.plugins[c]) && f.element[0].parentNode) {
						for (var g = 0; g < c.length; g++) {
							f.options[c[g][0]] && c[g][1].apply(f.element, h)
						}
					}
				}
			},
			contains: function (f, c) {
				return document.compareDocumentPosition ? f.compareDocumentPosition(c) & 16 : f !== c && f.contains(c)
			},
			hasScroll: function (f, c) {
				if (e(f).css("overflow") === "hidden") {
					return false
				}
				c = c && c === "left" ? "scrollLeft" : "scrollTop";
				var g = false;
				if (f[c] > 0) {
					return true
				}
				f[c] = 1;
				g = f[c] > 0;
				f[c] = 0;
				return g
			},
			isOverAxis: function (f, c, g) {
				return f > c && f < c + g
			},
			isOver: function (f, c, l, k, j, g) {
				return e.ui.isOverAxis(f, l, j) && e.ui.isOverAxis(c, k, g)
			}
		})
	}
})(jQuery);
/*
 * jQuery UI Widget 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Widget
 */
(function (c, f) {
	if (c.cleanData) {
		var e = c.cleanData;
		c.cleanData = function (b) {
			for (var h = 0, g; (g = b[h]) != null; h++) {
				c(g).triggerHandler("remove")
			}
			e(b)
		}
	} else {
		var d = c.fn.remove;
		c.fn.remove = function (b, g) {
			return this.each(function () {
				if (!g) {
					if (!b || c.filter(b, [this]).length) {
						c("*", this).add([this]).each(function () {
							c(this).triggerHandler("remove")
						})
					}
				}
				return d.call(c(this), b, g)
			})
		}
	}
	c.widget = function (b, j, i) {
		var h = b.split(".")[0],
		g;
		b = b.split(".")[1];
		g = h + "-" + b;
		if (!i) {
			i = j;
			j = c.Widget
		}
		c.expr[":"][g] = function (k) {
			return !!c.data(k, b)
		};
		c[h] = c[h] || {};
		c[h][b] = function (k, l) {
			arguments.length && this._createWidget(k, l)
		};
		j = new j;
		j.options = c.extend(true, {}, j.options);
		c[h][b].prototype = c.extend(true, j, {
			namespace: h,
			widgetName: b,
			widgetEventPrefix: c[h][b].prototype.widgetEventPrefix || b,
			widgetBaseClass: g
		}, i);
		c.widget.bridge(b, c[h][b])
	};
	c.widget.bridge = function (b, g) {
		c.fn[b] = function (l) {
			var k = typeof l === "string",
			j = Array.prototype.slice.call(arguments, 1),
			i = this;
			l = !k && j.length ? c.extend.apply(null, [true, l].concat(j)) : l;
			if (k && l.substring(0, 1) === "_") {
				return i
			}
			k ? this.each(function () {
				var m = c.data(this, b);
				if (!m) {
					throw "cannot call methods on " + b + " prior to initialization; attempted to call method '" + l + "'"
				}
				if (!c.isFunction(m[l])) {
					throw "no such method '" + l + "' for " + b + " widget instance"
				}
				var h = m[l].apply(m, j);
				if (h !== m && h !== f) {
					i = h;
					return false
				}
			}) : this.each(function () {
				var h = c.data(this, b);
				h ? h.option(l || {})._init() : c.data(this, b, new g(l, this))
			});
			return i
		}
	};
	c.Widget = function (b, g) {
		arguments.length && this._createWidget(b, g)
	};
	c.Widget.prototype = {
		widgetName: "widget",
		widgetEventPrefix: "",
		options: {
			disabled: false
		},
		_createWidget: function (b, h) {
			c.data(h, this.widgetName, this);
			this.element = c(h);
			this.options = c.extend(true, {}, this.options, c.metadata && c.metadata.get(h)[this.widgetName], b);
			var g = this;
			this.element.bind("remove." + this.widgetName, function () {
				g.destroy()
			});
			this._create();
			this._init()
		},
		_create: function () {},
		_init: function () {},
		destroy: function () {
			this.element.unbind("." + this.widgetName).removeData(this.widgetName);
			this.widget().unbind("." + this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass + "-disabled ui-state-disabled")
		},
		widget: function () {
			return this.element
		},
		option: function (b, i) {
			var h = b,
			g = this;
			if (arguments.length === 0) {
				return c.extend({}, g.options)
			}
			if (typeof b === "string") {
				if (i === f) {
					return this.options[b]
				}
				h = {};
				h[b] = i
			}
			c.each(h, function (k, j) {
				g._setOption(k, j)
			});
			return g
		},
		_setOption: function (b, g) {
			this.options[b] = g;
			if (b === "disabled") {
				this.widget()[g ? "addClass" : "removeClass"](this.widgetBaseClass + "-disabled ui-state-disabled").attr("aria-disabled", g)
			}
			return this
		},
		enable: function () {
			return this._setOption("disabled", false)
		},
		disable: function () {
			return this._setOption("disabled", true)
		},
		_trigger: function (b, j, i) {
			var h = this.options[b];
			j = c.Event(j);
			j.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase();
			i = i || {};
			if (j.originalEvent) {
				b = c.event.props.length;
				for (var g; b; ) {
					g = c.event.props[--b];
					j[g] = j.originalEvent[g]
				}
			}
			this.element.trigger(j, i);
			return !(c.isFunction(h) && h.call(this.element[0], j, i) === false || j.isDefaultPrevented())
		}
	}
})(jQuery);
/*
 * jQuery UI Mouse 1.8.5
 *
 * Copyright 2010, AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://docs.jquery.com/UI/Mouse
 *
 * Depends:
 *	jquery.ui.widget.js
 */
(function (b) {
	b.widget("ui.mouse", {
		options: {
			cancel: ":input,option",
			distance: 1,
			delay: 0
		},
		_mouseInit: function () {
			var c = this;
			this.element.bind("mousedown." + this.widgetName, function (d) {
				return c._mouseDown(d)
			}).bind("click." + this.widgetName, function (d) {
				if (c._preventClickEvent) {
					c._preventClickEvent = false;
					d.stopImmediatePropagation();
					return false
				}
			});
			this.started = false
		},
		_mouseDestroy: function () {
			this.element.unbind("." + this.widgetName)
		},
		_mouseDown: function (d) {
			d.originalEvent = d.originalEvent || {};
			if (!d.originalEvent.mouseHandled) {
				this._mouseStarted && this._mouseUp(d);
				this._mouseDownEvent = d;
				var c = this,
				h = d.which == 1,
				g = typeof this.options.cancel == "string" ? b(d.target).parents().add(d.target).filter(this.options.cancel).length : false;
				if (!h || g || !this._mouseCapture(d)) {
					return true
				}
				this.mouseDelayMet = !this.options.delay;
				if (!this.mouseDelayMet) {
					this._mouseDelayTimer = setTimeout(function () {
						c.mouseDelayMet = true
					}, this.options.delay)
				}
				if (this._mouseDistanceMet(d) && this._mouseDelayMet(d)) {
					this._mouseStarted = this._mouseStart(d) !== false;
					if (!this._mouseStarted) {
						d.preventDefault();
						return true
					}
				}
				this._mouseMoveDelegate = function (e) {
					return c._mouseMove(e)
				};
				this._mouseUpDelegate = function (e) {
					return c._mouseUp(e)
				};
				b(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate);
				b.browser.safari || d.preventDefault();
				return d.originalEvent.mouseHandled = true
			}
		},
		_mouseMove: function (c) {
			if (b.browser.msie && !c.button) {
				return this._mouseUp(c)
			}
			if (this._mouseStarted) {
				this._mouseDrag(c);
				return c.preventDefault()
			}
			if (this._mouseDistanceMet(c) && this._mouseDelayMet(c)) {
				(this._mouseStarted = this._mouseStart(this._mouseDownEvent, c) !== false) ? this._mouseDrag(c) : this._mouseUp(c)
			}
			return !this._mouseStarted
		},
		_mouseUp: function (c) {
			b(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate);
			if (this._mouseStarted) {
				this._mouseStarted = false;
				this._preventClickEvent = c.target == this._mouseDownEvent.target;
				this._mouseStop(c)
			}
			return false
		},
		_mouseDistanceMet: function (c) {
			return Math.max(Math.abs(this._mouseDownEvent.pageX - c.pageX), Math.abs(this._mouseDownEvent.pageY - c.pageY)) >= this.options.distance
		},
		_mouseDelayMet: function () {
			return this.mouseDelayMet
		},
		_mouseStart: function () {},
		_mouseDrag: function () {},
		_mouseStop: function () {},
		_mouseCapture: function () {
			return true
		}
	})
})(jQuery);
(function (g) {
	g.ui = g.ui || {};
	var f = /left|center|right/,
	e = /top|center|bottom/,
	d = g.fn.position,
	b = g.fn.offset;
	g.fn.position = function (c) {
		if (!c || !c.of) {
			return d.apply(this, arguments)
		}
		c = g.extend({}, c);
		var i = g(c.of),
		q = i[0],
		o = (c.collision || "flip").split(" "),
		p = c.offset ? c.offset.split(" ") : [0, 0],
		n,
		l,
		m;
		if (q.nodeType === 9) {
			n = i.width();
			l = i.height();
			m = {
				top: 0,
				left: 0
			}
		} else {
			if (q.scrollTo && q.document) {
				n = i.width();
				l = i.height();
				m = {
					top: i.scrollTop(),
					left: i.scrollLeft()
				}
			} else {
				if (q.preventDefault) {
					c.at = "left top";
					n = l = 0;
					m = {
						top: c.of.pageY,
						left: c.of.pageX
					}
				} else {
					n = i.outerWidth();
					l = i.outerHeight();
					m = i.offset()
				}
			}
		}
		g.each(["my", "at"], function () {
			var h = (c[this] || "").split(" ");
			if (h.length === 1) {
				h = f.test(h[0]) ? h.concat(["center"]) : e.test(h[0]) ? ["center"].concat(h) : ["center", "center"]
			}
			h[0] = f.test(h[0]) ? h[0] : "center";
			h[1] = e.test(h[1]) ? h[1] : "center";
			c[this] = h
		});
		if (o.length === 1) {
			o[1] = o[0]
		}
		p[0] = parseInt(p[0], 10) || 0;
		if (p.length === 1) {
			p[1] = p[0]
		}
		p[1] = parseInt(p[1], 10) || 0;
		if (c.at[0] === "right") {
			m.left += n
		} else {
			if (c.at[0] === "center") {
				m.left += n / 2
			}
		}
		if (c.at[1] === "bottom") {
			m.top += l
		} else {
			if (c.at[1] === "center") {
				m.top += l / 2
			}
		}
		m.left += p[0];
		m.top += p[1];
		return this.each(function () {
			var y = g(this),
			u = y.outerWidth(),
			t = y.outerHeight(),
			k = parseInt(g.curCSS(this, "marginLeft", true)) || 0,
			j = parseInt(g.curCSS(this, "marginTop", true)) || 0,
			B = u + k + parseInt(g.curCSS(this, "marginRight", true)) || 0,
			A = t + j + parseInt(g.curCSS(this, "marginBottom", true)) || 0,
			x = g.extend({}, m),
			h;
			if (c.my[0] === "right") {
				x.left -= u
			} else {
				if (c.my[0] === "center") {
					x.left -= u / 2
				}
			}
			if (c.my[1] === "bottom") {
				x.top -= t
			} else {
				if (c.my[1] === "center") {
					x.top -= t / 2
				}
			}
			x.left = parseInt(x.left);
			x.top = parseInt(x.top);
			h = {
				left: x.left - k,
				top: x.top - j
			};
			g.each(["left", "top"], function (v, r) {
				g.ui.position[o[v]] && g.ui.position[o[v]][r](x, {
					targetWidth: n,
					targetHeight: l,
					elemWidth: u,
					elemHeight: t,
					collisionPosition: h,
					collisionWidth: B,
					collisionHeight: A,
					offset: p,
					my: c.my,
					at: c.at
				})
			});
			g.fn.bgiframe && y.bgiframe();
			y.offset(g.extend(x, {
					using: c.using
				}))
		})
	};
	g.ui.position = {
		fit: {
			left: function (c, h) {
				var i = g(window);
				i = h.collisionPosition.left + h.collisionWidth - i.width() - i.scrollLeft();
				c.left = i > 0 ? c.left - i : Math.max(c.left - h.collisionPosition.left, c.left)
			},
			top: function (c, h) {
				var i = g(window);
				i = h.collisionPosition.top + h.collisionHeight - i.height() - i.scrollTop();
				c.top = i > 0 ? c.top - i : Math.max(c.top - h.collisionPosition.top, c.top)
			}
		},
		flip: {
			left: function (c, i) {
				if (i.at[0] !== "center") {
					var m = g(window);
					m = i.collisionPosition.left + i.collisionWidth - m.width() - m.scrollLeft();
					var k = i.my[0] === "left" ? -i.elemWidth : i.my[0] === "right" ? i.elemWidth : 0,
					l = i.at[0] === "left" ? i.targetWidth : -i.targetWidth,
					j = -2 * i.offset[0];
					c.left += i.collisionPosition.left < 0 ? k + l + j : m > 0 ? k + l + j : 0
				}
			},
			top: function (c, i) {
				if (i.at[1] !== "center") {
					var m = g(window);
					m = i.collisionPosition.top + i.collisionHeight - m.height() - m.scrollTop();
					var k = i.my[1] === "top" ? -i.elemHeight : i.my[1] === "bottom" ? i.elemHeight : 0,
					l = i.at[1] === "top" ? i.targetHeight : -i.targetHeight,
					j = -2 * i.offset[1];
					c.top += i.collisionPosition.top < 0 ? k + l + j : m > 0 ? k + l + j : 0
				}
			}
		}
	};
	if (!g.offset.setOffset) {
		g.offset.setOffset = function (c, i) {
			if (/static/.test(g.curCSS(c, "position"))) {
				c.style.position = "relative"
			}
			var m = g(c),
			k = m.offset(),
			l = parseInt(g.curCSS(c, "top", true), 10) || 0,
			j = parseInt(g.curCSS(c, "left", true), 10) || 0;
			k = {
				top: i.top - k.top + l,
				left: i.left - k.left + j
			};
			"using" in i ? i.using.call(c, k) : m.css(k)
		};
		g.fn.offset = function (c) {
			var h = this[0];
			if (!h || !h.ownerDocument) {
				return null
			}
			if (c) {
				return this.each(function () {
					g.offset.setOffset(this, c)
				})
			}
			return b.call(this)
		}
	}
})(jQuery);
(function (b) {
	b.widget("ui.sortable", b.ui.mouse, {
		widgetEventPrefix: "sort",
		options: {
			appendTo: "parent",
			axis: false,
			connectWith: false,
			containment: false,
			cursor: "auto",
			cursorAt: false,
			dropOnEmpty: true,
			forcePlaceholderSize: false,
			forceHelperSize: false,
			grid: false,
			handle: false,
			helper: "original",
			items: "> *",
			opacity: false,
			placeholder: false,
			revert: false,
			scroll: true,
			scrollSensitivity: 20,
			scrollSpeed: 20,
			scope: "default",
			tolerance: "intersect",
			zIndex: 1000
		},
		_create: function () {
			this.containerCache = {};
			this.element.addClass("ui-sortable");
			this.refresh();
			this.floating = this.items.length ? /left|right/.test(this.items[0].item.css("float")) : false;
			this.offset = this.element.offset();
			this._mouseInit()
		},
		destroy: function () {
			this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");
			this._mouseDestroy();
			for (var c = this.items.length - 1; c >= 0; c--) {
				this.items[c].item.removeData("sortable-item")
			}
			return this
		},
		_setOption: function (d, c) {
			if (d === "disabled") {
				this.options[d] = c;
				this.widget()[c ? "addClass" : "removeClass"]("ui-sortable-disabled")
			} else {
				b.Widget.prototype._setOption.apply(this, arguments)
			}
		},
		_mouseCapture: function (g, d) {
			if (this.reverting) {
				return false
			}
			if (this.options.disabled || this.options.type == "static") {
				return false
			}
			this._refreshItems(g);
			var j = null,
			i = this;
			b(g.target).parents().each(function () {
				if (b.data(this, "sortable-item") == i) {
					j = b(this);
					return false
				}
			});
			if (b.data(g.target, "sortable-item") == i) {
				j = b(g.target)
			}
			if (!j) {
				return false
			}
			if (this.options.handle && !d) {
				var h = false;
				b(this.options.handle, j).find("*").andSelf().each(function () {
					if (this == g.target) {
						h = true
					}
				});
				if (!h) {
					return false
				}
			}
			this.currentItem = j;
			this._removeCurrentsFromItems();
			return true
		},
		_mouseStart: function (f, d, h) {
			d = this.options;
			var g = this;
			this.currentContainer = this;
			this.refreshPositions();
			this.helper = this._createHelper(f);
			this._cacheHelperProportions();
			this._cacheMargins();
			this.scrollParent = this.helper.scrollParent();
			this.offset = this.currentItem.offset();
			this.offset = {
				top: this.offset.top - this.margins.top,
				left: this.offset.left - this.margins.left
			};
			this.helper.css("position", "absolute");
			this.cssPosition = this.helper.css("position");
			b.extend(this.offset, {
				click: {
					left: f.pageX - this.offset.left,
					top: f.pageY - this.offset.top
				},
				parent: this._getParentOffset(),
				relative: this._getRelativeOffset()
			});
			this.originalPosition = this._generatePosition(f);
			this.originalPageX = f.pageX;
			this.originalPageY = f.pageY;
			d.cursorAt && this._adjustOffsetFromHelper(d.cursorAt);
			this.domPosition = {
				prev: this.currentItem.prev()[0],
				parent: this.currentItem.parent()[0]
			};
			this.helper[0] != this.currentItem[0] && this.currentItem.hide();
			this._createPlaceholder();
			d.containment && this._setContainment();
			if (d.cursor) {
				if (b("body").css("cursor")) {
					this._storedCursor = b("body").css("cursor")
				}
				b("body").css("cursor", d.cursor)
			}
			if (d.opacity) {
				if (this.helper.css("opacity")) {
					this._storedOpacity = this.helper.css("opacity")
				}
				this.helper.css("opacity", d.opacity)
			}
			if (d.zIndex) {
				if (this.helper.css("zIndex")) {
					this._storedZIndex = this.helper.css("zIndex")
				}
				this.helper.css("zIndex", d.zIndex)
			}
			if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
				this.overflowOffset = this.scrollParent.offset()
			}
			this._trigger("start", f, this._uiHash());
			this._preserveHelperProportions || this._cacheHelperProportions();
			if (!h) {
				for (h = this.containers.length - 1; h >= 0; h--) {
					this.containers[h]._trigger("activate", f, g._uiHash(this))
				}
			}
			if (b.ui.ddmanager) {
				b.ui.ddmanager.current = this
			}
			b.ui.ddmanager && !d.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, f);
			this.dragging = true;
			this.helper.addClass("ui-sortable-helper");
			this._mouseDrag(f);
			return true
		},
		_mouseDrag: function (g) {
			this.position = this._generatePosition(g);
			this.positionAbs = this._convertPositionTo("absolute");
			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs
			}
			if (this.options.scroll) {
				var d = this.options,
				j = false;
				if (this.scrollParent[0] != document && this.scrollParent[0].tagName != "HTML") {
					if (this.overflowOffset.top + this.scrollParent[0].offsetHeight - g.pageY < d.scrollSensitivity) {
						this.scrollParent[0].scrollTop = j = this.scrollParent[0].scrollTop + d.scrollSpeed
					} else {
						if (g.pageY - this.overflowOffset.top < d.scrollSensitivity) {
							this.scrollParent[0].scrollTop = j = this.scrollParent[0].scrollTop - d.scrollSpeed
						}
					}
					if (this.overflowOffset.left + this.scrollParent[0].offsetWidth - g.pageX < d.scrollSensitivity) {
						this.scrollParent[0].scrollLeft = j = this.scrollParent[0].scrollLeft + d.scrollSpeed
					} else {
						if (g.pageX - this.overflowOffset.left < d.scrollSensitivity) {
							this.scrollParent[0].scrollLeft = j = this.scrollParent[0].scrollLeft - d.scrollSpeed
						}
					}
				} else {
					if (g.pageY - b(document).scrollTop() < d.scrollSensitivity) {
						j = b(document).scrollTop(b(document).scrollTop() - d.scrollSpeed)
					} else {
						if (b(window).height() - (g.pageY - b(document).scrollTop()) < d.scrollSensitivity) {
							j = b(document).scrollTop(b(document).scrollTop() + d.scrollSpeed)
						}
					}
					if (g.pageX - b(document).scrollLeft() < d.scrollSensitivity) {
						j = b(document).scrollLeft(b(document).scrollLeft() - d.scrollSpeed)
					} else {
						if (b(window).width() - (g.pageX - b(document).scrollLeft()) < d.scrollSensitivity) {
							j = b(document).scrollLeft(b(document).scrollLeft() + d.scrollSpeed)
						}
					}
				}
				j !== false && b.ui.ddmanager && !d.dropBehaviour && b.ui.ddmanager.prepareOffsets(this, g)
			}
			this.positionAbs = this._convertPositionTo("absolute");
			if (!this.options.axis || this.options.axis != "y") {
				this.helper[0].style.left = this.position.left + "px"
			}
			if (!this.options.axis || this.options.axis != "x") {
				this.helper[0].style.top = this.position.top + "px"
			}
			for (d = this.items.length - 1; d >= 0; d--) {
				j = this.items[d];
				var i = j.item[0],
				h = this._intersectsWithPointer(j);
				if (h) {
					if (i != this.currentItem[0] && this.placeholder[h == 1 ? "next" : "prev"]()[0] != i && !b.ui.contains(this.placeholder[0], i) && (this.options.type == "semi-dynamic" ? !b.ui.contains(this.element[0], i) : true)) {
						this.direction = h == 1 ? "down" : "up";
						if (this.options.tolerance == "pointer" || this._intersectsWithSides(j)) {
							this._rearrange(g, j)
						} else {
							break
						}
						this._trigger("change", g, this._uiHash());
						break
					}
				}
			}
			this._contactContainers(g);
			b.ui.ddmanager && b.ui.ddmanager.drag(this, g);
			this._trigger("sort", g, this._uiHash());
			this.lastPositionAbs = this.positionAbs;
			return false
		},
		_mouseStop: function (e, d) {
			if (e) {
				b.ui.ddmanager && !this.options.dropBehaviour && b.ui.ddmanager.drop(this, e);
				if (this.options.revert) {
					var f = this;
					d = f.placeholder.offset();
					f.reverting = true;
					b(this.helper).animate({
						left: d.left - this.offset.parent.left - f.margins.left + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollLeft),
						top: d.top - this.offset.parent.top - f.margins.top + (this.offsetParent[0] == document.body ? 0 : this.offsetParent[0].scrollTop)
					}, parseInt(this.options.revert, 10) || 500, function () {
						f._clear(e)
					})
				} else {
					this._clear(e, d)
				}
				return false
			}
		},
		cancel: function () {
			var d = this;
			if (this.dragging) {
				this._mouseUp();
				this.options.helper == "original" ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
				for (var c = this.containers.length - 1; c >= 0; c--) {
					this.containers[c]._trigger("deactivate", null, d._uiHash(this));
					if (this.containers[c].containerCache.over) {
						this.containers[c]._trigger("out", null, d._uiHash(this));
						this.containers[c].containerCache.over = 0
					}
				}
			}
			this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			this.options.helper != "original" && this.helper && this.helper[0].parentNode && this.helper.remove();
			b.extend(this, {
				helper: null,
				dragging: false,
				reverting: false,
				_noFinalSort: null
			});
			this.domPosition.prev ? b(this.domPosition.prev).after(this.currentItem) : b(this.domPosition.parent).prepend(this.currentItem);
			return this
		},
		serialize: function (e) {
			var d = this._getItemsAsjQuery(e && e.connected),
			f = [];
			e = e || {};
			b(d).each(function () {
				var c = (b(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[-=_](.+)/);
				if (c) {
					f.push((e.key || c[1] + "[]") + "=" + (e.key && e.expression ? c[1] : c[2]))
				}
			});
			!f.length && e.key && f.push(e.key + "=");
			return f.join("&")
		},
		toArray: function (e) {
			var d = this._getItemsAsjQuery(e && e.connected),
			f = [];
			e = e || {};
			d.each(function () {
				f.push(b(e.item || this).attr(e.attribute || "id") || "")
			});
			return f
		},
		_intersectsWith: function (w) {
			var v = this.positionAbs.left,
			u = v + this.helperProportions.width,
			t = this.positionAbs.top,
			r = t + this.helperProportions.height,
			q = w.left,
			p = q + w.width,
			o = w.top,
			m = o + w.height,
			n = this.offset.click.top,
			d = this.offset.click.left;
			n = t + n > o && t + n < m && v + d > q && v + d < p;
			return this.options.tolerance == "pointer" || this.options.forcePointerForContainers || this.options.tolerance != "pointer" && this.helperProportions[this.floating ? "width" : "height"] > w[this.floating ? "width" : "height"] ? n : q < v + this.helperProportions.width / 2 && u - this.helperProportions.width / 2 < p && o < t + this.helperProportions.height / 2 && r - this.helperProportions.height / 2 < m
		},
		_intersectsWithPointer: function (e) {
			var d = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, e.top, e.height);
			e = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, e.left, e.width);
			d = d && e;
			e = this._getDragVerticalDirection();
			var f = this._getDragHorizontalDirection();
			if (!d) {
				return false
			}
			return this.floating ? f && f == "right" || e == "down" ? 2 : 1 : e && (e == "down" ? 2 : 1)
		},
		_intersectsWithSides: function (f) {
			var d = b.ui.isOverAxis(this.positionAbs.top + this.offset.click.top, f.top + f.height / 2, f.height);
			f = b.ui.isOverAxis(this.positionAbs.left + this.offset.click.left, f.left + f.width / 2, f.width);
			var h = this._getDragVerticalDirection(),
			g = this._getDragHorizontalDirection();
			return this.floating && g ? g == "right" && f || g == "left" && !f : h && (h == "down" && d || h == "up" && !d)
		},
		_getDragVerticalDirection: function () {
			var c = this.positionAbs.top - this.lastPositionAbs.top;
			return c != 0 && (c > 0 ? "down" : "up")
		},
		_getDragHorizontalDirection: function () {
			var c = this.positionAbs.left - this.lastPositionAbs.left;
			return c != 0 && (c > 0 ? "right" : "left")
		},
		refresh: function (c) {
			this._refreshItems(c);
			this.refreshPositions();
			return this
		},
		_connectWith: function () {
			var c = this.options;
			return c.connectWith.constructor == String ? [c.connectWith] : c.connectWith
		},
		_getItemsAsjQuery: function (i) {
			var d = [],
			n = [],
			m = this._connectWith();
			if (m && i) {
				for (i = m.length - 1; i >= 0; i--) {
					for (var l = b(m[i]), k = l.length - 1; k >= 0; k--) {
						var j = b.data(l[k], "sortable");
						if (j && j != this && !j.options.disabled) {
							n.push([b.isFunction(j.options.items) ? j.options.items.call(j.element) : b(j.options.items, j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), j])
						}
					}
				}
			}
			n.push([b.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
						options: this.options,
						item: this.currentItem
					}) : b(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]);
			for (i = n.length - 1; i >= 0; i--) {
				n[i][0].each(function () {
					d.push(this)
				})
			}
			return b(d)
		},
		_removeCurrentsFromItems: function () {
			for (var e = this.currentItem.find(":data(sortable-item)"), d = 0; d < this.items.length; d++) {
				for (var f = 0; f < e.length; f++) {
					e[f] == this.items[d].item[0] && this.items.splice(d, 1)
				}
			}
		},
		_refreshItems: function (j) {
			this.items = [];
			this.containers = [this];
			var d = this.items,
			p = [[b.isFunction(this.options.items) ? this.options.items.call(this.element[0], j, {
						item: this.currentItem
					}) : b(this.options.items, this.element), this]],
			o = this._connectWith();
			if (o) {
				for (var n = o.length - 1; n >= 0; n--) {
					for (var m = b(o[n]), l = m.length - 1; l >= 0; l--) {
						var k = b.data(m[l], "sortable");
						if (k && k != this && !k.options.disabled) {
							p.push([b.isFunction(k.options.items) ? k.options.items.call(k.element[0], j, {
										item: this.currentItem
									}) : b(k.options.items, k.element), k]);
							this.containers.push(k)
						}
					}
				}
			}
			for (n = p.length - 1; n >= 0; n--) {
				j = p[n][1];
				o = p[n][0];
				l = 0;
				for (m = o.length; l < m; l++) {
					k = b(o[l]);
					k.data("sortable-item", j);
					d.push({
						item: k,
						instance: j,
						width: 0,
						height: 0,
						left: 0,
						top: 0
					})
				}
			}
		},
		refreshPositions: function (f) {
			if (this.offsetParent && this.helper) {
				this.offset.parent = this._getParentOffset()
			}
			for (var d = this.items.length - 1; d >= 0; d--) {
				var h = this.items[d],
				g = this.options.toleranceElement ? b(this.options.toleranceElement, h.item) : h.item;
				if (!f) {
					h.width = g.outerWidth();
					h.height = g.outerHeight()
				}
				g = g.offset();
				h.left = g.left;
				h.top = g.top
			}
			if (this.options.custom && this.options.custom.refreshContainers) {
				this.options.custom.refreshContainers.call(this)
			} else {
				for (d = this.containers.length - 1; d >= 0; d--) {
					g = this.containers[d].element.offset();
					this.containers[d].containerCache.left = g.left;
					this.containers[d].containerCache.top = g.top;
					this.containers[d].containerCache.width = this.containers[d].element.outerWidth();
					this.containers[d].containerCache.height = this.containers[d].element.outerHeight()
				}
			}
			return this
		},
		_createPlaceholder: function (f) {
			var d = f || this,
			h = d.options;
			if (!h.placeholder || h.placeholder.constructor == String) {
				var g = h.placeholder;
				h.placeholder = {
					element: function () {
						var c = b(document.createElement(d.currentItem[0].nodeName)).addClass(g || d.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];
						if (!g) {
							c.style.visibility = "hidden"
						}
						return c
					},
					update: function (e, c) {
						if (!(g && !h.forcePlaceholderSize)) {
							c.height() || c.height(d.currentItem.innerHeight() - parseInt(d.currentItem.css("paddingTop") || 0, 10) - parseInt(d.currentItem.css("paddingBottom") || 0, 10));
							c.width() || c.width(d.currentItem.innerWidth() - parseInt(d.currentItem.css("paddingLeft") || 0, 10) - parseInt(d.currentItem.css("paddingRight") || 0, 10))
						}
					}
				}
			}
			d.placeholder = b(h.placeholder.element.call(d.element, d.currentItem));
			d.currentItem.after(d.placeholder);
			h.placeholder.update(d, d.placeholder)
		},
		_contactContainers: function (i) {
			for (var d = null, n = null, m = this.containers.length - 1; m >= 0; m--) {
				if (!b.ui.contains(this.currentItem[0], this.containers[m].element[0])) {
					if (this._intersectsWith(this.containers[m].containerCache)) {
						if (!(d && b.ui.contains(this.containers[m].element[0], d.element[0]))) {
							d = this.containers[m];
							n = m
						}
					} else {
						if (this.containers[m].containerCache.over) {
							this.containers[m]._trigger("out", i, this._uiHash(this));
							this.containers[m].containerCache.over = 0
						}
					}
				}
			}
			if (d) {
				if (this.containers.length === 1) {
					this.containers[n]._trigger("over", i, this._uiHash(this));
					this.containers[n].containerCache.over = 1
				} else {
					if (this.currentContainer != this.containers[n]) {
						d = 10000;
						m = null;
						for (var l = this.positionAbs[this.containers[n].floating ? "left" : "top"], k = this.items.length - 1; k >= 0; k--) {
							if (b.ui.contains(this.containers[n].element[0], this.items[k].item[0])) {
								var j = this.items[k][this.containers[n].floating ? "left" : "top"];
								if (Math.abs(j - l) < d) {
									d = Math.abs(j - l);
									m = this.items[k]
								}
							}
						}
						if (m || this.options.dropOnEmpty) {
							this.currentContainer = this.containers[n];
							m ? this._rearrange(i, m, null, true) : this._rearrange(i, null, this.containers[n].element, true);
							this._trigger("change", i, this._uiHash());
							this.containers[n]._trigger("change", i, this._uiHash(this));
							this.options.placeholder.update(this.currentContainer, this.placeholder);
							this.containers[n]._trigger("over", i, this._uiHash(this));
							this.containers[n].containerCache.over = 1
						}
					}
				}
			}
		},
		_createHelper: function (d) {
			var c = this.options;
			d = b.isFunction(c.helper) ? b(c.helper.apply(this.element[0], [d, this.currentItem])) : c.helper == "clone" ? this.currentItem.clone() : this.currentItem;
			d.parents("body").length || b(c.appendTo != "parent" ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]);
			if (d[0] == this.currentItem[0]) {
				this._storedCSS = {
					width: this.currentItem[0].style.width,
					height: this.currentItem[0].style.height,
					position: this.currentItem.css("position"),
					top: this.currentItem.css("top"),
					left: this.currentItem.css("left")
				}
			}
			if (d[0].style.width == "" || c.forceHelperSize) {
				d.width(this.currentItem.width())
			}
			if (d[0].style.height == "" || c.forceHelperSize) {
				d.height(this.currentItem.height())
			}
			return d
		},
		_adjustOffsetFromHelper: function (c) {
			if (typeof c == "string") {
				c = c.split(" ")
			}
			if (b.isArray(c)) {
				c = {
					left: +c[0],
					top: +c[1] || 0
				}
			}
			if ("left" in c) {
				this.offset.click.left = c.left + this.margins.left
			}
			if ("right" in c) {
				this.offset.click.left = this.helperProportions.width - c.right + this.margins.left
			}
			if ("top" in c) {
				this.offset.click.top = c.top + this.margins.top
			}
			if ("bottom" in c) {
				this.offset.click.top = this.helperProportions.height - c.bottom + this.margins.top
			}
		},
		_getParentOffset: function () {
			this.offsetParent = this.helper.offsetParent();
			var c = this.offsetParent.offset();
			if (this.cssPosition == "absolute" && this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) {
				c.left += this.scrollParent.scrollLeft();
				c.top += this.scrollParent.scrollTop()
			}
			if (this.offsetParent[0] == document.body || this.offsetParent[0].tagName && this.offsetParent[0].tagName.toLowerCase() == "html" && b.browser.msie) {
				c = {
					top: 0,
					left: 0
				}
			}
			return {
				top: c.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
				left: c.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
			}
		},
		_getRelativeOffset: function () {
			if (this.cssPosition == "relative") {
				var c = this.currentItem.position();
				return {
					top: c.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
					left: c.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
				}
			} else {
				return {
					top: 0,
					left: 0
				}
			}
		},
		_cacheMargins: function () {
			this.margins = {
				left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
				top: parseInt(this.currentItem.css("marginTop"), 10) || 0
			}
		},
		_cacheHelperProportions: function () {
			this.helperProportions = {
				width: this.helper.outerWidth(),
				height: this.helper.outerHeight()
			}
		},
		_setContainment: function () {
			var e = this.options;
			if (e.containment == "parent") {
				e.containment = this.helper[0].parentNode
			}
			if (e.containment == "document" || e.containment == "window") {
				this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, b(e.containment == "document" ? document : window).width() - this.helperProportions.width - this.margins.left, (b(e.containment == "document" ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]
			}
			if (!/^(document|window|parent)$/.test(e.containment)) {
				var d = b(e.containment)[0];
				e = b(e.containment).offset();
				var f = b(d).css("overflow") != "hidden";
				this.containment = [e.left + (parseInt(b(d).css("borderLeftWidth"), 10) || 0) + (parseInt(b(d).css("paddingLeft"), 10) || 0) - this.margins.left, e.top + (parseInt(b(d).css("borderTopWidth"), 10) || 0) + (parseInt(b(d).css("paddingTop"), 10) || 0) - this.margins.top, e.left + (f ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(b(d).css("borderLeftWidth"), 10) || 0) - (parseInt(b(d).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, e.top + (f ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(b(d).css("borderTopWidth"), 10) || 0) - (parseInt(b(d).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top]
			}
		},
		_convertPositionTo: function (f, d) {
			if (!d) {
				d = this.position
			}
			f = f == "absolute" ? 1 : -1;
			var h = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			g = /(html|body)/i.test(h[0].tagName);
			return {
				top: d.top + this.offset.relative.top * f + this.offset.parent.top * f - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : g ? 0 : h.scrollTop()) * f),
				left: d.left + this.offset.relative.left * f + this.offset.parent.left * f - (b.browser.safari && this.cssPosition == "fixed" ? 0 : (this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : g ? 0 : h.scrollLeft()) * f)
			}
		},
		_generatePosition: function (h) {
			var d = this.options,
			l = this.cssPosition == "absolute" && !(this.scrollParent[0] != document && b.ui.contains(this.scrollParent[0], this.offsetParent[0])) ? this.offsetParent : this.scrollParent,
			k = /(html|body)/i.test(l[0].tagName);
			if (this.cssPosition == "relative" && !(this.scrollParent[0] != document && this.scrollParent[0] != this.offsetParent[0])) {
				this.offset.relative = this._getRelativeOffset()
			}
			var j = h.pageX,
			i = h.pageY;
			if (this.originalPosition) {
				if (this.containment) {
					if (h.pageX - this.offset.click.left < this.containment[0]) {
						j = this.containment[0] + this.offset.click.left
					}
					if (h.pageY - this.offset.click.top < this.containment[1]) {
						i = this.containment[1] + this.offset.click.top
					}
					if (h.pageX - this.offset.click.left > this.containment[2]) {
						j = this.containment[2] + this.offset.click.left
					}
					if (h.pageY - this.offset.click.top > this.containment[3]) {
						i = this.containment[3] + this.offset.click.top
					}
				}
				if (d.grid) {
					i = this.originalPageY + Math.round((i - this.originalPageY) / d.grid[1]) * d.grid[1];
					i = this.containment ? !(i - this.offset.click.top < this.containment[1] || i - this.offset.click.top > this.containment[3]) ? i : !(i - this.offset.click.top < this.containment[1]) ? i - d.grid[1] : i + d.grid[1] : i;
					j = this.originalPageX + Math.round((j - this.originalPageX) / d.grid[0]) * d.grid[0];
					j = this.containment ? !(j - this.offset.click.left < this.containment[0] || j - this.offset.click.left > this.containment[2]) ? j : !(j - this.offset.click.left < this.containment[0]) ? j - d.grid[0] : j + d.grid[0] : j
				}
			}
			return {
				top: i - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollTop() : k ? 0 : l.scrollTop()),
				left: j - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + (b.browser.safari && this.cssPosition == "fixed" ? 0 : this.cssPosition == "fixed" ? -this.scrollParent.scrollLeft() : k ? 0 : l.scrollLeft())
			}
		},
		_rearrange: function (h, d, l, k) {
			l ? l[0].appendChild(this.placeholder[0]) : d.item[0].parentNode.insertBefore(this.placeholder[0], this.direction == "down" ? d.item[0] : d.item[0].nextSibling);
			this.counter = this.counter ? ++this.counter : 1;
			var j = this,
			i = this.counter;
			window.setTimeout(function () {
				i == j.counter && j.refreshPositions(!k)
			}, 0)
		},
		_clear: function (f, d) {
			this.reverting = false;
			var h = [];
			!this._noFinalSort && this.currentItem[0].parentNode && this.placeholder.before(this.currentItem);
			this._noFinalSort = null;
			if (this.helper[0] == this.currentItem[0]) {
				for (var g in this._storedCSS) {
					if (this._storedCSS[g] == "auto" || this._storedCSS[g] == "static") {
						this._storedCSS[g] = ""
					}
				}
				this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
			} else {
				this.currentItem.show()
			}
			this.fromOutside && !d && h.push(function (c) {
				this._trigger("receive", c, this._uiHash(this.fromOutside))
			});
			if ((this.fromOutside || this.domPosition.prev != this.currentItem.prev().not(".ui-sortable-helper")[0] || this.domPosition.parent != this.currentItem.parent()[0]) && !d) {
				h.push(function (c) {
					this._trigger("update", c, this._uiHash())
				})
			}
			if (!b.ui.contains(this.element[0], this.currentItem[0])) {
				d || h.push(function (c) {
					this._trigger("remove", c, this._uiHash())
				});
				for (g = this.containers.length - 1; g >= 0; g--) {
					if (b.ui.contains(this.containers[g].element[0], this.currentItem[0]) && !d) {
						h.push(function (c) {
							return function (e) {
								c._trigger("receive", e, this._uiHash(this))
							}
						}
							.call(this, this.containers[g]));
						h.push(function (c) {
							return function (e) {
								c._trigger("update", e, this._uiHash(this))
							}
						}
							.call(this, this.containers[g]))
					}
				}
			}
			for (g = this.containers.length - 1; g >= 0; g--) {
				d || h.push(function (c) {
					return function (e) {
						c._trigger("deactivate", e, this._uiHash(this))
					}
				}
					.call(this, this.containers[g]));
				if (this.containers[g].containerCache.over) {
					h.push(function (c) {
						return function (e) {
							c._trigger("out", e, this._uiHash(this))
						}
					}
						.call(this, this.containers[g]));
					this.containers[g].containerCache.over = 0
				}
			}
			this._storedCursor && b("body").css("cursor", this._storedCursor);
			this._storedOpacity && this.helper.css("opacity", this._storedOpacity);
			if (this._storedZIndex) {
				this.helper.css("zIndex", this._storedZIndex == "auto" ? "" : this._storedZIndex)
			}
			this.dragging = false;
			if (this.cancelHelperRemoval) {
				if (!d) {
					this._trigger("beforeStop", f, this._uiHash());
					for (g = 0; g < h.length; g++) {
						h[g].call(this, f)
					}
					this._trigger("stop", f, this._uiHash())
				}
				return false
			}
			d || this._trigger("beforeStop", f, this._uiHash());
			this.placeholder[0].parentNode.removeChild(this.placeholder[0]);
			this.helper[0] != this.currentItem[0] && this.helper.remove();
			this.helper = null;
			if (!d) {
				for (g = 0; g < h.length; g++) {
					h[g].call(this, f)
				}
				this._trigger("stop", f, this._uiHash())
			}
			this.fromOutside = false;
			return true
		},
		_trigger: function () {
			b.Widget.prototype._trigger.apply(this, arguments) === false && this.cancel()
		},
		_uiHash: function (d) {
			var c = d || this;
			return {
				helper: c.helper,
				placeholder: c.placeholder || b([]),
				position: c.position,
				originalPosition: c.originalPosition,
				offset: c.positionAbs,
				item: c.currentItem,
				sender: d ? d.element : null
			}
		}
	});
	b.extend(b.ui.sortable, {
		version: "1.8.5"
	})
})(jQuery);
(function (b) {
	b.widget("ui.accordion", {
		options: {
			active: 0,
			animated: "slide",
			autoHeight: true,
			clearStyle: false,
			collapsible: false,
			event: "click",
			fillSpace: false,
			header: "> li > :first-child,> :not(li):even",
			icons: {
				header: "ui-icon-triangle-1-e",
				headerSelected: "ui-icon-triangle-1-s"
			},
			navigation: false,
			navigationFilter: function () {
				return this.href.toLowerCase() === location.href.toLowerCase()
			}
		},
		_create: function () {
			var e = this,
			c = e.options;
			e.running = 0;
			e.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix");
			e.headers = e.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion", function () {
				c.disabled || b(this).addClass("ui-state-hover")
			}).bind("mouseleave.accordion", function () {
				c.disabled || b(this).removeClass("ui-state-hover")
			}).bind("focus.accordion", function () {
				c.disabled || b(this).addClass("ui-state-focus")
			}).bind("blur.accordion", function () {
				c.disabled || b(this).removeClass("ui-state-focus")
			});
			e.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");
			if (c.navigation) {
				var h = e.element.find("a").filter(c.navigationFilter).eq(0);
				if (h.length) {
					var g = h.closest(".ui-accordion-header");
					e.active = g.length ? g : h.closest(".ui-accordion-content").prev()
				}
			}
			e.active = e._findActive(e.active || c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all ui-corner-top");
			e.active.next().addClass("ui-accordion-content-active");
			e._createIcons();
			e.resize();
			e.element.attr("role", "tablist");
			e.headers.attr("role", "tab").bind("keydown.accordion", function (d) {
				return e._keydown(d)
			}).next().attr("role", "tabpanel");
			e.headers.not(e.active || "").attr({
				"aria-expanded": "false",
				tabIndex: -1
			}).next().hide();
			e.active.length ? e.active.attr({
				"aria-expanded": "true",
				tabIndex: 0
			}) : e.headers.eq(0).attr("tabIndex", 0);
			b.browser.safari || e.headers.find("a").attr("tabIndex", -1);
			c.event && e.headers.bind(c.event.split(" ").join(".accordion ") + ".accordion", function (d) {
				e._clickHandler.call(e, d, this);
				d.preventDefault()
			})
		},
		_createIcons: function () {
			var c = this.options;
			if (c.icons) {
				b("<span></span>").addClass("ui-icon " + c.icons.header).prependTo(this.headers);
				this.active.children(".ui-icon").toggleClass(c.icons.header).toggleClass(c.icons.headerSelected);
				this.element.addClass("ui-accordion-icons")
			}
		},
		_destroyIcons: function () {
			this.headers.children(".ui-icon").remove();
			this.element.removeClass("ui-accordion-icons")
		},
		destroy: function () {
			var d = this.options;
			this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role");
			this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabIndex");
			this.headers.find("a").removeAttr("tabIndex");
			this._destroyIcons();
			var c = this.headers.next().css("display", "").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");
			if (d.autoHeight || d.fillHeight) {
				c.css("height", "")
			}
			return b.Widget.prototype.destroy.call(this)
		},
		_setOption: function (d, c) {
			b.Widget.prototype._setOption.apply(this, arguments);
			d == "active" && this.activate(c);
			if (d == "icons") {
				this._destroyIcons();
				c && this._createIcons()
			}
			if (d == "disabled") {
				this.headers.add(this.headers.next())[c ? "addClass" : "removeClass"]("ui-accordion-disabled ui-state-disabled")
			}
		},
		_keydown: function (e) {
			if (!(this.options.disabled || e.altKey || e.ctrlKey)) {
				var c = b.ui.keyCode,
				j = this.headers.length,
				i = this.headers.index(e.target),
				h = false;
				switch (e.keyCode) {
				case c.RIGHT:
				case c.DOWN:
					h = this.headers[(i + 1) % j];
					break;
				case c.LEFT:
				case c.UP:
					h = this.headers[(i - 1 + j) % j];
					break;
				case c.SPACE:
				case c.ENTER:
					this._clickHandler({
						target: e.target
					}, e.target);
					e.preventDefault()
				}
				if (h) {
					b(e.target).attr("tabIndex", -1);
					b(h).attr("tabIndex", 0);
					h.focus();
					return false
				}
				return true
			}
		},
		resize: function () {
			var e = this.options,
			c;
			if (e.fillSpace) {
				if (b.browser.msie) {
					var f = this.element.parent().css("overflow");
					this.element.parent().css("overflow", "hidden")
				}
				c = this.element.parent().height();
				b.browser.msie && this.element.parent().css("overflow", f);
				this.headers.each(function () {
					c -= b(this).outerHeight(true)
				});
				this.headers.next().each(function () {
					b(this).height(Math.max(0, c - b(this).innerHeight() + b(this).height()))
				}).css("overflow", "auto")
			} else {
				if (e.autoHeight) {
					c = 0;
					this.headers.next().each(function () {
						c = Math.max(c, b(this).height("").height())
					}).height(c)
				}
			}
			return this
		},
		activate: function (c) {
			this.options.active = c;
			c = this._findActive(c)[0];
			this._clickHandler({
				target: c
			}, c);
			return this
		},
		_findActive: function (c) {
			return c ? typeof c === "number" ? this.headers.filter(":eq(" + c + ")") : this.headers.not(this.headers.not(c)) : c === false ? b([]) : this.headers.filter(":eq(0)")
		},
		_clickHandler: function (e, c) {
			var l = this.options;
			if (!l.disabled) {
				if (e.target) {
					e = b(e.currentTarget || c);
					c = e[0] === this.active[0];
					l.active = l.collapsible && c ? false : this.headers.index(e);
					if (!(this.running || !l.collapsible && c)) {
						this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(l.icons.headerSelected).addClass(l.icons.header);
						if (!c) {
							e.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(l.icons.header).addClass(l.icons.headerSelected);
							e.next().addClass("ui-accordion-content-active")
						}
						i = e.next();
						k = this.active.next();
						j = {
							options: l,
							newHeader: c && l.collapsible ? b([]) : e,
							oldHeader: this.active,
							newContent: c && l.collapsible ? b([]) : i,
							oldContent: k
						};
						l = this.headers.index(this.active[0]) > this.headers.index(e[0]);
						this.active = c ? b([]) : e;
						this._toggle(i, k, j, c, l)
					}
				} else {
					if (l.collapsible) {
						this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(l.icons.headerSelected).addClass(l.icons.header);
						this.active.next().addClass("ui-accordion-content-active");
						var k = this.active.next(),
						j = {
							options: l,
							newHeader: b([]),
							oldHeader: l.active,
							newContent: b([]),
							oldContent: k
						},
						i = this.active = b([]);
						this._toggle(i, k, j)
					}
				}
			}
		},
		_toggle: function (u, t, r, p, o) {
			var n = this,
			q = n.options;
			n.toShow = u;
			n.toHide = t;
			n.data = r;
			var l = function () {
				if (n) {
					return n._completed.apply(n, arguments)
				}
			};
			n._trigger("changestart", null, n.data);
			n.running = t.size() === 0 ? u.size() : t.size();
			if (q.animated) {
				r = {};
				r = q.collapsible && p ? {
					toShow: b([]),
					toHide: t,
					complete: l,
					down: o,
					autoHeight: q.autoHeight || q.fillSpace
				} : {
					toShow: u,
					toHide: t,
					complete: l,
					down: o,
					autoHeight: q.autoHeight || q.fillSpace
				};
				if (!q.proxied) {
					q.proxied = q.animated
				}
				if (!q.proxiedDuration) {
					q.proxiedDuration = q.duration
				}
				q.animated = b.isFunction(q.proxied) ? q.proxied(r) : q.proxied;
				q.duration = b.isFunction(q.proxiedDuration) ? q.proxiedDuration(r) : q.proxiedDuration;
				p = b.ui.accordion.animations;
				var m = q.duration,
				c = q.animated;
				if (c && !p[c] && !b.easing[c]) {
					c = "slide"
				}
				p[c] || (p[c] = function (d) {
					this.slide(d, {
						easing: c,
						duration: m || 700
					})
				});
				p[c](r)
			} else {
				if (q.collapsible && p) {
					u.toggle()
				} else {
					t.hide();
					u.show()
				}
				l(true)
			}
			t.prev().attr({
				"aria-expanded": "false",
				tabIndex: -1
			}).blur();
			u.prev().attr({
				"aria-expanded": "true",
				tabIndex: 0
			}).focus()
		},
		_completed: function (c) {
			this.running = c ? 0 : --this.running;
			if (!this.running) {
				this.options.clearStyle && this.toShow.add(this.toHide).css({
					height: "",
					overflow: ""
				});
				this.toHide.removeClass("ui-accordion-content-active");
				this._trigger("change", null, this.data)
			}
		}
	});
	b.extend(b.ui.accordion, {
		version: "1.8.5",
		animations: {
			slide: function (i, c) {
				i = b.extend({
					easing: "swing",
					duration: 300
				}, i, c);
				if (i.toHide.size()) {
					if (i.toShow.size()) {
						var n = i.toShow.css("overflow"),
						l = 0,
						k = {},
						j = {},
						m;
						c = i.toShow;
						m = c[0].style.width;
						c.width(parseInt(c.parent().width(), 10) - parseInt(c.css("paddingLeft"), 10) - parseInt(c.css("paddingRight"), 10) - (parseInt(c.css("borderLeftWidth"), 10) || 0) - (parseInt(c.css("borderRightWidth"), 10) || 0));
						b.each(["height", "paddingTop", "paddingBottom"], function (d, e) {
							j[e] = "hide";
							d = ("" + b.css(i.toShow[0], e)).match(/^([\d+-.]+)(.*)$/);
							k[e] = {
								value: d[1],
								unit: d[2] || "px"
							}
						});
						i.toShow.css({
							height: 0,
							overflow: "hidden"
						}).show();
						i.toHide.filter(":hidden").each(i.complete).end().filter(":visible").animate(j, {
							step: function (d, e) {
								if (e.prop == "height") {
									l = e.end - e.start === 0 ? 0 : (e.now - e.start) / (e.end - e.start)
								}
								i.toShow[0].style[e.prop] = l * k[e.prop].value + k[e.prop].unit
							},
							duration: i.duration,
							easing: i.easing,
							complete: function () {
								i.autoHeight || i.toShow.css("height", "");
								i.toShow.css({
									width: m,
									overflow: n
								});
								i.complete()
							}
						})
					} else {
						i.toHide.animate({
							height: "hide",
							paddingTop: "hide",
							paddingBottom: "hide"
						}, i)
					}
				} else {
					i.toShow.animate({
						height: "show",
						paddingTop: "show",
						paddingBottom: "show"
					}, i)
				}
			},
			bounceslide: function (c) {
				this.slide(c, {
					easing: c.down ? "easeOutBounce" : "swing",
					duration: c.down ? 1000 : 200
				})
			}
		}
	})
})(jQuery);
(function (b) {
	b.widget("ui.autocomplete", {
		options: {
			appendTo: "body",
			delay: 300,
			minLength: 1,
			position: {
				my: "left top",
				at: "left bottom",
				collision: "none"
			},
			source: null
		},
		_create: function () {
			var d = this,
			c = this.element[0].ownerDocument;
			this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off").attr({
				role: "textbox",
				"aria-autocomplete": "list",
				"aria-haspopup": "true"
			}).bind("keydown.autocomplete", function (f) {
				if (!d.options.disabled) {
					var e = b.ui.keyCode;
					switch (f.keyCode) {
					case e.PAGE_UP:
						d._move("previousPage", f);
						break;
					case e.PAGE_DOWN:
						d._move("nextPage", f);
						break;
					case e.UP:
						d._move("previous", f);
						f.preventDefault();
						break;
					case e.DOWN:
						d._move("next", f);
						f.preventDefault();
						break;
					case e.ENTER:
					case e.NUMPAD_ENTER:
						d.menu.element.is(":visible") && f.preventDefault();
					case e.TAB:
						if (!d.menu.active) {
							return
						}
						d.menu.select(f);
						break;
					case e.ESCAPE:
						d.element.val(d.term);
						d.close(f);
						break;
					default:
						clearTimeout(d.searching);
						d.searching = setTimeout(function () {
							if (d.term != d.element.val()) {
								d.selectedItem = null;
								d.search(null, f)
							}
						}, d.options.delay);
						break
					}
				}
			}).bind("focus.autocomplete", function () {
				if (!d.options.disabled) {
					d.selectedItem = null;
					d.previous = d.element.val()
				}
			}).bind("blur.autocomplete", function (e) {
				if (!d.options.disabled) {
					clearTimeout(d.searching);
					d.closing = setTimeout(function () {
						d.close(e);
						d._change(e)
					}, 150)
				}
			});
			this._initSource();
			this.response = function () {
				return d._response.apply(d, arguments)
			};
			this.menu = b("<ul></ul>").addClass("ui-autocomplete").appendTo(b(this.options.appendTo || "body", c)[0]).mousedown(function (f) {
				var e = d.menu.element[0];
				f.target === e && setTimeout(function () {
					b(document).one("mousedown", function (g) {
						g.target !== d.element[0] && g.target !== e && !b.ui.contains(e, g.target) && d.close()
					})
				}, 1);
				setTimeout(function () {
					clearTimeout(d.closing)
				}, 13)
			}).menu({
				focus: function (f, e) {
					e = e.item.data("item.autocomplete");
					false !== d._trigger("focus", null, {
						item: e
					}) && /^key/.test(f.originalEvent.type) && d.element.val(e.value)
				},
				selected: function (h, g) {
					g = g.item.data("item.autocomplete");
					var e = d.previous;
					if (d.element[0] !== c.activeElement) {
						d.element.focus();
						d.previous = e
					}
					if (false !== d._trigger("select", h, {
							item: g
						})) {
						d.term = g.value;
						d.element.val(g.value)
					}
					d.close(h);
					d.selectedItem = g
				},
				blur: function () {
					d.menu.element.is(":visible") && d.element.val() !== d.term && d.element.val(d.term)
				}
			}).zIndex(this.element.zIndex() + 1).css({
				top: 0,
				left: 0
			}).hide().data("menu");
			b.fn.bgiframe && this.menu.element.bgiframe()
		},
		destroy: function () {
			this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup");
			this.menu.element.remove();
			b.Widget.prototype.destroy.call(this)
		},
		_setOption: function (d, c) {
			b.Widget.prototype._setOption.apply(this, arguments);
			d === "source" && this._initSource();
			if (d === "appendTo") {
				this.menu.element.appendTo(b(c || "body", this.element[0].ownerDocument)[0])
			}
		},
		_initSource: function () {
			var e = this,
			d,
			f;
			if (b.isArray(this.options.source)) {
				d = this.options.source;
				this.source = function (g, c) {
					c(b.ui.autocomplete.filter(d, g.term))
				}
			} else {
				if (typeof this.options.source === "string") {
					f = this.options.source;
					this.source = function (g, c) {
						e.xhr && e.xhr.abort();
						e.xhr = b.getJSON(f, g, function (l, j, k) {
							k === e.xhr && c(l);
							e.xhr = null
						})
					}
				} else {
					this.source = this.options.source
				}
			}
		},
		search: function (d, c) {
			d = d != null ? d : this.element.val();
			this.term = this.element.val();
			if (d.length < this.options.minLength) {
				return this.close(c)
			}
			clearTimeout(this.closing);
			if (this._trigger("search") !== false) {
				return this._search(d)
			}
		},
		_search: function (c) {
			this.element.addClass("ui-autocomplete-loading");
			this.source({
				term: c
			}, this.response)
		},
		_response: function (c) {
			if (c.length) {
				c = this._normalize(c);
				this._suggest(c);
				this._trigger("open")
			} else {
				this.close()
			}
			this.element.removeClass("ui-autocomplete-loading")
		},
		close: function (c) {
			clearTimeout(this.closing);
			if (this.menu.element.is(":visible")) {
				this._trigger("close", c);
				this.menu.element.hide();
				this.menu.deactivate()
			}
		},
		_change: function (c) {
			this.previous !== this.element.val() && this._trigger("change", c, {
				item: this.selectedItem
			})
		},
		_normalize: function (c) {
			if (c.length && c[0].label && c[0].value) {
				return c
			}
			return b.map(c, function (d) {
				if (typeof d === "string") {
					return {
						label: d,
						value: d
					}
				}
				return b.extend({
					label: d.label || d.value,
					value: d.value || d.label
				}, d)
			})
		},
		_suggest: function (e) {
			var d = this.menu.element.empty().zIndex(this.element.zIndex() + 1),
			f;
			this._renderMenu(d, e);
			this.menu.deactivate();
			this.menu.refresh();
			this.menu.element.show().position(b.extend({
					of: this.element
				}, this.options.position));
			e = d.width("").outerWidth();
			f = this.element.outerWidth();
			d.outerWidth(Math.max(e, f))
		},
		_renderMenu: function (e, d) {
			var f = this;
			b.each(d, function (g, c) {
				f._renderItem(e, c)
			})
		},
		_renderItem: function (d, c) {
			return b("<li></li>").data("item.autocomplete", c).append(b("<a></a>").text(c.label)).appendTo(d)
		},
		_move: function (d, c) {
			if (this.menu.element.is(":visible")) {
				if (this.menu.first() && /^previous/.test(d) || this.menu.last() && /^next/.test(d)) {
					this.element.val(this.term);
					this.menu.deactivate()
				} else {
					this.menu[d](c)
				}
			} else {
				this.search(null, c)
			}
		},
		widget: function () {
			return this.menu.element
		}
	});
	b.extend(b.ui.autocomplete, {
		escapeRegex: function (c) {
			return c.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
		},
		filter: function (e, d) {
			var f = new RegExp(b.ui.autocomplete.escapeRegex(d), "i");
			return b.grep(e, function (c) {
				return f.test(c.label || c.value || c)
			})
		}
	})
})(jQuery);
(function (b) {
	b.widget("ui.menu", {
		_create: function () {
			var c = this;
			this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({
				role: "listbox",
				"aria-activedescendant": "ui-active-menuitem"
			}).click(function (d) {
				if (b(d.target).closest(".ui-menu-item a").length) {
					d.preventDefault();
					c.select(d)
				}
			});
			this.refresh()
		},
		refresh: function () {
			var c = this;
			this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "menuitem").children("a").addClass("ui-corner-all").attr("tabindex", -1).mouseenter(function (d) {
				c.activate(d, b(this).parent())
			}).mouseleave(function () {
				c.deactivate()
			})
		},
		activate: function (g, e) {
			this.deactivate();
			if (this.hasScroll()) {
				var j = e.offset().top - this.element.offset().top,
				i = this.element.attr("scrollTop"),
				h = this.element.height();
				if (j < 0) {
					this.element.attr("scrollTop", i + j)
				} else {
					j >= h && this.element.attr("scrollTop", i + j - h + e.height())
				}
			}
			this.active = e.eq(0).children("a").addClass("ui-state-hover").attr("id", "ui-active-menuitem").end();
			this._trigger("focus", g, {
				item: e
			})
		},
		deactivate: function () {
			if (this.active) {
				this.active.children("a").removeClass("ui-state-hover").removeAttr("id");
				this._trigger("blur");
				this.active = null
			}
		},
		next: function (c) {
			this.move("next", ".ui-menu-item:first", c)
		},
		previous: function (c) {
			this.move("prev", ".ui-menu-item:last", c)
		},
		first: function () {
			return this.active && !this.active.prevAll(".ui-menu-item").length
		},
		last: function () {
			return this.active && !this.active.nextAll(".ui-menu-item").length
		},
		move: function (e, d, f) {
			if (this.active) {
				e = this.active[e + "All"](".ui-menu-item").eq(0);
				e.length ? this.activate(f, e) : this.activate(f, this.element.children(d))
			} else {
				this.activate(f, this.element.children(d))
			}
		},
		nextPage: function (f) {
			if (this.hasScroll()) {
				if (!this.active || this.last()) {
					this.activate(f, this.element.children(":first"))
				} else {
					var e = this.active.offset().top,
					h = this.element.height(),
					g = this.element.children("li").filter(function () {
						var c = b(this).offset().top - e - h + b(this).height();
						return c < 10 && c > -10
					});
					g.length || (g = this.element.children(":last"));
					this.activate(f, g)
				}
			} else {
				this.activate(f, this.element.children(!this.active || this.last() ? ":first" : ":last"))
			}
		},
		previousPage: function (e) {
			if (this.hasScroll()) {
				if (!this.active || this.first()) {
					this.activate(e, this.element.children(":last"))
				} else {
					var d = this.active.offset().top,
					f = this.element.height();
					result = this.element.children("li").filter(function () {
						var c = b(this).offset().top - d + f - b(this).height();
						return c < 10 && c > -10
					});
					result.length || (result = this.element.children(":first"));
					this.activate(e, result)
				}
			} else {
				this.activate(e, this.element.children(!this.active || this.first() ? ":last" : ":first"))
			}
		},
		hasScroll: function () {
			return this.element.height() < this.element.attr("scrollHeight")
		},
		select: function (c) {
			this._trigger("selected", c, {
				item: this.active
			})
		}
	})
})(jQuery);
(function (d, G) {
	function L() {
		this.debug = false;
		this._curInst = null;
		this._keyEvent = false;
		this._disabledInputs = [];
		this._inDialog = this._datepickerShowing = false;
		this._mainDivId = "ui-datepicker-div";
		this._inlineClass = "ui-datepicker-inline";
		this._appendClass = "ui-datepicker-append";
		this._triggerClass = "ui-datepicker-trigger";
		this._dialogClass = "ui-datepicker-dialog";
		this._disableClass = "ui-datepicker-disabled";
		this._unselectableClass = "ui-datepicker-unselectable";
		this._currentClass = "ui-datepicker-current-day";
		this._dayOverClass = "ui-datepicker-days-cell-over";
		this.regional = [];
		this.regional[""] = {
			closeText: "Done",
			prevText: "Prev",
			nextText: "Next",
			currentText: "Today",
			monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
			monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
			dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
			dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
			dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
			weekHeader: "Wk",
			dateFormat: "mm/dd/yy",
			firstDay: 0,
			isRTL: false,
			showMonthAfterYear: false,
			yearSuffix: ""
		};
		this._defaults = {
			showOn: "focus",
			showAnim: "fadeIn",
			showOptions: {},
			defaultDate: null,
			appendText: "",
			buttonText: "...",
			buttonImage: "",
			buttonImageOnly: false,
			hideIfNoPrevNext: false,
			navigationAsDateFormat: false,
			gotoCurrent: false,
			changeMonth: false,
			changeYear: false,
			yearRange: "c-10:c+10",
			showOtherMonths: false,
			selectOtherMonths: false,
			showWeek: false,
			calculateWeek: this.iso8601Week,
			shortYearCutoff: "+10",
			minDate: null,
			maxDate: null,
			duration: "fast",
			beforeShowDay: null,
			beforeShow: null,
			onSelect: null,
			onChangeMonthYear: null,
			onClose: null,
			numberOfMonths: 1,
			showCurrentAtPos: 0,
			stepMonths: 1,
			stepBigMonths: 12,
			altField: "",
			altFormat: "",
			constrainInput: true,
			showButtonPanel: false,
			autoSize: false
		};
		d.extend(this._defaults, this.regional[""]);
		this.dpDiv = d('<div id="' + this._mainDivId + '" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')
	}
	function E(a, b) {
		d.extend(a, b);
		for (var c in b) {
			if (b[c] == null || b[c] == G) {
				a[c] = b[c]
			}
		}
		return a
	}
	d.extend(d.ui, {
		datepicker: {
			version: "1.8.5"
		}
	});
	var y = (new Date).getTime();
	d.extend(L.prototype, {
		markerClassName: "hasDatepicker",
		log: function () {
			this.debug && console.log.apply("", arguments)
		},
		_widgetDatepicker: function () {
			return this.dpDiv
		},
		setDefaults: function (a) {
			E(this._defaults, a || {});
			return this
		},
		_attachDatepicker: function (a, b) {
			var c = null;
			for (var e in this._defaults) {
				var f = a.getAttribute("date:" + e);
				if (f) {
					c = c || {};
					try {
						c[e] = eval(f)
					} catch (h) {
						c[e] = f
					}
				}
			}
			e = a.nodeName.toLowerCase();
			f = e == "div" || e == "span";
			if (!a.id) {
				this.uuid += 1;
				a.id = "dp" + this.uuid
			}
			var i = this._newInst(d(a), f);
			i.settings = d.extend({}, b || {}, c || {});
			if (e == "input") {
				this._connectDatepicker(a, i)
			} else {
				f && this._inlineDatepicker(a, i)
			}
		},
		_newInst: function (a, b) {
			return {
				id: a[0].id.replace(/([^A-Za-z0-9_])/g, "\\\\$1"),
				input: a,
				selectedDay: 0,
				selectedMonth: 0,
				selectedYear: 0,
				drawMonth: 0,
				drawYear: 0,
				inline: b,
				dpDiv: !b ? this.dpDiv : d('<div class="' + this._inlineClass + ' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')
			}
		},
		_connectDatepicker: function (a, b) {
			var c = d(a);
			b.append = d([]);
			b.trigger = d([]);
			if (!c.hasClass(this.markerClassName)) {
				this._attachments(c, b);
				c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker", function (e, f, h) {
					b.settings[f] = h
				}).bind("getData.datepicker", function (e, f) {
					return this._get(b, f)
				});
				this._autoSize(b);
				d.data(a, "datepicker", b)
			}
		},
		_attachments: function (a, b) {
			var c = this._get(b, "appendText"),
			e = this._get(b, "isRTL");
			b.append && b.append.remove();
			if (c) {
				b.append = d('<span class="' + this._appendClass + '">' + c + "</span>");
				a[e ? "before" : "after"](b.append)
			}
			a.unbind("focus", this._showDatepicker);
			b.trigger && b.trigger.remove();
			c = this._get(b, "showOn");
			if (c == "focus" || c == "both") {
				a.focus(this._showDatepicker)
			}
			if (c == "button" || c == "both") {
				c = this._get(b, "buttonText");
				var f = this._get(b, "buttonImage");
				b.trigger = d(this._get(b, "buttonImageOnly") ? d("<img/>").addClass(this._triggerClass).attr({
							src: f,
							alt: c,
							title: c
						}) : d('<button type="button"></button>').addClass(this._triggerClass).html(f == "" ? c : d("<img/>").attr({
								src: f,
								alt: c,
								title: c
							})));
				a[e ? "before" : "after"](b.trigger);
				b.trigger.click(function () {
					d.datepicker._datepickerShowing && d.datepicker._lastInput == a[0] ? d.datepicker._hideDatepicker() : d.datepicker._showDatepicker(a[0]);
					return false
				})
			}
		},
		_autoSize: function (a) {
			if (this._get(a, "autoSize") && !a.inline) {
				var b = new Date(2009, 11, 20),
				c = this._get(a, "dateFormat");
				if (c.match(/[DM]/)) {
					var e = function (f) {
						for (var h = 0, i = 0, g = 0; g < f.length; g++) {
							if (f[g].length > h) {
								h = f[g].length;
								i = g
							}
						}
						return i
					};
					b.setMonth(e(this._get(a, c.match(/MM/) ? "monthNames" : "monthNamesShort")));
					b.setDate(e(this._get(a, c.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - b.getDay())
				}
				a.input.attr("size", this._formatDate(a, b).length)
			}
		},
		_inlineDatepicker: function (a, b) {
			var c = d(a);
			if (!c.hasClass(this.markerClassName)) {
				c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker", function (e, f, h) {
					b.settings[f] = h
				}).bind("getData.datepicker", function (e, f) {
					return this._get(b, f)
				});
				d.data(a, "datepicker", b);
				this._setDate(b, this._getDefaultDate(b), true);
				this._updateDatepicker(b);
				this._updateAlternate(b)
			}
		},
		_dialogDatepicker: function (a, b, c, e, f) {
			a = this._dialogInst;
			if (!a) {
				this.uuid += 1;
				this._dialogInput = d('<input type="text" id="' + ("dp" + this.uuid) + '" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>');
				this._dialogInput.keydown(this._doKeyDown);
				d("body").append(this._dialogInput);
				a = this._dialogInst = this._newInst(this._dialogInput, false);
				a.settings = {};
				d.data(this._dialogInput[0], "datepicker", a)
			}
			E(a.settings, e || {});
			b = b && b.constructor == Date ? this._formatDate(a, b) : b;
			this._dialogInput.val(b);
			this._pos = f ? f.length ? f : [f.pageX, f.pageY] : null;
			if (!this._pos) {
				this._pos = [document.documentElement.clientWidth / 2 - 100 + (document.documentElement.scrollLeft || document.body.scrollLeft), document.documentElement.clientHeight / 2 - 150 + (document.documentElement.scrollTop || document.body.scrollTop)]
			}
			this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px");
			a.settings.onSelect = c;
			this._inDialog = true;
			this.dpDiv.addClass(this._dialogClass);
			this._showDatepicker(this._dialogInput[0]);
			d.blockUI && d.blockUI(this.dpDiv);
			d.data(this._dialogInput[0], "datepicker", a);
			return this
		},
		_destroyDatepicker: function (a) {
			var b = d(a),
			c = d.data(a, "datepicker");
			if (b.hasClass(this.markerClassName)) {
				var e = a.nodeName.toLowerCase();
				d.removeData(a, "datepicker");
				if (e == "input") {
					c.append.remove();
					c.trigger.remove();
					b.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)
				} else {
					if (e == "div" || e == "span") {
						b.removeClass(this.markerClassName).empty()
					}
				}
			}
		},
		_enableDatepicker: function (a) {
			var b = d(a),
			c = d.data(a, "datepicker");
			if (b.hasClass(this.markerClassName)) {
				var e = a.nodeName.toLowerCase();
				if (e == "input") {
					a.disabled = false;
					c.trigger.filter("button").each(function () {
						this.disabled = false
					}).end().filter("img").css({
						opacity: "1.0",
						cursor: ""
					})
				} else {
					if (e == "div" || e == "span") {
						b.children("." + this._inlineClass).children().removeClass("ui-state-disabled")
					}
				}
				this._disabledInputs = d.map(this._disabledInputs, function (f) {
					return f == a ? null : f
				})
			}
		},
		_disableDatepicker: function (a) {
			var b = d(a),
			c = d.data(a, "datepicker");
			if (b.hasClass(this.markerClassName)) {
				var e = a.nodeName.toLowerCase();
				if (e == "input") {
					a.disabled = true;
					c.trigger.filter("button").each(function () {
						this.disabled = true
					}).end().filter("img").css({
						opacity: "0.5",
						cursor: "default"
					})
				} else {
					if (e == "div" || e == "span") {
						b.children("." + this._inlineClass).children().addClass("ui-state-disabled")
					}
				}
				this._disabledInputs = d.map(this._disabledInputs, function (f) {
					return f == a ? null : f
				});
				this._disabledInputs[this._disabledInputs.length] = a
			}
		},
		_isDisabledDatepicker: function (a) {
			if (!a) {
				return false
			}
			for (var b = 0; b < this._disabledInputs.length; b++) {
				if (this._disabledInputs[b] == a) {
					return true
				}
			}
			return false
		},
		_getInst: function (a) {
			try {
				return d.data(a, "datepicker")
			} catch (b) {
				throw "Missing instance data for this datepicker"
			}
		},
		_optionDatepicker: function (a, b, c) {
			var e = this._getInst(a);
			if (arguments.length == 2 && typeof b == "string") {
				return b == "defaults" ? d.extend({}, d.datepicker._defaults) : e ? b == "all" ? d.extend({}, e.settings) : this._get(e, b) : null
			}
			var f = b || {};
			if (typeof b == "string") {
				f = {};
				f[b] = c
			}
			if (e) {
				this._curInst == e && this._hideDatepicker();
				var h = this._getDateDatepicker(a, true);
				E(e.settings, f);
				this._attachments(d(a), e);
				this._autoSize(e);
				this._setDateDatepicker(a, h);
				this._updateDatepicker(e)
			}
		},
		_changeDatepicker: function (a, b, c) {
			this._optionDatepicker(a, b, c)
		},
		_refreshDatepicker: function (a) {
			(a = this._getInst(a)) && this._updateDatepicker(a)
		},
		_setDateDatepicker: function (a, b) {
			if (a = this._getInst(a)) {
				this._setDate(a, b);
				this._updateDatepicker(a);
				this._updateAlternate(a)
			}
		},
		_getDateDatepicker: function (a, b) {
			(a = this._getInst(a)) && !a.inline && this._setDateFromField(a, b);
			return a ? this._getDate(a) : null
		},
		_doKeyDown: function (a) {
			var b = d.datepicker._getInst(a.target),
			c = true,
			e = b.dpDiv.is(".ui-datepicker-rtl");
			b._keyEvent = true;
			if (d.datepicker._datepickerShowing) {
				switch (a.keyCode) {
				case 9:
					d.datepicker._hideDatepicker();
					c = false;
					break;
				case 13:
					c = d("td." + d.datepicker._dayOverClass, b.dpDiv).add(d("td." + d.datepicker._currentClass, b.dpDiv));
					c[0] ? d.datepicker._selectDay(a.target, b.selectedMonth, b.selectedYear, c[0]) : d.datepicker._hideDatepicker();
					return false;
				case 27:
					d.datepicker._hideDatepicker();
					break;
				case 33:
					d.datepicker._adjustDate(a.target, a.ctrlKey ? -d.datepicker._get(b, "stepBigMonths") : -d.datepicker._get(b, "stepMonths"), "M");
					break;
				case 34:
					d.datepicker._adjustDate(a.target, a.ctrlKey ? +d.datepicker._get(b, "stepBigMonths") : +d.datepicker._get(b, "stepMonths"), "M");
					break;
				case 35:
					if (a.ctrlKey || a.metaKey) {
						d.datepicker._clearDate(a.target)
					}
					c = a.ctrlKey || a.metaKey;
					break;
				case 36:
					if (a.ctrlKey || a.metaKey) {
						d.datepicker._gotoToday(a.target)
					}
					c = a.ctrlKey || a.metaKey;
					break;
				case 37:
					if (a.ctrlKey || a.metaKey) {
						d.datepicker._adjustDate(a.target, e ? +1 : -1, "D")
					}
					c = a.ctrlKey || a.metaKey;
					if (a.originalEvent.altKey) {
						d.datepicker._adjustDate(a.target, a.ctrlKey ? -d.datepicker._get(b, "stepBigMonths") : -d.datepicker._get(b, "stepMonths"), "M")
					}
					break;
				case 38:
					if (a.ctrlKey || a.metaKey) {
						d.datepicker._adjustDate(a.target, -7, "D")
					}
					c = a.ctrlKey || a.metaKey;
					break;
				case 39:
					if (a.ctrlKey || a.metaKey) {
						d.datepicker._adjustDate(a.target, e ? -1 : +1, "D")
					}
					c = a.ctrlKey || a.metaKey;
					if (a.originalEvent.altKey) {
						d.datepicker._adjustDate(a.target, a.ctrlKey ? +d.datepicker._get(b, "stepBigMonths") : +d.datepicker._get(b, "stepMonths"), "M")
					}
					break;
				case 40:
					if (a.ctrlKey || a.metaKey) {
						d.datepicker._adjustDate(a.target, +7, "D")
					}
					c = a.ctrlKey || a.metaKey;
					break;
				default:
					c = false
				}
			} else {
				if (a.keyCode == 36 && a.ctrlKey) {
					d.datepicker._showDatepicker(this)
				} else {
					c = false
				}
			}
			if (c) {
				a.preventDefault();
				a.stopPropagation()
			}
		},
		_doKeyPress: function (a) {
			var b = d.datepicker._getInst(a.target);
			if (d.datepicker._get(b, "constrainInput")) {
				b = d.datepicker._possibleChars(d.datepicker._get(b, "dateFormat"));
				var c = String.fromCharCode(a.charCode == G ? a.keyCode : a.charCode);
				return a.ctrlKey || c < " " || !b || b.indexOf(c) > -1
			}
		},
		_doKeyUp: function (a) {
			a = d.datepicker._getInst(a.target);
			if (a.input.val() != a.lastVal) {
				try {
					if (d.datepicker.parseDate(d.datepicker._get(a, "dateFormat"), a.input ? a.input.val() : null, d.datepicker._getFormatConfig(a))) {
						d.datepicker._setDateFromField(a);
						d.datepicker._updateAlternate(a);
						d.datepicker._updateDatepicker(a)
					}
				} catch (b) {
					d.datepicker.log(b)
				}
			}
			return true
		},
		_showDatepicker: function (a) {
			a = a.target || a;
			if (a.nodeName.toLowerCase() != "input") {
				a = d("input", a.parentNode)[0]
			}
			if (!(d.datepicker._isDisabledDatepicker(a) || d.datepicker._lastInput == a)) {
				var b = d.datepicker._getInst(a);
				d.datepicker._curInst && d.datepicker._curInst != b && d.datepicker._curInst.dpDiv.stop(true, true);
				var c = d.datepicker._get(b, "beforeShow");
				E(b.settings, c ? c.apply(a, [a, b]) : {});
				b.lastVal = null;
				d.datepicker._lastInput = a;
				d.datepicker._setDateFromField(b);
				if (d.datepicker._inDialog) {
					a.value = ""
				}
				if (!d.datepicker._pos) {
					d.datepicker._pos = d.datepicker._findPos(a);
					d.datepicker._pos[1] += a.offsetHeight
				}
				var e = false;
				d(a).parents().each(function () {
					e |= d(this).css("position") == "fixed";
					return !e
				});
				if (e && d.browser.opera) {
					d.datepicker._pos[0] -= document.documentElement.scrollLeft;
					d.datepicker._pos[1] -= document.documentElement.scrollTop
				}
				c = {
					left: d.datepicker._pos[0],
					top: d.datepicker._pos[1]
				};
				d.datepicker._pos = null;
				b.dpDiv.css({
					position: "absolute",
					display: "block",
					top: "-1000px"
				});
				d.datepicker._updateDatepicker(b);
				c = d.datepicker._checkOffset(b, c, e);
				b.dpDiv.css({
					position: d.datepicker._inDialog && d.blockUI ? "static" : e ? "fixed" : "absolute",
					display: "none",
					left: c.left + "px",
					top: c.top + "px"
				});
				if (!b.inline) {
					c = d.datepicker._get(b, "showAnim");
					var f = d.datepicker._get(b, "duration"),
					h = function () {
						d.datepicker._datepickerShowing = true;
						var i = d.datepicker._getBorders(b.dpDiv);
						b.dpDiv.find("iframe.ui-datepicker-cover").css({
							left: -i[0],
							top: -i[1],
							width: b.dpDiv.outerWidth(),
							height: b.dpDiv.outerHeight()
						})
					};
					b.dpDiv.zIndex(d(a).zIndex() + 1);
					d.effects && d.effects[c] ? b.dpDiv.show(c, d.datepicker._get(b, "showOptions"), f, h) : b.dpDiv[c || "show"](c ? f : null, h);
					if (!c || !f) {
						h()
					}
					b.input.is(":visible") && !b.input.is(":disabled") && b.input.focus();
					d.datepicker._curInst = b
				}
			}
		},
		_updateDatepicker: function (a) {
			var b = this,
			c = d.datepicker._getBorders(a.dpDiv);
			a.dpDiv.empty().append(this._generateHTML(a)).find("iframe.ui-datepicker-cover").css({
				left: -c[0],
				top: -c[1],
				width: a.dpDiv.outerWidth(),
				height: a.dpDiv.outerHeight()
			}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout", function () {
				d(this).removeClass("ui-state-hover");
				this.className.indexOf("ui-datepicker-prev") != -1 && d(this).removeClass("ui-datepicker-prev-hover");
				this.className.indexOf("ui-datepicker-next") != -1 && d(this).removeClass("ui-datepicker-next-hover")
			}).bind("mouseover", function () {
				if (!b._isDisabledDatepicker(a.inline ? a.dpDiv.parent()[0] : a.input[0])) {
					d(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");
					d(this).addClass("ui-state-hover");
					this.className.indexOf("ui-datepicker-prev") != -1 && d(this).addClass("ui-datepicker-prev-hover");
					this.className.indexOf("ui-datepicker-next") != -1 && d(this).addClass("ui-datepicker-next-hover")
				}
			}).end().find("." + this._dayOverClass + " a").trigger("mouseover").end();
			c = this._getNumberOfMonths(a);
			var e = c[1];
			e > 1 ? a.dpDiv.addClass("ui-datepicker-multi-" + e).css("width", 17 * e + "em") : a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("");
			a.dpDiv[(c[0] != 1 || c[1] != 1 ? "add" : "remove") + "Class"]("ui-datepicker-multi");
			a.dpDiv[(this._get(a, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl");
			a == d.datepicker._curInst && d.datepicker._datepickerShowing && a.input && a.input.is(":visible") && !a.input.is(":disabled") && a.input.focus()
		},
		_getBorders: function (a) {
			var b = function (c) {
				return {
					thin: 1,
					medium: 2,
					thick: 3
				}
				[c] || c
			};
			return [parseFloat(b(a.css("border-left-width"))), parseFloat(b(a.css("border-top-width")))]
		},
		_checkOffset: function (a, b, c) {
			var e = a.dpDiv.outerWidth(),
			f = a.dpDiv.outerHeight(),
			h = a.input ? a.input.outerWidth() : 0,
			i = a.input ? a.input.outerHeight() : 0,
			g = document.documentElement.clientWidth + d(document).scrollLeft(),
			k = document.documentElement.clientHeight + d(document).scrollTop();
			b.left -= this._get(a, "isRTL") ? e - h : 0;
			b.left -= c && b.left == a.input.offset().left ? d(document).scrollLeft() : 0;
			b.top -= c && b.top == a.input.offset().top + i ? d(document).scrollTop() : 0;
			b.left -= Math.min(b.left, b.left + e > g && g > e ? Math.abs(b.left + e - g) : 0);
			b.top -= Math.min(b.top, b.top + f > k && k > f ? Math.abs(f + i) : 0);
			return b
		},
		_findPos: function (a) {
			for (var b = this._get(this._getInst(a), "isRTL"); a && (a.type == "hidden" || a.nodeType != 1); ) {
				a = a[b ? "previousSibling" : "nextSibling"]
			}
			a = d(a).offset();
			return [a.left, a.top]
		},
		_hideDatepicker: function (a) {
			var b = this._curInst;
			if (!(!b || a && b != d.data(a, "datepicker"))) {
				if (this._datepickerShowing) {
					a = this._get(b, "showAnim");
					var c = this._get(b, "duration"),
					e = function () {
						d.datepicker._tidyDialog(b);
						this._curInst = null
					};
					d.effects && d.effects[a] ? b.dpDiv.hide(a, d.datepicker._get(b, "showOptions"), c, e) : b.dpDiv[a == "slideDown" ? "slideUp" : a == "fadeIn" ? "fadeOut" : "hide"](a ? c : null, e);
					a || e();
					if (a = this._get(b, "onClose")) {
						a.apply(b.input ? b.input[0] : null, [b.input ? b.input.val() : "", b])
					}
					this._datepickerShowing = false;
					this._lastInput = null;
					if (this._inDialog) {
						this._dialogInput.css({
							position: "absolute",
							left: "0",
							top: "-100px"
						});
						if (d.blockUI) {
							d.unblockUI();
							d("body").append(this.dpDiv)
						}
					}
					this._inDialog = false
				}
			}
		},
		_tidyDialog: function (a) {
			a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
		},
		_checkExternalClick: function (a) {
			if (d.datepicker._curInst) {
				a = d(a.target);
				a[0].id != d.datepicker._mainDivId && a.parents("#" + d.datepicker._mainDivId).length == 0 && !a.hasClass(d.datepicker.markerClassName) && !a.hasClass(d.datepicker._triggerClass) && d.datepicker._datepickerShowing && !(d.datepicker._inDialog && d.blockUI) && d.datepicker._hideDatepicker()
			}
		},
		_adjustDate: function (a, b, c) {
			a = d(a);
			var e = this._getInst(a[0]);
			if (!this._isDisabledDatepicker(a[0])) {
				this._adjustInstDate(e, b + (c == "M" ? this._get(e, "showCurrentAtPos") : 0), c);
				this._updateDatepicker(e)
			}
		},
		_gotoToday: function (a) {
			a = d(a);
			var b = this._getInst(a[0]);
			if (this._get(b, "gotoCurrent") && b.currentDay) {
				b.selectedDay = b.currentDay;
				b.drawMonth = b.selectedMonth = b.currentMonth;
				b.drawYear = b.selectedYear = b.currentYear
			} else {
				var c = new Date;
				b.selectedDay = c.getDate();
				b.drawMonth = b.selectedMonth = c.getMonth();
				b.drawYear = b.selectedYear = c.getFullYear()
			}
			this._notifyChange(b);
			this._adjustDate(a)
		},
		_selectMonthYear: function (a, b, c) {
			a = d(a);
			var e = this._getInst(a[0]);
			e._selectingMonthYear = false;
			e["selected" + (c == "M" ? "Month" : "Year")] = e["draw" + (c == "M" ? "Month" : "Year")] = parseInt(b.options[b.selectedIndex].value, 10);
			this._notifyChange(e);
			this._adjustDate(a)
		},
		_clickMonthYear: function (a) {
			var b = this._getInst(d(a)[0]);
			b.input && b._selectingMonthYear && setTimeout(function () {
				b.input.focus()
			}, 0);
			b._selectingMonthYear = !b._selectingMonthYear
		},
		_selectDay: function (a, b, c, e) {
			var f = d(a);
			if (!(d(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(f[0]))) {
				f = this._getInst(f[0]);
				f.selectedDay = f.currentDay = d("a", e).html();
				f.selectedMonth = f.currentMonth = b;
				f.selectedYear = f.currentYear = c;
				this._selectDate(a, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear))
			}
		},
		_clearDate: function (a) {
			a = d(a);
			this._getInst(a[0]);
			this._selectDate(a, "")
		},
		_selectDate: function (a, b) {
			a = this._getInst(d(a)[0]);
			b = b != null ? b : this._formatDate(a);
			a.input && a.input.val(b);
			this._updateAlternate(a);
			var c = this._get(a, "onSelect");
			if (c) {
				c.apply(a.input ? a.input[0] : null, [b, a])
			} else {
				a.input && a.input.trigger("change")
			}
			if (a.inline) {
				this._updateDatepicker(a)
			} else {
				this._hideDatepicker();
				this._lastInput = a.input[0];
				typeof a.input[0] != "object" && a.input.focus();
				this._lastInput = null
			}
		},
		_updateAlternate: function (a) {
			var b = this._get(a, "altField");
			if (b) {
				var c = this._get(a, "altFormat") || this._get(a, "dateFormat"),
				e = this._getDate(a),
				f = this.formatDate(c, e, this._getFormatConfig(a));
				d(b).each(function () {
					d(this).val(f)
				})
			}
		},
		noWeekends: function (a) {
			a = a.getDay();
			return [a > 0 && a < 6, ""]
		},
		iso8601Week: function (a) {
			a = new Date(a.getTime());
			a.setDate(a.getDate() + 4 - (a.getDay() || 7));
			var b = a.getTime();
			a.setMonth(0);
			a.setDate(1);
			return Math.floor(Math.round((b - a) / 86400000) / 7) + 1
		},
		parseDate: function (a, b, c) {
			if (a == null || b == null) {
				throw "Invalid arguments"
			}
			b = typeof b == "object" ? b.toString() : b + "";
			if (b == "") {
				return null
			}
			for (var e = (c ? c.shortYearCutoff : null) || this._defaults.shortYearCutoff, f = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort, h = (c ? c.dayNames : null) || this._defaults.dayNames, i = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort, g = (c ? c.monthNames : null) || this._defaults.monthNames, k = c = -1, l = -1, u = -1, j = false, o = function (p) {
				(p = z + 1 < a.length && a.charAt(z + 1) == p) && z++;
				return p
			}, m = function (p) {
				o(p);
				p = new RegExp("^\\d{1," + (p == "@" ? 14 : p == "!" ? 20 : p == "y" ? 4 : p == "o" ? 3 : 2) + "}");
				p = b.substring(s).match(p);
				if (!p) {
					throw "Missing number at position " + s
				}
				s += p[0].length;
				return parseInt(p[0], 10)
			}, n = function (p, w, H) {
				p = o(p) ? H : w;
				for (w = 0; w < p.length; w++) {
					if (b.substr(s, p[w].length).toLowerCase() == p[w].toLowerCase()) {
						s += p[w].length;
						return w + 1
					}
				}
				throw "Unknown name at position " + s
			}, r = function () {
				if (b.charAt(s) != a.charAt(z)) {
					throw "Unexpected literal at position " + s
				}
				s++
			}, s = 0, z = 0; z < a.length; z++) {
				if (j) {
					if (a.charAt(z) == "'" && !o("'")) {
						j = false
					} else {
						r()
					}
				} else {
					switch (a.charAt(z)) {
					case "d":
						l = m("d");
						break;
					case "D":
						n("D", f, h);
						break;
					case "o":
						u = m("o");
						break;
					case "m":
						k = m("m");
						break;
					case "M":
						k = n("M", i, g);
						break;
					case "y":
						c = m("y");
						break;
					case "@":
						var v = new Date(m("@"));
						c = v.getFullYear();
						k = v.getMonth() + 1;
						l = v.getDate();
						break;
					case "!":
						v = new Date((m("!") - this._ticksTo1970) / 10000);
						c = v.getFullYear();
						k = v.getMonth() + 1;
						l = v.getDate();
						break;
					case "'":
						if (o("'")) {
							r()
						} else {
							j = true
						}
						break;
					default:
						r()
					}
				}
			}
			if (c == -1) {
				c = (new Date).getFullYear()
			} else {
				if (c < 100) {
					c += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (c <= e ? 0 : -100)
				}
			}
			if (u > -1) {
				k = 1;
				l = u;
				do {
					e = this._getDaysInMonth(c, k - 1);
					if (l <= e) {
						break
					}
					k++;
					l -= e
				} while (1)
			}
			v = this._daylightSavingAdjust(new Date(c, k - 1, l));
			if (v.getFullYear() != c || v.getMonth() + 1 != k || v.getDate() != l) {
				throw "Invalid date"
			}
			return v
		},
		ATOM: "yy-mm-dd",
		COOKIE: "D, dd M yy",
		ISO_8601: "yy-mm-dd",
		RFC_822: "D, d M y",
		RFC_850: "DD, dd-M-y",
		RFC_1036: "D, d M y",
		RFC_1123: "D, d M yy",
		RFC_2822: "D, d M yy",
		RSS: "D, d M y",
		TICKS: "!",
		TIMESTAMP: "@",
		W3C: "yy-mm-dd",
		_ticksTo1970: (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)) * 24 * 60 * 60 * 10000000,
		formatDate: function (a, b, c) {
			if (!b) {
				return ""
			}
			var e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
			f = (c ? c.dayNames : null) || this._defaults.dayNames,
			h = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort;
			c = (c ? c.monthNames : null) || this._defaults.monthNames;
			var i = function (o) {
				(o = j + 1 < a.length && a.charAt(j + 1) == o) && j++;
				return o
			},
			g = function (o, m, n) {
				m = "" + m;
				if (i(o)) {
					for (; m.length < n; ) {
						m = "0" + m
					}
				}
				return m
			},
			k = function (o, m, n, r) {
				return i(o) ? r[m] : n[m]
			},
			l = "",
			u = false;
			if (b) {
				for (var j = 0; j < a.length; j++) {
					if (u) {
						if (a.charAt(j) == "'" && !i("'")) {
							u = false
						} else {
							l += a.charAt(j)
						}
					} else {
						switch (a.charAt(j)) {
						case "d":
							l += g("d", b.getDate(), 2);
							break;
						case "D":
							l += k("D", b.getDay(), e, f);
							break;
						case "o":
							l += g("o", (b.getTime() - (new Date(b.getFullYear(), 0, 0)).getTime()) / 86400000, 3);
							break;
						case "m":
							l += g("m", b.getMonth() + 1, 2);
							break;
						case "M":
							l += k("M", b.getMonth(), h, c);
							break;
						case "y":
							l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
							break;
						case "@":
							l += b.getTime();
							break;
						case "!":
							l += b.getTime() * 10000 + this._ticksTo1970;
							break;
						case "'":
							if (i("'")) {
								l += "'"
							} else {
								u = true
							}
							break;
						default:
							l += a.charAt(j)
						}
					}
				}
			}
			return l
		},
		_possibleChars: function (a) {
			for (var b = "", c = false, e = function (h) {
				(h = f + 1 < a.length && a.charAt(f + 1) == h) && f++;
				return h
			}, f = 0; f < a.length; f++) {
				if (c) {
					if (a.charAt(f) == "'" && !e("'")) {
						c = false
					} else {
						b += a.charAt(f)
					}
				} else {
					switch (a.charAt(f)) {
					case "d":
					case "m":
					case "y":
					case "@":
						b += "0123456789";
						break;
					case "D":
					case "M":
						return null;
					case "'":
						if (e("'")) {
							b += "'"
						} else {
							c = true
						}
						break;
					default:
						b += a.charAt(f)
					}
				}
			}
			return b
		},
		_get: function (a, b) {
			return a.settings[b] !== G ? a.settings[b] : this._defaults[b]
		},
		_setDateFromField: function (a, b) {
			if (a.input.val() != a.lastVal) {
				var c = this._get(a, "dateFormat"),
				e = a.lastVal = a.input ? a.input.val() : null,
				f,
				h;
				f = h = this._getDefaultDate(a);
				var i = this._getFormatConfig(a);
				try {
					f = this.parseDate(c, e, i) || h
				} catch (g) {
					this.log(g);
					e = b ? "" : e
				}
				a.selectedDay = f.getDate();
				a.drawMonth = a.selectedMonth = f.getMonth();
				a.drawYear = a.selectedYear = f.getFullYear();
				a.currentDay = e ? f.getDate() : 0;
				a.currentMonth = e ? f.getMonth() : 0;
				a.currentYear = e ? f.getFullYear() : 0;
				this._adjustInstDate(a)
			}
		},
		_getDefaultDate: function (a) {
			return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
		},
		_determineDate: function (a, b, c) {
			var e = function (h) {
				var i = new Date;
				i.setDate(i.getDate() + h);
				return i
			},
			f = function (h) {
				try {
					return d.datepicker.parseDate(d.datepicker._get(a, "dateFormat"), h, d.datepicker._getFormatConfig(a))
				} catch (i) {}
				var g = (h.toLowerCase().match(/^c/) ? d.datepicker._getDate(a) : null) || new Date,
				k = g.getFullYear(),
				l = g.getMonth();
				g = g.getDate();
				for (var u = /([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = u.exec(h); j; ) {
					switch (j[2] || "d") {
					case "d":
					case "D":
						g += parseInt(j[1], 10);
						break;
					case "w":
					case "W":
						g += parseInt(j[1], 10) * 7;
						break;
					case "m":
					case "M":
						l += parseInt(j[1], 10);
						g = Math.min(g, d.datepicker._getDaysInMonth(k, l));
						break;
					case "y":
					case "Y":
						k += parseInt(j[1], 10);
						g = Math.min(g, d.datepicker._getDaysInMonth(k, l));
						break
					}
					j = u.exec(h)
				}
				return new Date(k, l, g)
			};
			if (b = (b = b == null ? c : typeof b == "string" ? f(b) : typeof b == "number" ? isNaN(b) ? c : e(b) : b) && b.toString() == "Invalid Date" ? c : b) {
				b.setHours(0);
				b.setMinutes(0);
				b.setSeconds(0);
				b.setMilliseconds(0)
			}
			return this._daylightSavingAdjust(b)
		},
		_daylightSavingAdjust: function (a) {
			if (!a) {
				return null
			}
			a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0);
			return a
		},
		_setDate: function (a, b, c) {
			var e = !b,
			f = a.selectedMonth,
			h = a.selectedYear;
			b = this._restrictMinMax(a, this._determineDate(a, b, new Date));
			a.selectedDay = a.currentDay = b.getDate();
			a.drawMonth = a.selectedMonth = a.currentMonth = b.getMonth();
			a.drawYear = a.selectedYear = a.currentYear = b.getFullYear();
			if ((f != a.selectedMonth || h != a.selectedYear) && !c) {
				this._notifyChange(a)
			}
			this._adjustInstDate(a);
			if (a.input) {
				a.input.val(e ? "" : this._formatDate(a))
			}
		},
		_getDate: function (a) {
			return !a.currentYear || a.input && a.input.val() == "" ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay))
		},
		_generateHTML: function (a) {
			var b = new Date;
			b = this._daylightSavingAdjust(new Date(b.getFullYear(), b.getMonth(), b.getDate()));
			var c = this._get(a, "isRTL"),
			e = this._get(a, "showButtonPanel"),
			f = this._get(a, "hideIfNoPrevNext"),
			h = this._get(a, "navigationAsDateFormat"),
			i = this._getNumberOfMonths(a),
			g = this._get(a, "showCurrentAtPos"),
			k = this._get(a, "stepMonths"),
			l = i[0] != 1 || i[1] != 1,
			u = this._daylightSavingAdjust(!a.currentDay ? new Date(9999, 9, 9) : new Date(a.currentYear, a.currentMonth, a.currentDay)),
			j = this._getMinMaxDate(a, "min"),
			o = this._getMinMaxDate(a, "max");
			g = a.drawMonth - g;
			var m = a.drawYear;
			if (g < 0) {
				g += 12;
				m--
			}
			if (o) {
				var n = this._daylightSavingAdjust(new Date(o.getFullYear(), o.getMonth() - i[0] * i[1] + 1, o.getDate()));
				for (n = j && n < j ? j : n; this._daylightSavingAdjust(new Date(m, g, 1)) > n; ) {
					g--;
					if (g < 0) {
						g = 11;
						m--
					}
				}
			}
			a.drawMonth = g;
			a.drawYear = m;
			n = this._get(a, "prevText");
			n = !h ? n : this.formatDate(n, this._daylightSavingAdjust(new Date(m, g - k, 1)), this._getFormatConfig(a));
			n = this._canAdjustMonth(a, -1, m, g) ? '<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_' + y + ".datepicker._adjustDate('#" + a.id + "', -" + k + ", 'M');\" title=\"" + n + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + n + "</span></a>" : f ? "" : '<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="' + n + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "e" : "w") + '">' + n + "</span></a>";
			var r = this._get(a, "nextText");
			r = !h ? r : this.formatDate(r, this._daylightSavingAdjust(new Date(m, g + k, 1)), this._getFormatConfig(a));
			f = this._canAdjustMonth(a, +1, m, g) ? '<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_' + y + ".datepicker._adjustDate('#" + a.id + "', +" + k + ", 'M');\" title=\"" + r + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + r + "</span></a>" : f ? "" : '<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="' + r + '"><span class="ui-icon ui-icon-circle-triangle-' + (c ? "w" : "e") + '">' + r + "</span></a>";
			k = this._get(a, "currentText");
			r = this._get(a, "gotoCurrent") && a.currentDay ? u : b;
			k = !h ? k : this.formatDate(k, r, this._getFormatConfig(a));
			h = !a.inline ? '<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_' + y + '.datepicker._hideDatepicker();">' + this._get(a, "closeText") + "</button>" : "";
			e = e ? '<div class="ui-datepicker-buttonpane ui-widget-content">' + (c ? h : "") + (this._isInRange(a, r) ? '<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_' + y + ".datepicker._gotoToday('#" + a.id + "');\">" + k + "</button>" : "") + (c ? "" : h) + "</div>" : "";
			h = parseInt(this._get(a, "firstDay"), 10);
			h = isNaN(h) ? 0 : h;
			k = this._get(a, "showWeek");
			r = this._get(a, "dayNames");
			this._get(a, "dayNamesShort");
			var s = this._get(a, "dayNamesMin"),
			z = this._get(a, "monthNames"),
			v = this._get(a, "monthNamesShort"),
			p = this._get(a, "beforeShowDay"),
			w = this._get(a, "showOtherMonths"),
			H = this._get(a, "selectOtherMonths");
			this._get(a, "calculateWeek");
			for (var M = this._getDefaultDate(a), I = "", C = 0; C < i[0]; C++) {
				for (var N = "", D = 0; D < i[1]; D++) {
					var J = this._daylightSavingAdjust(new Date(m, g, a.selectedDay)),
					t = " ui-corner-all",
					x = "";
					if (l) {
						x += '<div class="ui-datepicker-group';
						if (i[1] > 1) {
							switch (D) {
							case 0:
								x += " ui-datepicker-group-first";
								t = " ui-corner-" + (c ? "right" : "left");
								break;
							case i[1] - 1:
								x += " ui-datepicker-group-last";
								t = " ui-corner-" + (c ? "left" : "right");
								break;
							default:
								x += " ui-datepicker-group-middle";
								t = "";
								break
							}
						}
						x += '">'
					}
					x += '<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix' + t + '">' + (/all|left/.test(t) && C == 0 ? c ? f : n : "") + (/all|right/.test(t) && C == 0 ? c ? n : f : "") + this._generateMonthYearHeader(a, g, m, j, o, C > 0 || D > 0, z, v) + '</div><table class="ui-datepicker-calendar"><thead><tr>';
					var A = k ? '<th class="ui-datepicker-week-col">' + this._get(a, "weekHeader") + "</th>" : "";
					for (t = 0; t < 7; t++) {
						var q = (t + h) % 7;
						A += "<th" + ((t + h + 6) % 7 >= 5 ? ' class="ui-datepicker-week-end"' : "") + '><span title="' + r[q] + '">' + s[q] + "</span></th>"
					}
					x += A + "</tr></thead><tbody>";
					A = this._getDaysInMonth(m, g);
					if (m == a.selectedYear && g == a.selectedMonth) {
						a.selectedDay = Math.min(a.selectedDay, A)
					}
					t = (this._getFirstDayOfMonth(m, g) - h + 7) % 7;
					A = l ? 6 : Math.ceil((t + A) / 7);
					q = this._daylightSavingAdjust(new Date(m, g, 1 - t));
					for (var O = 0; O < A; O++) {
						x += "<tr>";
						var P = !k ? "" : '<td class="ui-datepicker-week-col">' + this._get(a, "calculateWeek")(q) + "</td>";
						for (t = 0; t < 7; t++) {
							var F = p ? p.apply(a.input ? a.input[0] : null, [q]) : [true, ""],
							B = q.getMonth() != g,
							K = B && !H || !F[0] || j && q < j || o && q > o;
							P += '<td class="' + ((t + h + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (B ? " ui-datepicker-other-month" : "") + (q.getTime() == J.getTime() && g == a.selectedMonth && a._keyEvent || M.getTime() == q.getTime() && M.getTime() == J.getTime() ? " " + this._dayOverClass : "") + (K ? " " + this._unselectableClass + " ui-state-disabled" : "") + (B && !w ? "" : " " + F[1] + (q.getTime() == u.getTime() ? " " + this._currentClass : "") + (q.getTime() == b.getTime() ? " ui-datepicker-today" : "")) + '"' + ((!B || w) && F[2] ? ' title="' + F[2] + '"' : "") + (K ? "" : ' onclick="DP_jQuery_' + y + ".datepicker._selectDay('#" + a.id + "'," + q.getMonth() + "," + q.getFullYear() + ', this);return false;"') + ">" + (B && !w ? "&#xa0;" : K ? '<span class="ui-state-default">' + q.getDate() + "</span>" : '<a class="ui-state-default' + (q.getTime() == b.getTime() ? " ui-state-highlight" : "") + (q.getTime() == J.getTime() ? " ui-state-active" : "") + (B ? " ui-priority-secondary" : "") + '" href="#">' + q.getDate() + "</a>") + "</td>";
							q.setDate(q.getDate() + 1);
							q = this._daylightSavingAdjust(q)
						}
						x += P + "</tr>"
					}
					g++;
					if (g > 11) {
						g = 0;
						m++
					}
					x += "</tbody></table>" + (l ? "</div>" + (i[0] > 0 && D == i[1] - 1 ? '<div class="ui-datepicker-row-break"></div>' : "") : "");
					N += x
				}
				I += N
			}
			I += e + (d.browser.msie && parseInt(d.browser.version, 10) < 7 && !a.inline ? '<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>' : "");
			a._keyEvent = false;
			return I
		},
		_generateMonthYearHeader: function (a, b, c, e, f, h, i, g) {
			var k = this._get(a, "changeMonth"),
			l = this._get(a, "changeYear"),
			u = this._get(a, "showMonthAfterYear"),
			j = '<div class="ui-datepicker-title">',
			o = "";
			if (h || !k) {
				o += '<span class="ui-datepicker-month">' + i[b] + "</span>"
			} else {
				i = e && e.getFullYear() == c;
				var m = f && f.getFullYear() == c;
				o += '<select class="ui-datepicker-month" onchange="DP_jQuery_' + y + ".datepicker._selectMonthYear('#" + a.id + "', this, 'M');\" onclick=\"DP_jQuery_" + y + ".datepicker._clickMonthYear('#" + a.id + "');\">";
				for (var n = 0; n < 12; n++) {
					if ((!i || n >= e.getMonth()) && (!m || n <= f.getMonth())) {
						o += '<option value="' + n + '"' + (n == b ? ' selected="selected"' : "") + ">" + g[n] + "</option>"
					}
				}
				o += "</select>"
			}
			u || (j += o + (h || !(k && l) ? "&#xa0;" : ""));
			if (h || !l) {
				j += '<span class="ui-datepicker-year">' + c + "</span>"
			} else {
				g = this._get(a, "yearRange").split(":");
				var r = (new Date).getFullYear();
				i = function (s) {
					s = s.match(/c[+-].*/) ? c + parseInt(s.substring(1), 10) : s.match(/[+-].*/) ? r + parseInt(s, 10) : parseInt(s, 10);
					return isNaN(s) ? r : s
				};
				b = i(g[0]);
				g = Math.max(b, i(g[1] || ""));
				b = e ? Math.max(b, e.getFullYear()) : b;
				g = f ? Math.min(g, f.getFullYear()) : g;
				for (j += '<select class="ui-datepicker-year" onchange="DP_jQuery_' + y + ".datepicker._selectMonthYear('#" + a.id + "', this, 'Y');\" onclick=\"DP_jQuery_" + y + ".datepicker._clickMonthYear('#" + a.id + "');\">"; b <= g; b++) {
					j += '<option value="' + b + '"' + (b == c ? ' selected="selected"' : "") + ">" + b + "</option>"
				}
				j += "</select>"
			}
			j += this._get(a, "yearSuffix");
			if (u) {
				j += (h || !(k && l) ? "&#xa0;" : "") + o
			}
			j += "</div>";
			return j
		},
		_adjustInstDate: function (a, b, c) {
			var e = a.drawYear + (c == "Y" ? b : 0),
			f = a.drawMonth + (c == "M" ? b : 0);
			b = Math.min(a.selectedDay, this._getDaysInMonth(e, f)) + (c == "D" ? b : 0);
			e = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(e, f, b)));
			a.selectedDay = e.getDate();
			a.drawMonth = a.selectedMonth = e.getMonth();
			a.drawYear = a.selectedYear = e.getFullYear();
			if (c == "M" || c == "Y") {
				this._notifyChange(a)
			}
		},
		_restrictMinMax: function (a, b) {
			var c = this._getMinMaxDate(a, "min");
			a = this._getMinMaxDate(a, "max");
			b = c && b < c ? c : b;
			return b = a && b > a ? a : b
		},
		_notifyChange: function (a) {
			var b = this._get(a, "onChangeMonthYear");
			if (b) {
				b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
			}
		},
		_getNumberOfMonths: function (a) {
			a = this._get(a, "numberOfMonths");
			return a == null ? [1, 1] : typeof a == "number" ? [1, a] : a
		},
		_getMinMaxDate: function (a, b) {
			return this._determineDate(a, this._get(a, b + "Date"), null)
		},
		_getDaysInMonth: function (a, b) {
			return 32 - (new Date(a, b, 32)).getDate()
		},
		_getFirstDayOfMonth: function (a, b) {
			return (new Date(a, b, 1)).getDay()
		},
		_canAdjustMonth: function (a, b, c, e) {
			var f = this._getNumberOfMonths(a);
			c = this._daylightSavingAdjust(new Date(c, e + (b < 0 ? b : f[0] * f[1]), 1));
			b < 0 && c.setDate(this._getDaysInMonth(c.getFullYear(), c.getMonth()));
			return this._isInRange(a, c)
		},
		_isInRange: function (a, b) {
			var c = this._getMinMaxDate(a, "min");
			a = this._getMinMaxDate(a, "max");
			return (!c || b.getTime() >= c.getTime()) && (!a || b.getTime() <= a.getTime())
		},
		_getFormatConfig: function (a) {
			var b = this._get(a, "shortYearCutoff");
			b = typeof b != "string" ? b : (new Date).getFullYear() % 100 + parseInt(b, 10);
			return {
				shortYearCutoff: b,
				dayNamesShort: this._get(a, "dayNamesShort"),
				dayNames: this._get(a, "dayNames"),
				monthNamesShort: this._get(a, "monthNamesShort"),
				monthNames: this._get(a, "monthNames")
			}
		},
		_formatDate: function (a, b, c, e) {
			if (!b) {
				a.currentDay = a.selectedDay;
				a.currentMonth = a.selectedMonth;
				a.currentYear = a.selectedYear
			}
			b = b ? typeof b == "object" ? b : this._daylightSavingAdjust(new Date(e, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
			return this.formatDate(this._get(a, "dateFormat"), b, this._getFormatConfig(a))
		}
	});
	d.fn.datepicker = function (a) {
		if (!d.datepicker.initialized) {
			d(document).mousedown(d.datepicker._checkExternalClick).find("body").append(d.datepicker.dpDiv);
			d.datepicker.initialized = true
		}
		var b = Array.prototype.slice.call(arguments, 1);
		if (typeof a == "string" && (a == "isDisabled" || a == "getDate" || a == "widget")) {
			return d.datepicker["_" + a + "Datepicker"].apply(d.datepicker, [this[0]].concat(b))
		}
		if (a == "option" && arguments.length == 2 && typeof arguments[1] == "string") {
			return d.datepicker["_" + a + "Datepicker"].apply(d.datepicker, [this[0]].concat(b))
		}
		return this.each(function () {
			typeof a == "string" ? d.datepicker["_" + a + "Datepicker"].apply(d.datepicker, [this].concat(b)) : d.datepicker._attachDatepicker(this, a)
		})
	};
	d.datepicker = new L;
	d.datepicker.initialized = false;
	d.datepicker.uuid = (new Date).getTime();
	d.datepicker.version = "1.8.5";
	window["DP_jQuery_" + y] = d
})(jQuery);
(function () {
	var v = this,
	g = v._,
	w = function (b) {
		this._wrapped = b
	},
	h = typeof StopIteration !== "undefined" ? StopIteration : "__break__",
	x = v._ = function (b) {
		return new w(b)
	};
	if (typeof exports !== "undefined") {
		exports._ = x
	}
	var u = Array.prototype.slice,
	f = Array.prototype.unshift,
	e = Object.prototype.toString,
	d = Object.prototype.hasOwnProperty,
	c = Object.prototype.propertyIsEnumerable;
	x.VERSION = "0.5.6";
	x.each = function (b, n, m) {
		try {
			if (b.forEach) {
				b.forEach(n, m)
			} else {
				if (x.isArray(b) || x.isArguments(b)) {
					for (var l = 0, k = b.length; l < k; l++) {
						n.call(m, b[l], l, b)
					}
				} else {
					var j = x.keys(b);
					k = j.length;
					for (l = 0; l < k; l++) {
						n.call(m, b[j[l]], j[l], b)
					}
				}
			}
		} catch (i) {
			if (i != h) {
				throw i
			}
		}
		return b
	};
	x.map = function (b, k, j) {
		if (b && x.isFunction(b.map)) {
			return b.map(k, j)
		}
		var i = [];
		x.each(b, function (n, m, l) {
			i.push(k.call(j, n, m, l))
		});
		return i
	};
	x.reduce = function (b, k, j, i) {
		if (b && x.isFunction(b.reduce)) {
			return b.reduce(x.bind(j, i), k)
		}
		x.each(b, function (n, m, l) {
			k = j.call(i, k, n, m, l)
		});
		return k
	};
	x.reduceRight = function (b, l, k, j) {
		if (b && x.isFunction(b.reduceRight)) {
			return b.reduceRight(x.bind(k, j), l)
		}
		var i = x.clone(x.toArray(b)).reverse();
		x.each(i, function (n, m) {
			l = k.call(j, l, n, m, b)
		});
		return l
	};
	x.detect = function (b, k, j) {
		var i;
		x.each(b, function (n, m, l) {
			if (k.call(j, n, m, l)) {
				i = n;
				x.breakLoop()
			}
		});
		return i
	};
	x.select = function (b, k, j) {
		if (b && x.isFunction(b.filter)) {
			return b.filter(k, j)
		}
		var i = [];
		x.each(b, function (n, m, l) {
			k.call(j, n, m, l) && i.push(n)
		});
		return i
	};
	x.reject = function (b, k, j) {
		var i = [];
		x.each(b, function (n, m, l) {
			!k.call(j, n, m, l) && i.push(n)
		});
		return i
	};
	x.all = function (b, k, j) {
		k = k || x.identity;
		if (b && x.isFunction(b.every)) {
			return b.every(k, j)
		}
		var i = true;
		x.each(b, function (n, m, l) {
			(i = i && k.call(j, n, m, l)) || x.breakLoop()
		});
		return i
	};
	x.any = function (b, k, j) {
		k = k || x.identity;
		if (b && x.isFunction(b.some)) {
			return b.some(k, j)
		}
		var i = false;
		x.each(b, function (n, m, l) {
			if (i = k.call(j, n, m, l)) {
				x.breakLoop()
			}
		});
		return i
	};
	x.include = function (b, j) {
		if (x.isArray(b)) {
			return x.indexOf(b, j) != -1
		}
		var i = false;
		x.each(b, function (k) {
			if (i = k === j) {
				x.breakLoop()
			}
		});
		return i
	};
	x.invoke = function (b, j) {
		var i = x.rest(arguments, 2);
		return x.map(b, function (k) {
			return (j ? k[j] : k).apply(k, i)
		})
	};
	x.pluck = function (b, i) {
		return x.map(b, function (j) {
			return j[i]
		})
	};
	x.max = function (b, k, j) {
		if (!k && x.isArray(b)) {
			return Math.max.apply(Math, b)
		}
		var i = {
			computed: -Infinity
		};
		x.each(b, function (n, m, l) {
			m = k ? k.call(j, n, m, l) : n;
			m >= i.computed && (i = {
					value: n,
					computed: m
				})
		});
		return i.value
	};
	x.min = function (b, k, j) {
		if (!k && x.isArray(b)) {
			return Math.min.apply(Math, b)
		}
		var i = {
			computed: Infinity
		};
		x.each(b, function (n, m, l) {
			m = k ? k.call(j, n, m, l) : n;
			m < i.computed && (i = {
					value: n,
					computed: m
				})
		});
		return i.value
	};
	x.sortBy = function (b, j, i) {
		return x.pluck(x.map(b, function (m, l, k) {
				return {
					value: m,
					criteria: j.call(i, m, l, k)
				}
			}).sort(function (l, k) {
				l = l.criteria;
				k = k.criteria;
				return l < k ? -1 : l > k ? 1 : 0
			}), "value")
	};
	x.sortedIndex = function (b, m, l) {
		l = l || x.identity;
		for (var k = 0, j = b.length; k < j; ) {
			var i = k + j >> 1;
			l(b[i]) < l(m) ? (k = i + 1) : (j = i)
		}
		return k
	};
	x.toArray = function (b) {
		if (!b) {
			return []
		}
		if (b.toArray) {
			return b.toArray()
		}
		if (x.isArray(b)) {
			return b
		}
		if (x.isArguments(b)) {
			return u.call(b)
		}
		return x.values(b)
	};
	x.size = function (b) {
		return x.toArray(b).length
	};
	x.first = function (b, j, i) {
		return j && !i ? u.call(b, 0, j) : b[0]
	};
	x.rest = function (b, j, i) {
		return u.call(b, x.isUndefined(j) || i ? 1 : j)
	};
	x.last = function (b) {
		return b[b.length - 1]
	};
	x.compact = function (b) {
		return x.select(b, function (i) {
			return !!i
		})
	};
	x.flatten = function (b) {
		return x.reduce(b, [], function (j, i) {
			if (x.isArray(i)) {
				return j.concat(x.flatten(i))
			}
			j.push(i);
			return j
		})
	};
	x.without = function (b) {
		var i = x.rest(arguments);
		return x.select(b, function (j) {
			return !x.include(i, j)
		})
	};
	x.uniq = function (b, i) {
		return x.reduce(b, [], function (l, k, j) {
			if (0 == j || (i === true ? x.last(l) != k : !x.include(l, k))) {
				l.push(k)
			}
			return l
		})
	};
	x.intersect = function (b) {
		var i = x.rest(arguments);
		return x.select(x.uniq(b), function (j) {
			return x.all(i, function (k) {
				return x.indexOf(k, j) >= 0
			})
		})
	};
	x.zip = function () {
		for (var b = x.toArray(arguments), k = x.max(x.pluck(b, "length")), j = new Array(k), i = 0; i < k; i++) {
			j[i] = x.pluck(b, String(i))
		}
		return j
	};
	x.indexOf = function (b, k) {
		if (b.indexOf) {
			return b.indexOf(k)
		}
		for (var j = 0, i = b.length; j < i; j++) {
			if (b[j] === k) {
				return j
			}
		}
		return -1
	};
	x.lastIndexOf = function (b, j) {
		if (b.lastIndexOf) {
			return b.lastIndexOf(j)
		}
		for (var i = b.length; i--; ) {
			if (b[i] === j) {
				return i
			}
		}
		return -1
	};
	x.range = function (b, m, l) {
		var k = x.toArray(arguments),
		j = k.length <= 1;
		b = j ? 0 : k[0];
		m = j ? k[0] : k[1];
		l = k[2] || 1;
		k = Math.ceil((m - b) / l);
		if (k <= 0) {
			return []
		}
		k = new Array(k);
		j = b;
		for (var i = 0; 1; j += l) {
			if ((l > 0 ? j - m : m - j) >= 0) {
				return k
			}
			k[i++] = j
		}
	};
	x.bind = function (b, j) {
		var i = x.rest(arguments, 2);
		return function () {
			return b.apply(j || v, i.concat(x.toArray(arguments)))
		}
	};
	x.bindAll = function (b) {
		var i = x.rest(arguments);
		if (i.length == 0) {
			i = x.functions(b)
		}
		x.each(i, function (j) {
			b[j] = x.bind(b[j], b)
		});
		return b
	};
	x.delay = function (b, j) {
		var i = x.rest(arguments, 2);
		return setTimeout(function () {
			return b.apply(b, i)
		}, j)
	};
	x.defer = function (b) {
		return x.delay.apply(x, [b, 1].concat(x.rest(arguments)))
	};
	x.wrap = function (b, i) {
		return function () {
			var j = [b].concat(x.toArray(arguments));
			return i.apply(i, j)
		}
	};
	x.compose = function () {
		var b = x.toArray(arguments);
		return function () {
			for (var j = x.toArray(arguments), i = b.length - 1; i >= 0; i--) {
				j = [b[i].apply(this, j)]
			}
			return j[0]
		}
	};
	x.keys = function (b) {
		if (x.isArray(b)) {
			return x.range(0, b.length)
		}
		var j = [];
		for (var i in b) {
			d.call(b, i) && j.push(i)
		}
		return j
	};
	x.values = function (b) {
		return x.map(b, x.identity)
	};
	x.functions = function (b) {
		return x.select(x.keys(b), function (i) {
			return x.isFunction(b[i])
		}).sort()
	};
	x.extend = function (b, j) {
		for (var i in j) {
			b[i] = j[i]
		}
		return b
	};
	x.clone = function (b) {
		if (x.isArray(b)) {
			return b.slice(0)
		}
		return x.extend({}, b)
	};
	x.tap = function (b, i) {
		i(b);
		return b
	};
	x.isEqual = function (b, l) {
		if (b === l) {
			return true
		}
		var k = typeof b;
		if (k != typeof l) {
			return false
		}
		if (b == l) {
			return true
		}
		if (!b && l || b && !l) {
			return false
		}
		if (b.isEqual) {
			return b.isEqual(l)
		}
		if (x.isDate(b) && x.isDate(l)) {
			return b.getTime() === l.getTime()
		}
		if (x.isNaN(b) && x.isNaN(l)) {
			return true
		}
		if (x.isRegExp(b) && x.isRegExp(l)) {
			return b.source === l.source && b.global === l.global && b.ignoreCase === l.ignoreCase && b.multiline === l.multiline
		}
		if (k !== "object") {
			return false
		}
		if (b.length && b.length !== l.length) {
			return false
		}
		k = x.keys(b);
		var j = x.keys(l);
		if (k.length != j.length) {
			return false
		}
		for (var i in b) {
			if (!x.isEqual(b[i], l[i])) {
				return false
			}
		}
		return true
	};
	x.isEmpty = function (b) {
		return x.keys(b).length == 0
	};
	x.isElement = function (b) {
		return !!(b && b.nodeType == 1)
	};
	x.isArray = function (b) {
		return !!(b && b.concat && b.unshift)
	};
	x.isArguments = function (b) {
		return b && x.isNumber(b.length) && !x.isArray(b) && !c.call(b, "length")
	};
	x.isFunction = function (b) {
		return !!(b && b.constructor && b.call && b.apply)
	};
	x.isString = function (b) {
		return !!(b === "" || b && b.charCodeAt && b.substr)
	};
	x.isNumber = function (b) {
		return e.call(b) === "[object Number]"
	};
	x.isDate = function (b) {
		return !!(b && b.getTimezoneOffset && b.setUTCFullYear)
	};
	x.isRegExp = function (b) {
		return !!(b && b.test && b.exec && (b.ignoreCase || b.ignoreCase === false))
	};
	x.isNaN = function (b) {
		return x.isNumber(b) && isNaN(b)
	};
	x.isNull = function (b) {
		return b === null
	};
	x.isUndefined = function (b) {
		return typeof b == "undefined"
	};
	x.noConflict = function () {
		v._ = g;
		return this
	};
	x.identity = function (b) {
		return b
	};
	x.breakLoop = function () {
		throw h
	};
	var y = 0;
	x.uniqueId = function (b) {
		var i = y++;
		return b ? b + i : i
	};
	x.templateSettings = {
		start: "<%",
		end: "%>",
		interpolate: /<%=(.+?)%>/g
	};
	x.template = function (b, j) {
		var i = x.templateSettings;
		b = new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + b.replace(/[\r\t\n]/g, " ").replace(new RegExp("'(?=[^" + i.end[0] + "]*" + i.end + ")", "g"), "\t").split("'").join("\\'").split("\t").join("'").replace(i.interpolate, "',$1,'").split(i.start).join("');").split(i.end).join("p.push('") + "');}return p.join('');");
		return j ? b(j) : b
	};
	x.forEach = x.each;
	x.foldl = x.inject = x.reduce;
	x.foldr = x.reduceRight;
	x.filter = x.select;
	x.every = x.all;
	x.some = x.any;
	x.head = x.first;
	x.tail = x.rest;
	x.methods = x.functions;
	var t = function (b, i) {
		return i ? x(b).chain() : b
	};
	x.each(x.functions(x), function (b) {
		var i = x[b];
		w.prototype[b] = function () {
			var j = x.toArray(arguments);
			f.call(j, this._wrapped);
			return t(i.apply(x, j), this._chain)
		}
	});
	x.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"], function (b) {
		var i = Array.prototype[b];
		w.prototype[b] = function () {
			i.apply(this._wrapped, arguments);
			return t(this._wrapped, this._chain)
		}
	});
	x.each(["concat", "join", "slice"], function (b) {
		var i = Array.prototype[b];
		w.prototype[b] = function () {
			return t(i.apply(this._wrapped, arguments), this._chain)
		}
	});
	w.prototype.chain = function () {
		this._chain = true;
		return this
	};
	w.prototype.value = function () {
		return this._wrapped
	}
})();
var UA_PATTERN_FIREFOX = /Mozilla.*(Firefox|Minefield|Namoroka|Shiretoko|GranParadiso|BonEcho|Iceweasel|Fennec|MozillaDeveloperPreview)\/([^\s]*).*$/;
var UA_PATTERN_SEAMONKEY = /Mozilla.*(SeaMonkey|Iceape)\/([^\s]*).*$/;
var UA_PATTERN_MOBILE = /Mozilla.*(Fennec)\/([^\s]*)$/;
var UA_PATTERN_THUNDERBIRD = /Mozilla.*(Thunderbird|Shredder|Lanikai)\/([^\s*]*).*$/;
function VersionCompare() {
	this.compareVersions = function (d, c) {
		var j = d.split(".");
		var k = c.split(".");
		for (var f = 0; f < j.length || f < k.length; f++) {
			var e = (f < j.length ? j[f] : null);
			var h = (f < k.length ? k[f] : null);
			var g = this.compareVersionParts(e, h);
			if (g != 0) {
				return g
			}
		}
		return 0
	};
	this.compareVersionParts = function (b, e) {
		var f = this.parseVersionPart(b);
		var d = this.parseVersionPart(e);
		var c = this.cmp(f.numA, d.numA);
		if (c) {
			return c
		}
		c = this.strcmp(f.strB, d.strB);
		if (c) {
			return c
		}
		c = this.cmp(f.numC, d.numC);
		if (c) {
			return c
		}
		return this.strcmp(f.extraD, d.extraD)
	};
	this.parseVersionPart = function (e) {
		if (e == "*") {
			return {
				numA: Number.MAX_VALUE,
				strB: "",
				numC: 0,
				extraD: ""
			}
		}
		var d = /^([-\d]*)([^-\d]*)([-\d]*)(.*)$/;
		var b = d.exec(e);
		var c = {
			numA: parseInt(b[1]),
			strB: b[2],
			numC: parseInt(b[3]),
			extraD: b[4]
		};
		if (c.strB == "+") {
			c.numA++;
			c.strB = "pre"
		}
		return c
	};
	this.cmp = function (b, c) {
		if (isNaN(b)) {
			b = 0
		}
		if (isNaN(c)) {
			c = 0
		}
		if (b < c) {
			return -1
		}
		if (b > c) {
			return 1
		}
		return 0
	};
	this.strcmp = function (b, c) {
		if (b == c) {
			return 0
		}
		if (b == "") {
			return 1
		}
		if (c == "") {
			return -1
		}
		if (b < c) {
			return -1
		} else {
			if (b > c) {
				return 1
			} else {
				return 0
			}
		}
	}
}
function bandwagonRefreshEvent() {
	if (document.createEvent) {
		var b = document.createEvent("Events");
		b.initEvent("bandwagonRefresh", true, false);
		document.dispatchEvent(b)
	}
}
var contributions = {
	commentlimit: 255,
	init: function () {
		var b = $("#contribute-box");
		var c = parseFloat($("#contrib-too-much").attr("data-max-amount"));
		b.find("li label").click(function (d) {
			d.preventDefault();
			$(this).siblings(":radio").attr("checked", "checked");
			$(this).children("input:text").focus()
		}).end().find("input:text").keypress(function () {
			$(this).parent().siblings(":radio").attr("checked", "checked")
		}).end().find("textarea").keyup(function () {
			var d = $(this).val(),
			f = contributions.commentlimit,
			e = $(this).siblings(".commentlen");
			if (d.length > f) {
				$(this).val(d.substr(0, f))
			}
			e.text(f - Math.min(d.length, f))
		}).keyup().end().find("#contrib-too-much").hide().end().find("form").submit(function () {
			var d = $(this).find("input:checked").val();
			if (d == "onetime" || d == "monthly") {
				var e = $(this).find('input[name="' + d + '-amount"]').val();
				if (e > c) {
					$(this).find("#contrib-too-much").show();
					return false
				}
			}
			return true
		});
		if (!b.jqm) {
			return
		}
		b.jqm({
			overlay: 100,
			overlayClass: "contrib-overlay",
			onShow: function (d) {
				if ($.browser.opera) {
					this.inputs = $(":input:visible").css("visibility", "hidden")
				}
				d.w.find("input:text").val("").end().find("textarea").val("").keyup().end().find("input:radio:first").attr("checked", "checked").end().fadeIn()
			},
			onHide: function (d) {
				if ($.browser.opera) {
					this.inputs.css("visibility", "visible")
				}
				d.w.find("#contrib-too-much").hide();
				d.w.fadeOut();
				d.o.remove()
			},
			trigger: "#contribute-button",
			toTop: true
		}).jqmAddClose(b.find(".cancel a"))
	}
};
$(document).ready(function () {
	$("form.go").change(function () {
		this.submit()
	}).find("button").hide()
});
jQuery.fn.thermometer = function () {
	this.each(function () {
		var e = this;
		if (!e.getContext) {
			return
		}
		var p = e.getContext("2d");
		var c = function (i) {
			p.beginPath();
			p.arc(i.x, i.y, i.radius, Math.PI / 6, Math.PI * (11 / 6), false);
			p.arc(i.x + i.len, i.y, i.radius / 2, Math.PI * (3 / 2), Math.PI / 2, false);
			p.closePath()
		};
		var f = function (q, i) {
			return JSON.parse(q.getAttribute("data-" + i))
		};
		var j = Math.max(0, Math.min(1, f(e, "ratio"))),
		h = f(e, "radius"),
		m = 10,
		d = p.canvas.width - ((h + m) * 2),
		o = h + m,
		n = p.canvas.height / 2,
		b = {
			x: o,
			y: n,
			len: d * j,
			radius: h - 4
		};
		if (j > 0) {
			p.fillStyle = "#3dacfd";
			c(b);
			p.fill();
			p.arc(b.x, b.y, b.radius + 2, 0, Math.PI * 2, false);
			p.fill()
		}
		b = $.extend(b, {
			len: d,
			radius: h
		});
		p.strokeStyle = "#739fb9";
		var l = p.createLinearGradient(0, b.y - b.radius, 0, b.y + b.radius);
		l.addColorStop(0, "rgba(255, 255, 255, 0.5)");
		l.addColorStop(1, "rgba(255, 255, 255, 0)");
		c(b);
		p.stroke();
		p.fillStyle = l;
		p.fill();
		p.strokeStyle = "#666";
		for (var g = 1; g < 4; g++) {
			var k = o + g * (d / 4);
			p.beginPath();
			p.moveTo(k, n);
			p.lineTo(k, n + (h / 2));
			p.stroke()
		}
	});
	return this
};
var AMO = {};
$(document).ready(function () {
	$('a[href="#install-beta"]').click(function (b) {
		b.preventDefault();
		$(".install-beta").slideDown("slow").show()
	})
});
z = {};
$(document).ready(function () {
	$(".install").installButton();
	if ($.fn.transbox) {
		$(".trans").transbox()
	}
	if ($.fn.tabify) {
		$(".tab-wrapper").tabify()
	}
	$("span.emaillink").each(function () {
		$(this).find(".i").remove();
		em = $(this).text().split("").reverse().join("");
		a = $("<a>").attr("href", "mailto:" + em).text(em);
		$(this).replaceWith(a)
	});
	$("input[placeholder]").placeholder();
	z.searchBox();
	if (z.readonly) {
		$("form[method=post]").before(gettext("This feature is temporarily disabled while we perform website maintenance. Please check back a little later.")).find("input, button, select").attr("disabled", true)
	}
});
function format(d, b) {
	var c = /\{([^}]+)\}/g;
	return d.replace(c, function (f, e) {
		return b[e]
	})
}
function template(b) {
	return function (c) {
		return format(b, c)
	}
}
jQuery.fn.placeholder = function (b) {
	if (b) {
		this.attr("placeholder", b)
	}
	if ("placeholder" in document.createElement("input")) {
		return this
	}
	if (b && this.hasClass("placeholder")) {
		this.val("").blur()
	}
	return this.focus(function () {
		var c = $(this),
		d = c.attr("placeholder");
		if (c.val() == d) {
			c.val("").removeClass("placeholder")
		}
	}).blur(function () {
		var c = $(this),
		d = c.attr("placeholder");
		if (c.val() == "") {
			c.val(d).addClass("placeholder")
		}
	}).each(function () {
		var c = $(this);
		c.closest("form").submit(function () {
			if (c.hasClass("placeholder")) {
				c.val("")
			}
		})
	}).blur()
};
jQuery.fn.hasattr = function (b) {
	return this.attr(b) !== undefined
};
var escape_ = function (b) {
	return b.replace("&", "&amp;").replace(">", "&gt;").replace("<", "&lt;").replace("'", "&#39;").replace('"', "&#34;")
};
_.haskey = function (c, b) {
	return typeof c[b] !== "undefined"
};
z.browser = {
	firefox: false,
	seamonkey: false,
	mobile: false,
	thunderbird: false
};
z.browserVersion = 0;
z.os = {
	windows: false,
	mac: false,
	linux: false,
	other: false
};
(function () {
	var c = function (d, e) {
		match = e.exec(navigator.userAgent);
		if (match && match.length == 3) {
			z.browser[d] = true;
			z.browserVersion = escape_(match[2])
		}
	};
	c("firefox", UA_PATTERN_FIREFOX);
	c("mobile", UA_PATTERN_MOBILE);
	c("seamonkey", UA_PATTERN_SEAMONKEY);
	c("thunderbird", UA_PATTERN_THUNDERBIRD);
	var b = function (d, e) {
		if (navigator.platform.indexOf(e) != -1) {
			$(document.body).addClass(d);
			z.os[d] = true;
			z.platform = d
		}
	};
	b("windows", "Win32");
	b("mac", "Mac");
	b("linux", "Linux");
	if (!_.any(_.values(z.os))) {
		b("other", "")
	}
})();
z.app = document.body.getAttribute("data-app");
z.appName = document.body.getAttribute("data-appname");
z.appMatchesUserAgent = z.browser[z.app];
z.anonymous = JSON.parse(document.body.getAttribute("data-anonymous"));
z.media_url = document.body.getAttribute("data-media-url");
z.readonly = JSON.parse(document.body.getAttribute("data-readonly"));
(function () {
	z.button = {};
	z.button.after = {
		contrib: function (g, f) {
			if (f === 0) {
				document.location = $(this).attr("data-developers")
			}
		}
	};
	var c = new VersionCompare(),
	b = '<div class="extra"><span class="notavail">{0}</span></div>',
	d = new RegExp("(/downloads/(?:latest|file)/\\d+)");
	var e = function () {
		var u = this,
		m = $(this),
		j = m.find(".button");
		j.each(function () {
			var K = $(this);
			if (K.hasattr("data-realurl")) {
				K.attr("href", K.attr("data-realurl"))
			}
			if (z.app === "mobile" && !z.appMatchesUserAgent) {
				var J = K.attr("href");
				K.attr("href", J.replace(d, "$1/type:attachment"))
			}
		});
		var q = m.attr("data-addon"),
		w = m.attr("data-min"),
		B = m.attr("data-max"),
		I = m.attr("data-name"),
		C = m.attr("data-icon"),
		g = m.attr("data-after"),
		o = m.hasattr("data-search"),
		n = m.hasClass("accept"),
		E = n ? gettext("Accept and Install") : gettext("Add to {0}"),
		i = format(E, [z.appName]),
		F = {
			addon: q,
			msg: z.appMatchesUserAgent ? i : gettext("Download Now")
		},
		A = z.appMatchesUserAgent && w && B,
		x = null,
		t = null;
		var h = (j.find(".os").length && !j.hasClass(z.platform));
		if (A) {
			x = c.compareVersions(z.browserVersion, w) < 0;
			t = c.compareVersions(z.browserVersion, B) > 0
		}
		var p = function (J) {
			return function () {
				F.url = j.filter(":visible").attr("href");
				return format(z.button.messages[J], F)
			}
		};
		var H = function (J) {
			m.parent().append(format(b, [J]))
		};
		var y = function () {
			if (A || (o && z.appMatchesUserAgent)) {
				j.addClass("add").removeClass("download").find("span").text(i)
			}
		};
		var v = function () {
			if (!A && !o) {
				return
			}
			m.click(function (P) {
				var J = $(P.target);
				if (J.hasClass("installer")) {
					var K = J
				} else {
					var K = J.parents(".installer").first();
					if (_.indexOf(m.find(".installer"), K[0]) == -1) {
						return
					}
				}
				P.preventDefault();
				var L = {};
				m.find(".button[data-hash]").each(function () {
					L[$(this).attr("href")] = $(this).attr("data-hash")
				});
				var O = L[K.attr("href")];
				var N = _.haskey(z.button.after, g) ? z.button.after[g] : _.identity,
				Q = _.bind(N, u),
				M = o ? z.installSearch : z.installAddon;
				M(I, K[0].href, C, O, Q)
			})
		};
		var G = j.map(function () {
			var J = $(this).find(".os").attr("data-os"),
			K = z.appMatchesUserAgent ? gettext("Install for {0} anyway") : gettext("Download for {0} anyway");
			return {
				href: $(this).attr("href"),
				msg: format(K, [J])
			}
		});
		var f = function (L) {
			var M = $.extend({
				addPopup: true,
				addWarning: true,
				extra: ""
			}, L);
			warn = M.addWarning ? H : _.identity;
			var J = function (P) {
				return function () {
					var Q = $.isFunction(M.extra) ? M.extra() : M.extra;
					return $(P.apply(this, arguments)).append(Q)
				}
			};
			var K = J(function () {
				var P = $.map(G, function (Q) {
					return format(z.button.messages.platform_link, Q)
				});
				return format(z.button.messages.bad_platform, {
					platforms: P.join("")
				})
			});
			var N = J(function () {
				F.new_version = B;
				F.old_version = z.browserVersion;
				return p(t ? "not_updated" : "newer_version")()
			});
			var O = J(function () {
				var Q = $(K()),
				P = $(N());
				P.prepend(Q.find(".msg").clone());
				if (this.switchInstaller) {
					P.find(".installer").parent().html(Q.find("ul").clone())
				}
				return P
			});
			if (h) {
				warn(gettext("Not available for your platform"));
				j.addClass("concealed");
				j.first().css("display", "inherit")
			}
			if (A && (x || t)) {
				warn(format(gettext("Not available for {0} {1}"), [z.appName, z.browserVersion]));
				j.addClass("concealed");
				if (!M.addPopup) {
					return
				}
				if (h && x) {
					j.addPopup(O)
				} else {
					if (h && t) {
						j.addPopup(_.bind(O, {
								switchInstaller: true
							}))
					} else {
						j.addPopup(N)
					}
				}
				return true
			} else {
				if (h && M.addPopup) {
					j.addPopup(K);
					return true
				} else {
					if (!unreviewed && (A || o)) {
						j.addClass("installer")
					}
				}
			}
			return false
		};
		var l = m.hasClass("selfhosted"),
		D = m.hasClass("beta");
		unreviewed = m.hasClass("unreviewed") && !D,
		persona = m.hasClass("persona"),
		contrib = m.hasClass("contrib"),
		o = m.hasattr("data-search"),
		eula = m.hasClass("eula");
		if (unreviewed && !(l || eula || contrib || D)) {
			j.addPopup(p("unreviewed"))
		}
		if (l) {
			j.addPopup(p("selfhosted"))
		} else {
			if (eula || contrib) {
				f({
					addPopup: false
				})
			} else {
				if (persona) {
					j.removeClass("download").addClass("add").find("span").text(i);
					if ($.hasPersonas()) {
						j.personasButton()
					} else {
						j.addClass("concealed");
						if (z.appMatchesUserAgent) {
							F.old_version = z.browserVersion;
							j.addPopup(p("personas_need_upgrade"))
						} else {
							j.addPopup(p("learn_more_personas"))
						}
					}
				} else {
					if (z.appMatchesUserAgent) {
						v();
						y();
						var r = o ? {
							addPopup: false,
							addWarning: false
						} : {};
						f(r)
					} else {
						if (z.app == "firefox") {
							j.addPopup(p("learn_more")).addClass("concealed");
							f({
								addPopup: false
							})
						} else {
							if (z.app == "thunderbird") {
								var k = function () {
									return $(p("learn_more")()).html()
								};
								if (!f({
										extra: k
									})) {
									j.addPopup(p("learn_more"), true)
								}
							} else {
								v();
								y();
								f()
							}
						}
					}
				}
			}
		}
	};
	jQuery.fn.installButton = function () {
		return this.each(e)
	};
	jQuery.fn.addPopup = function (f, g) {
		return this.each(function () {
			var j = $(this),
			h = this,
			i = $(document.body);
			if (this.hasPopup) {
				j.bind("newPopup", function (l, k) {
					j.unbind("newPopup");
					$(k).find(".installer").click(function (n) {
						j.unbind("click");
						h.hasPopup = false;
						var m = h.popupQueue.pop();
						if (!m[1]) {
							n.preventDefault();
							n.stopPropagation()
						}
						jQuery.fn.addPopup.apply(j, m);
						j.click()
					})
				});
				h.popupQueue = h.popupQueue || [];
				h.popupQueue.push([f, g])
			} else {
				this.hasPopup = true;
				j.click(function (n) {
					var l = $($.isFunction(f) ? f() : f),
					m = l.get(0);
					if (!j.filter(":visible").length) {
						return
					}
					if (!g) {
						n.preventDefault()
					}
					if (j.offset().left > $(window).width() / 2) {
						l.addClass("left")
					}
					j.trigger("newPopup", [l]);
					j.after(l);
					var k = function (o) {
						if (o.type == "click" && m == o.target || _.indexOf($(o.target).parents(), m) != -1) {
							return
						}
						l.remove();
						i.unbind("click newPopup", k)
					};
					setTimeout(function () {
						i.bind("click newPopup", k)
					}, 0)
				})
			}
		})
	};
	z.installAddon = function (g, f, h, i, k) {
		var j = {};
		j[g] = {
			URL: f,
			IconURL: h,
			toString: function () {
				return f
			}
		};
		if (i) {
			j[g]["Hash"] = i
		}
		InstallTrigger.install(j, k)
	};
	z.installSearch = function (g, f, h, i, j) {
		if (window.external && window.external.AddSearchProvider) {
			window.external.AddSearchProvider(f);
			j()
		} else {
			alert(gettext("Sorry, you need a Mozilla-based browser (such as Firefox) to install a search plugin."))
		}
	}
})();
z.searchBox = function () {
	if (!$("#search-form").length) {
		return
	}
	var b = function () {
		$("#advanced-search select:not(#id_pp)").attr("disabled", "disabled")
	};
	$("#cat").change(function () {
		var c = $(this).val();
		var d;
		if (c == "collections") {
			d = gettext("search for collections");
			b()
		} else {
			if (c == "personas") {
				d = gettext("search for personas");
				b()
			} else {
				d = gettext("search for add-ons");
				$("#advanced-search select").attr("disabled", "")
			}
		}
		$("#query").placeholder(d)
	}).change()
};
var Tabs = function (b) {
	this.root = $(b);
	this.init()
};
Tabs.prototype = {
	init: function () {
		this.root.addClass("tab-wrapper");
		this.tabMap = {};
		this.panelMap = {};
		this.reset();
		this.select();
		var b = this;
		$(document).bind("hashchange", function (c) {
			b.hashChange(c)
		}).trigger("hashchange")
	},
	reset: function (b) {
		this.findTabs();
		this.findPanels();
		this.styleTabs(this.tabs);
		this.stylePanels(this.panels);
		return this
	},
	findTabs: function () {
		this.list = this.root.find("ol,ul").eq(0);
		this.tabs = $("li:has(a[href])", this.list);
		var c = this;
		var b = function (d) {
			d.preventDefault();
			c.select($(d.target).attr("href"), true);
			$("a", this).blur()
		};
		this.tabs.unbind("click", b).click(b)
	},
	getHash: function (b) {
		return $(b).find("a").attr("href")
	},
	findPanels: function () {
		var b = this;
		var c = [];
		this.tabs.each(function () {
			var e = b.getHash(this);
			var d = b.root.find("#" + e)[0];
			if (d) {
				b.tabMap[e] = this;
				b.panelMap[e] = d;
				c.push(d)
			}
		});
		this.panels = $(c)
	},
	styleTabs: function (b) {
		b = b || self.tabs;
		this.list.addClass("tab-nav");
		$(b).addClass("tab")
	},
	stylePanels: function (b) {
		b = b || self.panels;
		$(b).addClass("tab-panel")
	},
	select: function (e, c) {
		if (typeof e === "undefined") {
			if (!this.tabs.filter(".tab-selected").length) {
				return this.select(this.getHash(this.tabs[0]))
			}
		}
		var d = this.tabMap[e],
		b = this.panelMap[e];
		this.tabs.filter(".tab-selected").removeClass("tab-selected");
		this.panels.filter(".tab-selected").removeClass("tab-selected");
		$([d, b]).addClass("tab-selected");
		this.root.trigger("tabselect", {
			tab: d,
			panel: b
		});
		if (c) {
			safeHashChange(e)
		}
	},
	hashChange: function (b) {
		if (location.hash && _.haskey(this.tabMap, location.hash)) {
			b.preventDefault();
			this.select(location.hash)
		}
	}
};
$.fn.tabify = function () {
	this.each(function () {
		this.tab = new Tabs(this)
	});
	return this
};
var safeHashChange = function (c) {
	var b = $(c);
	b.attr("id", "");
	location.hash = c;
	b.attr("id", c.slice(1))
};
jQuery.cookie = function (c, k, n) {
	if (typeof k != "undefined") {
		n = n || {};
		if (k === null) {
			k = "";
			n.expires = -1
		}
		var f = "";
		if (n.expires && (typeof n.expires == "number" || n.expires.toUTCString)) {
			var g;
			if (typeof n.expires == "number") {
				g = new Date();
				g.setTime(g.getTime() + (n.expires * 24 * 60 * 60 * 1000))
			} else {
				g = n.expires
			}
			f = "; expires=" + g.toUTCString()
		}
		var m = n.path ? "; path=" + (n.path) : "";
		var h = n.domain ? "; domain=" + (n.domain) : "";
		var b = n.secure ? "; secure" : "";
		document.cookie = [c, "=", encodeURIComponent(k), f, m, h, b].join("")
	} else {
		var e = null;
		if (document.cookie && document.cookie != "") {
			var l = document.cookie.split(";");
			for (var j = 0; j < l.length; j++) {
				var d = jQuery.trim(l[j]);
				if (d.substring(0, c.length + 1) == (c + "=")) {
					e = decodeURIComponent(d.substring(c.length + 1));
					break
				}
			}
		}
		return e
	}
};
jQuery.fn.tooltip = function (d) {
	var i = $(d),
	b = $("span", i),
	h = this,
	g = false,
	c,
	f;
	function e() {
		if (!c) {
			return
		}
		var n = c.offset();
		b.text(f.attr("title"));
		f.attr("data-oldtitle", f.attr("title")).attr("title", "");
		var j = i.outerWidth() / 2,
		k = i.outerHeight() - 8,
		m = n.left + c.innerWidth() / 2 - j,
		l = n.top - c.innerHeight() - k - 1;
		g = setTimeout(function () {
			i.css({
				left: m + "px",
				top: l + "px"
			}).show()
		}, 300)
	}
	$(document.body).bind("tooltip_change", e);
	h.live("mouseover", function (j) {
		c = $(this);
		if (c.hasClass("formerror")) {
			i.addClass("error")
		}
		f = c.attr("title") ? c : $("[title]", c).first();
		if (f.length) {
			e()
		}
	}).live("mouseout", function (j) {
		clearTimeout(g);
		i.hide().removeClass("error");
		if (f && f.length) {
			c = $(this);
			f.attr("title", f.attr("data-oldtitle")).attr("data-oldtitle", "")
		}
	})
};
$(document).ready(function () {
	$(".tooltip").tooltip("#tooltip")
});
function makeBlurHideCallback(b) {
	var c = function (d) {
		_root = b.get(0);
		if (d) {
			if (d.type == "click" && _root == d.target || _.indexOf($(d.target).parents(), _root) != -1) {
				return
			}
		}
		b.hideMe()
	};
	return c
}
$.fn.popup = function (f, e) {
	e = e || {};
	var b = $(f),
	d = this;
	d.o = $.extend({
		delegate: false,
		callback: false,
		container: false,
		hideme: true,
		pointTo: false,
		offset: {},
		width: 300
	}, e);
	d.setWidth = function (g) {
		d.css({
			width: g
		});
		return d
	};
	d.setPos = function (h, j) {
		j = j || d.o.offset;
		h = h || d.o.pointTo;
		if (!h) {
			return
		}
		d.detach().appendTo("body");
		var p = $(h),
		n = p.offset(),
		l = p.outerWidth() / 2,
		g = p.outerHeight(),
		i = n.left + l > $("body").outerWidth() / 2,
		k = i ? d.outerWidth() - 84 : 63,
		o = n.left + (j.x || l) - k,
		m = n.top + (j.y || g) + 4;
		d.removeClass("left");
		if (i) {
			d.addClass("left")
		}
		d.css({
			left: o,
			top: m,
			right: "inherit",
			bottom: "inherit",
		});
		d.o.pointTo = h;
		return d
	};
	d.hideMe = function () {
		d.hide();
		d.unbind();
		d.undelegate();
		$(document.body).unbind("click newPopup", d.hider);
		return d
	};
	function c(g) {
		g.preventDefault();
		var h = e.callback ? (e.callback.call(d, {
					click_target: this,
					evt: g
				})) : true;
		d.o = $.extend({
			click_target: this
		}, d.o, h);
		if (h) {
			d.render()
		}
	}
	d.render = function () {
		var g = d.o;
		d.hider = makeBlurHideCallback(d);
		if (g.hideme) {
			setTimeout(function () {
				$(document.body).bind("click popup", d.hider)
			}, 0)
		}
		b.trigger("popup_show", [d]);
		if (g.container && g.container.length) {
			d.detach().appendTo(g.container)
		}
		if (g.pointTo) {
			d.setPos(g.pointTo)
		}
		setTimeout(function () {
			d.show()
		}, 0);
		return d
	};
	if (d.o.delegate) {
		$(d.o.delegate).delegate(f, "click", c)
	} else {
		b.click(c)
	}
	d.setWidth(d.o.width);
	return d
};
$.fn.modal = function (f, e) {
	e = e || {};
	var c = $(f),
	b = this;
	b.o = $.extend({
		delegate: false,
		callback: false,
		onresize: function () {
			b.setPos()
		},
		hideme: true,
		emptyme: false,
		offset: {},
		width: 450
	}, e);
	b.setWidth = function (g) {
		b.css({
			width: g
		});
		return b
	};
	b.setPos = function (h) {
		h = h || b.o.offset;
		b.detach().appendTo("body");
		var i = ($(window).width() - b.outerWidth()) / 2,
		g = ($(window).height() - b.outerHeight()) / 2;
		b.css({
			left: i,
			top: g,
			right: "inherit",
			bottom: "inherit",
			position: "fixed"
		});
		return b
	};
	b.hideMe = function () {
		var g = b.o;
		b.hide();
		b.unbind();
		b.undelegate();
		$(document.body).unbind("click newmodal", b.hider);
		$(window).bind("resize", b.o.onresize);
		$(".modal-overlay").remove();
		if (g.emptyme) {
			b.empty()
		}
		return b
	};
	function d(g) {
		g.preventDefault();
		var h = e.callback ? (e.callback.call(b, {
					click_target: this,
					evt: g
				})) : true;
		b.o = $.extend({
			click_target: this
		}, b.o, h);
		if (h) {
			b.render()
		}
	}
	b.render = function () {
		var g = b.o;
		b.hider = makeBlurHideCallback(b);
		if (g.hideme) {
			setTimeout(function () {
				$(document.body).bind("click modal", b.hider)
			}, 0)
		}
		b.delegate(".close", "click", function (h) {
			h.preventDefault();
			b.hideMe()
		});
		c.trigger("modal_show", [b]);
		if (g.container && g.container.length) {
			b.detach().appendTo(g.container)
		}
		$('<div class="modal-overlay"></div>').appendTo("body");
		b.setPos();
		setTimeout(function () {
			b.show()
		}, 0);
		$(window).bind("resize", g.onresize);
		return b
	};
	if (b.o.delegate) {
		$(b.o.delegate).delegate(f, "click", d)
	} else {
		c.click(d)
	}
	b.setWidth(b.o.width);
	return b
};
function load_unicode() {
	var b = $(document.body);
	b.append("<script src='" + b.attr("data-media-url") + "/js/zamboni/unicode.js'><\/script>")
}
function makeslug(c) {
	var b = new RegExp("[^\\w" + z.unicode_letters + "\\s-]+", "g");
	c = $.trim(c.replace(b, " "));
	c = c.replace(/[-\s]+/g, "-").toLowerCase();
	return c
}
function show_slug_edit(b) {
	$("#slug_readonly").hide();
	$("#slug_edit").show();
	$("#id_slug").focus();
	b.preventDefault()
}
function slugify() {
	if (z == null || z.unicode_letters) {
		var b = $("#id_slug");
		url_customized = b.attr("data-customized") == 0 || !b.attr("data-customized");
		if (url_customized || !b.val()) {
			var c = makeslug($("#id_name").val());
			b.val(c);
			name_val = c;
			$("#slug_value").text(c)
		} else {
			$("#slug_value").text($("#id_slug").val())
		}
	} else {
		load_unicode()
	}
}
(function (b) {
	window.Slideshow = function () {
		this.itemTotal = 0;
		this.currentItem = 1;
		this.itemWidth = 0;
		this.speed = 300;
		this.itemContainer = "";
		this.wrapperElement = "";
		this.wrapperClass = "";
		this.controlsMarkup = "";
		this.leftController = "";
		this.rightContorller = "";
		this.activeClass = "";
		this.container = "";
		this.interval = null;
		this.scroll = true
	};
	Slideshow.prototype.init = function () {
		this.itemTotal = parseInt(b(this.itemContainer + ">li").length, 10);
		if (this.itemTotal <= 1) {
			return
		}
		b(this.itemContainer).wrap("<" + this.wrapperElement + ' class="' + this.wrapperClass + '"></' + this.wrapperElement + ">");
		this.itemWidth = this.getItemWidth();
		b(b(this.itemContainer).parents()[1]).append(this.controlsMarkup);
		b(this.itemContainer + ">li").width(this.itemWidth + "px");
		this.checkControls();
		var c = this;
		b(c.leftController).live("click", function () {
			if (b(this).hasClass(c.activeClass)) {
				c.moveToItem(c.currentItem - 1)
			}
			c.scroll = false;
			return false
		});
		b(c.rightController).live("click", function () {
			if (b(this).hasClass(c.activeClass)) {
				c.moveToItem(c.currentItem + 1)
			}
			c.scroll = false;
			return false
		});
		b(c.container).mouseenter(function () {
			clearInterval(c.interval)
		});
		b(c.container).bind("newPopup", function () {
			clearInterval(c.interval)
		});
		b(c.container).mouseleave(function () {
			c.autoRotate()
		});
		c.autoRotate();
		b(window).resize(function () {
			c.itemWidth = c.getItemWidth();
			b(c.itemContainer + ">li").width(c.itemWidth + "px");
			c.popToItem(c.currentItem)
		})
	};
	Slideshow.prototype.autoRotate = function () {
		if (this.scroll) {
			var c = this;
			clearInterval(this.interval);
			this.interval = setInterval(function () {
				if (c.currentItem != c.itemTotal) {
					c.moveToItem(c.currentItem + 1)
				} else {
					c.moveToItem(1)
				}
			}, 8000)
		}
	};
	Slideshow.prototype.getItemWidth = function () {
		return b(this.itemContainer).parents("." + this.wrapperClass).width()
	};
	Slideshow.prototype.popToItem = function (c) {
		if (!b(this.itemContainer).parents("." + this.wrapperClass + " :animated").length) {
			b(b(this.itemContainer).children("li").get(this.currentItem - 1)).hide();
			b(b(this.itemContainer).children("li").get(c - 1)).show();
			this.currentItem = c;
			this.checkControls()
		}
	};
	Slideshow.prototype.moveToItem = function (d) {
		if (!b(this.itemContainer).parents("." + this.wrapperClass + " :animated").length) {
			var c = b(this.itemContainer).children("li");
			b(c.get(this.currentItem - 1)).fadeOut("fast", function () {
				b(c.get(d - 1)).fadeIn("fast")
			});
			this.currentItem = d;
			this.checkControls()
		}
	};
	Slideshow.prototype.checkControls = function () {
		if (this.currentItem == 1) {
			b(this.leftController).removeClass(this.activeClass)
		} else {
			b(this.leftController).addClass(this.activeClass)
		}
		if (this.currentItem == this.itemTotal) {
			b(this.rightController).removeClass(this.activeClass)
		} else {
			b(this.rightController).addClass(this.activeClass)
		}
	};
	window.DropdownArea = function () {
		this.trigger = null;
		this.target = "";
		this.targetParent = "";
		this.callbackFunction = function () {};
		this.preventDefault = true;
		this.showSpeed = 200;
		this.hideSpeed = 200;
		this.hideOnBodyClick = true
	};
	DropdownArea.prototype.bodyclick = function (c) {
		if (this.bodyWatching && this.hideOnBodyClick) {
			if (!(b(c.target).get(0) == b(this.targetParent).get(0) || b(c.target).parents(this.targetParent).length)) {
				this.hide()
			}
		}
	};
	DropdownArea.prototype.hide = function () {
		var c = this;
		b(c.targetParent).removeClass("expanded");
		b(c.target).slideUp(c.hideSpeed, function () {
			c.bodyWatching = false
		})
	};
	DropdownArea.prototype.show = function () {
		var c = this;
		b(c.targetParent).addClass("expanded");
		b(c.target).slideDown(c.showSpeed, function () {
			c.bodyWatching = true
		})
	};
	DropdownArea.prototype.init = function () {
		var c = this;
		b(this.target).hide();
		if (this.trigger) {
			this.trigger.click(function (d) {
				if (!b(c.target + ":animated").length) {
					if (b(c.target + ":visible").length) {
						c.callbackFunction();
						c.hide()
					} else {
						c.callbackFunction();
						c.show()
					}
				}
				b(c.target).trigger("click");
				return !c.preventDefault
			});
			b("body").bind("click", function (d) {
				c.bodyclick(d)
			})
		}
	};
	window.AmoSlideshow = function () {
		function d() {
			if (b(".teaser-items").hasClass("no-autorotate")) {
				Slideshow.prototype.autoRotate = function () {}
			}
			Slideshow.call(this)
		}
		d.prototype = new Slideshow();
		d.prototype.moveToItem = function (f) {
			Slideshow.prototype.moveToItem.call(this, f);
			b(".section-teaser .teaser-header li").removeClass("selected");
			b(".section-teaser .teaser-header li").eq(f - 1).addClass("selected")
		};
		var e = new d();
		e.itemContainer = ".teaser-items";
		e.wrapperElement = "div";
		e.wrapperClass = "window";
		e.controlsMarkup = ('<p class="slideshow-controls"><a href="#" class="prev" rel="prev">Previous</a><a href="#" class="next" rel="next">Next</a></p>');
		e.leftController = '.section-teaser a[rel="prev"]';
		e.rightController = '.section-teaser a[rel="next"]';
		e.activeClass = "active";
		e.container = ".section-teaser .featured-inner";
		e.init();
		b(".teaser-header").insertBefore(".slideshow-controls");
		var c = b(".section-teaser .teaser-header li a");
		c.click(function () {
			c.parent("li").removeClass("selected");
			b(this).parent("li").addClass("selected");
			e.moveToItem(c.index(this) + 1);
			e.scroll = false;
			return false
		});
		return e
	}
})(jQuery);
jQuery(function (f) {
	f(".item-info li.favorite").click(function () {
		var e = this;
		f(e).addClass("favorite-loading");
		setTimeout(function () {
			f(e).addClass("favorite-added")
		}, 2000)
	});
	f("select[name='rating']").each(function (v, r) {
		var p = f(r),
		u = f("<span class='ratingwidget stars stars-0'></span>"),
		e = [],
		t = function (w) {
			u.removeClass("stars-0 stars-1 stars-2 stars-3 stars-4 stars-5").addClass("stars-" + w)
		};
		for (var o = 1; o <= 5; o++) {
			e.push("<label data-stars='", o, "'>", format(ngettext("{0} star", "{0} stars", o), [o]), "<input type='radio' name='rating' value='", o, "'></label>")
		}
		var q = 0;
		u.click(function (n) {
			var w = f(n.target);
			if (w.val()) {
				t(w.val())
			}
			q = w.val()
		});
		u.mouseover(function (n) {
			var w = f(n.target);
			if (w.attr("data-stars")) {
				t(w.attr("data-stars"))
			}
		});
		u.mouseout(function (n) {
			t(q)
		});
		u.html(e.join(""));
		p.before(u);
		p.detach()
	});
	if (f("#categories").parents(".secondary").length == 0) {
		var g = new DropdownArea();
		f("#categories").addClass("dropdown-categories");
		var l = f("#categories :first-child")[0];
		if (l) {
			var b = f(l);
			b.prepend('<img src="/img/amo2009/icons/category-dropdown-down.gif" alt="" /> ');
			b.each(function () {
				this.onselectstart = function () {
					return false
				};
				this.onmousedown = function () {
					return false
				}
			});
			g.trigger = b;
			g.target = "#categories>ul";
			g.targetParent = "#categories";
			g.callbackFunction = function () {
				if (f("#categories>ul:visible").length) {
					f("#categories img").attr("src", "/img/amo2009/icons/category-dropdown-down.gif")
				} else {
					f("#categories img").attr("src", "/img/amo2009/icons/category-dropdown-up.gif")
				}
			};
			g.init()
		}
	} else {
		var h = f("#categories h3");
		h.html("<span>" + h.text() + "</span>")
	}
	var m = new DropdownArea();
	m.trigger = (f("#advanced-link a"));
	m.target = (".advanced");
	m.targetParent = (".search-form");
	m.hideOnBodyClick = false;
	m.callbackFunction = function () {
		var e = f(this.targetParent).hasClass("expanded") ? "off" : "on";
		f(this.target).find("[name=advanced]").val(e)
	};
	m.init();
	var k = new DropdownArea();
	k.trigger = (f("ul.account .controller"));
	k.target = ("ul.account ul");
	k.targetParent = ("ul.account");
	k.init();
	var i = new DropdownArea();
	i.trigger = (f("ul.tools .controller"));
	i.target = ("ul.tools ul");
	i.targetParent = ("ul.tools");
	i.init();
	var d = new DropdownArea();
	d.trigger = (f("ul.change .controller"));
	d.target = ("ul.change ul");
	d.targetParent = ("ul.change");
	d.init();
	var c = new DropdownArea();
	c.trigger = (f(".notification .toggle-help"));
	c.target = (".notification .toggle-info");
	c.targetParent = (".notification");
	c.init();
	f(".notification a.close").click(function () {
		c.hide();
		return false
	});
	contributions.init();
	f(".home .listing div:first").addClass("interactive");
	function j(e) {
		return function () {
			f(this).parents("ul").find("li").removeClass("selected");
			f(f(this).parents("li")[0]).addClass("selected");
			f(this).parents(".listing").attr("class", "featured listing");
			f(this).parents(".listing").addClass(e);
			return false
		}
	}
	f(".home a[href^='#recommended']").click(j("show-recommended"));
	f(".home a[href^='#popular']").click(j("show-popular"));
	f(".home a[href^='#added']").click(j("show-added"));
	f(".home a[href^='#updated']").click(j("show-updated"))
});
jQuery(function (c) {
	var b = c("form.languages");
	b.find("input").change(function () {
		this.form.submit()
	})
});
jQuery(window).load(function () {
	document.createElement("abbr")
});
$(".hidden").hide();
(function (g) {
	g.fn.jqm = function (f) {
		var e = {
			overlay: 50,
			overlayClass: "jqmOverlay",
			closeClass: "jqmClose",
			trigger: ".jqModal",
			ajax: p,
			ajaxText: "",
			target: p,
			modal: p,
			toTop: p,
			onShow: p,
			onHide: p,
			onLoad: p
		};
		return this.each(function () {
			if (this._jqm) {
				return o[this._jqm].c = g.extend({}, o[this._jqm].c, f)
			}
			q++;
			this._jqm = q;
			o[q] = {
				c: g.extend(e, g.jqm.params, f),
				a: p,
				w: g(this).addClass("jqmID" + q),
				s: q
			};
			if (e.trigger) {
				g(this).jqmAddTrigger(e.trigger)
			}
		})
	};
	g.fn.jqmAddClose = function (f) {
		return n(this, f, "jqmHide")
	};
	g.fn.jqmAddTrigger = function (f) {
		return n(this, f, "jqmShow")
	};
	g.fn.jqmShow = function (e) {
		return this.each(function () {
			e = e || window.event;
			g.jqm.open(this._jqm, e)
		})
	};
	g.fn.jqmHide = function (e) {
		return this.each(function () {
			e = e || window.event;
			g.jqm.close(this._jqm, e)
		})
	};
	g.jqm = {
		hash: {},
		open: function (C, B) {
			var m = o[C],
			v = m.c,
			i = "." + v.closeClass,
			w = (parseInt(m.w.css("z-index"))),
			w = (w > 0) ? w : 3000,
			f = g("<div></div>").css({
				height: "100%",
				width: "100%",
				position: "fixed",
				left: 0,
				top: 0,
				"z-index": w - 1,
				opacity: v.overlay / 100
			});
			if (m.a) {
				return p
			}
			m.t = B;
			m.a = true;
			m.w.css("z-index", w);
			if (v.modal) {
				if (!b[0]) {
					l("bind")
				}
				b.push(C)
			} else {
				if (v.overlay > 0) {
					m.w.jqmAddClose(f)
				} else {
					f = p
				}
			}
			m.o = (f) ? f.addClass(v.overlayClass).prependTo("body") : p;
			if (d) {
				g("html,body").css({
					height: "100%",
					width: "100%"
				});
				if (f) {
					f = f.css({
						position: "absolute"
					})[0];
					for (var x in {
						Top: 1,
						Left: 1
					}) {
						f.style.setExpression(x.toLowerCase(), "(_=(document.documentElement.scroll" + x + " || document.body.scroll" + x + "))+'px'")
					}
				}
			}
			if (v.ajax) {
				var e = v.target || m.w,
				A = v.ajax,
				e = (typeof e == "string") ? g(e, m.w) : g(e),
				A = (A.substr(0, 1) == "@") ? g(B).attr(A.substring(1)) : A;
				e.html(v.ajaxText).load(A, function () {
					if (v.onLoad) {
						v.onLoad.call(this, m)
					}
					if (i) {
						m.w.jqmAddClose(g(i, m.w))
					}
					k(m)
				})
			} else {
				if (i) {
					m.w.jqmAddClose(g(i, m.w))
				}
			}
			if (v.toTop && m.o) {
				m.w.before('<span id="jqmP' + m.w[0]._jqm + '"></span>').insertAfter(m.o)
			}
			(v.onShow) ? v.onShow(m) : m.w.show();
			k(m);
			return p
		},
		close: function (f) {
			var e = o[f];
			if (!e.a) {
				return p
			}
			e.a = p;
			if (b[0]) {
				b.pop();
				if (!b[0]) {
					l("unbind")
				}
			}
			if (e.c.toTop && e.o) {
				g("#jqmP" + e.w[0]._jqm).after(e.w).remove()
			}
			if (e.c.onHide) {
				e.c.onHide(e)
			} else {
				e.w.hide();
				if (e.o) {
					e.o.remove()
				}
			}
			return p
		},
		params: {}
	};
	var q = 0,
	o = g.jqm.hash,
	b = [],
	d = g.browser.msie && (g.browser.version == "6.0"),
	p = false,
	h = g('<iframe src="javascript:false;document.write(\'\');" class="jqm"></iframe>').css({
		opacity: 0
	}),
	k = function (e) {
		if (d) {
			if (e.o) {
				e.o.html('<p style="width:100%;height:100%"/>').prepend(h)
			} else {
				if (!g("iframe.jqm", e.w)[0]) {
					e.w.prepend(h)
				}
			}
		}
		j(e)
	},
	j = function (f) {
		try {
			g(":input:visible", f.w)[0].focus()
		} catch (e) {}
	},
	l = function (e) {
		g()[e]("keypress", c)[e]("keydown", c)[e]("mousedown", c)
	},
	c = function (m) {
		var f = o[b[b.length - 1]],
		i = (!g(m.target).parents(".jqmID" + f.s)[0]);
		if (i) {
			j(f)
		}
		return !i
	},
	n = function (e, f, i) {
		return e.each(function () {
			var m = this._jqm;
			g(f).each(function () {
				if (!this[i]) {
					this[i] = [];
					g(this).click(function () {
						for (var r in {
							jqmShow: 1,
							jqmHide: 1
						}) {
							for (var t in this[r]) {
								if (o[this[r][t]]) {
									o[this[r][t]].w[r](this)
								}
							}
						}
						return p
					})
				}
				this[i].push(m)
			})
		})
	}
})(jQuery);
$(document).ready(function () {
	var e = AmoSlideshow();
	if ($(document.body).hasClass("user-login")) {
		e.moveToItem(2)
	} else {
		var d = "amo_home_promo_seen",
		c = 5,
		b = parseInt($.cookie(d));
		if (!b) {
			b = 0
		}
		if (b >= c) {}
		else {
			$.cookie(d, b + 1, {
				path: "/",
				expires: (new Date()).getTime() + (1000 * 60 * 60 * 24 * 365)
			})
		}
	}
});
$(document).ready(function () {
	var o = $(".trans[data-name=bio]");
	if (o.length) {
		var d = format('[lang="{0}"]', [$("html").attr("lang")]),
		j = '[lang="en-us"]';
		if ($(d, o).length) {
			$(format(":not({0})", [d]), o).hide()
		} else {
			if ($(j, o).length) {
				$(format(":not({0})", [j]), o).hide()
			} else {
				$(":not(:first-child)", o).hide()
			}
		}
	}
	if (!$("#l10n-menu").length) {
		return
	}
	var e = [],
	k = $(".default-locale").attr("href").substring(1),
	c = k,
	h = $("#modal-l10n-unsaved .msg").html(),
	n = $("#modal-l10n-unsaved").modal(),
	i = {};
	$(".primary").delegate(".trans input, .trans textarea", "change keyup paste blur", m);
	$("form").submit(function () {
		$(this).find(".trans .cloned").remove()
	});
	function l(p) {
		p.find(".trans input[lang], .trans textarea[lang]").each(function () {
			var t = $(this),
			q = t.closest(".trans"),
			r = q.attr("data-name") + "_" + t.attr("lang");
			i[r] = t.val()
		})
	}
	function m(v, u) {
		var x = v.originalEvent ? $(this) : $(format("[lang={0}]", [v]), u),
		p = x.closest(".trans"),
		w = v.originalEvent ? x.attr("lang") : v,
		q = $(format("[lang={0}]", [k]), p),
		r = p.attr("data-name") + "_" + w;
		if (!(r in i)) {
			i[r] = x.val()
		}
		if (w != k) {
			if (x.val() == q.val() && x.val().trim().length) {
				x.addClass("cloned")
			} else {
				if (!x.val().trim().length) {
					if (v.originalEvent && v.type == "focusout") {
						x.val(q.val()).addClass("cloned")
					} else {
						x.removeClass("cloned")
					}
				} else {
					x.removeClass("cloned")
				}
			}
		}
		if (i[r] != x.val()) {
			x.addClass("unsaved")
		} else {
			x.removeClass("unsaved")
		}
	}
	var b = $("#locale-popup").popup("#change-locale", {
		pointTo: "#change-locale",
		width: 200,
		callback: function () {
			g();
			$el = $("#existing_locales").empty();
			$("#all_locales li").show();
			$.each(_.without(e, k), function () {
				var p = $(format("#all_locales a[href$={0}]", [this])).parent();
				if (p.length) {
					$el.append("<li>" + p.html() + "</li>");
					p.hide()
				}
			});
			$("#locale-popup").delegate("a", "click", function (r) {
				r.preventDefault();
				$tgt = $(this);
				var p = $tgt.attr("href").substring(1);
				var q = $("form .trans .unsaved");
				if (q.length) {
					n.children(".msg").html(format(h, [$("#change-locale").text()]));
					n.render();
					$("#l10n-save-changes").click(function () {
						var u = $("form:has(.trans .unsaved)");
						var t = u.length;
						var v = 0;
						u.each(function () {
							var w = $(this);
							$.post(w.attr("action"), w.serialize(), function (y) {
								var x = $(y);
								x.find(".errorlist li[data-lang]:not(.l10n)").each(function () {
									var C = $(this),
									B = C.text(),
									A = $(format("#locale-popup [href$={0}]", [C.attr("data-lang")])).first().text();
									C.text(format("{0}: ", [A]) + B).addClass("l10n")
								});
								t--;
								if (x.find(".errorlist").length) {
									w.html(x.html());
									f();
									v++
								} else {
									l(w);
									w.find(".unsaved").removeClass("unsaved");
									w.find(".errorlist").remove()
								}
								if (t < 1) {
									if (v) {
										window.scrollTo(0, $(".errorlist .l10n").closest("form").offset().top);
										$(".errorlist").first().siblings(".trans").find("input:visible, textarea:visible").focus()
									} else {
										f(p)
									}
								}
							})
						});
						n.hideMe()
					});
					$("#l10n-discard-changes").click(function () {
						$(".trans .unsaved").remove();
						f(p);
						n.hideMe()
					});
					$("#l10n-cancel-changes").click(function () {
						n.hideMe()
					})
				} else {
					f(p)
				}
				b.hideMe()
			});
			return true
		}
	});
	function f(p) {
		p = p || c;
		if (c != p) {
			c = p
		}
		if (!_.include(e, p)) {
			e.push(p)
		}
		$("#change-locale").text($(format("#locale-popup [href$={0}]", [p])).first().text());
		$(".trans").each(function () {
			var r = $(this),
			t = r.attr("data-name");
			label = $(format("label[for={0}]", [t]));
			if (!r.children(format("[lang={0}]", [p])).length) {
				var q = r.children(format("[lang={0}]", [k])).clone();
				q.attr("id", format("id_{0}_{1}", [t, p])).addClass("cloned").attr("lang", p).attr("name", [t, p].join("_"));
				r.append(q)
			}
			m(p, r);
			if (label.length) {
				label.children(".locale").remove();
				label.append(format("<span class='locale'>{0}</span>", [$("#change-locale").text()]))
			}
		});
		$(format(".trans [lang!={0}]:visible", [c])).hide();
		$(format(".trans [lang={0}]", [p])).show()
	}
	function g(p) {
		var q = {};
		$(".trans [lang]").each(function () {
			q[$(this).attr("lang")] = true
		});
		e = _.keys(q)
	}
	z.refreshL10n = function () {
		f()
	}
});
$(document).ready(function () {
	if (!$(document.body).hasClass("home")) {
		return
	}
	$("#homepage .listing-header a").click(function (d) {
		d.preventDefault();
		c(this, true)
	});
	function c(e, d) {
		var f = $(e).attr("data-target");
		$(".addon-listing").attr("class", "addon-listing addon-listing-" + f);
		$(".listing-header .selected").removeClass("selected");
		$("#" + f).addClass("selected").focus();
		if (d && history.pushState) {
			history.pushState({
				target: f
			}, document.title, e.href)
		}
	}
	if (location.hash) {
		var b = $("#homepage .listing-header " + location.hash);
		if (b) {
			b.find("a").click().focus()
		}
	} else {
		var b = $("#homepage .listing-header .selected a")[0];
		c(b, true, true)
	}
	$(window).bind("popstate", function (f) {
		var g = f.originalEvent;
		if (g.state && g.state.target) {
			var d = $("#" + g.state.target + " a")[0];
			c(d, false)
		}
	})
});
(function (b) {
	b.fn.lightBox = function (q) {
		q = jQuery.extend({
			overlayBgColor: "#000",
			overlayOpacity: 0.8,
			imageLoading: "images/lightbox-ico-loading.gif",
			imageBtnPrev: "images/lightbox-btn-prev.gif",
			imageBtnNext: "images/lightbox-btn-next.gif",
			imageBtnClose: "images/lightbox-btn-close.gif",
			imageBlank: "images/lightbox-blank.gif",
			containerBorderSize: 10,
			containerResizeSpeed: 400,
			txtImage: "Image",
			txtOf: "of",
			keyToClose: "c",
			keyToPrev: "p",
			keyToNext: "n",
			imageArray: [],
			activeImage: 0
		}, q);
		var j = this;
		function t() {
			p(this, j);
			return false
		}
		function p(x, w) {
			b("embed, object, select").css({
				visibility: "hidden"
			});
			d();
			q.imageArray.length = 0;
			q.activeImage = 0;
			if (w.length == 1) {
				q.imageArray.push(new Array(x.getAttribute("href"), x.getAttribute("title")))
			} else {
				for (var v = 0; v < w.length; v++) {
					q.imageArray.push(new Array(w[v].getAttribute("href"), w[v].getAttribute("title")))
				}
			}
			while (q.imageArray[q.activeImage][0] != x.getAttribute("href")) {
				q.activeImage++
			}
			m()
		}
		function d() {
			b("body").append('<div id="jquery-overlay"></div><div id="jquery-lightbox"><div id="lightbox-container-image-box"><div id="lightbox-container-image"><img id="lightbox-image"><div style="" id="lightbox-nav"><a href="#" id="lightbox-nav-btnPrev"></a><a href="#" id="lightbox-nav-btnNext"></a></div><div id="lightbox-loading"><a href="#" id="lightbox-loading-link"><img src="' + q.imageLoading + '"></a></div></div></div><div id="lightbox-container-image-data-box"><div id="lightbox-container-image-data"><div id="lightbox-image-details"><span id="lightbox-image-details-caption"></span><span id="lightbox-image-details-currentNumber"></span></div><div id="lightbox-secNav"><a href="#" id="lightbox-secNav-btnClose"><img src="' + q.imageBtnClose + '"></a></div></div></div></div>');
			var v = g();
			b("#jquery-overlay").css({
				backgroundColor: q.overlayBgColor,
				opacity: q.overlayOpacity,
				width: v[0],
				height: v[1]
			}).fadeIn();
			var w = i();
			b("#jquery-lightbox").css({
				top: w[1] + (v[3] / 10),
				left: w[0]
			}).show();
			b("#jquery-overlay,#jquery-lightbox").click(function () {
				c()
			});
			b("#lightbox-loading-link,#lightbox-secNav-btnClose").click(function () {
				c();
				return false
			});
			b(window).resize(function () {
				var x = g();
				b("#jquery-overlay").css({
					width: x[0],
					height: x[1]
				});
				var y = i();
				b("#jquery-lightbox").css({
					top: y[1] + (x[3] / 10),
					left: y[0]
				})
			})
		}
		function m() {
			b("#lightbox-loading").show();
			b("#lightbox-image,#lightbox-nav,#lightbox-nav-btnPrev,#lightbox-nav-btnNext,#lightbox-container-image-data-box,#lightbox-image-details-currentNumber").hide();
			var v = new Image();
			v.onload = function () {
				b("#lightbox-image").attr("src", q.imageArray[q.activeImage][0]);
				k(v.width, v.height);
				v.onload = function () {}
			};
			v.src = q.imageArray[q.activeImage][0]
		}
		function k(y, C) {
			var v = b("#lightbox-container-image-box").width();
			var B = b("#lightbox-container-image-box").height();
			var A = (y + (q.containerBorderSize * 2));
			var x = (C + (q.containerBorderSize * 2));
			var w = v - A;
			var D = B - x;
			b("#lightbox-container-image-box").animate({
				width: A,
				height: x
			}, q.containerResizeSpeed, function () {
				h()
			});
			if ((w == 0) && (D == 0)) {
				if (b.browser.msie) {
					o(250)
				} else {
					o(100)
				}
			}
			b("#lightbox-nav-btnPrev,#lightbox-nav-btnNext").css({
				height: C + (q.containerBorderSize * 2)
			});
			b("#lightbox-container-image-data-box").css({
				width: y
			})
		}
		function h() {
			b("#lightbox-loading").hide();
			b("#lightbox-image").fadeIn(function () {
				l();
				u()
			});
			r()
		}
		function l() {
			b("#lightbox-container-image-data-box").slideDown("fast");
			b("#lightbox-image-details-caption").hide();
			if (q.imageArray[q.activeImage][1]) {
				b("#lightbox-image-details-caption").html(q.imageArray[q.activeImage][1]).show()
			}
			if (q.imageArray.length > 1) {
				b("#lightbox-image-details-currentNumber").html(q.txtImage + " " + (q.activeImage + 1) + " " + q.txtOf + " " + q.imageArray.length).show()
			}
		}
		function u() {
			b("#lightbox-nav").show();
			b("#lightbox-nav-btnPrev,#lightbox-nav-btnNext").css({
				background: "transparent url(" + q.imageBlank + ") no-repeat"
			});
			if (q.activeImage != 0) {
				b("#lightbox-nav-btnPrev").unbind().hover(function () {
					b(this).css({
						background: "url(" + q.imageBtnPrev + ") left 45% no-repeat"
					})
				}, function () {
					b(this).css({
						background: "transparent url(" + q.imageBlank + ") no-repeat"
					})
				}).show().bind("click", function () {
					q.activeImage = q.activeImage - 1;
					m();
					return false
				})
			}
			if (q.activeImage != (q.imageArray.length - 1)) {
				b("#lightbox-nav-btnNext").unbind().hover(function () {
					b(this).css({
						background: "url(" + q.imageBtnNext + ") right 45% no-repeat"
					})
				}, function () {
					b(this).css({
						background: "transparent url(" + q.imageBlank + ") no-repeat"
					})
				}).show().bind("click", function () {
					q.activeImage = q.activeImage + 1;
					m();
					return false
				})
			}
			n()
		}
		function n() {
			b(document).keydown(function (v) {
				e(v)
			})
		}
		function f() {
			b(document).unbind()
		}
		function e(v) {
			if (v == null) {
				keycode = event.keyCode;
				escapeKey = 27
			} else {
				keycode = v.keyCode;
				escapeKey = v.DOM_VK_ESCAPE
			}
			key = String.fromCharCode(keycode).toLowerCase();
			if ((key == q.keyToClose) || (key == "x") || (keycode == escapeKey)) {
				c()
			}
			if ((key == q.keyToPrev) || (keycode == 37)) {
				if (q.activeImage != 0) {
					q.activeImage = q.activeImage - 1;
					m();
					f()
				}
			}
			if ((key == q.keyToNext) || (keycode == 39)) {
				if (q.activeImage != (q.imageArray.length - 1)) {
					q.activeImage = q.activeImage + 1;
					m();
					f()
				}
			}
		}
		function r() {
			if ((q.imageArray.length - 1) > q.activeImage) {
				objNext = new Image();
				objNext.src = q.imageArray[q.activeImage + 1][0]
			}
			if (q.activeImage > 0) {
				objPrev = new Image();
				objPrev.src = q.imageArray[q.activeImage - 1][0]
			}
		}
		function c() {
			b("#jquery-lightbox").remove();
			b("#jquery-overlay").fadeOut(function () {
				b("#jquery-overlay").remove()
			});
			b("embed, object, select").css({
				visibility: "visible"
			})
		}
		function g() {
			var x,
			v;
			if (window.innerHeight && window.scrollMaxY) {
				x = window.innerWidth + window.scrollMaxX;
				v = window.innerHeight + window.scrollMaxY
			} else {
				if (document.body.scrollHeight > document.body.offsetHeight) {
					x = document.body.scrollWidth;
					v = document.body.scrollHeight
				} else {
					x = document.body.offsetWidth;
					v = document.body.offsetHeight
				}
			}
			var w,
			y;
			if (self.innerHeight) {
				if (document.documentElement.clientWidth) {
					w = document.documentElement.clientWidth
				} else {
					w = self.innerWidth
				}
				y = self.innerHeight
			} else {
				if (document.documentElement && document.documentElement.clientHeight) {
					w = document.documentElement.clientWidth;
					y = document.documentElement.clientHeight
				} else {
					if (document.body) {
						w = document.body.clientWidth;
						y = document.body.clientHeight
					}
				}
			}
			if (v < y) {
				pageHeight = y
			} else {
				pageHeight = v
			}
			if (x < w) {
				pageWidth = x
			} else {
				pageWidth = w
			}
			arrayPageSize = new Array(pageWidth, pageHeight, w, y);
			return arrayPageSize
		}
		function i() {
			var w,
			v;
			if (self.pageYOffset) {
				v = self.pageYOffset;
				w = self.pageXOffset
			} else {
				if (document.documentElement && document.documentElement.scrollTop) {
					v = document.documentElement.scrollTop;
					w = document.documentElement.scrollLeft
				} else {
					if (document.body) {
						v = document.body.scrollTop;
						w = document.body.scrollLeft
					}
				}
			}
			arrayPageScroll = new Array(w, v);
			return arrayPageScroll
		}
		function o(x) {
			var w = new Date();
			v = null;
			do {
				var v = new Date()
			} while (v - w < x)
		}
		return this.unbind("click").click(t)
	}
})(jQuery);
var GSFN;
if (GSFN == undefined) {
	GSFN = {}
}
if (!GSFN.initialized) {
	GSFN.gId = function (b) {
		return document.getElementById(b)
	};
	GSFN.hasClassName = function (b, c) {
		var d = b.className;
		return (d.length > 0 && (d == c || new RegExp("(^|\\s)" + c + "(\\s|$)").test(d)))
	};
	GSFN.addClassName = function (b, c) {
		if (!GSFN.hasClassName(b, c)) {
			b.className += (b.className ? " " : "") + c
		}
		return b
	};
	GSFN.removeClassName = function (b, c) {
		var d = GSFN.strip(b.className.replace(new RegExp("(^|\\s+)" + c + "(\\s+|$)"), " "));
		b.className = d;
		return b
	};
	GSFN.strip = function (b) {
		return b.replace(/^\s+/, "").replace(/\s+$/, "")
	};
	GSFN.add_css = function (d) {
		var b = document.getElementsByTagName("head")[0];
		var c = document.createElement("style");
		c.type = "text/css";
		if (c.styleSheet) {
			c.styleSheet.cssText = d
		} else {
			rules = document.createTextNode(d);
			c.appendChild(rules)
		}
		b.appendChild(c)
	};
	GSFN.initialized = true
}
GSFN.feedback_widget = function (e) {
	this.options = e;
	this.is_ssl = ("https:" == document.location.protocol);
	if (!this.options.display) {
		this.options.display = "overlay"
	}
	if (this.is_ssl) {
		this.feedback_base_url = this.local_ssl_base_url;
		this.asset_base_url = this.s3_ssl_base_url
	} else {
		this.feedback_base_url = this.local_base_url;
		this.asset_base_url = this.s3_base_url
	}
	if (this.options.local_assets == true) {
		this.asset_base_url = this.feedback_base_url
	}
	var d = this.options.auto_tag == false;
	query_string_obj = [];
	if (!d) {
		if (this.options.product) {
			query_string_obj.push("product=" + encodeURIComponent(this.options.product))
		}
		if (this.options.tag) {
			query_string_obj.push("tag=" + encodeURIComponent(this.options.tag))
		}
		if (this.options.user_defined_code) {
			query_string_obj.push("user_defined_code=" + encodeURIComponent(this.options.user_defined_code))
		}
	}
	if (this.options.display) {
		query_string_obj.push("display=" + encodeURIComponent(this.options.display))
	}
	if (this.options.style) {
		query_string_obj.push("style=" + encodeURIComponent(this.options.style))
	}
	if (this.options.popular_topics) {
		query_string_obj.push("popular_topics=" + encodeURIComponent(this.options.popular_topics))
	}
	if (this.options.limit) {
		query_string_obj.push("limit=" + encodeURIComponent(this.options.limit))
	}
	if (this.options.problem) {
		query_string_obj.push("problem=" + encodeURIComponent(this.options.problem))
	}
	if (this.options.powered_by) {
		query_string_obj.push("powered_by=" + encodeURIComponent(this.options.powered_by))
	}
	if (this.options.custom_css) {
		query_string_obj.push("custom_css=" + encodeURIComponent(this.options.custom_css))
	}
	if (this.options.auto_tag == false) {
		query_string_obj.push("auto_tag=" + encodeURIComponent(this.options.auto_tag))
	}
	if (this.options.interstitial) {
		query_string_obj.push("interstitial=" + encodeURIComponent(this.options.interstitial))
	}
	if (this.options.community_base_url) {
		query_string_obj.push("community_base_url=" + encodeURIComponent(this.options.community_base_url))
	}
	query_string = "?" + query_string_obj.join("&");
	this.feedback_url = this.feedback_base_url + "/" + this.options.company + "/feedback/topics/new" + query_string;
	this.options = e ? e : {};
	this.options.placement = this.options.placement ? this.options.placement : "left";
	this.options.color = this.options.color ? this.options.color : "#222";
	if (this.options.display == "overlay") {
		this.initial_iframe_url = this.empty_url();
		if (!this.options.width) {
			this.options.width = "658px"
		}
		if (!this.options.height) {
			this.options.height = "100%"
		}
	} else {
		this.initial_iframe_url = this.feedback_url;
		if (!this.options.width) {
			this.options.width = "100%"
		}
		if (!this.options.height) {
			this.options.height = "500px"
		}
	}
	this.iframe_html = '<iframe id="fdbk_iframe" allowTransparency="true" scrolling="no" frameborder="0" class="loading" src="' + this.initial_iframe_url + '" width="' + this.options.width + '" height="' + this.options.height + '" style="width: ' + this.options.width + "; height: " + this.options.height + ';"></iframe>';
	this.tab_html = '<a href="#" id="fdbk_tab" class="fdbk_tab_' + this.options.placement + '" style="background-color:' + this.options.color + '">FEEDBACK</a>';
	this.overlay_html = '<div id="fdbk_overlay" style="display:none"><div id="fdbk_container"><a href="#" id="fdbk_close"></a>' + this.iframe_html + '</div><div id="fdbk_screen"></div></div>';
	if (this.options.display == "overlay") {
		raw_css = "#fdbk_overlay {\n  width: 100%;\n  height: 100%;\n  top: 0;\n  left: 0;\n  z-index: 1000000;\n  position: absolute; }\n\n#fdbk_screen {\n  top: 0;\n  left: 0;\n  z-index: 1;\n  width: 100%;\n  position: absolute;\n  background-color: #000;\n  opacity: 0.45;\n  -moz-opacity: 0.45;\n  filter: alpha(opacity=45); }\n\n#fdbk_container {\n  width: 680px;\n  height: 640px;\n  margin: 0 auto;\n  z-index: 2;\n  position: relative; }\n  #fdbk_container iframe {\n    width: 658px;\n    height: 100%;\n    margin: 20px;\n    background: transparent; }\n  #fdbk_container iframe.loading {\n    background: transparent url(https://s3.amazonaws.com/getsatisfaction.com/images/fb_loading.png) no-repeat; }\n\na#fdbk_tab {\n  top: 25%;\n  left: 0;\n  width: 42px;\n  height: 102px;\n  color: #FFF;\n  cursor: pointer;\n  text-indent: -100000px;\n  overflow: hidden;\n  position: fixed;\n  z-index: 100000;\n  margin-left: -7px;\n  background-image: url(https://s3.amazonaws.com/getsatisfaction.com/images/feedback_trans_tab.png);\n  _position: absolute;\n  _background-image: url(https://s3.amazonaws.com/getsatisfaction.com/images/feedback_tab_ie6.png); }\n  a#fdbk_tab:hover {\n    margin-left: -4px; }\n\na.fdbk_tab_right {\n  right: 0 !important;\n  left: auto !important;\n  margin-right: 0 !important;\n  margin-left: auto !important;\n  width: 35px !important; }\n  a.fdbk_tab_right:hover {\n    width: 38px !important;\n    margin-right: 0 !important;\n    margin-left: auto !important; }\n\na.fdbk_tab_bottom {\n  top: auto!important;\n  bottom: 0 !important;\n  left: 20% !important;\n  height: 38px !important;\n  width: 102px !important;\n  background-position: 0 -102px !important;\n  margin-bottom: -7px !important;\n  margin-left: auto !important; }\n  a.fdbk_tab_bottom:hover {\n    margin-bottom: -4px !important;\n    margin-left: auto !important; }\n\na.fdbk_tab_hidden {\n  display: none !important; }\n\na#fdbk_close {\n  position: absolute;\n  cursor: pointer;\n  outline: none;\n  top: 0;\n  left: 0;\n  z-index: 4;\n  width: 42px;\n  height: 42px;\n  overflow: hidden;\n  background-image: url(https://s3.amazonaws.com/getsatisfaction.com/images/feedback-close.png);\n  _background: none;\n  _filter: progid:DXImageTransform.Microsoft.AlphaImageLoader(src='https://s3.amazonaws.com/getsatisfaction.com/images/feedback-close.png', sizingMethod='crop'); }\n  a#fdbk_close:hover {\n    background-position: -42px 0; }\n\n.feedback_tab_on embed, .feedback_tab_on select, .feedback_tab_on object {\n  visibility: hidden; }\n";
		replacer_regex = new RegExp(this.s3_ssl_base_url, "g");
		translated_css = raw_css.replace(replacer_regex, this.asset_base_url);
		GSFN.add_css(translated_css);
		if (this.options.container) {
			var c = GSFN.gId(this.options.container);
			c.innerHTML = this.tab_html + this.overlay_html
		} else {
			document.write(this.tab_html);
			document.write(this.overlay_html)
		}
		var b = this;
		GSFN.gId("fdbk_tab").onclick = function () {
			b.show();
			return false
		};
		GSFN.gId("fdbk_close").onclick = function () {
			b.hide();
			return false
		};
		GSFN.gId("fdbk_iframe").setAttribute("src", this.empty_url())
	} else {
		if (this.options.container) {
			var c = GSFN.gId(this.options.container);
			c.innerHTML = this.iframe_html
		} else {
			document.write(this.iframe_html)
		}
	}
};
GSFN.feedback_widget.prototype = {
	local_base_url: "http://getsatisfaction.com",
	local_ssl_base_url: "https://getsatisfaction.com",
	s3_base_url: "http://s3.amazonaws.com/getsatisfaction.com",
	s3_ssl_base_url: "https://s3.amazonaws.com/getsatisfaction.com",
	asset_url: function (b) {
		return this.asset_base_url + b
	},
	empty_url: function () {
		return this.asset_url("/images/transparent.gif")
	},
	set_position: function () {
		this.scroll_top = document.documentElement.scrollTop || document.body.scrollTop;
		this.scroll_height = document.documentElement.scrollHeight;
		this.client_height = window.innerHeight || document.documentElement.clientHeight;
		GSFN.gId("fdbk_screen").style.height = this.scroll_height + "px";
		GSFN.gId("fdbk_container").style.top = this.scroll_top + (this.client_height * 0.1) + "px"
	},
	show: function () {
		GSFN.gId("fdbk_iframe").setAttribute("src", this.feedback_url);
		if (GSFN.gId("fdbk_iframe").addEventListener) {
			GSFN.gId("fdbk_iframe").addEventListener("load", this.loaded, false)
		} else {
			if (GSFN.gId("fdbk_iframe").attachEvent) {
				GSFN.gId("fdbk_iframe").attachEvent("onload", this.loaded)
			}
		}
		this.set_position();
		GSFN.addClassName(document.getElementsByTagName("html")[0], "feedback_tab_on");
		GSFN.gId("fdbk_overlay").style.display = "block"
	},
	hide: function () {
		if (GSFN.gId("fdbk_iframe").addEventListener) {
			GSFN.gId("fdbk_iframe").removeEventListener("load", this.loaded, false)
		} else {
			if (GSFN.gId("fdbk_iframe").attachEvent) {
				GSFN.gId("fdbk_iframe").detachEvent("onload", this.loaded)
			}
		}
		GSFN.gId("fdbk_overlay").style.display = "none";
		GSFN.gId("fdbk_iframe").setAttribute("src", this.empty_url());
		GSFN.gId("fdbk_iframe").className = "loading";
		GSFN.removeClassName(document.getElementsByTagName("html")[0], "feedback_tab_on")
	},
	loaded: function () {
		GSFN.gId("fdbk_iframe").className = "loaded"
	}
};
$(document).ready(function () {
	$("#contribute-why").popup("#contribute-more-info", {
		pointTo: "#contribute-more-info"
	});
	$("canvas.pledge-o-meter").thermometer()
});
$(document).ready(function () {
	$(".performance-note .popup").each(function (g, j) {
		var f = $(j),
		h = f.siblings("a").first();
		f.removeClass("hidden").popup(h, {
			width: 300,
			pointTo: h
		})
	});
	var c = $("fieldset.abuse");
	if (c.find("legend a").length) {
		c.find("ol").hide();
		c.find("legend a").click(function () {
			c.find("ol").slideToggle("fast");
			return false
		});
		c.find("button[type=reset]").click(function () {
			c.find("ol").slideToggle("fast")
		})
	}
	if ($("#addon.primary").length == 0) {
		return
	}
	var d = z.media_url + "img/jquery-lightbox/";
	$("a[rel=jquery-lightbox]").lightBox({
		overlayOpacity: 0.6,
		imageBlank: d + "lightbox-blank.gif",
		imageLoading: d + "lightbox-ico-loading.gif",
		imageBtnClose: d + "close.png",
		imageBtnPrev: d + "goleft.png",
		imageBtnNext: d + "goright.png",
		containerResizeSpeed: 350
	});
	var e = $("#addons-display-review-etiquette").hide();
	$("#short-review").focus(function () {
		e.show("fast")
	});
	var b = $("#addon-summary #no-restart");
	if (b.length && z.browser.firefox && (new VersionCompare()).compareVersions(z.browserVersion, "4.0a1") > 0) {
		b.show()
	}
});
$(document).ready(function () {
	var c = $("#feedback_btn");
	if (!c.length) {
		return
	}
	var b = {};
	b.display = "overlay";
	b.company = c.attr("data-company");
	b.placement = "hidden";
	b.color = "#222";
	b.style = "question";
	b.container = "get_satisfaction_container";
	if (c.attr("data-product")) {
		b.product = c.attr("data-product")
	}
	var d = new GSFN.feedback_widget(b);
	$("#fdbk_overlay").prependTo("body");
	c.click(function (f) {
		f.preventDefault();
		d.show()
	})
});
$(document).ready(function () {
	var b = $(".review-reason").html();
	$(".review-reason").popup(".flag-review", {
		delegate: $(document.body),
		width: "inherit",
		callback: function (e) {
			var d = $(e.click_target),
			f = this;
			function c(g, h) {
				$.ajax({
					type: "POST",
					url: d.attr("href"),
					data: {
						flag: g,
						note: h
					},
					success: function () {
						f.removeClass("other").hideMe();
						d.replaceWith(gettext("Flagged for review"))
					},
					error: function () {},
					dataType: "json"
				})
			}
			f.delegate("li a", "click", function (h) {
				h.preventDefault();
				var g = $(h.target);
				if (g.attr("href") == "#review_flag_reason_other") {
					f.addClass("other").delegate("form", "submit", function (j) {
						j.preventDefault();
						var i = f.find("#id_note").val();
						if (!i) {
							alert(gettext("Your input is required"))
						} else {
							c("review_flag_reason_other", i)
						}
					}).setPos(d).find("input[type=text]").focus()
				} else {
					c(g.attr("href").slice(1))
				}
			});
			f.html(b);
			return {
				pointTo: d
			}
		}
	});
	$(".primary").delegate(".review-edit", "click", function (i) {
		i.preventDefault();
		var c = $("#review-edit-form"),
		d = $(this).parents(".review"),
		g = d.attr("data-rating"),
		f = $("a.permalink", d).attr("href") + "edit";
		$cancel = $("#review-edit-cancel");
		d.attr("action", f);
		c.detach().insertAfter(d);
		$("#id_title").val(d.children("h5").text());
		$(".ratingwidget input:radio[value=" + g + "]", c).click();
		$("#id_body").val(d.children("p.review-body").text());
		d.hide();
		c.show();
		function h() {
			c.unbind().hide();
			d.show();
			$cancel.unbind()
		}
		$cancel.click(function (j) {
			j.preventDefault();
			h()
		});
		c.submit(function (j) {
			j.preventDefault();
			$.ajax({
				type: "POST",
				url: f,
				data: c.serialize(),
				success: function (k, e) {
					d.children("h5").text($("#id_title").val());
					g = $(".ratingwidget input:radio:checked", c).val();
					$(".stars", d).removeClass("stars-0 stars-1 stars-2 stars-3 stars-4 stars-5").addClass("stars-" + g);
					g = d.attr("data-rating", g);
					d.children("p.review-body").text($("#id_body").val());
					h()
				},
				dataType: "json"
			});
			return false
		})
	});
	$(".delete-review").click(function (d) {
		d.preventDefault();
		var c = $(d.target);
		$.post(c.attr("href"), function () {
			c.replaceWith(gettext("Marked for deletion"))
		});
		c.closest(".review").addClass("deleted")
	})
});
(function (b) {
	b.fn.hoverIntent = function (l, k) {
		var m = {
			sensitivity: 7,
			interval: 100,
			timeout: 0
		};
		m = b.extend(m, k ? {
			over: l,
			out: k
		} : l);
		var o,
		n,
		i,
		e;
		var h = function (f) {
			o = f.pageX;
			n = f.pageY
		};
		var d = function (g, f) {
			f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
			if ((Math.abs(i - o) + Math.abs(e - n)) < m.sensitivity) {
				b(f).unbind("mousemove", h);
				f.hoverIntent_s = 1;
				return m.over.apply(f, [g])
			} else {
				i = o;
				e = n;
				f.hoverIntent_t = setTimeout(function () {
					d(g, f)
				}, m.interval)
			}
		};
		var j = function (g, f) {
			f.hoverIntent_t = clearTimeout(f.hoverIntent_t);
			f.hoverIntent_s = 0;
			return m.out.apply(f, [g])
		};
		var c = function (r) {
			var q = (r.type == "mouseover" ? r.fromElement : r.toElement) || r.relatedTarget;
			while (q && q != this) {
				try {
					q = q.parentNode
				} catch (r) {
					q = this
				}
			}
			if (q == this) {
				return false
			}
			var g = jQuery.extend({}, r);
			var f = this;
			if (f.hoverIntent_t) {
				f.hoverIntent_t = clearTimeout(f.hoverIntent_t)
			}
			if (r.type == "mouseover") {
				i = g.pageX;
				e = g.pageY;
				b(f).bind("mousemove", h);
				if (f.hoverIntent_s != 1) {
					f.hoverIntent_t = setTimeout(function () {
						d(g, f)
					}, m.interval)
				}
			} else {
				b(f).unbind("mousemove", h);
				if (f.hoverIntent_s == 1) {
					f.hoverIntent_t = setTimeout(function () {
						j(g, f)
					}, m.timeout)
				}
			}
		};
		return this.mouseover(c).mouseout(c)
	}
})(jQuery);
$(document).ready(function () {
	var b = $(".persona-preview");
	if (!b.length) {
		return
	}
	b.previewPersona(true)
});
function dispatchPersonaEvent(k, c) {
	var d = {
		PreviewPersona: "PreviewBrowserTheme",
		ResetPersona: "ResetBrowserThemePreview",
		SelectPersona: "InstallBrowserTheme"
	};
	try {
		if (!c.hasAttribute("data-browsertheme")) {
			return
		}
		$(c).attr("persona", $(c).attr("data-browsertheme"));
		var j = d[k];
		var l = [k, j];
		for (var g = 0; g < l.length; g++) {
			var b = l[g];
			var f = document.createEvent("Events");
			f.initEvent(b, true, false);
			c.dispatchEvent(f)
		}
	} catch (h) {}
}
$.fn.previewPersona = function (b) {
	if (b) {
		$(this).click(function (c) {
			dispatchPersonaEvent("ResetPersona", c.originalTarget)
		})
	}
	$(this).hoverIntent({
		interval: 100,
		over: function (c) {
			$(this).closest(".persona").addClass("persona-hover");
			dispatchPersonaEvent("PreviewPersona", c.originalTarget)
		},
		out: function (c) {
			$(this).closest(".persona").removeClass("persona-hover");
			dispatchPersonaEvent("ResetPersona", c.originalTarget)
		}
	})
};
$.fn.personasButton = function (c) {
	var b = $(this).closest(".persona");
	b.hoverIntent({
		interval: 100,
		over: function (d) {
			dispatchPersonaEvent("PreviewPersona", d.currentTarget)
		},
		out: function (d) {
			dispatchPersonaEvent("ResetPersona", d.currentTarget)
		}
	});
	b.click(function (d) {
		dispatchPersonaEvent("SelectPersona", d.currentTarget);
		return false
	})
};
$.hasPersonas = function () {
	if (!jQuery.browser.mozilla) {
		return false
	}
	var f = new VersionCompare();
	if (f.compareVersions($.browser.version, "1.9.2") > -1) {
		return true
	}
	var b = document.getElementsByTagName("body")[0];
	try {
		var c = document.createEvent("Events");
		c.initEvent("CheckPersonas", true, false);
		b.dispatchEvent(c)
	} catch (d) {}
	return b.getAttribute("personas") == "true"
};
function VerticalCarousel(b) {
	this.container = $(b);
	this.currentPage = 1;
	this.items = this.container.find("> li");
	this.numItems = this.items.length;
	this.singleHeight = $(this.items[0]).height();
	this.numVisible = 4;
	this.numPages = Math.ceil(this.numItems / this.numVisible);
	this.prevButton = $("<a class='arrow prev'>^</a>");
	this.nextButton = $("<a class='arrow next'>></a>");
	this.container.before(this.prevButton);
	this.container.after(this.nextButton);
	this.interval = false;
	function d(e, f) {
		return new Array(f + 1).join(e)
	}
	var c = this.numItems % this.numVisible;
	if (c > 0) {
		this.container.append(d('<li style="height:' + this.singleHeight + 'px" class="empty" />', c));
		this.items = this.container.find("> li")
	}
	this.items.filter(":first").before(this.items.slice(-this.numVisible).clone().addClass("cloned"));
	this.items.filter(":last").after(this.items.slice(0, this.numVisible).clone().addClass("cloned"));
	this.items = this.container.find("> li");
	this.container.scrollTop(this.singleHeight * this.numVisible)
}
VerticalCarousel.prototype.gotoPage = function (d) {
	var b = d < this.currentPage ? -1 : 1,
	f = Math.abs(this.currentPage - d),
	e = this.singleHeight * b * this.numVisible * f,
	c = this;
	if (this.container) {
		this.container.filter(":not(:animated)").animate({
			scrollTop: "+=" + e
		}, 500, function () {
			if (!c.container) {
				return false
			}
			if (d == 0) {
				c.container.scrollTop(c.singleHeight * c.numVisible * c.numPages);
				d = c.numPages
			} else {
				if (d > c.numPages) {
					c.container.scrollTop(c.singleHeight * c.numVisible);
					d = 1
				}
			}
			c.currentPage = d
		})
	}
	return false
};
VerticalCarousel.prototype.autoAdvance = function () {
	clearInterval(this.interval);
	var b = this;
	this.interval = setInterval(function () {
		b.gotoPage(b.currentPage + 1)
	}, 5000)
};
VerticalCarousel.prototype.pause = function () {
	clearInterval(this.interval);
	clearTimeout(this.interval)
};
VerticalCarousel.prototype.init = function () {
	var d = this;
	this.prevButton.click(function (f) {
		d.gotoPage(d.currentPage - 1)
	});
	this.nextButton.click(function (f) {
		d.gotoPage(d.currentPage + 1)
	});
	function b(f) {
		d.pause()
	}
	function c(f) {
		d.interval = setTimeout(function () {
			d.autoAdvance()
		}, 1000)
	}
	this.prevButton.mouseenter(b);
	this.nextButton.mouseenter(b);
	this.container.mouseenter(b);
	this.prevButton.mouseleave(c);
	this.nextButton.mouseleave(c);
	this.container.mouseleave(c);
	this.autoAdvance()
};
$(document).ready(function () {
	(new VerticalCarousel($(".personas-slider"))).init()
});
var collections = {};
(function () {
	RECENTLY_VIEWED_LIMIT = 5;
	jQuery.extend({
		keys: function (g) {
			var f = [];
			$.each(g, function (h) {
				f.push(h)
			});
			return f
		},
		values: function (g) {
			var f = [];
			$.each(g, function (i, h) {
				f.push(h)
			});
			return f
		},
		items: function (g) {
			var f = [];
			$.each(g, function (i, h) {
				f.push([i, h])
			});
			return f
		},
		fmap: function (f, h) {
			var g = [];
			$.each(f, function (i, j) {
				g.push(h(j, i))
			});
			return g
		},
		dict: function (f) {
			var g = {};
			$.each(f, function (h, j) {
				g[j[0]] = j[1]
			});
			return g
		}
	});
	var e = function (g, f) {
		if (f === undefined) {
			var f = function (j) {
				return j
			}
		}
		var i = {};
		$.each(g.reverse(), function (j, k) {
			i[f(k)] = [j, k]
		});
		var h = $.values(i).sort(function (k, j) {
			return k[0] - j[0]
		});
		return $.fmap(h.reverse(), function (j) {
			return j[1]
		})
	};
	RecentlyViewed = function (f) {
		var g = {
			limit: 10,
			storageKey: "recently-viewed",
			uniqueFunc: function (h) {
				return h[1]
			}
		};
		$.extend(this, g, f)
	};
	RecentlyViewed.prototype = {
		add: function (g) {
			var f = this._list();
			f.push([Date.parse(new Date()), g]);
			f.sort(function (i, h) {
				return h[0] - i[0]
			});
			f = e(f, this.uniqueFunc);
			return this._save(f)
		},
		list: function () {
			return $.fmap(this._list(), function (f) {
				return f[1]
			})
		},
		_save: function (f) {
			f = f.slice(0, this.limit);
			localStorage[this.storageKey] = JSON.stringify(f);
			return f
		},
		_list: function () {
			var f = localStorage[this.storageKey];
			if (f === null || f === undefined) {
				return []
			} else {
				return JSON.parse(f)
			}
		},
		clear: function () {
			delete localStorage[this.storageKey]
		}
	};
	collections.recently_viewed = function () {
		try {
			if (!window.localStorage) {
				return
			}
		} catch (g) {
			return
		}
		var k = new RecentlyViewed({
			storageKey: "recently-viewed-collections",
			uniqueFunc: function (m) {
				return m[1].uuid
			}
		});
		var h = $("#add-to-recents");
		if (h.size()) {
			var l = $.dict($.fmap(["disp", "url", "uuid"], function (m) {
						return [m, $.trim(h.attr("data-" + m))]
					}));
			var i = l.uuid;
			k.add(l)
		} else {
			var i = ""
		}
		var j = $.map(k.list(), function (m) {
			if (m.uuid != i) {
				return $("<li></li>").append($('<a class="collectionitem" href="' + m.url + '"></a>').text(m.disp))[0]
			}
		});
		if (j.length != 0) {
			j = j.slice(0, RECENTLY_VIEWED_LIMIT);
			var f = $('<ul class="addon-collections"></ul>').append($(j));
			$("#recently-viewed").append(f).append('<a id="clear-recents" href="#">' + gettext("clear recently viewed") + "</a>").show();
			$("#clear-recents").click(function (m) {
				m.preventDefault();
				k.clear();
				$("#recently-viewed").hide()
			})
		}
	};
	var b = function (f) {
		var g = 0;
		$.each(f, function (h, j) {
			g += j
		});
		return g
	};
	var d = function (f) {
		if ($.cookie("collections-leave-me-alone")) {
			return
		}
		var g = $('<div class="modal-subscription">' + f + "</div>");
		g.appendTo(document.body).jqm().jqmAddClose("a.close-button").jqmShow();
		g.find("#bothersome").change(function () {
			$.cookie("collections-leave-me-alone", true, {
				expires: 365,
				path: collections.cookie_path
			});
			g.jqmHide()
		})
	};
	collections.hijack_favorite_button = function () {
		var f = collections;
		$("form.favorite").submit(function (k) {
			k.preventDefault();
			var l = this.action + "/ajax";
			var h = $(this).find("button");
			var j = h.html();
			var g = h.hasClass("fav");
			var i = function (n) {
				var o = f[n + "_text"];
				if (h.find("img").length) {
					var m = f[n + "_img"];
					h.html('<img src="' + m + '"/>' + o)
				} else {
					h.html(o)
				}
			};
			h.css("min-width", h.outerWidth());
			h.addClass("loading-fav").attr("disabled", "disabled");
			i(g ? "removing" : "adding");
			h.css("min-width", h.outerWidth());
			$.ajax({
				type: "POST",
				data: $(this).serialize(),
				url: l,
				success: function (m) {
					if (g) {
						h.removeClass("fav");
						i("add")
					} else {
						d(m);
						h.addClass("fav");
						i("remove")
					}
					bandwagonRefreshEvent()
				},
				error: function () {
					h.html(j)
				},
				complete: function () {
					h.attr("disabled", "");
					h.removeClass("loading-fav")
				}
			})
		})
	};
	$(document).ready(collections.recently_viewed);
	$(document).ready(function () {
		var f = false;
		var g = function (i) {
			i.preventDefault();
			if (f) {
				return
			}
			f = true;
			var h = $(this);
			$.post(this.action, $(this).serialize(), function (m, j, o) {
				f = false;
				if (o.status == 200) {
					var l = h.closest(".barometer");
					var n = $("input.voted", l);
					var k = $('input[type="submit"]', h);
					if (n.length) {
						n.get(0).value--;
						n.removeClass("voted")
					}
					if (n.get(0) !== k.get(0)) {
						k.get(0).value++;
						k.addClass("voted")
					}
				}
			})
		};
		if (z.anonymous) {
			$(".barometer form").submit(function (i) {
				i.preventDefault();
				var h = this;
				var j = $(".collection-rate-dropdown", $(h).closest(".barometer"));
				if ($(h).hasClass("downvote")) {
					j.addClass("left")
				} else {
					j.removeClass("left")
				}
				j.detach().appendTo(h).show();
				setTimeout(function () {
					function k(l) {
						_root = j.get(0);
						if (l.type == "click" && _root == l.target || _.indexOf($(l.target).parents(), _root) != -1) {
							return
						}
						j.hide();
						$(document.body).unbind("click newPopup", k)
					}
					$(document.body).bind("click newPopup", k)
				}, 0)
			})
		} else {
			$(".barometer form").submit(g)
		}
	});
	$(document).ready(function () {
		var f = collections;
		f.adding_img = "/img/amo2009/icons/white-loading-16x16.gif";
		f.adding_text = gettext("Adding to Favorites&hellip;");
		f.removing_img = "/img/amo2009/icons/white-loading-16x16.gif";
		f.removing_text = gettext("Removing Favorite&hellip;");
		f.add_img = "/img/amo2009/icons/buttons/plus-orange-16x16.gif";
		f.add_text = gettext("Add to Favorites");
		f.remove_img = "/img/amo2009/icons/buttons/minus-orange-16x16.gif";
		f.remove_text = gettext("Remove from Favorites");
		f.cookie_path = "/";
		collections.hijack_favorite_button()
	});
	addon_ac = $("#addon-ac");
	if (addon_ac.length) {
		addon_ac.autocomplete({
			minLength: 3,
			width: 300,
			source: function (g, f) {
				$.getJSON($("#addon-ac").attr("data-src"), {
					q: g.term
				}, f)
			},
			focus: function (f, g) {
				$("#addon-ac").val(g.item.label);
				return false
			},
			select: function (f, g) {
				$("#addon-ac").val(g.item.label).attr("data-id", g.item.id).attr("data-icon", g.item.icon);
				return false
			}
		}).data("autocomplete")._renderItem = function (f, g) {
			if (!$("#addons-list input[value='" + g.id + "']").length) {
				return $("<li></li>").data("item.autocomplete", g).append('<a><img src="' + g.icon + '"/>&nbsp;<span>' + g.label + "</span></a>").appendTo(f)
			}
		}
	}
	$("#addon-ac").keydown(function (f) {
		if (f.which == 13) {
			f.preventDefault();
			$("#addon-select").click()
		}
	});
	$("#addon-select").click(function (i) {
		i.preventDefault();
		var k = $("#addon-ac").attr("data-id");
		var f = $("#addon-ac").val();
		var g = $("#addon-ac").attr("data-icon");
		if ($("input[name=addon][value=" + k + "]").length) {
			return false
		}
		if (k && f && g) {
			var h = template('<tr><td class="item"><input name="addon" value="{id}" type="hidden"><img src="{icon}"><h3>{name}</h3><p class="comments"><textarea name="addon_comment"></textarea></p></td><td>' + gettext("Pending") + '</td><td><a title="' + gettext("Add a comment") + '" class="comment">' + gettext("Comment") + '</a></td><td class="remove"><a title="' + gettext("Remove this add-on from the collection") + '" class="remove">' + gettext("Remove") + "</a></td></tr>");
			var j = h({
				id: k,
				name: f,
				icon: g
			});
			$("#addon-select").closest("tbody").append(j)
		}
		$("#addon-ac").val("")
	});
	var c = $("#addon-ac").closest("table");
	c.delegate(".remove", "click", function () {
		$(this).closest("tr").remove()
	}).delegate(".comment", "click", function () {
		var f = $(this).closest("tr");
		f.find(".comments").show();
		$(".comments textarea", f).focus()
	})
})();
if ($("body.collections-contributors")) {
	var user_row = template('<tr><td><input name="contributor" value="{id}" type="hidden">{name}</td><td>{email}</td><td class="contributor">Contributor</td><td class="remove"><a title="' + gettext("Remove this user as a contributor") + '" class="remove">' + gettext("Remove") + "</a></td></tr>");
	$("#contributor-ac-button").click(function (c) {
		c.preventDefault();
		var b = $("#contributor-ac").val();
		var f = $("#contributor-ac").attr("data-src");
		var d = $("#contributor-ac").attr("data-owner");
		$("#contributor-ac").addClass("ui-autocomplete-loading");
		$.get(f, {
			q: b
		}, function (g) {
			$("#contributor-ac").removeClass("ui-autocomplete-loading");
			if ($("input[name=contributor][value=" + g.id + "]").length == 0 && d != g.id) {
				var e = user_row({
					id: g.id,
					name: g.name,
					email: b
				});
				$("#contributor-ac-button").closest("tbody").append(e)
			}
			$("#contributor-ac").val("")
		})
	});
	var table = $("#contributors-list");
	table.delegate(".remove", "click", function () {
		$(this).closest("tr").remove()
	});
	$("#change-owner").popup(".make-owner", {
		callback: function (c) {
			var d = this,
			b = $(c.click_target);
			d.delegate("#change-owner-cancel", "click", function (f) {
				f.preventDefault();
				d.hideMe()
			});
			d.attr("data-newowner", b.parents(".contributor").children("input[name='contributor']").val());
			return {
				pointTo: b
			}
		}
	});
	$("#change-owner-submit").click(function (c) {
		c.preventDefault();
		var b = $("#change-owner").attr("data-newowner");
		$("#users-edit form").append('<input type="hidden" name="new_owner" value="' + b + '">').submit()
	})
}
$(document).ready(function () {
	$("#remove_icon").click(function () {
		$.post($(this).attr("href"), {}, function (b) {
			$("#icon_upload .icon_preview img").attr("src", b.icon)
		});
		$(this).hide();
		return false
	})
});
$(document).ready(function () {
	var c = $("#id_name").val();
	$(document).bind("unicode_loaded", function () {
		$("#id_slug").attr("data-customized", (!!$("#id_slug").val() && ($("#id_slug").val() != makeslug(c))) ? 1 : 0);
		slugify()
	});
	$("#details-edit form, .collection-create form").delegate("#id_name", "keyup", slugify).delegate("#id_name", "blur", slugify).delegate("#edit_slug", "click", show_slug_edit).delegate("#id_slug", "change", function () {
		$("#id_slug").attr("data-customized", 1);
		if (!$("#id_slug").val()) {
			$("#id_slug").attr("data-customized", 0);
			slugify()
		}
	});
	var d = $("#add-to-collection").html();
	$("#add-to-collection").popup(".widgets .collection-add", {
		width: 200,
		offset: {
			x: 8
		},
		callback: function (j) {
			var f = this,
			k = $(j.click_target),
			g = k.attr("data-listurl"),
			n = k.attr("data-removeurl"),
			o = k.attr("data-addurl"),
			m = k.attr("data-newurl"),
			q = k.attr("data-addonid");
			if (z.anonymous) {
				return {
					pointTo: k
				}
			}
			function l(r) {
				if (r) {
					r.preventDefault()
				}
				k.addClass("ajax-loading");
				$.ajax({
					url: g,
					data: {
						addon_id: q
					},
					success: e,
					error: function () {
						e(d)
					},
					dataType: "html"
				})
			}
			function e(r) {
				f.html(r);
				f.show();
				k.removeClass("ajax-loading");
				$("a.outlink", f).click(b);
				if (!$(".errorlist li", f).length) {
					f.setWidth(200)
				}
				f.setPos(k);
				f.render()
			}
			function h(u) {
				u.preventDefault();
				var v = $(this);
				var t = {
					addon_id: q,
					id: v.attr("data-id")
				};
				var r = this.className == "selected" ? n : o;
				if (v.hasClass("ajax-loading")) {
					return
				}
				v.addClass("ajax-loading");
				$.post(r, t, function (w) {
					f.html(w);
					$("a.outlink", f).click(b)
				}, "html")
			}
			var i = function (r) {
				r.preventDefault();
				var t = $(this);
				if (k.hasClass("ajax-loading")) {
					return
				}
				k.addClass("ajax-loading");
				form_data = $("#add-to-collection form").serialize();
				$.post(m + "?addon_id=" + q, form_data, e, "html")
			};
			var p = function (r) {
				r.preventDefault();
				var t = $(this);
				$.get(m, {
					addon_id: q
				}, function (u) {
					f.html(u);
					f.setWidth(410);
					f.setPos(k);
					$("#id_name").focus()
				})
			};
			f.hideMe();
			f.unbind("click.popup", b);
			f.bind("click.popup", b);
			f.delegate("#ajax_collections_list li", "click", h).delegate("#ajax_new_collection", "click", p).delegate("#collections-new-cancel", "click", l).delegate("#add-to-collection form", "submit", i).delegate("#id_name", "keyup", slugify).delegate("#id_name", "blur", slugify).delegate("#edit_slug", "click", show_slug_edit).delegate("#id_slug", "change", function () {
				$("#id_slug").attr("data-customized", 1);
				if (!$("#id_slug").val()) {
					$("#id_slug").attr("data-customized", 0);
					slugify()
				}
			});
			l();
			return false
		}
	});
	function b(f) {
		f.stopPropagation()
	}
});
$(document).ready(function () {
	$(".widget.favorite").click(function (g) {
		g.preventDefault();
		var f = $(this);
		var d = {
			addon_id: f.attr("data-addonid")
		};
		var c = f.hasClass("faved");
		var b = c ? f.attr("data-removeurl") : f.attr("data-addurl");
		var h = f.hasClass("condensed");
		if (f.hasClass("ajax-loading")) {
			return
		}
		f.addClass("ajax-loading");
		$.ajax({
			url: b,
			data: d,
			type: "post",
			success: function (e) {
				f.removeClass("ajax-loading");
				if (c) {
					f.removeClass("faved");
					if (h) {
						f.attr("title", gettext("Add to favorites"))
					} else {
						f.text(f.attr("data-unfavedtext"))
					}
				} else {
					f.addClass("faved");
					if (h) {
						f.attr("title", gettext("Remove from favorites"))
					} else {
						f.text(f.attr("data-favedtext"))
					}
				}
				f.trigger("tooltip_change")
			},
			error: function (e) {
				f.removeClass("ajax-loading")
			}
		})
	});
	$(".collection_widgets .watch").click(function (d) {
		d.preventDefault();
		var c = $(this);
		if (c.hasClass("ajax-loading")) {
			return
		}
		c.addClass("ajax-loading");
		var b = gettext("Follow this Collection");
		$.ajax({
			url: this.href,
			type: "POST",
			success: function (e) {
				c.removeClass("ajax-loading");
				if (e.watching) {
					c.addClass("watching");
					b = gettext("Stop following")
				} else {
					c.removeClass("watching")
				}
				if (c.hasClass("condensed")) {
					c.attr("title", b);
					c.trigger("tooltip_change")
				} else {
					c.text(b)
				}
			},
			error: function () {
				c.removeClass("ajax-loading")
			}
		})
	});
	$("#sharing-popup").popup(".share.widget", {
		width: 280,
		offset: {
			x: 8
		},
		callback: function (f) {
			var b = {};
			var e = $(f.click_target);
			var h = this;
			var g = e.attr("data-base-url");
			var d = $.parseJSON(e.attr("data-share-counts"));
			h.hideMe();
			if (d) {
				for (s in d) {
					if (!d.hasOwnProperty(s)) {
						continue
					}
					var j = d[s];
					var i = $("li." + s, this);
					$(".share-count", i).text(j);
					$(".uniquify", i).attr("href", g + s)
				}
			} else {
				return false
			}
			b.pointTo = f.click_target;
			return b
		}
	})
});
var RecaptchaOptions = {
	theme: "custom"
};
$("#recaptcha_different").click(function (b) {
	b.preventDefault();
	Recaptcha.reload()
});
$("#recaptcha_audio").click(function (b) {
	b.preventDefault();
	Recaptcha.switch_type("audio")
});
$("#recaptcha_help").click(function (b) {
	b.preventDefault();
	Recaptcha.showhelp()
});
setTimeout(function () {
	$(document).ready(function () {
		$('a[href^="http://outgoing.mozilla.org"]').each(function (f) {
			var d = $(this),
			c = d.attr("href"),
			b = unescape(c.split("/").slice(5).join("/"));
			d.attr("href", b);
			d.click(function (g) {
				d.attr("href", c);
				setTimeout(function () {
					d.attr("href", b)
				}, 100);
				return true
			})
		})
	})
}, 50);
