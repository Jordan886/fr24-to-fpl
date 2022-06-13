const { program } = require('commander')
const fs  = require('fs')
const path = require('path')
const { parse } = require('csv-parse/sync')
const { convert } = require('../functions/convert')

async function start () {
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

  sampled_coordinates = await convert(csv_records, options.sample)

  const savedir = path.dirname(options.csv)
  const filename = path.basename(options.csv, path.extname(options.csv))
  const fullfile = savedir + '/' + filename + '.txt'
  try {
    console.log(`saving ${fullfile}`)
    fs.writeFileSync(fullfile, sampled_coordinates)
  } catch (error) {
    cconsole.error(error.message)
    console.error(`Error writing file ${fullfile}`)
  }
}

start()