// @flow
import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import getWeek from "date-fns/get_iso_week";

import styled from "styled-components";

const Day = styled.div`
  height: 30px;
  width: 28px;
  background: #0a1450;
  display: inline-flex;
  color: ${({ withinPeriod }) =>
    withinPeriod ? "hsl(231, 60%, 65%)" : "hsl(231, 30%, 40%)"};
  padding: 10px;
  justify-content: center;
  align-items: center;
  font-size: 11px;
  line-height: 11px;
  border: 1px solid transparent;
  border-radius: 50px;

  &:hover {
    transition: all 400ms;
    border: 1px solid hsl(231, 60%, 65%);
  }
`;

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-weight: lighter;
  letter-spacing: 1px;

  padding: 20px;
  background: #0a1450;
  display: inline-block;
  margin: 30px;
`;

addDecorator(fn => <Container>{fn()}</Container>);

import Calendar from "../src/index";

storiesOf("Calendar", module).add("with text", () => (
  <Calendar
    range="month"
    interval="day"
    pad="week"
    sectionBy={getWeek}
    renderItem={({ date, withinPeriod }) => {
      return (
        <Day key={date} withinPeriod={withinPeriod}>
          {date.getDate()}
        </Day>
      );
    }}
    renderSection={({ key, values, children }) => (
      <div key={key}>{children}</div>
    )}
  />
));
