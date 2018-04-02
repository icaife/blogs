/**
 * @description Promise
 * @see https://segmentfault.com/a/1190000002452115
 * @author Leon.Cai
 */

const PENDING = "pending",
	FULFILLED = "fulfilled",
	REJECTED = "rejected";

/**
 * @param {Function} executor
 */
function Promise(executor) {
	let self = this;

	if (!(self instanceof Promise)) {
		throw new Error("new Promise.");
	}

	self.status = PENDING;
	self.value = null;
	self.fulfilleds = [];
	self.rejecteds = [];

	try {
		executor.call(self, self.resolve.bind(self), self.reject.bind(self));
	} catch (e) {
		self.reject(e);
	}
}

/**
 *
 * @param {Function} onFulfilled
 * @param {Function} onRejected
 */
Promise.prototype.then = (onFulfilled, onRejected) => {
	let self = this,
		promise2 = new Promise();

	if (!/^(function)+$/.test(typeof onFulfilled + typeof onRejected)) {
		throw new Error("onFulfilled and onRejected must be function!");
	}

	self.fulfilleds.push(onFulfilled);
	self.rejecteds.push(onRejected);

	function resolve(value) {
		if (value instanceof Promise) {
			return value.then(resolve, reject);
		}

		delay(() => {
			self.status = FULFILLED;
			self.value = value;
			let fulfilleds = self.fulfilleds;

			fulfilleds.forEach(fulfilled => {
				fulfilled(value);
			});
		});
	}

	function reject(error) {
		delay(() => {
			self.status = REJECTED;
			self.value = error;
			let rejecteds = self.rejecteds;

			rejecteds.forEach(rejected => {
				rejected(error);
			});
		});
	}

	function delay(fn) {
		window.setTimeout(fn, 0);
	}
};
