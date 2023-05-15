const {google} = require('googleapis');
const spreadsheetId = '1im_YNMczWd2bqw8m0ueOQQ1gFpHwnDK74cRGBPEKeVY';
const log = console.log;
const USER_COLUMNS = {
    'Fecha/Alumno': 'A3:A',
    'Maximo Larraya': 'B3:B',
    'Martin Delbueno': 'C3:C',
    'Oliverio Velazquez': 'D3:D',
}
const setUserHours = async (user, hours, date = today())=>{

    const {requestedUserColumn, arrOfColumns} = await getUserColumns(user)
    
    const dateColumns = arrOfColumns[0]

    const indexOfNewCell = requestedUserColumn.indexOf('')

    requestedUserColumn[indexOfNewCell] = hours;

    if(!dateColumns[indexOfNewCell]){
        dateColumns[indexOfNewCell] = date
    }

    setSheetInfo(COLUMNS, )
    //const indexOfNewCell = userColumn.indexOf(e=> )
}

const fetchUserHours = async (user)=>{ 


    const {requestedUserColumn} = await getUserColumns(user)

    const totalHours = requestedUserColumn.at(-1)

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
const getSheetInfo = async (format, range='InfoTEC!A3:D103')=>{
    const {sheets, auth} = await fetchSheets();
    return await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: range,
        majorDimension: format
    })
}
const setSheetInfo = async (format, range='InfoTEC!A3:D103')=>{
    const {sheets, auth} = await fetchSheets();

    let resource = {
        spreadsheetId: spreadsheetId,
        auth: auth,
        resource: { data: data, valueInputOption: "USER_ENTERED" }
      };
    


    sheets.spreadsheets.values.batchUpdate({
        resource
    })
}

const getUserColumns = async (user) => {
    
    const sheetData = await getSheetInfo('COLUMNS');
  
    const arrOfColumns = sheetData.data.values;

    const normalizedUser = toNormalForm(user);
    
    const requestedUserColumn = arrOfColumns.filter((e) => {
      if (!e[0]) return false;
  
      normalizedUserIterated = toNormalForm(e[0]);
  
      return normalizedUserIterated.includes(normalizedUser);
    }).flat();
    
    return {requestedUserColumn, arrOfColumns}
    /*// If the requested user column is found, return its data
    requestedUserColumn.at(-1)
    const columnIndex = arrOfColumns.indexOf(requestedUserColumn[0]);
    const userColumnData = sheetData.data.values.map((row) => row[columnIndex]);
    console.log(userColumnData)
    return userColumnData;*/
    

    // If the requested user column is not found, return null
    
  };
const toNormalForm = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
const today = ()=>{
    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth() + 1;
    console.log(month)
    return `${date}/${month}`
}

module.exports = {fetchUserHours}


today()
//setUserHours('oli', 11, '11/5')