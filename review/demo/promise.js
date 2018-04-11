/**
 * @description Promise
 * @see https://segmentfault.com/a/1190000002452115
 * @author Leon.Cai
 */

"use strict";

((window, factory) => {
	if (typeof exports === "object") {
		module.exports = factory();
	} else if (typeof define === "function" && define.amd) {
		define(factory);
	} else {
		window.Promise = factory();
	}
})(this, () => {
	/**
	 * 三种状态，pending 可以变成任何状态
	 */
	const PENDING = "pending",
		FULFILLED = "fulfilled",
		REJECTED = "rejected";

	/**构造函数
	 * @param {Function} executor
	 */
	function Promise(executor) {
		let self = this;

		if (!(self instanceof Promise)) {
			throw new Error("new Promise.");
		}

		// 初始化
		self.status = PENDING;
		self.value = self.reason = undefined;
		self.onResolvedCallbacks = [];
		self.onRejectedCallbacks = [];

		//挂载方法
		self.then = then.bind(self);
		self.resolve = resolve.bind(self);
		self.reject = reject.bind(self);

		//立即执行
		try {
			executor(self.resolve, self.reject);
		} catch (error) {
			self.reject(error);
		}
	}

	/**
	 *
	 * @param {Function} onFulfilled
	 * @param {Function} onRejected
	 */
	function then(onFulfilled, onRejected) {
		let self = this,
			promise2;

		onFulfilled =
			typeof onFulfilled === "function" ? onFulfilled : value => value;

		onRejected =
			typeof onRejected === "function"
				? onRejected
				: error => {
						throw error;
				  };

		//pending
		if (self.status === PENDING) {
			promise2 = new Promise((resolve, reject) => {
				self.onResolvedCallbacks.push(() => {
					delay(() => {
						try {
							let x = onFulfilled(self.value); // 拿到返回值
							console.log("pending->", x);
							resolvePromise(promise2, x, resolve, reject);
						} catch (error) {
							reject(error);
						}
					});
				});

				self.onRejectedCallbacks.push(() => {
					delay(() => {
						try {
							let x = onRejected(self.reason); // 拿到返回值
							resolvePromise(promise2, x, resolve, reject);
						} catch (error) {
							reject(error);
						}
					});
				});
			});
		} else if (self.status === FULFILLED) {
			promise2 = new Promise((resolve, reject) => {
				delay(() => {
					try {
						let x = onFulfilled(self.value);
						console.log("fulilled->", x);
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			});
		} else if (self.status === REJECTED) {
			promise2 = new Promise((resolve, reject) => {
				delay(() => {
					try {
						let x = onRejected(self.reason);
						console.log("rejected->", x);
						resolvePromise(promise2, x, resolve, reject);
					} catch (error) {
						reject(error);
					}
				});
			});
		}

		return promise2;
	}

	function resolve(value) {
		let self = this;

		delay(() => {
			if (self.status === PENDING) {
				self.status = FULFILLED;
				self.value = value;

				self.onResolvedCallbacks.forEach(onFulfilled => {
					onFulfilled(value);
				});
			}
		});
	}

	function resolvePromise(promise2, x, resolve, reject) {
		//如果promise 和 x 指向相同的值, 使用 TypeError做为原因将promise拒绝。
		if (promise2 === x) {
			return reject(new Error("循环引用"));
		}

		let called = false;

		if (x !== null && (typeof x === "object" || typeof x === "function")) {
			try {
				let then = x.then;

				//如果是 Promise
				if (typeof then === "function") {
					then.call(
						x,
						y => {
							if (called) {
								return;
							}

							called = true;

							resolvePromise(promise2, y, resolve, reject);
						},
						error => {
							if (called) {
								return;
							}

							called = true;

							reject(error);
						}
					);
				} else {
					resolve(x);
				}
			} catch (error) {
				if (called) {
					return;
				}

				called = true;

				reject(error);
			}
		} else {
			//普通值
			console.log("普通值");
			resolve(x);
		}
	}

	function reject(reason) {
		let self = this;

		delay(() => {
			if (self.status === PENDING) {
				self.status = FULFILLED;
				self.reason = reason;

				self.onResolvedCallbacks.forEach(onFulfilled => {
					onFulfilled(reason);
				});
			}
		});
	}

	function rejectPromise() {}

	function delay(fn) {
		window.setImmediate
			? window.setImmediate(fn)
			: window.setTimeout(fn, 0);
	}

	return Promise;
});

//promise tests
var p1 = new Promise((resolve, reject) => {
	// resolve(p2);
	return p2;
});

var p2 = new Promise((resolve, reject) => {
	return p3;
});

var p3 = new Promise((resolve, reject) => {
	setTimeout(() => {
		resolve({ c: 1 });
	}, 1000);
});

p3.then(
	data => {
		console.log(data);
	},
	reason => {
		console.log("reason->", reason);
	}
);
