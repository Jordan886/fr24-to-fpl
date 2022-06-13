const { convertDMS } = require('./convert_to_dms')

async function convert (csv_records, sampling_num) {
  let coordinates = []
  for (raw of csv_records) {
    // only take in consideration position in flight not ground
    if( raw.Altitude > 0 ) {
      const coordinates_raw = raw.Position.split(',')
      const coordinates_dms = await convertDMS(coordinates_raw[0],coordinates_raw[1])
      coordinates.push(coordinates_dms)
    }
  }

  // avoid duplicate coordinates
  coordinates_unique = [...new Set(coordinates)]
  let sampled_coordinates = ''
  let counter = 0
  // sample the number of coordinates to facilitate the reading
  console.log('sampling ', sampling_num, ' files')
  for (coordinate of coordinates_unique) {
    counter = counter + 1
    if(counter === parseFloat(sampling_num) ) {
      sampled_coordinates = sampled_coordinates + ' DCT ' + coordinate
      counter = 0
    }
  }
  return sampled_coordinates
}

module.exports = { convert }