<div align="center">
  <h1>react-calendar</h1>
  <p> A React Native inspired date list renderer</p>
</div>

## What is this?

A convenient platform agnostic component for rendering lists of dates for any purpose. You could use
this to build your own date picker, calendar, day planner or basically anything that requires a
sequenced list of dates.

There's just one component which leverages the fashionable render props pattern. It looks and
behaves a lot like a React Native ListView.

## Usage

```jsx
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
  renderSection={({ key, values, children }) => <Week key={key}>{children}</Week>}
/>;
```

## Props

| Props              | Description                                                                                                                            |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------- |
| `range`            | The range of dates in the sequence                                                                                                     |
| `interval`         | The interval between each date in the sequence                                                                                         |
| `pad` _(optional)_ | The padding applied to the range. Useful when rendering a month of dates padded to the start and end of the week                       |
| `renderItem`       | A render prop function that accepts date props for an individual date in the sequence. Render whatever you want here.                  |
| `sectionBy`        | A function that accepts each date and returns a key to group dates by. Useful for grouping date groups together for styling or layout. |
| `renderSection`    | _Required if using `sectionBy`_. A render prop function that accepts section `key`, `values`, and renderItem `children`.               |
