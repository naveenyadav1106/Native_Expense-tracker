import { View, Text, FlatList } from 'react-native'

import ExpenseItem from './ExpenseItem'

export default function ExpensesList({ expenses }) {

    function renderExpenseItem(itemData) {
        return <ExpenseItem {...itemData.item} />
    }

    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />
    )
}