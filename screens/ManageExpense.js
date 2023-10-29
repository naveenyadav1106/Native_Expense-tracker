import { View, StyleSheet } from 'react-native'
import { GlobalStyles } from '../constants/styles'

import { useContext, useEffect, useLayoutEffect } from 'react';
import { ExpenseContext } from '../store/Expenses-Context';

import IconButton from '../Components/UI/IconButton'
import Button from '../Components/UI/Button'
import ExpenseForm from '../Components/MangeExpense/ExpenseForm';

export default function ManageExpense({ route, navigation }) {

    const ExpenseCtx = useContext(ExpenseContext)

    const EditedExpenseId = route.params?.expenseId;
    const isEditing = !!EditedExpenseId;

    const selectedExpense = ExpenseCtx.expenses.find(expense => expense.id === EditedExpenseId);

    ////////////////////////////////////////////////////////////////////////////////////////////////////
    //we never use options from inside a screen,                                                      //
    //although it is not recommended but if we do use it then we use should useEffect hook with it    //
    //                                                                                                //
    // useLayoutEffect(() => {                                                                        //
    //     navigation.setOptions({                                                                    //
    //         title: isEditing ? 'Edit Expense' : 'Add Expense'                                      //
    //     })                                                                                         //
    // }, [navigation, isEditing])                                                                    //
    //                                                                                                //
    //                                         OR                                                     //

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    }, [navigation, isEditing])

    function ConfirmHandler(expenseData) {
        if (isEditing) {
            ExpenseCtx.updateExpense(EditedExpenseId, expenseData);
        } else {
            ExpenseCtx.addExpense(expenseData);
        }
        navigation.goBack();
    }

    function DeleteExpense() {
        ExpenseCtx.deleteExpense(EditedExpenseId)
        navigation.goBack();
    }

    function CancelHandler() {
        navigation.goBack();
    }


    return (
        <View style={styles.Container}>
            <ExpenseForm
                onSubmit={ConfirmHandler}
                onCancel={CancelHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                defaultValues={selectedExpense}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        icon="trash"
                        color={GlobalStyles.colors.error500}
                        size={36}
                        onPress={DeleteExpense}
                    />
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center',
    },
})