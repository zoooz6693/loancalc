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
			var r = '', t = a || e.length, baseYear = new Date().getFullYear(), s = 0;
			for (; s < Math.min(t, e.length); s++) {
				var l = e[s], u = l.end < 1 ? ' class="green"' : '';
				var label;
				if (isMonthly) {
					var yr = baseYear + Math.floor((l.month - 1) / 12);
					var mo = (l.month - 1) % 12;
					label = new Date(yr, mo).toLocaleDateString(window._i18n_locale || 'en-US', { month: 'short', year: 'numeric' });
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
				var showAllTxt = isMonthly
					? ((window._i18n_current && window._i18n_current['btn-show-all-months']) || 'Show all months')
					: (d.dataset.showAll || 'Show all years');
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
					z.textContent = 'over ' + y + ' ' + A + ' total';
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
						var effMo = w.monthly * 13 / 12;
						var rmo = v / 100 / 12;
						var bibal = g, totalI = 0, biMonths = 0, maxM = y * 24;
						while (bibal > 0.01 && biMonths < maxM) {
							var oint = bibal * rmo, ppart = effMo - oint;
							if (ppart <= 0) break;
							totalI += oint; bibal -= ppart; biMonths++;
						}
						var savedI = w.interest - totalI;
						var savedYrs = Math.round((y * 12 - biMonths) / 12 * 10) / 10;
						var biLbl = (window._i18n_current && window._i18n_current['freq-biweekly']) || 'Biweekly payment';
						var perWk = (window._i18n_current && window._i18n_current['freq-per-2wk']) || '/ 2 wks';
						if (lbl) lbl.textContent = biLbl;
						if (amtEl) { amtEl.textContent = p(pBi) + ' ' + perWk; window.fitText && window.fitText(amtEl); }
						if (subEl) {
							var _biTpl = (window._i18n_current && window._i18n_current['bi-sub-template']) || 'vs {monthly} · Save {saved} · Pay off {yrs} yrs sooner';
							var _perMoBI = (window._i18n_current && window._i18n_current['unit-mo']) || '/mo';
							subEl.textContent = _biTpl.replace('{monthly}', p(w.monthly) + _perMoBI).replace('{saved}', p(savedI)).replace('{yrs}', savedYrs);
						}
					}
				})();
				(function () {
					var extraEl = document.getElementById('extra-savings');
					if (!extraEl) return;
					if (r !== 'mortgage' || !sExtra) { extraEl.style.display = 'none'; return; }
					var extraAmt = parseFloat(sExtra.value) || 0;
					if (iExtra) iExtra.value = extraAmt;
					b(sExtra);
					if (extraAmt <= 0) { extraEl.style.display = 'none'; return; }
					var rmo2 = v / 100 / 12, pMo2 = w.monthly, accel = pMo2 + extraAmt;
					var bal3 = g, totalI2 = 0, accelMonths = 0, maxM2 = y * 24;
					while (bal3 > 0.01 && accelMonths < maxM2) {
						var int3 = bal3 * rmo2, prin3 = accel - int3;
						if (prin3 <= 0) break;
						totalI2 += int3; bal3 -= prin3; accelMonths++;
					}
					var savedI2 = Math.max(0, w.interest - totalI2);
					var savedMos = y * 12 - accelMonths;
					var savedYrs2 = savedMos > 0 ? Math.round(savedMos / 12 * 10) / 10 : 0;
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
						if (window.Chart) {
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
						}
					})(g, w.interest),
					(o = (function (e, a, n) {
						for (var r = a / 100 / 12, t = 12 * n, mp = h(e, a, n).monthly, bal = e, s = [], l = 1; l <= n; l++) {
							for (var u = 0, d = 0, c = bal, months = Math.min(12, t - 12 * (l - 1)), p2 = 0; p2 < months; p2++) {
								var gi = bal * r, fi = mp - gi;
								((d += gi), (u += fi), (bal -= fi) < 0.005 && (bal = 0));
							}
							s.push({ year: l, start: c, paidP: u, paidI: d, end: Math.max(0, bal) });
						}
						return s;
					})(g, v, y)),
					(oMonthly = (function (e, a, n) {
						for (var r = a / 100 / 12, t = 12 * n, mp2 = h(e, a, n).monthly, bal2 = e, s2 = [], mo = 1; mo <= t; mo++) {
							var gi2 = bal2 * r, fi2 = mp2 - gi2, st2 = bal2;
							(bal2 -= fi2) < 0.005 && (bal2 = 0);
							s2.push({ month: mo, start: st2, paidP: fi2, paidI: gi2, end: Math.max(0, bal2) });
						}
						return s2;
					})(g, v, y)),
					f(amortGran === 'monthly' ? oMonthly : o, i ? null : (amortGran === 'monthly' ? 24 : 5)));
			updateScenarioCard(w.monthly, w.interest, new Date().getFullYear() + y);
			} catch (e) {
				(console.error('Loan calc error:', e), k());
			}
			var C, I, D, M, R;
		}

		function updateScenarioCard(monthly, totalInterest, payoffYear) {
			var card = document.getElementById('scenario-card');
			if (!card || !savedScenario) { if (card) card.style.display = 'none'; return; }
			var sc = savedScenario;
			var scAMonthly = document.getElementById('sc-a-monthly');
			var scAInterest = document.getElementById('sc-a-interest');
			var scAYear = document.getElementById('sc-a-year');
			var _scPerMo = (window._i18n_current && window._i18n_current['sc-per-mo']) || '/mo';
			var _scInt = (window._i18n_current && window._i18n_current['sc-interest-lbl']) || 'interest';
			var _scPo = (window._i18n_current && window._i18n_current['sc-payoff-lbl']) || 'payoff';
			if (scAMonthly) { scAMonthly.textContent = p(sc.monthly) + _scPerMo; scAMonthly.className = 'scenario-monthly'; }
			if (scAInterest) { scAInterest.textContent = p(sc.totalInterest) + ' ' + _scInt; scAInterest.className = 'scenario-detail'; }
			if (scAYear) { scAYear.textContent = sc.payoffYear + ' ' + _scPo; scAYear.className = 'scenario-detail'; }
			var scCurMonthly = document.getElementById('sc-cur-monthly');
			var scCurInterest = document.getElementById('sc-cur-interest');
			var scCurYear = document.getElementById('sc-cur-year');
			var moCls = monthly < sc.monthly ? ' sc-gain' : monthly > sc.monthly ? ' sc-loss' : '';
			var intCls = totalInterest < sc.totalInterest ? ' sc-gain' : totalInterest > sc.totalInterest ? ' sc-loss' : '';
			var yrCls = payoffYear < sc.payoffYear ? ' sc-gain' : payoffYear > sc.payoffYear ? ' sc-loss' : '';
			if (scCurMonthly) { scCurMonthly.textContent = p(monthly) + _scPerMo; scCurMonthly.className = 'scenario-monthly' + moCls; }
			if (scCurInterest) { scCurInterest.textContent = p(totalInterest) + ' ' + _scInt; scCurInterest.className = 'scenario-detail' + intCls; }
			if (scCurYear) { scCurYear.textContent = payoffYear + ' ' + _scPo; scCurYear.className = 'scenario-detail' + yrCls; }
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
				b(sP); b(sR); b(sT);
				var resLbl = document.getElementById('res-monthly-lbl');
				if (resLbl) resLbl.textContent = (window._i18n_current && window._i18n_current['afford-result-label']) || 'You could borrow up to';
				if (!pmt || !rate || !term) return;
				var rmo = rate / 100 / 12;
				var nm = term * 12;
				var pv = rmo > 0 ? pmt * (1 - Math.pow(1 + rmo, -nm)) / rmo : pmt * nm;
				var totalPaid = pmt * nm;
				var totalInterest = Math.max(0, totalPaid - pv);
				var payoffYear = new Date().getFullYear() + term;
				var yrs = (window._i18n_current && window._i18n_current['unit-yrs']) || 'yrs';
				var resMonthly = document.getElementById('result-monthly');
				if (resMonthly) { resMonthly.textContent = p(pv); window.fitText && window.fitText(resMonthly); }
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
			} catch (e2) { console.error('Afford calc error:', e2); }
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
					freqEl.querySelectorAll('.freq-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.freq === 'monthly'); });
				}
			}
			var extraGrp = document.getElementById('extra-input-group');
			if (extraGrp) extraGrp.style.display = e === 'mortgage' ? '' : 'none';
			if (e !== 'mortgage' && sExtra) { sExtra.value = 0; if (iExtra) iExtra.value = 0; }
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
					sExtra.max = extraMax; sExtra.step = extraStep;
					if (iExtra) { iExtra.max = extraMax; iExtra.step = extraStep; }
					var sym = a.symbol;
					var maxLbl = document.getElementById('extra-max-lbl');
					if (maxLbl) maxLbl.textContent = sym + new Intl.NumberFormat().format(extraMax);
					sExtra.value = 0; if (iExtra) iExtra.value = 0;
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
			iExtra && iExtra.addEventListener('input', function () {
				var e = parseFloat(this.value) || 0;
				e = Math.max(0, Math.min(parseFloat(sExtra.max) || 2000, e));
				sExtra.value = e; v();
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
				f(data, i ? null : (amortGran === 'monthly' ? 24 : 5));
				this.setAttribute('aria-expanded', i);
			}),
			(function () {
				var gran = document.getElementById('amort-gran-toggle');
				gran && gran.addEventListener('click', function (ev) {
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
				ftog && ftog.addEventListener('click', function (ev) {
					var btn = ev.target.closest('.freq-btn');
					if (!btn) return;
					var f2 = btn.dataset.freq;
					if (f2 === freqMode) return;
					freqMode = f2;
					ftog.querySelectorAll('.freq-btn').forEach(function (b) { b.classList.toggle('active', b.dataset.freq === f2); });
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
				if (sAP) sAP.addEventListener('input', function () { if (r === 'afford') { if (iAP) iAP.value = sAP.value; b(sAP); calcAfford(); } });
				if (sAR) sAR.addEventListener('input', function () { if (r === 'afford') { if (iAR) iAR.value = parseFloat(sAR.value).toFixed(1); b(sAR); calcAfford(); } });
				if (sAT) sAT.addEventListener('input', function () { if (r === 'afford') { if (iAT) iAT.value = sAT.value; b(sAT); calcAfford(); } });
				if (iAP) iAP.addEventListener('input', function () { var v2 = Math.max(100, Math.min(50000, parseFloat(iAP.value) || 0)); if (sAP) { sAP.value = v2; b(sAP); } if (r === 'afford') calcAfford(); });
				if (iAR) iAR.addEventListener('input', function () { var v2 = Math.max(0.1, Math.min(30, parseFloat(iAR.value) || 0)); if (sAR) { sAR.value = v2; b(sAR); } if (r === 'afford') calcAfford(); });
				if (iAT) iAT.addEventListener('input', function () { var v2 = Math.max(1, Math.min(30, parseInt(iAT.value) || 0)); if (sAT) { sAT.value = v2; b(sAT); } if (r === 'afford') calcAfford(); });
			})(),
			(function () {
				var saveBtn = document.getElementById('save-scenario-btn');
				var clearBtn = document.getElementById('scenario-clear-btn');
				if (saveBtn) saveBtn.addEventListener('click', function () {
					var sAmt = parseFloat(document.getElementById('s-amount') && document.getElementById('s-amount').value) || 0;
					var sRate = parseFloat(document.getElementById('s-rate') && document.getElementById('s-rate').value) || 0;
					var sTerm = parseInt(document.getElementById('s-term') && document.getElementById('s-term').value) || 0;
					if (!sAmt || !sRate || !sTerm) return;
					var ww = h(sAmt, sRate, sTerm);
					var payY = new Date().getFullYear() + sTerm;
					savedScenario = { monthly: ww.monthly, totalInterest: ww.interest, payoffYear: payY, type: r };
					saveBtn.textContent = (window._i18n_current && window._i18n_current['btn-saved']) || 'Saved!';
					saveBtn.classList.add('saved');
					updateScenarioCard(ww.monthly, ww.interest, payY);
				});
				if (clearBtn) clearBtn.addEventListener('click', function () {
					savedScenario = null;
					var card = document.getElementById('scenario-card');
					if (card) card.style.display = 'none';
					var saveBtn2 = document.getElementById('save-scenario-btn');
					if (saveBtn2) { saveBtn2.textContent = (window._i18n_current && window._i18n_current['btn-save-scenario']) || 'Save as Scenario A'; saveBtn2.classList.remove('saved'); }
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
							var lbl = new Date(yr, mo).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
							rows.push([lbl, n.start.toFixed(2), n.paidP.toFixed(2), n.paidI.toFixed(2), Math.max(0, n.end).toFixed(2)]);
						});
					} else {
						rows = [['Year', 'Starting Balance', 'Principal Paid', 'Interest Paid', 'Ending Balance']];
						csvSrc.forEach(function (n) {
							rows.push([baseYr + n.year - 1, n.start.toFixed(2), n.paidP.toFixed(2), n.paidI.toFixed(2), Math.max(0, n.end).toFixed(2)]);
						});
					}
					var csvStr = rows.map(function (e) { return e.map(function (e) { return '"' + String(e).replace(/"/g, '""') + '"'; }).join(','); }).join('\r\n'),
						blob = new Blob([csvStr], { type: 'text/csv;charset=utf-8;' }),
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
						: (e = new Chart(document.getElementById('ciChart'), {
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
							}));
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
			s = {
				en: {
					'nav-loans': 'Loans',
					'nav-savings': 'Savings',
					'nav-refinance': 'Refinance',
					'nav-currency': 'Live Rates',
					'btn-settings': 'Settings',
					'pref-title': 'Preferences',
					'pref-language': 'Display language',
					'pref-lang-note': 'Changes labels and number formatting.',
					'pref-currency': 'Preferred currency',
					'pref-currency-note': 'Default currency for all calculators and market rates.',
					'pref-current': 'Current settings',
					'pref-save': 'Save preferences',
					'toast-saved': 'Preferences saved',
					'pref-cancel': 'Cancel',
					'hero-h1': 'Free <em>Financial</em><br>Calculator Suite',
					'hero-sub': 'Loan calculator, compound interest, refinance savings, live currency converter, gold price, oil price and live stock prices: all free, instant, no signup required.',
					'trust-1': 'Free forever',
					'trust-2': 'No signup required',
					'trust-3': 'Works for any country',
					'tab-mortgage': 'Mortgage',
					'tab-car': 'Car Loan',
					'tab-personal': 'Personal',
					'tab-student': 'Student',
					'tab-afford': 'Afford',
					'afford-pmt-label': 'Monthly payment I can afford',
					'afford-result-label': 'You could borrow up to',
					'afford-sub': 'affordability estimate',
					'lbl-amount': 'Loan amount',
					'extra-label': 'Extra monthly payment',
					'lbl-rate': 'Annual interest rate',
					'lbl-term': 'Loan term',
					'res-monthly': 'Monthly payment',
					'freq-monthly': 'Monthly',
					'freq-biweekly': 'Biweekly payment',
					'freq-per-2wk': '/ 2 wks',
					'res-principal': 'Principal',
					'res-interest': 'Total interest',
					'res-total': 'Total cost',
					'monthly-note': 'Principal & interest only, excludes taxes, insurance, and fees',
					'hero-headline': 'Know your numbers.',
					'hero-subtitle': 'Free calculators for mortgages, savings, refinancing, and live currency rates.',
					'hero-h1': 'Know your numbers.',
					'hero-stat-currencies': 'Currencies',
					'hero-stat-langs': 'Languages',
					'hero-stat-tools': 'Tools',
					'res-year': 'Payoff year',
					'lbl-principal-pct': 'Principal',
					'lbl-interest-pct': 'Interest',
					'section-breakdown': 'Payment breakdown',
					'section-amort': 'Amortization schedule',
					'amort-year': 'Year',
					'amort-month': 'Month',
					'amort-start': 'Starting balance',
					'amort-ppaid': 'Principal paid',
					'amort-ipaid': 'Interest paid',
					'amort-end': 'Ending balance',
					'btn-show-all': 'Show all years',
					'btn-show-all-months': 'Show all months',
					'btn-show-less': 'Show less',
					'amort-gran-yearly': 'Yearly',
					'amort-gran-monthly': 'Monthly',
					'section-how': 'How loan payments are calculated',
					'section-faq': 'Frequently asked questions',
					'ci-h2': 'Compound interest & savings growth calculator',
					'ci-label-principal': 'Initial deposit',
					'ci-label-monthly': 'Monthly contribution',
					'ci-label-rate': 'Annual return rate',
					'ci-label-years': 'Investment period',
					'ci-result-label': 'Future value',
					'ci-sub': 'Total portfolio after',
					'ci-deposited': 'Total deposited',
					'ci-earned': 'Interest earned',
					'ci-mult': 'Growth multiple',
					'ci-year': 'Target year',
					'ci-chart-h': 'Year-by-year growth',
					'rf-h2': 'Refinance calculator: how much will you save?',
					'rf-current': 'Current loan',
					'rf-new': 'New loan offer',
					'rf-balance': 'Remaining balance',
					'rf-oldrate': 'Current interest rate',
					'rf-remaining': 'Years remaining',
					'rf-newrate': 'New interest rate',
					'rf-costs': 'Closing costs',
					'rf-monthly': 'Monthly savings',
					'rf-old': 'Old payment',
					'rf-new-pay': 'New payment',
					'rf-breakeven': 'Time to break even',
					'rf-total': 'Total lifetime savings',
					'cur-h2': 'Live currency converter, gold price, oil price & stock prices today',
					'cur-amount-label': 'Amount',
					'cur-to-label': 'Converted to',
					'cur-quick': 'Quick reference: common amounts',
					'gold-title': 'Gold (XAU)',
					'gold-sub': 'Price per troy ounce',
					'silver-title': 'Silver (XAG)',
					'silver-sub': 'Price per troy ounce',
					'oil-title': 'Crude Oil (WTI)',
					'oil-sub': 'Price per barrel',
					'gold-local-lbl': 'Price in your currency',
					'oil-local-lbl': 'Price in your currency',
					'silver-local-lbl': 'Price in your currency',
					'faq-heading': 'Frequently asked questions about loans, savings, currency and gold',
					'footer-mortgage': 'Mortgage Calculator',
					'footer-loan': 'Loan Calculator',
					'footer-savings': 'Savings Calculator',
					'footer-refinance': 'Refinance Calculator',
					'footer-currency': 'Currency Converter',
					'footer-privacy': 'Privacy Policy',
					'footer-dnsmi': 'Do Not Sell or Share My Personal Information',
					'footer-rights': 'All rights reserved.',
					'footer-desc': 'Free financial calculators: loan, savings, refinance, currency. No account required.',
					'footer-disclaimer': 'LoanCalc provides estimates for informational purposes only. This is not financial advice.',
					'unit-years': 'years',
					'unit-yr': 'yr',
					'unit-yrs': 'yrs',
					'ci-earned-short': 'Growth',
					'cur-rate-lbl': 'Rate',
					'cur-inverse-lbl': 'Inverse',
					'cur-updated-lbl': 'Updated',
					'how-formula-h': 'The formula',
					'how-lower-h': 'How to lower your monthly payment',
					'formula-m': 'Monthly payment',
					'formula-p': 'Principal (the loan amount)',
					'formula-r': 'Monthly rate (annual rate ÷ 12)',
					'formula-n': 'Total payments (years × 12)',
					'tip-1': 'A larger down payment reduces the principal directly: less borrowed means lower monthly payments and less total interest paid.',
					'tip-2': 'A longer loan term spreads payments over more months. Your monthly bill drops, but total interest paid over the life of the loan increases.',
					'tip-3': 'A lower interest rate has a compounding effect: even 0.5% difference on a large mortgage saves tens of thousands in total interest.',
					'tip-4': 'Improving your credit score before applying typically qualifies you for better rates. Check your score 3–6 months before borrowing.',
					'faq-q1': 'How is the monthly loan payment calculated?',
					'faq-q2': 'What is an amortization schedule?',
					'faq-q3': 'Does this calculator work for all countries?',
					'faq-q4': 'How can I reduce the total interest I pay?',
					'faq-q5': 'Is LoanCalc completely free?',
					'faq-q6': 'How does the refinance calculator work?',
					'faq-q7': 'How is the gold price calculated and updated?',
					'faq-q8': 'Which currencies does the converter support?',
					'faq-q9': 'Which stock prices does LoanCalc show?',
					'loan-label-mortgage': '30-year fixed mortgage',
					'loan-label-car': '5-year auto loan',
					'loan-label-personal': '3-year personal loan',
					'loan-label-student': '10-year student loan',
					'helper-title-mortgage': 'About the defaults',
					'helper-title-car': 'Typical car loan',
					'helper-title-personal': 'Typical personal loan',
					'helper-title-student': 'Student loan',
					'helper-text-mortgage': 'Defaults show a $300K loan at 6.5% for 30 years. Rates typically run 4–10% depending on country, lender, and credit score.',
					'helper-text-car': 'Average new car loan rate is 6–8%. Used car loans typically carry slightly higher rates.',
					'helper-text-personal': 'Personal loan rates range from 6% (excellent credit) to 36% (fair credit).',
					'helper-text-student': 'Student loan rates vary widely by country and lender. Enter your actual rate and balance above for an accurate repayment estimate.',
					'rf-verdict-higher': 'The new rate is not lower: refinancing would increase your payment.',
					'rf-verdict-long': 'Monthly savings but break-even exceeds remaining term. Not recommended.',
					'rf-verdict-good': 'Refinancing looks worthwhile.',
					'rf-verdict-summary': 'You save {monthly}/mo and break even in {breakeven}. Total lifetime saving: {total}.',
					'rf-never': 'Never',
					'rf-over-term': '>{n} yrs',
					'rf-months': '{n} mo',
					'rf-years-mo': '{y}y {m}m',
					'chart-center-lbl': 'principal',
					'chart-stat-principal': 'Principal borrowed',
					'chart-stat-interest': 'Total interest paid',
					'chart-stat-total': 'Total amount repaid',
					'chart-stat-payoff': 'Loan fully paid off',
					'breakdown-sub': 'How your total cost is split between the amount borrowed and interest paid to the lender.',
					'amort-sub': 'Year-by-year breakdown: how each payment splits between principal (reducing your balance) and interest.',
					'ci-section-sub': 'See exactly how your savings or investment grows year by year with compound interest.',
					'cur-section-sub': 'Convert between major currencies with live exchange rates. Gold price, oil price, and live stock prices for Apple, Microsoft, NVIDIA, Tesla, and S&P 500 ETF — all in your local currency.',
					'ci-chart-sub': 'Balance at end of each year, split between your deposits and compound growth.',
					'per-oz-usd': 'per oz in USD',
					'per-bbl-usd': 'per barrel in USD',
					'lbl-stocks': 'Stocks',
					'lbl-tab-currency': 'Currency',
					'lbl-tab-commodities': 'Commodities',
					'lbl-tab-stocks': 'Stocks',
					'lbl-market-prices': 'Market prices',
					'age-just-now': 'just now',
					'age-min-ago': '{n} min ago',
					'age-hours-ago': '{n} hours ago',
					'lbl-currencies': 'currencies',
					'lbl-rates-from': 'Rates from',
					'lbl-from': 'From',
					'nav-faq': 'FAQ',
					'unit-mo': '/mo',
					'weight-1g': '1g',
					'weight-10g': '10g',
					'weight-1kg': '1 kg',
					'weight-5bbl': '5 bbls',
					'weight-10bbl': '10 bbls',
					'weight-100bbl': '100 bbls',
					'lbl-price-unavailable': 'Price unavailable',
					'lbl-updating': 'Updating…',
					'lbl-partial-rates': 'Partial rates',
					'rf-sub': 'Per month with the new rate',
					'rf-verdict-init': 'Enter your loan details to see if refinancing makes sense.',
					'loan-desc': 'Use this free loan payment calculator to find your exact monthly payment for any mortgage, car loan, personal loan, or student loan. Enter your loan amount, annual interest rate, and term in years: the calculator instantly shows your monthly payment, total interest, and a full year-by-year amortization schedule.',
					'ci-desc': 'The compound interest calculator shows how an initial deposit grows over time when interest is earned on both the original principal and accumulated interest. Enter your starting amount, monthly contribution, return rate, and investment period to see your future portfolio value.',
					'ci-helper-title': 'About the 7% default',
					'ci-helper-text': 'Global equity index funds have historically returned around 6–8% annually after inflation. Adjust the rate above to match your own expectations.',
					'rf-desc': 'The refinance savings calculator helps you decide whether it is worth refinancing your existing loan. Enter your current loan balance, current rate, and the new rate offered, along with closing costs. The calculator shows your monthly savings, break-even month, and total lifetime saving.',
					'cur-desc': 'LoanCalc currency converter supports 161 world currencies with live exchange rates updated every 24 hours. Gold price (XAU) and WTI crude oil price are converted to your local currency in real time. Live stock prices for Apple, Microsoft, Alphabet, Amazon, Meta, NVIDIA, Tesla, JPMorgan, Berkshire B, and S&P 500 ETF (SPY) are shown and updated every hour.',
					'how-p1': 'Every fixed-rate loan uses the same standard amortization formula. Equal instalments cover both the interest on the remaining balance and a portion of the principal, fully paying off the loan by the final month.',
					'how-p2': 'Three levers control your monthly payment. Adjusting any one of them immediately changes what you owe each month.',
					'cur-rate-unavailable': 'Rate unavailable',
					'cur-not-in-feed': 'Not in live feed',
					'cur-today': 'today',
					'cur-status-fetching': 'Fetching exchange rates…',
					'cur-status-live': 'Live rates · {date} · 161 currencies · updates every 24h',
					'cur-status-partial': 'Rates loaded · {date} (33 currencies)',
					'cur-status-offline': 'Offline rates: limited currencies available',
					'cmd-fetching': 'Fetching…',
					'cmd-live': 'Live · {date}',
					'cmd-approx': 'Approx · check live data',
					'cur-status-cached': 'Rates from {date} · cached · updates every 24h',
					'clamp-min': 'Minimum:',
					'clamp-max': 'Maximum:',
					'seo-mort-h2': 'Mortgage Calculator: Everything You Need to Know',
					'seo-mort-h3-1': 'What is a mortgage calculator and who should use it?',
					'seo-mort-p1': 'A mortgage calculator is a financial tool that computes your monthly payment on a home loan based on three inputs: the loan amount (principal), the annual interest rate, and the loan term in years. Anyone considering buying a home, comparing loan offers, or trying to understand the long-term cost of borrowing should use one before signing a mortgage agreement.',
					'seo-mort-p2': "First-time homebuyers use mortgage calculators to reality-check affordability before house hunting. Existing homeowners use them to explore refinancing scenarios or to model the impact of making extra payments. Real estate investors use them to estimate cash flow on rental properties. The calculator works identically for fixed-rate mortgages worldwide — whether you're borrowing in USD, EUR, GBP, or any other currency.",
					'seo-mort-h3-2': 'How the monthly payment formula works',
					'seo-mort-p3': 'Every fixed-rate mortgage uses the same standard amortization formula:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'Where <strong>M</strong> is your monthly payment, <strong>P</strong> is the principal loan amount, <strong>r</strong> is the monthly interest rate (annual rate ÷ 12), and <strong>n</strong> is the total number of monthly payments (years × 12). This formula produces a fixed monthly amount that covers both the interest accruing on the remaining balance and a portion of the principal, with the ratio shifting over time. In the early years, most of each payment is interest. By the final years, most of each payment reduces the principal.',
					'seo-mort-h3-3': 'What affects your mortgage rate?',
					'seo-mort-p6': 'Your actual mortgage rate depends on several factors lenders evaluate when approving your application:',
					'seo-mort-li-1': '<strong>Credit score:</strong> Borrowers with scores above 760 typically receive the lowest available rates. Each 20-point drop in credit score can increase your rate by 0.1–0.5%, adding thousands in total interest over 30 years.',
					'seo-mort-li-2': '<strong>Loan-to-value ratio (LTV):</strong> A lower LTV (larger down payment) signals less risk to the lender. Putting down 20% or more usually eliminates private mortgage insurance (PMI) and may qualify you for a better rate.',
					'seo-mort-li-3': '<strong>Loan type:</strong> Conforming loans (within Fannie Mae/Freddie Mac limits) typically carry lower rates than jumbo loans. Government-backed loans (FHA, VA, USDA) have their own rate structures.',
					'seo-mort-li-4': "<strong>Loan term:</strong> 15-year mortgages carry lower interest rates than 30-year mortgages because the lender's money is at risk for a shorter period.",
					'seo-mort-li-5': '<strong>Market conditions:</strong> Mortgage rates are heavily influenced by the 10-year Treasury yield and Federal Reserve policy. When the Fed raises rates to combat inflation, mortgage rates tend to rise in tandem.',
					'seo-mort-h3-4': '15-year vs 30-year mortgage: the real tradeoff',
					'seo-mort-p12': "The choice between a 15-year and 30-year mortgage is fundamentally a tradeoff between monthly cash flow and total interest paid. Here's an example for a $300,000 loan:",
					'seo-mort-th-loan': 'Loan',
					'seo-mort-th-rate': 'Rate',
					'seo-mort-p13': "At 6.5%, a 30-year mortgage costs $382,633 in total interest versus $170,453 for a 15-year mortgage — a difference of over $212,000. However, the 30-year mortgage's monthly payment is $718 lower, which matters significantly if cash flow is tight or you want to invest the difference.",
					'seo-mort-h3-5': 'What is PMI and when does it apply?',
					'seo-mort-p14': "Private mortgage insurance (PMI) is required by most US lenders when your down payment is less than 20% of the home's purchase price. PMI protects the lender if you default. The typical cost is 0.5–1.5% of the loan amount per year, added to your monthly payment. On a $300,000 loan, PMI can add $125–$375 per month. Once your equity reaches 20% (either through payments or home appreciation), you can typically request PMI cancellation. Lenders must automatically cancel PMI when your loan balance reaches 78% of the original purchase price.",
					'seo-mort-h3-6': 'How to pay off your mortgage faster',
					'seo-mort-li-6': '<strong>Make one extra payment per year:</strong> On a 30-year mortgage, one additional monthly payment per year reduces the loan term by approximately 4–5 years and saves tens of thousands in interest.',
					'seo-mort-li-7': '<strong>Switch to biweekly payments:</strong> Instead of 12 monthly payments, make 26 half-payments per year. This results in one extra full payment annually without you noticing a significant cash flow impact.',
					'seo-mort-li-8': '<strong>Round up your payment:</strong> If your payment is $1,847, paying $1,900 or $2,000 each month directs the extra amount entirely to principal, accelerating payoff.',
					'seo-mort-li-9': '<strong>Apply windfalls:</strong> Tax refunds, bonuses, or inheritances applied as lump-sum principal payments can shave years off your mortgage term.',
					'seo-mort-p15': 'Also useful: <a href="/refinance-calculator/">Refinance Calculator</a> — see if a lower rate makes sense for your current mortgage. Or explore <a href="/loan-calculator/">other loan types</a> including car loans, personal loans, and student loans.',
					'seo-ci-h2': 'Compound Interest &amp; Savings: The Complete Guide',
					'seo-ci-h3-1': 'What is compound interest and why does it matter?',
					'seo-ci-h3-2': 'Daily vs monthly vs annual compounding — how it affects growth',
					'seo-ci-h3-3': 'The Rule of 72 explained',
					'seo-ci-h3-4': 'The cost of waiting: starting at 25 vs 35 vs 45',
					'seo-ci-h3-5': 'High-yield savings accounts vs index funds: typical rates',
					'seo-ci-p1': 'Compound interest is interest calculated on both the initial principal and the accumulated interest from all previous periods. This is fundamentally different from simple interest, which is only ever calculated on the original principal. Albert Einstein is often credited with calling compound interest “the eighth wonder of the world. He who understands it, earns it; he who doesn’t, pays it.”',
					'seo-ci-p2': 'The reason compound interest is so powerful is exponential growth. In the early years, the effect is subtle. But over 20, 30, or 40 years, the compounding effect becomes extraordinary — the bulk of your final wealth comes not from your contributions but from interest earned on interest earned on interest.',
					'seo-ci-p3': 'The compounding frequency determines how often interest is calculated and added to the balance. More frequent compounding means slightly higher returns:',
					'seo-ci-p4': 'For savings accounts and money market funds, monthly compounding is standard. High-yield savings accounts at online banks typically compound daily. The difference between monthly and daily compounding is small — the interest rate itself matters far more than compounding frequency.',
					'seo-ci-p5': 'The Rule of 72 is a simple mental math shortcut: divide 72 by your annual return rate to estimate how many years it takes your investment to double in value.',
					'seo-ci-p6': 'The rule works in reverse too: if you want your money to double in 8 years, you need a rate of at least 72 ÷ 8 = 9% per year.',
					'seo-ci-p7': 'The single most powerful factor in savings is time. Consider investing $200 per month at a 7% annual return with no initial deposit:',
					'seo-ci-p8': 'Starting at 25 instead of 35 costs only $24,000 more in contributions but generates $285,000 more wealth — a 12x return on that additional $24,000. The message is clear: start early, even with small amounts.',
					'seo-ci-p9': 'The return rate you choose in this calculator should reflect where you’ll actually hold your savings:',
					'seo-ci-p10': 'Also see: <a href="/refinance-calculator/">Refinance Calculator</a> — the interest you save from refinancing a mortgage can be redirected into savings.',
					'seo-ci-li-1': '<strong>Annual compounding:</strong> Interest added once per year. Baseline rate.',
					'seo-ci-li-2': '<strong>Monthly compounding:</strong> Interest added 12 times per year. A 6% annual rate compounded monthly is equivalent to an effective annual rate of 6.168%.',
					'seo-ci-li-3': '<strong>Daily compounding:</strong> Interest added 365 times per year. A 6% rate compounded daily gives an effective rate of 6.183%. Marginally better than monthly.',
					'seo-ci-li-4': 'At 4% (high-yield savings): 72 ÷ 4 = <strong>18 years</strong> to double',
					'seo-ci-li-5': 'At 7% (stock market average): 72 ÷ 7 = <strong>10.3 years</strong> to double',
					'seo-ci-li-6': 'At 10% (aggressive growth): 72 ÷ 10 = <strong>7.2 years</strong> to double',
					'seo-ci-li-7': 'At 12% (venture returns): 72 ÷ 12 = <strong>6 years</strong> to double',
					'seo-ci-li-8': '<strong>Traditional savings account:</strong> 0.01–0.5% APY. Effectively loses value to inflation. Only suitable for emergency funds you need to access immediately.',
					'seo-ci-li-9': '<strong>High-yield savings account (online banks):</strong> 4–5% APY in a high-rate environment. FDIC insured. Excellent for emergency funds and short-term goals (1–3 years).',
					'seo-ci-li-10': '<strong>Money market accounts:</strong> 4–5% APY. Similar to HYSA with slightly different access terms.',
					'seo-ci-li-11': '<strong>Certificates of deposit (CDs):</strong> 4–5.5% APY with 6-month to 5-year lock-up. Higher rates for longer terms.',
					'seo-ci-li-12': '<strong>S&amp;P 500 index fund:</strong> ~10% average nominal return (7% after inflation) historically. Not guaranteed. Best for goals 5+ years away. Subject to market volatility.',
					'seo-ci-li-13': '<strong>Total bond market fund:</strong> 3–5% historically. Lower volatility than stocks. Suitable for medium-term goals.',
					'seo-ci-th-start': 'Start age',
					'seo-ci-th-end': 'End age',
					'seo-ci-th-years': 'Years invested',
					'seo-ci-th-contributed': 'Total contributed',
					'seo-ci-th-final': 'Final value',
					'seo-ci-th-interest': 'Interest earned',
					'seo-rf-h2': 'Refinancing Your Mortgage: When It Makes Sense',
					'seo-rf-h3-1': 'When refinancing makes financial sense',
					'seo-rf-h3-2': 'How to calculate the break-even point',
					'seo-rf-h3-3': 'Cash-out refinance vs rate-and-term refinance',
					'seo-rf-h3-4': 'Hidden costs of refinancing',
					'seo-rf-h3-5': 'When NOT to refinance',
					'seo-rf-p1': 'Refinancing replaces your existing loan with a new one, ideally at a lower interest rate. The decision comes down to one fundamental question: will the long-term savings exceed the upfront costs, and will you stay in the loan long enough to recoup those costs? Refinancing makes the most sense when:',
					'seo-rf-p2': 'The break-even calculation is simple: divide your total closing costs by your monthly savings.',
					'seo-rf-formula': '<strong>Break-even months = Closing costs ÷ Monthly payment savings</strong>',
					'seo-rf-p3': "Example: If refinancing costs $4,500 in closing costs and saves you $200 per month, the break-even is 4,500 ÷ 200 = 22.5 months — approximately 2 years. If you plan to stay in your home for at least another 3–5 years, this refinance makes clear financial sense. If you're planning to move within 18 months, it doesn't.",
					'seo-rf-p4': 'There are two main types of mortgage refinancing:',
					'seo-rf-p5': 'The true cost of refinancing extends beyond the stated closing costs. Common fees include:',
					'seo-rf-p6': 'Total closing costs for a typical refinance run 2–3% of the loan amount. On a $300,000 loan, expect $6,000–$9,000 in costs unless you choose a "no-closing-cost" refinance (where costs are rolled into the rate instead).',
					'seo-rf-p7': 'Also see: <a href="/loan-calculator/">Mortgage Calculator</a> — model your original mortgage or compare loan options before deciding to refinance.',
					'seo-rf-li-1': 'Your new rate is at least 0.5–1% lower than your current rate',
					'seo-rf-li-2': 'You plan to remain in the home longer than the break-even period',
					'seo-rf-li-3': 'Your credit score has improved significantly since your original loan',
					'seo-rf-li-4': 'You want to switch from an adjustable-rate to a fixed-rate mortgage for stability',
					'seo-rf-li-5': 'You want to shorten your loan term (e.g., from 30-year to 15-year) and can afford higher monthly payments',
					'seo-rf-li-6': '<strong>Rate-and-term refinance:</strong> You replace your existing mortgage with a new one at a better rate and/or different term, without changing the loan balance. This is the most common type and what this calculator models. The goal is purely to reduce your interest cost.',
					'seo-rf-li-7': '<strong>Cash-out refinance:</strong> You borrow more than your current loan balance, receiving the difference as cash. For example, if your home is worth $400,000 and you owe $250,000, you might refinance for $320,000 and take $70,000 in cash for home improvements, debt consolidation, or other purposes. Cash-out refinancing resets your equity and typically carries a slightly higher rate than rate-and-term refinancing.',
					'seo-rf-li-8': "<strong>Origination fee:</strong> 0.5–1% of the loan amount. The lender's fee for processing the new loan.",
					'seo-rf-li-9': "<strong>Appraisal fee:</strong> $300–$600. Most lenders require a fresh appraisal to confirm your home's current value.",
					'seo-rf-li-10': '<strong>Title insurance:</strong> $500–$1,500. Required to protect the lender against title disputes.',
					'seo-rf-li-11': '<strong>Recording fees:</strong> $25–$250. Government fees to record the new mortgage.',
					'seo-rf-li-12': '<strong>Discount points:</strong> Optional prepaid interest to "buy down" your rate. One point = 1% of loan amount = typically 0.25% rate reduction.',
					'seo-rf-li-13': "<strong>You're moving soon:</strong> If you'll sell the home before reaching the break-even point, refinancing costs more than it saves.",
					'seo-rf-li-14': '<strong>Prepayment penalties:</strong> Some loans charge fees for paying off early. Verify your current loan terms before refinancing.',
					'seo-rf-li-15': "<strong>You've paid off most of the loan:</strong> Resetting to a new 30-year term on a loan you're 20 years into extends your debt significantly, even if the rate is lower.",
					'seo-rf-li-16': '<strong>Your credit score has dropped:</strong> If your credit has worsened since your original mortgage, you may not qualify for a better rate and could actually receive a higher rate.',
					'seo-cur-h2': 'Currency Exchange, Gold, Oil & Stock Prices: How Live Rates Work',
					'seo-cur-h3-1': 'How live exchange rates work',
					'seo-cur-p1': 'Currency exchange rates are determined by the foreign exchange market (forex), the world\'s largest financial market with over $7 trillion in daily trading volume. The "live" rate you see on this site is the mid-market rate (also called the interbank rate or spot rate), which is the midpoint between the buying and selling prices used by banks when trading large volumes with each other.',
					'seo-cur-p2': 'The rates shown here are sourced from the Frankfurter API, which aggregates data from the European Central Bank and other financial sources. They are updated daily and cached for performance. For precise real-time rates at millisecond accuracy, institutional traders use dedicated forex platforms — but for travel planning, international transfers, and general reference, these rates are accurate within a fraction of a percent.',
					'seo-cur-h3-2': 'What affects currency exchange rates',
					'seo-cur-p3': 'Exchange rates are constantly shifting based on a complex mix of economic and political factors:',
					'seo-cur-li-1': "<strong>Interest rate differentials:</strong> When a central bank raises interest rates, its currency typically strengthens because higher rates attract foreign capital seeking better returns. The US Federal Reserve's decisions often move global exchange rates.",
					'seo-cur-li-2': "<strong>Inflation:</strong> Higher inflation erodes a currency's purchasing power over time. Countries with lower, stable inflation tend to have stronger currencies. The EUR/USD pair, for example, is closely watched for inflation differentials between the US and Eurozone.",
					'seo-cur-li-3': '<strong>Trade balance:</strong> Countries that export more than they import (trade surplus) have higher demand for their currency, pushing its value up. Countries with persistent trade deficits may see currency weakness over time.',
					'seo-cur-li-4': '<strong>Political stability:</strong> Political uncertainty, elections, or geopolitical conflicts can cause rapid currency moves. Safe-haven currencies like USD, CHF, and JPY often strengthen during global crises as investors seek stability.',
					'seo-cur-li-5': '<strong>GDP growth:</strong> Strong economic growth increases demand for a currency as investors put capital to work in that economy.',
					'seo-cur-h3-3': "Mid-market rate vs bank rate: why there's a spread",
					'seo-cur-p4': 'The rate you see on this converter is the mid-market rate — the theoretical midpoint between buy and sell prices. When you actually exchange money through a bank, credit card, or money transfer service, you will receive a worse rate. The difference is called the spread, and it is how currency exchange businesses make their profit.',
					'seo-cur-li-6': '<strong>Banks and airport kiosks:</strong> Typically charge 3–10% above mid-market rate. Worst for small amounts and tourist locations.',
					'seo-cur-li-7': '<strong>Credit cards:</strong> Usually charge 1–3% as a foreign transaction fee. Often the best option for purchases abroad, especially cards with no foreign transaction fee.',
					'seo-cur-li-8': '<strong>Specialist transfer services (Wise, Revolut):</strong> Charge 0.3–1% above mid-market rate. Best for large international transfers.',
					'seo-cur-p5': "To calculate what you'll actually receive: take the mid-market rate and subtract the provider's spread percentage. If you see 1 USD = 0.92 EUR at mid-market and your bank charges 3%, you'll receive approximately 0.92 × (1 - 0.03) = 0.892 EUR per dollar.",
					'seo-cur-h3-4': 'Gold as a currency hedge: how XAU is priced',
					'seo-cur-p6': 'Gold (ticker symbol XAU) is priced in US dollars per troy ounce on international markets. The troy ounce is the standard unit for precious metals and equals approximately 31.1 grams (slightly heavier than a standard avoirdupois ounce at 28.35 grams). One troy ounce = 31.1035 grams exactly.',
					'seo-cur-p7': 'Gold functions as a hedge against currency devaluation and inflation. When the US dollar weakens or inflation rises, gold prices often rise — not because gold itself changes, but because more dollars are needed to buy the same weight of gold. Gold has maintained purchasing power over centuries while individual currencies have been inflated away. The gold price on this site is sourced from market data via Yahoo Finance, cached hourly for performance.',
					'seo-cur-p8': 'Gold price movements are driven by: central bank gold reserves, US dollar strength, real interest rates (when real rates are low or negative, gold becomes more attractive), geopolitical risk, and jewelry/industrial demand.',
					'seo-cur-h3-5': "WTI crude oil: why it's priced in USD and what moves the price",
					'seo-cur-p9': 'West Texas Intermediate (WTI) is the primary crude oil benchmark for North America and a major global price reference. It is priced in US dollars per barrel (1 barrel = 42 US gallons = approximately 159 liters). Oil has been priced in USD since the 1970s Petrodollar agreement, creating a global demand for US dollars since all countries that import oil need dollars to pay for it.',
					'seo-cur-p10': 'Key factors that drive oil prices:',
					'seo-cur-li-9': '<strong>OPEC+ production decisions:</strong> The OPEC cartel and allied producers (Russia, etc.) control roughly 40% of global supply. Production cuts push prices up; increases push prices down.',
					'seo-cur-li-10': "<strong>US shale production:</strong> The US became the world's largest oil producer partly due to shale technology. Higher US output competes with OPEC and can cap price increases.",
					'seo-cur-li-11': '<strong>Global demand:</strong> Economic growth in China and India (massive oil consumers) is a major demand driver. Recessions reduce demand and push prices down.',
					'seo-cur-li-12': '<strong>Geopolitical events:</strong> Conflicts in oil-producing regions (Middle East, Russia) create supply risk premiums that push prices higher.',
					'seo-cur-li-13': '<strong>USD strength:</strong> Since oil is priced in USD, a stronger dollar makes oil more expensive for non-US buyers, dampening demand and putting downward pressure on prices.',
					'seo-cur-h3-6': 'Live stock prices: top US equities updated hourly',
					'seo-cur-p11': 'LoanCalc shows live prices for ten widely tracked US stocks and funds: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B), and the SPDR S&P 500 ETF Trust (SPY). Prices are fetched from Yahoo Finance and updated every hour — the same interval as the gold and oil data.',
					'seo-cur-p12': 'Each stock chip shows the current price in USD, the percentage change from the previous close (green arrow for gains, red for losses), and the equivalent price in your local currency using the live exchange rate. This makes it easy to track the value of US equity positions from anywhere in the world without switching between apps.',
					'seo-cur-p13': 'The S&amp;P 500 ETF (SPY) is included as a broad market benchmark: when SPY is up, the overall US market is generally rising. Individual stocks like NVDA and TSLA carry higher volatility. Use the <a href="/savings-calculator/">Savings Calculator</a> with a 7–10% annual return to model long-term S&amp;P 500 growth.',
					'seo-cur-p14': 'Also see: <a href="/savings-calculator/">Savings Calculator</a> — model how currency returns or commodity-linked investments grow over time.'
				},
				ar: {
					'nav-loans': 'القروض',
					'nav-savings': 'المدخرات',
					'nav-refinance': 'إعادة التمويل',
					'nav-currency': 'العملات',
					'btn-settings': 'الإعدادات',
					'pref-title': 'التفضيلات',
					'pref-language': 'لغة العرض',
					'pref-lang-note': 'يغير التسميات وتنسيق الأرقام.',
					'pref-currency': 'العملة المفضلة',
					'pref-currency-note': 'العملة الافتراضية لجميع الحاسبات وأسعار السوق.',
					'pref-current': 'الإعدادات الحالية',
					'pref-save': 'حفظ التفضيلات',
					'toast-saved': 'تم حفظ التفضيلات',
					'pref-cancel': 'إلغاء',
					'ci-sub-desc': 'شاهد كيف تنمو مدخراتك سنة بسنة.',
					'hero-h1': 'مجموعة الحاسبات <em>المالية</em><br>المجانية',
					'hero-sub': 'حاسبة القروض، الفائدة المركبة، توفير إعادة التمويل، محول العملات المباشر، سعر الذهب والنفط وأسعار الأسهم الحية: كلها مجانية، فورية، دون تسجيل.',
					'trust-1': 'مجاني دائماً',
					'trust-2': 'لا يلزم تسجيل',
					'trust-3': 'يعمل في أي دولة',
					'tab-mortgage': 'قرض عقاري',
					'tab-car': 'قرض سيارة',
					'tab-personal': 'قرض شخصي',
					'tab-student': 'قرض طلابي',
					'tab-afford': 'القدرة',
					'afford-pmt-label': 'القسط الشهري الذي أستطيع تحمّله',
					'afford-result-label': 'يمكنك الاقتراض حتى',
					'afford-sub': 'تقدير القدرة التمويلية',
					'lbl-amount': 'مبلغ القرض',
					'extra-label': 'دفعة شهرية إضافية',
					'lbl-rate': 'معدل الفائدة السنوي',
					'lbl-term': 'مدة القرض',
					'res-monthly': 'القسط الشهري',
					'freq-monthly': 'شهري',
					'freq-biweekly': 'دفع كل أسبوعين',
					'freq-per-2wk': '/ أسبوعان',
					'res-principal': 'أصل القرض',
					'res-interest': 'إجمالي الفوائد',
					'res-total': 'التكلفة الإجمالية',
					'monthly-note': 'أصل الدين والفائدة فقط، لا يشمل الضرائب والتأمين والرسوم',
					'hero-headline': 'اعرف أرقامك.',
					'hero-subtitle': 'حاسبات مجانية للقروض والمدخرات وإعادة التمويل وأسعار العملات المباشرة.',
					'hero-h1': 'اعرف أرقامك.',
					'hero-stat-currencies': 'عملات',
					'hero-stat-langs': 'لغات',
					'hero-stat-tools': 'أدوات',
					'res-year': 'سنة السداد',
					'lbl-principal-pct': 'الأصل',
					'lbl-interest-pct': 'الفائدة',
					'section-breakdown': 'توزيع المدفوعات',
					'section-amort': 'جدول الأقساط',
					'amort-year': 'السنة',
					'amort-month': 'الشهر',
					'amort-start': 'الرصيد الافتتاحي',
					'amort-ppaid': 'أصل مدفوع',
					'amort-ipaid': 'فائدة مدفوعة',
					'amort-end': 'الرصيد الختامي',
					'btn-show-all': 'عرض كل السنوات',
					'btn-show-all-months': 'عرض كل الأشهر',
					'btn-show-less': 'عرض أقل',
					'amort-gran-yearly': 'سنوياً',
					'amort-gran-monthly': 'شهرياً',
					'section-how': 'كيف يتم حساب أقساط القروض',
					'section-faq': 'الأسئلة الشائعة',
					'ci-h2': 'حاسبة الفائدة المركبة ونمو المدخرات',
					'ci-label-principal': 'الإيداع الأولي',
					'ci-label-monthly': 'الإيداع الشهري',
					'ci-label-rate': 'معدل العائد السنوي',
					'ci-label-years': 'فترة الاستثمار',
					'ci-result-label': 'القيمة المستقبلية',
					'ci-sub': 'إجمالي المحفظة بعد',
					'ci-deposited': 'إجمالي المودع',
					'ci-earned': 'الفوائد المكتسبة',
					'ci-mult': 'مضاعف النمو',
					'ci-year': 'السنة المستهدفة',
					'ci-chart-h': 'النمو سنة بسنة',
					'rf-h2': 'حاسبة إعادة التمويل: كم ستوفر؟',
					'rf-current': 'القرض الحالي',
					'rf-new': 'عرض القرض الجديد',
					'rf-balance': 'الرصيد المتبقي',
					'rf-oldrate': 'معدل الفائدة الحالي',
					'rf-remaining': 'السنوات المتبقية',
					'rf-newrate': 'معدل الفائدة الجديد',
					'rf-costs': 'رسوم الإغلاق',
					'rf-monthly': 'التوفير الشهري',
					'rf-old': 'القسط القديم',
					'rf-new-pay': 'القسط الجديد',
					'rf-breakeven': 'نقطة التعادل',
					'rf-total': 'إجمالي التوفير طوال فترة القرض',
					'cur-h2': 'محول العملات المباشر وسعر الذهب والنفط اليوم',
					'cur-amount-label': 'المبلغ',
					'cur-to-label': 'يُحوَّل إلى',
					'cur-quick': 'مرجع سريع: المبالغ الشائعة',
					'gold-title': 'الذهب (XAU)',
					'gold-sub': 'السعر لكل أوقية',
					'silver-title': 'الفضة (XAG)',
					'silver-sub': 'السعر لكل أوقية',
					'oil-title': 'النفط الخام (WTI)',
					'oil-sub': 'السعر للبرميل',
					'gold-local-lbl': 'السعر بعملتك',
					'oil-local-lbl': 'السعر بعملتك',
					'silver-local-lbl': 'السعر بعملتك',
					'faq-heading': 'أسئلة شائعة حول القروض والمدخرات والعملات والذهب',
					'footer-mortgage': 'حاسبة الرهن العقاري',
					'footer-loan': 'حاسبة القروض',
					'footer-savings': 'حاسبة المدخرات',
					'footer-refinance': 'حاسبة إعادة التمويل',
					'footer-currency': 'محوّل العملات',
					'footer-privacy': 'سياسة الخصوصية',
					'footer-dnsmi': 'عدم بيع معلوماتي الشخصية أو مشاركتها',
					'footer-rights': 'جميع الحقوق محفوظة.',
					'footer-desc': 'حاسبات مالية مجانية: قروض، مدخرات، إعادة تمويل، عملات. لا يلزم حساب.',
					'footer-disclaimer': 'التقديرات المقدمة هنا لأغراض معلوماتية فحسب. لا تُعدّ هذه نصيحة مالية.',
					'unit-years': 'سنة',
					'unit-yr': 'سنة',
					'unit-yrs': 'سنوات',
					'ci-earned-short': 'النمو',
					'cur-rate-lbl': 'السعر',
					'cur-inverse-lbl': 'العكس',
					'cur-updated-lbl': 'محدّث',
					'how-formula-h': 'المعادلة',
					'how-lower-h': 'كيف تخفض قسطك الشهري',
					'formula-m': 'القسط الشهري',
					'formula-p': 'أصل القرض',
					'formula-r': 'المعدل الشهري (السنوي ÷ 12)',
					'formula-n': 'إجمالي الأقساط (السنوات × 12)',
					'tip-1': 'دفعة مقدمة أكبر تقلل أصل القرض مباشرةً: تقليل المبلغ المقترض يعني أقساطاً شهرية أقل وفوائد إجمالية أقل.',
					'tip-2': 'مدة سداد أطول تُوزّع الأقساط على فترة أكبر فيقل القسط الشهري، لكن تزيد الفوائد الإجمالية.',
					'tip-3': 'معدل فائدة أقل له تأثير تراكمي: حتى فارق 0.5% على قرض كبير يُوفّر عشرات الآلاف على مدى القرض.',
					'tip-4': 'تحسين تصنيفك الائتماني قبل التقديم يمنحك معدلات فائدة أفضل. راجع تصنيفك قبل 3-6 أشهر من الاقتراض.',
					'faq-q1': 'كيف يتم حساب القسط الشهري للقرض؟',
					'faq-q2': 'ما هو جدول الأقساط (الإطفاء)؟',
					'faq-q3': 'هل تعمل هذه الحاسبة في جميع الدول؟',
					'faq-q4': 'كيف أقلل إجمالي الفوائد التي أدفعها؟',
					'faq-q5': 'هل LoanCalc مجاني تماماً؟',
					'faq-q6': 'كيف تعمل حاسبة إعادة التمويل؟',
					'faq-q7': 'كيف يتم احتساب سعر الذهب وتحديثه؟',
					'faq-q8': 'ما العملات التي يدعمها المحوّل؟',
					'loan-label-mortgage': 'قرض عقاري بفائدة ثابتة - 30 سنة',
					'loan-label-car': 'قرض سيارة - 5 سنوات',
					'loan-label-personal': 'قرض شخصي - 3 سنوات',
					'loan-label-student': 'قرض طلابي - 10 سنوات',
					'helper-title-mortgage': 'قرض عقاري نموذجي',
					'helper-title-car': 'قرض سيارة نموذجي',
					'helper-title-personal': 'قرض شخصي نموذجي',
					'helper-title-student': 'قرض طلابي نموذجي',
					'helper-text-mortgage': 'معدلات الرهن العقاري تختلف حسب البلد والبنك. أدخل معدلك الفعلي للحصول على نتيجة دقيقة.',
					'helper-text-car': 'معدلات قروض السيارات تختلف حسب البلد والبنك. أدخل المعدل الفعلي الذي عرضه عليك البنك.',
					'helper-text-personal': 'معدلات القروض الشخصية تختلف حسب البنك والتصنيف الائتماني والبلد. أدخل معدلك الفعلي للحصول على نتيجة دقيقة.',
					'helper-text-student': 'معدلات قروض التعليم تختلف حسب البلد والمؤسسة. أدخل معدلك الفعلي أعلاه.',
					'chart-center-lbl': 'الأصل',
					'chart-stat-principal': 'القرض المقترض',
					'chart-stat-interest': 'إجمالي الفوائد المدفوعة',
					'chart-stat-total': 'إجمالي المبلغ المسدد',
					'chart-stat-payoff': 'تاريخ سداد القرض كاملاً',
					'breakdown-sub': 'كيف يتوزع إجمالي التكلفة بين القرض الأصلي والفوائد المدفوعة للمُقرض.',
					'amort-sub': 'توزيع تفصيلي لكل دفعة سنوياً.',
					'ci-section-sub': 'اكتشف كيف تنمو مدخراتك أو استثماراتك سنة بسنة مع الفائدة المركبة.',
					'cur-section-sub': 'حوّل بين العملات الرئيسية بأسعار صرف مباشرة. أسعار الذهب والنفط بعملتك المحلية تلقائياً.',
					'ci-chart-sub': 'الرصيد في نهاية كل سنة، مقسماً بين إيداعاتك ونمو الفائدة المركبة.',
					'per-oz-usd': 'للأوقية بالدولار',
					'per-bbl-usd': 'للبرميل بالدولار',
					'lbl-stocks': 'الأسهم',
					'lbl-tab-currency': 'العملات',
					'lbl-tab-commodities': 'السلع',
					'lbl-tab-stocks': 'الأسهم',
					'age-just-now': 'الآن',
					'age-min-ago': 'منذ {n} دقيقة',
					'age-hours-ago': 'منذ {n} ساعة',
					'lbl-currencies': 'عملة',
					'lbl-rates-from': 'أسعار منذ',
					'lbl-from': 'منذ',
					'nav-faq': 'الأسئلة الشائعة',
					'unit-mo': '/شهر',
					'weight-1g': '1 غ',
					'weight-10g': '10 غ',
					'weight-1kg': '1 كغ',
					'weight-5bbl': '5 براميل',
					'weight-10bbl': '10 براميل',
					'weight-100bbl': '100 برميل',
					'lbl-price-unavailable': 'السعر غير متاح',
					'lbl-updating': 'جارٍ التحديث…',
					'lbl-partial-rates': 'أسعار جزئية',
					'rf-sub': 'شهرياً بالمعدل الجديد',
					'rf-verdict-init': 'أدخل بيانات قرضك لمعرفة ما إذا كانت إعادة التمويل مجدية.',
					'rf-verdict-higher': 'المعدل الجديد ليس أقل: إعادة التمويل ستزيد من قسطك.',
					'rf-verdict-long': 'توفير شهري موجود لكن نقطة التعادل تتجاوز المدة المتبقية. غير موصى به.',
					'rf-verdict-good': 'إعادة التمويل تبدو مجدية.',
					'rf-verdict-summary': 'توفر {monthly} شهرياً وتصل لنقطة التعادل خلال {breakeven}. إجمالي التوفير: {total}.',
					'rf-never': 'لا يتحقق',
					'rf-over-term': '>{n} سنة',
					'rf-months': '{n} شهر',
					'rf-years-mo': '{y}س {m}ش',
					'loan-desc': 'استخدم هذه الحاسبة المجانية لمعرفة قسطك الشهري لأي قرض عقاري أو سيارة أو شخصي أو طلابي. أدخل مبلغ القرض ومعدل الفائدة السنوي ومدة السداد للحصول فوراً على القسط الشهري وإجمالي الفوائد وجدول الأقساط الكامل. المعادلة المستخدمة هي صيغة الإطفاء القياسية وتعمل مع أي عملة وأي دولة حول العالم.',
					'ci-desc': 'تُظهر حاسبة الفائدة المركبة كيف يتضاعف الإيداع الأولي مع الوقت عند احتساب الفائدة على الأصل المتراكم. أدخل المبلغ الأولي والمساهمة الشهرية ومعدل العائد وفترة الاستثمار لترى القيمة المستقبلية لمدخراتك.',
					'ci-helper-title': 'المتوسط التاريخي لمؤشر S&P 500',
					'ci-helper-text': 'حقق سوق الأسهم الأمريكي عوائد تقارب 7% سنوياً بعد التضخم على المدى الطويل. استخدم 7% كمعدل واقعي لصناديق المؤشرات المتنوعة.',
					'rf-desc': 'تساعدك حاسبة إعادة التمويل على معرفة ما إذا كان يستحق إعادة تمويل قرضك بمعدل فائدة أقل. أدخل الرصيد الحالي والمعدل الجديد ورسوم الإغلاق لتحصل على التوفير الشهري ونقطة التعادل وإجمالي التوفير.',
					'cur-desc': 'يدعم محول عملات LoanCalc 161 عملة عالمية بأسعار صرف مباشرة محدثة كل 24 ساعة. كما يعرض سعر الذهب (XAU) والنفط الخام (WTI) بعملتك المحلية تلقائياً في الوقت الفعلي.',
					'how-p1': 'كل قرض ذو فائدة ثابتة يستخدم نفس معادلة الإطفاء القياسية. تغطي الأقساط المتساوية كلاً من الفائدة على الرصيد المتبقي وجزءاً من أصل القرض.',
					'how-p2': 'ثلاثة عوامل تتحكم في قسطك الشهري. تعديل أي منها يغير الدفعة الشهرية فوراً.',
					'faq-q9': 'ما أسعار الأسهم التي يعرضها LoanCalc؟',
					'seo-mort-h2': 'آلة حاسبة للرهن العقاري: كل ما تحتاج إلى معرفته',
					'seo-mort-h3-1': 'ما هي آلة حاسبة الرهن العقاري ومن يجب أن يستخدمها؟',
					'seo-mort-p1': 'آلة حاسبة الرهن العقاري هي أداة مالية تحسب قسطك الشهري على قرض السكن بناءً على ثلاثة مدخلات: مبلغ القرض (الأصل)، ومعدل الفائدة السنوي، ومدة القرض بالسنوات. يجب على أي شخص يفكر في شراء منزل، أو يقارن عروض القروض، أو يحاول فهم التكلفة الطويلة الأجل للاقتراض، استخدامها قبل توقيع اتفاقية الرهن العقاري.',
					'seo-mort-p2': 'يستخدم المشترون لأول مرة آلات حاسبة الرهن العقاري للتحقق من القدرة على التحمل قبل البحث عن منزل. يستخدمها أصحاب المنازل الحاليون لاستكشاف سيناريوهات إعادة التمويل أو نمذجة تأثير المدفوعات الإضافية. يستخدمها المستثمرون العقاريون لتقدير التدفق النقدي للعقارات المؤجرة. تعمل الآلة الحاسبة بالتساوي لجميع الرهون العقارية ذات السعر الثابت في جميع أنحاء العالم — سواء كنت تقترض بالدولار أو اليورو أو الجنيه الاسترليني أو أي عملة أخرى.',
					'seo-mort-h3-2': 'كيف تعمل صيغة الدفع الشهري',
					'seo-mort-p3': 'كل رهن عقاري بسعر ثابت يستخدم نفس صيغة الإطفاء القياسية:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'حيث <strong>M</strong> هو الدفع الشهري، <strong>P</strong> هو مبلغ القرض الأصلي، <strong>r</strong> هو معدل الفائدة الشهري (المعدل السنوي ÷ 12)، و<strong>n</strong> هو إجمالي عدد المدفوعات الشهرية (السنوات × 12). تنتج هذه الصيغة مبلغاً شهرياً ثابتاً يغطي كلاً من الفائدة على الرصيد المتبقي وجزءاً من الأصل، مع تغير النسبة بمرور الوقت. في السنوات الأولى، يذهب معظم كل دفعة إلى الفائدة. أما في السنوات الأخيرة، فمعظمها يقلل من الأصل.',
					'seo-mort-h3-3': 'ما الذي يؤثر على معدل الرهن العقاري الخاص بك؟',
					'seo-mort-p6': 'يعتمد معدل الرهن العقاري الفعلي على عدة عوامل يقيّمها المقرضون عند الموافقة على طلبك:',
					'seo-mort-li-1': '<strong>درجة الائتمان:</strong> يحصل المقترضون الذين تتجاوز درجاتهم 760 عادةً على أدنى المعدلات المتاحة. كل انخفاض بمقدار 20 نقطة في درجة الائتمان يمكن أن يزيد معدلك بمقدار 0.1–0.5%، مما يضيف آلاف الدولارات إلى إجمالي الفائدة على مدى 30 عاماً.',
					'seo-mort-li-2': '<strong>نسبة القرض إلى القيمة (LTV):</strong> تشير نسبة LTV الأقل (دفعة أولى أكبر) إلى مخاطر أقل للمقرض. دفع 20% أو أكثر يُلغي عادةً تأمين الرهن العقاري الخاص (PMI) وقد يؤهلك للحصول على معدل أفضل.',
					'seo-mort-li-3': '<strong>نوع القرض:</strong> تحمل القروض المطابقة (ضمن حدود Fannie Mae/Freddie Mac) عادةً معدلات أقل من القروض الكبيرة (jumbo). للقروض المدعومة حكومياً (FHA، VA، USDA) هياكل معدلاتها الخاصة.',
					'seo-mort-li-4': '<strong>مدة القرض:</strong> تحمل الرهون العقارية لمدة 15 عاماً معدلات فائدة أقل من تلك البالغة 30 عاماً لأن أموال المقرض تكون في خطر لفترة أقصر.',
					'seo-mort-li-5': '<strong>ظروف السوق:</strong> تتأثر معدلات الرهن العقاري بشكل كبير بعائد سندات الخزانة لمدة 10 سنوات وسياسة الاحتياطي الفيدرالي. عندما يرفع بنك الاحتياطي الفيدرالي المعدلات لمكافحة التضخم، ترتفع معدلات الرهن العقاري بالتوازي.',
					'seo-mort-h3-4': 'الرهن العقاري لـ15 عاماً مقابل 30 عاماً: المقايضة الحقيقية',
					'seo-mort-p12': 'الاختيار بين الرهن العقاري لـ15 و30 عاماً هو في جوهره مقايضة بين التدفق النقدي الشهري وإجمالي الفائدة المدفوعة. إليك مثال لقرض بقيمة 300,000 دولار:',
					'seo-mort-th-loan': 'القرض',
					'seo-mort-th-rate': 'المعدل',
					'seo-mort-p13': 'عند 6.5%، يكلف الرهن العقاري لـ30 عاماً 382,633 دولاراً كإجمالي فائدة مقارنة بـ170,453 دولاراً للرهن لـ15 عاماً — فرق يزيد عن 212,000 دولار. ومع ذلك، فإن الدفع الشهري للرهن لـ30 عاماً أقل بـ718 دولاراً، وهو أمر مهم إذا كان التدفق النقدي ضيقاً أو كنت تريد استثمار الفارق.',
					'seo-mort-h3-5': 'ما هو PMI ومتى يُطبَّق؟',
					'seo-mort-p14': 'يُطلب تأمين الرهن العقاري الخاص (PMI) من قِبَل معظم المقرضين الأمريكيين عندما تكون دفعتك الأولى أقل من 20% من سعر الشراء. يحمي PMI المقرض في حال تخلفك عن السداد. التكلفة المعتادة هي 0.5–1.5% من مبلغ القرض سنوياً، تُضاف إلى دفعتك الشهرية. على قرض بقيمة 300,000 دولار، يمكن أن يضيف PMI ما بين 125 و375 دولاراً شهرياً. بمجرد أن تصل حصتك في الملكية إلى 20% (سواء عبر المدفوعات أو ارتفاع قيمة المنزل)، يمكنك عادةً طلب إلغاء PMI. يجب على المقرضين إلغاء PMI تلقائياً عندما يصل رصيد قرضك إلى 78% من سعر الشراء الأصلي.',
					'seo-mort-h3-6': 'كيف تسدد رهنك العقاري بشكل أسرع',
					'seo-mort-li-6': '<strong>قُم بدفعة إضافية واحدة في السنة:</strong> في الرهن العقاري لـ30 عاماً، يؤدي دفع قسط شهري إضافي واحد سنوياً إلى تقليص مدة القرض بما يقارب 4–5 سنوات، مما يوفر عشرات الآلاف من الدولارات في الفوائد.',
					'seo-mort-li-7': '<strong>انتقل إلى مدفوعات أسبوعية مزدوجة:</strong> بدلاً من 12 دفعة شهرية، ادفع 26 نصف دفعة في السنة. يُفضي ذلك إلى دفعة كاملة إضافية سنوياً دون أن تشعر بتأثير ملحوظ على التدفق النقدي.',
					'seo-mort-li-8': '<strong>قرِّب دفعتك للأعلى:</strong> إذا كانت دفعتك 1,847 دولاراً، فإن دفع 1,900 أو 2,000 دولار شهرياً يُوجِّه المبلغ الإضافي بالكامل نحو سداد الأصل، مما يُسرِّع الإطفاء.',
					'seo-mort-li-9': '<strong>وظِّف المبالغ غير المتوقعة:</strong> يمكن لاسترداد الضرائب والمكافآت والإرث التي تُطبَّق كمدفوعات إجمالية على الأصل أن تُقلِّص سنوات عديدة من مدة رهنك العقاري.',
					'seo-mort-p15': 'مفيد أيضاً: <a href="/refinance-calculator/">آلة حاسبة إعادة التمويل</a> — تحقق مما إذا كان معدل أقل منطقياً لرهنك العقاري الحالي. أو استكشف <a href="/loan-calculator/">أنواع القروض الأخرى</a> بما فيها قروض السيارات والقروض الشخصية وقروض الطلاب.',
					'seo-ci-h2': 'الفائدة المركبة والمدخرات: الدليل الشامل',
					'seo-ci-h3-1': 'ما هي الفائدة المركبة ولماذا تهمّ؟',
					'seo-ci-h3-2': 'الفوائد اليومية مقابل الشهرية مقابل السنوية — كيف تؤثر على النمو',
					'seo-ci-h3-3': 'قاعدة 72 موضحة',
					'seo-ci-h3-4': 'تكلفة الانتظار: البدء في سن 25 مقابل 35 مقابل 45',
					'seo-ci-h3-5': 'حسابات التوفير عالية العائد مقابل صناديق المؤشرات: المعدلات النموذجية',
					'seo-ci-p1': 'الفائدة المركبة هي فائدة تُحسَب على أساس رأس المال الأصلي والفوائد المتراكمة من جميع الفترات السابقة. وهذا يختلف جوهرياً عن الفائدة البسيطة التي تُحسَب دائماً على رأس المال الأصلي فقط. وكثيراً ما يُنسَب إلى ألبرت أينشتاين قوله إن الفائدة المركبة هي "الأعجوبة الثامنة في العالم. من يفهمها يربح منها، ومن لا يفهمها يدفعها."',
					'seo-ci-p2': 'يكمن سر قوة الفائدة المركبة في النمو الأسي. في السنوات الأولى يكون التأثير خفياً، لكن على مدى 20 أو 30 أو 40 عاماً يصبح التأثير التراكمي استثنائياً — إذ يأتي الجزء الأكبر من ثروتك النهائية ليس من مساهماتك بل من الفائدة المكتسبة على الفائدة المكتسبة على الفائدة.',
					'seo-ci-p3': 'تحدد وتيرة التراكم عدد مرات احتساب الفائدة وإضافتها إلى الرصيد. كلما زادت وتيرة التراكم زادت العوائد قليلاً:',
					'seo-ci-p4': 'بالنسبة لحسابات التوفير وصناديق سوق المال، يُعدّ التراكم الشهري هو المعيار السائد. أما حسابات التوفير عالية العائد في البنوك الإلكترونية فتتراكم عادةً يومياً. الفرق بين التراكم الشهري واليومي ضئيل — فمعدل الفائدة نفسه أهم بكثير من وتيرة التراكم.',
					'seo-ci-p5': 'قاعدة 72 هي اختصار حسابي بسيط في الذهن: اقسم 72 على معدل العائد السنوي لتقدير عدد السنوات اللازمة لمضاعفة قيمة استثمارك.',
					'seo-ci-p6': 'تعمل القاعدة أيضاً في الاتجاه المعاكس: إذا أردت مضاعفة أموالك في 8 سنوات، فأنت بحاجة إلى معدل لا يقل عن 72 ÷ 8 = 9% سنوياً.',
					'seo-ci-p7': 'أقوى عامل في الادخار هو الوقت. تخيّل استثمار 200 دولار شهرياً بعائد سنوي 7% دون أي وديعة أولية:',
					'seo-ci-p8': 'البدء في سن 25 بدلاً من 35 يُكلّفك 24,000 دولار إضافية فقط في المساهمات، لكنه يُولّد ثروة إضافية قدرها 285,000 دولار — أي عائداً بمقدار 12 ضعفاً على تلك الـ24,000 دولار الإضافية. الرسالة واضحة: ابدأ مبكراً حتى بمبالغ صغيرة.',
					'seo-ci-p9': 'ينبغي أن يعكس معدل العائد الذي تختاره في هذه الآلة الحاسبة المكان الذي ستحتفظ فيه فعلياً بمدخراتك:',
					'seo-ci-p10': 'انظر أيضاً: <a href="/refinance-calculator/">آلة حاسبة إعادة التمويل</a> — الفائدة التي توفرها من خلال إعادة تمويل الرهن العقاري يمكن توجيهها نحو المدخرات.',
					'seo-ci-li-1': '<strong>التراكم السنوي:</strong> تُضاف الفائدة مرة واحدة في السنة. المعدل الأساسي.',
					'seo-ci-li-2': '<strong>التراكم الشهري:</strong> تُضاف الفائدة 12 مرة في السنة. معدل سنوي 6% مركّب شهرياً يعادل معدلاً سنوياً فعلياً قدره 6.168%.',
					'seo-ci-li-3': '<strong>التراكم اليومي:</strong> تُضاف الفائدة 365 مرة في السنة. معدل 6% مركّب يومياً يعطي معدلاً فعلياً قدره 6.183%. أفضل قليلاً من الشهري.',
					'seo-ci-li-4': 'عند 4% (توفير عالي العائد): 72 ÷ 4 = <strong>18 سنة</strong> للمضاعفة',
					'seo-ci-li-5': 'عند 7% (متوسط سوق الأسهم): 72 ÷ 7 = <strong>10.3 سنة</strong> للمضاعفة',
					'seo-ci-li-6': 'عند 10% (نمو مرتفع): 72 ÷ 10 = <strong>7.2 سنة</strong> للمضاعفة',
					'seo-ci-li-7': 'عند 12% (عوائد رأس المال المغامر): 72 ÷ 12 = <strong>6 سنوات</strong> للمضاعفة',
					'seo-ci-li-8': '<strong>حساب توفير تقليدي:</strong> 0.01–0.5% عائد سنوي. يفقد قيمته فعلياً أمام التضخم. مناسب فقط لصناديق الطوارئ التي تحتاج إلى الوصول إليها فوراً.',
					'seo-ci-li-9': '<strong>حساب توفير عالي العائد (بنوك إلكترونية):</strong> 4–5% عائد سنوي في بيئة معدلات مرتفعة. مؤمَّن من المؤسسة الفيدرالية لتأمين الودائع. ممتاز لصناديق الطوارئ والأهداف قصيرة المدى (1–3 سنوات).',
					'seo-ci-li-10': '<strong>حسابات سوق المال:</strong> 4–5% عائد سنوي. مشابهة لحسابات التوفير عالية العائد مع اختلافات طفيفة في شروط الوصول.',
					'seo-ci-li-11': '<strong>شهادات الإيداع:</strong> 4–5.5% عائد سنوي مع إغلاق من 6 أشهر إلى 5 سنوات. معدلات أعلى للفترات الأطول.',
					'seo-ci-li-12': '<strong>صندوق مؤشر S&amp;P 500:</strong> عائد اسمي متوسط ~10% (7% بعد التضخم) تاريخياً. غير مضمون. الأفضل للأهداف التي تمتد 5 سنوات أو أكثر. يخضع لتقلبات السوق.',
					'seo-ci-li-13': '<strong>صندوق سوق السندات الإجمالي:</strong> 3–5% تاريخياً. تقلبات أقل من الأسهم. مناسب للأهداف متوسطة المدى.',
					'seo-ci-th-start': 'سن البدء',
					'seo-ci-th-end': 'سن الانتهاء',
					'seo-ci-th-years': 'سنوات الاستثمار',
					'seo-ci-th-contributed': 'إجمالي المساهمات',
					'seo-ci-th-final': 'القيمة النهائية',
					'seo-ci-th-interest': 'الفائدة المكتسبة',
					'seo-rf-h2': 'إعادة تمويل الرهن العقاري: متى يكون منطقياً',
					'seo-rf-h3-1': 'متى يكون إعادة التمويل منطقياً من الناحية المالية',
					'seo-rf-h3-2': 'كيفية حساب نقطة التعادل',
					'seo-rf-h3-3': 'إعادة التمويل بسحب نقدي مقابل إعادة التمويل بتغيير المعدل والأجل',
					'seo-rf-h3-4': 'التكاليف الخفية لإعادة التمويل',
					'seo-rf-h3-5': 'متى لا تُعيد التمويل',
					'seo-rf-p1': 'تعني إعادة التمويل استبدال قرضك الحالي بقرض جديد، يُفضَّل أن يكون بسعر فائدة أقل. يتلخص القرار في سؤال جوهري واحد: هل ستتجاوز المدخرات طويلة الأجل التكاليف الأولية، وهل ستبقى في القرض مدة كافية لاسترداد تلك التكاليف؟ إعادة التمويل أكثر منطقية عندما:',
					'seo-rf-p2': 'حساب نقطة التعادل بسيط: اقسم إجمالي تكاليف الإغلاق على مدخراتك الشهرية.',
					'seo-rf-formula': '<strong>أشهر التعادل = تكاليف الإغلاق ÷ الوفورات الشهرية في الدفعة</strong>',
					'seo-rf-p3': 'مثال: إذا كانت إعادة التمويل تُكلِّف 4,500 دولار في رسوم الإغلاق وتُوفِّر لك 200 دولار شهرياً، فإن نقطة التعادل هي 4,500 ÷ 200 = 22.5 شهراً — أي ما يقارب عامين. إذا كنت تخطط للبقاء في منزلك لمدة 3–5 سنوات على الأقل، فهذه إعادة التمويل تمثل منطقاً مالياً واضحاً. أما إذا كنت تخطط للانتقال في غضون 18 شهراً، فلا.',
					'seo-rf-p4': 'ثمة نوعان رئيسيان لإعادة تمويل الرهن العقاري:',
					'seo-rf-p5': 'التكلفة الحقيقية لإعادة التمويل تتجاوز رسوم الإغلاق المعلنة. تشمل الرسوم الشائعة:',
					'seo-rf-p6': 'تبلغ تكاليف الإغلاق الإجمالية لإعادة التمويل النموذجية 2–3% من مبلغ القرض. على قرض بقيمة 300,000 دولار، توقع تكاليف بين 6,000 و9,000 دولار ما لم تختر إعادة تمويل "بدون تكاليف إغلاق" (حيث تُضاف التكاليف إلى المعدل بدلاً من ذلك).',
					'seo-rf-p7': 'انظر أيضاً: <a href="/loan-calculator/">آلة حاسبة الرهن العقاري</a> — نمذج رهنك العقاري الأصلي أو قارن خيارات القرض قبل اتخاذ قرار إعادة التمويل.',
					'seo-rf-li-1': 'معدلك الجديد أقل بنسبة 0.5–1% على الأقل من معدلك الحالي',
					'seo-rf-li-2': 'تخطط للبقاء في المنزل لفترة أطول من فترة التعادل',
					'seo-rf-li-3': 'تحسّن تصنيفك الائتماني بشكل ملحوظ منذ قرضك الأصلي',
					'seo-rf-li-4': 'ترغب في التحول من رهن عقاري بمعدل متغير إلى معدل ثابت لضمان الاستقرار',
					'seo-rf-li-5': 'ترغب في تقصير مدة قرضك (مثلاً من 30 إلى 15 سنة) وبإمكانك تحمّل دفعات شهرية أعلى',
					'seo-rf-li-6': '<strong>إعادة التمويل بتغيير المعدل والأجل:</strong> تستبدل رهنك العقاري الحالي بآخر بمعدل أفضل و/أو أجل مختلف دون تغيير رصيد القرض. هذا هو النوع الأكثر شيوعاً وما تُنمذجه هذه الآلة الحاسبة. الهدف هو تقليل تكلفة الفائدة بحتة.',
					'seo-rf-li-7': '<strong>إعادة التمويل بسحب نقدي:</strong> تقترض أكثر من رصيد قرضك الحالي وتحصل على الفرق نقداً. مثلاً، إذا كانت قيمة منزلك 400,000 دولار وعليك 250,000 دولار، يمكنك إعادة التمويل بمبلغ 320,000 دولار وأخذ 70,000 دولار نقداً لتحسينات المنزل أو توحيد الديون أو أغراض أخرى. تُعيد إعادة التمويل بسحب نقدي تصفير حقوق ملكيتك وعادةً تحمل معدلاً أعلى قليلاً من إعادة تمويل المعدل والأجل.',
					'seo-rf-li-8': '<strong>رسوم الإنشاء:</strong> 0.5–1% من مبلغ القرض. رسوم المُقرض لمعالجة القرض الجديد.',
					'seo-rf-li-9': '<strong>رسوم التقييم:</strong> 300–600 دولار. يطلب معظم المُقرضين تقييماً جديداً لتأكيد القيمة الحالية لمنزلك.',
					'seo-rf-li-10': '<strong>تأمين الملكية:</strong> 500–1,500 دولار. مطلوب لحماية المُقرض من نزاعات الملكية.',
					'seo-rf-li-11': '<strong>رسوم التسجيل:</strong> 25–250 دولار. رسوم حكومية لتسجيل الرهن العقاري الجديد.',
					'seo-rf-li-12': '<strong>نقاط الخصم:</strong> فائدة مدفوعة مسبقاً اختيارية لـ"تخفيض" معدلك. نقطة واحدة = 1% من مبلغ القرض = تخفيض نموذجي بنسبة 0.25% في المعدل.',
					'seo-rf-li-13': '<strong>ستنتقل قريباً:</strong> إذا كنت ستبيع المنزل قبل الوصول إلى نقطة التعادل، فإن إعادة التمويل تُكلِّف أكثر مما توفر.',
					'seo-rf-li-14': '<strong>غرامات السداد المبكر:</strong> تفرض بعض القروض رسوماً على السداد المبكر. تحقق من شروط قرضك الحالي قبل إعادة التمويل.',
					'seo-rf-li-15': '<strong>سددت معظم القرض:</strong> إعادة الضبط إلى أجل جديد مدته 30 عاماً على قرض مضى عليه 20 عاماً يمدد ديونك بشكل كبير، حتى لو كان المعدل أقل.',
					'seo-rf-li-16': '<strong>انخفض تصنيفك الائتماني:</strong> إذا تدهور ائتمانك منذ رهنك العقاري الأصلي، فقد لا تستوفي شروط الحصول على معدل أفضل وقد تحصل فعلياً على معدل أعلى.',
					'seo-cur-h2': 'صرف العملات والذهب والنفط وأسعار الأسهم: كيف تعمل الأسعار الحية',
					'seo-cur-h3-1': 'كيف تعمل أسعار الصرف الحية',
					'seo-cur-p1': 'تتحدد أسعار صرف العملات في سوق الفوركس (العملات الأجنبية)، أكبر سوق مالي في العالم بحجم تداول يومي يتجاوز 7 تريليون دولار. السعر "الحي" الذي تراه على هذا الموقع هو سعر منتصف السوق (المعروف أيضاً بسعر ما بين البنوك أو السعر الفوري)، وهو نقطة المنتصف بين أسعار الشراء والبيع التي تستخدمها البنوك عند تداول كميات كبيرة مع بعضها البعض.',
					'seo-cur-p2': 'الأسعار المعروضة هنا مصدرها Frankfurter API، الذي يجمع بياناته من البنك المركزي الأوروبي ومصادر مالية أخرى. يتم تحديثها يومياً وتخزينها مؤقتاً لتحسين الأداء. للأسعار الفورية بدقة الميلي ثانية، يستخدم المتداولون المؤسسيون منصات فوركس متخصصة — لكن لأغراض التخطيط للسفر والتحويلات الدولية والمرجعية العامة، هذه الأسعار دقيقة بفارق لا يكاد يُذكر.',
					'seo-cur-h3-2': 'ما الذي يؤثر على أسعار صرف العملات',
					'seo-cur-p3': 'تتغير أسعار الصرف باستمرار بناءً على مزيج معقد من العوامل الاقتصادية والسياسية:',
					'seo-cur-li-1': '<strong>فوارق أسعار الفائدة:</strong> عندما يرفع البنك المركزي أسعار الفائدة، تميل عملته إلى التقوية لأن المعدلات المرتفعة تجذب رأس المال الأجنبي الباحث عن عوائد أفضل. كثيراً ما تحرك قرارات الاحتياطي الفيدرالي الأمريكي أسعار الصرف عالمياً.',
					'seo-cur-li-2': '<strong>التضخم:</strong> يؤدي ارتفاع التضخم إلى تآكل القوة الشرائية للعملة بمرور الوقت. تميل الدول ذات التضخم المنخفض والمستقر إلى امتلاك عملات أقوى. يُراقَب زوج EUR/USD عن كثب لرصد فوارق التضخم بين الولايات المتحدة ومنطقة اليورو.',
					'seo-cur-li-3': '<strong>الميزان التجاري:</strong> الدول التي تصدر أكثر مما تستورد (فائض تجاري) تشهد طلباً أعلى على عملتها مما يرفع قيمتها. الدول ذات العجز التجاري المستمر قد تشهد ضعفاً في عملتها على المدى البعيد.',
					'seo-cur-li-4': '<strong>الاستقرار السياسي:</strong> يمكن أن يتسبب عدم اليقين السياسي والانتخابات والصراعات الجيوسياسية في تحركات حادة للعملات. كثيراً ما تتقوى عملات الملاذ الآمن كالدولار والفرنك السويسري والين الياباني في أوقات الأزمات العالمية.',
					'seo-cur-li-5': '<strong>نمو الناتج المحلي الإجمالي:</strong> يزيد النمو الاقتصادي القوي من الطلب على العملة مع توجه المستثمرين لضخ رأس المال في ذلك الاقتصاد.',
					'seo-cur-h3-3': 'سعر منتصف السوق مقابل سعر البنك: لماذا هناك فارق',
					'seo-cur-p4': 'السعر الذي تراه في هذا المحوّل هو سعر منتصف السوق — نقطة المنتصف النظرية بين سعري الشراء والبيع. عند تحويل الأموال عبر بنك أو بطاقة ائتمانية أو خدمة تحويل مالي فعلياً، ستحصل على سعر أسوأ. يُسمى الفرق بـ"الفارق"، وهو الطريقة التي تحقق بها شركات صرف العملات أرباحها.',
					'seo-cur-li-6': '<strong>البنوك وكشك المطارات:</strong> تتقاضى عادةً 3–10% فوق سعر منتصف السوق. الأسوأ للمبالغ الصغيرة ومواقع السياحة.',
					'seo-cur-li-7': '<strong>بطاقات الائتمان:</strong> تفرض عادةً 1–3% كرسوم معاملات أجنبية. كثيراً ما تكون الخيار الأفضل للمشتريات في الخارج، خاصةً البطاقات التي لا تفرض رسوم معاملات أجنبية.',
					'seo-cur-li-8': '<strong>خدمات التحويل المتخصصة (Wise، Revolut):</strong> تتقاضى 0.3–1% فوق سعر منتصف السوق. الأفضل للتحويلات الدولية الكبيرة.',
					'seo-cur-p5': 'لحساب ما ستحصل عليه فعلياً: خذ سعر منتصف السوق واطرح منه نسبة الفارق لدى المزود. إذا رأيت 1 دولار = 0.92 يورو في منتصف السوق وبنكك يتقاضى 3%، فستحصل تقريباً على 0.92 × (1 - 0.03) = 0.892 يورو لكل دولار.',
					'seo-cur-h3-4': 'الذهب كتحوط للعملة: كيف يُسعَّر XAU',
					'seo-cur-p6': 'يُسعَّر الذهب (رمز XAU) بالدولار الأمريكي لكل أونصة ترويسية في الأسواق الدولية. الأونصة الترويسية هي الوحدة القياسية للمعادن الثمينة وتعادل تقريباً 31.1 جرام (أثقل قليلاً من الأونصة الاعتيادية البالغة 28.35 جرام). أونصة ترويسية واحدة = 31.1035 جرام بالضبط.',
					'seo-cur-p7': 'يعمل الذهب كتحوط ضد انخفاض قيمة العملة والتضخم. حين يضعف الدولار الأمريكي أو يرتفع التضخم، كثيراً ما ترتفع أسعار الذهب — ليس لأن الذهب نفسه يتغير، بل لأن المزيد من الدولارات أصبح ضرورياً لشراء نفس الوزن من الذهب. حافظ الذهب على قوته الشرائية عبر القرون بينما تآكلت العملات الفردية. سعر الذهب على هذا الموقع مستقى من بيانات السوق عبر Yahoo Finance، يتجدد كل ساعة.',
					'seo-cur-p8': 'تتأثر تحركات أسعار الذهب بـ: احتياطيات البنوك المركزية من الذهب، وقوة الدولار الأمريكي، وأسعار الفائدة الحقيقية (تزداد جاذبية الذهب حين تكون المعدلات الحقيقية منخفضة أو سالبة)، والمخاطر الجيوسياسية، والطلب على المجوهرات والاستخدامات الصناعية.',
					'seo-cur-h3-5': 'النفط الخام WTI: لماذا يُسعَّر بالدولار وما الذي يحرك سعره',
					'seo-cur-p9': 'يُعدّ نفط غرب تكساس الوسيط (WTI) المعيار الرئيسي للنفط الخام في أمريكا الشمالية ومرجعاً سعرياً عالمياً مهماً. يُسعَّر بالدولار الأمريكي للبرميل (1 برميل = 42 غالوناً أمريكياً = تقريباً 159 لتراً). يُسعَّر النفط بالدولار منذ اتفاقية البترودولار في السبعينيات، مما يخلق طلباً عالمياً على الدولار إذ تحتاج جميع الدول المستوردة للنفط دولارات لدفع ثمنه.',
					'seo-cur-p10': 'العوامل الرئيسية المحركة لأسعار النفط:',
					'seo-cur-li-9': '<strong>قرارات إنتاج أوبك+:</strong> تتحكم كارتيل أوبك والمنتجون المتحالفون (روسيا وغيرها) في نحو 40% من الإمدادات العالمية. تخفيضات الإنتاج ترفع الأسعار، والزيادات تخفضها.',
					'seo-cur-li-10': '<strong>إنتاج النفط الصخري الأمريكي:</strong> أصبحت الولايات المتحدة أكبر منتج للنفط في العالم جزئياً بفضل تقنية النفط الصخري. الإنتاج الأمريكي المرتفع ينافس أوبك ويمكن أن يحدّ من الارتفاعات السعرية.',
					'seo-cur-li-11': '<strong>الطلب العالمي:</strong> النمو الاقتصادي في الصين والهند (المستهلكان الضخمان للنفط) محرك رئيسي للطلب. تؤدي حالات الركود إلى تراجع الطلب وانخفاض الأسعار.',
					'seo-cur-li-12': '<strong>الأحداث الجيوسياسية:</strong> النزاعات في مناطق إنتاج النفط (الشرق الأوسط، روسيا) تخلق علاوات مخاطر إمداد ترفع الأسعار.',
					'seo-cur-li-13': '<strong>قوة الدولار:</strong> بما أن النفط يُسعَّر بالدولار، فإن ارتفاع قيمة الدولار يجعل النفط أكثر تكلفةً للمشترين من غير الأمريكيين، مما يخفف الطلب ويضغط الأسعار نحو الانخفاض.',
					'seo-cur-h3-6': 'أسعار الأسهم الحية: كبرى الأسهم الأمريكية تُحدَّث كل ساعة',
					'seo-cur-p11': 'يعرض LoanCalc أسعاراً حية لعشرة أسهم وصناديق أمريكية واسعة المتابعة: أبل (AAPL)، مايكروسوفت (MSFT)، ألفابت (GOOGL)، أمازون (AMZN)، ميتا (META)، إنفيديا (NVDA)، تسلا (TSLA)، JPMorgan Chase (JPM)، بيركشاير هاثاواي ب (BRK.B)، وصندوق SPDR S&P 500 ETF Trust (SPY). تُستقى الأسعار من Yahoo Finance وتُحدَّث كل ساعة — نفس فترة تحديث بيانات الذهب والنفط.',
					'seo-cur-p12': 'تعرض كل شريحة سهم السعر الحالي بالدولار الأمريكي، ونسبة التغيير من الإغلاق السابق (سهم أخضر للارتفاع وأحمر للانخفاض)، والقيمة المعادلة بعملتك المحلية باستخدام سعر الصرف الحي. هذا يجعل متابعة قيمة محافظ الأسهم الأمريكية من أي مكان في العالم أمراً سهلاً دون الحاجة للتنقل بين التطبيقات.',
					'seo-cur-p13': 'يُضمَّن صندوق S&amp;P 500 ETF (SPY) كمعيار واسع للسوق: حين يرتفع SPY، يكون السوق الأمريكي عموماً في صعود. الأسهم الفردية كـNVDA وTSLA تحمل تقلبات أعلى. استخدم <a href="/savings-calculator/">حاسبة المدخرات</a> بعائد سنوي 7–10% لنمذجة نمو S&amp;P 500 على المدى البعيد.',
					'seo-cur-p14': 'انظر أيضاً: <a href="/savings-calculator/">حاسبة المدخرات</a> — نمذجة نمو عوائد العملات أو الاستثمارات المرتبطة بالسلع على مر الزمن.',
					'lbl-market-prices': 'أسعار السوق',
					'cur-rate-unavailable': 'السعر غير متاح',
					'cur-not-in-feed': 'غير متاح في البيانات الحية',
					'cur-today': 'اليوم',
					'cur-status-fetching': 'جارٍ جلب أسعار الصرف…',
					'cur-status-live': 'أسعار حية · {date} · 161 عملة · تحديث كل 24 ساعة',
					'cur-status-partial': 'تم تحميل الأسعار · {date} (33 عملة)',
					'cur-status-offline': 'أسعار غير متصلة: عملات محدودة متاحة',
					'cmd-fetching': 'جارٍ الجلب…',
					'cmd-live': 'حي · {date}',
					'cmd-approx': 'تقريبي · راجع البيانات الحية',
					'cur-status-cached': 'أسعار من {date} · مخزنة مؤقتاً · تحديث كل 24 ساعة',
					'clamp-min': 'الحد الأدنى:',
					'clamp-max': 'الحد الأقصى:'
				},
				fr: {
					'nav-loans': 'Prêts',
					'nav-savings': 'Épargne',
					'nav-refinance': 'Refinancement',
					'nav-currency': 'Devises',
					'btn-settings': 'Paramètres',
					'pref-title': 'Préférences',
					'pref-language': "Langue d'affichage",
					'pref-lang-note': 'Modifie les libellés et le formatage.',
					'pref-currency': 'Devise préférée',
					'pref-currency-note': 'Devise par défaut pour le convertisseur.',
					'pref-current': 'Paramètres actuels',
					'pref-save': 'Enregistrer',
					'toast-saved': 'Préférences enregistrées',
					'pref-cancel': 'Annuler',
					'ci-sub-desc': 'Voyez comment votre épargne croît année par année.',
					'tab-mortgage': 'Immobilier',
					'tab-car': 'Auto',
					'tab-personal': 'Personnel',
					'tab-student': 'Études',
					'tab-afford': 'Capacité',
					'afford-pmt-label': 'Mensualité que je peux me permettre',
					'afford-result-label': "Vous pourriez emprunter jusqu'à",
					'afford-sub': "estimation de capacité d'emprunt",
					'hero-sub': "Calculateur de prêts, intérêts composés, économies de refinancement, convertisseur de devises en direct, prix de l'or, du pétrole et cours boursiers en direct : tout gratuit, instantané, sans inscription.",
					'trust-1': 'Toujours gratuit',
					'trust-2': 'Sans inscription',
					'trust-3': 'Fonctionne partout',
					'cur-amount-label': 'Montant',
					'cur-to-label': 'Converti en',
					'cur-quick': 'Référence rapide',
					'gold-per': 'par once troy',
					'gold-local': 'Prix dans votre devise',
					'oil-per': 'par baril',
					'oil-local': 'Prix dans votre devise',
					'faq-heading': "Questions fréquentes sur les prêts, l'épargne et les devises",
					'chart-center-lbl': 'capital',
					'chart-stat-principal': 'Capital emprunté',
					'chart-stat-interest': 'Total des intérêts payés',
					'chart-stat-total': 'Montant total remboursé',
					'chart-stat-payoff': 'Prêt entièrement remboursé',
					'breakdown-sub': 'Comment votre coût total est réparti entre le montant emprunté et les intérêts payés au prêteur.',
					'amort-sub': 'Décomposition annuelle de chaque paiement.',
					'ci-section-sub': 'Voyez comment votre épargne ou investissement croît année par année avec les intérêts composés.',
					'cur-section-sub': "Convertissez entre les principales devises avec des taux en direct. Prix de l'or et du pétrole dans votre devise locale.",
					'ci-chart-sub': "Solde en fin d'année, réparti entre vos dépôts et la croissance des intérêts composés.",
					'per-oz-usd': 'par once en USD',
					'per-bbl-usd': 'par baril en USD',
					'lbl-stocks': 'Actions',
					'lbl-tab-currency': 'Devises',
					'lbl-tab-commodities': 'Matières premières',
					'lbl-tab-stocks': 'Actions',
					'age-just-now': "à l'instant",
					'age-min-ago': 'il y a {n} min',
					'age-hours-ago': 'il y a {n} h',
					'lbl-currencies': 'devises',
					'lbl-rates-from': 'Taux de',
					'lbl-from': 'De',
					'nav-faq': 'FAQ',
					'unit-mo': '/mois',
					'weight-1g': '1g',
					'weight-10g': '10g',
					'weight-1kg': '1 kg',
					'weight-5bbl': '5 barils',
					'weight-10bbl': '10 barils',
					'weight-100bbl': '100 barils',
					'lbl-price-unavailable': 'Prix indisponible',
					'lbl-updating': 'Mise à jour…',
					'lbl-partial-rates': 'Taux partiels',
					'rf-sub': 'Par mois avec le nouveau taux',
					'rf-verdict-init': 'Entrez les détails de votre prêt pour savoir si le refinancement est judicieux.',
					'rf-verdict-higher': "Le nouveau taux n'est pas inférieur: le refinancement augmenterait votre paiement.",
					'rf-verdict-long': 'Économies mensuelles mais le seuil de rentabilité dépasse la durée restante. Non recommandé.',
					'rf-verdict-good': 'Le refinancement semble judicieux.',
					'rf-verdict-summary': 'Vous économisez {monthly}/mois et atteignez le seuil de rentabilité en {breakeven}. Économie totale : {total}.',
					'rf-never': 'Jamais',
					'rf-over-term': '>{n} ans',
					'rf-months': '{n} mois',
					'rf-years-mo': '{y}a {m}m',
					'loan-desc': 'Utilisez ce calculateur gratuit pour trouver votre mensualité exacte pour tout prêt immobilier, auto, personnel ou étudiant.',
					'ci-desc': 'Le calculateur d intérêts composés montre comment un dépôt initial croît. Entrez le montant initial, la contribution mensuelle, le taux de rendement et la période.',
					'rf-desc': 'Le calculateur de refinancement vous aide à décider si le refinancement est rentable. Entrez le solde restant, le nouveau taux et les frais.',
					'cur-desc': 'LoanCalc prend en charge 161 devises mondiales avec des taux en direct mis à jour toutes les 24 heures.',
					'how-p1': 'Chaque prêt à taux fixe utilise la même formule d amortissement standard.',
					'how-p2': 'Trois leviers contrôlent votre mensualité.',
					'unit-years': 'ans',
					'unit-yr': 'an',
					'unit-yrs': 'ans',
					'ci-earned-short': 'Croissance',
					'cur-rate-lbl': 'Taux',
					'cur-inverse-lbl': 'Inverse',
					'cur-updated-lbl': 'Mis à jour',
					'how-formula-h': 'La formule',
					'how-lower-h': 'Comment réduire votre mensualité',
					'formula-m': 'Mensualité',
					'formula-p': 'Capital (montant du prêt)',
					'formula-r': 'Taux mensuel (annuel ÷ 12)',
					'formula-n': 'Total des paiements (années × 12)',
					'tip-1': "Un apport initial plus élevé réduit directement le capital: moins emprunté signifie des mensualités plus basses et moins d'intérêts.",
					'tip-2': 'Une durée plus longue répartit les paiements sur plus de mois. La mensualité baisse, mais les intérêts totaux augmentent.',
					'tip-3': 'Un taux plus bas a un effet cumulatif: même 0,5% de différence sur un grand prêt économise des dizaines de milliers.',
					'tip-4': 'Améliorer votre cote de crédit avant de postuler vous donne accès à de meilleurs taux.',
					'faq-q1': "Comment est calculée la mensualité d'un prêt ?",
					'faq-q2': "Qu'est-ce qu'un tableau d'amortissement ?",
					'faq-q3': 'Ce calculateur fonctionne-t-il dans tous les pays ?',
					'faq-q4': 'Comment réduire le total des intérêts payés ?',
					'faq-q5': 'LoanCalc est-il entièrement gratuit ?',
					'faq-q6': 'Comment fonctionne le calculateur de refinancement ?',
					'faq-q7': "Comment le prix de l'or est-il calculé ?",
					'faq-q8': 'Quelles devises prend-il en charge ?',
					'loan-label-mortgage': 'Prêt immobilier fixe 30 ans',
					'loan-label-car': 'Prêt auto 5 ans',
					'loan-label-personal': 'Prêt personnel 3 ans',
					'loan-label-student': 'Prêt étudiant 10 ans',
					'helper-title-mortgage': 'Prêt immobilier typique 30 ans',
					'helper-title-car': 'Prêt auto typique',
					'helper-title-personal': 'Prêt personnel typique',
					'helper-title-student': 'Prêt étudiant fédéral (US)',
					'helper-text-mortgage': 'Taux moyen sur 30 ans : 6,5–7 %. Entrez votre montant et taux réels.',
					'helper-text-car': 'Taux moyen sur un prêt auto neuf : 6–8 %.',
					'helper-text-personal': 'Les taux de prêt personnel varient de 6 % à 36 %.',
					'helper-text-student': 'Les taux des prêts étudiants fédéraux sont fixés annuellement par le Congrès.',
					'hero-h1': 'Suite de <em>Calculateurs</em><br>Financiers Gratuits',
					'faq-q9': 'Quels cours boursiers LoanCalc affiche-t-il ?',
					'extra-label': 'Remboursement mensuel supplémentaire',
					'lbl-amount': 'Montant du prêt',
					'lbl-rate': "Taux d'intérêt annuel",
					'lbl-term': 'Durée du prêt',
					'res-monthly': 'Mensualité',
					'freq-monthly': 'Mensuel',
					'freq-biweekly': 'Bimensuel',
					'freq-per-2wk': '/ 2 sem.',
					'res-principal': 'Capital',
					'res-interest': 'Total des intérêts',
					'res-total': 'Coût total',
					'monthly-note': 'Capital et intérêts uniquement, hors taxes, assurance et frais',
					'hero-headline': 'Maîtrisez vos chiffres.',
					'hero-subtitle': 'Calculateurs gratuits pour prêts, épargne, refinancement et taux de change.',
					'hero-h1': 'Maîtrisez vos chiffres.',
					'hero-stat-currencies': 'Devises',
					'hero-stat-langs': 'Langues',
					'hero-stat-tools': 'Outils',
					'res-year': 'Année de remboursement',
					'lbl-principal-pct': 'Capital',
					'lbl-interest-pct': 'Intérêts',
					'section-breakdown': 'Répartition des paiements',
					'section-amort': "Tableau d'amortissement",
					'amort-year': 'Année',
					'amort-month': 'Mois',
					'amort-start': 'Solde initial',
					'amort-ppaid': 'Capital remboursé',
					'amort-ipaid': 'Intérêts payés',
					'amort-end': 'Solde final',
					'btn-show-all': 'Afficher toutes les années',
					'btn-show-all-months': 'Afficher tous les mois',
					'btn-show-less': 'Afficher moins',
					'amort-gran-yearly': 'Annuel',
					'amort-gran-monthly': 'Mensuel',
					'section-how': 'Comment les mensualités sont calculées',
					'section-faq': 'Questions fréquentes',
					'ci-h2': "Calculateur d'intérêts composés et croissance de l'épargne",
					'ci-label-principal': 'Dépôt initial',
					'ci-label-monthly': 'Contribution mensuelle',
					'ci-label-rate': 'Taux de rendement annuel',
					'ci-label-years': 'Durée de placement',
					'ci-result-label': 'Valeur future',
					'ci-sub': 'Portefeuille total après',
					'ci-deposited': 'Total déposé',
					'ci-earned': 'Intérêts gagnés',
					'ci-mult': 'Multiplicateur de croissance',
					'ci-year': 'Année cible',
					'ci-chart-h': 'Croissance année par année',
					'rf-h2': 'Calculateur de refinancement : combien allez-vous économiser ?',
					'rf-current': 'Prêt actuel',
					'rf-new': 'Nouvelle offre de prêt',
					'rf-balance': 'Solde restant',
					'rf-oldrate': "Taux d'intérêt actuel",
					'rf-remaining': 'Années restantes',
					'rf-newrate': "Nouveau taux d'intérêt",
					'rf-costs': 'Frais de clôture',
					'rf-monthly': 'Économies mensuelles',
					'rf-old': 'Ancienne mensualité',
					'rf-new-pay': 'Nouvelle mensualité',
					'rf-breakeven': 'Seuil de rentabilité',
					'rf-total': 'Économies totales sur la durée',
					'cur-h2': "Convertisseur de devises en direct, prix de l'or, pétrole et actions aujourd'hui",
					'gold-local-lbl': 'Prix dans votre devise',
					'oil-local-lbl': 'Prix dans votre devise',
					'footer-mortgage': 'Calculateur hypothécaire',
					'footer-loan': 'Calculateur de prêt',
					'footer-savings': "Calculateur d'épargne",
					'footer-refinance': 'Calculateur de refinancement',
					'footer-currency': 'Convertisseur de devises',
					'footer-privacy': 'Politique de confidentialité',
					'footer-dnsmi': 'Ne pas vendre ni partager mes informations personnelles',
					'footer-rights': 'Tous droits réservés.',
					'footer-desc': 'Calculateurs financiers gratuits : prêts, épargne, refinancement, devises. Sans compte requis.',
					'footer-disclaimer': "LoanCalc fournit des estimations à titre informatif uniquement. Ce n'est pas un conseil financier.",
					'seo-mort-h2': 'Calculateur hypothécaire : tout ce que vous devez savoir',
					'seo-mort-h3-1': "Qu'est-ce qu'un calculateur hypothécaire et qui devrait l'utiliser ?",
					'seo-mort-p1': "Un calculateur hypothécaire est un outil financier qui calcule votre mensualité sur un prêt immobilier à partir de trois données : le montant du prêt (capital), le taux d'intérêt annuel et la durée du prêt en années. Quiconque envisage d'acheter un bien, compare des offres de prêt ou cherche à comprendre le coût à long terme de l'emprunt devrait l'utiliser avant de signer un contrat hypothécaire.",
					'seo-mort-p2': "Les primo-accédants utilisent les calculateurs hypothécaires pour vérifier leur capacité d'achat avant de chercher un logement. Les propriétaires existants s'en servent pour explorer les scénarios de refinancement ou simuler l'impact de remboursements anticipés. Les investisseurs immobiliers les utilisent pour estimer la rentabilité locative. Le calculateur fonctionne de manière identique pour les prêts à taux fixe dans le monde entier — que vous empruntiez en USD, EUR, GBP ou toute autre devise.",
					'seo-mort-h3-2': 'Comment fonctionne la formule de mensualité',
					'seo-mort-p3': "Tout prêt immobilier à taux fixe utilise la même formule d'amortissement standard :",
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'Où <strong>M</strong> est votre mensualité, <strong>P</strong> est le montant du capital emprunté, <strong>r</strong> est le taux mensuel (taux annuel ÷ 12) et <strong>n</strong> est le nombre total de mensualités (années × 12). Cette formule produit un montant mensuel fixe couvrant à la fois les intérêts sur le capital restant dû et une partie du remboursement du capital, avec un ratio qui évolue dans le temps. Pendant les premières années, la majeure partie de chaque paiement correspond aux intérêts. Dans les dernières années, la majeure partie rembourse le capital.',
					'seo-mort-h3-3': 'Quels facteurs influencent votre taux hypothécaire ?',
					'seo-mort-p6': "Votre taux hypothécaire réel dépend de plusieurs facteurs évalués par les prêteurs lors de l'examen de votre dossier :",
					'seo-mort-li-1': "<strong>Score de crédit :</strong> Les emprunteurs avec un score supérieur à 760 obtiennent généralement les taux les plus bas. Chaque baisse de 20 points peut augmenter votre taux de 0,1 à 0,5 %, ajoutant des milliers d'euros d'intérêts sur 30 ans.",
					'seo-mort-li-2': "<strong>Ratio prêt/valeur (LTV) :</strong> Un LTV plus faible (apport plus important) réduit le risque pour le prêteur. Un apport de 20 % ou plus supprime généralement l'assurance emprunteur privée (PMI) et peut vous qualifier pour un meilleur taux.",
					'seo-mort-li-3': "<strong>Type de prêt :</strong> Les prêts conformes (dans les limites de Fannie Mae/Freddie Mac) portent généralement des taux plus bas que les prêts jumbo. Les prêts garantis par l'État (FHA, VA, USDA) ont leurs propres structures de taux.",
					'seo-mort-li-4': "<strong>Durée du prêt :</strong> Les prêts sur 15 ans ont des taux plus bas que ceux sur 30 ans car l'argent du prêteur est exposé moins longtemps.",
					'seo-mort-li-5': "<strong>Conditions du marché :</strong> Les taux hypothécaires sont fortement influencés par le rendement des obligations du Trésor à 10 ans et la politique de la Réserve fédérale. Lorsque la Fed augmente ses taux pour lutter contre l'inflation, les taux hypothécaires ont tendance à suivre.",
					'seo-mort-h3-4': '15 ans vs 30 ans : le vrai choix à faire',
					'seo-mort-p12': 'Le choix entre un prêt de 15 et 30 ans est fondamentalement un arbitrage entre les flux de trésorerie mensuels et les intérêts totaux payés. Voici un exemple pour un prêt de 300 000 $ :',
					'seo-mort-th-loan': 'Prêt',
					'seo-mort-th-rate': 'Taux',
					'seo-mort-p13': "À 6,5 %, un prêt sur 30 ans coûte 382 633 $ d'intérêts au total contre 170 453 $ pour un prêt sur 15 ans — une différence de plus de 212 000 $. Cependant, la mensualité du prêt sur 30 ans est inférieure de 718 $, ce qui est significatif si votre budget est serré ou si vous souhaitez investir la différence.",
					'seo-mort-h3-5': "Qu'est-ce que la PMI et quand s'applique-t-elle ?",
					'seo-mort-p14': "L'assurance emprunteur privée (PMI) est exigée par la plupart des prêteurs américains lorsque votre apport est inférieur à 20 % du prix d'achat. La PMI protège le prêteur en cas de défaut. Le coût typique est de 0,5 à 1,5 % du montant du prêt par an, ajouté à votre mensualité. Sur un prêt de 300 000 $, la PMI peut ajouter 125 à 375 $ par mois. Une fois que vos capitaux propres atteignent 20 % (par les remboursements ou la valorisation du bien), vous pouvez demander l'annulation de la PMI. Les prêteurs doivent automatiquement l'annuler lorsque votre solde atteint 78 % du prix d'achat initial.",
					'seo-mort-h3-6': 'Comment rembourser votre hypothèque plus rapidement',
					'seo-mort-li-6': "<strong>Effectuez un paiement supplémentaire par an :</strong> Sur un prêt de 30 ans, un paiement mensuel supplémentaire par an réduit la durée d'environ 4 à 5 ans et économise des dizaines de milliers en intérêts.",
					'seo-mort-li-7': '<strong>Passez aux paiements bimensuels :</strong> Au lieu de 12 mensualités, effectuez 26 demi-paiements par an. Cela revient à un paiement complet supplémentaire par an sans impact notable sur votre budget.',
					'seo-mort-li-8': '<strong>Arrondissez votre paiement :</strong> Si votre mensualité est de 1 847 €, payer 1 900 € ou 2 000 € chaque mois dirige le montant supplémentaire entièrement vers le capital, accélérant le remboursement.',
					'seo-mort-li-9': "<strong>Utilisez les rentrées d'argent imprévues :</strong> Les remboursements d'impôts, primes ou héritages appliqués en remboursements anticipés peuvent réduire votre durée de plusieurs années.",
					'seo-mort-p15': 'Également utile : <a href="/refinance-calculator/">Calculateur de refinancement</a> — vérifiez si un taux plus bas est avantageux pour votre prêt actuel. Ou explorez <a href="/loan-calculator/">d\'autres types de prêts</a> incluant crédits auto, personnels et étudiants.',
					'seo-ci-h2': 'Intérêts composés et épargne : le guide complet',
					'seo-ci-h3-1': "Qu'est-ce que l'intérêt composé et pourquoi est-il important ?",
					'seo-ci-h3-2': 'Composition quotidienne, mensuelle ou annuelle — comment cela affecte la croissance',
					'seo-ci-h3-3': 'La règle des 72 expliquée',
					'seo-ci-h3-4': "Le coût de l'attente : commencer à 25 ans vs 35 ans vs 45 ans",
					'seo-ci-h3-5': 'Comptes épargne à haut rendement vs fonds indiciels : taux habituels',
					'seo-ci-p1': "L'intérêt composé est un intérêt calculé à la fois sur le capital initial et sur les intérêts accumulés de toutes les périodes précédentes. Cela est fondamentalement différent de l'intérêt simple, qui ne se calcule que sur le capital d'origine. Albert Einstein est souvent cité pour avoir qualifié l'intérêt composé de « huitième merveille du monde. Celui qui le comprend le gagne ; celui qui ne le comprend pas le paie. »",
					'seo-ci-p2': "La raison pour laquelle l'intérêt composé est si puissant est la croissance exponentielle. Dans les premières années, l'effet est subtil. Mais sur 20, 30 ou 40 ans, l'effet cumulatif devient extraordinaire — la majeure partie de votre richesse finale provient non pas de vos contributions mais des intérêts générés sur des intérêts générés sur des intérêts.",
					'seo-ci-p3': 'La fréquence de capitalisation détermine la fréquence à laquelle les intérêts sont calculés et ajoutés au solde. Une capitalisation plus fréquente signifie des rendements légèrement plus élevés :',
					'seo-ci-p4': "Pour les comptes d'épargne et les fonds du marché monétaire, la capitalisation mensuelle est standard. Les comptes d'épargne à haut rendement des banques en ligne capitalisent généralement quotidiennement. La différence entre la capitalisation mensuelle et quotidienne est faible — le taux d'intérêt lui-même importe bien plus que la fréquence de capitalisation.",
					'seo-ci-p5': "La règle des 72 est un raccourci mental simple : divisez 72 par votre taux de rendement annuel pour estimer en combien d'années votre investissement double de valeur.",
					'seo-ci-p6': "La règle fonctionne également à l'envers : si vous voulez doubler votre argent en 8 ans, vous avez besoin d'un taux d'au moins 72 ÷ 8 = 9 % par an.",
					'seo-ci-p7': "Le facteur le plus puissant en matière d'épargne est le temps. Imaginez investir 200 $ par mois à un rendement annuel de 7 % sans dépôt initial :",
					'seo-ci-p8': "Commencer à 25 ans plutôt qu'à 35 ans coûte seulement 24 000 $ de plus en contributions mais génère 285 000 $ de richesse supplémentaire — un retour de 12x sur ces 24 000 $ supplémentaires. Le message est clair : commencez tôt, même avec de petits montants.",
					'seo-ci-p9': "Le taux de rendement que vous choisissez dans cette calculatrice doit refléter l'endroit où vous conserverez réellement votre épargne :",
					'seo-ci-p10': 'Voir aussi : <a href="/refinance-calculator/">Calculateur de refinancement</a> — les intérêts économisés grâce au refinancement d\'un prêt immobilier peuvent être redirigés vers l\'épargne.',
					'seo-ci-li-1': '<strong>Capitalisation annuelle :</strong> Intérêts ajoutés une fois par an. Taux de référence.',
					'seo-ci-li-2': '<strong>Capitalisation mensuelle :</strong> Intérêts ajoutés 12 fois par an. Un taux annuel de 6 % capitalisé mensuellement équivaut à un taux annuel effectif de 6,168 %.',
					'seo-ci-li-3': '<strong>Capitalisation quotidienne :</strong> Intérêts ajoutés 365 fois par an. Un taux de 6 % capitalisé quotidiennement donne un taux effectif de 6,183 %. Légèrement supérieur au mensuel.',
					'seo-ci-li-4': 'À 4 % (épargne haut rendement) : 72 ÷ 4 = <strong>18 ans</strong> pour doubler',
					'seo-ci-li-5': 'À 7 % (moyenne du marché boursier) : 72 ÷ 7 = <strong>10,3 ans</strong> pour doubler',
					'seo-ci-li-6': 'À 10 % (croissance agressive) : 72 ÷ 10 = <strong>7,2 ans</strong> pour doubler',
					'seo-ci-li-7': 'À 12 % (rendements venture) : 72 ÷ 12 = <strong>6 ans</strong> pour doubler',
					'seo-ci-li-8': "<strong>Compte d'épargne traditionnel :</strong> 0,01–0,5 % de rendement annuel effectif. Perd effectivement de la valeur face à l'inflation. Uniquement adapté aux fonds d'urgence à accès immédiat.",
					'seo-ci-li-9': "<strong>Compte d'épargne à haut rendement (banques en ligne) :</strong> 4–5 % de rendement annuel effectif en environnement de taux élevés. Garanti par le FDIC. Excellent pour les fonds d'urgence et les objectifs à court terme (1–3 ans).",
					'seo-ci-li-10': "<strong>Comptes du marché monétaire :</strong> 4–5 % de rendement annuel effectif. Similaires aux comptes à haut rendement avec des conditions d'accès légèrement différentes.",
					'seo-ci-li-11': '<strong>Certificats de dépôt (CD) :</strong> 4–5,5 % de rendement annuel effectif avec blocage de 6 mois à 5 ans. Taux plus élevés pour des durées plus longues.',
					'seo-ci-li-12': '<strong>Fonds indiciel S&amp;P 500 :</strong> ~10 % de rendement nominal moyen (7 % après inflation) historiquement. Non garanti. Idéal pour les objectifs à 5 ans ou plus. Soumis à la volatilité des marchés.',
					'seo-ci-li-13': '<strong>Fonds obligataire total :</strong> 3–5 % historiquement. Volatilité plus faible que les actions. Adapté aux objectifs à moyen terme.',
					'seo-ci-th-start': 'Âge de départ',
					'seo-ci-th-end': 'Âge de fin',
					'seo-ci-th-years': 'Années investies',
					'seo-ci-th-contributed': 'Total contribué',
					'seo-ci-th-final': 'Valeur finale',
					'seo-ci-th-interest': 'Intérêts gagnés',
					'seo-rf-h2': "Refinancement de votre prêt immobilier : quand c'est judicieux",
					'seo-rf-h3-1': 'Quand le refinancement est financièrement judicieux',
					'seo-rf-h3-2': 'Comment calculer le point mort',
					'seo-rf-h3-3': 'Refinancement avec retrait de fonds vs refinancement taux-durée',
					'seo-rf-h3-4': 'Coûts cachés du refinancement',
					'seo-rf-h3-5': 'Quand NE PAS refinancer',
					'seo-rf-p1': "Le refinancement remplace votre prêt existant par un nouveau, idéalement à un taux d'intérêt plus bas. La décision se résume à une question fondamentale : les économies à long terme dépasseront-elles les coûts initiaux, et resterez-vous dans le prêt assez longtemps pour récupérer ces coûts ? Le refinancement est le plus judicieux quand :",
					'seo-rf-p2': 'Le calcul du point mort est simple : divisez vos coûts de clôture totaux par vos économies mensuelles.',
					'seo-rf-formula': '<strong>Mois avant point mort = Frais de clôture ÷ Économies mensuelles sur le paiement</strong>',
					'seo-rf-p3': "Exemple : Si le refinancement coûte 4 500 $ en frais de clôture et vous fait économiser 200 $ par mois, le point mort est 4 500 ÷ 200 = 22,5 mois — environ 2 ans. Si vous prévoyez de rester dans votre maison encore au moins 3 à 5 ans, ce refinancement a clairement du sens financièrement. Si vous prévoyez de déménager dans 18 mois, ce n'est pas le cas.",
					'seo-rf-p4': 'Il existe deux grands types de refinancement immobilier :',
					'seo-rf-p5': 'Le vrai coût du refinancement va au-delà des frais de clôture annoncés. Les frais courants incluent :',
					'seo-rf-p6': 'Les frais de clôture totaux pour un refinancement typique représentent 2 à 3 % du montant du prêt. Sur un prêt de 300 000 $, attendez-vous à 6 000–9 000 $ en frais, sauf si vous choisissez un refinancement « sans frais de clôture » (où les coûts sont intégrés dans le taux).',
					'seo-rf-p7': 'Voir aussi : <a href="/loan-calculator/">Calculateur de prêt immobilier</a> — modélisez votre prêt initial ou comparez des options de prêt avant de décider de refinancer.',
					'seo-rf-li-1': "Votre nouveau taux est inférieur d'au moins 0,5 à 1 % à votre taux actuel",
					'seo-rf-li-2': 'Vous prévoyez de rester dans le logement plus longtemps que la période de point mort',
					'seo-rf-li-3': "Votre score de crédit s'est nettement amélioré depuis votre prêt initial",
					'seo-rf-li-4': "Vous souhaitez passer d'un prêt à taux variable à un prêt à taux fixe pour plus de stabilité",
					'seo-rf-li-5': 'Vous souhaitez raccourcir la durée de votre prêt (p. ex., de 30 ans à 15 ans) et pouvez vous permettre des mensualités plus élevées',
					'seo-rf-li-6': "<strong>Refinancement taux-durée :</strong> Vous remplacez votre prêt immobilier existant par un nouveau à un meilleur taux et/ou une durée différente, sans modifier le solde du prêt. C'est le type le plus courant et ce que cette calculatrice modélise. L'objectif est uniquement de réduire votre coût d'intérêt.",
					'seo-rf-li-7': '<strong>Refinancement avec retrait de fonds :</strong> Vous empruntez plus que le solde de votre prêt actuel et recevez la différence en espèces. Par exemple, si votre maison vaut 400 000 $ et que vous devez 250 000 $, vous pourriez refinancer pour 320 000 $ et prendre 70 000 $ en espèces. Le refinancement avec retrait de fonds réinitialise votre équité et porte généralement un taux légèrement plus élevé.',
					'seo-rf-li-8': "<strong>Frais d'ouverture :</strong> 0,5 à 1 % du montant du prêt. Les frais du prêteur pour traiter le nouveau prêt.",
					'seo-rf-li-9': "<strong>Frais d'évaluation :</strong> 300–600 $. La plupart des prêteurs exigent une nouvelle évaluation pour confirmer la valeur actuelle de votre maison.",
					'seo-rf-li-10': '<strong>Assurance de titre :</strong> 500–1 500 $. Obligatoire pour protéger le prêteur contre les litiges de titre.',
					'seo-rf-li-11': "<strong>Frais d'enregistrement :</strong> 25–250 $. Frais gouvernementaux pour enregistrer le nouveau prêt immobilier.",
					'seo-rf-li-12': '<strong>Points de réduction :</strong> Intérêts prépayés optionnels pour acheter une réduction de votre taux. Un point = 1 % du montant du prêt = réduction de taux typique de 0,25 %.',
					'seo-rf-li-13': "<strong>Vous déménagez bientôt :</strong> Si vous vendez le logement avant d'atteindre le point mort, le refinancement coûte plus qu'il n'économise.",
					'seo-rf-li-14': '<strong>Pénalités de remboursement anticipé :</strong> Certains prêts facturent des frais pour remboursement anticipé. Vérifiez les conditions de votre prêt actuel avant de refinancer.',
					'seo-rf-li-15': '<strong>Vous avez remboursé la majeure partie du prêt :</strong> Reprendre un nouveau terme de 30 ans sur un prêt déjà en cours depuis 20 ans prolonge considérablement votre dette, même si le taux est plus bas.',
					'seo-rf-li-16': "<strong>Votre score de crédit a baissé :</strong> Si votre crédit s'est dégradé depuis votre prêt immobilier initial, vous ne pourrez peut-être pas obtenir un meilleur taux et pourriez même recevoir un taux plus élevé.",
					'seo-cur-h2': 'Change de devises, or, pétrole et cours boursiers : fonctionnement des taux en direct',
					'seo-cur-h3-1': 'Comment fonctionnent les taux de change en direct',
					'seo-cur-p1': "Les taux de change sont déterminés par le marché des changes (forex), le plus grand marché financier au monde avec plus de 7 000 milliards de dollars de volume quotidien. Le taux « en direct » affiché sur ce site est le taux médian (aussi appelé taux interbancaire ou taux au comptant), qui est le point médian entre les prix d'achat et de vente utilisés par les banques pour leurs transactions en grands volumes.",
					'seo-cur-p2': "Les taux affichés ici proviennent de l'API Frankfurter, qui agrège les données de la Banque centrale européenne et d'autres sources financières. Ils sont mis à jour quotidiennement et mis en cache pour les performances. Pour des taux en temps réel à la milliseconde près, les traders institutionnels utilisent des plateformes forex dédiées — mais pour la planification de voyages, les virements internationaux et la référence générale, ces taux sont précis à une fraction de pour cent.",
					'seo-cur-h3-2': 'Ce qui influence les taux de change',
					'seo-cur-p3': "Les taux de change évoluent constamment en fonction d'un ensemble complexe de facteurs économiques et politiques :",
					'seo-cur-li-1': "<strong>Différentiels de taux d'intérêt :</strong> Lorsqu'une banque centrale relève ses taux, sa devise se renforce généralement car des taux plus élevés attirent des capitaux étrangers en quête de meilleurs rendements. Les décisions de la Réserve fédérale américaine influencent souvent les taux de change mondiaux.",
					'seo-cur-li-2': "<strong>Inflation :</strong> Une inflation plus élevée érode le pouvoir d'achat d'une devise au fil du temps. Les pays à faible inflation stable tendent à avoir des devises plus fortes. La paire EUR/USD est, par exemple, étroitement surveillée pour les différentiels d'inflation entre les États-Unis et la zone euro.",
					'seo-cur-li-3': "<strong>Balance commerciale :</strong> Les pays qui exportent plus qu'ils n'importent (excédent commercial) voient une demande plus forte pour leur devise, ce qui en augmente la valeur. Les pays avec des déficits commerciaux persistants peuvent voir leur devise s'affaiblir.",
					'seo-cur-li-4': "<strong>Stabilité politique :</strong> L'instabilité politique, les élections ou les conflits géopolitiques peuvent provoquer des mouvements rapides des devises. Les devises refuges comme l'USD, le CHF et le JPY se renforcent souvent lors des crises mondiales.",
					'seo-cur-li-5': '<strong>Croissance du PIB :</strong> Une forte croissance économique augmente la demande pour une devise, les investisseurs y déployant des capitaux.',
					'seo-cur-h3-3': 'Taux médian vs taux bancaire : pourquoi il y a un écart',
					'seo-cur-p4': "Le taux affiché sur ce convertisseur est le taux médian — le point médian théorique entre les prix d'achat et de vente. Lorsque vous échangez réellement de l'argent via une banque, une carte de crédit ou un service de transfert, vous obtenez un taux moins favorable. La différence s'appelle le spread, et c'est ainsi que les entreprises de change réalisent leurs bénéfices.",
					'seo-cur-li-6': "<strong>Banques et kiosques d'aéroport :</strong> Facturent généralement 3–10 % au-dessus du taux médian. Les pires pour les petits montants et les lieux touristiques.",
					'seo-cur-li-7': "<strong>Cartes de crédit :</strong> Facturent généralement 1–3 % de frais de transaction étrangère. Souvent la meilleure option pour les achats à l'étranger, surtout les cartes sans frais de transaction étrangère.",
					'seo-cur-li-8': '<strong>Services de transfert spécialisés (Wise, Revolut) :</strong> Facturent 0,3–1 % au-dessus du taux médian. Meilleurs pour les grands virements internationaux.',
					'seo-cur-p5': 'Pour calculer ce que vous recevrez réellement : prenez le taux médian et soustrayez le pourcentage de spread du prestataire. Si vous voyez 1 USD = 0,92 EUR au taux médian et votre banque facture 3 %, vous recevrez environ 0,92 × (1 - 0,03) = 0,892 EUR par dollar.',
					'seo-cur-h3-4': "L'or comme couverture de change : comment est fixé le cours XAU",
					'seo-cur-p6': "L'or (symbole boursier XAU) est coté en dollars américains par once troy sur les marchés internationaux. L'once troy est l'unité standard pour les métaux précieux et équivaut à environ 31,1 grammes (légèrement plus lourde qu'une once avoirdupois standard de 28,35 grammes). Une once troy = 31,1035 grammes exactement.",
					'seo-cur-p7': "L'or joue le rôle de couverture contre la dévaluation des devises et l'inflation. Lorsque le dollar américain s'affaiblit ou que l'inflation monte, les prix de l'or augmentent souvent — non pas parce que l'or lui-même change, mais parce qu'il faut plus de dollars pour acheter le même poids d'or. L'or a maintenu son pouvoir d'achat au fil des siècles tandis que les devises individuelles se sont dépréciées. Le prix de l'or sur ce site provient de données de marché via Yahoo Finance, mis en cache toutes les heures.",
					'seo-cur-p8': "Les mouvements du cours de l'or sont influencés par : les réserves d'or des banques centrales, la force du dollar américain, les taux d'intérêt réels (l'or devient plus attractif lorsque les taux réels sont bas ou négatifs), les risques géopolitiques et la demande joaillière/industrielle.",
					'seo-cur-h3-5': 'Pétrole brut WTI : pourquoi il est coté en USD et ce qui fait bouger son prix',
					'seo-cur-p9': "Le West Texas Intermediate (WTI) est le principal benchmark du pétrole brut pour l'Amérique du Nord et une référence de prix mondiale majeure. Il est coté en dollars américains par baril (1 baril = 42 gallons US = environ 159 litres). Le pétrole est coté en USD depuis l'accord pétrodollar des années 1970, créant une demande mondiale de dollars américains puisque tous les pays importateurs de pétrole ont besoin de dollars pour payer leurs achats.",
					'seo-cur-p10': 'Principaux facteurs qui influencent les prix du pétrole :',
					'seo-cur-li-9': "<strong>Décisions de production de l'OPEP+ :</strong> Le cartel de l'OPEP et les producteurs alliés (Russie, etc.) contrôlent environ 40 % de l'offre mondiale. Les réductions de production font monter les prix ; les augmentations les font baisser.",
					'seo-cur-li-10': "<strong>Production de pétrole de schiste américain :</strong> Les États-Unis sont devenus le plus grand producteur mondial de pétrole en partie grâce à la technologie du schiste. Une production américaine plus élevée concurrence l'OPEP et peut plafonner les hausses de prix.",
					'seo-cur-li-11': '<strong>Demande mondiale :</strong> La croissance économique en Chine et en Inde (grands consommateurs de pétrole) est un moteur majeur de la demande. Les récessions réduisent la demande et font baisser les prix.',
					'seo-cur-li-12': "<strong>Événements géopolitiques :</strong> Les conflits dans les régions productrices de pétrole (Moyen-Orient, Russie) créent des primes de risque d'approvisionnement qui font monter les prix.",
					'seo-cur-li-13': '<strong>Force du dollar américain :</strong> Comme le pétrole est coté en USD, un dollar plus fort rend le pétrole plus cher pour les acheteurs non américains, réduisant la demande et exerçant une pression à la baisse sur les prix.',
					'seo-cur-h3-6': 'Cours boursiers en direct : principales actions américaines mises à jour toutes les heures',
					'seo-cur-p11': "LoanCalc affiche les cours en direct de dix actions et fonds américains très suivis : Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) et le SPDR S&P 500 ETF Trust (SPY). Les cours sont récupérés depuis Yahoo Finance et mis à jour toutes les heures — le même intervalle que les données sur l'or et le pétrole.",
					'seo-cur-p12': "Chaque vignette d'action affiche le prix actuel en USD, la variation en pourcentage par rapport à la clôture précédente (flèche verte pour les gains, rouge pour les pertes) et le prix équivalent dans votre devise locale en utilisant le taux de change en direct. Cela facilite le suivi de la valeur des positions en actions américaines depuis n'importe où dans le monde sans changer d'application.",
					'seo-cur-p13': 'Le S&amp;P 500 ETF (SPY) est inclus comme référence de marché large : lorsque SPY est en hausse, le marché américain dans son ensemble monte généralement. Les actions individuelles comme NVDA et TSLA ont une volatilité plus élevée. Utilisez le <a href="/savings-calculator/">Calculateur d\'épargne</a> avec un rendement annuel de 7–10 % pour modéliser la croissance à long terme du S&amp;P 500.',
					'seo-cur-p14': 'Voir aussi : <a href="/savings-calculator/">Calculateur d\'épargne</a> — modélisez la croissance des rendements des devises ou des investissements liés aux matières premières dans le temps.',
					'lbl-market-prices': 'Prix du marché',
					'cur-rate-unavailable': 'Taux indisponible',
					'cur-not-in-feed': 'Absent du flux en direct',
					'cur-today': "aujourd'hui",
					'cur-status-fetching': 'Récupération des taux de change…',
					'cur-status-live': 'Taux en direct · {date} · 161 devises · mise à jour toutes les 24h',
					'cur-status-partial': 'Taux chargés · {date} (33 devises)',
					'cur-status-offline': 'Taux hors ligne : devises limitées disponibles',
					'cmd-fetching': 'Chargement…',
					'cmd-live': 'En direct · {date}',
					'cmd-approx': 'Approx · vérifier les données en direct',
					'cur-status-cached': 'Taux du {date} · en cache · mise à jour toutes les 24h',
					'clamp-min': 'Minimum :',
					'clamp-max': 'Maximum :'
				},
				es: {
					'nav-loans': 'Préstamos',
					'nav-savings': 'Ahorros',
					'nav-refinance': 'Refinanciación',
					'nav-currency': 'Divisas',
					'btn-settings': 'Configuración',
					'pref-title': 'Preferencias',
					'pref-language': 'Idioma de visualización',
					'pref-lang-note': 'Cambia etiquetas y formato de números.',
					'pref-currency': 'Moneda preferida',
					'pref-currency-note': 'Moneda predeterminada para el conversor.',
					'pref-current': 'Configuración actual',
					'pref-save': 'Guardar preferencias',
					'toast-saved': 'Preferencias guardadas',
					'pref-cancel': 'Cancelar',
					'ci-sub-desc': 'Vea cómo crece su ahorro año a año.',
					'tab-mortgage': 'Hipoteca',
					'tab-car': 'Auto',
					'tab-personal': 'Personal',
					'tab-student': 'Estudios',
					'tab-afford': 'Alcanzable',
					'afford-pmt-label': 'Cuota mensual que puedo pagar',
					'afford-result-label': 'Podrías pedir prestado hasta',
					'afford-sub': 'estimación de capacidad',
					'hero-sub': 'Calculadora de préstamos, interés compuesto, ahorro en refinanciación, conversor de divisas en vivo, precio del oro, petróleo y acciones en vivo: todo gratis, instantáneo, sin registro.',
					'trust-1': 'Siempre gratis',
					'trust-2': 'Sin registro',
					'trust-3': 'Funciona en todo el mundo',
					'cur-amount-label': 'Cantidad',
					'cur-to-label': 'Convertido a',
					'cur-quick': 'Referencia rápida',
					'gold-per': 'por onza troy',
					'gold-local': 'Precio en tu moneda',
					'oil-per': 'por barril',
					'oil-local': 'Precio en tu moneda',
					'faq-heading': 'Preguntas frecuentes sobre préstamos, ahorros y divisas',
					'chart-center-lbl': 'capital',
					'chart-stat-principal': 'Capital prestado',
					'chart-stat-interest': 'Total de intereses pagados',
					'chart-stat-total': 'Monto total reembolsado',
					'chart-stat-payoff': 'Préstamo totalmente pagado',
					'breakdown-sub': 'Cómo se divide su costo total entre el monto prestado y los intereses pagados al prestamista.',
					'amort-sub': 'Desglose anual de cada pago.',
					'ci-section-sub': 'Vea cómo sus ahorros o inversión crecen año a año con el interés compuesto.',
					'cur-section-sub': 'Convierta entre las principales divisas con tasas en vivo. Precios del oro y petróleo en su moneda local.',
					'ci-chart-sub': 'Saldo al final de cada año, dividido entre sus depósitos y el crecimiento del interés compuesto.',
					'per-oz-usd': 'por onza en USD',
					'per-bbl-usd': 'por barril en USD',
					'lbl-stocks': 'Acciones',
					'lbl-tab-currency': 'Divisas',
					'lbl-tab-commodities': 'Materias primas',
					'lbl-tab-stocks': 'Acciones',
					'age-just-now': 'ahora mismo',
					'age-min-ago': 'hace {n} min',
					'age-hours-ago': 'hace {n} h',
					'lbl-currencies': 'divisas',
					'lbl-rates-from': 'Tasas de',
					'lbl-from': 'De',
					'nav-faq': 'FAQ',
					'unit-mo': '/mes',
					'weight-1g': '1g',
					'weight-10g': '10g',
					'weight-1kg': '1 kg',
					'weight-5bbl': '5 barriles',
					'weight-10bbl': '10 barriles',
					'weight-100bbl': '100 barriles',
					'lbl-price-unavailable': 'Precio no disponible',
					'lbl-updating': 'Actualizando…',
					'lbl-partial-rates': 'Tasas parciales',
					'rf-sub': 'Por mes con la nueva tasa',
					'rf-verdict-init': 'Ingrese los datos de su préstamo para ver si refinanciar es conveniente.',
					'rf-verdict-higher': 'La nueva tasa no es menor: refinanciar aumentaría su pago.',
					'rf-verdict-long': 'Ahorro mensual pero el punto de equilibrio supera el plazo restante. No recomendado.',
					'rf-verdict-good': 'Refinanciar parece conveniente.',
					'rf-verdict-summary': 'Ahorra {monthly}/mes y alcanza el punto de equilibrio en {breakeven}. Ahorro total: {total}.',
					'rf-never': 'Nunca',
					'rf-over-term': '>{n} años',
					'rf-months': '{n} meses',
					'rf-years-mo': '{y}a {m}m',
					'loan-desc': 'Use esta calculadora gratuita para encontrar su cuota mensual exacta para cualquier hipoteca, préstamo auto, personal o estudiantil.',
					'ci-desc': 'La calculadora de interés compuesto muestra cómo crece un depósito inicial cuando se calculan intereses sobre el capital acumulado.',
					'rf-desc': 'La calculadora de refinanciación le ayuda a decidir si refinanciar su préstamo es rentable.',
					'cur-desc': 'El convertidor LoanCalc soporta 161 divisas mundiales con tasas en vivo actualizadas cada 24 horas.',
					'how-p1': 'Cada préstamo de tasa fija usa la misma fórmula estándar de amortización.',
					'how-p2': 'Tres factores controlan su cuota mensual.',
					'unit-years': 'años',
					'unit-yr': 'año',
					'unit-yrs': 'años',
					'ci-earned-short': 'Crecimiento',
					'cur-rate-lbl': 'Tasa',
					'cur-inverse-lbl': 'Inversa',
					'cur-updated-lbl': 'Actualizado',
					'how-formula-h': 'La fórmula',
					'how-lower-h': 'Cómo reducir su cuota mensual',
					'formula-m': 'Cuota mensual',
					'formula-p': 'Capital (monto del préstamo)',
					'formula-r': 'Tasa mensual (anual ÷ 12)',
					'formula-n': 'Pagos totales (años × 12)',
					'tip-1': 'Un pago inicial mayor reduce el capital directamente: menos prestado significa cuotas más bajas y menos intereses totales.',
					'tip-2': 'Un plazo más largo distribuye los pagos en más meses. La cuota baja, pero los intereses totales aumentan.',
					'tip-3': 'Una tasa de interés más baja tiene un efecto acumulativo: incluso 0,5% de diferencia en una hipoteca grande ahorra decenas de miles.',
					'tip-4': 'Mejorar su puntaje crediticio antes de solicitar generalmente le da acceso a mejores tasas.',
					'faq-q1': '¿Cómo se calcula la cuota mensual de un préstamo?',
					'faq-q2': '¿Qué es una tabla de amortización?',
					'faq-q3': '¿Funciona esta calculadora en todos los países?',
					'faq-q4': '¿Cómo puedo reducir el total de intereses que pago?',
					'faq-q5': '¿Es LoanCalc completamente gratuito?',
					'faq-q6': '¿Cómo funciona la calculadora de refinanciación?',
					'faq-q7': '¿Cómo se calcula y actualiza el precio del oro?',
					'faq-q8': '¿Qué divisas admite el convertidor?',
					'loan-label-mortgage': 'Hipoteca fija a 30 años',
					'loan-label-car': 'Préstamo auto a 5 años',
					'loan-label-personal': 'Préstamo personal a 3 años',
					'loan-label-student': 'Préstamo estudiantil a 10 años',
					'helper-title-mortgage': 'Hipoteca típica a 30 años',
					'helper-title-car': 'Préstamo auto típico',
					'helper-title-personal': 'Préstamo personal típico',
					'helper-title-student': 'Préstamo estudiantil federal (EE.UU.)',
					'helper-text-mortgage': 'Tasa media a 30 años: 6,5–7%. Ingrese su monto y tasa reales.',
					'helper-text-car': 'Tasa media en préstamos auto nuevos: 6–8%.',
					'helper-text-personal': 'Las tasas de préstamos personales van del 6% al 36%.',
					'helper-text-student': 'Las tasas de préstamos estudiantiles federales las fija el Congreso anualmente.',
					'hero-h1': 'Suite de <em>Calculadoras</em><br>Financieras Gratuitas',
					'faq-q9': '¿Qué precios de acciones muestra LoanCalc?',
					'extra-label': 'Pago mensual adicional',
					'lbl-amount': 'Monto del préstamo',
					'lbl-rate': 'Tasa de interés anual',
					'lbl-term': 'Plazo del préstamo',
					'res-monthly': 'Cuota mensual',
					'freq-monthly': 'Mensual',
					'freq-biweekly': 'Quincenal',
					'freq-per-2wk': '/ 2 sem.',
					'res-principal': 'Capital',
					'res-interest': 'Total de intereses',
					'res-total': 'Costo total',
					'monthly-note': 'Solo capital e intereses, excluye impuestos, seguros y comisiones',
					'hero-headline': 'Conoce tus números.',
					'hero-subtitle': 'Calculadoras gratuitas para hipotecas, ahorros, refinanciamiento y divisas.',
					'hero-h1': 'Conoce tus números.',
					'hero-stat-currencies': 'Divisas',
					'hero-stat-langs': 'Idiomas',
					'hero-stat-tools': 'Herramientas',
					'res-year': 'Año de liquidación',
					'lbl-principal-pct': 'Capital',
					'lbl-interest-pct': 'Intereses',
					'section-breakdown': 'Desglose de pagos',
					'section-amort': 'Tabla de amortización',
					'amort-year': 'Año',
					'amort-month': 'Mes',
					'amort-start': 'Saldo inicial',
					'amort-ppaid': 'Capital pagado',
					'amort-ipaid': 'Intereses pagados',
					'amort-end': 'Saldo final',
					'btn-show-all': 'Ver todos los años',
					'btn-show-all-months': 'Ver todos los meses',
					'btn-show-less': 'Ver menos',
					'amort-gran-yearly': 'Anual',
					'amort-gran-monthly': 'Mensual',
					'section-how': 'Cómo se calculan las cuotas',
					'section-faq': 'Preguntas frecuentes',
					'ci-h2': 'Calculadora de interés compuesto y crecimiento de ahorros',
					'ci-label-principal': 'Depósito inicial',
					'ci-label-monthly': 'Aportación mensual',
					'ci-label-rate': 'Tasa de rendimiento anual',
					'ci-label-years': 'Período de inversión',
					'ci-result-label': 'Valor futuro',
					'ci-sub': 'Cartera total después de',
					'ci-deposited': 'Total depositado',
					'ci-earned': 'Intereses ganados',
					'ci-mult': 'Multiplicador de crecimiento',
					'ci-year': 'Año objetivo',
					'ci-chart-h': 'Crecimiento año a año',
					'rf-h2': 'Calculadora de refinanciación: ¿cuánto ahorrará?',
					'rf-current': 'Préstamo actual',
					'rf-new': 'Nueva oferta de préstamo',
					'rf-balance': 'Saldo restante',
					'rf-oldrate': 'Tasa de interés actual',
					'rf-remaining': 'Años restantes',
					'rf-newrate': 'Nueva tasa de interés',
					'rf-costs': 'Costos de cierre',
					'rf-monthly': 'Ahorro mensual',
					'rf-old': 'Cuota anterior',
					'rf-new-pay': 'Nueva cuota',
					'rf-breakeven': 'Punto de equilibrio',
					'rf-total': 'Ahorro total en la vida del préstamo',
					'cur-h2': 'Conversor de divisas en vivo, precio del oro, petróleo y acciones hoy',
					'gold-local-lbl': 'Precio en su moneda',
					'oil-local-lbl': 'Precio en su moneda',
					'footer-mortgage': 'Calculadora de hipotecas',
					'footer-loan': 'Calculadora de préstamos',
					'footer-savings': 'Calculadora de ahorros',
					'footer-refinance': 'Calculadora de refinanciación',
					'footer-currency': 'Convertidor de divisas',
					'footer-privacy': 'Política de privacidad',
					'footer-dnsmi': 'No vender ni compartir mi información personal',
					'footer-rights': 'Todos los derechos reservados.',
					'footer-desc': 'Calculadoras financieras gratuitas: préstamos, ahorros, refinanciación, divisas. Sin cuenta requerida.',
					'footer-disclaimer': 'LoanCalc proporciona estimaciones solo con fines informativos. Esto no es asesoramiento financiero.',
					'seo-mort-h2': 'Calculadora hipotecaria: todo lo que necesitas saber',
					'seo-mort-h3-1': '¿Qué es una calculadora hipotecaria y quién debería usarla?',
					'seo-mort-p1': 'Una calculadora hipotecaria es una herramienta financiera que calcula tu cuota mensual de un préstamo hipotecario a partir de tres datos: el importe del préstamo (capital), la tasa de interés anual y el plazo en años. Cualquiera que esté considerando comprar una vivienda, comparar ofertas de préstamo o entender el costo a largo plazo del endeudamiento debería usarla antes de firmar una hipoteca.',
					'seo-mort-p2': 'Los compradores de primera vivienda usan calculadoras hipotecarias para comprobar si pueden permitirse una casa antes de buscarla. Los propietarios actuales las usan para explorar escenarios de refinanciación o simular el impacto de pagos adicionales. Los inversores inmobiliarios las usan para estimar el flujo de caja de propiedades en alquiler. La calculadora funciona igual para hipotecas a tipo fijo en todo el mundo, ya sea en USD, EUR, GBP u otra divisa.',
					'seo-mort-h3-2': 'Cómo funciona la fórmula de la cuota mensual',
					'seo-mort-p3': 'Toda hipoteca a tipo fijo usa la misma fórmula estándar de amortización:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'Donde <strong>M</strong> es tu cuota mensual, <strong>P</strong> es el capital del préstamo, <strong>r</strong> es la tasa mensual (tasa anual ÷ 12) y <strong>n</strong> es el número total de cuotas (años × 12). Esta fórmula produce una cuota mensual fija que cubre tanto los intereses sobre el capital pendiente como parte del capital, con una proporción que cambia con el tiempo. En los primeros años, la mayor parte de cada cuota son intereses. En los últimos años, la mayor parte reduce el capital.',
					'seo-mort-h3-3': '¿Qué factores afectan a tu tipo de interés hipotecario?',
					'seo-mort-p6': 'Tu tipo de interés real depende de varios factores que los prestamistas evalúan al aprobar tu solicitud:',
					'seo-mort-li-1': '<strong>Puntuación crediticia:</strong> Los prestatarios con puntuaciones superiores a 760 suelen obtener los tipos más bajos. Cada caída de 20 puntos puede aumentar tu tipo entre un 0,1 y un 0,5%, añadiendo miles en intereses totales a lo largo de 30 años.',
					'seo-mort-li-2': '<strong>Relación préstamo/valor (LTV):</strong> Un LTV más bajo (mayor entrada) indica menos riesgo para el prestamista. Dar una entrada del 20% o más suele eliminar el seguro hipotecario privado (PMI) y puede darte acceso a un mejor tipo.',
					'seo-mort-li-3': '<strong>Tipo de préstamo:</strong> Los préstamos conformes (dentro de los límites de Fannie Mae/Freddie Mac) suelen tener tipos más bajos que los jumbo. Los préstamos avalados por el gobierno (FHA, VA, USDA) tienen sus propias estructuras de tipos.',
					'seo-mort-li-4': '<strong>Plazo del préstamo:</strong> Las hipotecas a 15 años tienen tipos de interés más bajos que las de 30 años porque el dinero del prestamista está en riesgo durante menos tiempo.',
					'seo-mort-li-5': '<strong>Condiciones del mercado:</strong> Los tipos hipotecarios están muy influenciados por el rendimiento del bono del Tesoro a 10 años y la política de la Reserva Federal. Cuando la Fed sube los tipos para combatir la inflación, los tipos hipotecarios tienden a subir también.',
					'seo-mort-h3-4': 'Hipoteca a 15 años frente a 30 años: el verdadero dilema',
					'seo-mort-p12': 'La elección entre una hipoteca a 15 y 30 años es fundamentalmente un equilibrio entre el flujo de caja mensual y los intereses totales pagados. Aquí tienes un ejemplo para un préstamo de 300.000 $:',
					'seo-mort-th-loan': 'Préstamo',
					'seo-mort-th-rate': 'Tipo',
					'seo-mort-p13': 'Al 6,5%, una hipoteca a 30 años cuesta 382.633 $ en intereses totales frente a 170.453 $ para una hipoteca a 15 años, una diferencia de más de 212.000 $. Sin embargo, la cuota mensual de la hipoteca a 30 años es 718 $ más baja, lo que es muy relevante si el flujo de caja es ajustado o si quieres invertir la diferencia.',
					'seo-mort-h3-5': '¿Qué es el PMI y cuándo se aplica?',
					'seo-mort-p14': 'El seguro hipotecario privado (PMI) es obligatorio en la mayoría de los prestamistas estadounidenses cuando tu entrada es inferior al 20% del precio de compra. El PMI protege al prestamista si incumples. El costo típico es del 0,5 al 1,5% del importe del préstamo al año, añadido a tu cuota mensual. En un préstamo de 300.000 $, el PMI puede añadir de 125 a 375 $ al mes. Una vez que tu capital propio alcanza el 20% (mediante pagos o revalorización), generalmente puedes solicitar la cancelación del PMI. Los prestamistas deben cancelarlo automáticamente cuando el saldo alcanza el 78% del precio de compra original.',
					'seo-mort-h3-6': 'Cómo pagar tu hipoteca más rápido',
					'seo-mort-li-6': '<strong>Haz un pago adicional al año:</strong> En una hipoteca a 30 años, un pago mensual adicional al año reduce el plazo en aproximadamente 4 o 5 años y ahorra decenas de miles en intereses.',
					'seo-mort-li-7': '<strong>Cambia a pagos quincenales:</strong> En vez de 12 pagos mensuales, haz 26 medios pagos al año. Esto equivale a un pago completo adicional al año sin que notes un impacto significativo en tu liquidez.',
					'seo-mort-li-8': '<strong>Redondea tu pago:</strong> Si tu cuota es de 1.847 $, pagar 1.900 $ o 2.000 $ cada mes destina el importe extra directamente al capital, acelerando la amortización.',
					'seo-mort-li-9': '<strong>Aplica ingresos extraordinarios:</strong> Devoluciones de impuestos, bonificaciones o herencias aplicadas como pagos de capital a tanto alzado pueden recortar años de tu hipoteca.',
					'seo-mort-p15': 'También útil: <a href="/refinance-calculator/">Calculadora de refinanciación</a> — comprueba si un tipo más bajo tiene sentido para tu hipoteca actual. O explora <a href="/loan-calculator/">otros tipos de préstamos</a> incluyendo créditos de coche, personales y estudiantiles.',
					'seo-ci-h2': 'Interés compuesto y ahorro: la guía completa',
					'seo-ci-h3-1': '¿Qué es el interés compuesto y por qué importa?',
					'seo-ci-h3-2': 'Capitalización diaria vs mensual vs anual — cómo afecta al crecimiento',
					'seo-ci-h3-3': 'La regla del 72 explicada',
					'seo-ci-h3-4': 'El coste de esperar: empezar a los 25 vs 35 vs 45',
					'seo-ci-h3-5': 'Cuentas de ahorro de alto rendimiento vs fondos indexados: tasas habituales',
					'seo-ci-p1': 'El interés compuesto es el interés calculado tanto sobre el capital inicial como sobre los intereses acumulados de todos los períodos anteriores. Esto es fundamentalmente diferente del interés simple, que solo se calcula sobre el capital original. A Albert Einstein se le atribuye haber llamado al interés compuesto "la octava maravilla del mundo. Quien lo entiende, lo gana; quien no, lo paga."',
					'seo-ci-p2': 'La razón por la que el interés compuesto es tan poderoso es el crecimiento exponencial. En los primeros años, el efecto es sutil. Pero a lo largo de 20, 30 o 40 años, el efecto de capitalización se vuelve extraordinario: la mayor parte de tu riqueza final proviene no de tus aportaciones sino de los intereses generados sobre intereses generados sobre intereses.',
					'seo-ci-p3': 'La frecuencia de capitalización determina con qué regularidad se calculan los intereses y se añaden al saldo. Una capitalización más frecuente significa rendimientos ligeramente mayores:',
					'seo-ci-p4': 'Para cuentas de ahorro y fondos del mercado monetario, la capitalización mensual es estándar. Las cuentas de ahorro de alto rendimiento en bancos en línea suelen capitalizar diariamente. La diferencia entre la capitalización mensual y la diaria es pequeña: la tasa de interés en sí importa mucho más que la frecuencia de capitalización.',
					'seo-ci-p5': 'La regla del 72 es un atajo mental simple: divide 72 entre tu tasa de rendimiento anual para estimar en cuántos años se duplica el valor de tu inversión.',
					'seo-ci-p6': 'La regla también funciona a la inversa: si quieres duplicar tu dinero en 8 años, necesitas una tasa de al menos 72 ÷ 8 = 9% anual.',
					'seo-ci-p7': 'El factor más poderoso en el ahorro es el tiempo. Considera invertir $200 al mes con un rendimiento anual del 7% sin depósito inicial:',
					'seo-ci-p8': 'Empezar a los 25 en lugar de a los 35 solo cuesta $24,000 más en aportaciones pero genera $285,000 más de riqueza: un retorno de 12x sobre esos $24,000 adicionales. El mensaje es claro: empieza pronto, incluso con pequeñas cantidades.',
					'seo-ci-p9': 'La tasa de rendimiento que elijas en esta calculadora debe reflejar dónde guardarás realmente tus ahorros:',
					'seo-ci-p10': 'Ver también: <a href="/refinance-calculator/">Calculadora de refinanciación</a> — los intereses que ahorras refinanciando una hipoteca pueden redirigirse al ahorro.',
					'seo-ci-li-1': '<strong>Capitalización anual:</strong> Intereses añadidos una vez al año. Tasa base.',
					'seo-ci-li-2': '<strong>Capitalización mensual:</strong> Intereses añadidos 12 veces al año. Una tasa anual del 6% capitalizada mensualmente equivale a una tasa anual efectiva del 6,168%.',
					'seo-ci-li-3': '<strong>Capitalización diaria:</strong> Intereses añadidos 365 veces al año. Una tasa del 6% capitalizada diariamente da una tasa efectiva del 6,183%. Marginalmente mejor que la mensual.',
					'seo-ci-li-4': 'Al 4% (ahorro alto rendimiento): 72 ÷ 4 = <strong>18 años</strong> para duplicar',
					'seo-ci-li-5': 'Al 7% (promedio del mercado bursátil): 72 ÷ 7 = <strong>10,3 años</strong> para duplicar',
					'seo-ci-li-6': 'Al 10% (crecimiento agresivo): 72 ÷ 10 = <strong>7,2 años</strong> para duplicar',
					'seo-ci-li-7': 'Al 12% (retornos de capital riesgo): 72 ÷ 12 = <strong>6 años</strong> para duplicar',
					'seo-ci-li-8': '<strong>Cuenta de ahorro tradicional:</strong> 0,01–0,5% APY. Pierde valor efectivamente ante la inflación. Solo adecuada para fondos de emergencia de acceso inmediato.',
					'seo-ci-li-9': '<strong>Cuenta de ahorro de alto rendimiento (bancos en línea):</strong> 4–5% APY en un entorno de tasas altas. Seguro FDIC. Excelente para fondos de emergencia y metas a corto plazo (1–3 años).',
					'seo-ci-li-10': '<strong>Cuentas del mercado monetario:</strong> 4–5% APY. Similares a las HYSA con condiciones de acceso ligeramente diferentes.',
					'seo-ci-li-11': '<strong>Certificados de depósito (CDs):</strong> 4–5,5% APY con bloqueo de 6 meses a 5 años. Tasas más altas para plazos más largos.',
					'seo-ci-li-12': '<strong>Fondo indexado S&amp;P 500:</strong> ~10% de rendimiento nominal promedio (7% después de la inflación) históricamente. No garantizado. Mejor para metas a 5+ años. Sujeto a volatilidad del mercado.',
					'seo-ci-li-13': '<strong>Fondo total del mercado de bonos:</strong> 3–5% históricamente. Menor volatilidad que las acciones. Adecuado para metas a medio plazo.',
					'seo-ci-th-start': 'Edad de inicio',
					'seo-ci-th-end': 'Edad de fin',
					'seo-ci-th-years': 'Años invertidos',
					'seo-ci-th-contributed': 'Total aportado',
					'seo-ci-th-final': 'Valor final',
					'seo-ci-th-interest': 'Intereses ganados',
					'seo-rf-h2': 'Refinanciar su hipoteca: cuándo tiene sentido',
					'seo-rf-h3-1': 'Cuándo tiene sentido financiero refinanciar',
					'seo-rf-h3-2': 'Cómo calcular el punto de equilibrio',
					'seo-rf-h3-3': 'Refinanciación con extracción de efectivo vs refinanciación por tasa y plazo',
					'seo-rf-h3-4': 'Costos ocultos de la refinanciación',
					'seo-rf-h3-5': 'Cuándo NO refinanciar',
					'seo-rf-p1': 'La refinanciación reemplaza su préstamo existente por uno nuevo, idealmente a una tasa de interés más baja. La decisión se reduce a una pregunta fundamental: ¿superarán los ahorros a largo plazo los costos iniciales y permanecerá en el préstamo el tiempo suficiente para recuperar esos costos? La refinanciación tiene más sentido cuando:',
					'seo-rf-p2': 'El cálculo del punto de equilibrio es simple: divida sus costos de cierre totales entre sus ahorros mensuales.',
					'seo-rf-formula': '<strong>Meses hasta el equilibrio = Costos de cierre ÷ Ahorro mensual en pagos</strong>',
					'seo-rf-p3': 'Ejemplo: Si la refinanciación cuesta $4,500 en costos de cierre y le ahorra $200 al mes, el punto de equilibrio es 4,500 ÷ 200 = 22.5 meses — aproximadamente 2 años. Si planea quedarse en su vivienda al menos otros 3–5 años, esta refinanciación tiene claro sentido financiero. Si planea mudarse en 18 meses, no lo tiene.',
					'seo-rf-p4': 'Hay dos tipos principales de refinanciación hipotecaria:',
					'seo-rf-p5': 'El verdadero costo de la refinanciación va más allá de los costos de cierre declarados. Las tarifas comunes incluyen:',
					'seo-rf-p6': 'Los costos de cierre totales de una refinanciación típica son del 2 al 3% del monto del préstamo. En un préstamo de $300,000, espere entre $6,000 y $9,000 en costos a menos que elija una refinanciación "sin costos de cierre" (donde los costos se incorporan a la tasa).',
					'seo-rf-p7': 'Ver también: <a href="/loan-calculator/">Calculadora de hipotecas</a> — modele su hipoteca original o compare opciones de préstamo antes de decidir refinanciar.',
					'seo-rf-li-1': 'Su nueva tasa es al menos 0.5–1% más baja que su tasa actual',
					'seo-rf-li-2': 'Planea permanecer en el hogar más tiempo que el período de equilibrio',
					'seo-rf-li-3': 'Su puntaje crediticio ha mejorado significativamente desde su préstamo original',
					'seo-rf-li-4': 'Desea cambiar de una hipoteca de tasa ajustable a una de tasa fija para mayor estabilidad',
					'seo-rf-li-5': 'Desea acortar el plazo de su préstamo (p. ej., de 30 a 15 años) y puede permitirse pagos mensuales más altos',
					'seo-rf-li-6': '<strong>Refinanciación por tasa y plazo:</strong> Reemplaza su hipoteca existente por una nueva con mejor tasa y/o plazo diferente, sin cambiar el saldo del préstamo. Este es el tipo más común y lo que modela esta calculadora. El objetivo es puramente reducir su costo de intereses.',
					'seo-rf-li-7': '<strong>Refinanciación con extracción de efectivo:</strong> Pide prestado más que el saldo de su préstamo actual, recibiendo la diferencia en efectivo. Por ejemplo, si su vivienda vale $400,000 y debe $250,000, podría refinanciar por $320,000 y tomar $70,000 en efectivo para mejoras del hogar, consolidación de deudas u otros fines. La refinanciación con extracción de efectivo restablece su patrimonio y generalmente conlleva una tasa ligeramente más alta.',
					'seo-rf-li-8': '<strong>Tarifa de originación:</strong> 0.5–1% del monto del préstamo. La tarifa del prestamista por procesar el nuevo préstamo.',
					'seo-rf-li-9': '<strong>Tarifa de tasación:</strong> $300–$600. La mayoría de los prestamistas requieren una tasación nueva para confirmar el valor actual de su vivienda.',
					'seo-rf-li-10': '<strong>Seguro de título:</strong> $500–$1,500. Requerido para proteger al prestamista contra disputas de título.',
					'seo-rf-li-11': '<strong>Tarifas de registro:</strong> $25–$250. Tarifas gubernamentales para registrar la nueva hipoteca.',
					'seo-rf-li-12': '<strong>Puntos de descuento:</strong> Interés prepagado opcional para "reducir" su tasa. Un punto = 1% del monto del préstamo = reducción de tasa típica del 0.25%.',
					'seo-rf-li-13': '<strong>Próximamente se mudará:</strong> Si venderá la vivienda antes de alcanzar el punto de equilibrio, la refinanciación cuesta más de lo que ahorra.',
					'seo-rf-li-14': '<strong>Penalidades por pago anticipado:</strong> Algunos préstamos cobran tarifas por pagar anticipadamente. Verifique los términos de su préstamo actual antes de refinanciar.',
					'seo-rf-li-15': '<strong>Ha pagado la mayor parte del préstamo:</strong> Reiniciar a un nuevo plazo de 30 años en un préstamo que tiene 20 años extiende significativamente su deuda, incluso si la tasa es más baja.',
					'seo-rf-li-16': '<strong>Su puntaje crediticio ha bajado:</strong> Si su crédito ha empeorado desde su hipoteca original, es posible que no califique para una mejor tasa y podría recibir una tasa más alta.',
					'seo-cur-h2': 'Cambio de divisas, oro, petróleo y precios de acciones: cómo funcionan las tasas en vivo',
					'seo-cur-h3-1': 'Cómo funcionan las tasas de cambio en vivo',
					'seo-cur-p1': 'Las tasas de cambio de divisas son determinadas por el mercado de divisas (forex), el mayor mercado financiero del mundo con más de 7 billones de dólares en volumen diario de operaciones. La tasa "en vivo" que ve en este sitio es la tasa de mercado medio (también llamada tasa interbancaria o tasa al contado), que es el punto medio entre los precios de compra y venta que usan los bancos al negociar grandes volúmenes entre sí.',
					'seo-cur-p2': 'Las tasas mostradas aquí provienen de la API Frankfurter, que agrega datos del Banco Central Europeo y otras fuentes financieras. Se actualizan diariamente y se almacenan en caché para el rendimiento. Para tasas en tiempo real con precisión de milisegundos, los operadores institucionales usan plataformas forex dedicadas — pero para planificación de viajes, transferencias internacionales y referencia general, estas tasas son precisas en una fracción de punto porcentual.',
					'seo-cur-h3-2': 'Qué afecta las tasas de cambio de divisas',
					'seo-cur-p3': 'Las tasas de cambio cambian constantemente en función de una compleja combinación de factores económicos y políticos:',
					'seo-cur-li-1': '<strong>Diferenciales de tasas de interés:</strong> Cuando un banco central sube las tasas de interés, su moneda generalmente se fortalece porque las tasas más altas atraen capital extranjero en busca de mejores rendimientos. Las decisiones de la Reserva Federal de EE. UU. a menudo mueven las tasas de cambio globales.',
					'seo-cur-li-2': '<strong>Inflación:</strong> Una inflación más alta erosiona el poder adquisitivo de una moneda con el tiempo. Los países con inflación baja y estable tienden a tener monedas más fuertes. El par EUR/USD, por ejemplo, se vigila de cerca para detectar diferenciales de inflación entre EE. UU. y la Eurozona.',
					'seo-cur-li-3': '<strong>Balanza comercial:</strong> Los países que exportan más de lo que importan (superávit comercial) tienen mayor demanda de su moneda, lo que eleva su valor. Los países con déficits comerciales persistentes pueden ver debilitarse su moneda con el tiempo.',
					'seo-cur-li-4': '<strong>Estabilidad política:</strong> La incertidumbre política, las elecciones o los conflictos geopolíticos pueden causar movimientos rápidos en las divisas. Las monedas de refugio seguro como el USD, CHF y JPY a menudo se fortalecen durante las crisis globales.',
					'seo-cur-li-5': '<strong>Crecimiento del PIB:</strong> Un fuerte crecimiento económico aumenta la demanda de una moneda a medida que los inversores despliegan capital en esa economía.',
					'seo-cur-h3-3': 'Tasa de mercado medio vs tasa bancaria: por qué existe un diferencial',
					'seo-cur-p4': 'La tasa que ve en este conversor es la tasa de mercado medio — el punto medio teórico entre los precios de compra y venta. Cuando realmente cambia dinero a través de un banco, tarjeta de crédito o servicio de transferencia, recibirá una tasa peor. La diferencia se llama diferencial, y es como los negocios de cambio de divisas obtienen sus ganancias.',
					'seo-cur-li-6': '<strong>Bancos y quioscos de aeropuerto:</strong> Típicamente cobran 3–10% por encima de la tasa de mercado medio. Los peores para cantidades pequeñas y ubicaciones turísticas.',
					'seo-cur-li-7': '<strong>Tarjetas de crédito:</strong> Usualmente cobran 1–3% como comisión por transacción extranjera. A menudo la mejor opción para compras en el extranjero, especialmente las tarjetas sin comisión por transacción extranjera.',
					'seo-cur-li-8': '<strong>Servicios de transferencia especializados (Wise, Revolut):</strong> Cobran 0,3–1% por encima de la tasa de mercado medio. Los mejores para grandes transferencias internacionales.',
					'seo-cur-p5': 'Para calcular lo que realmente recibirá: tome la tasa de mercado medio y reste el porcentaje de diferencial del proveedor. Si ve 1 USD = 0,92 EUR al precio de mercado medio y su banco cobra 3%, recibirá aproximadamente 0,92 × (1 - 0,03) = 0,892 EUR por dólar.',
					'seo-cur-h3-4': 'El oro como cobertura de divisas: cómo se cotiza el XAU',
					'seo-cur-p6': 'El oro (símbolo de cotización XAU) se cotiza en dólares estadounidenses por onza troy en los mercados internacionales. La onza troy es la unidad estándar para los metales preciosos y equivale a aproximadamente 31,1 gramos (ligeramente más pesada que una onza avoirdupois estándar de 28,35 gramos). Una onza troy = 31,1035 gramos exactamente.',
					'seo-cur-p7': 'El oro funciona como cobertura contra la devaluación de divisas y la inflación. Cuando el dólar estadounidense se debilita o la inflación sube, los precios del oro a menudo suben — no porque el oro mismo cambie, sino porque se necesitan más dólares para comprar el mismo peso de oro. El oro ha mantenido su poder adquisitivo durante siglos mientras las divisas individuales se han depreciado. El precio del oro en este sitio proviene de datos de mercado a través de Yahoo Finance, almacenado en caché por hora.',
					'seo-cur-p8': 'Los movimientos del precio del oro son impulsados por: reservas de oro de los bancos centrales, fortaleza del dólar estadounidense, tasas de interés reales (cuando las tasas reales son bajas o negativas, el oro se vuelve más atractivo), riesgo geopolítico y demanda de joyería/industrial.',
					'seo-cur-h3-5': 'Petróleo crudo WTI: por qué se cotiza en USD y qué mueve el precio',
					'seo-cur-p9': 'El West Texas Intermediate (WTI) es el principal índice de referencia del petróleo crudo para América del Norte y una referencia de precios global importante. Se cotiza en dólares estadounidenses por barril (1 barril = 42 galones estadounidenses = aproximadamente 159 litros). El petróleo se ha cotizado en USD desde el acuerdo Petrodólar de los años 70, creando una demanda global de dólares estadounidenses ya que todos los países que importan petróleo necesitan dólares para pagarlo.',
					'seo-cur-p10': 'Factores clave que impulsan los precios del petróleo:',
					'seo-cur-li-9': '<strong>Decisiones de producción de la OPEP+:</strong> El cártel de la OPEP y los productores aliados (Rusia, etc.) controlan aproximadamente el 40% del suministro global. Los recortes de producción elevan los precios; los aumentos los reducen.',
					'seo-cur-li-10': '<strong>Producción de petróleo de esquisto de EE. UU.:</strong> EE. UU. se convirtió en el mayor productor de petróleo del mundo en parte gracias a la tecnología de esquisto. Una mayor producción estadounidense compite con la OPEP y puede limitar los aumentos de precios.',
					'seo-cur-li-11': '<strong>Demanda global:</strong> El crecimiento económico en China e India (grandes consumidores de petróleo) es un motor importante de la demanda. Las recesiones reducen la demanda y bajan los precios.',
					'seo-cur-li-12': '<strong>Eventos geopolíticos:</strong> Los conflictos en regiones productoras de petróleo (Medio Oriente, Rusia) crean primas de riesgo de suministro que elevan los precios.',
					'seo-cur-li-13': '<strong>Fortaleza del USD:</strong> Dado que el petróleo se cotiza en USD, un dólar más fuerte hace que el petróleo sea más caro para los compradores no estadounidenses, reduciendo la demanda y ejerciendo presión a la baja sobre los precios.',
					'seo-cur-h3-6': 'Precios de acciones en vivo: principales valores de EE. UU. actualizados cada hora',
					'seo-cur-p11': 'LoanCalc muestra precios en vivo de diez acciones y fondos estadounidenses ampliamente seguidos: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) y el SPDR S&P 500 ETF Trust (SPY). Los precios se obtienen de Yahoo Finance y se actualizan cada hora — el mismo intervalo que los datos de oro y petróleo.',
					'seo-cur-p12': 'Cada chip de acción muestra el precio actual en USD, el cambio porcentual desde el cierre anterior (flecha verde para ganancias, roja para pérdidas) y el precio equivalente en su moneda local usando la tasa de cambio en vivo. Esto facilita el seguimiento del valor de posiciones en acciones estadounidenses desde cualquier parte del mundo sin cambiar de aplicación.',
					'seo-cur-p13': 'El S&amp;P 500 ETF (SPY) se incluye como referencia amplia del mercado: cuando SPY sube, el mercado estadounidense en general está subiendo. Las acciones individuales como NVDA y TSLA tienen mayor volatilidad. Use la <a href="/savings-calculator/">Calculadora de ahorros</a> con un rendimiento anual del 7–10% para modelar el crecimiento a largo plazo del S&amp;P 500.',
					'seo-cur-p14': 'Vea también: <a href="/savings-calculator/">Calculadora de ahorros</a> — modele cómo crecen los rendimientos de divisas o las inversiones vinculadas a materias primas con el tiempo.',
					'lbl-market-prices': 'Precios de mercado',
					'cur-rate-unavailable': 'Tasa no disponible',
					'cur-not-in-feed': 'No disponible en el feed en vivo',
					'cur-today': 'hoy',
					'cur-status-fetching': 'Obteniendo tipos de cambio…',
					'cur-status-live': 'Tasas en vivo · {date} · 161 monedas · actualización cada 24h',
					'cur-status-partial': 'Tasas cargadas · {date} (33 monedas)',
					'cur-status-offline': 'Tasas sin conexión: monedas limitadas disponibles',
					'cmd-fetching': 'Cargando…',
					'cmd-live': 'En vivo · {date}',
					'cmd-approx': 'Aprox · verificar datos en vivo',
					'cur-status-cached': 'Tasas del {date} · en caché · actualización cada 24h',
					'clamp-min': 'Mínimo:',
					'clamp-max': 'Máximo:'
				},
				de: {
					'nav-loans': 'Kredite',
					'nav-savings': 'Ersparnisse',
					'nav-refinance': 'Refinanzierung',
					'nav-currency': 'Währungen',
					'btn-settings': 'Einstellungen',
					'pref-title': 'Einstellungen',
					'pref-language': 'Anzeigesprache',
					'pref-lang-note': 'Ändert Beschriftungen und Zahlenformatierung.',
					'pref-currency': 'Bevorzugte Währung',
					'pref-currency-note': 'Standardwährung für den Konverter.',
					'pref-current': 'Aktuelle Einstellungen',
					'pref-save': 'Einstellungen speichern',
					'toast-saved': 'Einstellungen gespeichert',
					'pref-cancel': 'Abbrechen',
					'ci-sub-desc': 'Sehen Sie, wie Ihr Erspartes Jahr für Jahr wächst.',
					'tab-mortgage': 'Hypothek',
					'tab-car': 'Autokredit',
					'tab-personal': 'Privatkredit',
					'tab-student': 'Studienkredit',
					'tab-afford': 'Leistbar',
					'afford-pmt-label': 'Monatliche Rate die ich mir leisten kann',
					'afford-result-label': 'Sie könnten bis zu leihen',
					'afford-sub': 'Finanzierbarkeitsschätzung',
					'hero-sub': 'Kreditrechner, Zinseszins, Refinanzierungsersparnis, Live-Währungsrechner, Goldpreis, Ölpreis und Live-Aktienkurse: kostenlos, sofort, ohne Anmeldung.',
					'trust-1': 'Für immer kostenlos',
					'trust-2': 'Keine Anmeldung',
					'trust-3': 'Weltweit nutzbar',
					'cur-amount-label': 'Betrag',
					'cur-to-label': 'Umgerechnet in',
					'cur-quick': 'Schnellreferenz',
					'gold-per': 'pro Feinunze',
					'gold-local': 'Preis in Ihrer Währung',
					'oil-per': 'pro Barrel',
					'oil-local': 'Preis in Ihrer Währung',
					'faq-heading': 'Häufige Fragen zu Krediten, Ersparnissen und Währungen',
					'chart-center-lbl': 'Kapital',
					'chart-stat-principal': 'Geliehenes Kapital',
					'chart-stat-interest': 'Gesamtzinsen gezahlt',
					'chart-stat-total': 'Gesamtrückzahlung',
					'chart-stat-payoff': 'Kredit vollständig abbezahlt',
					'breakdown-sub': 'Wie Ihre Gesamtkosten zwischen dem geliehenen Betrag und den gezahlten Zinsen aufgeteilt sind.',
					'amort-sub': 'Jährliche Aufschlüsselung jeder Zahlung.',
					'ci-section-sub': 'Sehen Sie, wie Ihre Ersparnisse mit Zinseszins jedes Jahr wachsen.',
					'cur-section-sub': 'Konvertieren Sie zwischen Hauptwährungen mit Live-Kursen. Gold- und Ölpreise in Ihrer Landeswährung.',
					'ci-chart-sub': 'Saldo am Jahresende, aufgeteilt zwischen Einzahlungen und Zinseszinswachstum.',
					'per-oz-usd': 'pro Unze in USD',
					'per-bbl-usd': 'pro Barrel in USD',
					'lbl-stocks': 'Aktien',
					'lbl-tab-currency': 'Währungen',
					'lbl-tab-commodities': 'Rohstoffe',
					'lbl-tab-stocks': 'Aktien',
					'age-just-now': 'gerade eben',
					'age-min-ago': 'vor {n} Min.',
					'age-hours-ago': 'vor {n} Std.',
					'lbl-currencies': 'Währungen',
					'lbl-rates-from': 'Kurse von',
					'lbl-from': 'Von',
					'nav-faq': 'FAQ',
					'unit-mo': '/Mon.',
					'weight-1g': '1g',
					'weight-10g': '10g',
					'weight-1kg': '1 kg',
					'weight-5bbl': '5 Fass',
					'weight-10bbl': '10 Fass',
					'weight-100bbl': '100 Fass',
					'lbl-price-unavailable': 'Preis nicht verfügbar',
					'lbl-updating': 'Wird aktualisiert…',
					'lbl-partial-rates': 'Teilkurse',
					'rf-sub': 'Pro Monat mit dem neuen Zinssatz',
					'rf-verdict-init': 'Geben Sie Ihre Kreditdaten ein, um zu sehen, ob eine Refinanzierung sinnvoll ist.',
					'rf-verdict-higher': 'Der neue Zinssatz ist nicht niedriger: Refinanzierung würde Ihre Rate erhöhen.',
					'rf-verdict-long': 'Monatliche Ersparnis vorhanden, aber der Break-even übersteigt die Restlaufzeit. Nicht empfohlen.',
					'rf-verdict-good': 'Refinanzierung scheint sich zu lohnen.',
					'rf-verdict-summary': 'Sie sparen {monthly}/Monat und erreichen Break-even in {breakeven}. Gesamtersparnis: {total}.',
					'rf-never': 'Nie',
					'rf-over-term': '>{n} J.',
					'rf-months': '{n} Mon.',
					'rf-years-mo': '{y}J. {m}M.',
					'loan-desc': 'Nutzen Sie diesen kostenlosen Rechner für Ihre genaue monatliche Rate jeder Hypothek, jeden Autokredit, Privatkredit oder Studienkredit.',
					'ci-desc': 'Der Zinseszinsrechner zeigt, wie eine Ersteinzahlung wächst. Geben Sie Startbetrag, monatlichen Beitrag, Rendite und Anlagezeitraum ein.',
					'rf-desc': 'Der Refinanzierungsrechner hilft Ihnen zu entscheiden, ob eine Refinanzierung lohnt.',
					'cur-desc': 'LoanCalc unterstützt 161 Weltwährungen mit Live-Kursen, die alle 24 Stunden aktualisiert werden.',
					'how-p1': 'Jeder Festzinskredit verwendet dieselbe Standard-Tilgungsformel.',
					'how-p2': 'Drei Faktoren bestimmen Ihre monatliche Rate.',
					'unit-years': 'Jahre',
					'unit-yr': 'Jahr',
					'unit-yrs': 'Jahre',
					'ci-earned-short': 'Wachstum',
					'cur-rate-lbl': 'Kurs',
					'cur-inverse-lbl': 'Umgekehrt',
					'cur-updated-lbl': 'Aktualisiert',
					'how-formula-h': 'Die Formel',
					'how-lower-h': 'Wie Sie Ihre monatliche Rate senken',
					'formula-m': 'Monatliche Rate',
					'formula-p': 'Kapital (Darlehensbetrag)',
					'formula-r': 'Monatssatz (Jahreszins ÷ 12)',
					'formula-n': 'Gesamtzahlungen (Jahre × 12)',
					'tip-1': 'Eine höhere Anzahlung reduziert das Kapital direkt: weniger Kredit bedeutet niedrigere Raten und weniger Gesamtzinsen.',
					'tip-2': 'Eine längere Laufzeit verteilt Zahlungen über mehr Monate. Die Rate sinkt, aber die Gesamtzinsen steigen.',
					'tip-3': 'Ein niedrigerer Zinssatz hat einen kumulativen Effekt: bereits 0,5% Unterschied bei einem großen Kredit spart Zehntausende.',
					'tip-4': 'Eine bessere Kreditwürdigkeit verschafft Ihnen in der Regel bessere Konditionen.',
					'faq-q1': 'Wie wird die monatliche Kreditrate berechnet?',
					'faq-q2': 'Was ist ein Tilgungsplan?',
					'faq-q3': 'Funktioniert dieser Rechner in allen Ländern?',
					'faq-q4': 'Wie kann ich die Gesamtzinsen reduzieren?',
					'faq-q5': 'Ist LoanCalc völlig kostenlos?',
					'faq-q6': 'Wie funktioniert der Refinanzierungsrechner?',
					'faq-q7': 'Wie wird der Goldpreis berechnet und aktualisiert?',
					'faq-q8': 'Welche Währungen unterstützt der Rechner?',
					'loan-label-mortgage': '30-jährige Festhypothek',
					'loan-label-car': '5-jähriger Autokredit',
					'loan-label-personal': '3-jähriger Privatkredit',
					'loan-label-student': '10-jähriger Studienkredit',
					'helper-title-mortgage': 'Typische 30-jährige Hypothek',
					'helper-title-car': 'Typischer Autokredit',
					'helper-title-personal': 'Typischer Privatkredit',
					'helper-title-student': 'Bundesstudienkredit (US)',
					'helper-text-mortgage': 'Durchschnittlicher 30-Jahres-Zinssatz: 6,5–7 %.',
					'helper-text-car': 'Durchschnittlicher Zinssatz für Neuwagen: 6–8 %.',
					'helper-text-personal': 'Zinssätze für Privatkredite: 6–36 %.',
					'helper-text-student': 'Zinssätze für Bundesstudentenkredite werden jährlich festgelegt.',
					'hero-h1': 'Kostenlose <em>Finanz</em>-<br>Rechner-Suite',
					'faq-q9': 'Welche Aktienkurse zeigt LoanCalc?',
					'extra-label': 'Zusätzliche Monatszahlung',
					'lbl-amount': 'Darlehensbetrag',
					'lbl-rate': 'Jährlicher Zinssatz',
					'lbl-term': 'Laufzeit',
					'res-monthly': 'Monatliche Rate',
					'freq-monthly': 'Monatlich',
					'freq-biweekly': '2-wöchentlich',
					'freq-per-2wk': '/ 2 Wo.',
					'res-principal': 'Kapital',
					'res-interest': 'Gesamtzinsen',
					'res-total': 'Gesamtkosten',
					'monthly-note': 'Nur Kapital und Zinsen, ohne Steuern, Versicherung und Gebühren',
					'hero-headline': 'Verstehe deine Zahlen.',
					'hero-subtitle': 'Kostenlose Rechner für Hypotheken, Ersparnisse, Umschuldungen und Devisen.',
					'hero-h1': 'Verstehe deine Zahlen.',
					'hero-stat-currencies': 'Währungen',
					'hero-stat-langs': 'Sprachen',
					'hero-stat-tools': 'Tools',
					'res-year': 'Tilgungsjahr',
					'lbl-principal-pct': 'Kapital',
					'lbl-interest-pct': 'Zinsen',
					'section-breakdown': 'Zahlungsaufteilung',
					'section-amort': 'Tilgungsplan',
					'amort-year': 'Jahr',
					'amort-month': 'Monat',
					'amort-start': 'Anfangsstand',
					'amort-ppaid': 'Tilgung',
					'amort-ipaid': 'Zinsen gezahlt',
					'amort-end': 'Endstand',
					'btn-show-all': 'Alle Jahre anzeigen',
					'btn-show-all-months': 'Alle Monate anzeigen',
					'btn-show-less': 'Weniger anzeigen',
					'amort-gran-yearly': 'Jährlich',
					'amort-gran-monthly': 'Monatlich',
					'section-how': 'Wie Kreditraten berechnet werden',
					'section-faq': 'Häufig gestellte Fragen',
					'ci-h2': 'Zinseszinsrechner und Sparwachstum',
					'ci-label-principal': 'Ersteinzahlung',
					'ci-label-monthly': 'Monatliche Einzahlung',
					'ci-label-rate': 'Jährliche Rendite',
					'ci-label-years': 'Anlagezeitraum',
					'ci-result-label': 'Zukünftiger Wert',
					'ci-sub': 'Gesamtportfolio nach',
					'ci-deposited': 'Gesamteinzahlung',
					'ci-earned': 'Zinsen erwirtschaftet',
					'ci-mult': 'Wachstumsfaktor',
					'ci-year': 'Zieljahr',
					'ci-chart-h': 'Jährliches Wachstum',
					'rf-h2': 'Refinanzierungsrechner: Wie viel sparen Sie?',
					'rf-current': 'Aktuelles Darlehen',
					'rf-new': 'Neues Kreditangebot',
					'rf-balance': 'Restschuld',
					'rf-oldrate': 'Aktueller Zinssatz',
					'rf-remaining': 'Verbleibende Jahre',
					'rf-newrate': 'Neuer Zinssatz',
					'rf-costs': 'Abschlusskosten',
					'rf-monthly': 'Monatliche Ersparnis',
					'rf-old': 'Alte Rate',
					'rf-new-pay': 'Neue Rate',
					'rf-breakeven': 'Zeit bis Break-even',
					'rf-total': 'Gesamtersparnis über die Laufzeit',
					'cur-h2': 'Live-Währungsrechner, Goldpreis, Ölpreis und Aktienkurse heute',
					'gold-local-lbl': 'Preis in Ihrer Währung',
					'oil-local-lbl': 'Preis in Ihrer Währung',
					'footer-mortgage': 'Hypothekenrechner',
					'footer-loan': 'Kreditrechner',
					'footer-savings': 'Sparrechner',
					'footer-refinance': 'Refinanzierungsrechner',
					'footer-currency': 'Währungsumrechner',
					'footer-privacy': 'Datenschutzrichtlinie',
					'footer-dnsmi': 'Meine persönlichen Daten nicht verkaufen oder weitergeben',
					'footer-rights': 'Alle Rechte vorbehalten.',
					'footer-desc': 'Kostenlose Finanzrechner: Kredit, Ersparnisse, Refinanzierung, Währungen. Kein Konto erforderlich.',
					'footer-disclaimer': 'LoanCalc liefert Schätzungen nur zu Informationszwecken. Dies ist keine Finanzberatung.',
					'seo-mort-h2': 'Hypothekenrechner: Alles was Sie wissen müssen',
					'seo-mort-h3-1': 'Was ist ein Hypothekenrechner und wer sollte ihn verwenden?',
					'seo-mort-p1': 'Ein Hypothekenrechner ist ein Finanzwerkzeug, das Ihre monatliche Rate für ein Immobiliendarlehen anhand von drei Eingaben berechnet: dem Darlehensbetrag (Kapital), dem jährlichen Zinssatz und der Laufzeit in Jahren. Jeder, der einen Hauskauf erwägt, Kreditangebote vergleicht oder die langfristigen Kreditkosten verstehen möchte, sollte ihn vor Unterzeichnung eines Hypothekenvertrags nutzen.',
					'seo-mort-p2': 'Erstkäufer nutzen Hypothekenrechner, um die Erschwinglichkeit vor der Wohnungssuche zu prüfen. Bestehende Eigentümer nutzen sie, um Refinanzierungsszenarien zu erkunden oder die Auswirkung von Sondertilgungen zu modellieren. Immobilieninvestoren nutzen sie zur Schätzung von Mietrenditen. Der Rechner funktioniert für Festzinshypotheken weltweit identisch — ob Sie in USD, EUR, GBP oder einer anderen Währung leihen.',
					'seo-mort-h3-2': 'Wie die Formel für die monatliche Rate funktioniert',
					'seo-mort-p3': 'Jede Festzinshypothek verwendet dieselbe standardmäßige Tilgungsformel:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'Dabei ist <strong>M</strong> Ihre monatliche Rate, <strong>P</strong> der Darlehensbetrag, <strong>r</strong> der monatliche Zinssatz (Jahreszins ÷ 12) und <strong>n</strong> die Gesamtzahl der monatlichen Zahlungen (Jahre × 12). Diese Formel ergibt eine gleichbleibende Monatsrate, die sowohl die auf dem Restkapital anfallenden Zinsen als auch einen Teil des Kapitals abdeckt, wobei sich das Verhältnis im Laufe der Zeit verschiebt. In den ersten Jahren macht Zinsen den größten Teil aus. In den letzten Jahren entfällt der Großteil auf die Tilgung.',
					'seo-mort-h3-3': 'Was beeinflusst Ihren Hypothekenzins?',
					'seo-mort-p6': 'Ihr tatsächlicher Hypothekenzins hängt von mehreren Faktoren ab, die Kreditgeber bei der Prüfung Ihres Antrags bewerten:',
					'seo-mort-li-1': '<strong>Kreditwürdigkeit:</strong> Kreditnehmer mit Scores über 760 erhalten in der Regel die günstigsten Zinssätze. Jeder Rückgang um 20 Punkte kann Ihren Zinssatz um 0,1–0,5 % erhöhen, was über 30 Jahre Tausende an Zinsen zusätzlich kostet.',
					'seo-mort-li-2': '<strong>Beleihungsauslauf (LTV):</strong> Ein niedrigerer LTV (höhere Anzahlung) signalisiert dem Kreditgeber geringeres Risiko. Eine Anzahlung von 20 % oder mehr beseitigt meist die private Hypothekenversicherung (PMI) und kann Ihnen bessere Konditionen verschaffen.',
					'seo-mort-li-3': '<strong>Kreditart:</strong> Konforme Darlehen (innerhalb der Fannie-Mae-/Freddie-Mac-Grenzen) haben typischerweise niedrigere Zinssätze als Jumbo-Darlehen. Staatlich abgesicherte Darlehen (FHA, VA, USDA) haben ihre eigenen Zinsstrukturen.',
					'seo-mort-li-4': '<strong>Kreditlaufzeit:</strong> 15-jährige Hypotheken haben niedrigere Zinssätze als 30-jährige, da das Geld des Kreditgebers kürzer exponiert ist.',
					'seo-mort-li-5': '<strong>Marktbedingungen:</strong> Hypothekenzinsen werden stark vom 10-Jahres-Staatsanleiherendite und der Politik der Federal Reserve beeinflusst. Wenn die Fed die Zinsen zur Bekämpfung der Inflation anhebt, steigen die Hypothekenzinsen in der Regel ebenfalls.',
					'seo-mort-h3-4': '15-jährige vs. 30-jährige Hypothek: der echte Kompromiss',
					'seo-mort-p12': 'Die Wahl zwischen einer 15- und 30-jährigen Hypothek ist grundlegend ein Kompromiss zwischen monatlichem Cashflow und gezahlten Gesamtzinsen. Hier ist ein Beispiel für ein Darlehen von 300.000 $:',
					'seo-mort-th-loan': 'Darlehen',
					'seo-mort-th-rate': 'Zinssatz',
					'seo-mort-p13': 'Bei 6,5 % kostet eine 30-jährige Hypothek insgesamt 382.633 $ Zinsen gegenüber 170.453 $ bei einer 15-jährigen Hypothek — eine Differenz von über 212.000 $. Die monatliche Rate der 30-jährigen Hypothek ist jedoch 718 $ niedriger, was erheblich ist, wenn die Liquidität knapp ist oder Sie die Differenz investieren möchten.',
					'seo-mort-h3-5': 'Was ist PMI und wann gilt sie?',
					'seo-mort-p14': 'Die private Hypothekenversicherung (PMI) ist bei den meisten US-Kreditgebern Pflicht, wenn Ihre Anzahlung weniger als 20 % des Kaufpreises beträgt. PMI schützt den Kreditgeber bei Zahlungsausfall. Die typischen Kosten betragen 0,5–1,5 % des Darlehensbetrags pro Jahr, die zu Ihrer Monatsrate hinzukommen. Bei einem Darlehen von 300.000 $ kann PMI 125–375 $ pro Monat hinzufügen. Sobald Ihr Eigenkapital 20 % erreicht (durch Zahlungen oder Wertsteigerung), können Sie in der Regel die PMI-Kündigung beantragen. Kreditgeber müssen PMI automatisch kündigen, wenn Ihr Darlehenssaldo 78 % des ursprünglichen Kaufpreises erreicht.',
					'seo-mort-h3-6': 'Wie Sie Ihre Hypothek schneller abbezahlen',
					'seo-mort-li-6': '<strong>Eine extra Zahlung pro Jahr leisten:</strong> Bei einer 30-jährigen Hypothek reduziert eine zusätzliche Monatsrate pro Jahr die Laufzeit um ca. 4–5 Jahre und spart Zehntausende an Zinsen.',
					'seo-mort-li-7': '<strong>Auf zweiwöchentliche Zahlungen umstellen:</strong> Statt 12 Monatsraten 26 halbe Zahlungen pro Jahr leisten. Das ergibt eine vollständige Extrazahlung jährlich, ohne dass Sie einen erheblichen Liquiditätseinfluss bemerken.',
					'seo-mort-li-8': '<strong>Zahlung aufrunden:</strong> Wenn Ihre Rate 1.847 $ beträgt, fließt die Differenz bei Zahlung von 1.900 $ oder 2.000 $ vollständig in die Tilgung und beschleunigt den Schuldenabbau.',
					'seo-mort-li-9': '<strong>Unerwartete Einnahmen einsetzen:</strong> Steuerrückerstattungen, Boni oder Erbschaften als Sondertilgungen können Ihre Hypothekenlaufzeit um Jahre verkürzen.',
					'seo-mort-p15': 'Auch nützlich: <a href="/refinance-calculator/">Refinanzierungsrechner</a> — prüfen Sie, ob ein niedrigerer Zinssatz für Ihre aktuelle Hypothek sinnvoll ist. Oder erkunden Sie <a href="/loan-calculator/">andere Kreditarten</a> einschließlich Autokredite, Privatkredite und Studiendarlehen.',
					'seo-ci-h2': 'Zinseszins und Sparen: Der vollständige Leitfaden',
					'seo-ci-h3-1': 'Was ist Zinseszins und warum ist er wichtig?',
					'seo-ci-h3-2': 'Tägliche vs. monatliche vs. jährliche Verzinsung — wie sie das Wachstum beeinflusst',
					'seo-ci-h3-3': 'Die 72er-Regel erklärt',
					'seo-ci-h3-4': 'Die Kosten des Wartens: Mit 25, 35 oder 45 beginnen',
					'seo-ci-h3-5': 'Hochzinsige Sparkonten vs. Indexfonds: typische Zinssätze',
					'seo-ci-p1': 'Zinseszins ist Zinsen, die sowohl auf den ursprünglichen Kapitalbetrag als auch auf die aufgelaufenen Zinsen aus allen vorherigen Perioden berechnet werden. Dies unterscheidet sich grundlegend vom einfachen Zins, der immer nur auf das ursprüngliche Kapital berechnet wird. Albert Einstein soll den Zinseszins als „das achte Weltwunder" bezeichnet haben. Wer ihn versteht, verdient ihn; wer ihn nicht versteht, zahlt ihn.',
					'seo-ci-p2': 'Der Grund, warum Zinseszins so leistungsstark ist, ist das exponentielle Wachstum. In den frühen Jahren ist der Effekt subtil. Aber über 20, 30 oder 40 Jahre wird der Zinseszinseffekt außergewöhnlich — der Großteil Ihres endgültigen Reichtums kommt nicht von Ihren Einzahlungen, sondern von Zinsen, die auf Zinsen verdient werden, die auf Zinsen verdient werden.',
					'seo-ci-p3': 'Die Verzinsungsfrequenz bestimmt, wie oft Zinsen berechnet und dem Saldo hinzugefügt werden. Häufigere Verzinsung bedeutet etwas höhere Renditen:',
					'seo-ci-p4': 'Für Sparkonten und Geldmarktfonds ist die monatliche Verzinsung Standard. Hochzinsige Sparkonten bei Online-Banken verzinsen typischerweise täglich. Der Unterschied zwischen monatlicher und täglicher Verzinsung ist gering — der Zinssatz selbst ist weitaus wichtiger als die Verzinsungsfrequenz.',
					'seo-ci-p5': 'Die 72er-Regel ist eine einfache Faustregel: Teilen Sie 72 durch Ihre jährliche Rendite, um zu schätzen, wie viele Jahre es dauert, bis sich Ihr Investment verdoppelt.',
					'seo-ci-p6': 'Die Regel funktioniert auch umgekehrt: Wenn Sie Ihr Geld in 8 Jahren verdoppeln möchten, benötigen Sie eine Rendite von mindestens 72 ÷ 8 = 9 % pro Jahr.',
					'seo-ci-p7': 'Der mit Abstand wichtigste Faktor beim Sparen ist die Zeit. Stellen Sie sich vor, Sie investieren 200 $ pro Monat bei einer jährlichen Rendite von 7 % ohne Ersteinzahlung:',
					'seo-ci-p8': 'Mit 25 statt mit 35 zu beginnen kostet zwar nur 24.000 $ mehr an Einzahlungen, generiert aber 285.000 $ mehr Vermögen — eine 12-fache Rendite auf diese zusätzlichen 24.000 $. Die Botschaft ist klar: Beginnen Sie frühzeitig, auch mit kleinen Beträgen.',
					'seo-ci-p9': 'Die Rendite, die Sie in diesem Rechner wählen, sollte widerspiegeln, wo Sie Ihre Ersparnisse tatsächlich anlegen werden:',
					'seo-ci-p10': 'Siehe auch: <a href="/refinance-calculator/">Refinanzierungsrechner</a> — die durch eine Hypothekenrefinanzierung gesparten Zinsen können in Ersparnisse umgeleitet werden.',
					'seo-ci-li-1': '<strong>Jährliche Verzinsung:</strong> Zinsen werden einmal pro Jahr hinzugefügt. Basisrate.',
					'seo-ci-li-2': '<strong>Monatliche Verzinsung:</strong> Zinsen werden 12 Mal pro Jahr hinzugefügt. Ein jährlicher Zinssatz von 6 %, monatlich verzinst, entspricht einem effektiven Jahreszins von 6,168 %.',
					'seo-ci-li-3': '<strong>Tägliche Verzinsung:</strong> Zinsen werden 365 Mal pro Jahr hinzugefügt. Ein Zinssatz von 6 %, täglich verzinst, ergibt einen effektiven Zinssatz von 6,183 %. Geringfügig besser als monatlich.',
					'seo-ci-li-4': 'Bei 4 % (hochverzinsliches Sparen): 72 ÷ 4 = <strong>18 Jahre</strong> bis zur Verdopplung',
					'seo-ci-li-5': 'Bei 7 % (Börsendurchschnitt): 72 ÷ 7 = <strong>10,3 Jahre</strong> bis zur Verdopplung',
					'seo-ci-li-6': 'Bei 10 % (aggressives Wachstum): 72 ÷ 10 = <strong>7,2 Jahre</strong> bis zur Verdopplung',
					'seo-ci-li-7': 'Bei 12 % (Venture-Renditen): 72 ÷ 12 = <strong>6 Jahre</strong> bis zur Verdopplung',
					'seo-ci-li-8': '<strong>Traditionelles Sparkonto:</strong> 0,01–0,5 % effektiver Jahreszins. Verliert faktisch an Wert gegenüber der Inflation. Nur für Notfallfonds geeignet, auf die sofort zugegriffen werden muss.',
					'seo-ci-li-9': '<strong>Hochzinsiges Sparkonto (Online-Banken):</strong> 4–5 % effektiver Jahreszins in einem Hochzinsumfeld. FDIC-versichert. Hervorragend für Notfallfonds und kurzfristige Ziele (1–3 Jahre).',
					'seo-ci-li-10': '<strong>Geldmarktkonten:</strong> 4–5 % effektiver Jahreszins. Ähnlich wie hochverzinsliche Sparkonten mit leicht unterschiedlichen Zugangsbedingungen.',
					'seo-ci-li-11': '<strong>Festgeldkonten (CDs):</strong> 4–5,5 % effektiver Jahreszins mit Laufzeiten von 6 Monaten bis 5 Jahren. Höhere Zinssätze für längere Laufzeiten.',
					'seo-ci-li-12': '<strong>S&amp;P 500 Indexfonds:</strong> ~10 % durchschnittliche nominale Rendite (7 % nach Inflation) historisch. Nicht garantiert. Am besten für Ziele ab 5 Jahren. Unterliegt der Marktvolatilität.',
					'seo-ci-li-13': '<strong>Gesamtanleihenmarkt-Fonds:</strong> 3–5 % historisch. Geringere Volatilität als Aktien. Geeignet für mittelfristige Ziele.',
					'seo-ci-th-start': 'Startalter',
					'seo-ci-th-end': 'Endalter',
					'seo-ci-th-years': 'Investitionsjahre',
					'seo-ci-th-contributed': 'Gesamteinzahlung',
					'seo-ci-th-final': 'Endwert',
					'seo-ci-th-interest': 'Erwirtschaftete Zinsen',
					'seo-rf-h2': 'Hypothekenrefinanzierung: Wann sie sinnvoll ist',
					'seo-rf-h3-1': 'Wann eine Refinanzierung finanziell sinnvoll ist',
					'seo-rf-h3-2': 'Wie Sie den Break-even-Punkt berechnen',
					'seo-rf-h3-3': 'Cash-out-Refinanzierung vs. Zins-und-Laufzeit-Refinanzierung',
					'seo-rf-h3-4': 'Versteckte Kosten der Refinanzierung',
					'seo-rf-h3-5': 'Wann Sie NICHT refinanzieren sollten',
					'seo-rf-p1': 'Eine Refinanzierung ersetzt Ihr bestehendes Darlehen durch ein neues, idealerweise zu einem niedrigeren Zinssatz. Die Entscheidung hängt von einer grundlegenden Frage ab: Übersteigen die langfristigen Ersparnisse die Vorabkosten, und bleiben Sie lange genug im Darlehen, um diese Kosten wieder hereinzuholen? Eine Refinanzierung macht am meisten Sinn, wenn:',
					'seo-rf-p2': 'Die Break-even-Berechnung ist einfach: Teilen Sie Ihre gesamten Abschlusskosten durch Ihre monatlichen Ersparnisse.',
					'seo-rf-formula': '<strong>Break-even-Monate = Abschlusskosten ÷ Monatliche Rateneinsparung</strong>',
					'seo-rf-p3': 'Beispiel: Wenn eine Refinanzierung 4.500 $ Abschlusskosten kostet und Ihnen 200 $ pro Monat spart, liegt der Break-even bei 4.500 ÷ 200 = 22,5 Monaten — ungefähr 2 Jahre. Wenn Sie planen, mindestens weitere 3–5 Jahre in Ihrem Haus zu bleiben, macht diese Refinanzierung finanziell klar Sinn. Wenn Sie planen, innerhalb von 18 Monaten umzuziehen, nicht.',
					'seo-rf-p4': 'Es gibt zwei Haupttypen der Hypothekenrefinanzierung:',
					'seo-rf-p5': 'Die tatsächlichen Kosten einer Refinanzierung gehen über die angegebenen Abschlusskosten hinaus. Häufige Gebühren umfassen:',
					'seo-rf-p6': 'Die gesamten Abschlusskosten für eine typische Refinanzierung betragen 2–3 % des Darlehensbetrags. Bei einem Darlehen von 300.000 $ sind Kosten von 6.000–9.000 $ zu erwarten, es sei denn, Sie wählen eine Refinanzierung ohne Abschlusskosten (bei der die Kosten stattdessen in den Zinssatz eingerechnet werden).',
					'seo-rf-p7': 'Siehe auch: <a href="/loan-calculator/">Hypothekenrechner</a> — modellieren Sie Ihre ursprüngliche Hypothek oder vergleichen Sie Kreditoptionen, bevor Sie sich für eine Refinanzierung entscheiden.',
					'seo-rf-li-1': 'Ihr neuer Zinssatz ist mindestens 0,5–1 % niedriger als Ihr aktueller Zinssatz',
					'seo-rf-li-2': 'Sie planen, länger als die Break-even-Periode im Haus zu bleiben',
					'seo-rf-li-3': 'Ihr Kredit-Score hat sich seit Ihrem ursprünglichen Darlehen deutlich verbessert',
					'seo-rf-li-4': 'Sie möchten von einer variabel verzinslichen auf eine festverzinsliche Hypothek wechseln, um Stabilität zu gewinnen',
					'seo-rf-li-5': 'Sie möchten die Laufzeit Ihres Darlehens verkürzen (z. B. von 30 auf 15 Jahre) und können höhere Monatsraten stemmen',
					'seo-rf-li-6': '<strong>Zins-und-Laufzeit-Refinanzierung:</strong> Sie ersetzen Ihre bestehende Hypothek durch eine neue mit besserem Zinssatz und/oder anderer Laufzeit, ohne den Darlehenssaldo zu ändern. Dies ist der häufigste Typ und was dieser Rechner abbildet. Das Ziel ist rein, Ihre Zinskosten zu senken.',
					'seo-rf-li-7': '<strong>Cash-out-Refinanzierung:</strong> Sie leihen mehr als Ihren aktuellen Darlehenssaldo und erhalten den Unterschied als Bargeld. Wenn Ihr Haus beispielsweise 400.000 $ wert ist und Sie 250.000 $ schulden, könnten Sie für 320.000 $ refinanzieren und 70.000 $ in bar nehmen. Cash-out-Refinanzierungen setzen Ihr Eigenkapital zurück und tragen typischerweise einen etwas höheren Zinssatz.',
					'seo-rf-li-8': '<strong>Origination-Gebühr:</strong> 0,5–1 % des Darlehensbetrags. Die Gebühr des Kreditgebers für die Bearbeitung des neuen Darlehens.',
					'seo-rf-li-9': '<strong>Gutachtergebühr:</strong> 300–600 $. Die meisten Kreditgeber verlangen eine neue Bewertung, um den aktuellen Wert Ihres Hauses zu bestätigen.',
					'seo-rf-li-10': '<strong>Titelversicherung:</strong> 500–1.500 $. Erforderlich, um den Kreditgeber gegen Titeldispute zu schützen.',
					'seo-rf-li-11': '<strong>Registrierungsgebühren:</strong> 25–250 $. Behördliche Gebühren zur Eintragung der neuen Hypothek.',
					'seo-rf-li-12': '<strong>Discount-Punkte:</strong> Optionale vorausbezahlte Zinsen, um Ihren Zinssatz zu senken. Ein Punkt = 1 % des Darlehensbetrags = typischerweise 0,25 % Zinssatzreduktion.',
					'seo-rf-li-13': '<strong>Sie ziehen bald um:</strong> Wenn Sie das Haus verkaufen, bevor Sie den Break-even erreichen, kostet die Refinanzierung mehr als sie einspart.',
					'seo-rf-li-14': '<strong>Vorfälligkeitsentschädigungen:</strong> Einige Kredite berechnen Gebühren für vorzeitige Rückzahlung. Prüfen Sie Ihre aktuellen Kreditbedingungen, bevor Sie refinanzieren.',
					'seo-rf-li-15': '<strong>Sie haben den Großteil des Darlehens abgezahlt:</strong> Eine Neufestlegung auf eine neue 30-jährige Laufzeit bei einem Darlehen, das Sie bereits seit 20 Jahren abbezahlen, verlängert Ihre Schulden erheblich, auch wenn der Zinssatz niedriger ist.',
					'seo-rf-li-16': '<strong>Ihr Kredit-Score ist gesunken:</strong> Wenn sich Ihre Bonität seit Ihrer ursprünglichen Hypothek verschlechtert hat, qualifizieren Sie sich möglicherweise nicht für einen besseren Zinssatz und könnten tatsächlich einen höheren Zinssatz erhalten.',
					'seo-cur-h2': 'Währungsrechner, Gold, Öl und Aktienkurse: Wie Live-Kurse funktionieren',
					'seo-cur-h3-1': 'Wie Live-Wechselkurse funktionieren',
					'seo-cur-p1': 'Wechselkurse werden durch den Devisenmarkt (Forex) bestimmt, den größten Finanzmarkt der Welt mit einem täglichen Handelsvolumen von über 7 Billionen US-Dollar. Der „Live"-Kurs auf dieser Website ist der Mittelkurs (auch Interbankenkurs oder Kassakurs genannt), der Mittelwert zwischen den An- und Verkaufspreisen, die Banken bei großvolumigen Transaktionen untereinander verwenden.',
					'seo-cur-p2': 'Die hier gezeigten Kurse stammen von der Frankfurter API, die Daten der Europäischen Zentralbank und anderer Finanzquellen aggregiert. Sie werden täglich aktualisiert und für die Performance gecacht. Für Echtzeit-Kurse mit Millisekundengenauigkeit nutzen institutionelle Händler dedizierte Forex-Plattformen — aber für Reiseplanung, internationale Überweisungen und allgemeine Referenz sind diese Kurse auf einen Bruchteil eines Prozents genau.',
					'seo-cur-h3-2': 'Was Wechselkurse beeinflusst',
					'seo-cur-p3': 'Wechselkurse verschieben sich ständig aufgrund einer komplexen Mischung aus wirtschaftlichen und politischen Faktoren:',
					'seo-cur-li-1': '<strong>Zinsdifferenziale:</strong> Wenn eine Zentralbank die Zinsen erhöht, stärkt sich ihre Währung in der Regel, weil höhere Zinsen ausländisches Kapital anziehen, das bessere Renditen sucht. Die Entscheidungen der US-Notenbank Fed bewegen oft die globalen Wechselkurse.',
					'seo-cur-li-2': '<strong>Inflation:</strong> Höhere Inflation erodiert die Kaufkraft einer Währung im Laufe der Zeit. Länder mit niedriger, stabiler Inflation tendieren zu stärkeren Währungen. Das EUR/USD-Paar wird beispielsweise genau auf Inflationsdifferenziale zwischen den USA und der Eurozone beobachtet.',
					'seo-cur-li-3': '<strong>Handelsbilanz:</strong> Länder, die mehr exportieren als importieren (Handelsüberschuss), haben eine höhere Nachfrage nach ihrer Währung, was deren Wert steigert. Länder mit anhaltenden Handelsbilanzdefiziten können eine Währungsschwäche erleben.',
					'seo-cur-li-4': '<strong>Politische Stabilität:</strong> Politische Unsicherheit, Wahlen oder geopolitische Konflikte können zu schnellen Währungsbewegungen führen. Sicherhafenwährungen wie USD, CHF und JPY stärken sich oft in globalen Krisen.',
					'seo-cur-li-5': '<strong>BIP-Wachstum:</strong> Starkes Wirtschaftswachstum erhöht die Nachfrage nach einer Währung, da Investoren Kapital in diese Wirtschaft einbringen.',
					'seo-cur-h3-3': 'Mittelkurs vs. Bankkurs: Warum es einen Spread gibt',
					'seo-cur-p4': 'Der Kurs auf diesem Rechner ist der Mittelkurs — der theoretische Mittelpunkt zwischen Kauf- und Verkaufspreisen. Wenn Sie tatsächlich Geld über eine Bank, Kreditkarte oder einen Geldtransferservice wechseln, erhalten Sie einen schlechteren Kurs. Die Differenz heißt Spread, und damit verdienen Währungswechselunternehmen ihr Geld.',
					'seo-cur-li-6': '<strong>Banken und Flughafenkioske:</strong> Verlangen typischerweise 3–10 % über dem Mittelkurs. Am schlechtesten für kleine Beträge und touristische Standorte.',
					'seo-cur-li-7': '<strong>Kreditkarten:</strong> Berechnen meist 1–3 % als Auslandstransaktionsgebühr. Oft die beste Option für Einkäufe im Ausland, besonders Karten ohne Auslandstransaktionsgebühr.',
					'seo-cur-li-8': '<strong>Spezialisierte Transferdienste (Wise, Revolut):</strong> Berechnen 0,3–1 % über dem Mittelkurs. Am besten für große internationale Überweisungen.',
					'seo-cur-p5': 'So berechnen Sie, was Sie tatsächlich erhalten: Nehmen Sie den Mittelkurs und ziehen Sie den Spread-Prozentsatz des Anbieters ab. Wenn Sie 1 USD = 0,92 EUR zum Mittelkurs sehen und Ihre Bank 3 % berechnet, erhalten Sie ungefähr 0,92 × (1 - 0,03) = 0,892 EUR pro Dollar.',
					'seo-cur-h3-4': 'Gold als Währungsabsicherung: Wie XAU bewertet wird',
					'seo-cur-p6': 'Gold (Ticker-Symbol XAU) wird an internationalen Märkten in US-Dollar pro Feinunze (Troy Ounce) bewertet. Die Feinunze ist die Standardeinheit für Edelmetalle und entspricht ca. 31,1 Gramm (etwas schwerer als eine Standard-Avoirdupois-Unze mit 28,35 g). Eine Feinunze = exakt 31,1035 Gramm.',
					'seo-cur-p7': 'Gold fungiert als Absicherung gegen Währungsabwertung und Inflation. Wenn der US-Dollar schwächer wird oder die Inflation steigt, steigen die Goldpreise oft — nicht weil Gold selbst sich verändert, sondern weil mehr Dollar benötigt werden, um dasselbe Goldgewicht zu kaufen. Gold hat seine Kaufkraft über Jahrhunderte bewahrt, während einzelne Währungen inflationiert wurden. Der Goldpreis auf dieser Website stammt aus Marktdaten über Yahoo Finance, stündlich gecacht.',
					'seo-cur-p8': 'Goldpreisbewegungen werden angetrieben von: Goldreserven der Zentralbanken, US-Dollar-Stärke, realen Zinssätzen (wenn die realen Zinsen niedrig oder negativ sind, wird Gold attraktiver), geopolitischen Risiken und Schmuck-/Industrienachfrage.',
					'seo-cur-h3-5': 'WTI-Rohöl: Warum es in USD bewertet wird und was den Preis bewegt',
					'seo-cur-p9': 'West Texas Intermediate (WTI) ist der primäre Rohölbenchmark für Nordamerika und eine wichtige globale Preisreferenz. Es wird in US-Dollar pro Barrel bewertet (1 Barrel = 42 US-Gallonen = ca. 159 Liter). Öl wird seit dem Petrodollar-Abkommen der 1970er Jahre in USD bewertet, was eine globale Nachfrage nach US-Dollar schafft, da alle ölimportierenden Länder Dollar benötigen, um dafür zu bezahlen.',
					'seo-cur-p10': 'Schlüsselfaktoren, die Ölpreise antreiben:',
					'seo-cur-li-9': '<strong>OPEC+-Produktionsentscheidungen:</strong> Das OPEC-Kartell und verbündete Produzenten (Russland usw.) kontrollieren rund 40 % des globalen Angebots. Produktionskürzungen treiben Preise nach oben; Erhöhungen drücken sie nach unten.',
					'seo-cur-li-10': '<strong>US-Schieferölproduktion:</strong> Die USA wurden teilweise dank der Schiefer-Technologie zum weltgrößten Ölproduzenten. Höhere US-Produktion konkurriert mit der OPEC und kann Preisanstiege deckeln.',
					'seo-cur-li-11': '<strong>Globale Nachfrage:</strong> Wirtschaftswachstum in China und Indien (massive Ölverbraucher) ist ein wichtiger Nachfragetreiber. Rezessionen reduzieren die Nachfrage und drücken Preise nach unten.',
					'seo-cur-li-12': '<strong>Geopolitische Ereignisse:</strong> Konflikte in ölproduzierenden Regionen (Naher Osten, Russland) schaffen Versorgungsrisikoprämien, die Preise nach oben treiben.',
					'seo-cur-li-13': '<strong>USD-Stärke:</strong> Da Öl in USD bewertet wird, macht ein stärkerer Dollar Öl für Nicht-US-Käufer teurer, was die Nachfrage dämpft und Abwärtsdruck auf die Preise ausübt.',
					'seo-cur-h3-6': 'Live-Aktienkurse: Top-US-Aktien stündlich aktualisiert',
					'seo-cur-p11': 'LoanCalc zeigt Live-Kurse für zehn viel beachtete US-Aktien und -Fonds: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) und den SPDR S&P 500 ETF Trust (SPY). Die Kurse werden von Yahoo Finance abgerufen und stündlich aktualisiert — im gleichen Intervall wie Gold- und Öldaten.',
					'seo-cur-p12': 'Jede Aktienkachel zeigt den aktuellen Kurs in USD, die prozentuale Veränderung zum vorherigen Schlusskurs (grüner Pfeil für Gewinne, roter für Verluste) und den Gegenwert in Ihrer Landeswährung zum Live-Wechselkurs. So lässt sich der Wert von US-Aktienpositionen von überall auf der Welt verfolgen, ohne zwischen Apps wechseln zu müssen.',
					'seo-cur-p13': 'Der S&amp;P 500 ETF (SPY) ist als breiter Marktindex enthalten: Steigt SPY, steigt der US-Markt im Allgemeinen. Einzelne Aktien wie NVDA und TSLA weisen höhere Volatilität auf. Nutzen Sie den <a href="/savings-calculator/">Sparrechner</a> mit einer jährlichen Rendite von 7–10 %, um das langfristige S&amp;P 500-Wachstum zu modellieren.',
					'seo-cur-p14': 'Siehe auch: <a href="/savings-calculator/">Sparrechner</a> — modellieren Sie, wie Währungsrenditen oder rohstoffgebundene Investitionen im Laufe der Zeit wachsen.',
					'lbl-market-prices': 'Marktpreise',
					'cur-rate-unavailable': 'Kurs nicht verfügbar',
					'cur-not-in-feed': 'Nicht im Live-Feed',
					'cur-today': 'heute',
					'cur-status-fetching': 'Wechselkurse werden abgerufen…',
					'cur-status-live': 'Live-Kurse · {date} · 161 Währungen · alle 24h aktualisiert',
					'cur-status-partial': 'Kurse geladen · {date} (33 Währungen)',
					'cur-status-offline': 'Offline-Kurse: begrenzte Währungen verfügbar',
					'cmd-fetching': 'Laden…',
					'cmd-live': 'Live · {date}',
					'cmd-approx': 'Ca. · Live-Daten prüfen',
					'cur-status-cached': 'Kurse vom {date} · zwischengespeichert · alle 24h aktualisiert',
					'clamp-min': 'Minimum:',
					'clamp-max': 'Maximum:'
				},
				zh: {
					'nav-loans': '贷款',
					'nav-savings': '储蓄',
					'nav-refinance': '再融资',
					'nav-currency': '货币',
					'btn-settings': '设置',
					'pref-title': '偏好设置',
					'pref-save': '保存设置',
					'toast-saved': '偏好设置已保存',
					'pref-cancel': '取消',
					'ci-sub-desc': '查看您的储蓄如何逐年增长。',
					'tab-mortgage': '房贷',
					'tab-car': '车贷',
					'tab-personal': '个人贷款',
					'tab-student': '助学贷款',
					'tab-afford': '负担能力',
					'afford-pmt-label': '我能负担的月供',
					'afford-result-label': '您最多可贷款',
					'afford-sub': '负担能力估算',
					'cur-amount-label': '金额',
					'cur-to-label': '兑换为',
					'cur-quick': '快速参考',
					'pref-language': '显示语言',
					'pref-lang-note': '更改标签和数字格式。',
					'pref-currency': '首选货币',
					'pref-currency-note': '转换器和商品价格的默认货币。',
					'pref-current': '当前设置',
					'gold-per': '每金衡盎司',
					'gold-local': '您的货币价格',
					'oil-per': '每桶',
					'oil-local': '您的货币价格',
					'trust-1': '永久免费',
					'trust-2': '无需注册',
					'trust-3': '全球通用',
					'hero-sub': '贷款计算器、复利、再融资节省、实时货币转换器、黄金、石油和实时股票价格：免费、即时、无需注册。',
					'faq-heading': '关于贷款、储蓄和货币的常见问题',
					'chart-center-lbl': '本金',
					'chart-stat-principal': '借入本金',
					'chart-stat-interest': '已付总利息',
					'chart-stat-total': '总还款金额',
					'chart-stat-payoff': '贷款还清日期',
					'breakdown-sub': '您的总费用如何在借款金额和支付给贷款方的利息之间分配。',
					'amort-sub': '每年每笔还款的详细分解。',
					'ci-section-sub': '查看您的储蓄或投资如何通过复利逐年增长。',
					'cur-section-sub': '使用实时汇率在主要货币之间转换。黄金和石油价格以您的本地货币显示。',
					'ci-chart-sub': '每年底的余额，分为您的存款和复利增长两部分。',
					'per-oz-usd': '每盎司（美元）',
					'per-bbl-usd': '每桶（美元）',
					'lbl-stocks': '股票',
					'lbl-tab-currency': '货币',
					'lbl-tab-commodities': '大宗商品',
					'lbl-tab-stocks': '股票',
					'age-just-now': '刚刚',
					'age-min-ago': '{n}分钟前',
					'age-hours-ago': '{n}小时前',
					'lbl-currencies': '种货币',
					'lbl-rates-from': '汇率来自',
					'lbl-from': '来自',
					'nav-faq': '常见问题',
					'unit-mo': '/月',
					'weight-1g': '1克',
					'weight-10g': '10克',
					'weight-1kg': '1千克',
					'weight-5bbl': '5桶',
					'weight-10bbl': '10桶',
					'weight-100bbl': '100桶',
					'lbl-price-unavailable': '价格不可用',
					'lbl-updating': '更新中…',
					'lbl-partial-rates': '部分汇率',
					'rf-sub': '按新利率每月',
					'rf-verdict-init': '输入您的贷款详情，查看再融资是否合算。',
					'rf-verdict-higher': '新利率不低于当前利率：再融资会增加您的还款。',
					'rf-verdict-long': '有月度节省，但盈亏平衡期超过剩余期限。不建议。',
					'rf-verdict-good': '再融资看起来合算。',
					'rf-verdict-summary': '每月节省 {monthly}，{breakeven} 后回本。总节省：{total}。',
					'rf-never': '不适用',
					'rf-over-term': '>{n}年',
					'rf-months': '{n}个月',
					'rf-years-mo': '{y}年{m}个月',
					'loan-desc': '使用此免费计算器计算任何抵押贷款、汽车、个人或助学贷款的月还款额。输入金额、年利率和年限，立即获得月供、总利息和还款计划。',
					'ci-desc': '复利计算器显示初始存款如何通过复利随时间增长。输入起始金额、月供、收益率和投资期限。',
					'rf-desc': '再融资计算器帮助您决定是否值得以更低利率进行再融资。',
					'cur-desc': 'LoanCalc支持161种世界货币，汇率每24小时实时更新。黄金和WTI原油价格实时转换为您的本地货币。',
					'how-p1': '每个固定利率贷款使用相同的标准摊销公式。',
					'how-p2': '三个因素控制您的月供。',
					'unit-years': '年',
					'unit-yr': '年',
					'unit-yrs': '年',
					'ci-earned-short': '增长',
					'cur-rate-lbl': '汇率',
					'cur-inverse-lbl': '反向',
					'cur-updated-lbl': '更新',
					'how-formula-h': '公式',
					'how-lower-h': '如何降低月供',
					'formula-m': '月供',
					'formula-p': '本金（贷款金额）',
					'formula-r': '月利率（年利率÷12）',
					'formula-n': '总期数（年×12）',
					'tip-1': '更大的首付可直接减少本金，借款越少月供越低，总利息也越少。',
					'tip-2': '更长的还款期将还款分摊到更多月份，月供降低但总利息增加。',
					'tip-3': '更低的利率有复利效应，大额贷款仅0.5%差异可节省数万元利息。',
					'tip-4': '申请前改善信用评分通常可获得更优惠的利率，建议提前3-6个月检查。',
					'faq-q1': '月供如何计算？',
					'faq-q2': '什么是还款计划表？',
					'faq-q3': '这个计算器适用于所有国家吗？',
					'faq-q4': '如何减少总利息？',
					'faq-q5': 'LoanCalc完全免费吗？',
					'faq-q6': '再融资计算器如何运作？',
					'faq-q7': '黄金价格如何计算和更新？',
					'faq-q8': '转换器支持哪些货币？',
					'loan-label-mortgage': '30年固定利率房贷',
					'loan-label-car': '5年汽车贷款',
					'loan-label-personal': '3年个人贷款',
					'loan-label-student': '10年助学贷款',
					'helper-title-mortgage': '典型30年按揭贷款',
					'helper-title-car': '典型汽车贷款',
					'helper-title-personal': '典型个人贷款',
					'helper-title-student': '联邦助学贷款（美国）',
					'helper-text-mortgage': '30年固定利率平均约6.5–7%。',
					'helper-text-car': '新车贷款平均利率6–8%。',
					'helper-text-personal': '个人贷款利率6%–36%不等。',
					'helper-text-student': '联邦助学贷款利率由国会每年设定。',
					'hero-h1': '免费<em>金融</em><br>计算器套件',
					'faq-q9': 'LoanCalc显示哪些股票价格？',
					'extra-label': '每月额外还款',
					'lbl-amount': '贷款金额',
					'lbl-rate': '年利率',
					'lbl-term': '贷款期限',
					'res-monthly': '月供',
					'freq-monthly': '按月',
					'freq-biweekly': '双周还款',
					'freq-per-2wk': '/ 两周',
					'res-principal': '本金',
					'res-interest': '总利息',
					'res-total': '总费用',
					'monthly-note': '仅含本金和利息，不含税费、保险及手续费',
					'hero-headline': '掌握你的财务数据。',
					'hero-subtitle': '房贷、储蓄、再融资及汇率的免费计算器。',
					'hero-h1': '掌握你的财务数据。',
					'hero-stat-currencies': '货币',
					'hero-stat-langs': '语言',
					'hero-stat-tools': '工具',
					'res-year': '还清年份',
					'lbl-principal-pct': '本金',
					'lbl-interest-pct': '利息',
					'section-breakdown': '还款分解',
					'section-amort': '还款计划表',
					'amort-year': '年份',
					'amort-month': '月份',
					'amort-start': '期初余额',
					'amort-ppaid': '已还本金',
					'amort-ipaid': '已还利息',
					'amort-end': '期末余额',
					'btn-show-all': '显示所有年份',
					'btn-show-all-months': '显示所有月份',
					'btn-show-less': '收起',
					'amort-gran-yearly': '按年',
					'amort-gran-monthly': '按月',
					'section-how': '贷款还款如何计算',
					'section-faq': '常见问题',
					'ci-h2': '复利计算器和储蓄增长',
					'ci-label-principal': '初始存款',
					'ci-label-monthly': '每月定投',
					'ci-label-rate': '年化收益率',
					'ci-label-years': '投资年限',
					'ci-result-label': '未来价值',
					'ci-sub': '总投资组合经过',
					'ci-deposited': '累计存入',
					'ci-earned': '利息收益',
					'ci-mult': '增长倍数',
					'ci-year': '目标年份',
					'ci-chart-h': '逐年增长',
					'rf-h2': '再融资计算器：您能节省多少？',
					'rf-current': '当前贷款',
					'rf-new': '新贷款报价',
					'rf-balance': '剩余余额',
					'rf-oldrate': '当前利率',
					'rf-remaining': '剩余年数',
					'rf-newrate': '新利率',
					'rf-costs': '结清费用',
					'rf-monthly': '月节省额',
					'rf-old': '原月供',
					'rf-new-pay': '新月供',
					'rf-breakeven': '回本时间',
					'rf-total': '整个贷款期总节省',
					'cur-h2': '实时货币转换器、今日黄金、油价和股票价格',
					'gold-local-lbl': '您的货币价格',
					'oil-local-lbl': '您的货币价格',
					'footer-mortgage': '房贷计算器',
					'footer-loan': '贷款计算器',
					'footer-savings': '储蓄计算器',
					'footer-refinance': '再融资计算器',
					'footer-currency': '货币换算器',
					'footer-privacy': '隐私政策',
					'footer-dnsmi': '不出售或分享我的个人信息',
					'footer-rights': '保留所有权利。',
					'footer-desc': '免费金融计算器：贷款、储蓄、再融资、货币。无需注册。',
					'footer-disclaimer': 'LoanCalc仅提供信息估算，不构成财务建议。',
					'seo-mort-h2': '房贷计算器：您需要了解的一切',
					'seo-mort-h3-1': '什么是房贷计算器？谁应该使用它？',
					'seo-mort-p1': '房贷计算器是一种金融工具，根据三个输入计算您的住房贷款月供：贷款金额（本金）、年利率和贷款期限（年）。任何考虑购房、比较贷款报价或希望了解长期借款成本的人，都应在签署房贷协议前使用它。',
					'seo-mort-p2': '首次购房者使用房贷计算器在找房前核实自己的购房能力。现有房主用它来探索再融资方案或模拟提前还款的影响。房地产投资者用它来估算出租物业的现金流。该计算器适用于全球各地的固定利率房贷，无论您以美元、欧元、英镑还是其他货币借款。',
					'seo-mort-h3-2': '月供公式是如何运作的',
					'seo-mort-p3': '所有固定利率房贷都使用相同的标准摊还公式：',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': '其中 <strong>M</strong> 是您的月供，<strong>P</strong> 是贷款本金，<strong>r</strong> 是月利率（年利率 ÷ 12），<strong>n</strong> 是总还款期数（年数 × 12）。该公式产生固定的月还款额，涵盖剩余本金的利息和部分本金，比例随时间推移而变化。前几年每次还款大部分是利息，最后几年大部分用于偿还本金。',
					'seo-mort-h3-3': '哪些因素影响您的房贷利率？',
					'seo-mort-p6': '您的实际房贷利率取决于贷款机构在审批申请时评估的几个因素：',
					'seo-mort-li-1': '<strong>信用评分：</strong>评分超过760的借款人通常能获得最低利率。信用评分每下降20点，利率可能上升0.1–0.5%，30年内额外增加数千元利息。',
					'seo-mort-li-2': '<strong>贷款价值比（LTV）：</strong>较低的LTV（首付更多）意味着对贷款人风险更小。首付20%或以上通常可免除私人房贷保险（PMI），并可能获得更优利率。',
					'seo-mort-li-3': '<strong>贷款类型：</strong>符合房利美/房地美限额的合规贷款通常比大额贷款利率更低。政府担保贷款（FHA、VA、USDA）有各自的利率结构。',
					'seo-mort-li-4': '<strong>贷款期限：</strong>15年期房贷利率低于30年期，因为贷款人的资金风险期更短。',
					'seo-mort-li-5': '<strong>市场状况：</strong>房贷利率受10年期国债收益率和美联储政策影响较大。当美联储为抗通胀而加息时，房贷利率往往随之上升。',
					'seo-mort-h3-4': '15年期 vs 30年期房贷：真实的权衡',
					'seo-mort-p12': '选择15年期还是30年期房贷，本质上是月现金流与总利息支出之间的权衡。以下是30万美元贷款的示例：',
					'seo-mort-th-loan': '贷款',
					'seo-mort-th-rate': '利率',
					'seo-mort-p13': '利率6.5%时，30年期房贷总利息为382,633美元，而15年期仅为170,453美元，相差超过212,000美元。然而，30年期房贷月供低718美元，若现金流紧张或希望投资差额，这一点非常重要。',
					'seo-mort-h3-5': '什么是PMI？何时适用？',
					'seo-mort-p14': '私人房贷保险（PMI）在首付低于房屋购买价20%时，大多数美国贷款机构都会要求购买。PMI在您违约时保护贷款人。典型费用为每年贷款金额的0.5–1.5%，叠加在月供中。30万美元贷款的PMI每月可增加125–375美元。当您的权益达到20%（通过还款或房产升值），通常可以申请取消PMI。当贷款余额降至原始购价的78%时，贷款人必须自动取消PMI。',
					'seo-mort-h3-6': '如何更快还清房贷',
					'seo-mort-li-6': '<strong>每年多还一期：</strong>对于30年期房贷，每年多还一期月供可将贷款期限缩短约4–5年，节省数万元利息。',
					'seo-mort-li-7': '<strong>改为双周还款：</strong>将12次月供改为每年26次半额还款，相当于每年多还一次全额，对现金流影响不大。',
					'seo-mort-li-8': '<strong>向上取整还款：</strong>如果月供为1,847美元，每月还1,900或2,000美元，超出部分全部用于偿还本金，加速还款进度。',
					'seo-mort-li-9': '<strong>善用意外收入：</strong>将税务退款、奖金或遗产一次性用于偿还本金，可将房贷期限缩短数年。',
					'seo-mort-p15': '也很有用：<a href="/refinance-calculator/">再融资计算器</a> — 了解降低利率是否适合您的当前房贷。或探索<a href="/loan-calculator/">其他贷款类型</a>，包括汽车贷款、个人贷款和学生贷款。',
					'seo-ci-h2': '复利与储蓄：完整指南',
					'seo-ci-h3-1': '什么是复利，为什么重要？',
					'seo-ci-h3-2': '日复利、月复利与年复利——如何影响增长',
					'seo-ci-h3-3': '72法则详解',
					'seo-ci-h3-4': '等待的代价：25岁、35岁、45岁开始的差异',
					'seo-ci-h3-5': '高收益储蓄账户与指数基金：典型利率',
					'seo-ci-p1': '复利是在初始本金和所有先前期间累计利息的基础上计算的利息。这与单利有本质区别，单利只计算原始本金。阿尔伯特·爱因斯坦常被引用说复利是"世界第八大奇迹。理解它的人，赚它；不理解的人，付它。"',
					'seo-ci-p2': '复利如此强大的原因在于指数增长。在最初几年，效果并不明显。但经过20、30或40年，复利效应变得非凡——您最终财富的大部分不是来自您的存入资金，而是来自利息上的利息上的利息。',
					'seo-ci-p3': '复利频率决定了利息的计算频率和添加到余额的频率。更高的复利频率意味着略高的回报：',
					'seo-ci-p4': '对于储蓄账户和货币市场基金，月复利是标准做法。网上银行的高收益储蓄账户通常按日复利。月复利和日复利之间的差异很小——利率本身远比复利频率重要。',
					'seo-ci-p5': '72法则是一个简单的心算捷径：用72除以您的年回报率，估计您的投资翻倍所需的年数。',
					'seo-ci-p6': '该法则也可以反向使用：如果您想在8年内让资金翻倍，您需要至少72 ÷ 8 = 9%的年回报率。',
					'seo-ci-p7': '储蓄中最强大的因素是时间。设想每月投资200美元，年回报率7%，无初始存款：',
					'seo-ci-p8': '25岁开始而非35岁，仅多存入24,000美元，却能多积累285,000美元财富——额外的24,000美元产生了12倍的回报。信息很明确：尽早开始，即使是小额也好。',
					'seo-ci-p9': '您在此计算器中选择的回报率应反映您实际持有储蓄的地方：',
					'seo-ci-p10': '另请参阅：<a href="/refinance-calculator/">再融资计算器</a>——通过再融资节省的利息可重新投入储蓄。',
					'seo-ci-li-1': '<strong>年复利：</strong>每年计息一次。基准利率。',
					'seo-ci-li-2': '<strong>月复利：</strong>每年计息12次。6%的年利率按月复利相当于6.168%的有效年利率。',
					'seo-ci-li-3': '<strong>日复利：</strong>每年计息365次。6%的利率按日复利给出6.183%的有效利率。略优于月复利。',
					'seo-ci-li-4': '4%（高收益储蓄）：72 ÷ 4 = <strong>18年</strong>翻倍',
					'seo-ci-li-5': '7%（股市平均）：72 ÷ 7 = <strong>10.3年</strong>翻倍',
					'seo-ci-li-6': '10%（激进增长）：72 ÷ 10 = <strong>7.2年</strong>翻倍',
					'seo-ci-li-7': '12%（风险投资回报）：72 ÷ 12 = <strong>6年</strong>翻倍',
					'seo-ci-li-8': '<strong>传统储蓄账户：</strong>0.01–0.5% APY。实际上跑输通货膨胀。只适合需要立即取用的应急资金。',
					'seo-ci-li-9': '<strong>高收益储蓄账户（网络银行）：</strong>高利率环境下4–5% APY。FDIC保险。非常适合应急资金和短期目标（1–3年）。',
					'seo-ci-li-10': '<strong>货币市场账户：</strong>4–5% APY。与高收益储蓄账户类似，但取款条件略有不同。',
					'seo-ci-li-11': '<strong>存款证明（CDs）：</strong>4–5.5% APY，锁定期6个月至5年。期限越长利率越高。',
					'seo-ci-li-12': '<strong>S&amp;P 500指数基金：</strong>历史上平均名义回报率约10%（通胀后7%）。不保证。最适合5年以上目标。受市场波动影响。',
					'seo-ci-li-13': '<strong>全债券市场基金：</strong>历史上3–5%。波动性低于股票。适合中期目标。',
					'seo-ci-th-start': '开始年龄',
					'seo-ci-th-end': '结束年龄',
					'seo-ci-th-years': '投资年数',
					'seo-ci-th-contributed': '累计存入',
					'seo-ci-th-final': '最终价值',
					'seo-ci-th-interest': '获得利息',
					'seo-rf-h2': '房贷再融资：何时值得',
					'seo-rf-h3-1': '何时再融资在财务上有意义',
					'seo-rf-h3-2': '如何计算回本期',
					'seo-rf-h3-3': '套现再融资与利率期限再融资',
					'seo-rf-h3-4': '再融资的隐性成本',
					'seo-rf-h3-5': '何时不应再融资',
					'seo-rf-p1': '再融资用新贷款取代现有贷款，理想情况下利率更低。决策归结为一个基本问题：长期节省是否超过前期成本，以及您是否会在贷款中停留足够长时间以收回这些成本？再融资最有意义的情形：',
					'seo-rf-p2': '回本期计算很简单：用总结清费用除以每月节省额。',
					'seo-rf-formula': '<strong>回本月数 = 结清费用 ÷ 每月还款节省额</strong>',
					'seo-rf-p3': '示例：如果再融资产生4,500美元结清费用，每月节省200美元，则回本期为4,500 ÷ 200 = 22.5个月——约2年。如果您计划在家中至少再住3–5年，这次再融资明显合算。如果您计划在18个月内搬家，则不合算。',
					'seo-rf-p4': '房贷再融资主要有两种类型：',
					'seo-rf-p5': '再融资的真实成本超出所列的结清费用。常见费用包括：',
					'seo-rf-p6': '典型再融资的总结清费用为贷款金额的2–3%。对于30万美元的贷款，预计费用为6,000–9,000美元，除非您选择"零结清费用"再融资（费用计入利率中）。',
					'seo-rf-p7': '另请参阅：<a href="/loan-calculator/">房贷计算器</a>——在决定再融资前，模拟您的原始房贷或比较贷款选项。',
					'seo-rf-li-1': '新利率比当前利率低至少0.5–1%',
					'seo-rf-li-2': '计划在家中停留时间超过回本期',
					'seo-rf-li-3': '信用评分自原始贷款以来显著提高',
					'seo-rf-li-4': '希望将可调利率房贷换成固定利率房贷以获得稳定性',
					'seo-rf-li-5': '希望缩短贷款期限（如从30年缩至15年）且能承担更高月供',
					'seo-rf-li-6': '<strong>利率期限再融资：</strong>以更优利率和/或不同期限的新房贷取代现有房贷，不改变贷款余额。这是最常见的类型，也是此计算器所模拟的。目标纯粹是降低利息成本。',
					'seo-rf-li-7': '<strong>套现再融资：</strong>借款超过当前贷款余额，以现金形式获取差额。例如，若您的房子价值40万美元且欠款25万美元，您可以再融资32万美元，获得7万美元现金。套现再融资会重置您的权益，通常利率略高于利率期限再融资。',
					'seo-rf-li-8': '<strong>贷款发起费：</strong>贷款金额的0.5–1%。贷款机构处理新贷款的费用。',
					'seo-rf-li-9': '<strong>评估费：</strong>300–600美元。大多数贷款机构需要新的评估来确认您房屋的当前价值。',
					'seo-rf-li-10': '<strong>产权保险：</strong>500–1,500美元。保护贷款机构免受产权争议的必要保险。',
					'seo-rf-li-11': '<strong>登记费：</strong>25–250美元。用于登记新房贷的政府费用。',
					'seo-rf-li-12': '<strong>折扣点：</strong>可选预付利息，用于"买低"您的利率。一个点 = 贷款金额的1% = 通常降低0.25%的利率。',
					'seo-rf-li-13': '<strong>即将搬家：</strong>如果您在达到回本期前卖房，再融资的成本高于节省。',
					'seo-rf-li-14': '<strong>提前还款罚款：</strong>部分贷款对提前还款收取费用。再融资前请核实您当前贷款条款。',
					'seo-rf-li-15': '<strong>已还清大部分贷款：</strong>对已还了20年的贷款重新设定30年期，会大幅延长您的债务，即使利率更低。',
					'seo-rf-li-16': '<strong>信用评分下降：</strong>如果您的信用自原始房贷以来恶化，您可能无法获得更好的利率，实际上可能获得更高的利率。',
					'seo-cur-h2': '货币兑换、黄金、石油和股票价格：实时汇率如何运作',
					'seo-cur-h3-1': '实时汇率如何运作',
					'seo-cur-p1': '货币汇率由外汇市场（forex）决定，这是全球最大的金融市场，每日交易量超过7万亿美元。您在本网站看到的"实时"汇率是中间市场汇率（也称为银行间汇率或即期汇率），即银行在大额交易中使用的买入价和卖出价的中间点。',
					'seo-cur-p2': '这里显示的汇率来自Frankfurter API，该API汇聚了欧洲央行和其他金融来源的数据。数据每日更新并缓存以提高性能。对于毫秒级精度的实时汇率，机构交易者使用专业外汇平台——但对于旅行规划、国际转账和一般参考，这些汇率的误差不到百分之一。',
					'seo-cur-h3-2': '影响货币汇率的因素',
					'seo-cur-p3': '汇率基于复杂的经济和政治因素组合不断变化：',
					'seo-cur-li-1': '<strong>利率差异：</strong>当央行提高利率时，其货币通常会走强，因为较高的利率吸引寻求更好回报的外国资本。美联储的决定往往会影响全球汇率。',
					'seo-cur-li-2': '<strong>通货膨胀：</strong>通胀上升会随时间侵蚀货币的购买力。通胀低且稳定的国家往往拥有更强劲的货币。例如，EUR/USD货币对因美国与欧元区之间的通胀差异而受到密切关注。',
					'seo-cur-li-3': '<strong>贸易差额：</strong>出口多于进口的国家（贸易顺差）对其货币的需求更高，推高其价值。长期贸易逆差的国家可能随时间出现货币走弱。',
					'seo-cur-li-4': '<strong>政治稳定性：</strong>政治不确定性、选举或地缘政治冲突可能导致货币快速波动。USD、CHF和JPY等避险货币在全球危机期间通常会走强。',
					'seo-cur-li-5': '<strong>GDP增长：</strong>强劲的经济增长增加对货币的需求，因为投资者将资本投入该经济体。',
					'seo-cur-h3-3': '中间市场汇率与银行汇率：为何存在差价',
					'seo-cur-p4': '您在此转换器看到的汇率是中间市场汇率——买卖价格之间的理论中间点。当您实际通过银行、信用卡或汇款服务兑换货币时，您将获得更差的汇率。这个差额称为点差，这就是货币兑换业务盈利的方式。',
					'seo-cur-li-6': '<strong>银行和机场兑换亭：</strong>通常收取比中间市场汇率高3–10%的费用。对小额兑换和旅游地点最不划算。',
					'seo-cur-li-7': '<strong>信用卡：</strong>通常收取1–3%的境外交易手续费。往往是境外购物的最佳选择，尤其是免收境外交易手续费的卡片。',
					'seo-cur-li-8': '<strong>专业汇款服务（Wise、Revolut）：</strong>收取比中间市场汇率高0.3–1%的费用。最适合大额国际转账。',
					'seo-cur-p5': '计算您实际将收到的金额：取中间市场汇率减去服务商的点差百分比。如果您看到中间市场汇率1 USD = 0.92 EUR，而您的银行收取3%，您将获得约0.92 × (1 - 0.03) = 0.892 EUR每美元。',
					'seo-cur-h3-4': '黄金作为货币对冲：XAU如何定价',
					'seo-cur-p6': '黄金（代码XAU）在国际市场上以每金衡盎司美元计价。金衡盎司是贵金属的标准单位，约等于31.1克（略重于标准常衡盎司的28.35克）。一金衡盎司精确等于31.1035克。',
					'seo-cur-p7': '黄金作为抵御货币贬值和通货膨胀的对冲工具。当美元走弱或通胀上升时，黄金价格通常上涨——不是因为黄金本身变化，而是因为购买同样重量的黄金需要更多美元。黄金几个世纪以来维持了购买力，而各种货币的价值不断被通胀侵蚀。本网站的黄金价格来自Yahoo Finance的市场数据，每小时缓存更新。',
					'seo-cur-p8': '黄金价格走势受以下因素驱动：央行黄金储备、美元强弱、实际利率（当实际利率低或为负时，黄金更具吸引力）、地缘政治风险以及珠宝/工业需求。',
					'seo-cur-h3-5': 'WTI原油：为何以美元计价以及驱动价格的因素',
					'seo-cur-p9': '西德克萨斯中质原油（WTI）是北美主要的原油基准，也是重要的全球价格参考。以每桶美元计价（1桶 = 42美制加仑 ≈ 159升）。自1970年代石油美元协议以来，石油一直以美元计价，由于所有石油进口国都需要美元支付，这创造了全球对美元的需求。',
					'seo-cur-p10': '驱动油价的关键因素：',
					'seo-cur-li-9': '<strong>欧佩克+产量决定：</strong>欧佩克卡特尔和盟友生产国（俄罗斯等）控制着全球约40%的供应。减产推高价格；增产压低价格。',
					'seo-cur-li-10': '<strong>美国页岩油产量：</strong>美国部分依靠页岩技术成为全球最大石油生产国。美国产量增加与欧佩克竞争，可限制价格上涨。',
					'seo-cur-li-11': '<strong>全球需求：</strong>中国和印度（大型石油消费国）的经济增长是主要需求驱动力。经济衰退会减少需求并压低价格。',
					'seo-cur-li-12': '<strong>地缘政治事件：</strong>石油产区（中东、俄罗斯）的冲突会产生供应风险溢价，推高价格。',
					'seo-cur-li-13': '<strong>美元强弱：</strong>由于石油以美元计价，美元走强使石油对非美国买家更昂贵，抑制需求并对价格施加下行压力。',
					'seo-cur-h3-6': '实时股票价格：每小时更新的顶级美国股票',
					'seo-cur-p11': 'LoanCalc显示十只广受追踪的美国股票和基金的实时价格：苹果(AAPL)、微软(MSFT)、谷歌(GOOGL)、亚马逊(AMZN)、Meta(META)、英伟达(NVDA)、特斯拉(TSLA)、摩根大通(JPM)、伯克希尔哈撒韦B(BRK.B)和SPDR标普500ETF Trust(SPY)。价格来自Yahoo Finance，每小时更新——与黄金和石油数据更新间隔相同。',
					'seo-cur-p12': '每个股票标签显示当前USD价格、较前日收盘价的百分比变化（涨幅显示绿色箭头，跌幅显示红色箭头）以及使用实时汇率换算为您本地货币的等值金额。这使您无需切换应用即可从世界任何地方轻松追踪美国股票仓位的价值。',
					'seo-cur-p13': 'S&amp;P 500 ETF (SPY)作为广泛的市场基准被纳入：当SPY上涨时，美国整体市场通常在上升。英伟达和特斯拉等个股波动性更高。使用<a href="/savings-calculator/">储蓄计算器</a>，以7–10%的年化回报率模拟S&amp;P 500的长期增长。',
					'seo-cur-p14': '另请参阅：<a href="/savings-calculator/">储蓄计算器</a> — 模拟货币回报或与大宗商品挂钩的投资随时间增长的情况。',
					'lbl-market-prices': '市场价格',
					'cur-rate-unavailable': '汇率不可用',
					'cur-not-in-feed': '不在实时数据中',
					'cur-today': '今天',
					'cur-status-fetching': '正在获取汇率…',
					'cur-status-live': '实时汇率 · {date} · 161种货币 · 每24小时更新',
					'cur-status-partial': '汇率已加载 · {date}（33种货币）',
					'cur-status-offline': '离线汇率：仅限部分货币',
					'cmd-fetching': '加载中…',
					'cmd-live': '实时 · {date}',
					'cmd-approx': '约值 · 请查看实时数据',
					'cur-status-cached': '来自 {date} 的汇率 · 已缓存 · 每24小时更新',
					'clamp-min': '最小值：',
					'clamp-max': '最大值：'
				},
				hi: {
					'nav-loans': 'ऋण',
					'nav-savings': 'बचत',
					'nav-refinance': 'पुनर्वित्त',
					'nav-currency': 'मुद्रा',
					'btn-settings': 'सेटिंग्स',
					'pref-title': 'प्राथमिकताएं',
					'pref-save': 'प्राथमिकताएं सहेजें',
					'toast-saved': 'प्राथमिकताएं सहेजी गईं',
					'pref-cancel': 'रद्द करें',
					'ci-sub-desc': 'देखें आपकी बचत साल दर साल कैसे बढ़ती है।',
					'tab-mortgage': 'होम लोन',
					'tab-car': 'कार लोन',
					'tab-personal': 'व्यक्तिगत ऋण',
					'tab-student': 'छात्र ऋण',
					'tab-afford': 'सामर्थ्य',
					'afford-pmt-label': 'मेरी वहनीय मासिक किस्त',
					'afford-result-label': 'आप अधिकतम उधार ले सकते हैं',
					'afford-sub': 'वहनीयता अनुमान',
					'cur-amount-label': 'राशि',
					'cur-to-label': 'में परिवर्तित',
					'cur-quick': 'त्वरित संदर्भ',
					'pref-language': 'प्रदर्शन भाषा',
					'pref-lang-note': 'लेबल और संख्या स्वरूपण बदलता है।',
					'pref-currency': 'पसंदीदा मुद्रा',
					'pref-currency-note': 'कनवर्टर के लिए डिफ़ॉल्ट मुद्रा।',
					'pref-current': 'वर्तमान सेटिंग्स',
					'gold-per': 'प्रति ट्रॉय औंस',
					'gold-local': 'आपकी मुद्रा में मूल्य',
					'oil-per': 'प्रति बैरल',
					'oil-local': 'आपकी मुद्रा में मूल्य',
					'trust-1': 'हमेशा मुफ़्त',
					'trust-2': 'साइनअप नहीं',
					'trust-3': 'किसी भी देश के लिए',
					'hero-sub': 'ऋण कैलकुलेटर, चक्रवृद्धि ब्याज, पुनर्वित्त बचत, लाइव मुद्रा कनवर्टर, सोने, तेल और लाइव शेयर कीमतें: सब मुफ़्त, तुरंत, बिना साइनअप।',
					'faq-heading': 'ऋण, बचत और मुद्राओं के बारे में सामान्य प्रश्न',
					'chart-center-lbl': 'मूलधन',
					'chart-stat-principal': 'उधार लिया मूलधन',
					'chart-stat-interest': 'कुल चुकाया ब्याज',
					'chart-stat-total': 'कुल चुकाई गई राशि',
					'chart-stat-payoff': 'ऋण पूरी तरह चुकाने की तारीख',
					'breakdown-sub': 'आपकी कुल लागत उधार राशि और ब्याज के बीच कैसे बंटती है।',
					'amort-sub': 'हर भुगतान का साल-दर-साल विवरण।',
					'ci-section-sub': 'देखें कि चक्रवृद्धि ब्याज के साथ आपकी बचत साल-दर-साल कैसे बढ़ती है।',
					'cur-section-sub': 'लाइव दरों के साथ प्रमुख मुद्राओं के बीच रूपांतरित करें। आपकी स्थानीय मुद्रा में सोना और तेल की कीमतें।',
					'ci-chart-sub': 'हर साल के अंत में शेष राशि, जमा और चक्रवृद्धि वृद्धि में विभाजित।',
					'per-oz-usd': 'प्रति औंस USD में',
					'per-bbl-usd': 'प्रति बैरल USD में',
					'lbl-stocks': 'शेयर',
					'lbl-tab-currency': 'मुद्राएँ',
					'lbl-tab-commodities': 'जिंस',
					'lbl-tab-stocks': 'शेयर',
					'age-just-now': 'अभी',
					'age-min-ago': '{n} मिनट पहले',
					'age-hours-ago': '{n} घंटे पहले',
					'lbl-currencies': 'मुद्राएं',
					'lbl-rates-from': 'दरें',
					'lbl-from': 'से',
					'nav-faq': 'FAQ',
					'unit-mo': '/माह',
					'weight-1g': '1 ग्रा',
					'weight-10g': '10 ग्रा',
					'weight-1kg': '1 कि.ग्रा',
					'weight-5bbl': '5 बैरल',
					'weight-10bbl': '10 बैरल',
					'weight-100bbl': '100 बैरल',
					'lbl-price-unavailable': 'मूल्य उपलब्ध नहीं',
					'lbl-updating': 'अपडेट हो रहा है…',
					'lbl-partial-rates': 'आंशिक दरें',
					'rf-sub': 'नई दर के साथ प्रति माह',
					'rf-verdict-init': 'पुनर्वित्त समझदारी है या नहीं यह जानने के लिए ऋण विवरण दर्ज करें।',
					'rf-verdict-higher': 'नई दर कम नहीं है: पुनर्वित्त से आपकी किस्त बढ़ेगी।',
					'rf-verdict-long': 'मासिक बचत है लेकिन ब्रेक-ईवन शेष अवधि से अधिक है। अनुशंसित नहीं।',
					'rf-verdict-good': 'पुनर्वित्त फायदेमंद लगता है।',
					'rf-verdict-summary': 'प्रति माह {monthly} की बचत, {breakeven} में ब्रेक-ईवन। कुल बचत: {total}।',
					'rf-never': 'कभी नहीं',
					'rf-over-term': '>{n} वर्ष',
					'rf-months': '{n} माह',
					'rf-years-mo': '{y}व {m}म',
					'loan-desc': 'किसी भी होम लोन, कार लोन, व्यक्तिगत या छात्र ऋण की सटीक मासिक किस्त जानने के लिए इस मुफ्त कैलकुलेटर का उपयोग करें।',
					'ci-desc': 'चक्रवृद्धि ब्याज कैलकुलेटर दिखाता है कि संचित मूलधन पर ब्याज लगाने से प्रारंभिक जमा कैसे बढ़ता है।',
					'rf-desc': 'पुनर्वित्त कैलकुलेटर आपको यह तय करने में मदद करता है कि कम ब्याज दर पर पुनर्वित्त करना उचित है।',
					'cur-desc': 'LoanCalc मुद्रा परिवर्तक 161 विश्व मुद्राओं को हर 24 घंटे में अपडेट होने वाली लाइव दरों के साथ समर्थन करता है।',
					'how-p1': 'हर फिक्स्ड-रेट लोन एक ही मानक परिशोधन फॉर्मूला उपयोग करता है।',
					'how-p2': 'तीन कारक आपकी मासिक किस्त नियंत्रित करते हैं।',
					'unit-years': 'वर्ष',
					'unit-yr': 'वर्ष',
					'unit-yrs': 'वर्ष',
					'ci-earned-short': 'वृद्धि',
					'cur-rate-lbl': 'दर',
					'cur-inverse-lbl': 'विपरीत',
					'cur-updated-lbl': 'अपडेट',
					'how-formula-h': 'सूत्र',
					'how-lower-h': 'मासिक किस्त कैसे कम करें',
					'formula-m': 'मासिक किस्त',
					'formula-p': 'मूलधन (ऋण राशि)',
					'formula-r': 'मासिक दर (वार्षिक ÷ 12)',
					'formula-n': 'कुल भुगतान (वर्ष × 12)',
					'tip-1': 'अधिक डाउन पेमेंट मूलधन को सीधे कम करता है, जिससे मासिक किस्त और कुल ब्याज दोनों कम होते हैं।',
					'tip-2': 'लंबी अवधि किस्त को कम करती है लेकिन कुल ब्याज बढ़ाती है।',
					'tip-3': 'कम ब्याज दर का संचयी प्रभाव होता है और बड़े ऋण पर लाखों की बचत करा सकता है।',
					'tip-4': 'आवेदन से पहले क्रेडिट स्कोर सुधारें और 3-6 महीने पहले जांचें।',
					'faq-q1': 'मासिक ऋण किस्त की गणना कैसे होती है?',
					'faq-q2': 'किस्त अनुसूची क्या है?',
					'faq-q3': 'क्या यह कैलकुलेटर सभी देशों के लिए काम करता है?',
					'faq-q4': 'मैं कुल ब्याज कैसे कम कर सकता हूं?',
					'faq-q5': 'क्या LoanCalc पूरी तरह मुफ्त है?',
					'faq-q6': 'रीफाइनेंस कैलकुलेटर कैसे काम करता है?',
					'faq-q7': 'सोने की कीमत कैसे गणना होती है?',
					'faq-q8': 'कनवर्टर कौन सी मुद्राएं सपोर्ट करता है?',
					'loan-label-mortgage': '30 साल का फिक्स्ड होम लोन',
					'loan-label-car': '5 साल का कार लोन',
					'loan-label-personal': '3 साल का व्यक्तिगत ऋण',
					'loan-label-student': '10 साल का छात्र ऋण',
					'helper-title-mortgage': 'सामान्य 30 साल का होम लोन',
					'helper-title-car': 'सामान्य कार लोन',
					'helper-title-personal': 'सामान्य व्यक्तिगत ऋण',
					'helper-title-student': 'फेडरल छात्र ऋण (अमेरिका)',
					'helper-text-mortgage': '30 साल की औसत फिक्स्ड दर 6.5-7% है।',
					'helper-text-car': 'नई कार ऋण की औसत दर 6-8% है।',
					'helper-text-personal': 'व्यक्तिगत ऋण दरें 6% से 36% तक होती हैं।',
					'helper-text-student': 'संघीय छात्र ऋण दरें कांग्रेस द्वारा सालाना तय होती हैं।',
					'hero-h1': 'मुफ्त <em>वित्तीय</em><br>कैलकुलेटर सूट',
					'faq-q9': 'LoanCalc कौन से शेयर भाव दिखाता है?',
					'extra-label': 'अतिरिक्त मासिक भुगतान',
					'lbl-amount': 'ऋण राशि',
					'lbl-rate': 'वार्षिक ब्याज दर',
					'lbl-term': 'ऋण अवधि',
					'res-monthly': 'मासिक किस्त',
					'freq-monthly': 'मासिक',
					'freq-biweekly': 'द्वि-साप्ताहिक',
					'freq-per-2wk': '/ 2 सप्ताह',
					'res-principal': 'मूलधन',
					'res-interest': 'कुल ब्याज',
					'res-total': 'कुल लागत',
					'monthly-note': 'केवल मूलधन और ब्याज, कर, बीमा और शुल्क शामिल नहीं',
					'hero-headline': 'अपने आंकड़े जानें।',
					'hero-subtitle': 'मॉर्गेज, बचत, पुनर्वित्त और मुद्रा दरों के लिए मुफ़्त कैलकुलेटर।',
					'hero-h1': 'अपने आंकड़े जानें।',
					'hero-stat-currencies': 'मुद्राएँ',
					'hero-stat-langs': 'भाषाएँ',
					'hero-stat-tools': 'टूल',
					'res-year': 'भुगतान वर्ष',
					'lbl-principal-pct': 'मूलधन',
					'lbl-interest-pct': 'ब्याज',
					'section-breakdown': 'भुगतान विवरण',
					'section-amort': 'किस्त अनुसूची',
					'amort-year': 'वर्ष',
					'amort-month': 'माह',
					'amort-start': 'प्रारंभिक शेष',
					'amort-ppaid': 'मूलधन भुगतान',
					'amort-ipaid': 'ब्याज भुगतान',
					'amort-end': 'अंतिम शेष',
					'btn-show-all': 'सभी वर्ष दिखाएं',
					'btn-show-all-months': 'सभी माह दिखाएं',
					'btn-show-less': 'कम दिखाएं',
					'amort-gran-yearly': 'वार्षिक',
					'amort-gran-monthly': 'मासिक',
					'section-how': 'ऋण किस्त की गणना कैसे होती है',
					'section-faq': 'सामान्य प्रश्न',
					'ci-h2': 'चक्रवृद्धि ब्याज और बचत वृद्धि कैलकुलेटर',
					'ci-label-principal': 'प्रारंभिक जमा',
					'ci-label-monthly': 'मासिक योगदान',
					'ci-label-rate': 'वार्षिक रिटर्न दर',
					'ci-label-years': 'निवेश अवधि',
					'ci-result-label': 'भविष्य मूल्य',
					'ci-sub': 'कुल पोर्टफोलियो के बाद',
					'ci-deposited': 'कुल जमा',
					'ci-earned': 'अर्जित ब्याज',
					'ci-mult': 'विकास गुणक',
					'ci-year': 'लक्ष्य वर्ष',
					'ci-chart-h': 'वार्षिक विकास',
					'rf-h2': 'पुनर्वित्त कैलकुलेटर: आप कितना बचाएंगे?',
					'rf-current': 'वर्तमान ऋण',
					'rf-new': 'नया ऋण प्रस्ताव',
					'rf-balance': 'शेष राशि',
					'rf-oldrate': 'वर्तमान ब्याज दर',
					'rf-remaining': 'शेष वर्ष',
					'rf-newrate': 'नई ब्याज दर',
					'rf-costs': 'समापन लागत',
					'rf-monthly': 'मासिक बचत',
					'rf-old': 'पुरानी किस्त',
					'rf-new-pay': 'नई किस्त',
					'rf-breakeven': 'ब्रेक-ईवन',
					'rf-total': 'कुल जीवनकाल बचत',
					'cur-h2': 'लाइव करेंसी कनवर्टर, सोने का भाव, तेल मूल्य और आज के शेयर भाव',
					'gold-local-lbl': 'आपकी मुद्रा में मूल्य',
					'oil-local-lbl': 'आपकी मुद्रा में मूल्य',
					'footer-mortgage': 'बंधक कैलकुलेटर',
					'footer-loan': 'ऋण कैलकुलेटर',
					'footer-savings': 'बचत कैलकुलेटर',
					'footer-refinance': 'पुनर्वित्त कैलकुलेटर',
					'footer-currency': 'मुद्रा परिवर्तक',
					'footer-privacy': 'गोपनीयता नीति',
					'footer-dnsmi': 'मेरी व्यक्तिगत जानकारी न बेचें या साझा करें',
					'footer-rights': 'सर्वाधिकार सुरक्षित।',
					'footer-desc': 'मुफ्त वित्तीय कैलकुलेटर: ऋण, बचत, पुनर्वित्त, मुद्रा। खाता आवश्यक नहीं।',
					'footer-disclaimer': 'LoanCalc केवल सूचनात्मक उद्देश्यों के लिए अनुमान प्रदान करता है। यह वित्तीय सलाह नहीं है।',
					'seo-mort-h2': 'मॉर्गेज कैलकुलेटर: वह सब कुछ जो आपको जानना चाहिए',
					'seo-mort-h3-1': 'मॉर्गेज कैलकुलेटर क्या है और इसे कौन उपयोग करे?',
					'seo-mort-p1': 'मॉर्गेज कैलकुलेटर एक वित्तीय उपकरण है जो तीन इनपुट के आधार पर होम लोन की मासिक किस्त की गणना करता है: ऋण राशि (मूलधन), वार्षिक ब्याज दर और वर्षों में ऋण अवधि। घर खरीदने पर विचार कर रहे, ऋण ऑफर की तुलना कर रहे या उधार की दीर्घकालिक लागत समझने की कोशिश कर रहे किसी भी व्यक्ति को मॉर्गेज समझौते पर हस्ताक्षर करने से पहले इसका उपयोग करना चाहिए।',
					'seo-mort-p2': 'पहली बार घर खरीदने वाले लोग घर देखने से पहले किफायती होने की जाँच करने के लिए मॉर्गेज कैलकुलेटर का उपयोग करते हैं। मौजूदा गृहस्वामी पुनर्वित्त परिदृश्यों की जाँच या अतिरिक्त भुगतान के प्रभाव का अनुमान लगाने के लिए इनका उपयोग करते हैं। रियल एस्टेट निवेशक किराये की संपत्तियों पर नकदी प्रवाह का अनुमान लगाने के लिए इनका उपयोग करते हैं। कैलकुलेटर दुनिया भर में फिक्स्ड-रेट मॉर्गेज के लिए समान रूप से काम करता है।',
					'seo-mort-h3-2': 'मासिक किस्त का फॉर्मूला कैसे काम करता है',
					'seo-mort-p3': 'हर फिक्स्ड-रेट मॉर्गेज एक ही मानक परिशोधन फॉर्मूले का उपयोग करता है:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'जहाँ <strong>M</strong> आपकी मासिक किस्त है, <strong>P</strong> मूल ऋण राशि है, <strong>r</strong> मासिक ब्याज दर है (वार्षिक दर ÷ 12) और <strong>n</strong> कुल मासिक किस्तों की संख्या है (वर्ष × 12)। यह फॉर्मूला एक निश्चित मासिक राशि देता है जो शेष शेष पर ब्याज और मूलधन का एक हिस्सा दोनों को कवर करती है, अनुपात समय के साथ बदलता रहता है। शुरुआती वर्षों में प्रत्येक भुगतान का अधिकांश भाग ब्याज होता है। अंतिम वर्षों में अधिकांश भाग मूलधन कम करता है।',
					'seo-mort-h3-3': 'आपकी मॉर्गेज दर को कौन से कारक प्रभावित करते हैं?',
					'seo-mort-p6': 'आपकी वास्तविक मॉर्गेज दर कई कारकों पर निर्भर करती है जिनका ऋणदाता आपके आवेदन को मंजूरी देते समय मूल्यांकन करते हैं:',
					'seo-mort-li-1': '<strong>क्रेडिट स्कोर:</strong> 760 से ऊपर स्कोर वाले उधारकर्ताओं को आमतौर पर सबसे कम दरें मिलती हैं। क्रेडिट स्कोर में प्रत्येक 20-पॉइंट की गिरावट आपकी दर को 0.1–0.5% तक बढ़ा सकती है, जो 30 वर्षों में कुल ब्याज में हजारों जोड़ती है।',
					'seo-mort-li-2': '<strong>ऋण-से-मूल्य अनुपात (LTV):</strong> कम LTV (बड़ा डाउन पेमेंट) ऋणदाता को कम जोखिम का संकेत देता है। 20% या अधिक डाउन पेमेंट करने से आमतौर पर निजी मॉर्गेज बीमा (PMI) समाप्त हो जाता है और आपको बेहतर दर के लिए योग्य बना सकता है।',
					'seo-mort-li-3': '<strong>ऋण प्रकार:</strong> अनुरूप ऋण (Fannie Mae/Freddie Mac सीमाओं के भीतर) आमतौर पर जंबो ऋण की तुलना में कम दरें रखते हैं। सरकार-समर्थित ऋण (FHA, VA, USDA) की अपनी दर संरचनाएँ हैं।',
					'seo-mort-li-4': '<strong>ऋण अवधि:</strong> 15-वर्षीय मॉर्गेज में 30-वर्षीय की तुलना में कम ब्याज दरें होती हैं क्योंकि ऋणदाता का पैसा कम समय के लिए जोखिम में रहता है।',
					'seo-mort-li-5': '<strong>बाज़ार की स्थितियाँ:</strong> मॉर्गेज दरें 10-वर्षीय ट्रेजरी यील्ड और फेडरल रिज़र्व नीति से बहुत प्रभावित होती हैं। जब Fed मुद्रास्फीति से लड़ने के लिए दरें बढ़ाता है, तो मॉर्गेज दरें भी बढ़ती हैं।',
					'seo-mort-h3-4': '15-वर्ष बनाम 30-वर्ष मॉर्गेज: वास्तविक ट्रेडऑफ',
					'seo-mort-p12': '15-वर्ष और 30-वर्ष मॉर्गेज के बीच चुनाव मूल रूप से मासिक नकदी प्रवाह और कुल ब्याज भुगतान के बीच का ट्रेडऑफ है। यहाँ $300,000 ऋण का एक उदाहरण है:',
					'seo-mort-th-loan': 'ऋण',
					'seo-mort-th-rate': 'दर',
					'seo-mort-p13': '6.5% पर, 30-वर्षीय मॉर्गेज में कुल $382,633 ब्याज होता है, जबकि 15-वर्षीय मॉर्गेज में $170,453 — $212,000 से अधिक का अंतर। हालांकि, 30-वर्षीय मॉर्गेज की मासिक किस्त $718 कम है, जो महत्वपूर्ण है यदि नकदी प्रवाह कम हो।',
					'seo-mort-h3-5': 'PMI क्या है और यह कब लागू होता है?',
					'seo-mort-p14': 'निजी मॉर्गेज बीमा (PMI) अधिकांश अमेरिकी ऋणदाताओं द्वारा आवश्यक है जब आपका डाउन पेमेंट घर की खरीद मूल्य के 20% से कम हो। PMI आपके डिफ़ॉल्ट होने पर ऋणदाता की रक्षा करता है। सामान्य लागत ऋण राशि का 0.5–1.5% प्रति वर्ष है, जो आपकी मासिक किस्त में जोड़ा जाता है। $300,000 के ऋण पर PMI $125–$375 प्रति माह जोड़ सकता है। एक बार जब आपकी इक्विटी 20% तक पहुँचती है, तो आप आमतौर पर PMI रद्द करने का अनुरोध कर सकते हैं। ऋणदाताओं को PMI को स्वचालित रूप से रद्द करना होगा जब ऋण शेष मूल खरीद मूल्य के 78% तक पहुँचे।',
					'seo-mort-h3-6': 'अपना मॉर्गेज तेज़ी से कैसे चुकाएं',
					'seo-mort-li-6': '<strong>साल में एक अतिरिक्त भुगतान करें:</strong> 30-वर्षीय मॉर्गेज पर, साल में एक अतिरिक्त मासिक भुगतान ऋण अवधि को लगभग 4–5 वर्ष कम करता है और ब्याज में हजारों की बचत करता है।',
					'seo-mort-li-7': '<strong>द्वि-साप्ताहिक भुगतान पर स्विच करें:</strong> 12 मासिक भुगतान के बजाय, साल में 26 आधे-भुगतान करें। इसका परिणाम सालाना एक अतिरिक्त पूर्ण भुगतान होता है बिना नकदी प्रवाह पर महत्वपूर्ण प्रभाव डाले।',
					'seo-mort-li-8': '<strong>अपना भुगतान राउंड अप करें:</strong> यदि आपका भुगतान $1,847 है, तो $1,900 या $2,000 प्रति माह भुगतान करने से अतिरिक्त राशि पूरी तरह से मूलधन में जाती है, चुकौती में तेज़ी लाती है।',
					'seo-mort-li-9': '<strong>अप्रत्याशित राशि लागू करें:</strong> टैक्स रिफंड, बोनस, या विरासत एकमुश्त मूलधन भुगतान के रूप में लागू करने से आपकी मॉर्गेज अवधि में कई साल की कमी आ सकती है।',
					'seo-mort-p15': 'यह भी उपयोगी: <a href="/refinance-calculator/">पुनर्वित्त कैलकुलेटर</a> — देखें कि कम दर आपके वर्तमान मॉर्गेज के लिए उपयुक्त है या नहीं। या <a href="/loan-calculator/">अन्य ऋण प्रकार</a> देखें जिसमें कार ऋण, व्यक्तिगत ऋण और छात्र ऋण शामिल हैं।',
					'seo-ci-h2': 'चक्रवृद्धि ब्याज और बचत: संपूर्ण मार्गदर्शिका',
					'seo-ci-h3-1': 'चक्रवृद्धि ब्याज क्या है और यह क्यों महत्वपूर्ण है?',
					'seo-ci-h3-2': 'दैनिक बनाम मासिक बनाम वार्षिक चक्रवृद्धि — यह वृद्धि को कैसे प्रभावित करती है',
					'seo-ci-h3-3': '72 का नियम समझाया गया',
					'seo-ci-h3-4': 'प्रतीक्षा की लागत: 25, 35 या 45 वर्ष की आयु में शुरुआत',
					'seo-ci-h3-5': 'उच्च-उपज बचत खाते बनाम इंडेक्स फंड: विशिष्ट दरें',
					'seo-ci-p1': 'चक्रवृद्धि ब्याज वह ब्याज है जो प्रारंभिक मूलधन और सभी पिछली अवधियों के संचित ब्याज दोनों पर गणना किया जाता है। यह साधारण ब्याज से मौलिक रूप से भिन्न है, जो केवल मूल मूलधन पर गणना होता है। अल्बर्ट आइंस्टीन को अक्सर चक्रवृद्धि ब्याज को "दुनिया का आठवां आश्चर्य" कहने का श्रेय दिया जाता है। जो इसे समझता है, वह कमाता है; जो नहीं समझता, वह देता है।',
					'seo-ci-p2': 'चक्रवृद्धि ब्याज इतना शक्तिशाली होने का कारण घातीय वृद्धि है। शुरुआती वर्षों में, प्रभाव सूक्ष्म होता है। लेकिन 20, 30 या 40 वर्षों में, चक्रवृद्धि प्रभाव असाधारण हो जाता है — आपकी अंतिम संपत्ति का बड़ा हिस्सा आपके योगदान से नहीं बल्कि ब्याज पर अर्जित ब्याज पर अर्जित ब्याज से आता है।',
					'seo-ci-p3': 'चक्रवृद्धि आवृत्ति यह निर्धारित करती है कि ब्याज की गणना कितनी बार होती है और शेष में जोड़ी जाती है। अधिक बार चक्रवृद्धि का अर्थ है थोड़ा अधिक रिटर्न:',
					'seo-ci-p4': 'बचत खातों और मनी मार्केट फंड के लिए, मासिक चक्रवृद्धि मानक है। ऑनलाइन बैंकों के उच्च-उपज बचत खाते आमतौर पर दैनिक चक्रवृद्धि करते हैं। मासिक और दैनिक चक्रवृद्धि के बीच अंतर छोटा है — ब्याज दर स्वयं चक्रवृद्धि आवृत्ति से कहीं अधिक महत्वपूर्ण है।',
					'seo-ci-p5': '72 का नियम एक सरल मानसिक गणित शॉर्टकट है: यह अनुमान लगाने के लिए कि आपके निवेश को मूल्य में दोगुना होने में कितने साल लगते हैं, 72 को अपनी वार्षिक रिटर्न दर से विभाजित करें।',
					'seo-ci-p6': 'नियम उलटा भी काम करता है: यदि आप अपने पैसे को 8 साल में दोगुना करना चाहते हैं, तो आपको कम से कम 72 ÷ 8 = 9% प्रति वर्ष की दर चाहिए।',
					'seo-ci-p7': 'बचत में सबसे शक्तिशाली कारक समय है। बिना प्रारंभिक जमा के 7% वार्षिक रिटर्न पर प्रति माह $200 निवेश करने पर विचार करें:',
					'seo-ci-p8': '35 की बजाय 25 की उम्र में शुरू करने से योगदान में केवल $24,000 अधिक लगते हैं लेकिन $285,000 अधिक धन उत्पन्न होता है — उन अतिरिक्त $24,000 पर 12 गुना रिटर्न। संदेश स्पष्ट है: जल्दी शुरू करें, छोटी राशि से भी।',
					'seo-ci-p9': 'इस कैलकुलेटर में आप जो रिटर्न दर चुनते हैं वह वास्तव में दर्शानी चाहिए कि आप अपनी बचत कहाँ रखेंगे:',
					'seo-ci-p10': 'यह भी देखें: <a href="/refinance-calculator/">पुनर्वित्त कैलकुलेटर</a> — मॉर्गेज पुनर्वित्त से बचाई गई ब्याज को बचत में पुनर्निर्देशित किया जा सकता है।',
					'seo-ci-li-1': '<strong>वार्षिक चक्रवृद्धि:</strong> ब्याज वर्ष में एक बार जोड़ा जाता है। आधार दर।',
					'seo-ci-li-2': '<strong>मासिक चक्रवृद्धि:</strong> ब्याज वर्ष में 12 बार जोड़ा जाता है। 6% की वार्षिक दर मासिक चक्रवृद्धि पर 6.168% की प्रभावी वार्षिक दर के बराबर है।',
					'seo-ci-li-3': '<strong>दैनिक चक्रवृद्धि:</strong> ब्याज वर्ष में 365 बार जोड़ा जाता है। 6% की दर पर दैनिक चक्रवृद्धि 6.183% की प्रभावी दर देती है। मासिक से थोड़ा बेहतर।',
					'seo-ci-li-4': '4% पर (उच्च-उपज बचत): 72 ÷ 4 = <strong>18 वर्ष</strong> दोगुने के लिए',
					'seo-ci-li-5': '7% पर (शेयर बाज़ार औसत): 72 ÷ 7 = <strong>10.3 वर्ष</strong> दोगुने के लिए',
					'seo-ci-li-6': '10% पर (आक्रामक वृद्धि): 72 ÷ 10 = <strong>7.2 वर्ष</strong> दोगुने के लिए',
					'seo-ci-li-7': '12% पर (वेंचर रिटर्न): 72 ÷ 12 = <strong>6 वर्ष</strong> दोगुने के लिए',
					'seo-ci-li-8': '<strong>पारंपरिक बचत खाता:</strong> 0.01–0.5% APY। प्रभावी रूप से महंगाई के सामने मूल्य खो देता है। केवल आपातकालीन निधि के लिए उपयुक्त जिसे तुरंत एक्सेस करना हो।',
					'seo-ci-li-9': '<strong>उच्च-उपज बचत खाता (ऑनलाइन बैंक):</strong> उच्च-दर वातावरण में 4–5% APY। FDIC बीमाकृत। आपातकालीन निधि और अल्पकालिक लक्ष्यों (1–3 वर्ष) के लिए उत्कृष्ट।',
					'seo-ci-li-10': '<strong>मनी मार्केट खाते:</strong> 4–5% APY। थोड़े अलग एक्सेस शर्तों के साथ HYSA के समान।',
					'seo-ci-li-11': '<strong>जमा प्रमाण पत्र (CDs):</strong> 6 महीने से 5 साल के लॉक-अप के साथ 4–5.5% APY। लंबी अवधि के लिए उच्च दरें।',
					'seo-ci-li-12': '<strong>S&amp;P 500 इंडेक्स फंड:</strong> ऐतिहासिक रूप से ~10% औसत नाममात्र रिटर्न (महंगाई के बाद 7%)। गारंटी नहीं। 5+ साल के लक्ष्यों के लिए सर्वोत्तम। बाजार अस्थिरता के अधीन।',
					'seo-ci-li-13': '<strong>कुल बॉन्ड मार्केट फंड:</strong> ऐतिहासिक रूप से 3–5%। शेयरों की तुलना में कम अस्थिरता। मध्यम अवधि के लक्ष्यों के लिए उपयुक्त।',
					'seo-ci-th-start': 'प्रारंभ आयु',
					'seo-ci-th-end': 'अंत आयु',
					'seo-ci-th-years': 'निवेशित वर्ष',
					'seo-ci-th-contributed': 'कुल योगदान',
					'seo-ci-th-final': 'अंतिम मूल्य',
					'seo-ci-th-interest': 'अर्जित ब्याज',
					'seo-rf-h2': 'अपना मॉर्गेज पुनर्वित्त कराना: कब सही है',
					'seo-rf-h3-1': 'पुनर्वित्त कब वित्तीय रूप से उचित है',
					'seo-rf-h3-2': 'ब्रेक-ईवन पॉइंट की गणना कैसे करें',
					'seo-rf-h3-3': 'कैश-आउट रिफाइनेंस बनाम रेट-एंड-टर्म रिफाइनेंस',
					'seo-rf-h3-4': 'पुनर्वित्त की छुपी लागतें',
					'seo-rf-h3-5': 'कब पुनर्वित्त नहीं करना चाहिए',
					'seo-rf-p1': 'पुनर्वित्त आपके मौजूदा ऋण को एक नए ऋण से बदलता है, आदर्श रूप से कम ब्याज दर पर। निर्णय एक मौलिक प्रश्न पर आता है: क्या दीर्घकालिक बचत अग्रिम लागत से अधिक होगी, और क्या आप उन लागतों को वसूलने के लिए पर्याप्त समय तक ऋण में रहेंगे? पुनर्वित्त सबसे अधिक उचित है जब:',
					'seo-rf-p2': 'ब्रेक-ईवन गणना सरल है: अपनी कुल समापन लागत को अपनी मासिक बचत से विभाजित करें।',
					'seo-rf-formula': '<strong>ब्रेक-ईवन महीने = समापन लागत ÷ मासिक भुगतान बचत</strong>',
					'seo-rf-p3': 'उदाहरण: यदि पुनर्वित्त में $4,500 समापन लागत आती है और आपको प्रति माह $200 बचाती है, तो ब्रेक-ईवन 4,500 ÷ 200 = 22.5 महीने है — लगभग 2 साल। यदि आप कम से कम 3–5 साल और अपने घर में रहने की योजना बनाते हैं, तो यह पुनर्वित्त स्पष्ट वित्तीय अर्थ रखता है। यदि आप 18 महीनों के भीतर जाने की योजना बना रहे हैं, तो नहीं।',
					'seo-rf-p4': 'मॉर्गेज पुनर्वित्त के दो मुख्य प्रकार हैं:',
					'seo-rf-p5': 'पुनर्वित्त की वास्तविक लागत बताई गई समापन लागत से परे है। सामान्य शुल्कों में शामिल हैं:',
					'seo-rf-p6': 'एक सामान्य पुनर्वित्त के लिए कुल समापन लागत ऋण राशि का 2–3% होती है। $300,000 के ऋण पर, $6,000–$9,000 की लागत की अपेक्षा करें जब तक आप "कोई समापन लागत नहीं" पुनर्वित्त नहीं चुनते (जहां लागत को दर में शामिल किया जाता है)।',
					'seo-rf-p7': 'यह भी देखें: <a href="/loan-calculator/">मॉर्गेज कैलकुलेटर</a> — पुनर्वित्त का निर्णय लेने से पहले अपना मूल मॉर्गेज मॉडल करें या ऋण विकल्पों की तुलना करें।',
					'seo-rf-li-1': 'आपकी नई दर आपकी वर्तमान दर से कम से कम 0.5–1% कम है',
					'seo-rf-li-2': 'आप ब्रेक-ईवन अवधि से अधिक समय तक घर में रहने की योजना बनाते हैं',
					'seo-rf-li-3': 'आपके मूल ऋण के बाद से आपका क्रेडिट स्कोर काफी सुधरा है',
					'seo-rf-li-4': 'आप स्थिरता के लिए एडजस्टेबल-रेट से फिक्स्ड-रेट मॉर्गेज में स्विच करना चाहते हैं',
					'seo-rf-li-5': 'आप अपना ऋण कार्यकाल कम करना चाहते हैं (जैसे 30 से 15 साल) और अधिक मासिक भुगतान वहन कर सकते हैं',
					'seo-rf-li-6': '<strong>रेट-एंड-टर्म रिफाइनेंस:</strong> आप अपने मौजूदा मॉर्गेज को बेहतर दर और/या अलग कार्यकाल पर एक नए से बदलते हैं, ऋण शेष को बदले बिना। यह सबसे सामान्य प्रकार है और यही इस कैलकुलेटर द्वारा मॉडल किया जाता है। लक्ष्य केवल ब्याज लागत को कम करना है।',
					'seo-rf-li-7': '<strong>कैश-आउट रिफाइनेंस:</strong> आप अपने वर्तमान ऋण शेष से अधिक उधार लेते हैं, अंतर नकद में प्राप्त करते हैं। यदि आपका घर $400,000 का है और आप पर $250,000 बकाया है, तो आप $320,000 के लिए पुनर्वित्त कर सकते हैं और $70,000 नकद ले सकते हैं। कैश-आउट पुनर्वित्त आपकी इक्विटी को रीसेट करता है और आमतौर पर थोड़ी अधिक दर रखता है।',
					'seo-rf-li-8': '<strong>ऑरिजिनेशन शुल्क:</strong> ऋण राशि का 0.5–1%। नए ऋण को संसाधित करने के लिए ऋणदाता का शुल्क।',
					'seo-rf-li-9': '<strong>मूल्यांकन शुल्क:</strong> $300–$600। अधिकांश ऋणदाताओं को आपके घर की वर्तमान मूल्य की पुष्टि के लिए नए मूल्यांकन की आवश्यकता होती है।',
					'seo-rf-li-10': '<strong>टाइटल बीमा:</strong> $500–$1,500। टाइटल विवादों से ऋणदाता की रक्षा के लिए आवश्यक।',
					'seo-rf-li-11': '<strong>रिकॉर्डिंग शुल्क:</strong> $25–$250। नए मॉर्गेज को रिकॉर्ड करने के लिए सरकारी शुल्क।',
					'seo-rf-li-12': '<strong>डिस्काउंट पॉइंट:</strong> अपनी दर को "खरीदने" के लिए वैकल्पिक पूर्व-भुगतान ब्याज। एक पॉइंट = ऋण राशि का 1% = आमतौर पर 0.25% दर में कमी।',
					'seo-rf-li-13': '<strong>जल्द जा रहे हैं:</strong> यदि आप ब्रेक-ईवन पॉइंट तक पहुंचने से पहले घर बेचेंगे, तो पुनर्वित्त बचत से अधिक लागत आता है।',
					'seo-rf-li-14': '<strong>प्रीपेमेंट पेनाल्टी:</strong> कुछ ऋण जल्दी चुकाने पर शुल्क लेते हैं। पुनर्वित्त से पहले अपने वर्तमान ऋण शर्तों की जांच करें।',
					'seo-rf-li-15': '<strong>अधिकांश ऋण चुका दिया:</strong> 20 साल पुराने ऋण पर नए 30 साल के कार्यकाल पर रीसेट करना आपके ऋण को काफी बढ़ा देता है, भले ही दर कम हो।',
					'seo-rf-li-16': '<strong>आपका क्रेडिट स्कोर गिर गया है:</strong> यदि आपका क्रेडिट मूल मॉर्गेज के बाद से खराब हुआ है, तो आप बेहतर दर के लिए योग्य नहीं हो सकते और वास्तव में अधिक दर प्राप्त कर सकते हैं।',
					'seo-cur-h2': 'मुद्रा विनिमय, सोना, तेल और शेयर मूल्य: लाइव रेट कैसे काम करते हैं',
					'seo-cur-h3-1': 'लाइव विनिमय दरें कैसे काम करती हैं',
					'seo-cur-p1': 'मुद्रा विनिमय दरें विदेशी मुद्रा बाजार (forex) द्वारा निर्धारित होती हैं, जो दुनिया का सबसे बड़ा वित्तीय बाजार है जिसमें प्रतिदिन 7 ट्रिलियन डॉलर से अधिक का कारोबार होता है। इस साइट पर दिखाई देने वाली "लाइव" दर मध्य-बाजार दर है (जिसे इंटरबैंक दर या स्पॉट रेट भी कहते हैं), जो बैंकों द्वारा बड़े लेनदेन में उपयोग की जाने वाली खरीद और बिक्री कीमतों का मध्य बिंदु है।',
					'seo-cur-p2': 'यहाँ दिखाई गई दरें Frankfurter API से ली गई हैं, जो यूरोपीय केंद्रीय बैंक और अन्य वित्तीय स्रोतों से डेटा एकत्रित करता है। ये दैनिक अपडेट होती हैं और प्रदर्शन के लिए कैश की जाती हैं। मिलीसेकंड सटीकता वाली वास्तविक समय दरों के लिए, संस्थागत व्यापारी समर्पित forex प्लेटफॉर्म का उपयोग करते हैं — लेकिन यात्रा योजना, अंतर्राष्ट्रीय हस्तांतरण और सामान्य संदर्भ के लिए, ये दरें एक प्रतिशत के अंश के भीतर सटीक हैं।',
					'seo-cur-h3-2': 'मुद्रा विनिमय दरों को क्या प्रभावित करता है',
					'seo-cur-p3': 'विनिमय दरें आर्थिक और राजनीतिक कारकों के जटिल मिश्रण के आधार पर लगातार बदलती रहती हैं:',
					'seo-cur-li-1': '<strong>ब्याज दर अंतर:</strong> जब केंद्रीय बैंक ब्याज दरें बढ़ाता है, तो उसकी मुद्रा आमतौर पर मजबूत होती है क्योंकि उच्च दरें बेहतर रिटर्न चाहने वाली विदेशी पूंजी को आकर्षित करती हैं। अमेरिकी फेडरल रिजर्व के फैसले अक्सर वैश्विक विनिमय दरों को प्रभावित करते हैं।',
					'seo-cur-li-2': '<strong>मुद्रास्फीति:</strong> उच्च मुद्रास्फीति समय के साथ मुद्रा की क्रय शक्ति को कम करती है। कम, स्थिर मुद्रास्फीति वाले देशों में आमतौर पर मजबूत मुद्राएं होती हैं। EUR/USD जोड़ी, उदाहरण के लिए, अमेरिका और यूरोजोन के बीच मुद्रास्फीति अंतर के लिए बारीकी से देखी जाती है।',
					'seo-cur-li-3': '<strong>व्यापार संतुलन:</strong> जो देश आयात से अधिक निर्यात करते हैं (व्यापार अधिशेष) उनकी मुद्रा की मांग अधिक होती है, जिससे उसका मूल्य बढ़ता है। लगातार व्यापार घाटे वाले देशों में समय के साथ मुद्रा कमजोरी देखी जा सकती है।',
					'seo-cur-li-4': '<strong>राजनीतिक स्थिरता:</strong> राजनीतिक अनिश्चितता, चुनाव या भू-राजनीतिक संघर्ष तेज मुद्रा बदलाव का कारण बन सकते हैं। USD, CHF और JPY जैसी सुरक्षित-आश्रय मुद्राएं वैश्विक संकट के दौरान अक्सर मजबूत होती हैं।',
					'seo-cur-li-5': '<strong>GDP वृद्धि:</strong> मजबूत आर्थिक विकास मुद्रा की मांग बढ़ाता है क्योंकि निवेशक उस अर्थव्यवस्था में पूंजी लगाते हैं।',
					'seo-cur-h3-3': 'मध्य-बाजार दर बनाम बैंक दर: स्प्रेड क्यों होता है',
					'seo-cur-p4': 'इस कनवर्टर पर दिखाई गई दर मध्य-बाजार दर है — खरीद और बिक्री कीमतों के बीच सैद्धांतिक मध्य बिंदु। जब आप वास्तव में बैंक, क्रेडिट कार्ड या मनी ट्रांसफर सेवा के माध्यम से पैसे बदलते हैं, तो आपको बदतर दर मिलेगी। इस अंतर को स्प्रेड कहते हैं, और इसी से मुद्रा विनिमय व्यवसाय लाभ कमाते हैं।',
					'seo-cur-li-6': '<strong>बैंक और हवाई अड्डे के कियोस्क:</strong> आमतौर पर मध्य-बाजार दर से 3–10% अधिक शुल्क लेते हैं। छोटी राशियों और पर्यटक स्थानों के लिए सबसे खराब।',
					'seo-cur-li-7': '<strong>क्रेडिट कार्ड:</strong> आमतौर पर विदेशी लेनदेन शुल्क के रूप में 1–3% लेते हैं। विदेश में खरीदारी के लिए अक्सर सबसे अच्छा विकल्प, विशेष रूप से बिना विदेशी लेनदेन शुल्क वाले कार्ड।',
					'seo-cur-li-8': '<strong>विशेष ट्रांसफर सेवाएं (Wise, Revolut):</strong> मध्य-बाजार दर से 0.3–1% अधिक शुल्क लेती हैं। बड़े अंतर्राष्ट्रीय हस्तांतरण के लिए सर्वोत्तम।',
					'seo-cur-p5': 'आप वास्तव में क्या प्राप्त करेंगे इसकी गणना करने के लिए: मध्य-बाजार दर लें और प्रदाता का स्प्रेड प्रतिशत घटाएं। यदि आप मध्य-बाजार पर 1 USD = 0.92 EUR देखते हैं और आपका बैंक 3% चार्ज करता है, तो आपको प्रति डॉलर लगभग 0.92 × (1 - 0.03) = 0.892 EUR मिलेगा।',
					'seo-cur-h3-4': 'मुद्रा बचाव के रूप में सोना: XAU का मूल्य निर्धारण कैसे होता है',
					'seo-cur-p6': 'सोने (टिकर प्रतीक XAU) का अंतर्राष्ट्रीय बाजारों में प्रति ट्रॉय औंस अमेरिकी डॉलर में मूल्य निर्धारण होता है। ट्रॉय औंस कीमती धातुओं की मानक इकाई है और लगभग 31.1 ग्राम के बराबर है (मानक एवॉयरडुपॉइस औंस 28.35 ग्राम से थोड़ी अधिक)। एक ट्रॉय औंस = ठीक 31.1035 ग्राम।',
					'seo-cur-p7': 'सोना मुद्रा अवमूल्यन और मुद्रास्फीति के विरुद्ध बचाव के रूप में काम करता है। जब अमेरिकी डॉलर कमजोर होता है या मुद्रास्फीति बढ़ती है, तो सोने की कीमतें अक्सर बढ़ती हैं — इसलिए नहीं कि सोना खुद बदलता है, बल्कि इसलिए कि सोने का वही वजन खरीदने के लिए अधिक डॉलर की जरूरत होती है। सोने ने सदियों से क्रय शक्ति बनाए रखी है जबकि व्यक्तिगत मुद्राएं मुद्रास्फीति से नष्ट हो गई हैं। इस साइट पर सोने की कीमत Yahoo Finance के माध्यम से बाजार डेटा से ली गई है, प्रति घंटे कैश की जाती है।',
					'seo-cur-p8': 'सोने की कीमत में बदलाव इन कारकों से होता है: केंद्रीय बैंकों के सोने के भंडार, अमेरिकी डॉलर की मजबूती, वास्तविक ब्याज दरें (जब वास्तविक दरें कम या नकारात्मक हों, सोना अधिक आकर्षक हो जाता है), भू-राजनीतिक जोखिम, और आभूषण/औद्योगिक मांग।',
					'seo-cur-h3-5': 'WTI कच्चा तेल: USD में मूल्य क्यों और कीमत को क्या प्रभावित करता है',
					'seo-cur-p9': 'वेस्ट टेक्सास इंटरमीडिएट (WTI) उत्तरी अमेरिका के लिए प्राथमिक कच्चे तेल का बेंचमार्क है और एक प्रमुख वैश्विक मूल्य संदर्भ है। यह प्रति बैरल अमेरिकी डॉलर में मूल्यांकित है (1 बैरल = 42 अमेरिकी गैलन = लगभग 159 लीटर)। 1970 के दशक के पेट्रोडॉलर समझौते के बाद से तेल का USD में मूल्य निर्धारण होता है, जिससे डॉलर की वैश्विक मांग पैदा होती है क्योंकि तेल आयात करने वाले सभी देशों को भुगतान के लिए डॉलर की जरूरत होती है।',
					'seo-cur-p10': 'तेल की कीमतों को चलाने वाले प्रमुख कारक:',
					'seo-cur-li-9': '<strong>OPEC+ उत्पादन निर्णय:</strong> OPEC कार्टेल और सहयोगी उत्पादक (रूस, आदि) वैश्विक आपूर्ति का लगभग 40% नियंत्रित करते हैं। उत्पादन में कटौती कीमतें बढ़ाती है; वृद्धि कीमतें कम करती है।',
					'seo-cur-li-10': '<strong>अमेरिकी शेल उत्पादन:</strong> अमेरिका शेल तकनीक के कारण आंशिक रूप से दुनिया का सबसे बड़ा तेल उत्पादक बना। उच्च अमेरिकी उत्पादन OPEC से प्रतिस्पर्धा करता है और मूल्य वृद्धि को सीमित कर सकता है।',
					'seo-cur-li-11': '<strong>वैश्विक मांग:</strong> चीन और भारत में आर्थिक विकास (बड़े तेल उपभोक्ता) एक प्रमुख मांग चालक है। मंदी मांग को कम करती है और कीमतें नीचे धकेलती है।',
					'seo-cur-li-12': '<strong>भू-राजनीतिक घटनाएं:</strong> तेल उत्पादक क्षेत्रों (मध्य पूर्व, रूस) में संघर्ष आपूर्ति जोखिम प्रीमियम बनाते हैं जो कीमतें बढ़ाते हैं।',
					'seo-cur-li-13': '<strong>USD की मजबूती:</strong> चूंकि तेल USD में मूल्यांकित है, मजबूत डॉलर गैर-अमेरिकी खरीदारों के लिए तेल को महंगा बनाता है, मांग को कम करता है और कीमतों पर नीचे की दबाव डालता है।',
					'seo-cur-h3-6': 'लाइव शेयर मूल्य: हर घंटे अपडेट होने वाले शीर्ष अमेरिकी शेयर',
					'seo-cur-p11': 'LoanCalc दस व्यापक रूप से ट्रैक किए जाने वाले अमेरिकी शेयरों और फंडों के लाइव मूल्य दिखाता है: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B), और SPDR S&P 500 ETF Trust (SPY)। कीमतें Yahoo Finance से ली जाती हैं और हर घंटे अपडेट होती हैं — सोने और तेल डेटा के समान अंतराल पर।',
					'seo-cur-p12': 'प्रत्येक स्टॉक चिप USD में वर्तमान मूल्य, पिछले बंद से प्रतिशत परिवर्तन (लाभ के लिए हरा तीर, हानि के लिए लाल), और लाइव विनिमय दर का उपयोग करके आपकी स्थानीय मुद्रा में समकक्ष मूल्य दिखाता है। यह बिना ऐप बदले दुनिया में कहीं से भी अमेरिकी इक्विटी पोजीशन के मूल्य को ट्रैक करना आसान बनाता है।',
					'seo-cur-p13': 'S&amp;P 500 ETF (SPY) को व्यापक बाजार बेंचमार्क के रूप में शामिल किया गया है: जब SPY ऊपर होता है, तो समग्र अमेरिकी बाजार आमतौर पर बढ़ रहा होता है। NVDA और TSLA जैसे व्यक्तिगत शेयरों में अधिक अस्थिरता होती है। S&amp;P 500 की दीर्घकालिक वृद्धि को मॉडल करने के लिए 7–10% वार्षिक रिटर्न के साथ <a href="/savings-calculator/">बचत कैलकुलेटर</a> का उपयोग करें।',
					'seo-cur-p14': 'यह भी देखें: <a href="/savings-calculator/">बचत कैलकुलेटर</a> — मुद्रा रिटर्न या वस्तु-लिंक्ड निवेश समय के साथ कैसे बढ़ते हैं, इसे मॉडल करें।',
					'lbl-market-prices': 'बाज़ार मूल्य',
					'cur-rate-unavailable': 'दर उपलब्ध नहीं',
					'cur-not-in-feed': 'लाइव फ़ीड में नहीं',
					'cur-today': 'आज',
					'cur-status-fetching': 'विनिमय दरें प्राप्त की जा रही हैं…',
					'cur-status-live': 'लाइव दरें · {date} · 161 मुद्राएँ · हर 24 घंटे अपडेट',
					'cur-status-partial': 'दर���ं लोड हुईं · {date} (33 मुद्राएँ)',
					'cur-status-offline': 'ऑफलाइन दरें: सीमित मुद्राएँ उपलब्ध',
					'cmd-fetching': 'लोड हो रहा है…',
					'cmd-live': 'लाइव · {date}',
					'cmd-approx': 'अनुमानित · लाइव डेटा जाँचें',
					'cur-status-cached': '{date} की दरें · कैश्ड · हर 24 घंटे अपडेट',
					'clamp-min': 'न्यूनतम:',
					'clamp-max': 'अधिकतम:'
				},
				pt: {
					'nav-loans': 'Empréstimos',
					'nav-savings': 'Poupança',
					'nav-refinance': 'Refinanciamento',
					'nav-currency': 'Moedas',
					'btn-settings': 'Configurações',
					'pref-title': 'Preferências',
					'pref-save': 'Salvar preferências',
					'toast-saved': 'Preferências salvas',
					'pref-cancel': 'Cancelar',
					'ci-sub-desc': 'Veja como a sua poupança cresce ano a ano.',
					'tab-mortgage': 'Hipoteca',
					'tab-car': 'Auto',
					'tab-personal': 'Pessoal',
					'tab-student': 'Estudantil',
					'tab-afford': 'Acessível',
					'afford-pmt-label': 'Parcela mensal que posso pagar',
					'afford-result-label': 'Você pode pedir emprestado até',
					'afford-sub': 'estimativa de capacidade',
					'cur-amount-label': 'Valor',
					'cur-to-label': 'Convertido para',
					'cur-quick': 'Referência rápida',
					'pref-language': 'Idioma de exibição',
					'pref-lang-note': 'Altera rótulos e formatação.',
					'pref-currency': 'Moeda preferida',
					'pref-currency-note': 'Moeda padrão para o conversor.',
					'pref-current': 'Configurações atuais',
					'gold-per': 'por onça troy',
					'gold-local': 'Preço na sua moeda',
					'oil-per': 'por barril',
					'oil-local': 'Preço na sua moeda',
					'trust-1': 'Sempre gratuito',
					'trust-2': 'Sem cadastro',
					'trust-3': 'Funciona em qualquer país',
					'hero-sub': 'Calculadora de empréstimos, juros compostos, economia de refinanciamento, conversor de moedas ao vivo, preço do ouro, petróleo e ações ao vivo: tudo grátis, instantâneo, sem cadastro.',
					'faq-heading': 'Perguntas frequentes sobre empréstimos, poupança e moedas',
					'chart-center-lbl': 'capital',
					'chart-stat-principal': 'Capital emprestado',
					'chart-stat-interest': 'Total de juros pagos',
					'chart-stat-total': 'Valor total reembolsado',
					'chart-stat-payoff': 'Empréstimo totalmente pago',
					'breakdown-sub': 'Como o seu custo total é dividido entre o valor emprestado e os juros pagos ao credor.',
					'amort-sub': 'Detalhamento anual de cada pagamento.',
					'ci-section-sub': 'Veja como as suas economias ou investimentos crescem ano a ano com juros compostos.',
					'cur-section-sub': 'Converta entre as principais moedas com taxas em tempo real. Preços do ouro e petróleo na sua moeda local.',
					'ci-chart-sub': 'Saldo no final de cada ano, dividido entre seus depósitos e crescimento dos juros compostos.',
					'per-oz-usd': 'por onça em USD',
					'per-bbl-usd': 'por barril em USD',
					'lbl-stocks': 'Ações',
					'lbl-tab-currency': 'Divisas',
					'lbl-tab-commodities': 'Commodities',
					'lbl-tab-stocks': 'Ações',
					'age-just-now': 'agora mesmo',
					'age-min-ago': 'há {n} min',
					'age-hours-ago': 'há {n} h',
					'lbl-currencies': 'moedas',
					'lbl-rates-from': 'Taxas de',
					'lbl-from': 'De',
					'nav-faq': 'FAQ',
					'unit-mo': '/mês',
					'weight-1g': '1g',
					'weight-10g': '10g',
					'weight-1kg': '1 kg',
					'weight-5bbl': '5 barris',
					'weight-10bbl': '10 barris',
					'weight-100bbl': '100 barris',
					'lbl-price-unavailable': 'Preço indisponível',
					'lbl-updating': 'Atualizando…',
					'lbl-partial-rates': 'Taxas parciais',
					'rf-sub': 'Por mês com a nova taxa',
					'rf-verdict-init': 'Insira os dados do seu empréstimo para ver se refinanciar é vantajoso.',
					'rf-verdict-higher': 'A nova taxa não é menor: refinanciar aumentaria sua parcela.',
					'rf-verdict-long': 'Economia mensal existe, mas o ponto de equilíbrio excede o prazo restante. Não recomendado.',
					'rf-verdict-good': 'Refinanciar parece vantajoso.',
					'rf-verdict-summary': 'Você economiza {monthly}/mês e atinge o ponto de equilíbrio em {breakeven}. Economia total: {total}.',
					'rf-never': 'Nunca',
					'rf-over-term': '>{n} anos',
					'rf-months': '{n} meses',
					'rf-years-mo': '{y}a {m}m',
					'loan-desc': 'Use esta calculadora gratuita para encontrar a parcela mensal exata de qualquer financiamento imobiliário, auto, pessoal ou estudantil.',
					'ci-desc': 'A calculadora de juros compostos mostra como um depósito inicial cresce quando os juros são calculados sobre o capital acumulado.',
					'rf-desc': 'A calculadora de refinanciamento ajuda a decidir se refinanciar é vantajoso.',
					'cur-desc': 'O conversor LoanCalc suporta 161 moedas mundiais com taxas ao vivo atualizadas a cada 24 horas.',
					'how-p1': 'Todo empréstimo de taxa fixa usa a mesma fórmula padrão de amortização.',
					'how-p2': 'Três fatores controlam sua parcela mensal.',
					'unit-years': 'anos',
					'unit-yr': 'ano',
					'unit-yrs': 'anos',
					'ci-earned-short': 'Crescimento',
					'cur-rate-lbl': 'Taxa',
					'cur-inverse-lbl': 'Inverso',
					'cur-updated-lbl': 'Atualizado',
					'how-formula-h': 'A fórmula',
					'how-lower-h': 'Como reduzir sua parcela mensal',
					'formula-m': 'Parcela mensal',
					'formula-p': 'Capital (valor do empréstimo)',
					'formula-r': 'Taxa mensal (anual ÷ 12)',
					'formula-n': 'Total de parcelas (anos × 12)',
					'tip-1': 'Uma entrada maior reduz diretamente o capital: quanto menos você toma emprestado, menores as parcelas e menores os juros totais.',
					'tip-2': 'Um prazo mais longo distribui os pagamentos por mais meses. A parcela cai, mas os juros totais aumentam.',
					'tip-3': 'Uma taxa de juros menor tem efeito cumulativo: mesmo 0,5% de diferença num grande empréstimo economiza dezenas de milhares.',
					'tip-4': 'Melhorar sua pontuação de crédito antes de solicitar geralmente garante taxas melhores.',
					'faq-q1': 'Como é calculada a parcela mensal de um empréstimo?',
					'faq-q2': 'O que é uma tabela de amortização?',
					'faq-q3': 'Esta calculadora funciona em todos os países?',
					'faq-q4': 'Como posso reduzir o total de juros que pago?',
					'faq-q5': 'O LoanCalc é completamente gratuito?',
					'faq-q6': 'Como funciona a calculadora de refinanciamento?',
					'faq-q7': 'Como o preço do ouro é calculado e atualizado?',
					'faq-q8': 'Quais moedas o conversor suporta?',
					'loan-label-mortgage': 'Hipoteca fixa de 30 anos',
					'loan-label-car': 'Financiamento auto de 5 anos',
					'loan-label-personal': 'Empréstimo pessoal de 3 anos',
					'loan-label-student': 'Empréstimo estudantil de 10 anos',
					'helper-title-mortgage': 'Hipoteca típica de 30 anos',
					'helper-title-car': 'Financiamento auto típico',
					'helper-title-personal': 'Empréstimo pessoal típico',
					'helper-title-student': 'Empréstimo estudantil federal (EUA)',
					'helper-text-mortgage': 'Taxa média de 30 anos: 6,5–7%.',
					'helper-text-car': 'Taxa média em financiamentos novos: 6–8%.',
					'helper-text-personal': 'Taxas de empréstimo pessoal variam de 6% a 36%.',
					'helper-text-student': 'As taxas de empréstimos estudantis federais são definidas anualmente pelo Congresso.',
					'hero-h1': 'Suite de <em>Calculadoras</em><br>Financeiras Gratuitas',
					'faq-q9': 'Quais preços de ações o LoanCalc exibe?',
					'extra-label': 'Pagamento mensal extra',
					'lbl-amount': 'Valor do empréstimo',
					'lbl-rate': 'Taxa de juros anual',
					'lbl-term': 'Prazo do empréstimo',
					'res-monthly': 'Parcela mensal',
					'freq-monthly': 'Mensal',
					'freq-biweekly': 'Quinzenal',
					'freq-per-2wk': '/ 2 sem.',
					'res-principal': 'Capital',
					'res-interest': 'Total de juros',
					'res-total': 'Custo total',
					'monthly-note': 'Apenas principal e juros, exclui impostos, seguros e taxas',
					'hero-headline': 'Conheça seus números.',
					'hero-subtitle': 'Calculadoras gratuitas para hipotecas, poupança, refinanciamento e câmbio.',
					'hero-h1': 'Conheça seus números.',
					'hero-stat-currencies': 'Moedas',
					'hero-stat-langs': 'Idiomas',
					'hero-stat-tools': 'Ferramentas',
					'res-year': 'Ano de quitação',
					'lbl-principal-pct': 'Capital',
					'lbl-interest-pct': 'Juros',
					'section-breakdown': 'Detalhamento do pagamento',
					'section-amort': 'Tabela de amortização',
					'amort-year': 'Ano',
					'amort-month': 'Mês',
					'amort-start': 'Saldo inicial',
					'amort-ppaid': 'Principal pago',
					'amort-ipaid': 'Juros pagos',
					'amort-end': 'Saldo final',
					'btn-show-all': 'Ver todos os anos',
					'btn-show-all-months': 'Ver todos os meses',
					'btn-show-less': 'Ver menos',
					'amort-gran-yearly': 'Anual',
					'amort-gran-monthly': 'Mensal',
					'section-how': 'Como as parcelas são calculadas',
					'section-faq': 'Perguntas frequentes',
					'ci-h2': 'Calculadora de juros compostos e crescimento da poupança',
					'ci-label-principal': 'Depósito inicial',
					'ci-label-monthly': 'Contribuição mensal',
					'ci-label-rate': 'Taxa de retorno anual',
					'ci-label-years': 'Período de investimento',
					'ci-result-label': 'Valor futuro',
					'ci-sub': 'Portfólio total após',
					'ci-deposited': 'Total depositado',
					'ci-earned': 'Juros ganhos',
					'ci-mult': 'Multiplicador de crescimento',
					'ci-year': 'Ano alvo',
					'ci-chart-h': 'Crescimento ano a ano',
					'rf-h2': 'Calculadora de refinanciamento: quanto você vai economizar?',
					'rf-current': 'Empréstimo atual',
					'rf-new': 'Nova oferta de empréstimo',
					'rf-balance': 'Saldo restante',
					'rf-oldrate': 'Taxa de juros atual',
					'rf-remaining': 'Anos restantes',
					'rf-newrate': 'Nova taxa de juros',
					'rf-costs': 'Custos de fechamento',
					'rf-monthly': 'Economia mensal',
					'rf-old': 'Parcela antiga',
					'rf-new-pay': 'Nova parcela',
					'rf-breakeven': 'Ponto de equilíbrio',
					'rf-total': 'Economia total durante o prazo',
					'cur-h2': 'Conversor de moedas ao vivo, preço do ouro, petróleo e ações hoje',
					'gold-local-lbl': 'Preço na sua moeda',
					'oil-local-lbl': 'Preço na sua moeda',
					'footer-mortgage': 'Calculadora de hipotecas',
					'footer-loan': 'Calculadora de empréstimos',
					'footer-savings': 'Calculadora de poupança',
					'footer-refinance': 'Calculadora de refinanciamento',
					'footer-currency': 'Conversor de moedas',
					'footer-privacy': 'Política de privacidade',
					'footer-dnsmi': 'Não vender nem compartilhar minhas informações pessoais',
					'footer-rights': 'Todos os direitos reservados.',
					'footer-desc': 'Calculadoras financeiras gratuitas: empréstimos, poupança, refinanciamento, moedas. Sem conta necessária.',
					'footer-disclaimer': 'O LoanCalc fornece estimativas apenas para fins informativos. Isso não é aconselhamento financeiro.',
					'seo-mort-h2': 'Calculadora de Hipoteca: Tudo o que Você Precisa Saber',
					'seo-mort-h3-1': 'O que é uma calculadora de hipoteca e quem deve usá-la?',
					'seo-mort-p1': 'Uma calculadora de hipoteca é uma ferramenta financeira que calcula sua parcela mensal de um financiamento imobiliário com base em três entradas: o valor do empréstimo (principal), a taxa de juros anual e o prazo em anos. Qualquer pessoa considerando comprar um imóvel, comparar ofertas de empréstimo ou entender o custo de longo prazo do endividamento deve usá-la antes de assinar um contrato hipotecário.',
					'seo-mort-p2': 'Compradores de primeira viagem usam calculadoras hipotecárias para verificar a acessibilidade antes de buscar imóveis. Proprietários atuais as usam para explorar cenários de refinanciamento ou simular o impacto de pagamentos extras. Investidores imobiliários as usam para estimar o fluxo de caixa de imóveis para aluguel. A calculadora funciona de forma idêntica para hipotecas de taxa fixa em todo o mundo — seja em USD, EUR, GBP ou qualquer outra moeda.',
					'seo-mort-h3-2': 'Como funciona a fórmula da parcela mensal',
					'seo-mort-p3': 'Toda hipoteca de taxa fixa usa a mesma fórmula padrão de amortização:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'Onde <strong>M</strong> é a sua parcela mensal, <strong>P</strong> é o valor do principal do empréstimo, <strong>r</strong> é a taxa de juros mensal (taxa anual ÷ 12) e <strong>n</strong> é o número total de parcelas mensais (anos × 12). Esta fórmula produz um valor mensal fixo que cobre tanto os juros sobre o saldo restante quanto uma parte do principal, com a proporção mudando ao longo do tempo. Nos primeiros anos, a maior parte de cada pagamento é juros. Nos últimos anos, a maior parte reduz o principal.',
					'seo-mort-h3-3': 'O que afeta sua taxa hipotecária?',
					'seo-mort-p6': 'Sua taxa hipotecária real depende de vários fatores que os credores avaliam ao aprovar sua solicitação:',
					'seo-mort-li-1': '<strong>Pontuação de crédito:</strong> Tomadores com pontuação acima de 760 geralmente recebem as taxas mais baixas. Cada queda de 20 pontos no crédito pode aumentar sua taxa em 0,1–0,5%, adicionando milhares em juros totais ao longo de 30 anos.',
					'seo-mort-li-2': '<strong>Relação empréstimo/valor (LTV):</strong> Um LTV mais baixo (maior entrada) sinaliza menos risco ao credor. Uma entrada de 20% ou mais geralmente elimina o seguro hipotecário privado (PMI) e pode qualificá-lo para uma taxa melhor.',
					'seo-mort-li-3': '<strong>Tipo de empréstimo:</strong> Empréstimos conformes (dentro dos limites da Fannie Mae/Freddie Mac) normalmente têm taxas mais baixas do que empréstimos jumbo. Empréstimos garantidos pelo governo (FHA, VA, USDA) têm suas próprias estruturas de taxa.',
					'seo-mort-li-4': '<strong>Prazo do empréstimo:</strong> Hipotecas de 15 anos têm taxas de juros mais baixas do que as de 30 anos porque o dinheiro do credor fica em risco por menos tempo.',
					'seo-mort-li-5': '<strong>Condições de mercado:</strong> As taxas hipotecárias são fortemente influenciadas pelo rendimento do Tesouro de 10 anos e pela política do Federal Reserve. Quando o Fed aumenta as taxas para combater a inflação, as taxas hipotecárias tendem a subir junto.',
					'seo-mort-h3-4': 'Hipoteca de 15 anos vs 30 anos: a real troca',
					'seo-mort-p12': 'A escolha entre uma hipoteca de 15 e 30 anos é fundamentalmente uma troca entre fluxo de caixa mensal e total de juros pagos. Aqui está um exemplo para um empréstimo de $300.000:',
					'seo-mort-th-loan': 'Empréstimo',
					'seo-mort-th-rate': 'Taxa',
					'seo-mort-p13': 'A 6,5%, uma hipoteca de 30 anos custa $382.633 em juros totais versus $170.453 para uma hipoteca de 15 anos — uma diferença de mais de $212.000. No entanto, a parcela mensal da hipoteca de 30 anos é $718 mais baixa, o que importa muito se o fluxo de caixa estiver apertado ou se você quiser investir a diferença.',
					'seo-mort-h3-5': 'O que é PMI e quando se aplica?',
					'seo-mort-p14': 'O seguro hipotecário privado (PMI) é exigido pela maioria dos credores dos EUA quando sua entrada é inferior a 20% do preço de compra. O PMI protege o credor em caso de inadimplência. O custo típico é de 0,5–1,5% do valor do empréstimo por ano, adicionado à sua parcela mensal. Em um empréstimo de $300.000, o PMI pode adicionar de $125 a $375 por mês. Quando seu patrimônio atingir 20% (por pagamentos ou valorização do imóvel), você normalmente pode solicitar o cancelamento do PMI. Os credores devem cancelar automaticamente o PMI quando o saldo do empréstimo atingir 78% do preço de compra original.',
					'seo-mort-h3-6': 'Como pagar sua hipoteca mais rapidamente',
					'seo-mort-li-6': '<strong>Faça um pagamento extra por ano:</strong> Em uma hipoteca de 30 anos, um pagamento mensal adicional por ano reduz o prazo do empréstimo em aproximadamente 4–5 anos e economiza dezenas de milhares em juros.',
					'seo-mort-li-7': '<strong>Mude para pagamentos quinzenais:</strong> Em vez de 12 pagamentos mensais, faça 26 metade-pagamentos por ano. Isso resulta em um pagamento completo extra anualmente sem impacto significativo no fluxo de caixa.',
					'seo-mort-li-8': '<strong>Arredonde seu pagamento:</strong> Se sua parcela é $1.847, pagar $1.900 ou $2.000 por mês direciona o valor extra inteiramente para o principal, acelerando o pagamento.',
					'seo-mort-li-9': '<strong>Aplique recursos inesperados:</strong> Restituições de imposto, bônus ou heranças aplicados como pagamentos únicos do principal podem reduzir anos do seu prazo hipotecário.',
					'seo-mort-p15': 'Também útil: <a href="/refinance-calculator/">Calculadora de Refinanciamento</a> — veja se uma taxa mais baixa faz sentido para sua hipoteca atual. Ou explore <a href="/loan-calculator/">outros tipos de empréstimo</a> incluindo empréstimos para carros, pessoais e estudantis.',
					'seo-ci-h2': 'Juros compostos e poupança: o guia completo',
					'seo-ci-h3-1': 'O que são juros compostos e por que são importantes?',
					'seo-ci-h3-2': 'Capitalização diária vs mensal vs anual — como afeta o crescimento',
					'seo-ci-h3-3': 'A regra dos 72 explicada',
					'seo-ci-h3-4': 'O custo de esperar: começar aos 25, 35 ou 45',
					'seo-ci-h3-5': 'Contas de poupança de alto rendimento vs fundos de índice: taxas típicas',
					'seo-ci-p1': 'Juros compostos são juros calculados tanto sobre o capital inicial quanto sobre os juros acumulados de todos os períodos anteriores. Isso é fundamentalmente diferente dos juros simples, que são calculados apenas sobre o capital original. Albert Einstein é frequentemente creditado por chamar os juros compostos de "a oitava maravilha do mundo. Quem os entende, ganha; quem não entende, paga."',
					'seo-ci-p2': 'A razão pela qual os juros compostos são tão poderosos é o crescimento exponencial. Nos primeiros anos, o efeito é sutil. Mas ao longo de 20, 30 ou 40 anos, o efeito dos juros compostos torna-se extraordinário — a maior parte da sua riqueza final vem não das suas contribuições, mas de juros ganhos sobre juros ganhos sobre juros.',
					'seo-ci-p3': 'A frequência de capitalização determina com que regularidade os juros são calculados e adicionados ao saldo. Capitalização mais frequente significa retornos ligeiramente maiores:',
					'seo-ci-p4': 'Para contas de poupança e fundos do mercado monetário, a capitalização mensal é padrão. Contas de poupança de alto rendimento em bancos on-line geralmente capitalizam diariamente. A diferença entre capitalização mensal e diária é pequena — a taxa de juros em si importa muito mais do que a frequência de capitalização.',
					'seo-ci-p5': 'A regra dos 72 é um atalho mental simples: divida 72 pela sua taxa de retorno anual para estimar quantos anos leva para seu investimento dobrar de valor.',
					'seo-ci-p6': 'A regra também funciona de forma inversa: se você quiser dobrar seu dinheiro em 8 anos, precisa de uma taxa de pelo menos 72 ÷ 8 = 9% ao ano.',
					'seo-ci-p7': 'O fator mais poderoso na poupança é o tempo. Considere investir $200 por mês a um retorno anual de 7% sem depósito inicial:',
					'seo-ci-p8': 'Começar aos 25 em vez dos 35 custa apenas $24.000 a mais em contribuições, mas gera $285.000 a mais em riqueza — um retorno de 12x sobre esses $24.000 adicionais. A mensagem é clara: comece cedo, mesmo com pequenas quantias.',
					'seo-ci-p9': 'A taxa de retorno que você escolhe nesta calculadora deve refletir onde você realmente guardará suas economias:',
					'seo-ci-p10': 'Veja também: <a href="/refinance-calculator/">Calculadora de Refinanciamento</a> — os juros economizados com o refinanciamento de uma hipoteca podem ser redirecionados para poupança.',
					'seo-ci-li-1': '<strong>Capitalização anual:</strong> Juros adicionados uma vez por ano. Taxa base.',
					'seo-ci-li-2': '<strong>Capitalização mensal:</strong> Juros adicionados 12 vezes por ano. Uma taxa anual de 6% capitalizada mensalmente equivale a uma taxa anual efetiva de 6,168%.',
					'seo-ci-li-3': '<strong>Capitalização diária:</strong> Juros adicionados 365 vezes por ano. Uma taxa de 6% capitalizada diariamente dá uma taxa efetiva de 6,183%. Marginalmente melhor que a mensal.',
					'seo-ci-li-4': 'A 4% (poupança de alto rendimento): 72 ÷ 4 = <strong>18 anos</strong> para dobrar',
					'seo-ci-li-5': 'A 7% (média do mercado de ações): 72 ÷ 7 = <strong>10,3 anos</strong> para dobrar',
					'seo-ci-li-6': 'A 10% (crescimento agressivo): 72 ÷ 10 = <strong>7,2 anos</strong> para dobrar',
					'seo-ci-li-7': 'A 12% (retornos venture): 72 ÷ 12 = <strong>6 anos</strong> para dobrar',
					'seo-ci-li-8': '<strong>Conta poupança tradicional:</strong> 0,01–0,5% APY. Efetivamente perde valor para a inflação. Adequada apenas para fundos de emergência que precisam de acesso imediato.',
					'seo-ci-li-9': '<strong>Conta poupança de alto rendimento (bancos on-line):</strong> 4–5% APY em ambiente de altas taxas. Segurado pelo FDIC. Excelente para fundos de emergência e objetivos de curto prazo (1–3 anos).',
					'seo-ci-li-10': '<strong>Contas do mercado monetário:</strong> 4–5% APY. Semelhantes ao HYSA com condições de acesso ligeiramente diferentes.',
					'seo-ci-li-11': '<strong>Certificados de depósito (CDs):</strong> 4–5,5% APY com bloqueio de 6 meses a 5 anos. Taxas mais altas para prazos mais longos.',
					'seo-ci-li-12': '<strong>Fundo de índice S&amp;P 500:</strong> ~10% de retorno nominal médio (7% após inflação) historicamente. Não garantido. Melhor para objetivos a 5+ anos. Sujeito à volatilidade do mercado.',
					'seo-ci-li-13': '<strong>Fundo total do mercado de títulos:</strong> 3–5% historicamente. Menor volatilidade que ações. Adequado para objetivos de médio prazo.',
					'seo-ci-th-start': 'Idade de início',
					'seo-ci-th-end': 'Idade de fim',
					'seo-ci-th-years': 'Anos investidos',
					'seo-ci-th-contributed': 'Total contribuído',
					'seo-ci-th-final': 'Valor final',
					'seo-ci-th-interest': 'Juros ganhos',
					'seo-rf-h2': 'Refinanciamento da sua hipoteca: quando faz sentido',
					'seo-rf-h3-1': 'Quando refinanciar faz sentido financeiro',
					'seo-rf-h3-2': 'Como calcular o ponto de equilíbrio',
					'seo-rf-h3-3': 'Refinanciamento com saque vs refinanciamento de taxa e prazo',
					'seo-rf-h3-4': 'Custos ocultos do refinanciamento',
					'seo-rf-h3-5': 'Quando NÃO refinanciar',
					'seo-rf-p1': 'O refinanciamento substitui seu empréstimo existente por um novo, de preferência a uma taxa de juros mais baixa. A decisão se resume a uma questão fundamental: as economias de longo prazo superarão os custos iniciais, e você permanecerá no empréstimo tempo suficiente para recuperar esses custos? O refinanciamento faz mais sentido quando:',
					'seo-rf-p2': 'O cálculo do ponto de equilíbrio é simples: divida seus custos totais de fechamento pelas suas economias mensais.',
					'seo-rf-formula': '<strong>Meses para o equilíbrio = Custos de fechamento ÷ Economia mensal no pagamento</strong>',
					'seo-rf-p3': 'Exemplo: Se o refinanciamento custa $4.500 em custos de fechamento e economiza $200 por mês, o ponto de equilíbrio é 4.500 ÷ 200 = 22,5 meses — aproximadamente 2 anos. Se você planeja ficar em sua casa por pelo menos mais 3–5 anos, esse refinanciamento faz claro sentido financeiro. Se você planeja se mudar em 18 meses, não faz.',
					'seo-rf-p4': 'Existem dois tipos principais de refinanciamento hipotecário:',
					'seo-rf-p5': 'O custo real do refinanciamento vai além dos custos de fechamento declarados. As taxas comuns incluem:',
					'seo-rf-p6': 'Os custos totais de fechamento para um refinanciamento típico são de 2–3% do valor do empréstimo. Em um empréstimo de $300.000, espere $6.000–$9.000 em custos, a menos que você escolha um refinanciamento "sem custos de fechamento" (onde os custos são incorporados à taxa).',
					'seo-rf-p7': 'Veja também: <a href="/loan-calculator/">Calculadora de Hipotecas</a> — modele sua hipoteca original ou compare opções de empréstimo antes de decidir refinanciar.',
					'seo-rf-li-1': 'Sua nova taxa é pelo menos 0,5–1% menor que sua taxa atual',
					'seo-rf-li-2': 'Você planeja permanecer na residência por mais tempo do que o período de equilíbrio',
					'seo-rf-li-3': 'Seu score de crédito melhorou significativamente desde seu empréstimo original',
					'seo-rf-li-4': 'Você quer mudar de hipoteca de taxa ajustável para taxa fixa por maior estabilidade',
					'seo-rf-li-5': 'Você quer encurtar o prazo do seu empréstimo (p. ex., de 30 para 15 anos) e pode arcar com parcelas mensais mais altas',
					'seo-rf-li-6': '<strong>Refinanciamento de taxa e prazo:</strong> Você substitui sua hipoteca existente por uma nova com melhor taxa e/ou prazo diferente, sem alterar o saldo do empréstimo. Este é o tipo mais comum e o que esta calculadora modela. O objetivo é puramente reduzir seu custo de juros.',
					'seo-rf-li-7': '<strong>Refinanciamento com saque:</strong> Você pede emprestado mais do que o saldo do seu empréstimo atual, recebendo a diferença em dinheiro. Por exemplo, se sua casa vale $400.000 e você deve $250.000, pode refinanciar por $320.000 e receber $70.000 em dinheiro. O refinanciamento com saque redefine seu patrimônio e normalmente carrega uma taxa ligeiramente mais alta.',
					'seo-rf-li-8': '<strong>Taxa de originação:</strong> 0,5–1% do valor do empréstimo. A taxa do credor para processar o novo empréstimo.',
					'seo-rf-li-9': '<strong>Taxa de avaliação:</strong> $300–$600. A maioria dos credores requer uma nova avaliação para confirmar o valor atual da sua casa.',
					'seo-rf-li-10': '<strong>Seguro de título:</strong> $500–$1.500. Necessário para proteger o credor contra disputas de título.',
					'seo-rf-li-11': '<strong>Taxas de registro:</strong> $25–$250. Taxas governamentais para registrar a nova hipoteca.',
					'seo-rf-li-12': '<strong>Pontos de desconto:</strong> Juros pré-pagos opcionais para "comprar" sua taxa. Um ponto = 1% do valor do empréstimo = normalmente redução de 0,25% na taxa.',
					'seo-rf-li-13': '<strong>Você vai se mudar em breve:</strong> Se você vender a casa antes de atingir o ponto de equilíbrio, o refinanciamento custa mais do que economiza.',
					'seo-rf-li-14': '<strong>Penalidades por pagamento antecipado:</strong> Alguns empréstimos cobram taxas por quitação antecipada. Verifique os termos do seu empréstimo atual antes de refinanciar.',
					'seo-rf-li-15': '<strong>Você já pagou a maior parte do empréstimo:</strong> Reiniciar para um novo prazo de 30 anos em um empréstimo que já está em andamento há 20 anos estende sua dívida significativamente, mesmo que a taxa seja mais baixa.',
					'seo-rf-li-16': '<strong>Seu score de crédito caiu:</strong> Se seu crédito piorou desde sua hipoteca original, você pode não se qualificar para uma taxa melhor e pode realmente receber uma taxa mais alta.',
					'seo-cur-h2': 'Câmbio de moedas, ouro, petróleo e preços de ações: como funcionam as taxas ao vivo',
					'seo-cur-h3-1': 'Como funcionam as taxas de câmbio ao vivo',
					'seo-cur-p1': 'As taxas de câmbio são determinadas pelo mercado de câmbio (forex), o maior mercado financeiro do mundo com mais de US$ 7 trilhões em volume diário de negociações. A taxa "ao vivo" exibida neste site é a taxa de mercado médio (também chamada de taxa interbancária ou taxa à vista), que é o ponto médio entre os preços de compra e venda usados pelos bancos em transações de grande volume entre si.',
					'seo-cur-p2': 'As taxas mostradas aqui são obtidas da API Frankfurter, que agrega dados do Banco Central Europeu e outras fontes financeiras. São atualizadas diariamente e armazenadas em cache para melhor desempenho. Para taxas em tempo real com precisão de milissegundos, traders institucionais usam plataformas forex dedicadas — mas para planejamento de viagens, transferências internacionais e referência geral, essas taxas são precisas dentro de uma fração de ponto percentual.',
					'seo-cur-h3-2': 'O que afeta as taxas de câmbio',
					'seo-cur-p3': 'As taxas de câmbio mudam constantemente com base em uma combinação complexa de fatores econômicos e políticos:',
					'seo-cur-li-1': '<strong>Diferenciais de taxa de juros:</strong> Quando um banco central eleva as taxas de juros, sua moeda geralmente se fortalece porque taxas mais altas atraem capital estrangeiro em busca de melhores retornos. As decisões do Federal Reserve dos EUA frequentemente movem as taxas de câmbio globais.',
					'seo-cur-li-2': '<strong>Inflação:</strong> Uma inflação mais alta corrói o poder de compra de uma moeda ao longo do tempo. Países com inflação baixa e estável tendem a ter moedas mais fortes. O par EUR/USD, por exemplo, é acompanhado de perto para diferenciais de inflação entre os EUA e a Zona do Euro.',
					'seo-cur-li-3': '<strong>Balança comercial:</strong> Países que exportam mais do que importam (superávit comercial) têm maior demanda por sua moeda, elevando seu valor. Países com déficits comerciais persistentes podem ver sua moeda enfraquecer ao longo do tempo.',
					'seo-cur-li-4': '<strong>Estabilidade política:</strong> Incerteza política, eleições ou conflitos geopolíticos podem causar movimentos rápidos nas moedas. Moedas de refúgio seguro como USD, CHF e JPY frequentemente se fortalecem durante crises globais.',
					'seo-cur-li-5': '<strong>Crescimento do PIB:</strong> Um forte crescimento econômico aumenta a demanda por uma moeda à medida que os investidores alocam capital nessa economia.',
					'seo-cur-h3-3': 'Taxa de mercado médio vs taxa bancária: por que existe um spread',
					'seo-cur-p4': 'A taxa exibida neste conversor é a taxa de mercado médio — o ponto médio teórico entre os preços de compra e venda. Quando você realmente troca dinheiro por meio de um banco, cartão de crédito ou serviço de transferência, receberá uma taxa pior. A diferença é chamada de spread, e é assim que as empresas de câmbio obtêm seu lucro.',
					'seo-cur-li-6': '<strong>Bancos e quiosques de aeroporto:</strong> Geralmente cobram 3–10% acima da taxa de mercado médio. Os piores para pequenas quantias e locais turísticos.',
					'seo-cur-li-7': '<strong>Cartões de crédito:</strong> Geralmente cobram 1–3% como taxa de transação estrangeira. Frequentemente a melhor opção para compras no exterior, especialmente cartões sem taxa de transação estrangeira.',
					'seo-cur-li-8': '<strong>Serviços de transferência especializados (Wise, Revolut):</strong> Cobram 0,3–1% acima da taxa de mercado médio. Melhores para grandes transferências internacionais.',
					'seo-cur-p5': 'Para calcular o que você receberá de fato: tome a taxa de mercado médio e subtraia o percentual de spread do provedor. Se você ver 1 USD = 0,92 EUR no mercado médio e seu banco cobrar 3%, você receberá aproximadamente 0,92 × (1 - 0,03) = 0,892 EUR por dólar.',
					'seo-cur-h3-4': 'Ouro como hedge cambial: como o XAU é precificado',
					'seo-cur-p6': 'O ouro (símbolo de cotação XAU) é precificado em dólares americanos por onça troy nos mercados internacionais. A onça troy é a unidade padrão para metais preciosos e equivale a aproximadamente 31,1 gramas (ligeiramente mais pesada que uma onça avoirdupois padrão de 28,35 gramas). Uma onça troy = exatamente 31,1035 gramas.',
					'seo-cur-p7': 'O ouro funciona como hedge contra a desvalorização da moeda e a inflação. Quando o dólar americano enfraquece ou a inflação sobe, os preços do ouro frequentemente sobem — não porque o ouro em si mude, mas porque mais dólares são necessários para comprar o mesmo peso de ouro. O ouro manteve seu poder de compra ao longo de séculos enquanto moedas individuais foram inflacionadas. O preço do ouro neste site é obtido de dados de mercado via Yahoo Finance, armazenado em cache por hora.',
					'seo-cur-p8': 'Os movimentos do preço do ouro são impulsionados por: reservas de ouro dos bancos centrais, força do dólar americano, taxas de juros reais (quando as taxas reais são baixas ou negativas, o ouro fica mais atraente), risco geopolítico e demanda de joias/industrial.',
					'seo-cur-h3-5': 'Petróleo bruto WTI: por que é precificado em USD e o que move o preço',
					'seo-cur-p9': 'O West Texas Intermediate (WTI) é o principal benchmark de petróleo bruto para a América do Norte e uma importante referência de preços global. É precificado em dólares americanos por barril (1 barril = 42 galões americanos = aproximadamente 159 litros). O petróleo é precificado em USD desde o acordo Petrodólar dos anos 1970, criando uma demanda global por dólares americanos, pois todos os países que importam petróleo precisam de dólares para pagá-lo.',
					'seo-cur-p10': 'Fatores-chave que impulsionam os preços do petróleo:',
					'seo-cur-li-9': '<strong>Decisões de produção da OPEP+:</strong> O cartel da OPEP e produtores aliados (Rússia, etc.) controlam aproximadamente 40% do fornecimento global. Cortes de produção elevam os preços; aumentos os reduzem.',
					'seo-cur-li-10': '<strong>Produção de xisto americano:</strong> Os EUA tornaram-se o maior produtor de petróleo do mundo em parte devido à tecnologia de xisto. Uma maior produção americana compete com a OPEP e pode limitar aumentos de preços.',
					'seo-cur-li-11': '<strong>Demanda global:</strong> O crescimento econômico na China e na Índia (grandes consumidores de petróleo) é um importante motor de demanda. Recessões reduzem a demanda e pressionam os preços para baixo.',
					'seo-cur-li-12': '<strong>Eventos geopolíticos:</strong> Conflitos em regiões produtoras de petróleo (Oriente Médio, Rússia) criam prêmios de risco de oferta que elevam os preços.',
					'seo-cur-li-13': '<strong>Força do USD:</strong> Como o petróleo é precificado em USD, um dólar mais forte torna o petróleo mais caro para compradores não americanos, reduzindo a demanda e exercendo pressão para baixo nos preços.',
					'seo-cur-h3-6': 'Preços de ações ao vivo: principais ações americanas atualizadas a cada hora',
					'seo-cur-p11': 'O LoanCalc mostra preços ao vivo de dez ações e fundos americanos amplamente acompanhados: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) e o SPDR S&P 500 ETF Trust (SPY). Os preços são obtidos do Yahoo Finance e atualizados a cada hora — o mesmo intervalo dos dados de ouro e petróleo.',
					'seo-cur-p12': 'Cada chip de ação mostra o preço atual em USD, a variação percentual em relação ao fechamento anterior (seta verde para ganhos, vermelha para perdas) e o preço equivalente em sua moeda local usando a taxa de câmbio ao vivo. Isso facilita o acompanhamento do valor de posições em ações americanas de qualquer lugar do mundo sem alternar entre aplicativos.',
					'seo-cur-p13': 'O S&amp;P 500 ETF (SPY) é incluído como benchmark amplo do mercado: quando o SPY sobe, o mercado americano em geral está subindo. Ações individuais como NVDA e TSLA têm maior volatilidade. Use a <a href="/savings-calculator/">Calculadora de Poupança</a> com retorno anual de 7–10% para modelar o crescimento de longo prazo do S&amp;P 500.',
					'seo-cur-p14': 'Veja também: <a href="/savings-calculator/">Calculadora de Poupança</a> — modele como retornos de moedas ou investimentos vinculados a commodities crescem ao longo do tempo.',
					'lbl-market-prices': 'Preços de mercado',
					'cur-rate-unavailable': 'Taxa indisponível',
					'cur-not-in-feed': 'Não disponível no feed ao vivo',
					'cur-today': 'hoje',
					'cur-status-fetching': 'A buscar taxas de câmbio…',
					'cur-status-live': 'Taxas ao vivo · {date} · 161 moedas · atualiza a cada 24h',
					'cur-status-partial': 'Taxas carregadas · {date} (33 moedas)',
					'cur-status-offline': 'Taxas offline: moedas limitadas disponíveis',
					'cmd-fetching': 'A carregar…',
					'cmd-live': 'Ao vivo · {date}',
					'cmd-approx': 'Aprox · verificar dados ao vivo',
					'cur-status-cached': 'Taxas de {date} · em cache · atualiza a cada 24h',
					'clamp-min': 'Mínimo:',
					'clamp-max': 'Máximo:'
				},
				tr: {
					'nav-loans': 'Krediler',
					'nav-savings': 'Tasarruf',
					'nav-refinance': 'Refinansman',
					'nav-currency': 'Para Birimi',
					'btn-settings': 'Ayarlar',
					'pref-title': 'Tercihler',
					'pref-save': 'Tercihleri kaydet',
					'toast-saved': 'Tercihler kaydedildi',
					'pref-cancel': 'İptal',
					'ci-sub-desc': 'Birikimlerinizin yıllık nasıl büyüdüğünü görün.',
					'tab-mortgage': 'Konut Kredisi',
					'tab-car': 'Araç Kredisi',
					'tab-personal': 'Bireysel Kredi',
					'tab-student': 'Öğrenci Kredisi',
					'tab-afford': 'Karşılama',
					'afford-pmt-label': 'Ödeyebileceğim aylık taksit',
					'afford-result-label': 'Borç alabileceğiniz tutar',
					'afford-sub': 'karşılama tahmini',
					'cur-amount-label': 'Miktar',
					'cur-to-label': 'Dönüştürüldü',
					'cur-quick': 'Hızlı referans',
					'pref-language': 'Görüntüleme dili',
					'pref-lang-note': 'Etiketleri ve sayı biçimini değiştirir.',
					'pref-currency': 'Tercih edilen para birimi',
					'pref-currency-note': 'Dönüştürücü için varsayılan para birimi.',
					'pref-current': 'Mevcut ayarlar',
					'gold-per': 'troy ons başına',
					'gold-local': 'Para biriminizde fiyat',
					'oil-per': 'varil başına',
					'oil-local': 'Para biriminizde fiyat',
					'trust-1': 'Her zaman ücretsiz',
					'trust-2': 'Kayıt gerekmez',
					'trust-3': 'Her ülkede çalışır',
					'hero-sub': 'Kredi hesaplayıcı, bileşik faiz, refinansman tasarrufları, canlı döviz çevirici, altın, petrol ve canlı hisse senedi fiyatları: ücretsiz, anında, kayıt gerekmez.',
					'faq-heading': 'Krediler, tasarruf ve döviz hakkında sık sorulan sorular',
					'chart-center-lbl': 'anapara',
					'chart-stat-principal': 'Alınan anapara',
					'chart-stat-interest': 'Ödenen toplam faiz',
					'chart-stat-total': 'Toplam geri ödeme',
					'chart-stat-payoff': 'Kredi tamamen ödendi',
					'breakdown-sub': 'Toplam maliyetinizin borçlanan tutar ve kredi verene ödenen faiz arasında nasıl bölündüğü.',
					'amort-sub': 'Her ödemenin yıllık dökümü.',
					'ci-section-sub': 'Bileşik faizle birikimlerinizin veya yatırımlarınızın yıl yıl nasıl büyüdüğünü görün.',
					'cur-section-sub': 'Canlı kurlarla ana para birimleri arasında dönüştürün. Yerel para biriminizde altın ve petrol fiyatları.',
					'ci-chart-sub': 'Her yıl sonundaki bakiye, depozitolarınız ile bileşik faiz büyümesi arasında bölünmüş.',
					'per-oz-usd': 'ons başına USD',
					'per-bbl-usd': 'varil başına USD',
					'lbl-stocks': 'Hisseler',
					'lbl-tab-currency': 'Para Birimleri',
					'lbl-tab-commodities': 'Emtialar',
					'lbl-tab-stocks': 'Hisseler',
					'age-just-now': 'az önce',
					'age-min-ago': '{n} dk önce',
					'age-hours-ago': '{n} saat önce',
					'lbl-currencies': 'para birimi',
					'lbl-rates-from': 'Kurlar',
					'lbl-from': 'Dan',
					'nav-faq': 'SSS',
					'unit-mo': '/ay',
					'weight-1g': '1g',
					'weight-10g': '10g',
					'weight-1kg': '1 kg',
					'weight-5bbl': '5 varil',
					'weight-10bbl': '10 varil',
					'weight-100bbl': '100 varil',
					'lbl-price-unavailable': 'Fiyat mevcut değil',
					'lbl-updating': 'Güncelleniyor…',
					'lbl-partial-rates': 'Kısmi kurlar',
					'rf-sub': 'Yeni oranla aylık',
					'rf-verdict-init': 'Refinansmanın mantıklı olup olmadığını görmek için kredi bilgilerinizi girin.',
					'rf-verdict-higher': 'Yeni oran daha düşük değil: refinansman taksidinizi artırır.',
					'rf-verdict-long': 'Aylık tasarruf var ancak başa baş noktası kalan vadeyi aşıyor. Önerilmez.',
					'rf-verdict-good': 'Refinansman mantıklı görünüyor.',
					'rf-verdict-summary': 'Aylık {monthly} tasarruf, {breakeven} içinde başa baş. Toplam tasarruf: {total}.',
					'rf-never': 'Asla',
					'rf-over-term': '>{n} yıl',
					'rf-months': '{n} ay',
					'rf-years-mo': '{y}y {m}a',
					'loan-desc': 'Herhangi bir konut kredisi, araç kredisi, bireysel kredi veya öğrenci kredisi için tam aylık taksitinizi bulmak için bu ücretsiz hesaplayıcıyı kullanın.',
					'ci-desc': 'Bileşik faiz hesaplayıcısı, birikmiş anapara üzerinden faiz hesaplandığında başlangıç depozitosunun nasıl büyüdüğünü gösterir.',
					'rf-desc': 'Refinansman hesaplayıcısı, kredinizi daha düşük faizle refinanse etmenin değerli olup olmadığına karar vermenize yardımcı olur.',
					'cur-desc': 'LoanCalc döviz çevirici 161 dünya para birimini destekler, kurlar her 24 saatte güncellenir.',
					'how-p1': 'Her sabit faizli kredi aynı standart itfa formülünü kullanır.',
					'how-p2': 'Üç faktör aylık taksidinizi kontrol eder.',
					'unit-years': 'yıl',
					'unit-yr': 'yıl',
					'unit-yrs': 'yıl',
					'ci-earned-short': 'Büyüme',
					'cur-rate-lbl': 'Kur',
					'cur-inverse-lbl': 'Ters',
					'cur-updated-lbl': 'Güncellendi',
					'how-formula-h': 'Formül',
					'how-lower-h': 'Aylık taksidinizi nasıl düşürebilirsiniz',
					'formula-m': 'Aylık taksit',
					'formula-p': 'Anapara (kredi tutarı)',
					'formula-r': 'Aylık faiz (yıllık ÷ 12)',
					'formula-n': 'Toplam ödeme sayısı (yıl × 12)',
					'tip-1': 'Daha yüksek peşinat anaparayı doğrudan azaltır: daha az borçlanmak daha düşük taksit ve toplam faiz demektir.',
					'tip-2': 'Daha uzun vade ödemeleri daha fazla aya yayar. Taksit düşer ancak toplam faiz artar.',
					'tip-3': 'Daha düşük faiz oranının birikimli etkisi vardır: büyük kredilerde 0,5% fark bile on binlerce tasarruf sağlar.',
					'tip-4': 'Başvuru öncesi kredi puanınızı iyileştirmek genellikle daha iyi oranlar sunar.',
					'faq-q1': 'Aylık kredi taksiti nasıl hesaplanır?',
					'faq-q2': 'İtfa planı nedir?',
					'faq-q3': 'Bu hesaplayıcı tüm ülkelerde çalışır mı?',
					'faq-q4': 'Toplam faizi nasıl azaltabilirim?',
					'faq-q5': 'LoanCalc tamamen ücretsiz mi?',
					'faq-q6': 'Refinansman hesaplayıcısı nasıl çalışır?',
					'faq-q7': 'Altın fiyatı nasıl hesaplanır ve güncellenir?',
					'faq-q8': 'Çevirici hangi para birimlerini destekler?',
					'loan-label-mortgage': '30 yıl sabit faizli konut kredisi',
					'loan-label-car': '5 yıllık araç kredisi',
					'loan-label-personal': '3 yıllık bireysel kredi',
					'loan-label-student': '10 yıllık öğrenci kredisi',
					'helper-title-mortgage': 'Tipik 30 yıllık konut kredisi',
					'helper-title-car': 'Tipik araç kredisi',
					'helper-title-personal': 'Tipik bireysel kredi',
					'helper-title-student': 'Federal öğrenci kredisi (ABD)',
					'helper-text-mortgage': '30 yıl ortalama sabit faiz: %6,5–7.',
					'helper-text-car': 'Yeni araç kredisi ortalama faizi: %6–8.',
					'helper-text-personal': 'Bireysel kredi faizleri %6 ile %36 arasında değişir.',
					'helper-text-student': 'Federal öğrenci kredisi faizleri Kongre tarafından yıllık olarak belirlenir.',
					'hero-h1': 'Ücretsiz <em>Finansal</em><br>Hesap Makinesi Paketi',
					'faq-q9': 'LoanCalc hangi hisse senedi fiyatlarını gösterir?',
					'extra-label': 'Ek aylık ödeme',
					'lbl-amount': 'Kredi tutarı',
					'lbl-rate': 'Yıllık faiz oranı',
					'lbl-term': 'Kredi vadesi',
					'res-monthly': 'Aylık taksit',
					'freq-monthly': 'Aylık',
					'freq-biweekly': '2 haftada bir',
					'freq-per-2wk': '/ 2 hafta',
					'res-principal': 'Anapara',
					'res-interest': 'Toplam faiz',
					'res-total': 'Toplam maliyet',
					'monthly-note': 'Yalnızca anapara ve faiz, vergi, sigorta ve ücretler hariç',
					'hero-headline': 'Rakamlarını bil.',
					'hero-subtitle': 'Konut kredisi, birikim, refinansman ve döviz kuru için ücretsiz hesaplayıcılar.',
					'hero-h1': 'Rakamlarını bil.',
					'hero-stat-currencies': 'Döviz',
					'hero-stat-langs': 'Dil',
					'hero-stat-tools': 'Araçlar',
					'res-year': 'Kapatma yılı',
					'lbl-principal-pct': 'Anapara',
					'lbl-interest-pct': 'Faiz',
					'section-breakdown': 'Ödeme dağılımı',
					'section-amort': 'İtfa planı',
					'amort-year': 'Yıl',
					'amort-month': 'Ay',
					'amort-start': 'Başlangıç bakiyesi',
					'amort-ppaid': 'Ödenen anapara',
					'amort-ipaid': 'Ödenen faiz',
					'amort-end': 'Bitiş bakiyesi',
					'btn-show-all': 'Tüm yılları göster',
					'btn-show-all-months': 'Tüm ayları göster',
					'btn-show-less': 'Daha az göster',
					'amort-gran-yearly': 'Yıllık',
					'amort-gran-monthly': 'Aylık',
					'section-how': 'Kredi taksitleri nasıl hesaplanır',
					'section-faq': 'Sık sorulan sorular',
					'ci-h2': 'Bileşik faiz ve tasarruf büyüme hesaplayıcısı',
					'ci-label-principal': 'İlk para yatırma',
					'ci-label-monthly': 'Aylık katkı',
					'ci-label-rate': 'Yıllık getiri oranı',
					'ci-label-years': 'Yatırım süresi',
					'ci-result-label': 'Gelecekteki değer',
					'ci-sub': 'Toplam portföy sonrasında',
					'ci-deposited': 'Toplam yatırılan',
					'ci-earned': 'Kazanılan faiz',
					'ci-mult': 'Büyüme katsayısı',
					'ci-year': 'Hedef yıl',
					'ci-chart-h': 'Yıllık büyüme',
					'rf-h2': 'Refinansman hesaplayıcısı: ne kadar tasarruf edeceksiniz?',
					'rf-current': 'Mevcut kredi',
					'rf-new': 'Yeni kredi teklifi',
					'rf-balance': 'Kalan bakiye',
					'rf-oldrate': 'Mevcut faiz oranı',
					'rf-remaining': 'Kalan yıl',
					'rf-newrate': 'Yeni faiz oranı',
					'rf-costs': 'Kapanış maliyetleri',
					'rf-monthly': 'Aylık tasarruf',
					'rf-old': 'Eski taksit',
					'rf-new-pay': 'Yeni taksit',
					'rf-breakeven': 'Başa baş noktası',
					'rf-total': 'Toplam ömür boyu tasarruf',
					'cur-h2': 'Canlı döviz çevirici, bugün altın fiyatı, petrol fiyatı ve hisse senedi fiyatları',
					'gold-local-lbl': 'Para biriminizde fiyat',
					'oil-local-lbl': 'Para biriminizde fiyat',
					'footer-mortgage': 'Mortgage Hesaplayıcısı',
					'footer-loan': 'Kredi Hesaplayıcısı',
					'footer-savings': 'Tasarruf Hesaplayıcısı',
					'footer-refinance': 'Refinansman Hesaplayıcısı',
					'footer-currency': 'Döviz Çevirici',
					'footer-privacy': 'Gizlilik Politikası',
					'footer-dnsmi': 'Kişisel Bilgilerimi Satmayın veya Paylaşmayın',
					'footer-rights': 'Tüm hakları saklıdır.',
					'footer-desc': 'Ücretsiz finansal hesaplayıcılar: kredi, tasarruf, refinansman, döviz. Hesap gerekmez.',
					'footer-disclaimer': 'LoanCalc yalnızca bilgilendirme amacıyla tahminler sunmaktadır. Bu finansal tavsiye değildir.',
					'seo-mort-h2': 'Mortgage Hesaplayıcısı: Bilmeniz Gereken Her Şey',
					'seo-mort-h3-1': 'Mortgage hesaplayıcısı nedir ve kim kullanmalıdır?',
					'seo-mort-p1': 'Mortgage hesaplayıcısı, üç girişe dayanarak konut kredisinin aylık taksitini hesaplayan bir finansal araçtır: kredi tutarı (anapara), yıllık faiz oranı ve yıl cinsinden kredi vadesi. Ev satın almayı düşünen, kredi tekliflerini karşılaştıran veya uzun vadeli borçlanma maliyetini anlamaya çalışan herkes bir mortgage sözleşmesi imzalamadan önce bunu kullanmalıdır.',
					'seo-mort-p2': "İlk kez ev alanlar, ev aramadan önce finansal uygunluğu kontrol etmek için mortgage hesaplayıcılarını kullanır. Mevcut ev sahipleri, refinansman senaryolarını keşfetmek veya ek ödeme yapmanın etkisini modellemek için bunları kullanır. Gayrimenkul yatırımcıları, kiralık mülklerdeki nakit akışını tahmin etmek için kullanır. Hesaplayıcı, dünya genelindeki sabit faizli mortgage'lar için aynı şekilde çalışır.",
					'seo-mort-h3-2': 'Aylık taksit formülü nasıl çalışır',
					'seo-mort-p3': 'Her sabit faizli mortgage aynı standart amortisman formülünü kullanır:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'Burada <strong>M</strong> aylık taksidiniz, <strong>P</strong> anaparadır, <strong>r</strong> aylık faiz oranıdır (yıllık oran ÷ 12) ve <strong>n</strong> toplam aylık ödeme sayısıdır (yıl × 12). Bu formül, hem kalan bakiye üzerindeki faizi hem de anaparanın bir kısmını karşılayan sabit bir aylık tutar üretir; oran zamanla değişir. İlk yıllarda her taksidin büyük kısmı faizdir. Son yıllarda büyük kısmı anaparayı azaltır.',
					'seo-mort-h3-3': 'Mortgage faiz oranınızı neler etkiler?',
					'seo-mort-p6': 'Gerçek mortgage faiz oranınız, kredi verenin başvurunuzu değerlendirirken incelediği birkaç faktöre bağlıdır:',
					'seo-mort-li-1': "<strong>Kredi puanı:</strong> 760'ın üzerinde puana sahip borçlular genellikle en düşük oranları alır. Kredi puanındaki her 20 puanlık düşüş oranınızı %0,1–0,5 artırabilir ve 30 yılda toplam faize binlerce ekleyebilir.",
					'seo-mort-li-2': '<strong>Kredi/değer oranı (LTV):</strong> Daha düşük bir LTV (daha yüksek peşinat) kredi verene daha az risk sinyali verir. %20 veya daha fazla peşinat genellikle özel mortgage sigortasını (PMI) ortadan kaldırır ve daha iyi bir oran için hak kazandırabilir.',
					'seo-mort-li-3': '<strong>Kredi türü:</strong> Uyumlu krediler (Fannie Mae/Freddie Mac limitleri dahilinde) genellikle jumbo kredilerden daha düşük oranlar taşır. Devlet destekli kredilerin (FHA, VA, USDA) kendi oran yapıları vardır.',
					'seo-mort-li-4': "<strong>Kredi vadesi:</strong> 15 yıllık mortgage'lar, kredi verenin parası daha kısa süre risk altında olduğundan 30 yıllık mortgage'lardan daha düşük faiz oranları taşır.",
					'seo-mort-li-5': '<strong>Piyasa koşulları:</strong> Mortgage faiz oranları, 10 yıllık Hazine tahvil getirisi ve Federal Rezerv politikasından büyük ölçüde etkilenir. Fed enflasyonla mücadele için faizleri yükselttiğinde mortgage faiz oranları da yükselme eğilimi gösterir.',
					'seo-mort-h3-4': '15 yıllık ve 30 yıllık mortgage: gerçek tercih',
					'seo-mort-p12': '15 yıllık ve 30 yıllık mortgage arasındaki seçim, temelde aylık nakit akışı ile ödenen toplam faiz arasında bir tercihdir. İşte 300.000 $ için bir örnek:',
					'seo-mort-th-loan': 'Kredi',
					'seo-mort-th-rate': 'Oran',
					'seo-mort-p13': "%6,5'te, 30 yıllık mortgage toplam 382.633 $ faiz öderken 15 yıllık için bu 170.453 $'dır — 212.000 $'ın üzerinde bir fark. Ancak 30 yıllık mortgage'ın aylık taksiti 718 $ daha düşüktür; bu, nakit akışı kısıtlıysa veya farkı yatırmak istiyorsanız önemli bir noktadır.",
					'seo-mort-h3-5': 'PMI nedir ve ne zaman uygulanır?',
					'seo-mort-p14': "Özel mortgage sigortası (PMI), peşinatınız evin satın alma fiyatının %20'sinden az olduğunda çoğu ABD kredi vericisi tarafından talep edilir. PMI, temerrüde düşmeniz durumunda krediyi vereni korur. Tipik maliyet, aylık taksidinize eklenen yıllık kredi tutarının %0,5–1,5'idir. 300.000 $ tutarındaki bir kredide PMI aylık 125–375 $ ekleyebilir. Özsermayeniz %20'ye ulaştığında, genellikle PMI iptali talebinde bulunabilirsiniz. Kredi verenler, kredi bakiyeniz orijinal satın alma fiyatının %78'ine ulaştığında PMI'yı otomatik olarak iptal etmek zorundadır.",
					'seo-mort-h3-6': "Mortgage'ınızı daha hızlı kapatmanın yolları",
					'seo-mort-li-6': "<strong>Yılda bir ekstra ödeme yapın:</strong> 30 yıllık bir mortgage'da, yılda bir ek aylık ödeme kredi vadesini yaklaşık 4–5 yıl azaltır ve faizde on binlerce tasarruf sağlar.",
					'seo-mort-li-7': '<strong>İki haftada bir ödemeye geçin:</strong> 12 aylık ödeme yerine, yılda 26 yarım ödeme yapın. Bu, önemli bir nakit akışı etkisi olmaksızın yılda bir ekstra tam ödemeyle sonuçlanır.',
					'seo-mort-li-8': '<strong>Ödemenizi yuvarlayın:</strong> Taksidiniz 1.847 $ ise, her ay 1.900 $ veya 2.000 $ ödemek ekstra tutarı tamamen anaparaya yönlendirir ve geri ödemeyi hızlandırır.',
					'seo-mort-li-9': '<strong>Beklenmedik gelir uygulayın:</strong> Vergi iadeleri, ikramiyeler veya miras toplu anapara ödemeleri olarak uygulandığında mortgage sürenizden yıllar kazandırabilir.',
					'seo-mort-p15': 'Ayrıca faydalı: <a href="/refinance-calculator/">Refinansman Hesaplayıcısı</a> — mevcut mortgage\'ınız için daha düşük bir oranın mantıklı olup olmadığını görün. Ya da araba kredileri, bireysel krediler ve öğrenci kredileri dahil <a href="/loan-calculator/">diğer kredi türlerini</a> keşfedin.',
					'seo-ci-h2': 'Bileşik faiz ve tasarruf: tam rehber',
					'seo-ci-h3-1': 'Bileşik faiz nedir ve neden önemlidir?',
					'seo-ci-h3-2': 'Günlük, aylık ve yıllık bileşim — büyümeyi nasıl etkiler',
					'seo-ci-h3-3': '72 kuralı açıklandı',
					'seo-ci-h3-4': 'Beklemenin maliyeti: 25, 35 veya 45 yaşında başlamak',
					'seo-ci-h3-5': 'Yüksek getirili tasarruf hesapları vs endeks fonları: tipik oranlar',
					'seo-ci-p1': 'Bileşik faiz, hem ana para hem de tüm önceki dönemlerin birikmiş faizi üzerinden hesaplanan faizdir. Bu, yalnızca orijinal ana para üzerinden hesaplanan basit faizden temelden farklıdır. Albert Einstein\'a genellikle bileşik faizi "dünyanın sekizinci harikası" olarak nitelendirmek atfedilir. Onu anlayan kazanır; anlamayan öder.',
					'seo-ci-p2': 'Bileşik faizin bu kadar güçlü olmasının nedeni üstel büyümedir. İlk yıllarda etki ince olur. Ancak 20, 30 veya 40 yıl boyunca, bileşim etkisi olağanüstü hale gelir — nihai servetinizin büyük kısmı katkılarınızdan değil, faiz üzerinden kazanılan faiz üzerinden kazanılan faizden gelir.',
					'seo-ci-p3': 'Bileşim sıklığı, faizin ne sıklıkta hesaplanıp bakiyeye eklendiğini belirler. Daha sık bileşim, biraz daha yüksek getiri anlamına gelir:',
					'seo-ci-p4': 'Tasarruf hesapları ve para piyasası fonları için aylık bileşim standarttır. Çevrimiçi bankalardaki yüksek getirili tasarruf hesapları genellikle günlük bileşim yapar. Aylık ve günlük bileşim arasındaki fark küçüktür — faiz oranının kendisi bileşim sıklığından çok daha önemlidir.',
					'seo-ci-p5': "72 kuralı basit bir zihin matematik kısayolu: yatırımınızın değer olarak iki katına çıkması için kaç yıl süreceğini tahmin etmek için 72'yi yıllık getiri oranınıza bölün.",
					'seo-ci-p6': 'Kural tersine de çalışır: Paranızı 8 yılda iki katına çıkarmak istiyorsanız, yılda en az 72 ÷ 8 = %9 oranına ihtiyacınız var.',
					'seo-ci-p7': 'Tasarrufta en güçlü faktör zamandır. İlk depozito olmadan yılda %7 getiriyle aylık 200 dolar yatırmayı düşünün:',
					'seo-ci-p8': '35 yerine 25 yaşında başlamak katkılarda yalnızca 24.000 dolar daha maliyetli olur ama 285.000 dolar daha fazla servet oluşturur — o ek 24.000 dolar üzerinde 12 kat getiri. Mesaj açık: küçük miktarlarla bile erken başlayın.',
					'seo-ci-p9': 'Bu hesap makinesinde seçtiğiniz getiri oranı, tasarruflarınızı gerçekten nerede tutacağınızı yansıtmalıdır:',
					'seo-ci-p10': 'Ayrıca bakın: <a href="/refinance-calculator/">Refinansman Hesaplayıcısı</a> — bir mortgage yeniden finanse etmekten tasarruf ettiğiniz faiz tasarruflara yönlendirilebilir.',
					'seo-ci-li-1': '<strong>Yıllık bileşim:</strong> Faiz yılda bir kez eklenir. Temel oran.',
					'seo-ci-li-2': "<strong>Aylık bileşim:</strong> Faiz yılda 12 kez eklenir. Aylık bileşimli %6'lık yıllık oran, %6,168'lik efektif yıllık orana eşdeğerdir.",
					'seo-ci-li-3': "<strong>Günlük bileşim:</strong> Faiz yılda 365 kez eklenir. Günlük bileşimli %6'lık oran %6,183'lük efektif oran verir. Aylıktan biraz daha iyi.",
					'seo-ci-li-4': 'Yüksek getirili tasarrufta %4: 72 ÷ 4 = iki katına çıkmak için <strong>18 yıl</strong>',
					'seo-ci-li-5': 'Borsa ortalamasında %7: 72 ÷ 7 = iki katına çıkmak için <strong>10,3 yıl</strong>',
					'seo-ci-li-6': 'Agresif büyümede %10: 72 ÷ 10 = iki katına çıkmak için <strong>7,2 yıl</strong>',
					'seo-ci-li-7': 'Girişim getirilerinde %12: 72 ÷ 12 = iki katına çıkmak için <strong>6 yıl</strong>',
					'seo-ci-li-8': '<strong>Geleneksel tasarruf hesabı:</strong> %0,01–0,5 APY. Enflasyon karşısında etkin bir şekilde değer kaybeder. Yalnızca hemen erişilmesi gereken acil fonlar için uygundur.',
					'seo-ci-li-9': '<strong>Yüksek getirili tasarruf hesabı (çevrimiçi bankalar):</strong> Yüksek oranlı ortamda %4–5 APY. FDIC güvenceli. Acil fonlar ve kısa vadeli hedefler (1–3 yıl) için mükemmel.',
					'seo-ci-li-10': "<strong>Para piyasası hesapları:</strong> %4–5 APY. Biraz farklı erişim koşullarıyla HYSA'ya benzer.",
					'seo-ci-li-11': "<strong>Mevduat sertifikaları (CD'ler):</strong> 6 ay ila 5 yıllık kilitli süreyle %4–5,5 APY. Daha uzun vadeler için daha yüksek oranlar.",
					'seo-ci-li-12': '<strong>S&amp;P 500 endeks fonu:</strong> Tarihsel olarak ortalama ~%10 nominal getiri (enflasyon sonrası %7). Garantili değil. 5+ yıllık hedefler için en uygun. Piyasa oynaklığına tabidir.',
					'seo-ci-li-13': '<strong>Toplam tahvil piyasası fonu:</strong> Tarihsel olarak %3–5. Hisselerden daha düşük oynaklık. Orta vadeli hedefler için uygundur.',
					'seo-ci-th-start': 'Başlangıç yaşı',
					'seo-ci-th-end': 'Bitiş yaşı',
					'seo-ci-th-years': 'Yatırım yılları',
					'seo-ci-th-contributed': 'Toplam katkı',
					'seo-ci-th-final': 'Nihai değer',
					'seo-ci-th-interest': 'Kazanılan faiz',
					'seo-rf-h2': 'Mortgage refinansmanı: ne zaman mantıklıdır',
					'seo-rf-h3-1': 'Refinansmanın finansal olarak ne zaman mantıklı olduğu',
					'seo-rf-h3-2': 'Başa baş noktası nasıl hesaplanır',
					'seo-rf-h3-3': 'Nakit çıkışlı refinansman ile oran-vade refinansmanı',
					'seo-rf-h3-4': 'Refinansmanın gizli maliyetleri',
					'seo-rf-h3-5': 'Ne zaman refinansman yapmamalısınız',
					'seo-rf-p1': 'Refinansman, mevcut kredinizi ideal olarak daha düşük faiz oranıyla yeni bir krediyle değiştirir. Karar temel bir soruya bağlıdır: Uzun vadeli tasarruflar önceden ödenen maliyetleri aşacak mı ve bu maliyetleri geri kazanacak kadar uzun süre kredide kalacak mısınız? Refinansman en çok anlam ifade eder:',
					'seo-rf-p2': 'Başa baş hesaplaması basittir: toplam kapanış maliyetlerini aylık tasarrufunuza bölün.',
					'seo-rf-formula': '<strong>Başa baş ayları = Kapanış maliyetleri ÷ Aylık ödeme tasarrufu</strong>',
					'seo-rf-p3': 'Örnek: Refinansman 4.500 $ kapanış maliyetine mal oluyorsa ve size aylık 200 $ tasarruf sağlıyorsa, başa baş noktası 4.500 ÷ 200 = 22,5 ay — yaklaşık 2 yıl. Evinizde en az 3–5 yıl daha kalmayı planlıyorsanız bu refinansman açıkça finansal anlam taşır. 18 ay içinde taşınmayı planlıyorsanız taşımaz.',
					'seo-rf-p4': 'İki ana mortgage refinansmanı türü vardır:',
					'seo-rf-p5': 'Refinansmanın gerçek maliyeti belirtilen kapanış maliyetlerinin ötesine geçer. Yaygın ücretler şunlardır:',
					'seo-rf-p6': "Tipik bir refinansman için toplam kapanış maliyetleri kredi tutarının %2–3'ünü oluşturur. 300.000 $ tutarında bir kredide, kapanış maliyetsiz refinansmansı seçmediğiniz sürece 6.000–9.000 $ maliyet bekleyin.",
					'seo-rf-p7': 'Ayrıca bakın: <a href="/loan-calculator/">Mortgage Hesaplayıcısı</a> — refinansmana karar vermeden önce orijinal mortgage\'ınızı modelleyin veya kredi seçeneklerini karşılaştırın.',
					'seo-rf-li-1': 'Yeni oranınız mevcut oranınızdan en az %0,5–1 daha düşük',
					'seo-rf-li-2': 'Evde başa baş döneminden daha uzun süre kalmayı planlıyorsunuz',
					'seo-rf-li-3': 'Orijinal kredinizden bu yana kredi puanınız önemli ölçüde iyileşti',
					'seo-rf-li-4': "İstikrar için değişken oranlıdan sabit oranlı mortgage'a geçmek istiyorsunuz",
					'seo-rf-li-5': 'Kredi sürenizi kısaltmak istiyorsunuz (örn. 30 yıldan 15 yıla) ve daha yüksek aylık ödemeleri karşılayabilirsiniz',
					'seo-rf-li-6': "<strong>Oran-vade refinansmanı:</strong> Mevcut mortgage'ınızı, kredi bakiyesini değiştirmeden daha iyi bir oran ve/veya farklı vade ile yenisiyle değiştirirsiniz. Bu en yaygın türdür ve bu hesap makinesinin modellediği şeydir. Amaç yalnızca faiz maliyetinizi azaltmaktır.",
					'seo-rf-li-7': '<strong>Nakit çıkışlı refinansman:</strong> Mevcut kredi bakiyenizden fazlasını ödünç alır, farkı nakit olarak alırsınız. Örneğin, eviniz 400.000 $ değerindeyse ve 250.000 $ borcunuz varsa, 320.000 $ için refinansman yapabilir ve 70.000 $ nakit alabilirsiniz. Nakit çıkışlı refinansman özsermayenizi sıfırlar ve genellikle biraz daha yüksek oran taşır.',
					'seo-rf-li-8': "<strong>Kaynak ücreti:</strong> Kredi tutarının %0,5–1'i. Yeni krediyi işlemek için borç verenin ücreti.",
					'seo-rf-li-9': '<strong>Ekspertiz ücreti:</strong> 300–600 $. Çoğu borç veren, evinizin mevcut değerini doğrulamak için yeni bir ekspertiz ister.',
					'seo-rf-li-10': '<strong>Tapu sigortası:</strong> 500–1.500 $. Borç vereni tapu uyuşmazlıklarına karşı korumak için gereklidir.',
					'seo-rf-li-11': "<strong>Kayıt ücretleri:</strong> 25–250 $. Yeni mortgage'ı kayıt altına almak için devlet ücretleri.",
					'seo-rf-li-12': "<strong>İndirim puanları:</strong> Oranınızı düşürmek için isteğe bağlı önceden ödenen faiz. Bir puan = kredi tutarının %1'i = genellikle %0,25 oran indirimi.",
					'seo-rf-li-13': '<strong>Yakında taşınıyorsunuz:</strong> Başa baş noktasına ulaşmadan önce evi satarsanız, refinansman tasarruftan daha maliyetli olur.',
					'seo-rf-li-14': '<strong>Erken ödeme cezaları:</strong> Bazı krediler erken ödeme için ücret alır. Refinansman yapmadan önce mevcut kredi şartlarınızı doğrulayın.',
					'seo-rf-li-15': '<strong>Kredinin büyük kısmını ödediyseniz:</strong> 20 yıldır ödediğiniz bir krediyi yeni 30 yıllık vadeye sıfırlamak, oran daha düşük olsa bile borcunuzu önemli ölçüde uzatır.',
					'seo-rf-li-16': "<strong>Kredi puanınız düştü:</strong> Orijinal mortgage'ınızdan bu yana krediniz kötüleştiyse, daha iyi bir oran için uygun olmayabilirsiniz ve aslında daha yüksek bir oran alabilirsiniz.",
					'seo-cur-h2': 'Döviz Çevirici, Altın, Petrol ve Hisse Senedi Fiyatları: Canlı Kurlar Nasıl Çalışır',
					'seo-cur-h3-1': 'Canlı döviz kurları nasıl çalışır',
					'seo-cur-p1': 'Döviz kurları, günlük işlem hacmi 7 trilyon doları aşan dünyanın en büyük finansal piyasası olan döviz piyasası (forex) tarafından belirlenir. Bu sitede gördüğünüz "canlı" kur, bankaların büyük hacimli işlemlerde birbirleriyle kullandığı alış ve satış fiyatlarının ortası olan orta piyasa kurudur (bankalararası kur veya spot kur olarak da bilinir).',
					'seo-cur-p2': "Burada gösterilen kurlar, Avrupa Merkez Bankası ve diğer finansal kaynaklardan veri toplayan Frankfurter API'sinden alınmaktadır. Günlük olarak güncellenir ve performans için önbellekte saklanır. Milisaniye hassasiyetinde gerçek zamanlı kurlar için kurumsal yatırımcılar özel forex platformları kullanır — ancak seyahat planlaması, uluslararası transferler ve genel referans için bu kurlar yüzde birinin küçük bir bölümü içinde doğrudur.",
					'seo-cur-h3-2': 'Döviz kurlarını ne etkiler',
					'seo-cur-p3': 'Döviz kurları, ekonomik ve siyasi faktörlerin karmaşık bir bileşimine bağlı olarak sürekli değişmektedir:',
					'seo-cur-li-1': '<strong>Faiz oranı farklılıkları:</strong> Bir merkez bankası faiz oranlarını yükselttiğinde, yüksek oranlar daha iyi getiri arayan yabancı sermayeyi çektiğinden para birimi genellikle güçlenir. ABD Federal Rezervi kararları çoğu zaman küresel döviz kurlarını etkiler.',
					'seo-cur-li-2': '<strong>Enflasyon:</strong> Yüksek enflasyon, bir para biriminin satın alma gücünü zamanla aşındırır. Düşük ve istikrarlı enflasyona sahip ülkeler genellikle daha güçlü para birimlerine sahiptir. EUR/USD paritesi, ABD ile Euro Bölgesi arasındaki enflasyon farklılıkları nedeniyle yakından izlenir.',
					'seo-cur-li-3': '<strong>Ticaret dengesi:</strong> İhracatı ithalatından fazla olan ülkelerin (ticaret fazlası) para birimine olan talep daha yüksektir ve bu da değerini artırır. Sürekli ticaret açığı veren ülkeler zamanla para birimi zayıflaması yaşayabilir.',
					'seo-cur-li-4': '<strong>Siyasi istikrar:</strong> Siyasi belirsizlik, seçimler veya jeopolitik çatışmalar dövizlerde hızlı hareketlere yol açabilir. USD, CHF ve JPY gibi güvenli liman para birimleri küresel krizlerde sıklıkla güçlenir.',
					'seo-cur-li-5': '<strong>GSYİH büyümesi:</strong> Güçlü ekonomik büyüme, yatırımcılar sermayelerini o ekonomiye yatırdıkça bir para birimine olan talebi artırır.',
					'seo-cur-h3-3': 'Orta piyasa kuru ile banka kuru: neden bir fark vardır',
					'seo-cur-p4': 'Bu dönüştürücüde gördüğünüz kur, alış ve satış fiyatları arasındaki teorik orta nokta olan orta piyasa kurudur. Parayı bir banka, kredi kartı veya para transfer hizmeti aracılığıyla değiştirdiğinizde daha kötü bir kur alırsınız. Bu farka spread denir ve döviz büfelerinin kâr etme yöntemi budur.',
					'seo-cur-li-6': '<strong>Bankalar ve havalimanı büfeleri:</strong> Genellikle orta piyasa kurunun %3–10 üzerinde ücret alır. Küçük miktarlar ve turistik yerler için en kötü seçenek.',
					'seo-cur-li-7': '<strong>Kredi kartları:</strong> Genellikle yabancı işlem ücreti olarak %1–3 alır. Özellikle yabancı işlem ücreti olmayan kartlarda yurt dışı alışverişlerde çoğu zaman en iyi seçenek.',
					'seo-cur-li-8': '<strong>Uzman transfer hizmetleri (Wise, Revolut):</strong> Orta piyasa kurunun %0,3–1 üzerinde ücret alır. Büyük uluslararası transferler için en iyisi.',
					'seo-cur-p5': 'Gerçekte alacağınızı hesaplamak için: orta piyasa kurunu alın ve sağlayıcının spread yüzdesini çıkarın. Orta piyasada 1 USD = 0,92 EUR görüyorsanız ve bankanız %3 alıyorsa, dolar başına yaklaşık 0,92 × (1 - 0,03) = 0,892 EUR alırsınız.',
					'seo-cur-h3-4': 'Döviz koruması olarak altın: XAU nasıl fiyatlandırılır',
					'seo-cur-p6': 'Altın (borsa kodu XAU), uluslararası piyasalarda troy ons başına ABD doları cinsinden fiyatlandırılır. Troy ons, kıymetli metaller için standart birimdir ve yaklaşık 31,1 grama eşittir (standart avoirdupois onsundan 28,35 gramdan biraz daha ağırdır). Bir troy ons = tam olarak 31,1035 gram.',
					'seo-cur-p7': 'Altın, para birimi değer kaybı ve enflasyona karşı bir koruma aracı olarak işlev görür. ABD doları zayıfladığında veya enflasyon yükseldiğinde altın fiyatları sıklıkla yükselir — altının kendisi değiştiği için değil, aynı ağırlıkta altın almak için daha fazla dolar gerektiği için. Altın, bireysel para birimleri enflasyonla değer kaybederken yüzyıllar boyunca satın alma gücünü korumuştur. Bu sitedeki altın fiyatı Yahoo Finance aracılığıyla piyasa verilerinden alınmakta ve saatlik olarak önbelleklenmektedir.',
					'seo-cur-p8': 'Altın fiyat hareketleri şu faktörler tarafından yönlendirilir: merkez bankalarının altın rezervleri, ABD dolarının gücü, reel faiz oranları (reel oranlar düşük veya negatif olduğunda altın daha cazip hale gelir), jeopolitik risk ve mücevherat/endüstriyel talep.',
					'seo-cur-h3-5': 'WTI ham petrolü: neden USD cinsinden fiyatlandırılır ve fiyatı ne yönlendirir',
					'seo-cur-p9': "West Texas Intermediate (WTI), Kuzey Amerika'nın birincil ham petrol referansı ve önemli bir küresel fiyat göstergesidir. Varil başına ABD doları cinsinden fiyatlandırılır (1 varil = 42 ABD galonu = yaklaşık 159 litre). Petrol, 1970'lerin Petrodolar anlaşmasından bu yana USD cinsinden fiyatlandırılmakta olup petrol ithal eden tüm ülkelerin ödeme için dolara ihtiyaç duymasıyla küresel bir ABD doları talebi yaratmaktadır.",
					'seo-cur-p10': 'Petrol fiyatlarını yönlendiren temel faktörler:',
					'seo-cur-li-9': "<strong>OPEC+ üretim kararları:</strong> OPEC karteli ve müttefik üreticiler (Rusya vb.) küresel arzın yaklaşık %40'ını kontrol etmektedir. Üretim kısıntıları fiyatları yükseltir; artışlar düşürür.",
					'seo-cur-li-10': '<strong>ABD kayaç petrolü üretimi:</strong> ABD, kısmen kayaç teknolojisi sayesinde dünyanın en büyük petrol üreticisi oldu. Yüksek ABD üretimi OPEC ile rekabet eder ve fiyat artışlarını sınırlayabilir.',
					'seo-cur-li-11': "<strong>Küresel talep:</strong> Çin ve Hindistan'daki ekonomik büyüme (büyük petrol tüketicileri) önemli bir talep motorudur. Durgunluklar talebi azaltır ve fiyatları düşürür.",
					'seo-cur-li-12': '<strong>Jeopolitik olaylar:</strong> Petrol üreten bölgelerdeki (Orta Doğu, Rusya) çatışmalar fiyatları yükselten arz riski primleri oluşturur.',
					'seo-cur-li-13': "<strong>USD'nin gücü:</strong> Petrol USD cinsinden fiyatlandırıldığından, daha güçlü bir dolar petrolü ABD dışındaki alıcılar için daha pahalı kılar, talebi düşürür ve fiyatlar üzerinde aşağı yönlü baskı oluşturur.",
					'seo-cur-h3-6': 'Canlı hisse senedi fiyatları: saatlik güncellenen en iyi ABD hisseleri',
					'seo-cur-p11': "LoanCalc, yaygın olarak takip edilen on ABD hisse senedi ve fonu için canlı fiyatlar gösterir: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B) ve SPDR S&P 500 ETF Trust (SPY). Fiyatlar Yahoo Finance'den alınır ve saatte bir güncellenir — altın ve petrol verileriyle aynı aralıkta.",
					'seo-cur-p12': 'Her hisse senedi çipi, USD cinsinden mevcut fiyatı, önceki kapanıştan yüzde değişimi (kazançlar için yeşil ok, kayıplar için kırmızı) ve canlı döviz kurunu kullanarak yerel para biriminizde eşdeğer fiyatı gösterir. Bu, uygulama değiştirmeden dünyanın herhangi bir yerinden ABD hisse pozisyonlarının değerini takip etmeyi kolaylaştırır.',
					'seo-cur-p13': 'S&amp;P 500 ETF (SPY), geniş piyasa referansı olarak dahil edilmiştir: SPY yükseldiğinde genel ABD piyasası genellikle yükselmektedir. NVDA ve TSLA gibi bireysel hisseler daha yüksek volatilite taşır. Uzun vadeli S&amp;P 500 büyümesini modellemek için %7–10 yıllık getiriyle <a href="/savings-calculator/">Tasarruf Hesaplayıcısı</a>\'nı kullanın.',
					'seo-cur-p14': 'Ayrıca bakın: <a href="/savings-calculator/">Tasarruf Hesaplayıcısı</a> — döviz getirilerinin veya emtiaya bağlı yatırımların zaman içinde nasıl büyüdüğünü modelleyin.',
					'lbl-market-prices': 'Piyasa fiyatları',
					'cur-rate-unavailable': 'Kur mevcut değil',
					'cur-not-in-feed': 'Canlı akışta yok',
					'cur-today': 'bugün',
					'cur-status-fetching': 'Döviz kurları alınıyor…',
					'cur-status-live': 'Canlı kurlar · {date} · 161 para birimi · 24 saatte bir güncellenir',
					'cur-status-partial': 'Kurlar yüklendi · {date} (33 para birimi)',
					'cur-status-offline': 'Çevrimdışı kurlar: sınırlı para birimi mevcut',
					'cmd-fetching': 'Yükleniyor…',
					'cmd-live': 'Canlı · {date}',
					'cmd-approx': 'Yaklaşık · canlı verileri kontrol edin',
					'cur-status-cached': '{date} tarihli kurlar · önbellekte · 24 saatte bir güncellenir',
					'clamp-min': 'Minimum:',
					'clamp-max': 'Maksimum:'
				},
				id: {
					'nav-loans': 'Pinjaman',
					'nav-savings': 'Tabungan',
					'nav-refinance': 'Refinansi',
					'nav-currency': 'Mata Uang',
					'btn-settings': 'Pengaturan',
					'pref-title': 'Preferensi',
					'pref-save': 'Simpan preferensi',
					'toast-saved': 'Preferensi disimpan',
					'pref-cancel': 'Batal',
					'ci-sub-desc': 'Lihat bagaimana tabungan Anda tumbuh dari tahun ke tahun.',
					'tab-mortgage': 'KPR',
					'tab-car': 'Kredit Mobil',
					'tab-personal': 'Pinjaman Pribadi',
					'tab-student': 'Pinjaman Pelajar',
					'tab-afford': 'Kemampuan',
					'afford-pmt-label': 'Cicilan bulanan yang mampu saya bayar',
					'afford-result-label': 'Anda bisa meminjam hingga',
					'afford-sub': 'perkiraan kemampuan',
					'cur-amount-label': 'Jumlah',
					'cur-to-label': 'Dikonversi ke',
					'cur-quick': 'Referensi cepat',
					'pref-language': 'Bahasa tampilan',
					'pref-lang-note': 'Mengubah label dan format angka.',
					'pref-currency': 'Mata uang pilihan',
					'pref-currency-note': 'Mata uang default untuk konverter.',
					'pref-current': 'Pengaturan saat ini',
					'gold-per': 'per troy ounce',
					'gold-local': 'Harga dalam mata uang Anda',
					'oil-per': 'per barel',
					'oil-local': 'Harga dalam mata uang Anda',
					'trust-1': 'Selalu gratis',
					'trust-2': 'Tanpa daftar',
					'trust-3': 'Berlaku di semua negara',
					'hero-sub': 'Kalkulator pinjaman, bunga majemuk, penghematan refinansi, konverter mata uang langsung, harga emas, minyak, dan saham langsung: semua gratis, instan, tanpa daftar.',
					'faq-heading': 'Pertanyaan umum tentang pinjaman, tabungan, dan mata uang',
					'chart-center-lbl': 'pokok',
					'chart-stat-principal': 'Pokok yang dipinjam',
					'chart-stat-interest': 'Total bunga dibayar',
					'chart-stat-total': 'Total yang dibayar',
					'chart-stat-payoff': 'Pinjaman lunas',
					'breakdown-sub': 'Bagaimana total biaya Anda terbagi antara jumlah yang dipinjam dan bunga yang dibayarkan kepada pemberi pinjaman.',
					'amort-sub': 'Rincian tahunan setiap pembayaran.',
					'ci-section-sub': 'Lihat bagaimana tabungan atau investasi Anda tumbuh tahun demi tahun dengan bunga majemuk.',
					'cur-section-sub': 'Konversi antar mata uang utama dengan kurs langsung. Harga emas dan minyak dalam mata uang lokal Anda.',
					'ci-chart-sub': 'Saldo di akhir setiap tahun, terbagi antara setoran Anda dan pertumbuhan bunga majemuk.',
					'per-oz-usd': 'per troy ounce dalam USD',
					'per-bbl-usd': 'per barel dalam USD',
					'lbl-stocks': 'Saham',
					'lbl-tab-currency': 'Mata Uang',
					'lbl-tab-commodities': 'Komoditas',
					'lbl-tab-stocks': 'Saham',
					'age-just-now': 'baru saja',
					'age-min-ago': '{n} mnt lalu',
					'age-hours-ago': '{n} jam lalu',
					'lbl-currencies': 'mata uang',
					'lbl-rates-from': 'Kurs dari',
					'lbl-from': 'Dari',
					'nav-faq': 'FAQ',
					'unit-mo': '/bln',
					'weight-1g': '1g',
					'weight-10g': '10g',
					'weight-1kg': '1 kg',
					'weight-5bbl': '5 barel',
					'weight-10bbl': '10 barel',
					'weight-100bbl': '100 barel',
					'lbl-price-unavailable': 'Harga tidak tersedia',
					'lbl-updating': 'Memperbarui…',
					'lbl-partial-rates': 'Kurs sebagian',
					'rf-sub': 'Per bulan dengan suku bunga baru',
					'rf-verdict-init': 'Masukkan detail pinjaman Anda untuk melihat apakah refinansi menguntungkan.',
					'rf-verdict-higher': 'Suku bunga baru tidak lebih rendah: refinansi akan meningkatkan cicilan Anda.',
					'rf-verdict-long': 'Ada penghematan bulanan tetapi titik impas melebihi sisa jangka waktu. Tidak disarankan.',
					'rf-verdict-good': 'Refinansi tampaknya menguntungkan.',
					'rf-verdict-summary': 'Hemat {monthly}/bulan dan balik modal dalam {breakeven}. Total penghematan: {total}.',
					'rf-never': 'Tidak pernah',
					'rf-over-term': '>{n} thn',
					'rf-months': '{n} bln',
					'rf-years-mo': '{y}t {m}b',
					'loan-desc': 'Gunakan kalkulator gratis ini untuk cicilan bulanan KPR, kredit mobil, pinjaman pribadi, atau pinjaman pelajar Anda.',
					'ci-desc': 'Kalkulator bunga majemuk menunjukkan bagaimana setoran awal tumbuh ketika bunga dihitung atas pokok yang terakumulasi.',
					'rf-desc': 'Kalkulator refinansi membantu Anda memutuskan apakah refinansi menguntungkan.',
					'cur-desc': 'Konverter LoanCalc mendukung 161 mata uang dunia dengan kurs langsung yang diperbarui setiap 24 jam.',
					'how-p1': 'Setiap pinjaman suku bunga tetap menggunakan rumus amortisasi standar yang sama.',
					'how-p2': 'Tiga faktor mengontrol cicilan bulanan Anda.',
					'unit-years': 'tahun',
					'unit-yr': 'thn',
					'unit-yrs': 'thn',
					'ci-earned-short': 'Pertumbuhan',
					'cur-rate-lbl': 'Kurs',
					'cur-inverse-lbl': 'Kebalikan',
					'cur-updated-lbl': 'Diperbarui',
					'how-formula-h': 'Rumusnya',
					'how-lower-h': 'Cara menurunkan cicilan bulanan Anda',
					'formula-m': 'Cicilan bulanan',
					'formula-p': 'Pokok (jumlah pinjaman)',
					'formula-r': 'Tingkat bulanan (tahunan ÷ 12)',
					'formula-n': 'Total pembayaran (tahun × 12)',
					'tip-1': 'Uang muka lebih besar mengurangi pokok langsung: meminjam lebih sedikit berarti cicilan lebih rendah dan total bunga lebih sedikit.',
					'tip-2': 'Jangka waktu lebih panjang menyebarkan pembayaran ke lebih banyak bulan. Cicilan turun, tetapi total bunga meningkat.',
					'tip-3': 'Suku bunga lebih rendah memiliki efek kumulatif: bahkan selisih 0,5% pada pinjaman besar menghemat puluhan juta.',
					'tip-4': 'Memperbaiki skor kredit sebelum mengajukan biasanya memberikan akses ke suku bunga lebih baik.',
					'faq-q1': 'Bagaimana cicilan pinjaman bulanan dihitung?',
					'faq-q2': 'Apa itu jadwal amortisasi?',
					'faq-q3': 'Apakah kalkulator ini bekerja untuk semua negara?',
					'faq-q4': 'Bagaimana cara mengurangi total bunga yang saya bayar?',
					'faq-q5': 'Apakah LoanCalc sepenuhnya gratis?',
					'faq-q6': 'Bagaimana kalkulator refinansi bekerja?',
					'faq-q7': 'Bagaimana harga emas dihitung dan diperbarui?',
					'faq-q8': 'Mata uang apa saja yang didukung konverter?',
					'loan-label-mortgage': 'KPR tetap 30 tahun',
					'loan-label-car': 'Kredit mobil 5 tahun',
					'loan-label-personal': 'Pinjaman pribadi 3 tahun',
					'loan-label-student': 'Pinjaman pelajar 10 tahun',
					'helper-title-mortgage': 'KPR tipikal 30 tahun',
					'helper-title-car': 'Kredit mobil tipikal',
					'helper-title-personal': 'Pinjaman pribadi tipikal',
					'helper-title-student': 'Pinjaman pelajar federal (AS)',
					'helper-text-mortgage': 'Rata-rata suku bunga tetap 30 tahun: 6,5–7%.',
					'helper-text-car': 'Rata-rata suku bunga kredit mobil baru: 6–8%.',
					'helper-text-personal': 'Suku bunga pinjaman pribadi berkisar dari 6% hingga 36%.',
					'helper-text-student': 'Suku bunga pinjaman pelajar federal ditetapkan oleh Kongres setiap tahun.',
					'hero-h1': 'Suite <em>Kalkulator</em><br>Keuangan Gratis',
					'faq-q9': 'Harga saham apa yang ditampilkan LoanCalc?',
					'extra-label': 'Pembayaran bulanan ekstra',
					'lbl-amount': 'Jumlah pinjaman',
					'lbl-rate': 'Suku bunga tahunan',
					'lbl-term': 'Jangka waktu pinjaman',
					'res-monthly': 'Cicilan bulanan',
					'freq-monthly': 'Bulanan',
					'freq-biweekly': 'Dua mingguan',
					'freq-per-2wk': '/ 2 minggu',
					'res-principal': 'Pokok',
					'res-interest': 'Total bunga',
					'res-total': 'Total biaya',
					'monthly-note': 'Hanya pokok dan bunga, tidak termasuk pajak, asuransi, dan biaya',
					'hero-headline': 'Kenali angka-angkamu.',
					'hero-subtitle': 'Kalkulator gratis untuk KPR, tabungan, refinansiasi, dan kurs mata uang.',
					'hero-h1': 'Kenali angka-angkamu.',
					'hero-stat-currencies': 'Mata Uang',
					'hero-stat-langs': 'Bahasa',
					'hero-stat-tools': 'Alat',
					'res-year': 'Tahun pelunasan',
					'lbl-principal-pct': 'Pokok',
					'lbl-interest-pct': 'Bunga',
					'section-breakdown': 'Rincian pembayaran',
					'section-amort': 'Jadwal amortisasi',
					'amort-year': 'Tahun',
					'amort-month': 'Bulan',
					'amort-start': 'Saldo awal',
					'amort-ppaid': 'Pokok dibayar',
					'amort-ipaid': 'Bunga dibayar',
					'amort-end': 'Saldo akhir',
					'btn-show-all': 'Tampilkan semua tahun',
					'btn-show-all-months': 'Tampilkan semua bulan',
					'btn-show-less': 'Tampilkan lebih sedikit',
					'amort-gran-yearly': 'Tahunan',
					'amort-gran-monthly': 'Bulanan',
					'section-how': 'Cara menghitung cicilan pinjaman',
					'section-faq': 'Pertanyaan yang sering diajukan',
					'ci-h2': 'Kalkulator bunga majemuk dan pertumbuhan tabungan',
					'ci-label-principal': 'Setoran awal',
					'ci-label-monthly': 'Kontribusi bulanan',
					'ci-label-rate': 'Tingkat pengembalian tahunan',
					'ci-label-years': 'Periode investasi',
					'ci-result-label': 'Nilai masa depan',
					'ci-sub': 'Total portofolio setelah',
					'ci-deposited': 'Total disetor',
					'ci-earned': 'Bunga diperoleh',
					'ci-mult': 'Kelipatan pertumbuhan',
					'ci-year': 'Tahun target',
					'ci-chart-h': 'Pertumbuhan tahun per tahun',
					'rf-h2': 'Kalkulator refinansi: berapa yang akan Anda hemat?',
					'rf-current': 'Pinjaman saat ini',
					'rf-new': 'Penawaran pinjaman baru',
					'rf-balance': 'Saldo tersisa',
					'rf-oldrate': 'Suku bunga saat ini',
					'rf-remaining': 'Tahun tersisa',
					'rf-newrate': 'Suku bunga baru',
					'rf-costs': 'Biaya penutupan',
					'rf-monthly': 'Penghematan bulanan',
					'rf-old': 'Cicilan lama',
					'rf-new-pay': 'Cicilan baru',
					'rf-breakeven': 'Titik impas',
					'rf-total': 'Total penghematan seumur hidup',
					'cur-h2': 'Konverter mata uang langsung, harga emas, minyak, dan saham hari ini',
					'gold-local-lbl': 'Harga dalam mata uang Anda',
					'oil-local-lbl': 'Harga dalam mata uang Anda',
					'footer-mortgage': 'Kalkulator KPR',
					'footer-loan': 'Kalkulator Pinjaman',
					'footer-savings': 'Kalkulator Tabungan',
					'footer-refinance': 'Kalkulator Refinansi',
					'footer-currency': 'Konverter Mata Uang',
					'footer-privacy': 'Kebijakan Privasi',
					'footer-dnsmi': 'Jangan Jual atau Bagikan Informasi Pribadi Saya',
					'footer-rights': 'Hak cipta dilindungi.',
					'footer-desc': 'Kalkulator keuangan gratis: pinjaman, tabungan, refinansi, mata uang. Tanpa akun diperlukan.',
					'footer-disclaimer': 'LoanCalc memberikan estimasi hanya untuk tujuan informasi. Ini bukan saran keuangan.',
					'seo-mort-h2': 'Kalkulator KPR: Semua yang Perlu Anda Ketahui',
					'seo-mort-h3-1': 'Apa itu kalkulator KPR dan siapa yang harus menggunakannya?',
					'seo-mort-p1': 'Kalkulator KPR adalah alat keuangan yang menghitung cicilan bulanan pinjaman rumah berdasarkan tiga input: jumlah pinjaman (pokok), tingkat bunga tahunan, dan jangka waktu pinjaman dalam tahun. Siapa pun yang mempertimbangkan membeli rumah, membandingkan penawaran pinjaman, atau mencoba memahami biaya pinjaman jangka panjang harus menggunakannya sebelum menandatangani perjanjian KPR.',
					'seo-mort-p2': 'Pembeli rumah pertama kali menggunakan kalkulator KPR untuk memeriksa keterjangkauan sebelum mencari rumah. Pemilik rumah yang ada menggunakannya untuk menjelajahi skenario refinansi atau memodelkan dampak pembayaran ekstra. Investor properti menggunakannya untuk memperkirakan arus kas properti sewaan. Kalkulator ini bekerja secara identik untuk KPR suku bunga tetap di seluruh dunia — baik Anda meminjam dalam USD, EUR, GBP, atau mata uang lainnya.',
					'seo-mort-h3-2': 'Cara kerja rumus cicilan bulanan',
					'seo-mort-p3': 'Setiap KPR suku bunga tetap menggunakan rumus amortisasi standar yang sama:',
					'seo-mort-formula': '<strong>M = P × [ r(1+r)ⁿ ] ÷ [ (1+r)ⁿ − 1 ]</strong>',
					'seo-mort-p5': 'Di mana <strong>M</strong> adalah cicilan bulanan Anda, <strong>P</strong> adalah jumlah pokok pinjaman, <strong>r</strong> adalah tingkat bunga bulanan (tingkat tahunan ÷ 12), dan <strong>n</strong> adalah total jumlah cicilan bulanan (tahun × 12). Rumus ini menghasilkan jumlah bulanan tetap yang mencakup bunga atas saldo yang tersisa dan sebagian pokok, dengan rasio yang berubah seiring waktu. Di tahun-tahun awal, sebagian besar setiap pembayaran adalah bunga. Di tahun-tahun terakhir, sebagian besar mengurangi pokok.',
					'seo-mort-h3-3': 'Apa yang mempengaruhi suku bunga KPR Anda?',
					'seo-mort-p6': 'Suku bunga KPR Anda yang sebenarnya tergantung pada beberapa faktor yang dievaluasi pemberi pinjaman saat menyetujui permohonan Anda:',
					'seo-mort-li-1': '<strong>Skor kredit:</strong> Peminjam dengan skor di atas 760 biasanya mendapatkan suku bunga terendah. Setiap penurunan 20 poin dalam skor kredit dapat meningkatkan suku bunga Anda sebesar 0,1–0,5%, menambahkan ribuan dalam total bunga selama 30 tahun.',
					'seo-mort-li-2': '<strong>Rasio pinjaman terhadap nilai (LTV):</strong> LTV yang lebih rendah (uang muka yang lebih besar) menandakan risiko yang lebih kecil bagi pemberi pinjaman. Membayar uang muka 20% atau lebih biasanya menghilangkan asuransi hipotek swasta (PMI) dan mungkin memenuhi syarat Anda untuk suku bunga yang lebih baik.',
					'seo-mort-li-3': '<strong>Jenis pinjaman:</strong> Pinjaman konvensional (dalam batas Fannie Mae/Freddie Mac) biasanya memiliki suku bunga lebih rendah dari pinjaman jumbo. Pinjaman yang dijamin pemerintah (FHA, VA, USDA) memiliki struktur suku bunga tersendiri.',
					'seo-mort-li-4': '<strong>Jangka waktu pinjaman:</strong> KPR 15 tahun memiliki suku bunga lebih rendah dari KPR 30 tahun karena uang pemberi pinjaman berisiko untuk waktu yang lebih singkat.',
					'seo-mort-li-5': '<strong>Kondisi pasar:</strong> Suku bunga KPR sangat dipengaruhi oleh imbal hasil obligasi pemerintah 10 tahun dan kebijakan Federal Reserve. Ketika Fed menaikkan suku bunga untuk memerangi inflasi, suku bunga KPR cenderung ikut naik.',
					'seo-mort-h3-4': 'KPR 15 tahun vs 30 tahun: pertukaran nyata',
					'seo-mort-p12': 'Pilihan antara KPR 15 tahun dan 30 tahun pada dasarnya adalah pertukaran antara arus kas bulanan dan total bunga yang dibayarkan. Berikut contoh untuk pinjaman $300.000:',
					'seo-mort-th-loan': 'Pinjaman',
					'seo-mort-th-rate': 'Suku bunga',
					'seo-mort-p13': 'Pada 6,5%, KPR 30 tahun menghabiskan total bunga $382.633 versus $170.453 untuk KPR 15 tahun — selisih lebih dari $212.000. Namun, cicilan bulanan KPR 30 tahun $718 lebih rendah, yang sangat penting jika arus kas ketat atau Anda ingin menginvestasikan selisihnya.',
					'seo-mort-h3-5': 'Apa itu PMI dan kapan berlaku?',
					'seo-mort-p14': 'Asuransi hipotek swasta (PMI) diwajibkan oleh sebagian besar pemberi pinjaman AS ketika uang muka Anda kurang dari 20% dari harga beli rumah. PMI melindungi pemberi pinjaman jika Anda gagal bayar. Biaya umum adalah 0,5–1,5% dari jumlah pinjaman per tahun, ditambahkan ke cicilan bulanan Anda. Pada pinjaman $300.000, PMI dapat menambah $125–$375 per bulan. Setelah ekuitas Anda mencapai 20% (melalui pembayaran atau apresiasi rumah), Anda biasanya dapat meminta pembatalan PMI. Pemberi pinjaman harus membatalkan PMI secara otomatis ketika saldo pinjaman Anda mencapai 78% dari harga beli asli.',
					'seo-mort-h3-6': 'Cara melunasi KPR lebih cepat',
					'seo-mort-li-6': '<strong>Lakukan satu pembayaran ekstra per tahun:</strong> Pada KPR 30 tahun, satu pembayaran bulanan tambahan per tahun mengurangi jangka waktu pinjaman sekitar 4–5 tahun dan menghemat puluhan juta dalam bunga.',
					'seo-mort-li-7': '<strong>Beralih ke pembayaran dua mingguan:</strong> Alih-alih 12 pembayaran bulanan, lakukan 26 setengah-pembayaran per tahun. Ini menghasilkan satu pembayaran penuh ekstra setiap tahun tanpa Anda merasakan dampak arus kas yang signifikan.',
					'seo-mort-li-8': '<strong>Bulatkan pembayaran Anda:</strong> Jika pembayaran Anda $1.847, membayar $1.900 atau $2.000 setiap bulan mengarahkan jumlah ekstra seluruhnya ke pokok, mempercepat pelunasan.',
					'seo-mort-li-9': '<strong>Manfaatkan uang tak terduga:</strong> Pengembalian pajak, bonus, atau warisan yang diterapkan sebagai pembayaran pokok sekaligus dapat memangkas bertahun-tahun dari jangka waktu KPR Anda.',
					'seo-mort-p15': 'Juga berguna: <a href="/refinance-calculator/">Kalkulator Refinansi</a> — lihat apakah suku bunga lebih rendah masuk akal untuk KPR Anda saat ini. Atau jelajahi <a href="/loan-calculator/">jenis pinjaman lainnya</a> termasuk kredit mobil, pinjaman pribadi, dan pinjaman pelajar.',
					'seo-ci-h2': 'Bunga majemuk dan tabungan: panduan lengkap',
					'seo-ci-h3-1': 'Apa itu bunga majemuk dan mengapa penting?',
					'seo-ci-h3-2': 'Pemajemukan harian vs bulanan vs tahunan — bagaimana memengaruhi pertumbuhan',
					'seo-ci-h3-3': 'Aturan 72 dijelaskan',
					'seo-ci-h3-4': 'Biaya menunggu: mulai pada 25, 35, atau 45 tahun',
					'seo-ci-h3-5': 'Rekening tabungan hasil tinggi vs reksa dana indeks: suku bunga umum',
					'seo-ci-p1': 'Bunga majemuk adalah bunga yang dihitung atas pokok awal dan bunga yang telah terakumulasi dari semua periode sebelumnya. Ini sangat berbeda dari bunga sederhana, yang hanya dihitung atas pokok asli. Albert Einstein sering dikutip menyebut bunga majemuk sebagai "keajaiban dunia kedelapan. Siapa yang memahaminya, mendapatkannya; siapa yang tidak, membayarnya."',
					'seo-ci-p2': 'Alasan bunga majemuk begitu kuat adalah pertumbuhan eksponensial. Pada tahun-tahun awal, efeknya halus. Namun selama 20, 30, atau 40 tahun, efek pemajemukan menjadi luar biasa — sebagian besar kekayaan akhir Anda bukan berasal dari kontribusi Anda tetapi dari bunga yang diperoleh atas bunga yang diperoleh atas bunga.',
					'seo-ci-p3': 'Frekuensi pemajemukan menentukan seberapa sering bunga dihitung dan ditambahkan ke saldo. Pemajemukan lebih sering berarti imbal hasil sedikit lebih tinggi:',
					'seo-ci-p4': 'Untuk rekening tabungan dan reksa dana pasar uang, pemajemukan bulanan adalah standar. Rekening tabungan hasil tinggi di bank online biasanya memajemukkan harian. Perbedaan antara pemajemukan bulanan dan harian kecil — suku bunga itu sendiri jauh lebih penting daripada frekuensi pemajemukan.',
					'seo-ci-p5': 'Aturan 72 adalah jalan pintas matematika mental sederhana: bagi 72 dengan tingkat pengembalian tahunan Anda untuk memperkirakan berapa tahun yang diperlukan agar investasi Anda berlipat ganda nilainya.',
					'seo-ci-p6': 'Aturan ini juga berlaku sebaliknya: jika Anda ingin uang Anda berlipat ganda dalam 8 tahun, Anda memerlukan tingkat setidaknya 72 ÷ 8 = 9% per tahun.',
					'seo-ci-p7': 'Faktor paling kuat dalam tabungan adalah waktu. Pertimbangkan berinvestasi $200 per bulan dengan pengembalian tahunan 7% tanpa setoran awal:',
					'seo-ci-p8': 'Mulai pada 25 alih-alih 35 hanya memerlukan $24.000 lebih dalam kontribusi tetapi menghasilkan $285.000 lebih banyak kekayaan — pengembalian 12x atas $24.000 tambahan itu. Pesannya jelas: mulailah lebih awal, bahkan dengan jumlah kecil.',
					'seo-ci-p9': 'Tingkat pengembalian yang Anda pilih dalam kalkulator ini harus mencerminkan di mana Anda sebenarnya akan menyimpan tabungan Anda:',
					'seo-ci-p10': 'Lihat juga: <a href="/refinance-calculator/">Kalkulator Refinansi</a> — bunga yang Anda hemat dari refinansi hipotek dapat dialihkan ke tabungan.',
					'seo-ci-li-1': '<strong>Pemajemukan tahunan:</strong> Bunga ditambahkan sekali per tahun. Tingkat dasar.',
					'seo-ci-li-2': '<strong>Pemajemukan bulanan:</strong> Bunga ditambahkan 12 kali per tahun. Tingkat tahunan 6% yang dimajemukkan bulanan setara dengan tingkat tahunan efektif sebesar 6,168%.',
					'seo-ci-li-3': '<strong>Pemajemukan harian:</strong> Bunga ditambahkan 365 kali per tahun. Tingkat 6% yang dimajemukkan harian memberikan tingkat efektif sebesar 6,183%. Sedikit lebih baik dari bulanan.',
					'seo-ci-li-4': 'Pada 4% (tabungan hasil tinggi): 72 ÷ 4 = <strong>18 tahun</strong> untuk berlipat ganda',
					'seo-ci-li-5': 'Pada 7% (rata-rata pasar saham): 72 ÷ 7 = <strong>10,3 tahun</strong> untuk berlipat ganda',
					'seo-ci-li-6': 'Pada 10% (pertumbuhan agresif): 72 ÷ 10 = <strong>7,2 tahun</strong> untuk berlipat ganda',
					'seo-ci-li-7': 'Pada 12% (imbal hasil ventura): 72 ÷ 12 = <strong>6 tahun</strong> untuk berlipat ganda',
					'seo-ci-li-8': '<strong>Rekening tabungan tradisional:</strong> 0,01–0,5% APY. Efektif kehilangan nilai terhadap inflasi. Hanya cocok untuk dana darurat yang perlu diakses segera.',
					'seo-ci-li-9': '<strong>Rekening tabungan hasil tinggi (bank online):</strong> 4–5% APY di lingkungan suku bunga tinggi. Dijamin FDIC. Sangat baik untuk dana darurat dan tujuan jangka pendek (1–3 tahun).',
					'seo-ci-li-10': '<strong>Rekening pasar uang:</strong> 4–5% APY. Mirip dengan HYSA dengan ketentuan akses yang sedikit berbeda.',
					'seo-ci-li-11': '<strong>Sertifikat deposito (CD):</strong> 4–5,5% APY dengan penguncian 6 bulan hingga 5 tahun. Suku bunga lebih tinggi untuk jangka waktu lebih panjang.',
					'seo-ci-li-12': '<strong>Reksa dana indeks S&amp;P 500:</strong> ~10% pengembalian nominal rata-rata (7% setelah inflasi) secara historis. Tidak dijamin. Terbaik untuk tujuan 5+ tahun. Tunduk pada volatilitas pasar.',
					'seo-ci-li-13': '<strong>Reksa dana pasar obligasi total:</strong> 3–5% secara historis. Volatilitas lebih rendah dari saham. Cocok untuk tujuan jangka menengah.',
					'seo-ci-th-start': 'Usia mulai',
					'seo-ci-th-end': 'Usia selesai',
					'seo-ci-th-years': 'Tahun diinvestasikan',
					'seo-ci-th-contributed': 'Total dikontribusikan',
					'seo-ci-th-final': 'Nilai akhir',
					'seo-ci-th-interest': 'Bunga diperoleh',
					'seo-rf-h2': 'Refinansi KPR Anda: kapan masuk akal',
					'seo-rf-h3-1': 'Kapan refinansi masuk akal secara finansial',
					'seo-rf-h3-2': 'Cara menghitung titik impas',
					'seo-rf-h3-3': 'Refinansi penarikan tunai vs refinansi suku bunga dan jangka waktu',
					'seo-rf-h3-4': 'Biaya tersembunyi refinansi',
					'seo-rf-h3-5': 'Kapan TIDAK boleh refinansi',
					'seo-rf-p1': 'Refinansi menggantikan pinjaman Anda yang ada dengan yang baru, idealnya dengan suku bunga yang lebih rendah. Keputusan bermuara pada satu pertanyaan mendasar: apakah tabungan jangka panjang akan melebihi biaya di muka, dan apakah Anda akan bertahan dalam pinjaman cukup lama untuk memulihkan biaya tersebut? Refinansi paling masuk akal ketika:',
					'seo-rf-p2': 'Perhitungan titik impas itu sederhana: bagi total biaya penutupan Anda dengan penghematan bulanan Anda.',
					'seo-rf-formula': '<strong>Bulan titik impas = Biaya penutupan ÷ Penghematan pembayaran bulanan</strong>',
					'seo-rf-p3': 'Contoh: Jika refinansi menelan biaya $4.500 dalam biaya penutupan dan menghemat $200 per bulan, titik impasnya adalah 4.500 ÷ 200 = 22,5 bulan — sekitar 2 tahun. Jika Anda berencana tinggal di rumah setidaknya 3–5 tahun lagi, refinansi ini jelas masuk akal secara finansial. Jika Anda berencana pindah dalam 18 bulan, tidak.',
					'seo-rf-p4': 'Ada dua jenis utama refinansi KPR:',
					'seo-rf-p5': 'Biaya sebenarnya dari refinansi melampaui biaya penutupan yang dinyatakan. Biaya umum meliputi:',
					'seo-rf-p6': 'Total biaya penutupan untuk refinansi tipikal berkisar 2–3% dari jumlah pinjaman. Untuk pinjaman $300.000, perkirakan biaya $6.000–$9.000 kecuali Anda memilih refinansi "tanpa biaya penutupan" (di mana biaya dimasukkan ke dalam suku bunga).',
					'seo-rf-p7': 'Lihat juga: <a href="/loan-calculator/">Kalkulator KPR</a> — modelkan KPR asal Anda atau bandingkan opsi pinjaman sebelum memutuskan untuk refinansi.',
					'seo-rf-li-1': 'Suku bunga baru Anda setidaknya 0,5–1% lebih rendah dari suku bunga Anda saat ini',
					'seo-rf-li-2': 'Anda berencana tinggal di rumah lebih lama dari periode titik impas',
					'seo-rf-li-3': 'Skor kredit Anda telah meningkat secara signifikan sejak pinjaman awal Anda',
					'seo-rf-li-4': 'Anda ingin beralih dari KPR suku bunga variabel ke suku bunga tetap untuk stabilitas',
					'seo-rf-li-5': 'Anda ingin mempersingkat jangka waktu pinjaman (mis. dari 30 tahun menjadi 15 tahun) dan mampu membayar cicilan bulanan lebih tinggi',
					'seo-rf-li-6': '<strong>Refinansi suku bunga dan jangka waktu:</strong> Anda mengganti KPR yang ada dengan yang baru pada suku bunga yang lebih baik dan/atau jangka waktu berbeda, tanpa mengubah saldo pinjaman. Ini adalah jenis yang paling umum dan apa yang dimodelkan kalkulator ini. Tujuannya semata-mata untuk mengurangi biaya bunga Anda.',
					'seo-rf-li-7': '<strong>Refinansi penarikan tunai:</strong> Anda meminjam lebih dari saldo pinjaman Anda saat ini, menerima selisihnya sebagai uang tunai. Misalnya, jika rumah Anda senilai $400.000 dan Anda berutang $250.000, Anda mungkin refinansi sebesar $320.000 dan mengambil $70.000 tunai. Refinansi penarikan tunai mereset ekuitas Anda dan biasanya memiliki suku bunga sedikit lebih tinggi.',
					'seo-rf-li-8': '<strong>Biaya originasi:</strong> 0,5–1% dari jumlah pinjaman. Biaya pemberi pinjaman untuk memproses pinjaman baru.',
					'seo-rf-li-9': '<strong>Biaya penilaian:</strong> $300–$600. Sebagian besar pemberi pinjaman memerlukan penilaian baru untuk mengkonfirmasi nilai rumah Anda saat ini.',
					'seo-rf-li-10': '<strong>Asuransi judul:</strong> $500–$1.500. Diperlukan untuk melindungi pemberi pinjaman dari sengketa judul.',
					'seo-rf-li-11': '<strong>Biaya pencatatan:</strong> $25–$250. Biaya pemerintah untuk mencatat KPR baru.',
					'seo-rf-li-12': '<strong>Poin diskon:</strong> Bunga prabayar opsional untuk "membeli turun" suku bunga Anda. Satu poin = 1% dari jumlah pinjaman = biasanya pengurangan suku bunga 0,25%.',
					'seo-rf-li-13': '<strong>Anda akan segera pindah:</strong> Jika Anda akan menjual rumah sebelum mencapai titik impas, refinansi lebih mahal daripada hemat.',
					'seo-rf-li-14': '<strong>Penalti pelunasan awal:</strong> Beberapa pinjaman membebankan biaya untuk melunasi lebih awal. Verifikasi ketentuan pinjaman Anda saat ini sebelum refinansi.',
					'seo-rf-li-15': '<strong>Anda telah melunasi sebagian besar pinjaman:</strong> Mengatur ulang ke jangka waktu baru 30 tahun pada pinjaman yang telah berjalan 20 tahun memperpanjang utang Anda secara signifikan, meskipun suku bunganya lebih rendah.',
					'seo-rf-li-16': '<strong>Skor kredit Anda turun:</strong> Jika kredit Anda memburuk sejak KPR asal Anda, Anda mungkin tidak memenuhi syarat untuk suku bunga yang lebih baik dan bisa mendapatkan suku bunga yang lebih tinggi.',
					'seo-cur-h2': 'Konverter Mata Uang, Emas, Minyak, dan Harga Saham: Cara Kerja Kurs Langsung',
					'seo-cur-h3-1': 'Cara kerja kurs tukar langsung',
					'seo-cur-p1': 'Kurs tukar mata uang ditentukan oleh pasar valuta asing (forex), pasar keuangan terbesar di dunia dengan volume perdagangan harian lebih dari $7 triliun. Kurs "langsung" yang ditampilkan di situs ini adalah kurs pasar menengah (juga disebut kurs antarbank atau kurs spot), yaitu titik tengah antara harga beli dan jual yang digunakan bank dalam transaksi volume besar satu sama lain.',
					'seo-cur-p2': 'Kurs yang ditampilkan di sini bersumber dari API Frankfurter, yang mengumpulkan data dari Bank Sentral Eropa dan sumber keuangan lainnya. Diperbarui setiap hari dan di-cache untuk performa. Untuk kurs real-time dengan akurasi milidetik, trader institusional menggunakan platform forex khusus — tetapi untuk perencanaan perjalanan, transfer internasional, dan referensi umum, kurs ini akurat dalam sepersekian persen.',
					'seo-cur-h3-2': 'Apa yang memengaruhi kurs tukar mata uang',
					'seo-cur-p3': 'Kurs tukar terus berubah berdasarkan kombinasi kompleks faktor ekonomi dan politik:',
					'seo-cur-li-1': '<strong>Perbedaan suku bunga:</strong> Ketika bank sentral menaikkan suku bunga, mata uangnya biasanya menguat karena suku bunga lebih tinggi menarik modal asing yang mencari imbal hasil lebih baik. Keputusan Federal Reserve AS sering menggerakkan kurs tukar global.',
					'seo-cur-li-2': '<strong>Inflasi:</strong> Inflasi lebih tinggi mengikis daya beli mata uang dari waktu ke waktu. Negara dengan inflasi rendah dan stabil cenderung memiliki mata uang lebih kuat. Pasangan EUR/USD, misalnya, dipantau ketat untuk perbedaan inflasi antara AS dan Zona Euro.',
					'seo-cur-li-3': '<strong>Neraca perdagangan:</strong> Negara yang mengekspor lebih banyak dari impornya (surplus perdagangan) memiliki permintaan lebih tinggi untuk mata uangnya, mendorong nilainya naik. Negara dengan defisit perdagangan persisten mungkin mengalami pelemahan mata uang dari waktu ke waktu.',
					'seo-cur-li-4': '<strong>Stabilitas politik:</strong> Ketidakpastian politik, pemilu, atau konflik geopolitik dapat menyebabkan pergerakan mata uang yang cepat. Mata uang safe-haven seperti USD, CHF, dan JPY sering menguat selama krisis global.',
					'seo-cur-li-5': '<strong>Pertumbuhan PDB:</strong> Pertumbuhan ekonomi yang kuat meningkatkan permintaan mata uang saat investor mengalokasikan modal ke ekonomi tersebut.',
					'seo-cur-h3-3': 'Kurs pasar menengah vs kurs bank: mengapa ada selisih',
					'seo-cur-p4': 'Kurs yang ditampilkan pada konverter ini adalah kurs pasar menengah — titik tengah teoritis antara harga beli dan jual. Ketika Anda benar-benar menukar uang melalui bank, kartu kredit, atau layanan transfer uang, Anda akan mendapatkan kurs yang lebih buruk. Perbedaan ini disebut spread, dan itulah cara bisnis penukaran mata uang memperoleh keuntungan.',
					'seo-cur-li-6': '<strong>Bank dan kios bandara:</strong> Biasanya mengenakan biaya 3–10% di atas kurs pasar menengah. Terburuk untuk jumlah kecil dan lokasi wisata.',
					'seo-cur-li-7': '<strong>Kartu kredit:</strong> Biasanya mengenakan biaya transaksi luar negeri 1–3%. Seringkali pilihan terbaik untuk pembelian di luar negeri, terutama kartu tanpa biaya transaksi luar negeri.',
					'seo-cur-li-8': '<strong>Layanan transfer spesialis (Wise, Revolut):</strong> Mengenakan biaya 0,3–1% di atas kurs pasar menengah. Terbaik untuk transfer internasional besar.',
					'seo-cur-p5': 'Untuk menghitung apa yang sebenarnya akan Anda terima: ambil kurs pasar menengah dan kurangi persentase spread penyedia. Jika Anda melihat 1 USD = 0,92 EUR di pasar menengah dan bank Anda mengenakan biaya 3%, Anda akan menerima sekitar 0,92 × (1 - 0,03) = 0,892 EUR per dolar.',
					'seo-cur-h3-4': 'Emas sebagai lindung nilai mata uang: bagaimana XAU dihargai',
					'seo-cur-p6': 'Emas (simbol ticker XAU) dihargai dalam dolar AS per troy ons di pasar internasional. Troy ons adalah satuan standar untuk logam mulia dan setara dengan sekitar 31,1 gram (sedikit lebih berat dari ons avoirdupois standar sebesar 28,35 gram). Satu troy ons = 31,1035 gram tepatnya.',
					'seo-cur-p7': 'Emas berfungsi sebagai lindung nilai terhadap devaluasi mata uang dan inflasi. Ketika dolar AS melemah atau inflasi naik, harga emas sering naik — bukan karena emas itu sendiri berubah, tetapi karena lebih banyak dolar diperlukan untuk membeli berat emas yang sama. Emas telah mempertahankan daya belinya selama berabad-abad sementara mata uang individual mengalami inflasi. Harga emas di situs ini bersumber dari data pasar melalui Yahoo Finance, di-cache setiap jam.',
					'seo-cur-p8': 'Pergerakan harga emas didorong oleh: cadangan emas bank sentral, kekuatan dolar AS, suku bunga riil (ketika suku bunga riil rendah atau negatif, emas menjadi lebih menarik), risiko geopolitik, dan permintaan perhiasan/industri.',
					'seo-cur-h3-5': 'Minyak mentah WTI: mengapa dihargai dalam USD dan apa yang menggerakkan harga',
					'seo-cur-p9': 'West Texas Intermediate (WTI) adalah patokan minyak mentah utama untuk Amerika Utara dan referensi harga global yang penting. Dihargai dalam dolar AS per barel (1 barel = 42 galon AS = sekitar 159 liter). Minyak telah dihargai dalam USD sejak perjanjian Petrodolar tahun 1970-an, menciptakan permintaan global untuk dolar AS karena semua negara yang mengimpor minyak membutuhkan dolar untuk membayarnya.',
					'seo-cur-p10': 'Faktor-faktor kunci yang mendorong harga minyak:',
					'seo-cur-li-9': '<strong>Keputusan produksi OPEC+:</strong> Kartel OPEC dan produsen sekutu (Rusia, dll.) mengendalikan sekitar 40% pasokan global. Pemotongan produksi mendorong harga naik; kenaikan mendorongnya turun.',
					'seo-cur-li-10': '<strong>Produksi minyak serpih AS:</strong> AS menjadi produsen minyak terbesar di dunia sebagian karena teknologi serpih. Produksi AS yang lebih tinggi bersaing dengan OPEC dan dapat membatasi kenaikan harga.',
					'seo-cur-li-11': '<strong>Permintaan global:</strong> Pertumbuhan ekonomi di China dan India (konsumen minyak besar) adalah pendorong permintaan utama. Resesi mengurangi permintaan dan menekan harga turun.',
					'seo-cur-li-12': '<strong>Peristiwa geopolitik:</strong> Konflik di wilayah penghasil minyak (Timur Tengah, Rusia) menciptakan premi risiko pasokan yang mendorong harga lebih tinggi.',
					'seo-cur-li-13': '<strong>Kekuatan USD:</strong> Karena minyak dihargai dalam USD, dolar yang lebih kuat membuat minyak lebih mahal bagi pembeli non-AS, meredam permintaan dan memberikan tekanan ke bawah pada harga.',
					'seo-cur-h3-6': 'Harga saham langsung: ekuitas AS teratas diperbarui setiap jam',
					'seo-cur-p11': 'LoanCalc menampilkan harga langsung untuk sepuluh saham dan dana AS yang banyak dipantau: Apple (AAPL), Microsoft (MSFT), Alphabet (GOOGL), Amazon (AMZN), Meta (META), NVIDIA (NVDA), Tesla (TSLA), JPMorgan Chase (JPM), Berkshire Hathaway B (BRK.B), dan SPDR S&P 500 ETF Trust (SPY). Harga diambil dari Yahoo Finance dan diperbarui setiap jam — interval yang sama dengan data emas dan minyak.',
					'seo-cur-p12': 'Setiap chip saham menampilkan harga saat ini dalam USD, perubahan persentase dari penutupan sebelumnya (panah hijau untuk keuntungan, merah untuk kerugian), dan harga setara dalam mata uang lokal Anda menggunakan kurs tukar langsung. Ini memudahkan pelacakan nilai posisi ekuitas AS dari mana saja di dunia tanpa berpindah aplikasi.',
					'seo-cur-p13': 'S&amp;P 500 ETF (SPY) disertakan sebagai tolok ukur pasar yang luas: ketika SPY naik, pasar AS secara umum sedang naik. Saham individual seperti NVDA dan TSLA memiliki volatilitas lebih tinggi. Gunakan <a href="/savings-calculator/">Kalkulator Tabungan</a> dengan imbal hasil tahunan 7–10% untuk memodelkan pertumbuhan S&amp;P 500 jangka panjang.',
					'seo-cur-p14': 'Lihat juga: <a href="/savings-calculator/">Kalkulator Tabungan</a> — modelkan bagaimana imbal hasil mata uang atau investasi terkait komoditas tumbuh dari waktu ke waktu.',
					'lbl-market-prices': 'Harga pasar',
					'cur-rate-unavailable': 'Kurs tidak tersedia',
					'cur-not-in-feed': 'Tidak ada dalam umpan langsung',
					'cur-today': 'hari ini',
					'cur-status-fetching': 'Mengambil kurs valuta asing…',
					'cur-status-live': 'Kurs langsung · {date} · 161 mata uang · diperbarui setiap 24 jam',
					'cur-status-partial': 'Kurs dimuat · {date} (33 mata uang)',
					'cur-status-offline': 'Kurs offline: mata uang terbatas tersedia',
					'cmd-fetching': 'Memuat…',
					'cmd-live': 'Langsung · {date}',
					'cmd-approx': 'Perkiraan · periksa data langsung',
					'cur-status-cached': 'Kurs dari {date} · disimpan · diperbarui setiap 24 jam',
					'clamp-min': 'Minimum:',
					'clamp-max': 'Maksimum:',
					'gold-title': 'Emas (XAU)',
					'gold-sub': 'Harga per troy ounce',
					'oil-title': 'Minyak Mentah (WTI)',
					'oil-sub': 'Harga per barel',
					'ci-helper-title': 'Tentang nilai default 7%',
					'ci-helper-text': 'Dana indeks ekuitas global secara historis menghasilkan sekitar 6–8% per tahun setelah inflasi. Sesuaikan tingkat di atas untuk mencerminkan ekspektasi Anda sendiri.'
				}
			};

		function l() {
			try {
				return JSON.parse(localStorage.getItem(e)) || {};
			} catch (e) {
				return {};
			}
		}

		function u(e) {
			var a = s[e] || s.en,
				n = s.en;

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
			(b && ((b.dataset.showAll = r('btn-show-all')), (b.dataset.showLess = r('btn-show-less'))));
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
			if ((w && r('faq-heading') && (w.textContent = r('faq-heading')), m('footer-desc-el', 'footer-desc'), m('footer-disclaimer-el', 'footer-disclaimer'), (window.APP_LANG = e), (window._i18n_current = a), (window._i18n_en = s.en), window._currentTab && window.switchTab)) {
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
						'extra-savings-html': 'Remboursez <strong>{yrs} ans plus tôt</strong> &nbsp;&middot;&nbsp; Économisez <strong>{saved}</strong> d\'intérêts'
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
					if (s[e]) { var a = _ui[e]; for (var r in a) s[e][r] = a[r]; }
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
			m = 'localhost' === location.hostname || '127.0.0.1' === location.hostname ? 'http://localhost:8787' : '';

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
										'<div style="font-size:11px;color:var(--color-muted)">' +
										a.toLocaleString('en-US') +
										' ' +
										e +
										'</div><div style="font-size:13px;font-weight:500;color:var(--color-navy);white-space:nowrap">' +
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
						localStorage.setItem('loancalc_fx_prev', JSON.stringify({ rates: _exP.rates, ts: _exP.ts }));
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
							} else (f('stocks-dot', 'error'), n && (n.textContent = h('lbl-price-unavailable')));
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
		H && H.addEventListener('click', function () { C('CL=F', 'oil'); });
		var Hsi = document.getElementById('silver-refresh-btn');
		(Hsi && Hsi.addEventListener('click', function () { C('SI=F', 'silver'); }),
			setInterval(function () {
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
						if (i < 24) {
							((a = t.rates), (n = t.date), (r = t.count || Object.keys(t.rates).length), (u.fx = t.ts));
							var s = i >= 6;
							f('cur-dot', s ? 'stale' : 'live');
							var l = k(t.ts),
								d = document.getElementById('cur-status-text');
							try { var _pv2 = localStorage.getItem('loancalc_fx_prev'); if (_pv2) prevA = JSON.parse(_pv2).rates; } catch (_) {}
							if (!prevA) { fetch('/api/fx-prev').then(function(r){ return r.json(); }).then(function(d){ if (d.prev) { prevA = d.prev; y(); } }).catch(function(){}); }
							return (d && (d.textContent = (s ? h('lbl-rates-from') + ' ' + l : h('cur-updated-lbl') + ' ' + l) + ' · ' + r + ' ' + h('lbl-currencies')), v(), y(), void (s && A()));
						}
					}
				} catch (e) {}
				try {
					var _pv = localStorage.getItem('loancalc_fx_prev');
					if (_pv) prevA = JSON.parse(_pv).rates;
				} catch (_) {}
				if (!prevA) {
					fetch('/api/fx-prev').then(function(r){ return r.json(); }).then(function(d){ if (d.prev) { prevA = d.prev; y(); } }).catch(function(){});
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
				(!a || !a.price || O - a.ts > 36e5) && C('gold' === e ? 'GC=F' : 'silver' === e ? 'SI=F' : 'CL=F', e);
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
				(!r || !r.data || n - r.ts > 36e5) && q();
			})(),
			window._fetchCBERateIfEGP());
	})(),
	(window.switchPanel = switchPanel),
	document.querySelectorAll('.tool-panel.active .calc-card, .tool-panel.active .chart-wrap, .tool-panel.active .table-wrap').forEach(function (e) {
		(e.classList.add('fade-up-once'), (e.dataset.animated = '1'));
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
						(e.innerHTML = '<svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 9.5a3.536 3.536 0 0 0 5 0l2-2a3.536 3.536 0 0 0-5-5l-1 1"/><path d="M9.5 6.5a3.536 3.536 0 0 0-5 0l-2 2a3.536 3.536 0 0 0 5 5l1-1"/></svg><span data-i18n="btn-copy-link"> ' + ((window._i18n_current && window._i18n_current['btn-copy-link']) || 'Copy link') + '</span>', e.classList.remove('copied'));
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

(function () {
	if (window.matchMedia('(pointer: coarse)').matches) return;

	var PANEL_COLORS = {
		'panel-loans':     '#d4a040',
		'panel-savings':   '#4ade80',
		'panel-refinance': '#f09090',
		'panel-currency':  '#60a5fa',
		'panel-faq':       '#8fada0',
	};

	var BAR_COUNT = 5;
	var BAR_MIN = 3;
	var BAR_MAX = 18;
	var BAR_PHASES = [0, 1.1, 2.2, 0.6, 1.8];
	var BAR_SPEEDS = [1.0, 1.3, 0.8, 1.5, 0.9];
	var CHART_H = 27;

	var el = document.createElement('div');
	el.id = 'cursor-chart';
	el.setAttribute('aria-hidden', 'true');

	var barsEl = document.createElement('div');
	barsEl.className = 'cursor-bars';

	var bars = [];
	for (var i = 0; i < BAR_COUNT; i++) {
		var b = document.createElement('div');
		b.className = 'cursor-bar';
		barsEl.appendChild(b);
		bars.push(b);
	}

	var dot = document.createElement('div');
	dot.className = 'cursor-dot';

	el.appendChild(barsEl);
	el.appendChild(dot);
	document.body.appendChild(el);

	var mx = 0, my = 0;
	var visible = false, paused = false, rafRunning = false;
	var lastMx = 0, lastMy = 0, speed = 0;

	function setColor(panelId) {
		el.style.setProperty('--chart-color', PANEL_COLORS[panelId] || '#d4a040');
	}

	function show() {
		if (!paused && !el.classList.contains('visible')) el.classList.add('visible');
	}

	function hide() {
		el.classList.remove('visible');
	}

	function animateBars(now) {
		var dx = mx - lastMx, dy = my - lastMy;
		speed += (Math.sqrt(dx * dx + dy * dy) - speed) * 0.3;
		lastMx = mx; lastMy = my;
		var boost = Math.min(speed * 0.4, 8);
		for (var i = 0; i < BAR_COUNT; i++) {
			var sine = (Math.sin(now * 0.001 * BAR_SPEEDS[i] + BAR_PHASES[i]) + 1) / 2;
			var h = BAR_MIN + (BAR_MAX - BAR_MIN) * sine + boost;
			bars[i].style.height = Math.min(h, BAR_MAX) + 'px';
		}
	}

	function tick(now) {
		el.style.transform = 'translate(' + mx + 'px,' + (my - CHART_H) + 'px)';
		animateBars(now);
		if (visible) {
			requestAnimationFrame(tick);
		} else {
			rafRunning = false;
		}
	}

	document.addEventListener('mousemove', function (e) {
		mx = e.clientX;
		my = e.clientY;

		var overScrollbar = e.clientX >= document.documentElement.clientWidth;
		var nativeCursor = window.getComputedStyle(e.target).cursor !== 'none';
		paused = overScrollbar || nativeCursor;

		if (!visible) {
			visible = true;
			if (!rafRunning) { rafRunning = true; requestAnimationFrame(tick); }
		}
		if (paused) hide(); else show();
	});

	window.addEventListener('scroll', function () {
		if (paused) { paused = false; show(); }
	}, { passive: true });

	document.addEventListener('mouseleave', function () {
		visible = false;
		hide();
	});

	document.addEventListener('mouseenter', function () {
		visible = true;
		if (!rafRunning) { rafRunning = true; requestAnimationFrame(tick); }
		if (!paused) show();
	});

	var _orig = window.switchPanel;
	if (typeof _orig === 'function') {
		window.switchPanel = function (panelId) {
			_orig.call(this, panelId);
			setColor(panelId);
		};
	}

	var init = document.querySelector('.tool-panel.active');
	setColor(init ? init.id : 'panel-loans');
}());


/* ── Consent Popup ──────────────────────────────────────────── */
(function () {
	var KEY = 'loancalc_consent';
	var LOGO = '<svg width="32" height="32" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="36" height="36" rx="9" fill="#1a2e1a"/><line x1="10" y1="8" x2="10" y2="27" stroke="#d4a040" stroke-width="2.5" stroke-linecap="round"/><line x1="10" y1="27" x2="28" y2="27" stroke="#d4a040" stroke-width="2.5" stroke-linecap="round"/><path d="M10 22 L15 22 L15 27" stroke="#d4a040" stroke-opacity="0.4" stroke-width="1.2" fill="none"/><line x1="10" y1="12" x2="13" y2="12" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="10" y1="17" x2="13" y2="17" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="15" y1="27" x2="15" y2="25" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="19" y1="27" x2="19" y2="25" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/><line x1="23" y1="27" x2="23" y2="25" stroke="#d4a040" stroke-opacity="0.55" stroke-width="1.2" stroke-linecap="round"/></svg>';

	function applyConsent(analytics, ads) {
		if (typeof gtag !== 'function') return;
		gtag('consent', 'update', {
			analytics_storage:  analytics ? 'granted' : 'denied',
			ad_storage:         ads ? 'granted' : 'denied',
			ad_user_data:       ads ? 'granted' : 'denied',
			ad_personalization: ads ? 'granted' : 'denied'
		});
	}

	function persist(analytics, ads) {
		try { localStorage.setItem(KEY, JSON.stringify({a: analytics, d: ads})); } catch (_) {}
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
		var hasConsent = false;
		try {
			var stored = JSON.parse(localStorage.getItem(KEY));
			if (stored && typeof stored.a === 'boolean') {
				applyConsent(stored.a, stored.d);
				hasConsent = true;
			}
		} catch (_) {}

		var ov = document.createElement('div');
		ov.id = 'consent-overlay';
		ov.innerHTML =
			'<div id="consent-popup" role="dialog" aria-modal="true" aria-label="Cookie preferences">' +
				'<div class="cp-head">' +
					'<div>' + LOGO + '</div>' +
					'<p class="cp-title">Cookie Preferences</p>' +
					'<p class="cp-desc">We use cookies for analytics and personalised ads. ' +
					'See our <a href="/privacy/">Privacy Policy</a>.</p>' +
				'</div>' +
				'<div class="cp-body">' +
					'<div class="cp-cat">' +
						'<div class="cp-cat-info">' +
							'<div class="cp-cat-name">Necessary</div>' +
							'<div class="cp-cat-desc">Essential for the site to work. Always active.</div>' +
						'</div>' +
						'<label class="ctoggle"><input type="checkbox" checked disabled><span class="ctoggle-track"></span></label>' +
					'</div>' +
					'<div class="cp-cat">' +
						'<div class="cp-cat-info">' +
							'<div class="cp-cat-name">Analytics</div>' +
							'<div class="cp-cat-desc">Google Analytics 4 — helps us understand how the site is used.</div>' +
						'</div>' +
						'<label class="ctoggle"><input type="checkbox" id="cb-pref-a"><span class="ctoggle-track"></span></label>' +
					'</div>' +
					'<div class="cp-cat">' +
						'<div class="cp-cat-info">' +
							'<div class="cp-cat-name">Advertising</div>' +
							'<div class="cp-cat-desc">Google AdSense — enables personalised ads based on your interests.</div>' +
						'</div>' +
						'<label class="ctoggle"><input type="checkbox" id="cb-pref-d"><span class="ctoggle-track"></span></label>' +
					'</div>' +
				'</div>' +
				'<div class="cp-foot">' +
					'<div class="cp-btn-row">' +
						'<button class="cbtn cbtn-reject" id="cb-reject" style="flex:1">Reject All</button>' +
						'<button class="cbtn cbtn-accept" id="cb-accept" style="flex:1">Accept All</button>' +
					'</div>' +
					'<button class="cbtn cbtn-save cbtn-full" id="cb-save">Save Preferences</button>' +
				'</div>' +
			'</div>';
		document.body.appendChild(ov);

		var trigger = document.createElement('button');
		trigger.id = 'consent-trigger';
		trigger.setAttribute('aria-label', 'Cookie preferences');
		trigger.innerHTML = LOGO;
		document.body.appendChild(trigger);

		document.getElementById('cb-accept').onclick = function () { persist(true, true); };
		document.getElementById('cb-reject').onclick  = function () { persist(false, false); };
		document.getElementById('cb-save').onclick = function () {
			persist(
				document.getElementById('cb-pref-a').checked,
				document.getElementById('cb-pref-d').checked
			);
		};

		ov.addEventListener('click', function (e) {
			if (e.target !== ov) return;
			try {
				var s = JSON.parse(localStorage.getItem(KEY));
				if (s && typeof s.a === 'boolean') closePopup();
			} catch (_) {}
		});

		trigger.onclick = openPopup;
		if (!hasConsent) openPopup();
	}

	function build() {
		if (typeof window.__tcfapi === 'function') {
			window.__tcfapi('getTCData', 2, function(tcData, success) {
				if (success && tcData.gdprApplies === true) return;
				buildPopup();
			});
		} else {
			buildPopup();
		}
	}

	setTimeout(build, 1000);
}());
