async function toDegreesMinutesAndSeconds(coordinate) {
  const absolute = Math.abs(coordinate);
  const degrees = Math.floor(absolute);
  const decimal_part = coordinate % 1 // if your number is 1.12 will give 0.12
  const minutes_decimal = parseFloat(decimal_part).toFixed(2) * 60
  const minutes_abs = Math.abs(minutes_decimal)
  const minutes = Math.round(minutes_abs)
  // seconds not implemented
  // .padStart(2, '0') add a trailing zero if number is single digit
  return String(degrees).padStart(2, '0') + String(minutes).padStart(2, '0')
}

async function convertDMS(lat, lng) {
  var latitude = await toDegreesMinutesAndSeconds(lat);
  var latitudeCardinal = lat >= 0 ? "N" : "S";

  var longitude = await toDegreesMinutesAndSeconds(lng);
  var longitudeCardinal = lng >= 0 ? "E" : "W";

  return (
    latitude + latitudeCardinal + longitude + longitudeCardinal
  )
}

module.exports = { convertDMS }