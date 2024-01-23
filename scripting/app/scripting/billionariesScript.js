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
       let name = row['name'];
       let relationShip =row['company.relationship'];
       let company_name = row['company.name']
        processCountry(company_name , name , relationShip)
    })
    .on('end', rowCount => console.log(`Parsed ${rowCount} rows`));






const processCountry = async (company_name , name , relationShip) => {
    const transaction = await Model.sequelize.transaction();
    try {

        const companyName =  await Model.companies.findOne({
            where :{
                company_name : company_name
            },
           transaction
        })

        const existingCompany = await Model.billionaries.findOne({
            where: {
                person_name:name
                
            },
            transaction
        });
        if (!existingCompany) {
            await Model.billionaries.create({
                person_name:name,
                person_company_relation:relationShip,
                companyId:companyName.id               

            }, { transaction });
        }
        await transaction.commit();
    } catch (error) { 
        await transaction.rollback();
        console.log(error)
      

    }


   
}