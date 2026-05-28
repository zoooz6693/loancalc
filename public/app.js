var _chartJsReady = null;
function ensureChartJs(cb) {
	if (window.Chart) {
		cb();
		return;
	}
	if (_chartJsReady) {
		_chartJsReady.push(cb);
		return;
	}
	_chartJsReady = [cb];
	var s = document.createElement('script');
	s.src = '/chart.js';
	s.onload = function () {
		_chartJsReady.forEach(function (fn) {
			fn();
		});
		_chartJsReady = null;
	};
	document.head.appendChild(s);
}
var _loadedFontLangs = {};
function injectFontForLang(lang) {
	var fontUrls = {ar: 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans+Arabic:wght@400;500;600&display=swap', zh: 'https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;500;700&family=Noto+Sans+SC:wght@400;500&display=swap', hi: 'https://fonts.googleapis.com/css2?family=Noto+Serif+Devanagari:wght@400;500;700&family=Noto+Sans+Devanagari:wght@400;500&display=swap'};
	var url = fontUrls[lang];
	if (!url || _loadedFontLangs[lang]) return;
	_loadedFontLangs[lang] = true;
	var link = document.createElement('link');
	link.rel = 'stylesheet';
	link.href = url;
	document.head.appendChild(link);
}
function switchPanel(e) {
	document.querySelectorAll('.tool-panel').forEach(function (e) {
		e.classList.remove('active');
	});
	var a = document.getElementById(e);
	if (a) {
		if ((a.classList.add('active'), 'panel-currency' === e)) {
			var n = localStorage.getItem('loancalc_live_tab') || 'currency';
			(document.getElementById('live-panel-' + n) || (n = 'currency'),
				document.querySelectorAll('.live-panel').forEach(function (e) {
					e.classList.toggle('active', e.id === 'live-panel-' + n);
				}),
				document.querySelectorAll('.live-seg .tab-btn[data-live]').forEach(function (e) {
					var a = e.dataset.live === n;
					(e.classList.toggle('active', a), e.setAttribute('aria-selected', String(a)));
				}));
		}
		a.querySelectorAll('.calc-card, .chart-wrap, .table-wrap').forEach(function (e) {
			if (!e.dataset.animated) {
				var a = e.closest('.live-panel');
				if (a && !a.classList.contains('active')) return;
				(e.classList.add('fade-up-once'), (e.dataset.animated = '1'));
			}
		});
	}
	var r = null;
	(document.querySelectorAll('#tool-nav .tab-btn').forEach(function (a) {
		var n = a.dataset.panel === e;
		(a.classList.toggle('active', n), 'A' === a.tagName && (n ? a.setAttribute('aria-current', 'page') : a.removeAttribute('aria-current')), n && (r = a));
	}),
		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		}),
		r &&
			r.scrollIntoView({
				behavior: 'smooth',
				block: 'nearest',
				inline: 'nearest'
			}),
		'panel-faq' === e && filterFAQ());
}

function filterFAQ() {
	document.querySelectorAll('.faq-item').forEach(function (e) {
		e.style.display = '';
	});
	var e = document.getElementById('faq');
	e && (e.style.display = '');
}
((window.APP_CURRENCY = 'USD'),
	(window.APP_LANG = 'en'),
	(window.CURRENCY_CONFIG = {
		USD: {
			symbol: '$',
			locale: 'en-US',
			loanDefault: 4e5,
			loanMin: 1e3,
			loanMax: 5e6,
			loanStep: 5e3,
			rateDefault: 6.5,
			rateMax: 20,
			savingsDefault: 1e4,
			savingsRate: 7,
			note: 'US market. Avg 30yr fixed: 6.5–7%. Conforming limit: $806,500; jumbo up to $5M.'
		},
		EGP: {
			symbol: 'ج.م',
			locale: 'ar-EG',
			loanDefault: 35e5,
			loanMin: 5e4,
			loanMax: 3e7,
			loanStep: 5e4,
			rateDefault: 20,
			rateMax: 35,
			savingsDefault: 5e5,
			savingsRate: 12,
			note: 'Egypt. CBE rate: 22.5%. Consumer mortgage: 18–25%.'
		},
		EUR: {
			symbol: '€',
			locale: 'de-DE',
			loanDefault: 25e4,
			loanMin: 1e3,
			loanMax: 2e6,
			loanStep: 5e3,
			rateDefault: 3.5,
			rateMax: 15,
			savingsDefault: 1e4,
			savingsRate: 4,
			note: 'Eurozone. ECB rate: 2.5%. Avg mortgage: 3–4%. High-value loans up to €2M.'
		},
		GBP: {
			symbol: '£',
			locale: 'en-GB',
			loanDefault: 3e5,
			loanMin: 1e3,
			loanMax: 3e6,
			loanStep: 5e3,
			rateDefault: 4.5,
			rateMax: 15,
			savingsDefault: 1e4,
			savingsRate: 5,
			note: 'UK. Bank of England rate: 4.5%. Avg 2yr fixed: 4.5–5%. Prime up to £3M.'
		},
		AED: {
			symbol: 'د.إ',
			locale: 'ar-AE',
			loanDefault: 1e6,
			loanMin: 1e4,
			loanMax: 15e6,
			loanStep: 1e4,
			rateDefault: 5,
			rateMax: 15,
			savingsDefault: 5e4,
			savingsRate: 4,
			note: 'UAE. EIBOR-linked mortgage: 4.5–6%. Luxury properties up to AED 15M.'
		},
		SAR: {
			symbol: '\u20C1',
			locale: 'ar-SA',
			loanDefault: 8e5,
			loanMin: 1e4,
			loanMax: 8e6,
			loanStep: 1e4,
			rateDefault: 5.5,
			rateMax: 15,
			savingsDefault: 5e4,
			savingsRate: 4,
			note: 'Saudi Arabia. SAIBOR-linked mortgage: 5–6%.'
		},
		KWD: {
			symbol: 'د.ك',
			locale: 'ar-KW',
			loanDefault: 5e4,
			loanMin: 1e3,
			loanMax: 5e5,
			loanStep: 1e3,
			rateDefault: 4.5,
			rateMax: 12,
			savingsDefault: 5e3,
			savingsRate: 3,
			note: 'Kuwait. CBK rate: 4%. Avg mortgage: 3.5–5%.'
		},
		QAR: {
			symbol: 'ر.ق',
			locale: 'ar-QA',
			loanDefault: 5e5,
			loanMin: 5e3,
			loanMax: 5e6,
			loanStep: 5e3,
			rateDefault: 4.8,
			rateMax: 12,
			savingsDefault: 25e3,
			savingsRate: 3,
			note: 'Qatar. QCB rate: 5.5%. Housing loans: 4–5.5%. Premium homes up to QAR 5M.'
		},
		CAD: {
			symbol: '$',
			locale: 'en-CA',
			loanDefault: 4e5,
			loanMin: 1e3,
			loanMax: 3e6,
			loanStep: 5e3,
			rateDefault: 4.5,
			rateMax: 15,
			savingsDefault: 1e4,
			savingsRate: 5,
			note: 'Canada. BoC rate: 3%. 5yr fixed: 4–5%. High-value mortgages up to CAD 3M.'
		},
		AUD: {
			symbol: '$',
			locale: 'en-AU',
			loanDefault: 75e4,
			loanMin: 1e3,
			loanMax: 3e6,
			loanStep: 5e3,
			rateDefault: 5.5,
			rateMax: 15,
			savingsDefault: 1e4,
			savingsRate: 5,
			note: 'Australia. RBA rate: 4.35%. Variable: 5.5–6.5%. Premium homes up to AUD 3M.'
		},
		CHF: {
			symbol: 'Fr',
			locale: 'de-CH',
			loanDefault: 8e5,
			loanMin: 1e4,
			loanMax: 5e6,
			loanStep: 5e3,
			rateDefault: 1.8,
			rateMax: 8,
			savingsDefault: 1e4,
			savingsRate: 2,
			note: 'Switzerland. SNB rate: 0.5%. SARON mortgage: 0.5–1.5%. Luxury properties up to CHF 5M.'
		},
		JPY: {
			symbol: '¥',
			locale: 'ja-JP',
			loanDefault: 3e7,
			loanMin: 1e5,
			loanMax: 3e8,
			loanStep: 5e5,
			rateDefault: 1.5,
			rateMax: 5,
			savingsDefault: 1e6,
			savingsRate: 2,
			note: 'Japan. BOJ rate: 0.1%. Avg fixed mortgage: 1.5–2%. Large loans up to ¥300M.'
		},
		CNY: {
			symbol: '¥',
			locale: 'zh-CN',
			loanDefault: 15e5,
			loanMin: 1e4,
			loanMax: 2e7,
			loanStep: 1e4,
			rateDefault: 4.2,
			rateMax: 12,
			savingsDefault: 1e5,
			savingsRate: 3,
			note: 'China. LPR-linked mortgage: 3.95–4.2%. Premium housing up to ¥20M.'
		},
		INR: {
			symbol: '₹',
			locale: 'hi-IN',
			loanDefault: 5e6,
			loanMin: 5e4,
			loanMax: 1e8,
			loanStep: 5e4,
			rateDefault: 8.5,
			rateMax: 20,
			savingsDefault: 1e5,
			savingsRate: 7,
			note: 'India. Avg home loan floating rate: 8.5–9%. Premium loans up to ₹1 crore.'
		},
		SGD: {
			symbol: 'S$',
			locale: 'zh-SG',
			loanDefault: 1e6,
			loanMin: 1e4,
			loanMax: 8e6,
			loanStep: 1e4,
			rateDefault: 3.8,
			rateMax: 12,
			savingsDefault: 1e4,
			savingsRate: 4,
			note: 'Singapore. SORA-linked mortgage: 3.5–4.5%. GCB and luxury up to SGD 8M.'
		},
		HKD: {
			symbol: 'HK$',
			locale: 'zh-HK',
			loanDefault: 5e6,
			loanMin: 1e5,
			loanMax: 2e7,
			loanStep: 5e4,
			rateDefault: 4.2,
			rateMax: 10,
			savingsDefault: 5e4,
			savingsRate: 3,
			note: 'Hong Kong. HIBOR + 1.5%. Effective rate: 4–5%. Luxury properties up to HKD 20M.'
		},
		MYR: {
			symbol: 'RM',
			locale: 'ms-MY',
			loanDefault: 4e5,
			loanMin: 1e4,
			loanMax: 3e6,
			loanStep: 5e3,
			rateDefault: 4.5,
			rateMax: 12,
			savingsDefault: 1e4,
			savingsRate: 4,
			note: 'Malaysia. BNM OPR: 3%. Housing loan: 4–5%. High-value properties up to MYR 3M.'
		},
		KRW: {
			symbol: '₩',
			locale: 'ko-KR',
			loanDefault: 3e8,
			loanMin: 1e6,
			loanMax: 15e8,
			loanStep: 1e6,
			rateDefault: 4.5,
			rateMax: 10,
			savingsDefault: 1e7,
			savingsRate: 4,
			note: 'South Korea. BoK rate: 3%. Avg mortgage: 3.5–4.5%. DSR-compliant up to ₩1.5B.'
		},
		THB: {
			symbol: '฿',
			locale: 'th-TH',
			loanDefault: 2e6,
			loanMin: 5e4,
			loanMax: 2e7,
			loanStep: 5e4,
			rateDefault: 6.5,
			rateMax: 15,
			savingsDefault: 1e5,
			savingsRate: 4,
			note: 'Thailand. BOT rate: 2.5%. Avg bank mortgage: 6–7%. Premium properties up to ฿20M.'
		},
		IDR: {
			symbol: 'Rp',
			locale: 'id-ID',
			loanDefault: 5e8,
			loanMin: 5e6,
			loanMax: 5e9,
			loanStep: 5e6,
			rateDefault: 11,
			rateMax: 20,
			savingsDefault: 1e7,
			savingsRate: 6,
			note: 'Indonesia. BI rate: 6%. KPR housing rate: 10–12%. High-end up to Rp 5B.'
		},
		TRY: {
			symbol: '₺',
			locale: 'tr-TR',
			loanDefault: 3e6,
			loanMin: 1e4,
			loanMax: 5e7,
			loanStep: 5e4,
			rateDefault: 42,
			rateMax: 60,
			savingsDefault: 1e5,
			savingsRate: 20,
			note: 'Turkey. TCMB rate: 35%. Consumer mortgage: 30–45%.'
		},
		BRL: {
			symbol: 'R$',
			locale: 'pt-BR',
			loanDefault: 3e5,
			loanMin: 1e3,
			loanMax: 2e6,
			loanStep: 5e3,
			rateDefault: 11,
			rateMax: 25,
			savingsDefault: 1e4,
			savingsRate: 10,
			note: 'Brazil. SELIC: 10.5%. CEF mortgage: 10–12%.'
		},
		ZAR: {
			symbol: 'R',
			locale: 'en-ZA',
			loanDefault: 1e6,
			loanMin: 1e4,
			loanMax: 8e6,
			loanStep: 1e4,
			rateDefault: 11.5,
			rateMax: 20,
			savingsDefault: 5e4,
			savingsRate: 8,
			note: 'South Africa. Prime rate: 11.75%. Avg bond: 12%.'
		},
		NGN: {
			symbol: '₦',
			locale: 'en-NG',
			loanDefault: 1e7,
			loanMin: 1e5,
			loanMax: 1e8,
			loanStep: 1e5,
			rateDefault: 28,
			rateMax: 45,
			savingsDefault: 5e5,
			savingsRate: 15,
			note: 'Nigeria. MPR: 26.75%. Consumer mortgage: 25–35%.'
		},
		PKR: {
			symbol: '₨',
			locale: 'ur-PK',
			loanDefault: 5e6,
			loanMin: 1e5,
			loanMax: 5e7,
			loanStep: 1e5,
			rateDefault: 22,
			rateMax: 35,
			savingsDefault: 5e5,
			savingsRate: 12,
			note: 'Pakistan. SBP rate: 12%. Housing: 14–18%.'
		},
		MXN: {
			symbol: '$',
			locale: 'es-MX',
			loanDefault: 15e5,
			loanMin: 1e4,
			loanMax: 1e7,
			loanStep: 1e4,
			rateDefault: 11,
			rateMax: 20,
			savingsDefault: 5e4,
			savingsRate: 8,
			note: 'Mexico. Banxico rate: 11%. INFONAVIT: 10–12%.'
		},
		PLN: {
			symbol: 'zł',
			locale: 'pl-PL',
			loanDefault: 4e5,
			loanMin: 1e4,
			loanMax: 2e6,
			loanStep: 5e3,
			rateDefault: 7.5,
			rateMax: 15,
			savingsDefault: 1e4,
			savingsRate: 6,
			note: 'Poland. NBP rate: 5.75%. WIBOR-linked: 7–8%.'
		},
		SEK: {
			symbol: 'kr',
			locale: 'sv-SE',
			loanDefault: 3e6,
			loanMin: 5e4,
			loanMax: 15e6,
			loanStep: 5e4,
			rateDefault: 3.5,
			rateMax: 10,
			savingsDefault: 5e4,
			savingsRate: 3,
			note: 'Sweden. Riksbank rate: 2%. Avg variable: 2.5–3.5%. Premium up to SEK 15M.'
		},
		NOK: {
			symbol: 'kr',
			locale: 'nb-NO',
			loanDefault: 3e6,
			loanMin: 5e4,
			loanMax: 15e6,
			loanStep: 5e4,
			rateDefault: 5,
			rateMax: 12,
			savingsDefault: 5e4,
			savingsRate: 4,
			note: 'Norway. Norges Bank rate: 3.5%. Avg mortgage: 4.5–5.5%. Premium up to NOK 15M.'
		},
		DKK: {
			symbol: 'kr',
			locale: 'da-DK',
			loanDefault: 2e6,
			loanMin: 5e4,
			loanMax: 8e6,
			loanStep: 5e4,
			rateDefault: 5.5,
			rateMax: 12,
			savingsDefault: 5e4,
			savingsRate: 4,
			note: 'Denmark. Nationalbanken rate: 2%. Avg: 3–4.5%.'
		},
		NZD: {
			symbol: '$',
			locale: 'en-NZ',
			loanDefault: 75e4,
			loanMin: 5e3,
			loanMax: 3e6,
			loanStep: 5e3,
			rateDefault: 5.5,
			rateMax: 15,
			savingsDefault: 1e4,
			savingsRate: 5,
			note: 'New Zealand. RBNZ rate: 3.5%. 1yr fixed: 5.5–6%. Premium properties up to NZD 3M.'
		},
		MAD: {
			symbol: 'د.م.',
			locale: 'ar-MA',
			loanDefault: 1e6,
			loanMin: 1e4,
			loanMax: 8e6,
			loanStep: 1e4,
			rateDefault: 5.5,
			rateMax: 12,
			savingsDefault: 5e4,
			savingsRate: 4,
			note: 'Morocco. BAM rate: 3%. Avg mortgage: 5–6%.'
		}
	}),
	(window.fmtMoney = function (e) {
		var a = window.APP_CURRENCY,
			n = window.CURRENCY_CONFIG[a];
		if (!n) return (window.getCurrencySym ? window.getCurrencySym() : '$') + new Intl.NumberFormat('en-US').format(Math.round(e));
		try {
			var parts = new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: a,
				maximumFractionDigits: 0
			}).formatToParts(Math.round(e));
			return parts
				.map(function (p) {
					return p.type === 'currency' ? n.symbol : p.value;
				})
				.join('');
		} catch (a) {
			return n.symbol + new Intl.NumberFormat('en-US').format(Math.round(e));
		}
	}),
	(window._fmtLoc = function (e) {
		return 'ar' === window.APP_LANG && e && 0 === e.indexOf('ar') && -1 === e.indexOf('-u-nu-') ? e + '-u-nu-latn' : e;
	}),
	(window.getCurrencySym = function () {
		var e = window.CURRENCY_CONFIG[window.APP_CURRENCY];
		return e ? e.symbol : '$';
	}),
	(window.REGION_MAP = {
		US: 'USD',
		GB: 'GBP',
		AU: 'AUD',
		CA: 'CAD',
		CH: 'CHF',
		CN: 'CNY',
		JP: 'JPY',
		IN: 'INR',
		SG: 'SGD',
		HK: 'HKD',
		NO: 'NOK',
		SE: 'SEK',
		DK: 'DKK',
		NZ: 'NZD',
		MX: 'MXN',
		BR: 'BRL',
		ZA: 'ZAR',
		EG: 'EGP',
		AE: 'AED',
		SA: 'SAR',
		TR: 'TRY',
		KR: 'KRW',
		TH: 'THB',
		ID: 'IDR',
		MY: 'MYR',
		PK: 'PKR',
		NG: 'NGN',
		QA: 'QAR',
		KW: 'KWD',
		MA: 'MAD',
		TN: 'TND',
		DZ: 'DZD',
		UA: 'UAH',
		PL: 'PLN',
		CZ: 'CZK',
		HU: 'HUF',
		RO: 'RON',
		RS: 'RSD',
		BG: 'BGN',
		IS: 'ISK',
		CL: 'CLP',
		CO: 'COP',
		AR: 'ARS',
		PE: 'PEN',
		VN: 'VND',
		PH: 'PHP',
		BD: 'BDT',
		LK: 'LKR',
		NP: 'NPR',
		KZ: 'KZT',
		UZ: 'UZS',
		AZ: 'AZN',
		GE: 'GEL',
		AM: 'AMD',
		BY: 'BYN',
		DE: 'EUR',
		FR: 'EUR',
		IT: 'EUR',
		ES: 'EUR',
		PT: 'EUR',
		NL: 'EUR',
		BE: 'EUR',
		AT: 'EUR',
		FI: 'EUR',
		IE: 'EUR',
		GR: 'EUR',
		LU: 'EUR',
		SK: 'EUR',
		SI: 'EUR',
		EE: 'EUR',
		LV: 'EUR',
		LT: 'EUR',
		MT: 'EUR',
		CY: 'EUR'
	}),
	(window.detectLocaleCurrency = function () {
		if (window._prefCurrency) return window._prefCurrency;
		try {
			var e = ((navigator.languages && navigator.languages[0]) || navigator.language || 'en-US').split('-'),
				a = e.length > 1 ? e[1].toUpperCase() : e[0].toUpperCase(),
				n = window.REGION_MAP[a];
			if (n) return n;
		} catch (e) {}
		return 'USD';
	}),
	(window.cssToken = function (e) {
		return getComputedStyle(document.documentElement).getPropertyValue(e).trim();
	}),
	(function () {
		'use strict';
		var e,
			a,
			n = {
				mortgage: {
					amount: 3e5,
					rate: 6.5,
					term: 30,
					amountMin: 5e4,
					amountMax: 2e6,
					amountStep: 5e3,
					rateMin: 0.5,
					rateMax: 15,
					termMin: 1,
					termMax: 30,
					label: '30-year fixed mortgage',
					helperTitle: 'Using the defaults?',
					helperText: 'Enter your actual loan amount, interest rate, and term above. The formula works for any currency and any country.'
				},
				car: {
					amount: 25e3,
					rate: 7,
					term: 5,
					amountMin: 1e3,
					amountMax: 2e5,
					amountStep: 500,
					rateMin: 1,
					rateMax: 25,
					termMin: 1,
					termMax: 8,
					label: '5-year auto loan',
					helperTitle: 'Typical car loan',
					helperText: 'Average new car loan rate is 6–8%. Used car loans typically carry slightly higher rates. Dealers often have promotional rates.'
				},
				personal: {
					amount: 1e4,
					rate: 11,
					term: 3,
					amountMin: 500,
					amountMax: 1e5,
					amountStep: 500,
					rateMin: 1,
					rateMax: 36,
					termMin: 1,
					termMax: 7,
					label: '3-year personal loan',
					helperTitle: 'Typical personal loan',
					helperText: 'Personal loan rates range from 6% (excellent credit) to 36% (fair credit). Online lenders often offer competitive rates for qualified borrowers.'
				},
				student: {
					amount: 35e3,
					rate: 5.5,
					term: 10,
					amountMin: 1e3,
					amountMax: 25e4,
					amountStep: 1e3,
					rateMin: 1,
					rateMax: 15,
					termMin: 1,
					termMax: 25,
					label: '10-year student loan',
					helperTitle: 'Student loan',
					helperText: 'Student loan rates vary widely by country and lender. Enter your actual rate and balance above for an accurate repayment estimate.'
				}
			},
			r = 'mortgage',
			t = null,
			i = !1,
			o = [],
			amortGran = 'yearly',
			oMonthly = [],
			freqMode = 'monthly',
			savedScenario = null,
			s = document.getElementById('s-amount'),
			l = document.getElementById('s-rate'),
			u = document.getElementById('s-term'),
			d = document.getElementById('i-amount'),
			c = document.getElementById('i-rate'),
			m = document.getElementById('i-term'),
			sExtra = document.getElementById('s-extra'),
			iExtra = document.getElementById('i-extra');

		function p(e) {
			return window.fmtMoney(e);
		}

		function g(e) {
			return new Intl.NumberFormat('en-US').format(Math.round(e));
		}

		function h(e, a, n) {
			var r = a / 100 / 12,
				t = 12 * n;
			if (0 === r)
				return {
					monthly: e / t,
					total: e,
					interest: 0
				};
			var i = Math.pow(1 + r, t),
				o = (e * (r * i)) / (i - 1),
				s = o * t;
			return {
				monthly: o,
				total: s,
				interest: s - e
			};
		}

		function f(e, a) {
			var isMonthly = amortGran === 'monthly';
			var n = document.getElementById('amort-body');
			var thFirst = document.querySelector('#amort-table thead tr th:first-child');
			if (thFirst) {
				var colHdr = (window._i18n_current && window._i18n_current[isMonthly ? 'amort-month' : 'amort-year']) || (isMonthly ? 'Month' : 'Year');
				thFirst.textContent = colHdr;
			}
			var r = '',
				t = a || e.length,
				baseYear = new Date().getFullYear(),
				s = 0;
			for (; s < Math.min(t, e.length); s++) {
				var l = e[s],
					u = l.end < 1 ? ' class="green"' : '';
				var label;
				if (isMonthly) {
					var yr = baseYear + Math.floor((l.month - 1) / 12);
					var mo = (l.month - 1) % 12;
					label = new Date(yr, mo).toLocaleDateString(window._i18n_locale || 'en-US', {month: 'short', year: 'numeric'});
				} else {
					label = '' + (baseYear + l.year - 1);
				}
				r += '<tr><td>' + label + '</td><td>' + p(l.start) + '</td><td class="green">' + p(l.paidP) + '</td><td class="red">' + p(l.paidI) + '</td><td' + u + '>' + (l.end < 1 ? p(0) : p(l.end)) + '</td></tr>';
			}
			n.innerHTML = r;
			var d = document.getElementById('toggle-rows');
			var defaultRows = isMonthly ? 24 : 5;
			if (e.length <= defaultRows) d.style.display = 'none';
			else {
				d.style.display = '';
				var showAllTxt = isMonthly ? (window._i18n_current && window._i18n_current['btn-show-all-months']) || 'Show all months' : d.dataset.showAll || 'Show all years';
				var showLessTxt = d.dataset.showLess || 'Show less';
				d.textContent = i ? showLessTxt : showAllTxt;
			}
		}

		function b(e) {
			var a = parseFloat(e.min) || 0,
				n = parseFloat(e.max) || 100,
				r = (((parseFloat(e.value) || 0) - a) / (n - a)) * 100,
				t = 'rtl' === document.documentElement.getAttribute('dir') ? 'linear-gradient(to left,var(--slider-fill) 0%,var(--slider-fill) ' + r + '%,var(--slider-track) ' + r + '%,var(--slider-track) 100%)' : 'linear-gradient(to right,var(--slider-fill) 0%,var(--slider-fill) ' + r + '%,var(--slider-track) ' + r + '%,var(--slider-track) 100%)';
			e.style.background = t;
		}

		function k() {
			var e = document.querySelector('.results-panel');
			if (e && !e.querySelector('.calc-error-msg')) {
				var a = document.createElement('div');
				((a.className = 'calc-error-msg rf-hint'), a.setAttribute('role', 'alert'));
				var n = document.createElement('span');
				n.textContent = 'Calculation unavailable. ';
				var r = document.createElement('button');
				((r.type = 'button'),
					(r.textContent = 'Retry'),
					(r.style.cssText = 'margin-left:6px;padding:2px 10px;font:inherit;font-size:12px;cursor:pointer;border:1.5px solid currentColor;border-radius:4px;background:transparent;color:inherit;'),
					r.addEventListener('click', function () {
						a.remove();
						try {
							v();
						} catch (e) {
							k();
						}
					}),
					a.appendChild(n),
					a.appendChild(r),
					e.appendChild(a));
			}
		}

		function v() {
			if (r === 'afford') return;
			try {
				var g = parseFloat(s.value) || 0,
					v = parseFloat(l.value) || 0,
					y = parseInt(u.value) || 0;
				if (
					((d.value = g),
					(c.value = v.toFixed(1)),
					(m.value = y),
					b(s),
					b(l),
					b(u),
					(function () {
						var e = n[r],
							a = document.getElementById('helper-note');
						if (!a) return;
						var t = Math.round(parseFloat(s.value)) === Math.round(e.amount) && Math.abs(parseFloat(l.value) - e.rate) < 0.05 && parseInt(u.value) === e.term;
						a.style.display = t ? '' : 'none';
					})(),
					!g || !v || !y)
				)
					return;
				var w = h(g, v, y);
				((document.getElementById('result-monthly').textContent = p(w.monthly)),
					window.fitText && window.fitText(document.getElementById('result-monthly')),
					(C = p(w.monthly)),
					clearTimeout(e),
					(e = setTimeout(function () {
						var e = document.getElementById('result-monthly-live');
						e && (e.textContent = C);
					}, 500)),
					clearTimeout(a),
					(a = setTimeout(function () {
						var e = document.getElementById('result-monthly');
						e && (e.classList.remove('updated'), e.offsetWidth, e.classList.add('updated'));
					}, 150)),
					(document.getElementById('result-principal').textContent = p(g)),
					(document.getElementById('result-interest').textContent = p(w.interest)));
				var z = document.getElementById('res-interest-context');
				if (z) {
					var A = (window._i18n_current && window._i18n_current['unit-years']) || 'years';
					var _ctxTpl = (window._i18n_current && window._i18n_current['res-interest-context']) || 'over {n} {years} total';
					z.textContent = _ctxTpl.replace('{n}', y).replace('{years}', A);
				}
				document.getElementById('result-total').textContent = p(w.total);
				var x = new Date().getFullYear() + y,
					S = (window._i18n_current && window._i18n_current['unit-yrs']) || 'yrs';
				document.getElementById('result-year').textContent = x + ' (' + y + ' ' + S + ')';
				(function () {
					var lbl = document.getElementById('res-monthly-lbl');
					var amtEl = document.getElementById('result-monthly');
					var subEl = document.getElementById('result-loan-label');
					if (freqMode === 'biweekly' && r === 'mortgage') {
						var pBi = w.monthly / 2;
						var effMo = (w.monthly * 13) / 12;
						var rmo = v / 100 / 12;
						var bibal = g,
							totalI = 0,
							biMonths = 0,
							maxM = y * 24;
						while (bibal > 0.01 && biMonths < maxM) {
							var oint = bibal * rmo,
								ppart = effMo - oint;
							if (ppart <= 0) break;
							totalI += oint;
							bibal -= ppart;
							biMonths++;
						}
						var savedI = w.interest - totalI;
						var savedYrs = Math.round(((y * 12 - biMonths) / 12) * 10) / 10;
						var biLbl = (window._i18n_current && window._i18n_current['freq-biweekly']) || 'Biweekly payment';
						var perWk = (window._i18n_current && window._i18n_current['freq-per-2wk']) || '/ 2 wks';
						if (lbl) lbl.textContent = biLbl;
						if (amtEl) {
							amtEl.textContent = p(pBi) + ' ' + perWk;
							window.fitText && window.fitText(amtEl);
						}
						if (subEl) {
							var _biTpl = (window._i18n_current && window._i18n_current['bi-sub-template']) || 'vs {monthly} · Save {saved} · Pay off {yrs} yrs sooner';
							var _perMoBI = (window._i18n_current && window._i18n_current['unit-mo']) || '/mo';
							subEl.textContent = _biTpl
								.replace('{monthly}', p(w.monthly) + _perMoBI)
								.replace('{saved}', p(savedI))
								.replace('{yrs}', savedYrs);
						}
					}
				})();
				(function () {
					var extraEl = document.getElementById('extra-savings');
					if (!extraEl) return;
					if (r !== 'mortgage' || !sExtra) {
						extraEl.style.display = 'none';
						return;
					}
					var extraAmt = parseFloat(sExtra.value) || 0;
					if (iExtra) iExtra.value = extraAmt;
					b(sExtra);
					if (extraAmt <= 0) {
						extraEl.style.display = 'none';
						return;
					}
					var rmo2 = v / 100 / 12,
						pMo2 = w.monthly,
						accel = pMo2 + extraAmt;
					var bal3 = g,
						totalI2 = 0,
						accelMonths = 0,
						maxM2 = y * 24;
					while (bal3 > 0.01 && accelMonths < maxM2) {
						var int3 = bal3 * rmo2,
							prin3 = accel - int3;
						if (prin3 <= 0) break;
						totalI2 += int3;
						bal3 -= prin3;
						accelMonths++;
					}
					var savedI2 = Math.max(0, w.interest - totalI2);
					var savedMos = y * 12 - accelMonths;
					var savedYrs2 = savedMos > 0 ? Math.round((savedMos / 12) * 10) / 10 : 0;
					var _exTpl = (window._i18n_current && window._i18n_current['extra-savings-html']) || 'Pay off <strong>{yrs} yrs sooner</strong> &nbsp;&middot;&nbsp; Save <strong>{saved}</strong> in interest';
					extraEl.innerHTML = _exTpl.replace('{yrs}', savedYrs2).replace('{saved}', p(savedI2));
					extraEl.style.display = '';
				})();
				var P = (g / w.total) * 100,
					q = 100 - P;
				((document.getElementById('bar-p').style.transform = 'scaleX(' + P / 100 + ')'), (document.getElementById('bar-i').style.transform = 'scaleX(' + q / 100 + ')'), (document.getElementById('pct-p').textContent = Math.round(P) + '%'), (document.getElementById('pct-i').textContent = Math.round(q) + '%'));
				var E = document.getElementById('c-principal');
				(E && ((E.textContent = p(g)), (document.getElementById('c-interest').textContent = p(w.interest)), (document.getElementById('c-total').textContent = p(w.total)), (document.getElementById('c-year').textContent = x), (document.getElementById('c-principal-pct').textContent = '(' + Math.round(P) + '%)'), (document.getElementById('c-interest-pct').textContent = '(' + Math.round(q) + '%)')),
					(function (e, a) {
						ensureChartJs(function () {
							var n = document.getElementById('loanChart');
							if (n) {
								var r = Math.round((e / (e + a)) * 100);
								document.getElementById('chart-center-pct').textContent = r + '%';
								var i = window._i18n_current,
									o = (i && i['lbl-principal-pct']) || 'Principal',
									s = (i && i['lbl-interest-pct']) || 'Interest';
								if (t) return ((t.data.labels = [o, s]), (t.data.datasets[0].data = [e, a]), void t.update('none'));
								t = new Chart(n, {
									type: 'doughnut',
									data: {
										labels: [o, s],
										datasets: [
											{
												data: [e, a],
												backgroundColor: [window.cssToken('--color-navy'), window.cssToken('--color-gold')],
												borderWidth: 0,
												hoverOffset: 6
											}
										]
									},
									options: {
										responsive: !0,
										maintainAspectRatio: !0,
										cutout: '68%',
										plugins: {
											legend: {
												display: !1
											},
											tooltip: {
												callbacks: {
													label: function (n) {
														return n.label + ': ' + p(n.raw) + ' (' + Math.round((n.raw / (e + a)) * 100) + '%)';
													}
												}
											}
										},
										animation: {
											duration: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 400
										}
									}
								});
							}
						});
					})(g, w.interest),
					(o = (function (e, a, n) {
						for (var r = a / 100 / 12, t = 12 * n, mp = h(e, a, n).monthly, bal = e, s = [], l = 1; l <= n; l++) {
							for (var u = 0, d = 0, c = bal, months = Math.min(12, t - 12 * (l - 1)), p2 = 0; p2 < months; p2++) {
								var gi = bal * r,
									fi = mp - gi;
								((d += gi), (u += fi), (bal -= fi) < 0.005 && (bal = 0));
							}
							s.push({year: l, start: c, paidP: u, paidI: d, end: Math.max(0, bal)});
						}
						return s;
					})(g, v, y)),
					(oMonthly = (function (e, a, n) {
						for (var r = a / 100 / 12, t = 12 * n, mp2 = h(e, a, n).monthly, bal2 = e, s2 = [], mo = 1; mo <= t; mo++) {
							var gi2 = bal2 * r,
								fi2 = mp2 - gi2,
								st2 = bal2;
							(bal2 -= fi2) < 0.005 && (bal2 = 0);
							s2.push({month: mo, start: st2, paidP: fi2, paidI: gi2, end: Math.max(0, bal2)});
						}
						return s2;
					})(g, v, y)),
					f(amortGran === 'monthly' ? oMonthly : o, i ? null : amortGran === 'monthly' ? 24 : 5));
				updateScenarioCard(w.monthly, w.interest, new Date().getFullYear() + y);
			} catch (e) {
				(console.error('Loan calc error:', e), k());
			}
			var C, I, D, M, R;
		}

		function updateScenarioCard(monthly, totalInterest, payoffYear) {
			var card = document.getElementById('scenario-card');
			if (!card || !savedScenario) {
				if (card) card.style.display = 'none';
				return;
			}
			var sc = savedScenario;
			var scAMonthly = document.getElementById('sc-a-monthly');
			var scAInterest = document.getElementById('sc-a-interest');
			var scAYear = document.getElementById('sc-a-year');
			var _scPerMo = (window._i18n_current && window._i18n_current['sc-per-mo']) || '/mo';
			var _scInt = (window._i18n_current && window._i18n_current['sc-interest-lbl']) || 'interest';
			var _scPo = (window._i18n_current && window._i18n_current['sc-payoff-lbl']) || 'payoff';
			if (scAMonthly) {
				scAMonthly.textContent = p(sc.monthly) + _scPerMo;
				scAMonthly.className = 'scenario-monthly';
			}
			if (scAInterest) {
				scAInterest.textContent = p(sc.totalInterest) + ' ' + _scInt;
				scAInterest.className = 'scenario-detail';
			}
			if (scAYear) {
				scAYear.textContent = sc.payoffYear + ' ' + _scPo;
				scAYear.className = 'scenario-detail';
			}
			var scCurMonthly = document.getElementById('sc-cur-monthly');
			var scCurInterest = document.getElementById('sc-cur-interest');
			var scCurYear = document.getElementById('sc-cur-year');
			var moCls = monthly < sc.monthly ? ' sc-gain' : monthly > sc.monthly ? ' sc-loss' : '';
			var intCls = totalInterest < sc.totalInterest ? ' sc-gain' : totalInterest > sc.totalInterest ? ' sc-loss' : '';
			var yrCls = payoffYear < sc.payoffYear ? ' sc-gain' : payoffYear > sc.payoffYear ? ' sc-loss' : '';
			if (scCurMonthly) {
				scCurMonthly.textContent = p(monthly) + _scPerMo;
				scCurMonthly.className = 'scenario-monthly' + moCls;
			}
			if (scCurInterest) {
				scCurInterest.textContent = p(totalInterest) + ' ' + _scInt;
				scCurInterest.className = 'scenario-detail' + intCls;
			}
			if (scCurYear) {
				scCurYear.textContent = payoffYear + ' ' + _scPo;
				scCurYear.className = 'scenario-detail' + yrCls;
			}
			card.style.display = '';
		}

		function calcAfford() {
			try {
				var sP = document.getElementById('s-afford-pmt');
				var sR = document.getElementById('s-afford-rate');
				var sT = document.getElementById('s-afford-term');
				if (!sP || !sR || !sT) return;
				var pmt = parseFloat(sP.value) || 0;
				var rate = parseFloat(sR.value) || 0;
				var term = parseInt(sT.value) || 0;
				var iP = document.getElementById('i-afford-pmt');
				var iR = document.getElementById('i-afford-rate');
				var iT = document.getElementById('i-afford-term');
				if (iP) iP.value = pmt;
				if (iR) iR.value = rate.toFixed(1);
				if (iT) iT.value = term;
				b(sP);
				b(sR);
				b(sT);
				var resLbl = document.getElementById('res-monthly-lbl');
				if (resLbl) resLbl.textContent = (window._i18n_current && window._i18n_current['afford-result-label']) || 'You could borrow up to';
				if (!pmt || !rate || !term) return;
				var rmo = rate / 100 / 12;
				var nm = term * 12;
				var pv = rmo > 0 ? (pmt * (1 - Math.pow(1 + rmo, -nm))) / rmo : pmt * nm;
				var totalPaid = pmt * nm;
				var totalInterest = Math.max(0, totalPaid - pv);
				var payoffYear = new Date().getFullYear() + term;
				var yrs = (window._i18n_current && window._i18n_current['unit-yrs']) || 'yrs';
				var resMonthly = document.getElementById('result-monthly');
				if (resMonthly) {
					resMonthly.textContent = p(pv);
					window.fitText && window.fitText(resMonthly);
				}
				var resLoanLbl = document.getElementById('result-loan-label');
				if (resLoanLbl) resLoanLbl.textContent = (window._i18n_current && window._i18n_current['afford-sub']) || 'affordability estimate';
				var resPrincipal = document.getElementById('result-principal');
				if (resPrincipal) resPrincipal.textContent = p(pv);
				var resInterest2 = document.getElementById('result-interest');
				if (resInterest2) resInterest2.textContent = p(totalInterest);
				var resTotal = document.getElementById('result-total');
				if (resTotal) resTotal.textContent = p(totalPaid);
				var resYear = document.getElementById('result-year');
				if (resYear) resYear.textContent = payoffYear + ' (' + term + ' ' + yrs + ')';
				var P2 = pv > 0 ? (pv / totalPaid) * 100 : 0;
				var q2 = 100 - P2;
				var barP = document.getElementById('bar-p');
				var barI = document.getElementById('bar-i');
				if (barP) barP.style.transform = 'scaleX(' + P2 / 100 + ')';
				if (barI) barI.style.transform = 'scaleX(' + q2 / 100 + ')';
				var pctP = document.getElementById('pct-p');
				var pctI = document.getElementById('pct-i');
				if (pctP) pctP.textContent = Math.round(P2) + '%';
				if (pctI) pctI.textContent = Math.round(q2) + '%';
			} catch (e2) {
				console.error('Afford calc error:', e2);
			}
		}

		function y(e) {
			((r = e), (window._currentTab = e));
			var a = n[e];
			document.querySelectorAll('.tab-btn[data-tab]').forEach(function (a) {
				var n = a.dataset.tab === e;
				(a.classList.toggle('active', n), a.setAttribute('aria-selected', n));
			});
			if (e === 'afford') {
				var lc2 = document.getElementById('loan-type-content');
				var ap2 = document.getElementById('afford-panel');
				if (lc2) lc2.style.display = 'none';
				if (ap2) ap2.style.display = '';
				var cs2 = document.querySelector('.chart-section');
				var as2 = document.querySelector('.amort-section');
				if (cs2) cs2.style.display = 'none';
				if (as2) as2.style.display = 'none';
				var fe2 = document.getElementById('freq-toggle');
				if (fe2) fe2.style.display = 'none';
				var eg2 = document.getElementById('extra-input-group');
				if (eg2) eg2.style.display = 'none';
				var sb2 = document.getElementById('save-scenario-btn');
				if (sb2) sb2.style.display = 'none';
				var sc2b = document.getElementById('scenario-card');
				if (sc2b) sc2b.style.display = 'none';
				var sym2 = window.getCurrencySym ? window.getCurrencySym() : '$';
				var affordSymEl = document.getElementById('afford-sym');
				if (affordSymEl) affordSymEl.textContent = sym2;
				var affordPmtMaxLbl = document.getElementById('afford-pmt-max-lbl');
				if (affordPmtMaxLbl) affordPmtMaxLbl.textContent = sym2 + '50,000';
				calcAfford();
				return;
			}
			// Restore sections when switching away from afford
			(function () {
				var lc3 = document.getElementById('loan-type-content');
				var ap3 = document.getElementById('afford-panel');
				if (lc3) lc3.style.display = '';
				if (ap3) ap3.style.display = 'none';
				var cs3 = document.querySelector('.chart-section');
				var as3 = document.querySelector('.amort-section');
				if (cs3) cs3.style.display = '';
				if (as3) as3.style.display = '';
				var resLbl3 = document.getElementById('res-monthly-lbl');
				if (resLbl3) resLbl3.textContent = (window._i18n_current && window._i18n_current['res-monthly']) || 'Monthly payment';
				var sb3 = document.getElementById('save-scenario-btn');
				if (sb3) sb3.style.display = '';
			})();
			var t = document.getElementById('loan-type-content');
			(t && t.setAttribute('aria-labelledby', 'loan-tab-' + e), (s.min = a.amountMin), (s.max = a.amountMax), (s.step = a.amountStep), (s.value = a.amount), (l.min = a.rateMin), (l.max = a.rateMax), (l.value = a.rate), (u.min = a.termMin), (u.max = a.termMax), (u.value = a.term));
			var o = window.getCurrencySym();
			((document.getElementById('amount-min-lbl').textContent = o + g(a.amountMin)), (document.getElementById('amount-max-lbl').textContent = o + g(a.amountMax)), (document.getElementById('rate-min-lbl').textContent = a.rateMin + '%'), (document.getElementById('rate-max-lbl').textContent = a.rateMax + '%'));
			var d = (window._i18n_current && window._i18n_current['unit-yr']) || 'yr',
				c = (window._i18n_current && window._i18n_current['unit-yrs']) || 'yrs';
			((document.getElementById('term-min-lbl').textContent = a.termMin + ' ' + d), (document.getElementById('term-max-lbl').textContent = a.termMax + ' ' + c));
			var m = function (e) {
				return (window._i18n_current && window._i18n_current[e]) || a.label;
			};
			((document.getElementById('result-loan-label').textContent = m('loan-label-' + e)), (document.getElementById('helper-title').textContent = 'mortgage' === e ? a.helperTitle || m('helper-title-' + e) : m('helper-title-' + e) || a.helperTitle), (document.getElementById('helper-text').textContent = 'mortgage' === e ? a.helperText || m('helper-text-' + e) : m('helper-text-' + e) || a.helperText), window._postSwitchTabCBE && window._postSwitchTabCBE(e), (i = !1));
			var freqEl = document.getElementById('freq-toggle');
			if (freqEl) {
				freqEl.style.display = e === 'mortgage' ? '' : 'none';
				if (e !== 'mortgage' && freqMode !== 'monthly') {
					freqMode = 'monthly';
					freqEl.querySelectorAll('.freq-btn').forEach(function (b) {
						b.classList.toggle('active', b.dataset.freq === 'monthly');
					});
				}
			}
			var extraGrp = document.getElementById('extra-input-group');
			if (extraGrp) extraGrp.style.display = e === 'mortgage' ? '' : 'none';
			if (e !== 'mortgage' && sExtra) {
				sExtra.value = 0;
				if (iExtra) iExtra.value = 0;
			}
			v();
		}
		((window.updateSliderFillGlobal = b),
			document.addEventListener('input', function (e) {
				'range' === e.target.type && window.updateSliderFillGlobal && window.updateSliderFillGlobal(e.target);
			}),
			requestAnimationFrame(function () {
				document.querySelectorAll('input[type=range]').forEach(function (e) {
					window.updateSliderFillGlobal && window.updateSliderFillGlobal(e);
				});
			}),
			(window.applyCurrency = function (e) {
				var a = window.CURRENCY_CONFIG[e];
				(a || ((e = 'USD'), (a = window.CURRENCY_CONFIG.USD)),
					(window.APP_CURRENCY = e),
					document.querySelectorAll('.ig-sym').forEach(function (e) {
						e.textContent = a.symbol;
					}),
					document.querySelectorAll('.cur-chip').forEach(function (n) {
						n.textContent = e;
					}));
				var t = {
					mortgage: {
						amtMul: 1,
						rateMul: 1,
						termDef: 30
					},
					car: {
						amtMul: 0.08,
						rateMul: 1.15,
						termDef: 5
					},
					personal: {
						amtMul: 0.033,
						rateMul: 1.7,
						termDef: 3
					},
					student: {
						amtMul: 0.12,
						rateMul: 0.85,
						termDef: 10
					}
				};
				(['mortgage', 'car', 'personal', 'student'].forEach(function (e) {
					var r = t[e],
						i = Math.round(a.loanDefault * r.amtMul),
						o = Math.max(1, Math.round(a.loanStep * r.amtMul));
					((n[e].amount = i), (n[e].amountMin = Math.round(a.loanMin * r.amtMul) || a.loanMin), (n[e].amountMax = Math.round(a.loanMax * r.amtMul)), (n[e].amountStep = o), (n[e].rate = Math.round(a.rateDefault * r.rateMul * 10) / 10), (n[e].rateMax = Math.round(a.rateMax * r.rateMul)));
				}),
					(n.mortgage.helperTitle = 'ar' === window.APP_LANG && window._seoCtx && window._seoCtx[e] && window._seoCtx[e][2] ? window._seoCtx[e][2] + ' - سوق الرهن العقاري' : e + ' mortgage market'),
					(n.mortgage.helperText = a.note),
					y(r));
				if (sExtra) {
					var extraMax = Math.round(a.loanDefault / 200);
					var extraStep = Math.max(10, Math.round(a.loanDefault / 4000));
					sExtra.max = extraMax;
					sExtra.step = extraStep;
					if (iExtra) {
						iExtra.max = extraMax;
						iExtra.step = extraStep;
					}
					var sym = a.symbol;
					var maxLbl = document.getElementById('extra-max-lbl');
					if (maxLbl) maxLbl.textContent = sym + new Intl.NumberFormat().format(extraMax);
					sExtra.value = 0;
					if (iExtra) iExtra.value = 0;
					var savEl = document.getElementById('extra-savings');
					if (savEl) savEl.style.display = 'none';
				}
				var i = document.getElementById('ci-s-principal'),
					o = document.getElementById('ci-s-rate'),
					s = document.getElementById('ci-s-monthly');
				if (i) {
					var l = Math.round(0.02 * a.savingsDefault);
					((i.max = a.loanMax), (i.step = a.loanStep), (i.value = a.savingsDefault), (document.getElementById('ci-i-principal').value = a.savingsDefault), (s.max = Math.round(2 * a.loanStep)), (s.value = l), (document.getElementById('ci-i-monthly').value = l));
					var u = document.getElementById('ci-p-min-lbl'),
						d = document.getElementById('ci-p-max-lbl');
					(u && (u.textContent = a.symbol + g(i.min || 100)), d && (d.textContent = a.symbol + g(a.loanMax)));
					var c = document.getElementById('ci-m-min-lbl'),
						m = document.getElementById('ci-m-max-lbl');
					(c && (c.textContent = a.symbol + '0'), m && (m.textContent = a.symbol + g(Math.round(2 * a.loanStep)) + ((window._i18n_current && window._i18n_current['unit-mo']) || '/mo')));
				}
				(o && ((o.value = a.savingsRate), (document.getElementById('ci-i-rate').value = a.savingsRate)), window.calcCI && window.calcCI());
				var p = document.getElementById('rf-s-balance'),
					h = document.getElementById('rf-s-oldrate'),
					f = document.getElementById('rf-s-newrate');
				if (p) {
					var b = Math.round(0.83 * a.loanDefault);
					((p.min = a.loanMin), (p.max = a.loanMax), (p.step = a.loanStep), (p.value = b), (document.getElementById('rf-i-balance').value = b));
					var k = document.getElementById('rf-bal-min-lbl'),
						v = document.getElementById('rf-bal-max-lbl');
					(k && (k.textContent = a.symbol + g(a.loanMin)), v && (v.textContent = a.symbol + g(a.loanMax)));
				}
				var w = Math.max(1, Math.round(a.loanStep / 50)),
					z = a.loanDefault / 3e5,
					A = Math.round((2e4 * z) / w) * w,
					x = Math.max(w, Math.round((3e3 * z) / w) * w),
					S = document.getElementById('rf-s-costs'),
					P = document.getElementById('rf-i-costs');
				(S && ((S.min = 0), (S.max = A), (S.step = w), (S.value = x)), P && ((P.min = 0), (P.max = A), (P.step = w), (P.value = x)));
				var q = document.getElementById('rf-costs-min-lbl'),
					E = document.getElementById('rf-costs-max-lbl');
				if ((q && (q.textContent = a.symbol + '0'), E && (E.textContent = a.symbol + g(A)), h)) {
					var C = Math.round(115 * a.rateDefault) / 100;
					((h.value = C), (document.getElementById('rf-i-oldrate').value = C));
				}
				(f && ((f.value = a.rateDefault), (document.getElementById('rf-i-newrate').value = a.rateDefault)),
					window.calcRF && window.calcRF(),
					window._setCurrencyPref && window._setCurrencyPref(e),
					window._fetchCBERateIfEGP && window._fetchCBERateIfEGP(e),
					window.updateCommodityLocal && window.updateCommodityLocal(),
					requestAnimationFrame(function () {
						document.querySelectorAll('input[type=range]').forEach(function (e) {
							window.updateSliderFillGlobal && window.updateSliderFillGlobal(e);
						});
					}));
			}),
			(window.switchTab = y),
			(window.update = v));
		var w = null;

		function z() {
			(w && cancelAnimationFrame(w),
				(w = requestAnimationFrame(function () {
					((w = null), v());
				})));
		}
		([s, l, u].forEach(function (e) {
			e.addEventListener('input', z);
		}),
			sExtra && sExtra.addEventListener('input', z),
			d.addEventListener('input', function () {
				var e = parseFloat(this.value);
				!isNaN(e) && e >= parseFloat(s.min) && e <= parseFloat(s.max) && ((s.value = e), v());
			}),
			c.addEventListener('input', function () {
				var e = parseFloat(this.value);
				!isNaN(e) && e >= parseFloat(l.min) && e <= parseFloat(l.max) && ((l.value = e), v());
			}),
			m.addEventListener('input', function () {
				var e = parseInt(this.value);
				!isNaN(e) && e >= parseInt(u.min) && e <= parseInt(u.max) && ((u.value = e), v());
			}),
			iExtra &&
				iExtra.addEventListener('input', function () {
					var e = parseFloat(this.value) || 0;
					e = Math.max(0, Math.min(parseFloat(sExtra.max) || 2000, e));
					sExtra.value = e;
					v();
				}),
			d.addEventListener('blur', function () {
				var e = parseFloat(this.value);
				if (isNaN(e)) this.value = s.value;
				else {
					var a = Math.min(parseFloat(s.max), Math.max(parseFloat(s.min), e));
					a !== e && ((this.value = a), (s.value = a), v());
				}
			}),
			c.addEventListener('blur', function () {
				var e = parseFloat(this.value);
				if (isNaN(e)) this.value = l.value;
				else {
					var a = Math.min(parseFloat(l.max), Math.max(parseFloat(l.min), e));
					if (a !== e) {
						var n = Math.round(10 * a) / 10;
						((this.value = n), (l.value = n), v());
					}
				}
			}),
			m.addEventListener('blur', function () {
				var e = parseInt(this.value);
				if (isNaN(e)) this.value = u.value;
				else {
					var a = Math.min(parseInt(u.max), Math.max(parseInt(u.min), e));
					a !== e && ((this.value = a), (u.value = a), v());
				}
			}),
			document.querySelectorAll('.tab-btn[data-tab]').forEach(function (e) {
				e.addEventListener('click', function () {
					y(this.dataset.tab);
				});
			}),
			document.getElementById('toggle-rows').addEventListener('click', function () {
				i = !i;
				var data = amortGran === 'monthly' ? oMonthly : o;
				f(data, i ? null : amortGran === 'monthly' ? 24 : 5);
				this.setAttribute('aria-expanded', i);
			}),
			(function () {
				var gran = document.getElementById('amort-gran-toggle');
				gran &&
					gran.addEventListener('click', function (ev) {
						var btn = ev.target.closest('.amort-gran-btn');
						if (!btn) return;
						var g = btn.dataset.gran;
						if (g === amortGran) return;
						amortGran = g;
						gran.querySelectorAll('.amort-gran-btn').forEach(function (b) {
							b.classList.toggle('active', b.dataset.gran === g);
						});
						i = false;
						var data = amortGran === 'monthly' ? oMonthly : o;
						f(data, amortGran === 'monthly' ? 24 : 5);
						document.getElementById('toggle-rows') && document.getElementById('toggle-rows').setAttribute('aria-expanded', false);
					});
			})(),
			(function () {
				var ftog = document.getElementById('freq-toggle');
				ftog &&
					ftog.addEventListener('click', function (ev) {
						var btn = ev.target.closest('.freq-btn');
						if (!btn) return;
						var f2 = btn.dataset.freq;
						if (f2 === freqMode) return;
						freqMode = f2;
						ftog.querySelectorAll('.freq-btn').forEach(function (b) {
							b.classList.toggle('active', b.dataset.freq === f2);
						});
						v();
					});
			})(),
			(function () {
				var sAP = document.getElementById('s-afford-pmt');
				var sAR = document.getElementById('s-afford-rate');
				var sAT = document.getElementById('s-afford-term');
				var iAP = document.getElementById('i-afford-pmt');
				var iAR = document.getElementById('i-afford-rate');
				var iAT = document.getElementById('i-afford-term');
				if (sAP)
					sAP.addEventListener('input', function () {
						if (r === 'afford') {
							if (iAP) iAP.value = sAP.value;
							b(sAP);
							calcAfford();
						}
					});
				if (sAR)
					sAR.addEventListener('input', function () {
						if (r === 'afford') {
							if (iAR) iAR.value = parseFloat(sAR.value).toFixed(1);
							b(sAR);
							calcAfford();
						}
					});
				if (sAT)
					sAT.addEventListener('input', function () {
						if (r === 'afford') {
							if (iAT) iAT.value = sAT.value;
							b(sAT);
							calcAfford();
						}
					});
				if (iAP)
					iAP.addEventListener('input', function () {
						var v2 = Math.max(100, Math.min(50000, parseFloat(iAP.value) || 0));
						if (sAP) {
							sAP.value = v2;
							b(sAP);
						}
						if (r === 'afford') calcAfford();
					});
				if (iAR)
					iAR.addEventListener('input', function () {
						var v2 = Math.max(0.1, Math.min(30, parseFloat(iAR.value) || 0));
						if (sAR) {
							sAR.value = v2;
							b(sAR);
						}
						if (r === 'afford') calcAfford();
					});
				if (iAT)
					iAT.addEventListener('input', function () {
						var v2 = Math.max(1, Math.min(30, parseInt(iAT.value) || 0));
						if (sAT) {
							sAT.value = v2;
							b(sAT);
						}
						if (r === 'afford') calcAfford();
					});
			})(),
			(function () {
				var saveBtn = document.getElementById('save-scenario-btn');
				var clearBtn = document.getElementById('scenario-clear-btn');
				if (saveBtn)
					saveBtn.addEventListener('click', function () {
						var sAmt = parseFloat(document.getElementById('s-amount') && document.getElementById('s-amount').value) || 0;
						var sRate = parseFloat(document.getElementById('s-rate') && document.getElementById('s-rate').value) || 0;
						var sTerm = parseInt(document.getElementById('s-term') && document.getElementById('s-term').value) || 0;
						if (!sAmt || !sRate || !sTerm) return;
						var ww = h(sAmt, sRate, sTerm);
						var payY = new Date().getFullYear() + sTerm;
						savedScenario = {monthly: ww.monthly, totalInterest: ww.interest, payoffYear: payY, type: r};
						saveBtn.textContent = (window._i18n_current && window._i18n_current['btn-saved']) || 'Saved!';
						saveBtn.classList.add('saved');
						updateScenarioCard(ww.monthly, ww.interest, payY);
					});
				if (clearBtn)
					clearBtn.addEventListener('click', function () {
						savedScenario = null;
						var card = document.getElementById('scenario-card');
						if (card) card.style.display = 'none';
						var saveBtn2 = document.getElementById('save-scenario-btn');
						if (saveBtn2) {
							saveBtn2.textContent = (window._i18n_current && window._i18n_current['btn-save-scenario']) || 'Save as Scenario A';
							saveBtn2.classList.remove('saved');
						}
					});
			})());
		var A = document.getElementById('export-csv-btn');
		(A &&
			A.addEventListener('click', function () {
				var csvSrc = amortGran === 'monthly' ? oMonthly : o;
				if (csvSrc && csvSrc.length) {
					var baseYr = new Date().getFullYear();
					var rows;
					if (amortGran === 'monthly') {
						rows = [['Month', 'Starting Balance', 'Principal Paid', 'Interest Paid', 'Ending Balance']];
						csvSrc.forEach(function (n) {
							var yr = baseYr + Math.floor((n.month - 1) / 12);
							var mo = (n.month - 1) % 12;
							var lbl = new Date(yr, mo).toLocaleDateString('en-US', {month: 'short', year: 'numeric'});
							rows.push([lbl, n.start.toFixed(2), n.paidP.toFixed(2), n.paidI.toFixed(2), Math.max(0, n.end).toFixed(2)]);
						});
					} else {
						rows = [['Year', 'Starting Balance', 'Principal Paid', 'Interest Paid', 'Ending Balance']];
						csvSrc.forEach(function (n) {
							rows.push([baseYr + n.year - 1, n.start.toFixed(2), n.paidP.toFixed(2), n.paidI.toFixed(2), Math.max(0, n.end).toFixed(2)]);
						});
					}
					var csvStr = rows
							.map(function (e) {
								return e
									.map(function (e) {
										return '"' + String(e).replace(/"/g, '""') + '"';
									})
									.join(',');
							})
							.join('\r\n'),
						blob = new Blob([csvStr], {type: 'text/csv;charset=utf-8;'}),
						url = URL.createObjectURL(blob),
						link = document.createElement('a');
					((link.href = url), (link.download = 'amortization-schedule.csv'), document.body.appendChild(link), link.click(), document.body.removeChild(link), URL.revokeObjectURL(url));
				}
			}),
			document.querySelectorAll('.faq-q').forEach(function (e) {
				e.addEventListener('click', function () {
					var e = this.parentElement,
						a = e.classList.contains('open');
					(document.querySelectorAll('.faq-item').forEach(function (e) {
						(e.classList.remove('open'), e.querySelector('.faq-q').setAttribute('aria-expanded', 'false'));
					}),
						a || (e.classList.add('open'), this.setAttribute('aria-expanded', 'true')));
				});
			}),
			(document.getElementById('copy-year').textContent = new Date().getFullYear()));
		var x = document.getElementById('reset-defaults-btn');
		if (x) {
			var S,
				P = !1;
			x.addEventListener('click', function () {
				if (P) (clearTimeout(S), (P = !1), (this.textContent = this.dataset.origLabel), y(r));
				else {
					((P = !0), (this.dataset.origLabel = this.textContent), (this.textContent = 'Confirm reset?'));
					var e = this;
					S = setTimeout(function () {
						((P = !1), (e.textContent = e.dataset.origLabel));
					}, 3e3);
				}
			});
		}
		(document.querySelectorAll('.faq-item').forEach(function (e, a) {
			if (a < 2) {
				e.classList.add('open');
				var n = e.querySelector('.faq-q');
				n && n.setAttribute('aria-expanded', 'true');
			}
		}),
			y('mortgage'),
			v());
	})(),
	(function () {
		'use strict';
		var e = null;

		function a(e) {
			return window.fmtMoney(e);
		}

		function n() {
			var n = parseFloat(document.getElementById('ci-s-principal').value) || 0,
				r = parseFloat(document.getElementById('ci-s-monthly').value) || 0,
				t = (parseFloat(document.getElementById('ci-s-rate').value) || 0) / 100 / 12,
				i = parseInt(document.getElementById('ci-s-years').value) || 0,
				o = 12 * i,
				s = n * Math.pow(1 + t, o),
				l = n + r * o,
				u = (s += t > 0 ? (r * (Math.pow(1 + t, o) - 1)) / t : r * o) - l,
				d = l > 0 ? s / l : 0,
				c = new Date().getFullYear() + i;
			((document.getElementById('ci-result-fv').textContent = a(s)), window.fitText && window.fitText(document.getElementById('ci-result-fv')), (document.getElementById('ci-result-deposited').textContent = a(l)), (document.getElementById('ci-result-earned').textContent = a(u)));
			((document.getElementById('ci-result-mult').textContent =
				new Intl.NumberFormat('en-US', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				}).format(d) + '×'),
				(document.getElementById('ci-result-year').textContent = c),
				(document.getElementById('ci-result-years-lbl').textContent = i));
			var g = s > 0 ? Math.round((l / s) * 100) : 0,
				h = 100 - g;
			((document.getElementById('ci-bar-d').style.transform = 'scaleX(' + g / 100 + ')'),
				(document.getElementById('ci-bar-g').style.transform = 'scaleX(' + h / 100 + ')'),
				(document.getElementById('ci-pct-d').textContent = g + '%'),
				(document.getElementById('ci-pct-g').textContent = h + '%'),
				(function (a, n, r, t) {
					if (!window.Chart) return;
					for (
						var i = function (e) {
								return (window._i18n_current && window._i18n_current[e]) || e;
							},
							o = i('ci-deposited'),
							s = i('ci-earned-short'),
							l = i('unit-yr'),
							u = [],
							d = [],
							c = [],
							m = 1;
						m <= t;
						m++
					) {
						var p = 12 * m,
							g = a * Math.pow(1 + r, p);
						g += r > 0 ? (n * (Math.pow(1 + r, p) - 1)) / r : n * p;
						var h = a + n * p;
						(u.push(1 === m ? '1 ' + l : m % 5 == 0 ? m + ' ' + l : ''), d.push(Math.round(h)), c.push(Math.round(Math.max(0, g - h))));
					}
					e
						? ((e.data.labels = u), (e.data.datasets[0].label = o), (e.data.datasets[0].data = d), (e.data.datasets[1].label = s), (e.data.datasets[1].data = c), e.update('none'))
						: ensureChartJs(function () {
								e = new Chart(document.getElementById('ciChart'), {
									type: 'bar',
									data: {
										labels: u,
										datasets: [
											{
												label: o,
												data: d,
												backgroundColor: window.cssToken('--color-navy-mid'),
												borderWidth: 0,
												stack: 's'
											},
											{
												label: s,
												data: c,
												backgroundColor: window.cssToken('--color-gold'),
												borderWidth: 0,
												stack: 's'
											}
										]
									},
									options: {
										responsive: !0,
										maintainAspectRatio: !1,
										plugins: {
											legend: {
												display: !1
											},
											tooltip: {
												callbacks: {
													label: function (e) {
														return e.dataset.label + ': ' + window.fmtMoney(e.raw);
													}
												}
											}
										},
										scales: {
											x: {
												stacked: !0,
												grid: {
													display: !1
												},
												ticks: {
													color: window.cssToken('--color-muted'),
													font: {
														size: 11
													},
													maxRotation: 0
												}
											},
											y: {
												stacked: !0,
												grid: {
													color: 'rgba(0,0,0,0.05)'
												},
												ticks: {
													color: window.cssToken('--color-muted'),
													font: {
														size: 11
													},
													callback: function (e) {
														var a = window.getCurrencySym(),
															n = window.CURRENCY_CONFIG && window.CURRENCY_CONFIG[window.APP_CURRENCY],
															r = n ? n.localeale : 'en-US';
														return e >= 1e6
															? a +
																	new Intl.NumberFormat(window._fmtLoc(r), {
																		maximumFractionDigits: 1
																	}).format(e / 1e6) +
																	'M'
															: e >= 1e3
																? a +
																	new Intl.NumberFormat(window._fmtLoc(r), {
																		maximumFractionDigits: 0
																	}).format(e / 1e3) +
																	'k'
																: a + e;
													}
												}
											}
										}
									}
								});
							});
				})(n, r, t, i));
		}
		((window.initCIChart = function () {
			n();
		}),
			(window.calcCI = n),
			['ci-s-principal', 'ci-s-monthly', 'ci-s-rate', 'ci-s-years'].forEach(function (e) {
				var a = document.getElementById(e),
					r = e.replace('ci-s-', 'ci-i-');
				a.addEventListener('input', function () {
					((document.getElementById(r).value = this.value), n());
				});
			}),
			['ci-i-principal', 'ci-i-monthly', 'ci-i-rate'].forEach(function (e) {
				document.getElementById(e).addEventListener('input', function () {
					var a = e.replace('ci-i-', 'ci-s-'),
						r = document.getElementById(a);
					parseFloat(this.value) >= parseFloat(r.min) && parseFloat(this.value) <= parseFloat(r.max) && ((r.value = this.value), n());
				});
			}),
			document.getElementById('ci-i-years').addEventListener('input', function () {
				var e = document.getElementById('ci-s-years'),
					a = parseInt(this.value);
				!isNaN(a) && a >= parseInt(e.min) && a <= parseInt(e.max) && ((e.value = a), n());
			}),
			(document.getElementById('ci-i-principal').value = document.getElementById('ci-s-principal').value),
			(document.getElementById('ci-i-monthly').value = document.getElementById('ci-s-monthly').value),
			(document.getElementById('ci-i-rate').value = document.getElementById('ci-s-rate').value),
			(document.getElementById('ci-i-years').value = document.getElementById('ci-s-years').value),
			document.getElementById('ci-result-fv') && n());
	})(),
	(function () {
		'use strict';

		function e(e) {
			return window.fmtMoney(Math.abs(e));
		}

		function a(e, a, n) {
			var r = a / 100 / 12,
				t = 12 * n;
			if (!t) return 0;
			if (0 === r) return e / t;
			var i = Math.pow(1 + r, t);
			return (e * (r * i)) / (i - 1);
		}

		function n() {
			var n = parseFloat(document.getElementById('rf-s-balance').value) || 0,
				r = parseFloat(document.getElementById('rf-s-oldrate').value) || 0,
				t = parseInt(document.getElementById('rf-s-remaining').value) || 0,
				i = parseFloat(document.getElementById('rf-s-newrate').value) || 0,
				o = parseFloat(document.getElementById('rf-s-costs').value) || 0,
				s = a(n, r, t),
				l = a(n, i, t),
				u = s - l,
				d = u * t * 12 - o,
				c = u > 0 ? Math.ceil(o / u) : 1 / 0;
			((document.getElementById('rf-result-old').textContent = e(s)), (document.getElementById('rf-result-new').textContent = e(l)), (document.getElementById('rf-result-monthly').textContent = (u >= 0 ? '' : '-') + e(u)), window.fitText && window.fitText(document.getElementById('rf-result-monthly')), (document.getElementById('rf-result-total').textContent = (d >= 0 ? '' : '-') + e(d)));
			var m = function (e) {
				return (window._i18n_rf && window._i18n_rf[e]) || e;
			};
			if (c === 1 / 0 || c < 0) document.getElementById('rf-result-breakeven').textContent = m('rf-never');
			else if (c > 12 * t) document.getElementById('rf-result-breakeven').textContent = m('rf-over-term').replace('{n}', t);
			else {
				var p = Math.floor(c / 12),
					g = c % 12;
				document.getElementById('rf-result-breakeven').textContent = p > 0 ? m('rf-years-mo').replace('{y}', p).replace('{m}', g) : m('rf-months').replace('{n}', g);
			}
			var h = document.getElementById('rf-verdict');
			if (u <= 0) ((h.textContent = m('rf-verdict-higher')), (h.className = 'rf-verdict negative'));
			else if (c > 12 * t) ((h.textContent = m('rf-verdict-long')), (h.className = 'rf-verdict warn'));
			else {
				var f = document.getElementById('rf-result-breakeven').textContent;
				((h.textContent = m('rf-verdict-summary').replace('{monthly}', e(u)).replace('{total}', e(d)).replace('{breakeven}', f) + ' ' + m('rf-verdict-good')), (h.className = 'rf-verdict positive'));
			}
		}
		var r, t;
		((window.calcRF = n),
			['balance', 'oldrate', 'newrate', 'costs'].forEach(function (e) {
				var a = document.getElementById('rf-s-' + e),
					r = document.getElementById('rf-i-' + e);
				(a.addEventListener('input', function () {
					((r.value = this.value), n());
				}),
					r.addEventListener('input', function () {
						parseFloat(this.value) >= parseFloat(a.min) && parseFloat(this.value) <= parseFloat(a.max) && ((a.value = this.value), n());
					}),
					r.addEventListener('blur', function () {
						var e = parseFloat(this.value);
						if (isNaN(e)) this.value = a.value;
						else {
							var r = Math.min(parseFloat(a.max), Math.max(parseFloat(a.min), e));
							r !== e && ((this.value = r), (a.value = r), n());
						}
					}),
					(r.value = a.value));
			}),
			(r = document.getElementById('rf-s-remaining')),
			(t = document.getElementById('rf-i-remaining')),
			r.addEventListener('input', function () {
				((t.value = this.value), n());
			}),
			t.addEventListener('input', function () {
				var e = parseInt(this.value);
				!isNaN(e) && e >= parseInt(r.min) && e <= parseInt(r.max) && ((r.value = e), n());
			}),
			t.addEventListener('blur', function () {
				var e = parseInt(this.value);
				if (isNaN(e)) this.value = r.value;
				else {
					var a = Math.min(parseInt(r.max), Math.max(parseInt(r.min), e));
					a !== e && ((this.value = a), (r.value = a), n());
				}
			}),
			(t.value = r.value),
			n());
	})(),
	(function () {
		'use strict';
		var e = 'loancalc_prefs';
		window.ALL_CURRENCIES = [
			{
				code: 'AED',
				name: 'UAE Dirham'
			},
			{
				code: 'AFN',
				name: 'Afghan Afghani'
			},
			{
				code: 'ALL',
				name: 'Albanian Lek'
			},
			{
				code: 'AMD',
				name: 'Armenian Dram'
			},
			{
				code: 'ANG',
				name: 'Netherlands Antillean Guilder'
			},
			{
				code: 'AOA',
				name: 'Angolan Kwanza'
			},
			{
				code: 'ARS',
				name: 'Argentine Peso'
			},
			{
				code: 'AUD',
				name: 'Australian Dollar'
			},
			{
				code: 'AWG',
				name: 'Aruban Florin'
			},
			{
				code: 'AZN',
				name: 'Azerbaijani Manat'
			},
			{
				code: 'BAM',
				name: 'Bosnian Mark'
			},
			{
				code: 'BBD',
				name: 'Barbadian Dollar'
			},
			{
				code: 'BDT',
				name: 'Bangladeshi Taka'
			},
			{
				code: 'BGN',
				name: 'Bulgarian Lev'
			},
			{
				code: 'BHD',
				name: 'Bahraini Dinar'
			},
			{
				code: 'BIF',
				name: 'Burundian Franc'
			},
			{
				code: 'BMD',
				name: 'Bermudan Dollar'
			},
			{
				code: 'BND',
				name: 'Brunei Dollar'
			},
			{
				code: 'BOB',
				name: 'Bolivian Boliviano'
			},
			{
				code: 'BRL',
				name: 'Brazilian Real'
			},
			{
				code: 'BSD',
				name: 'Bahamian Dollar'
			},
			{
				code: 'BTN',
				name: 'Bhutanese Ngultrum'
			},
			{
				code: 'BWP',
				name: 'Botswanan Pula'
			},
			{
				code: 'BYN',
				name: 'Belarusian Ruble'
			},
			{
				code: 'BZD',
				name: 'Belize Dollar'
			},
			{
				code: 'CAD',
				name: 'Canadian Dollar'
			},
			{
				code: 'CDF',
				name: 'Congolese Franc'
			},
			{
				code: 'CHF',
				name: 'Swiss Franc'
			},
			{
				code: 'CLP',
				name: 'Chilean Peso'
			},
			{
				code: 'CNY',
				name: 'Chinese Yuan'
			},
			{
				code: 'COP',
				name: 'Colombian Peso'
			},
			{
				code: 'CRC',
				name: 'Costa Rican Colón'
			},
			{
				code: 'CUP',
				name: 'Cuban Peso'
			},
			{
				code: 'CVE',
				name: 'Cape Verdean Escudo'
			},
			{
				code: 'CZK',
				name: 'Czech Koruna'
			},
			{
				code: 'DJF',
				name: 'Djiboutian Franc'
			},
			{
				code: 'DKK',
				name: 'Danish Krone'
			},
			{
				code: 'DOP',
				name: 'Dominican Peso'
			},
			{
				code: 'DZD',
				name: 'Algerian Dinar'
			},
			{
				code: 'EGP',
				name: 'Egyptian Pound'
			},
			{
				code: 'ERN',
				name: 'Eritrean Nakfa'
			},
			{
				code: 'ETB',
				name: 'Ethiopian Birr'
			},
			{
				code: 'EUR',
				name: 'Euro'
			},
			{
				code: 'FJD',
				name: 'Fijian Dollar'
			},
			{
				code: 'FKP',
				name: 'Falkland Islands Pound'
			},
			{
				code: 'GBP',
				name: 'British Pound'
			},
			{
				code: 'GEL',
				name: 'Georgian Lari'
			},
			{
				code: 'GHS',
				name: 'Ghanaian Cedi'
			},
			{
				code: 'GIP',
				name: 'Gibraltar Pound'
			},
			{
				code: 'GMD',
				name: 'Gambian Dalasi'
			},
			{
				code: 'GNF',
				name: 'Guinean Franc'
			},
			{
				code: 'GTQ',
				name: 'Guatemalan Quetzal'
			},
			{
				code: 'GYD',
				name: 'Guyanese Dollar'
			},
			{
				code: 'HKD',
				name: 'Hong Kong Dollar'
			},
			{
				code: 'HNL',
				name: 'Honduran Lempira'
			},
			{
				code: 'HTG',
				name: 'Haitian Gourde'
			},
			{
				code: 'HUF',
				name: 'Hungarian Forint'
			},
			{
				code: 'IDR',
				name: 'Indonesian Rupiah'
			},
			{
				code: 'INR',
				name: 'Indian Rupee'
			},
			{
				code: 'IQD',
				name: 'Iraqi Dinar'
			},
			{
				code: 'IRR',
				name: 'Iranian Rial'
			},
			{
				code: 'ISK',
				name: 'Icelandic Króna'
			},
			{
				code: 'JMD',
				name: 'Jamaican Dollar'
			},
			{
				code: 'JOD',
				name: 'Jordanian Dinar'
			},
			{
				code: 'JPY',
				name: 'Japanese Yen'
			},
			{
				code: 'KES',
				name: 'Kenyan Shilling'
			},
			{
				code: 'KGS',
				name: 'Kyrgyzstani Som'
			},
			{
				code: 'KHR',
				name: 'Cambodian Riel'
			},
			{
				code: 'KMF',
				name: 'Comorian Franc'
			},
			{
				code: 'KRW',
				name: 'South Korean Won'
			},
			{
				code: 'KWD',
				name: 'Kuwaiti Dinar'
			},
			{
				code: 'KYD',
				name: 'Cayman Islands Dollar'
			},
			{
				code: 'KZT',
				name: 'Kazakhstani Tenge'
			},
			{
				code: 'LAK',
				name: 'Laotian Kip'
			},
			{
				code: 'LBP',
				name: 'Lebanese Pound'
			},
			{
				code: 'LKR',
				name: 'Sri Lankan Rupee'
			},
			{
				code: 'LRD',
				name: 'Liberian Dollar'
			},
			{
				code: 'LSL',
				name: 'Lesotho Loti'
			},
			{
				code: 'LYD',
				name: 'Libyan Dinar'
			},
			{
				code: 'MAD',
				name: 'Moroccan Dirham'
			},
			{
				code: 'MDL',
				name: 'Moldovan Leu'
			},
			{
				code: 'MGA',
				name: 'Malagasy Ariary'
			},
			{
				code: 'MKD',
				name: 'Macedonian Denar'
			},
			{
				code: 'MMK',
				name: 'Myanmar Kyat'
			},
			{
				code: 'MNT',
				name: 'Mongolian Tögrög'
			},
			{
				code: 'MOP',
				name: 'Macanese Pataca'
			},
			{
				code: 'MRU',
				name: 'Mauritanian Ouguiya'
			},
			{
				code: 'MUR',
				name: 'Mauritian Rupee'
			},
			{
				code: 'MVR',
				name: 'Maldivian Rufiyaa'
			},
			{
				code: 'MWK',
				name: 'Malawian Kwacha'
			},
			{
				code: 'MXN',
				name: 'Mexican Peso'
			},
			{
				code: 'MYR',
				name: 'Malaysian Ringgit'
			},
			{
				code: 'MZN',
				name: 'Mozambican Metical'
			},
			{
				code: 'NAD',
				name: 'Namibian Dollar'
			},
			{
				code: 'NGN',
				name: 'Nigerian Naira'
			},
			{
				code: 'NIO',
				name: 'Nicaraguan Córdoba'
			},
			{
				code: 'NOK',
				name: 'Norwegian Krone'
			},
			{
				code: 'NPR',
				name: 'Nepalese Rupee'
			},
			{
				code: 'NZD',
				name: 'New Zealand Dollar'
			},
			{
				code: 'OMR',
				name: 'Omani Rial'
			},
			{
				code: 'PAB',
				name: 'Panamanian Balboa'
			},
			{
				code: 'PEN',
				name: 'Peruvian Sol'
			},
			{
				code: 'PGK',
				name: 'Papua New Guinean Kina'
			},
			{
				code: 'PHP',
				name: 'Philippine Peso'
			},
			{
				code: 'PKR',
				name: 'Pakistani Rupee'
			},
			{
				code: 'PLN',
				name: 'Polish Złoty'
			},
			{
				code: 'PYG',
				name: 'Paraguayan Guaraní'
			},
			{
				code: 'QAR',
				name: 'Qatari Riyal'
			},
			{
				code: 'RON',
				name: 'Romanian Leu'
			},
			{
				code: 'RSD',
				name: 'Serbian Dinar'
			},
			{
				code: 'RUB',
				name: 'Russian Ruble'
			},
			{
				code: 'RWF',
				name: 'Rwandan Franc'
			},
			{
				code: 'SAR',
				name: 'Saudi Riyal'
			},
			{
				code: 'SBD',
				name: 'Solomon Islands Dollar'
			},
			{
				code: 'SCR',
				name: 'Seychellois Rupee'
			},
			{
				code: 'SDG',
				name: 'Sudanese Pound'
			},
			{
				code: 'SEK',
				name: 'Swedish Krona'
			},
			{
				code: 'SGD',
				name: 'Singapore Dollar'
			},
			{
				code: 'SHP',
				name: 'Saint Helena Pound'
			},
			{
				code: 'SOS',
				name: 'Somali Shilling'
			},
			{
				code: 'SRD',
				name: 'Surinamese Dollar'
			},
			{
				code: 'STN',
				name: 'São Tomé Dobra'
			},
			{
				code: 'SZL',
				name: 'Swazi Lilangeni'
			},
			{
				code: 'THB',
				name: 'Thai Baht'
			},
			{
				code: 'TJS',
				name: 'Tajikistani Somoni'
			},
			{
				code: 'TMT',
				name: 'Turkmenistan Manat'
			},
			{
				code: 'TND',
				name: 'Tunisian Dinar'
			},
			{
				code: 'TOP',
				name: 'Tongan Paʻanga'
			},
			{
				code: 'TRY',
				name: 'Turkish Lira'
			},
			{
				code: 'TTD',
				name: 'Trinidad Dollar'
			},
			{
				code: 'TWD',
				name: 'New Taiwan Dollar'
			},
			{
				code: 'TZS',
				name: 'Tanzanian Shilling'
			},
			{
				code: 'UAH',
				name: 'Ukrainian Hryvnia'
			},
			{
				code: 'UGX',
				name: 'Ugandan Shilling'
			},
			{
				code: 'USD',
				name: 'US Dollar'
			},
			{
				code: 'UYU',
				name: 'Uruguayan Peso'
			},
			{
				code: 'UZS',
				name: 'Uzbekistani Som'
			},
			{
				code: 'VES',
				name: 'Venezuelan Bolívar'
			},
			{
				code: 'VND',
				name: 'Vietnamese Dong'
			},
			{
				code: 'VUV',
				name: 'Vanuatu Vatu'
			},
			{
				code: 'WST',
				name: 'Samoan Tala'
			},
			{
				code: 'XAF',
				name: 'Central African Franc'
			},
			{
				code: 'XCD',
				name: 'East Caribbean Dollar'
			},
			{
				code: 'XOF',
				name: 'West African Franc'
			},
			{
				code: 'XPF',
				name: 'CFP Franc'
			},
			{
				code: 'YER',
				name: 'Yemeni Rial'
			},
			{
				code: 'ZAR',
				name: 'South African Rand'
			},
			{
				code: 'ZMW',
				name: 'Zambian Kwacha'
			},
			{
				code: 'ZWL',
				name: 'Zimbabwean Dollar'
			}
		];
		var a,
			n,
			r,
			t,
			i,
			o,
			s = {en: null, ar: null, fr: null, es: null, de: null, zh: null, hi: null, pt: null, tr: null, id: null};
		var _localeCache = {};
		function loadLocale(lang, cb) {
			if (_localeCache[lang]) {
				cb(_localeCache[lang]);
				return;
			}
			fetch('/locales/' + lang + '.json')
				.then(function (r) {
					return r.json();
				})
				.then(function (data) {
					_localeCache[lang] = data;
					s[lang] = data;
					cb(data);
				})
				.catch(function () {
					cb(s.en || {});
				});
		}

		function l() {
			try {
				return JSON.parse(localStorage.getItem(e)) || {};
			} catch (e) {
				return {};
			}
		}

		function u(e) {
			function _applyLang(e) {
				var a = s[e] || s.en,
					n = s.en;
				if (!a) return;

				function r(e) {
					return a[e] || n[e] || '';
				}
				var t = 'ar' === e ? 'rtl' : 'ltr';
				(document.documentElement.setAttribute('dir', t),
					document.documentElement.setAttribute('lang', e),
					document.querySelectorAll('[data-i18n]').forEach(function (e) {
						var a = r(e.getAttribute('data-i18n'));
						a && (e.textContent = a);
					}),
					document.querySelectorAll('[data-i18n-html]').forEach(function (e) {
						var a = r(e.getAttribute('data-i18n-html'));
						a && (e.innerHTML = a);
					}));
				var i = document.getElementById('hero-h1');
				i && r('hero-h1') && (i.innerHTML = r('hero-h1'));
				var o = document.querySelector('.hero-sub');
				o && r('hero-sub') && (o.textContent = r('hero-sub'));
				var l = document.querySelectorAll('.tab-btn[data-tab]'),
					u = ['tab-mortgage', 'tab-car', 'tab-personal', 'tab-student', 'tab-afford'];
				(l.forEach(function (e, a) {
					r(u[a]) && (e.textContent = r(u[a]));
				}),
					document.querySelectorAll('.footer-links a[data-i18n]').forEach(function (e) {
						var a = r(e.getAttribute('data-i18n'));
						a && (e.textContent = a);
					}));
				var d = document.getElementById('hero-sub-el');

				function c(e, a) {
					var n = document.querySelector('label[for="' + e + '"]');
					n && r(a) && (n.textContent = r(a));
				}

				function m(e, a) {
					var n = document.getElementById(e);
					n && r(a) && (n.textContent = r(a));
				}
				(d && r('hero-sub') && (d.textContent = r('hero-sub')), c('i-amount', 'lbl-amount'), c('i-rate', 'lbl-rate'), c('i-term', 'lbl-term'), c('ci-i-principal', 'ci-label-principal'), c('ci-i-monthly', 'ci-label-monthly'), c('ci-i-rate', 'ci-label-rate'), c('ci-i-years', 'ci-label-years'), c('rf-i-balance', 'rf-balance'), c('rf-i-oldrate', 'rf-oldrate'), c('rf-i-remaining', 'rf-remaining'), c('rf-i-newrate', 'rf-newrate'), c('rf-i-costs', 'rf-costs'), m('res-monthly-lbl', 'res-monthly'), m('res-principal-lbl', 'res-principal'), m('res-interest-lbl', 'res-interest'), m('res-total-lbl', 'res-total'), m('res-year-lbl', 'res-year'));
				var p = document.getElementById('bp-label');
				p && r('lbl-principal-pct') && (p.textContent = r('lbl-principal-pct') + ' ');
				var g = document.getElementById('bi-label');
				(g && r('lbl-interest-pct') && (g.textContent = r('lbl-interest-pct') + ' '), m('section-breakdown-h', 'section-breakdown'), m('section-amort-h', 'section-amort'));
				var h = document.querySelectorAll('#amort-table thead th'),
					f = ['amort-year', 'amort-start', 'amort-ppaid', 'amort-ipaid', 'amort-end'];
				h.forEach(function (e, a) {
					r(f[a]) && (e.textContent = r(f[a]));
				});
				var b = document.getElementById('toggle-rows');
				b && ((b.dataset.showAll = r('btn-show-all')), (b.dataset.showLess = r('btn-show-less')));
				(function () {
					var gran = document.getElementById('amort-gran-toggle');
					if (gran) {
						var gy = gran.querySelector('[data-gran="yearly"]');
						var gm = gran.querySelector('[data-gran="monthly"]');
						if (gy && r('amort-gran-yearly')) gy.textContent = r('amort-gran-yearly');
						if (gm && r('amort-gran-monthly')) gm.textContent = r('amort-gran-monthly');
					}
					var ftogI18n = document.getElementById('freq-toggle');
					if (ftogI18n) {
						var fmo = ftogI18n.querySelector('[data-freq="monthly"]');
						var fbi = ftogI18n.querySelector('[data-freq="biweekly"]');
						if (fmo && r('freq-monthly')) fmo.textContent = r('freq-monthly');
						if (fbi && r('freq-biweekly')) fbi.textContent = r('freq-biweekly');
					}
				})();
				(m('how-h2', 'section-how'), m('compound-h2', 'ci-h2'), c('ci-i-principal', 'ci-label-principal'), c('ci-i-monthly', 'ci-label-monthly'), c('ci-i-rate', 'ci-label-rate'), c('ci-i-years', 'ci-label-years'), m('ci-result-lbl', 'ci-result-label'), m('ci-sub-lbl', 'ci-sub'), m('ci-deposited-lbl', 'ci-deposited'), m('ci-earned-lbl', 'ci-earned'), m('ci-mult-lbl', 'ci-mult'), m('ci-year-lbl', 'ci-year'), m('ci-chart-h', 'ci-chart-h'), m('ci-helper-title', 'ci-helper-title'));
				var k = document.getElementById('ci-helper-text');
				(k && r('ci-helper-text') && !k.children.length && (k.textContent = r('ci-helper-text')), m('rf-h2', 'rf-h2'), m('rf-desc', 'rf-desc'), m('rf-current-lbl', 'rf-current'), m('rf-new-lbl', 'rf-new'), c('rf-i-balance', 'rf-balance'), c('rf-i-oldrate', 'rf-oldrate'), c('rf-i-remaining', 'rf-remaining'), c('rf-i-newrate', 'rf-newrate'), c('rf-i-costs', 'rf-costs'), m('rf-monthly-lbl', 'rf-monthly'), m('rf-old-lbl', 'rf-old'), m('rf-new-pay-lbl', 'rf-new-pay'), m('rf-breakeven-lbl', 'rf-breakeven'), m('rf-total-lbl', 'rf-total'), m('cur-h2', 'cur-h2'), m('tx-cur-sub', 'cur-section-sub'));
				var v = document.querySelector('label[for="cur-from"]');
				v && r('cur-amount-label') && (v.textContent = r('cur-amount-label'));
				var y = document.querySelector('label[for="cur-to"]');
				(y && r('cur-to-label') && (y.textContent = r('cur-to-label')), m('cur-quick-lbl', 'cur-quick'), m('gold-title-el', 'gold-title'), m('gold-sub-el', 'gold-sub'), m('oil-title-el', 'oil-title'), m('oil-sub-el', 'oil-sub'), m('silver-title-el', 'silver-title'), m('silver-sub-el', 'silver-sub'), m('gold-local-lbl', 'gold-local-lbl'), m('oil-local-lbl', 'oil-local-lbl'), m('silver-local-lbl', 'silver-local-lbl'));
				var w = document.getElementById('faq-h2');
				if ((w && r('faq-heading') && (w.textContent = r('faq-heading')), m('footer-desc-el', 'footer-desc'), m('footer-disclaimer-el', 'footer-disclaimer'), (window.APP_LANG = e), (window._i18n_current = a), (window._i18n_en = s.en), injectFontForLang(e), window._currentTab && window.switchTab)) {
					var z = document.getElementById('s-amount'),
						A = document.getElementById('s-rate'),
						x = document.getElementById('s-term'),
						S = document.getElementById('i-amount'),
						P = document.getElementById('i-rate'),
						q = document.getElementById('i-term'),
						E = z && z.value,
						C = A && A.value,
						I = x && x.value;
					(window.switchTab(window._currentTab), z && E && ((z.value = E), S && (S.value = E)), A && C && ((A.value = C), P && (P.value = C)), x && I && ((x.value = I), q && (q.value = I)), window.update && window.update());
				}
				((window._i18n_rf = {
					'rf-verdict-higher': r('rf-verdict-higher'),
					'rf-verdict-long': r('rf-verdict-long'),
					'rf-verdict-good': r('rf-verdict-good'),
					'rf-verdict-summary': r('rf-verdict-summary'),
					'rf-never': r('rf-never'),
					'rf-over-term': r('rf-over-term'),
					'rf-months': r('rf-months'),
					'rf-years-mo': r('rf-years-mo')
				}),
					window.calcRF && window.calcRF(),
					window.calcCI && window.calcCI());
				var D = r('unit-yr'),
					M = r('unit-yrs');
				(['term-min-lbl', 'rf-new-term-min'].forEach(function (e) {
					var a = document.getElementById(e);
					if (a && D) {
						var n = a.textContent.match(/^(\d+)/);
						n && (a.textContent = n[1] + ' ' + D);
					}
				}),
					['term-max-lbl', 'rf-new-term-max'].forEach(function (e) {
						var a = document.getElementById(e);
						if (a && M) {
							var n = a.textContent.match(/^(\d+)/);
							n && (a.textContent = n[1] + ' ' + M);
						}
					}));
				var R = document.getElementById('ci-y-min-lbl');
				R && D && (R.textContent = '1 ' + D);
				var B = document.getElementById('ci-y-max-lbl');
				B && M && (B.textContent = '50 ' + M);
				var L = document.getElementById('rf-y-min-lbl');
				L && D && (L.textContent = '1 ' + D);
				var T = document.getElementById('rf-y-max-lbl');
				(T && M && (T.textContent = '30 ' + M),
					document.querySelectorAll('input[type=range]').forEach(function (e) {
						window.updateSliderFillGlobal && window.updateSliderFillGlobal(e);
					}),
					'function' == typeof updateAgeTexts && updateAgeTexts());
				var _cmmax = document.getElementById('ci-m-max-lbl');
				if (_cmmax && r('unit-mo')) _cmmax.textContent = _cmmax.textContent.replace(/\/\S+$/, r('unit-mo'));
				var _ry = document.getElementById('result-year');
				if (_ry && M) {
					var _rym = _ry.textContent.match(/^(\d+)\s*\((\d+)/);
					if (_rym) _ry.textContent = _rym[1] + ' (' + _rym[2] + ' ' + M + ')';
				}
				window._refreshLiveRatesStatus && window._refreshLiveRatesStatus();
			}
			// Load the requested locale (and en as fallback), then apply
			if (e !== 'en') {
				loadLocale('en', function () {
					window._i18n_en = s.en;
					loadLocale(e, function () {
						_applyLang(e);
					});
				});
			} else {
				loadLocale('en', function () {
					_applyLang('en');
				});
			}
		}

		function d() {
			var e = l();
			document.getElementById('pref-lang').value = e.lang || 'en';
			var a = document.getElementById('pref-currency-search');
			(a && (a.value = ''),
				(function (e, a) {
					var n = document.getElementById('pref-currency'),
						r = window.ALL_CURRENCIES.filter(function (e) {
							return !!window.CURRENCY_CONFIG[e.code];
						});
					if (a) {
						var t = a.toLowerCase();
						r = r.filter(function (e) {
							return -1 !== e.code.toLowerCase().indexOf(t) || -1 !== e.name.toLowerCase().indexOf(t);
						});
					}
					((n.innerHTML = ''),
						r.forEach(function (a) {
							var r = document.createElement('option');
							((r.value = a.code), (r.textContent = a.code + ': ' + a.name), a.code === e && (r.selected = !0), n.appendChild(r));
						}),
						n.value === e || a || (n.value = 'USD'));
				})(e.currency || window._prefCurrency || 'USD'),
				document.getElementById('settings-drawer').classList.add('open'),
				document.getElementById('settings-overlay').classList.add('open'),
				Array.from(document.body.children).forEach(function (e) {
					'settings-drawer' !== e.id && 'settings-overlay' !== e.id && (e.inert = !0);
				}),
				requestAnimationFrame(function () {
					var e = document.getElementById('settings-close-btn');
					e && e.focus();
				}));
		}

		function c() {
			(document.getElementById('settings-drawer').classList.remove('open'),
				document.getElementById('settings-overlay').classList.remove('open'),
				Array.from(document.body.children).forEach(function (e) {
					e.inert = !1;
				}));
		}
		((a = {
			en: {
				'faq-a1': 'The standard loan payment formula is: Monthly Payment = P × [r(1+r)^n] ÷ [(1+r)^n − 1], where P is the loan principal, r is the monthly interest rate (annual rate divided by 12), and n is the total number of monthly payments. This formula ensures equal payments every month that fully repay the loan including interest over the agreed term.',
				'faq-a2': 'An amortization schedule shows how each payment is divided between principal and interest over the full loan term. In the early years, most of each payment goes toward interest. Over time, a greater portion reduces the principal balance. LoanCalc generates a complete year-by-year schedule showing exactly how your balance decreases with each passing year.',
				'faq-a3': 'Yes. The loan payment formula is the same worldwide. You enter your own loan amount (in any currency), your own interest rate, and your own loan term. LoanCalc never fetches external data: all calculations happen in your browser. There is no country-specific data, no tax law dependency, and no requirement to be connected to anything.',
				'faq-a4': 'Three strategies reduce total interest: (1) Choose a shorter loan term: a 15-year mortgage versus a 30-year mortgage at the same rate roughly halves the total interest paid. (2) Make extra principal payments whenever possible: even small additional amounts each month significantly reduce the final total. (3) Secure a lower interest rate through a stronger credit score, comparison shopping across multiple lenders, or refinancing when rates fall.',
				'faq-a5': 'Yes, completely free. No account required. No signup. No email collection. No premium features behind a paywall. The calculator, amortization schedule, and payment breakdown chart are all fully accessible at no cost. LoanCalc is supported by display advertising: the calculator itself will always remain free.',
				'faq-a6': 'Enter your current loan balance, interest rate, and remaining term, then enter the new rate and estimated closing costs. The refinance calculator shows your new monthly payment, the exact break-even month when your cumulative savings exceed the closing costs, and the total lifetime saving over the remaining loan term. As a general rule, refinancing is worthwhile if you plan to keep the loan longer than the break-even period and the rate reduction is at least 0.5%.',
				'faq-a7': 'LoanCalc fetches the live gold spot price in USD from a financial market data source and converts it to your local currency using live exchange rates. The gold price is cached in your browser for one hour, so it refreshes frequently without making excessive API calls. Prices are displayed per troy ounce (the standard trading unit), per gram, and per kilogram for everyday reference.',
				'faq-a8': "The LoanCalc currency converter supports 161 world currencies with live rates updated every 24 hours, including USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW, and more. The converter automatically selects the destination currency based on your browser's locale settings.",
				'faq-a9': 'LoanCalc shows live prices for ten widely tracked US stocks and funds: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B), and the SPDR S&P 500 ETF (SPY). Prices are fetched from Yahoo Finance and updated every hour. Each chip shows the USD price, the percentage change from the previous close, and the equivalent in your local currency using live exchange rates.'
			},
			ar: {
				'faq-a1': 'صيغة القسط القياسية: القسط الشهري = P × [r(1+r)^n] ÷ [(1+r)^n − 1]، حيث P هو أصل القرض، r هو معدل الفائدة الشهري (المعدل السنوي ÷ 12)، وn هو إجمالي عدد الأقساط الشهرية. تضمن هذه الصيغة أقساطاً متساوية كل شهر تسدد القرض كاملاً مع الفائدة خلال المدة المتفق عليها.',
				'faq-a2': 'يوضح جدول الإطفاء كيف يُقسَّم كل قسط بين الأصل والفائدة طوال مدة القرض. في السنوات الأولى يذهب معظم كل قسط لسداد الفائدة، ومع مرور الوقت يتجه جزء أكبر لتخفيض رصيد الأصل. يُنشئ LoanCalc جدولاً سنوياً كاملاً يوضح بالضبط كيف ينخفض رصيدك مع مرور كل عام.',
				'faq-a3': 'نعم. صيغة حساب القسط واحدة في جميع أنحاء العالم. تُدخل مبلغ قرضك (بأي عملة) ومعدل الفائدة ومدة القرض. لا يجلب LoanCalc أي بيانات خارجية: جميع الحسابات تجري في متصفحك دون اعتماد على بيانات دولة بعينها أو قوانين ضريبية.',
				'faq-a4': 'ثلاث استراتيجيات لتقليل إجمالي الفائدة: (1) اختر مدة أقصر: قرض عقاري 15 عاماً مقارنةً بـ30 عاماً بنفس المعدل يُقلص الفائدة الإجمالية إلى النصف تقريباً. (2) سدد مبالغ إضافية من الأصل كلما أمكنك: حتى المبالغ الصغيرة شهرياً تُقلص الإجمالي النهائي بشكل ملحوظ. (3) احصل على معدل أقل عبر تحسين تصنيفك الائتماني والمقارنة بين المُقرضين أو إعادة التمويل عند انخفاض المعدلات.',
				'faq-a5': 'نعم، مجاني تماماً. لا حاجة لحساب أو تسجيل أو بريد إلكتروني أو اشتراك مدفوع. الحاسبة وجدول الإطفاء ومخطط تفاصيل الأقساط متاحة كلياً بدون تكلفة. يُموَّل LoanCalc من الإعلانات وستبقى الحاسبة مجانية دائماً.',
				'faq-a6': 'أدخل رصيد قرضك الحالي ومعدل الفائدة والمدة المتبقية، ثم أدخل المعدل الجديد وتكاليف الإغلاق المقدرة. تُظهر الحاسبة قسطك الشهري الجديد والشهر الدقيق لنقطة التعادل وإجمالي الوفورات على مدى المدة المتبقية. كقاعدة عامة تكون إعادة التمويل مجدية إذا احتفظت بالقرض لفترة أطول من نقطة التعادل وكان انخفاض المعدل 0.5% على الأقل.',
				'faq-a7': 'يجلب LoanCalc سعر الذهب الفوري الحي بالدولار الأمريكي من مصدر بيانات مالية ويحوله إلى عملتك المحلية بأسعار الصرف الحية. يُخزن سعر الذهب مؤقتاً في متصفحك لمدة ساعة لتحديثه بانتظام دون استدعاءات مفرطة. تُعرض الأسعار لكل أوقية ترويسية وللجرام وللكيلوجرام.',
				'faq-a8': 'يدعم محوّل عملات LoanCalc 161 عملة عالمية بأسعار صرف حية تُحدَّث كل 24 ساعة، تشمل USD وEUR وGBP وJPY وEGP وAED وSAR وCAD وAUD وCHF وCNY وINR وSGD وHKD وTRY وKRW وغيرها. يتم ضبط عملة التحويل تلقائياً بناءً على إعدادات اللغة في متصفحك.',
				'faq-a9': 'يعرض LoanCalc أسعاراً مباشرةً لعشرة أسهم وصناديق أمريكية شائعة: أبل (AAPL)، مايكروسوفت (MSFT)، ألفابت (GOOGL)، أمازون (AMZN)، ميتا (META)، إنفيديا (NVDA)، تسلا (TSLA)، JPMorgan Chase (JPM)، بيركشاير هاثاواي ب (BRK.B)، وصندوق SPDR S&P 500 (SPY). تُستقى الأسعار من Yahoo Finance وتُحدَّث كل ساعة. يُظهر كل شريحة السعر بالدولار ونسبة التغيير ومعادله بعملتك المحلية.'
			},
			fr: {
				'faq-a1': 'La formule standard est : Mensualité = P × [r(1+r)^n] ÷ [(1+r)^n − 1], où P est le capital emprunté, r est le taux mensuel (taux annuel ÷ 12) et n est le nombre total de mensualités. Cette formule garantit des paiements égaux chaque mois remboursant entièrement le prêt avec les intérêts sur la durée convenue.',
				'faq-a2': "Un tableau d'amortissement montre comment chaque paiement est réparti entre capital et intérêts sur toute la durée du prêt. Au début la majeure partie va aux intérêts ; avec le temps une proportion croissante réduit le capital restant. LoanCalc génère un tableau complet année par année montrant exactement comment votre solde diminue.",
				'faq-a3': "Oui. La formule est la même dans le monde entier. Vous saisissez votre montant (dans n'importe quelle devise), votre taux et votre durée. LoanCalc ne récupère aucune donnée externe: tous les calculs s'effectuent dans votre navigateur, sans données spécifiques à un pays ni dépendance fiscale.",
				'faq-a4': 'Trois stratégies réduisent le total des intérêts : (1) Choisissez une durée plus courte: un prêt sur 15 ans au lieu de 30 ans au même taux réduit environ de moitié les intérêts totaux. (2) Effectuez des remboursements anticipés dès que possible: même de petites sommes mensuelles supplémentaires réduisent significativement le total. (3) Obtenez un taux plus bas avec un meilleur profil de crédit, en comparant plusieurs offres, ou en renégociant quand les taux baissent.',
				'faq-a5': "Oui, entièrement gratuit. Aucun compte, aucune inscription, aucun e-mail, aucune fonctionnalité payante. La calculatrice, le tableau d'amortissement et le graphique sont tous accessibles gratuitement. LoanCalc est financé par la publicité: la calculatrice restera toujours gratuite.",
				'faq-a6': "Saisissez votre solde actuel, votre taux et la durée restante, puis le nouveau taux et les frais estimés. La calculatrice affiche votre nouvelle mensualité, le mois exact de rentabilité et l'économie totale sur la durée restante. La renégociation est généralement intéressante si vous conservez le prêt au-delà du point de rentabilité et si la baisse de taux est d'au moins 0,5 %.",
				'faq-a7': "LoanCalc récupère le cours spot de l'or en USD depuis une source financière et le convertit dans votre devise locale avec les taux en temps réel. Le prix est mis en cache pendant une heure pour des mises à jour fréquentes sans appels API excessifs. Les prix sont affichés par once troy, par gramme et par kilogramme.",
				'faq-a8': "Le convertisseur LoanCalc prend en charge 161 devises mondiales avec des taux en direct mis à jour toutes les 24 heures, dont USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW et bien d'autres. La devise de destination est automatiquement définie selon les paramètres du navigateur.",
				'faq-a9': "LoanCalc affiche les cours en direct de dix actions et fonds américains très suivis : Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) et le SPDR S&P 500 ETF (SPY). Les cours sont récupérés depuis Yahoo Finance et mis à jour toutes les heures. Chaque vignette affiche le cours en USD, la variation en pourcentage par rapport à la clôture précédente et l'équivalent dans votre devise locale."
			},
			es: {
				'faq-a1': 'La fórmula estándar es: Cuota mensual = P × [r(1+r)^n] ÷ [(1+r)^n − 1], donde P es el capital del préstamo, r es la tasa mensual (tasa anual ÷ 12) y n es el número total de cuotas. Esta fórmula garantiza pagos iguales cada mes que amortizan completamente el préstamo con intereses en el plazo acordado.',
				'faq-a2': 'Un cuadro de amortización muestra cómo se divide cada pago entre capital e intereses a lo largo del préstamo. Al principio la mayor parte va a intereses; con el tiempo una proporción creciente reduce el capital pendiente. LoanCalc genera un cuadro completo año a año que muestra exactamente cómo disminuye tu saldo.',
				'faq-a3': 'Sí. La fórmula es la misma en todo el mundo. Introduces tu importe (en cualquier divisa), tu tipo de interés y tu plazo. LoanCalc no obtiene datos externos: todos los cálculos se realizan en tu navegador, sin datos específicos de ningún país ni dependencia fiscal.',
				'faq-a4': 'Tres estrategias reducen el total de intereses: (1) Elige un plazo más corto: una hipoteca a 15 años frente a 30 años al mismo tipo reduce aproximadamente a la mitad los intereses totales. (2) Haz amortizaciones anticipadas siempre que puedas: incluso pequeñas cantidades extras cada mes reducen significativamente el total. (3) Consigue un tipo más bajo con mejor historial crediticio, comparando prestamistas, o refinanciando cuando bajen los tipos.',
				'faq-a5': 'Sí, completamente gratis. Sin cuenta, sin registro, sin correo electrónico, sin funciones de pago. La calculadora, el cuadro de amortización y el gráfico están disponibles gratuitamente. LoanCalc se financia con publicidad: la calculadora siempre será gratuita.',
				'faq-a6': 'Introduce tu saldo actual, tipo de interés y plazo restante, luego el nuevo tipo y los costes estimados. La calculadora muestra tu nueva cuota, el mes exacto de equilibrio y el ahorro total en el plazo restante. En general, refinanciar es rentable si planeas mantener el préstamo más tiempo que el período de equilibrio y la reducción del tipo es de al menos 0,5%.',
				'faq-a7': 'LoanCalc obtiene el precio spot del oro en USD desde una fuente de datos financieros y lo convierte a tu moneda local con tipos de cambio en tiempo real. El precio se almacena en caché durante una hora para actualizaciones frecuentes. Los precios se muestran por onza troy, por gramo y por kilogramo.',
				'faq-a8': 'El convertidor de LoanCalc soporta 161 divisas mundiales con tipos en directo actualizados cada 24 horas, incluyendo USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW y muchas más. La divisa de destino se ajusta automáticamente según la configuración del navegador.',
				'faq-a9': 'LoanCalc muestra precios en vivo de diez acciones y fondos estadounidenses muy seguidos: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) y el SPDR S&P 500 ETF (SPY). Los precios se obtienen de Yahoo Finance y se actualizan cada hora. Cada ficha muestra el precio en USD, el cambio porcentual desde el cierre anterior y el equivalente en su moneda local.'
			},
			de: {
				'faq-a1': 'Die Standardformel lautet: Monatliche Rate = P × [r(1+r)^n] ÷ [(1+r)^n − 1], wobei P das Darlehenskapital, r der monatliche Zinssatz (Jahreszins ÷ 12) und n die Gesamtzahl der monatlichen Zahlungen ist. Diese Formel gewährleistet gleichbleibende Zahlungen, die das Darlehen einschließlich Zinsen vollständig über die vereinbarte Laufzeit tilgen.',
				'faq-a2': 'Ein Tilgungsplan zeigt, wie jede Zahlung zwischen Tilgung und Zinsen über die gesamte Laufzeit aufgeteilt wird. In den Anfangsjahren fließt der Großteil jeder Rate in die Zinsen; mit der Zeit geht ein größerer Anteil in die Tilgung. LoanCalc erstellt einen vollständigen Jahresplan, der genau zeigt, wie Ihr Saldo abnimmt.',
				'faq-a3': 'Ja. Die Darlehensformel ist weltweit dieselbe. Sie geben Ihren Darlehensbetrag (in beliebiger Währung), Ihren Zinssatz und Ihre Laufzeit ein. LoanCalc ruft keine externen Daten ab: alle Berechnungen erfolgen in Ihrem Browser, ohne länderspezifische Daten oder steuerrechtliche Abhängigkeiten.',
				'faq-a4': 'Drei Strategien reduzieren die Gesamtzinsen: (1) Wählen Sie eine kürzere Laufzeit: eine 15-jährige Hypothek statt einer 30-jährigen zum gleichen Zinssatz halbiert die Gesamtzinsen in etwa. (2) Leisten Sie Sondertilgungen wann immer möglich: selbst kleine Zusatzbeträge monatlich reduzieren die Gesamtsumme erheblich. (3) Sichern Sie sich einen niedrigeren Zinssatz durch bessere Bonität, Angebotsvergleiche oder Umschuldung bei fallenden Zinsen.',
				'faq-a5': 'Ja, vollständig kostenlos. Kein Konto, keine Registrierung, keine E-Mail-Erfassung, keine kostenpflichtigen Funktionen. Rechner, Tilgungsplan und Kostenaufteilungsdiagramm sind alle kostenlos zugänglich. LoanCalc wird durch Werbung finanziert: der Rechner wird immer kostenlos bleiben.',
				'faq-a6': 'Geben Sie Ihren aktuellen Darlehenssaldo, Zinssatz und die verbleibende Laufzeit ein, dann den neuen Zinssatz und die geschätzten Abschlusskosten. Der Rechner zeigt Ihre neue monatliche Rate, den genauen Break-even-Monat und die Gesamtersparnis über die verbleibende Laufzeit. Als Faustregel lohnt sich eine Umschuldung, wenn Sie das Darlehen länger als die Break-even-Periode halten und die Zinssenkung mindestens 0,5 % beträgt.',
				'faq-a7': 'LoanCalc ruft den Live-Goldkurs in USD von einer Finanzdatenquelle ab und rechnet ihn mit Live-Wechselkursen in Ihre Landeswährung um. Der Goldpreis wird eine Stunde lang im Browser zwischengespeichert. Die Preise werden pro Feinunze, pro Gramm und pro Kilogramm angezeigt.',
				'faq-a8': 'Der LoanCalc-Währungsrechner unterstützt 161 Weltwährungen mit Live-Kursen, die alle 24 Stunden aktualisiert werden, darunter USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW und viele mehr. Die Zielwährung wird automatisch anhand der Browsereinstellungen voreingestellt.',
				'faq-a9': 'LoanCalc zeigt Live-Kurse für zehn viel beachtete US-Aktien und -Fonds: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) und den SPDR S&P 500 ETF (SPY). Die Kurse werden von Yahoo Finance abgerufen und stündlich aktualisiert. Jede Kachel zeigt den USD-Kurs, die prozentuale Veränderung zum Vortagesschluss und den Gegenwert in Ihrer Landeswährung.'
			},
			zh: {
				'faq-a1': '标准还款公式：月供 = P × [r(1+r)^n] ÷ [(1+r)^n − 1]，其中P为贷款本金，r为月利率（年利率÷12），n为总还款期数。此公式确保每月等额还款，在约定期限内还清全部贷款本息。',
				'faq-a2': '还款计划表展示了整个贷款期限内每笔还款如何在本金和利息之间分配。初期大部分还款用于支付利息，随着时间推移越来越多用于偿还本金。LoanCalc生成完整的逐年计划表，精确显示您的余额每年如何减少。',
				'faq-a3': '是的。贷款还款公式全球通用。您只需输入贷款金额（任意货币）、利率和贷款期限。LoanCalc不获取外部数据：所有计算均在您的浏览器中完成，不依赖特定国家数据或税法，也不需要联网。',
				'faq-a4': '减少总利息的三种策略：(1) 选择较短期限：以相同利率，15年期房贷相比30年期可将总利息减少约一半。(2) 尽可能提前还款：即使每月多还少量也能显著降低最终总额。(3) 通过提高信用评分、比较多家贷款机构报价或在利率下降时再融资来获取更低利率。',
				'faq-a5': '是的，完全免费。无需账户、注册或邮箱，无任何付费功能。计算器、还款计划表和还款分析图表均可免费使用。LoanCalc通过展示广告维持运营：计算器将始终保持免费。',
				'faq-a6': '输入当前贷款余额、利率和剩余期限，再输入新利率和预计结清费用。再融资计算器将显示新的月供、累计节省额超过结清费用的确切盈亏平衡月份，以及剩余期限内的总节省额。一般而言，如果您计划持有贷款超过盈亏平衡期且利率降幅至少0.5%，再融资通常是值得的。',
				'faq-a7': 'LoanCalc从金融市场数据源获取实时黄金现货价格（美元），并使用实时汇率将其转换为您的本地货币。黄金价格在浏览器中缓存一小时以便频繁刷新。价格以金衡盎司、克和千克三种单位显示。',
				'faq-a8': 'LoanCalc货币转换器支持161种世界货币，汇率每24小时实时更新，包括USD、EUR、GBP、JPY、EGP、AED、SAR、CAD、AUD、CHF、CNY、INR、SGD、HKD、TRY、KRW等。目标货币会根据您的浏览器语言设置自动选择。',
				'faq-a9': 'LoanCalc显示十只美国知名股票和基金的实时价格：苹果(AAPL)、微软(MSFT)、谷歌(GOOGL)、亚马逊(AMZN)、Meta(META)、英伟达(NVDA)、特斯拉(TSLA)、摩根大通(JPM)、伯克希尔哈撒韦B(BRK.B)和SPDR标普500ETF(SPY)。价格来自Yahoo Finance，每小时更新。每个标签显示USD价格、较前日收盘价的百分比变化以及换算为您本地货币的等值。'
			},
			hi: {
				'faq-a1': 'मानक ऋण भुगतान सूत्र: मासिक किस्त = P × [r(1+r)^n] ÷ [(1+r)^n − 1], जहाँ P मूलधन, r मासिक ब्याज दर (वार्षिक ÷ 12) और n कुल किस्तों की संख्या है। यह सूत्र हर महीने समान किस्त सुनिश्चित करता है जो सहमत अवधि में ब्याज सहित पूरे ऋण का भुगतान करती है।',
				'faq-a2': 'ऋण अनुसूची दिखाती है कि पूरी ऋण अवधि में प्रत्येक भुगतान मूलधन और ब्याज के बीच कैसे बँटता है। शुरुआती वर्षों में अधिकांश भुगतान ब्याज में जाता है; समय के साथ बड़ा हिस्सा मूलधन कम करता है। LoanCalc एक पूर्ण वार्षिक अनुसूची तैयार करता है जो दिखाती है कि हर साल आपका बैलेंस कैसे घटता है।',
				'faq-a3': 'हाँ। ऋण भुगतान सूत्र दुनिया भर में एक समान है। आप अपनी ऋण राशि (किसी भी मुद्रा में), ब्याज दर और अवधि दर्ज करते हैं। LoanCalc कोई बाहरी डेटा नहीं लाता: सभी गणनाएँ आपके ब्राउज़र में होती हैं, बिना किसी देश-विशिष्ट डेटा या कर कानून पर निर्भरता के।',
				'faq-a4': 'कुल ब्याज कम करने की तीन रणनीतियाँ: (1) कम अवधि चुनें: समान दर पर 30 साल की तुलना में 15 साल का ऋण कुल ब्याज लगभग आधा कर देता है। (2) जब भी संभव हो अतिरिक्त मूलधन भुगतान करें: हर महीने थोड़ी अतिरिक्त राशि भी अंतिम कुल को काफी कम करती है। (3) बेहतर क्रेडिट स्कोर, कई ऋणदाताओं की तुलना या दरें गिरने पर पुनर्वित्त के माध्यम से कम ब्याज दर सुनिश्चित करें।',
				'faq-a5': 'हाँ, बिल्कुल मुफ्त। कोई खाता, साइनअप, ईमेल या भुगतान सुविधा नहीं। कैलकुलेटर, ऋण अनुसूची और भुगतान चार्ट सभी बिना किसी लागत के उपलब्ध हैं। LoanCalc विज्ञापनों से समर्थित है: कैलकुलेटर हमेशा मुफ्त रहेगा।',
				'faq-a6': 'अपना वर्तमान ऋण शेष, ब्याज दर और शेष अवधि दर्ज करें, फिर नई दर और अनुमानित समापन लागत दर्ज करें। कैलकुलेटर आपकी नई मासिक किस्त, सटीक ब्रेक-ईवन महीना और शेष अवधि में कुल बचत दिखाता है। सामान्यतः पुनर्वित्त तब उचित है जब आप ब्रेक-ईवन अवधि से अधिक समय तक ऋण रखने की योजना बनाते हैं और दर में कम से कम 0.5% की कमी हो।',
				'faq-a7': 'LoanCalc एक वित्तीय डेटा स्रोत से USD में लाइव गोल्ड स्पॉट मूल्य प्राप्त करता है और लाइव एक्सचेंज दरों से इसे आपकी स्थानीय मुद्रा में बदलता है। गोल्ड मूल्य एक घंटे के लिए कैश किया जाता है। मूल्य प्रति ट्रॉय औंस, प्रति ग्राम और प्रति किलोग्राम प्रदर्शित किए जाते हैं।',
				'faq-a8': 'LoanCalc करेंसी कनवर्टर 161 विश्व मुद्राओं को हर 24 घंटे में अपडेट होने वाली लाइव दरों के साथ सपोर्ट करता है: USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW सहित। लक्ष्य मुद्रा आपके ब्राउज़र की भाषा सेटिंग के आधार पर स्वचालित रूप से चुनी जाती है।',
				'faq-a9': 'LoanCalc दस प्रमुख अमेरिकी शेयरों और फंडों के लाइव मूल्य दिखाता है: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B), और SPDR S&P 500 ETF (SPY)। कीमतें Yahoo Finance से ली जाती हैं और हर घंटे अपडेट होती हैं। प्रत्येक चिप USD मूल्य, पिछले बंद से प्रतिशत परिवर्तन और आपकी स्थानीय मुद्रा में समकक्ष दिखाता है।'
			},
			pt: {
				'faq-a1': 'A fórmula padrão é: Parcela mensal = P × [r(1+r)^n] ÷ [(1+r)^n − 1], onde P é o capital, r é a taxa mensal (taxa anual ÷ 12) e n é o número total de parcelas. Esta fórmula garante pagamentos iguais a cada mês que quitam completamente o empréstimo com juros no prazo acordado.',
				'faq-a2': 'Uma tabela de amortização mostra como cada pagamento é dividido entre principal e juros ao longo do prazo. Nos primeiros anos a maior parte vai para os juros; com o tempo uma proporção crescente reduz o saldo do principal. O LoanCalc gera uma tabela completa ano a ano mostrando exatamente como seu saldo diminui.',
				'faq-a3': 'Sim. A fórmula é a mesma em todo o mundo. Você insere o valor do empréstimo (em qualquer moeda), a taxa de juros e o prazo. O LoanCalc não busca dados externos: todos os cálculos acontecem no seu navegador, sem dados específicos de países ou dependência de legislação fiscal.',
				'faq-a4': 'Três estratégias reduzem o total de juros: (1) Escolha um prazo mais curto: um financiamento de 15 anos versus 30 anos na mesma taxa reduz os juros totais pela metade. (2) Faça amortizações extras sempre que possível: mesmo pequenas quantias mensais adicionais reduzem significativamente o total. (3) Consiga uma taxa mais baixa com melhor histórico de crédito, comparando credores ou refinanciando quando as taxas caírem.',
				'faq-a5': 'Sim, completamente gratuito. Sem conta, cadastro, e-mail ou recursos pagos. A calculadora, a tabela de amortização e o gráfico são totalmente acessíveis sem custo. O LoanCalc é financiado por publicidade: a calculadora sempre será gratuita.',
				'faq-a6': 'Insira seu saldo atual, taxa de juros e prazo restante, depois a nova taxa e os custos estimados de fechamento. A calculadora mostra sua nova parcela, o mês exato de equilíbrio e a economia total no prazo restante. Em geral, refinanciar vale a pena se você planeja manter o empréstimo por mais tempo que o ponto de equilíbrio e a redução de taxa for de pelo menos 0,5%.',
				'faq-a7': 'O LoanCalc busca o preço spot do ouro em USD de uma fonte de dados financeiros e converte para sua moeda local com taxas de câmbio em tempo real. O preço é armazenado em cache por uma hora para atualizações frequentes. Os preços são exibidos por onça troy, por grama e por quilograma.',
				'faq-a8': 'O conversor LoanCalc suporta 161 moedas mundiais com taxas em tempo real atualizadas a cada 24 horas, incluindo USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW e muitas outras. A moeda de destino é automaticamente definida com base nas configurações do navegador.',
				'faq-a9': 'O LoanCalc mostra preços ao vivo de dez ações e fundos americanos amplamente acompanhados: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) e o SPDR S&P 500 ETF (SPY). Os preços são obtidos do Yahoo Finance e atualizados a cada hora. Cada chip mostra o preço em USD, a variação percentual em relação ao fechamento anterior e o equivalente na sua moeda local.'
			},
			tr: {
				'faq-a1': 'Standart kredi ödeme formülü: Aylık Taksit = P × [r(1+r)^n] ÷ [(1+r)^n − 1]; P anaparadır, r aylık faiz oranı (yıllık oran ÷ 12), n ise toplam taksit sayısıdır. Bu formül her ay eşit ödemeler yapılmasını ve kredinin faiz dahil tam olarak geri ödenmesini sağlar.',
				'faq-a2': 'İtfa planı, kredinin tüm vadesi boyunca her ödemenin anapara ve faiz arasında nasıl bölündüğünü gösterir. İlk yıllarda her taksitin büyük kısmı faize gider; zamanla giderek daha büyük bir oran anaparayı azaltır. LoanCalc bakiyenizin her yıl nasıl azaldığını tam olarak gösteren yıllık bir plan oluşturur.',
				'faq-a3': 'Evet. Kredi ödeme formülü dünya genelinde aynıdır. Kredi tutarınızı (herhangi bir para biriminde), faiz oranınızı ve vadenizi girersiniz. LoanCalc hiçbir harici veri çekmez: tüm hesaplamalar tarayıcınızda gerçekleşir, ülkeye özgü veri veya vergi mevzuatına bağımlılık yoktur.',
				'faq-a4': 'Toplam faizi azaltmanın üç yolu: (1) Daha kısa vade seçin: aynı faiz oranıyla 30 yıl yerine 15 yıllık kredi toplam faizi yaklaşık yarıya indirir. (2) Mümkün olduğunda ek anapara ödemesi yapın: aylık küçük ek tutarlar bile son toplamı önemli ölçüde azaltır. (3) Daha iyi kredi notu, birden fazla kuruluşu karşılaştırma veya faizler düşünce refinansman yoluyla daha düşük faiz oranı elde edin.',
				'faq-a5': 'Evet, tamamen ücretsiz. Hesap, kayıt, e-posta toplama veya ücretli özellik yoktur. Hesap makinesi, itfa planı ve maliyet dağılım grafiği hepsi ücretsiz erişilebilir. LoanCalc reklam geliriyle desteklenmektedir: hesap makinesi her zaman ücretsiz kalacaktır.',
				'faq-a6': 'Mevcut kredi bakiyenizi, faiz oranınızı ve kalan vadenizi girin, ardından yeni faiz oranını ve tahmini kapanış masraflarını girin. Refinansman hesaplayıcısı yeni aylık taksidinizi, birikimli tasarrufların kapanış masraflarını geçtiği tam ayı ve kalan vade boyunca toplam tasarruf miktarını gösterir. Krediyi başa baş noktasından daha uzun süre tutmayı planlıyorsanız ve faiz indirimi en az 0,5% ise refinansman mantıklıdır.',
				'faq-a7': 'LoanCalc finansal piyasa veri kaynağından USD cinsinden canlı altın spot fiyatını alır ve canlı döviz kurları kullanarak yerel paranıza dönüştürür. Altın fiyatı bir saat boyunca tarayıcınızda önbelleğe alınır. Fiyatlar troy ons, gram ve kilogram başına gösterilir.',
				'faq-a8': 'LoanCalc döviz çevirici 24 saatte bir güncellenen canlı kurlarla 161 dünya para birimini destekler; USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW ve daha fazlasını kapsar. Hedef para birimi tarayıcı dil ayarlarına göre otomatik belirlenir.',
				'faq-a9': "LoanCalc, yaygın olarak takip edilen on ABD hisse senedi ve fonu için canlı fiyatlar gösterir: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) ve SPDR S&P 500 ETF (SPY). Fiyatlar Yahoo Finance'den alınır ve saatte bir güncellenir. Her çip, USD fiyatını, önceki kapanıştan yüzde değişimi ve yerel para biriminizde eşdeğerini gösterir."
			},
			id: {
				'faq-a1': 'Rumus pembayaran pinjaman standar: Cicilan Bulanan = P × [r(1+r)^n] ÷ [(1+r)^n − 1], di mana P adalah pokok pinjaman, r adalah suku bunga bulanan (suku bunga tahunan ÷ 12), dan n adalah total cicilan. Rumus ini memastikan pembayaran yang sama setiap bulan yang melunasi pinjaman beserta bunga selama jangka waktu yang disepakati.',
				'faq-a2': 'Jadwal amortisasi menunjukkan bagaimana setiap pembayaran dibagi antara pokok dan bunga sepanjang jangka waktu pinjaman. Pada tahun-tahun awal sebagian besar pembayaran digunakan untuk bunga; seiring waktu proporsi yang lebih besar mengurangi saldo pokok. LoanCalc membuat jadwal lengkap tahun per tahun yang menunjukkan persis bagaimana saldo Anda berkurang.',
				'faq-a3': 'Ya. Rumus pembayaran pinjaman sama di seluruh dunia. Anda memasukkan jumlah pinjaman (dalam mata uang apa pun), suku bunga, dan jangka waktu. LoanCalc tidak mengambil data eksternal: semua perhitungan dilakukan di browser Anda, tanpa data khusus negara atau ketergantungan pada hukum pajak.',
				'faq-a4': 'Tiga strategi mengurangi total bunga: (1) Pilih jangka waktu lebih pendek: KPR 15 tahun dibandingkan 30 tahun dengan suku bunga yang sama kira-kira mengurangi total bunga menjadi setengahnya. (2) Lakukan pembayaran pokok ekstra kapan pun memungkinkan: bahkan jumlah tambahan kecil setiap bulan secara signifikan mengurangi total akhir. (3) Dapatkan suku bunga lebih rendah melalui skor kredit yang lebih baik, membandingkan beberapa pemberi pinjaman, atau refinansi ketika suku bunga turun.',
				'faq-a5': 'Ya, sepenuhnya gratis. Tidak perlu akun, daftar, email, atau fitur berbayar. Kalkulator, jadwal amortisasi, dan grafik rincian pembayaran semuanya dapat diakses tanpa biaya. LoanCalc didukung oleh iklan: kalkulator akan selalu tetap gratis.',
				'faq-a6': 'Masukkan saldo pinjaman saat ini, suku bunga, dan sisa jangka waktu, lalu masukkan suku bunga baru dan estimasi biaya penutupan. Kalkulator menampilkan cicilan bulanan baru, bulan titik impas yang tepat, dan total penghematan selama sisa jangka waktu. Sebagai aturan umum, refinansi bermanfaat jika Anda berencana mempertahankan pinjaman lebih lama dari periode titik impas dan pengurangan suku bunga minimal 0,5%.',
				'faq-a7': 'LoanCalc mengambil harga spot emas langsung dalam USD dari sumber data pasar keuangan dan mengonversinya ke mata uang lokal menggunakan nilai tukar langsung. Harga emas di-cache di browser selama satu jam. Harga ditampilkan per troy ounce, per gram, dan per kilogram.',
				'faq-a8': 'Konverter mata uang LoanCalc mendukung 161 mata uang dunia dengan kurs langsung yang diperbarui setiap 24 jam, termasuk USD, EUR, GBP, JPY, EGP, AED, SAR, CAD, AUD, CHF, CNY, INR, SGD, HKD, TRY, KRW, dan banyak lagi. Mata uang tujuan secara otomatis disesuaikan berdasarkan pengaturan bahasa browser.',
				'faq-a9': 'LoanCalc menampilkan harga langsung untuk sepuluh saham dan dana AS yang banyak dipantau: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B), dan SPDR S&P 500 ETF (SPY). Harga diambil dari Yahoo Finance dan diperbarui setiap jam. Setiap chip menampilkan harga USD, perubahan persentase dari penutupan sebelumnya, dan setara dalam mata uang lokal Anda.'
			}
		}),
			Object.keys(a).forEach(function (e) {
				if (s[e]) {
					var n = a[e];
					for (var r in n) s[e][r] = n[r];
				}
			}),
			(n = {
				ar: {
					'cur-rate-unavailable': 'السعر غير متاح',
					'cur-not-in-feed': 'غير موجود في التغذية المباشرة',
					'cur-today': 'اليوم',
					'cur-status-fetching': 'جارٍ جلب أسعار الصرف…',
					'cur-status-live': 'أسعار مباشرة · {date} · 161 عملة · تتحدث كل 24 ساعة',
					'cur-status-partial': 'تم تحميل الأسعار · {date} (33 عملة)',
					'cur-status-offline': 'أسعار غير متصلة: عملات محدودة',
					'cur-status-cached': 'أسعار من {date} · مخزنة مؤقتاً · تتحدث كل 24 ساعة',
					'cmd-fetching': 'جارٍ الجلب…',
					'cmd-live': 'مباشر · {date}',
					'cmd-approx': 'تقريبي · راجع البيانات المباشرة'
				},
				fr: {
					'cur-rate-unavailable': 'Taux indisponible',
					'cur-not-in-feed': 'Absent du flux en direct',
					'cur-today': "aujourd'hui",
					'cur-status-fetching': 'Récupération des taux de change…',
					'cur-status-live': 'Taux en direct · {date} · 161 devises · mise à jour toutes les 24h',
					'cur-status-partial': 'Taux chargés · {date} (33 devises)',
					'cur-status-offline': 'Taux hors ligne: devises limitées',
					'cur-status-cached': 'Taux du {date} · en cache · mise à jour toutes les 24h',
					'cmd-fetching': 'Récupération…',
					'cmd-live': 'En direct · {date}',
					'cmd-approx': 'Approx · vérifiez les données en direct'
				},
				es: {
					'cur-rate-unavailable': 'Tasa no disponible',
					'cur-not-in-feed': 'No está en el feed en vivo',
					'cur-today': 'hoy',
					'cur-status-fetching': 'Obteniendo tipos de cambio…',
					'cur-status-live': 'Tasas en vivo · {date} · 161 divisas · actualización cada 24h',
					'cur-status-partial': 'Tasas cargadas · {date} (33 divisas)',
					'cur-status-offline': 'Tasas sin conexión: divisas limitadas',
					'cur-status-cached': 'Tasas del {date} · en caché · actualización cada 24h',
					'cmd-fetching': 'Obteniendo…',
					'cmd-live': 'En vivo · {date}',
					'cmd-approx': 'Aprox · comprueba los datos en vivo'
				},
				de: {
					'cur-rate-unavailable': 'Kurs nicht verfügbar',
					'cur-not-in-feed': 'Nicht im Live-Feed',
					'cur-today': 'heute',
					'cur-status-fetching': 'Wechselkurse werden abgerufen…',
					'cur-status-live': 'Live-Kurse · {date} · 161 Währungen · Aktualisierung alle 24h',
					'cur-status-partial': 'Kurse geladen · {date} (33 Währungen)',
					'cur-status-offline': 'Offline-Kurse: begrenzte Währungen verfügbar',
					'cur-status-cached': 'Kurse vom {date} · zwischengespeichert · Aktualisierung alle 24h',
					'cmd-fetching': 'Wird abgerufen…',
					'cmd-live': 'Live · {date}',
					'cmd-approx': 'Ca. · Live-Daten prüfen'
				},
				zh: {
					'cur-rate-unavailable': '汇率不可用',
					'cur-not-in-feed': '不在实时数据中',
					'cur-today': '今天',
					'cur-status-fetching': '正在获取汇率…',
					'cur-status-live': '实时汇率 · {date} · 161种货币 · 每24小时更新',
					'cur-status-partial': '汇率已加载 · {date}（33种货币）',
					'cur-status-offline': '离线汇率：货币有限',
					'cur-status-cached': '{date}的汇率 · 已缓存 · 每24小时更新',
					'cmd-fetching': '获取中…',
					'cmd-live': '实时 · {date}',
					'cmd-approx': '近似值 · 请查看实时数据'
				},
				hi: {
					'cur-rate-unavailable': 'दर उपलब्ध नहीं है',
					'cur-not-in-feed': 'लाइव फ़ीड में नहीं है',
					'cur-today': 'आज',
					'cur-status-fetching': 'विनिमय दरें प्राप्त हो रही हैं…',
					'cur-status-live': 'लाइव दरें · {date} · 161 मुद्राएं · हर 24 घंटे में अपडेट',
					'cur-status-partial': 'दरें लोड हुईं · {date} (33 मुद्राएं)',
					'cur-status-offline': 'ऑफलाइन दरें: सीमित मुद्राएं उपलब्ध',
					'cur-status-cached': '{date} की दरें · कैश्ड · हर 24 घंटे में अपडेट',
					'cmd-fetching': 'प्राप्त हो रहा है…',
					'cmd-live': 'लाइव · {date}',
					'cmd-approx': 'अनुमानित · लाइव डेटा जांचें'
				},
				pt: {
					'cur-rate-unavailable': 'Taxa indisponível',
					'cur-not-in-feed': 'Não está no feed ao vivo',
					'cur-today': 'hoje',
					'cur-status-fetching': 'A obter taxas de câmbio…',
					'cur-status-live': 'Taxas ao vivo · {date} · 161 moedas · atualização a cada 24h',
					'cur-status-partial': 'Taxas carregadas · {date} (33 moedas)',
					'cur-status-offline': 'Taxas offline: moedas limitadas disponíveis',
					'cur-status-cached': 'Taxas de {date} · em cache · atualização a cada 24h',
					'cmd-fetching': 'A obter…',
					'cmd-live': 'Ao vivo · {date}',
					'cmd-approx': 'Aprox · verifique dados ao vivo'
				},
				tr: {
					'cur-rate-unavailable': 'Kur mevcut değil',
					'cur-not-in-feed': 'Canlı akışta yok',
					'cur-today': 'bugün',
					'cur-status-fetching': 'Döviz kurları alınıyor…',
					'cur-status-live': 'Canlı kurlar · {date} · 161 para birimi · 24 saatte bir güncellenir',
					'cur-status-partial': 'Kurlar yüklendi · {date} (33 para birimi)',
					'cur-status-offline': 'Çevrimdışı kurlar: sınırlı para birimi mevcut',
					'cur-status-cached': '{date} tarihli kurlar · önbellekte · 24 saatte bir güncellenir',
					'cmd-fetching': 'Alınıyor…',
					'cmd-live': 'Canlı · {date}',
					'cmd-approx': 'Yaklaşık · canlı verileri kontrol edin'
				},
				id: {
					'cur-rate-unavailable': 'Kurs tidak tersedia',
					'cur-not-in-feed': 'Tidak ada di umpan langsung',
					'cur-today': 'hari ini',
					'cur-status-fetching': 'Mengambil kurs mata uang…',
					'cur-status-live': 'Kurs langsung · {date} · 161 mata uang · diperbarui setiap 24 jam',
					'cur-status-partial': 'Kurs dimuat · {date} (33 mata uang)',
					'cur-status-offline': 'Kurs offline: mata uang terbatas tersedia',
					'cur-status-cached': 'Kurs dari {date} · tersimpan · diperbarui setiap 24 jam',
					'cmd-fetching': 'Mengambil…',
					'cmd-live': 'Langsung · {date}',
					'cmd-approx': 'Perkiraan · periksa data langsung'
				}
			}),
			Object.keys(n).forEach(function (e) {
				if (s[e]) {
					var a = n[e];
					for (var r in a) s[e][r] = a[r];
				}
			}),
			(r = {
				fr: {
					'gold-title': 'Or (XAU)',
					'silver-title': 'Argent (XAG)',
					'oil-title': 'Pétrole brut (WTI)',
					'gold-sub': 'Prix par once troy',
					'silver-sub': 'Prix par once troy',
					'oil-sub': 'Prix par baril',
					'silver-local-lbl': 'Prix dans votre devise'
				},
				es: {
					'gold-title': 'Oro (XAU)',
					'silver-title': 'Plata (XAG)',
					'oil-title': 'Petróleo crudo (WTI)',
					'gold-sub': 'Precio por onza troy',
					'silver-sub': 'Precio por onza troy',
					'oil-sub': 'Precio por barril',
					'silver-local-lbl': 'Precio en su moneda'
				},
				de: {
					'gold-title': 'Gold (XAU)',
					'silver-title': 'Silber (XAG)',
					'oil-title': 'Rohöl (WTI)',
					'gold-sub': 'Preis pro Feinunze',
					'silver-sub': 'Preis pro Feinunze',
					'oil-sub': 'Preis pro Barrel',
					'silver-local-lbl': 'Preis in Ihrer Währung'
				},
				zh: {
					'gold-title': '黄金 (XAU)',
					'silver-title': '白银 (XAG)',
					'oil-title': '原油 (WTI)',
					'gold-sub': '每金衡盎司价格',
					'silver-sub': '每金衡盎司价格',
					'oil-sub': '每桶价格',
					'silver-local-lbl': '您货币的价格'
				},
				hi: {
					'gold-title': 'सोना (XAU)',
					'silver-title': 'चांदी (XAG)',
					'oil-title': 'कच्चा तेल (WTI)',
					'gold-sub': 'प्रति ट्रॉय औंस कीमत',
					'silver-sub': 'प्रति ट्रॉय औंस कीमत',
					'oil-sub': 'प्रति बैरल कीमत',
					'silver-local-lbl': 'आपकी मुद्रा में मूल्य'
				},
				pt: {
					'gold-title': 'Ouro (XAU)',
					'silver-title': 'Prata (XAG)',
					'oil-title': 'Petróleo Bruto (WTI)',
					'gold-sub': 'Preço por onça troy',
					'silver-sub': 'Preço por onça troy',
					'oil-sub': 'Preço por barril',
					'silver-local-lbl': 'Preço na sua moeda'
				},
				tr: {
					'gold-title': 'Altın (XAU)',
					'silver-title': 'Gümüş (XAG)',
					'oil-title': 'Ham Petrol (WTI)',
					'gold-sub': 'Troy ons başına fiyat',
					'silver-sub': 'Troy ons başına fiyat',
					'oil-sub': 'Varil başına fiyat',
					'silver-local-lbl': 'Para biriminizle fiyat'
				},
				id: {
					'gold-title': 'Emas (XAU)',
					'silver-title': 'Perak (XAG)',
					'oil-title': 'Minyak Mentah (WTI)',
					'gold-sub': 'Harga per troy ounce',
					'silver-sub': 'Harga per troy ounce',
					'oil-sub': 'Harga per barel',
					'silver-local-lbl': 'Harga dalam mata uang Anda'
				}
			}),
			Object.keys(r).forEach(function (e) {
				if (s[e]) {
					var a = r[e];
					for (var n in a) s[e][n] = a[n];
				}
			}),
			(t = {
				fr: {
					'ci-helper-title': 'Moyenne historique du S&P 500',
					'ci-helper-text': 'Le marché boursier américain a rapporté ~7% par an après inflation sur le long terme. Utilisez 7% comme référence réaliste pour les fonds indiciels diversifiés.'
				},
				es: {
					'ci-helper-title': 'Promedio histórico del S&P 500',
					'ci-helper-text': 'El mercado bursátil estadounidense ha rentado ~7% anual después de inflación a largo plazo. Use 7% como base realista para fondos indexados diversificados.'
				},
				de: {
					'ci-helper-title': 'Historischer S&P 500-Durchschnitt',
					'ci-helper-text': 'Der US-Aktienmarkt hat langfristig ~7% jährlich nach Inflation erzielt. Verwenden Sie 7% als realistischen Ausgangswert für diversifizierte Indexfonds.'
				},
				zh: {
					'ci-helper-title': 'S&P 500 历史平均回报',
					'ci-helper-text': '美国股市长期年均通胀后回报率约为7%。以7%作为多元化指数基金的合理基准。'
				},
				hi: {
					'ci-helper-title': 'S&P 500 ऐतिहासिक औसत',
					'ci-helper-text': 'अमेरिकी शेयर बाजार ने दीर्घकाल में मुद्रास्फीति के बाद लगभग 7% वार्षिक रिटर्न दिया है। विविधीकृत इंडेक्स फंड के लिए 7% को यथार्थवादी आधार मानें।'
				},
				pt: {
					'ci-helper-title': 'Média histórica do S&P 500',
					'ci-helper-text': 'O mercado de ações americano retornou ~7% ao ano após a inflação no longo prazo. Use 7% como base realista para fundos de índice diversificados.'
				},
				tr: {
					'ci-helper-title': 'S&P 500 tarihsel ortalaması',
					'ci-helper-text': 'ABD borsası uzun vadede enflasyon sonrası yıllık ~7% getiri sağlamıştır. Çeşitlendirilmiş endeks fonları için 7% gerçekçi bir temel olarak kullanın.'
				},
				id: {
					'ci-helper-title': 'Rata-rata historis S&P 500',
					'ci-helper-text': 'Pasar saham AS telah menghasilkan ~7% per tahun setelah inflasi dalam jangka panjang. Gunakan 7% sebagai tolok ukur realistis untuk reksa dana indeks terdiversifikasi.'
				}
			}),
			Object.keys(t).forEach(function (e) {
				if (s[e]) {
					var a = t[e];
					for (var n in a) s[e][n] = a[n];
				}
			}),
			(i = {
				ar: {
					'clamp-min': 'الحد الأدنى:',
					'clamp-max': 'الحد الأقصى:'
				},
				fr: {
					'clamp-min': 'Minimum :',
					'clamp-max': 'Maximum :'
				},
				es: {
					'clamp-min': 'Mínimo:',
					'clamp-max': 'Máximo:'
				},
				de: {
					'clamp-min': 'Minimum:',
					'clamp-max': 'Maximum:'
				},
				zh: {
					'clamp-min': '最小值：',
					'clamp-max': '最大值：'
				},
				hi: {
					'clamp-min': 'न्यूनतम:',
					'clamp-max': 'अधिकतम:'
				},
				pt: {
					'clamp-min': 'Mínimo:',
					'clamp-max': 'Máximo:'
				},
				tr: {
					'clamp-min': 'Minimum:',
					'clamp-max': 'Maksimum:'
				},
				id: {
					'clamp-min': 'Minimum:',
					'clamp-max': 'Maksimum:'
				}
			}),
			Object.keys(i).forEach(function (e) {
				if (s[e]) {
					var a = i[e];
					for (var n in a) s[e][n] = a[n];
				}
			}),
			(o = {
				ar: {
					'sub-rfq2': 'ما هي تكاليف الإغلاق وكم يجب أن أتوقع؟',
					'sub-rfa2': 'تكاليف الإغلاق هي رسوم لمرة واحدة لإتمام إعادة التمويل: رسوم إنشاء المقرض، والبحث عن العنوان، والتقييم، ورسوم تسجيل الحكومة. في الولايات المتحدة عادةً ما تتراوح بين 2-5٪ من مبلغ القرض — من 6,000 إلى 15,000 دولار على قرض بقيمة 300 ألف دولار. خارج الولايات المتحدة يختلف الهيكل؛ استخدم عرض أسعار المقرض أو تقدير 1-3٪ إذا لم يكن لديك واحد بعد. كلما كان رقم تكاليف الإغلاق أدق، كلما كانت نتيجة نقطة التعادل أدق.',
					'sub-rfq3': 'متى لا يكون إعادة التمويل منطقياً؟',
					'sub-rfa3': 'لإعادة التمويل تكاليف مسبقة تستغرق أشهراً لاسترداها. نادراً ما يكون منطقياً إذا: (1) كنت تخطط للبيع أو سداد القرض قبل نقطة التعادل، (2) كان تخفيض السعر أقل من 0.5٪، أو (3) كان الأجل المتبقي قصيراً جداً لدرجة أن إعادة بدء رهن عقاري طويل يضيف فائدة إجمالية أكثر مما توفر. إذا كانت نقطة التعادل أطول من مدة بقائك المخططة في القرض، تخطَّ إعادة التمويل.',
					'sub-curq2': 'كم مرة يتم تحديث أسعار الصرف؟',
					'sub-cura2': 'يتم جلب الأسعار من Frankfurter API وتخزينها مؤقتاً في متصفحك لمدة 24 ساعة. السعر الذي تراه يعكس إغلاق السوق السابق — وليس التحركات خلال اليوم. بالنسبة للتحويلات الكبيرة حيث تهم كسور المئة، تحقق من السعر الوسطي الحالي مع بنكك أو خدمة FX مخصصة قبل المعاملة.',
					'sub-curq3': 'لماذا يتم اختيار عملة "إلى" تلقائياً؟',
					'sub-cura3': 'يقرأ المحوّل إعداد لغة متصفحك (على سبيل المثال، en-GB أو ar-SA) لتخمين عملتك المحلية. إذا خمّن خطأً، قم بتغييره باستخدام القائمة المنسدلة — لن يتم حفظ اختيارك بين الزيارات.',
					'sub-lnq3': 'ما الفرق بين القرض الشخصي وقرض السيارة؟',
					'sub-lna3': 'قروض السيارات مضمونة بالمركبة، لذا يقدم المقرضون أسعاراً أقل — عادةً 5-10٪ — لكن يمكنهم استرداد السيارة إذا فاتتك دفعات. القروض الشخصية غير مضمونة (لا ضمانات)، لذا ترتفع الأسعار، 8-25٪، لكنها تستطيع تمويل أي شيء من توحيد الديون إلى تحسينات المنزل. كلاهما يستخدم نفس صيغة الدفع — الفرق فقط في السعر والأجل.',
					'sub-svq1': 'ما هي الفائدة المركبة ولماذا تهمّ؟',
					'sub-sva1': 'الفائدة المركبة تعني أنك تكسب فائدة على فائدتك، وليس فقط على إيداعك الأصلي. إيداع 10,000 دولار بنسبة 5٪ يكسب 500 دولار في السنة الأولى. في السنة الثانية تكسب 5٪ على 10,500 دولار — 25 دولاراً إضافياً. على مدى 20 عاماً يحول هذا 10,000 دولار إلى ~26,500 دولار دون إضافة سنت. كلما تراكمت الفائدة بشكل متكرر (يومياً مقابل شهرياً مقابل سنوياً)، كلما نما الرصيد بشكل أسرع.',
					'sub-svq2': 'لماذا تُحدث المساهمات الشهرية فرقاً كبيراً؟',
					'sub-sva2': 'كل مساهمة شهرية تبدأ في التراكم فوراً. 200 دولار/شهر بنسبة 6٪ لمدة 20 عاماً تنمو إلى ~92,000 دولار — لكن إجمالي مساهماتك كان 48,000 دولار فقط. الـ 44,000 دولار الإضافية هي مجرد تراكم. الوقت والاتساق أهم من حجم الإيداع الأولي.',
					'sub-svq3': 'ما الفرق بين APR وAPY؟',
					'sub-sva3': 'معدل النسبة السنوية (APR) هو المعدل الاسمي قبل التراكم خلال العام. العائد السنوي المئوي (APY) يعكس ما تكسبه فعلياً بعد التراكم. APR بنسبة 6٪ مُركّب شهرياً يعطي APY بنسبة 6.17٪. تُعلن البنوك عن APY لحسابات التوفير وAPR للقروض. أدخل أي معدل يذكره بنكك — هذه الآلة الحاسبة تعامله كرقم سنوي وتركّمه شهرياً.',
					'sub-mtgq1': 'ماذا يشمل الدفع الشهري؟',
					'sub-mtga1': 'تُظهر هذه الآلة الحاسبة الأصل والفائدة فقط. قد يشمل دفعك الفعلي أيضاً ضرائب الملكية (عادةً 1-2٪ من قيمة المنزل سنوياً) والتأمين على المنازل — كلاهما يتفاوت حسب البلد والمنطقة. أضف هذه بشكل منفصل للحصول على تكلفة السكن الشهرية الحقيقية.',
					'sub-mtgq2': 'هل يجب أن أختار رهناً عقارياً لمدة 15 أم 30 سنة؟',
					'sub-mtga2': 'الأجل الزمني لـ 15 سنة يضاعف تقريباً الدفع الشهري لكنه يخفض إجمالي الفائدة بمقدار النصف. على قرض بقيمة 300,000 دولار بسعر 6.5٪، يكلف الأجل 30 سنة حوالي 382,000 دولار كفائدة؛ بينما يكلف الأجل 15 سنة حوالي 121,000 دولار. اختر 15 سنة إذا كنت تستطيع تحمّل الدفع الأعلى بشكل مريح. اختر 30 سنة إذا كنت بحاجة إلى مرونة التدفق النقدي أو تخطط للاستثمار بالفرق.',
					'sub-mtgq3': 'كيف يؤثر الدفع المقدم على الدفع الشهري؟',
					'sub-mtga3': 'الدفع المقدم الأكبر يخفض أصل القرض مباشرةً، مما يقلل كل دفعة شهرية. في كثير من البلدان، الدفع المقدم الذي يقل عن 20٪ يُفعّل تأمين الرهن العقاري (يُسمى PMI في الولايات المتحدة)، مضيفاً حوالي 0.5-1٪ من القرض سنوياً. أدخل فقط المبلغ الذي تقترضه فعلاً — اطرح دفعتك المقدمة من سعر الشراء أولاً.',
					'sub-mtgq4': 'كيف تؤثر درجة الائتمان على سعر الرهن العقاري؟',
					'sub-mtga4': 'يُسعّر المقرضون المخاطر من خلال سعر الفائدة الذي يقدمونه: القفزة في درجة الائتمان من 650 إلى 750 يمكن أن تخفض سعرك بنسبة 0.5-1.5٪. على رهن عقاري بقيمة 300,000 دولار، يوفر تخفيض السعر بنسبة 1٪ ما يقارب 200 دولار/شهر وأكثر من 60,000 دولار على مدى أجل 30 سنة. تحقق من تقرير ائتمانك قبل 3-6 أشهر من التقديم — وقت كافٍ للطعن في الأخطاء وسداد الأرصدة.'
				},
				fr: {
					'sub-rfq2': "Que sont les frais de clôture et à combien dois-je m'attendre ?",
					'sub-rfa2': "Les frais de clôture sont des frais uniques pour finaliser un refinancement : frais d'origination du prêteur, recherche de titre, évaluation et frais d'enregistrement gouvernementaux. Aux États-Unis, ils représentent généralement 2 à 5 % du montant du prêt — 6 000 à 15 000 $ sur un prêt de 300 000 $. En dehors des États-Unis, la structure varie ; utilisez le devis de votre prêteur ou estimez 1 à 3 % si vous n'en avez pas encore. Plus votre chiffre de frais de clôture est précis, plus votre résultat de seuil de rentabilité est précis.",
					'sub-rfq3': "Quand le refinancement n'a-t-il PAS de sens ?",
					'sub-rfa3': "Le refinancement a des coûts initiaux qui prennent des mois à récupérer. Il est rarement judicieux si : (1) vous prévoyez de vendre ou de rembourser le prêt avant le point d'équilibre, (2) la réduction du taux est inférieure à 0,5 %, ou (3) votre durée restante est si courte que recommencer une longue hypothèque ajoute plus d'intérêts totaux que vous n'en économisez. Si votre point d'équilibre est plus long que votre séjour prévu dans le prêt, évitez le refinancement.",
					'sub-curq2': 'À quelle fréquence les taux de change sont-ils mis à jour ?',
					'sub-cura2': "Les taux sont récupérés depuis l'API Frankfurter et mis en cache dans votre navigateur pendant 24 heures. Le taux affiché reflète la clôture du marché précédent — pas les mouvements intrajournaliers. Pour les gros transferts où une fraction de pourcentage compte, vérifiez le taux mi-marché actuel auprès de votre banque ou d'un service de change dédié avant de transacter.",
					'sub-curq3': 'Pourquoi la devise « vers » est-elle présélectionnée automatiquement ?',
					'sub-cura3': "Le convertisseur lit le paramètre de langue de votre navigateur (par exemple, en-GB ou ar-SA) pour deviner votre monnaie locale. S'il devine mal, changez-la avec la liste déroulante — votre sélection n'est pas enregistrée entre les visites.",
					'sub-lnq3': 'Quelle est la différence entre un prêt personnel et un prêt auto ?',
					'sub-lna3': "Les prêts auto sont garantis par le véhicule, donc les prêteurs offrent des taux plus bas — généralement 5 à 10 % — mais peuvent reprendre la voiture si vous manquez des paiements. Les prêts personnels ne sont pas garantis (pas de garantie), donc les taux sont plus élevés, 8 à 25 %, mais ils peuvent financer n'importe quoi, de la consolidation de dettes aux améliorations domiciliaires. Les deux utilisent la même formule de paiement — seuls le taux et la durée diffèrent.",
					'sub-svq1': "Qu'est-ce que l'intérêt composé et pourquoi est-il important ?",
					'sub-sva1': "L'intérêt composé signifie que vous gagnez des intérêts sur vos intérêts, pas seulement sur votre dépôt initial. Un dépôt de 10 000 $ à 5 % rapporte 500 $ la première année. La deuxième année, vous gagnez 5 % sur 10 500 $ — 25 $ supplémentaires. Sur 20 ans, cela transforme 10 000 $ en ~26 500 $ sans ajouter un centime. Plus les intérêts se composent fréquemment (quotidiennement vs mensuellement vs annuellement), plus le solde croît vite.",
					'sub-svq2': 'Pourquoi les versements mensuels font-ils une si grande différence ?',
					'sub-sva2': "Chaque versement mensuel commence à se composer immédiatement. 200 $/mois à 6 % pendant 20 ans croît jusqu'à ~92 000 $ — mais vos contributions totales n'étaient que de 48 000 $. Les 44 000 $ supplémentaires sont du pur effet de composition. Le temps et la régularité comptent plus que la taille du dépôt initial.",
					'sub-svq3': 'Quelle est la différence entre le TAP et le TAEG ?',
					'sub-sva3': "Le TAP (taux annuel en pourcentage) est le taux nominal avant la capitalisation dans l'année. Le TAEG reflète ce que vous gagnez réellement après capitalisation. Un TAP de 6 % composé mensuellement donne un TAEG de 6,17 %. Les banques annoncent le TAEG pour les comptes d'épargne et le TAP pour les prêts. Entrez le taux que votre banque indique — cette calculatrice le traite comme le chiffre annuel et le compose mensuellement.",
					'sub-mtgq1': 'Que comprend le paiement mensuel ?',
					'sub-mtga1': "Cette calculatrice affiche uniquement le capital et les intérêts. Votre paiement réel peut également inclure les taxes foncières (généralement 1 à 2 % de la valeur du bien par an) et l'assurance habitation — les deux varient selon le pays et la région. Ajoutez-les séparément pour obtenir votre véritable coût mensuel de logement.",
					'sub-mtgq2': 'Dois-je choisir un prêt hypothécaire sur 15 ou 30 ans ?',
					'sub-mtga2': "Un prêt sur 15 ans double à peu près le paiement mensuel mais réduit les intérêts totaux d'environ la moitié. Sur un prêt de 300 000 $ à 6,5 %, un prêt sur 30 ans coûte environ 382 000 $ d'intérêts ; un prêt sur 15 ans coûte environ 121 000 $. Choisissez 15 ans si vous pouvez facilement vous permettre le paiement plus élevé. Choisissez 30 ans si vous avez besoin de flexibilité de trésorerie ou prévoyez d'investir la différence.",
					'sub-mtgq3': 'Comment mon apport affecte-t-il le paiement mensuel ?',
					'sub-mtga3': "Un apport plus important réduit directement le principal du prêt, ce qui réduit chaque paiement mensuel. Dans de nombreux pays, un apport inférieur à 20 % déclenche une assurance hypothécaire (appelée PMI aux États-Unis), ajoutant environ 0,5 à 1 % du prêt par an. N'entrez que le montant que vous empruntez réellement — soustrayez d'abord votre apport du prix d'achat.",
					'sub-mtgq4': 'Comment mon score de crédit affecte-t-il mon taux hypothécaire ?',
					'sub-mtga4': "Les prêteurs évaluent le risque à travers le taux d'intérêt qu'ils proposent : un saut de score de crédit de 650 à 750 peut réduire votre taux de 0,5 à 1,5 %. Sur un prêt hypothécaire de 300 000 $, une réduction de taux de 1 % économise environ 200 $/mois et plus de 60 000 $ sur une durée de 30 ans. Vérifiez votre rapport de crédit 3 à 6 mois avant de faire une demande — suffisamment de temps pour contester les erreurs et rembourser les soldes."
				},
				es: {
					'sub-rfq2': '¿Qué son los costos de cierre y cuánto debo esperar?',
					'sub-rfa2': 'Los costos de cierre son tarifas únicas para completar un refinanciamiento: tarifas de originación del prestamista, búsqueda de título, tasación y tarifas de registro gubernamental. En EE.UU. generalmente oscilan entre el 2 y el 5% del monto del préstamo — $6,000-$15,000 en un préstamo de $300K. Fuera de EE.UU. la estructura varía; use la cotización de su prestamista o estime del 1 al 3% si aún no tiene una. Cuanto más precisa sea su cifra de costos de cierre, más preciso será su resultado de punto de equilibrio.',
					'sub-rfq3': '¿Cuándo NO tiene sentido refinanciar?',
					'sub-rfa3': 'El refinanciamiento tiene costos iniciales que tardan meses en recuperarse. Rara vez tiene sentido si: (1) planea vender o pagar el préstamo antes del punto de equilibrio, (2) la reducción de tasa es menor al 0,5%, o (3) su plazo restante es tan corto que reiniciar una hipoteca larga agrega más intereses totales de los que ahorra. Si su punto de equilibrio es más largo que su estadía planeada en el préstamo, omita el refinanciamiento.',
					'sub-curq2': '¿Con qué frecuencia se actualizan los tipos de cambio?',
					'sub-cura2': 'Las tasas se obtienen de la API de Frankfurter y se almacenan en caché en su navegador durante 24 horas. La tasa que ve refleja el cierre del mercado anterior, no los movimientos intradía. Para transferencias grandes donde una fracción de porcentaje importa, verifique la tasa de mercado medio actual con su banco o un servicio FX dedicado antes de realizar la transacción.',
					'sub-curq3': '¿Por qué la moneda "a" se preselecciona automáticamente?',
					'sub-cura3': 'El convertidor lee la configuración de idioma de su navegador (por ejemplo, en-GB o ar-SA) para adivinar su moneda local. Si adivina mal, cámbiela con el menú desplegable — su selección no se guarda entre visitas.',
					'sub-lnq3': '¿Cuál es la diferencia entre un préstamo personal y un préstamo de automóvil?',
					'sub-lna3': 'Los préstamos de auto están garantizados por el vehículo, por lo que los prestamistas ofrecen tasas más bajas — típicamente 5-10% — pero pueden recuperar el auto si no paga. Los préstamos personales no están garantizados (sin colateral), por lo que las tasas son más altas, 8-25%, pero pueden financiar cualquier cosa, desde consolidación de deudas hasta mejoras del hogar. Ambos usan la misma fórmula de pago — solo difieren la tasa y el plazo.',
					'sub-svq1': '¿Qué es el interés compuesto y por qué es importante?',
					'sub-sva1': 'El interés compuesto significa que gana intereses sobre sus intereses, no solo sobre su depósito original. Un depósito de $10,000 al 5% gana $500 en el primer año. En el segundo año gana 5% sobre $10,500 — $25 adicionales. En 20 años esto convierte $10,000 en ~$26,500 sin agregar un centavo. Cuanto más frecuentemente se compone el interés (diario vs mensual vs anual), más rápido crece el saldo.',
					'sub-svq2': '¿Por qué las contribuciones mensuales marcan una gran diferencia?',
					'sub-sva2': 'Cada contribución mensual comienza a componerse de inmediato. $200/mes al 6% durante 20 años crece a ~$92,000 — pero sus contribuciones totales fueron solo $48,000. Los $44,000 adicionales son puro efecto de capitalización. El tiempo y la consistencia importan más que el tamaño del depósito inicial.',
					'sub-svq3': '¿Cuál es la diferencia entre APR y APY?',
					'sub-sva3': 'APR (Tasa de Porcentaje Anual) es la tasa nominal antes de la capitalización dentro del año. APY (Rendimiento Porcentual Anual) refleja lo que realmente gana después de la capitalización. Un APR del 6% compuesto mensualmente da un APY del 6,17%. Los bancos anuncian APY para cuentas de ahorro y APR para préstamos. Ingrese la tasa que su banco indica — esta calculadora la trata como la cifra anual y la capitaliza mensualmente.',
					'sub-mtgq1': '¿Qué incluye el pago mensual?',
					'sub-mtga1': 'Esta calculadora muestra solo capital e intereses. Su pago real también puede incluir impuestos sobre la propiedad (típicamente 1-2% del valor de la vivienda por año) y seguro de propietario — ambos varían por país y región. Agréguelos por separado para obtener su verdadero costo mensual de vivienda.',
					'sub-mtgq2': '¿Debo elegir una hipoteca de 15 o 30 años?',
					'sub-mtga2': 'Un plazo de 15 años aproximadamente duplica el pago mensual pero reduce los intereses totales a la mitad. En un préstamo de $300K al 6,5%, un plazo de 30 años cuesta ~$382K en intereses; un plazo de 15 años cuesta ~$121K. Elija 15 años si puede permitirse cómodamente el pago más alto. Elija 30 años si necesita flexibilidad de flujo de caja o planea invertir la diferencia.',
					'sub-mtgq3': '¿Cómo afecta mi pago inicial el pago mensual?',
					'sub-mtga3': 'Un pago inicial más grande reduce directamente el capital del préstamo, lo que disminuye cada pago mensual. En muchos países, un pago inicial inferior al 20% activa el seguro hipotecario (llamado PMI en EE.UU.), añadiendo aproximadamente 0.5-1% del préstamo por año. Ingrese solo el monto que realmente está pidiendo prestado — reste primero su pago inicial del precio de compra.',
					'sub-mtgq4': '¿Cómo afecta mi puntaje de crédito a mi tasa hipotecaria?',
					'sub-mtga4': 'Los prestamistas fijan el precio del riesgo a través de la tasa de interés que ofrecen: un salto en el puntaje de crédito de 650 a 750 puede reducir su tasa en 0.5-1.5%. En una hipoteca de $300K, una reducción de tasa del 1% ahorra aproximadamente $200/mes y más de $60K en un plazo de 30 años. Revise su informe de crédito 3-6 meses antes de aplicar — tiempo suficiente para disputar errores y pagar saldos.'
				},
				de: {
					'sub-rfq2': 'Was sind Abschlusskosten und wie viel sollte ich erwarten?',
					'sub-rfa2': 'Abschlusskosten sind einmalige Gebühren für die Abwicklung einer Refinanzierung: Origination-Gebühren des Kreditgebers, Titelsuche, Bewertung und staatliche Registrierungsgebühren. In den USA betragen sie typischerweise 2–5% des Kreditbetrags — $6.000–$15.000 bei einem $300K-Darlehen. Außerhalb der USA variiert die Struktur; verwenden Sie das Angebot Ihres Kreditgebers oder schätzen Sie 1–3%, wenn Sie noch keines haben. Je genauer Ihre Abschlusskostenangabe, desto genauer Ihr Break-Even-Ergebnis.',
					'sub-rfq3': 'Wann macht eine Refinanzierung KEINEN Sinn?',
					'sub-rfa3': 'Eine Refinanzierung hat Vorabkosten, die Monate brauchen, um sich zu amortisieren. Sie macht selten Sinn, wenn: (1) Sie planen, das Darlehen vor dem Break-Even zu verkaufen oder abzuzahlen, (2) die Zinssenkung weniger als 0,5 % beträgt, oder (3) Ihre verbleibende Laufzeit so kurz ist, dass der Neustart einer langen Hypothek mehr Gesamtzinsen hinzufügt als Sie sparen. Wenn Ihr Break-Even länger ist als Ihre geplante Verweildauer im Darlehen, überspringen Sie die Refinanzierung.',
					'sub-curq2': 'Wie oft werden Wechselkurse aktualisiert?',
					'sub-cura2': 'Kurse werden von der Frankfurter API abgerufen und 24 Stunden in Ihrem Browser zwischengespeichert. Der angezeigte Kurs spiegelt den vorherigen Marktschluss wider — keine Intraday-Bewegungen. Bei großen Überweisungen, bei denen ein Bruchteil eines Prozents wichtig ist, überprüfen Sie den aktuellen Mittelkurs bei Ihrer Bank oder einem dedizierten Devisendienst, bevor Sie handeln.',
					'sub-curq3': 'Warum wird die „Nach"-Währung automatisch vorausgewählt?',
					'sub-cura3': 'Der Converter liest die Spracheinstellung Ihres Browsers (z. B. en-GB oder ar-SA), um Ihre lokale Währung zu erraten. Wenn er falsch rät, ändern Sie sie mit dem Dropdown — Ihre Auswahl wird zwischen den Besuchen nicht gespeichert.',
					'sub-lnq3': 'Was ist der Unterschied zwischen einem Privatkredit und einem Autokredit?',
					'sub-lna3': 'Autokredite sind durch das Fahrzeug gesichert, daher bieten Kreditgeber niedrigere Zinsen — typischerweise 5–10 % — können aber das Auto zurücknehmen, wenn Sie Zahlungen verpassen. Privatkredite sind ungesichert (keine Sicherheiten), daher laufen die Zinsen höher, 8–25 %, können aber alles finanzieren, von der Schuldenkonsolidierung bis zu Hausverbesserungen. Beide verwenden dieselbe Zahlungsformel — nur Zinssatz und Laufzeit unterscheiden sich.',
					'sub-svq1': 'Was ist Zinseszins und warum ist er wichtig?',
					'sub-sva1': 'Zinseszins bedeutet, dass Sie Zinsen auf Ihre Zinsen verdienen, nicht nur auf Ihre ursprüngliche Einlage. Eine Einlage von 10.000 $ bei 5 % verdient im ersten Jahr 500 $. Im zweiten Jahr verdienen Sie 5 % auf 10.500 $ — 25 $ extra. Über 20 Jahre verwandelt dies 10.000 $ in ~26.500 $ ohne einen Cent hinzuzufügen. Je häufiger Zinsen aufgezinst werden (täglich vs. monatlich vs. jährlich), desto schneller wächst das Guthaben.',
					'sub-svq2': 'Warum machen monatliche Beiträge einen so großen Unterschied?',
					'sub-sva2': 'Jeder monatliche Beitrag beginnt sofort aufzuzinsen. 200 $/Monat bei 6 % über 20 Jahre wächst auf ~92.000 $ — aber Ihre Gesamtbeiträge waren nur 48.000 $. Die zusätzlichen 44.000 $ sind reine Aufzinsung. Zeit und Konsequenz sind wichtiger als die Höhe der Ersteinlage.',
					'sub-svq3': 'Was ist der Unterschied zwischen APR und APY?',
					'sub-sva3': 'APR (Jahreszinssatz) ist der nominale Zinssatz vor der Aufzinsung innerhalb des Jahres. APY (Jahresrendite) spiegelt wider, was Sie nach der Aufzinsung tatsächlich verdienen. Ein 6% APR monatlich aufgezinst ergibt einen APY von 6,17%. Banken werben mit APY für Sparkonten und APR für Kredite. Geben Sie den Zinssatz ein, den Ihre Bank angibt — dieser Rechner behandelt ihn als Jahreswert und zinst ihn monatlich auf.',
					'sub-mtgq1': 'Was beinhaltet die monatliche Zahlung?',
					'sub-mtga1': 'Dieser Rechner zeigt nur Kapital und Zinsen. Ihre tatsächliche Zahlung kann auch Grundsteuern (typischerweise 1–2 % des Immobilienwerts pro Jahr) und Hausbesitzerversicherung umfassen — beide variieren je nach Land und Region. Fügen Sie diese separat hinzu, um Ihre tatsächlichen monatlichen Wohnkosten zu erhalten.',
					'sub-mtgq2': 'Soll ich eine 15-jährige oder 30-jährige Hypothek wählen?',
					'sub-mtga2': 'Eine 15-jährige Laufzeit verdoppelt ungefähr die monatliche Zahlung, halbiert aber die Gesamtzinsen. Bei einem 300.000-$-Darlehen mit 6,5 % kostet eine 30-jährige Laufzeit ~382.000 $ an Zinsen; eine 15-jährige Laufzeit kostet ~121.000 $. Wählen Sie 15 Jahre, wenn Sie die höhere Zahlung bequem leisten können. Wählen Sie 30 Jahre, wenn Sie Cashflow-Flexibilität benötigen oder die Differenz investieren möchten.',
					'sub-mtgq3': 'Wie beeinflusst meine Anzahlung die monatliche Zahlung?',
					'sub-mtga3': 'Eine höhere Anzahlung reduziert direkt das Darlehenskapital, was jede monatliche Zahlung senkt. In vielen Ländern löst eine Anzahlung unter 20 % eine Hypothekenversicherung aus (in den USA PMI genannt), die jährlich etwa 0,5–1 % des Darlehens hinzufügt. Geben Sie nur den Betrag ein, den Sie tatsächlich leihen — ziehen Sie zuerst Ihre Anzahlung vom Kaufpreis ab.',
					'sub-mtgq4': 'Wie beeinflusst meine Kreditwürdigkeit meinen Hypothekenzinssatz?',
					'sub-mtga4': 'Kreditgeber bepreisen Risiken durch den Zinssatz, den sie anbieten: Ein Sprung der Kreditwürdigkeit von 650 auf 750 kann Ihren Zinssatz um 0,5–1,5 % senken. Bei einer $300K-Hypothek spart eine 1%ige Zinssenkung etwa $200/Monat und über $60K über eine 30-jährige Laufzeit. Prüfen Sie Ihre Kreditauskunft 3–6 Monate vor der Antragstellung — genug Zeit, um Fehler anzufechten und Schulden abzubauen.'
				},
				zh: {
					'sub-rfq2': '什么是结清费用，我应该预期多少？',
					'sub-rfa2': '结清费用是完成再融资的一次性费用：贷款机构发起费、产权搜索、评估和政府登记费。在美国，通常为贷款金额的2-5% — 30万美元贷款需6,000-15,000美元。在美国以外，结构各异；使用贷款机构的报价，或如果还没有，估计1-3%。您的结清费用数字越准确，您的盈亏平衡结果就越准确。',
					'sub-rfq3': '什么时候再融资不合理？',
					'sub-rfa3': '再融资有需要数月才能收回的前期成本。在以下情况下很少有意义：(1) 您计划在盈亏平衡点之前出售或还清贷款，(2) 利率降低不足0.5%，或 (3) 您的剩余期限太短，重新开始长期抵押贷款所增加的总利息超过您节省的。如果您的盈亏平衡点比您计划在贷款中停留的时间更长，请跳过再融资。',
					'sub-curq2': '汇率多久更新一次？',
					'sub-cura2': '汇率从Frankfurter API获取并在您的浏览器中缓存24小时。您看到的汇率反映上一个市场收盘价——而非盘中波动。对于分数百分比很重要的大额转账，在交易前请向您的银行或专业外汇服务核实当前中间市场汇率。',
					'sub-curq3': '为什么"目标"货币会自动预选？',
					'sub-cura3': '转换器读取您的浏览器语言设置（例如en-GB或ar-SA）来猜测您的本地货币。如果猜错了，请使用下拉菜单更改——您的选择不会在访问之间保存。',
					'sub-lnq3': '个人贷款和汽车贷款有什么区别？',
					'sub-lna3': '汽车贷款以车辆为担保，因此贷款机构提供较低的利率——通常为5-10%——但如果您错过还款，可以收回汽车。个人贷款是无担保的（无抵押品），因此利率更高，8-25%，但可以资助从债务整合到家庭改善的任何事情。两者使用相同的还款公式——只是利率和期限不同。',
					'sub-svq1': '什么是复利，为什么它很重要？',
					'sub-sva1': '复利意味着您在利息上赚取利息，而不仅仅是原始存款。10,000美元以5%的利率在第一年赚取500美元。第二年，您在10,500美元上赚取5%——额外25美元。20年内，不添加一分钱，这将10,000美元变成约26,500美元。利息复利越频繁（每日vs每月vs每年），余额增长越快。',
					'sub-svq2': '为什么每月缴款会有如此大的影响？',
					'sub-sva2': '每笔月度缴款立即开始复利。每月200美元，6%利率，20年增长到约92,000美元——但您的总缴款仅为48,000美元。额外的44,000美元是纯粹的复利。时间和一致性比初始存款的大小更重要。',
					'sub-svq3': 'APR和APY有什么区别？',
					'sub-sva3': 'APR（年化利率）是一年内复利前的名义利率。APY（年化收益率）反映复利后您实际赚取的。6% APR按月复利给出APY 6.17%。银行对储蓄账户宣传APY，对贷款宣传APR。输入银行提供的任何利率——本计算器将其视为年度数字并按月复利。',
					'sub-mtgq1': '月供包括什么？',
					'sub-mtga1': '本计算器仅显示本金和利息。您的实际还款可能还包括房产税（通常为房屋价值的1-2%/年）和房主保险——两者因国家和地区而异。单独添加这些以获得您真实的每月住房成本。',
					'sub-mtgq2': '我应该选择15年还是30年抵押贷款？',
					'sub-mtga2': '15年期大约使月供翻倍，但将总利息削减约一半。在6.5%利率的30万美元贷款上，30年期利息约38.2万美元；15年期利息约12.1万美元。如果您能舒适地承担较高还款，选择15年。如果您需要现金流灵活性或计划投资差额，选择30年。',
					'sub-mtgq3': '我的首付如何影响月供？',
					'sub-mtga3': '较大的首付直接减少贷款本金，从而降低每月还款。在许多国家，低于20%的首付会触发抵押贷款保险（在美国称为PMI），每年增加约0.5-1%的贷款费用。只输入您实际借款金额——先从购买价格中减去首付款。',
					'sub-mtgq4': '我的信用评分如何影响我的抵押贷款利率？',
					'sub-mtga4': '贷款机构通过他们提供的利率来定价风险：信用评分从650跳升到750可以将您的利率降低0.5-1.5%。在$300K抵押贷款上，1%的利率降低每月节省约$200，30年期限节省超过$60K。在申请前3-6个月检查您的信用报告——有足够时间对错误提出异议并偿还余额。'
				},
				hi: {
					'sub-rfq2': 'क्लोज़िंग कॉस्ट क्या हैं और मुझे कितनी उम्मीद करनी चाहिए?',
					'sub-rfa2': 'क्लोज़िंग कॉस्ट रिफाइनेंस पूरा करने के लिए एकमुश्त शुल्क हैं: लेंडर ओरिजिनेशन फीस, टाइटल सर्च, अप्रेज़ल और सरकारी रिकॉर्डिंग फीस। अमेरिका में वे आमतौर पर लोन राशि का 2-5% होती हैं — $300K लोन पर $6,000-$15,000। अमेरिका के बाहर संरचना अलग होती है; अपने लेंडर के उद्धरण का उपयोग करें या 1-3% का अनुमान लगाएं यदि आपके पास अभी तक नहीं है। आपका क्लोज़िंग कॉस्ट आंकड़ा जितना सटीक होगा, आपका ब्रेक-ईवन परिणाम उतना ही सटीक होगा।',
					'sub-rfq3': 'रिफाइनेंसिंग कब समझ में नहीं आती?',
					'sub-rfa3': 'रिफाइनेंसिंग में अग्रिम लागतें होती हैं जिन्हें वापस पाने में महीने लगते हैं। यह शायद ही कभी समझ में आता है यदि: (1) आप ब्रेक-ईवन पॉइंट से पहले लोन बेचने या चुकाने की योजना बनाते हैं, (2) दर में कमी 0.5% से कम है, या (3) आपका शेष कार्यकाल इतना छोटा है कि एक लंबे मॉर्गेज को फिर से शुरू करने से आप जितना बचाते हैं उससे अधिक कुल ब्याज जुड़ जाता है। यदि आपका ब्रेक-ईवन लोन में आपके नियोजित प्रवास से लंबा है, तो रिफाइनेंसिंग छोड़ें।',
					'sub-curq2': 'विनिमय दरें कितनी बार अपडेट होती हैं?',
					'sub-cura2': 'दरें Frankfurter API से प्राप्त की जाती हैं और आपके ब्राउज़र में 24 घंटों के लिए कैश की जाती हैं। आप जो दर देखते हैं वह पिछले बाजार बंद को दर्शाती है — इंट्राडे मूवमेंट नहीं। बड़े ट्रांसफर के लिए जहां प्रतिशत का एक अंश मायने रखता है, लेनदेन से पहले अपने बैंक या एक समर्पित FX सेवा से वर्तमान मिड-मार्केट दर सत्यापित करें।',
					'sub-curq3': '"टू" करेंसी स्वचालित रूप से प्री-सेलेक्ट क्यों होती है?',
					'sub-cura3': 'कनवर्टर आपकी स्थानीय मुद्रा का अनुमान लगाने के लिए आपके ब्राउज़र की लोकेल सेटिंग (उदाहरण के लिए, en-GB या ar-SA) पढ़ता है। यदि यह गलत अनुमान लगाता है, तो ड्रॉपडाउन से इसे बदलें — आपका चयन विज़िट के बीच सहेजा नहीं जाता।',
					'sub-lnq3': 'व्यक्तिगत ऋण और कार ऋण के बीच क्या अंतर है?',
					'sub-lna3': 'कार लोन वाहन द्वारा सुरक्षित होते हैं, इसलिए लेंडर कम दरें प्रदान करते हैं — आमतौर पर 5-10% — लेकिन यदि आप भुगतान चूकते हैं तो कार वापस ले सकते हैं। पर्सनल लोन असुरक्षित होते हैं (कोई संपार्श्विक नहीं), इसलिए दरें अधिक होती हैं, 8-25%, लेकिन वे डेट कंसोलिडेशन से होम इम्प्रूवमेंट तक कुछ भी वित्त कर सकते हैं। दोनों समान भुगतान फॉर्मूला का उपयोग करते हैं — केवल दर और अवधि अलग-अलग हैं।',
					'sub-svq1': 'चक्रवृद्धि ब्याज क्या है और यह क्यों मायने रखता है?',
					'sub-sva1': 'चक्रवृद्धि ब्याज का मतलब है कि आप अपनी ब्याज पर ब्याज कमाते हैं, न केवल अपनी मूल जमा पर। 5% पर $10,000 की जमा पहले वर्ष में $500 कमाती है। दूसरे वर्ष में आप $10,500 पर 5% कमाते हैं — अतिरिक्त $25। 20 वर्षों में यह एक पैसा जोड़े बिना $10,000 को ~$26,500 में बदल देता है। ब्याज जितनी अधिक बार संयोजित होता है (दैनिक बनाम मासिक बनाम वार्षिक), शेष उतनी ही तेज़ी से बढ़ता है।',
					'sub-svq2': 'मासिक योगदान इतना बड़ा अंतर क्यों बनाते हैं?',
					'sub-sva2': 'प्रत्येक मासिक योगदान तुरंत संयोजित होना शुरू हो जाता है। 6% पर $200/माह 20 वर्षों के लिए ~$92,000 तक बढ़ता है — लेकिन आपके कुल योगदान केवल $48,000 थे। अतिरिक्त $44,000 शुद्ध संयोजन है। समय और निरंतरता प्रारंभिक जमा के आकार से अधिक मायने रखती है।',
					'sub-svq3': 'APR और APY के बीच क्या अंतर है?',
					'sub-sva3': 'APR (वार्षिक प्रतिशत दर) वर्ष के भीतर संयोजन से पहले की नाममात्र दर है। APY (वार्षिक प्रतिशत उपज) संयोजन के बाद आप वास्तव में क्या कमाते हैं उसे दर्शाता है। मासिक संयोजित 6% APR 6.17% का APY देता है। बैंक बचत खातों के लिए APY और ऋणों के लिए APR विज्ञापन करते हैं। आपका बैंक जो भी दर बताए वह दर्ज करें — यह कैलकुलेटर इसे वार्षिक आंकड़े के रूप में मानता है और मासिक संयोजित करता है।',
					'sub-mtgq1': 'मासिक भुगतान में क्या शामिल है?',
					'sub-mtga1': 'यह कैलकुलेटर केवल मूलधन और ब्याज दिखाता है। आपके वास्तविक भुगतान में संपत्ति कर (आमतौर पर घर के मूल्य का 1-2% प्रति वर्ष) और गृहस्वामी बीमा भी शामिल हो सकता है — दोनों देश और क्षेत्र के अनुसार भिन्न होते हैं। अपनी वास्तविक मासिक आवास लागत प्राप्त करने के लिए इन्हें अलग से जोड़ें।',
					'sub-mtgq2': 'क्या मुझे 15 साल या 30 साल का मॉर्गेज चुनना चाहिए?',
					'sub-mtga2': '15 वर्षीय अवधि लगभग मासिक भुगतान को दोगुना कर देती है लेकिन कुल ब्याज को लगभग आधा कर देती है। 6.5% पर $300K लोन पर, 30 वर्षीय अवधि ब्याज में ~$382K लागत; 15 वर्षीय अवधि ~$121K लागत। 15 वर्ष चुनें यदि आप आराम से अधिक भुगतान वहन कर सकते हैं। 30 वर्ष चुनें यदि आपको नकदी प्रवाह लचीलेपन की आवश्यकता है या अंतर निवेश करने की योजना है।',
					'sub-mtgq3': 'मेरा डाउन पेमेंट मासिक भुगतान को कैसे प्रभावित करता है?',
					'sub-mtga3': 'बड़ा डाउन पेमेंट सीधे ऋण की मूल राशि कम करता है, जो हर मासिक भुगतान को कम करता है। कई देशों में 20% से कम का डाउन पेमेंट मॉर्गेज इंश्योरेंस को सक्रिय करता है (अमेरिका में PMI कहा जाता है), जो प्रति वर्ष ऋण का लगभग 0.5-1% जोड़ता है। केवल वह राशि दर्ज करें जो आप वास्तव में उधार ले रहे हैं — पहले खरीद मूल्य से अपना डाउन पेमेंट घटाएं।',
					'sub-mtgq4': 'मेरा क्रेडिट स्कोर मेरी मॉर्गेज दर को कैसे प्रभावित करता है?',
					'sub-mtga4': 'लेंडर जोखिम की कीमत उस ब्याज दर के माध्यम से लगाते हैं जो वे प्रदान करते हैं: 650 से 750 तक क्रेडिट स्कोर की छलांग आपकी दर को 0.5-1.5% तक कम कर सकती है। $300K मॉर्गेज पर, 1% दर में कटौती लगभग $200/माह और 30 साल की अवधि में $60K से अधिक बचाती है। आवेदन करने से 3-6 महीने पहले अपनी क्रेडिट रिपोर्ट जांचें — त्रुटियों पर विवाद और बैलेंस चुकाने के लिए पर्याप्त समय।'
				},
				pt: {
					'sub-rfq2': 'O que são custos de fechamento e quanto devo esperar?',
					'sub-rfa2': 'Os custos de fechamento são taxas únicas para concluir um refinanciamento: taxas de originação do credor, pesquisa de título, avaliação e taxas de registro governamental. Nos EUA, geralmente variam de 2 a 5% do valor do empréstimo — $6.000 a $15.000 em um empréstimo de $300K. Fora dos EUA, a estrutura varia; use a cotação do seu credor ou estime 1 a 3% se ainda não tiver uma. Quanto mais preciso o valor dos custos de fechamento, mais preciso o resultado do ponto de equilíbrio.',
					'sub-rfq3': 'Quando o refinanciamento NÃO faz sentido?',
					'sub-rfa3': 'O refinanciamento tem custos iniciais que levam meses para recuperar. Raramente faz sentido se: (1) você planeja vender ou quitar o empréstimo antes do ponto de equilíbrio, (2) a redução de taxa é menor que 0,5%, ou (3) seu prazo restante é tão curto que reiniciar uma hipoteca longa adiciona mais juros totais do que você economiza. Se seu ponto de equilíbrio for mais longo do que sua permanência planejada no empréstimo, pule o refinanciamento.',
					'sub-curq2': 'Com que frequência as taxas de câmbio são atualizadas?',
					'sub-cura2': 'As taxas são obtidas da API Frankfurter e armazenadas em cache no seu navegador por 24 horas. A taxa que você vê reflete o fechamento anterior do mercado — não os movimentos intradiários. Para grandes transferências onde uma fração de percentual importa, verifique a taxa de mercado médio atual com seu banco ou um serviço FX dedicado antes de transacionar.',
					'sub-curq3': 'Por que a moeda "para" é pré-selecionada automaticamente?',
					'sub-cura3': 'O conversor lê a configuração de idioma do seu navegador (por exemplo, en-GB ou ar-SA) para adivinhar sua moeda local. Se adivinhar errado, altere com o menu suspenso — sua seleção não é salva entre visitas.',
					'sub-lnq3': 'Qual é a diferença entre um empréstimo pessoal e um empréstimo de carro?',
					'sub-lna3': 'Empréstimos de carro são garantidos pelo veículo, então os credores oferecem taxas mais baixas — tipicamente 5–10% — mas podem recuperar o carro se você perder pagamentos. Empréstimos pessoais são não garantidos (sem garantia), então as taxas são mais altas, 8–25%, mas podem financiar qualquer coisa, de consolidação de dívidas a reformas. Ambos usam a mesma fórmula de pagamento — apenas a taxa e o prazo diferem.',
					'sub-svq1': 'O que são juros compostos e por que são importantes?',
					'sub-sva1': 'Juros compostos significa que você ganha juros sobre seus juros, não apenas sobre seu depósito original. Um depósito de $10.000 a 5% ganha $500 no primeiro ano. No segundo ano você ganha 5% sobre $10.500 — $25 extras. Em 20 anos isso transforma $10.000 em ~$26.500 sem adicionar um centavo. Quanto mais frequentemente os juros se compõem (diário vs mensal vs anual), mais rápido o saldo cresce.',
					'sub-svq2': 'Por que as contribuições mensais fazem tanta diferença?',
					'sub-sva2': 'Cada contribuição mensal começa a render juros compostos imediatamente. $200/mês a 6% por 20 anos cresce para ~$92.000 — mas suas contribuições totais foram apenas $48.000. Os $44.000 extras são puro efeito dos juros compostos. Tempo e consistência importam mais do que o tamanho do depósito inicial.',
					'sub-svq3': 'Qual é a diferença entre APR e APY?',
					'sub-sva3': 'APR (Taxa Percentual Anual) é a taxa nominal antes da composição dentro do ano. APY (Rendimento Percentual Anual) reflete o que você realmente ganha após a composição. Um APR de 6% composto mensalmente dá um APY de 6,17%. Os bancos anunciam APY para contas poupança e APR para empréstimos. Insira a taxa que seu banco declara — esta calculadora a trata como o valor anual e compõe mensalmente.',
					'sub-mtgq1': 'O que inclui o pagamento mensal?',
					'sub-mtga1': 'Esta calculadora mostra apenas principal e juros. Seu pagamento real também pode incluir impostos sobre propriedade (tipicamente 1-2% do valor do imóvel por ano) e seguro residencial — ambos variam por país e região. Adicione-os separadamente para obter seu verdadeiro custo mensal de moradia.',
					'sub-mtgq2': 'Devo escolher uma hipoteca de 15 ou 30 anos?',
					'sub-mtga2': 'Um prazo de 15 anos aproximadamente dobra o pagamento mensal, mas reduz os juros totais pela metade. Em um empréstimo de $300K a 6,5%, um prazo de 30 anos custa ~$382K em juros; um prazo de 15 anos custa ~$121K. Escolha 15 anos se puder pagar o valor mais alto confortavelmente. Escolha 30 anos se precisar de flexibilidade de fluxo de caixa ou planejar investir a diferença.',
					'sub-mtgq3': 'Como minha entrada afeta o pagamento mensal?',
					'sub-mtga3': 'Um pagamento inicial maior reduz diretamente o principal do empréstimo, o que diminui cada pagamento mensal. Em muitos países, um pagamento inicial abaixo de 20% aciona o seguro hipotecário (chamado PMI nos EUA), adicionando cerca de 0,5-1% do empréstimo por ano. Digite apenas o valor que você está realmente emprestando — subtraia primeiro sua entrada do preço de compra.',
					'sub-mtgq4': 'Como minha pontuação de crédito afeta minha taxa de hipoteca?',
					'sub-mtga4': 'Os credores precificam o risco através da taxa de juros que oferecem: um salto no escore de crédito de 650 para 750 pode reduzir sua taxa em 0,5-1,5%. Em uma hipoteca de $300K, uma redução de taxa de 1% economiza aproximadamente $200/mês e mais de $60K em um prazo de 30 anos. Verifique seu relatório de crédito 3-6 meses antes de solicitar — tempo suficiente para contestar erros e pagar saldos.'
				},
				tr: {
					'sub-rfq2': 'Kapanış maliyetleri nedir ve ne kadar beklemeliyim?',
					'sub-rfa2': "Kapanış maliyetleri, bir refinansmanı tamamlamak için tek seferlik ücretlerdir: borç veren başlangıç ücretleri, tapu araştırması, değerleme ve resmi kayıt ücretleri. ABD'de genellikle kredi tutarının %2-5'i — 300.000 dolarlık bir kredide 6.000-15.000 dolar. ABD dışında yapı farklılık gösterir; henüz yoksa borç vereninizin teklifini veya %1-3 tahmini kullanın. Kapanış maliyet rakamınız ne kadar doğruysa, başabaş sonucunuz o kadar doğru olur.",
					'sub-rfq3': 'Yeniden finansman NE ZAMAN mantıklı değil?',
					'sub-rfa3': "Yeniden finansmanın, geri kazanılması aylar süren ön maliyetleri vardır. Şu durumlarda nadiren mantıklıdır: (1) başabaş noktasından önce satmayı veya krediyi ödemeyi planlıyorsanız, (2) faiz indirimi %0,5'ten azdır veya (3) kalan vadeniz o kadar kısa ki uzun bir ipotek yeniden başlatmak tasarruf ettiğinizden daha fazla toplam faiz ekler. Başabaş noktanız, kredide planladığınız kalmadan uzunsa, refinansmanı atlayın.",
					'sub-curq2': 'Döviz kurları ne sıklıkla güncellenir?',
					'sub-cura2': "Kurlar Frankfurter API'den alınır ve tarayıcınızda 24 saat önbelleğe alınır. Gördüğünüz kur önceki piyasa kapanışını yansıtır — gün içi hareketleri değil. Bir yüzde kesrinin önemli olduğu büyük transferler için, işlem yapmadan önce güncel orta piyasa kurunu bankanız veya özel bir döviz hizmeti ile doğrulayın.",
					'sub-curq3': '"Alıcı" para birimi neden otomatik olarak önceden seçilir?',
					'sub-cura3': 'Dönüştürücü, yerel para biriminizi tahmin etmek için tarayıcınızın yerel ayarını (örneğin, en-GB veya ar-SA) okur. Yanlış tahmin ederse, açılır menüyle değiştirin — seçiminiz ziyaretler arasında kaydedilmez.',
					'sub-lnq3': 'Kişisel kredi ile araba kredisi arasındaki fark nedir?',
					'sub-lna3': 'Araba kredileri araçla güvence altına alınır, bu nedenle borç verenler daha düşük faiz oranları sunar — genellikle %5-10 — ancak ödemelerinizi kaçırırsanız arabayı geri alabilir. Kişisel krediler teminatsızdır (teminat yok), bu nedenle oranlar daha yüksek seyreder, %8-25, ancak borç konsolidasyonundan ev tadilatına kadar her şeyi finanse edebilir. Her ikisi de aynı ödeme formülünü kullanır — yalnızca oran ve vade farklıdır.',
					'sub-svq1': 'Bileşik faiz nedir ve neden önemlidir?',
					'sub-sva1': "Bileşik faiz, yalnızca orijinal mevduatınız üzerinden değil, faiziniz üzerinden de faiz kazandığınız anlamına gelir. %5 faizle 10.000 $ mevduat birinci yılda 500 $ kazanır. İkinci yılda 10.500 $ üzerinden %5 kazanırsınız — ekstra 25 $. 20 yılda bu, bir kuruş eklemeden 10.000 $'ı ~26.500 $'a dönüştürür. Faiz ne kadar sık bileşir (günlük vs aylık vs yıllık), bakiye o kadar hızlı büyür.",
					'sub-svq2': 'Aylık katkılar neden bu kadar büyük fark yaratır?',
					'sub-sva2': "Her aylık katkı hemen bileşmeye başlar. 20 yıl boyunca %6'da 200 $/ay yaklaşık 92.000 $'a büyür — ancak toplam katkılarınız yalnızca 48.000 $'dı. Ekstra 44.000 $ saf bileşimdir. Zaman ve tutarlılık, başlangıç mevduatının büyüklüğünden daha önemlidir.",
					'sub-svq3': 'APR ve APY arasındaki fark nedir?',
					'sub-sva3': 'APR (Yıllık Yüzde Oranı), yıl içindeki bileşimden önceki nominal orandır. APY (Yıllık Yüzde Getiri), bileşimden sonra gerçekte ne kazandığınızı yansıtır. Aylık bileşik %6 APR, %6,17 APY verir. Bankalar tasarruf hesapları için APY, krediler için APR reklamı yapar. Bankanızın belirttiği oranı girin — bu hesap makinesi bunu yıllık değer olarak ele alır ve aylık bileşir.',
					'sub-mtgq1': 'Aylık ödeme neyi kapsar?',
					'sub-mtga1': "Bu hesap makinesi yalnızca anapara ve faizi gösterir. Gerçek ödemeniz ayrıca emlak vergilerini (genellikle evin değerinin yılda %1-2'si) ve ev sahibi sigortasını da içerebilir — her ikisi de ülkeye ve bölgeye göre değişir. Gerçek aylık konut maliyetinizi elde etmek için bunları ayrı ayrı ekleyin.",
					'sub-mtgq2': '15 yıllık mı yoksa 30 yıllık ipotek mi seçmeliyim?',
					'sub-mtga2': "15 yıllık bir vade aylık ödemeyi yaklaşık iki katına çıkarır, ancak toplam faizi yaklaşık yarıya indirir. %6,5'te 300.000 $ kredi için 30 yıllık vade ~382.000 $ faiz; 15 yıllık vade ~121.000 $ faiz maliyeti. Yüksek ödemeyi rahatça karşılayabiliyorsanız 15 yılı seçin. Nakit akışı esnekliğine ihtiyacınız varsa veya farkı yatırmayı planlıyorsanız 30 yılı seçin.",
					'sub-mtgq3': 'Peşinatım aylık ödemeyi nasıl etkiler?',
					'sub-mtga3': "Daha yüksek bir peşinat, kredi anaparasını doğrudan azaltır ve bu da her aylık ödemeyi düşürür. Birçok ülkede %20'nin altında bir peşinat, yıllık yaklaşık %0,5-1 kredi ekleyen ipotek sigortasını (ABD'de PMI olarak adlandırılır) tetikler. Yalnızca gerçekten ödünç aldığınız tutarı girin — önce satın alma fiyatından peşinatınızı çıkarın.",
					'sub-mtgq4': 'Kredi puanım ipotek oranımı nasıl etkiler?',
					'sub-mtga4': "Borç verenler riski sundukları faiz oranı üzerinden fiyatlandırır: 650'den 750'ye kredi puanı atlaması oranınızı %0,5-1,5 düşürebilir. 300.000 $ ipotekte, %1 oranında indirim aylık yaklaşık 200 $ ve 30 yıllık vade boyunca 60.000 $'dan fazla tasarruf sağlar. Başvurmadan 3-6 ay önce kredi raporunuzu kontrol edin — hataları itiraz etmek ve bakiyeleri ödemek için yeterli süre."
				},
				id: {
					'sub-rfq2': 'Apa itu biaya penutupan dan berapa yang harus saya harapkan?',
					'sub-rfa2': 'Biaya penutupan adalah biaya satu kali untuk menyelesaikan refinansiasi: biaya origination pemberi pinjaman, pencarian judul, penilaian, dan biaya pencatatan pemerintah. Di AS biasanya berkisar 2–5% dari jumlah pinjaman — $6.000–$15.000 pada pinjaman $300K. Di luar AS strukturnya bervariasi; gunakan penawaran pemberi pinjaman atau perkirakan 1–3% jika belum ada. Semakin akurat angka biaya penutupan Anda, semakin akurat hasil titik impas Anda.',
					'sub-rfq3': 'Kapan refinansiasi TIDAK masuk akal?',
					'sub-rfa3': 'Refinansiasi memiliki biaya di muka yang membutuhkan berbulan-bulan untuk pulih. Jarang masuk akal jika: (1) Anda berencana menjual atau melunasi pinjaman sebelum titik impas, (2) pengurangan suku bunga kurang dari 0,5%, atau (3) sisa masa pinjaman Anda sangat pendek sehingga memulai kembali hipotek jangka panjang menambah lebih banyak bunga total daripada yang Anda hemat. Jika titik impas Anda lebih lama dari rencana tinggal Anda dalam pinjaman, lewati refinansiasi.',
					'sub-curq2': 'Seberapa sering nilai tukar diperbarui?',
					'sub-cura2': 'Kurs diambil dari API Frankfurter dan di-cache di browser Anda selama 24 jam. Kurs yang Anda lihat mencerminkan penutupan pasar sebelumnya — bukan pergerakan intraday. Untuk transfer besar di mana sepersekian persen penting, verifikasi kurs tengah pasar saat ini dengan bank Anda atau layanan FX khusus sebelum bertransaksi.',
					'sub-curq3': 'Mengapa mata uang "ke" dipilih otomatis?',
					'sub-cura3': 'Konverter membaca pengaturan lokal browser Anda (misalnya, en-GB atau ar-SA) untuk menebak mata uang lokal Anda. Jika tebakannya salah, ubah dengan dropdown — pilihan Anda tidak disimpan antar kunjungan.',
					'sub-lnq3': 'Apa perbedaan antara pinjaman pribadi dan pinjaman mobil?',
					'sub-lna3': 'Pinjaman mobil dijamin oleh kendaraan, sehingga pemberi pinjaman menawarkan suku bunga lebih rendah — biasanya 5–10% — tetapi dapat menyita mobil jika Anda melewatkan pembayaran. Pinjaman pribadi tidak dijamin (tidak ada agunan), sehingga suku bunga lebih tinggi, 8–25%, tetapi dapat membiayai apa saja mulai dari konsolidasi utang hingga renovasi rumah. Keduanya menggunakan rumus pembayaran yang sama — hanya suku bunga dan jangka waktu yang berbeda.',
					'sub-svq1': 'Apa itu bunga majemuk dan mengapa penting?',
					'sub-sva1': 'Bunga majemuk berarti Anda mendapatkan bunga atas bunga Anda, bukan hanya atas setoran asli Anda. Setoran $10.000 dengan 5% menghasilkan $500 di tahun pertama. Di tahun kedua Anda mendapatkan 5% dari $10.500 — $25 ekstra. Selama 20 tahun ini mengubah $10.000 menjadi ~$26.500 tanpa menambahkan sepeser pun. Semakin sering bunga dimajemukkan (harian vs bulanan vs tahunan), semakin cepat saldo tumbuh.',
					'sub-svq2': 'Mengapa kontribusi bulanan membuat perbedaan besar?',
					'sub-sva2': 'Setiap kontribusi bulanan mulai dimajemukkan segera. $200/bulan dengan 6% selama 20 tahun tumbuh menjadi ~$92.000 — tetapi total kontribusi Anda hanya $48.000. Ekstra $44.000 adalah murni efek majemuk. Waktu dan konsistensi lebih penting dari besarnya setoran awal.',
					'sub-svq3': 'Apa perbedaan antara APR dan APY?',
					'sub-sva3': 'APR (Tingkat Persentase Tahunan) adalah tingkat nominal sebelum pemajemukan dalam tahun tersebut. APY (Hasil Persentase Tahunan) mencerminkan apa yang sebenarnya Anda hasilkan setelah pemajemukan. APR 6% yang dimajemukkan bulanan memberikan APY 6,17%. Bank mengiklankan APY untuk rekening tabungan dan APR untuk pinjaman. Masukkan suku bunga yang dinyatakan bank Anda — kalkulator ini memperlakukannya sebagai angka tahunan dan memajemukkan bulanan.',
					'sub-mtgq1': 'Apa yang termasuk dalam pembayaran bulanan?',
					'sub-mtga1': 'Kalkulator ini hanya menampilkan pokok dan bunga. Pembayaran aktual Anda mungkin juga mencakup pajak properti (biasanya 1–2% dari nilai rumah per tahun) dan asuransi pemilik rumah — keduanya bervariasi berdasarkan negara dan wilayah. Tambahkan ini secara terpisah untuk mendapatkan biaya perumahan bulanan yang sebenarnya.',
					'sub-mtgq2': 'Haruskah saya memilih hipotek 15 tahun atau 30 tahun?',
					'sub-mtga2': 'Jangka waktu 15 tahun kira-kira menggandakan pembayaran bulanan tetapi memotong total bunga sekitar setengahnya. Pada pinjaman $300K dengan 6,5%, jangka 30 tahun menelan biaya ~$382K dalam bunga; jangka 15 tahun ~$121K. Pilih 15 tahun jika Anda mampu membayar lebih tinggi dengan nyaman. Pilih 30 tahun jika Anda butuh fleksibilitas arus kas atau berencana menginvestasikan selisihnya.',
					'sub-mtgq3': 'Bagaimana uang muka saya mempengaruhi pembayaran bulanan?',
					'sub-mtga3': 'Uang muka yang lebih besar langsung mengurangi pokok pinjaman, yang menurunkan setiap pembayaran bulanan. Di banyak negara, uang muka di bawah 20% memicu asuransi hipotek (disebut PMI di AS), menambahkan sekitar 0,5–1% pinjaman per tahun. Masukkan hanya jumlah yang benar-benar Anda pinjam — kurangi uang muka dari harga pembelian terlebih dahulu.',
					'sub-mtgq4': 'Bagaimana skor kredit saya mempengaruhi suku bunga hipotek?',
					'sub-mtga4': 'Pemberi pinjaman menetapkan harga risiko melalui suku bunga yang mereka tawarkan: kenaikan skor kredit dari 650 ke 750 dapat menurunkan suku bunga Anda sebesar 0,5-1,5%. Pada hipotek $300K, penurunan suku bunga 1% menghemat sekitar $200/bulan dan lebih dari $60K dalam jangka 30 tahun. Periksa laporan kredit Anda 3-6 bulan sebelum mengajukan permohonan — cukup waktu untuk menyanggah kesalahan dan melunasi saldo.'
				}
			}),
			Object.keys(o).forEach(function (e) {
				if (s[e]) {
					var a = o[e];
					for (var n in a) s[e][n] = a[n];
				}
			}),
			(function () {
				var _ui = {
					en: {
						'afford-how-title': 'How much can I borrow?',
						'afford-how-text': 'Enter the monthly payment you can afford, the interest rate, and loan term — we calculate the maximum loan amount.',
						'scenario-title-a': 'Scenario A',
						'scenario-title-cur': 'Current',
						'btn-clear-a': 'Clear A',
						'btn-save-scenario': 'Save as Scenario A',
						'btn-saved': 'Saved!',
						'btn-copy-link': 'Copy link',
						'sc-per-mo': '/mo',
						'sc-interest-lbl': 'interest',
						'sc-payoff-lbl': 'payoff',
						'bi-sub-template': 'vs {monthly} · Save {saved} · Pay off {yrs} yrs sooner',
						'extra-savings-html': 'Pay off <strong>{yrs} yrs sooner</strong> &nbsp;&middot;&nbsp; Save <strong>{saved}</strong> in interest'
					},
					ar: {
						'afford-how-title': 'كم أستطيع الاقتراض؟',
						'afford-how-text': 'أدخل القسط الشهري الذي تستطيع تحمّله ومعدل الفائدة ومدة القرض — سنحسب الحد الأقصى لمبلغ القرض.',
						'scenario-title-a': 'السيناريو أ',
						'scenario-title-cur': 'الحالي',
						'btn-clear-a': 'مسح أ',
						'btn-save-scenario': 'حفظ كسيناريو أ',
						'btn-saved': 'تم الحفظ!',
						'btn-copy-link': 'نسخ الرابط',
						'sc-per-mo': '/شهر',
						'sc-interest-lbl': 'فائدة',
						'sc-payoff-lbl': 'سداد',
						'bi-sub-template': 'مقابل {monthly} · وفّر {saved} · سداد مبكر {yrs} سنة',
						'extra-savings-html': 'سداد مبكر <strong>{yrs} سنة</strong> &nbsp;&middot;&nbsp; وفّر <strong>{saved}</strong> من الفوائد'
					},
					fr: {
						'afford-how-title': 'Combien puis-je emprunter ?',
						'afford-how-text': "Entrez la mensualité que vous pouvez vous permettre, le taux d'intérêt et la durée — nous calculons le montant maximum empruntable.",
						'scenario-title-a': 'Scénario A',
						'scenario-title-cur': 'Actuel',
						'btn-clear-a': 'Effacer A',
						'btn-save-scenario': 'Enregistrer comme Scénario A',
						'btn-saved': 'Enregistré !',
						'btn-copy-link': 'Copier le lien',
						'sc-per-mo': '/mois',
						'sc-interest-lbl': 'intérêts',
						'sc-payoff-lbl': 'remboursé',
						'bi-sub-template': 'vs {monthly} · Économies {saved} · Soldé {yrs} ans plus tôt',
						'extra-savings-html': "Remboursez <strong>{yrs} ans plus tôt</strong> &nbsp;&middot;&nbsp; Économisez <strong>{saved}</strong> d'intérêts"
					},
					es: {
						'afford-how-title': '¿Cuánto puedo pedir prestado?',
						'afford-how-text': 'Introduce la cuota mensual que puedes pagar, el tipo de interés y el plazo — calculamos el importe máximo del préstamo.',
						'scenario-title-a': 'Escenario A',
						'scenario-title-cur': 'Actual',
						'btn-clear-a': 'Borrar A',
						'btn-save-scenario': 'Guardar como Escenario A',
						'btn-saved': '¡Guardado!',
						'btn-copy-link': 'Copiar enlace',
						'sc-per-mo': '/mes',
						'sc-interest-lbl': 'intereses',
						'sc-payoff-lbl': 'fin',
						'bi-sub-template': 'vs {monthly} · Ahorro {saved} · {yrs} años antes',
						'extra-savings-html': 'Pague <strong>{yrs} años antes</strong> &nbsp;&middot;&nbsp; Ahorre <strong>{saved}</strong> en intereses'
					},
					de: {
						'afford-how-title': 'Wie viel kann ich leihen?',
						'afford-how-text': 'Geben Sie die monatliche Rate, die Sie sich leisten können, den Zinssatz und die Laufzeit ein — wir berechnen den maximalen Kreditbetrag.',
						'scenario-title-a': 'Szenario A',
						'scenario-title-cur': 'Aktuell',
						'btn-clear-a': 'A löschen',
						'btn-save-scenario': 'Als Szenario A speichern',
						'btn-saved': 'Gespeichert!',
						'btn-copy-link': 'Link kopieren',
						'sc-per-mo': '/Mo.',
						'sc-interest-lbl': 'Zinsen',
						'sc-payoff-lbl': 'Abzahlung',
						'bi-sub-template': 'vs {monthly} · Sparen {saved} · {yrs} J. früher',
						'extra-savings-html': '<strong>{yrs} Jahre früher</strong> abbezahlt &nbsp;&middot;&nbsp; Sparen <strong>{saved}</strong> an Zinsen'
					},
					zh: {
						'afford-how-title': '我能借多少錢？',
						'afford-how-text': '输入您能负担的月供、利率和贷款期限——我们为您计算最大可贷款金额。',
						'scenario-title-a': '方案 A',
						'scenario-title-cur': '当前',
						'btn-clear-a': '清除 A',
						'btn-save-scenario': '保存为方案 A',
						'btn-saved': '已保存！',
						'btn-copy-link': '复制链接',
						'sc-per-mo': '/月',
						'sc-interest-lbl': '利息',
						'sc-payoff-lbl': '还清',
						'bi-sub-template': '对比 {monthly} · 节省 {saved} · 提前 {yrs} 年',
						'extra-savings-html': '提前 <strong>{yrs} 年还清</strong> &nbsp;&middot;&nbsp; 节省利息 <strong>{saved}</strong>'
					},
					hi: {
						'afford-how-title': 'मैं कितना उधार ले सकता हूँ?',
						'afford-how-text': 'वह मासिक किस्त दर्ज करें जो आप वहन कर सकते हैं, ब्याज दर और हण अवधि — हम अधिकतम हण राशि की गणना करेंगे।',
						'scenario-title-a': 'परिदृश्य A',
						'scenario-title-cur': 'वर्तमान',
						'btn-clear-a': 'A मिटाएं',
						'btn-save-scenario': 'परिदृश्य A के रूप में सहेजें',
						'btn-saved': 'सहेजा गया!',
						'btn-copy-link': 'लिंक कॉपी करें',
						'sc-per-mo': '/माह',
						'sc-interest-lbl': 'ब्याज',
						'sc-payoff-lbl': 'भुगतान',
						'bi-sub-template': 'बनाम {monthly} · बचाएं {saved} · {yrs} वर्ष पहले',
						'extra-savings-html': '<strong>{yrs} वर्ष पहले</strong> चुकाएं &nbsp;&middot;&nbsp; ब्याज में <strong>{saved}</strong> बचाएं'
					},
					pt: {
						'afford-how-title': 'Quanto posso pedir emprestado?',
						'afford-how-text': 'Insira a parcela mensal que você pode pagar, a taxa de juros e o prazo — calculamos o valor máximo do empréstimo.',
						'scenario-title-a': 'Cenário A',
						'scenario-title-cur': 'Atual',
						'btn-clear-a': 'Limpar A',
						'btn-save-scenario': 'Salvar como Cenário A',
						'btn-saved': 'Salvo!',
						'btn-copy-link': 'Copiar link',
						'sc-per-mo': '/mês',
						'sc-interest-lbl': 'juros',
						'sc-payoff-lbl': 'quitação',
						'bi-sub-template': 'vs {monthly} · Economize {saved} · Quite {yrs} anos antes',
						'extra-savings-html': 'Quite <strong>{yrs} anos antes</strong> &nbsp;&middot;&nbsp; Economize <strong>{saved}</strong> em juros'
					},
					tr: {
						'afford-how-title': 'Ne kadar borç alabilirim?',
						'afford-how-text': 'Ödeyebileceğiniz aylık taksidi, faiz oranını ve vadeyi girin — maksimum kredi tutarını hesaplıyoruz.',
						'scenario-title-a': 'Senaryo A',
						'scenario-title-cur': 'Mevcut',
						'btn-clear-a': "A'yı Temizle",
						'btn-save-scenario': 'Senaryo A olarak kaydet',
						'btn-saved': 'Kaydedildi!',
						'btn-copy-link': 'Bağlantıyı kopyala',
						'sc-per-mo': '/ay',
						'sc-interest-lbl': 'faiz',
						'sc-payoff-lbl': 'bitiş',
						'bi-sub-template': 'vs {monthly} · Tasarruf {saved} · {yrs} yıl erken',
						'extra-savings-html': '<strong>{yrs} yıl erken</strong> öde &nbsp;&middot;&nbsp; Faizden <strong>{saved}</strong> tasarruf'
					},
					id: {
						'afford-how-title': 'Berapa banyak yang bisa saya pinjam?',
						'afford-how-text': 'Masukkan cicilan bulanan yang mampu Anda bayar, suku bunga, dan jangka waktu — kami menghitung jumlah pinjaman maksimum.',
						'scenario-title-a': 'Skenario A',
						'scenario-title-cur': 'Saat ini',
						'btn-clear-a': 'Hapus A',
						'btn-save-scenario': 'Simpan sebagai Skenario A',
						'btn-saved': 'Tersimpan!',
						'btn-copy-link': 'Salin tautan',
						'sc-per-mo': '/bln',
						'sc-interest-lbl': 'bunga',
						'sc-payoff-lbl': 'lunas',
						'bi-sub-template': 'vs {monthly} · Hemat {saved} · Lunas {yrs} thn lebih cepat',
						'extra-savings-html': 'Lunas <strong>{yrs} thn lebih cepat</strong> &nbsp;&middot;&nbsp; Hemat bunga <strong>{saved}</strong>'
					}
				};
				Object.keys(_ui).forEach(function (e) {
					if (s[e]) {
						var a = _ui[e];
						for (var r in a) s[e][r] = a[r];
					}
				});
			})(),
			document.getElementById('settings-open-btn').addEventListener('click', d));
		var m = document.getElementById('lang-open-btn');
		(m && m.addEventListener('click', d),
			document.getElementById('settings-close-btn').addEventListener('click', function () {
				(c(), document.getElementById('settings-open-btn').focus());
			}),
			document.getElementById('settings-overlay').addEventListener('click', function () {
				(c(), document.getElementById('settings-open-btn').focus());
			}),
			document.getElementById('settings-save-btn').addEventListener('click', function () {
				var a = document.getElementById('pref-lang').value,
					n = document.getElementById('pref-currency').value;
				try {
					(!(function (a) {
						try {
							localStorage.setItem(e, JSON.stringify(a));
						} catch (e) {}
					})({
						lang: a,
						currency: n
					}),
						(window._prefCurrency = n),
						u(a),
						window.applyCurrency && window.applyCurrency(n),
						(document.getElementById('pref-cur-tag').textContent = n),
						(document.getElementById('pref-lang-tag').textContent = a.toUpperCase()));
					var r = document.getElementById('pref-lang-tag-btn');
					r && (r.textContent = a.toUpperCase());
				} catch (_) {}
				c();
				document.getElementById('settings-open-btn').focus();
				window.showToast && window.showToast((window._i18n_current && window._i18n_current['toast-saved']) || 'Preferences saved');
			}),
			document.getElementById('settings-cancel-btn').addEventListener('click', function () {
				(c(), document.getElementById('settings-open-btn').focus());
			}),
			document.addEventListener('keydown', function (e) {
				'Escape' === e.key && document.getElementById('settings-drawer').classList.contains('open') && (c(), document.getElementById('settings-open-btn').focus());
			}),
			document.getElementById('settings-drawer').addEventListener('keydown', function (e) {
				if (this.classList.contains('open') && 'Tab' === e.key) {
					var a = Array.from(this.querySelectorAll('button:not([disabled]),input:not([disabled]),select:not([disabled])')).filter(function (e) {
							return -1 !== e.tabIndex;
						}),
						n = a[0],
						r = a[a.length - 1];
					e.shiftKey ? document.activeElement === n && (e.preventDefault(), r.focus()) : document.activeElement === r && (e.preventDefault(), n.focus());
				}
			}));
		var p = l(),
			g = p.lang || (navigator.language && navigator.language.split('-')[0]) || 'en',
			h = p.currency && window.CURRENCY_CONFIG[p.currency] ? p.currency : detectLocaleCurrency() || 'USD';
		((window._prefCurrency = h), (window.APP_CURRENCY = h), u(g), window.applyCurrency && window.applyCurrency(h), (document.getElementById('pref-cur-tag').textContent = h), (document.getElementById('pref-lang-tag').textContent = g.toUpperCase()));
		var f = document.getElementById('pref-lang-tag-btn');
		f && (f.textContent = g.toUpperCase());
	})(),
	(function () {
		'use strict';

		function e() {
			return window.detectLocaleCurrency();
		}
		var a = null,
			prevA = null,
			n = '',
			r = 0,
			t = 'USD',
			i = e(),
			o = 'loancalc_fx',
			s = null,
			l = null,
			silver = null,
			u = {
				fx: 0,
				gold: 0,
				oil: 0,
				silver: 0,
				stocks: 0,
				cbe: 0
			},
			d = {
				fx: !1,
				gold: !1,
				oil: !1,
				silver: !1,
				stocks: !1,
				cbe: !1
			},
			c = [],
			m = 'localhost' === location.hostname || '127.0.0.1' === location.hostname ? location.origin : '';

		function p(e) {
			return (
				'$' +
				e.toLocaleString('en-US', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				})
			);
		}

		function g(e, a) {
			if (!e) return '—';
			return (
				e.toLocaleString('en-US', {
					minimumFractionDigits: 2,
					maximumFractionDigits: 2
				}) +
				' ' +
				a
			);
		}

		function h(e, a) {
			var n = window._i18n_current,
				r = window._i18n_en,
				t = (n && n[e]) || (r && r[e]) || e;
			return a ? t.replace('{date}', a) : t;
		}

		function f(e, a) {
			var n = document.getElementById(e);
			if (n) {
				var r = {
					live: 'var(--color-gain)',
					stale: 'var(--color-gold)',
					loading: 'var(--color-border)',
					error: 'var(--color-loss)'
				};
				((n.style.background = r[a] || r.loading), (n.dataset.status = a || 'loading'));
			}
		}

		function b(e) {
			var a = document.getElementById(e);
			if (a) {
				var n = a.querySelector('svg');
				n && ((n.style.animation = 'none'), n.offsetWidth, (n.style.animation = 'spin-refresh .65s cubic-bezier(0.4,0,0.2,1) 1'));
			}
		}

		function k(e) {
			if (!e) return null;
			var a = window._i18n_current || {},
				n = Math.round((Date.now() - e) / 6e4);
			if (n < 2) return a['age-just-now'] || 'just now';
			if (n < 60) return (a['age-min-ago'] || '{n} min ago').replace('{n}', n);
			var r = Math.floor(n / 60);
			return (a['age-hours-ago'] || '{n} hours ago').replace('{n}', r);
		}

		function v() {
			['cur-from', 'cur-to'].forEach(function (e) {
				var a = document.getElementById(e);
				if (a) {
					var n = a.value;
					((a.innerHTML = ''),
						window.ALL_CURRENCIES.forEach(function (e) {
							var n = document.createElement('option');
							((n.value = e.code), (n.textContent = e.code + ': ' + e.name), a.appendChild(n));
						}),
						(a.value = n || ('cur-from' === e ? t : i)));
				}
			});
		}

		function y() {
			if (a) {
				var e = Math.max(0, parseFloat(document.getElementById('cur-amount').value) || 0);
				((t = document.getElementById('cur-from').value), (i = document.getElementById('cur-to').value));
				var r = a[t] || null,
					o = a[i] || null;
				if (!r || !o) return ((document.getElementById('cur-result').textContent = h('cur-rate-unavailable')), void (document.getElementById('cur-rate-display').textContent = h('cur-not-in-feed')));
				var s = o / r,
					l = e * s,
					u = window.CURRENCY_CONFIG && window.CURRENCY_CONFIG[i],
					d = u ? u.locale : 'en-US';
				(function () {
					var trendEl = document.getElementById('cur-trend');
					if (!trendEl) return;
					if (prevA && prevA[t] && prevA[i]) {
						var prevRate = prevA[i] / prevA[t];
						var delta = ((s - prevRate) / prevRate) * 100;
						if (Math.abs(delta) >= 0.01) {
							trendEl.textContent = (delta >= 0 ? '+' : '') + delta.toFixed(2) + '%';
							trendEl.className = 'cur-trend ' + (delta >= 0 ? 'gain' : 'loss');
							trendEl.style.display = '';
							return;
						}
					}
					trendEl.style.display = 'none';
				})();
				document.getElementById('cur-result').textContent =
					l.toLocaleString(window._fmtLoc(d), {
						maximumFractionDigits: 4
					}) +
					' ' +
					i;
				var m = function (e) {
					return new Intl.NumberFormat('en-US', {
						minimumFractionDigits: 6,
						maximumFractionDigits: 6
					}).format(e);
				};
				((document.getElementById('cur-rate-display').textContent = '1 ' + t + ' = ' + m(s) + ' ' + i),
					(document.getElementById('cur-rate-inv').textContent = '1 ' + i + ' = ' + m(1 / s) + ' ' + t),
					(document.getElementById('cur-rate-date').textContent = n || h('cur-today')),
					(function (e, n, r) {
						var t = (a.USD || 1) / (a[e] || 1),
							i = t >= 3 ? [1, 10, 100] : t >= 0.5 ? [1, 100, 1e3] : t >= 0.05 ? [10, 100, 1e3] : t >= 0.005 ? [100, 1e3, 1e4] : t >= 5e-4 ? [1e3, 1e4, 1e5] : [1e4, 1e5, 1e6],
							d = document.getElementById('cur-quick-grid');
						if (!d) return;
						((d.innerHTML = ''),
							i.forEach(function (a) {
								var t = document.createElement('div');
								((t.style.cssText = 'background:var(--color-surface-raised);border:1px solid var(--color-border);border-radius:8px;padding:8px 12px'),
									(t.innerHTML =
										'<div style="font-size:11px;color:var(--text-sub)">' +
										a.toLocaleString('en-US') +
										' ' +
										e +
										'</div><div style="font-size:13px;font-weight:500;color:var(--text-high);white-space:nowrap">' +
										(a * r).toLocaleString('en-US', {
											maximumFractionDigits: 2
										}) +
										' ' +
										n +
										'</div>'),
									d.appendChild(t));
							}));
					})(t, i, s),
					w());
			}
		}

		function w() {
			if (a) {
				var n,
					r = i || e(),
					t = (a[r] || 1) / (a.USD || 1);
				if (((n = document.getElementById('gold-local-cur')) && (n.textContent = r), (n = document.getElementById('oil-local-cur')) && (n.textContent = r), (n = document.getElementById('silver-local-cur')) && (n.textContent = r), s)) {
					var o = s / 31.1035;
					((n = document.getElementById('gold-usd')) && (n.textContent = p(s) + ' /oz'), (n = document.getElementById('gold-gram')) && (n.textContent = p(o)), (n = document.getElementById('gold-10g')) && (n.textContent = p(10 * o)), (n = document.getElementById('gold-kg')) && (n.textContent = p(1e3 * o)), (n = document.getElementById('gold-local')) && (n.textContent = g(s * t, r) + ' /oz'));
				}
				if (silver) {
					var os = silver / 31.1035;
					((n = document.getElementById('silver-usd')) && (n.textContent = p(silver) + ' /oz'), (n = document.getElementById('silver-gram')) && (n.textContent = p(os)), (n = document.getElementById('silver-10g')) && (n.textContent = p(10 * os)), (n = document.getElementById('silver-kg')) && (n.textContent = p(1e3 * os)), (n = document.getElementById('silver-local')) && (n.textContent = g(silver * t, r) + ' /oz'));
				}
				(l && ((n = document.getElementById('oil-usd')) && (n.textContent = p(l) + ' /bbl'), (n = document.getElementById('oil-5')) && (n.textContent = p(5 * l)), (n = document.getElementById('oil-10')) && (n.textContent = p(10 * l)), (n = document.getElementById('oil-100')) && (n.textContent = p(100 * l)), (n = document.getElementById('oil-local')) && (n.textContent = g(l * t, r) + ' /bbl')), S(t, r));
			}
		}

		function z(e, t, i) {
			try {
				var _ex = localStorage.getItem(o);
				if (_ex) {
					var _exP = JSON.parse(_ex);
					if ((Date.now() - _exP.ts) / 36e5 >= 6) {
						prevA = _exP.rates;
						localStorage.setItem('loancalc_fx_prev', JSON.stringify({rates: _exP.rates, ts: _exP.ts}));
					}
				}
			} catch (_) {}
			((a = e), (n = t), (r = Object.keys(e).length), (u.fx = Date.now()), (d.fx = !1));
			try {
				localStorage.setItem(
					o,
					JSON.stringify({
						rates: e,
						date: t,
						count: r,
						ts: u.fx
					})
				);
			} catch (e) {}
			var s = k(u.fx),
				l = document.getElementById('cur-status-text');
			('live' === i ? (f('cur-dot', 'live'), l && (l.textContent = h('cur-updated-lbl') + ' ' + s + ' · ' + r + ' ' + h('lbl-currencies'))) : (f('cur-dot', 'stale'), l && (l.textContent = h('lbl-partial-rates') + ' · ' + r + ' ' + h('lbl-currencies') + ' · ECB data')), v(), y());
		}

		function A() {
			if (!d.fx) {
				((d.fx = !0), b('cur-refresh-btn'), f('cur-dot', 'loading'));
				var e = document.getElementById('cur-status-text');
				(e && (e.textContent = h('cur-status-fetching')),
					fetch('https://open.er-api.com/v6/latest/USD')
						.then(function (e) {
							return e.json();
						})
						.then(function (e) {
							if ('success' !== e.result) throw new Error('bad result');
							var a = e.rates;
							((a.USD = 1), z(a, e.time_last_update_utc ? e.time_last_update_utc.slice(0, 16) : new Date().toISOString().slice(0, 10), 'live'));
						})
						.catch(function () {
							fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json')
								.then(function (e) {
									return e.json();
								})
								.then(function (e) {
									if (!e.usd) throw new Error('bad format');
									var a = {};
									(Object.keys(e.usd).forEach(function (n) {
										a[n.toUpperCase()] = e.usd[n];
									}),
										(a.USD = 1),
										z(a, e.date || new Date().toISOString().slice(0, 10), 'live'));
								})
								.catch(function () {
									fetch('https://api.frankfurter.app/latest?base=USD')
										.then(function (e) {
											return e.json();
										})
										.then(function (e) {
											((e.rates.USD = 1), z(e.rates, e.date, 'partial'));
										})
										.catch(function () {
											((d.fx = !1),
												(a = {
													USD: 1,
													EUR: 0.92,
													GBP: 0.79,
													JPY: 149.5,
													CAD: 1.36,
													AUD: 1.53,
													EGP: 48.9,
													AED: 3.67,
													SAR: 3.75,
													CHF: 0.9,
													CNY: 7.24,
													INR: 83.5,
													TRY: 32.1,
													BRL: 4.97,
													MXN: 17.2,
													ZAR: 18.8,
													KWD: 0.31,
													QAR: 3.64
												}),
												(r = Object.keys(a).length),
												f('cur-dot', 'error'),
												e && (e.textContent = h('cur-status-offline')),
												v(),
												y());
										});
								});
						}));
			}
		}

		function x() {
			try {
				var e = localStorage.getItem('loancalc_stocks');
				if (e) return JSON.parse(e);
			} catch (e) {}
			return null;
		}

		function S(e, a) {
			c.length &&
				c.forEach(function (n) {
					var r = document.getElementById('stock-local-' + n.ticker);
					r && (r.textContent = g(n.price * e, a));
				});
		}

		function P(e) {
			var a = document.getElementById('stocks-ticker');
			a &&
				(a.innerHTML = e
					.map(function (e) {
						var a = e.change >= 0,
							n = a ? '+' : '',
							r = a ? 'stock-change--up' : 'stock-change--down',
							t = a ? '▲' : '▼';
						return '<div class="stock-chip" role="listitem"><div class="stock-sym">' + e.ticker + '</div><div class="stock-co">' + e.name + '</div><div class="stock-price">' + p(e.price) + '</div><span class="stock-change ' + r + '">' + t + ' ' + n + e.change.toFixed(2) + '%</span><div class="stock-local" id="stock-local-' + e.ticker + '">—</div></div>';
					})
					.join(''));
		}

		function q() {
			if (!d.stocks) {
				((d.stocks = !0), b('stocks-refresh-btn'), f('stocks-dot', 'loading'));
				var n = document.getElementById('stocks-status');
				(n && (n.textContent = h('lbl-updating')),
					fetch(m + '/api/stocks')
						.then(function (e) {
							if (!e.ok) throw new Error('HTTP ' + e.status);
							return e.json();
						})
						.then(function (r) {
							if (!Array.isArray(r.stocks) || !r.stocks.length) throw new Error('no data');
							c = r.stocks;
							var t = Date.now();
							if (
								((u.stocks = t),
								(d.stocks = !1),
								(function (e, a, n) {
									try {
										localStorage.setItem(
											'loancalc_stocks',
											JSON.stringify({
												data: e,
												ts: a,
												date: n
											})
										);
									} catch (e) {}
								})(c, t, r.date),
								f('stocks-dot', 'live'),
								n && (n.textContent = h('cur-updated-lbl') + ' ' + r.date),
								P(c),
								a)
							) {
								var o = i || e();
								S((a[o] || 1) / (a.USD || 1), o);
							}
						})
						.catch(function () {
							d.stocks = !1;
							var r = x();
							if (r && r.data) {
								if (((c = r.data), u.stocks || (u.stocks = r.ts), f('stocks-dot', 'stale'), n && (n.textContent = h('lbl-from') + ' ' + k(r.ts)), P(c), a)) {
									var t = i || e();
									S((a[t] || 1) / (a.USD || 1), t);
								}
							} else {
								f('stocks-dot', 'error');
								n && (n.textContent = h('lbl-price-unavailable'));
								setTimeout(q, 3e4);
							}
						}));
			}
		}

		function E(e) {
			try {
				var a = localStorage.getItem('loancalc_cmd_' + e);
				if (a) return JSON.parse(a);
			} catch (e) {}
			try {
				var n = localStorage.getItem('loancalc_cmd');
				if (n) {
					var r = JSON.parse(n);
					return {
						price: 'gold' === e ? r.gold : r.oil,
						ts: r.ts,
						date: r.date
					};
				}
			} catch (e) {}
			return null;
		}

		function C(e, a) {
			if (!d[a]) {
				((d[a] = !0), b(a + '-refresh-btn'), f(a + '-dot', 'loading'));
				var n = document.getElementById(a + '-status');
				(n && (n.textContent = h('lbl-updating')),
					fetch(m + '/api/commodity?ticker=' + encodeURIComponent(e))
						.then(function (e) {
							return e.json();
						})
						.then(function (e) {
							var r = e && e.price,
								t = e && e.date;
							if (!r || r <= 0) throw new Error('invalid price');
							var i = Date.now();
							('gold' === a ? (s = r) : 'silver' === a ? (silver = r) : (l = r),
								(u[a] = i),
								(d[a] = !1),
								(function (e, a, n, r) {
									try {
										localStorage.setItem(
											'loancalc_cmd_' + e,
											JSON.stringify({
												price: a,
												ts: n,
												date: r
											})
										);
									} catch (e) {}
								})(a, r, i, t),
								f(a + '-dot', 'live'),
								n && (n.textContent = h('cur-updated-lbl') + ' ' + t),
								w());
						})
						.catch(function (e) {
							(console.error(e), (d[a] = !1));
							var r = E(a);
							if (r && r.price) {
								('gold' !== a || s || (s = r.price), 'silver' !== a || silver || (silver = r.price), 'oil' !== a || l || (l = r.price), u[a] || (u[a] = r.ts), f(a + '-dot', 'stale'));
								var t = k(r.ts);
								(n && (n.textContent = h('lbl-from') + ' ' + t), w());
							} else (f(a + '-dot', 'error'), n && (n.textContent = h('lbl-price-unavailable')));
						}));
			}
		}
		((window.updateCommodityLocal = w),
			(window._setCurrencyPref = function (e) {
				i = e;
				var a = document.getElementById('cur-to');
				(a && (a.value = e), y(), w());
			}));
		var I = {
				// [en-country, en-mortgage-ctx, ar-country, ar-mortgage-ctx, en-loan-ctx, ar-loan-ctx]
				USD: ['US market', 'Avg 30yr fixed: 6.5–7%', null, null, 'Rates vary by lender and credit score', null],
				EGP: ['Egypt', 'Consumer mortgage: 18–25%', 'مصر', 'القروض العقارية: 18-25٪', 'Rates vary by lender and credit score', 'تختلف الأسعار حسب البنك والجدارة الائتمانية'],
				EUR: ['Eurozone', 'Avg mortgage: 3–4%', null, null, 'Rates vary by lender and credit score', null],
				GBP: ['UK', 'Avg 2yr fixed: 4.5–5%', null, null, 'Rates vary by lender and credit score', null],
				AED: ['UAE', 'EIBOR mortgage: 4.5–6%', 'الإمارات', 'قرض EIBOR: 4.5-6٪', 'Rates vary by lender and credit score', 'تختلف الأسعار حسب البنك والجدارة الائتمانية'],
				SAR: ['Saudi Arabia', 'SAIBOR mortgage: 5–6%', 'السعودية', 'قرض SAIBOR: 5-6٪', 'Rates vary by lender and credit score', 'تختلف الأسعار حسب البنك والجدارة الائتمانية'],
				KWD: ['Kuwait', 'Avg mortgage: 3.5–5%', 'الكويت', 'متوسط الرهن: 3.5-5٪', 'Rates vary by lender and credit score', 'تختلف الأسعار حسب البنك والجدارة الائتمانية'],
				QAR: ['Qatar', 'Housing loans: 4–5.5%', 'قطر', 'قروض السكن: 4-5.5٪', 'Rates vary by lender and credit score', 'تختلف الأسعار حسب البنك والجدارة الائتمانية'],
				CAD: ['Canada', '5yr fixed: 4–5%', null, null, 'Rates vary by lender and credit score', null],
				AUD: ['Australia', 'Variable: 5.5–6.5%', null, null, 'Rates vary by lender and credit score', null],
				CHF: ['Switzerland', 'SARON mortgage: 0.5–1.5%', null, null, 'Rates vary by lender and credit score', null],
				JPY: ['Japan', 'Avg fixed mortgage: 1.5–2%', null, null, 'Rates vary by lender and credit score', null],
				CNY: ['China', 'LPR mortgage: 3.5–4.2%', null, null, 'Rates vary by lender and credit score', null],
				INR: ['India', 'Home loan rate: 8.5–9%', null, null, 'Rates vary by lender and credit score', null],
				SGD: ['Singapore', 'SORA mortgage: 3.5–4.5%', null, null, 'Rates vary by lender and credit score', null],
				HKD: ['Hong Kong', 'HIBOR+1.5%. Effective: 4–5%', null, null, 'Rates vary by lender and credit score', null],
				MYR: ['Malaysia', 'Housing loan: 4–5%', null, null, 'Rates vary by lender and credit score', null],
				KRW: ['South Korea', 'Avg mortgage: 3.5–4.5%', null, null, 'Rates vary by lender and credit score', null],
				THB: ['Thailand', 'Avg bank mortgage: 6–7%', null, null, 'Rates vary by lender and credit score', null],
				IDR: ['Indonesia', 'KPR housing: 10–12%', null, null, 'Rates vary by lender and credit score', null],
				TRY: ['Turkey', 'Consumer mortgage: 30–45%', null, null, 'Rates vary by lender and credit score', null],
				BRL: ['Brazil', 'CEF mortgage: 10–12%', null, null, 'Rates vary by lender and credit score', null],
				ZAR: ['South Africa', 'Avg bond: 11–12%', null, null, 'Rates vary by lender and credit score', null],
				NGN: ['Nigeria', 'Consumer mortgage: 25–35%', null, null, 'Rates vary by lender and credit score', null],
				PKR: ['Pakistan', 'Housing: 14–18%', null, null, 'Rates vary by lender and credit score', null],
				MXN: ['Mexico', 'INFONAVIT: 10–12%', null, null, 'Rates vary by lender and credit score', null],
				PLN: ['Poland', 'WIBOR-linked: 7–8%', null, null, 'Rates vary by lender and credit score', null],
				SEK: ['Sweden', 'Avg variable: 2.5–3.5%', null, null, 'Rates vary by lender and credit score', null],
				NOK: ['Norway', 'Avg mortgage: 4.5–5.5%', null, null, 'Rates vary by lender and credit score', null],
				DKK: ['Denmark', 'Avg: 3–4.5%', null, null, 'Rates vary by lender and credit score', null],
				NZD: ['New Zealand', '1yr fixed: 5.5–6%', null, null, 'Rates vary by lender and credit score', null],
				MAD: ['Morocco', 'Avg mortgage: 5–6%', 'المغرب', 'متوسط الرهن: 5-6٪', 'Rates vary by lender and credit score', 'تختلف الأسعار حسب البنك والجدارة الائتمانية']
			},
			D = 'loancalc_rates_ctx',
			M = 432e5,
			R = null;
		window._seoCtx = I;

		function B() {
			try {
				var e = localStorage.getItem(D);
				if (e) return JSON.parse(e);
			} catch (e) {}
			return null;
		}

		function L(e, a, n, ctx) {
			var r = I[e];
			if (!r || null == a) return null;
			var t,
				i,
				o,
				s = 'ar' === window.APP_LANG && !!r[2],
				l = s ? r[2] : r[0],
				u = ctx != null ? ctx : s ? r[3] : r[1],
				d =
					((t = s),
					(i = new Date(n)),
					(o = {
						timeZone: 'UTC',
						day: 'numeric',
						month: 'short',
						year: 'numeric',
						hour: '2-digit',
						minute: '2-digit',
						hour12: !1
					}),
					t
						? i.toLocaleString(
								'ar-EG',
								Object.assign({}, o, {
									month: 'long'
								})
							) + ' بتوقيت غرينتش'
						: i.toLocaleString('en-GB', o) + ' GMT');
			return s ? l + '. معدل الإقراض المرجعي: ' + a + '٪. ' + u + '. كما في ' + d : l + '. Ref. rate: ' + a + '%. ' + u + '. As of ' + d;
		}

		function T(e) {
			if (R) {
				var a = window.APP_CURRENCY,
					n = R.rates && R.rates[a];
				if (null != n) {
					var loanType = e || window._currentTab,
						info = I[a],
						isAr = info && 'ar' === window.APP_LANG && !!info[2],
						ctx = loanType !== 'mortgage' ? (isAr ? info[5] : info[4]) || (isAr ? 'تختلف الأسعار حسب البنك والجدارة الائتمانية' : 'Rates vary by lender and credit score') : null,
						r = L(a, n, R.fetchedAt, ctx);
					if (r) {
						var t = document.getElementById('helper-text');
						t && (t.textContent = r);
						if ('mortgage' === loanType) {
							var titleEl = document.getElementById('helper-title');
							if (titleEl && info) {
								var isArTitle = 'ar' === window.APP_LANG && !!info[2];
								titleEl.textContent = (isArTitle ? info[2] : info[0]) + (isArTitle ? ' - سوق الرهن العقاري' : ' mortgage market');
							}
						}
					}
				}
			}
		}

		function j() {
			d.cbe ||
				(u.cbe && Date.now() - u.cbe < M
					? T()
					: ((d.cbe = !0),
						fetch(m + '/api/central-bank-rates')
							.then(function (e) {
								return e.json();
							})
							.then(function (e) {
								if (!e || !e.rates || !e.fetchedAt) throw new Error('invalid rates data');
								var a = {
									rates: e.rates,
									fetchedAt: e.fetchedAt,
									ts: Date.now()
								};
								((R = a),
									(function (e) {
										try {
											localStorage.setItem(D, JSON.stringify(e));
										} catch (e) {}
									})(a),
									(u.cbe = Date.now()),
									(d.cbe = !1),
									T());
							})
							.catch(function () {
								d.cbe = !1;
								var e = B();
								e && e.rates && ((R = e), T());
							})));
		}
		((window._postSwitchTabCBE = T),
			(window._fetchCBERateIfEGP = function () {
				var e = B();
				if (e && e.rates && e.fetchedAt && Date.now() - e.ts < M) return ((R = e), void T());
				j();
			}));
		var U = document.getElementById('cur-amount');
		U &&
			(U.addEventListener('input', y),
			U.addEventListener('blur', function () {
				var e = parseFloat(this.value),
					a = parseFloat(this.max) || 999999999;
				isNaN(e) || e < 0 ? ((this.value = 0), y()) : e > a && ((this.value = a), y());
			}));
		var F = document.getElementById('cur-from');
		F && F.addEventListener('change', y);
		var K = document.getElementById('cur-to');
		K &&
			K.addEventListener('change', function () {
				(y(), w());
			});
		var N = document.getElementById('cur-swap');
		N &&
			N.addEventListener('click', function () {
				var e = document.getElementById('cur-from').value;
				((document.getElementById('cur-from').value = document.getElementById('cur-to').value), (document.getElementById('cur-to').value = e), y());
			});
		var $ = document.getElementById('cur-retry-btn');
		$ &&
			$.addEventListener('click', function () {
				A();
			});
		var G = document.getElementById('cur-refresh-btn');
		G &&
			G.addEventListener('click', function () {
				A();
			});
		var Y = document.getElementById('gold-refresh-btn');
		Y &&
			Y.addEventListener('click', function () {
				C('GC=F', 'gold');
			});
		var H = document.getElementById('oil-refresh-btn');
		H &&
			H.addEventListener('click', function () {
				C('CL=F', 'oil');
			});
		var Hsi = document.getElementById('silver-refresh-btn');
		(Hsi &&
			Hsi.addEventListener('click', function () {
				C('SI=F', 'silver');
			}),
			setInterval(window._refreshLiveRatesStatus = function () {
				var e = Date.now(),
					n = window._i18n_current || {},
					t = n['cur-updated-lbl'] || 'Updated',
					i = n['lbl-rates-from'] || 'Rates from',
					o = n['lbl-from'] || 'From',
					d = n['lbl-currencies'] || 'currencies';
				if (u.fx && a) {
					var m = k(u.fx);
					(f('cur-dot', (p = e - u.fx > 216e5) ? 'stale' : 'live'), (g = document.getElementById('cur-status-text')) && (g.textContent = (p ? i + ' ' + m : t + ' ' + m) + ' · ' + r + ' ' + d));
				}
				if (u.gold && s) {
					m = k(u.gold);
					(f('gold-dot', (p = e - u.gold > 36e5) ? 'stale' : 'live'), (g = document.getElementById('gold-status')) && (g.textContent = p ? o + ' ' + m : t + ' ' + m));
				}
				if (u.oil && l) {
					m = k(u.oil);
					(f('oil-dot', (p = e - u.oil > 36e5) ? 'stale' : 'live'), (g = document.getElementById('oil-status')) && (g.textContent = p ? o + ' ' + m : t + ' ' + m));
				}
				if (u.silver && silver) {
					m = k(u.silver);
					(f('silver-dot', (p = e - u.silver > 36e5) ? 'stale' : 'live'), (g = document.getElementById('silver-status')) && (g.textContent = p ? o + ' ' + m : t + ' ' + m));
				}
				if (u.stocks && c.length) {
					var p, g;
					m = k(u.stocks);
					(f('stocks-dot', (p = e - u.stocks > 36e5) ? 'stale' : 'live'), (g = document.getElementById('stocks-status')) && (g.textContent = p ? o + ' ' + m : t + ' ' + m));
				}
			}, 6e4),
			setInterval(function () {
				(d.fx || A(), d.gold || C('GC=F', 'gold'), d.oil || C('CL=F', 'oil'), d.silver || C('SI=F', 'silver'), d.stocks || q(), j());
			}, 36e5),
			document.addEventListener('visibilitychange', function () {
				if (!document.hidden) {
					var e = Date.now();
					((!u.fx || e - u.fx > 216e5) && A(), (!u.gold || e - u.gold > 36e5) && C('GC=F', 'gold'), (!u.oil || e - u.oil > 36e5) && C('CL=F', 'oil'), (!u.silver || e - u.silver > 36e5) && C('SI=F', 'silver'), (!u.stocks || e - u.stocks > 36e5) && q(), (!u.cbe || e - u.cbe > M) && j());
				}
			}));
		var O,
			W = document.getElementById('stocks-refresh-btn');
		(W && W.addEventListener('click', q),
			(window._curFetchRates = A),
			(function () {
				try {
					var e = localStorage.getItem(o);
					if (e) {
						var t = JSON.parse(e),
							i = (Date.now() - t.ts) / 36e5;
						if (!m && i < 24) {
							((a = t.rates), (n = t.date), (r = t.count || Object.keys(t.rates).length), (u.fx = t.ts));
							var s = i >= 6;
							f('cur-dot', s ? 'stale' : 'live');
							var l = k(t.ts),
								d = document.getElementById('cur-status-text');
							try {
								var _pv2 = localStorage.getItem('loancalc_fx_prev');
								if (_pv2) prevA = JSON.parse(_pv2).rates;
							} catch (_) {}
							if (!prevA) {
								fetch('/api/fx-prev')
									.then(function (r) {
										return r.json();
									})
									.then(function (d) {
										if (d.prev) {
											prevA = d.prev;
											y();
										}
									})
									.catch(function () {});
							}
							return (d && (d.textContent = (s ? h('lbl-rates-from') + ' ' + l : h('cur-updated-lbl') + ' ' + l) + ' · ' + r + ' ' + h('lbl-currencies')), v(), y(), void (s && A()));
						}
					}
				} catch (e) {}
				try {
					var _pv = localStorage.getItem('loancalc_fx_prev');
					if (_pv) prevA = JSON.parse(_pv).rates;
				} catch (_) {}
				if (!prevA) {
					fetch('/api/fx-prev')
						.then(function (r) {
							return r.json();
						})
						.then(function (d) {
							if (d.prev) {
								prevA = d.prev;
								y();
							}
						})
						.catch(function () {});
				}
				A();
			})(),
			(O = Date.now()),
			['gold', 'oil', 'silver'].forEach(function (e) {
				var a = E(e);
				if (a && a.price && O - a.ts < 144e5) {
					('gold' === e ? (s = a.price) : 'silver' === e ? (silver = a.price) : (l = a.price), (u[e] = a.ts));
					var n = O - a.ts > 36e5;
					f(e + '-dot', n ? 'stale' : 'live');
					var r = k(a.ts),
						t = document.getElementById(e + '-status');
					(t && (t.textContent = n ? h('lbl-from') + ' ' + r : h('cur-updated-lbl') + ' ' + r), w());
				}
				(!!m || !a || !a.price || O - a.ts > 36e5) && C('gold' === e ? 'GC=F' : 'silver' === e ? 'SI=F' : 'CL=F', e);
			}),
			(function () {
				var n = Date.now(),
					r = x();
				if (r && r.data && n - r.ts < 144e5) {
					((c = r.data), (u.stocks = r.ts));
					var t = n - r.ts > 36e5;
					f('stocks-dot', t ? 'stale' : 'live');
					var o = document.getElementById('stocks-status');
					if ((o && (o.textContent = t ? h('lbl-from') + ' ' + k(r.ts) : h('cur-updated-lbl') + ' ' + (r.date || '')), P(c), a)) {
						var s = i || e();
						S((a[s] || 1) / (a.USD || 1), s);
					}
				}
				(!!m || !r || !r.data || n - r.ts > 36e5) && q();
			})(),
			window._fetchCBERateIfEGP());
	})(),
	(window.switchPanel = switchPanel),
	document.querySelectorAll('.tool-panel.active .calc-card, .tool-panel.active .chart-wrap, .tool-panel.active .table-wrap').forEach(function (e) {
		e.dataset.animated = '1';
	}));
var _panelNavMap = {
	'panel-loans': {
		url: '/loan-calculator/',
		title: 'Free Loan Calculator – Mortgage, Car, Personal & Student Loans | LoanCalc'
	},
	'panel-savings': {
		url: '/savings-calculator/',
		title: 'Free Compound Interest & Savings Calculator | LoanCalc'
	},
	'panel-refinance': {
		url: '/refinance-calculator/',
		title: 'Free Refinance Savings Calculator – Break-Even & Monthly Savings | LoanCalc'
	},
	'panel-currency': {
		url: '/live-rates/',
		title: 'Free Live Rates – Currency Converter, Gold, Oil & Stock Prices | LoanCalc'
	},
	'panel-faq': {
		url: '/faq/',
		title: 'Frequently Asked Questions | LoanCalc'
	}
};
document.querySelectorAll('#tool-nav .tab-btn').forEach(function (e) {
	e.addEventListener('click', function (e) {
		var a = this.dataset.panel;
		if (a) {
			('A' === this.tagName && e.preventDefault(), switchPanel(a));
			var n = _panelNavMap[a];
			n &&
				(history.pushState(
					{
						panel: a
					},
					n.title,
					n.url
				),
				(document.title = n.title));
		}
	});
});
var _headerFaqLink = document.querySelector('.header-faq-link');
(_headerFaqLink &&
	_headerFaqLink.addEventListener('click', function (e) {
		(e.preventDefault(), switchPanel('panel-faq'));
		var a = _panelNavMap['panel-faq'];
		a &&
			(history.pushState(
				{
					panel: 'panel-faq'
				},
				a.title,
				a.url
			),
			(document.title = a.title));
	}),
	document.querySelectorAll('.footer-links a[data-panel]').forEach(function (e) {
		e.addEventListener('click', function (e) {
			(e.preventDefault(), switchPanel(this.dataset.panel));
		});
	}),
	(function () {
		var e = {
			'/loan-calculator': {
				panel: 'panel-loans',
				loanTab: 'mortgage'
			},
			'/savings-calculator': {
				panel: 'panel-savings',
				loanTab: null
			},
			'/refinance-calculator': {
				panel: 'panel-refinance',
				loanTab: null
			},
			'/live-rates': {
				panel: 'panel-currency',
				loanTab: null
			},
			'/faq': {
				panel: 'panel-faq',
				loanTab: null
			}
		}[window.location.pathname.replace(/\/$/, '')];
		e && (switchPanel(e.panel), e.loanTab && window.switchTab && window.switchTab(e.loanTab));
		var a = (e && e.panel) || (document.querySelector('.tool-panel.active') || {}).id || 'panel-loans',
			n = _panelNavMap[a];
		n &&
			history.replaceState(
				{
					panel: a
				},
				n.title,
				window.location.href
			);
	})());
var hashMap = {
		loans: 'panel-loans',
		savings: 'panel-savings',
		refinance: 'panel-refinance',
		currency: 'panel-currency',
		calculator: 'panel-loans',
		compound: 'panel-savings',
		faq: 'panel-faq'
	},
	initHash = location.hash.replace('#', ''),
	_initHashPanel = hashMap[initHash];
(_initHashPanel && document.getElementById(_initHashPanel) && switchPanel(_initHashPanel),
	window.addEventListener('popstate', function (e) {
		var a = e.state && e.state.panel;
		if (!a) {
			a =
				{
					'/loan-calculator': 'panel-loans',
					'/savings-calculator': 'panel-savings',
					'/refinance-calculator': 'panel-refinance',
					'/live-rates': 'panel-currency',
					'/faq': 'panel-faq'
				}[window.location.pathname.replace(/\/$/, '')] || 'panel-loans';
		}
		switchPanel(a);
		var n = _panelNavMap[a];
		n && (document.title = n.title);
	}),
	setTimeout(function () {
		var e = document.getElementById('cur-dot');
		if (e && 'loading' === e.dataset.status) {
			var a = document.getElementById('cur-status-text');
			(a && (a.textContent = 'Taking longer than usual…'), (e.style.background = 'var(--color-gold)'), (e.dataset.status = 'slow'));
		}
		['gold', 'oil'].forEach(function (e) {
			var a = document.getElementById(e + '-dot');
			if (a && 'loading' === a.dataset.status) {
				var n = document.getElementById(e + '-status');
				(n && (n.textContent = 'Taking longer than usual…'), (a.style.background = 'var(--color-gold)'), (a.dataset.status = 'slow'));
			}
		});
	}, 5e3),
	setTimeout(function () {
		var e = document.getElementById('cur-dot');
		if (e && ('loading' === e.dataset.status || 'slow' === e.dataset.status)) {
			var a = document.getElementById('cur-status-text');
			(a && (a.textContent = 'Rates unavailable'), (e.style.background = 'var(--color-loss)'), (e.dataset.status = 'error'));
			var n = document.getElementById('cur-retry-btn');
			n && (n.style.display = 'inline-block');
		}
		['gold', 'oil'].forEach(function (e) {
			var a = document.getElementById(e + '-dot');
			if (a && ('loading' === a.dataset.status || 'slow' === a.dataset.status)) {
				var n = document.getElementById(e + '-status');
				(n && (n.textContent = 'Unavailable'), (a.style.background = 'var(--color-loss)'), (a.dataset.status = 'error'));
			}
		});
	}, 8e3),
	(function () {
		var e = 'loancalc_calc_state';

		function a() {
			var a = document.getElementById('s-amount'),
				n = document.getElementById('s-rate'),
				r = document.getElementById('s-term');
			if (a && n && r)
				try {
					localStorage.setItem(
						e,
						JSON.stringify({
							tab: window._currentTab || 'mortgage',
							amount: a.value,
							rate: n.value,
							term: r.value,
							ts: Date.now()
						})
					);
				} catch (e) {}
		}
		(['s-amount', 's-rate', 's-term'].forEach(function (e) {
			var n = document.getElementById(e);
			n && n.addEventListener('input', a);
		}),
			(function () {
				try {
					var a = localStorage.getItem(e);
					if (!a) return;
					var n = JSON.parse(a);
					if (Date.now() - n.ts > 864e5) return;
					n.tab && 'mortgage' !== n.tab && window.switchTab && window.switchTab(n.tab);
					var r = document.getElementById('s-amount'),
						t = document.getElementById('s-rate'),
						i = document.getElementById('s-term');

					function o(e, a) {
						return e && a && parseFloat(a) >= parseFloat(e.min) && parseFloat(a) <= parseFloat(e.max);
					}
					(o(r, n.amount) && (r.value = n.amount),
						o(t, n.rate) && (t.value = n.rate),
						o(i, n.term) && (i.value = n.term),
						window.updateSliderFillGlobal &&
							[r, t, i].forEach(function (e) {
								e && window.updateSliderFillGlobal(e);
							}),
						r && r.dispatchEvent(new Event('input')));
				} catch (s) {}
			})());
	})(),
	(function () {
		var e = null;
		window.showToast = function (a) {
			var n = document.getElementById('pref-toast');
			n &&
				((n.textContent = a),
				n.classList.add('show'),
				clearTimeout(e),
				(e = setTimeout(function () {
					n.classList.remove('show');
				}, 2200)));
		};
	})(),
	[
		{
			num: 'i-amount',
			note: 'clamp-amount',
			fmt: function (e) {
				return window.getCurrencySym ? window.getCurrencySym() + e.toLocaleString() : e.toLocaleString();
			}
		},
		{
			num: 'i-rate',
			note: 'clamp-rate',
			fmt: function (e) {
				return e + '%';
			}
		},
		{
			num: 'i-term',
			note: 'clamp-term',
			fmt: function (e) {
				return e + ' yr' + (1 === e ? '' : 's');
			}
		}
	].forEach(function (e) {
		var a = document.getElementById(e.num),
			n = document.getElementById(e.note);
		if (a && n) {
			var r = n.closest ? n.closest('.input-group') : n.parentNode,
				t = r ? r.querySelector('.ig-val') : null;
			(a.addEventListener('change', function () {
				var a = parseFloat(this.value),
					r = parseFloat(this.min),
					i = parseFloat(this.max);
				isNaN(a) || (a < r ? ((n.textContent = ((window._i18n_current && window._i18n_current['clamp-min']) || 'Minimum:') + ' ' + e.fmt(r)), n.classList.add('visible'), t && t.classList.add('ig-val--clamped')) : a > i ? ((n.textContent = ((window._i18n_current && window._i18n_current['clamp-max']) || 'Maximum:') + ' ' + e.fmt(i)), n.classList.add('visible'), t && t.classList.add('ig-val--clamped')) : ((n.textContent = ''), n.classList.remove('visible'), t && t.classList.remove('ig-val--clamped')));
			}),
				a.addEventListener('input', function () {
					((n.textContent = ''), n.classList.remove('visible'), t && t.classList.remove('ig-val--clamped'));
				}));
		}
	}),
	(function () {
		function e() {
			var e = document.getElementById('s-amount'),
				a = document.getElementById('s-rate'),
				n = document.getElementById('s-term');
			if (e && a && n) {
				var r = 'tab=' + (window._currentTab || 'mortgage') + '&a=' + e.value + '&r=' + a.value + '&t=' + n.value;
				try {
					history.replaceState(null, '', '#' + r);
				} catch (e) {}
			}
		}
		['s-amount', 's-rate', 's-term'].forEach(function (a) {
			var n = document.getElementById(a);
			n && n.addEventListener('input', e);
		});
		var a = window.switchTab;

		function n(e) {
			var a = window.location.href;

			function n() {
				((e.textContent = 'Copied!'),
					e.classList.add('copied'),
					setTimeout(function () {
						((e.innerHTML = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 9.5a3.536 3.536 0 0 0 5 0l2-2a3.536 3.536 0 0 0-5-5l-1 1"/><path d="M9.5 6.5a3.536 3.536 0 0 0-5 0l-2 2a3.536 3.536 0 0 0 5 5l1-1"/></svg><span data-i18n="btn-copy-link"> ' + ((window._i18n_current && window._i18n_current['btn-copy-link']) || 'Copy link') + '</span>'), e.classList.remove('copied'));
					}, 1800));
			}
			if (navigator.clipboard && navigator.clipboard.writeText)
				navigator.clipboard
					.writeText(a)
					.then(n)
					.catch(function () {});
			else {
				var r = document.createElement('textarea');
				((r.value = a), (r.style.cssText = 'position:fixed;opacity:0;top:0;left:0;width:1px;height:1px'), document.body.appendChild(r), r.select());
				try {
					(document.execCommand('copy'), n());
				} catch (e) {}
				document.body.removeChild(r);
			}
		}
		(a &&
			(window.switchTab = function (n) {
				var r = window._currentTab;
				(a(n), n !== r && e());
			}),
			(function () {
				var e = window.location.hash.slice(1);
				if (!e || -1 === e.indexOf('tab=')) return !1;
				var a = {};

				function n(e, a) {
					var n = document.getElementById(e);
					if (n && a) {
						var r = parseFloat(a);
						if (!isNaN(r) && r >= parseFloat(n.min) && r <= parseFloat(n.max)) {
							n.value = r;
							var t = e.replace('s-', 'i-'),
								i = document.getElementById(t);
							(i && (i.value = r), window.updateSliderFillGlobal && window.updateSliderFillGlobal(n));
						}
					}
				}
				(e.split('&').forEach(function (e) {
					var n = e.split('=');
					2 === n.length && (a[n[0]] = decodeURIComponent(n[1]));
				}),
					a.tab && 'mortgage' !== a.tab && -1 !== ['mortgage', 'car', 'personal', 'student'].indexOf(a.tab) && window.switchTab && window.switchTab(a.tab),
					n('s-amount', a.a),
					n('s-rate', a.r),
					n('s-term', a.t));
				var r = document.getElementById('s-amount');
				r && r.dispatchEvent(new Event('input'));
			})());
		var r = document.getElementById('copy-link-btn');
		r &&
			r.addEventListener('click', function () {
				n(this);
			});
		var t = document.getElementById('copy-link-btn-ci');
		t &&
			t.addEventListener('click', function () {
				n(this);
			});
	})(),
	(function () {
		'use strict';
		var e = document.querySelectorAll('.live-seg .tab-btn[data-live]');
		e.length &&
			e.forEach(function (a) {
				a.addEventListener('click', function () {
					var a = this.dataset.live;
					(localStorage.setItem('loancalc_live_tab', a),
						e.forEach(function (e) {
							var n = e.dataset.live === a;
							(e.classList.toggle('active', n), e.setAttribute('aria-selected', n));
						}),
						document.querySelectorAll('.live-panel').forEach(function (e) {
							e.classList.toggle('active', e.id === 'live-panel-' + a);
						}));
				});
			});
	})(),
	(function () {
		function e(e, a) {
			var n = document.getElementById(e),
				r = document.getElementById(a);
			if (n && r) {
				var t = null;
				n.addEventListener('input', function () {
					!(function (e) {
						if (t && t.length) {
							var a = r.value,
								n = e
									? t.filter(function (a) {
											return -1 !== a.code.toLowerCase().indexOf(e) || -1 !== a.name.toLowerCase().indexOf(e);
										})
									: t;
							((r.innerHTML = ''),
								n.forEach(function (e) {
									var n = document.createElement('option');
									((n.value = e.code), (n.textContent = e.name), e.code === a && (n.selected = !0), r.appendChild(n));
								}));
						}
					})(this.value.trim().toLowerCase());
				});
				var i = new MutationObserver(function () {
					r.options.length > 1 &&
						(i.disconnect(),
						(t = Array.from(r.options).map(function (e) {
							return {
								c: e.value,
								n: e.textContent
							};
						})));
				});
				i.observe(r, {
					childList: !0
				});
			}
		}
		(e('cur-from-search', 'cur-from'), e('cur-to-search', 'cur-to'));
		var a = document.getElementById('pref-currency-search');
		a &&
			a.addEventListener('input', function () {
				var e = 'function' == typeof loadPrefs ? loadPrefs() : {};
				populatePrefCurrencySelect(e.currency || window._prefCurrency || 'USD', this.value.trim());
			});
	})(),
	(function () {
		function e() {
			var e = document.getElementById('rf-s-balance'),
				a = document.getElementById('rf-s-oldrate'),
				n = document.getElementById('rf-s-remaining'),
				r = document.getElementById('rf-s-newrate'),
				t = document.getElementById('rf-s-costs');
			if (e)
				try {
					history.replaceState(null, '', '#rf&b=' + e.value + '&or=' + a.value + '&y=' + n.value + '&nr=' + r.value + '&c=' + t.value);
				} catch (e) {}
		}
		-1 !== window.location.pathname.indexOf('/refinance-calculator') &&
			(['rf-s-balance', 'rf-s-oldrate', 'rf-s-remaining', 'rf-s-newrate', 'rf-s-costs'].forEach(function (a) {
				var n = document.getElementById(a);
				n && n.addEventListener('input', e);
			}),
			(function () {
				var e = window.location.hash.slice(1);
				if (e && 0 === e.indexOf('rf&')) {
					var a = {};
					(e
						.slice(3)
						.split('&')
						.forEach(function (e) {
							var n = e.split('=');
							2 === n.length && (a[n[0]] = decodeURIComponent(n[1]));
						}),
						r('rf-s-balance', a.b),
						r('rf-s-oldrate', a.or),
						r('rf-s-remaining', a.y),
						r('rf-s-newrate', a.nr),
						r('rf-s-costs', a.c));
					var n = document.getElementById('rf-s-balance');
					n && n.dispatchEvent(new Event('input'));
				}

				function r(e, a) {
					var n = document.getElementById(e);
					if (n && a) {
						var r = parseFloat(a);
						if (!(isNaN(r) || r < parseFloat(n.min) || r > parseFloat(n.max))) {
							n.value = r;
							var t = document.getElementById(e.replace('-s-', '-i-'));
							(t && (t.value = r), window.updateSliderFillGlobal && window.updateSliderFillGlobal(n));
						}
					}
				}
			})());
	})(),
	(function () {
		function e() {
			var e = document.getElementById('ci-s-principal'),
				a = document.getElementById('ci-s-monthly'),
				n = document.getElementById('ci-s-rate'),
				r = document.getElementById('ci-s-years');
			if (e)
				try {
					history.replaceState(null, '', '#ci&p=' + e.value + '&m=' + a.value + '&r=' + n.value + '&y=' + r.value);
				} catch (e) {}
		}
		-1 !== window.location.pathname.indexOf('/savings-calculator') &&
			(['ci-s-principal', 'ci-s-monthly', 'ci-s-rate', 'ci-s-years'].forEach(function (a) {
				var n = document.getElementById(a);
				n && n.addEventListener('input', e);
			}),
			(function () {
				var e = window.location.hash.slice(1);
				if (e && 0 === e.indexOf('ci&')) {
					var a = {};
					(e
						.slice(3)
						.split('&')
						.forEach(function (e) {
							var n = e.split('=');
							2 === n.length && (a[n[0]] = decodeURIComponent(n[1]));
						}),
						r('ci-s-principal', a.p),
						r('ci-s-monthly', a.m),
						r('ci-s-rate', a.r),
						r('ci-s-years', a.y));
					var n = document.getElementById('ci-s-principal');
					n && n.dispatchEvent(new Event('input'));
				}

				function r(e, a) {
					var n = document.getElementById(e);
					if (n && a) {
						var r = parseFloat(a);
						if (!(isNaN(r) || r < parseFloat(n.min) || r > parseFloat(n.max))) {
							n.value = r;
							var t = document.getElementById(e.replace('-s-', '-i-'));
							(t && (t.value = r), window.updateSliderFillGlobal && window.updateSliderFillGlobal(n));
						}
					}
				}
			})());
	})());


/* ── Consent Popup ──────────────────────────────────────────── */
(function () {
	var KEY = 'loancalc_consent';
	var LOGO =
		'<svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="9" fill="#1a2e1a"/><line x1="10" y1="8" x2="10" y2="27" stroke="#d4a040" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="27" x2="28" y2="27" stroke="#d4a040" stroke-width="2.5" stroke-linecap="round"/><path d="M10 22 L15 22 L15 27" stroke="#d4a040" stroke-opacity="0.4" stroke-width="1.2" fill="none"/><line x1="10" y1="12" x2="13" y2="12" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="10" y1="17" x2="13" y2="17" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="15" y1="27" x2="15" y2="25" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="19" y1="27" x2="19" y2="25" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="23" y1="27" x2="23" y2="25" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/></svg>';

	function applyConsent(analytics, ads) {
		if (typeof gtag !== 'function') return;
		gtag('consent', 'update', {
			analytics_storage: analytics ? 'granted' : 'denied',
			ad_storage: ads ? 'granted' : 'denied',
			ad_user_data: ads ? 'granted' : 'denied',
			ad_personalization: ads ? 'granted' : 'denied'
		});
	}

	function persist(analytics, ads) {
		try {
			localStorage.setItem(KEY, JSON.stringify({a: analytics, d: ads}));
		} catch (_) {}
		applyConsent(analytics, ads);
		closePopup();
	}

	function openPopup() {
		var ov = document.getElementById('consent-overlay');
		if (!ov) return;
		try {
			var s = JSON.parse(localStorage.getItem(KEY));
			if (s) {
				var pa = document.getElementById('cb-pref-a');
				var pd = document.getElementById('cb-pref-d');
				if (pa) pa.checked = !!s.a;
				if (pd) pd.checked = !!s.d;
			}
		} catch (_) {}
		ov.classList.add('open');
	}

	function closePopup() {
		var ov = document.getElementById('consent-overlay');
		if (ov) ov.classList.remove('open');
	}

	function buildPopup() {
		var ov = document.getElementById('consent-overlay');
		if (!ov) return;
		try {
			var stored = JSON.parse(localStorage.getItem(KEY));
			if (stored && typeof stored.a === 'boolean') {
				applyConsent(stored.a, stored.d);
				var pa = document.getElementById('cb-pref-a');
				var pd = document.getElementById('cb-pref-d');
				if (pa) pa.checked = !!stored.a;
				if (pd) pd.checked = !!stored.d;
			}
		} catch (_) {}

		document.getElementById('cb-accept').onclick = function () {
			persist(true, true);
		};
		document.getElementById('cb-reject').onclick = function () {
			persist(false, false);
		};
		document.getElementById('cb-save').onclick = function () {
			persist(document.getElementById('cb-pref-a').checked, document.getElementById('cb-pref-d').checked);
		};

		ov.addEventListener('click', function (e) {
			if (e.target !== ov) return;
			try {
				var s = JSON.parse(localStorage.getItem(KEY));
				if (s && typeof s.a === 'boolean') closePopup();
			} catch (_) {}
		});

		var trigger = document.getElementById('consent-trigger');
		if (trigger) trigger.onclick = openPopup;
	}

	function build() {
		if (typeof window.__tcfapi !== 'function') {
			buildPopup();
			return;
		}

		var settled = false;

		window.__tcfapi('addEventListener', 2, function (tcData, success) {
			if (settled) return;
			if (!success) return;
			if (typeof tcData.gdprApplies === 'boolean') {
				settled = true;
				window.__tcfapi('removeEventListener', 2, function () {}, tcData.listenerId);
				if (tcData.gdprApplies === true) {
					closePopup();
					return;
				}
				buildPopup();
			}
		});

		// Fallback: if TCF never fires within 3s, show popup anyway
		setTimeout(function () {
			if (!settled) {
				settled = true;
				buildPopup();
			}
		}, 3000);
	}

	setTimeout(build, 500);
})();
