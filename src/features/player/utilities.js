export function convertSecondsToMinutes(totalSeconds) {
  totalSeconds = Math.round(totalSeconds)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  const addLeadingZero = number => `${number <= 9 ? '0' : ''}${number}`

  return `${addLeadingZero(minutes)}:${addLeadingZero(seconds)}`
}

export function shuffleArray(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
