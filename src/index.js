// @flow
import React from "react";

import isBefore from "date-fns/is_before";
import isAfter from "date-fns/is_after";

import { type Period } from "./types";
import { startOf, endOf, add } from "./utils";

type Range = [Date, Date];

type Item = {
  date: Date
};

type Section = {
  key: any,
  values: Array<Date>,
  children: Array<React$Element<*>>
};

type Props = {
  renderItem: (item: Item) => React$Element<*>,
  renderSection: (section: Section) => React$Element<*>,
  sectionBy: (date: Date) => any,
  range: Period,
  interval: Period,
  pad: Period
};

class Calendar extends React.Component<Props> {
  getDateRange = (): Range => {
    const { range, pad } = this.props;
    const now = new Date();
    return [startOf(range, pad)(now), endOf(range, pad)(now)];
  };

  getDates = ([start, end]: Range) => {
    let dates = [];
    let next = start;
    while (isBefore(next, end)) {
      dates.push(next);
      next = add(this.props.interval)(next);
    }

    return dates;
  };

  getSections = (dates: Array<Date>): Map<*, Array<Date>> => {
    const sectionFn = this.props.sectionBy;
    return dates.reduce((dateMap, date) => {
      const key = sectionFn(date);
      return dateMap.set(key, [...(dateMap.get(key) || []), date]);
    }, new Map());
  };

  renderDate = (date: Date, [start, end]: Range) => {
    const { interval, renderItem, pad } = this.props;
    const endOfInterval = endOf(interval)(date);
    return renderItem({
      date,
      startOfInterval: date,
      endOfInterval,
      duration: endOfInterval - date,
      withinPeriod: pad ? isBefore(date, end) && isAfter(date, start) : true
    });
  };

  renderSections = (sections: Map<*, Array<Date>>, range: Range) => {
    const sectionsEl = [];
    for (const [key, values] of sections.entries()) {
      const children = values.map(date => this.renderDate(date, range));
      sectionsEl.push(this.props.renderSection({ key, values, children }));
    }
    return sectionsEl;
  };

  hasSections = () => !!(this.props.sectionBy && this.props.renderSection);

  render() {
    const range = this.getDateRange();
    const dates = this.getDates(range);
    if (!this.hasSections()) {
      return dates.map(date => this.props.renderItem({ date }));
    }

    const sections = this.getSections(dates);
    const sectionEls = this.renderSections(sections, range);
    return sectionEls;
  }
}

export default Calendar;
