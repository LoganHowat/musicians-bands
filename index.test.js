const {sequelize} = require('./db');
const {Band, Musician, Song} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
     Band.drop()
     Musician.drop()
     Song.drop()
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run {force:true}
        await sequelize.sync();//remove the force:true
    })

    test('can create a Band', async () => {
        // TODO - test creating a band
        let band1 = Band.create({
            name:"Beatles",
            genre:"Rock",
            showCount:100
        })
        let foundBand = await Band.findAll({
            where:{
                name:"Beatles"
            }
        })
        expect(foundBand[0]['name']).toBe('Beatles');
        expect(foundBand[0]['genre']).toBe('Rock');
        expect(foundBand[0]['showCount']).toBe(100)
    })

    test('can create a Musician', async () => {
        // TODO - test creating a musician
        let musician1 = Musician.create({
            name:"John Williams",
            instrument:"Orchestra"
        })
        let foundMusician = await Musician.findAll({
            where:{
                name:"John Williams"
            }
        })
        expect(foundMusician[0]['name']).toBe('John Williams');
    })
    test('can destroy a Musician Instance', async () => {
        let musician2 = Musician.create({
            name:"Test",
            instrument:"Orchestra"
        });
        (await musician2).destroy();
        let foundTest = await Musician.findAll({
            where:{
                name: "Test"
            }
        })
        expect(foundTest.length).toBe(0);
    })

    test('can update a Musician Instance', async () => {
        let musician3 = Musician.create({
            name:"Updating",
            instrument:"Orchestra"
        });
        let updated = (await musician3).update({name:'Hans Zimmer'});
        expect((await musician3).dataValues.name).toBe('Hans Zimmer');//need to put the await musician3 in brackets together
    })

    test('Testing the association', async () => {
        const foundBand = await Band.findByPk(1)
        await foundBand.addMusician(1)
        const BandMusician = await foundBand.getMusicians()//returns john williams as John williams was added to the beatles with the band ID of 1
        expect((await BandMusician)[0].dataValues['name']).toBe('John Williams');//need to put the await musician3 in brackets together
        expect((await BandMusician)[0].dataValues.id).toBe(1);
        expect((await BandMusician)[0].dataValues.bandId).toBe(1);
    })

    test('Testing the association', async () => {
        let band = await Band.findByPk(1)
        Song.create({
            title:"Yellow Submarine",
            year:1967
        });
        Song.create({
            title:"Strawberry fields",
            year:1970
        });
        band.addSong(1)
        band.addSong(2)
        const bandsongs = await band.getSongs()//this gets the songs associated with band with id 1
        expect((await bandsongs)[0].dataValues.id).toBe(1);
        expect((await bandsongs)[0].dataValues.title).toBe('Yellow Submarine');
        expect((await bandsongs)[1].dataValues.id).toBe(2);
        expect((await bandsongs)[1].dataValues.title).toBe('Strawberry fields');
    })
//Need to write tests to finish up the coding rooms task
    Band.drop()
    Musician.drop()
    Song.drop()
})