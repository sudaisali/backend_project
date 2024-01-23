//Flow work
//pick countries and countries code from dataset/billionary.csv and dump into countries table
//condition No duplicate record added

const Model = require('../database/models')
const fs = require('fs')
const path = require('path')
const fastCsv = require('fast-csv')

const filepath = path.join(__dirname, '..', 'dataset', 'billionaires.csv')
console.log(filepath)
fs.createReadStream(filepath)
    .pipe(fastCsv.parse({ headers: true }))
    .on('data', async (row) => {
  console.log(row)
        let country = row['location.citizenship']
        let countryCode = row['location.country code']
        console.log(countryCode)
        processCountry(country , countryCode)
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));






const processCountry = async (country , countryCode) => {
    const transaction = await Model.sequelize.transaction();
    try {
        const existingCountry = await Model.countries.findOne({
            where: {
                country_name: country,
                country_code:countryCode
                
            },
            transaction
        });
        if (!existingCountry) {
           
            await Model.countries.create({
                country_name: country,
                country_code:countryCode

            }, { transaction });
        }
        await transaction.commit();
    } catch (error) { 
        await transaction.rollback();
      

    }


   
}