// Your code here
function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents:[],
        timeOutEvents: []

    }
}

function createEmployeeRecords(employeeData) {
    return employeeData.map(employee => {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, dateStamp) {
   let [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date, 
    })
    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
     employee.timeOutEvents.push({
         type: "TimeOut",
         hour: parseInt(hour, 10),
         date, 
     })
     return employee
 }

 function hoursWorkedOnDate(employee, date) {
    let timeIn = employee.timeInEvents.find((e) => {
        return e.date === date
    })

    let timeOut = employee.timeOutEvents.find((e) => {
        return e.date === date
    })

    return (timeOut.hour - timeIn.hour) / 100
 }

 function wagesEarnedOnDate(employee, date) {
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wage.toString())
 }

 function allWagesFor(employee) {
    let datesWorked = employee.timeInEvents.map(employee => {
        return employee.date
    })

    let payOwed = datesWorked.reduce((memo, d) => {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payOwed
 }

 function calculatePayroll(employee) {
    return employee.reduce((memo, record) => {
        return memo + allWagesFor(record)
    }, 0)
 }