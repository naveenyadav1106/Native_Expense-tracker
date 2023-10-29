import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react';

import Input from './Input'
import Button from '../UI/Button';
import { getFormattedDate } from '../../util/date';
import { GlobalStyles } from '../../constants/styles';

export default function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {

    const [Inputs, setInputs] = useState({

        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true,
        },
        date: {
            value: defaultValues ? getFormattedDate(defaultValues.date) : '',
            isValid: true,
        },
        description: {
            value: defaultValues ? defaultValues.description : '',
            isValid: true,
        },
    });

    function InputChangeHandler(inputIdentifier, enteredValue) {
        setInputs((currentInput) => {
            return {
                ...currentInput,
                [inputIdentifier]: { value: enteredValue, isValid: true },
            }
        });
    }

    function submitHandler() {
        const expenseData = {
            amount: +Inputs.amount.value,
            date: new Date(Inputs.date.value),
            description: Inputs.description.value,
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid input', 'Please check your input value')
            setInputs((currentInput) => {
                return {
                    amount: {
                        value: currentInput.amount.value,
                        isValid: amountIsValid
                    },
                    date: {
                        value: currentInput.date.value,
                        isValid: dateIsValid
                    },
                    description: {
                        value: currentInput.description.value,
                        isValid: descriptionIsValid
                    }
                }
            })
            return;
        }

        onSubmit(expenseData)
    }

    const formIsValid =
        !Inputs.amount.isValid ||
        !Inputs.date.isValid ||
        !Inputs.description.isValid;

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.RowContainer}>
                <Input
                    style={styles.rowinput}
                    label="Amount"
                    invalid={!Inputs.amount.isValid}
                    textinputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: InputChangeHandler.bind(this, 'amount'),
                        value: Inputs.amount.value,   //two way binding
                    }}
                />
                <Input
                    style={styles.rowinput}
                    label="Date"
                    invalid={!Inputs.date.isValid}
                    textinputConfig={{
                        placeholder: "YYYY-MM-DD",
                        maxLength: 10,
                        onChangeText: InputChangeHandler.bind(this, 'date'),
                        value: Inputs.date.value,
                    }} />
            </View>
            <Input
                label="Description"
                invalid={!Inputs.description.isValid}
                textinputConfig={{
                    multiline: true,
                    onChangeText: InputChangeHandler.bind(this, 'description'),
                    value: Inputs.description.value,
                    // autoCorrect: false, default is true
                    // autoCapitalize: 'words'/'sentences','none'//////default:sentence
                }}
            />
            {formIsValid && (
                <Text style={styles.errorText}>Invalid input values-please check your input data</Text>
            )}
            <View style={styles.ButtonContainer}>
                <Button
                    mode="flat"
                    style={styles.Button}
                    onPress={onCancel}>
                    Cancel
                </Button>
                <Button
                    style={styles.Button}
                    onPress={submitHandler}
                >
                    {submitButtonLabel}
                </Button>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    form: {
        marginTop: 80,
    },
    title: {
        marginVertical: 5,
        paddingHorizontal: 2,
        // textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    RowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowinput: {
        flex: 1,
    },
    ButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.colors.error500,
        margin: 8,
    },
})