const express = require("express");
const app = express();
const cors = require("cors");
const csvToJson = require("convert-csv-to-json");
const port = parseInt(process.env.PORT || 9000);
app.use(cors());
const cohorts = csvToJson.fieldDelimiter(",").getJsonFromCsv("cohorts.csv");

function findById(data, id) {
    for (let i = 0; i < data.length; i++) {
        let holder = data[i].id.toString();
        if (holder === id) {
            return data[i];
        }
    }
}

app.get("/", (request, response) => {
    response.json(cohorts);
});

app.get("/:id", function(request, response) {
    var record = findById(cohorts, request.params.id);
    if (!record) {
        response.status(404).json({
            error: {
                message: "No record found!"
            }
        });
    } else {
        response.json({ cohorts: record });
    }
});

app.listen(port);
