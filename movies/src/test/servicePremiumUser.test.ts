import MovieModel, {
    Movie
} from '../models/movie.models';
import {
    mongoose
} from '@typegoose/typegoose';
import chai, {
    expect
} from 'chai';
import chaiHttp from 'chai-http';
import connectDb from '../utils/connectToDb';
import DateforDb from '../utils/getDate';
import { checkHowManyAdded, getAllMovies, termsForAddingMovie } from '../services/movies.services';
import config from 'config';
import { MockDataAddedPremiumAccount, MockDataBasicAccount } from './mockdata';


export const should = chai.should();


// chai.use(chaiHttp);
const dbUri = config.get<string>('dbUri') || 'mongodb://localhost:27017/movieApp';
// const dbUri = config.get<string>('dbUri');
let userId = 123;
let userRole = 'basic';

describe('Movie service tests. For premium User. Movies created less then limit', function () {


    before('Connecting to db', function () {
        return connectDb(dbUri);

    })

    beforeEach('Deleting model', function () {
        return MovieModel.deleteMany();

    });
    beforeEach('Creating model', function () {
        return MovieModel.create(MockDataAddedPremiumAccount.slice(0, 3));
    });


    describe('Function getAllMovies =>', function () {
        it('responds with list of all movies created by user', async function () {
            const res = await getAllMovies(434);
            // console.log(res[0]);
            res.should.have.length(3);
            res.should.be.an('array');//.that.includes('Title');
            res[0].should.be.an('object');
            res[0].should.have.property('Title');
            res[0].should.have.property('Director');
            res[0].should.have.property('Released');
            res[0].should.have.property('Genre');
        });
    });

    describe('Function getAllMovies =>', function () {
        it('responds with empty list of all movies created by user', async function () {
            const res = await getAllMovies(124);
            // console.log(res[0]);
            res.should.have.length(0);
            res.should.be.an('array');
        });
    });
    //dodac baze 
    describe('Function checkHowManyAdded =>', function () {
        it('responds with  true if less then limit by user', async function () {
            const res = await checkHowManyAdded(434);
            // console.log(res[0]);
            expect(res).to.be.a('boolean');
            expect(res).to.equal(true);


        });
    });



})


describe('Movie service tests. For premium User. Movies created less then limit', function () {


    before('Connecting to db', function () {
        return connectDb(dbUri);

    })

    beforeEach('Deleting model', function () {
        return MovieModel.deleteMany();

    });
    beforeEach('Creating model', function () {
        return MovieModel.create(MockDataAddedPremiumAccount);
    });


    describe('Function getAllMovies =>', function () {
        it('responds with list of all movies created by user', async function () {
            const res = await getAllMovies(434);
            // console.log(res[0]);
            expect(res).to.have.lengthOf.at.least(2);
            expect(res).not.to.be.undefined;
            expect(res).not.to.be.null;
            res.should.be.an('array');//.that.includes('Title');
            res[0].should.be.an('object');
            res[0].should.have.property('Title');
            res[0].should.have.property('Director');
            res[0].should.have.property('Released');
            res[0].should.have.property('Genre');
        });
    });


    //dodac baze 
    describe('Function checkHowManyAdded =>', function () {
        it('responds with  true if less then limit by user', async function () {
            const res = await checkHowManyAdded(434);
            // console.log(res[0]);
            expect(res).to.be.a('boolean');
            expect(res).to.equal(false);


        });
    });



})