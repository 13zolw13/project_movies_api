import mongoose from "mongoose";
import MovieModel from '../models/movie.models';

import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';
import { AddMovieInput } from "../schemas/movie.schema";

export const should = chai.should();


chai.use(chaiHttp);

describe('MovieModel', () => {
    beforeEach((done) => {
        MovieModel.deleteMany({}, (err: any) => {
            done();
        });
    });




    describe('/GET List of all movies addet by auth users', () => {
        it('it should GET all movies', (done) => {
            let movie = new MovieModel({
                Title: "Pulp fiction",
                Released: "14 OCT 1994",
                Genre: "Crime,Drama",
                Director: "Quentin Tarantino",
                AddedBy: 123,

            });
            movie.save((err, movie) => {
                chai.request(app)
                    .get('/api/v1/movies')
                    .end((err, res) => {
                        if (err) {
                            console.error(err);
                            done();

                        }
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.movies.should.be.a('array');


                        done();
                    });
            });
        })


    });



    describe('/POST Adding new film ', () => {
        it('it should not add a movie -not auth user', (done) => {
            const data = {
                username: 'premium-jim',
                password: 'GBLtTyq3E_dsado9m6',
                title: 'Pulp',
            } as AddMovieInput

            chai.request(app)
                .post('/api/v1/movies')
                .send(data)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();

                    }
                    res.should.have.status(404);

                    done();
                });
        })
    })

    describe('/POST Adding new film ', () => {
        it('it should add  new movie', (done) => {
            const data = {
                username: 'premium-jim',
                password: 'GBLtTyq3E_UNjFnpo9m6',
                title: 'Pulp',
            } as AddMovieInput

            chai.request(app)
                .post('/api/v1/movies')
                .send(data)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();

                    }
                    res.should.have.status(201);

                    done();
                });
        })
    })
    describe('/POST Adding new film ', () => {
        it('it shouldnt add 5  movie by basic account', (done) => {
            const data = {
                username: "basic-thomas",
                password: "sR-_pcoow-27-6PAwCD8",
                title: 'Pulp',
            } as AddMovieInput
            let movie = MovieModel.insertMany([{
                Title: "Pulp fiction",
                Released: "14 OCT 1994",
                Genre: "Crime,Drama",
                Director: "Quentin Tarantino",
                AddedBy: 123,

            }, {
                Title: "Pulp fiction",
                Released: "14 OCT 1994",
                Genre: "Crime,Drama",
                Director: "Quentin Tarantino",
                AddedBy: 123,

            }, {
                Title: "Pulp fiction",
                Released: "14 OCT 1994",
                Genre: "Crime,Drama",
                Director: "Quentin Tarantino",
                AddedBy: 123,

            }, {
                Title: "Pulp fiction",
                Released: "14 OCT 1994",
                Genre: "Crime,Drama",
                Director: "Quentin Tarantino",
                AddedBy: 123,

            }, {
                Title: "Pulp fiction",
                Released: "14 OCT 1994",
                Genre: "Crime,Drama",
                Director: "Quentin Tarantino",
                AddedBy: 123,

            },])


            chai.request(app)
                .post('/api/v1/movies')
                .send(data)
                .end((err, res) => {
                    if (err) {
                        console.error(err);
                        done();
                    }
                    res.should.have.status(400);

                    done();
                });
        })
    })


});
