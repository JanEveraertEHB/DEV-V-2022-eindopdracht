
/**
 * 
 * 
*/

function measureValidator(measure, type) {
  const measureLookup = {
    NO2: { min: 0, max: 10},
    PM25: { min: 0, max: 10}
  }

  if(measureLookup[type].min < measure && measureLookup[type].max > measure) {
    return true
  }
  return false
}