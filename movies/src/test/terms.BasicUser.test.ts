import { expect } from "chai";
import config from "config";
import MovieModel from "../models/movie.models";
import { termsForAddingMovie } from "../services/movies.services";
import connectDb from "../utils/connectToDb";
import log from "../utils/logger";
import { MockDataBasicAccount } from "./mockdata";
// const dbUri = 'mongodb://localhost:27017/movieApp';
const dbUri =
	config.get<string>("dbUri") || "mongodb://localhost:27017/movieApp";
let userId = 123;
let userRole = "basic";

describe("Movie tests  termsForAddingMovie lest then limit ", function () {
	before("Connecting to db", function () {
		return connectDb(dbUri);
	});

	beforeEach("Deleting model", function () {
		return MovieModel.deleteMany();
	});
	beforeEach("Creating model", function () {
		return MovieModel.create(MockDataBasicAccount.slice(0, 3));
	});
	describe("Function termsForAddingMovie =>", function () {
		it("responds with with true if less then limit by user", async function () {
			const res = await termsForAddingMovie(123, "basic", "Franky");
			expect(res).to.be.a("object");
		});
	});
	describe("Function termsForAddingMovie =>", function () {
		it("responds with with true if less then limit by user", async function () {
			const res = await termsForAddingMovie(123, "basic", "Jackie Brown");
			log.info(res, "Res function termForAddingMovie");
			expect(res).to.be.null;
		});
	});
});

describe("Movie tests  termsForAddingMovie more then limit", function () {
	before("Connecting to db", function () {
		return connectDb(dbUri);
	});

	beforeEach("Deleting model", function () {
		return MovieModel.deleteMany();
	});
	beforeEach("Creating model", function () {
		return MovieModel.create(MockDataBasicAccount);
	});
	describe("Function termsForAddingMovie =>", function () {
		it("responds with null if it is morethen limit by user", async function () {
			const res = await termsForAddingMovie(123, "basic", "Franky");
			expect(res).to.be.null;
		});
	});
	describe("Function termsForAddingMovie =>", function () {
		it("responds with  null if it is more then limit by user", async function () {
			const res = await termsForAddingMovie(123, "basic", "Jackie Brown");
			log.info(res, "Res function termForAddingMovie");
			expect(res).to.be.null;
		});
	});
});
