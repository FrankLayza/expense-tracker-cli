import { readFile, writeFile } from "node:fs/promises";
import type { Expenses } from "../types.js";

export async function readExpenseFile(): Promise<Expenses[]> {
  try {
    const expensesFile = await readFile("./expenses.json", "utf8");
    if (expensesFile.length === 0) {
      console.error("empty file");
      return [];
    }
    const parsedExpenses: Expenses[] = JSON.parse(expensesFile);
    return [...parsedExpenses];
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return [];
    }
    return [];
  }
}

export async function writeExpenseFile(expenses: Expenses[]) {
  try {
    if (!Array.isArray(expenses)) {
      return false;
    }
    await writeFile("./expenses.json", JSON.stringify(expenses, null, 2));
    return true;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }
  }
}

export async function addExpense(description: string, amount: number) {
  try {
    if (!description) {
      console.error("provide an description");
      return;
    }
    if (!amount) {
      console.error("provide an amount");
      return;
    }
    const expenses: Expenses[] = await readExpenseFile();
    const newID =
      expenses.length === 0
        ? 1
        : Math.max(...expenses.map((expense) => expense.id)) + 1;

    const newExpense: Expenses = {
      id: newID,
      date: new Date().toISOString(),
      description,
      amount,
    };
    expenses.push(newExpense);
    await writeExpenseFile(expenses);
    console.log(`Expense added successfully (ID: ${newExpense.id})`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }
    console.error("Error adding expense");
    return;
  }
}

export async function listExpenses() {
  try {
    const expenses = await readExpenseFile();
    if (expenses.length === 0) {
      console.error("Empty expenses list");
      return;
    }
    expenses.forEach((expense) => {
      console.log(
        `${expense.id}\t ${expense.date}\t ${expense.description}\t $${expense.amount}`,
      );
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
      return;
    }
    console.error("Error generating expense list");
    return;
  }
}

export async function expensesSummary() {
  const expenses = await readExpenseFile();
  if (expenses.length === 0) {
    console.error("No expense found");
    return;
  }
  let total = expenses.reduce((sum, e) => sum + e.amount, 0);
  console.log(`Total Expenses: $${total}`);
}

export async function monthlyExpenseSummary(month: number) {
  if (!month) {
    console.error("No month provided");
    return;
  }
  const expenses = await readExpenseFile();
  const monthlyExpenses = expenses.filter((expense) => {
    const expenseMonth = new Date(expense.date).getMonth() + 1;
    return expenseMonth === month;
  });
  if (monthlyExpenses.length === 0) {
    console.error("No expense found");
    return;
  }

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const total = monthlyExpenses.reduce((sum, month) => sum + month.amount, 0);
  console.log(`Total expenses for ${months[month - 1]} : $${total}`);
}

export async function deleteExpense(id: number) {
  const expenses = await readExpenseFile();
  if (expenses.length === 0) {
    console.error("No expense found");
    return;
  }

  const filteredExpenses = expenses.filter((e) => e.id !== id);
  await writeExpenseFile(filteredExpenses);
  console.log(`Expense deleted successfully`);
}
