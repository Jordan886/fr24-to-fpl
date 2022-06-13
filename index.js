const { program } = require('commander')
const fs  = require('fs')
const { parse } = require('csv-parse/sync')


program
  .name('csv-converter')
  .description('Convert FR24 csv data position in usable coordinates')
  .version('0.1.0')
  .requiredOption('--csv <csv>', 'file to parse')
  .option('--sample <sample>', 'take one point every X coordinates (default to 10)', 10)

program.parse()

// console.log(program.parse())
const options = program.opts()
console.log(options)
let csv_records
try {
  const csv_raw = fs.readFileSync(options.csv)
  csv_records = parse(csv_raw, {columns: true})
} catch (error) {
  console.error(error.message)
  console.error('Error reading the file, check the name or path')
}

let coordinates = []
for (raw of csv_records) {
  // only take in consideration position in flight not ground
  if( raw.Altitude > 0 ) {
    const coordinates_raw = raw.Position.split(',')
    const coordinates_dms = convertDMS(coordinates_raw[0],coordinates_raw[1])
    coordinates.push(coordinates_dms)
  }
}

// avoid duplicate coordinates
coordinates_unique = [...new Set(coordinates)]

let sampled_coordinates = ''
let counter = 0
// sample the number of coordinates to facilitate the reading
console.log('sampling ', options.sample, ' files')
for (coordinate of coordinates_unique) {
  counter = counter + 1
  if(counter === parseFloat(options.sample) ) {
    sampled_coordinates = sampled_coordinates + ' DCT ' + coordinate
    counter = 0
  }
}

try {
  fs.writeFileSync('result.txt', sampled_coordinates)
  // file written successfully
} catch (err) {
  console.error(err)
}