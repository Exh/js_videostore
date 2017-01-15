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
		let totalFrequentRenterPoints = 0;
		for (let rental of this.rentals) {
			totalFrequentRenterPoints += rental.frequentRenterPoints;
		}
		return totalFrequentRenterPoints;
	}
	get totalAmount() {
		let totalAmount = 0;
		for (let rental of this.rentals) {
			totalAmount += rental.amount;
		}
		return totalAmount;
	}
}

module.exports = Customer;