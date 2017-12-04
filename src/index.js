// @flow
import React from "react";
import startOfMonth from "date-fns/start_of_month";
import endOfMonth from "date-fns/end_of_month";
import addDays from "date-fns/add_days";
import isBefore from "date-fns/is_before";

type Range = [Date, Date];

type Item = {
  date: Date
};

type Props = {
  renderItem: Item => React$Element<*>,
  range: "month"
};

class Calendar extends React.Component<Props> {
  getDateRange = () => {
    const { range } = this.props;
    const now = Date.now();
    switch (range) {
      case "day":
      case "week":
      case "month":
        return [startOfMonth(now), endOfMonth(now)];
      case "year":
      default:
        return [startOfMonth(now), endOfMonth(now)];
    }
  };

  getDates = ([start, end]: Range) => {
    let dates = [];
    let next = start;
    while (isBefore(next, end)) {
      dates.push(next);
      next = addDays(next, 1);
    }

    return dates;
  };

  render() {
    const range = this.getDateRange();
    const dates = this.getDates(range);

    return dates.map(date => this.props.renderItem({ date }));
  }
}

export default Calendar;
