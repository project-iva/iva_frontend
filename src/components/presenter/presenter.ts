export default interface Presenter {
  nextItem(): void
  prevItem(): void
  finished(): void
}
