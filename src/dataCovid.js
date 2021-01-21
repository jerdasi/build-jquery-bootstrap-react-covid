export class DataCovid {
  constructor(_id, _namaTempat, _kasusPositif, _kasusSembuh, _kasusMeninggal){
    this.id = _id
    this.namaTempat = _namaTempat
    this.kasusPositif = _kasusPositif
    this.kasusSembuh = _kasusSembuh
    this.kasusMeninggal = _kasusMeninggal
  }
  cetakTable() {
    return `<tr><td>${this.namaTempat}</td><td>${this.kasusPositif}</td><td>${this.kasusSembuh}</td><td>${this.kasusMeninggal}`;
  }
}