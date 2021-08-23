export default class Message {
  email;
  date;
  text;
  constructor(email: string, date: string, text: string) {
    this.email = email;
    this.date = date;
    this.text = text;
  }
}
