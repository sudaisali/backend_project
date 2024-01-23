const express = require('express');
const bwipjs = require('bwip-js');
const vCard = require('vcf');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/generateBusinessCard/:name/:title/:company/:phone/:email', (req, res) => {
    const name = req.params.name;
    const title = req.params.title;
    const company = req.params.company;
    const phone = req.params.phone;
    const email = req.params.email;

    // Create a vCard
    const vcard = new vCard();
    vcard.add('FN', name);
    vcard.add('TITLE', title);
    vcard.add('ORG', company);
    vcard.add('TEL', phone);
    vcard.add('EMAIL', email);

    // Get the vCard data as a string
    const vcardData = vcard.toString();
    console.log(vcardData)

    // Configure the bwip-js options
    const options = {
        bcid: 'code128',    // Barcode type (QR code)
        text: vcardData,   // vCard data
        scale: 3,          // Barcode scaling factor (adjust as needed)
        height: 70,       // QR code height (in pixels)
        includetext: true,  // Include the text in the barcode
        textxalign: 'center', // Text alignment
        width: 70,        // QR code width (in pixels)
    };

    // Generate barcode as SVG
    bwipjs.toBuffer(options, (err, png) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.set('Content-Type', 'image/png');
            res.send(png);
        }
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
