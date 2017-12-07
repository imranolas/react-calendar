// @flow
import styled from "styled-components";

import React from "react";

import { storiesOf, addDecorator } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import format from "date-fns/format";

import Calendar from "../src/index";

const Hour = styled.div`
  height: 30px;
  width: 100%;
  display: inline-flex;
  color: #0a1450;
  align-items: center;
  font-size: 12px;
  line-height: 11px;
  border-bottom: 1px solid hsla(231, 78%, 18%, 0.2);
`;

const Container = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  letter-spacing: 1px;
  padding: 20px;
  display: inline-block;
  margin: 30px;
`;

storiesOf("day", module)
  .addDecorator(fn => {
    return <Container>{fn()}</Container>;
  })
  .add("with styles", () => (
    <Calendar
      range="day"
      interval="hour"
      renderItem={({ date }) => {
        return <Hour key={date}>{format(date, "HH:mm")}</Hour>;
      }}
    />
  ));
