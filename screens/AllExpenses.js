import { useContext } from 'react'

import { ExpenseContext } from '../store/Expenses-Context'

import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput'

export default function AllExpenses() {

    const ExpenseCtx = useContext(ExpenseContext);

    return (
        <ExpensesOutput
            expenses={ExpenseCtx.expenses}
            expensesPeriod="Total"
            fallbackText="No registered expenses found!"
        />
    )
}