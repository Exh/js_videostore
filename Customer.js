/**
 * Created by tarasenko on 15.01.2017.
 */

"use strict";

var Rental = require('./Rental')

class Customer {
	constructor(data, movies) {
		this._data = data;
		this._movies = movies;
	}

	get name() {
		return this._data.name;
	}

	get rentals() {
		return this._data.rentals.map(rental => new Rental(rental, this._movies));
	}

	get totalFrequentRenterPoints() {
		return this.rentals.map(rental => rental.frequentRenterPoints).reduce((a, b) => a + b);
	}

	get totalAmount() {
		return this.rentals.reduce((total, rental) => total + rental.amount, 0);
	}
}

module.exports = Customer;