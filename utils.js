const {google} = require('googleapis');
//const spreadsheetId = '1im_YNMczWd2bqw8m0ueOQQ1gFpHwnDK74cRGBPEKeVY'; // OLD ID
const spreadsheetId = '1SgiHV19wxoe18emjUn8xRqwDLFYukp8-V3X0LJFR_oM'; //NEW ID
const log = console.log;
const USER_COLUMNS = {
    'Fecha/Alumno': 'A3:A',
    'Maximo Larraya': 'B3:B',
    'Martin Delbueno': 'C3:C',
    'Oliverio Velazquez': 'D3:D',
}
const setUserHours = async (user, hours, date = today())=>{
    console.log({user,hours,date})
    let {requestedUserColumn, arrOfColumns} = await getUserColumns(user)
    
    const indexOfNewCell = requestedUserColumn.findIndex(e=> e==='')
    const userColumnIndex = getIndexColumn(arrOfColumns,requestedUserColumn)
    requestedUserColumn[indexOfNewCell] = hours;
    arrOfColumns[userColumnIndex] = requestedUserColumn;

    const dateColumns = arrOfColumns[0]
    if(!dateColumns[indexOfNewCell]){
        dateColumns[indexOfNewCell] = date
        arrOfColumns[0] = dateColumns
    }
    let res = null;
    try{
        res = await setSheetInfo('COLUMNS', 'InfoTEC!A3:D102', arrOfColumns);
        console.log(res)
        }    catch (error){
            console.error(error)
        }
        finally{
            return res.data.totalUpdatedColumns
        }
}

const fetchUserHours = async(user)=>{ 


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
const getSheetInfo = async (format, range='InfoTEC!A3:D102')=>{
    const {sheets, auth} = await fetchSheets();
    return await sheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: range,
        majorDimension: format
    })
}
const setSheetInfo = async (format, range='InfoTEC!A3:D102',data)=>{
    const {sheets, auth} = await fetchSheets();

    return sheets.spreadsheets.values.batchUpdate({
        spreadsheetId,
        resource:{
            "data": [
                {
                    range,
                    "values": data,
                    majorDimension: 
                    format,
                }
            ],
            "valueInputOption": "USER_ENTERED"
        }
        
    }
    )
}

const getUserColumns = async (user) => {
    
    const sheetData = await getSheetInfo('COLUMNS');
  
    const arrOfColumns = sheetData.data.values;

    const normalizedUser = toNormalForm(user);
    
    const requestedUserColumn = arrOfColumns.filter((e, index) => {
        if (!e[0]) return false;
    
        normalizedUserIterated = toNormalForm(e[0]);
        const requestedUserColumn = normalizedUserIterated.includes(normalizedUser)
        return requestedUserColumn;
      }).flat();
    return {requestedUserColumn, arrOfColumns}
  };
const toNormalForm = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}
const today = ()=>{
    const date = new Date();
    const day = date.getDate()
    const month = date.getMonth() + 1;

    return `${day}/${month}`
}
const arraysEqual = (arr1, arr2)=> {
    // Check if the arrays have the same length
    if (arr1.length !== arr2.length) {
      return false;
    }
  
    // Check if every element in arr1 is equal to the corresponding element in arr2
    return arr1.every((element, index) => {
      return element === arr2[index];
    });
  }
const getIndexColumn = (arrOfColumns, column)=>{
    const indexOfColumn = arrOfColumns.findIndex(e => arraysEqual(e,column))
    return indexOfColumn
}
module.exports = {fetchUserHours, setUserHours}



