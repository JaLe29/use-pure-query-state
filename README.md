# use-pure-query-state
The fastest way to use Query String as state using simple hook without external library

# Live demo
[https://demo-use-pure-query-state.vercel.app/](https://demo-use-pure-query-state.vercel.app/)

## Prerequisite
- react ^16.8.0

## Install
```
npm install use-pure-query-state
```
or
```
yarn add use-pure-query-state
```

## Usage
You can use `usePureQueryState` like react `useState`

```js
function App () {
	const [inputString, setInpputString] = usePureQueryCustomState('inputString', '')

	return (
		<input onChange={(e) => setInpputString(e.target.value)} value={inputString} />
	);
}

```
or with number
```js
function App () {
	const [inputNumber, setInputNumber] = usePureQueryCustomState('inputNumber', 100)

	return (
		<input type="number" onChange={(e) => setInputNumber(e.target.value)} value={inputNumber} />
	);
}
```
or with object
```js
function App () {
	const [inputObject, setInputObject] = usePureQueryCustomState('inputObject', {vehicle: false, bike: false}, {isValueObj: true})

	return (
		<div>
			<input type="checkbox" onChange={(e) => setInputObject({...inputObject, vehicle: e.target.checked})} checked={inputObject.vehicle} />
			<label> I have a vehicle</label>
			<input type="checkbox" onChange={(e) => setInputObject({...inputObject, bike: e.target.checked})} checked={inputObject.bike} />
			<label> I have a bike</label>
		</div>
	);
}
```
# Api
```js
interface IOptions {
    isValueObj?: boolean;
    parseFn?: (value: any) => any;
}
declare const usePureQueryCustomState: <T>(keyName: string, defaultValue: any, options?: IOptions) => any[];
export default usePureQueryCustomState;
```