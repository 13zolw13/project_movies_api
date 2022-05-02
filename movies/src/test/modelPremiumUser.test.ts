import chai, { expect } from "chai";
import config from "config";
import MovieModel from "../models/movie.models";
import connectDb from "../utils/connectToDb";
import DateforDb from "../utils/getDate";
import { MockDataAddedPremiumAccount } from "./mockdata";
export const should = chai.should();

// chai.use(chaiHttp);
const dbUri =
	config.get<string>("dbUri") || "mongodb://localhost:27017/movieApp";
// const dbUri = config.get<string>('dbUri');

// let movie = {
//     Title: "Jackie Brown",
//     Director: "Quentin Tarantino",
//     Released: "Thu Dec 25 1997 00:00:00 GMT+0000 (Coordinated Universal Time)",
//     Genre: "Crime, Drama, Thriller",
//     AddedBy: 123,
//     Plot: "A flight attendant with a criminal past gets nabbed by the FBI for smuggling. Under pressure to become an informant against the drug dealer she works for, she must find a way to secure her future without getting killed.",
//     Actors: "Pam Grier, Samuel L. Jackson, Robert Forster",
//     Runtime: "154 min",
//     Awards: "Nominated for 1 Oscar. 8 wins & 24 nominations total",
// }

describe("MovieModel, Premium user, les movies created then limit ", function () {
	before("Connecting to db", function () {
		return connectDb(dbUri);
	});

	beforeEach("Deleting model", function () {
		return MovieModel.deleteMany();
	});
	beforeEach("Creating model", function () {
		return MovieModel.create(MockDataAddedPremiumAccount.slice(0, 3));
	});

	describe("Function findMoviesAddedByUser for premium user =>", function () {
		it("responds with movie information", async function () {
			const res = await MovieModel.findMoviesAddedByUser(434);
			console.log(res[0]);
			expect(res).not.to.be.null;
			// res.should.be.an('array');//.that.includes('Title');
			// res[0].should.be.an('object');
			// res[0].should.have.property('Title');
			// res[0].should.have.property('Director');
			// res[0].should.have.property('Released');
			// res[0].should.have.property('Genre');
		});
	});

	describe("Function MovieDetails for premium user =>", function () {
		// console.log('movie', film)
		it("Details of one movie", async function () {
			const data = await MovieModel.find({ AddedBy: 434 });
			// console.log('movie data', data!._id);
			// console.log('movie ', data._id);

			expect(data).to.have.lengthOf.at.least(1);
			const res = await MovieModel.findMovieDetails(data[0].id, 434);
			console.log("second test", res);
			expect(res).not.to.be.null;
			expect(res).to.be.an("object");
			expect(res).to.have.property("Title");
			expect(res).to.have.property("Director");
			expect(res).to.have.property("Released");
			expect(res).to.have.property("Genre");
			expect(res).to.have.property("Plot");
			expect(res).to.have.property("Actors");
			expect(res).to.have.property("Awards");
		});
	});

	describe("Function  checkHowManyMovies for premium user", function () {
		// console.log('movie', film)
		it("How many added by user", async function () {
			const month = DateforDb();
			const res = await MovieModel.checkHowManyMovies(434, month);
			const howManyAddedThisMonth = res!.length;
			console.log("second test", res);
			// res.should.have.length(1);
			res.should.be.an("array"); //.that.includes('Title');
			howManyAddedThisMonth.should.be.equal(3);
		});
	});

	describe("Function  checkIfArleadyExists for premium user", function () {
		// console.log('movie', film)
		it("checking if the movie exists", async function () {
			const month = DateforDb();
			const res = await MovieModel.checkIfAlreadyExists("Jackie", 434);

			expect(res).not.to.be.null;

			// res.should.have.length(1);
			// res.should.be.an('array');//.that.includes('Title');
		});
	});

	describe("Function  checkIfArleadyExists- for premium user", function () {
		// console.log('movie', film)
		it("Movie isn`t on user list arleady", async function () {
			const month = DateforDb();
			const res = await MovieModel.checkIfAlreadyExists("James", 434);
			// log.info(res, 'Data')
			expect(res).to.be.null;
			// expect(res).to.have.lengthOf(0);
			// expect(res).to.be.empty;
			// res.should.have.length(1);
			// res.should.be.an('array');//.that.includes('Title');
		});
	});
});

describe("MovieModel, Premium user,  movies created more then limit ", function () {
	before("Connecting to db", function () {
		return connectDb(dbUri);
	});

	beforeEach("Deleting model", function () {
		return MovieModel.deleteMany();
	});
	beforeEach("Creating model", function () {
		return MovieModel.create(MockDataAddedPremiumAccount);
	});

	describe("Function findMoviesAddedByUser for premium user =>", function () {
		it("responds with movie information", async function () {
			const res = await MovieModel.findMoviesAddedByUser(434);
			console.log(res[0]);
			expect(res).not.to.be.null;
			// res.should.be.an('array');//.that.includes('Title');
			// res[0].should.be.an('object');
			// res[0].should.have.property('Title');
			// res[0].should.have.property('Director');
			// res[0].should.have.property('Released');
			// res[0].should.have.property('Genre');
		});
	});

	describe("Function MovieDetails for premium user =>", function () {
		// console.log('movie', film)
		it("Details of one movie", async function () {
			const data = await MovieModel.find({ AddedBy: 434 });
			// console.log('movie data', data!._id);
			// console.log('movie ', data._id);

			expect(data).to.have.lengthOf.at.least(1);
			const res = await MovieModel.findMovieDetails(data[0].id, 434);
			console.log("second test", res);
			expect(res).not.to.be.null;
			expect(res).to.be.an("object");
			expect(res).to.have.property("Title");
			expect(res).to.have.property("Director");
			expect(res).to.have.property("Released");
			expect(res).to.have.property("Genre");
			expect(res).to.have.property("Plot");
			expect(res).to.have.property("Actors");
			expect(res).to.have.property("Awards");
		});
	});

	describe("Function  checkHowManyMovies for premium user", function () {
		// console.log('movie', film)
		it("How many added by user", async function () {
			const month = DateforDb();
			const res = await MovieModel.checkHowManyMovies(434, month);
			const howManyAddedThisMonth = res!.length;
			console.log("second test", res);
			// res.should.have.length(1);
			res.should.be.an("array"); //.that.includes('Title');
			expect(howManyAddedThisMonth).to.be.greaterThan(4);
		});
	});

	describe("Function  checkIfArleadyExists for premium user", function () {
		// console.log('movie', film)
		it("checking if the movie exists", async function () {
			const month = DateforDb();
			const res = await MovieModel.checkIfAlreadyExists("Jackie", 434);

			expect(res).not.to.be.null;

			// res.should.have.length(1);
			// res.should.be.an('array');//.that.includes('Title');
		});
	});

	describe("Function  checkIfArleadyExists- for premium user", function () {
		// console.log('movie', film)
		it("Movie isn`t on user list arleady", async function () {
			const month = DateforDb();
			const res = await MovieModel.checkIfAlreadyExists("James", 434);
			// log.info(res, 'Data')
			expect(res).to.be.null;

			// res.should.have.length(1);
			// res.should.be.an('array');//.that.includes('Title');
		});
	});
});
