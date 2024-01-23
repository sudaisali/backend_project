const express = require('express');
const bwipjs = require('bwip-js');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/generateBarcode/:type/:data/:width/:height', (req, res) => {
    const type = req.params.type;
    const data = req.params.data;
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height);

    // Configure the bwip-js options
    const options = {
        bcid: type,        // Barcode type (e.g., 'code128' or 'qrcode')
        text: data,        // Text to encode
        scale: 3,          // Barcode scaling factor (adjust as needed)
        height: 10,        // Barcode height (in millimeters)
        includetext: true,  // Include the text in the barcode
        textxalign: 'center', // Text alignment
        width: width,      // QR code width (in pixels)
        height: height,    // QR code height (in pixels)
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
