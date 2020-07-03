import { useEffect, useState } from 'react';

interface IOptions {
	isValueObj?: boolean;
	parseFn?: (value: any) => any;
}

const usePureQueryCustomState = <T>(keyName: string, defaultValue: any, options: IOptions = {}) => {
	const [isInit, setInit] = useState(false);
	const [urlValue, setUrlValue] = useState(defaultValue);

	useEffect(() => {
		const fn = (e?: any, mount?: boolean) => {
			// skip other hooks events
			if (e && e.detail.key !== keyName) return;
			if (mount) {
				const url = new URL(window.location.href);
				const params = new URLSearchParams(url.search);
				const urlValueParam = params.get(keyName);
				let value: any = urlValueParam;
				if (value && options.isValueObj) {
					value = JSON.parse(value);
				} else if (value && options.parseFn) {
					value = options.parseFn(value);
				} else if (!value) {
					value = defaultValue;
					// eslint-disable-next-line no-restricted-globals
				} else if (!isNaN(value)) {
					// parse string to number
					value = Number(value);
				}
				setUrlValue(value);
				setInit(true);
				return;
			}
			if (e.detail.value !== urlValue) setUrlValue(e.detail.value);
		};
		fn({ detail: { key: keyName } }, true); // call it on mount
		window.addEventListener('popstate', fn);
		return () => {
			window.removeEventListener('popstate', fn);
		};
	}, []);

	const onValueChange = (newValue: any) => {
		const plainValue = options.isValueObj
			? (JSON.stringify(newValue))
			: newValue; // just string or number...
		const url = new URL(window.location.href);
		const params = new URLSearchParams(url.search);
		params.set(keyName, plainValue);
		window.history.pushState('', '', `?${params.toString()}`);
		window.dispatchEvent(new CustomEvent('popstate', { detail: { key: keyName, value: newValue } }));
		setUrlValue(newValue);
	};

	return [urlValue, onValueChange, isInit];
};

export default usePureQueryCustomState;