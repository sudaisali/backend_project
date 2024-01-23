const Model = require('../database/models')
const fs = require('fs')
const path = require('path')
const fastCsv = require('fast-csv')

const filepath = path.join(__dirname, '..', 'dataset', 'billionaires.csv')
console.log(filepath)
fs.createReadStream(filepath)
    .pipe(fastCsv.parse({ headers: true }))
    .on('data', async (row) => {
  
       let company_sector = row['company.sector'];
       console.log(company_sector)
        processCountry(company_sector)
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));






const processCountry = async (company_sector) => {
    const transaction = await Model.sequelize.transaction();
    try {
        const existingCompany = await Model.sectors.findOne({
            where: {
               sector_name:company_sector
                
            },
            transaction
        });
        if (!existingCompany) {
            await Model.sectors.create({
                sector_name:company_sector
            }, { transaction });
        }
        await transaction.commit();
    } catch (error) { 
        await transaction.rollback();
        console.log(error)
      

    }


   
}