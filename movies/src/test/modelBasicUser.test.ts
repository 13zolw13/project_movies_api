import MovieModel, { Movie } from '../models/movie.models';
import { mongoose } from '@typegoose/typegoose';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import connectDb from '../utils/connectToDb';
import DateforDb from '../utils/getDate';
import config from 'config';
import { MockDataAddedPremiumAccount, MockDataBasicAccount } from './mockdata';
import log from '../utils/logger';
export const should = chai.should();


// chai.use(chaiHttp);
const dbUri = config.get<string>('dbUri') || 'mongodb://localhost:27017/movieApp';
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


describe('MovieModel, tests for lest ten limit ', function () {


    before('Connecting to db', function () {
        return connectDb(dbUri);

    })

    beforeEach('Deleting model', function () {
        return MovieModel.deleteMany();

    });
    beforeEach('Creating model', function () {
        return MovieModel.create(MockDataBasicAccount.slice(0, 3));
    });


    describe('Function findMoviesAddedByUser =>', function () {
        it('responds with one record', async function () {
            const res = await MovieModel.findMoviesAddedByUser(123);
            console.log(res[0]);
            res.should.have.length(3);
            res.should.be.an('array');//.that.includes('Title');
            res[0].should.be.an('object');
            res[0].should.have.property('Title');
            res[0].should.have.property('Director');
            res[0].should.have.property('Released');
            res[0].should.have.property('Genre');
        });
    });

    describe('Function MovieDetails =>', function () {

        // console.log('movie', film)
        it('Details of one movie', async function () {
            const data = await MovieModel.findOne({ Title: "Jackie Brown", AddedBy: 123 })
            console.log('movie data', data!.id);
            // console.log('movie ', data._id);
            expect(data!.id).to.be.a('string');
            const res = await MovieModel.findMovieDetails(data!._id, 123);
            console.log("second test", res);
            // res.should.have.length(1);
            // res.should.be.an('array');//.that.includes('Title');
            res!.should.be.an('object');
            res!.should.have.property('Title');
            res!.should.have.property('Director');
            res!.should.have.property('Released');
            res!.should.have.property('Genre');
            res!.should.have.property('Plot');
            res!.should.have.property('Actors');
            res!.should.have.property('Awards');

        });
    });

    describe('Function  checkHowManyMovies=>', function () {

        // console.log('movie', film)
        it('How many added by user', async function () {
            const month = DateforDb()
            const res = await MovieModel.checkHowManyMovies(123, month);
            const howManyAddedThisMonth = res!.length;
            console.log("second test", res);
            // res.should.have.length(1);
            // res.should.be.an('array');//.that.includes('Title');
            howManyAddedThisMonth.should.be.equal(3);

        });
    });

    describe('Function  checkIfArleadyExists=>', function () {


        // console.log('movie', film)
        it('checking if the movie exists', async function () {
            const month = DateforDb()
            const res = await MovieModel.checkIfArleadyExists("Jackie", 123);
            const one = await MovieModel.find({});
            console.log("One=->", one);
            log.info(res, 'Data jackie brown')

            expect(res).to.not.be.null;


        });
    });

    describe('Function  checkIfArleadyExists=>', function () {

        // console.log('movie', film)
        it('Movie isn`t on user list arleady', async function () {

            const month = DateforDb()
            const res = await MovieModel.checkIfArleadyExists("James", 123);
            log.info(res, 'Data')
            expect(res).to.be.null;

            // res.should.have.length(1);
            // res.should.be.an('array');//.that.includes('Title');

        });
    });


});