"use strict"

function statement(customer, movies, format="html") {
	if (format=="text") {
		return statementText();
	} else if(format=="html")	{
		return statementHTML();
	}

	function statementHTML()	{
		let result = `<h1>Rental Record for <em>${customer.name}</em></h1>\n`;
		result += "<table>\n";
		for (let rental of customer.rentals) {
			result += `  <tr><td>${getMovieBy(rental).title}</td><td>${getAmount(rental)}</td></tr>\n`;
		}
		result += "</table>\n";
		result += `<p>Amount owed is <em>${getTotalAmount(customer)}</em></p>\n`;
		result += `<p>You earned <em>${getTotalFrequentRenterPoints(customer)}</em> frequent renter points</p>\n`;
		return result
	}
	
	function statementText() {
		let result = `Rental Record for ${customer.name}\n`;
		for (let rental of customer.rentals) {
			//print figures for this rental
			result += `\t${getMovieBy(rental).title}\t${getAmount(rental)}\n`;
		}
		// add footer lines
		result += `Amount owed is ${getTotalAmount(customer)}\n`;
		result += `You earned ${getTotalFrequentRenterPoints(customer)} frequent renter points\n`;

		return result;
	}

	function getMovieBy(rental) {
		return movies[rental.movieID];
	}

	function getAmount(rental)
	{
		let movie = getMovieBy(rental);
		let thisAmount = 0;
		// determine amount for each movie
		switch (movie.code) {
			case "regular":
				thisAmount = 2;
				if (rental.days > 2) {
					thisAmount += (rental.days - 2) * 1.5;
				}
				break;
			case "new":
				thisAmount = rental.days * 3;
				break;
			case "childrens":
				thisAmount = 1.5;
				if (rental.days > 3) {
					thisAmount += (rental.days - 3) * 1.5;
				}
				break;
		}
		return thisAmount;
	}

	function getTotalFrequentRenterPoints(customer) {
		let totalFrequentRenterPoints = 0;
		for (let rental of customer.rentals) {
			//add frequent renter points
			totalFrequentRenterPoints += getMovieBy(rental).code === "new" && rental.days > 2 ? 2 : 1;
		}
		return totalFrequentRenterPoints;
	}

	function getTotalAmount(customer) {
		let totalAmount = 0;
		for (let rental of customer.rentals) {
			totalAmount += getAmount(rental);
		}
		return totalAmount;
	}
}

let customer = {
	name: "martin",
	rentals: [{
		"movieID": "F001",
		"days": 3
	}, {
		"movieID": "F002",
		"days": 1
	},]
}

let movies = {
	"F001": {
		"title": "Ran",
		"code": "regular"
	},
	"F002": {
		"title": "Trois Couleurs: Bleu",
		"code": "regular"
	},
	// etc
}

console.log(statement(customer, movies,"html"))
console.log(statement(customer, movies,"text"))