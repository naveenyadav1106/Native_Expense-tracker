import { createContext, useReducer } from "react";

const Dummy_expenses = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 59.99,
        date: new Date('2023-10-19'),
    },
    {
        id: 'e2',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2023-10-25'),
    },
    {
        id: 'e3',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2023-10-22'),
    },
    {
        id: 'e4',
        description: 'A book',
        amount: 14.99,
        date: new Date('2023-09-19'),
    },
    {
        id: 'e5',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2023-10-28'),
    },
    {
        id: 'e6',
        description: 'A pair of trousers',
        amount: 89.29,
        date: new Date('2023-10-25'),
    },
    {
        id: 'e7',
        description: 'Some bananas',
        amount: 5.99,
        date: new Date('2023-10-29'),
    },
    {
        id: 'e8',
        description: 'A book',
        amount: 14.99,
        date: new Date('2023-10-24'),
    },
    {
        id: 'e9',
        description: 'Another book',
        amount: 18.59,
        date: new Date('2023-10-25'),
    },
];

export const ExpenseContext = createContext({
    expenses: [],
    addExpense: ({ description, amount, date }) => { },
    deleteExpense: (id) => { },
    updateExpense: (id, { description, amount, date }) => { },
});

function ExpensesReducer(state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{ ...action.payload, id: id }, ...state]
        case 'UPDATE':
            //getting index from the state object array
            const updateIndex = state.findIndex(
                (expense) => expense.id === action.payload.id
            );
            const updateExpense = state[updateIndex];
            const updateItem = { ...updateExpense, ...action.payload.data }
            const updatedExpenses = [...state]
            updatedExpenses[updateIndex] = updateItem;
            return updatedExpenses;

        case 'DELETE':
            return state.filter((expense) => expense.id !== action.payload)
        default:
            return state;
    }
}

export default function ExpensesContextProvider({ children }) {




    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // const [state, dispatch] = useReducer(first, second, third)                                                         //
    //                                                                                                                    //
    // The useReducer Hook takes two arguments:(1)-A reducer function                                                     //
    //                                         (2)-An initial state                                                       //
    //                                                                                                                    //
    // And it returns:(1)-A stateful value                                                                                // 
    //                (2)-A dispatch function (to “dispatch” user actions to the reducer)                                 //
    //                                                                                                                    //
    // The object you pass to dispatch is called an “action”:                                                             //
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



    const [expensesState, dispatch] = useReducer(ExpensesReducer, Dummy_expenses);

    function AddExpense(expenseData) {
        dispatch({ type: 'ADD', payload: expenseData });      //-----object inside dispatch is called action
    }

    function DeleteExpense(id) {
        dispatch({ type: 'DELETE', payload: id })            //-----object inside dispatch is called action
    }

    function UpdateExpense(id, expenseData) {
        dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } })    //--payload is the actual data beside TYPE(action)
    }


    const value = {
        expenses: expensesState,
        addExpense: AddExpense,
        deleteExpense: DeleteExpense,
        updateExpense: UpdateExpense,
    };

    return (
        <ExpenseContext.Provider value={value}>
            {children}
        </ExpenseContext.Provider>
    )
}