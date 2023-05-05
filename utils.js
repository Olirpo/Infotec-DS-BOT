const {google} = require('googleapis');
const spreadsheetId = '1im_YNMczWd2bqw8m0ueOQQ1gFpHwnDK74cRGBPEKeVY';
const log = console.log
const setUserHours = async (user)=>{

    const auth = new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

}

const fetchUserHours = async (user)=>{

    const columns = await getSheetInfo('COLUMNS');

    const values = columns.data.values;

    const normalizedUser = toNormalForm(user);

    const requestedUserList = values.filter(e=>{
        if(!e[0]) return false;

        normalizedUserIterated = toNormalForm(e[0])

        return normalizedUserIterated.includes(normalizedUser)
    })

    const totalHours = requestedUserList.flat().at(-1)
    return totalHours
}

const googleAuth = ()=>{
    return new google.auth.GoogleAuth({
        keyFile: './credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });
}
const fetchSheets = async()=>{
    const auth = googleAuth();
    const client = await auth.getClient();
    const sheets = google.sheets({version:'v4', auth: client})
    return {
        sheets,
        auth
    }
}
const getSheetInfo = async (format, range='Hoja 1')=>{
    const {sheets, auth} = await fetchSheets();
    return await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: range,
        majorDimension: format
    })
}

const toNormalForm = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
module.exports = {fetchUserHours}