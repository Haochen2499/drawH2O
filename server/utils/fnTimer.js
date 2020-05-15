const timer = async (fn, label) => {
  console.time(label)
  await fn()
  console.timeEnd(label)
}

module.exports = timer