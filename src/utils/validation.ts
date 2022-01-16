import React from 'react';
import { z } from 'zod';

import { MIN_DELIVERY_TIME } from '../config/config';

export const Url = z.string().url();
export type Url = z.infer<typeof Url>;

export const TweetUrl = Url.regex(/^https\:\/\/twitter\.com\/\w{2,}\/status\/\d{2,}/)
export type TweetUrl = z.infer<typeof TweetUrl>;

export const Number = z.number();
export type Number = z.infer<typeof Number>;

export const DeliveryTime = z.number().gte(MIN_DELIVERY_TIME); // miminum 3 days
export type DeliveryTime = z.infer<typeof DeliveryTime>;

export const Address = z.string().length(42);
export type Address = z.infer<typeof Address>;

export const errorHandle = (e: any, cb: (content: any, options?: any) => React.ReactText, done?: () => void) => {
  if (e instanceof z.ZodError) {
    for (let i = 0; i < e.issues.length; i++) {
      if (e && e.issues) {
        cb(e.issues[i].message);
      }
    }
  }
  if (done) {
    done();
  }
};
