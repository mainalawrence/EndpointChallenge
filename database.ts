import sql from 'mssql'

module.exports= async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect('Server=localhost,1433;Database=database;User Id=username;Password=password;Encrypt=true')
        return sql;
    } catch (err) {
        // ... error checks
    }
}