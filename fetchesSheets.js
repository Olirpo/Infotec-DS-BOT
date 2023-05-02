const {google} = require('googleapis');

const hoursFromUser = async (user)=>{
    const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    // Create client instance for Authentication

    const client = await auth.getClient();

    // Instance of Google Sheets API

    const googleSheets = google.sheets({version:'v4', auth: client})

    const spreadsheetId = '1im_YNMczWd2bqw8m0ueOQQ1gFpHwnDK74cRGBPEKeVY';

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: 'Hoja 1',
        majorDimension: 'COLUMNS'
    })

    const values = await getRows.data.values
    const requestedUser = values.filter(e=>{
        return e[0]?.includes(user)
    })

    const totalHours = requestedUser.flat().at(-1)
    console.log(totalHours)
}
hoursFromUser('Cayata')