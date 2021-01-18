export type albumViewUpdate = {
  type: string,
  value?: albumView
}

export enum albumView {
  Tracks = "TRACKS",
  Stream = "STREAM"
}

export type stringKeyOptions = {
  [key: string]: any
}