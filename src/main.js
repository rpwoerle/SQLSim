var connection = new JsStore.Connection();

document.addEventListener("DOMContentLoaded", function (event) {
    console.log("DOM fully loaded and parsed");
    initDB();
});

function initDB() {
    if (connection.initDb(getDbSchema())) {
        console.log("Database initiated");
        initData([
            "customers",
            "categories",
            "employees",
            "orderdetails",
            "orders",
            "products",
            "shippers",
            "suppliers"
        ]);
    } else {
        console.log("Error Database initiation");
    }
}


function initData(tables) {
    tables.forEach(tbl => {
        connection.clear(tbl).then(success => {
            if (success) {
                console.log(tbl + " cleared successfully");
            } else {
                console.log("Error clearing " + tbl);
            }
        });

        connection.insert({
            into: tbl,
            values: getTable(tbl), 
        }).then(success => {
            if (success) {
                console.log(tbl + " inserted successfully");
            } else {
                console.log("Error inserting " + tbl);
            }
        });
    });

    // console.log("Clearing table categories: " + tblClear['PromiseStatus']);
    // console.log("Inserting categories: " + tblInsert.PromiseStatus);
 
    // if (connection.insert({
    //     into: "categories",
    //     values: getCategories(), 
    // }) > 0) {
    //     console.log("Categories added");
    // } else {
    //     console.log("Error adding categories");
    //     return;
    // }
    
    // if (connection.insert({
    //     into: "customers",
    //     values: getCustomers(),
    // }) > 0) {
    //     console.log("Customers added");
    // } else {
    //     console.log("Error adding customers");
    // }    
}

/* function initDb() {
    var dbQuery = "DEFINE DB northwind;" + getDbSchema();
    console.log("dbQuery=" + dbQuery);
    try {
        connection.runSql(dbQuery).then(function (isDbCreated) {
            if (isDbCreated) {
                console.log("db initiated");
                initData();
            } else {
                console.log("db not initiated");
            }
            
        });
    }
    catch(err) {
        console.log(err);
    }
}
 *//* function initData() {
    var dbQuery = "INSERT INTO categories VALUES({Name:'jeans', Price:2000, Quantity:1000})"
    
    console.log("dbQuery= " + dbQuery);
    connection.runSql(dbQuery).then(function (rowsInserted) {
        if (rowsInserted > 0) {
            console.log('data successfully inserted');
        }
    }).catch(function (err) {
        console.log(err);
    });
} */

/* function getDbSchema() {
    var dbQuery = "DEFINE DB DemoDB;";
    var tblQuery = `DEFINE TABLE Product (
        Id PRIMARYKEY AUTOINCREMENT,
        Name NOTNULL STRING, 
        Price NOTNULL NUMBER,
        Quantity NOTNULL NUMBER
    )`;
    var query = dbQuery + tblQuery;
    return query;
} */

function runCmd() {
    var dbQuery = document.getElementById("jsinput").value.trim();
    connection.runSql(dbQuery).then(function (results) {
        if (results) {
            console.log(results);
            var rows = "";
            results.forEach(element => {
                var row = "<tr><td>"+ Object.keys(element)[0] + "</td>" +
                          "<td>"+ element.Price + "</td>" +
                          "<td>"+ element.Quantity + "</td></tr>"; 
                rows += row; 
            });
            document.getElementById("results").innerHTML = rows;
        }
    });
}