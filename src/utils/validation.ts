import React from 'react';
import { z } from 'zod';
import moment from 'moment';

import { MIN_DELIVERY_TIME } from '../config/config';

export const Url = z.string().url();
export type Url = z.infer<typeof Url>;

export const TweetUrl = Url.regex(/^https:\/\/twitter\.com\/\w{2,}\/status\/\d{2,}/);
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

export const validateBountyData = (data: any) => {
  const error: any = {};
  if (!data.requestDue.length) error.requestDue = `Please enter request deadline`;
  const nextValidDate = moment(new Date()).add(3, 'days');
  const isValidRequestDate = moment(data.requestDue).diff(nextValidDate, 'days') <= -1;
  if (isValidRequestDate) error.requestDue = `Deadline must be greater or ${moment(nextValidDate).format('LL')}`;
  if (!data.creator.length) error.creator = `Please enter creator's twitter handle`;
  if (!data.instructions.length) error.instructions = `Please enter instructions`;
  if (!data.offerAmount.length) error.offerAmount = `Please enter offer amount`;
  if (!data.recipientWallet.length) error.recipientWallet = `Please enter recipient wallet address`;
  if (!data.isTwitterAccount) error.creator = `Invalid creator's twitter handle`;
  if (!data.recipientWallet && data.recipientWallet.includes(' ')) error.recipientWallet = `Invalid wallet address`;
  if (!data.recipientWallet && data.recipientWallet.length !== 42) error.recipientWallet = `Invalid wallet address`;
  return error;
};
