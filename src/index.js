const Express = require("express");
const server = Express();
const bodyParser = require("body-parser")

/**
 * TEMPLATES: 
 * 
 * measurementTemplate: {
 *  {int} id: id of the measurement
 *  {string} name: name of the sensor
 *  {object} location: {
 *    {float} lon: longitude of the sensor
 *    {float} lat: latitude of the sensor
 *  }
 *  {value} value: measured value 
 *  {string} created_at: timestamp of the measurement
 * }
 * 
*/


// port of the API server
const PORT = 3000;

// helpers
const pg = require("./helpers/DBHelper.js");

// routes
const sensors = require("./routes/sensors.js");
const measurements = require("./routes/measurements.js");


// configurate the server
server.use(bodyParser.urlencoded({
  extended: true
}));
server.use(bodyParser.json());


// initialise the endpoints
sensors.initialiseEndpoints(server, pg);
measurements.initialiseEndpoints(server, pg);


/**
 * Get oversight of the added values
 * 
 * @params: 
 * @returns {[ measurementTemplate ]}
 *
*/

server.get("/", async (req, res) => {
  pg.select(["measurements.created_at", "sensors.name", "sensors.location", "measurements.id", "measurements.value"]).table("measurements").join('sensors', 'sensors.id', '=', 'measurements.sensor_id')
  .then((data) => {
    res.send(data)
  })
})



// Start the server
server.listen(PORT, (res) => {
  console.log(`running on ${PORT}`);
})



