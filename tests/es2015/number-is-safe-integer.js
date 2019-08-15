assert(
  Number.isSafeInteger(1),
  'Number.isSafeInteger(1)'
)

assert(
  ! Number.isSafeInteger(Math.pow(2, 53)),
  'Number.isSafeInteger(Math.pow(2, 54))'
)
