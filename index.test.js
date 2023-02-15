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
            genre:"Rock"
        })
        let foundBand = await Band.findAll({
            where:{
                name:"Beatles"
            }
        })
        expect(foundBand[0]['name']).toBe('Beatles');
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
})