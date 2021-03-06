// @flow
import React from "react";

import isBefore from "date-fns/is_before";

import { type Period } from "./types";
import { startOf, endOf, add, same } from "./utils";

type Range = [Date, Date];

type Item = {
  date: Date,
  startOfInterval: Date,
  endOfInterval: Date,
  duration: number,
  withinPeriod: boolean
};

type Section = {
  key: any,
  values: Array<Date>,
  children: Array<React$Element<*>>
};

type Props = {
  activeRange?: Date,
  renderItem: (item: Item) => React$Element<*>,
  renderSection?: (section: Section) => React$Element<*>,
  sectionBy?: (date: Date) => any,
  range: Period,
  interval: Period,
  pad?: Period
};

class Calendar extends React.Component<Props> {
  props: Props;

  getPaddedDateRange = (): Range => {
    const { range, pad, activeRange } = this.props;
    const now = activeRange || new Date();
    return [startOf(range, pad)(now), endOf(range, pad)(now)];
  };

  getDateRange = (): Range => {
    const { range, pad, activeRange } = this.props;
    const now = activeRange || new Date();
    return [startOf(range)(now), endOf(range)(now)];
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
    if (!sectionFn) return new Map();
    return dates.reduce((dateMap, date) => {
      const key = sectionFn(date);
      return dateMap.set(key, [...(dateMap.get(key) || []), date]);
    }, new Map());
  };

  renderDate = (date: Date, index: number) => {
    const { interval, renderItem, pad, range } = this.props;
    const [start] = this.getDateRange();
    const endOfInterval = endOf(interval)(date);
    return renderItem({
      date,
      index,
      startOfInterval: date,
      endOfInterval,
      duration: endOfInterval - date,
      withinPeriod: pad ? same(range)(date, start) : true
    });
  };

  renderSections = (sections: Map<*, Array<Date>>) => {
    const sectionsEl = [];
    const { renderSection } = this.props;
    if (!renderSection) return sectionsEl;
    for (const [key, values] of sections.entries()) {
      const children = values.map(this.renderDate);
      sectionsEl.push(renderSection({ key, values, children }));
    }
    return sectionsEl;
  };

  hasSections = () => !!(this.props.sectionBy && this.props.renderSection);

  render() {
    const range = this.getPaddedDateRange();
    const dates = this.getDates(range);
    if (!this.hasSections()) {
      return dates.map(this.renderDate);
    }

    const sections = this.getSections(dates);
    const sectionEls = this.renderSections(sections);
    return sectionEls;
  }
}

export default Calendar;
