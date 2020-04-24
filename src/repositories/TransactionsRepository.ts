import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): object {
    return { transactions: this.transactions, balance: this.getBalance() };
  }

  public getBalance(): Balance {
    const income = this.transactions
      .filter(transaction => transaction.type === 'income')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );
    const outcome = this.transactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue.value,
        0,
      );

    const total = income - outcome;

    return { income, outcome, total };
  }

  public create({ type, value, title }: RequestDTO): Transaction {
    const transaction = new Transaction({ type, value, title });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
