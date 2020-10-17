
export const getQuarterAndYear = (date?: Date) => {
  const dateObj = date || new Date();
  const quarter = Math.floor((dateObj.getMonth() + 4) / 4);
  return {
    quarter,
    year: dateObj.getFullYear()
  }
}

export const getDatesByQuarter = (date?: Date) => {
  const { quarter, year } = getQuarterAndYear(date || new Date());
  switch(quarter) {
    case 1:
      return {
        from: `${year}-01-01`,
        to: `${year}-04-30`
      }
    case 2:
      return {
        from: `${year}-05-01`,
        to: `${year}-08-31`
      }
    case 3:
      return {
        from: `${year}-09-01`,
        to: `${year}-12-31`
      }
    default:
      return {
        error: 'Quarter not found',
      }
  }

}