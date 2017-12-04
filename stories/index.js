import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";

import Calendar from "../src/index";

storiesOf("Calendar", module).add("with text", () => (
  <Calendar
    range="month"
    renderItem={({ date }) => {
      return <span>{date.getDate()}</span>;
    }}
  />
));
