// @flow
import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import getWeek from "date-fns/get_iso_week";

import Calendar from "../src/index";

storiesOf("Calendar", module).add("with text", () => (
  <Calendar
    range="month"
    interval="day"
    pad="week"
    sectionBy={getWeek}
    renderItem={({ date }) => {
      return <span key={date}>{date.getDate()}</span>;
    }}
    renderSection={({ key, values, children }) => (
      <div key={key}>{children}</div>
    )}
  />
));
