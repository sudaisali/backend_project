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
       let company_name = row['company.name'];
       let company_founded =row['company.founded'];
       let company_sector = row['company.sector'];
       let company_type = row['company.type']
        processCountry(company_name , company_founded , company_sector , company_type)
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));






const processCountry = async (company_name , company_founded , company_sector , company_type) => {
    const transaction = await Model.sequelize.transaction();
    try {

        const companySectorId =  await Model.sectors.findOne({
            where :{
                sector_name : company_sector
            },
           transaction
        })

        const existingCompany = await Model.companies.findOne({
            where: {
                company_name
                
            },
            transaction
        });
        if (!existingCompany) {
            await Model.companies.create({
                company_name,
                company_founded,
                sectorId:companySectorId.id,
                company_type

            }, { transaction });
        }
        await transaction.commit();
    } catch (error) { 
        await transaction.rollback();
        console.log(error)
      

    }


   
}