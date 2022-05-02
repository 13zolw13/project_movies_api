require("dotenv").config()
import chai, { expect } from "chai";
import chaiHttp from "chai-http";
import { it } from "mocha";
import app from "../app";
import MovieModel from "../models/movie.models";
import { MockDataBasicAccount } from "./mockdata";

const username = "basic-thomas";
const password = "sR-_pcoow-27-6PAwCD8";

chai.use(chaiHttp);

describe("Endpoints", () => {
	beforeEach("Deleting model", function () {
		return MovieModel.deleteMany();
	});
	beforeEach("Creating model", function () {
		return MovieModel.create(MockDataBasicAccount.slice(0, 2));
	});
	// beforeEach("login", async function () {
	// 	return sinon
	// 		.stub(authUser, "authUser")
	// 		.callsFake((_req: Request, res: Response, next: NextFunction) => {
	// 			next();
	// 		});
	// });

	describe("Login", function () {
		it("Should return user token", async function () {
			const { status, body } = await chai
				.request(app)
				.post("/api/v1/login")
				.send({ username: username, password: password });

			expect(status).to.be.a("number");
			expect(status).to.be.equal(200);
			expect(body).to.be.a("object");
			expect(body).to.have.property("msg");
			expect(body.msg).not.to.be.empty;
			expect(body.msg).to.be.equal("User login!");
		});
	});

	describe("/GET List of all movies added by auth users", () => {
		it("it should GET all movies", async function () {
			const res = await chai.request(app).get("/api/v1/movies");

			console.log("RES GET MOVIES", res);
			// res.should.have.status(200);
			// res.body.should.be.a('object');
			// res.body.movies.should.be.a('array');
		});
	});

	//     // describe('/POST Adding new film ', () => {
	//     //     it('it should not add a movie -not auth user', (done) => {
	//     //         const data = {

	//     //             title: 'Pulp',
	//     //         } as AddMovieInput

	//     //         chai.request(app)
	//     //             .post('/api/v1/movies')
	//     //             .send(data)
	//     //             .end((err, res) => {
	//     //                 if (err) {
	//     //                     console.error(err);
	//     //                     done();

	//     //                 }
	//     //                 res.should.have.status(404);

	//     //                 done();
	//     //             });
	//     //     })
	//     // })

	//     // describe('/POST Adding new film ', () => {
	//     //     it('it should add  new movie', (done) => {
	//     //         const data = {
	//     //             username: 'premium-jim',
	//     //             password: 'GBLtTyq3E_UNjFnpo9m6',
	//     //             title: 'Pulp',
	//     //         } as AddMovieInput

	//     //         chai.request(app)
	//     //             .post('/api/v1/movies')
	//     //             .send(data)
	//     //             .end((err, res) => {
	//     //                 if (err) {
	//     //                     console.error(err);
	//     //                     done();

	//     //                 }
	//     //                 res.should.have.status(201);

	//     //                 done();
	//     //             });
	//     //     })
	//     // })
	//     // describe('/POST Adding new film ', () => {
	//     //     it('it shouldnt add 5  movie by basic account', (done) => {
	//     //         const data = {
	//     //             username: "basic-thomas",
	//     //             password: "sR-_pcoow-27-6PAwCD8",
	//     //             title: 'Pulp',
	//     //         } as AddMovieInput

	//     //         let movie = MovieModel.insertMany([{
	//     //             Title: "Pulp fiction",
	//     //             Released: "14 OCT 1994",
	//     //             Genre: "Crime,Drama",
	//     //             Director: "Quentin Tarantino",
	//     //             AddedBy: 123,

	//     //         }, {
	//     //             Title: "Pulp fiction",
	//     //             Released: "14 OCT 1994",
	//     //             Genre: "Crime,Drama",
	//     //             Director: "Quentin Tarantino",
	//     //             AddedBy: 123,

	//     //         }, {
	//     //             Title: "Pulp fiction",
	//     //             Released: "14 OCT 1994",
	//     //             Genre: "Crime,Drama",
	//     //             Director: "Quentin Tarantino",
	//     //             AddedBy: 123,

	//     //         }, {
	//     //             Title: "Pulp fiction",
	//     //             Released: "14 OCT 1994",
	//     //             Genre: "Crime,Drama",
	//     //             Director: "Quentin Tarantino",
	//     //             AddedBy: 123,

	//     //         }, {
	//     //             Title: "Pulp fiction",
	//     //             Released: "14 OCT 1994",
	//     //             Genre: "Crime,Drama",
	//     //             Director: "Quentin Tarantino",
	//     //             AddedBy: 123,

	//     //         },])

	//     //         chai.request(app)
	//     //             .post('/api/v1/movies')
	//     //             .send(data)
	//     //             .end((err, res) => {
	//     //                 if (err) {
	//     //                     console.error(err);
	//     //                     done();
	//     //                 }
	//     //                 res.should.have.status(400);

	//     //                 done();
	//     //             });
	//     //     })
	//     // })
});