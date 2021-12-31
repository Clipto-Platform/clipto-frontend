import { doesNotMatch } from "assert";
import { z } from "zod";

export const Url = z.string().url()
export type Url = z.infer<typeof Url>;

export const Number = z.number()
export type Number = z.infer<typeof Number>;

export const Address = z.string().length(42)
export type Address = z.infer<typeof Address>;

export const errorHandle = (e: any, cb: Function, done?: Function) => {
  if (e instanceof z.ZodError) {
    for (let i = 0; i < e.issues.length; i++) {
      if (e && e.issues) {
        cb(e.issues.at(i).message)
      }
    }
  }
  if (done) {
    done()
  }
}