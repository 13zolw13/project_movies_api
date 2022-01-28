import  mongoose from "mongoose";
import MovieModel from '../models/movie.models';

import chai , {should}   from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';



chai.use(chaiHttp);

describe('MovieModel', () => {
    beforeEach((done) => {
        MovieModel.remove({}, (err: any) => {
            done();
        });
    });


});