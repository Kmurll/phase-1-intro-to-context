// This function creates a new employee record object using the input array. The input array must contain the employee's firstName, familyName, title, and payPerHour information.
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],  // Array to store TimeIn events
      timeOutEvents: []  // Array to store TimeOut events
    };
  }
  
//   This function generates an array of employee records using the given array of arrays. Each sub-array in the input represents an employee's data, including their firstName, familyName, title, and payPerHour.
  function createEmployeeRecords(arr) {
    return arr.map(createEmployeeRecord)
  }
  
//   This function records a Time-In event for an employee. It takes a dateStamp string in the format "YYYY-MM-DD HH:MM" and adds the Time-In event to the employee's record with the corresponding date and time.
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employee.timeInEvents.push({ type: "TimeIn", date: date, hour: parseInt(hour, 10) })
    return employee
  }
  
//   This function adds a Time-Out event to an employee's record. It takes a dateStamp string in the format "YYYY-MM-DD HH:MM" and records the Time-Out event for the specified date and time.
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ')
    employee.timeOutEvents.push({ type: "TimeOut", date: date, hour: parseInt(hour, 10) })
    return employee
  }
  
//   This function determines the total hours worked by an employee on a specific date.
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date).hour
    const timeOut = employee.timeOutEvents.find(event => event.date === date).hour
    return (timeOut - timeIn) / 100 // The hour is stored as a 24-hour integer (e.g., 800, 1700)
  }
  
//   This function computes the wages earned by an employee on a particular date.
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date)
    return hoursWorked * employee.payPerHour
  }
  
//   This function determines the overall wages earned by an employee for all the dates they have worked.
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    return datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0)
  }
  
//   This function computes the total cost of payroll for all employees present in the given array.
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee),0)
}
