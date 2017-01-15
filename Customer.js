/**
 * Created by tarasenko on 15.01.2017.
 */

"use strict";

var Rental = require('./Rental')

class Customer {
	constructor(data) {
		this._data = data;

	}
	get name() {
		return this._data.name;
	}

	get rentals(){
		return this._data.rentals.map(rental => new Rental(rental));
	}

}



module.exports = Customer;