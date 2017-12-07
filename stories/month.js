// @flow
import styled from "styled-components";

import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import getWeek from "date-fns/get_iso_week";

import Calendar from "../src/index";

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
  font-size: 12px;
  line-height: 11px;
  border: 1px solid transparent;
  border-radius: 50px;

  &:hover {
    transition: all 400ms;
    background: hsla(338, 100%, 60%, 0.3);
    color: white;
    cursor: pointer;
  }
`;

const WeekDay = styled.span`
  color: #00f8b7;
  font-size: 14px;
`;

const WeekDays = styled.div`
  margin: 10px 19px 10px;
  display: flex;
  justify-content: space-between;
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

storiesOf("month", module)
  .addDecorator(fn => {
    const weekDays = ["M", "T", "W", "T", "F", "S", "S"];

    return (
      <Container>
        <WeekDays>{weekDays.map(d => <WeekDay>{d}</WeekDay>)}</WeekDays>
        {fn()}
      </Container>
    );
  })
  .add("with styles", () => (
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
