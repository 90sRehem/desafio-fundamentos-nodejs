import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;

    const incomeTransactions = transactions
      .filter(transaction => transaction.type === 'income')
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value;
      }, 0);

    const outcomeTransactions = transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value;
      }, 0);

    const balance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: incomeTransactions - outcomeTransactions,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
