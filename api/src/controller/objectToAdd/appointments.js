let base = [
  {location: "5411f30f-c6ab-4fcc-8648-0c9fbe5dcdbe", email: "1satabilini@hotmail.com", date: "2023-01-18", time: "10:30"},
  {location: "5411f30f-c6ab-4fcc-8648-0c9fbe5dcdbe", email: "2satabilini@hotmail.com", date: "2023-01-18", time: "10:45"},
  {location: "5411f30f-c6ab-4fcc-8648-0c9fbe5dcdbe", email: "3satabilini@hotmail.com", date: "2023-01-20", time: "14:00"},
  {location: "5411f30f-c6ab-4fcc-8648-0c9fbe5dcdbe", email: "4satabilini@hotmail.com", date: "2023-01-20", time: "14:45"},
  // {location: "Rosario", email: "5satabilini@hotmail.com", date: "2023-01-14", time: "15:00"},
]

// para simular un dia con todos los horarios ocupados... no deberia poder clickearse en el calendario
for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 4; j++) {
    let min = ['00', '15', '30', '45']
    base.push({
      location: '5411f30f-c6ab-4fcc-8648-0c9fbe5dcdbe',
      email: `${i}${j}hahaha@jojojo.com`,
      date: '2023-01-25',
      time: i === 0 ? '0' + (i + 9) + ':' + min[j] : '' + (i + 9) + ':' + min[j] 
    })
  }
}

// para simular un dia con pocos horarios libres 
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 4; j++) {
    let min = ['00', '15', '30', '45']
    base.push({
      location: '5411f30f-c6ab-4fcc-8648-0c9fbe5dcdbe',
      email: `${i}${j}hahaha@jojojo.com`,
      date: '2023-01-19',
      time: i === 0 ? '0' + (i + 9) + ':' + min[j] : '' + (i + 9) + ':' + min[j] 
    })
  }
}

module.exports = base;