import { Command } from "commander";
import {
  addExpense,
  deleteExpense,
  listExpenses,
  monthlyExpenseSummary,
  expensesSummary,
} from "./commands/commands.js";
const program = new Command();

program
  .name("expense-tracker")
  .description("CLI for performing expense tracking operations")
  .version("1.0.0");

//add expense command
program
  .command("add")
  .description("Add a new expense")
  .requiredOption("--description <desc>", "expense description")
  .requiredOption("--amount <amt>", "expense amount", parseInt)
  .action(async (options) => {
    await addExpense(options.description, options.amount);
  });

program
  .command("list")
  .description("list all expenses")
  .action(async () => {
    await listExpenses();
  });

program
  .command("delete")
  .description("delete a expense")
  .requiredOption("--id <id>", "expense id", parseInt)
  .action(async (opts) => await deleteExpense(opts.id));
