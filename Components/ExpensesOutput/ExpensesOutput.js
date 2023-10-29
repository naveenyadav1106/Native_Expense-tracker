import { View, StyleSheet, Text } from 'react-native'

import ExpensesList from './ExpensesList'
import ExpensesSummary from './ExpensesSummary'
import { GlobalStyles } from '../../constants/styles'



export default function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {

    let content = <Text style={styles.fallbackText}>{fallbackText}</Text>

    if (expenses.length > 0) {
        content = <ExpensesList expenses={expenses} />
    }

    return (
        <View style={styles.container}>
            <ExpensesSummary periodName={expensesPeriod} expenses={expenses} />
            {content}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
    fallbackText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 32,
        fontSize: 16,
        fontWeight: 'bold',

    }
}) 