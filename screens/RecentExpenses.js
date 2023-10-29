import { useContext } from 'react'
import ExpensesOutput from '../Components/ExpensesOutput/ExpensesOutput'

import { ExpenseContext } from '../store/Expenses-Context'
import { getDateMinusDays } from '../util/date';

export default function RecentExpenses() {

    const ExpenseCtx = useContext(ExpenseContext);

    const recentExpenses = ExpenseCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return (expense.date > date7DaysAgo) && (expense.date <= today);
    })

    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod="Last 7 days"
            fallbackText="No expenses registered for the last 7 days."
        />
    )
}