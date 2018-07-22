export default class Greeter {
  #greeting = 'Hello, world!'

  greet() {
    // eslint-disable-next-line no-console
    console.log(this.#greeting)
  }
}
