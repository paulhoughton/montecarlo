importScripts("monte.min.js")

onmessage = function ({data: { investment, avgReturn, volatility, years, repeated }}) {
  console.time("calc")
  var [total, min, max] = monte.calcValues(
    investment, 
    avgReturn / 100, 
    volatility / 100 * volatility / 100,
    years, 
    repeated,
    (position)=>postMessage({position})
  )

  console.timeEnd("calc")
  postMessage({
    avg: Math.floor(total/repeated).toLocaleString(),
    min: Math.floor(min).toLocaleString(),
    max: Math.floor(max).toLocaleString()
  });
}