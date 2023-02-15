const {sequelize} = require('./db');
const {Band, Musician} = require('./index')

describe('Band and Musician Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
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
        console.log((await musician3).dataValues.name)
        expect((await musician3).dataValues.name).toBe('Hans Zimmer');//need to put the await musician3 in brackets together
    })
})