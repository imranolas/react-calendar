// @flow

import { type Period } from "./types";

// startOf*
import startOfSecond from "date-fns/start_of_second";
import startOfMinute from "date-fns/start_of_minute";
import startOfHour from "date-fns/start_of_hour";
import startOfDay from "date-fns/start_of_day";
import startOfMonth from "date-fns/start_of_month";
import startOfWeek from "date-fns/start_of_week";
import startOfQuarter from "date-fns/start_of_quarter";
import startOfYear from "date-fns/start_of_year";

// endOf*
import endOfSecond from "date-fns/end_of_second";
import endOfMinute from "date-fns/end_of_minute";
import endOfHour from "date-fns/end_of_hour";
import endOfDay from "date-fns/end_of_day";
import endOfMonth from "date-fns/end_of_month";
import endOfWeek from "date-fns/end_of_week";
import endOfQuarter from "date-fns/end_of_quarter";
import endOfYear from "date-fns/end_of_year";

// add*
import addSecond from "date-fns/add_seconds";
import addMinute from "date-fns/add_minutes";
import addHour from "date-fns/add_hours";
import addDay from "date-fns/add_days";
import addMonth from "date-fns/add_months";
import addWeek from "date-fns/add_weeks";
import addQuarter from "date-fns/add_quarters";
import addYear from "date-fns/add_years";

// add*
import sameSecond from "date-fns/is_same_second";
import sameMinute from "date-fns/is_same_minute";
import sameHour from "date-fns/is_same_hour";
import sameDay from "date-fns/is_same_day";
import sameMonth from "date-fns/is_same_month";
import sameWeek from "date-fns/is_same_week";
import sameQuarter from "date-fns/is_same_quarter";
import sameYear from "date-fns/is_same_year";

type OfPeriod = {
  [period: Period]: (date: Date, ...args: Array<*>) => Date
};

const startOfMap: OfPeriod = {
  second: startOfSecond,
  minute: startOfMinute,
  hour: startOfHour,
  day: startOfDay,
  month: startOfMonth,
  week: date => startOfWeek(date, { weekStartsOn: 1 }),
  quarter: startOfQuarter,
  year: startOfYear
};

const endOfMap: OfPeriod = {
  second: endOfSecond,
  minute: endOfMinute,
  hour: endOfHour,
  day: endOfDay,
  month: endOfMonth,
  week: date => endOfWeek(date, { weekStartsOn: 1 }),
  quarter: endOfQuarter,
  year: endOfYear
};

const addMap: OfPeriod = {
  second: addSecond,
  minute: addMinute,
  hour: addHour,
  day: addDay,
  month: addMonth,
  week: addWeek,
  quarter: addQuarter,
  year: addYear
};

const sameMap: { [period: Period]: Function } = {
  second: sameSecond,
  minute: sameMinute,
  hour: sameHour,
  day: sameDay,
  month: sameMonth,
  week: sameWeek,
  quarter: sameQuarter,
  year: sameYear
};

export function startOf(period: Period, pad: ?Period) {
  return (date: Date) => {
    if (!pad) {
      return startOfMap[period](date);
    }
    return startOfMap[pad](startOfMap[period](date));
  };
}

export function endOf(period: Period, pad: ?Period) {
  return (date: Date) => {
    if (!pad) {
      return endOfMap[period](date);
    }
    return endOfMap[pad](endOfMap[period](date));
  };
}

export function add(interval: Period) {
  return (date: Date) => addMap[interval](date, 1);
}

export function same(period: Period) {
  return (d1: Date, d2: Date): boolean => {
    return sameMap[period](d1, d2);
  };
}
