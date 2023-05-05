
const {google} = require('googleapis');

const fetchHoursFromUser = async (user)=>{
    console.log(user)
    const normalizedUserGiven = toNormalForm(user);
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
        if(!e[0]) return false;

        normalizedUserIterated = toNormalForm(e[0])

        return normalizedUserIterated.includes(normalizedUserGiven)
    })

    const totalHours = requestedUser.flat().at(-1)
    return totalHours
}
function toNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
module.exports = fetchHoursFromUser